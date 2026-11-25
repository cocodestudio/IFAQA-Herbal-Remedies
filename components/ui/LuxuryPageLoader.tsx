'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Subtle, non-blocking top route indicator bar.
 * Never blurs the viewport or traps user interaction on navigation.
 */
export function LuxuryPageLoader() {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => {
      setActive(false);
    }, 320);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-50 h-[2px] pointer-events-none overflow-hidden"
    >
      <div
        style={{ transformOrigin: 'left center' }}
        className="h-full w-full bg-ifaqa-plum origin-left animate-[topProgress_320ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
      />
    </div>
  );
}
