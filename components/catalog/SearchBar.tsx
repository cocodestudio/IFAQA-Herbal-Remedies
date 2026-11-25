'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder,
  className = '',
}: SearchBarProps) {
  const { t } = useLanguage();
  const actualPlaceholder = placeholder || t('searchPlaceholder');

  return (
    <div className={`relative w-full ${className}`}>
      <span className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-[#5A6962]">
        <Search className="w-4 h-4" strokeWidth={1.5} />
      </span>
      <input
        type="text"
        dir="auto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={actualPlaceholder}
        className="w-full h-10 ps-10 pe-10 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum text-sm placeholder:text-[#5A6962] font-sans focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 end-0 pe-3 flex items-center text-[#5A6962] hover:text-ifaqa-plum transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
