'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'ur';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  getRemedyTitle: (remedy: { name: string; urduName?: string; romanUrduName?: string; slug?: string }) => string;
  getRemedySubtitle: (remedy: { name: string; urduName?: string; romanUrduName?: string; form?: string }) => string;
  getCategoryTitle: (cat: { id: string; name: string; urduName?: string }) => string;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    catalog: 'Catalog',
    cart: 'Cart',
    checkout: 'Checkout',
    signIn: 'Sign in',
    account: 'Account',
    signOut: 'Sign out',
    searchPlaceholder: 'Search',
    filter: 'Filter',
    allFormulations: 'All remedies',
    inStockOnly: 'In stock only',
    outOfStock: 'Out of stock',
    addToCart: 'Add to cart',
    addedToCart: 'Added',
    freeShippingNotice: 'Pan-India courier dispatch from Saharanpur, U.P.',
    explorePharmacopoeia: 'Shop products',
    viewDetails: 'View details',
    therapeuticIndications: 'Health benefits',
    activeIngredients: 'Ingredients',
    dosageAndVehicle: 'Usage and dosage',
    packagingDetails: 'Packaging details',
    genuineQuality: 'Pure botanical preparations',
    freeDelivery: 'Pan-India dispatch',
    ayurvedicUnaniHeritage: 'Unani and Ayurvedic tradition',
    categoriesTitle: 'Shop by health need',
    featuredTitle: 'Popular remedies',
    bestSellerBadge: 'Popular',
    classicalStandard: 'Pure herbal formula',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    orderConfirmation: 'Order confirmed',
    languageName: 'English',
    languageSelect: 'Language',

    // Trust & Features
    trustPillar1Title: 'Whole herbs and natural resins',
    trustPillar1Desc: 'Prepared from wildcrafted roots, seeds, and natural honey without synthetic fillers or steroids.',
    trustPillar2Title: 'Small-batch Saharanpur crafting',
    trustPillar2Desc: 'Every syrups, powder, and electuary batch follows traditional Unani and Ayurvedic decoction methods.',
    trustPillar3Title: 'Direct courier across India',
    trustPillar3Desc: 'Orders ship in protective UV-shielded containers with tracking sent to your mobile number.',

    // Cart
    cartEmptyTitle: 'Your cart is empty',
    cartEmptyDesc: 'Browse single-herb powders, electuaries, syrups, and botanical oils.',
    shopProducts: 'Browse catalog',
    itemsInCart: 'items',
    itemInCart: 'item',
    proceedToCheckout: 'Proceed to checkout',
    viewFullCart: 'View cart',
    gstIncluded: 'Taxes included at checkout',

    // Auth & Sign In
    customerLogin: 'Sign in',
    signInSubtitle: 'Enter your 10-digit Indian mobile number to receive a one-time passcode.',
    mobileNumber: 'Mobile number',
    sendOtp: 'Get passcode',
    verifying: 'Verifying',
    demoLogin: 'Use test account (+91 97298 40336)',
    demoLoginSubtitle: 'Try the customer account view without waiting for SMS.',
    enterOtp: 'Enter 6-digit code',
    otpSentTo: 'Code sent to',
    verifyAndLogin: 'Verify and sign in',
    resendOtp: 'Resend code',
    changeNumber: 'Change number',
    welcomeBack: 'Signed in',
    accountActive: 'Your customer account is active.',
    orderTrackingPerk: 'Order tracking',
    orderTrackingPerkDesc: 'View order confirmation and courier tracking updates by mobile.',
    qualityPerk: 'Verified herbal batches',
    qualityPerkDesc: 'Prepared cleanly from natural roots, spices, and honey.',
    privacyPerk: 'Private customer records',
    privacyPerkDesc: 'Your phone number and delivery address remain confidential.',
  },
  hi: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    contact: 'संपर्क करें',
    privacyPolicy: 'गोपनीयता नीति',
    catalog: 'सभी उत्पाद',
    cart: 'कार्ट',
    checkout: 'चेकआउट',
    signIn: 'लॉग इन',
    account: 'मेरा खाता',
    signOut: 'लॉग आउट',
    searchPlaceholder: 'खोजें',
    filter: 'फ़िल्टर',
    allFormulations: 'सभी उत्पाद',
    inStockOnly: 'केवल उपलब्ध स्टॉक',
    outOfStock: 'स्टॉक समाप्त',
    addToCart: 'कार्ट में जोड़ें',
    addedToCart: 'जोड़ा गया',
    freeShippingNotice: 'सहारनपुर (उ.प्र.) से पूरे भारत में कूरियर डिस्पैच',
    explorePharmacopoeia: 'उत्पाद देखें',
    viewDetails: 'विवरण देखें',
    therapeuticIndications: 'स्वास्थ्य लाभ',
    activeIngredients: 'प्रमुख जड़ी-बूटियां',
    dosageAndVehicle: 'सेवन विधि एवं मात्रा',
    packagingDetails: 'पैकिंग विवरण',
    genuineQuality: 'शुद्ध जड़ी-बूटियों से निर्मित',
    freeDelivery: 'पूरे भारत में डिलीवरी',
    ayurvedicUnaniHeritage: 'यूनानी एवं आयुर्वेदिक परंपरा',
    categoriesTitle: 'स्वास्थ्य श्रेणी के अनुसार',
    featuredTitle: 'प्रमुख उत्पाद',
    bestSellerBadge: 'लोकप्रिय',
    classicalStandard: 'शुद्ध प्राकृतिक फॉर्मूला',
    subtotal: 'उप-योग',
    shipping: 'डिलीवरी शुल्क',
    total: 'कुल राशि',
    orderConfirmation: 'ऑर्डर कन्फर्म हुआ',
    languageName: 'हिंदी',
    languageSelect: 'भाषा',

    // Trust & Features
    trustPillar1Title: 'शुद्ध जड़ी-बूटियां और प्राकृतिक अर्क',
    trustPillar1Desc: 'असली जड़ों, बीजों और प्राकृतिक शहद से तैयार, बिना किसी हानिकारक केमिकल या स्टेरॉयड के।',
    trustPillar2Title: 'सहारनपुर में छोटे बैच निर्माण',
    trustPillar2Desc: 'प्रत्येक माजून, सफूफ और शर्बत पारंपरिक यूनानी और आयुर्वेदिक विधि से बनाया जाता है।',
    trustPillar3Title: 'पूरे भारत में सुरक्षित कूरियर',
    trustPillar3Desc: 'मजबूत पैकिंग में 24 घंटे में डिस्पैच और आपके मोबाइल नंबर पर लाइव ट्रैकिंग।',

    // Cart
    cartEmptyTitle: 'आपकी कार्ट खाली है',
    cartEmptyDesc: 'पाचन, शक्ति, खांसी और जोड़ों के स्वास्थ्य के लिए प्राकृतिक उत्पाद देखें।',
    shopProducts: 'सभी उत्पाद देखें',
    itemsInCart: 'उत्पाद',
    itemInCart: 'उत्पाद',
    proceedToCheckout: 'चेकआउट करें',
    viewFullCart: 'पूरी कार्ट देखें',
    gstIncluded: 'सभी कर शामिल',

    // Auth & Sign In
    customerLogin: 'ग्राहक लॉग इन',
    signInSubtitle: 'वन-टाइम पासकोड पाने के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'OTP प्राप्त करें',
    verifying: 'सत्यापन जारी',
    demoLogin: 'टेस्ट खाते से लॉग इन करें (+91 97298 40336)',
    demoLoginSubtitle: 'बिना SMS इंतज़ार किए खाता देखने के लिए।',
    enterOtp: '6 अंकों का कोड दर्ज करें',
    otpSentTo: 'भेजा गया कोड:',
    verifyAndLogin: 'सत्यापित करें और आगे बढ़ें',
    resendOtp: 'कोड दोबारा भेजें',
    changeNumber: 'नंबर बदलें',
    welcomeBack: 'लॉग इन सफल',
    accountActive: 'आपका ग्राहक खाता सक्रिय है।',
    orderTrackingPerk: 'ऑर्डर ट्रैकिंग',
    orderTrackingPerkDesc: 'अपने मोबाइल पर ऑर्डर और कूरियर अपडेट देखें।',
    qualityPerk: 'शुद्ध जड़ी-बूटी उत्पाद',
    qualityPerkDesc: 'बिना किसी केमिकल या कृत्रिम मिलावट के तैयार।',
    privacyPerk: 'सुरक्षित जानकारी',
    privacyPerkDesc: 'आपका फोन नंबर और पता हमेशा गोपनीय रहता है।',
  },
  ur: {
    // Navigation
    home: 'ہوم',
    about: 'ہمارے متعلق',
    contact: 'رابطہ کریں',
    privacyPolicy: 'رازداری پالیسی',
    catalog: 'تمام مصنوعات',
    cart: 'ٹوکری',
    checkout: 'چیک آؤٹ',
    signIn: 'لاگ ان',
    account: 'اکاؤنٹ',
    signOut: 'لاگ آؤٹ',
    searchPlaceholder: 'تلاش کریں',
    filter: 'فلٹر',
    allFormulations: 'تمام مصنوعات',
    inStockOnly: 'صرف دستیاب اسٹاک',
    outOfStock: 'دستیاب نہیں',
    addToCart: 'ٹوکری میں شامل کریں',
    addedToCart: 'شامل ہوگیا',
    freeShippingNotice: 'سہارنپور (یوپی) سے پورے بھارت میں کوریئر سروس',
    explorePharmacopoeia: 'مصنوعات دیکھیں',
    viewDetails: 'تفصیلات',
    therapeuticIndications: 'طبی فوائد',
    activeIngredients: 'اجزائے ترکیبی',
    dosageAndVehicle: 'طریقۂ استعمال',
    packagingDetails: 'پیکنگ تفصیلات',
    genuineQuality: 'خالص نباتاتی مرکبات',
    freeDelivery: 'ملک بھر میں ترسیل',
    ayurvedicUnaniHeritage: 'روایتی یونانی اور آیورویدک نسخے',
    categoriesTitle: 'صحت کے نظام کے مطابق',
    featuredTitle: 'نمایاں مرکبات',
    bestSellerBadge: 'مقبول',
    classicalStandard: 'خالص قدرتی فارمولا',
    subtotal: 'میزان',
    shipping: 'ڈلیوری',
    total: 'کل رقم',
    orderConfirmation: 'آرڈر موصول ہوا',
    languageName: 'اردو',
    languageSelect: 'زبان',

    // Trust & Features
    trustPillar1Title: 'خالص جڑی بوٹیاں اور قدرتی شہد',
    trustPillar1Desc: 'اصل جڑوں، بیجوں اور قدرتی شہد سے تیار کردہ، کسی بھی قسم کے کیمیکل سے پاک۔',
    trustPillar2Title: 'سہارنپور میں معیاری تیاری',
    trustPillar2Desc: 'ہر معجون، سفوف اور شربت روایتی یونانی اور آیورویدک اصولوں کے مطابق تیار کیا جاتا ہے۔',
    trustPillar3Title: 'پورے بھارت میں محفوظ ترسیل',
    trustPillar3Desc: 'مضبوط پیکنگ میں 24 گھنٹوں کے اندر روانگی اور موبائل پر ٹریکنگ اپڈیٹ۔',

    // Cart
    cartEmptyTitle: 'آپ کی ٹوکری خالی ہے',
    cartEmptyDesc: 'ہاضمے، طاقت، کھانسی اور جوڑوں کے لیے قدرتی مرکبات دیکھیں۔',
    shopProducts: 'تمام مصنوعات دیکھیں',
    itemsInCart: 'اشیاء',
    itemInCart: 'شے',
    proceedToCheckout: 'چیک آؤٹ کریں',
    viewFullCart: 'ٹوکری دیکھیں',
    gstIncluded: 'ٹیکس چیک آؤٹ پر شامل ہیں',

    // Auth & Sign In
    customerLogin: 'گاہک لاگ ان',
    signInSubtitle: 'ون ٹائم کوڈ حاصل کرنے کے لیے اپنا 10 ہندسوں کا موبائل نمبر درج کریں۔',
    mobileNumber: 'موبائل نمبر',
    sendOtp: 'کوڈ حاصل کریں',
    verifying: 'تصدیق جاری ہے',
    demoLogin: 'ٹیسٹ اکاؤنٹ استعمال کریں (+91 97298 40336)',
    demoLoginSubtitle: 'SMS کے انتظار کے بغیر اکاؤنٹ کا جائزہ لیں۔',
    enterOtp: '6 ہندسوں کا کوڈ درج کریں',
    otpSentTo: 'کوڈ اس نمبر پر بھیجا گیا:',
    verifyAndLogin: 'تصدیق کر کے لاگ ان کریں',
    resendOtp: 'دوبارہ کوڈ بھیجیں',
    changeNumber: 'نمبر تبدیل کریں',
    welcomeBack: 'لاگ ان مکمل',
    accountActive: 'آپ کا اکاؤنٹ فعال ہے۔',
    orderTrackingPerk: 'آرڈر ٹریکنگ',
    orderTrackingPerkDesc: 'موبائل نمبر کے ذریعے آرڈر اور ترسیل کی صورتحال دیکھیں۔',
    qualityPerk: 'خالص جڑی بوٹیاں',
    qualityPerkDesc: 'کیمیکلز سے پاک اصلی نباتاتی مرکبات۔',
    privacyPerk: 'محفوظ رازداری',
    privacyPerkDesc: 'آپ کا نمبر اور پتہ ہمیشہ خفیہ رہتا ہے۔',
  },
};

const categoryTranslations: Record<string, { en: string; hi: string; ur: string }> = {
  hazim: {
    en: 'Digestive and stomach care',
    hi: 'पाचन एवं पेट स्वास्थ्य',
    ur: 'ہاضمہ اور معدہ',
  },
  muqawwi: {
    en: 'Energy and vitality',
    hi: 'ऊर्जा एवं शारीरिक शक्ति',
    ur: 'طاقت اور توانائی',
  },
  sual: {
    en: 'Cough and respiratory care',
    hi: 'खांसी, फेफड़े एवं श्वसन',
    ur: 'کھانسی اور سانس',
  },
  mafasil: {
    en: 'Joint and muscle relief',
    hi: 'जोड़ों एवं मांसपेशियों का दर्द',
    ur: 'جوڑوں اور پٹھوں کا درد',
  },
  jild: {
    en: 'Skin and beauty care',
    hi: 'त्वचा एवं सौंदर्य देखभाल',
    ur: 'جلد اور حسن',
  },
  'quwwat-e-mudafiat': {
    en: 'Immunity and heart wellness',
    hi: 'रोग प्रतिरोधक क्षमता',
    ur: 'قوت مدافعت اور دل',
  },
};

const remedyHindiNames: Record<string, string> = {
  'jawarish-kamuni-kabir': 'जवारिश कमूनी कबीर',
  'itrifal-ustukhuddus': 'इत्रीफल उसतुखुद्दूस',
  'khamira-gaozaban-ambari': 'खमीरा गाओज़बान अंबरी',
  'sharbat-bazoori-motadil': 'शर्बत बज़ूरी मोअतदिल',
  'majun-arshad': 'माजून अरशद',
  'roghan-surkh': 'रोग़न सुर्ख',
  'safoof-hazim': 'सफूफ हाज़िम',
  'hab-e-asgand': 'हब्ब-ए-अजगंद',
  'marham-kafoori': 'मरहम काफूरी',
  'sharbat-sadar': 'शर्बत सदर',
  'lauq-sapistan': 'लऊक सपिस्तां',
  'arq-kasni': 'अर्क कासनी',
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

  // Sync HTML lang and dir for proper RTL Urdu layout (per references/rtl.md)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    }
  }, [language]);

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
    return remedy.name;
  };

  const getRemedySubtitle = (remedy: { name: string; urduName?: string; romanUrduName?: string; form?: string }) => {
    if (language === 'ur') {
      return remedy.romanUrduName || remedy.name;
    }
    if (language === 'hi') {
      return `शुद्ध ${remedy.form || 'हर्बल उत्पाद'}`;
    }
    return `Herbal ${remedy.form || 'Remedy'}`;
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
