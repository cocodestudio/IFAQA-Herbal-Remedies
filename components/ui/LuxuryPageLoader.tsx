'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { NAV_START_EVENT } from '@/lib/nav-progress';

function resolveRouteLabel(href: string, language: string): string {
  const path = href.toLowerCase();

  if (path.includes('/remedy/')) {
    if (language === 'hi') return 'उत्पाद विवरण खुल रहा है...';
    if (language === 'ur') return 'دوا کی تفصیلات کھل رہی ہیں...';
    return 'Opening product details...';
  }
  if (path.includes('/catalog')) {
    if (language === 'hi') return 'उत्पाद सूची लोड हो रही है...';
    if (language === 'ur') return 'مصنوعات کی فہرست کھل رہی ہے...';
    return 'Browsing formulations...';
  }
  if (path.includes('/checkout')) {
    if (language === 'hi') return 'सुरक्षित चेकआउट तैयार हो रहा है...';
    if (language === 'ur') return 'محفوظ چیک آؤٹ کھل رہا ہے...';
    return 'Preparing secure checkout...';
  }
  if (path.includes('/cart')) {
    if (language === 'hi') return 'कार्ट खुल रहा है...';
    if (language === 'ur') return 'کارٹ کھل رہا ہے...';
    return 'Opening shopping cart...';
  }
  if (path.includes('/order-confirmation')) {
    if (language === 'hi') return 'ऑर्डर की पुष्टि खुल रही है...';
    if (language === 'ur') return 'آرڈر کی تصدیق کھل رہی ہے...';
    return 'Confirming your order...';
  }
  if (path.includes('/sign-in') || path.includes('/login')) {
    if (language === 'hi') return 'साइन-इन पेज खुल रहा है...';
    if (language === 'ur') return 'سائن ان صفحہ کھل رہا ہے...';
    return 'Opening account sign in...';
  }
  if (path.includes('/about')) {
    if (language === 'hi') return 'हमारे बारे में जानकारी खुल रही है...';
    if (language === 'ur') return 'ہمارے بارے میں صفحہ کھل رہا ہے...';
    return 'Opening dispensary story...';
  }
  if (path.includes('/contact')) {
    if (language === 'hi') return 'संपर्क पेज खुल रहा है...';
    if (language === 'ur') return 'رابطہ کا صفحہ کھل رہا ہے...';
    return 'Opening contact page...';
  }
  if (path.includes('/privacy-policy')) {
    if (language === 'hi') return 'गोपनीयता नीति खुल रही है...';
    if (language === 'ur') return 'رازداری کی پالیسی کھل رہی ہے...';
    return 'Opening privacy policy...';
  }

  if (language === 'hi') return 'पेज लोड हो रहा है...';
  if (language === 'ur') return 'صفحہ کھل رہا ہے...';
  return 'Opening page...';
}

/**
 * Global navigation progress & frosted glassmorphism transition layer.
 * Starts immediately on click/popstate/programmatic navigation so users always
 * see smooth loading activity while moving between pages.
 */
export function LuxuryPageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const [visible, setVisible] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusLabel, setStatusLabel] = useState('Opening page...');

  const isFirstMount = useRef(true);
  const startedAtRef = useRef(0);
  const languageRef = useRef(language);
  const rampTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeNavRef = useRef(false);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const clearTimers = useCallback(() => {
    if (rampTimerRef.current) clearTimeout(rampTimerRef.current);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
  }, []);

  const finishNavigation = useCallback(() => {
    if (!activeNavRef.current) return;
    const elapsed = performance.now() - startedAtRef.current;
    const minHoldMs = 340;
    const waitMs = Math.max(0, minHoldMs - elapsed);

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);

    settleTimerRef.current = setTimeout(() => {
      setProgress(100);
      setCompleting(true);

      hideTimerRef.current = setTimeout(() => {
        activeNavRef.current = false;
        setVisible(false);
        setCompleting(false);
        setProgress(0);
      }, 210);
    }, waitMs);
  }, []);

  const startNavigation = useCallback(
    (targetHref: string) => {
      clearTimers();
      activeNavRef.current = true;
      startedAtRef.current = performance.now();
      setStatusLabel(resolveRouteLabel(targetHref, languageRef.current));
      setCompleting(false);
      setProgress(24);
      setVisible(true);

      // Progressive forward creep so longer page transitions feel active
      rampTimerRef.current = setTimeout(() => {
        setProgress(68);
        rampTimerRef.current = setTimeout(() => {
          setProgress(86);
        }, 420);
      }, 60);

      // Safety fallback in case navigation was canceled before route changed
      safetyTimerRef.current = setTimeout(() => {
        finishNavigation();
      }, 4500);
    },
    [clearTimers, finishNavigation]
  );

  // Intercept internal anchor clicks, history navigation, and custom nav triggers
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute('href');
      if (
        !rawHref ||
        rawHref.startsWith('#') ||
        rawHref.startsWith('mailto:') ||
        rawHref.startsWith('tel:') ||
        rawHref.startsWith('javascript:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      try {
        const nextUrl = new URL(anchor.href, window.location.href);
        if (nextUrl.origin !== window.location.origin) return;

        const isSameRoute =
          nextUrl.pathname === window.location.pathname &&
          nextUrl.search === window.location.search;
        if (isSameRoute) return;

        startNavigation(nextUrl.pathname + nextUrl.search);
      } catch {
        // Ignore malformed hrefs
      }
    };

    const handleCustomNavStart = (e: Event) => {
      const customEv = e as CustomEvent<{ href?: string }>;
      startNavigation(customEv.detail?.href || '');
    };

    const handlePopState = () => {
      startNavigation(window.location.pathname + window.location.search);
    };

    document.addEventListener('click', handleDocumentClick, true);
    window.addEventListener(NAV_START_EVENT, handleCustomNavStart);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      window.removeEventListener(NAV_START_EVENT, handleCustomNavStart);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [startNavigation]);

  // Complete cleanly once Next.js route commits
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (!activeNavRef.current) {
      // Fallback if navigation happened outside intercepted click/custom event
      startNavigation(pathname || '/');
    }
    finishNavigation();
  }, [pathname, searchParams, startNavigation, finishNavigation]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  if (!visible) return null;

  return (
    <>
      {/* 1. Top Progress Track (Crisp 3px Emerald + Gold Bar) */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-ifaqa-plum/10 pointer-events-none"
      >
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-ifaqa-plum via-ifaqa-blackberry to-ifaqa-mauve transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </div>

      {/* 2. Frosted Transparent Backdrop + Centered Geometric Spinner (Zero Box/Border) */}
      <div
        role="status"
        aria-live="polite"
        aria-label={statusLabel}
        className={`fixed inset-0 z-[65] flex flex-col items-center justify-center backdrop-blur-[5px] bg-ifaqa-linen/55 transition-opacity duration-200 ${
          completing ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className="flex flex-col items-center gap-3.5 px-6 text-center select-none">
          {/* Geometric Rotating 3D Triangular Emblem (Transparent, Zero Border Box) */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg
              viewBox="0 0 64 64"
              className="w-14 h-14 animate-[spin_2.2s_linear_infinite]"
              aria-hidden="true"
            >
              <polygon
                points="32,6 56,48 8,48"
                fill="none"
                stroke="#0B2D22"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              viewBox="0 0 64 64"
              className="w-9 h-9 absolute animate-[spin_1.6s_linear_infinite_reverse]"
              aria-hidden="true"
            >
              <polygon
                points="32,12 50,46 14,46"
                fill="none"
                stroke="#C5A059"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="w-2 h-2 rounded-sm rotate-45 bg-ifaqa-plum absolute" />
          </div>

          <p className="font-sans text-xs sm:text-sm font-medium text-ifaqa-plum tracking-wide">
            {statusLabel}
          </p>

          {/* Compact Inline Progress Track */}
          <div className="w-36 h-[2px] bg-ifaqa-plum/15 rounded-sm overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-ifaqa-plum transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
