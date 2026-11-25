'use client';

import React from 'react';
import { PaymentMethod } from '@/lib/types';
import { Banknote, CreditCard, ShieldCheck } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  currency: 'PKR' | 'USD';
}

export function PaymentMethodSelector({ selected, onChange }: PaymentMethodSelectorProps) {
  const methods: Array<{
    id: PaymentMethod;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'credit_card',
      title: 'Online payment (UPI, cards, net banking)',
      description: 'Pay securely via UPI, debit or credit cards, or net banking.',
      icon: <CreditCard className="w-4 h-4 text-ifaqa-plum" strokeWidth={1.5} />,
      badge: 'Recommended',
    },
    {
      id: 'cash_on_delivery',
      title: 'Cash on delivery (COD)',
      description: 'Pay cash or scan courier UPI QR when the order arrives.',
      icon: <Banknote className="w-4 h-4 text-ifaqa-plum" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-sans text-sm font-semibold text-ifaqa-plum">
          Payment method
        </h3>
        <span className="text-xs font-sans text-[#165A45] flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
          <span>Encrypted checkout</span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {methods.map((method) => {
          const isSelected = selected === method.id;

          return (
            <button
              type="button"
              key={method.id}
              onClick={() => onChange(method.id)}
              className={`p-4 rounded-xl border text-start transition-colors cursor-pointer flex items-start gap-3.5 ${
                isSelected
                  ? 'border-ifaqa-plum bg-ifaqa-cashmere/70 ring-1 ring-ifaqa-plum/20'
                  : 'border-ifaqa-plum/15 bg-white hover:border-ifaqa-plum/30'
              }`}
            >
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-ifaqa-plum/10 flex items-center justify-center shrink-0">
                {method.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <span className="font-sans text-sm font-medium text-ifaqa-plum">
                    {method.title}
                  </span>
                  {isSelected ? (
                    <span className="text-xs font-sans font-medium text-[#165A45] bg-[#E8F3EE] px-2 py-0.5 rounded">
                      Selected
                    </span>
                  ) : method.badge ? (
                    <span className="text-xs font-sans text-[#5A6962] bg-ifaqa-linen px-2 py-0.5 rounded border border-ifaqa-plum/10">
                      {method.badge}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-[#5A6962] font-sans mt-1 leading-relaxed">
                  {method.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
