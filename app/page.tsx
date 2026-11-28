'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import seedData from '@/lib/seed-data.json';
import {
  getStorefrontData,
  getCachedStorefrontSnapshot,
  resolveCategoryBanner,
} from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory, PromotionalBanner } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { ShimmerImage } from '@/components/ui/ShimmerImage';
import { SectionErrorBoundary } from '@/components/ui/SectionErrorBoundary';
import {
  CategoryGridSkeleton,
  RemedyGridSkeleton,
} from '@/components/catalog/StorefrontSkeletons';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

export default function HomePage() {
  // Deterministic initial state so SSR HTML & client frame-0 match 100% (zero hydration mismatch)
  const [remedies, setRemedies] = useState<HerbalRemedy[]>(
    () => seedData.remedies as unknown as HerbalRemedy[]
  );
  const [categories, setCategories] = useState<AilmentCategory[]>(
    () => seedData.categories as unknown as AilmentCategory[]
  );
  const [banners, setBanners] = useState<PromotionalBanner[]>(
    () => seedData.banners as unknown as PromotionalBanner[]
  );
  const [catalogReady, setCatalogReady] = useState(false);
  const { t, getCategoryTitle } = useLanguage();

  useEffect(() => {
    let active = true;

    const warm = getCachedStorefrontSnapshot();
    if (warm.fromCache && warm.remedies.length > 0) {
      setRemedies(warm.remedies);
      if (warm.categories.length > 0) setCategories(warm.categories);
      if (warm.banners) setBanners(warm.banners);
      setCatalogReady(true);
    }

    async function syncStorefront() {
      try {
        const fresh = await getStorefrontData();
        if (!active) return;
        if (fresh.remedies && fresh.remedies.length > 0) setRemedies(fresh.remedies);
        if (fresh.categories && fresh.categories.length > 0) setCategories(fresh.categories);
        if (fresh.banners) setBanners(fresh.banners);
      } catch (err) {
        console.warn('Storefront sync notice (keeping cached/seed catalog):', err);
      } finally {
        if (active) setCatalogReady(true);
      }
    }

    syncStorefront();
    return () => {
      active = false;
    };
  }, []);

  const safeRemedies = Array.isArray(remedies) ? remedies : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeBanners = Array.isArray(banners) ? banners : [];

  const activeRemedies = safeRemedies.filter((r) => r && r.isAvailable !== false);
  const featuredRemedies = activeRemedies
    .filter((r) => r.isFeatured || r.isBestSeller)
    .slice(0, 8);
  const activeAnnouncement = safeBanners.find(
    (b) => b && b.isActive && b.placement === 'announcement_bar'
  );
  const activeMidBanner = safeBanners.find(
    (b) => b && b.isActive && b.placement === 'mid_page_feature'
  );
  const categoriesWithLiveCounts = safeCategories.map((cat) => ({
    ...cat,
    remedyCount:
      activeRemedies.filter((r) => r.categoryId === cat.id || r.categoryId === cat.slug).length ||
      cat.remedyCount ||
      0,
  }));

  return (
    <div className="space-y-14 md:space-y-20 pb-8 md:pb-10 w-full select-none">
      {/* Flush Header-to-Hero Band */}
      <SectionErrorBoundary sectionName="Hero">
        <div className="w-full">
          {activeAnnouncement && (
            <div className="w-full bg-ifaqa-plum text-ifaqa-linen border-b border-ifaqa-mauve/25 h-9 overflow-hidden">
              {/* Desktop (md+): Static single-line centered with automatic "..." ellipsis */}
              <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-6 lg:px-10 h-full items-center justify-center gap-3 text-xs font-sans">
                {activeAnnouncement.badgeText && (
                  <span className="px-2 py-0.5 rounded bg-ifaqa-mauve text-[#0F1714] font-medium shrink-0">
                    {activeAnnouncement.badgeText}
                  </span>
                )}
                <span className="min-w-0 truncate">{activeAnnouncement.headline}</span>
                {activeAnnouncement.ctaText && activeAnnouncement.ctaLink && (
                  <Link
                    href={activeAnnouncement.ctaLink}
                    className="underline font-medium text-ifaqa-sand hover:text-white inline-flex items-center gap-1 shrink-0 whitespace-nowrap"
                  >
                    <span>{activeAnnouncement.ctaText}</span>
                    <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                  </Link>
                )}
              </div>

              {/* Mobile (< md): Crisp single-line continuous ticker */}
              <div className="md:hidden w-full h-full flex items-center overflow-hidden">
                <div className="ifaqa-marquee-track whitespace-nowrap text-xs font-sans">
                  {[0, 1].map((dup) => (
                    <div
                      key={dup}
                      aria-hidden={dup === 1 ? true : undefined}
                      className="flex items-center gap-6 pe-10 shrink-0"
                    >
                      {activeAnnouncement.badgeText && (
                        <span className="px-2 py-0.5 rounded bg-ifaqa-mauve text-[#0F1714] font-medium shrink-0">
                          {activeAnnouncement.badgeText}
                        </span>
                      )}
                      <span>{activeAnnouncement.headline}</span>
                      {activeAnnouncement.ctaText && activeAnnouncement.ctaLink && (
                        <Link
                          href={activeAnnouncement.ctaLink}
                          tabIndex={dup === 1 ? -1 : undefined}
                          className="underline font-medium text-ifaqa-sand inline-flex items-center gap-1 shrink-0"
                        >
                          <span>{activeAnnouncement.ctaText}</span>
                          <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 1. Unified Edge-to-Edge Editorial Hero */}
          <section className="relative w-full bg-[#F7F6F4] border-b border-ifaqa-plum/10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <ShimmerImage
                src="/images/hero-mortar-botanical.webp"
                alt="Granite mortar and pestle with dried blossoms, raw garlic, and hand-blended herbs on natural white marble"
                fill
                priority
                fetchPriority="high"
                sizes="100vw"
                className="object-cover object-[76%_bottom] md:object-[74%_58%]"
              />

              {/* Mobile Vertical Scrim */}
              <div
                className="md:hidden absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(250,248,245,0.92) 0%, rgba(250,248,245,0.82) 48%, rgba(250,248,245,0.28) 76%, rgba(250,248,245,0.04) 100%)',
                }}
              />

              {/* Desktop Horizontal Scrim */}
              <div
                className="hidden md:block absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.92) 34%, rgba(250,248,245,0.58) 54%, rgba(250,248,245,0.08) 76%, rgba(250,248,245,0) 100%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-ifaqa-linen/90 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-44 sm:pb-52 md:py-24 lg:py-28">
              <div className="max-w-xl space-y-5 ifaqa-hero-rise">
                <p className="border-s-2 border-ifaqa-mauve ps-3 text-xs sm:text-sm font-sans text-[#5A6962]">
                  Unani and Ayurvedic herbal house
                </p>

                <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-[56px] text-ifaqa-plum leading-[1.06] tracking-[-0.025em]">
                  Pure Unani and Ayurvedic herbal remedies
                </h1>

                <p className="text-base sm:text-lg text-[#3E524A] font-sans leading-relaxed max-w-lg">
                  Powders, electuaries, syrups, and oils prepared in small batches from whole dried roots, spices, and forest honey with zero synthetic fillers.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/catalog"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-sans font-medium transition-colors active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>Shop products</span>
                    <ArrowRight className="w-4 h-4 ms-2" strokeWidth={1.5} />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-white/90 backdrop-blur-sm border border-ifaqa-plum/15 text-ifaqa-plum hover:bg-ifaqa-cashmere text-sm font-sans font-medium transition-colors active:scale-[0.98] whitespace-nowrap"
                  >
                    Our quality process
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </SectionErrorBoundary>

      {/* 2. Health Categories Grid (Botanical Image + Gradient Combination) */}
      <SectionErrorBoundary sectionName="Categories">
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-ifaqa-plum/10 gap-2">
            <div>
              <p className="text-xs font-sans text-[#5A6962] mb-1">
                Health categories
              </p>
              <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum leading-tight">
                {t('categoriesTitle')}
              </h2>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-sans font-medium text-ifaqa-plum hover:text-ifaqa-blackberry inline-flex items-center gap-1.5 group whitespace-nowrap"
            >
              <span>All {activeRemedies.length} remedies</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </div>

          {!catalogReady ? (
            <CategoryGridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr ifaqa-content-appear">
              {categoriesWithLiveCounts.map((category) => {
                const cardImage = resolveCategoryBanner(category);
                return (
                  <Link
                    key={category.id}
                    href={`/catalog/${category.slug}`}
                    className="group relative flex flex-col justify-between min-h-[224px] sm:min-h-[244px] p-5 sm:p-6 rounded-2xl overflow-hidden bg-[#0B2D22] border border-ifaqa-plum/15 hover:border-[#C5A059]/60 shadow-luxury-card hover:shadow-luxury-lifted transition-[border-color,box-shadow,transform] duration-200 active:scale-[0.99]"
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <ShimmerImage
                        src={cardImage}
                        alt={getCategoryTitle(category)}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-right transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(155deg, rgba(11,45,34,0.32) 0%, rgba(11,45,34,0.74) 48%, rgba(6,24,18,0.94) 100%)',
                        }}
                      />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DFBA73]/40 to-transparent" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[#FAF8F5] bg-[#061812]/55 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-md shrink-0 tabular-nums">
                        {category.remedyCount} remedies
                      </span>
                      <span className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-[#DFBA73] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-[#0B2D22] group-hover:border-[#C5A059] transition-colors shrink-0">
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                          strokeWidth={1.6}
                        />
                      </span>
                    </div>

                    <div className="relative z-10 mt-auto pt-10 space-y-1.5">
                      <h3 className="font-serif font-normal text-xl sm:text-[22px] text-[#FAF8F5] group-hover:text-[#DFBA73] transition-colors leading-snug line-clamp-1">
                        {getCategoryTitle(category)}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#FAF8F5]/80 font-sans line-clamp-2 leading-relaxed">
                        {category.description || category.tagline}
                      </p>
                      <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-sans font-medium text-[#DFBA73]">
                        <span>{t('explorePharmacopoeia')}</span>
                        <span className="text-[#FAF8F5]/75 group-hover:text-[#DFBA73] transition-colors">
                          Browse
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </SectionErrorBoundary>

      {/* Mid-Page Promotional Feature Banner */}
      {activeMidBanner && (
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl bg-gradient-mauve-reserve text-ifaqa-linen p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-ifaqa-plum/10">
            <div className="space-y-2 max-w-xl">
              {activeMidBanner.badgeText && (
                <span className="inline-flex px-2.5 py-0.5 rounded bg-ifaqa-mauve text-[#0F1714] text-xs font-medium">
                  {activeMidBanner.badgeText}
                </span>
              )}
              <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-linen">
                {activeMidBanner.headline}
              </h3>
              {activeMidBanner.subheadline && (
                <p className="text-sm text-ifaqa-linen/85 leading-relaxed">
                  {activeMidBanner.subheadline}
                </p>
              )}
            </div>
            {activeMidBanner.ctaText && activeMidBanner.ctaLink && (
              <Link
                href={activeMidBanner.ctaLink}
                className="h-11 px-6 rounded-lg bg-ifaqa-mauve text-[#0F1714] text-sm font-sans font-medium hover:bg-ifaqa-sand transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                <span>{activeMidBanner.ctaText}</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* 3. Featured Remedies */}
      <SectionErrorBoundary sectionName="FeaturedRemedies">
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-ifaqa-plum/10 gap-2">
            <div>
              <p className="text-xs font-sans text-[#5A6962] mb-1">
                Customer favorites
              </p>
              <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum leading-tight">
                {t('featuredTitle')}
              </h2>
            </div>
            <Link
              href="/catalog"
              className="text-sm font-sans font-medium text-ifaqa-plum hover:text-ifaqa-blackberry inline-flex items-center gap-1.5 group whitespace-nowrap"
            >
              <span>{t('explorePharmacopoeia')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </Link>
          </div>

          {!catalogReady ? (
            <RemedyGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr ifaqa-content-appear">
              {featuredRemedies.map((remedy) => (
                <RemedyCard3D key={remedy.id} remedy={remedy} />
              ))}
            </div>
          )}
        </section>
      </SectionErrorBoundary>

      {/* Bottom Editorial Band + Quality Pillars */}
      <SectionErrorBoundary sectionName="EditorialClosing">
        <div className="space-y-8 md:space-y-10">
          <section className="relative w-full border-y border-ifaqa-plum/10 bg-[#F5F4F2] overflow-hidden ifaqa-scroll-reveal">
            <div className="absolute inset-0 pointer-events-none">
              <ShimmerImage
                src="/images/home-closing-botanicals.webp"
                alt="Fresh ginger root, vibrant green mint leaves, white floral petals, raw garlic, and natural botanical capsules on white marble"
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover object-[center_bottom] md:object-[82%_center]"
              />

              <div
                className="md:hidden absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(250,248,245,0.95) 0%, rgba(250,248,245,0.88) 54%, rgba(250,248,245,0.32) 78%, rgba(250,248,245,0.04) 100%)',
                }}
              />

              <div
                className="hidden md:block absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.93) 40%, rgba(250,248,245,0.62) 60%, rgba(250,248,245,0.08) 80%, rgba(250,248,245,0) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-48 sm:pb-52 md:py-16 lg:py-20">
              <div className="max-w-xl space-y-5">
                <p className="border-s-2 border-ifaqa-mauve ps-3 text-xs font-sans font-medium text-[#5A6962]">
                  Fresh roots & classical compounding
                </p>
                <h2 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum leading-[1.12]">
                  Crafted from living botanicals, never synthetic isolates
                </h2>
                <p className="text-sm sm:text-base text-[#3E524A] font-sans leading-relaxed max-w-lg">
                  Every small-batch formulation starts with whole ginger rhizomes, aromatic mint leaves, hand-sorted seeds, and cold-processed extracts—delivering clean, potent relief without chemical steroids or fillers.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="ruled-badge px-2.5 py-1 text-xs font-medium">
                    Whole Dried Roots
                  </span>
                  <span className="ruled-badge px-2.5 py-1 text-xs font-medium">
                    Zero Synthetic Fillers
                  </span>
                  <span className="ruled-badge px-2.5 py-1 text-xs font-medium">
                    Small-Batch Potency
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/85 backdrop-blur-sm border border-ifaqa-plum/10 space-y-1">
                    <h3 className="text-xs font-semibold text-ifaqa-plum">
                      Raw Single-Origin Sourcing
                    </h3>
                    <p className="text-xs text-[#5A6962] leading-relaxed">
                      Wild ginger, peppermint leaves, saffron stigmas, and unheated honey selected prior to every batch.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/85 backdrop-blur-sm border border-ifaqa-plum/10 space-y-1">
                    <h3 className="text-xs font-semibold text-ifaqa-plum">
                      Unani & Ayurvedic Integrity
                    </h3>
                    <p className="text-xs text-[#5A6962] leading-relaxed">
                      Slow earthen & steel compounding retains volatile botanical oils without chemical preservatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="bg-ifaqa-cashmere border border-ifaqa-plum/10 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-ifaqa-plum/10 text-ifaqa-plum flex items-center justify-center">
                    <Leaf className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ifaqa-plum">
                    {t('trustPillar1Title')}
                  </h3>
                  <p className="text-sm text-[#3E524A] font-sans leading-relaxed">
                    {t('trustPillar1Desc')}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-ifaqa-plum/10 text-ifaqa-plum flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ifaqa-plum">
                    {t('trustPillar2Title')}
                  </h3>
                  <p className="text-sm text-[#3E524A] font-sans leading-relaxed">
                    {t('trustPillar2Desc')}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-ifaqa-plum/10 text-ifaqa-plum flex items-center justify-center">
                    <Truck className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-base font-semibold text-ifaqa-plum">
                    {t('trustPillar3Title')}
                  </h3>
                  <p className="text-sm text-[#3E524A] font-sans leading-relaxed">
                    {t('trustPillar3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </SectionErrorBoundary>
    </div>
  );
}
