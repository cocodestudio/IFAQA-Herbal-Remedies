'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
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
      className={`fixed inset-0 z-50 flex justify-end select-none transition-opacity duration-200 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="fixed inset-0 bg-[#0B2D22]/40 backdrop-blur-[2px]"
        onClick={closeCart}
      />

      <div
        className={`relative w-full max-w-md bg-ifaqa-linen border-s border-ifaqa-plum/10 h-full flex flex-col justify-between z-10 shadow-luxury-lifted transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-5 h-16 border-b border-ifaqa-plum/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <h3 className="font-sans text-sm font-semibold text-ifaqa-plum">
              {t('cart')}
            </h3>
            <span className="font-mono text-xs text-[#5A6962] tabular-nums">
              ({itemCount} {itemCount === 1 ? t('itemInCart') : t('itemsInCart')})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-[#5A6962] hover:bg-ifaqa-cashmere hover:text-ifaqa-plum transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart List */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-ifaqa-plum/10 bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ifaqa-cashmere flex items-center justify-center text-[#5A6962]">
                <Leaf className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="font-sans text-base font-medium text-ifaqa-plum">
                  {t('cartEmptyTitle')}
                </p>
                <p className="text-xs text-[#5A6962] font-sans leading-relaxed max-w-xs">
                  {t('cartEmptyDesc')}
                </p>
              </div>
              <Link
                href="/catalog"
                onClick={closeCart}
                className="h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen text-sm font-sans font-medium inline-flex items-center gap-2 hover:bg-ifaqa-blackberry transition-colors"
              >
                <span>{t('shopProducts')}</span>
                <ArrowRight className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow key={item.remedyId} item={item} />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-ifaqa-plum/10 bg-ifaqa-cashmere/40 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm font-sans">
                <span className="text-[#5A6962]">{t('subtotal')}</span>
                <span className="font-mono text-lg font-semibold text-ifaqa-plum tabular-nums">
                  {formatPriceINR(subtotalPKR)}
                </span>
              </div>
              <p className="text-xs text-[#5A6962] font-sans flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#165A45]" strokeWidth={1.5} />
                <span>{t('gstIncluded')}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button3D variant="primary" size="md" className="w-full justify-between">
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
                </Button3D>
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full h-9 leading-9 text-center text-xs font-sans font-medium text-[#5A6962] hover:text-ifaqa-plum transition-colors"
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
