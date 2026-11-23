'use client';

import React from 'react';

export function ShimmerCard() {
  return (
    <div className="relative overflow-hidden bg-white border border-ifaqa-sand/50 p-4 sm:p-5 flex flex-col justify-between h-full shadow-sm animate-pulse">
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#DFBA73]/15 to-transparent animate-[shimmer_1.6s_infinite]" />

      {/* Desktop view skeleton */}
      <div className="hidden sm:block space-y-3">
        {/* Image Placeholder */}
        <div className="w-full h-44 bg-[#FAF5EC] border border-ifaqa-sand/30 flex items-center justify-center relative overflow-hidden">
          <div className="w-12 h-12 bg-ifaqa-sand/20 rounded-none" />
        </div>
        {/* Badge & Title */}
        <div className="h-4 bg-ifaqa-sand/25 w-3/4" />
        <div className="h-3 bg-ifaqa-sand/15 w-1/2" />
        {/* Description line */}
        <div className="h-2.5 bg-ifaqa-sand/10 w-full" />
        <div className="h-2.5 bg-ifaqa-sand/10 w-4/5" />
      </div>

      {/* Mobile view skeleton (Amazon-style horizontal) */}
      <div className="flex sm:hidden items-center gap-3">
        <div className="w-24 h-24 shrink-0 bg-[#FAF5EC] border border-ifaqa-sand/30" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-ifaqa-sand/25 w-4/5" />
          <div className="h-3 bg-ifaqa-sand/15 w-1/2" />
          <div className="h-3 bg-ifaqa-sand/20 w-2/3" />
        </div>
      </div>

      {/* Bottom price + button bar */}
      <div className="mt-4 pt-3 border-t border-ifaqa-sand/30 flex items-center justify-between">
        <div className="h-5 bg-ifaqa-sand/25 w-20" />
        <div className="h-8 bg-ifaqa-sand/30 w-24" />
      </div>
    </div>
  );
}

export function CatalogSkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 auto-rows-fr">
      {Array.from({ length: count }).map((_, idx) => (
        <ShimmerCard key={idx} />
      ))}
    </div>
  );
}

export function PDPSkeleton() {
  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-12 space-y-8 select-none animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-ifaqa-sand/20 w-64 mb-6" />

      {/* Dual column split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left column image skeleton */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square w-full bg-white border border-ifaqa-sand/40 p-6 flex items-center justify-center">
            <div className="w-32 h-32 bg-ifaqa-sand/15" />
          </div>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-white border border-ifaqa-sand/40" />
            ))}
          </div>
        </div>

        {/* Right column details skeleton */}
        <div className="lg:col-span-7 space-y-5">
          <div className="h-3 bg-ifaqa-sand/20 w-32" />
          <div className="h-8 bg-ifaqa-sand/30 w-3/4" />
          <div className="h-4 bg-ifaqa-sand/20 w-1/2" />
          <div className="h-4 bg-ifaqa-sand/15 w-40" />

          {/* Price box skeleton */}
          <div className="p-6 bg-white border border-ifaqa-sand/50 space-y-4">
            <div className="h-8 bg-ifaqa-sand/30 w-48" />
            <div className="h-4 bg-ifaqa-sand/15 w-64" />
            <div className="h-10 bg-ifaqa-sand/20 w-full" />
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-12 bg-ifaqa-sand/30" />
              <div className="h-12 bg-ifaqa-sand/20" />
            </div>
          </div>

          <div className="h-32 bg-white border border-ifaqa-sand/40 p-4" />
        </div>
      </div>
    </div>
  );
}
