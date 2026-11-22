'use client';

import React from 'react';
import { RemedyForm } from '@/lib/types';

interface FormFilterChipsProps {
  selectedForm: string;
  onSelectForm: (form: string) => void;
}

const FORMS: Array<{ id: string; label: string; urdu: string }> = [
  { id: 'all', label: 'All Forms', urdu: 'تمام اقسام' },
  { id: 'Majun', label: 'Majun (Electuary)', urdu: 'معجون' },
  { id: 'Safoof', label: 'Safoof (Powder)', urdu: 'سفوف' },
  { id: 'Sharbat', label: 'Sharbat (Syrup)', urdu: 'شربت' },
  { id: 'Arq', label: 'Arq (Distillate)', urdu: 'عرق' },
  { id: 'Hab', label: 'Hab (Pills)', urdu: 'حب' },
  { id: 'Khamira', label: 'Khamira (Ferment)', urdu: 'خمیرہ' },
  { id: 'Kushta', label: 'Kushta (Calx)', urdu: 'کشتہ' },
  { id: 'Raughan', label: 'Raughan (Oil)', urdu: 'روغن' },
  { id: 'Marham', label: 'Marham (Ointment)', urdu: 'مرہم' },
];

export function FormFilterChips({ selectedForm, onSelectForm }: FormFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 py-2">
      {FORMS.map((form) => {
        const isSelected = selectedForm === form.id;
        return (
          <button
            key={form.id}
            onClick={() => onSelectForm(form.id)}
            style={{
              transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease, color 150ms ease',
            }}
            className={`px-3 py-1.5 text-xs font-serif tracking-wider uppercase active:scale-[0.97] transition-all ${
              isSelected
                ? 'bg-ifaqa-plum text-ifaqa-linen shadow-sm border border-ifaqa-plum font-bold'
                : 'bg-ifaqa-linen text-ifaqa-plum border border-ifaqa-sand/60 hover:bg-ifaqa-cashmere/50'
            }`}
          >
            <span>{form.label}</span>
          </button>
        );
      })}
    </div>
  );
}
