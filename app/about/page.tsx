'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Button3D } from '@/components/ui/Button3D';
import { Leaf, ShieldCheck, Award, Truck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      badge: 'About',
      title: 'About IFAQA Herbal Remedies',
      subtitle: 'Traditional Unani and Ayurvedic medicines compounded from natural roots, herbs, and forest honey in Saharanpur.',
      storyTitle: 'Our craft and commitment',
      storyP1: 'IFAQA Herbal Remedies was established to bring unadulterated traditional remedies to households across India. Where synthetic products cut corners, we work directly with dried wildcrafted herbs, whole spices, and natural honey.',
      storyP2: 'Every syrup, electuary, powder, and oil is prepared in measured batches according to Unani and Ayurvedic practices, preserving the active character of the raw botanicals.',
      oathTitle: 'Quality standard',
      oathQuote: 'Every formulation is crafted without chemical steroids, synthetic binders, or artificial coloring.',
      whyChooseTitle: 'What defines our preparations',
      pillar1Title: 'Whole natural herbs',
      pillar1Desc: 'Roots, seeds, resins, and Kashmiri saffron sourced directly with zero filler dilution.',
      pillar2Title: 'Zero chemicals or steroids',
      pillar2Desc: 'No synthetic binding agents, heavy-metal additives, or artificial preservatives.',
      pillar3Title: 'Small-batch methods',
      pillar3Desc: 'Prepared using slow herbal decoctions and honey-based electuary compounding.',
      pillar4Title: 'Direct Saharanpur dispatch',
      pillar4Desc: 'Sealed in UV-protective glass or food-safe containers and shipped across India.',
      processTitle: 'Four-stage preparation process',
      step1Title: 'Herb selection',
      step1Desc: 'Dried botanicals inspected for aroma, maturity, and origin before milling.',
      step2Title: 'Cleaning and sorting',
      step2Desc: 'Hand-sorted to remove stems, dust, and inert matter.',
      step3Title: 'Batch preparation',
      step3Desc: 'Slow simmering and blending at controlled temperatures to retain potency.',
      step4Title: 'Sealed packaging',
      step4Desc: 'Packed into tamper-evident containers to keep moisture out during transit.',
      fact1Val: '30',
      fact1Lbl: 'Active remedies',
      fact2Val: '0%',
      fact2Lbl: 'Synthetic fillers',
      fact3Val: '24 hrs',
      fact3Lbl: 'Dispatch window',
      fact4Val: '24 mo',
      fact4Lbl: 'Standard shelf life',
      ctaTitle: 'Explore our herbal catalog',
      ctaSubtitle: 'Browse single-herb powders, electuaries, syrups, and oils, or message our team with dosage questions.',
      shopBtn: 'Shop products',
      contactBtn: 'Contact us',
    },
    hi: {
      badge: 'हमारे बारे में',
      title: 'IFAQA हर्बल रेमेडीज़ के बारे में',
      subtitle: 'सहारनपुर में शुद्ध जड़ों, जड़ी-बूटियों और प्राकृतिक शहद से तैयार यूनानी व आयुर्वेदिक औषधियां।',
      storyTitle: 'हमारा उद्देश्य और निर्माण पद्धति',
      storyP1: 'IFAQA हर्बल रेमेडीज़ की स्थापना हर परिवार तक शुद्ध और प्रामाणिक प्राकृतिक औषधियां पहुंचाने के लिए की गई है। हम कृत्रिम केमिकल से दूर रहकर असली जंगली जड़ी-बूटियों, मसालों और प्राकृतिक शहद का उपयोग करते हैं।',
      storyP2: 'प्रत्येक शर्बत, माजून, चूर्ण और तेल पारंपरिक यूनानी और आयुर्वेदिक विधि के अनुसार छोटे बैच में तैयार किया जाता है ताकि जड़ी-बूटियों के प्राकृतिक गुण सुरक्षित रहें।',
      oathTitle: 'गुणवत्ता का वादा',
      oathQuote: 'हर उत्पाद बिना किसी केमिकल स्टेरॉयड, कृत्रिम रंग या हानिकारक बाइंडर के तैयार किया जाता है।',
      whyChooseTitle: 'हमारी विशेषताएं',
      pillar1Title: 'असली जड़ी-बूटियां',
      pillar1Desc: 'बिना किसी मिलावट के चुनी गई पहाड़ी जड़ें, बीज और कश्मीरी केसर।',
      pillar2Title: 'केमिकल और स्टेरॉयड मुक्त',
      pillar2Desc: 'कोई सिंथेटिक बाइंडिंग एजेंट, कृत्रिम रंग या रासायनिक प्रिजर्वेटिव नहीं।',
      pillar3Title: 'पारंपरिक विधि से निर्माण',
      pillar3Desc: 'धीमी आंच पर काढ़ा और शहद आधारित माजून तैयार करने की प्रामाणिक प्रक्रिया।',
      pillar4Title: 'सहारनपुर से सीधा डिस्पैच',
      pillar4Desc: 'मजबूत सीलबंद डिब्बों में पैक होकर पूरे भारत में होम डिलीवरी।',
      processTitle: 'चार-चरणीय निर्माण प्रक्रिया',
      step1Title: 'जड़ी-बूटियों का चयन',
      step1Desc: 'पीसने से पहले प्रत्येक कच्ची जड़ी-बूटी की सुगंध और गुणवत्ता की जांच।',
      step2Title: 'सफाई एवं छंटाई',
      step2Desc: 'धूल, तिनके और अशुद्धियों को हाथ से पूरी तरह अलग करना।',
      step3Title: 'छोटे बैच में तैयारी',
      step3Desc: 'नियंत्रित तापमान पर निर्माण ताकि प्राकृतिक तत्व सुरक्षित रहें।',
      step4Title: 'सुरक्षित पैकिंग',
      step4Desc: 'नमी और धूप से बचाने के लिए सीलबंद पैकेजिंग।',
      fact1Val: '30',
      fact1Lbl: 'सक्रिय हर्बल उत्पाद',
      fact2Val: '0%',
      fact2Lbl: 'केमिकल मिलावट',
      fact3Val: '24 घंटे',
      fact3Lbl: 'ऑर्डर डिस्पैच समय',
      fact4Val: '24 माह',
      fact4Lbl: 'मानक शेल्फ लाइफ',
      ctaTitle: 'सभी हर्बल उत्पाद देखें',
      ctaSubtitle: 'पाचन, शक्ति, खांसी और जोड़ों के दर्द की औषधियां देखें या उपयोग संबंधी जानकारी के लिए संपर्क करें।',
      shopBtn: 'उत्पाद देखें',
      contactBtn: 'संपर्क करें',
    },
    ur: {
      badge: 'ہمارے متعلق',
      title: 'IFAQA ہربل ریمیڈیز کے متعلق',
      subtitle: 'سہارنپور میں خالص جڑوں، جڑی بوٹیوں اور قدرتی شہد سے تیار کردہ یونانی اور آیورویدک ادویات۔',
      storyTitle: 'ہمارا طریقہ کار اور عزم',
      storyP1: 'IFAQA ہربل ریمیڈیز کا مقصد خالص اور مستند نباتاتی ادویات کو ہر گھر تک پہنچانا ہے۔ ہم کیمیکلز کے بجائے اصلی جنگلی جڑی بوٹیوں، مسالوں اور خالص شہد سے دوائیں تیار کرتے ہیں۔',
      storyP2: 'ہر شربت، معجون، سفوف اور روغن روایتی یونانی اور آیورویدک اصولوں کے مطابق چھوٹے بیجز میں تیار کیا جاتا ہے تاکہ اجزاء کی قدرتی تاثیر برقرار رہے۔',
      oathTitle: 'معیار کا معیار',
      oathQuote: 'ہر مرکب کیمیائی سٹیرائیڈز، مصنوعی رنگوں اور ملاوٹ سے مکمل پاک تیار کیا جاتا ہے۔',
      whyChooseTitle: 'ہماری تیاری کے اصول',
      pillar1Title: 'خالص قدرتی جڑی بوٹیاں',
      pillar1Desc: 'اصلی جڑیں، بیج اور زعفران بغیر کسی ملاوٹ کے۔',
      pillar2Title: 'کیمیکلز سے پاک',
      pillar2Desc: 'مصنوعی رنگوں، کیمیائی اجزاء اور سٹیرائیڈز سے مکمل پاک۔',
      pillar3Title: 'روایتی تیاری',
      pillar3Desc: 'دھیمی آنچ پر جوشاندہ اور شہد میں معجون تیار کرنے کا مستند طریقہ۔',
      pillar4Title: 'سہارنپور سے ترسیل',
      pillar4Desc: 'مضبوط پیکنگ میں پورے بھارت میں محفوظ ہوم ڈلیوری۔',
      processTitle: 'تیاری کے چار مراحل',
      step1Title: 'انتخاب',
      step1Desc: 'ہر جڑی بوٹی کی خوشبو اور تازگی کی جانچ۔',
      step2Title: 'صفائی اور چھانٹی',
      step2Desc: 'گرد اور غیر ضروری حصوں کو ہاتھ سے صاف کرنا۔',
      step3Title: 'بیج کی تیاری',
      step3Desc: 'مناسب درجہ حرارت پر تیاری تاکہ قدرتی اثر محفوظ رہے۔',
      step4Title: 'محفوظ پیکنگ',
      step4Desc: 'نمی اور روشنی سے بچاؤ کے لیے محفوظ پیکنگ۔',
      fact1Val: '30',
      fact1Lbl: 'مستند مصنوعات',
      fact2Val: '0%',
      fact2Lbl: 'کیمیائی ملاوٹ',
      fact3Val: '24 گھنٹے',
      fact3Lbl: 'روانگی کا وقت',
      fact4Val: '24 ماہ',
      fact4Lbl: 'میعاد',
      ctaTitle: 'تمام مصنوعات دیکھیں',
      ctaSubtitle: 'ہاضمے، توانائی اور روزمرہ صحت کے لیے خالص مرکبات دیکھیں یا ہم سے رابطہ کریں۔',
      shopBtn: 'مصنوعات دیکھیں',
      contactBtn: 'رابطہ کریں',
    },
  }[language] || {
    badge: 'About',
    title: 'About IFAQA Herbal Remedies',
    subtitle: 'Traditional Unani and Ayurvedic medicines compounded from natural roots, herbs, and forest honey in Saharanpur.',
    storyTitle: 'Our craft and commitment',
    storyP1: 'IFAQA Herbal Remedies was established to bring unadulterated traditional remedies to households across India. Where synthetic products cut corners, we work directly with dried wildcrafted herbs, whole spices, and natural honey.',
    storyP2: 'Every syrup, electuary, powder, and oil is prepared in measured batches according to Unani and Ayurvedic practices, preserving the active character of the raw botanicals.',
    oathTitle: 'Quality standard',
    oathQuote: 'Every formulation is crafted without chemical steroids, synthetic binders, or artificial coloring.',
    whyChooseTitle: 'What defines our preparations',
    pillar1Title: 'Whole natural herbs',
    pillar1Desc: 'Roots, seeds, resins, and Kashmiri saffron sourced directly with zero filler dilution.',
    pillar2Title: 'Zero chemicals or steroids',
    pillar2Desc: 'No synthetic binding agents, heavy-metal additives, or artificial preservatives.',
    pillar3Title: 'Small-batch methods',
    pillar3Desc: 'Prepared using slow herbal decoctions and honey-based electuary compounding.',
    pillar4Title: 'Direct Saharanpur dispatch',
    pillar4Desc: 'Sealed in UV-protective glass or food-safe containers and shipped across India.',
    processTitle: 'Four-stage preparation process',
    step1Title: 'Herb selection',
    step1Desc: 'Dried botanicals inspected for aroma, maturity, and origin before milling.',
    step2Title: 'Cleaning and sorting',
    step2Desc: 'Hand-sorted to remove stems, dust, and inert matter.',
    step3Title: 'Batch preparation',
    step3Desc: 'Slow simmering and blending at controlled temperatures to retain potency.',
    step4Title: 'Sealed packaging',
    step4Desc: 'Packed into tamper-evident containers to keep moisture out during transit.',
    fact1Val: '30',
    fact1Lbl: 'Active remedies',
    fact2Val: '0%',
    fact2Lbl: 'Synthetic fillers',
    fact3Val: '24 hrs',
    fact3Lbl: 'Dispatch window',
    fact4Val: '24 mo',
    fact4Lbl: 'Standard shelf life',
    ctaTitle: 'Explore our herbal catalog',
    ctaSubtitle: 'Browse single-herb powders, electuaries, syrups, and oils, or message our team with dosage questions.',
    shopBtn: 'Shop products',
    contactBtn: 'Contact us',
  };

  const pillars = [
    { icon: <Leaf className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar1Title, desc: content.pillar1Desc },
    { icon: <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar2Title, desc: content.pillar2Desc },
    { icon: <Award className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar3Title, desc: content.pillar3Desc },
    { icon: <Truck className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar4Title, desc: content.pillar4Desc },
  ];

  const steps = [
    { num: '01', title: content.step1Title, desc: content.step1Desc },
    { num: '02', title: content.step2Title, desc: content.step2Desc },
    { num: '03', title: content.step3Title, desc: content.step3Desc },
    { num: '04', title: content.step4Title, desc: content.step4Desc },
  ];

  const facts = [
    { value: content.fact1Val, label: content.fact1Lbl },
    { value: content.fact2Val, label: content.fact2Lbl },
    { value: content.fact3Val, label: content.fact3Lbl },
    { value: content.fact4Val, label: content.fact4Lbl },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-20 w-full font-sans">
      {/* Calm Page Header */}
      <section className="w-full border-b border-ifaqa-plum/10 bg-ifaqa-linen py-10 md:py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6962]">
            <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ifaqa-plum font-medium">{content.badge}</span>
          </nav>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl text-ifaqa-plum leading-tight max-w-3xl">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 space-y-16">
        {/* Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.storyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP1}
            </p>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP2}
            </p>
            <div className="p-5 rounded-xl bg-ifaqa-cashmere/70 border-s-2 border-ifaqa-mauve space-y-1">
              <p className="text-xs font-medium text-[#5A6962]">
                {content.oathTitle}
              </p>
              <p className="text-sm text-ifaqa-plum leading-relaxed">
                {content.oathQuote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-ifaqa-plum/10 p-8 shadow-luxury-card space-y-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white border border-ifaqa-plum/10 rounded-lg">
              <Image
                src="/images/logo-framed.jpg"
                alt="IFAQA Herbal Remedies"
                width={180}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif font-normal text-xl text-ifaqa-plum">
                IFAQA Herbal Remedies
              </h3>
              <p className="text-xs text-[#5A6962]">
                Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)
              </p>
            </div>
            <div className="pt-4 border-t border-ifaqa-plum/10 grid grid-cols-2 gap-3 text-start text-xs">
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">100% herbal</span>
                <span className="text-[#5A6962]">No synthetic additives</span>
              </div>
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">Direct dispatch</span>
                <span className="text-[#5A6962]">Pan-India courier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Principles Grid (2 cols for quiet editorial rhythm) */}
        <div className="space-y-6 pt-8 border-t border-ifaqa-plum/10">
          <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
            {content.whyChooseTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-ifaqa-plum/10 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans text-base font-medium text-ifaqa-plum">
                    {p.title}
                  </h4>
                  <p className="text-sm text-[#5A6962] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="space-y-6 pt-8 border-t border-ifaqa-plum/10">
          <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
            {content.processTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 space-y-2.5"
              >
                <span className="font-mono text-sm font-medium text-[#C5A059] tabular-nums block">
                  {st.num}
                </span>
                <h4 className="font-sans text-base font-medium text-ifaqa-plum">
                  {st.title}
                </h4>
                <p className="text-sm text-[#5A6962] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Factual Key Numbers */}
        <div className="bg-ifaqa-cashmere rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-start">
            {facts.map((st, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-3xl text-ifaqa-plum tabular-nums">
                  {st.value}
                </div>
                <div className="text-xs font-sans text-[#5A6962]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-ifaqa-plum/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-start max-w-2xl">
            <h4 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.ctaTitle}
            </h4>
            <p className="text-sm text-[#5A6962]">
              {content.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/catalog">
              <Button3D variant="primary" size="md">
                <span>{content.shopBtn}</span>
                <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
              </Button3D>
            </Link>
            <Link href="/contact">
              <Button3D variant="outline" size="md">
                {content.contactBtn}
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
