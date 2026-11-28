import { NextRequest, NextResponse } from 'next/server';
import seedData from '@/lib/seed-data.json';
import { HerbalRemedy, AilmentCategory, PromotionalBanner } from '@/lib/types';

interface StorefrontPayload {
  remedies: HerbalRemedy[];
  categories: AilmentCategory[];
  banners: PromotionalBanner[];
  cachedAt: number;
  source: 'memory' | 'redis' | 'edge' | 'firestore' | 'seed';
}

const FIREBASE_PROJECT_ID =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'ifaqa-herbal-remedies';
const REDIS_KEY = 'ifaqa:storefront:v2';
const MEMORY_FRESH_TTL_MS = 90_000;
const MEMORY_STALE_TTL_MS = 600_000;
const REDIS_TTL_SECONDS = 120;

interface MemoryEntry {
  payload: StorefrontPayload;
  expiresAt: number;
  staleUntil: number;
}

const globalStore = globalThis as typeof globalThis & {
  __ifaqaStorefrontCache?: MemoryEntry;
  __ifaqaStorefrontInflight?: Promise<StorefrontPayload>;
};

function decodeFirestoreValue(val: any): any {
  if (!val || typeof val !== 'object') return undefined;
  if ('nullValue' in val) return null;
  if ('booleanValue' in val) return Boolean(val.booleanValue);
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return Number(val.doubleValue);
  if ('stringValue' in val) return String(val.stringValue);
  if ('timestampValue' in val) return String(val.timestampValue);
  if ('arrayValue' in val) {
    const arr = Array.isArray(val.arrayValue?.values) ? val.arrayValue.values : [];
    return arr.map(decodeFirestoreValue).filter((v: any) => v !== undefined);
  }
  if ('mapValue' in val) {
    const fields = val.mapValue?.fields || {};
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(fields)) {
      const decoded = decodeFirestoreValue(v);
      if (decoded !== undefined) out[k] = decoded;
    }
    return out;
  }
  return undefined;
}

function decodeFirestoreDoc<T>(doc: any): T | null {
  if (!doc || !doc.name) return null;
  const parts = String(doc.name).split('/');
  const id = parts[parts.length - 1];
  const fields = doc.fields || {};
  const obj: Record<string, any> = { id };
  for (const [k, v] of Object.entries(fields)) {
    const decoded = decodeFirestoreValue(v);
    if (decoded !== undefined) obj[k] = decoded;
  }
  return obj as T;
}

async function fetchFirestoreCollection<T>(collectionName: string): Promise<T[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${collectionName}?pageSize=300`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) {
    throw new Error(`Firestore REST ${collectionName} returned ${res.status}`);
  }
  const json = await res.json();
  const docs = Array.isArray(json?.documents) ? json.documents : [];
  return docs.map((d: any) => decodeFirestoreDoc<T>(d)).filter(Boolean) as T[];
}

async function readUpstashRedis(): Promise<StorefrontPayload | null> {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token) return null;

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/get/${encodeURIComponent(REDIS_KEY)}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (typeof json?.result === 'string' && json.result.length > 0) {
      const parsed = JSON.parse(json.result) as StorefrontPayload;
      if (parsed && Array.isArray(parsed.remedies)) {
        return { ...parsed, source: 'redis' };
      }
    }
  } catch {
    // Graceful Redis fallback
  }
  return null;
}

async function writeUpstashRedis(payload: StorefrontPayload): Promise<void> {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token) return;

  try {
    await fetch(
      `${baseUrl.replace(/\/$/, '')}/set/${encodeURIComponent(REDIS_KEY)}?EX=${REDIS_TTL_SECONDS}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(1500),
      }
    );
  } catch {
    // Non-blocking cache write
  }
}

async function loadFreshFromOrigin(): Promise<StorefrontPayload> {
  if (globalStore.__ifaqaStorefrontInflight) {
    return globalStore.__ifaqaStorefrontInflight;
  }

  const job = (async (): Promise<StorefrontPayload> => {
    // 1. Check distributed Upstash Redis cache first if configured
    const redisHit = await readUpstashRedis();
    if (redisHit) {
      const now = Date.now();
      globalStore.__ifaqaStorefrontCache = {
        payload: redisHit,
        expiresAt: now + MEMORY_FRESH_TTL_MS,
        staleUntil: now + MEMORY_STALE_TTL_MS,
      };
      return redisHit;
    }

    // 2. Fetch live Firestore collections concurrently over REST (no eval/protobufjs)
    try {
      const [rawRemedies, rawCategories, rawBanners] = await Promise.all([
        fetchFirestoreCollection<HerbalRemedy>('remedies'),
        fetchFirestoreCollection<AilmentCategory>('ailments'),
        fetchFirestoreCollection<PromotionalBanner>('banners'),
      ]);

      const remedies =
        rawRemedies.length > 0
          ? rawRemedies.sort((a, b) => {
              const tA = new Date(a.updatedAt || a.createdAt || 0).getTime();
              const tB = new Date(b.updatedAt || b.createdAt || 0).getTime();
              return tB - tA;
            })
          : (seedData.remedies as unknown as HerbalRemedy[]);

      const categories =
        rawCategories.length > 0
          ? rawCategories
              .filter((c) => c && c.name && c.isActive !== false)
              .sort((a, b) => a.displayOrder - b.displayOrder)
          : ([...(seedData.categories as unknown as AilmentCategory[])]
              .filter((c) => c.isActive !== false)
              .sort((a, b) => a.displayOrder - b.displayOrder));

      const banners =
        rawBanners.length > 0
          ? rawBanners.filter((b) => b.isActive).sort((a, b) => a.priorityOrder - b.priorityOrder)
          : ([...(seedData.banners as unknown as PromotionalBanner[])]
              .filter((b) => b.isActive)
              .sort((a, b) => a.priorityOrder - b.priorityOrder));

      const now = Date.now();
      const payload: StorefrontPayload = {
        remedies,
        categories,
        banners,
        cachedAt: now,
        source: rawRemedies.length > 0 ? 'firestore' : 'seed',
      };

      globalStore.__ifaqaStorefrontCache = {
        payload,
        expiresAt: now + MEMORY_FRESH_TTL_MS,
        staleUntil: now + MEMORY_STALE_TTL_MS,
      };
      void writeUpstashRedis(payload);
      return payload;
    } catch {
      const now = Date.now();
      return {
        remedies: seedData.remedies as unknown as HerbalRemedy[],
        categories: [...(seedData.categories as unknown as AilmentCategory[])]
          .filter((c) => c.isActive !== false)
          .sort((a, b) => a.displayOrder - b.displayOrder),
        banners: [...(seedData.banners as unknown as PromotionalBanner[])]
          .filter((b) => b.isActive)
          .sort((a, b) => a.priorityOrder - b.priorityOrder),
        cachedAt: now,
        source: 'seed',
      };
    } finally {
      globalStore.__ifaqaStorefrontInflight = undefined;
    }
  })();

  globalStore.__ifaqaStorefrontInflight = job;
  return job;
}

export async function GET(request: NextRequest) {
  const bypass = request.nextUrl.searchParams.get('refresh') === '1';
  const now = Date.now();

  if (!bypass) {
    const entry = globalStore.__ifaqaStorefrontCache;
    if (entry && now < entry.expiresAt) {
      return NextResponse.json(
        { ...entry.payload, source: 'memory' },
        {
          headers: {
            'Cache-Control': 'public, max-age=30, s-maxage=90, stale-while-revalidate=300',
            'X-Storefront-Cache': 'HIT-MEMORY',
          },
        }
      );
    }

    // Stale-while-revalidate inside worker isolate memory
    if (entry && now < entry.staleUntil) {
      void loadFreshFromOrigin();
      return NextResponse.json(
        { ...entry.payload, source: 'memory' },
        {
          headers: {
            'Cache-Control': 'public, max-age=15, s-maxage=60, stale-while-revalidate=300',
            'X-Storefront-Cache': 'STALE-MEMORY',
          },
        }
      );
    }

    // Check Cloudflare Edge Cache API if running on edge worker
    const defaultCache = (globalThis as any).caches?.default;
    if (defaultCache) {
      try {
        const edgeMatch = await defaultCache.match(request.url);
        if (edgeMatch) {
          return edgeMatch;
        }
      } catch {
        // Ignore Edge cache lookup error
      }
    }
  }

  const payload = await loadFreshFromOrigin();
  const response = NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=30, s-maxage=90, stale-while-revalidate=300',
      'X-Storefront-Cache': `MISS-${payload.source.toUpperCase()}`,
    },
  });

  const defaultCache = (globalThis as any).caches?.default;
  if (defaultCache && payload.source !== 'seed') {
    try {
      await defaultCache.put(request.url, response.clone());
    } catch {
      // Ignore Edge cache write error
    }
  }

  return response;
}
