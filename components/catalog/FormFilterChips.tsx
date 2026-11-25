'use client';

import React from 'react';

interface FormFilterChipsProps {
  selectedForm: string;
  onSelectForm: (form: string) => void;
}

const FORMS: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'All forms' },
  { id: 'Majun', label: 'Majun (Electuary)' },
  { id: 'Safoof', label: 'Safoof (Powder)' },
  { id: 'Sharbat', label: 'Sharbat (Syrup)' },
  { id: 'Arq', label: 'Arq (Distillate)' },
  { id: 'Hab', label: 'Hab (Tablets)' },
  { id: 'Khamira', label: 'Khamira' },
  { id: 'Kushta', label: 'Kushta' },
  { id: 'Raughan', label: 'Raughan (Oil)' },
  { id: 'Marham', label: 'Marham (Ointment)' },
];

export function FormFilterChips({ selectedForm, onSelectForm }: FormFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {FORMS.map((form) => {
        const isSelected = selectedForm === form.id;
        return (
          <button
            key={form.id}
            onClick={() => onSelectForm(form.id)}
            className={`px-2.5 py-1.5 rounded text-xs font-sans transition-colors active:scale-[0.98] ${
              isSelected
                ? 'bg-ifaqa-plum text-ifaqa-linen font-medium'
                : 'bg-ifaqa-linen text-[#5A6962] border border-ifaqa-plum/10 hover:bg-ifaqa-cashmere hover:text-ifaqa-plum'
            }`}
          >
            {form.label}
          </button>
        );
      })}
    </div>
  );
}
