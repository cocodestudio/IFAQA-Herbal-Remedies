'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRemedies, getCategories, getBanners } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory, PromotionalBanner } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles, BookOpen, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export default function HomePage() {
  const [remedies, setRemedies] = useState<HerbalRemedy[]>([]);
  const [categories, setCategories] = useState<AilmentCategory[]>([]);
  const [banners, setBanners] = useState<PromotionalBanner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, getCategoryTitle } = useLanguage();

  useEffect(() => {
    async function loadData() {
      const [r, c, b] = await Promise.all([
        getRemedies(),
        getCategories(),
        getBanners(),
      ]);
      setRemedies(r);
      setCategories(c);
      setBanners(b.filter(banner => banner.placement === 'hero'));
    }
    loadData();
  }, []);

  // Hero carousel auto-advance
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners]);

  const featuredRemedies = remedies.filter(r => r.isFeatured || r.isBestSeller).slice(0, 8);

  return (
    <div className="space-y-16 md:space-y-24 pb-24 w-full select-none">
      {/* 1. Hero Banner Carousel - Edge-to-Edge Full Width */}
      <section className="relative w-full overflow-hidden min-h-[480px] md:min-h-[600px] flex items-center bg-ifaqa-plum">
        {banners.length > 0 ? (
          banners.map((banner, index) => {
            const isActive = index === currentSlide;
            const gradientClass = banner.gradientOverlay === 'steel-night'
              ? 'bg-gradient-to-br from-[#0E3B2D] via-[#114535] to-[#061811]'
              : 'bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811]';

            return (
              <div
                key={banner.id}
                style={{
                  transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                className={`absolute inset-0 w-full h-full flex items-center ${gradientClass}`}
              >
                {/* Subtle Ambient Gold Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 text-ifaqa-linen z-10">
                  <div className="max-w-3xl space-y-4 sm:space-y-6">
                    <span className="inline-block px-3 py-1 text-xs font-serif font-bold uppercase tracking-widest bg-[#FAF5EC] text-ifaqa-plum border border-[#DFBA73] shadow-md">
                      {banner.badgeText || "IFAQA DESI DAWAKHANA HERITAGE"}
                    </span>

                    <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-md text-white">
                      {banner.headline}
                    </h1>

                    <p className="text-base sm:text-lg text-[#F5F0E6] font-sans leading-relaxed max-w-2xl font-medium">
                      {banner.subheadline}
                    </p>

                    <div className="pt-3 flex flex-wrap gap-4">
                      <Link
                        href={banner.ctaLink || '/catalog'}
                        className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-serif font-bold tracking-widest uppercase bg-ifaqa-mauve text-ifaqa-plum hover:bg-white hover:text-ifaqa-plum border-2 border-ifaqa-sand shadow-xl active:scale-[0.97] transition-all duration-200"
                      >
                        <span className="text-ifaqa-plum font-bold">{banner.ctaText || t('explorePharmacopoeia')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 inline-block text-ifaqa-plum" />
                      </Link>
                      <Link
                        href="/catalog"
                        className="group inline-flex items-center justify-center px-8 py-3.5 text-sm font-serif font-bold tracking-widest uppercase bg-transparent text-white hover:bg-white/10 border-2 border-white/80 shadow-md active:scale-[0.97] transition-all duration-200"
                      >
                        <span className="text-white font-bold">All-India & Global Catalog</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-24 text-ifaqa-linen">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">IFAQA Herbal Remedies • Classical Desi Dawakhana</h1>
            <p className="mt-3 text-lg text-ifaqa-linen/90">Pure Handcrafted Botanical Medicines For All Ailments</p>
          </div>
        )}

        {/* Carousel Rectangular Tick Controls */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-ifaqa-mauve shadow-md' : 'w-4 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. Therapeutic Disciplines Grid - Edge-to-Edge Container */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="notched">Apothecary Disciplines</ArchitecturalBadge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum mt-1">
              Therapeutic Systems
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-blackberry hover:text-ifaqa-plum mt-2 sm:mt-0 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog/${category.slug}`}
              className="group block p-6 bg-white border border-ifaqa-sand/60 hover:border-ifaqa-plum/60 shadow-luxury-card hover:shadow-luxury-lifted transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-ifaqa-blackberry">
                  {category.romanName || category.id}
                </span>
                <ArchitecturalBadge variant="chamfer">
                  {category.remedyCount} {category.remedyCount === 1 ? 'Remedy' : 'Remedies'}
                </ArchitecturalBadge>
              </div>
              <h3 className="font-serif text-lg font-bold text-ifaqa-plum group-hover:text-ifaqa-blackberry transition-colors">
                {getCategoryTitle(category)}
              </h3>
              <p className="text-xs text-ifaqa-plum/85 font-sans mt-2 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 pt-3 border-t border-ifaqa-sand/30 flex items-center justify-between text-xs font-serif font-bold text-ifaqa-blackberry group-hover:text-ifaqa-plum">
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured & Master Classical Remedies */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="notched">Master Dispensary Formulations</ArchitecturalBadge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum mt-1">
              {t('featuredRemedies')}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-blackberry hover:text-ifaqa-plum mt-2 sm:mt-0 flex items-center gap-1 group"
          >
            <span>{t('explorePharmacopoeia')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRemedies.map((remedy) => (
            <RemedyCard3D key={remedy.id} remedy={remedy} />
          ))}
        </div>
      </section>

      {/* 4. Classical Heritage Trust Banner */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="bg-[#FAF5EC] border-2 border-ifaqa-sand/70 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center mx-auto md:mx-0 border border-ifaqa-sand/60">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-ifaqa-plum">
                Canonical Greco-Arab Manuscripts
              </h3>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                Compounded strictly according to traditional Unani-Tibb & classical Ayurvedic scriptures without modern synthetic shortcuts.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center mx-auto md:mx-0 border border-ifaqa-sand/60">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-ifaqa-plum">
                100% Pure Wildcrafted Herbs
              </h3>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                Hand-harvested botanicals, pure saffron, calcined minerals, and natural honeys rigorously screened for empirical potency.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center mx-auto md:mx-0 border border-ifaqa-sand/60">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-ifaqa-plum">
                All-India & Global Dispensary
              </h3>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                Freshly sealed batch bottles shipped with speed and care to all pincodes across India and international destinations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
