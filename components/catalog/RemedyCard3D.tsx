'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HerbalRemedy } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPriceINR } from '@/lib/formatters';
import { Sparkles, Check, ArrowRight, Plus } from 'lucide-react';

interface RemedyCard3DProps {
  remedy: HerbalRemedy;
}

export function RemedyCard3D({ remedy }: RemedyCard3DProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { addToCart } = useCart();
  const { t, getRemedyTitle, getRemedySubtitle } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on larger desktop screens
    if (typeof window !== 'undefined' && window.innerWidth < 640) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    const maxTilt = 7;
    const rotX = Math.max(-maxTilt, Math.min(maxTilt, -normY * maxTilt));
    const rotY = Math.max(-maxTilt, Math.min(maxTilt, normX * maxTilt));

    setTilt({
      rotateX: Object.is(rotX, -0) ? 0 : rotX,
      rotateY: Object.is(rotY, -0) ? 0 : rotY,
    });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (remedy.slug) {
      router.prefetch(`/remedy/${remedy.slug}`);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const isAvailable = remedy.isAvailable && remedy.stockQuantity > 0;
  const displayTitle = getRemedyTitle(remedy);
  const displaySubtitle = getRemedySubtitle(remedy);

  const discountPct = remedy.comparePricePKR && remedy.comparePricePKR > remedy.pricePKR
    ? Math.round(((remedy.comparePricePKR - remedy.pricePKR) / remedy.comparePricePKR) * 100)
    : 0;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable) {
      addToCart(remedy, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    setIsNavigating(true);
    router.push(`/remedy/${remedy.slug}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="group relative cursor-pointer h-full flex flex-col select-none"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.01)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: isHovered
            ? 'transform 100ms ease-out, box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative overflow-hidden bg-white border ${
          isNavigating ? 'border-ifaqa-mauve ring-2 ring-ifaqa-mauve/40' : 'border-ifaqa-sand/60'
        } shadow-luxury-card hover:shadow-luxury-lifted active:scale-[0.99] transition-all duration-150 flex flex-col justify-between h-full`}
      >
        {/* Silent Shimmer Transition Overlay on Navigation (Zero text, pure luxury gradient wave) */}
        {isNavigating && (
          <div className="absolute inset-0 z-30 bg-white/70 backdrop-blur-[1px] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DFBA73]/30 to-transparent animate-[shimmer_1.2s_infinite]" />
          </div>
        )}

        {/* Specular Light Sheen Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(223, 186, 115, 0.22), transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* ============================================================== */}
        {/* MOBILE VIEW (Amazon / Flipkart Horizontal Row Layout: < sm) */}
        {/* ============================================================== */}
        <div className="flex sm:hidden p-3 gap-3 items-center">
          {/* Left Thumbnail Image */}
          <div className="relative w-24 h-24 shrink-0 bg-gradient-to-b from-[#FAF8F5] to-[#F5F0E6] border border-ifaqa-sand/50 flex items-center justify-center p-1 overflow-hidden">
            {remedy.primaryImage && !imageError ? (
              <Image
                src={remedy.primaryImage}
                alt={displayTitle}
                fill
                sizes="96px"
                onError={() => setImageError(true)}
                className="object-contain filter contrast-[1.02]"
              />
            ) : (
              <div className="w-10 h-10 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            )}
            {/* Mobile Tag */}
            <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-serif font-bold uppercase bg-ifaqa-plum text-ifaqa-sand border border-ifaqa-sand/40">
              {remedy.isBestSeller ? '★ Best' : remedy.form}
            </span>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1">
            <h3 className="font-serif text-sm font-bold text-ifaqa-plum truncate" title={displayTitle}>
              {displayTitle}
            </h3>
            <p className="text-[11px] text-ifaqa-blackberry font-sans truncate font-medium">
              {displaySubtitle}
            </p>

            {/* Price Row: strictly Single-Line */}
            <div className="flex items-baseline gap-2 whitespace-nowrap pt-0.5">
              <span className="font-serif text-base font-bold text-ifaqa-plum whitespace-nowrap">
                {formatPriceINR(remedy.pricePKR)}
              </span>
              {remedy.comparePricePKR && (
                <span className="text-[11px] text-stone-400 line-through font-mono whitespace-nowrap">
                  {formatPriceINR(remedy.comparePricePKR)}
                </span>
              )}
              {discountPct > 0 && (
                <span className="text-[10px] font-bold text-emerald-800 whitespace-nowrap font-sans">
                  {discountPct}% off
                </span>
              )}
            </div>

            {/* Delivery & Quick Add Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                Free Delivery
              </span>
              <button
                onClick={handleAddToCartClick}
                disabled={!isAvailable}
                className={`px-3 py-1 text-[11px] font-serif font-bold uppercase tracking-wider flex items-center gap-1 ${
                  justAdded
                    ? 'bg-emerald-800 text-white'
                    : 'bg-ifaqa-plum text-white hover:bg-ifaqa-blackberry'
                } border border-ifaqa-sand/40 shadow-sm`}
              >
                {justAdded ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (Expanded Luxury Card: >= sm) */}
        {/* ============================================================== */}
        <div className="hidden sm:flex sm:flex-col justify-between h-full p-5 lg:p-6">
          <div>
            {/* Large Product Presentation Area */}
            <div
              className="relative h-44 sm:h-52 w-full bg-gradient-to-b from-[#FAF8F5] to-[#F5F0E6] border border-ifaqa-sand/50 flex flex-col items-center justify-center overflow-hidden mb-4 transition-transform duration-250 p-3 group-hover:border-ifaqa-plum/40"
              style={{
                transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
              }}
            >
              <div className="absolute inset-1.5 border border-ifaqa-sand/30 pointer-events-none" />

              {/* Top Right Tag */}
              <div className="absolute top-2.5 right-2.5 z-20">
                <span className="inline-block px-2.5 py-1 text-[10px] font-serif font-bold uppercase tracking-wider bg-ifaqa-plum text-ifaqa-sand border border-ifaqa-sand/40 shadow-sm">
                  {remedy.isBestSeller ? '★ Best Seller' : remedy.form}
                </span>
              </div>

              {remedy.primaryImage && !imageError ? (
                <div className="relative w-full h-full flex items-center justify-center p-1">
                  <Image
                    src={remedy.primaryImage}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    onError={() => setImageError(true)}
                    className="object-contain filter contrast-[1.02] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="text-center z-10">
                  <div className="w-12 h-12 mx-auto mb-2 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center border border-ifaqa-sand/50 shadow-sm group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-xs font-bold uppercase tracking-widest text-ifaqa-plum block">
                    {remedy.form} • {remedy.packaging?.size || 'Standard'}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-ifaqa-blackberry mt-0.5 block">
                    {remedy.sku}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3
                className="font-serif text-base sm:text-lg font-bold text-ifaqa-plum group-hover:text-ifaqa-blackberry transition-colors leading-snug line-clamp-1"
                title={displayTitle}
              >
                {displayTitle}
              </h3>
              <p className="text-xs text-ifaqa-blackberry font-semibold mt-1 font-sans line-clamp-1">
                {displaySubtitle}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs text-ifaqa-plum/90 line-clamp-2 mt-2 leading-relaxed font-sans font-normal">
              {remedy.shortDescription}
            </p>

            {/* Indications Preview */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(remedy.therapeuticIndications || []).slice(0, 2).map((ind, idx) => (
                <span
                  key={idx}
                  className="inline-block text-[10px] px-2 py-0.5 font-sans font-medium bg-[#FAF5EC] text-ifaqa-plum border-l-2 border-ifaqa-mauve truncate max-w-[140px]"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & Add to Cart Footer (Single-line price, no wrapping) */}
          <div className="mt-5 pt-3.5 border-t border-ifaqa-sand/40 flex items-center justify-between gap-3 bg-[#FAF8F5]/80 -mx-5 lg:-mx-6 -mb-5 lg:-mb-6 p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 whitespace-nowrap flex-nowrap">
                <span className="font-serif text-lg sm:text-xl font-bold text-ifaqa-plum whitespace-nowrap">
                  {formatPriceINR(remedy.pricePKR)}
                </span>
                {remedy.comparePricePKR && (
                  <span className="text-xs text-stone-400 line-through font-mono whitespace-nowrap">
                    {formatPriceINR(remedy.comparePricePKR)}
                  </span>
                )}
                {discountPct > 0 && (
                  <span className="text-[11px] font-bold text-emerald-800 whitespace-nowrap font-sans">
                    ({discountPct}% off)
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider mt-0.5">
                Free Express Delivery
              </span>
            </div>

            <button
              onClick={handleAddToCartClick}
              disabled={!isAvailable}
              className={`px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider shrink-0 select-none flex items-center gap-1.5 ${
                justAdded
                  ? 'bg-emerald-800 text-white'
                  : 'bg-ifaqa-plum text-white hover:bg-ifaqa-blackberry hover:text-[#FAF5EC] border border-ifaqa-sand/40'
              } active:scale-[0.97] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span className="text-white font-bold">{t('addedToCart')}</span>
                </>
              ) : isAvailable ? (
                <span className="text-white font-bold">{t('addToCart')}</span>
              ) : (
                <span className="text-white/70 font-bold">{t('outOfStock')}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
