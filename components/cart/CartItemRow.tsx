'use client';

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartLineItem, useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPricePKR, formatPriceUSD } from '@/lib/formatters';

interface CartItemRowProps {
  item: CartLineItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { decrementItem, updateQuantity, removeItem, activeCurrency } = useCart();
  const { language } = useLanguage();

  const handleIncrement = () => {
    if (item.quantity < item.maxStock) {
      updateQuantity(item.remedyId, item.quantity + 1);
    }
  };

  return (
    <div className="py-4 border-b border-ifaqa-sand/40 flex gap-4 items-start select-none">
      {/* Thumbnail */}
      <div className="w-16 h-16 shrink-0 bg-ifaqa-linen border border-ifaqa-sand/50 flex items-center justify-center p-2 text-2xl shadow-sm">
        🌿
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-serif text-sm font-bold text-ifaqa-plum truncate hover:text-ifaqa-blackberry">
              <Link href={`/remedy/${item.remedyId}`}>
                {item.name}
              </Link>
            </h4>
            {language === 'ur' && item.urduName && (
              <p dir="rtl" className="text-[11px] font-serif text-ifaqa-blackberry font-bold">
                {item.urduName}
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.remedyId)}
            className="p-1 text-ifaqa-blackberry hover:text-red-700 transition-colors"
            title="Remove item"
            aria-label="Remove item from cart"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {item.size && (
          <span className="text-[11px] font-mono text-ifaqa-blackberry font-medium block mt-0.5">
            Size: {item.size}
          </span>
        )}

        {/* Stepper & Price Row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-ifaqa-sand/70 bg-white">
            <button
              onClick={() => decrementItem(item.remedyId)}
              className="px-2 py-1 text-ifaqa-plum hover:bg-ifaqa-sand/20 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 font-mono text-xs font-bold text-ifaqa-plum">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= item.maxStock}
              className="px-2 py-1 text-ifaqa-plum hover:bg-ifaqa-sand/20 transition-colors disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="font-mono text-xs font-bold text-ifaqa-plum">
            {activeCurrency === 'USD'
              ? formatPriceUSD(item.unitPriceUSD * item.quantity)
              : formatPricePKR(item.unitPrice * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
