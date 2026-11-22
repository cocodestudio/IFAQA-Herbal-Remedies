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
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#3E3239] select-none pointer-events-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,169,163,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Branding Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
        {/* Pulsing Logo Container */}
        <div className="relative w-44 sm:w-56 h-20 mb-6 flex items-center justify-center p-3 bg-white/95 border border-[#C7A9A3]/50 shadow-2xl animate-pulse">
          <Image
            src="/images/logo.png"
            alt="IFAQA Herbal Remedies"
            width={200}
            height={60}
            priority
            className="w-auto h-12 object-contain"
          />
        </div>

        {/* Golden Hairline Loader Bar */}
        <div className="w-48 sm:w-60 h-[2px] bg-white/20 overflow-hidden mb-4 relative">
          <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#E8D2C4] to-transparent animate-[shimmer_1.2s_infinite]" />
        </div>

        {/* Subtext */}
        <p className="font-serif text-xs font-bold uppercase tracking-widest text-[#E8D2C4]">
          IFAQA Herbal Remedies
        </p>
        <p className="text-[11px] font-sans text-white/80 mt-1 tracking-wider">
          Handcrafted Classical Medicines • Pure Jadi Buti
        </p>
      </div>
    </div>
  );
}
