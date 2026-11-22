'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';
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
    <div className="bg-ifaqa-plum text-ifaqa-linen text-xs font-serif tracking-wider border-b border-ifaqa-sand/30 relative z-30 overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 min-h-[36px] sm:min-h-[40px]">
        {/* Left/Center: Promotional Headline */}
        <div className="flex-1 flex items-center justify-center md:justify-start gap-2 text-center md:text-left">
          <Sparkles className="w-3.5 h-3.5 text-ifaqa-sand shrink-0 hidden sm:inline-block" />
          <span className="text-[11px] sm:text-xs text-ifaqa-linen font-medium">
            {headline}
          </span>
          {ctaLink && (
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-ifaqa-sand hover:text-white uppercase tracking-wider underline decoration-ifaqa-sand/60 underline-offset-4 transition-colors shrink-0 ml-1"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Right: Language Switcher (English [Default], Hindi, Urdu) */}
        <div className="flex items-center gap-1.5 shrink-0 border-t md:border-t-0 pt-1 md:pt-0 border-ifaqa-sand/20">
          <Globe className="w-3.5 h-3.5 text-ifaqa-sand shrink-0 mr-0.5" />
          <span className="text-[10px] uppercase tracking-wider text-ifaqa-sand font-mono hidden lg:inline-block">Language:</span>
          <div className="inline-flex items-center border border-ifaqa-sand/40 bg-ifaqa-blackberry/50">
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-0.5 text-[11px] font-sans font-medium transition-colors ${
                    isSelected
                      ? 'bg-ifaqa-sand text-ifaqa-plum font-bold'
                      : 'text-ifaqa-linen hover:text-ifaqa-sand'
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
