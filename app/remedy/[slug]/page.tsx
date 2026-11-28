'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import seedData from '@/lib/seed-data.json';
import { getRemedyBySlug, getRemediesByCategory } from '@/lib/remedies-service';
import { HerbalRemedy } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { BotanicalIngredientsTable } from '@/components/remedy/BotanicalIngredientsTable';
import { DosageGuide } from '@/components/remedy/DosageGuide';
import { RemedyGallery } from '@/components/remedy/RemedyGallery';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { PDPSkeleton } from '@/components/ui/ShimmerSkeleton';
import { formatPriceINR } from '@/lib/formatters';
import { triggerNavigationProgress } from '@/lib/nav-progress';
import {
  ProductReviewsSection,
  StarRatingDisplay,
} from '@/components/remedy/ProductReviewsSection';
import {
  ProductReviewRecord,
  getProductReviews,
  computeRatingBreakdown,
} from '@/lib/reviews-service';
import {
  ShoppingBag,
  Zap,
  Minus,
  Plus,
  ShieldCheck,
  Leaf,
  Check,
  Truck,
  RotateCcw,
  MapPin,
  CheckCircle2,
  Award,
} from 'lucide-react';

export default function RemedyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const rawSlug = typeof params?.slug === 'string' ? params.slug.trim() : '';

  const [remedy, setRemedy] = useState<HerbalRemedy | null>(() => {
    if (!rawSlug) return null;
    const clean = rawSlug.toLowerCase().trim();
    return (seedData.remedies as unknown as HerbalRemedy[]).find(
      r => r.slug === clean || r.id === clean
    ) || null;
  });

  const [relatedRemedies, setRelatedRemedies] = useState<HerbalRemedy[]>(() => {
    if (!rawSlug) return [];
    const clean = rawSlug.toLowerCase().trim();
    const matched = (seedData.remedies as unknown as HerbalRemedy[]).find(
      r => r.slug === clean || r.id === clean
    );
    if (!matched) return [];
    return (seedData.remedies as unknown as HerbalRemedy[])
      .filter(r => r.categoryId === matched.categoryId && r.id !== matched.id)
      .slice(0, 4);
  });

  const [loading, setLoading] = useState(() => !remedy);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'dosage' | 'faq'>('overview');
  const [addedToast, setAddedToast] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [reviews, setReviews] = useState<ProductReviewRecord[]>([]);

  const { addToCart } = useCart();
  const { t, getRemedyTitle, getRemedySubtitle, getCategoryTitle } = useLanguage();

  useEffect(() => {
    async function load() {
      const data = await getRemedyBySlug(rawSlug);
      if (!data) {
        setLoading(false);
        return;
      }
      setRemedy(data);
      const [related, prodReviews] = await Promise.all([
        getRemediesByCategory(data.categoryId),
        getProductReviews(data.id),
      ]);
      setRelatedRemedies(related.filter(r => r.id !== data.id).slice(0, 4));
      setReviews(prodReviews);
      setLoading(false);
    }
    load();
  }, [rawSlug]);

  if (loading) {
    return <PDPSkeleton />;
  }

  if (!remedy) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 text-center space-y-4 select-none">
        <p className="text-xs font-sans text-[#5A6962]">{t('catalog')}</p>
        <h1 className="font-serif font-normal text-3xl text-ifaqa-plum">Product not found</h1>
        <p className="text-sm text-[#5A6962] max-w-md mx-auto">
          This remedy could not be found in our active catalog.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen text-sm font-sans font-medium hover:bg-ifaqa-blackberry transition-colors"
        >
          Return to catalog
        </Link>
      </div>
    );
  }

  const isAvailable = remedy.isAvailable && remedy.stockQuantity > 0;
  const displayTitle = getRemedyTitle(remedy);
  const displaySubtitle = getRemedySubtitle(remedy);
  const displayCategory = getCategoryTitle({ id: remedy.categoryId, name: remedy.categoryName });

  const mrpPrice = remedy.comparePricePKR || Math.round(remedy.pricePKR * 1.25);
  const savingsAmount = mrpPrice - remedy.pricePKR;
  const savingsPercent = Math.round((savingsAmount / mrpPrice) * 100);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(remedy, selectedQuantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addToCart(remedy, selectedQuantity);
    triggerNavigationProgress('/checkout');
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 5) {
      setDeliveryChecked(true);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 space-y-10 select-none">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-sans text-[#5A6962] border-b border-ifaqa-plum/10 pb-3">
        <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
        <span aria-hidden="true">/</span>
        <Link href="/catalog" className="hover:text-ifaqa-plum transition-colors">{t('catalog')}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/catalog/${remedy.categoryId}`} className="hover:text-ifaqa-plum transition-colors">{displayCategory}</Link>
        <span aria-hidden="true">/</span>
        <span className="text-ifaqa-plum font-medium truncate max-w-[280px]">{displayTitle}</span>
      </nav>

      {/* Main Layout: Mobile (Image -> Title & Price/CTA -> Trust Icons & Info); Desktop (Balanced 5/7 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-12 lg:gap-y-6 items-start">
        {/* Block 1: Borderless Image Gallery (Mobile #1, Desktop Top-Left) */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <RemedyGallery
            primaryImage={remedy.primaryImage}
            images={remedy.images}
            remedyName={displayTitle}
            urduName={remedy.urduName}
          />
        </div>

        {/* Block 2: Title, Price Box, Action Controls & Specs (Mobile #2 right below Image, Desktop Right Column) */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 space-y-6">
          <div className="space-y-2.5 border-b border-ifaqa-plum/10 pb-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-sans text-[#5A6962]">
                {displayCategory}
              </span>
              <span className="text-xs font-sans font-medium bg-ifaqa-cashmere text-ifaqa-plum px-2.5 py-0.5 rounded border border-ifaqa-plum/10">
                {remedy.isBestSeller ? t('bestSellerBadge') : remedy.form}
              </span>
            </div>

            <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum leading-tight">
              {displayTitle}
            </h1>

            <p className="text-sm font-sans text-[#5A6962]">
              {displaySubtitle}{remedy.packaging?.size ? ` · ${remedy.packaging.size}` : ''}
            </p>

            {/* Amazon-Style Top Rating Summary Link */}
            <a
              href="#customer-reviews"
              className="inline-flex items-center gap-2 pt-1 text-xs font-sans text-ifaqa-plum hover:text-ifaqa-blackberry transition-colors group"
            >
              {(() => {
                const stats = computeRatingBreakdown(reviews);
                if (stats.count > 0) {
                  return (
                    <>
                      <span className="font-mono font-semibold tabular-nums">
                        {stats.average.toFixed(1)}
                      </span>
                      <StarRatingDisplay rating={stats.average} size="sm" />
                      <span className="text-[#165A45] group-hover:underline font-medium tabular-nums">
                        ({stats.count} {stats.count === 1 ? 'review' : 'reviews'})
                      </span>
                    </>
                  );
                }
                return (
                  <>
                    <StarRatingDisplay rating={0} size="sm" />
                    <span className="text-[#165A45] group-hover:underline font-medium">
                      Be the first to review
                    </span>
                  </>
                );
              })()}
            </a>
          </div>

          {/* Clean Buy Box */}
          <div className="bg-white rounded-xl border border-ifaqa-plum/15 p-5 sm:p-6 space-y-5 shadow-luxury-card">
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-3 flex-wrap tabular-nums">
                <span className="font-sans text-3xl font-semibold text-ifaqa-plum">
                  {formatPriceINR(remedy.pricePKR)}
                </span>
                {savingsPercent > 0 && (
                  <>
                    <span className="text-sm text-[#5A6962] line-through font-mono">
                      MRP {formatPriceINR(mrpPrice)}
                    </span>
                    <span className="text-xs font-medium text-[#165A45] bg-[#E8F3EE] px-2 py-0.5 rounded">
                      Save {savingsPercent}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-[#5A6962] font-sans">
                Inclusive of all taxes · Pan-India courier dispatch
              </p>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-ifaqa-plum/10">
              <span className={`text-sm font-sans font-medium flex items-center gap-2 ${isAvailable ? 'text-[#165A45]' : 'text-red-700'}`}>
                <span className={`w-2 h-2 rounded-sm ${isAvailable ? 'bg-[#165A45]' : 'bg-red-700'}`} />
                {isAvailable ? 'In stock' : t('outOfStock')}
              </span>
              <span className="text-xs text-[#5A6962] block mt-0.5">
                Dispatched from Saharanpur, Uttar Pradesh
              </span>
            </div>

            {/* Pincode Estimator */}
            <div className="pt-4 border-t border-ifaqa-plum/10">
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-[#5A6962] absolute start-3 top-1/2 -translate-y-1/2" strokeWidth={1.5} />
                  <input
                    type="text"
                    dir="ltr"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode (e.g. 110001)"
                    maxLength={6}
                    className="w-full h-10 ps-9 pe-3 rounded-lg text-xs font-mono border border-ifaqa-plum/15 bg-ifaqa-linen text-ifaqa-plum focus:outline-none focus:border-ifaqa-plum focus:bg-white tabular-nums"
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 px-4 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/15 hover:bg-[#EDE5D5] text-xs font-sans font-medium transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryChecked && (
                <p className="text-xs text-[#165A45] font-sans font-medium mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  <span>Delivery to {pincode} available in 2 to 4 business days</span>
                </p>
              )}
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="pt-4 border-t border-ifaqa-plum/10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-sans text-[#5A6962]">
                  Quantity
                </span>
                <div className="flex items-center rounded-lg border border-ifaqa-plum/15 bg-white">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    disabled={!isAvailable || selectedQuantity <= 1}
                    className="w-9 h-9 flex items-center justify-center text-ifaqa-plum hover:bg-ifaqa-cashmere disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <span className="w-9 text-center font-mono text-sm font-medium text-ifaqa-plum tabular-nums">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity(Math.min(remedy.stockQuantity || 10, selectedQuantity + 1))}
                    disabled={!isAvailable || selectedQuantity >= (remedy.stockQuantity || 10)}
                    className="w-9 h-9 flex items-center justify-center text-ifaqa-plum hover:bg-ifaqa-cashmere disabled:opacity-30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className={`h-11 px-6 rounded-lg text-sm font-sans font-medium flex items-center justify-center gap-2 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                    addedToast
                      ? 'bg-[#165A45] text-white'
                      : 'bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" strokeWidth={1.5} />
                      <span>{t('addedToCart')}</span>
                    </>
                  ) : isAvailable ? (
                    <>
                      <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                      <span>{t('addToCart')}</span>
                    </>
                  ) : (
                    <span>{t('outOfStock')}</span>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!isAvailable}
                  className="h-11 px-6 rounded-lg text-sm font-sans font-medium flex items-center justify-center gap-2 bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/20 hover:bg-[#EDE5D5] active:scale-[0.98] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4" strokeWidth={1.5} />
                  <span>Buy now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-5 sm:p-6 space-y-3 shadow-luxury-card">
            <h3 className="font-sans text-sm font-semibold text-ifaqa-plum border-b border-ifaqa-plum/10 pb-2.5">
              Product specifications
            </h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm font-sans">
              <div className="text-[#5A6962]">Preparation form</div>
              <div className="font-medium text-ifaqa-plum">{remedy.form}</div>

              <div className="text-[#5A6962]">Net weight / pack</div>
              <div className="font-medium text-ifaqa-plum">{remedy.packaging?.size || 'Standard'}</div>

              <div className="text-[#5A6962]">Container</div>
              <div className="font-medium text-ifaqa-plum">{remedy.packaging?.containerType || 'Sealed Jar'}</div>

              <div className="text-[#5A6962]">Health focus</div>
              <div className="font-medium text-ifaqa-plum">{displayCategory}</div>

              <div className="text-[#5A6962]">Consume with</div>
              <div className="font-medium text-ifaqa-plum">{remedy.dosageInstructions?.anupana || 'Lukewarm water'}</div>

              <div className="text-[#5A6962]">Origin</div>
              <div className="font-medium text-ifaqa-plum">Saharanpur, India</div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-5 sm:p-6 space-y-3 shadow-luxury-card">
            <h3 className="font-sans text-sm font-semibold text-ifaqa-plum border-b border-ifaqa-plum/10 pb-2.5">
              About this remedy
            </h3>
            <ul className="space-y-2 text-sm font-sans text-[#3E524A] list-disc ps-5 leading-relaxed">
              <li>{remedy.shortDescription}</li>
              <li>Prepared from whole dried botanical roots, seeds, and honey without synthetic binders.</li>
              <li>Recommended usage: {remedy.dosageInstructions?.amount} {remedy.dosageInstructions?.timing}.</li>
            </ul>
          </div>
        </div>

        {/* Block 3: Trust Badges, Preparation Standards & Dispatch (Mobile #3 after Purchase Details, Desktop Below Image) */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2 space-y-5">
          {/* 4-Item Trust Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-white border border-ifaqa-plum/10 space-y-1">
              <Truck className="w-4 h-4 mx-auto text-[#5A6962]" strokeWidth={1.5} />
              <span className="text-xs font-medium text-ifaqa-plum block">Pan-India</span>
              <span className="text-xs text-[#5A6962] block">Courier</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-ifaqa-plum/10 space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#5A6962]" strokeWidth={1.5} />
              <span className="text-xs font-medium text-ifaqa-plum block">Zero fillers</span>
              <span className="text-xs text-[#5A6962] block">Herbal only</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-ifaqa-plum/10 space-y-1">
              <RotateCcw className="w-4 h-4 mx-auto text-[#5A6962]" strokeWidth={1.5} />
              <span className="text-xs font-medium text-ifaqa-plum block">Sealed jar</span>
              <span className="text-xs text-[#5A6962] block">Replacement</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-ifaqa-plum/10 space-y-1">
              <Award className="w-4 h-4 mx-auto text-[#5A6962]" strokeWidth={1.5} />
              <span className="text-xs font-medium text-ifaqa-plum block">Small batch</span>
              <span className="text-xs text-[#5A6962] block">Saharanpur</span>
            </div>
          </div>

          {/* Quality & Formulation Card */}
          <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-5 space-y-3 shadow-luxury-card">
            <div className="flex items-center justify-between border-b border-ifaqa-plum/10 pb-2.5">
              <h4 className="font-sans text-xs font-medium text-ifaqa-plum flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#165A45]" strokeWidth={1.5} />
                <span>Preparation standards</span>
              </h4>
              <span className="text-xs font-mono text-[#165A45] bg-ifaqa-cashmere px-2 py-0.5 rounded">
                Verified batch
              </span>
            </div>
            <ul className="space-y-2 text-xs text-[#3E524A] font-sans">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#165A45] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Whole dried roots, seeds, and natural resins compounded in small batches.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#165A45] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Zero chemical steroids, artificial sweeteners, or synthetic coloring.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#165A45] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Packed fresh inside UV-shielded tamper-proof containers.</span>
              </li>
            </ul>
          </div>

          {/* Storage & Dispatch Card */}
          <div className="bg-ifaqa-cashmere/70 rounded-xl border border-ifaqa-plum/10 p-5 space-y-3 text-xs font-sans">
            <h4 className="font-medium text-ifaqa-plum flex items-center gap-2 border-b border-ifaqa-plum/10 pb-2">
              <Leaf className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
              <span>Storage and dispatch</span>
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              <div>
                <span className="text-[#5A6962] block">Storage</span>
                <span className="font-medium text-ifaqa-plum">Cool, dry place away from sun</span>
              </div>
              <div>
                <span className="text-[#5A6962] block">Shelf life</span>
                <span className="font-medium text-ifaqa-plum">24 months from batch date</span>
              </div>
              <div>
                <span className="text-[#5A6962] block">Dispatch</span>
                <span className="font-medium text-ifaqa-plum">Within 24 hours</span>
              </div>
              <div>
                <span className="text-[#5A6962] block">Prepared in</span>
                <span className="font-medium text-ifaqa-plum">Saharanpur, U.P., India</span>
              </div>
            </div>
          </div>

          {/* Direct Support */}
          <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-4 flex items-center justify-between gap-3">
            <div className="space-y-0.5 min-w-0">
              <span className="text-xs font-medium text-ifaqa-plum block">
                Questions about usage or dosage
              </span>
              <span className="text-xs text-[#5A6962] font-mono block tabular-nums" dir="ltr">
                +91 97298 40336 (Mon–Sat)
              </span>
            </div>
            <Link
              href="/contact"
              className="h-9 px-4 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/15 hover:bg-[#EDE5D5] text-xs font-sans font-medium inline-flex items-center shrink-0 whitespace-nowrap transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Extended Details Tabs (Horizontal scroll without scrollbar thumb) */}
      <div className="pt-8 border-t border-ifaqa-plum/10">
        <div className="flex border-b border-ifaqa-plum/10 overflow-x-auto no-scrollbar gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-ifaqa-plum text-ifaqa-plum'
                : 'border-transparent text-[#5A6962] hover:text-ifaqa-plum'
            }`}
          >
            Summary & benefits
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`py-3 px-4 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-ifaqa-plum text-ifaqa-plum'
                : 'border-transparent text-[#5A6962] hover:text-ifaqa-plum'
            }`}
          >
            Botanical ingredients
          </button>
          <button
            onClick={() => setActiveTab('dosage')}
            className={`py-3 px-4 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'dosage'
                ? 'border-ifaqa-plum text-ifaqa-plum'
                : 'border-transparent text-[#5A6962] hover:text-ifaqa-plum'
            }`}
          >
            Dosage guide
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3 px-4 text-sm font-sans font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-ifaqa-plum text-ifaqa-plum'
                : 'border-transparent text-[#5A6962] hover:text-ifaqa-plum'
            }`}
          >
            Safety & FAQ
          </button>
        </div>

        <div className="pt-6">
          {activeTab === 'overview' && (
            <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 sm:p-8 space-y-6 shadow-luxury-card">
              <div>
                <h3 className="font-serif font-normal text-2xl text-ifaqa-plum mb-3">
                  Overview and formulation purpose
                </h3>
                <p className="text-sm font-sans text-[#3E524A] leading-relaxed max-w-3xl">
                  {remedy.longDescription}
                </p>
              </div>

              <div>
                <h4 className="font-sans text-xs font-medium text-[#5A6962] mb-3">
                  Targeted wellness areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {remedy.therapeuticIndications.map((ind, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#165A45] shrink-0" strokeWidth={1.5} />
                      <span className="text-sm font-sans text-ifaqa-plum">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 sm:p-8 space-y-4 shadow-luxury-card">
              <div>
                <h3 className="font-serif font-normal text-2xl text-ifaqa-plum mb-1">
                  Botanical composition
                </h3>
                <p className="text-sm text-[#5A6962] font-sans mb-4">
                  Prepared using cleaned natural botanical roots, seeds, and distillates.
                </p>
              </div>
              <BotanicalIngredientsTable ingredients={remedy.herbalIngredients} />
            </div>
          )}

          {activeTab === 'dosage' && (
            <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 sm:p-8 space-y-4 shadow-luxury-card">
              <div>
                <h3 className="font-serif font-normal text-2xl text-ifaqa-plum mb-1">
                  Usage and dosage instructions
                </h3>
                <p className="text-sm text-[#5A6962] font-sans mb-4">
                  Follow standard adult intake guidance or advice from your physician.
                </p>
              </div>
              <DosageGuide dosage={remedy.dosageInstructions} />
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 sm:p-8 space-y-6 shadow-luxury-card">
              <h3 className="font-serif font-normal text-2xl text-ifaqa-plum">
                Frequently asked questions
              </h3>
              <div className="space-y-4 divide-y divide-ifaqa-plum/10">
                <div className="pt-3">
                  <h4 className="font-sans text-sm font-semibold text-ifaqa-plum">Are artificial additives or steroids used</h4>
                  <p className="text-sm font-sans text-[#5A6962] mt-1 leading-relaxed">
                    No. Preparations use cleaned herbs, natural resins, and honey without synthetic fillers or steroids.
                  </p>
                </div>
                <div className="pt-3">
                  <h4 className="font-sans text-sm font-semibold text-ifaqa-plum">How should I store the container</h4>
                  <p className="text-sm font-sans text-[#5A6962] mt-1 leading-relaxed">
                    Keep the cap tightly closed in a cool, dry shelf away from direct sunlight and moisture.
                  </p>
                </div>
                <div className="pt-3">
                  <h4 className="font-sans text-sm font-semibold text-ifaqa-plum">Can I take this alongside other medicines</h4>
                  <p className="text-sm font-sans text-[#5A6962] mt-1 leading-relaxed">
                    Maintain a gap of at least 60 minutes from prescription drugs and consult your physician if pregnant or nursing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section (Bottom of PDP, Linked from Top Stars) */}
      <ProductReviewsSection
        remedyId={remedy.id}
        remedySlug={remedy.slug}
        remedyName={displayTitle}
        remedyImage={remedy.primaryImage}
        reviews={reviews}
        onReviewAdded={(newRev) => setReviews((prev) => [newRev, ...prev])}
        onReviewUpdated={(updatedRev) =>
          setReviews((prev) => prev.map((r) => (r.id === updatedRev.id ? updatedRev : r)))
        }
        onReviewDeleted={(deletedId) =>
          setReviews((prev) => prev.filter((r) => r.id !== deletedId))
        }
      />

      {/* Related Remedies */}
      {relatedRemedies.length > 0 && (
        <div className="pt-10 border-t border-ifaqa-plum/10">
          <div className="flex items-center justify-between mb-6 gap-2">
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              More in {displayCategory}
            </h2>
            <Link
              href={`/catalog/${remedy.categoryId}`}
              className="text-sm font-sans font-medium text-ifaqa-plum hover:underline whitespace-nowrap"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
            {relatedRemedies.map((rel) => (
              <RemedyCard3D key={rel.id} remedy={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
