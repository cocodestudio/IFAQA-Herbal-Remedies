'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'ur';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  getRemedyTitle: (remedy: { name: string; urduName?: string; romanUrduName?: string }) => string;
  getRemedySubtitle: (remedy: { name: string; urduName?: string; romanUrduName?: string; form?: string }) => string;
  getCategoryTitle: (cat: { id: string; name: string; urduName?: string }) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    catalog: 'Pharmacopoeia',
    cart: 'Cart',
    checkout: 'Checkout',
    signIn: 'Sign In',
    searchPlaceholder: 'Search herbal remedies, botanical ingredients, or ailments...',
    filter: 'Filters',
    allFormulations: 'All Formulations',
    inStockOnly: 'In Stock Only',
    outOfStock: 'Out of Stock',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    freeShippingNotice: 'Complimentary Pan-India & Global Express Courier on qualified orders',
    explorePharmacopoeia: 'Explore Catalog',
    viewDetails: 'View Details',
    therapeuticIndications: 'Therapeutic Indications',
    activeIngredients: 'Botanical Ingredients',
    dosageAndVehicle: 'Dosage & Anupana (Usage Guide)',
    packagingDetails: 'Packaging & Form',
    genuineQuality: '100% Authentic Classical Formulas',
    freeDelivery: 'All-India & Global Express Dispatch',
    ayurvedicUnaniHeritage: 'Canonical Unani & Herbal Science',
    categoriesTitle: 'Curated by Ailment & Body System',
    featuredTitle: 'Imperial Classical Formulations',
    bestSellerBadge: 'Best Seller',
    classicalStandard: 'Canonical Pharmacopoeia',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    orderConfirmation: 'Order Confirmed',
    languageName: 'English',
  },
  hi: {
    home: 'होम',
    about: 'परिचय (About)',
    contact: 'संपर्क (Contact)',
    privacyPolicy: 'गोपनीयता नीति (Privacy)',
    catalog: 'दवाइयां एवं उत्पाद',
    cart: 'कार्ट',
    checkout: 'चेकआउट',
    signIn: 'लॉग इन',
    searchPlaceholder: 'जड़ी-बूटी, बीमारी या दवा का नाम खोजें...',
    filter: 'फ़िल्टर',
    allFormulations: 'सभी औषधियां',
    inStockOnly: 'केवल उपलब्ध स्टॉक',
    outOfStock: 'स्टॉक समाप्त',
    addToCart: 'कार्ट में जोड़ें',
    addedToCart: 'कार्ट में जोड़ा गया',
    freeShippingNotice: 'पूरे भारत एवं विश्वभर में प्रामाणिक जड़ी-बूटियों की सुरक्षित डिलीवरी',
    explorePharmacopoeia: 'दवाइयां देखें',
    viewDetails: 'विवरण देखें',
    therapeuticIndications: 'रोग एवं लाभ',
    activeIngredients: 'प्रमुख जड़ी-बूटियां',
    dosageAndVehicle: 'सेवन विधि व अनुपान',
    packagingDetails: 'पैकिंग विवरण',
    genuineQuality: '100% शुद्ध एवं असरदार देसी दवाखाना',
    freeDelivery: 'अखिल भारतीय व अंतर्राष्ट्रीय डिलीवरी',
    ayurvedicUnaniHeritage: 'प्राचीन यूनानी व हर्बल पद्धति',
    categoriesTitle: 'रोगानुसार औषधियां',
    featuredTitle: 'सर्वोत्तम असरदार औषधियां',
    bestSellerBadge: 'बेस्ट सेलर',
    classicalStandard: 'शुद्ध क्लासिकल फॉर्मूला',
    subtotal: 'उप-योग',
    shipping: 'शिपिंग',
    total: 'कुल राशि',
    orderConfirmation: 'ऑर्डर सफल',
    languageName: 'हिंदी',
  },
  ur: {
    home: 'ہوم',
    about: 'تعارف (About)',
    contact: 'رابطہ (Contact)',
    privacyPolicy: 'رازداری پالیسی (Privacy)',
    catalog: 'دواخانہ و ادویات',
    cart: 'ٹوکری',
    checkout: 'چیک آؤٹ',
    signIn: 'لاگ ان',
    searchPlaceholder: 'جڑی بوٹی، مرض یا دوا تلاش کریں...',
    filter: 'فلٹرز',
    allFormulations: 'تمام مرکبات',
    inStockOnly: 'صرف دستیاب اسٹاک',
    outOfStock: 'دستیاب نہیں',
    addToCart: 'ٹوکری میں شامل کریں',
    addedToCart: 'شامل کر دیا گیا',
    freeShippingNotice: 'خالص یونانی نباتاتی مرکبات کی تیز رفتار ڈلیوری',
    explorePharmacopoeia: 'ادویات دیکھیں',
    viewDetails: 'تفصیلات',
    therapeuticIndications: 'طبی فوائد و علامات',
    activeIngredients: 'خالص اجزائے ترکیبی',
    dosageAndVehicle: 'طریقۂ استعمال و ہمراہ',
    packagingDetails: 'پیکنگ تفصیلات',
    genuineQuality: '۱۰۰٪ خالص دیسی دواخانہ',
    freeDelivery: 'تیز رفتار ڈلیوری',
    ayurvedicUnaniHeritage: 'مستند یونانی و نباتاتی طب',
    categoriesTitle: 'امراض و نظام کے مطابق',
    featuredTitle: 'خاص شاہی مرکبات',
    bestSellerBadge: 'نمایاں ترین',
    classicalStandard: 'دستوری مرکب',
    subtotal: 'میزان',
    shipping: 'ڈلیوری',
    total: 'کل رقم',
    orderConfirmation: 'آرڈر تصدیق',
    languageName: 'اردو',
  },
};

const categoryTranslations: Record<string, { en: string; hi: string; ur: string }> = {
  hazim: {
    en: 'Digestive & Stomach Care',
    hi: 'पाचन एवं पेट स्वास्थ्य',
    ur: 'ہاضم (معدہ و نظام انہضام)',
  },
  muqawwi: {
    en: 'Vitality, Nerve & Energy',
    hi: 'ऊर्जा एवं स्नायु शक्ति',
    ur: 'مقوی (طاقت و اعصابی توانائی)',
  },
  sual: {
    en: 'Respiratory & Cough Relief',
    hi: 'श्वसन, फेफड़े एवं खांसी',
    ur: 'سعال (کھانسی و سانس کا علاج)',
  },
  mafasil: {
    en: 'Joint & Muscular Wellness',
    hi: 'जोड़ों एवं मांसपेशियों का दर्द',
    ur: 'مفاصل (جوڑوں و پٹھوں کا درد)',
  },
  jild: {
    en: 'Skin & Dermatology',
    hi: 'त्वचा एवं सौंदर्य देखभाल',
    ur: 'جلد (جلدی امراض و خوبصورتی)',
  },
  'quwwat-e-mudafiat': {
    en: 'Immunity & Heart Wellness',
    hi: 'रोग प्रतिरोधक क्षमता (इम्युनिटी)',
    ur: 'قوت مدافعت (قوت مدافعت و دل)',
  },
};

const remedyHindiNames: Record<string, string> = {
  'jawarish-kamuni-kabir': 'जवारिश कमूनी कबीर (पेट गैस व पाचन संतुलन)',
  'itrifal-ustukhuddus': 'इत्रीफल उसतुखुद्दूस (सिरदर्द, नजला व स्नायु बल)',
  'khamira-gaozaban-ambari': 'खमीरा गाओज़बान अंबरी (हृदय व मस्तिष्क शक्ति)',
  'sharbat-bazoori-motadil': 'शर्बत बज़ूरी मोअतदिल (गुर्दा व लिवर डिटॉक्स)',
  'majun-arshad': 'माजून अरशद (रोग प्रतिरोधक एवं स्फूर्तिदायक)',
  'roghan-surkh': 'रोग़न सुर्ख (जोड़ों व मांसपेशियों का तेल)',
  'safoof-hazim': 'सफूफ हाज़िम (पाचन चूर्ण)',
  'hab-e-asgand': 'हब्ब-ए-अजगंद (जोड़ों के दर्द की गोली)',
  'marham-kafoori': 'मरहम काफूरी (त्वचा शीतलता व जलन निवारक)',
  'sharbat-sadar': 'शर्बत सदर (फेफड़े व खांसी सिरप)',
  'lauq-sapistan': 'लऊक सपिस्तां (गले की खराश व नजला चाशनी)',
  'arq-kasni': 'अर्क कासनी (लिवर शीतलता अर्क)',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ifaqa_language') as LanguageCode;
      if (saved && (saved === 'en' || saved === 'hi' || saved === 'ur')) {
        setLanguageState(saved);
      }
    } catch (_) {
      // ignore
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('ifaqa_language', lang);
    } catch (_) {
      // ignore
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const getRemedyTitle = (remedy: { name: string; urduName?: string; romanUrduName?: string; slug?: string }) => {
    if (language === 'hi' && remedy.slug && remedyHindiNames[remedy.slug]) {
      return remedyHindiNames[remedy.slug];
    }
    if (language === 'ur' && remedy.urduName) {
      return remedy.urduName;
    }
    // Default English
    return remedy.name;
  };

  const getRemedySubtitle = (remedy: { name: string; urduName?: string; romanUrduName?: string; form?: string }) => {
    if (language === 'ur') {
      return remedy.romanUrduName || remedy.name;
    }
    if (language === 'hi') {
      return `शुद्ध शास्त्रीय ${remedy.form || 'औषधि'}`;
    }
    // Default English: clean botanical / formulation indicator
    return `Classical Pure Formulation • ${remedy.form || 'Remedy'}`;
  };

  const getCategoryTitle = (cat: { id: string; name: string; urduName?: string }) => {
    const slug = cat.id.toLowerCase();
    if (categoryTranslations[slug]) {
      return categoryTranslations[slug][language] || categoryTranslations[slug].en;
    }
    return cat.name;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getRemedyTitle,
        getRemedySubtitle,
        getCategoryTitle,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
