'use client';

import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { formatPricePKR, formatPriceUSD } from '@/lib/formatters';

interface ShippingProgressBarProps {
  subtotalPKR?: number;
  subtotal?: number;
  currency?: 'PKR' | 'USD';
  threshold?: number;
}

export function ShippingProgressBar({
  subtotalPKR,
  subtotal,
  currency = 'PKR',
  threshold = 5000,
}: ShippingProgressBarProps) {
  const currentSubtotal = subtotal !== undefined ? subtotal : (subtotalPKR || 0);
  const actualThreshold = currency === 'USD' ? 50 : threshold;
  const isUnlocked = currentSubtotal >= actualThreshold;
  const remaining = Math.max(0, actualThreshold - currentSubtotal);
  const percentage = Math.min(100, Math.round((currentSubtotal / actualThreshold) * 100));

  const formatRemaining = currency === 'USD' ? formatPriceUSD(remaining) : formatPricePKR(remaining);

  return (
    <div className="p-3.5 bg-ifaqa-cashmere/30 border border-ifaqa-sand/50 space-y-2 select-none">
      <div className="flex items-center justify-between text-xs font-serif">
        <span className="flex items-center gap-1.5 text-ifaqa-plum font-bold">
          {isUnlocked ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-800" />
          ) : (
            <Truck className="w-4 h-4 text-ifaqa-plum" />
          )}
          <span>
            {isUnlocked
              ? 'Free Express Delivery Unlocked!'
              : `Add ${formatRemaining} more for Free Delivery`}
          </span>
        </span>
        <span className="text-[11px] font-mono text-ifaqa-plum font-bold">
          {percentage}%
        </span>
      </div>

      <div className="w-full h-2 bg-ifaqa-sand/40 overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full transition-all duration-300 ${
            isUnlocked ? 'bg-emerald-800' : 'bg-ifaqa-plum'
          }`}
        />
      </div>
    </div>
  );
}
