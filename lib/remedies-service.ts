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

let cachedRemedies: HerbalRemedy[] | null = null;
let remediesTimestamp = 0;

let cachedCategories: AilmentCategory[] | null = null;
let categoriesTimestamp = 0;

let cachedBanners: PromotionalBanner[] | null = null;
let bannersTimestamp = 0;

// Always keep storefront live-synced with Admin Portal updates in Firestore
const CACHE_TTL_MS = 0;

export async function getRemedies(): Promise<HerbalRemedy[]> {
  const now = Date.now();
  if (
    CACHE_TTL_MS > 0 &&
    cachedRemedies &&
    cachedRemedies.length > 0 &&
    now - remediesTimestamp < CACHE_TTL_MS
  ) {
    return cachedRemedies;
  }

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
        remediesTimestamp = now;
        return cachedRemedies;
      }
    } catch (e) {
      console.warn('Firestore remedies fetch failed, using seed data fallback:', e);
    }
  }
  cachedRemedies = seedData.remedies as unknown as HerbalRemedy[];
  remediesTimestamp = now;
  return cachedRemedies;
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

export async function getCategories(): Promise<AilmentCategory[]> {
  const now = Date.now();
  if (
    CACHE_TTL_MS > 0 &&
    cachedCategories &&
    cachedCategories.length > 0 &&
    now - categoriesTimestamp < CACHE_TTL_MS
  ) {
    return cachedCategories;
  }

  if (!isFallbackMode() && db) {
    try {
      const snap = await getDocs(collection(db, 'ailments'));
      if (!snap.empty) {
        const categories = snap.docs
          .map((d) => ({ ...d.data(), id: d.id } as AilmentCategory))
          .filter((c) => c && c.name && c.isActive !== false);
        if (categories.length > 0) {
          cachedCategories = categories.sort((a, b) => a.displayOrder - b.displayOrder);
          categoriesTimestamp = now;
          return cachedCategories;
        }
      }
    } catch (e) {
      console.warn('Firestore categories fetch failed, using seed data fallback:', e);
    }
  }
  const categories = seedData.categories as unknown as AilmentCategory[];
  cachedCategories = [...categories]
    .filter((c) => c.isActive !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  categoriesTimestamp = now;
  return cachedCategories;
}

export async function getCategoryBySlug(slug: string): Promise<AilmentCategory | null> {
  const categories = await getCategories();
  const cleanSlug = (slug || '').toLowerCase().trim();
  return categories.find((c) => c.slug === cleanSlug || c.id === cleanSlug) || null;
}

export async function getBanners(): Promise<PromotionalBanner[]> {
  const now = Date.now();
  if (
    CACHE_TTL_MS > 0 &&
    cachedBanners &&
    cachedBanners.length > 0 &&
    now - bannersTimestamp < CACHE_TTL_MS
  ) {
    return cachedBanners;
  }

  if (!isFallbackMode() && db) {
    try {
      const snap = await getDocs(collection(db, 'banners'));
      if (!snap.empty) {
        const banners = snap.docs.map((d) => ({ ...d.data(), id: d.id } as PromotionalBanner));
        cachedBanners = banners
          .filter((b) => b.isActive)
          .sort((a, b) => a.priorityOrder - b.priorityOrder);
        bannersTimestamp = now;
        return cachedBanners;
      }
    } catch (e) {
      console.warn('Firestore banners fetch failed, using seed data fallback:', e);
    }
  }
  const banners = seedData.banners as unknown as PromotionalBanner[];
  cachedBanners = [...banners]
    .filter((b) => b.isActive)
    .sort((a, b) => a.priorityOrder - b.priorityOrder);
  bannersTimestamp = now;
  return cachedBanners;
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
