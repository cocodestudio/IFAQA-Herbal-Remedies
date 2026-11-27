'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { NAV_START_EVENT } from '@/lib/nav-progress';

const DATA_HEAVY_PREFIXES = [
  '/catalog',
  '/remedy/',
  '/checkout',
  '/order-confirmation',
  '/account/orders',
  '/account/reviews',
];

function isDataHeavyRoute(href: string): boolean {
  const path = (href || '').split('?')[0].toLowerCase();
  return DATA_HEAVY_PREFIXES.some((prefix) => path.startsWith(prefix));
}

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
  if (path.includes('/order-confirmation')) {
    if (language === 'hi') return 'ऑर्डर की पुष्टि खुल रही है...';
    if (language === 'ur') return 'آرڈر کی تصدیق کھل رہی ہے...';
    return 'Confirming your order...';
  }
  if (path.includes('/account/orders')) {
    if (language === 'hi') return 'आपके ऑर्डर लोड हो रहे हैं...';
    if (language === 'ur') return 'آپ کے آرڈرز کھل رہے ہیں...';
    return 'Loading your orders...';
  }
  if (path.includes('/account/reviews')) {
    if (language === 'hi') return 'आपकी समीक्षाएं खुल रही हैं...';
    if (language === 'ur') return 'آپ کے تبصرے کھل رہے ہیں...';
    return 'Loading your reviews...';
  }

  if (language === 'hi') return 'पेज लोड हो रहा है...';
  if (language === 'ur') return 'صفحہ کھل رہا ہے...';
  return 'Opening page...';
}

/**
 * Smart navigation progress & conditional loader:
 * - Static routes & Back/Forward (popstate) show ONLY a sleek, non-blocking top progress bar (instant UX).
 * - Data-heavy routes show the top progress bar immediately and reveal the frosted spinner ONLY if
 *   navigation genuinely takes > 240ms, avoiding jarring loader flashes on fast transitions.
 */
export function LuxuryPageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useLanguage();

  const [barVisible, setBarVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusLabel, setStatusLabel] = useState('Opening page...');

  const isFirstMount = useRef(true);
  const languageRef = useRef(language);
  const rampTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeNavRef = useRef(false);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const clearTimers = useCallback(() => {
    if (rampTimerRef.current) clearTimeout(rampTimerRef.current);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
  }, []);

  const finishNavigation = useCallback(() => {
    if (!activeNavRef.current) return;
    if (rampTimerRef.current) clearTimeout(rampTimerRef.current);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    setProgress(100);
    setCompleting(true);
    setOverlayVisible(false);

    hideTimerRef.current = setTimeout(() => {
      activeNavRef.current = false;
      setBarVisible(false);
      setCompleting(false);
      setProgress(0);
    }, 180);
  }, []);

  const startNavigation = useCallback(
    (targetHref: string, allowOverlay = true) => {
      clearTimers();
      activeNavRef.current = true;
      setStatusLabel(resolveRouteLabel(targetHref, languageRef.current));
      setCompleting(false);
      setOverlayVisible(false);
      setProgress(30);
      setBarVisible(true);

      // Gentle forward creep for the top progress bar
      rampTimerRef.current = setTimeout(() => {
        setProgress(72);
        rampTimerRef.current = setTimeout(() => {
          setProgress(90);
        }, 400);
      }, 60);

      // Only reveal the full frosted overlay on slow data-heavy routes (> 240ms)
      if (allowOverlay && isDataHeavyRoute(targetHref)) {
        overlayTimerRef.current = setTimeout(() => {
          if (activeNavRef.current) {
            setOverlayVisible(true);
          }
        }, 240);
      }

      // Safety cleanup in case route transition was canceled
      safetyTimerRef.current = setTimeout(() => {
        finishNavigation();
      }, 4500);
    },
    [clearTimers, finishNavigation]
  );

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

        startNavigation(nextUrl.pathname + nextUrl.search, true);
      } catch {
        // Ignore malformed hrefs
      }
    };

    const handleCustomNavStart = (e: Event) => {
      const customEv = e as CustomEvent<{ href?: string }>;
      startNavigation(customEv.detail?.href || '', true);
    };

    // Browser Back/Forward: instant top bar only, never freeze screen with overlay
    const handlePopState = () => {
      startNavigation(window.location.pathname + window.location.search, false);
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

  // Complete immediately once Next.js route commits
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (activeNavRef.current) {
      finishNavigation();
    } else {
      // Quick non-blocking top bar pulse for untracked transitions
      startNavigation(pathname || '/', false);
      setTimeout(() => finishNavigation(), 80);
    }
  }, [pathname, searchParams, startNavigation, finishNavigation]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  if (!barVisible && !overlayVisible) return null;

  return (
    <>
      {/* 1. Sleek Top Progress Track on All Routes (Zero blocking) */}
      {barVisible && (
        <div
          aria-hidden="true"
          className={`fixed top-0 inset-x-0 z-[70] h-[3px] bg-ifaqa-plum/10 pointer-events-none transition-opacity duration-150 ${
            completing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-ifaqa-plum via-ifaqa-blackberry to-ifaqa-mauve transition-[width] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        </div>
      )}

      {/* 2. Delayed Frosted Loader (Only on slow >240ms data-heavy routes) */}
      {overlayVisible && (
        <div
          role="status"
          aria-live="polite"
          aria-label={statusLabel}
          className="fixed inset-0 z-[65] flex flex-col items-center justify-center backdrop-blur-[4px] bg-ifaqa-linen/50 pointer-events-auto transition-opacity duration-150"
        >
          <div className="flex flex-col items-center gap-3.5 px-6 text-center select-none">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                className="w-12 h-12 animate-[spin_2.2s_linear_infinite]"
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
                className="w-8 h-8 absolute animate-[spin_1.6s_linear_infinite_reverse]"
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
          </div>
        </div>
      )}
    </>
  );
}
