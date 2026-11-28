'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, UserCheck, ChevronRight, User, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { openCart, itemCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const { language, setLanguage, supportedLanguages, t, getCategoryTitle } = useLanguage();

  const primaryLinks = [
    { name: t('home'), path: '/' },
    { name: t('catalog'), path: '/catalog' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
    { name: t('privacyPolicy'), path: '/privacy-policy' },
  ];

  const categoryIds = ['hazim', 'muqawwi', 'sual', 'mafasil', 'jild', 'quwwat-e-mudafiat'];

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden flex select-none transition-opacity duration-200 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2D22]/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className={`relative w-4/5 max-w-xs bg-ifaqa-linen border-e border-ifaqa-plum/10 h-full flex flex-col justify-between z-10 shadow-luxury-lifted overflow-y-auto transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Top header */}
          <div className="px-5 h-16 border-b border-ifaqa-plum/10 flex items-center justify-between bg-white">
            <span className="font-serif text-lg font-medium text-ifaqa-plum">
              IFAQA Herbal Remedies
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-[#5A6962] hover:text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Primary links */}
          <nav className="p-4 space-y-1 border-b border-ifaqa-plum/10">
            <div className="px-3 pb-2 text-xs font-sans font-medium text-[#5A6962]">
              Menu
            </div>
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={onClose}
                className="flex items-center justify-between h-10 px-3 rounded-lg text-sm font-sans font-medium text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
              </Link>
            ))}
          </nav>

          {/* Quick cart & language selector */}
          <div className="p-4 border-b border-ifaqa-plum/10 space-y-2.5">
            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="w-full h-10 flex items-center justify-between px-3 rounded-lg bg-ifaqa-cashmere border border-ifaqa-plum/10 text-ifaqa-plum text-sm font-sans font-medium hover:bg-[#EDE5D5] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
                <span>{t('cart')}</span>
              </span>
              <span className="font-mono text-xs font-medium text-ifaqa-plum tabular-nums">
                {itemCount}
              </span>
            </button>

            <div
              translate="no"
              className="flex items-center gap-2 h-10 px-3 rounded-lg bg-white border border-ifaqa-plum/15"
            >
              <Globe className="w-4 h-4 text-[#5A6962] shrink-0" strokeWidth={1.5} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Choose language"
                className="flex-1 bg-transparent text-xs font-medium text-ifaqa-plum focus:outline-none"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories */}
          <nav className="p-4 space-y-1">
            <div className="px-3 pb-2 text-xs font-sans font-medium text-[#5A6962]">
              {t('categoriesTitle')}
            </div>
            {categoryIds.map((slug) => (
              <Link
                key={slug}
                href={`/catalog/${slug}`}
                onClick={onClose}
                className="flex items-center h-9 px-3 rounded-lg text-sm font-sans text-[#5A6962] hover:bg-ifaqa-cashmere hover:text-ifaqa-plum transition-colors"
              >
                {getCategoryTitle({ id: slug, name: slug })}
              </Link>
            ))}
          </nav>
        </div>

        {/* Account footer */}
        <div className="p-4 border-t border-ifaqa-plum/10 bg-ifaqa-cashmere/50 space-y-2">
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white border border-ifaqa-plum/10">
                <div className="flex items-center gap-2 text-ifaqa-plum font-mono">
                  <UserCheck className="w-4 h-4 text-[#165A45]" strokeWidth={1.5} />
                  <span className="truncate max-w-[140px]" dir="ltr">{user.phoneNumber}</span>
                </div>
                <Link
                  href="/account"
                  onClick={onClose}
                  className="text-xs font-sans text-ifaqa-plum hover:underline font-medium"
                >
                  {t('account')}
                </Link>
              </div>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="w-full h-9 rounded-lg border border-ifaqa-plum/15 text-xs font-sans font-medium text-[#5A6962] hover:text-ifaqa-plum hover:bg-white transition-colors"
              >
                {t('signOut')}
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-ifaqa-plum text-ifaqa-linen text-sm font-sans font-medium hover:bg-ifaqa-blackberry transition-colors"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
              <span>{t('signIn')}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
