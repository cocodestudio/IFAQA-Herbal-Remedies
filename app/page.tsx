'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import seedData from '@/lib/seed-data.json';
import {
  getStorefrontData,
  getCachedStorefrontSnapshot,
  hasWarmMemoryCache,
} from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory, PromotionalBanner } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { ShimmerImage } from '@/components/ui/ShimmerImage';
import {
  CategoryGridSkeleton,
  RemedyGridSkeleton,
} from '@/components/catalog/StorefrontSkeletons';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

export default function HomePage() {
  const initialWarm = hasWarmMemoryCache();
  const initialWarmData = initialWarm ? getCachedStorefrontSnapshot() : null;

  const [remedies, setRemedies] = useState<HerbalRemedy[]>(
    () => initialWarmData?.remedies || (seedData.remedies as unknown as HerbalRemedy[])
  );
  const [categories, setCategories] = useState<AilmentCategory[]>(
    () => initialWarmData?.categories || (seedData.categories as unknown as AilmentCategory[])
  );
  const [banners, setBanners] = useState<PromotionalBanner[]>(
    () => initialWarmData?.banners || (seedData.banners as unknown as PromotionalBanner[])
  );
  const [catalogReady, setCatalogReady] = useState<boolean>(initialWarm);
  const { language, t, getCategoryTitle } = useLanguage();

  useEffect(() => {
    let active = true;
    const warm = getCachedStorefrontSnapshot();
    if (warm.fromCache && warm.remedies.length > 0) {
      setRemedies(warm.remedies);
      setCategories(warm.categories);
      setBanners(warm.banners);
      setCatalogReady(true);
    }

    async function syncStorefront() {
      try {
        const fresh = await getStorefrontData();
        if (!active) return;
        if (fresh.remedies && fresh.remedies.length > 0) setRemedies(fresh.remedies);
        if (fresh.categories && fresh.categories.length > 0) setCategories(fresh.categories);
        if (fresh.banners) setBanners(fresh.banners);
      } finally {
        if (active) setCatalogReady(true);
      }
    }

    syncStorefront();
    return () => {
      active = false;
    };
  }, []);

  const activeRemedies = remedies.filter((r) => r.isAvailable !== false);
  const featuredRemedies = activeRemedies
    .filter((r) => r.isFeatured || r.isBestSeller)
    .slice(0, 8);
  const activeAnnouncement = banners.find(
    (b) => b.isActive && b.placement === 'announcement_bar'
  );
  const activeMidBanner = banners.find(
    (b) => b.isActive && b.placement === 'mid_page_feature'
  );
  const categoriesWithLiveCounts = categories.map((cat) => ({
    ...cat,
    remedyCount:
      activeRemedies.filter((r) => r.categoryId === cat.id).length || cat.remedyCount,
  }));

  const heroCopy = {
    en: {
      eyebrow: '• Unani and Ayurvedic herbal house',
      headline: 'Pure Unani and Ayurvedic herbal remedies',
      subhead: 'Powders, electuaries, syrups, and oils prepared in small batches from whole dried roots, spices, and forest honey with zero synthetic fillers.',
      primaryCta: 'Shop products',
      secondaryCta: 'Our quality process',
      browseLabel: 'Health categories',
      viewAll: `All ${activeRemedies.length} remedies`,
      popularEyebrow: 'Customer favorites',
      imageAlt: 'Granite mortar and pestle with dried blossoms, raw garlic, and hand-blended herbs on natural white marble',
      closingEyebrow: 'Fresh roots & classical compounding',
      closingTitle: 'Crafted from living botanicals, never synthetic isolates',
      closingBody: 'Every small-batch formulation starts with whole ginger rhizomes, aromatic mint leaves, hand-sorted seeds, and cold-processed extracts—delivering clean, potent relief without chemical steroids or fillers.',
      closingTag1: 'Whole Dried Roots',
      closingTag2: 'Zero Synthetic Fillers',
      closingTag3: 'Small-Batch Potency',
      closingNote1Title: 'Raw Single-Origin Sourcing',
      closingNote1Desc: 'Wild ginger, peppermint leaves, saffron stigmas, and unheated honey selected prior to every batch.',
      closingNote2Title: 'Unani & Ayurvedic Integrity',
      closingNote2Desc: 'Slow earthen & steel compounding retains volatile botanical oils without chemical preservatives.',
      closingAlt: 'Fresh ginger root, Vibrant green mint leaves, white floral petals, raw garlic, and natural botanical capsules on white marble',
    },
    hi: {
      eyebrow: 'सहारनपुर, भारत • यूनानी एवं आयुर्वेदिक हर्बल संस्थान',
      headline: 'शुद्ध यूनानी और आयुर्वेदिक हर्बल औषधियां',
      subhead: 'असली जड़ों, मसालों और जंगली शहद से छोटे बैच में तैयार माजून, चूर्ण, शर्बत और तेल — बिना किसी केमिकल मिलावट के।',
      primaryCta: 'सभी उत्पाद देखें',
      secondaryCta: 'निर्माण प्रक्रिया',
      browseLabel: 'स्वास्थ्य श्रेणियां',
      viewAll: `सभी ${activeRemedies.length} उत्पाद`,
      popularEyebrow: 'प्रमुख उत्पाद',
      imageAlt: 'सफेद संगमरमर पर खरल मूसल, प्राकृतिक फूल, लहसुन और जड़ी-बूटियों का मिश्रण',
      closingEyebrow: 'ताज़ी जड़ें और पारंपरिक निर्माण',
      closingTitle: 'असली जड़ी-बूटियों से निर्मित, केमिकल मिलावट से दूर',
      closingBody: 'हर छोटे बैच की शुरुआत ताज़ा अदरक, पुदीने की पत्तियों, हाथ से चुने बीजों और शुद्ध अर्क से होती है — बिना किसी स्टेरॉयड या कृत्रिम रसायन के।',
      closingTag1: 'संपूर्ण प्राकृतिक जड़ें',
      closingTag2: 'केमिकल मुक्त',
      closingTag3: 'ताज़ा छोटा बैच',
      closingNote1Title: 'शुद्ध एकल-स्रोत जड़ी-बूटियां',
      closingNote1Desc: 'ताज़ी अदरक, पुदीना पत्तियां, केसर और प्राकृतिक जंगली शहद से प्रत्येक बैच का निर्माण।',
      closingNote2Title: 'यूनानी व आयुर्वेदिक प्रामाणिकता',
      closingNote2Desc: 'धीमी पारंपरिक विधि से तैयार जिससे प्राकृतिक गुण और सुगंध सुरक्षित रहें।',
      closingAlt: 'ताज़ा अदरक, हरी पुदीने की पत्तियां, सफेद फूल और प्राकृतिक हर्बल कैप्सूल',
    },
    ur: {
      eyebrow: 'سہارنپور، بھارت • یونانی اور آیورویدک نباتاتی دواخانہ',
      headline: 'خالص یونانی اور آیورویدک نباتاتی ادویات',
      subhead: 'اصل جڑوں، مسالوں اور قدرتی شہد سے چھوٹے بیجز میں تیار معجون، سفوف، شربت اور روغنیات — کیمیائی اجزاء سے مکمل پاک۔',
      primaryCta: 'تمام مصنوعات دیکھیں',
      secondaryCta: 'تیاری کا معیار',
      browseLabel: 'صحت کی اقسام',
      viewAll: `تمام ${activeRemedies.length} مصنوعات`,
      popularEyebrow: 'مقبول مرکبات',
      imageAlt: 'سفید سنگ مرمر پر کھرل موسل، سفید پھول، لہسن اور جڑی بوٹیاں',
      closingEyebrow: 'تازہ جڑیں اور روایتی مرکبات',
      closingTitle: 'خالص نباتاتی اجزاء سے تیار، مصنوعی کیمیکلز سے پاک',
      closingBody: 'ہمارا ہر بیج تازہ ادرک، خوشبودار پودینے کی پتیوں، اصلی بیجوں اور قدرتی عرق سے تیار کیا جاتا ہے تاکہ آپ کو بغیر سٹیرائیڈز کے خالص شفا ملے۔',
      closingTag1: 'اصل قدرتی جڑیں',
      closingTag2: 'کیمیائی اجزاء سے پاک',
      closingTag3: 'چھوٹے بیجز میں تیاری',
      closingNote1Title: 'خالص اصل جڑی بوٹیاں',
      closingNote1Desc: 'تازہ ادرک، پودینہ، زعفران اور خالص شہد کا انتخاب ہر بیج سے پہلے کیا جاتا ہے۔',
      closingNote2Title: 'روایتی یونانی و آیورویدک معیار',
      closingNote2Desc: 'قدرتی جوشاندے اور سست تیاری سے اجزاء کی اصل تاثیر محفوظ رہتی ہے۔',
      closingAlt: 'تازہ ادرک، ہرا پودینہ، سفید پھول اور قدرتی ہربل کیپسول',
    },
  }[language] || {
    eyebrow: '• Unani and Ayurvedic herbal house',
    headline: 'Pure Unani and Ayurvedic herbal remedies',
    subhead: 'Powders, electuaries, syrups, and oils prepared in small batches from whole dried roots, spices, and forest honey with zero synthetic fillers.',
    primaryCta: 'Shop products',
    secondaryCta: 'Our quality process',
    browseLabel: 'Health categories',
    viewAll: `All ${activeRemedies.length} remedies`,
    popularEyebrow: 'Customer favorites',
    imageAlt: 'Granite mortar and pestle with dried blossoms, raw garlic, and herbs on white marble',
    closingEyebrow: 'Fresh roots & classical compounding',
    closingTitle: 'Crafted from living botanicals, never synthetic isolates',
    closingBody: 'Every small-batch formulation starts with whole ginger rhizomes, aromatic mint leaves, hand-sorted seeds, and cold-processed extracts—delivering clean, potent relief without chemical steroids or fillers.',
    closingTag1: 'Whole Dried Roots',
    closingTag2: 'Zero Synthetic Fillers',
    closingTag3: 'Small-Batch Potency',
    closingNote1Title: 'Raw Single-Origin Sourcing',
    closingNote1Desc: 'Wild ginger, peppermint leaves, saffron stigmas, and unheated honey selected prior to every batch.',
    closingNote2Title: 'Unani & Ayurvedic Integrity',
    closingNote2Desc: 'Slow earthen & steel compounding retains volatile botanical oils without chemical preservatives.',
    closingAlt: 'Fresh ginger root, mint leaves, white floral petals, and botanical capsules on white marble',
  };

  return (
    <div className="space-y-14 md:space-y-20 pb-8 md:pb-10 w-full select-none">
      {/* Flush Header-to-Hero Band: Zero gap under Announcement Bar */}
      <div className="w-full">
        {/* Live Announcement Bar: Constant single-line with ellipsis on PC, smooth ticker on Mobile */}
        {activeAnnouncement && (
          <div className="w-full bg-ifaqa-plum text-ifaqa-linen border-b border-ifaqa-mauve/25 h-9 overflow-hidden">
            {/* Desktop (md+): Static single-line centered with automatic "..." ellipsis if overflowing */}
            <div className="hidden md:flex w-full max-w-[1440px] mx-auto px-6 lg:px-10 h-full items-center justify-center gap-3 text-xs font-sans">
              {activeAnnouncement.badgeText && (
                <span className="px-2 py-0.5 rounded bg-ifaqa-mauve text-[#0F1714] font-medium shrink-0">
                  {activeAnnouncement.badgeText}
                </span>
              )}
              <span className="min-w-0 truncate">
                {activeAnnouncement.headline}
              </span>
              {activeAnnouncement.ctaText && activeAnnouncement.ctaLink && (
                <Link
                  href={activeAnnouncement.ctaLink}
                  className="underline font-medium text-ifaqa-sand hover:text-white inline-flex items-center gap-1 shrink-0 whitespace-nowrap"
                >
                  <span>{activeAnnouncement.ctaText}</span>
                  <ArrowRight className="w-3 h-3 rtl-flip" strokeWidth={1.5} />
                </Link>
              )}
            </div>

            {/* Mobile (< md): Crisp single-line smooth continuous ticker */}
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
                        <ArrowRight className="w-3 h-3 rtl-flip" strokeWidth={1.5} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 1. Unified Edge-to-Edge Editorial Hero — Flush below header/announcement on Desktop & Mobile */}
        <section className="relative w-full bg-[#F7F6F4] border-b border-ifaqa-plum/10 overflow-hidden">
          {/* Unified Full-Bleed Hero Photograph (Desktop + Mobile behind text) */}
          <div className="absolute inset-0 pointer-events-none">
            <ShimmerImage
              src="/images/hero-mortar-botanical.webp"
              alt={heroCopy.imageAlt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-[76%_bottom] md:object-[74%_58%] rtl:object-[24%_58%]"
            />

            {/* Mobile Vertical Scrim: readable top typography, mortar & herbs visible below */}
            <div
              className="md:hidden absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(250,248,245,0.92) 0%, rgba(250,248,245,0.82) 48%, rgba(250,248,245,0.28) 76%, rgba(250,248,245,0.04) 100%)',
              }}
            />

            {/* Desktop Horizontal Scrim (LTR / RTL) */}
            <div
              className="hidden md:block rtl:hidden absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.92) 34%, rgba(250,248,245,0.58) 54%, rgba(250,248,245,0.08) 76%, rgba(250,248,245,0) 100%)',
              }}
            />
            <div
              className="hidden rtl:md:block absolute inset-0"
              style={{
                background:
                  'linear-gradient(270deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.92) 34%, rgba(250,248,245,0.58) 54%, rgba(250,248,245,0.08) 76%, rgba(250,248,245,0) 100%)',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-ifaqa-linen/90 to-transparent" />
          </div>

          {/* Hero Typography & Actions over Full-Bleed Canvas */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-44 sm:pb-52 md:py-24 lg:py-28">
            <div className="max-w-xl space-y-5 ifaqa-hero-rise">
              <p className="border-s-2 border-ifaqa-mauve ps-3 text-xs sm:text-sm font-sans text-[#5A6962]">
                {heroCopy.eyebrow}
              </p>

              <h1 className="font-serif font-normal text-4xl sm:text-5xl lg:text-[56px] text-ifaqa-plum leading-[1.06] tracking-[-0.025em]">
                {heroCopy.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#3E524A] font-sans leading-relaxed max-w-lg">
                {heroCopy.subhead}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-sans font-medium transition-colors active:scale-[0.98] whitespace-nowrap"
                >
                  <span>{heroCopy.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-white/90 backdrop-blur-sm border border-ifaqa-plum/15 text-ifaqa-plum hover:bg-ifaqa-cashmere text-sm font-sans font-medium transition-colors active:scale-[0.98] whitespace-nowrap"
                >
                  {heroCopy.secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Health Categories Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-ifaqa-plum/10 gap-2">
          <div>
            <p className="text-xs font-sans text-[#5A6962] mb-1">
              {heroCopy.browseLabel}
            </p>
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum leading-tight">
              {t('categoriesTitle')}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-sans font-medium text-ifaqa-plum hover:text-ifaqa-blackberry inline-flex items-center gap-1.5 group whitespace-nowrap"
          >
            <span>{heroCopy.viewAll}</span>
            <ArrowRight className="w-4 h-4 rtl-flip transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>

        {!catalogReady ? (
          <CategoryGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr ifaqa-content-appear">
            {categoriesWithLiveCounts.map((category) => (
              <Link
                key={category.id}
                href={`/catalog/${category.slug}`}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-white border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 shadow-luxury-card hover:shadow-luxury-lifted transition-[border-color,box-shadow] duration-150"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-sans font-semibold text-base sm:text-lg text-ifaqa-plum group-hover:text-ifaqa-blackberry transition-colors truncate">
                      {getCategoryTitle(category)}
                    </h3>
                    <span className="font-mono text-xs text-[#5A6962] bg-ifaqa-cashmere px-2 py-0.5 rounded shrink-0 tabular-nums">
                      {category.remedyCount}
                    </span>
                  </div>
                  <p className="text-sm text-[#5A6962] font-sans line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ifaqa-plum/10 flex items-center justify-between text-xs font-sans font-medium text-ifaqa-plum">
                  <span>{t('explorePharmacopoeia')}</span>
                  <ArrowRight className="w-4 h-4 text-[#5A6962] group-hover:text-ifaqa-plum rtl-flip" strokeWidth={1.5} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Mid-Page Promotional Feature Banner (Admin Controlled) */}
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
                <ArrowRight className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* 3. Featured Remedies */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-ifaqa-plum/10 gap-2">
          <div>
            <p className="text-xs font-sans text-[#5A6962] mb-1">
              {heroCopy.popularEyebrow}
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
            <ArrowRight className="w-4 h-4 rtl-flip transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.5} />
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

      {/* Bottom Editorial Band + Quality Pillars (tight balanced rhythm) */}
      <div className="space-y-8 md:space-y-10">
        {/* 4. Merged Full-Bleed Botanical Philosophy Showcase (Image 3 seamlessly integrated on Desktop & Mobile) */}
        <section className="relative w-full border-y border-ifaqa-plum/10 bg-[#F5F4F2] overflow-hidden ifaqa-scroll-reveal">
          {/* Unified Full-Bleed Image 3 Backdrop */}
          <div className="absolute inset-0 pointer-events-none">
            <ShimmerImage
              src="/images/home-closing-botanicals.webp"
              alt={heroCopy.closingAlt}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover object-[center_bottom] md:object-[82%_center] rtl:object-[18%_center]"
            />

            {/* Mobile Vertical Scrim */}
            <div
              className="md:hidden absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(250,248,245,0.95) 0%, rgba(250,248,245,0.88) 54%, rgba(250,248,245,0.32) 78%, rgba(250,248,245,0.04) 100%)',
              }}
            />

            {/* Desktop Horizontal Scrim (LTR / RTL) */}
            <div
              className="hidden md:block rtl:hidden absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.93) 40%, rgba(250,248,245,0.62) 60%, rgba(250,248,245,0.08) 80%, rgba(250,248,245,0) 100%)',
              }}
            />
            <div
              className="hidden rtl:md:block absolute inset-0"
              style={{
                background:
                  'linear-gradient(270deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.93) 40%, rgba(250,248,245,0.62) 60%, rgba(250,248,245,0.08) 80%, rgba(250,248,245,0) 100%)',
              }}
            />
          </div>

          {/* Merged Editorial Copy & Botanical Sourcing Notes (No Action Buttons) */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-48 sm:pb-52 md:py-16 lg:py-20">
            <div className="max-w-xl space-y-5">
              <p className="border-s-2 border-ifaqa-mauve ps-3 text-xs font-sans font-medium text-[#5A6962]">
                {heroCopy.closingEyebrow}
              </p>
              <h2 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum leading-[1.12]">
                {heroCopy.closingTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#3E524A] font-sans leading-relaxed max-w-lg">
                {heroCopy.closingBody}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="ruled-badge px-2.5 py-1 text-xs font-medium">
                  {heroCopy.closingTag1}
                </span>
                <span className="ruled-badge px-2.5 py-1 text-xs font-medium">
                  {heroCopy.closingTag2}
                </span>
                <span className="ruled-badge px-2.5 py-1 text-xs font-medium">
                  {heroCopy.closingTag3}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-white/85 backdrop-blur-sm border border-ifaqa-plum/10 space-y-1">
                  <h3 className="text-xs font-semibold text-ifaqa-plum">
                    {heroCopy.closingNote1Title}
                  </h3>
                  <p className="text-xs text-[#5A6962] leading-relaxed">
                    {heroCopy.closingNote1Desc}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/85 backdrop-blur-sm border border-ifaqa-plum/10 space-y-1">
                  <h3 className="text-xs font-semibold text-ifaqa-plum">
                    {heroCopy.closingNote2Title}
                  </h3>
                  <p className="text-xs text-[#5A6962] leading-relaxed">
                    {heroCopy.closingNote2Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Preparation & Quality Pillars (Compact balanced vertical margins) */}
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
    </div>
  );
}
