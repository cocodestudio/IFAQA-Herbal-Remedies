'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { Button3D } from '@/components/ui/Button3D';
import { formatPriceINR } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Trash2, ArrowLeft, ShieldCheck, Truck, Leaf } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    subtotalPKR,
    shippingFee,
    totalAmount,
    clearCart,
    itemCount,
  } = useCart();
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12 space-y-8 select-none">
      {/* Page Header */}
      <div className="border-b border-ifaqa-plum/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-sans text-[#5A6962] mb-1">
            {t('genuineQuality')}
          </p>
          <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum tabular-nums">
            {t('cart')} ({itemCount} {itemCount === 1 ? t('itemInCart') : t('itemsInCart')})
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/catalog"
            className="text-sm font-sans font-medium text-ifaqa-plum hover:underline inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
            <span>Continue shopping</span>
          </Link>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm font-sans text-[#5A6962] hover:text-red-700 inline-flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              <span>Clear cart</span>
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-10 sm:p-14 text-center bg-white rounded-xl border border-ifaqa-plum/10 shadow-luxury-card space-y-5 max-w-lg mx-auto my-8">
          <div className="w-12 h-12 rounded-xl mx-auto bg-ifaqa-cashmere flex items-center justify-center text-[#5A6962]">
            <Leaf className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif font-normal text-2xl text-ifaqa-plum">
              {t('cartEmptyTitle')}
            </h2>
            <p className="text-sm text-[#5A6962] font-sans leading-relaxed">
              {t('cartEmptyDesc')}
            </p>
          </div>
          <div>
            <Link href="/catalog">
              <Button3D variant="primary" size="md">
                <span>{t('shopProducts')}</span>
                <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
              </Button3D>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-ifaqa-plum/10 divide-y divide-ifaqa-plum/10 shadow-luxury-card overflow-hidden">
              {items.map((item) => (
                <CartItemRow key={item.remedyId} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-ifaqa-plum/10 p-6 space-y-5 shadow-luxury-card lg:sticky lg:top-24">
            <div className="pb-3 border-b border-ifaqa-plum/10">
              <h3 className="font-sans text-base font-semibold text-ifaqa-plum">
                Order summary
              </h3>
            </div>

            <div className="space-y-3 text-sm font-sans tabular-nums">
              <div className="flex items-center justify-between text-[#5A6962]">
                <span>{t('subtotal')} ({itemCount})</span>
                <span className="font-medium text-ifaqa-plum">
                  {formatPriceINR(subtotalPKR)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#5A6962]">
                <span>Pan-India courier</span>
                <span className="font-medium text-ifaqa-plum">
                  {shippingFee === 0 ? (
                    <span className="text-[#165A45]">Free</span>
                  ) : (
                    formatPriceINR(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-ifaqa-plum/10 flex items-center justify-between">
                <span className="font-medium text-ifaqa-plum">{t('total')}</span>
                <span className="font-sans text-xl font-semibold text-ifaqa-plum">
                  {formatPriceINR(totalAmount)}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button3D variant="primary" size="lg" className="w-full justify-between">
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4 rtl-flip" strokeWidth={1.5} />
              </Button3D>
            </Link>

            <div className="pt-4 border-t border-ifaqa-plum/10 space-y-2 text-xs text-[#5A6962]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>Direct courier dispatch across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>Tamper-proof sealed amber glass & jars</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
