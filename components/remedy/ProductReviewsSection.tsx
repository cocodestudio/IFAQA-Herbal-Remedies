'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquarePlus,
  Edit3,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  ProductReviewRecord,
  submitProductReview,
  updateProductReview,
  deleteProductReview,
  computeRatingBreakdown,
  getGuestReviewerId,
  findExistingUserReview,
} from '@/lib/reviews-service';
import { Button3D } from '@/components/ui/Button3D';

interface ProductReviewsSectionProps {
  remedyId: string;
  remedySlug: string;
  remedyName: string;
  remedyImage?: string;
  reviews: ProductReviewRecord[];
  onReviewAdded: (review: ProductReviewRecord) => void;
  onReviewUpdated: (review: ProductReviewRecord) => void;
  onReviewDeleted: (reviewId: string) => void;
}

const STAR_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very good',
  5: 'Excellent',
};

export function StarRatingDisplay({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'md';
}) {
  const iconCls = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star - 0.25;
        return (
          <Star
            key={star}
            className={`${iconCls} ${
              filled
                ? 'fill-[#C5A059] text-[#C5A059]'
                : 'fill-transparent text-ifaqa-plum/20'
            }`}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

export function ProductReviewsSection({
  remedyId,
  remedySlug,
  remedyName,
  remedyImage,
  reviews,
  onReviewAdded,
  onReviewUpdated,
  onReviewDeleted,
}: ProductReviewsSectionProps) {
  const { user, isAuthenticated } = useAuth();

  const [guestId, setGuestId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);
  const [selectedStar, setSelectedStar] = useState(5);
  const [hoverStar, setHoverStar] = useState(0);
  const [reviewerName, setReviewerName] = useState('');
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  useEffect(() => {
    setGuestId(getGuestReviewerId());
  }, []);

  const reviewerId = user?.uid || guestId;
  const reviewerPhone = user?.phoneNumber;

  const existingUserReview = useMemo(
    () => findExistingUserReview(reviews, reviewerId, reviewerPhone),
    [reviews, reviewerId, reviewerPhone]
  );

  const summary = useMemo(() => computeRatingBreakdown(reviews), [reviews]);

  const handleOpenCreateForm = () => {
    if (existingUserReview) {
      handleOpenEditForm(existingUserReview);
      return;
    }
    setError(null);
    setStatusBanner(null);
    setIsEditingExisting(false);
    setSelectedStar(5);
    setHeadline('');
    setComment('');
    if (isAuthenticated && user?.displayName && user.displayName !== 'Customer' && !reviewerName) {
      setReviewerName(user.displayName);
    }
    setShowForm(true);
  };

  const handleOpenEditForm = (rev: ProductReviewRecord) => {
    setError(null);
    setStatusBanner(null);
    setIsEditingExisting(true);
    setSelectedStar(rev.rating);
    setReviewerName(rev.customerName);
    setHeadline(rev.title);
    setComment(rev.comment);
    setShowForm(true);
  };

  const handleDeleteOwnReview = async (revId: string) => {
    await deleteProductReview(revId);
    onReviewDeleted(revId);
    setShowForm(false);
    setIsEditingExisting(false);
    setStatusBanner('Your review has been removed. You can post a new review anytime.');
    setTimeout(() => setStatusBanner(null), 3200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (headline.trim().length < 3) {
      setError('Enter a short review headline.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Write at least 10 characters sharing your experience with this product.');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditingExisting && existingUserReview) {
        const updated = await updateProductReview(existingUserReview.id, {
          rating: selectedStar,
          title: headline,
          comment,
        });
        if (updated) {
          onReviewUpdated(updated);
        }
        setShowForm(false);
        setIsEditingExisting(false);
        setStatusBanner('Your review has been updated.');
      } else {
        const effectiveName =
          reviewerName.trim() ||
          (user?.displayName && user.displayName !== 'Customer' ? user.displayName : '');

        if (effectiveName.length < 2) {
          setError('Enter your name to display alongside your review.');
          setSubmitting(false);
          return;
        }

        const created = await submitProductReview({
          remedyId,
          remedySlug,
          remedyName,
          remedyImage,
          customerId: reviewerId || getGuestReviewerId(),
          customerName: effectiveName,
          customerPhone: reviewerPhone,
          rating: selectedStar,
          title: headline,
          comment,
        });

        onReviewAdded(created);
        setHeadline('');
        setComment('');
        setSelectedStar(5);
        setShowForm(false);
        setStatusBanner('Thank you! Your review has been published.');
      }

      setTimeout(() => setStatusBanner(null), 3400);
    } catch (err: any) {
      setError(err?.message || 'Unable to save your review right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="customer-reviews"
      className="pt-10 border-t border-ifaqa-plum/10 space-y-6 select-none scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-xs font-sans text-[#5A6962]">Product feedback</p>
          <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
            Customer reviews
          </h2>
        </div>

        {!showForm && !existingUserReview && (
          <button
            type="button"
            onClick={handleOpenCreateForm}
            className="h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-xs font-sans font-medium inline-flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" strokeWidth={1.5} />
            <span>Write a customer review</span>
          </button>
        )}
      </div>

      {/* Aligned 5/7 Grid matching PDP Gallery/BuyBox vertical column alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-12 items-stretch">
        {/* Left Summary Column (5 cols — aligned cleanly with Gallery above) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card flex flex-col justify-between space-y-5">
          <div className="space-y-5">
            {summary.count > 0 ? (
              <div className="space-y-1.5 pb-4 border-b border-ifaqa-plum/10">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <StarRatingDisplay rating={summary.average} size="md" />
                  <span className="font-serif text-2xl text-ifaqa-plum tabular-nums">
                    {summary.average.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-xs text-[#5A6962] tabular-nums">
                  Based on {summary.count} {summary.count === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 pb-4 border-b border-ifaqa-plum/10">
                <div className="flex items-center gap-2">
                  <StarRatingDisplay rating={0} size="md" />
                  <span className="text-sm font-medium text-ifaqa-plum">No ratings yet</span>
                </div>
                <p className="text-xs text-[#5A6962]">
                  Be the first customer to share feedback for {remedyName}.
                </p>
              </div>
            )}

            {/* 5-Star Histogram Bars */}
            <div className="space-y-2.5 text-xs">
              {summary.distribution.map((row) => (
                <div key={row.star} className="flex items-center gap-3">
                  <span className="w-11 font-mono text-[#5A6962] tabular-nums shrink-0">
                    {row.star} star
                  </span>
                  <div className="flex-1 h-2.5 rounded bg-ifaqa-linen border border-ifaqa-plum/10 overflow-hidden">
                    <div
                      className="h-full bg-[#C5A059] transition-all duration-300"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-9 text-end font-mono text-[#5A6962] tabular-nums shrink-0">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Area inside Left Card */}
          <div className="pt-4 border-t border-ifaqa-plum/10 space-y-2.5">
            {existingUserReview ? (
              <>
                <h3 className="text-sm font-semibold text-ifaqa-plum">
                  Review submitted
                </h3>
                <p className="text-xs text-[#5A6962] leading-relaxed">
                  One review is allowed per product. Use Edit or Delete on your review card to update it anytime.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-sm font-semibold text-ifaqa-plum">Review this product</h3>
                <p className="text-xs text-[#5A6962] leading-relaxed">
                  Share your experience with dosage, taste, and packaging to help other customers.
                </p>
                {!showForm && (
                  <button
                    type="button"
                    onClick={handleOpenCreateForm}
                    className="w-full h-10 rounded-lg bg-white border border-ifaqa-plum/15 hover:bg-ifaqa-cashmere text-ifaqa-plum text-xs font-medium transition-colors"
                  >
                    Write a review
                  </button>
                )}
              </>
            )}

            {isAuthenticated && (
              <Link
                href="/account/reviews"
                className="block text-center text-xs font-medium text-[#165A45] hover:underline pt-1"
              >
                View all your reviews in Account →
              </Link>
            )}
          </div>
        </div>

        {/* Right Feed & Interactive Review Form (7 cols — matching Buy Box above) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {statusBanner && (
            <div className="p-4 rounded-xl bg-[#E8F3EE] border border-[#165A45]/20 text-[#165A45] text-xs font-medium flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                <span>{statusBanner}</span>
              </div>
              {isAuthenticated && (
                <Link href="/account/reviews" className="underline font-semibold shrink-0">
                  My Reviews
                </Link>
              )}
            </div>
          )}

          {/* Create or Edit Review Form */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-ifaqa-plum/15 p-6 shadow-luxury-card space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-ifaqa-plum/10">
                <h3 className="font-serif text-xl text-ifaqa-plum">
                  {isEditingExisting ? `Edit your review for ${remedyName}` : `Rate ${remedyName}`}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditingExisting(false);
                  }}
                  className="text-xs text-[#5A6962] hover:text-ifaqa-plum underline"
                >
                  Cancel
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-700 shrink-0" strokeWidth={1.5} />
                  <span>{error}</span>
                </div>
              )}

              {/* Star Selector */}
              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-2">
                  Overall rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverStar || selectedStar) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverStar(star)}
                        onMouseLeave={() => setHoverStar(0)}
                        onClick={() => setSelectedStar(star)}
                        aria-label={`Rate ${star} stars`}
                        className="p-1.5 rounded-lg hover:bg-ifaqa-cashmere transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            active
                              ? 'fill-[#C5A059] text-[#C5A059]'
                              : 'fill-transparent text-ifaqa-plum/25'
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-medium text-[#5A6962] ms-2">
                    {STAR_LABELS[hoverStar || selectedStar]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {!isEditingExisting && (
                  <div>
                    <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                      Your name *
                    </label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="e.g. Imran Khan"
                      className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
                    />
                  </div>
                )}

                <div className={isEditingExisting ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                    Review headline *
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="What should other buyers know?"
                    className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  Written review *
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share how this formulation worked for you, packaging quality, and delivery experience..."
                  className="w-full p-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white resize-none"
                />
              </div>

              {!isAuthenticated && !isEditingExisting && (
                <p className="text-xs text-[#5A6962]">
                  Want to manage all your reviews from your profile?{' '}
                  <Link href="/sign-in" className="text-ifaqa-plum font-medium underline">
                    Sign in with mobile OTP
                  </Link>
                </p>
              )}

              <div className="flex justify-end gap-3">
                <Button3D type="submit" variant="primary" size="md" disabled={submitting}>
                  {submitting
                    ? 'Saving...'
                    : isEditingExisting
                    ? 'Update review'
                    : 'Submit review'}
                </Button3D>
              </div>
            </form>
          )}

          {/* Review Feed (Stretches neatly to balance Left Card height when empty) */}
          {reviews.length === 0 ? (
            <div className="flex-1 bg-white rounded-xl border border-ifaqa-plum/10 p-8 shadow-luxury-card flex flex-col items-center justify-center text-center space-y-2.5 min-h-[260px]">
              <div className="w-11 h-11 rounded-xl bg-ifaqa-cashmere text-[#5A6962] flex items-center justify-center">
                <Star className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="font-serif text-xl text-ifaqa-plum">No customer reviews yet</p>
              <p className="text-xs text-[#5A6962] max-w-sm leading-relaxed">
                Customers who review {remedyName} will appear here alongside their rating and verification status.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => {
                const isOwn = existingUserReview?.id === rev.id;
                return (
                  <article
                    key={rev.id}
                    className={`bg-white rounded-xl border p-5 sm:p-6 shadow-luxury-card space-y-2.5 ${
                      isOwn ? 'border-ifaqa-plum/25' : 'border-ifaqa-plum/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="w-7 h-7 rounded-md bg-ifaqa-cashmere text-ifaqa-plum text-xs font-semibold flex items-center justify-center uppercase">
                          {rev.customerName.charAt(0)}
                        </span>
                        <span className="text-xs font-semibold text-ifaqa-plum">
                          {rev.customerName}
                        </span>
                        {isOwn && (
                          <span className="px-2 py-0.5 rounded bg-ifaqa-cashmere text-ifaqa-plum text-[11px] font-medium">
                            Your review
                          </span>
                        )}
                        {rev.verifiedPurchase && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8F3EE] text-[#165A45] text-[11px] font-medium">
                            <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
                            Verified purchase
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#5A6962]">
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <StarRatingDisplay rating={rev.rating} size="sm" />
                      <h4 className="text-sm font-semibold text-ifaqa-plum">{rev.title}</h4>
                    </div>

                    <p className="text-sm text-[#3E524A] leading-relaxed">{rev.comment}</p>

                    {isOwn && !showForm && (
                      <div className="pt-2 border-t border-ifaqa-plum/10 flex items-center gap-4 text-xs">
                        <button
                          type="button"
                          onClick={() => handleOpenEditForm(rev)}
                          className="text-ifaqa-plum hover:underline font-medium inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteOwnReview(rev.id)}
                          className="text-[#5A6962] hover:text-red-700 inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
