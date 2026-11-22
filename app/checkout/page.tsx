'use client';

import React from 'react';
import Link from 'next/link';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Lock, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-12 overflow-x-hidden space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-ifaqa-sand/60 pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ArchitecturalBadge variant="notched">Dispensary Checkout</ArchitecturalBadge>
            <ArchitecturalBadge variant="diamond">256-Bit SSL Secured</ArchitecturalBadge>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ifaqa-plum">
            Order Placement & Dispatch
          </h1>
        </div>
        <Link
          href="/cart"
          className="text-xs font-serif uppercase tracking-widest text-ifaqa-plum hover:text-ifaqa-blackberry font-bold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Cart</span>
        </Link>
      </div>

      {/* Main Grid: Form (7 cols) + Order Summary (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <OrderSummaryCard />
        </div>
      </div>
    </div>
  );
}
