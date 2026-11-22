'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

export function LuxuryPageLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Route change loader trigger
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div
      aria-live="polite"
      aria-busy={loading}
      style={{
        transition: 'opacity 300ms ease, visibility 300ms ease',
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B2D22] select-none pointer-events-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.22)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Branding Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
        {/* Pulsing Logo Container */}
        <div className="relative w-48 sm:w-60 h-20 mb-6 flex items-center justify-center p-3.5 bg-white border-2 border-[#DFBA73] shadow-2xl animate-pulse">
          <Image
            src="/images/logo.png"
            alt="IFAQA Herbal Remedies"
            width={220}
            height={64}
            priority
            className="w-auto h-12 object-contain"
          />
        </div>

        {/* Golden Hairline Loader Bar */}
        <div className="w-52 sm:w-64 h-[2px] bg-white/20 overflow-hidden mb-4 relative border-t border-b border-[#DFBA73]/30">
          <div className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent animate-[shimmer_1.2s_infinite]" />
        </div>

        {/* Subtext */}
        <p className="font-serif text-xs font-bold uppercase tracking-widest text-[#DFBA73]">
          IFAQA Herbal Remedies
        </p>
        <p className="text-[11px] font-sans text-[#FAF8F5]/85 mt-1 tracking-wider font-medium">
          Handcrafted Classical Medicines • Pure Jadi Buti
        </p>
      </div>
    </div>
  );
}
