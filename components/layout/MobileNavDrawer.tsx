'use client';

import React from 'react';
import Link from 'next/link';
import { X, Globe, ShoppingBag, UserCheck, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { activeCurrency, setActiveCurrency, itemCount } = useCart();
  const { user, openPhoneModal, isAuthenticated, signOut } = useAuth();

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ifaqa-plum/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          transition: 'transform 250ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className="relative w-4/5 max-w-sm bg-ifaqa-linen border-r border-ifaqa-sand/40 h-full flex flex-col justify-between z-10 shadow-2xl overflow-y-auto"
      >
        <div>
          {/* Header */}
          <div className="p-4 border-b border-ifaqa-sand/30 flex items-center justify-between bg-white/50">
            <div>
              <span className="font-serif text-sm font-bold text-ifaqa-plum tracking-wider">IFAQA</span>
              <p className="text-[10px] text-ifaqa-mauve uppercase tracking-widest font-mono">Unani Dawakhana</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-ifaqa-blackberry hover:text-ifaqa-plum"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="px-4 py-3 bg-ifaqa-cashmere/30 border-b border-ifaqa-sand/30 flex items-center justify-between">
            <span className="text-xs font-serif text-ifaqa-plum flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-ifaqa-mauve" />
              <span>Currency</span>
            </span>
            <div className="flex border border-ifaqa-sand/60 overflow-hidden">
              <button
                onClick={() => setActiveCurrency('PKR')}
                className={`px-3 py-1 text-xs font-mono font-semibold ${activeCurrency === 'PKR' ? 'bg-ifaqa-plum text-ifaqa-linen' : 'bg-ifaqa-linen text-ifaqa-plum'}`}
              >
                PKR
              </button>
              <button
                onClick={() => setActiveCurrency('USD')}
                className={`px-3 py-1 text-xs font-mono font-semibold ${activeCurrency === 'USD' ? 'bg-ifaqa-plum text-ifaqa-linen' : 'bg-ifaqa-linen text-ifaqa-plum'}`}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ifaqa-mauve mb-2">
              Pharmacopoeia Categories
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.path}
                onClick={onClose}
                className="block px-3 py-2 text-xs font-serif text-ifaqa-plum hover:bg-ifaqa-sand/20 hover:text-ifaqa-blackberry border-l-2 border-transparent hover:border-l-ifaqa-plum transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-ifaqa-sand/30 bg-ifaqa-cashmere/20 space-y-3">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-ifaqa-plum font-mono">
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span className="truncate max-w-[140px]">{user.phoneNumber}</span>
              </div>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="text-[11px] font-serif text-ifaqa-mauve hover:text-ifaqa-plum underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                openPhoneModal();
              }}
              className="w-full py-2 bg-ifaqa-plum text-ifaqa-linen text-xs font-serif uppercase tracking-wider text-center"
            >
              Sign In with Phone
            </button>
          )}

          <div className="text-[10px] text-center text-ifaqa-mauve font-serif">
            EST. HERITAGE DAWAKHANA
          </div>
        </div>
      </div>
    </div>
  );
}
