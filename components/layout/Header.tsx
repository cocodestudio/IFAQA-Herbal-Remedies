'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  Globe,
  ChevronDown,
  Check,
  Search,
  CircleUserRound,
  Leaf,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import { MobileNavDrawer } from './MobileNavDrawer';
import { ShimmerImage } from '@/components/ui/ShimmerImage';
import { triggerNavigationProgress } from '@/lib/nav-progress';
import seedData from '@/lib/seed-data.json';
import { getRemedies, getCachedStorefrontSnapshot } from '@/lib/remedies-service';
import { HerbalRemedy } from '@/lib/types';
import { formatPriceINR } from '@/lib/formatters';

export function Header() {
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { language, setLanguage, t, getRemedyTitle } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [liveRemedies, setLiveRemedies] = useState<HerbalRemedy[]>(
    () => (seedData.remedies as unknown as HerbalRemedy[]).filter((r) => r.isAvailable !== false)
  );
  const langRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const snap = getCachedStorefrontSnapshot();
    if (snap.fromCache && snap.remedies.length > 0) {
      setLiveRemedies(snap.remedies.filter((r) => r.isAvailable !== false));
    }
    getRemedies()
      .then((list) => {
        if (active && Array.isArray(list) && list.length > 0) {
          setLiveRemedies(list.filter((r) => r.isAvailable !== false));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (langRef.current && !langRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
      const inDesktop = desktopSearchRef.current?.contains(target);
      const inMobile = mobileSearchRef.current?.contains(target);
      if (!inDesktop && !inMobile) {
        setSearchFocused(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: LanguageCode; nativeName: string }[] = [
    { code: 'en', nativeName: 'English' },
    { code: 'hi', nativeName: 'हिंदी' },
    { code: 'ur', nativeName: 'اردو' },
  ];

  const currentLangObj = languageOptions.find((l) => l.code === language) || languageOptions[0];

  const searchPlaceholder =
    language === 'hi'
      ? 'हर्बल औषधियां, रोग या सामग्री खोजें...'
      : language === 'ur'
      ? 'یونانی و آیورویدک ادویات تلاش کریں...'
      : 'Search IFAQA herbal remedies, ailments, or ingredients...';

  const quickMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 1) return [];

    const scored: Array<{ item: HerbalRemedy; score: number }> = [];
    for (const r of liveRemedies) {
      if (r.isAvailable === false) continue;
      const name = (r.name || '').toLowerCase();
      const roman = (r.romanUrduName || '').toLowerCase();
      const urdu = r.urduName || '';
      const cat = (r.categoryName || '').toLowerCase();
      const form = (r.form || '').toLowerCase();
      const sku = (r.sku || '').toLowerCase();
      const short = (r.shortDescription || '').toLowerCase();
      const ingredientMatch = (r.herbalIngredients || []).some(
        (ing) =>
          (ing.commonName || '').toLowerCase().includes(q) ||
          (ing.botanicalName || '').toLowerCase().includes(q)
      );
      const indicationMatch = (r.therapeuticIndications || []).some((ind) =>
        ind.toLowerCase().includes(q)
      );

      let score = 0;
      if (name === q || roman === q) score = 100;
      else if (name.startsWith(q) || roman.startsWith(q)) score = 85;
      else if (name.includes(q) || roman.includes(q) || urdu.includes(searchQuery.trim())) score = 70;
      else if (sku.includes(q) || form.startsWith(q)) score = 55;
      else if (cat.includes(q) || form.includes(q)) score = 45;
      else if (ingredientMatch || indicationMatch) score = 35;
      else if (short.includes(q)) score = 25;

      if (score > 0) {
        scored.push({ item: r, score });
      }
    }

    scored.sort((a, b) => b.score - a.score || (b.item.reviewCount || 0) - (a.item.reviewCount || 0));
    return scored.slice(0, 7).map((entry) => entry.item);
  }, [searchQuery, liveRemedies]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery]);

  const navigateToRemedy = (item: HerbalRemedy) => {
    const targetUrl = `/remedy/${item.slug}`;
    setSearchFocused(false);
    setHighlightedIndex(-1);
    triggerNavigationProgress(targetUrl);
    router.push(targetUrl);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && quickMatches[highlightedIndex]) {
      navigateToRemedy(quickMatches[highlightedIndex]);
      return;
    }
    const trimmed = searchQuery.trim();
    const targetUrl = trimmed
      ? `/catalog?search=${encodeURIComponent(trimmed)}`
      : '/catalog';
    setSearchFocused(false);
    triggerNavigationProgress(targetUrl);
    router.push(targetUrl);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchFocused && quickMatches.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setSearchFocused(true);
    }
    if (e.key === 'ArrowDown' && quickMatches.length > 0) {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % quickMatches.length);
    } else if (e.key === 'ArrowUp' && quickMatches.length > 0) {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? quickMatches.length - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
      setHighlightedIndex(-1);
    }
  };

  const renderSuggestionsDropdown = () => {
    if (!searchFocused || searchQuery.trim().length < 1) return null;

    return (
      <div className="absolute inset-x-0 mt-1.5 rounded-xl bg-white border border-ifaqa-plum/15 shadow-luxury-lifted z-50 overflow-hidden divide-y divide-ifaqa-plum/10">
        {quickMatches.length === 0 ? (
          <div className="px-4 py-4 flex items-center justify-between gap-3 text-xs text-[#5A6962]">
            <span>No remedies found matching &ldquo;{searchQuery.trim()}&rdquo;</span>
            <Link
              href="/catalog"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSearchFocused(false)}
              className="font-medium text-[#165A45] hover:underline shrink-0"
            >
              Browse catalog →
            </Link>
          </div>
        ) : (
          <>
            {quickMatches.map((item, idx) => {
              const isHighlighted = idx === highlightedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => navigateToRemedy(item)}
                  className={`w-full text-start flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors ${
                    isHighlighted ? 'bg-ifaqa-cashmere' : 'hover:bg-ifaqa-linen'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-lg border border-ifaqa-plum/10 bg-white shrink-0 overflow-hidden flex items-center justify-center">
                      {item.primaryImage ? (
                        <ShimmerImage
                          src={item.primaryImage}
                          alt={getRemedyTitle(item)}
                          fill
                          sizes="40px"
                          className="object-contain p-0.5"
                        />
                      ) : (
                        <Leaf className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-ifaqa-plum block truncate">
                        {getRemedyTitle(item)}
                      </span>
                      <span className="text-[11px] text-[#5A6962] block truncate">
                        {item.categoryName} · {item.form}
                        {item.stockQuantity > 0 ? ' · In stock' : ' · Out of stock'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono font-semibold text-ifaqa-plum tabular-nums">
                      {formatPriceINR(item.pricePKR)}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#5A6962]" strokeWidth={1.6} />
                  </div>
                </button>
              );
            })}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSearchSubmit}
              className="w-full px-3.5 py-2.5 text-xs font-medium text-[#165A45] bg-ifaqa-cashmere/50 hover:bg-ifaqa-cashmere flex items-center justify-between transition-colors"
            >
              <span>See all catalog matches for &ldquo;{searchQuery.trim()}&rdquo;</span>
              <span>→</span>
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-ifaqa-linen/95 backdrop-blur-md border-b border-ifaqa-plum/10 select-none">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Primary Header Bar: Logo + Long Amazon-Style Search + Profile & Cart */}
          <div className="flex items-center justify-between h-16 gap-3 sm:gap-5">
            {/* Left: Mobile Menu + Brand Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded-lg text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors shrink-0"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <Link href="/" className="inline-flex items-center shrink-0">
                <div className="relative h-9 sm:h-11 w-[96px] sm:w-[132px] flex items-center">
                  <ShimmerImage
                    src="/images/logo.png"
                    alt="IFAQA Herbal Remedies"
                    width={160}
                    height={48}
                    priority
                    wrapperClassName="h-9 sm:h-11 w-full justify-start"
                    className="h-9 sm:h-11 w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Center: Full-Width Amazon-Style Search Bar (Desktop >= md) */}
            <div
              ref={desktopSearchRef}
              className="hidden md:block flex-1 min-w-0 relative"
            >
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className="flex items-center w-full h-10 rounded-lg border border-ifaqa-plum/20 focus-within:border-ifaqa-plum bg-white overflow-hidden transition-colors"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onKeyDown={handleSearchKeyDown}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  placeholder={searchPlaceholder}
                  aria-label="Search remedies"
                  className="flex-1 h-full px-3.5 text-sm font-sans text-ifaqa-plum placeholder:text-[#5A6962]/70 focus:outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setHighlightedIndex(-1);
                    }}
                    aria-label="Clear search"
                    className="h-full px-2.5 text-[#5A6962] hover:text-ifaqa-plum transition-colors inline-flex items-center justify-center"
                  >
                    <X className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Search catalog"
                  className="h-full px-4 bg-ifaqa-plum hover:bg-ifaqa-blackberry text-ifaqa-linen transition-colors inline-flex items-center justify-center shrink-0"
                >
                  <Search className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </form>

              {renderSuggestionsDropdown()}
            </div>

            {/* Right Actions: Language Switcher, Profile / Account, Cart */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="h-9 px-2.5 sm:px-3 rounded-lg border border-ifaqa-plum/15 bg-white hover:bg-ifaqa-cashmere text-ifaqa-plum transition-colors inline-flex items-center gap-1.5 text-xs font-sans font-medium"
                  aria-label="Select language"
                >
                  <Globe className="w-4 h-4 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                  <span className="font-mono text-xs tabular-nums">
                    {currentLangObj.code.toUpperCase()}
                  </span>
                  <span className="hidden lg:inline text-ifaqa-plum">
                    {currentLangObj.nativeName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#5A6962] transition-transform duration-150 ${langMenuOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>

                {langMenuOpen && (
                  <div className="absolute end-0 mt-2 w-44 rounded-xl bg-white border border-ifaqa-plum/10 shadow-luxury-lifted z-50 py-1.5">
                    <div className="px-3 py-1.5 border-b border-ifaqa-plum/10 text-xs font-sans text-[#5A6962]">
                      {t('languageSelect')}
                    </div>
                    {languageOptions.map((opt) => {
                      const isSelected = language === opt.code;
                      return (
                        <button
                          key={opt.code}
                          onClick={() => {
                            setLanguage(opt.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-start text-xs font-sans flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-ifaqa-cashmere text-ifaqa-plum font-medium'
                              : 'text-[#5A6962] hover:bg-ifaqa-linen hover:text-ifaqa-plum'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-xs text-ifaqa-plum">
                              {opt.code.toUpperCase()}
                            </span>
                            <span>{opt.nativeName}</span>
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-ifaqa-plum" strokeWidth={1.5} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Profile / Account Link */}
              <Link
                href={isAuthenticated ? '/account' : '/sign-in'}
                className={`h-9 px-2.5 sm:px-3 rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-sans font-medium ${
                  isAuthenticated
                    ? 'bg-ifaqa-cashmere/80 hover:bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/15'
                    : 'text-ifaqa-plum hover:bg-ifaqa-cashmere border border-transparent'
                }`}
                title={isAuthenticated ? `${t('account')} (${user?.phoneNumber})` : t('signIn')}
                aria-label={isAuthenticated ? t('account') : t('signIn')}
              >
                <span className="relative inline-flex items-center justify-center">
                  <CircleUserRound
                    className={`w-5 h-5 ${isAuthenticated ? 'text-ifaqa-plum' : 'text-[#5A6962]'}`}
                    strokeWidth={1.5}
                  />
                  {isAuthenticated && (
                    <span
                      aria-hidden="true"
                      className="w-2 h-2 rounded-sm bg-[#165A45] ring-2 ring-ifaqa-linen absolute -top-0.5 -end-0.5"
                    />
                  )}
                </span>
                <span className="hidden md:inline whitespace-nowrap">
                  {isAuthenticated ? t('account') : t('signIn')}
                </span>
              </Link>

              {/* Cart trigger */}
              <button
                onClick={openCart}
                className="relative h-9 px-2.5 sm:px-3 rounded-lg border border-ifaqa-plum/15 bg-white hover:bg-ifaqa-cashmere text-ifaqa-plum transition-colors inline-flex items-center gap-1.5 text-sm font-sans font-medium"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-4 h-4 text-ifaqa-plum shrink-0" strokeWidth={1.5} />
                <span className="hidden sm:inline">{t('cart')}</span>
                {itemCount > 0 && (
                  <span
                    data-badge="diamond"
                    className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-mono font-medium bg-ifaqa-plum text-ifaqa-linen rounded tabular-nums"
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (< md): Full-width Amazon-style quick search with instant dropdown */}
          <div ref={mobileSearchRef} className="md:hidden pb-3 relative">
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="flex items-center w-full h-10 rounded-lg border border-ifaqa-plum/20 focus-within:border-ifaqa-plum bg-white overflow-hidden"
            >
              <input
                type="search"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={handleSearchKeyDown}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder={searchPlaceholder}
                aria-label="Search remedies"
                className="flex-1 h-full px-3 text-xs font-sans text-ifaqa-plum placeholder:text-[#5A6962]/70 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setHighlightedIndex(-1);
                  }}
                  aria-label="Clear search"
                  className="h-full px-2 text-[#5A6962] hover:text-ifaqa-plum inline-flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.6} />
                </button>
              )}
              <button
                type="submit"
                aria-label="Search catalog"
                className="h-full px-3.5 bg-ifaqa-plum text-ifaqa-linen inline-flex items-center justify-center shrink-0"
              >
                <Search className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </form>

            {renderSuggestionsDropdown()}
          </div>
        </div>
      </header>

      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
