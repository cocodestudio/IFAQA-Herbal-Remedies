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
  className = "",
}: SearchBarProps) {
  const { t } = useLanguage();
  const actualPlaceholder = placeholder || t('searchPlaceholder');

  return (
    <div className={`relative w-full ${className}`}>
      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ifaqa-plum">
        <Search className="w-4 h-4" />
      </span>
      <input
        type="text"
        dir="auto"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={actualPlaceholder}
        className="w-full pl-10 pr-10 py-3 bg-white border border-ifaqa-sand/70 text-ifaqa-plum text-sm placeholder:text-ifaqa-blackberry/70 font-sans font-medium focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum transition-all shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-ifaqa-blackberry hover:text-ifaqa-plum"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
