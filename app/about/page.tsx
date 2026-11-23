'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  Leaf,
  ShieldCheck,
  Award,
  Truck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
  Heart
} from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const content = {
    en: {
      badge: 'About Us',
      title: 'About IFAQA Herbal Remedies',
      subtitle: 'Pure, authentic Ayurvedic and Unani herbal medicines crafted with natural ingredients for your everyday health and wellness.',
      tagline: '100% NATURAL • ZERO CHEMICAL SHORTCUTS • PAN-INDIA DELIVERY',
      storyTitle: 'Our Story & Philosophy',
      storyP1: 'IFAQA Herbal Remedies was founded with a simple, honest goal: to bring genuine, traditional herbal medicine to families across India. In a market flooded with artificial supplements and quick-fix chemical products, we offer remedies made from pure wildcrafted herbs, natural roots, and unadulterated forest honey.',
      storyP2: 'Our formulations are prepared using classical Ayurvedic and Unani knowledge passed down through generations. Whether you need digestive care, natural vitality, cough relief, or joint wellness, our products treat the root cause naturally without harmful synthetic additives.',
      oathTitle: 'Our Quality Promise',
      oathQuote: '“To never use harmful synthetic chemicals, to preserve authentic herbal traditions, and to deliver safe, effective products to every home.”',
      whyChooseTitle: 'Why Choose IFAQA?',
      whyChooseSubtitle: 'Crafted with purity, tradition, and customer safety at every step.',
      pillar1Title: '100% Natural Herbs',
      pillar1Desc: 'We source high-altitude botanical roots, seeds, and Kashmiri saffron directly from nature with zero adulteration.',
      pillar2Title: 'Zero Chemicals & Steroids',
      pillar2Desc: 'No artificial binding agents, no synthetic steroids, and no harmful preservatives. 100% safe for long-term health.',
      pillar3Title: 'Traditional Herbal Recipes',
      pillar3Desc: 'Prepared using classical methods like slow herbal decoctions (Joshanda) and honey-based electuaries (Majun).',
      pillar4Title: 'Fast Pan-India Delivery',
      pillar4Desc: 'Sealed fresh in UV-protective amber glass containers and delivered directly to your doorstep in 2 to 4 days.',
      processTitle: 'Our 4-Step Quality Process',
      processSubtitle: 'How pure botanicals become trusted wellness remedies.',
      step1Title: 'Handpicked Herbs',
      step1Desc: 'Carefully harvested from clean, unpolluted valleys and mountains.',
      step2Title: 'Strict Sorting & Cleaning',
      step2Desc: 'Manually inspected to remove all dirt, stems, and impurities.',
      step3Title: 'Traditional Preparation',
      step3Desc: 'Prepared in small batches to preserve active plant nutrients.',
      step4Title: 'Hygienic Packaging',
      step4Desc: 'Packed in amber glass to keep products fresh and potent.',
      stat1Val: '100%',
      stat1Lbl: 'Natural Herbal Ingredients',
      stat2Val: '50+',
      stat2Lbl: 'Tested Herbal Products',
      stat3Val: '28+',
      stat3Lbl: 'Indian States Delivered',
      stat4Val: '24-48h',
      stat4Lbl: 'Fast Order Dispatch',
      stat5Val: '10,000+',
      stat5Lbl: 'Satisfied Customers',
      ctaTitle: 'Ready to Experience Natural Herbal Wellness?',
      ctaSubtitle: 'Explore our wide range of herbal remedies or reach out to our customer support team.',
      shopBtn: 'Shop All Products',
      contactBtn: 'Contact Customer Support',
    },
    hi: {
      badge: 'हमारे बारे में',
      title: 'IFAQA हर्बल रेमेडीज़ के बारे में',
      subtitle: 'शुद्ध एवं प्रामाणिक आयुर्वेदिक व यूनानी औषधियां, जो 100% प्राकृतिक जड़ी-बूटियों से आपके संपूर्ण स्वास्थ्य के लिए तैयार की जाती हैं।',
      tagline: '100% प्राकृतिक • कोई केमिकल नहीं • पूरे भारत में डिलीवरी',
      storyTitle: 'हमारी कहानी एवं सोच',
      storyP1: 'IFAQA हर्बल रेमेडीज़ की शुरुआत एक स्पष्ट और नेक उद्देश्य के साथ हुई: भारत के हर घर तक असली और असरदार पारंपरिक जड़ी-बूटियां पहुंचाना। आज के केमिकल और मिलावटी दौर में, हम शुद्ध जंगली जड़ी-बूटियों, प्राकृतिक जड़ों और असली शहद से बनी असरदार दवाइयां उपलब्ध कराते हैं।',
      storyP2: 'हमारे सभी उत्पाद सदियों पुरानी यूनानी और आयुर्वेदिक पद्धतियों के आधार पर बनाए जाते हैं। पेट की समस्या हो, शारीरिक शक्ति, खांसी-जुकाम या जोड़ों का दर्द—हमारी औषधियां समस्या को जड़ से ठीक करने में मदद करती हैं, बिना किसी साइड-इफेक्ट के।',
      oathTitle: 'हमारी गुणवत्ता की शपथ',
      oathQuote: '“हम कभी किसी हानिकारक केमिकल का इस्तेमाल नहीं करेंगे और हर ग्राहक तक शुद्ध, सुरक्षित व असरदार हर्बल दवाइयां पहुंचाएंगे।”',
      whyChooseTitle: 'IFAQA को क्यों चुनें?',
      whyChooseSubtitle: 'शुद्धता, गुणवत्ता और ग्राहक सुरक्षा हमारी पहली प्राथमिकता है।',
      pillar1Title: '100% प्राकृतिक जड़ी-बूटियां',
      pillar1Desc: 'कश्मीरी केसर, पहाड़ी जड़ी-बूटियां और प्राकृतिक अर्क, बिना किसी मिलावट के सीधे प्रकृति से।',
      pillar2Title: 'केमिकल और स्टेरॉयड मुक्त',
      pillar2Desc: 'कोई कृत्रिम रंग, केमिकल प्रिजर्वेटिव या स्टेरॉयड नहीं। दैनिक उपयोग के लिए पूरी तरह सुरक्षित।',
      pillar3Title: 'प्रामाणिक पारंपरिक नुस्खे',
      pillar3Desc: 'शास्त्रोक्त काढ़ा (जोशांदा), माजून और प्राकृतिक सिरप शास्त्रीय विधि से तैयार।',
      pillar4Title: 'तेज़ सुरक्षित होम डिलीवरी',
      pillar4Desc: 'दवाइयों की गुणवत्ता सुरक्षित रखने के लिए एम्बर ग्लास बॉटल में 2 से 4 दिनों में घर तक डिलीवरी।',
      processTitle: 'हमारी 4-चरणीय गुणवत्ता प्रक्रिया',
      processSubtitle: 'शुद्ध जड़ी-बूटियों से असरदार दवा बनने का सफर।',
      step1Title: 'जड़ी-बूटियों का चयन',
      step1Desc: 'पहाड़ों और प्राकृतिक जंगलों से चुनी गई असली औषधियां।',
      step2Title: 'सफाई एवं छंटाई',
      step2Desc: 'धूल और अशुद्धियों को पूरी तरह हाथ से साफ किया जाता है।',
      step3Title: 'पारंपरिक निर्माण',
      step3Desc: 'छोटे-छोटे बैच में धीमी आंच पर तैयार ताकि पोषक तत्व बने रहें।',
      step4Title: 'सुरक्षित एम्बर पैकिंग',
      step4Desc: 'धूप और नमी से बचाने के लिए सुरक्षित कांच की शीशियों में सीलबंद।',
      stat1Val: '100%',
      stat1Lbl: 'शुद्ध प्राकृतिक सामग्री',
      stat2Val: '50+',
      stat2Lbl: 'असरदार हर्बल उत्पाद',
      stat3Val: '28+',
      stat3Lbl: 'राज्यों में सफल डिलीवरी',
      stat4Val: '24-48h',
      stat4Lbl: 'तेज़ आर्डर डिस्पैच',
      stat5Val: '10,000+',
      stat5Lbl: 'संतुष्ट ग्राहक',
      ctaTitle: 'प्राकृतिक स्वास्थ्य का अनुभव करें',
      ctaSubtitle: 'हमारे सभी हर्बल उत्पाद देखें या किसी भी जानकारी के लिए हमसे संपर्क करें।',
      shopBtn: 'सभी उत्पाद देखें',
      contactBtn: 'कस्टमर केयर से संपर्क करें',
    },
    ur: {
      badge: 'ہمارے متعلق',
      title: 'IFAQA ہربل ریمیڈیز کے متعلق',
      subtitle: 'خالص اور مستند یونانی و نباتاتی ادویات، جو 100% قدرتی جڑی بوٹیوں سے آپ کی بہترین صحت کے لیے تیار کی جاتی ہیں۔',
      tagline: '100% قدرتی • کیمیکلز سے پاک • تیز رفتار ڈلیوری',
      storyTitle: 'ہماری کہانی اور مقصد',
      storyP1: 'IFAQA ہربل ریمیڈیز کا قیام ایک مخلصانہ مقصد کے تحت عمل میں آیا: ہر گھر تک خالص اور روایتی نباتاتی ادویات پہنچانا۔ مصنوعی اور کیمیائی ادویات کے اس دور میں، ہم اصلی جنگلی جڑی بوٹیوں اور خالص شہد سے تیار کردہ مرکبات فراہم کرتے ہیں۔',
      storyP2: 'ہماری تمام ادویات صدیوں پرانی مستند یونانی کتب کے اصولوں کے تحت تیار کی جاتی ہیں۔ معدے کی تکالیف ہوں، جسمانی توانائی، کھانسی یا جوڑوں کا درد—ہماری ادویات مرض کا جڑ سے علاج کرتی ہیں۔',
      oathTitle: 'ہمارا معیار اور عزم',
      oathQuote: '“ہم کبھی کسی نقصان دہ کیمیکل کا استعمال نہیں کریں گے اور ہر مریض تک خالص اور محفوظ قدرتی ادویات پہنچائیں گے۔”',
      whyChooseTitle: 'IFAQA کا انتخاب کیوں کریں؟',
      whyChooseSubtitle: 'خلوص، معیار اور گاہک کی صحت ہماری اولین ترجیح ہے۔',
      pillar1Title: '100% خالص قدرتی جڑی بوٹیاں',
      pillar1Desc: 'کشمیری زعفران، جنگلی جڑی بوٹیاں اور خالص قدرتی عرق، بغیر کسی ملاوٹ کے۔',
      pillar2Title: 'کیمیکلز اور سٹیرائیڈز سے پاک',
      pillar2Desc: 'کوئی مصنوعی رنگ یا کیمیائی اجزاء نہیں، روزمرہ استعمال کے لیے مکمل محفوظ۔',
      pillar3Title: 'روایتی مستند نسخے',
      pillar3Desc: 'دستوری جوشاندے، معجون اور شربت خالص روایتی طریقہ کار کے مطابق تیار۔',
      pillar4Title: 'تیز رفتار محفوظ ڈلیوری',
      pillar4Desc: 'معیار کو محفوظ رکھنے کے لیے خصوصی شیشیوں میں بند اور 2 سے 4 دن میں گھر تک ترسیل۔',
      processTitle: 'ہماری 4 مرحلہ وار کوالٹی',
      processSubtitle: 'خالص جڑی بوٹیوں سے معیاری ادویات کی تیاری۔',
      step1Title: 'خالص جڑی بوٹیوں کا انتخاب',
      step1Desc: 'پہاڑوں اور وادیوں سے چنی ہوئی معیاری جڑی بوٹیاں۔',
      step2Title: 'صفائی اور جانچ',
      step2Desc: 'تمام گرد اور غبار کو مکمل احتیاط کے ساتھ دور کیا جاتا ہے۔',
      step3Title: 'روایتی تیاری',
      step3Desc: 'چھوٹے بیجز میں دھیمی آنچ پر تیار تاکہ اجزاء کی تاثیر قائم رہے۔',
      step4Title: 'محفوظ پیکنگ',
      step4Desc: 'دھوپ اور نمی سے بچاؤ کے لیے محفوظ شیشیوں میں پیک۔',
      stat1Val: '100%',
      stat1Lbl: 'خالص قدرتی اجزاء',
      stat2Val: '50+',
      stat2Lbl: 'مستند نباتاتی مصنوعات',
      stat3Val: '28+',
      stat3Lbl: 'ریاستوں میں ترسیل',
      stat4Val: '24-48h',
      stat4Lbl: 'تیز ترسیل کا عمل',
      stat5Val: '10,000+',
      stat5Lbl: 'مطمئن گاہک',
      ctaTitle: 'قدرتی نباتاتی صحت کا تجربہ کریں',
      ctaSubtitle: 'ہماری تمام ادویات دیکھیں یا کسی بھی رہنمائی کے لیے ہم سے رابطہ کریں۔',
      shopBtn: 'تمام ادویات دیکھیں',
      contactBtn: 'ہم سے رابطہ کریں',
    },
  };

  const c = content[language] || content.en;

  const pillars = [
    { icon: <Leaf className="w-6 h-6 text-ifaqa-sand" />, title: c.pillar1Title, desc: c.pillar1Desc },
    { icon: <ShieldCheck className="w-6 h-6 text-ifaqa-sand" />, title: c.pillar2Title, desc: c.pillar2Desc },
    { icon: <Award className="w-6 h-6 text-ifaqa-sand" />, title: c.pillar3Title, desc: c.pillar3Desc },
    { icon: <Truck className="w-6 h-6 text-ifaqa-sand" />, title: c.pillar4Title, desc: c.pillar4Desc },
  ];

  const steps = [
    { num: '01', title: c.step1Title, desc: c.step1Desc },
    { num: '02', title: c.step2Title, desc: c.step2Desc },
    { num: '03', title: c.step3Title, desc: c.step3Desc },
    { num: '04', title: c.step4Title, desc: c.step4Desc },
  ];

  const stats = [
    { value: c.stat1Val, label: c.stat1Lbl },
    { value: c.stat2Val, label: c.stat2Lbl },
    { value: c.stat3Val, label: c.stat3Lbl },
    { value: c.stat4Val, label: c.stat4Lbl },
    { value: c.stat5Val, label: c.stat5Lbl },
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

      {/* 2. Story & Quality Narrative */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold block">
                {c.badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ifaqa-plum leading-tight">
                {c.storyTitle}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-ifaqa-plum/90 font-sans leading-relaxed">
              {c.storyP1}
            </p>

            <p className="text-sm sm:text-base text-ifaqa-plum/90 font-sans leading-relaxed">
              {c.storyP2}
            </p>

            <div className="p-5 bg-[#FAF5EC] border-l-4 border-ifaqa-plum space-y-1.5">
              <p className="font-serif text-xs font-bold text-ifaqa-plum uppercase tracking-wider">
                {c.oathTitle}
              </p>
              <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans italic leading-relaxed">
                {c.oathQuote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border-2 border-ifaqa-sand/70 p-8 sm:p-12 shadow-2xl space-y-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white border-2 border-ifaqa-sand/70 shadow-md mx-auto">
              <Image
                src="/images/logo-framed.jpg"
                alt="IFAQA Heritage"
                width={200}
                height={72}
                priority
                className="h-14 w-auto object-contain"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-ifaqa-plum">
                IFAQA Herbal Remedies
              </h3>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                Pure, safe, and authentic natural remedies prepared with classical devotion.
              </p>
            </div>

            <div className="pt-4 border-t border-ifaqa-sand/40 grid grid-cols-2 gap-3 text-left text-xs font-sans">
              <div className="p-3 bg-[#FAF8F5] border border-ifaqa-sand/40">
                <span className="font-bold text-ifaqa-plum block">100% Herbal</span>
                <span className="text-ifaqa-blackberry text-[11px]">No synthetic additives</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-ifaqa-sand/40">
                <span className="font-bold text-ifaqa-plum block">Pan-India Courier</span>
                <span className="text-ifaqa-blackberry text-[11px]">Delivered to your home</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Why Choose Us (4 Cards) */}
        <div className="space-y-8 pt-6 border-t-2 border-ifaqa-sand/40">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              {c.whyChooseTitle}
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-1">
              {c.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum hover:shadow-lg transition-all duration-200 shadow-sm space-y-3"
              >
                <div className="w-12 h-12 bg-ifaqa-plum flex items-center justify-center border border-ifaqa-sand/40 shadow-sm">
                  {p.icon}
                </div>
                <h4 className="font-serif text-base font-bold text-ifaqa-plum">
                  {p.title}
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 4-Step Quality Process */}
        <div className="space-y-8 pt-6 border-t-2 border-ifaqa-sand/40">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              {c.processTitle}
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-1">
              {c.processSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-6 bg-[#FAF8F5] border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum transition-all duration-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-ifaqa-sand/30">
                  <span className="font-mono text-2xl font-bold text-ifaqa-sand">
                    {st.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-[#FAF5EC] text-ifaqa-plum px-2 py-0.5 border border-ifaqa-sand/60">
                    STEP
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-ifaqa-plum">
                  {st.title}
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Numbers Banner */}
        <div className="bg-gradient-to-r from-[#0E3B2D] via-[#165A45] to-[#0B2D22] text-ifaqa-linen p-8 sm:p-12 border-2 border-ifaqa-sand/60 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-ifaqa-sand/30">
            {stats.map((st, idx) => (
              <div key={idx} className="space-y-1.5 pt-3 lg:pt-0">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-ifaqa-sand">
                  {st.value}
                </div>
                <div className="font-serif text-xs uppercase tracking-wider font-bold text-white">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Call to Action */}
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
            <Link href="/catalog">
              <Button3D variant="primary" size="lg" className="font-bold text-xs uppercase tracking-wider shadow-md">
                <span>{c.shopBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 text-ifaqa-sand" />
              </Button3D>
            </Link>
            <Link href="/contact">
              <button className="px-5 py-3 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                {c.contactBtn}
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
