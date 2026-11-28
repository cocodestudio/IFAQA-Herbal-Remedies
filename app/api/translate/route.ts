import { NextRequest, NextResponse } from 'next/server';

const MAX_ITEMS_PER_REQUEST = 50;
const MAX_TEXT_LEN = 1200;
const MAX_SERVER_CACHE_ENTRIES = 8000;

const globalTranslationStore = globalThis as typeof globalThis & {
  __ifaqaTranslationCache?: Map<string, string>;
};

function getServerCache(): Map<string, string> {
  if (!globalTranslationStore.__ifaqaTranslationCache) {
    globalTranslationStore.__ifaqaTranslationCache = new Map();
  }
  return globalTranslationStore.__ifaqaTranslationCache;
}

function setServerCache(key: string, value: string): void {
  const cache = getServerCache();
  if (cache.size >= MAX_SERVER_CACHE_ENTRIES) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
  cache.set(key, value);
}

async function translateSingleGoogle(text: string, targetLang: string): Promise<string | null> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
      targetLang
    )}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.[0])) return null;
    const joined = data[0]
      .map((seg: any) => (Array.isArray(seg) && typeof seg[0] === 'string' ? seg[0] : ''))
      .join('')
      .trim();
    return joined || null;
  } catch {
    return null;
  }
}

async function translateSingleMyMemory(text: string, targetLang: string): Promise<string | null> {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${encodeURIComponent(targetLang)}`;
    const res = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const candidate = data?.responseData?.translatedText;
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
    return null;
  } catch {
    return null;
  }
}

async function readRedisTranslations(
  targetLang: string,
  texts: string[]
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token || texts.length === 0) return out;

  try {
    const keys = texts.map((t) => `ifaqa:tr:${targetLang}:${t}`);
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/mget`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keys),
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return out;
    const json = await res.json();
    const results = Array.isArray(json?.result) ? json.result : [];
    texts.forEach((orig, idx) => {
      const val = results[idx];
      if (typeof val === 'string' && val.length > 0) {
        out[orig] = val;
        setServerCache(`${targetLang}::${orig}`, val);
      }
    });
  } catch {
    // Non-blocking fallback
  }
  return out;
}

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>
): Promise<void> {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const idx = cursor++;
      await worker(items[idx]);
    }
  });
  await Promise.all(runners);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const targetLang = String(body?.targetLang || 'en').trim();
    const rawTexts: unknown[] = Array.isArray(body?.texts) ? body.texts : [];

    if (!targetLang || targetLang === 'en' || !/^[a-zA-Z0-9-]{2,12}$/.test(targetLang)) {
      return NextResponse.json({ translations: {} });
    }

    const uniqueTexts = Array.from(
      new Set(
        rawTexts
          .filter((t): t is string => typeof t === 'string')
          .map((t) => t.trim().slice(0, MAX_TEXT_LEN))
          .filter((t) => t.length >= 2)
      )
    ).slice(0, MAX_ITEMS_PER_REQUEST);

    if (uniqueTexts.length === 0) {
      return NextResponse.json({ translations: {} });
    }

    const cache = getServerCache();
    const translations: Record<string, string> = {};
    const missing: string[] = [];

    for (const text of uniqueTexts) {
      const hit = cache.get(`${targetLang}::${text}`);
      if (hit) {
        translations[text] = hit;
      } else {
        missing.push(text);
      }
    }

    if (missing.length > 0) {
      const redisHits = await readRedisTranslations(targetLang, missing);
      const stillMissing: string[] = [];
      for (const text of missing) {
        if (redisHits[text]) {
          translations[text] = redisHits[text];
        } else {
          stillMissing.push(text);
        }
      }

      if (stillMissing.length > 0) {
        await runWithConcurrency(stillMissing, 6, async (text) => {
          const translated =
            (await translateSingleGoogle(text, targetLang)) ||
            (await translateSingleMyMemory(text, targetLang)) ||
            text;
          translations[text] = translated;
          setServerCache(`${targetLang}::${text}`, translated);
        });
      }
    }

    return NextResponse.json(
      { translations },
      {
        headers: {
          'Cache-Control': 'private, max-age=300',
        },
      }
    );
  } catch {
    return NextResponse.json({ translations: {} });
  }
}
