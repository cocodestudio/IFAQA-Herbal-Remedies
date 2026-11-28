'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard';
import { ArrowLeft, ArrowRight, Leaf } from 'lucide-react';
import { Button3D } from '@/components/ui/Button3D';

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { items } = useCart();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12 space-y-8 select-none">
      {/* Page Header */}
      <div className="border-b border-ifaqa-plum/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-sans text-[#5A6962] mb-1">
            Secure order checkout
          </p>
          <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum">
            {t('checkout')}
          </h1>
        </div>
        <Link
          href="/cart"
          className="text-sm font-sans font-medium text-ifaqa-plum hover:underline inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Return to cart</span>
        </Link>
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
            <p className="text-sm text-[#5A6962] font-sans">
              Add at least one herbal product to your cart before checking out.
            </p>
          </div>
          <Link href="/catalog" className="inline-block">
            <Button3D variant="primary" size="md">
              <span>{t('shopProducts')}</span>
              <ArrowRight className="w-4 h-4 ms-2" strokeWidth={1.5} />
            </Button3D>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <OrderSummaryCard />
          </div>
        </div>
      )}
    </div>
  );
}
