'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { PromotionalBanner } from '@/lib/types';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';

interface AnnouncementBarProps {
  banner?: PromotionalBanner | null;
}

export function AnnouncementBar({ banner }: AnnouncementBarProps) {
  const { language, setLanguage, t } = useLanguage();

  const headline = banner?.headline || t('freeShippingNotice');
  const ctaText = banner?.ctaText || t('explorePharmacopoeia');
  const ctaLink = banner?.ctaLink || "/catalog";

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'ur', label: 'اردو' },
  ];

  return (
    <div className="bg-ifaqa-cashmere text-ifaqa-plum text-xs font-sans border-b border-ifaqa-plum/10 relative z-30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-2 flex flex-col md:flex-row items-center justify-between gap-2 min-h-[36px]">
        <div className="flex-1 flex items-center justify-center md:justify-start gap-2 text-center md:text-start">
          <span className="text-xs text-ifaqa-plum">
            {headline}
          </span>
          {ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-1 text-xs font-medium text-ifaqa-plum hover:underline shrink-0 ms-1"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl-flip" strokeWidth={1.5} />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Globe className="w-3.5 h-3.5 text-[#5A6962]" strokeWidth={1.5} />
          <div className="inline-flex items-center rounded border border-ifaqa-plum/15 bg-white p-0.5">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-0.5 text-xs font-sans rounded transition-colors ${
                    isSelected
                      ? 'bg-ifaqa-plum text-ifaqa-linen font-medium'
                      : 'text-[#5A6962] hover:text-ifaqa-plum'
                  }`}
                  aria-label={`Switch language to ${lang.label}`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
