'use client';

import React from 'react';
import { AilmentCategory } from '@/lib/types';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
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
    <aside className="w-full lg:w-72 space-y-7 bg-white border border-ifaqa-sand/60 p-6 shadow-sm select-none">
      {/* Category Filter */}
      <div>
        <div className="flex items-center justify-between border-b border-ifaqa-sand/40 pb-2 mb-3">
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ifaqa-plum">
            Ailment Categories
          </h3>
          <span className="text-[11px] font-mono text-ifaqa-blackberry font-bold">
            {totalResultsCount} items
          </span>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-2 text-xs font-serif transition-colors flex items-center justify-between border-l-2 ${
              selectedCategory === 'all'
                ? 'border-l-ifaqa-plum bg-ifaqa-linen text-ifaqa-plum font-bold'
                : 'border-l-transparent text-ifaqa-blackberry font-medium hover:bg-ifaqa-linen/60'
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
                className={`w-full text-left px-3 py-2 text-xs font-serif transition-colors flex items-center justify-between border-l-2 ${
                  isSelected
                    ? 'border-l-ifaqa-plum bg-ifaqa-linen text-ifaqa-plum font-bold'
                    : 'border-l-transparent text-ifaqa-blackberry font-medium hover:bg-ifaqa-linen/60'
                }`}
              >
                <div>
                  <span className="block font-medium">{displayCat}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-ifaqa-plum bg-ifaqa-sand/20 px-1.5 py-0.5">
                  {c.remedyCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* In-Stock Filter */}
      <div className="border-t border-ifaqa-sand/40 pt-4">
        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-ifaqa-plum mb-3">
          Inventory Availability
        </h4>
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-sans text-ifaqa-plum select-none">
          <div
            onClick={() => onToggleInStock(!inStockOnly)}
            className={`w-4 h-4 border flex items-center justify-center transition-colors ${
              inStockOnly
                ? 'bg-ifaqa-plum border-ifaqa-plum text-ifaqa-linen'
                : 'border-ifaqa-sand/70 bg-white'
            }`}
          >
            {inStockOnly && <Check className="w-3 h-3" />}
          </div>
          <span className="font-medium">{t('inStockOnly')}</span>
        </label>
      </div>

      {/* Formulation Forms */}
      <div className="border-t border-ifaqa-sand/40 pt-4">
        <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-ifaqa-plum mb-2">
          Pharmaceutical Form
        </h4>
        <FormFilterChips
          selectedForm={selectedForm}
          onSelectForm={onSelectForm}
        />
      </div>

      {/* Classical Dispensary Seal */}
      <div className="border-t border-ifaqa-sand/40 pt-4">
        <div className="p-3.5 bg-ifaqa-linen border border-ifaqa-sand/50 text-center">
          <p className="font-serif text-xs font-bold text-ifaqa-plum mb-1">
            Empirical Herbal Standard
          </p>
          <p className="text-[11px] text-ifaqa-blackberry font-sans leading-relaxed font-medium">
            Formulations compounded strictly with authentic botanicals for complete health equilibrium.
          </p>
        </div>
      </div>
    </aside>
  );
}
