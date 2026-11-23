'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, UserCheck, Shield, ChevronRight, User } from 'lucide-react';
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
  const { t } = useLanguage();

  const primaryLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('contact'), path: '/contact' },
    { name: t('privacyPolicy'), path: '/privacy-policy' },
  ];

  const categories = [
    { name: 'All Formulations', slug: 'all', path: '/catalog' },
    { name: 'Hazim (Digestive)', slug: 'hazim', path: '/catalog/hazim' },
    { name: 'Muqawwi (Vitality & Tonics)', slug: 'muqawwi', path: '/catalog/muqawwi' },
    { name: 'Sual (Respiratory & Cough)', slug: 'sual', path: '/catalog/sual' },
    { name: 'Mafasil (Joints & Musculoskeletal)', slug: 'mafasil', path: '/catalog/mafasil' },
    { name: 'Jild (Dermatological Health)', slug: 'jild', path: '/catalog/jild' },
    { name: 'Quwwat-e-Mudafiat (Immunity)', slug: 'quwwat-e-mudafiat', path: '/catalog/quwwat-e-mudafiat' },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden flex select-none transition-all duration-300 ${isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible delay-300'
        }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[#0B2D22]/70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-4/5 max-w-sm bg-ifaqa-linen border-r-2 border-ifaqa-sand/60 h-full flex flex-col justify-between z-10 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Header */}
          <div className="p-5 border-b border-ifaqa-sand/40 flex items-center justify-between bg-white">
            <div>
              <span className="font-serif text-base font-bold text-ifaqa-plum tracking-wider">IFAQA</span>
              <p className="text-[10px] text-ifaqa-blackberry uppercase tracking-widest font-mono font-semibold">
                Desi Dawakhana Heritage
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-ifaqa-blackberry hover:text-ifaqa-plum hover:bg-ifaqa-linen transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation: Home, About, Contact, Privacy Policy */}
          <nav className="p-4 space-y-1 border-b border-ifaqa-sand/40 bg-white/60">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold mb-2 px-3">
              Navigation
            </div>
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-serif font-bold text-ifaqa-plum hover:bg-ifaqa-sand/30 hover:text-ifaqa-blackberry border-l-2 border-transparent hover:border-l-ifaqa-plum transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-ifaqa-sand" />
              </Link>
            ))}
          </nav>

          {/* Quick Cart Trigger */}
          <div className="p-4 border-b border-ifaqa-sand/40">
            <button
              onClick={() => {
                onClose();
                openCart();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-[#FAF5EC] border border-ifaqa-sand/60 text-ifaqa-plum font-serif text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-ifaqa-plum" />
                <span>Shopping Cart</span>
              </div>
              <span className="font-mono text-xs font-bold text-ifaqa-blackberry bg-ifaqa-sand/40 px-2 py-0.5">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </button>
          </div>

          {/* Secondary Categories */}
          <nav className="p-4 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold mb-2 px-3">
              {t('categoriesTitle')}
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.path}
                onClick={onClose}
                className="block px-3 py-2 text-xs font-sans text-ifaqa-plum hover:bg-ifaqa-sand/20 hover:text-ifaqa-blackberry border-l-2 border-transparent hover:border-l-ifaqa-sand transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-ifaqa-sand/40 bg-ifaqa-linen space-y-3">
          {isAuthenticated && user ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2 bg-white border border-ifaqa-sand/40">
                <div className="flex items-center gap-1.5 text-ifaqa-plum font-mono">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span className="truncate max-w-[140px] font-bold">{user.phoneNumber}</span>
                </div>
                <Link
                  href="/sign-in"
                  onClick={onClose}
                  className="text-[11px] font-serif text-ifaqa-blackberry hover:text-ifaqa-plum font-bold underline"
                >
                  Manage
                </Link>
              </div>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="w-full py-2 bg-transparent text-ifaqa-blackberry border border-ifaqa-sand/60 text-xs font-serif uppercase tracking-wider text-center hover:bg-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-ifaqa-plum text-ifaqa-linen text-xs font-serif font-bold uppercase tracking-wider text-center hover:bg-ifaqa-blackberry transition-colors shadow-md"
            >
              <User className="w-4 h-4 text-ifaqa-sand" />
              <span>{t('signIn')}</span>
            </Link>
          )}

          <div className="text-[10px] text-center text-ifaqa-blackberry font-serif font-bold tracking-widest uppercase">
            EST. HERITAGE DAWAKHANA • INDIA
          </div>
        </div>
      </div>
    </div>
  );
}
