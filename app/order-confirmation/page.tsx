'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import { CheckCircle2, Printer, ArrowRight, ShieldCheck, Clock, Package, RefreshCw, Truck } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'IFA-2026-1001';
  const orderId = searchParams.get('orderId') || 'order_ref_confirmed';

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 overflow-x-hidden space-y-8 select-none">
      {/* Confirmation Card */}
      <div className="bg-white border-2 border-ifaqa-sand/60 p-8 md:p-12 shadow-luxury-card text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-emerald-50 border border-emerald-900/40 flex items-center justify-center text-emerald-800 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <ArchitecturalBadge variant="notched">Dispensary Order Confirmed</ArchitecturalBadge>
            <ArchitecturalBadge variant="diamond">Recorded in Firestore</ArchitecturalBadge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ifaqa-plum">
            Thank You for Entrusting IFAQA
          </h1>
          <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans max-w-md mx-auto leading-relaxed font-medium">
            Your classical herbal remedy order has been recorded in our dispensary repository and submitted to the Chief Compounding Specialist for dispatch.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="p-5 bg-ifaqa-linen border border-ifaqa-sand/70 inline-block text-left min-w-[300px] shadow-sm">
          <span className="text-[11px] font-serif uppercase tracking-widest text-ifaqa-blackberry font-bold block">
            Official Order Reference Number
          </span>
          <span className="font-mono text-2xl font-bold text-ifaqa-plum tracking-wider block mt-1">
            {orderNumber}
          </span>
          <span className="text-[11px] text-ifaqa-blackberry font-mono block mt-1">
            Tracking ID: {orderId}
          </span>
        </div>

        {/* Fulfillment Pipeline Timeline */}
        <div className="pt-6 border-t border-ifaqa-sand/40 max-w-md mx-auto">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-ifaqa-plum mb-4">
            Dispensary Fulfillment Stages
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            <div className="space-y-1">
              <div className="w-7 h-7 mx-auto bg-emerald-800 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="text-emerald-900 font-bold block">Received</span>
            </div>
            <div className="space-y-1">
              <div className="w-7 h-7 mx-auto bg-ifaqa-sand text-ifaqa-plum flex items-center justify-center font-bold">
                2
              </div>
              <span className="text-ifaqa-plum font-bold block">Compounding</span>
            </div>
            <div className="space-y-1">
              <div className="w-7 h-7 mx-auto bg-ifaqa-linen border border-ifaqa-sand/60 text-ifaqa-blackberry flex items-center justify-center font-bold">
                3
              </div>
              <span className="text-ifaqa-blackberry block">Dispatched</span>
            </div>
            <div className="space-y-1">
              <div className="w-7 h-7 mx-auto bg-ifaqa-linen border border-ifaqa-sand/60 text-ifaqa-blackberry flex items-center justify-center font-bold">
                4
              </div>
              <span className="text-ifaqa-blackberry block">Delivered</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-ifaqa-sand text-ifaqa-plum text-xs font-serif font-bold uppercase tracking-wider hover:bg-ifaqa-sand/20 transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <Link href="/catalog" className="w-full sm:w-auto">
            <Button3D variant="primary" size="md" className="w-full sm:w-auto font-bold shadow-md">
              <span>Return to Pharmacopoeia</span>
              <ArrowRight className="w-4 h-4 ml-1.5 inline-block" />
            </Button3D>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4 py-16 text-center text-ifaqa-blackberry font-serif text-sm font-medium">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-ifaqa-plum" />
          <span>Verifying order records...</span>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
