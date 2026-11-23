'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from './CartItemRow';
import { Button3D } from '@/components/ui/Button3D';
import { formatPriceINR } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotalPKR, itemCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end select-none transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Luxury Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 bg-[#0B2D22]/65 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Side Drawer Container with smooth slide-in physics from the right */}
      <div
        className={`relative w-full max-w-md bg-[#FAF8F5] border-l-2 border-ifaqa-sand/70 h-full flex flex-col justify-between z-10 shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-ifaqa-sand/40 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center border border-ifaqa-sand/40">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
                {t('cart')}
              </h3>
              <p className="text-[10px] font-mono text-ifaqa-blackberry font-bold">
                {itemCount} {itemCount === 1 ? t('itemInCart') : t('itemsInCart')}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-ifaqa-plum hover:bg-ifaqa-sand/20 hover:text-ifaqa-blackberry transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reassurance Banner */}
        <div className="px-5 py-2.5 bg-[#FAF5EC] border-b border-ifaqa-sand/40 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#165A45] shrink-0" />
          <span className="text-[11px] font-sans font-medium text-ifaqa-plum">
            100% Genuine Herbal Medicines • Safe Tamper-Proof Packaging
          </span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-ifaqa-sand/30 bg-white/70">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 bg-[#FAF5EC] border border-ifaqa-sand/60 flex items-center justify-center text-3xl">
                🌿
              </div>
              <div className="space-y-1">
                <p className="font-serif text-base font-bold text-ifaqa-plum">
                  {t('cartEmptyTitle')}
                </p>
                <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed max-w-xs font-medium">
                  {t('cartEmptyDesc')}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-ifaqa-plum text-ifaqa-linen text-xs font-serif font-bold uppercase tracking-widest inline-flex items-center gap-2 hover:bg-ifaqa-blackberry transition-colors shadow-md"
                >
                  <span>{t('shopProducts')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ifaqa-sand" />
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow key={item.remedyId} item={item} />
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t-2 border-ifaqa-sand/60 bg-white space-y-4 shadow-lg">
            <div className="space-y-1.5 pb-2 border-b border-ifaqa-sand/30">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">{t('subtotal')}:</span>
                <span className="font-mono text-xl font-bold text-ifaqa-plum">
                  {formatPriceINR(subtotalPKR)}
                </span>
              </div>
              <p className="text-[10px] text-ifaqa-blackberry/80 font-sans flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>{t('gstIncluded')}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full"
              >
                <Button3D variant="primary" size="lg" className="w-full font-bold shadow-md justify-center">
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 inline-block text-ifaqa-sand" />
                </Button3D>
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full text-center py-2 text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold hover:text-ifaqa-blackberry transition-colors underline"
              >
                {t('viewFullCart')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
