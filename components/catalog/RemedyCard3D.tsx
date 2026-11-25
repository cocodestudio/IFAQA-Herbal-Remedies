'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HerbalRemedy } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPriceINR } from '@/lib/formatters';
import { Leaf, Check, Plus } from 'lucide-react';

interface RemedyCard3DProps {
  remedy: HerbalRemedy;
}

export function RemedyCard3D({ remedy }: RemedyCard3DProps) {
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { t, getRemedyTitle, getRemedySubtitle } = useLanguage();

  const handleMouseEnter = () => {
    if (remedy.slug) {
      router.prefetch(`/remedy/${remedy.slug}`);
    }
  };

  const isAvailable = remedy.isAvailable && remedy.stockQuantity > 0;
  const displayTitle = getRemedyTitle(remedy);
  const displaySubtitle = getRemedySubtitle(remedy);

  const discountPct =
    remedy.comparePricePKR && remedy.comparePricePKR > remedy.pricePKR
      ? Math.round(((remedy.comparePricePKR - remedy.pricePKR) / remedy.comparePricePKR) * 100)
      : 0;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAvailable) {
      addToCart(remedy, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1400);
    }
  };

  const handleCardClick = () => {
    router.push(`/remedy/${remedy.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      className="group relative cursor-pointer h-full flex flex-col select-none"
    >
      <div className="relative overflow-hidden bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 shadow-luxury-card hover:shadow-luxury-lifted transition-[border-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between h-full">
        {/* Mobile Layout (< sm): Compact horizontal row */}
        <div className="flex sm:hidden p-3.5 gap-3.5 items-center">
          <div className="relative w-24 h-24 shrink-0 rounded-lg bg-white border border-ifaqa-plum/10 flex items-center justify-center p-1 overflow-hidden">
            {remedy.primaryImage && !imageError ? (
              <Image
                src={remedy.primaryImage}
                alt={displayTitle}
                fill
                sizes="96px"
                onError={() => setImageError(true)}
                className="object-contain"
              />
            ) : (
              <Leaf className="w-5 h-5 text-[#5A6962]" strokeWidth={1.5} />
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-sans text-[#5A6962] truncate">
                {remedy.isBestSeller ? t('bestSellerBadge') : remedy.form}
              </span>
            </div>

            <h3 className="font-sans text-sm font-semibold text-ifaqa-plum truncate" title={displayTitle}>
              {displayTitle}
            </h3>

            <p className="text-xs text-[#5A6962] font-sans truncate">
              {displaySubtitle}
            </p>

            {/* Single-line price row */}
            <div className="flex items-baseline gap-2 whitespace-nowrap pt-0.5 tabular-nums">
              <span className="font-sans text-base font-semibold text-ifaqa-plum whitespace-nowrap">
                {formatPriceINR(remedy.pricePKR)}
              </span>
              {remedy.comparePricePKR && (
                <span className="text-xs text-[#5A6962]/70 line-through font-mono whitespace-nowrap">
                  {formatPriceINR(remedy.comparePricePKR)}
                </span>
              )}
              {discountPct > 0 && (
                <span className="text-xs font-medium text-[#165A45] whitespace-nowrap">
                  {discountPct}% off
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#5A6962]">
                {remedy.packaging?.size || ''}
              </span>
              <button
                onClick={handleAddToCartClick}
                disabled={!isAvailable}
                className={`h-8 px-3 rounded-lg text-xs font-sans font-medium inline-flex items-center gap-1 transition-colors active:scale-[0.98] disabled:opacity-50 ${
                  justAdded
                    ? 'bg-[#165A45] text-white'
                    : 'bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{t('addedToCart')}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout (>= sm): Quiet card with generous spacing & clear product art */}
        <div className="hidden sm:flex sm:flex-col justify-between h-full p-5">
          <div>
            {/* Image Container (Clean white background matched to sRGB product art) */}
            <div className="relative h-52 w-full rounded-lg bg-white border border-ifaqa-plum/10 flex flex-col items-center justify-center overflow-hidden mb-4 p-2">
              {remedy.isBestSeller && (
                <div className="absolute top-2.5 end-2.5 z-10">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-sans font-medium bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/10">
                    {t('bestSellerBadge')}
                  </span>
                </div>
              )}

              {remedy.primaryImage && !imageError ? (
                <div className="relative w-full h-full">
                  <Image
                    src={remedy.primaryImage}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    onError={() => setImageError(true)}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-center text-[#5A6962]">
                  <Leaf className="w-5 h-5 mx-auto mb-1.5" strokeWidth={1.5} />
                  <span className="text-xs font-sans block">
                    {remedy.form}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Subtitle */}
            <h3
              className="font-sans text-base font-semibold text-ifaqa-plum group-hover:text-ifaqa-blackberry transition-colors leading-snug line-clamp-1"
              title={displayTitle}
            >
              {displayTitle}
            </h3>
            <p className="text-xs text-[#5A6962] mt-1 font-sans line-clamp-1">
              {displaySubtitle}{remedy.packaging?.size ? ` · ${remedy.packaging.size}` : ''}
            </p>

            {/* Concise 2-line Benefit Description */}
            <p className="text-xs text-[#3E524A] line-clamp-2 mt-2 leading-relaxed font-sans">
              {remedy.shortDescription}
            </p>
          </div>

          {/* Single-line Tabular Price + Add to Cart */}
          <div className="mt-4 pt-3.5 border-t border-ifaqa-plum/10 flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-baseline gap-1.5 whitespace-nowrap tabular-nums">
              <span className="font-sans text-lg font-semibold text-ifaqa-plum whitespace-nowrap">
                {formatPriceINR(remedy.pricePKR)}
              </span>
              {remedy.comparePricePKR && (
                <span className="text-xs text-[#5A6962]/70 line-through font-mono whitespace-nowrap">
                  {formatPriceINR(remedy.comparePricePKR)}
                </span>
              )}
              {discountPct > 0 && (
                <span className="text-xs font-medium text-[#165A45] whitespace-nowrap">
                  {discountPct}% off
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCartClick}
              disabled={!isAvailable}
              className={`h-9 px-3.5 rounded-lg text-xs font-sans font-medium shrink-0 select-none inline-flex items-center gap-1.5 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                justAdded
                  ? 'bg-[#165A45] text-white'
                  : 'bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{t('addedToCart')}</span>
                </>
              ) : isAvailable ? (
                <span>{t('addToCart')}</span>
              ) : (
                <span>{t('outOfStock')}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
