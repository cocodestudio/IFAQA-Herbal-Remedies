'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

const PROFESSIONAL_PHRASES = [
  'Compounding Classical Formulations...',
  'Dispensing Ancient Empirical Wisdom...',
  'Preparing Pure Botanical Extracts...',
  'Retrieving Classical Pharmacopoeia...',
  'Harmonizing Biological Equilibrium...',
];

export function LuxuryPageLoader() {
  const [loading, setLoading] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Route change loader trigger - pure glassmorphism transition
  useEffect(() => {
    setLoading(true);
    // Cycle to a prestigious apothecary sentence on each navigation
    setPhraseIndex(prev => (prev + 1) % PROFESSIONAL_PHRASES.length);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <>
      {/* 1. Global Top Navigation Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#165A45] animate-[topProgress_0.4s_ease-out_forwards] shadow-[0_0_10px_rgba(197,160,89,0.9)]" />
      </div>

      {/* 2. Pure Glassmorphism Screen: NO border, NO background card box, 100% transparent center */}
      <div
        aria-live="polite"
        aria-busy={loading}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/25 backdrop-blur-md select-none pointer-events-none transition-opacity duration-200"
      >
        {/* Ambient Specular Light Sheen in center */}
        <div className="absolute w-80 h-80 bg-[radial-gradient(circle,rgba(197,160,89,0.18)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* 3D Rotating Geometric Triangle: Completely Transparent, No Container Box */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-5"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center animate-[triangle3dSpin_2.8s_cubic-bezier(0.45,0.05,0.55,0.95)_infinite]"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full filter drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)] overflow-visible"
              >
                <defs>
                  {/* Facet 1: Royal Burnished Gold */}
                  <linearGradient id="facetGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFBA73" />
                    <stop offset="50%" stopColor="#C5A059" />
                    <stop offset="100%" stopColor="#99752D" />
                  </linearGradient>
                  {/* Facet 2: Deep Botanical Imperial Emerald */}
                  <linearGradient id="facetEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#165A45" />
                    <stop offset="60%" stopColor="#0B2D22" />
                    <stop offset="100%" stopColor="#061811" />
                  </linearGradient>
                  {/* Facet 3: Luminous Champagne Silk */}
                  <linearGradient id="facetSilk" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FAF8F5" />
                    <stop offset="40%" stopColor="#DFBA73" />
                    <stop offset="100%" stopColor="#C5A059" />
                  </linearGradient>
                  {/* Inner Glow */}
                  <radialGradient id="sparkGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#DFBA73" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#DFBA73" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 3D Interlocking Impossible Triangle Geometry */}
                {/* Arm 1: Top to Bottom-Right */}
                <polygon
                  points="60,14 100,84 84,84 60,42 46,66 38,52"
                  fill="url(#facetGold)"
                  stroke="#DFBA73"
                  strokeWidth="0.75"
                />
                {/* Arm 2: Bottom-Right to Bottom-Left */}
                <polygon
                  points="100,84 20,84 28,70 84,70 60,28 68,14"
                  fill="url(#facetEmerald)"
                  stroke="#165A45"
                  strokeWidth="0.75"
                />
                {/* Arm 3: Bottom-Left to Top */}
                <polygon
                  points="20,84 60,14 60,28 36,70 76,70 68,84"
                  fill="url(#facetSilk)"
                  stroke="#DFBA73"
                  strokeWidth="0.75"
                />

                {/* Center Floating Shimmering Gem */}
                <circle cx="60" cy="56" r="10" fill="url(#sparkGlow)" className="animate-pulse" />
                <polygon
                  points="60,49 66,56 60,63 54,56"
                  fill="#FAF8F5"
                  stroke="#DFBA73"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Floating Center IFAQA Mark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 relative flex items-center justify-center opacity-90">
                  <Image
                    src="/images/logo.png"
                    alt="IFAQA"
                    width={20}
                    height={20}
                    priority
                    className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(223,186,115,0.8)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Unique Professional Sentence (No "Loading...") */}
          <div className="space-y-1.5 max-w-md animate-in fade-in duration-200">
            <p className="font-serif text-sm sm:text-base font-bold text-[#FAF8F5] tracking-wider drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {PROFESSIONAL_PHRASES[phraseIndex]}
            </p>
            <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#DFBA73] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              • IFAQA HERBAL PHARMACOPOEIA •
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
