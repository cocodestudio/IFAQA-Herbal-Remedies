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

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: LanguageCode; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
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
      <header className="sticky top-0 z-40 bg-ifaqa-linen/95 backdrop-blur-md border-b border-ifaqa-sand/60 shadow-sm transition-all select-none">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Trigger */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-ifaqa-plum hover:text-ifaqa-blackberry focus:outline-none"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative h-10 md:h-14 w-auto aspect-[3/1] flex items-center">
                  <Image
                    src="/images/logo.png"
                    alt="IFAQA Herbal Remedies"
                    width={200}
                    height={56}
                    priority
                    className="h-10 md:h-14 w-auto object-contain group-hover:opacity-95 transition-opacity"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links - Clean & Stable: Only Home, About, Contact, Privacy Policy */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs font-serif uppercase tracking-widest transition-colors font-bold py-1 ${
                      isActive
                        ? 'text-ifaqa-plum font-extrabold'
                        : 'text-ifaqa-blackberry hover:text-ifaqa-plum'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ifaqa-sand" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Luxury Language Switcher Dropdown */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 border border-ifaqa-sand/70 bg-white/70 hover:bg-white text-ifaqa-plum transition-all shadow-sm"
                  aria-label="Select Language"
                  title="Change Language (English / हिंदी / اردو)"
                >
                  <Globe className="w-4 h-4 text-ifaqa-blackberry" />
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
                    {currentLangObj.code.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-sans font-medium hidden sm:inline text-ifaqa-blackberry">
                    ({currentLangObj.nativeName})
                  </span>
                  <ChevronDown className={`w-3 h-3 text-ifaqa-plum transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-ifaqa-sand/60 shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 border-b border-ifaqa-sand/30 text-[10px] uppercase font-mono tracking-wider text-ifaqa-blackberry font-bold">
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
                          className={`w-full px-3 py-2 text-left text-xs font-sans flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-ifaqa-sand/30 text-ifaqa-plum font-bold'
                              : 'text-ifaqa-blackberry hover:bg-ifaqa-linen'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase font-bold text-ifaqa-plum bg-ifaqa-linen px-1 border border-ifaqa-sand/40">
                              {opt.code.toUpperCase()}
                            </span>
                            <span>{opt.nativeName}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-ifaqa-plum" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dedicated Customer Sign In / Account Page Link */}
              <Link
                href="/sign-in"
                className="p-2 text-ifaqa-plum hover:text-ifaqa-blackberry hover:bg-ifaqa-sand/20 transition-all flex items-center gap-1.5"
                title={isAuthenticated ? `Logged in: ${user?.phoneNumber}` : t('signIn')}
                aria-label="Account details"
              >
                {isAuthenticated ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-800" />
                ) : (
                  <User className="w-5 h-5 text-ifaqa-plum" />
                )}
                <span className="hidden lg:inline text-[11px] font-serif uppercase tracking-wider font-bold">
                  {isAuthenticated ? t('account') : t('signIn')}
                </span>
              </Link>

              {/* Shopping Cart Button - Triggers Smooth Side Drawer */}
              <button
                onClick={openCart}
                className="relative p-2 text-ifaqa-plum hover:text-ifaqa-blackberry hover:bg-ifaqa-sand/20 transition-all flex items-center gap-2"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-ifaqa-plum" />
                <span className="hidden sm:inline text-xs font-serif uppercase tracking-wider font-bold">
                  {t('cart')}
                </span>
                {itemCount > 0 && (
                  <span
                    data-badge="diamond"
                    className="diamond-badge inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-mono font-bold bg-ifaqa-plum text-ifaqa-linen"
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
