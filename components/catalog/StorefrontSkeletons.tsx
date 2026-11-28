'use client';

import React from 'react';

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading herbal categories"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between min-h-[224px] sm:min-h-[244px] p-5 sm:p-6 rounded-2xl ifaqa-shimmer-surface border border-ifaqa-plum/10 shadow-luxury-card"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="h-6 w-24 rounded-md bg-white/55" />
            <div className="h-8 w-8 rounded-lg bg-white/55 shrink-0" />
          </div>
          <div className="space-y-2.5 pt-12">
            <div className="h-6 w-48 rounded-md bg-white/60" />
            <div className="h-3.5 w-full rounded bg-white/45" />
            <div className="h-3.5 w-4/5 rounded bg-white/45" />
            <div className="pt-2.5 border-t border-ifaqa-plum/10 flex items-center justify-between">
              <div className="h-3.5 w-28 rounded bg-white/55" />
              <div className="h-4 w-4 rounded bg-white/55" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RemedyGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading herbal remedies"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl border border-ifaqa-plum/10 shadow-luxury-card overflow-hidden flex flex-col justify-between h-full"
        >
          {/* Mobile row skeleton */}
          <div className="flex sm:hidden p-3.5 gap-3.5 items-center">
            <div className="w-24 h-24 shrink-0 rounded-lg ifaqa-shimmer-surface border border-ifaqa-plum/10" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-3 w-20 rounded ifaqa-shimmer-surface" />
              <div className="h-4 w-3/4 rounded ifaqa-shimmer-surface" />
              <div className="h-3 w-24 rounded ifaqa-shimmer-surface" />
              <div className="h-5 w-28 rounded ifaqa-shimmer-surface" />
              <div className="flex items-center justify-between pt-1">
                <div className="h-3 w-12 rounded ifaqa-shimmer-surface" />
                <div className="h-8 w-24 rounded-lg ifaqa-shimmer-surface" />
              </div>
            </div>
          </div>

          {/* Desktop portrait card skeleton */}
          <div className="hidden sm:flex sm:flex-col justify-between h-full p-5">
            <div>
              <div className="h-52 w-full rounded-lg ifaqa-shimmer-surface border border-ifaqa-plum/10 mb-4" />
              <div className="h-5 w-4/5 rounded ifaqa-shimmer-surface" />
              <div className="h-3.5 w-3/5 rounded ifaqa-shimmer-surface mt-2" />
              <div className="h-3.5 w-28 rounded ifaqa-shimmer-surface mt-2.5" />
              <div className="space-y-1.5 mt-3">
                <div className="h-3 w-full rounded ifaqa-shimmer-surface" />
                <div className="h-3 w-5/6 rounded ifaqa-shimmer-surface" />
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-ifaqa-plum/10 space-y-3">
              <div className="h-5 w-24 rounded ifaqa-shimmer-surface" />
              <div className="h-9 w-full rounded-lg ifaqa-shimmer-surface" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
