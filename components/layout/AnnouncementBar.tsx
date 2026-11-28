'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { PromotionalBanner } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';

interface AnnouncementBarProps {
  banner?: PromotionalBanner | null;
}

export function AnnouncementBar({ banner }: AnnouncementBarProps) {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();

  const headline = banner?.headline || t('freeShippingNotice');
  const ctaText = banner?.ctaText || t('explorePharmacopoeia');
  const ctaLink = banner?.ctaLink || '/catalog';

  return (
    <div className="bg-ifaqa-cashmere text-ifaqa-plum text-xs font-sans border-b border-ifaqa-plum/10 relative z-30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-2 flex flex-col md:flex-row items-center justify-between gap-2 min-h-[36px]">
        <div className="flex-1 flex items-center justify-center md:justify-start gap-2 text-center md:text-start">
          <span className="text-xs text-ifaqa-plum">{headline}</span>
          {ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-1 text-xs font-medium text-ifaqa-plum hover:underline shrink-0 ms-1"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0" translate="no">
          <Globe className="w-3.5 h-3.5 text-[#5A6962]" strokeWidth={1.5} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select website language"
            className="h-7 px-2 rounded border border-ifaqa-plum/15 bg-white text-xs text-ifaqa-plum focus:outline-none"
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
