'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, Leaf } from 'lucide-react';
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
    <div className="p-4 flex flex-col sm:flex-row gap-3.5 items-start sm:items-center justify-between select-none">
      {/* Thumbnail & Info */}
      <div className="flex gap-3 items-center min-w-0 flex-1 w-full sm:w-auto">
        <Link
          href={`/remedy/${item.remedyId}`}
          className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg bg-white border border-ifaqa-plum/10 p-1 flex items-center justify-center overflow-hidden"
        >
          {item.image && !imgError ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="80px"
              onError={() => setImgError(true)}
              className="object-contain"
            />
          ) : (
            <Leaf className="w-5 h-5 text-[#5A6962]" strokeWidth={1.5} />
          )}
        </Link>

        <div className="min-w-0 flex-1 space-y-1">
          <h4 className="font-sans text-sm sm:text-base font-medium text-ifaqa-plum leading-snug truncate">
            <Link href={`/remedy/${item.remedyId}`} className="hover:underline">
              {item.name}
            </Link>
          </h4>

          {language === 'ur' && item.urduName && (
            <p dir="rtl" lang="ur" className="text-sm font-urdu text-[#5A6962]">
              {item.urduName}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs font-sans text-[#5A6962] flex-wrap">
            {item.size && (
              <span>{item.size}</span>
            )}
            <span className="font-mono tabular-nums text-ifaqa-plum">
              {formatPriceINR(item.unitPrice)} each
            </span>
          </div>
        </div>
      </div>

      {/* Price, Stepper & Delete */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-ifaqa-plum/10">
        <span className="font-sans text-base font-semibold text-ifaqa-plum whitespace-nowrap tabular-nums">
          {formatPriceINR(lineTotal)}
        </span>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-ifaqa-plum/15 bg-white">
            <button
              onClick={() => decrementItem(item.remedyId)}
              className="w-8 h-8 flex items-center justify-center text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <span className="w-7 text-center font-mono text-xs font-medium text-ifaqa-plum tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={item.quantity >= (item.maxStock || 99)}
              className="w-8 h-8 flex items-center justify-center text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.remedyId)}
            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#5A6962] hover:text-red-700 hover:bg-red-50 transition-colors"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
