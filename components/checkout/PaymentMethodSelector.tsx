'use client';

import React from 'react';
import { PaymentMethod } from '@/lib/types';
import { Banknote, Building2, CreditCard, ShieldCheck } from 'lucide-react';

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
    availableCurrencies: Array<'PKR' | 'USD'>;
  }> = [
    {
      id: 'cash_on_delivery',
      title: 'Cash on Delivery (COD)',
      description: 'Pay cash or UPI directly upon delivery at your doorstep.',
      icon: <Banknote className="w-5 h-5 text-ifaqa-mauve" />,
      availableCurrencies: ['PKR'],
    },
    {
      id: 'bank_transfer',
      title: 'Direct Bank Transfer / NEFT / IMPS',
      description: 'Transfer directly to IFAQA Herbal Remedies official bank account.',
      icon: <Building2 className="w-5 h-5 text-ifaqa-mauve" />,
      availableCurrencies: ['PKR'],
    },
    {
      id: 'credit_card',
      title: 'Online Payment (UPI, Cards, Net Banking)',
      description: 'Secure, encrypted checkout via UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards.',
      icon: <CreditCard className="w-5 h-5 text-ifaqa-mauve" />,
      availableCurrencies: ['PKR', 'USD'],
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum mb-3">
        Payment Method
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {methods.map((method) => {
          const isSelected = selected === method.id;
          const isAvailable = method.availableCurrencies.includes(currency);

          return (
            <div
              key={method.id}
              onClick={() => isAvailable && onChange(method.id)}
              className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                !isAvailable
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200'
                  : isSelected
                  ? 'border-ifaqa-plum bg-ifaqa-linen shadow-sm'
                  : 'border-ifaqa-sand/40 bg-white hover:border-ifaqa-blackberry'
              }`}
            >
              <div className="mt-0.5">{method.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xs font-bold text-ifaqa-plum">
                    {method.title}
                  </h4>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-ifaqa-mauve font-sans mt-0.5 leading-relaxed">
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
