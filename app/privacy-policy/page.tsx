'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button3D } from '@/components/ui/Button3D';
import { ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      badge: 'Privacy Policy',
      title: 'Privacy policy and customer data',
      subtitle: 'How IFAQA Herbal Remedies handles your contact details, orders, and payments.',
      introTitle: 'Overview',
      introDesc: 'We collect only the information needed to fulfill and deliver your orders accurately. Customer details are kept confidential and are never shared with third-party data brokers or external marketers.',
      sec1Title: '1. Information collected',
      sec1Desc: 'Your full name, mobile phone number (for OTP sign-in and delivery notifications), street address, and item selection.',
      sec2Title: '2. How details are used',
      sec2Desc: 'Used solely to verify customer orders, dispatch parcels from Saharanpur, share courier tracking updates, and respond to questions.',
      sec3Title: '3. Zero third-party selling',
      sec3Desc: 'We never sell, rent, or trade your mobile number, email address, or order records to external advertisers or marketing lists.',
      sec4Title: '4. Payment handling',
      sec4Desc: 'Online payments process through encrypted payment gateways. We never store card numbers, CVV codes, or bank passwords.',
      sec5Title: '5. Discreet outer packaging',
      sec5Desc: 'Parcels ship in plain protective outer boxes without product illness descriptions printed on the shipping label.',
      sec6Title: '6. Updating or deleting your record',
      sec6Desc: 'Contact our Saharanpur support desk anytime to review, update, or remove your saved customer account details.',
      grievanceTitle: 'Privacy inquiries and data requests',
      grievanceDesc: 'To request updates or deletion of your order contact history, reach our Saharanpur office directly:',
      officerLabel: 'Office',
      officerValue: 'IFAQA Herbal Remedies, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)',
      emailLabel: 'Email',
      emailValue: 'support@ifaqa.in',
      phoneLabel: 'Phone',
      phoneValue: '+91 97298 40336',
      ctaTitle: 'Questions about an order or delivery',
      ctaSubtitle: 'Message our customer support team directly.',
      contactBtn: 'Contact support',
      shopBtn: 'Browse products',
    },
    hi: {
      badge: 'गोपनीयता नीति',
      title: 'गोपनीयता नीति एवं ग्राहक डेटा सुरक्षा',
      subtitle: 'IFAQA हर्बल रेमेडीज़ में आपकी संपर्क जानकारी, ऑर्डर और भुगतान की सुरक्षा कैसे की जाती है।',
      introTitle: 'संक्षिप्त परिचय',
      introDesc: 'हम केवल वही जानकारी एकत्र करते हैं जो आपके ऑर्डर की सही डिलीवरी के लिए आवश्यक है। आपकी जानकारी किसी भी तीसरे पक्ष को नहीं बेची जाती।',
      sec1Title: '1. एकत्रित जानकारी',
      sec1Desc: 'आपका नाम, मोबाइल नंबर (OTP और डिलीवरी अपडेट के लिए), डिलीवरी पता और चुने गए उत्पाद।',
      sec2Title: '2. जानकारी का उपयोग',
      sec2Desc: 'केवल ऑर्डर प्रोसेस करने, सहारनपुर से डिस्पैच करने, कूरियर ट्रैकिंग भेजने और सहायता प्रदान करने के लिए।',
      sec3Title: '3. डेटा की गोपनीयता',
      sec3Desc: 'हम आपका मोबाइल नंबर या ईमेल किसी भी विज्ञापनदाता या बाहरी एजेंसी के साथ साझा नहीं करते।',
      sec4Title: '4. सुरक्षित भुगतान',
      sec4Desc: 'ऑनलाइन भुगतान एन्क्रिप्टेड गेटवे के माध्यम से होते हैं। हम कभी कार्ड नंबर या पासवर्ड सेव नहीं करते।',
      sec5Title: '5. साधारण पैकेजिंग',
      sec5Desc: 'बाहरी बॉक्स पर बीमारी या दवा से जुड़े विवरण प्रिंट नहीं किए जाते।',
      sec6Title: '6. डेटा संशोधन या हटाना',
      sec6Desc: 'आप किसी भी समय अपने खाते का विवरण बदलने या हटाने के लिए संपर्क कर सकते हैं।',
      grievanceTitle: 'प्राइवेसी एवं डेटा सहायता',
      grievanceDesc: 'अपना डेटा अपडेट या डिलीट करवाने के लिए सीधे संपर्क करें:',
      officerLabel: 'कार्यालय',
      officerValue: 'IFAQA हर्बल रेमेडीज़, बरथा कायस्थ पाथर, सहारनपुर - 247231 (उ.प्र.)',
      emailLabel: 'ईमेल',
      emailValue: 'support@ifaqa.in',
      phoneLabel: 'फ़ोन',
      phoneValue: '+91 97298 40336',
      ctaTitle: 'ऑर्डर से जुड़ा कोई सवाल है',
      ctaSubtitle: 'हमारी सहारनपुर सहायता टीम से सीधे बात करें।',
      contactBtn: 'संपर्क करें',
      shopBtn: 'उत्पाद देखें',
    },
    ur: {
      badge: 'رازداری پالیسی',
      title: 'رازداری کی پالیسی اور ڈیٹا تحفظ',
      subtitle: 'IFAQA ہربل ریمیڈیز آپ کے فون نمبر، پتے اور آرڈر کے ریکارڈ کی حفاظت کیسے کرتا ہے۔',
      introTitle: 'خلاصہ',
      introDesc: 'ہم صرف وہی بنیادی معلومات حاصل کرتے ہیں جو آپ کے آرڈر کی ترسیل کے لیے ضروری ہوں۔ آپ کا ڈیٹا کسی تیسرے فریق کو کبھی فراہم نہیں کیا جاتا۔',
      sec1Title: '1. حاصل کردہ معلومات',
      sec1Desc: 'آپ کا نام، موبائل نمبر (لاگ ان اور ترسیل کی اطلاع کے لیے)، گھر کا پتہ اور آرڈر تفصیل۔',
      sec2Title: '2. معلومات کا استعمال',
      sec2Desc: 'صرف آرڈر مکمل کرنے، سہارنپور سے پارسل بھیجنے اور ٹریکنگ فراہم کرنے کے لیے۔',
      sec3Title: '3. ڈیٹا فروخت نہ کرنے کی پابندی',
      sec3Desc: 'ہم آپ کا نمبر یا ای میل کسی اشتہاری کمپنی کو کبھی نہیں دیتے۔',
      sec4Title: '4. محفوظ ادائیگیاں',
      sec4Desc: 'آن لائن ادائیگیاں انکرپٹڈ گیٹ وے سے ہوتی ہیں۔ کارڈ تفصیلات محفوظ نہیں کی جاتیں۔',
      sec5Title: '5. سادہ پیکنگ',
      sec5Desc: 'پارسل کے بیرونی حصے پر بیماری کی تفصیل نہیں لکھی جاتی۔',
      sec6Title: '6. ریکارڈ تبدیل یا ختم کروانا',
      sec6Desc: 'آپ کسی بھی وقت اپنی معلومات کی تبدیلی یا خاتمے کے لیے رابطہ کر سکتے ہیں۔',
      grievanceTitle: 'رازداری سے متعلق رابطہ',
      grievanceDesc: 'اپنے ڈیٹا سے متعلق کسی بھی درخواست کے لیے رابطہ کریں:',
      officerLabel: 'دفتر',
      officerValue: 'IFAQA ہربل ریمیڈیز، برتھہ کائستھ پتھر، سہارنپور - 247231 (یوپی)',
      emailLabel: 'ای میل',
      emailValue: 'support@ifaqa.in',
      phoneLabel: 'فون',
      phoneValue: '+91 97298 40336',
      ctaTitle: 'آرڈر کے متعلق کوئی سوال ہے',
      ctaSubtitle: 'ہماری کسٹمر سپورٹ ٹیم سے رابطہ کریں۔',
      contactBtn: 'رابطہ کریں',
      shopBtn: 'مصنوعات دیکھیں',
    },
  }[language] || {
    badge: 'Privacy Policy',
    title: 'Privacy policy and customer data',
    subtitle: 'How IFAQA Herbal Remedies handles your contact details, orders, and payments.',
    introTitle: 'Overview',
    introDesc: 'We collect only the information needed to fulfill and deliver your orders accurately. Customer details are kept confidential and are never shared with third-party data brokers or external marketers.',
    sec1Title: '1. Information collected',
    sec1Desc: 'Your full name, mobile phone number (for OTP sign-in and delivery notifications), street address, and item selection.',
    sec2Title: '2. How details are used',
    sec2Desc: 'Used solely to verify customer orders, dispatch parcels from Saharanpur, share courier tracking updates, and respond to questions.',
    sec3Title: '3. Zero third-party selling',
    sec3Desc: 'We never sell, rent, or trade your mobile number, email address, or order records to external advertisers or marketing lists.',
    sec4Title: '4. Payment handling',
    sec4Desc: 'Online payments process through encrypted payment gateways. We never store card numbers, CVV codes, or bank passwords.',
    sec5Title: '5. Discreet outer packaging',
    sec5Desc: 'Parcels ship in plain protective outer boxes without product illness descriptions printed on the shipping label.',
    sec6Title: '6. Updating or deleting your record',
    sec6Desc: 'Contact our Saharanpur support desk anytime to review, update, or remove your saved customer account details.',
    grievanceTitle: 'Privacy inquiries and data requests',
    grievanceDesc: 'To request updates or deletion of your order contact history, reach our Saharanpur office directly:',
    officerLabel: 'Office',
    officerValue: 'IFAQA Herbal Remedies, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)',
    emailLabel: 'Email',
    emailValue: 'support@ifaqa.in',
    phoneLabel: 'Phone',
    phoneValue: '+91 97298 40336',
    ctaTitle: 'Questions about an order or delivery',
    ctaSubtitle: 'Message our customer support team directly.',
    contactBtn: 'Contact support',
    shopBtn: 'Browse products',
  };

  const sections = [
    { title: content.sec1Title, desc: content.sec1Desc },
    { title: content.sec2Title, desc: content.sec2Desc },
    { title: content.sec3Title, desc: content.sec3Desc },
    { title: content.sec4Title, desc: content.sec4Desc },
    { title: content.sec5Title, desc: content.sec5Desc },
    { title: content.sec6Title, desc: content.sec6Desc },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-20 w-full font-sans">
      <section className="w-full border-b border-ifaqa-plum/10 bg-ifaqa-linen py-10 md:py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6962]">
            <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ifaqa-plum font-medium">{content.badge}</span>
          </nav>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl text-ifaqa-plum leading-tight">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 space-y-12">
        {/* Intro */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-ifaqa-plum/10 shadow-luxury-card space-y-2 max-w-4xl">
          <h2 className="font-serif font-normal text-2xl text-ifaqa-plum">
            {content.introTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
            {content.introDesc}
          </p>
        </div>

        {/* Policy Clauses (Clean 2-column reading structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-ifaqa-plum/10 space-y-2"
            >
              <h3 className="text-base font-semibold text-ifaqa-plum">
                {sec.title}
              </h3>
              <p className="text-sm text-[#5A6962] leading-relaxed">
                {sec.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Grievance Contact */}
        <div className="p-6 sm:p-8 rounded-2xl bg-ifaqa-cashmere border border-ifaqa-plum/10 space-y-4">
          <h3 className="font-serif font-normal text-2xl text-ifaqa-plum">
            {content.grievanceTitle}
          </h3>
          <p className="text-sm text-[#3E524A] leading-relaxed max-w-3xl">
            {content.grievanceDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-white border border-ifaqa-plum/10">
              <span className="text-xs text-[#5A6962] block">{content.officerLabel}</span>
              <span className="font-medium text-ifaqa-plum block mt-1">{content.officerValue}</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-ifaqa-plum/10">
              <span className="text-xs text-[#5A6962] block">{content.emailLabel}</span>
              <a href="mailto:support@ifaqa.in" dir="ltr" className="font-mono text-ifaqa-plum hover:underline block mt-1 break-all">
                {content.emailValue}
              </a>
            </div>
            <div className="p-4 rounded-xl bg-white border border-ifaqa-plum/10">
              <span className="text-xs text-[#5A6962] block">{content.phoneLabel}</span>
              <a href="tel:+919729840336" dir="ltr" className="font-mono text-ifaqa-plum hover:underline block mt-1 tabular-nums">
                {content.phoneValue}
              </a>
            </div>
          </div>
        </div>

        {/* Action Strip */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-ifaqa-plum/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-start">
            <h4 className="font-serif font-normal text-2xl text-ifaqa-plum">
              {content.ctaTitle}
            </h4>
            <p className="text-sm text-[#5A6962]">
              {content.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button3D variant="primary" size="md">
                <span>{content.contactBtn}</span>
                <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
              </Button3D>
            </Link>
            <Link href="/catalog">
              <Button3D variant="outline" size="md">
                {content.shopBtn}
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
