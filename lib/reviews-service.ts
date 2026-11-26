'use client';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import { CustomerReview } from './types';

export interface ProductReviewRecord extends CustomerReview {
  remedySlug: string;
  remedyName: string;
  remedyImage?: string;
  customerPhone?: string;
}

const LOCAL_REVIEWS_KEY = 'ifaqa_product_reviews';
const GUEST_REVIEWER_KEY = 'ifaqa_guest_reviewer_id';

export function getGuestReviewerId(): string {
  if (typeof window === 'undefined') return 'guest_ssr';
  try {
    let existing = localStorage.getItem(GUEST_REVIEWER_KEY);
    if (!existing) {
      existing = `guest_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(GUEST_REVIEWER_KEY, existing);
    }
    return existing;
  } catch {
    return 'guest_browser';
  }
}

export function isReviewOwnedByUser(
  review: ProductReviewRecord,
  customerId?: string,
  customerPhone?: string
): boolean {
  const normPhone = (customerPhone || '').replace(/\s+/g, '');
  const revPhone = (review.customerPhone || '').replace(/\s+/g, '');
  if (customerId && review.customerId === customerId) return true;
  if (normPhone && revPhone && revPhone === normPhone) return true;
  return false;
}

export function findExistingUserReview(
  reviews: ProductReviewRecord[],
  customerId?: string,
  customerPhone?: string
): ProductReviewRecord | null {
  return reviews.find((r) => isReviewOwnedByUser(r, customerId, customerPhone)) || null;
}

function readLocalReviews(): ProductReviewRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as ProductReviewRecord[]) : [];
  } catch {
    return [];
  }
}

function writeLocalReviews(reviews: ProductReviewRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    // Ignore storage quota issues
  }
}

export async function getProductReviews(remedyId: string): Promise<ProductReviewRecord[]> {
  const map = new Map<string, ProductReviewRecord>();

  for (const r of readLocalReviews()) {
    if (r.remedyId === remedyId) {
      map.set(r.id, r);
    }
  }

  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true' && remedyId) {
    try {
      const q = query(collection(db, 'reviews'), where('remedyId', '==', remedyId));
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        const data = docSnap.data() as ProductReviewRecord;
        map.set(data.id || docSnap.id, { ...data, id: data.id || docSnap.id });
      });
    } catch {
      // Fallback cleanly to local review store
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getReviewsByCustomer(
  customerId: string,
  customerPhone?: string
): Promise<ProductReviewRecord[]> {
  const normalizedPhone = (customerPhone || '').replace(/\s+/g, '');
  const map = new Map<string, ProductReviewRecord>();

  for (const r of readLocalReviews()) {
    const rPhone = (r.customerPhone || '').replace(/\s+/g, '');
    if (
      (customerId && r.customerId === customerId) ||
      (normalizedPhone && rPhone === normalizedPhone)
    ) {
      map.set(r.id, r);
    }
  }

  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true' && customerId) {
    try {
      const q = query(collection(db, 'reviews'), where('customerId', '==', customerId));
      const snap = await getDocs(q);
      snap.forEach((docSnap) => {
        const data = docSnap.data() as ProductReviewRecord;
        map.set(data.id || docSnap.id, { ...data, id: data.id || docSnap.id });
      });
    } catch {
      // Fallback cleanly to local review store
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function checkVerifiedPurchase(
  remedyId: string,
  customerId?: string,
  customerPhone?: string
): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const orders = JSON.parse(localStorage.getItem('ifaqa_customer_orders') || '[]');
    const normalizedPhone = (customerPhone || '').replace(/\s+/g, '');
    return orders.some((o: any) => {
      const oPhone = (o.customerPhone || '').replace(/\s+/g, '');
      const ownerMatch =
        (customerId && o.customerId === customerId) ||
        (normalizedPhone && oPhone === normalizedPhone);
      const itemMatch =
        Array.isArray(o.items) && o.items.some((item: any) => item.remedyId === remedyId);
      return ownerMatch && itemMatch;
    });
  } catch {
    return false;
  }
}

export async function submitProductReview(input: {
  remedyId: string;
  remedySlug: string;
  remedyName: string;
  remedyImage?: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  rating: number;
  title: string;
  comment: string;
}): Promise<ProductReviewRecord> {
  const newReview: ProductReviewRecord = {
    id: `rev_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
    remedyId: input.remedyId,
    remedySlug: input.remedySlug,
    remedyName: input.remedyName,
    remedyImage: input.remedyImage || '',
    customerId: input.customerId,
    customerName: input.customerName.trim() || 'IFAQA Customer',
    customerPhone: input.customerPhone || '',
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    title: input.title.trim(),
    comment: input.comment.trim(),
    verifiedPurchase: checkVerifiedPurchase(
      input.remedyId,
      input.customerId,
      input.customerPhone
    ),
    approved: true,
    createdAt: new Date().toISOString(),
  };

  const existing = readLocalReviews();
  const duplicate = existing.find(
    (r) =>
      r.remedyId === input.remedyId &&
      isReviewOwnedByUser(r, input.customerId, input.customerPhone)
  );
  if (duplicate) {
    throw new Error(
      'You have already reviewed this product. Please edit or delete your existing review.'
    );
  }

  writeLocalReviews([newReview, ...existing]);

  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
    try {
      await setDoc(doc(db, 'reviews', newReview.id), newReview);
    } catch {
      // Saved reliably to local review repository
    }
  }

  return newReview;
}

export async function updateProductReview(
  reviewId: string,
  updates: { rating: number; title: string; comment: string }
): Promise<ProductReviewRecord | null> {
  const existing = readLocalReviews();
  let updatedRecord: ProductReviewRecord | null = null;
  const next = existing.map((item) => {
    if (item.id === reviewId) {
      updatedRecord = {
        ...item,
        rating: Math.min(5, Math.max(1, Math.round(updates.rating))),
        title: updates.title.trim(),
        comment: updates.comment.trim(),
      };
      return updatedRecord;
    }
    return item;
  });
  writeLocalReviews(next);

  if (updatedRecord && db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
    try {
      await setDoc(doc(db, 'reviews', reviewId), updatedRecord);
    } catch {
      // Updated in local review store
    }
  }

  return updatedRecord;
}

export async function deleteProductReview(reviewId: string): Promise<void> {
  const existing = readLocalReviews();
  writeLocalReviews(existing.filter((r) => r.id !== reviewId));

  if (db && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch {
      // Deleted cleanly from local store
    }
  }
}

export function computeRatingBreakdown(reviews: ProductReviewRecord[]) {
  const count = reviews.length;
  if (count === 0) {
    return {
      average: 0,
      count: 0,
      distribution: [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percent: 0 })),
    };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = Math.round((sum / count) * 10) / 10;
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const matching = reviews.filter((r) => r.rating === star).length;
    return {
      star,
      count: matching,
      percent: Math.round((matching / count) * 100),
    };
  });

  return { average, count, distribution };
}
