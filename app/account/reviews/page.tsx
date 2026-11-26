'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Leaf,
  AlertCircle,
} from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import {
  ProductReviewRecord,
  getReviewsByCustomer,
  updateProductReview,
  deleteProductReview,
} from '@/lib/reviews-service';
import { StarRatingDisplay } from '@/components/remedy/ProductReviewsSection';
import { Button3D } from '@/components/ui/Button3D';

export default function AccountReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ProductReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editTitle, setEditTitle] = useState('');
  const [editComment, setEditComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!user) {
        if (mounted) setLoading(false);
        return;
      }
      setLoading(true);
      const list = await getReviewsByCustomer(user.uid, user.phoneNumber);
      if (mounted) {
        setReviews(list);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [user]);

  const startEdit = (rev: ProductReviewRecord) => {
    setError(null);
    setEditingId(rev.id);
    setEditRating(rev.rating);
    setEditTitle(rev.title);
    setEditComment(rev.comment);
  };

  const handleSaveEdit = async (e: React.FormEvent, reviewId: string) => {
    e.preventDefault();
    setError(null);
    if (editTitle.trim().length < 3 || editComment.trim().length < 10) {
      setError('Review headline and comment must be complete.');
      return;
    }

    const updated = await updateProductReview(reviewId, {
      rating: editRating,
      title: editTitle,
      comment: editComment,
    });
    if (updated) {
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
    }
    setEditingId(null);
  };

  const handleDelete = async (reviewId: string) => {
    await deleteProductReview(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  return (
    <AccountShell
      title="My Reviews"
      subtitle="View, update, or remove all product ratings and written reviews you have posted."
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[#5A6962] tabular-nums">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} submitted
        </span>
        <Link
          href="/catalog"
          className="h-9 px-4 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/15 hover:bg-[#EDE5D5] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Review another product</span>
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 h-36 animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-10 text-center shadow-luxury-card space-y-4">
          <div className="w-12 h-12 rounded-xl bg-ifaqa-cashmere text-[#5A6962] flex items-center justify-center mx-auto">
            <Star className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl text-ifaqa-plum">No product reviews yet</h2>
            <p className="text-sm text-[#5A6962] max-w-md mx-auto">
              Visit any remedy product page to rate it and share your feedback. Every review you post will appear here.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-medium transition-colors"
          >
            Browse products to review
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => {
            const isEditing = editingId === rev.id;
            return (
              <div
                key={rev.id}
                className="bg-white rounded-xl border border-ifaqa-plum/10 p-5 sm:p-6 shadow-luxury-card space-y-4"
              >
                {/* Product Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-ifaqa-plum/10">
                  <Link
                    href={`/remedy/${rev.remedySlug || rev.remedyId}`}
                    className="flex items-center gap-3 group min-w-0"
                  >
                    <div className="relative w-11 h-11 rounded-lg bg-white border border-ifaqa-plum/10 overflow-hidden shrink-0 flex items-center justify-center">
                      {rev.remedyImage ? (
                        <Image
                          src={rev.remedyImage}
                          alt={rev.remedyName}
                          fill
                          sizes="44px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <Leaf className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-ifaqa-plum group-hover:underline block truncate">
                        {rev.remedyName}
                      </span>
                      <span className="text-xs text-[#5A6962]">
                        Reviewed on{' '}
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>

                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#E8F3EE] text-[#165A45] text-[11px] font-medium">
                      <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
                      Verified purchase
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={(e) => handleSaveEdit(e, rev.id)} className="space-y-4">
                    {error && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-700" strokeWidth={1.5} />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className="p-1 rounded hover:bg-ifaqa-cashmere"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              editRating >= star
                                ? 'fill-[#C5A059] text-[#C5A059]'
                                : 'fill-transparent text-ifaqa-plum/25'
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum"
                    />

                    <textarea
                      rows={3}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="w-full p-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum resize-none"
                    />

                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="h-9 px-3 rounded-lg text-xs text-[#5A6962] hover:text-ifaqa-plum"
                      >
                        Cancel
                      </button>
                      <Button3D type="submit" variant="primary" size="sm">
                        Save review
                      </Button3D>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <StarRatingDisplay rating={rev.rating} size="sm" />
                      <h3 className="text-sm font-semibold text-ifaqa-plum">{rev.title}</h3>
                    </div>
                    <p className="text-sm text-[#3E524A] leading-relaxed">{rev.comment}</p>

                    <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => startEdit(rev)}
                          className="text-ifaqa-plum hover:underline font-medium inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(rev.id)}
                          className="text-[#5A6962] hover:text-red-700 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Delete</span>
                        </button>
                      </div>

                      <Link
                        href={`/remedy/${rev.remedySlug || rev.remedyId}#customer-reviews`}
                        className="text-[#165A45] font-medium hover:underline"
                      >
                        View on product page →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AccountShell>
  );
}
