'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartItemRow } from './CartItemRow';
import { ShippingProgressBar } from './ShippingProgressBar';
import { Button3D } from '@/components/ui/Button3D';
import { formatPriceINR } from '@/lib/formatters';
import { useLanguage } from '@/context/LanguageContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotalPKR, itemCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ifaqa-plum/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Container */}
      <div
        style={{
          transition: 'transform 250ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        className="relative w-full max-w-md bg-white border-l border-ifaqa-sand/60 h-full flex flex-col justify-between z-10 shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-ifaqa-sand/40 flex items-center justify-between bg-ifaqa-linen">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-ifaqa-plum" />
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
              {t('cart')}
            </h3>
            <span className="text-xs font-mono text-ifaqa-blackberry font-bold">
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-ifaqa-plum hover:bg-ifaqa-sand/30 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="p-4 bg-ifaqa-linen/50 border-b border-ifaqa-sand/30">
          <ShippingProgressBar subtotal={subtotalPKR} />
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-ifaqa-sand/30">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <span className="text-4xl">🌿</span>
              <p className="font-serif text-base font-bold text-ifaqa-plum">
                Your cart is empty
              </p>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed font-medium">
                Browse our dispensary to find tailored herbal formulations for any condition.
              </p>
              <div className="pt-2">
                <Link
                  href="/catalog"
                  onClick={closeCart}
                  className="px-4 py-2 bg-ifaqa-plum text-ifaqa-linen text-xs font-serif font-bold uppercase tracking-wider inline-block hover:bg-ifaqa-blackberry"
                >
                  Explore Catalog
                </Link>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow key={item.remedyId} item={item} />
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-ifaqa-sand/50 bg-ifaqa-linen/60 space-y-4">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">Subtotal:</span>
              <span className="font-mono text-lg font-bold text-ifaqa-plum">
                {formatPriceINR(subtotalPKR)}
              </span>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full"
              >
                <Button3D variant="primary" size="lg" className="w-full font-bold shadow-md">
                  <span>Checkout Now</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 inline-block" />
                </Button3D>
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="block w-full text-center py-2 text-xs font-serif text-ifaqa-plum font-bold hover:underline"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
