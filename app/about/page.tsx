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
      subtitle: 'Authentic Unani and Ayurvedic medicines compounded from whole wildcrafted herbs, roots, spices, and natural forest honey in Saharanpur.',
      storyTitle: 'Our craft and everyday commitment',
      storyP1: 'IFAQA Herbal Remedies was built on a straightforward principle: herbal care should be honest, clearly labeled, and free from hidden synthetic additives. Instead of extracted shortcuts or steroid mixtures, every jar and bottle begins with raw medicinal seeds, aromatic roots, dry blossoms, and pure unheated honey.',
      storyP2: 'At our Saharanpur dispensary, formulations are milled, simmered, and blended in small, trackable batches according to classical Unani and Ayurvedic pharmacopoeia standards so families across India receive consistent, fresh preparations directly from source.',
      storyP3: 'Every label states its botanical composition, dosage instructions, and precautions plainly—whether you are ordering a soothing Sharbat for seasonal cough or a daily restorative Majun.',
      oathTitle: 'Purity standard',
      oathQuote: '100% botanical composition — crafted with zero chemical steroids, artificial food coloring, or synthetic bulk fillers.',
      formsTitle: 'Classical dosage forms we prepare',
      formsSubtitle: 'Simple, traditional preparations designed for practical daily use at home.',
      form1Name: 'Majun & Khamira (Herbal Electuaries)',
      form1Desc: 'Fine botanical powders blended slowly into pure honey or raw cane base. Typically taken as 1 teaspoon with lukewarm milk or water.',
      form2Name: 'Safoof (Finely Milled Powders)',
      form2Desc: 'Single-origin dried roots and seeds cleaned by hand and milled without chemical binders for gentle digestive and metabolic support.',
      form3Name: 'Sharbat & Arq (Syrups & Distillates)',
      form3Desc: 'Slow-boiled herbal decoctions and floral/root distillates prepared to soothe cough, throat irritation, liver heat, and general vitality.',
      form4Name: 'Raughan & Marham (Oils & Topical Balms)',
      form4Desc: 'Herb-infused botanical oils and beeswax ointments meant strictly for external massage on joints, muscles, scalp, and skin.',
      whyChooseTitle: 'What sets our formulations apart',
      pillar1Title: 'Whole natural herbs',
      pillar1Desc: 'Whole roots, resin extracts, cardamom, and Kashmiri saffron sourced cleanly with zero filler dilution.',
      pillar2Title: 'Zero chemicals or steroids',
      pillar2Desc: 'Strict batch screening — no hidden corticosteroids, heavy metals, or artificial stabilizers.',
      pillar3Title: 'Small-batch freshness',
      pillar3Desc: 'Prepared in frequent small batches in Saharanpur rather than sitting in distant warehouses for years.',
      pillar4Title: 'Protected Pan-India delivery',
      pillar4Desc: 'Sealed in UV-protective amber glass or food-safe containers and dispatched within 24 business hours.',
      processTitle: 'Four-stage compounding process',
      step1Title: 'Herb selection',
      step1Desc: 'Every batch of dried bark, seed, and blossom is checked for aroma, color, and natural maturity before milling.',
      step2Title: 'Hand cleaning & sorting',
      step2Desc: 'Raw herbs are carefully sifted to clear dust, stems, moisture clumps, and inert matter.',
      step3Title: 'Controlled preparation',
      step3Desc: 'Slow decoction boiling and gentle honey compounding protect delicate active plant compounds.',
      step4Title: 'Sealed glass & pack dispatch',
      step4Desc: 'Packed immediately into moisture-locked jars with clear batch coding and shipped with live tracking.',
      craftCaption: 'Four graded botanical stages on white marble: dried blossoms, wild leaves, whole herbs, and milled roots ready for compounding.',
      aboutPhotoAlt: 'Four wooden apothecary spoons holding dried medicinal flowers, crushed botanical leaves, herbs, and lavender on white marble',
      mortarSectionTitle: 'Hand-compounded botanicals, shipped straight from Saharanpur',
      mortarSectionBody: 'Whether you need a digestive powder after meals, seasonal respiratory comfort, or gentle joint care, our dispensary team keeps every preparation simple, transparent, and authentic.',
      mortarCaption: 'Stone-mortar grinding of colorful medicinal flowers and wild herbs at our Saharanpur preparation house.',
      fact1Val: '31',
      fact1Lbl: 'Active remedies',
      fact2Val: '0%',
      fact2Lbl: 'Synthetic fillers',
      fact3Val: '24 hrs',
      fact3Lbl: 'Dispatch window',
      fact4Val: '24 mo',
      fact4Lbl: 'Standard shelf life',
      ctaTitle: 'Explore our herbal catalog',
      ctaSubtitle: 'Browse powders, electuaries, syrups, and oils by health category or message our Saharanpur team for dosage help.',
      shopBtn: 'Shop products',
      contactBtn: 'Contact us',
    },
    hi: {
      badge: 'हमारे बारे में',
      title: 'IFAQA हर्बल रेमेडीज़ के बारे में',
      subtitle: 'सहारनपुर में शुद्ध जड़ों, जड़ी-बूटियों, मसालों और प्राकृतिक जंगली शहद से तैयार यूनानी व आयुर्वेदिक औषधियां।',
      storyTitle: 'हमारा उद्देश्य और निर्माण पद्धति',
      storyP1: 'IFAQA हर्बल रेमेडीज़ की शुरुआत एक सरल सिद्धांत पर हुई — हर परिवार को मिलने वाली प्राकृतिक दवा शुद्ध, साफ़ लेबल वाली और बिना किसी छिपे केमिकल या स्टेरॉयड के होनी चाहिए।',
      storyP2: 'हमारी सहारनपुर डिस्पेंसरी में प्रत्येक माजून, चूर्ण, शर्बत और तेल पारंपरिक यूनानी और आयुर्वेदिक ग्रंथों के अनुसार छोटे बैच में तैयार किया जाता है ताकि कच्ची जड़ी-बूटियों का प्राकृतिक असर बना रहे।',
      storyP3: 'हर डिब्बे पर सामग्री और सेवन विधि सरल भाषा में लिखी होती है, ताकि आप घर पर सुरक्षित और आसान तरीके से उपयोग कर सकें।',
      oathTitle: 'गुणवत्ता एवं शुद्धता मानक',
      oathQuote: '100% प्राकृतिक जड़ी-बूटियां — बिना किसी स्टेरॉयड, कृत्रिम रंग या रासायनिक मिलावट के तैयार।',
      formsTitle: 'हमारी मुख्य औषधि श्रेणियां (कैसे तैयार होती हैं)',
      formsSubtitle: 'दैनिक उपयोग के लिए आसान और पारंपरिक प्राकृतिक रूप।',
      form1Name: 'माजून और खमीरा (हर्बल पेस्ट)',
      form1Desc: 'बारीक जड़ी-बूटियों को शुद्ध शहद के साथ धीमी आंच पर मिलाया जाता है। आमतौर पर 1 चम्मच गुनगुने दूध या पानी के साथ लिया जाता है।',
      form2Name: 'सफूफ (शुद्ध हर्बल चूर्ण)',
      form2Desc: 'धूप में सुखाई गई जड़ों और बीजों को हाथ से साफ कर बिना किसी केमिकल बाइंडर के बारीक पीसा जाता है।',
      form3Name: 'शर्बत और अर्क (सिरप व डिस्टिलेट)',
      form3Desc: 'धीमी आंच पर बने काढ़े और फूलों के अर्क जो खांसी, गले की खराश और पेट की गर्मी में आराम देते हैं।',
      form4Name: 'रोग़न और मरहम (तेल व लेप)',
      form4Desc: 'जड़ी-बूटियों से पके तेल और बाहरी उपयोग वाले मरहम — जोड़ों के दर्द, मांसपेशियों और त्वचा देखभाल के लिए।',
      whyChooseTitle: 'हमारी विशेषताएं',
      pillar1Title: 'असली जड़ी-बूटियां',
      pillar1Desc: 'बिना किसी मिलावट के चुनी गई पहाड़ी जड़ें, बीज, इलायची और कश्मीरी केसर।',
      pillar2Title: 'केमिकल और स्टेरॉयड मुक्त',
      pillar2Desc: 'कोई सिंथेटिक बाइंडिंग एजेंट, कृत्रिम रंग या रासायनिक प्रिजर्वेटिव नहीं।',
      pillar3Title: 'छोटे ताज़ा बैच',
      pillar3Desc: 'सालों पुरानी गोदाम की दवा के बजाय छोटे-छोटे ताज़ा बैच में सहारनपुर में निर्माण।',
      pillar4Title: 'पूरे भारत में सुरक्षित डिलीवरी',
      pillar4Desc: 'मजबूत सीलबंद डिब्बों में पैक होकर 24 कार्य घंटों में सहारनपुर से डिस्पैच।',
      processTitle: 'चार-चरणीय निर्माण प्रक्रिया',
      step1Title: 'जड़ी-बूटियों का चयन',
      step1Desc: 'पीसने से पहले प्रत्येक कच्ची जड़ी-बूटी की सुगंध, रंग और गुणवत्ता की जांच।',
      step2Title: 'सफाई एवं छंटाई',
      step2Desc: 'धूल, तिनके और अशुद्धियों को हाथ से पूरी तरह अलग करना।',
      step3Title: 'नियंत्रित निर्माण',
      step3Desc: 'नियंत्रित तापमान पर काढ़ा और मिश्रण ताकि प्राकृतिक तत्व सुरक्षित रहें।',
      step4Title: 'सुरक्षित सील पैकिंग',
      step4Desc: 'नमी और धूप से बचाने के लिए सीलबंद पैकेजिंग और कूरियर ट्रैकिंग।',
      craftCaption: 'चार लकड़ी की चम्मचों में अलग-अलग चुनी गई जड़ी-बूटियां — फूल, पत्तियां, सूखे अर्क और शुद्ध मसाले।',
      aboutPhotoAlt: 'सफेद संगमरमर पर चार लकड़ी की चम्मचों में सूखे औषधीय फूल, पत्तियां और जड़ी-बूटियां',
      mortarSectionTitle: 'सहारनपुर में पारंपरिक खरल-मूसल से शुद्ध निर्माण',
      mortarSectionBody: 'पाचन चूर्ण हो, खांसी का शर्बत हो या जोड़ों का तेल — हर उत्पाद पारदर्शिता और असली सामग्री के साथ तैयार कर सीधे आपके घर भेजा जाता है।',
      mortarCaption: 'रंगीन प्राकृतिक फूलों और जड़ी-बूटियों की पारंपरिक पत्थर के खरल में कुटाई व मिलावट-मुक्त तैयारी।',
      fact1Val: '31',
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
      storyP1: 'IFAQA ہربل ریمیڈیز کا مقصد خالص اور مستند نباتاتی ادویات کو بغیر کسی کیمیائی ملاوٹ کے ہر گھر تک پہنچانا ہے۔',
      storyP2: 'ہماری سہارنپور ڈسپنسری میں ہر شربت، معجون، سفوف اور روغن روایتی اصولوں کے مطابق چھوٹے بیجز میں تیار کیا جاتا ہے۔',
      storyP3: 'ہر پیکٹ پر خوراک اور اجزاء کی تفصیل واضح لکھی ہوتی ہے تاکہ گھر پر استعمال آسان رہے۔',
      oathTitle: 'معیار کا معیار',
      oathQuote: '100% خالص نباتاتی اجزاء — کیمیائی سٹیرائیڈز، مصنوعی رنگوں اور ملاوٹ سے مکمل پاک۔',
      formsTitle: 'ہماری تیار کردہ ادویات کی اقسام',
      formsSubtitle: 'روزمرہ صحت کے لیے روایتی اور آسان قدرتی طریقے۔',
      form1Name: 'معجون اور خمیرہ',
      form1Desc: 'خالص شہد اور جڑی بوٹیوں کا مرکب، عموماً نیم گرم دودھ یا پانی کے ساتھ لیا جاتا ہے۔',
      form2Name: 'سفوف (خالص پاؤڈر)',
      form2Desc: 'اصلی جڑوں اور بیجوں کو ہاتھ سے صاف کرکے بغیر کیمیکل کے پیسا جاتا ہے۔',
      form3Name: 'شربت اور عرق',
      form3Desc: 'کھانسی، گلے کی خراش اور معدے کی گرمی کے لیے دھیمی آنچ پر تیار جوشاندے۔',
      form4Name: 'روغن اور مرہم',
      form4Desc: 'جوڑوں کے درد، پٹھوں اور جلد کے بیرونی مساج کے لیے قدرتی تیل اور مرہم۔',
      whyChooseTitle: 'ہماری تیاری کے اصول',
      pillar1Title: 'خالص قدرتی جڑی بوٹیاں',
      pillar1Desc: 'اصلی جڑیں، بیج اور کشمیری زعفران بغیر کسی ملاوٹ کے۔',
      pillar2Title: 'کیمیکلز سے پاک',
      pillar2Desc: 'مصنوعی رنگوں، کیمیائی اجزاء اور سٹیرائیڈز سے مکمل پاک۔',
      pillar3Title: 'تازہ چھوٹے بیجز',
      pillar3Desc: 'سہارنپور میں باقاعدگی سے تازہ چھوٹے بیجز میں تیاری۔',
      pillar4Title: 'سہارنپور سے محفوظ ترسیل',
      pillar4Desc: 'مضبوط پیکنگ میں 24 گھنٹوں کے اندر پورے بھارت میں روانگی۔',
      processTitle: 'تیاری کے چار مراحل',
      step1Title: 'انتخاب',
      step1Desc: 'ہر جڑی بوٹی کی خوشبو اور تازگی کی جانچ۔',
      step2Title: 'صفائی اور چھانٹی',
      step2Desc: 'گرد اور غیر ضروری حصوں کو ہاتھ سے صاف کرنا۔',
      step3Title: 'بیج کی تیاری',
      step3Desc: 'مناسب درجہ حرارت پر تیاری تاکہ قدرتی اثر محفوظ رہے۔',
      step4Title: 'محفوظ پیکنگ',
      step4Desc: 'نمی سے بچاؤ کے لیے محفوظ سیل پیکنگ اور ٹریکنگ۔',
      craftCaption: 'سنگ مرمر پر چار لکڑی کے چمچوں میں منتخب پھول، سبز پتیاں اور خالص نباتاتی اجزاء۔',
      aboutPhotoAlt: 'سفید سنگ مرمر پر چار لکڑی کے چمچوں میں خشک جڑی بوٹیاں اور پھول',
      mortarSectionTitle: 'سہارنپور میں روایتی کھرل موسل سے خالص تیاری',
      mortarSectionBody: 'ہاضمے کا سفوف ہو، کھانسی کا شربت یا جوڑوں کا روغن — ہر دوا خالص اجزاء اور مکمل شفافیت کے ساتھ تیار کی جاتی ہے۔',
      mortarCaption: 'قدرتی پھولوں اور جڑی بوٹیوں کی روایتی پتھر کے کھرل میں تیاری۔',
      fact1Val: '31',
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
    subtitle: 'Authentic Unani and Ayurvedic medicines compounded from whole wildcrafted herbs, roots, spices, and natural forest honey in Saharanpur.',
    storyTitle: 'Our craft and everyday commitment',
    storyP1: 'IFAQA Herbal Remedies was built on a straightforward principle: herbal care should be honest, clearly labeled, and free from hidden synthetic additives. Instead of extracted shortcuts or steroid mixtures, every jar and bottle begins with raw medicinal seeds, aromatic roots, dry blossoms, and pure unheated honey.',
    storyP2: 'At our Saharanpur dispensary, formulations are milled, simmered, and blended in small, trackable batches according to classical Unani and Ayurvedic pharmacopoeia standards so families across India receive consistent, fresh preparations directly from source.',
    storyP3: 'Every label states its botanical composition, dosage instructions, and precautions plainly—whether you are ordering a soothing Sharbat for seasonal cough or a daily restorative Majun.',
    oathTitle: 'Purity standard',
    oathQuote: '100% botanical composition — crafted with zero chemical steroids, artificial food coloring, or synthetic bulk fillers.',
    formsTitle: 'Classical dosage forms we prepare',
    formsSubtitle: 'Simple, traditional preparations designed for practical daily use at home.',
    form1Name: 'Majun & Khamira (Herbal Electuaries)',
    form1Desc: 'Fine botanical powders blended slowly into pure honey or raw cane base. Typically taken as 1 teaspoon with lukewarm milk or water.',
    form2Name: 'Safoof (Finely Milled Powders)',
    form2Desc: 'Single-origin dried roots and seeds cleaned by hand and milled without chemical binders for gentle digestive and metabolic support.',
    form3Name: 'Sharbat & Arq (Syrups & Distillates)',
    form3Desc: 'Slow-boiled herbal decoctions and floral/root distillates prepared to soothe cough, throat irritation, liver heat, and general vitality.',
    form4Name: 'Raughan & Marham (Oils & Topical Balms)',
    form4Desc: 'Herb-infused botanical oils and beeswax ointments meant strictly for external massage on joints, muscles, scalp, and skin.',
    whyChooseTitle: 'What sets our formulations apart',
    pillar1Title: 'Whole natural herbs',
    pillar1Desc: 'Whole roots, resin extracts, cardamom, and Kashmiri saffron sourced cleanly with zero filler dilution.',
    pillar2Title: 'Zero chemicals or steroids',
    pillar2Desc: 'Strict batch screening — no hidden corticosteroids, heavy metals, or artificial stabilizers.',
    pillar3Title: 'Small-batch freshness',
    pillar3Desc: 'Prepared in frequent small batches in Saharanpur rather than sitting in distant warehouses for years.',
    pillar4Title: 'Protected Pan-India delivery',
    pillar4Desc: 'Sealed in UV-protective amber glass or food-safe containers and dispatched within 24 business hours.',
    processTitle: 'Four-stage compounding process',
    step1Title: 'Herb selection',
    step1Desc: 'Every batch of dried bark, seed, and blossom is checked for aroma, color, and natural maturity before milling.',
    step2Title: 'Hand cleaning & sorting',
    step2Desc: 'Raw herbs are carefully sifted to clear dust, stems, moisture clumps, and inert matter.',
    step3Title: 'Controlled preparation',
    step3Desc: 'Slow decoction boiling and gentle honey compounding protect delicate active plant compounds.',
    step4Title: 'Sealed glass & pack dispatch',
    step4Desc: 'Packed immediately into moisture-locked jars with clear batch coding and shipped with live tracking.',
    craftCaption: 'Four graded botanical stages on white marble: dried blossoms, wild leaves, whole herbs, and milled roots ready for compounding.',
    aboutPhotoAlt: 'Four wooden apothecary spoons holding dried medicinal flowers, crushed botanical leaves, herbs, and lavender on white marble',
    mortarSectionTitle: 'Hand-compounded botanicals, shipped straight from Saharanpur',
    mortarSectionBody: 'Whether you need a digestive powder after meals, seasonal respiratory comfort, or gentle joint care, our dispensary team keeps every preparation simple, transparent, and authentic.',
    mortarCaption: 'Stone-mortar grinding of colorful medicinal flowers and wild herbs at our Saharanpur preparation house.',
    fact1Val: '31',
    fact1Lbl: 'Active remedies',
    fact2Val: '0%',
    fact2Lbl: 'Synthetic fillers',
    fact3Val: '24 hrs',
    fact3Lbl: 'Dispatch window',
    fact4Val: '24 mo',
    fact4Lbl: 'Standard shelf life',
    ctaTitle: 'Explore our herbal catalog',
    ctaSubtitle: 'Browse powders, electuaries, syrups, and oils by health category or message our Saharanpur team for dosage help.',
    shopBtn: 'Shop products',
    contactBtn: 'Contact us',
  };

  const forms = [
    { name: content.form1Name, desc: content.form1Desc },
    { name: content.form2Name, desc: content.form2Desc },
    { name: content.form3Name, desc: content.form3Desc },
    { name: content.form4Name, desc: content.form4Desc },
  ];

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
    <div className="min-h-screen bg-ifaqa-linen select-none pb-8 md:pb-10 w-full font-sans">
      {/* Unified Edge-to-Edge Editorial Header Showcase — Four Botanical Spoons on Marble */}
      <section className="relative w-full border-b border-ifaqa-plum/10 bg-[#F4F3F1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/about-spoons-craft.jpg"
            alt={content.aboutPhotoAlt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[center_bottom] lg:object-[76%_center] rtl:lg:object-[24%_center]"
          />
          <div
            className="lg:hidden absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(250,248,245,0.94) 0%, rgba(250,248,245,0.84) 50%, rgba(250,248,245,0.26) 78%, rgba(250,248,245,0.04) 100%)',
            }}
          />
          <div
            className="hidden lg:block rtl:hidden absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.93) 40%, rgba(250,248,245,0.55) 60%, rgba(250,248,245,0.06) 80%, rgba(250,248,245,0) 100%)',
            }}
          />
          <div
            className="hidden rtl:lg:block absolute inset-0"
            style={{
              background:
                'linear-gradient(270deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.93) 40%, rgba(250,248,245,0.55) 60%, rgba(250,248,245,0.06) 80%, rgba(250,248,245,0) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ifaqa-linen/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-40 sm:pb-44 lg:py-16">
          <div className="max-w-2xl space-y-3.5 ifaqa-hero-rise">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6962]">
              <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ifaqa-plum font-medium">{content.badge}</span>
            </nav>
            <h1 className="font-serif font-normal text-3xl sm:text-5xl text-ifaqa-plum leading-tight">
              {content.title}
            </h1>
            <p className="text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-xl">
              {content.subtitle}
            </p>
            <p className="inline-flex items-center gap-2 border-s-2 border-ifaqa-mauve ps-3 text-xs text-[#5A6962] pt-1">
              {content.craftCaption}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-10 space-y-8 md:space-y-10">
        {/* Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.storyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP1}
            </p>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP2}
            </p>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP3}
            </p>
            <div className="p-4 sm:p-5 rounded-xl bg-ifaqa-cashmere/70 border-s-2 border-ifaqa-mauve space-y-1">
              <p className="text-xs font-medium text-[#5A6962]">
                {content.oathTitle}
              </p>
              <p className="text-sm text-ifaqa-plum leading-relaxed">
                {content.oathQuote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-8 shadow-luxury-card space-y-5 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white border border-ifaqa-plum/10 rounded-lg">
              <Image
                src="/images/logo-framed.jpg"
                alt="IFAQA Herbal Remedies"
                width={180}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="space-y-1">
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
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">Support line</span>
                <span className="text-[#5A6962] font-mono">+91 97298 40336</span>
              </div>
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">Mon – Sat</span>
                <span className="text-[#5A6962]">9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Classical Dosage Forms (Real everyday guide for customers) */}
        <div className="space-y-4 pt-6 border-t border-ifaqa-plum/10">
          <div>
            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.formsTitle}
            </h3>
            <p className="text-sm text-[#5A6962] mt-1">
              {content.formsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {forms.map((f, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 space-y-1.5 shadow-luxury-card"
              >
                <h4 className="font-sans text-sm sm:text-base font-semibold text-ifaqa-plum">
                  {f.name}
                </h4>
                <p className="text-sm text-[#5A6962] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 4 Commitments + Side Mortar Image Showcase (Desktop side-by-side, Mobile text cleanly over translucent photo) */}
        <div className="pt-6 border-t border-ifaqa-plum/10 space-y-4 ifaqa-scroll-reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.whyChooseTitle}
            </h3>
            <p className="text-xs text-[#5A6962] max-w-md">
              {content.mortarCaption}
            </p>
          </div>

          {/* Mobile Unified Backdrop Layout: 4 cards over translucent mortar image */}
          <div className="lg:hidden relative rounded-2xl overflow-hidden border border-ifaqa-plum/10 bg-[#F4EFE6]">
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/images/about-artisan-mortar.jpg"
                alt={content.mortarCaption}
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover object-[center_bottom]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(250,248,245,0.93) 0%, rgba(250,248,245,0.85) 56%, rgba(250,248,245,0.34) 84%, rgba(250,248,245,0.06) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 p-4 sm:p-6 pb-40 sm:pb-44 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/85 backdrop-blur-sm border border-ifaqa-plum/10 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center shrink-0">
                      {p.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-sans text-sm font-medium text-ifaqa-plum">
                        {p.title}
                      </h4>
                      <p className="text-xs text-[#3E524A] leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <p className="text-xs font-medium text-ifaqa-plum bg-white/80 backdrop-blur-sm border border-ifaqa-plum/10 rounded-lg px-3 py-2 inline-block">
                  {content.mortarSectionTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop 4 Options (Left) + Artisan Mortar Image + Caption (Right) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 shadow-luxury-card transition-colors flex flex-col justify-between gap-3"
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

            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-ifaqa-plum/10 bg-white shadow-luxury-card flex flex-col">
              <div className="relative flex-1 min-h-[240px] bg-[#F4EFE6] group overflow-hidden">
                <Image
                  src="/images/about-artisan-mortar.jpg"
                  alt={content.mortarCaption}
                  fill
                  loading="lazy"
                  sizes="40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 bg-ifaqa-linen border-t border-ifaqa-plum/10 space-y-1">
                <h4 className="font-serif font-normal text-lg text-ifaqa-plum">
                  {content.mortarSectionTitle}
                </h4>
                <p className="text-xs text-[#5A6962] leading-relaxed">
                  {content.mortarSectionBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Compounding Process */}
        <div className="space-y-4 pt-6 border-t border-ifaqa-plum/10">
          <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
            {content.processTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 space-y-2 shadow-luxury-card"
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

        {/* Factual Key Numbers + Compact Bottom CTA */}
        <div className="space-y-5 pt-2">
          <div className="bg-ifaqa-cashmere rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-8">
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

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-ifaqa-plum/10 shadow-luxury-card flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center lg:text-start max-w-2xl">
              <h4 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
                {content.ctaTitle}
              </h4>
              <p className="text-sm text-[#5A6962]">
                {content.ctaSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
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
        </div>
      </section>
    </div>
  );
}
