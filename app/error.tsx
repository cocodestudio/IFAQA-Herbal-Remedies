'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.warn('Route boundary caught render notice:', error?.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center px-4 py-16 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-ifaqa-plum/15 shadow-luxury-card p-6 sm:p-8 text-center space-y-5">
        <div className="w-12 h-12 rounded-xl mx-auto bg-ifaqa-cashmere border border-ifaqa-plum/10 flex items-center justify-center text-ifaqa-plum">
          <AlertCircle className="w-5 h-5" strokeWidth={1.6} />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-ifaqa-plum">
            Something interrupted this page
          </h2>
          <p className="text-sm text-[#5A6962] leading-relaxed">
            Our storefront recovered safely without losing your cart or session. Try reloading this section below.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => reset()}
            className="h-10 px-5 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-medium inline-flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.6} />
            <span>Retry page</span>
          </button>
          <Link
            href="/"
            className="h-10 px-4 rounded-lg border border-ifaqa-plum/15 bg-white text-ifaqa-plum hover:bg-ifaqa-cashmere text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
            <span>Go home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
