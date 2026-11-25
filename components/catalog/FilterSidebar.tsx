'use client';

import React from 'react';
import { AilmentCategory } from '@/lib/types';
import { FormFilterChips } from './FormFilterChips';
import { useLanguage } from '@/context/LanguageContext';
import { Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: AilmentCategory[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  selectedForm: string;
  onSelectForm: (form: string) => void;
  inStockOnly: boolean;
  onToggleInStock: (inStock: boolean) => void;
  totalResultsCount: number;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedForm,
  onSelectForm,
  inStockOnly,
  onToggleInStock,
  totalResultsCount,
}: FilterSidebarProps) {
  const { t, getCategoryTitle } = useLanguage();

  return (
    <aside className="w-full lg:w-[260px] space-y-6 bg-white rounded-xl border border-ifaqa-plum/10 p-5 shadow-luxury-card select-none">
      {/* Categories */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-ifaqa-plum/10">
          <h3 className="font-sans text-xs font-medium text-[#5A6962]">
            {t('categoriesTitle')}
          </h3>
          <span className="text-xs font-mono text-[#5A6962] tabular-nums">
            {totalResultsCount}
          </span>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-start h-9 px-3 rounded-lg text-sm font-sans transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-ifaqa-cashmere text-ifaqa-plum font-medium'
                : 'text-[#5A6962] hover:bg-ifaqa-linen hover:text-ifaqa-plum'
            }`}
          >
            <span>{t('allFormulations')}</span>
          </button>

          {categories.map((c) => {
            const isSelected = selectedCategory === c.id || selectedCategory === c.slug;
            const displayCat = getCategoryTitle(c);
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.slug)}
                className={`w-full text-start min-h-[36px] px-3 py-1.5 rounded-lg text-sm font-sans transition-colors flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-ifaqa-cashmere text-ifaqa-plum font-medium'
                    : 'text-[#5A6962] hover:bg-ifaqa-linen hover:text-ifaqa-plum'
                }`}
              >
                <span className="truncate">{displayCat}</span>
                <span className="text-xs font-mono text-[#5A6962] tabular-nums shrink-0">
                  {c.remedyCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="border-t border-ifaqa-plum/10 pt-4">
        <h4 className="font-sans text-xs font-medium text-[#5A6962] mb-3">
          Availability
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-sans text-ifaqa-plum select-none">
          <button
            type="button"
            role="checkbox"
            aria-checked={inStockOnly}
            onClick={() => onToggleInStock(!inStockOnly)}
            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
              inStockOnly
                ? 'bg-ifaqa-plum border-ifaqa-plum text-ifaqa-linen'
                : 'border-ifaqa-plum/25 bg-white'
            }`}
          >
            {inStockOnly && <Check className="w-3 h-3" strokeWidth={2} />}
          </button>
          <span>{t('inStockOnly')}</span>
        </label>
      </div>

      {/* Preparation Form */}
      <div className="border-t border-ifaqa-plum/10 pt-4">
        <h4 className="font-sans text-xs font-medium text-[#5A6962] mb-2">
          Preparation form
        </h4>
        <FormFilterChips
          selectedForm={selectedForm}
          onSelectForm={onSelectForm}
        />
      </div>
    </aside>
  );
}
