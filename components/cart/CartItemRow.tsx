'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, Sparkles } from 'lucide-react';
import { CartLineItem, useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPriceINR } from '@/lib/formatters';

interface CartItemRowProps {
  item: CartLineItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { decrementItem, updateQuantity, removeItem } = useCart();
  const { language } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const handleIncrement = () => {
    if (item.quantity < (item.maxStock || 99)) {
      updateQuantity(item.remedyId, item.quantity + 1);
    }
  };

  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between select-none hover:bg-[#FAF8F5]/80 transition-colors">
      {/* Product Image & Info */}
      <div className="flex gap-3 sm:gap-4 items-center min-w-0 flex-1 w-full sm:w-auto">
        <Link
          href={`/remedy/${item.remedyId}`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-white border border-ifaqa-sand/60 p-1 flex items-center justify-center overflow-hidden group shadow-sm"
        >
          {item.image && !imgError ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="96px"
              onError={() => setImgError(true)}
              className="object-contain filter contrast-[1.02] group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full bg-[#FAF5EC] flex items-center justify-center text-ifaqa-plum">
              <Sparkles className="w-6 h-6 text-[#DFBA73]" />
            </div>
          )}
        </Link>

        {/* Text Details */}
        <div className="min-w-0 flex-1 space-y-1">
          <h4 className="font-serif text-sm sm:text-base font-bold text-ifaqa-plum leading-snug">
            <Link href={`/remedy/${item.remedyId}`} className="hover:text-ifaqa-blackberry hover:underline">
              {item.name}
            </Link>
          </h4>

          {language === 'ur' && item.urduName && (
            <p dir="rtl" className="text-xs font-serif text-ifaqa-blackberry font-bold">
              {item.urduName}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs font-sans text-ifaqa-blackberry flex-wrap">
            {item.size && (
              <span className="font-mono bg-ifaqa-linen px-1.5 py-0.5 border border-ifaqa-sand/40 text-[11px]">
                Size: {item.size}
              </span>
            )}
            <span className="text-emerald-800 font-bold text-[11px]">● In Stock</span>
          </div>

          <p className="text-xs font-mono text-ifaqa-blackberry font-medium pt-0.5">
            Unit Price: <span className="font-bold text-ifaqa-plum">{formatPriceINR(item.unitPrice)}</span>
          </p>
        </div>
      </div>

      {/* Stepper, Subtotal & Remove Controls */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-ifaqa-sand/20">
        {/* Total Price for this item */}
        <div className="text-left sm:text-right">
          <span className="font-serif text-base sm:text-lg font-bold text-ifaqa-plum whitespace-nowrap block">
            {formatPriceINR(lineTotal)}
          </span>
          {item.quantity > 1 && (
            <span className="text-[10px] text-ifaqa-blackberry font-mono block">
              ({item.quantity} × {formatPriceINR(item.unitPrice)})
            </span>
          )}
        </div>

        {/* Quantity Stepper & Remove Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-ifaqa-sand/70 bg-white shadow-sm">
            <button
              onClick={() => decrementItem(item.remedyId)}
              className="w-7 h-7 flex items-center justify-center text-ifaqa-plum hover:bg-ifaqa-sand/20 active:scale-95 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center font-mono text-xs font-bold text-ifaqa-plum">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= (item.maxStock || 99)}
              className="w-7 h-7 flex items-center justify-center text-ifaqa-plum hover:bg-ifaqa-sand/20 active:scale-95 transition-colors disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.remedyId)}
            className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors"
            title="Remove from cart"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
