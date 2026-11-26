'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Leaf, MapPin, Phone, Mail, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { language, t, getCategoryTitle } = useLanguage();

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
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Herbal Remedies"
                  width={168}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-[#3E524A] leading-relaxed max-w-xs">
              {language === 'hi'
                ? 'सहारनपुर में शुद्ध जड़ी-बूटियों, जड़ों और प्राकृतिक शहद से तैयार आयुर्वेदिक एवं यूनानी औषधियां।'
                : language === 'ur'
                  ? 'سہارنپور میں خالص جڑی بوٹیوں، جڑوں اور قدرتی شہد سے تیار کردہ آیورویدک اور یونانی ادویات۔'
                  : 'Unani and Ayurvedic herbal powders, electuaries, syrups, and botanical oils prepared cleanly in Saharanpur.'}
            </p>
            <ul className="space-y-1.5 text-xs text-[#5A6962] pt-1">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <span>
                  {language === 'hi'
                    ? 'कोई कृत्रिम रंग या स्टेरॉयड नहीं'
                    : language === 'ur'
                      ? 'کیمیکلز اور سٹیرائیڈز سے پاک'
                      : 'Zero synthetic chemicals or steroids'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <span>
                  {language === 'hi'
                    ? 'शुद्ध जड़ों और जंगली शहद से निर्मित'
                    : language === 'ur'
                      ? 'خالص جڑوں اور قدرتی شہد سے تیار'
                      : 'Whole botanical roots & forest honey'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <span>
                  {language === 'hi'
                    ? 'पूरे भारत में सुरक्षित कूरियर डिस्पैच'
                    : language === 'ur'
                      ? 'پورے بھارت میں محفوظ ترسیل'
                      : 'Sealed Pan-India courier dispatch'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Main Pages (Moved from Header) */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-ifaqa-plum">
              {language === 'hi' ? 'महत्वपूर्ण पेज' : language === 'ur' ? 'اہم صفحات' : 'Quick links'}
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
              {language === 'hi' ? 'संपर्क सूत्र' : language === 'ur' ? 'رابطہ کی تفصیلات' : 'Contact & dispensary'}
            </h4>
            <div className="space-y-2.5 text-sm text-[#5A6962]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                <span className="leading-relaxed">
                  {language === 'hi'
                    ? 'नियर मंडी वाली मस्जिद, बरथा कायस्थ पाथर, सहारनपुर - 247231 (उ.प्र.)'
                    : language === 'ur'
                      ? 'قریب منڈی والی مسجد، برتھہ کائستھ پتھر، سہارنپور - 247231 (یوپی)'
                      : 'Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <a href="tel:+919729840336" dir="ltr" className="hover:text-ifaqa-plum transition-colors font-mono tabular-nums">
                  +91 97298 40336
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#5A6962] shrink-0" strokeWidth={1.5} />
                <a href="mailto:support@ifaqa.in" dir="ltr" className="hover:text-ifaqa-plum transition-colors break-all">
                  support@ifaqa.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Centered Copyright & Clickable CoCode Studio Credit */}
        <div className="pt-8 flex flex-col items-center justify-center text-center space-y-1.5 text-xs text-[#5A6962]">
          <p>
            © {new Date().getFullYear()} IFAQA Herbal Remedies. All rights reserved.
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
