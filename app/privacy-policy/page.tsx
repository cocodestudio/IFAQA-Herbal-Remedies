'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  CreditCard,
  FileText,
  Mail,
  UserCheck,
  Package,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      badge: 'Privacy Policy',
      title: 'Privacy Policy & Data Protection',
      subtitle: 'How we collect, use, and protect your personal information and orders at IFAQA Herbal Remedies.',
      tagline: '100% SECURE • NO DATA SELLING • SAFE & PRIVATE ORDERS',
      introTitle: 'Our Commitment to Your Privacy',
      introDesc: 'At IFAQA Herbal Remedies, we respect your privacy. When you visit our website, place an order, or contact us for health advice, we take complete responsibility for keeping your personal details and order history safe and confidential.',
      sec1Title: '1. What Information We Collect',
      sec1Desc: 'We collect your name, mobile phone number (for secure OTP login and order updates), delivery address, and order details. We do not collect any unnecessary sensitive data.',
      sec2Title: '2. How We Use Your Information',
      sec2Desc: 'Your information is used strictly to process orders, verify login via SMS OTP, provide live delivery tracking, and respond to your customer support queries.',
      sec3Title: '3. Zero Data Selling or Sharing',
      sec3Desc: 'We never sell, rent, license, or trade your phone number, email address, or health queries to any third-party advertisers, marketing agencies, or data brokers.',
      sec4Title: '4. Safe & Encrypted Payments',
      sec4Desc: 'All online payments (UPI, Credit/Debit Cards, Net Banking) are processed through RBI-compliant, bank-grade encrypted payment gateways. We never store your card numbers, CVVs, or bank credentials.',
      sec5Title: '5. Plain & Discreet Packaging',
      sec5Desc: 'To ensure your privacy at delivery, all herbal remedies are shipped in plain, unmarked cardboard boxes without disease or diagnosis names on the exterior.',
      sec6Title: '6. Your Rights & Account Deletion',
      sec6Desc: 'You have full control over your information. You can request to view, correct, or permanently delete your customer account and contact history at any time by contacting our support desk.',
      grievanceTitle: 'Privacy & Customer Grievance Contact',
      grievanceDesc: 'If you have any questions about this privacy policy, want to update your details, or request data deletion, our Privacy Officer is at your service:',
      officerLabel: 'Grievance Desk:',
      officerValue: 'Customer Privacy Officer, IFAQA Herbal Remedies',
      emailLabel: 'Direct Email:',
      emailValue: 'privacy@ifaqaremedies.com',
      slaLabel: 'Resolution Guarantee:',
      slaValue: 'Within 48 Business Hours',
      ctaTitle: 'Have Questions About Orders or Products?',
      ctaSubtitle: 'Our customer support team is always ready to assist you.',
      contactBtn: 'Contact Customer Support',
      shopBtn: 'Shop Products',
    },
    hi: {
      badge: 'गोपनीयता नीति',
      title: 'गोपनीयता नीति (Privacy Policy)',
      subtitle: 'IFAQA हर्बल रेमेडीज़ आपकी व्यक्तिगत जानकारी और आर्डर विवरण की पूर्ण सुरक्षा सुनिश्चित करता है।',
      tagline: '100% सुरक्षित • कोई डेटा शेयरिंग नहीं • सुरक्षित ऑर्डर',
      introTitle: 'आपकी गोपनीयता के प्रति हमारी प्रतिबद्धता',
      introDesc: 'IFAQA हर्बल रेमेडीज़ में हम आपके विश्वास का पूरा सम्मान करते हैं। जब आप हमारी वेबसाइट से ऑर्डर करते हैं या स्वास्थ्य संबंधी जानकारी लेते हैं, तो आपकी जानकारी की सुरक्षा हमारी जिम्मेदारी होती है।',
      sec1Title: '1. हम कौन सी जानकारी एकत्र करते हैं',
      sec1Desc: 'हम केवल आपका नाम, मोबाइल नंबर (OTP और डिलीवरी अपडेट के लिए), डिलीवरी का पता और ऑर्डर का विवरण एकत्र करते हैं। कोई अनावश्यक जानकारी नहीं ली जाती।',
      sec2Title: '2. जानकारी का उपयोग कैसे किया जाता है',
      sec2Desc: 'आपकी जानकारी का उपयोग केवल ऑर्डर प्रोसेस करने, डिलीवरी का लाइव स्टेटस भेजने और आपके सवालों का उत्तर देने के लिए किया जाता है।',
      sec3Title: '3. डेटा किसी को नहीं बेचा जाता',
      sec3Desc: 'हम आपका फोन नंबर, ईमेल या बीमारी का विवरण किसी भी विज्ञापन कंपनी या तीसरे पक्ष को कभी नहीं बेचते और न ही साझा करते हैं।',
      sec4Title: '4. सुरक्षित एवं एन्क्रिप्टेड भुगतान',
      sec4Desc: 'सभी ऑनलाइन भुगतान (UPI, कार्ड, नेट बैंकिंग) भारतीय रिज़र्व बैंक (RBI) के नियमों के अनुसार 100% सुरक्षित गेटवे द्वारा होते हैं। हम आपका कार्ड नंबर या पासवर्ड कभी सेव नहीं करते।',
      sec5Title: '5. साधारण एवं सुरक्षित पैकेजिंग',
      sec5Desc: 'आपकी निजता बनाए रखने के लिए सभी उत्पाद सामान्य, सुरक्षित बॉक्स में भेजे जाते हैं, जिसके बाहर किसी बीमारी या दवा का नाम नहीं लिखा होता।',
      sec6Title: '6. आपके अधिकार एवं खाता हटाना',
      sec6Desc: 'आपका अपनी जानकारी पर पूरा अधिकार है। आप किसी भी समय अपनी जानकारी देखने, बदलने या अपने खाते को पूरी तरह हटाने का अनुरोध कर सकते हैं।',
      grievanceTitle: 'शिकायत निवारण एवं प्राइवेसी डेस्क',
      grievanceDesc: 'गोपनीयता नीति से संबंधित किसी भी सवाल या अपना डेटा हटाने के लिए हमारे अधिकारी से सीधे संपर्क कर सकते हैं:',
      officerLabel: 'प्राइवेसी अधिकारी:',
      officerValue: 'कस्टमर प्राइवेसी डेस्क, IFAQA हर्बल रेमेडीज़',
      emailLabel: 'ईमेल आईडी:',
      emailValue: 'privacy@ifaqaremedies.com',
      slaLabel: 'समाधान का समय:',
      slaValue: '48 कार्य घंटों के भीतर',
      ctaTitle: 'कोई सवाल या सहायता चाहिए?',
      ctaSubtitle: 'हमारी कस्टमर केयर टीम आपकी सहायता के लिए सदैव उपलब्ध है।',
      contactBtn: 'कस्टमर केयर से संपर्क करें',
      shopBtn: 'दवाइयां एवं उत्पाद देखें',
    },
    ur: {
      badge: 'رازداری پالیسی',
      title: 'رازداری کی پالیسی (Privacy Policy)',
      subtitle: 'IFAQA ہربل ریمیڈیز آپ کی ذاتی معلومات اور آرڈرز کے مکمل تحفظ کا پابند ہے۔',
      tagline: '100% محفوظ • ڈیٹا محفوظ • رازداری کی ضمانت',
      introTitle: 'آپ کی رازداری کا تحفظ',
      introDesc: 'ہم آپ کے اعتماد کی قدر کرتے ہیں۔ جب آپ ہماری ویب سائٹ استعمال کرتے ہیں یا کوئی دوا آرڈر کرتے ہیں تو آپ کے فون نمبر اور پتے کی حفاظت ہماری اولین ذمہ داری ہے۔',
      sec1Title: '1. ہم کونسی معلومات حاصل کرتے ہیں',
      sec1Desc: 'ہم صرف آپ کا نام، موبائل نمبر (لاگ ان اور ڈلیوری کے لیے)، گھر کا پتہ اور آرڈر کی تفصیلات حاصل کرتے ہیں۔',
      sec2Title: '2. معلومات کا استعمال',
      sec2Desc: 'آپ کی معلومات صرف آرڈر مکمل کرنے، پارسل کی ترسیل کی تفصیل بھیجنے اور آپ کے سوالات کا جواب دینے کے لیے استعمال ہوتی ہے۔',
      sec3Title: '3. ڈیٹا فروخت نہ کرنے کی ضمانت',
      sec3Desc: 'ہم آپ کا موبائل نمبر، ای میل یا طبی معلومات کسی بھی اشتہاری کمپنی یا تیسرے فریق کو کبھی فراہم نہیں کرتے۔',
      sec4Title: '4. محفوظ اور خفیہ آن لائن ادائیگی',
      sec4Desc: 'تمام ادائیگیاں بینک کے محفوظ ترین انکرپٹڈ گیٹ وے کے ذریعے ہوتی ہیں۔ ہم کارڈ نمبر یا پاس ورڈ محفوظ نہیں کرتے۔',
      sec5Title: '5. سادہ اور محفوظ پیکنگ',
      sec5Desc: 'آپ کی رازداری کے پیش نظر تمام ادویات سادہ گتے کے باکس میں بھیجی جاتی ہیں جن کے باہر کسی بیماری کا نام تحریر نہیں ہوتا۔',
      sec6Title: '6. گاہک کے حقوق اور ڈیٹا کا خاتمہ',
      sec6Desc: 'آپ کسی بھی وقت اپنی معلومات چیک کر سکتے ہیں، تبدیل کر سکتے ہیں یا اپنا ریکارڈ مکمل طور پر ختم کروا سکتے ہیں۔',
      grievanceTitle: 'شکایات و رازداری کا رابطہ',
      grievanceDesc: 'رازداری کی پالیسی کے متعلق کسی بھی سوال یا ڈیٹا ڈیلیٹ کروانے کے لیے ہمارے افسر سے رابطہ کریں:',
      officerLabel: 'افسر برائے رازداری:',
      officerValue: 'کسٹمر پرائیویسی ڈیسک، IFAQA ہربل ریمیڈیز',
      emailLabel: 'براہ راست ای میل:',
      emailValue: 'privacy@ifaqaremedies.com',
      slaLabel: 'جواب کا وقت:',
      slaValue: '48 کاروباری گھنٹوں کے اندر',
      ctaTitle: 'آرڈر یا ادویات سے متعلق کوئی سوال ہے؟',
      ctaSubtitle: 'ہماری کسٹمر سپورٹ ٹیم آپ کی رہنمائی کے لیے تیار ہے۔',
      contactBtn: 'کسٹمر سپورٹ سے رابطہ کریں',
      shopBtn: 'مصنوعات دیکھیں',
    },
  };

  const c = content[language] || content.en;

  const sections = [
    { icon: <FileText className="w-6 h-6 text-ifaqa-sand" />, title: c.sec1Title, desc: c.sec1Desc },
    { icon: <Lock className="w-6 h-6 text-ifaqa-sand" />, title: c.sec2Title, desc: c.sec2Desc },
    { icon: <EyeOff className="w-6 h-6 text-ifaqa-sand" />, title: c.sec3Title, desc: c.sec3Desc },
    { icon: <CreditCard className="w-6 h-6 text-ifaqa-sand" />, title: c.sec4Title, desc: c.sec4Desc },
    { icon: <Package className="w-6 h-6 text-ifaqa-sand" />, title: c.sec5Title, desc: c.sec5Desc },
    { icon: <UserCheck className="w-6 h-6 text-ifaqa-sand" />, title: c.sec6Title, desc: c.sec6Desc },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24 w-full">
      {/* 1. Full-Width Grand Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen py-18 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-ifaqa-sand/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.2)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative w-full max-w-[1720px] mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
            <span>/</span>
            <span className="text-white font-bold">{c.badge}</span>
          </div>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 bg-[#FAF5EC] text-ifaqa-plum font-serif font-bold text-xs uppercase tracking-wider border border-[#DFBA73] shadow-sm">
              {c.tagline}
            </span>
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              {c.title}
            </h1>
            <p className="text-base sm:text-xl text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-3xl">
              {c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Full-Width Content Layout */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 space-y-16">
        
        {/* Intro Callout */}
        <div className="p-8 sm:p-10 bg-white border-2 border-ifaqa-sand/70 shadow-xl space-y-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
            {c.introTitle}
          </h2>
          <p className="text-xs sm:text-sm text-ifaqa-plum/90 font-sans leading-relaxed">
            {c.introDesc}
          </p>
        </div>

        {/* 6 Core Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum transition-all duration-200 shadow-sm space-y-3"
            >
              <div className="w-12 h-12 bg-ifaqa-plum flex items-center justify-center border border-ifaqa-sand/40 shadow-sm">
                {sec.icon}
              </div>
              <h3 className="font-serif text-base font-bold text-ifaqa-plum">
                {sec.title}
              </h3>
              <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                {sec.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Statutory Grievance Panel */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen border-2 border-ifaqa-sand/60 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center text-ifaqa-sand">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {c.grievanceTitle}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ifaqa-linen/90 font-sans leading-relaxed max-w-4xl">
            {c.grievanceDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20 text-xs font-sans text-ifaqa-linen/95">
            <div className="p-4 bg-white/5 border border-ifaqa-sand/30">
              <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold text-[11px]">{c.officerLabel}</span>
              <span className="font-serif font-bold text-white text-sm block mt-1">{c.officerValue}</span>
            </div>
            <div className="p-4 bg-white/5 border border-ifaqa-sand/30">
              <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold text-[11px]">{c.emailLabel}</span>
              <span className="font-mono text-white text-sm block mt-1">{c.emailValue}</span>
            </div>
            <div className="p-4 bg-white/5 border border-ifaqa-sand/30">
              <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold text-[11px]">{c.slaLabel}</span>
              <span className="font-serif text-emerald-300 text-sm block mt-1 font-bold">{c.slaValue}</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-8 sm:p-12 bg-white border-2 border-ifaqa-sand/70 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left max-w-2xl">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              {c.ctaTitle}
            </h4>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans">
              {c.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center">
            <Link href="/contact">
              <Button3D variant="primary" size="lg" className="font-bold text-xs uppercase tracking-wider shadow-md">
                <span>{c.contactBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 text-ifaqa-sand" />
              </Button3D>
            </Link>
            <Link href="/catalog">
              <button className="px-5 py-3 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                {c.shopBtn}
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
