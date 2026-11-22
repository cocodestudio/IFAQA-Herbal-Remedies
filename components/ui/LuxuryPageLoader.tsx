'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

export function LuxuryPageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Route change loader trigger - sleek 250ms glassmorphic transition
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <>
      {/* 1. Global Top Navigation Progress Bar (Like YouTube / GitHub) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#165A45] animate-[topProgress_0.4s_ease-out_forwards] shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
      </div>

      {/* 2. Glassmorphism Modal Overlay (Non-intrusive, soft background blur) */}
      <div
        aria-live="polite"
        aria-busy={loading}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-[4px] pointer-events-none select-none transition-opacity duration-200"
      >
        {/* Center Compact Glassmorphism Card */}
        <div className="relative bg-white/95 backdrop-blur-xl border border-[#DFBA73]/70 shadow-[0_16px_40px_rgba(11,45,34,0.18)] p-5 sm:p-6 flex flex-col items-center justify-center max-w-[210px] w-full text-center animate-in fade-in zoom-in-95 duration-150">
          {/* Subtle Ambient Gold Corner Sheen */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#DFBA73]/15 blur-2xl pointer-events-none" />

          {/* Unique Dual-Ring Animated Geometric Spinner with Compact Center Logo */}
          <div className="relative w-14 h-14 flex items-center justify-center mb-3">
            {/* Outer Spinning Ring (Emerald & Gold Conic Accent) */}
            <div className="absolute inset-0 rounded-full border-2 border-[#DFBA73]/25 border-t-[#0B2D22] border-r-[#C5A059] animate-spin" />

            {/* Inner Counter-Spinning Subtle Gold Dashed Ring */}
            <div
              className="absolute inset-1.5 rounded-full border border-dashed border-[#DFBA73]/70 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '2.5s' }}
            />

            {/* Compact Center Logo / Monogram Mark (Tiny & Elegant) */}
            <div className="relative w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-inner border border-[#DFBA73]/50 p-1">
              <Image
                src="/images/logo.png"
                alt="IFAQA"
                width={28}
                height={28}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Miniature Brand Typography */}
          <p className="font-serif text-[11px] font-bold uppercase tracking-widest text-[#0B2D22]">
            IFAQA
          </p>
          <p className="text-[10px] font-sans font-medium text-[#165A45] tracking-wide mt-0.5">
            Loading...
          </p>

          {/* Micro Hairline Progress Shimmer */}
          <div className="w-16 h-[1.5px] bg-[#DFBA73]/30 overflow-hidden relative mt-2.5">
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent animate-[shimmer_0.9s_infinite]" />
          </div>
        </div>
      </div>
    </>
  );
}
