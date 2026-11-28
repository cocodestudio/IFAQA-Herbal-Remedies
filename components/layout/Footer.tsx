'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShimmerImage } from '@/components/ui/ShimmerImage';
import { ShieldCheck, Leaf, MapPin, Phone, Mail, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t, getCategoryTitle } = useLanguage();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const categoryIds = ['hazim', 'muqawwi', 'sual', 'mafasil', 'jild', 'quwwat-e-mudafiat'];

  const pageLinks = [
    { href: '/', label: t('home') },
    { href: '/catalog', label: t('catalog') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
    { href: '/privacy-policy', label: t('privacyPolicy') },
  ];

  return (
    <footer className="bg-ifaqa-cashmere text-ifaqa-plum border-t border-ifaqa-plum/10 pt-14 pb-10 font-sans select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-ifaqa-plum/10">
          {/* Column 1: Brand Wordmark + Quality Standards */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="inline-flex items-center justify-center p-2.5 bg-white border border-ifaqa-plum/10 rounded-lg shadow-sm">
                <ShimmerImage
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Herbal Remedies"
                  width={168}
                  height={60}
                  loading="lazy"
                  wrapperClassName="h-10"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-[#3E524A] leading-relaxed max-w-xs">
              Unani and Ayurvedic herbal powders, electuaries, syrups, and botanical oils prepared cleanly in Saharanpur.
            </p>
            <ul className="space-y-1.5 text-xs text-[#5A6962] pt-1">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <span>Zero synthetic chemicals or steroids</span>
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <span>Whole botanical roots & forest honey</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <span>Sealed Pan-India courier dispatch</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Main Pages */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-ifaqa-plum">
              Quick links
            </h4>
            <ul className="space-y-2 text-sm text-[#5A6962]">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-ifaqa-plum transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-ifaqa-plum">
              {t('categoriesTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-[#5A6962]">
              {categoryIds.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/catalog/${slug}`}
                    className="hover:text-ifaqa-plum transition-colors inline-block py-0.5"
                  >
                    {getCategoryTitle({ id: slug, name: slug })}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Saharanpur Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-ifaqa-plum">
              Contact & dispensary
            </h4>
            <div className="space-y-2.5 text-sm text-[#5A6962]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                <span className="leading-relaxed">
                  Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <a
                  href="tel:+919729840336"
                  translate="no"
                  className="hover:text-ifaqa-plum transition-colors font-mono tabular-nums"
                >
                  +91 97298 40336
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <a
                  href="mailto:support@ifaqa.in"
                  translate="no"
                  className="hover:text-ifaqa-plum transition-colors break-all"
                >
                  support@ifaqa.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col items-center justify-center text-center space-y-1.5 text-xs text-[#5A6962]">
          <p>
            © {year} IFAQA Herbal Remedies. All rights reserved.
          </p>
          <p>
            Designed and Developed by{' '}
            <a
              href="https://cocodestudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ifaqa-plum font-medium hover:underline"
            >
              CoCode Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
