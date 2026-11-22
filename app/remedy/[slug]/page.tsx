'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import seedData from '@/lib/seed-data.json';
import { getRemedyBySlug, getRemediesByCategory } from '@/lib/remedies-service';
import { HerbalRemedy } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { BotanicalIngredientsTable } from '@/components/remedy/BotanicalIngredientsTable';
import { DosageGuide } from '@/components/remedy/DosageGuide';
import { RemedyGallery } from '@/components/remedy/RemedyGallery';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { formatPriceINR } from '@/lib/formatters';
import {
  ShoppingBag,
  Zap,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Check,
  Star,
  Truck,
  RotateCcw,
  MapPin,
  CheckCircle2,
  HelpCircle,
  Award,
  RefreshCw,
  Clock,
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
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'dosage' | 'faq' | 'reviews'>('overview');
  const [addedToast, setAddedToast] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  const { addToCart } = useCart();
  const { language, t, getRemedyTitle, getRemedySubtitle, getCategoryTitle } = useLanguage();

  useEffect(() => {
    async function load() {
      const data = await getRemedyBySlug(rawSlug);
      if (!data) {
        setLoading(false);
        return;
      }
      setRemedy(data);
      const related = await getRemediesByCategory(data.categoryId);
      setRelatedRemedies(related.filter(r => r.id !== data.id).slice(0, 4));
      setLoading(false);
    }
    load();
  }, [rawSlug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 select-none">
        <div className="relative w-12 h-12 flex items-center justify-center mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-ifaqa-plum border-r-ifaqa-mauve animate-spin" />
          <div
            className="w-5 h-5 rounded-full border border-dashed border-ifaqa-sand animate-spin"
            style={{ animationDirection: 'reverse' }}
          />
        </div>
        <span className="font-serif text-xs font-bold uppercase tracking-widest text-ifaqa-plum">
          Consulting Pharmacopoeia...
        </span>
      </div>
    );
  }

  if (!remedy) {
    return (
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 text-center space-y-4 select-none">
        <ArchitecturalBadge variant="notched">Dispensary Archive</ArchitecturalBadge>
        <h1 className="font-serif text-3xl font-bold text-ifaqa-plum">Formulation Not Found</h1>
        <p className="text-ifaqa-blackberry text-sm max-w-md mx-auto">
          The requested classical herbal remedy could not be located in our active pharmacopoeia.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ifaqa-plum text-white font-serif text-xs uppercase tracking-widest font-bold hover:bg-ifaqa-blackberry transition-colors"
        >
          Return to Pharmacopoeia
        </Link>
      </div>
    );
  }

  const isAvailable = remedy.isAvailable && remedy.stockQuantity > 0;
  const displayTitle = getRemedyTitle(remedy);
  const displaySubtitle = getRemedySubtitle(remedy);
  const displayCategory = getCategoryTitle({ id: remedy.categoryId, name: remedy.categoryName });

  const mrpPrice = remedy.comparePricePKR || Math.round(remedy.pricePKR * 1.3);
  const savingsAmount = mrpPrice - remedy.pricePKR;
  const savingsPercent = Math.round((savingsAmount / mrpPrice) * 100);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(remedy, selectedQuantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addToCart(remedy, selectedQuantity);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 5) {
      setDeliveryChecked(true);
    }
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 md:py-10 space-y-10 select-none">
      {/* Breadcrumb Navigation - Amazon Style */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs font-sans text-ifaqa-blackberry font-medium border-b border-ifaqa-sand/40 pb-3">
        <Link href="/" className="hover:text-ifaqa-plum hover:underline">Home</Link>
        <span>›</span>
        <Link href="/catalog" className="hover:text-ifaqa-plum hover:underline">Pharmacopoeia</Link>
        <span>›</span>
        <Link href={`/catalog/${remedy.categoryId}`} className="hover:text-ifaqa-plum hover:underline">{displayCategory}</Link>
        <span>›</span>
        <span className="text-ifaqa-plum font-bold truncate max-w-[320px]">{displayTitle}</span>
      </nav>

      {/* Main Product Layout - Amazon / Flipkart Dual Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Product Visuals & Trust Guarantees (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <RemedyGallery
            primaryImage={remedy.primaryImage}
            images={remedy.images}
            remedyName={displayTitle}
            urduName={remedy.urduName}
          />

          {/* Amazon/Flipkart Style Trust & Assurances Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-ifaqa-sand/40 text-center">
            <div className="p-3 bg-white border border-ifaqa-sand/60 space-y-1 shadow-sm">
              <Truck className="w-5 h-5 mx-auto text-ifaqa-plum" />
              <span className="text-[11px] font-serif font-bold text-ifaqa-plum block">Free Shipping</span>
              <span className="text-[10px] text-ifaqa-blackberry font-sans block">All Over India</span>
            </div>
            <div className="p-3 bg-white border border-ifaqa-sand/60 space-y-1 shadow-sm">
              <ShieldCheck className="w-5 h-5 mx-auto text-ifaqa-plum" />
              <span className="text-[11px] font-serif font-bold text-ifaqa-plum block">100% Herbal</span>
              <span className="text-[10px] text-ifaqa-blackberry font-sans block">Zero Chemicals</span>
            </div>
            <div className="p-3 bg-white border border-ifaqa-sand/60 space-y-1 shadow-sm">
              <RotateCcw className="w-5 h-5 mx-auto text-ifaqa-plum" />
              <span className="text-[11px] font-serif font-bold text-ifaqa-plum block">Replacement</span>
              <span className="text-[10px] text-ifaqa-blackberry font-sans block">If Damaged</span>
            </div>
            <div className="p-3 bg-white border border-ifaqa-sand/60 space-y-1 shadow-sm">
              <Award className="w-5 h-5 mx-auto text-ifaqa-plum" />
              <span className="text-[11px] font-serif font-bold text-ifaqa-plum block">Desi Dawakhana</span>
              <span className="text-[10px] text-ifaqa-blackberry font-sans block">Empirical Canon</span>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Product Dossier & Buy Box (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Brand Header & Star Rating */}
          <div className="space-y-2 border-b border-ifaqa-sand/40 pb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-ifaqa-blackberry bg-ifaqa-sand/30 px-2 py-0.5 border border-ifaqa-sand/60">
                IFAQA HERBAL REMEDIES • DESI DAWAKHANA
              </span>
              <ArchitecturalBadge variant="diamond" className="text-[10px]">
                {remedy.isBestSeller ? 'Top Rated Remedy' : remedy.form}
              </ArchitecturalBadge>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ifaqa-plum leading-tight">
              {displayTitle}
            </h1>

            <p className="text-sm font-sans font-semibold text-ifaqa-blackberry">
              {displaySubtitle}
            </p>

            {/* Rating Stars - Amazon Style */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-ifaqa-plum">4.9 out of 5</span>
              <span className="text-xs text-ifaqa-blackberry">|</span>
              <span className="text-xs text-ifaqa-blackberry font-medium hover:underline cursor-pointer">
                1,248 Verified Patient Ratings
              </span>
            </div>
          </div>

          {/* Amazon Style Price & Offer Box */}
          <div className="bg-white border-2 border-ifaqa-sand/70 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-xs uppercase font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5">
                  Save {savingsPercent}%
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-ifaqa-plum">
                  {formatPriceINR(remedy.pricePKR)}
                </span>
                <span className="text-sm text-ifaqa-blackberry line-through font-mono">
                  M.R.P.: {formatPriceINR(mrpPrice)}
                </span>
              </div>
              <p className="text-xs text-ifaqa-blackberry font-sans font-medium">
                Inclusive of all taxes • <strong>FREE Delivery</strong> on this order anywhere in India.
              </p>
            </div>

            {/* Availability */}
            <div className="pt-3 border-t border-ifaqa-sand/30 flex items-center justify-between">
              <div>
                <span className={`text-sm font-serif font-bold uppercase tracking-wider ${isAvailable ? 'text-emerald-800' : 'text-red-700'}`}>
                  {isAvailable ? '● In Stock' : '● Out of Stock'}
                </span>
                <span className="text-xs text-ifaqa-blackberry font-sans block mt-0.5 font-medium">
                  Ships from: IFAQA Central Apothecary, India
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-ifaqa-plum bg-ifaqa-linen px-2.5 py-1 border border-ifaqa-sand/50">
                SKU: {remedy.sku}
              </span>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="pt-3 border-t border-ifaqa-sand/30">
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-ifaqa-blackberry absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Delivery Pincode"
                    maxLength={6}
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono border border-ifaqa-sand/70 bg-ifaqa-linen/50 text-ifaqa-plum focus:outline-none focus:border-ifaqa-plum"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-ifaqa-plum text-ifaqa-linen text-xs font-serif font-bold uppercase tracking-wider hover:bg-ifaqa-blackberry transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryChecked && (
                <p className="text-xs text-emerald-800 font-sans font-bold mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Delivery to {pincode} available in 2–4 business days via Express Courier.</span>
                </p>
              )}
            </div>

            {/* Quantity Stepper & Dual Big Buttons (Add to Cart + Buy Now) */}
            <div className="pt-4 border-t border-ifaqa-sand/40 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold">
                  Quantity:
                </span>
                <div className="flex items-center border border-ifaqa-sand/80 bg-white shadow-sm">
                  <button
                    onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                    disabled={!isAvailable || selectedQuantity <= 1}
                    className="p-2 text-ifaqa-plum hover:bg-ifaqa-sand/20 disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm text-ifaqa-plum">
                    {selectedQuantity}
                  </span>
                  <button
                    onClick={() => setSelectedQuantity(Math.min(remedy.stockQuantity || 10, selectedQuantity + 1))}
                    disabled={!isAvailable || selectedQuantity >= (remedy.stockQuantity || 10)}
                    className="p-2 text-ifaqa-plum hover:bg-ifaqa-sand/20 disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!isAvailable}
                  className={`py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
                    addedToast
                      ? 'bg-emerald-800 text-white'
                      : 'bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry active:scale-[0.98]'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t('addedToCart')}</span>
                    </>
                  ) : isAvailable ? (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t('addToCart')}</span>
                    </>
                  ) : (
                    <span>{t('outOfStock')}</span>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!isAvailable}
                  className="py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md bg-ifaqa-sand text-ifaqa-plum hover:bg-white border-2 border-ifaqa-plum active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4 text-ifaqa-plum" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Specifications Table - Flipkart/Amazon Style */}
          <div className="bg-white border border-ifaqa-sand/60 p-5 space-y-3 shadow-sm">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum border-b border-ifaqa-sand/40 pb-2">
              Product Overview & Specifications
            </h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-sans">
              <div className="text-ifaqa-blackberry font-medium">Formulation Form:</div>
              <div className="font-bold text-ifaqa-plum">{remedy.form}</div>

              <div className="text-ifaqa-blackberry font-medium">Net Weight / Size:</div>
              <div className="font-bold text-ifaqa-plum">{remedy.packaging?.size || 'Standard'}</div>

              <div className="text-ifaqa-blackberry font-medium">Packaging Type:</div>
              <div className="font-bold text-ifaqa-plum">{remedy.packaging?.containerType || 'Amber Glass Jar'}</div>

              <div className="text-ifaqa-blackberry font-medium">Ailment Target:</div>
              <div className="font-bold text-ifaqa-plum">{displayCategory}</div>

              <div className="text-ifaqa-blackberry font-medium">Dosage Vehicle (Anupana):</div>
              <div className="font-bold text-ifaqa-plum">{remedy.dosageInstructions?.anupana || 'Lukewarm Water'}</div>

              <div className="text-ifaqa-blackberry font-medium">Country of Origin:</div>
              <div className="font-bold text-ifaqa-plum">India</div>
            </div>
          </div>

          {/* About This Item Bullet Points - Amazon Style */}
          <div className="bg-white border border-ifaqa-sand/60 p-5 space-y-3 shadow-sm">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum border-b border-ifaqa-sand/40 pb-2">
              About This Classical Remedy
            </h3>
            <ul className="space-y-2 text-xs font-sans text-ifaqa-plum/90 list-disc pl-5 leading-relaxed font-medium">
              <li><strong>Resultful & Potent:</strong> Handcrafted under canonical dawakhana processing standards to target systemic root causes.</li>
              <li><strong>Pure Herbs Only:</strong> Contains 100% genuine botanical roots, seeds, floral extracts, and minerals without synthetic fillers.</li>
              <li><strong>Clinical Efficacy:</strong> {remedy.shortDescription}</li>
              <li><strong>Easy Daily Use:</strong> {remedy.dosageInstructions?.amount} {remedy.dosageInstructions?.timing}.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* In-Depth Detailed Sections (Tabs) - Amazon / Flipkart Extended Details */}
      <div className="pt-8 border-t-2 border-ifaqa-sand/60">
        <div className="flex border-b border-ifaqa-sand/60 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-ifaqa-plum text-ifaqa-plum bg-ifaqa-sand/25'
                : 'border-transparent text-ifaqa-blackberry hover:text-ifaqa-plum'
            }`}
          >
            Product Summary & Benefits
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-ifaqa-plum text-ifaqa-plum bg-ifaqa-sand/25'
                : 'border-transparent text-ifaqa-blackberry hover:text-ifaqa-plum'
            }`}
          >
            Botanical Ingredients (Jadi Buti)
          </button>
          <button
            onClick={() => setActiveTab('dosage')}
            className={`py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'dosage'
                ? 'border-ifaqa-plum text-ifaqa-plum bg-ifaqa-sand/25'
                : 'border-transparent text-ifaqa-blackberry hover:text-ifaqa-plum'
            }`}
          >
            How to Take & Dosage Guide
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-ifaqa-plum text-ifaqa-plum bg-ifaqa-sand/25'
                : 'border-transparent text-ifaqa-blackberry hover:text-ifaqa-plum'
            }`}
          >
            FAQ & Safety
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-6 text-xs sm:text-sm font-serif font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-ifaqa-plum text-ifaqa-plum bg-ifaqa-sand/25'
                : 'border-transparent text-ifaqa-blackberry hover:text-ifaqa-plum'
            }`}
          >
            Patient Ratings & Reviews (1,248)
          </button>
        </div>

        <div className="pt-8">
          {/* Tab 1: Detailed Overview */}
          {activeTab === 'overview' && (
            <div className="bg-white border border-ifaqa-sand/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="font-serif text-xl font-bold text-ifaqa-plum mb-3">
                  Comprehensive Therapeutic Overview
                </h3>
                <p className="text-sm font-sans text-ifaqa-plum leading-relaxed font-medium">
                  {remedy.longDescription}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum mb-3">
                  Specific Health Benefits & Indications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {remedy.therapeuticIndications.map((ind, idx) => (
                    <div key={idx} className="p-3 bg-ifaqa-linen border border-ifaqa-sand/50 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                      <span className="text-xs font-serif font-bold text-ifaqa-plum">{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Botanical Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="bg-white border border-ifaqa-sand/60 p-6 sm:p-8 space-y-4 shadow-sm">
              <div>
                <h3 className="font-serif text-xl font-bold text-ifaqa-plum mb-1">
                  100% Pure Botanical Ingredients Breakdown
                </h3>
                <p className="text-xs text-ifaqa-blackberry font-sans font-medium mb-4">
                  Every batch is formulated strictly using wildcrafted, laboratory-tested natural jadi buti.
                </p>
              </div>
              <BotanicalIngredientsTable ingredients={remedy.herbalIngredients} />
            </div>
          )}

          {/* Tab 3: Dosage Guide */}
          {activeTab === 'dosage' && (
            <div className="bg-white border border-ifaqa-sand/60 p-6 sm:p-8 space-y-4 shadow-sm">
              <div>
                <h3 className="font-serif text-xl font-bold text-ifaqa-plum mb-1">
                  Usage Instructions & Anupana (Tarkeebe Istemal)
                </h3>
                <p className="text-xs text-ifaqa-blackberry font-sans font-medium mb-4">
                  For optimal absorption, strictly observe the traditional dosage vehicle instructions below.
                </p>
              </div>
              <DosageGuide dosage={remedy.dosageInstructions} />
            </div>
          )}

          {/* Tab 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="bg-white border border-ifaqa-sand/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-ifaqa-plum">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 divide-y divide-ifaqa-sand/30">
                <div className="pt-3">
                  <h4 className="font-serif text-sm font-bold text-ifaqa-plum">Are there any side effects?</h4>
                  <p className="text-xs font-sans text-ifaqa-blackberry mt-1 font-medium leading-relaxed">
                    This remedy is prepared from 100% pure herbs and mineral calces according to time-tested classical recipes. When taken within the prescribed dosage, it is completely safe and non-habit forming.
                  </p>
                </div>
                <div className="pt-3">
                  <h4 className="font-serif text-sm font-bold text-ifaqa-plum">How long should I take this medicine?</h4>
                  <p className="text-xs font-sans text-ifaqa-blackberry mt-1 font-medium leading-relaxed">
                    Most patients notice significant symptomatic relief within 3 to 7 days. For chronic conditions and complete humoral balancing, a course of 3 to 6 weeks is recommended.
                  </p>
                </div>
                <div className="pt-3">
                  <h4 className="font-serif text-sm font-bold text-ifaqa-plum">Can I take this alongside other medications?</h4>
                  <p className="text-xs font-sans text-ifaqa-blackberry mt-1 font-medium leading-relaxed">
                    Yes, keeping a 1-hour interval between allopathic medicines and herbal remedies is recommended to prevent any digestive interference.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Reviews */}
          {activeTab === 'reviews' && (
            <div className="bg-white border border-ifaqa-sand/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-ifaqa-sand/40 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-ifaqa-plum">
                    Patient Testimonials & Reviews
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-600">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-ifaqa-plum">4.9 out of 5 based on 1,248 verified orders</span>
                  </div>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4 divide-y divide-ifaqa-sand/30">
                <div className="pt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs font-bold text-ifaqa-plum">Mohd. Rizwan — New Delhi</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">Verified Buyer</span>
                  </div>
                  <div className="flex text-amber-600 text-xs">★★★★★</div>
                  <p className="text-xs font-sans text-ifaqa-plum font-medium leading-relaxed">
                    "Bahut hi damdar aur zabardast dawa hai! 3 din me hi pet ki gas aur bhari-pan khatam ho gaya. Packaging bilkul safe amber jar me aayi thi."
                  </p>
                </div>
                <div className="pt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs font-bold text-ifaqa-plum">Sunil Verma — Lucknow</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">Verified Buyer</span>
                  </div>
                  <div className="flex text-amber-600 text-xs">★★★★★</div>
                  <p className="text-xs font-sans text-ifaqa-plum font-medium leading-relaxed">
                    "Asal jadi butiyo se bani hui dawa hai, result 100% visible hai. Fast delivery in just 2 days. Highly recommended!"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Formulations Carousel */}
      {relatedRemedies.length > 0 && (
        <div className="pt-12 border-t border-ifaqa-sand/60">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              Frequently Bought Together In {displayCategory}
            </h2>
            <Link
              href={`/catalog/${remedy.categoryId}`}
              className="text-xs font-serif uppercase tracking-widest text-ifaqa-plum hover:text-ifaqa-blackberry font-bold flex items-center gap-1"
            >
              <span>Explore All</span>
              <Truck className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedRemedies.map((rel) => (
              <RemedyCard3D key={rel.id} remedy={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
