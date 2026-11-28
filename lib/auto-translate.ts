'use client';

/**
 * React-safe DOM Auto-Translator Engine.
 * - Keeps HTML dir fixed to LTR (`dir="ltr"` always) so page geometry never breaks.
 * - Tracks original English strings in WeakMaps per Text node & element attribute.
 * - Updates only `nodeValue` / attributes cleanly (never wraps tags, never breaks React hydration/unmount).
 * - Persists per-language translations in RAM + localStorage for instant switching.
 */

const STORAGE_PREFIX = 'ifaqa_auto_tr_v1_';
const MAX_CACHED_KEYS_PER_LANG = 800;

const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'CODE',
  'PRE',
  'SVG',
  'TEXTAREA',
]);

const TRANSLATABLE_ATTRS = ['placeholder', 'aria-label', 'title'] as const;

const origTextMap = new WeakMap<Text, string>();
const appliedTextMap = new WeakMap<Text, string>();
const origAttrMap = new WeakMap<Element, Record<string, string>>();
const appliedAttrMap = new WeakMap<Element, Record<string, string>>();

const langMemoryCache = new Map<string, Map<string, string>>();
const inflightStrings = new Set<string>();

let activeLang = 'en';
let isApplying = false;
let observer: MutationObserver | null = null;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let pendingStrings = new Set<string>();
let statusListener: ((translating: boolean) => void) | null = null;

function getLangCache(lang: string): Map<string, string> {
  let map = langMemoryCache.get(lang);
  if (map) return map;

  map = new Map<string, string>();
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${lang}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (parsed && typeof parsed === 'object') {
          for (const [k, v] of Object.entries(parsed)) {
            if (typeof v === 'string' && v.trim()) {
              map.set(k, v);
            }
          }
        }
      }
    } catch {
      // Ignore corrupt storage
    }
  }
  langMemoryCache.set(lang, map);
  return map;
}

function saveLangCache(lang: string): void {
  if (typeof window === 'undefined' || lang === 'en') return;
  try {
    const map = langMemoryCache.get(lang);
    if (!map) return;
    const entries = Array.from(map.entries()).slice(-MAX_CACHED_KEYS_PER_LANG);
    const obj: Record<string, string> = {};
    for (const [k, v] of entries) {
      obj[k] = v;
    }
    window.localStorage.setItem(`${STORAGE_PREFIX}${lang}`, JSON.stringify(obj));
  } catch {
    // Ignore storage quota errors
  }
}

function shouldSkipText(raw: string): boolean {
  const trimmed = raw.trim();
  if (trimmed.length < 2) return true;
  // Must contain at least two letters (avoids numbers, currencies, punctuation, "01", "₹1,250", "+91...")
  if (!/[a-zA-Z]{2,}/.test(trimmed)) return true;
  // Preserve direct brand codes, email, phone numbers, and order IDs
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;
  if (/^(IFA\d+|PKR|USD|INR|\+?\d[\d\s-]{5,})$/.test(trimmed)) return true;
  if (/^https?:\/\//i.test(trimmed)) return true;
  return false;
}

function isProtectedElement(el: Element | null): boolean {
  let cur: Element | null = el;
  while (cur) {
    if (SKIP_TAGS.has(cur.tagName)) return true;
    const tr = cur.getAttribute('translate');
    const noTr = cur.getAttribute('data-no-translate');
    if (tr === 'no' || noTr === 'true') return true;
    // Skip monospace code/price/SKU readouts except buttons or paragraphs
    if (
      cur.classList?.contains('font-mono') &&
      cur.tagName !== 'BUTTON' &&
      cur.tagName !== 'A' &&
      cur.tagName !== 'P'
    ) {
      const txt = (cur.textContent || '').trim();
      if (/^[\d\s₹$,.+\-:%/•|#A-Z]+$/.test(txt)) return true;
    }
    cur = cur.parentElement;
  }
  return false;
}

function applyCachedTranslations(): void {
  if (typeof document === 'undefined' || !document.body) return;
  const targetLang = activeLang;
  const cache = targetLang === 'en' ? null : getLangCache(targetLang);

  isApplying = true;
  try {
    // 1. Walk all visible Text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const textNode = node as Text;
      const parent = textNode.parentElement;
      if (!parent || isProtectedElement(parent)) continue;

      const currentVal = textNode.nodeValue || '';
      const lastApplied = appliedTextMap.get(textNode);

      // Capture fresh English source whenever React updated this node or we haven't seen it yet
      if (!origTextMap.has(textNode) || (lastApplied !== undefined && currentVal !== lastApplied)) {
        origTextMap.set(textNode, currentVal);
        appliedTextMap.delete(textNode);
      }

      const sourceVal = origTextMap.get(textNode) ?? currentVal;
      if (targetLang === 'en') {
        if (currentVal !== sourceVal) {
          textNode.nodeValue = sourceVal;
        }
        appliedTextMap.delete(textNode);
        continue;
      }

      if (shouldSkipText(sourceVal)) continue;

      const trimmed = sourceVal.trim();
      const hit = cache?.get(trimmed);
      if (hit) {
        const leading = sourceVal.match(/^\s*/)?.[0] || '';
        const trailing = sourceVal.match(/\s*$/)?.[0] || '';
        const nextVal = `${leading}${hit}${trailing}`;
        if (currentVal !== nextVal) {
          textNode.nodeValue = nextVal;
        }
        appliedTextMap.set(textNode, nextVal);
      } else if (!inflightStrings.has(`${targetLang}::${trimmed}`)) {
        pendingStrings.add(trimmed);
      }
    }

    // 2. Walk placeholders, titles, and aria-labels
    const elements = document.body.querySelectorAll<HTMLElement>(
      '[placeholder], [aria-label], [title]'
    );
    elements.forEach((el) => {
      if (isProtectedElement(el)) return;
      let origRec = origAttrMap.get(el);
      if (!origRec) {
        origRec = {};
        origAttrMap.set(el, origRec);
      }
      let appRec = appliedAttrMap.get(el);
      if (!appRec) {
        appRec = {};
        appliedAttrMap.set(el, appRec);
      }

      for (const attr of TRANSLATABLE_ATTRS) {
        const cur = el.getAttribute(attr);
        if (cur == null) continue;
        if (origRec[attr] === undefined || (appRec[attr] !== undefined && cur !== appRec[attr])) {
          origRec[attr] = cur;
          delete appRec[attr];
        }
        const sourceAttr = origRec[attr];
        if (targetLang === 'en') {
          if (cur !== sourceAttr) el.setAttribute(attr, sourceAttr);
          delete appRec[attr];
          continue;
        }
        if (shouldSkipText(sourceAttr)) continue;
        const trimmed = sourceAttr.trim();
        const hit = cache?.get(trimmed);
        if (hit) {
          if (cur !== hit) el.setAttribute(attr, hit);
          appRec[attr] = hit;
        } else if (!inflightStrings.has(`${targetLang}::${trimmed}`)) {
          pendingStrings.add(trimmed);
        }
      }
    });
  } finally {
    isApplying = false;
  }

  if (targetLang !== 'en' && pendingStrings.size > 0) {
    scheduleFlush(targetLang);
  }
}

function scheduleFlush(targetLang: string): void {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    void flushPendingTranslations(targetLang);
  }, 45);
}

async function flushPendingTranslations(targetLang: string): Promise<void> {
  if (targetLang === 'en' || pendingStrings.size === 0) return;

  const batchList = Array.from(pendingStrings);
  pendingStrings.clear();

  const cache = getLangCache(targetLang);
  const toFetch = batchList.filter(
    (s) => !cache.has(s) && !inflightStrings.has(`${targetLang}::${s}`)
  );
  if (toFetch.length === 0) return;

  toFetch.forEach((s) => inflightStrings.add(`${targetLang}::${s}`));
  statusListener?.(true);

  try {
    // Process in chunks of 40 phrases so large pages translate quickly and cleanly
    for (let i = 0; i < toFetch.length; i += 40) {
      const chunk = toFetch.slice(i, i + 40);
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetLang, texts: chunk }),
        });
        if (res.ok) {
          const data = await res.json();
          const map = data?.translations || {};
          for (const [orig, tr] of Object.entries(map)) {
            if (typeof tr === 'string' && tr.trim()) {
              cache.set(orig, tr.trim());
            }
          }
          saveLangCache(targetLang);
          if (activeLang === targetLang) {
            applyCachedTranslations();
          }
        }
      } catch {
        // Keep English text gracefully on network failure
      }
    }
  } finally {
    toFetch.forEach((s) => inflightStrings.delete(`${targetLang}::${s}`));
    statusListener?.(false);
  }
}

function ensureObserver(): void {
  if (observer || typeof window === 'undefined' || typeof MutationObserver === 'undefined') {
    return;
  }
  if (!document.body) return;

  observer = new MutationObserver(() => {
    if (isApplying || activeLang === 'en') return;
    applyCachedTranslations();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

export function setActiveTranslationLanguage(
  lang: string,
  onStatusChange?: (translating: boolean) => void
): void {
  activeLang = (lang || 'en').trim() || 'en';
  if (onStatusChange) {
    statusListener = onStatusChange;
  }

  if (typeof document !== 'undefined') {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = activeLang;
  }

  pendingStrings.clear();
  ensureObserver();
  applyCachedTranslations();
}
