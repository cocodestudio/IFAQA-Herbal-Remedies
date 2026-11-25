'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatPriceINR } from '@/lib/formatters';
import { ShieldCheck, Truck } from 'lucide-react';

export function OrderSummaryCard() {
  const { items, subtotalPKR, shippingFee, totalAmount } = useCart();

  return (
    <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 space-y-5 shadow-luxury-card select-none font-sans">
      <div className="border-b border-ifaqa-plum/10 pb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ifaqa-plum">
          Order summary
        </h3>
        <span className="text-xs font-mono text-[#5A6962] tabular-nums">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Line Items */}
      <div className="max-h-60 overflow-y-auto divide-y divide-ifaqa-plum/10">
        {items.map((item) => (
          <div key={item.remedyId} className="py-2.5 flex items-center justify-between gap-3 text-sm tabular-nums">
            <div className="flex-1 min-w-0">
              <span className="font-medium text-ifaqa-plum block truncate">
                {item.name}
              </span>
              <span className="text-xs text-[#5A6962] font-mono">
                {item.quantity} × {formatPriceINR(item.unitPrice)}
              </span>
            </div>
            <span className="font-medium text-ifaqa-plum shrink-0">
              {formatPriceINR(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-ifaqa-plum/10 pt-4 space-y-2.5 text-sm tabular-nums">
        <div className="flex items-center justify-between text-[#5A6962]">
          <span>Subtotal</span>
          <span className="font-medium text-ifaqa-plum">
            {formatPriceINR(subtotalPKR)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[#5A6962]">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <span>Pan-India delivery</span>
          </span>
          <span className="font-medium text-ifaqa-plum">
            {shippingFee === 0 ? (
              <span className="text-[#165A45]">Free</span>
            ) : (
              formatPriceINR(shippingFee)
            )}
          </span>
        </div>

        <div className="border-t border-ifaqa-plum/10 pt-3 flex items-center justify-between">
          <span className="font-semibold text-ifaqa-plum">Total amount</span>
          <span className="font-sans text-xl font-semibold text-ifaqa-plum">
            {formatPriceINR(totalAmount)}
          </span>
        </div>
      </div>

      {/* Dispatch note */}
      <div className="pt-2 border-t border-ifaqa-plum/10 space-y-2 text-xs text-[#5A6962]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#165A45] shrink-0" strokeWidth={1.5} />
          <span>Online payment and cash on delivery accepted</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#165A45] shrink-0" strokeWidth={1.5} />
          <span>Dispatched in sealed containers from Saharanpur</span>
        </div>
      </div>
    </div>
  );
}
