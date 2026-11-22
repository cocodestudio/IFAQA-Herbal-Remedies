'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatPriceINR } from '@/lib/formatters';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { ShieldCheck, Truck } from 'lucide-react';

export function OrderSummaryCard() {
  const { items, subtotalPKR, shippingFee, totalAmount } = useCart();

  return (
    <div className="bg-white border-2 border-ifaqa-sand/70 p-6 space-y-6 shadow-luxury-card select-none">
      <div className="border-b border-ifaqa-sand/40 pb-3 flex items-center justify-between">
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
          Order Summary
        </h3>
        <span className="text-xs font-mono text-ifaqa-blackberry font-bold">
          {items.length} {items.length === 1 ? 'line item' : 'line items'}
        </span>
      </div>

      {/* Line Items List */}
      <div className="max-h-60 overflow-y-auto divide-y divide-ifaqa-sand/20 pr-1">
        {items.map((item) => (
          <div key={item.remedyId} className="py-2.5 flex items-center justify-between text-xs">
            <div className="flex-1 pr-3">
              <span className="font-serif font-bold text-ifaqa-plum block truncate">
                {item.name}
              </span>
              <span className="text-[11px] text-ifaqa-blackberry font-mono">
                Qty: {item.quantity} × {formatPriceINR(item.unitPrice)}
              </span>
            </div>
            <span className="font-serif font-bold text-ifaqa-plum text-sm">
              {formatPriceINR(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Fee Calculation Breakdown */}
      <div className="border-t border-ifaqa-sand/40 pt-4 space-y-2.5 text-xs font-serif">
        <div className="flex items-center justify-between text-ifaqa-blackberry font-medium">
          <span>Subtotal</span>
          <span className="font-mono font-bold text-ifaqa-plum text-sm">
            {formatPriceINR(subtotalPKR)}
          </span>
        </div>

        <div className="flex items-center justify-between text-ifaqa-blackberry font-medium">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-ifaqa-plum" />
            <span>Pan-India Delivery</span>
          </span>
          <span className="font-mono font-bold text-ifaqa-plum">
            {shippingFee === 0 ? (
              <span className="text-emerald-800 font-bold uppercase tracking-wider text-[11px]">Free</span>
            ) : (
              formatPriceINR(shippingFee)
            )}
          </span>
        </div>

        <div className="border-t border-ifaqa-sand/40 pt-3 flex items-center justify-between text-sm">
          <span className="font-serif font-bold text-ifaqa-plum">Total Amount</span>
          <span className="font-serif text-xl font-bold text-ifaqa-plum">
            {formatPriceINR(totalAmount)}
          </span>
        </div>
      </div>

      {/* Dispatch Guarantees */}
      <div className="pt-2 border-t border-ifaqa-sand/30 space-y-2 text-[11px] font-sans text-ifaqa-blackberry font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
          <span>Cash on Delivery (COD) & Online Payment Supported</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-800 shrink-0" />
          <span>Doorstep Courier to all Indian Pincodes</span>
        </div>
      </div>
    </div>
  );
}
