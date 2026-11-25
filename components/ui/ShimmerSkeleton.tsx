'use client';

import React from 'react';

export function ShimmerCard() {
  return (
    <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-5 flex flex-col justify-between h-full">
      <div className="space-y-3">
        <div className="w-full h-48 rounded-lg bg-ifaqa-cashmere/70" />
        <div className="h-4 rounded bg-ifaqa-cashmere w-3/4" />
        <div className="h-3 rounded bg-ifaqa-cashmere/70 w-1/2" />
      </div>
      <div className="mt-4 pt-3 border-t border-ifaqa-plum/10 flex items-center justify-between">
        <div className="h-5 rounded bg-ifaqa-cashmere w-16" />
        <div className="h-9 rounded-lg bg-ifaqa-cashmere w-24" />
      </div>
    </div>
  );
}

export function CatalogSkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
      {Array.from({ length: count }).map((_, idx) => (
        <ShimmerCard key={idx} />
      ))}
    </div>
  );
}

export function PDPSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-8 select-none">
      <div className="h-4 rounded bg-ifaqa-cashmere w-56" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square w-full rounded-xl bg-white border border-ifaqa-plum/10" />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="h-8 rounded bg-ifaqa-cashmere w-3/4" />
          <div className="h-4 rounded bg-ifaqa-cashmere/70 w-1/2" />
          <div className="p-6 rounded-xl bg-white border border-ifaqa-plum/10 space-y-4">
            <div className="h-8 rounded bg-ifaqa-cashmere w-40" />
            <div className="h-10 rounded-lg bg-ifaqa-cashmere/70 w-full" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 rounded-lg bg-ifaqa-cashmere" />
              <div className="h-11 rounded-lg bg-ifaqa-cashmere" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
