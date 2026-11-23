'use client';

import React from 'react';
import { PaymentMethod } from '@/lib/types';
import { Banknote, CreditCard, ShieldCheck } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  currency: 'PKR' | 'USD';
}

export function PaymentMethodSelector({ selected, onChange, currency }: PaymentMethodSelectorProps) {
  const methods: Array<{
    id: PaymentMethod;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'credit_card',
      title: 'Online Payment (UPI, Cards, Net Banking)',
      description: 'Fast & 100% secure checkout via UPI (Google Pay, PhonePe, Paytm), Cards, and Net Banking.',
      icon: <CreditCard className="w-5 h-5 text-emerald-800" />,
      badge: 'Recommended',
    },
    {
      id: 'cash_on_delivery',
      title: 'Cash on Delivery (COD)',
      description: 'Pay cash or scan courier QR upon delivery at your doorstep.',
      icon: <Banknote className="w-5 h-5 text-emerald-800" />,
      badge: 'Available',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
          Select Payment Method
        </h3>
        <span className="text-[11px] font-sans font-medium text-emerald-800 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Safe & Encrypted
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {methods.map((method) => {
          const isSelected = selected === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onChange(method.id)}
              className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                isSelected
                  ? 'border-ifaqa-plum bg-[#FAF5EC] shadow-sm ring-1 ring-ifaqa-plum'
                  : 'border-ifaqa-sand/60 bg-white hover:border-ifaqa-blackberry hover:bg-[#FAF8F5]'
              }`}
            >
              <div className="mt-0.5 w-8 h-8 rounded-none bg-white border border-ifaqa-sand/50 flex items-center justify-center shrink-0">
                {method.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <h4 className="font-serif text-sm font-bold text-ifaqa-plum">
                    {method.title}
                  </h4>
                  {isSelected ? (
                    <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5" /> Selected
                    </span>
                  ) : method.badge ? (
                    <span className="text-[10px] font-mono text-ifaqa-blackberry bg-ifaqa-sand/20 px-2 py-0.5 border border-ifaqa-sand/40">
                      {method.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-ifaqa-blackberry font-sans mt-1 leading-relaxed">
                  {method.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
