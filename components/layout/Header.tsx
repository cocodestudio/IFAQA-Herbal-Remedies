'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, ShieldCheck, Globe, ChevronDown, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import { MobileNavDrawer } from './MobileNavDrawer';

export function Header() {
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
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

  const currentLangObj = languageOptions.find(l => l.code === language) || languageOptions[0];

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
    { label: t('privacyPolicy'), href: '/privacy-policy' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-ifaqa-linen/95 backdrop-blur-md border-b border-ifaqa-plum/10 select-none">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Left on mobile: menu + compact logo; Left on desktop: logo */}
            <div className="flex items-center gap-2 min-w-0">
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

            {/* Center Desktop Navigation Links: Home, About, Contact, Privacy Policy */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Primary navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-sans py-1 transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-ifaqa-plum font-medium'
                        : 'text-[#5A6962] hover:text-ifaqa-plum font-normal'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-[2px] bg-ifaqa-mauve rounded-sm" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions: Language switcher, Sign in, Cart (all fit comfortably within 390px) */}
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
                  <span className="hidden sm:inline text-ifaqa-plum">
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

              {/* Quiet Sign in link */}
              <Link
                href="/sign-in"
                className="h-9 px-2.5 sm:px-3 rounded-lg text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors inline-flex items-center gap-1.5 text-sm font-sans font-medium"
                title={isAuthenticated ? `Signed in: ${user?.phoneNumber}` : t('signIn')}
                aria-label="Account"
              >
                {isAuthenticated ? (
                  <ShieldCheck className="w-4 h-4 text-[#165A45]" strokeWidth={1.5} />
                ) : (
                  <User className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                )}
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
        </div>
      </header>

      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
