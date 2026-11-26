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
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import { MobileNavDrawer } from './MobileNavDrawer';
import { triggerNavigationProgress } from '@/lib/nav-progress';
import seedData from '@/lib/seed-data.json';
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
  const langRef = useRef<HTMLDivElement>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (searchWrapRef.current && !searchWrapRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
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
    if (q.length < 2) return [];
    const list = seedData.remedies as unknown as HerbalRemedy[];
    return list
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.romanUrduName && r.romanUrduName.toLowerCase().includes(q)) ||
          (r.categoryName && r.categoryName.toLowerCase().includes(q)) ||
          (r.shortDescription && r.shortDescription.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    const targetUrl = trimmed
      ? `/catalog?search=${encodeURIComponent(trimmed)}`
      : '/catalog';
    setSearchFocused(false);
    triggerNavigationProgress(targetUrl);
    router.push(targetUrl);
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
                  <Image
                    src="/images/logo.png"
                    alt="IFAQA Herbal Remedies"
                    width={160}
                    height={48}
                    priority
                    className="h-9 sm:h-11 w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Center: Full-Width Amazon-Style Search Bar (Desktop >= md) */}
            <div
              ref={searchWrapRef}
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  placeholder={searchPlaceholder}
                  aria-label="Search remedies"
                  className="flex-1 h-full px-3.5 text-sm font-sans text-ifaqa-plum placeholder:text-[#5A6962]/70 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  aria-label="Search catalog"
                  className="h-full px-4 bg-ifaqa-plum hover:bg-ifaqa-blackberry text-ifaqa-linen transition-colors inline-flex items-center justify-center shrink-0"
                >
                  <Search className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </form>

              {/* Quick Suggestions Dropdown */}
              {searchFocused && quickMatches.length > 0 && (
                <div className="absolute inset-x-0 mt-1.5 rounded-xl bg-white border border-ifaqa-plum/15 shadow-luxury-lifted z-50 overflow-hidden divide-y divide-ifaqa-plum/10">
                  {quickMatches.map((item) => (
                    <Link
                      key={item.id}
                      href={`/remedy/${item.slug}`}
                      onClick={() => setSearchFocused(false)}
                      className="flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-ifaqa-linen transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-9 h-9 rounded-md border border-ifaqa-plum/10 bg-white shrink-0 overflow-hidden flex items-center justify-center">
                          {item.primaryImage ? (
                            <Image
                              src={item.primaryImage}
                              alt={getRemedyTitle(item)}
                              fill
                              sizes="36px"
                              className="object-contain p-0.5"
                            />
                          ) : (
                            <Leaf className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-ifaqa-plum block truncate">
                            {getRemedyTitle(item)}
                          </span>
                          <span className="text-[11px] text-[#5A6962] block truncate">
                            {item.categoryName} · {item.form}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-ifaqa-plum tabular-nums shrink-0">
                        {formatPriceINR(item.pricePKR)}
                      </span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full px-3.5 py-2 text-xs font-medium text-[#165A45] bg-ifaqa-cashmere/50 hover:bg-ifaqa-cashmere text-start transition-colors"
                  >
                    See all results for &ldquo;{searchQuery.trim()}&rdquo; →
                  </button>
                </div>
              )}
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

          {/* Mobile Search Bar (< md): Full-width Amazon-style search row */}
          <div className="md:hidden pb-3">
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="flex items-center w-full h-10 rounded-lg border border-ifaqa-plum/20 focus-within:border-ifaqa-plum bg-white overflow-hidden"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search remedies"
                className="flex-1 h-full px-3 text-xs font-sans text-ifaqa-plum placeholder:text-[#5A6962]/70 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                aria-label="Search catalog"
                className="h-full px-3.5 bg-ifaqa-plum text-ifaqa-linen inline-flex items-center justify-center shrink-0"
              >
                <Search className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </form>
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
