'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { ShieldCheck, Sparkles, MapPin, Phone, Mail, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { language, t } = useLanguage();

  const categories = [
    { name: language === 'hi' ? 'पाचन एवं पेट स्वास्थ्य' : language === 'ur' ? 'ہاضم (معدہ و ہاضمہ)' : 'Digestive & Stomach Care', href: '/catalog/hazim' },
    { name: language === 'hi' ? 'ऊर्जा एवं शारीरिक शक्ति' : language === 'ur' ? 'طاقت و توانائی' : 'Energy & Vitality', href: '/catalog/muqawwi' },
    { name: language === 'hi' ? 'खांसी एवं फेफड़ों की देखभाल' : language === 'ur' ? 'کھانسی و سانس' : 'Cough & Respiratory Care', href: '/catalog/sual' },
    { name: language === 'hi' ? 'जोड़ों एवं मांसपेशियों का दर्द' : language === 'ur' ? 'جوڑوں کا درد' : 'Joint & Muscular Relief', href: '/catalog/mafasil' },
    { name: language === 'hi' ? 'त्वचा एवं सौंदर्य देखभाल' : language === 'ur' ? 'جلد و حسن' : 'Skin & Dermatology Care', href: '/catalog/jild' },
    { name: language === 'hi' ? 'रोग प्रतिरोधक क्षमता (इम्युनिटी)' : language === 'ur' ? 'قوت مدافعت' : 'Immunity & Heart Wellness', href: '/catalog/quwwat-e-mudafiat' },
  ];

  return (
    <footer className="bg-ifaqa-plum text-ifaqa-linen border-t border-ifaqa-sand/40 pt-16 pb-12 font-serif select-none">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-14 border-b border-ifaqa-blackberry/90">
          {/* Column 1: Master Framed Heritage Emblem */}
          <div className="space-y-4">
            <Link href="/" className="inline-block group">
              <div className="inline-flex items-center justify-center p-2.5 bg-white border border-ifaqa-sand/60 shadow-md">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Herbal Remedies Classical Heritage Stamp"
                  width={180}
                  height={64}
                  priority
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-ifaqa-sand font-serif font-bold tracking-wide">
              IFAQA HERBAL REMEDIES • DESI DAWAKHANA
            </p>
            <p className="text-xs text-ifaqa-linen/95 font-sans leading-relaxed">
              {language === 'hi'
                ? 'प्रामाणिक आयुर्वेदिक एवं यूनानी प्राकृतिक औषधियां। शुद्ध जड़ी-बूटियों से तैयार, पूरे भारत में सुरक्षित होम डिलीवरी।'
                : language === 'ur'
                ? 'مستند یونانی و نباتاتی ادویات، جو خالص جڑی بوٹیوں سے تیار کی جاتی ہیں۔ پورے ملک میں تیز رفتار ترسیل۔'
                : 'Pure, authentic Ayurvedic and Unani herbal medicines crafted with natural botanical extracts. Delivered safely to your home across India and worldwide.'}
            </p>
            <div className="pt-1 flex items-center gap-2">
              <ArchitecturalBadge variant="diamond">100% Genuine</ArchitecturalBadge>
              <ArchitecturalBadge variant="notched" className="bg-ifaqa-blackberry text-ifaqa-linen border-ifaqa-sand/40">
                100% Herbal
              </ArchitecturalBadge>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ifaqa-sand font-bold font-mono">
              {language === 'hi' ? 'उत्पाद श्रेणियां' : language === 'ur' ? 'مصنوعات کی اقسام' : 'Product Categories'}
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-ifaqa-linen/95">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="hover:text-ifaqa-sand transition-colors block py-0.5 font-medium">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quality Assurance */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ifaqa-sand font-bold font-mono">
              {language === 'hi' ? 'गुणवत्ता का भरोसा' : language === 'ur' ? 'معیار کی ضمانت' : 'Quality Assurance'}
            </h4>
            <ul className="space-y-3 text-xs font-sans text-ifaqa-linen/90">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'कोई हानिकारक केमिकल, कृत्रिम रंग या स्टेरॉयड नहीं।'
                    : language === 'ur'
                    ? 'کیمیکلز اور مصنوعی اجزاء سے مکمل پاک۔'
                    : 'Zero synthetic chemicals, artificial colors, or steroids added.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'हाथ से चुनी गई असली जड़ी-बूटियां, बीज और प्राकृतिक शहद।'
                    : language === 'ur'
                    ? 'ہاتھ سے چنی ہوئی خالص جڑی بوٹیاں اور قدرتی شہد۔'
                    : 'Handpicked natural herbs, roots, seeds, and raw forest honey.'}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'पारंपरिक और शास्त्रोक्त विधि द्वारा तैयार।'
                    : language === 'ur'
                    ? 'روایتی کتب کے مطابق تیار کردہ مستند نسخے۔'
                    : 'Handcrafted according to authentic classical recipes.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ifaqa-sand font-bold font-mono">
              {language === 'hi' ? 'सहायता एवं संपर्क' : language === 'ur' ? 'سپورٹ اور رابطہ' : 'Customer Support'}
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-ifaqa-linen/95">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'पूरे भारत में 19,000+ पिनकोड पर तेज़ होम डिलीवरी।'
                    : language === 'ur'
                    ? 'ملک بھر کے تمام پن کوڈز پر محفوظ ہوم ڈلیوری۔'
                    : 'Fast doorstep delivery to all 19,000+ pincodes across India.'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ifaqa-sand shrink-0" />
                <span>+91 Verified Support Helpline</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ifaqa-sand shrink-0" />
                <span>care@ifaqaremedies.com</span>
              </div>
            </div>
            <div className="pt-3 flex gap-2">
              <Link
                href="/catalog"
                className="inline-block px-3 py-2 text-[11px] font-serif font-bold uppercase tracking-wider bg-ifaqa-sand text-ifaqa-plum hover:bg-white transition-colors"
              >
                {t('catalog')}
              </Link>
              <Link
                href="/contact"
                className="inline-block px-3 py-2 text-[11px] font-serif font-bold uppercase tracking-wider border border-ifaqa-sand text-ifaqa-linen hover:bg-white/10 transition-colors"
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-ifaqa-linen/80">
          <p>© {new Date().getFullYear()} IFAQA Herbal Remedies. All rights reserved. Registered Desi Dawakhana.</p>
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
            <Link href="/" className="hover:text-ifaqa-sand transition-colors">{t('home')}</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/about" className="hover:text-ifaqa-sand transition-colors">{t('about')}</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/contact" className="hover:text-ifaqa-sand transition-colors">{t('contact')}</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/privacy-policy" className="hover:text-ifaqa-sand transition-colors">{t('privacyPolicy')}</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/cart" className="hover:text-ifaqa-sand transition-colors">{t('cart')}</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/checkout" className="hover:text-ifaqa-sand transition-colors">{t('checkout')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
