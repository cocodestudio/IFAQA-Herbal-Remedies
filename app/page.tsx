'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import seedData from '@/lib/seed-data.json';
import { getRemedies, getCategories } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Leaf, ShieldCheck, Truck } from 'lucide-react';

export default function HomePage() {
  const [remedies, setRemedies] = useState<HerbalRemedy[]>(() => seedData.remedies as unknown as HerbalRemedy[]);
  const [categories, setCategories] = useState<AilmentCategory[]>(() => seedData.categories as unknown as AilmentCategory[]);
  const { language, t, getCategoryTitle } = useLanguage();

  useEffect(() => {
    async function loadData() {
      const [r, c] = await Promise.all([
        getRemedies(),
        getCategories(),
      ]);
      if (r && r.length > 0) setRemedies(r);
      if (c && c.length > 0) setCategories(c);
    }
    loadData();
  }, []);

  const featuredRemedies = remedies.filter(r => r.isFeatured || r.isBestSeller).slice(0, 8);

  const heroCopy = {
    en: {
      eyebrow: 'Saharanpur, India • Unani and Ayurvedic herbal house',
      headline: 'Pure Unani and Ayurvedic herbal remedies',
      subhead: 'Powders, electuaries, syrups, and oils prepared in small batches from whole dried roots, spices, and forest honey with zero synthetic fillers.',
      primaryCta: 'Shop products',
      secondaryCta: 'Our quality process',
      browseLabel: 'Health categories',
      viewAll: `All ${remedies.length} remedies`,
      popularEyebrow: 'Customer favorites',
      imageAlt: 'Amber glass apothecary jar with green lid, ceramic dish containing cardamom pods, crimson saffron threads, dried herbal roots, and brass spoon on natural linen',
    },
    hi: {
      eyebrow: 'सहारनपुर, भारत • यूनानी एवं आयुर्वेदिक हर्बल संस्थान',
      headline: 'शुद्ध यूनानी और आयुर्वेदिक हर्बल औषधियां',
      subhead: 'असली जड़ों, मसालों और जंगली शहद से छोटे बैच में तैयार माजून, चूर्ण, शर्बत और तेल — बिना किसी केमिकल मिलावट के।',
      primaryCta: 'सभी उत्पाद देखें',
      secondaryCta: 'निर्माण प्रक्रिया',
      browseLabel: 'स्वास्थ्य श्रेणियां',
      viewAll: `सभी ${remedies.length} उत्पाद`,
      popularEyebrow: 'प्रमुख उत्पाद',
      imageAlt: 'हर्बल जार, इलायची, केसर, जड़ी-बूटियों की जड़ें और पीतल की चम्मच',
    },
    ur: {
      eyebrow: 'سہارنپور، بھارت • یونانی اور آیورویدک نباتاتی دواخانہ',
      headline: 'خالص یونانی اور آیورویدک نباتاتی ادویات',
      subhead: 'اصل جڑوں، مسالوں اور قدرتی شہد سے چھوٹے بیجز میں تیار معجون، سفوف، شربت اور روغنیات — کیمیائی اجزاء سے مکمل پاک۔',
      primaryCta: 'تمام مصنوعات دیکھیں',
      secondaryCta: 'تیاری کا معیار',
      browseLabel: 'صحت کی اقسام',
      viewAll: `تمام ${remedies.length} مصنوعات`,
      popularEyebrow: 'مقبول مرکبات',
      imageAlt: 'نباتاتی دواؤں کا شیشے کا جار، الائچی، زعفران اور جڑی بوٹیاں',
    },
  }[language] || {
    eyebrow: 'Saharanpur, India • Unani and Ayurvedic herbal house',
    headline: 'Pure Unani and Ayurvedic herbal remedies',
    subhead: 'Powders, electuaries, syrups, and oils prepared in small batches from whole dried roots, spices, and forest honey with zero synthetic fillers.',
    primaryCta: 'Shop products',
    secondaryCta: 'Our quality process',
    browseLabel: 'Health categories',
    viewAll: `All ${remedies.length} remedies`,
    popularEyebrow: 'Customer favorites',
    imageAlt: 'Amber glass jar with cardamom, saffron, dried herbs, and brass spoon on natural linen',
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-20 w-full select-none">
      {/* 1. Editorial Scene Hero — #FAF8F5 Ground with Seamless Botanical Photograph */}
      <section className="relative w-full bg-ifaqa-linen border-b border-ifaqa-plum/10 overflow-hidden">
        {/* Desktop Full-Bleed Seamlessly Blended Visual */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full max-w-[1440px] mx-auto">
            <Image
              src="/images/hero-botanical.jpg"
              alt={heroCopy.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 100vw, 0px"
              className="object-cover object-right rtl:object-left"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, transparent 28%, rgba(0,0,0,0.85) 48%, #000 68%, #000 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 28%, rgba(0,0,0,0.85) 48%, #000 68%, #000 100%)',
              }}
            />
            {/* Bottom gentle blend to page ground */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ifaqa-linen to-transparent" />
          </div>
        </div>

        {/* Hero Typography & Actions */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-8 md:py-24 lg:py-28">
          <div className="max-w-xl space-y-5">
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
                className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum hover:bg-ifaqa-cashmere text-sm font-sans font-medium transition-colors active:scale-[0.98] whitespace-nowrap"
              >
                {heroCopy.secondaryCta}
              </Link>
            </div>
          </div>

          {/* Mobile Stacked Hero Photograph (Clean, no horizontal overflow) */}
          <div className="md:hidden mt-8 relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-ifaqa-plum/10 bg-white">
            <Image
              src="/images/hero-botanical.jpg"
              alt={heroCopy.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>
        </div>
      </section>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {categories.map((category) => (
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
      </section>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
          {featuredRemedies.map((remedy) => (
            <RemedyCard3D key={remedy.id} remedy={remedy} />
          ))}
        </div>
      </section>

      {/* 4. Preparation & Quality Pillars */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="bg-ifaqa-cashmere border border-ifaqa-plum/10 rounded-2xl p-6 sm:p-10">
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
  );
}
