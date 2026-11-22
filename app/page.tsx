'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRemedies, getCategories, getBanners } from '@/lib/remedies-service';
import { HerbalRemedy, AilmentCategory, PromotionalBanner } from '@/lib/types';
import { RemedyCard3D } from '@/components/catalog/RemedyCard3D';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
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
              ? 'bg-gradient-to-br from-[#88A2BF] to-[#141318]'
              : 'bg-gradient-to-br from-[#B2949D] to-[#6B5F6F]';

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
                {/* Subtle Overlay Pattern */}
                <div className="absolute inset-0 bg-ifaqa-plum/35 mix-blend-multiply pointer-events-none" />

                <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 text-ifaqa-linen z-10">
                  <div className="max-w-3xl space-y-4 sm:space-y-6">
                    <ArchitecturalBadge variant="notched" className="bg-ifaqa-linen text-ifaqa-plum font-bold shadow-md">
                      {banner.badgeText || "IFAQA DESI DAWAKHANA HERITAGE"}
                    </ArchitecturalBadge>

                    <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight drop-shadow-sm text-white">
                      {banner.headline}
                    </h1>

                    <p className="text-base sm:text-lg text-ifaqa-linen/95 font-sans leading-relaxed max-w-2xl font-medium">
                      {banner.subheadline}
                    </p>

                    <div className="pt-3 flex flex-wrap gap-4">
                      <Link
                        href={banner.ctaLink || '/catalog'}
                        className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-serif font-bold tracking-widest uppercase bg-[#3E3239] text-white hover:bg-white hover:text-[#3E3239] border-2 border-white shadow-xl active:scale-[0.97] transition-all duration-200"
                      >
                        <span className="text-white group-hover:text-[#3E3239] font-bold">{banner.ctaText || t('explorePharmacopoeia')}</span>
                        <ArrowRight className="w-4 h-4 ml-2 inline-block text-white group-hover:text-[#3E3239]" />
                      </Link>
                      <Link
                        href="/catalog"
                        className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-serif font-bold tracking-widest uppercase bg-transparent text-white hover:bg-white hover:text-[#3E3239] border-2 border-white shadow-md active:scale-[0.97] transition-all duration-200"
                      >
                        <span className="text-white group-hover:text-[#3E3239] font-bold">All-India & Global Catalog</span>
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
                  currentSlide === idx ? 'w-10 bg-ifaqa-linen shadow-md' : 'w-4 bg-ifaqa-linen/40 hover:bg-ifaqa-linen/80'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. Classical Dispensary Virtues Bar - Full Width Stretched */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-ifaqa-sand/60 p-6 lg:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-ifaqa-linen border border-ifaqa-sand/40 text-ifaqa-plum shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
                100% Authentic Classical Formulas
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans mt-1 leading-relaxed font-medium">
                Compounded using authentic Unani & Ayurvedic recipes with zero artificial fillers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-ifaqa-linen border border-ifaqa-sand/40 text-ifaqa-plum shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
                Potent Botanical Extracts
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans mt-1 leading-relaxed font-medium">
                Wildcrafted herbs, seeds, minerals and hydro-distilled floral waters (*Arqiyat*).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-ifaqa-linen border border-ifaqa-sand/40 text-ifaqa-plum shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
                Proper Usage & Anupana
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans mt-1 leading-relaxed font-medium">
                Every remedy paired with exact traditional carrier guidelines for maximum efficacy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-ifaqa-linen border border-ifaqa-sand/40 text-ifaqa-plum shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
                All-India & Global Express
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans mt-1 leading-relaxed font-medium">
                Reliable doorstep delivery across all Indian pin codes, with worldwide international shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Ailment Categories Grid - Wide Responsive Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-ifaqa-sand/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ArchitecturalBadge variant="ruled">Ailment Dispensary</ArchitecturalBadge>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ifaqa-plum">
              {t('categoriesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-1 font-medium">
              Explore specialized desi herbal formulations targeting root causes of all physiological ailments.
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-serif uppercase tracking-widest text-ifaqa-plum hover:text-ifaqa-blackberry font-bold flex items-center gap-1.5 mt-3 sm:mt-0"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {categories.map((cat) => {
            const displayTitle = getCategoryTitle(cat);
            return (
              <Link
                key={cat.id}
                href={`/catalog/${cat.slug}`}
                className="group relative bg-white border border-ifaqa-sand/60 p-5 flex flex-col justify-between shadow-sm hover:shadow-luxury-lifted transition-all hover:border-ifaqa-plum duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-ifaqa-blackberry uppercase tracking-wider">
                      {cat.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-ifaqa-plum font-bold bg-ifaqa-sand/30 px-1.5 py-0.5">
                      {cat.remedyCount} Items
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-ifaqa-plum group-hover:text-ifaqa-blackberry transition-colors leading-snug">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-ifaqa-blackberry/90 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-ifaqa-sand/30 flex items-center justify-between text-xs font-serif text-ifaqa-plum font-bold">
                  <span className="text-[11px] uppercase tracking-wider text-ifaqa-blackberry">View Remedies</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Master Remedies - Full-Width Stretched 4-Column Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-ifaqa-sand/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ArchitecturalBadge variant="diamond">Empirical Selection</ArchitecturalBadge>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ifaqa-plum">
              {t('featuredTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-1 font-medium">
              Time-honored medicinal preparations crafted with genuine botanical ingredients and proven results.
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-serif uppercase tracking-widest text-ifaqa-plum hover:text-ifaqa-blackberry font-bold flex items-center gap-1.5 mt-3 sm:mt-0"
          >
            <span>{t('allFormulations')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {featuredRemedies.map((remedy) => (
            <RemedyCard3D key={remedy.id} remedy={remedy} />
          ))}
        </div>
      </section>

      {/* 5. Classical Heritage Narrative Section */}
      <section className="bg-ifaqa-plum text-ifaqa-linen py-16 md:py-24 border-y border-ifaqa-sand/40">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <ArchitecturalBadge variant="notched" className="bg-ifaqa-sand text-ifaqa-plum font-bold border-ifaqa-sand">
                The Botanical Tradition
              </ArchitecturalBadge>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
                Holistic Healing Through Authentic Jadi-Buti & Natural Formulations
              </h2>

              <p className="text-sm sm:text-base font-sans text-ifaqa-linen/95 leading-relaxed font-medium">
                At IFAQA Herbal Remedies, our desi dawakhana specializes in potent herbal formulations that treat illnesses at their root cause. Every medicine is prepared with meticulous attention to purity, botanical potency, and classical processing standards.
              </p>

              <p className="text-sm sm:text-base font-sans text-ifaqa-linen/90 leading-relaxed">
                Whether you are seeking relief from chronic digestive disorders, joint and musculoskeletal discomfort, respiratory issues, vitality deficiency, or dermatological ailments, our classical remedies provide lasting, result-driven healing without synthetic chemicals.
              </p>

              <div className="pt-2">
                <Link href="/catalog">
                  <Button3D variant="secondary" size="lg" className="bg-ifaqa-sand text-ifaqa-plum hover:bg-white font-bold shadow-md">
                    Explore All Available Remedies
                  </Button3D>
                </Link>
              </div>
            </div>

            {/* Heritage Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-ifaqa-linen/10 border border-ifaqa-sand/40">
                <span className="font-mono text-2xl text-ifaqa-sand font-bold block mb-2">01</span>
                <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  Root Cause Healing
                </h4>
                <p className="text-xs text-ifaqa-linen/90 mt-2 leading-relaxed">
                  Focusing on systemic equilibrium and strengthening bodily defenses rather than temporary symptomatic suppression.
                </p>
              </div>

              <div className="p-6 bg-ifaqa-linen/10 border border-ifaqa-sand/40">
                <span className="font-mono text-2xl text-ifaqa-sand font-bold block mb-2">02</span>
                <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  Pure Jadi Buti Sourcing
                </h4>
                <p className="text-xs text-ifaqa-linen/90 mt-2 leading-relaxed">
                  Wildcrafted herbs, pure saffron, natural resins, and potent botanical distillations compounded at peak harvest.
                </p>
              </div>

              <div className="p-6 bg-ifaqa-linen/10 border border-ifaqa-sand/40">
                <span className="font-mono text-2xl text-ifaqa-sand font-bold block mb-2">03</span>
                <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  High Patient Efficacy
                </h4>
                <p className="text-xs text-ifaqa-linen/90 mt-2 leading-relaxed">
                  Traditional preparations proven through generations of patient testimonials and empirical Dawakhana practice.
                </p>
              </div>

              <div className="p-6 bg-ifaqa-linen/10 border border-ifaqa-sand/40">
                <span className="font-mono text-2xl text-ifaqa-sand font-bold block mb-2">04</span>
                <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  Worldwide Safe Shipping
                </h4>
                <p className="text-xs text-ifaqa-linen/90 mt-2 leading-relaxed">
                  Dispatched in premium airtight amber glass and secure protective containers across India and globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
