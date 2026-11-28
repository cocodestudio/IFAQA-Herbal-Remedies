import { collection, getDocs } from 'firebase/firestore';
import { db, firebaseConfig } from './firebase';
import seedData from './seed-data.json';
import { HerbalRemedy, AilmentCategory, PromotionalBanner } from './types';

export const isFallbackMode = (): boolean => {
  if (typeof process !== 'undefined') {
    if (process.env.NEXT_PUBLIC_MOCK_FALLBACK === 'true') return true;
    const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig.apiKey;
    if (!key || key.includes('mock') || key.includes('Dummy')) return true;
  }
  return false;
};

const STORAGE_KEY = 'ifaqa_storefront_swr_v2';
const MEMORY_FRESH_TTL_MS = 120_000; // 2 minutes fresh in RAM
const SWR_STALE_TTL_MS = 60_000; // Background revalidate after 60s
const MAX_PERSISTED_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours max localStorage lifetime

export interface StorefrontSnapshot {
  remedies: HerbalRemedy[];
  categories: AilmentCategory[];
  banners: PromotionalBanner[];
  savedAt: number;
  fromCache: boolean;
}

let cachedRemedies: HerbalRemedy[] | null = null;
let remediesTimestamp = 0;

let cachedCategories: AilmentCategory[] | null = null;
let categoriesTimestamp = 0;

let cachedBanners: PromotionalBanner[] | null = null;
let bannersTimestamp = 0;

let inflightBootstrap: Promise<StorefrontSnapshot | null> | null = null;
let inflightRemedies: Promise<HerbalRemedy[]> | null = null;
let inflightCategories: Promise<AilmentCategory[]> | null = null;
let inflightBanners: Promise<PromotionalBanner[]> | null = null;

function getSeedSnapshot(): StorefrontSnapshot {
  return {
    remedies: seedData.remedies as unknown as HerbalRemedy[],
    categories: [...(seedData.categories as unknown as AilmentCategory[])]
      .filter((c) => c.isActive !== false)
      .sort((a, b) => a.displayOrder - b.displayOrder),
    banners: [...(seedData.banners as unknown as PromotionalBanner[])]
      .filter((b) => b.isActive)
      .sort((a, b) => a.priorityOrder - b.priorityOrder),
    savedAt: 0,
    fromCache: false,
  };
}

function persistSnapshot(snapshot: Omit<StorefrontSnapshot, 'fromCache'>): void {
  cachedRemedies = snapshot.remedies;
  cachedCategories = snapshot.categories;
  cachedBanners = snapshot.banners;
  remediesTimestamp = snapshot.savedAt;
  categoriesTimestamp = snapshot.savedAt;
  bannersTimestamp = snapshot.savedAt;

  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore storage quota / private mode errors
  }
}

function readPersistedSnapshot(): StorefrontSnapshot | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StorefrontSnapshot>;
    if (
      !parsed ||
      !Array.isArray(parsed.remedies) ||
      !Array.isArray(parsed.categories) ||
      !Array.isArray(parsed.banners) ||
      parsed.remedies.length === 0
    ) {
      return null;
    }
    const age = Date.now() - Number(parsed.savedAt || 0);
    if (age > MAX_PERSISTED_AGE_MS) return null;
    return {
      remedies: parsed.remedies,
      categories: parsed.categories,
      banners: parsed.banners,
      savedAt: Number(parsed.savedAt || 0),
      fromCache: true,
    };
  } catch {
    return null;
  }
}

export function hasWarmMemoryCache(): boolean {
  return Boolean(
    cachedRemedies &&
      cachedRemedies.length > 0 &&
      cachedCategories &&
      cachedCategories.length > 0 &&
      cachedBanners
  );
}

export function getCachedStorefrontSnapshot(): StorefrontSnapshot {
  if (
    cachedRemedies &&
    cachedRemedies.length > 0 &&
    cachedCategories &&
    cachedCategories.length > 0 &&
    cachedBanners
  ) {
    return {
      remedies: cachedRemedies,
      categories: cachedCategories,
      banners: cachedBanners,
      savedAt: remediesTimestamp,
      fromCache: true,
    };
  }

  const stored = readPersistedSnapshot();
  if (stored) {
    cachedRemedies = stored.remedies;
    cachedCategories = stored.categories;
    cachedBanners = stored.banners;
    remediesTimestamp = stored.savedAt;
    categoriesTimestamp = stored.savedAt;
    bannersTimestamp = stored.savedAt;
    return stored;
  }

  return getSeedSnapshot();
}

export function invalidateStorefrontCache(): void {
  cachedRemedies = null;
  cachedCategories = null;
  cachedBanners = null;
  remediesTimestamp = 0;
  categoriesTimestamp = 0;
  bannersTimestamp = 0;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}

async function fetchEdgeStorefront(forceRefresh = false): Promise<StorefrontSnapshot | null> {
  if (typeof window === 'undefined' || isFallbackMode()) return null;
  if (inflightBootstrap && !forceRefresh) return inflightBootstrap;

  const job = (async (): Promise<StorefrontSnapshot | null> => {
    try {
      const url = forceRefresh ? '/api/storefront?refresh=1' : '/api/storefront';
      const res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || !Array.isArray(data.remedies) || data.remedies.length === 0) {
        return null;
      }
      const snapshot: Omit<StorefrontSnapshot, 'fromCache'> = {
        remedies: data.remedies,
        categories: Array.isArray(data.categories) ? data.categories : getSeedSnapshot().categories,
        banners: Array.isArray(data.banners) ? data.banners : getSeedSnapshot().banners,
        savedAt: Date.now(),
      };
      persistSnapshot(snapshot);
      return { ...snapshot, fromCache: false };
    } catch {
      return null;
    } finally {
      inflightBootstrap = null;
    }
  })();

  inflightBootstrap = job;
  return job;
}

/**
 * Single deduplicated loader for Homepage & Header — serves instant L1 RAM / L2 localStorage SWR
 * when available and revalidates from Redis / Cloudflare Edge / Firestore in background.
 */
export async function getStorefrontData(forceRefresh = false): Promise<StorefrontSnapshot> {
  const now = Date.now();
  const current = getCachedStorefrontSnapshot();

  if (!forceRefresh && current.fromCache && now - current.savedAt < SWR_STALE_TTL_MS) {
    return current;
  }

  const edge = await fetchEdgeStorefront(forceRefresh);
  if (edge) return edge;

  // Fallback to direct Firestore client SDK calls
  const [remedies, categories, banners] = await Promise.all([
    getRemedies(forceRefresh),
    getCategories(forceRefresh),
    getBanners(forceRefresh),
  ]);
  const snapshot: Omit<StorefrontSnapshot, 'fromCache'> = {
    remedies,
    categories,
    banners,
    savedAt: Date.now(),
  };
  persistSnapshot(snapshot);
  return { ...snapshot, fromCache: false };
}

export async function getRemedies(forceRefresh = false): Promise<HerbalRemedy[]> {
  const now = Date.now();
  if (
    !forceRefresh &&
    cachedRemedies &&
    cachedRemedies.length > 0 &&
    now - remediesTimestamp < MEMORY_FRESH_TTL_MS
  ) {
    return cachedRemedies;
  }

  if (!forceRefresh) {
    const persisted = readPersistedSnapshot();
    if (persisted && persisted.remedies.length > 0 && now - persisted.savedAt < SWR_STALE_TTL_MS) {
      cachedRemedies = persisted.remedies;
      remediesTimestamp = persisted.savedAt;
      return cachedRemedies;
    }
  }

  if (inflightRemedies && !forceRefresh) return inflightRemedies;

  const job = (async (): Promise<HerbalRemedy[]> => {
    const edge = await fetchEdgeStorefront(forceRefresh);
    if (edge && edge.remedies.length > 0) return edge.remedies;

    if (!isFallbackMode() && db) {
      try {
        const snap = await getDocs(collection(db, 'remedies'));
        if (!snap.empty) {
          const list = snap.docs.map((d) => ({ ...d.data(), id: d.id } as HerbalRemedy));
          list.sort((a, b) => {
            const tA = new Date(a.updatedAt || a.createdAt || 0).getTime();
            const tB = new Date(b.updatedAt || b.createdAt || 0).getTime();
            return tB - tA;
          });
          cachedRemedies = list;
          remediesTimestamp = Date.now();
          return cachedRemedies;
        }
      } catch (e) {
        console.warn('Firestore remedies fetch failed, using cached/seed fallback:', e);
      }
    }

    const fallback = readPersistedSnapshot()?.remedies || (seedData.remedies as unknown as HerbalRemedy[]);
    cachedRemedies = fallback;
    remediesTimestamp = Date.now();
    return cachedRemedies;
  })().finally(() => {
    inflightRemedies = null;
  });

  inflightRemedies = job;
  return job;
}

export async function getRemedyBySlug(slug: string): Promise<HerbalRemedy | null> {
  const cleanSlug = (slug || '').toLowerCase().trim();
  if (!cleanSlug) return null;

  const all = await getRemedies();
  const liveMatch = all.find(
    (r) => (r.slug || '').toLowerCase() === cleanSlug || r.id.toLowerCase() === cleanSlug
  );
  if (liveMatch) return liveMatch;

  const quick = (seedData.remedies as unknown as HerbalRemedy[]).find(
    (r) => (r.slug || '').toLowerCase() === cleanSlug || r.id.toLowerCase() === cleanSlug
  );
  return quick || null;
}

export async function getRemediesByCategory(categoryId: string): Promise<HerbalRemedy[]> {
  const all = await getRemedies();
  const active = all.filter((r) => r.isAvailable !== false);
  if (!categoryId || categoryId === 'all') return active;
  return active.filter((r) => r.categoryId === categoryId);
}

export async function getCategories(forceRefresh = false): Promise<AilmentCategory[]> {
  const now = Date.now();
  if (
    !forceRefresh &&
    cachedCategories &&
    cachedCategories.length > 0 &&
    now - categoriesTimestamp < MEMORY_FRESH_TTL_MS
  ) {
    return cachedCategories;
  }

  if (!forceRefresh) {
    const persisted = readPersistedSnapshot();
    if (persisted && persisted.categories.length > 0 && now - persisted.savedAt < SWR_STALE_TTL_MS) {
      cachedCategories = persisted.categories;
      categoriesTimestamp = persisted.savedAt;
      return cachedCategories;
    }
  }

  if (inflightCategories && !forceRefresh) return inflightCategories;

  const job = (async (): Promise<AilmentCategory[]> => {
    const edge = await fetchEdgeStorefront(forceRefresh);
    if (edge && edge.categories.length > 0) return edge.categories;

    if (!isFallbackMode() && db) {
      try {
        const snap = await getDocs(collection(db, 'ailments'));
        if (!snap.empty) {
          const categories = snap.docs
            .map((d) => ({ ...d.data(), id: d.id } as AilmentCategory))
            .filter((c) => c && c.name && c.isActive !== false);
          if (categories.length > 0) {
            cachedCategories = categories.sort((a, b) => a.displayOrder - b.displayOrder);
            categoriesTimestamp = Date.now();
            return cachedCategories;
          }
        }
      } catch (e) {
        console.warn('Firestore categories fetch failed, using cached/seed fallback:', e);
      }
    }
    const categories = readPersistedSnapshot()?.categories || (seedData.categories as unknown as AilmentCategory[]);
    cachedCategories = [...categories]
      .filter((c) => c.isActive !== false)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    categoriesTimestamp = Date.now();
    return cachedCategories;
  })().finally(() => {
    inflightCategories = null;
  });

  inflightCategories = job;
  return job;
}

export async function getCategoryBySlug(slug: string): Promise<AilmentCategory | null> {
  const categories = await getCategories();
  const cleanSlug = (slug || '').toLowerCase().trim();
  return categories.find((c) => c.slug === cleanSlug || c.id === cleanSlug) || null;
}

export async function getBanners(forceRefresh = false): Promise<PromotionalBanner[]> {
  const now = Date.now();
  if (
    !forceRefresh &&
    cachedBanners &&
    cachedBanners.length > 0 &&
    now - bannersTimestamp < MEMORY_FRESH_TTL_MS
  ) {
    return cachedBanners;
  }

  if (!forceRefresh) {
    const persisted = readPersistedSnapshot();
    if (persisted && persisted.banners && now - persisted.savedAt < SWR_STALE_TTL_MS) {
      cachedBanners = persisted.banners;
      bannersTimestamp = persisted.savedAt;
      return cachedBanners;
    }
  }

  if (inflightBanners && !forceRefresh) return inflightBanners;

  const job = (async (): Promise<PromotionalBanner[]> => {
    const edge = await fetchEdgeStorefront(forceRefresh);
    if (edge && edge.banners) return edge.banners;

    if (!isFallbackMode() && db) {
      try {
        const snap = await getDocs(collection(db, 'banners'));
        if (!snap.empty) {
          const banners = snap.docs.map((d) => ({ ...d.data(), id: d.id } as PromotionalBanner));
          cachedBanners = banners
            .filter((b) => b.isActive)
            .sort((a, b) => a.priorityOrder - b.priorityOrder);
          bannersTimestamp = Date.now();
          return cachedBanners;
        }
      } catch (e) {
        console.warn('Firestore banners fetch failed, using cached/seed fallback:', e);
      }
    }
    const banners = readPersistedSnapshot()?.banners || (seedData.banners as unknown as PromotionalBanner[]);
    cachedBanners = [...banners]
      .filter((b) => b.isActive)
      .sort((a, b) => a.priorityOrder - b.priorityOrder);
    bannersTimestamp = Date.now();
    return cachedBanners;
  })().finally(() => {
    inflightBanners = null;
  });

  inflightBanners = job;
  return job;
}

export function filterRemedies(
  remedies: HerbalRemedy[],
  {
    category,
    search,
    inStockOnly,
    form,
  }: { category?: string; search?: string; inStockOnly?: boolean; form?: string } = {}
): HerbalRemedy[] {
  return remedies.filter((r) => {
    if (r.isAvailable === false) return false;
    if (category && category !== 'all' && r.categoryId !== category) return false;
    if (form && form !== 'all' && r.form !== form) return false;
    if (inStockOnly && (!r.isAvailable || r.stockQuantity <= 0)) return false;
    if (search && search.trim() !== '') {
      const sanitized = search.trim().slice(0, 100).toLowerCase();
      const matchesName = r.name.toLowerCase().includes(sanitized);
      const matchesRomanUrdu = (r.romanUrduName || '').toLowerCase().includes(sanitized);
      const matchesUrdu = (r.urduName || '').includes(search.trim());
      const matchesDesc = (r.shortDescription || '').toLowerCase().includes(sanitized);
      const matchesIndications = (r.therapeuticIndications || []).some((ind) =>
        ind.toLowerCase().includes(sanitized)
      );
      const matchesIngredients = (r.herbalIngredients || []).some(
        (ing) =>
          ing.commonName.toLowerCase().includes(sanitized) ||
          ing.botanicalName.toLowerCase().includes(sanitized)
      );
      if (
        !matchesName &&
        !matchesRomanUrdu &&
        !matchesUrdu &&
        !matchesDesc &&
        !matchesIndications &&
        !matchesIngredients
      )
        return false;
    }
    return true;
  });
}
