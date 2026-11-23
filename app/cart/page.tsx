'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { ShippingProgressBar } from '@/components/cart/ShippingProgressBar';
import { Button3D } from '@/components/ui/Button3D';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { formatPriceINR } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

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
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-12 overflow-x-hidden space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-ifaqa-sand/60 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ArchitecturalBadge variant="notched">{t('genuineQuality')}</ArchitecturalBadge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ifaqa-plum">
            {t('cart')} ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/catalog"
            className="text-xs font-serif uppercase tracking-widest text-ifaqa-plum hover:text-ifaqa-blackberry font-bold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-serif text-ifaqa-blackberry hover:text-red-700 underline font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-16 text-center bg-white border border-ifaqa-sand/60 space-y-5 shadow-sm max-w-lg mx-auto my-12">
          <div className="w-20 h-20 mx-auto bg-ifaqa-linen flex items-center justify-center text-4xl border border-ifaqa-sand/50 shadow-sm">
            🌿
          </div>
          <h2 className="font-serif text-2xl font-bold text-ifaqa-plum">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans leading-relaxed font-medium">
            Explore our classical remedies catalog to find potent formulations for your specific health needs.
          </p>
          <div className="pt-2">
            <Link href="/catalog">
              <Button3D variant="primary" size="md" className="font-bold">
                <span>Browse All Remedies</span>
                <ArrowRight className="w-4 h-4 ml-1.5 inline-block" />
              </Button3D>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Item Rows (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-ifaqa-sand/60 p-4 sm:p-6 shadow-sm">
              <ShippingProgressBar subtotal={subtotalPKR} />
            </div>

            <div className="bg-white border border-ifaqa-sand/60 divide-y divide-ifaqa-sand/30 shadow-sm">
              {items.map((item) => (
                <CartItemRow key={item.remedyId} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary Card (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-ifaqa-sand/70 p-6 sm:p-8 space-y-6 shadow-luxury-card sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-ifaqa-sand/40">
              <h3 className="font-serif text-lg font-bold text-ifaqa-plum">
                Order Summary
              </h3>
              <ArchitecturalBadge variant="diamond">Dispensary Direct</ArchitecturalBadge>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div className="flex items-center justify-between text-ifaqa-blackberry font-medium">
                <span>Subtotal ({itemCount} items):</span>
                <span className="font-mono font-bold text-ifaqa-plum text-sm">
                  {formatPriceINR(subtotalPKR)}
                </span>
              </div>

              <div className="flex items-center justify-between text-ifaqa-blackberry font-medium">
                <span>Pan-India Courier:</span>
                <span className="font-mono font-bold text-ifaqa-plum">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-800 uppercase font-bold">Free</span>
                  ) : (
                    formatPriceINR(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-ifaqa-sand/40 flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-ifaqa-plum">Total Amount:</span>
                <span className="font-serif text-2xl font-bold text-ifaqa-plum">
                  {formatPriceINR(totalAmount)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/checkout" className="block w-full">
                <Button3D variant="primary" size="lg" className="w-full font-bold shadow-md">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                </Button3D>
              </Link>
            </div>

            <div className="pt-4 border-t border-ifaqa-sand/30 space-y-2 text-[11px] font-sans text-ifaqa-blackberry font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-ifaqa-plum shrink-0" />
                <span>Pan-India Doorstep Delivery to All Pincodes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-ifaqa-plum shrink-0" />
                <span>100% Genuine Desi Dawakhana Medicines</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
