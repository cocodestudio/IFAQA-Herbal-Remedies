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
    about: 'About Us',
    contact: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    catalog: 'All Products',
    cart: 'Cart',
    checkout: 'Checkout',
    signIn: 'Sign In',
    account: 'My Account',
    signOut: 'Sign Out',
    searchPlaceholder: 'Search products, herbal ingredients, or health needs...',
    filter: 'Filters',
    allFormulations: 'All Products',
    inStockOnly: 'In Stock Only',
    outOfStock: 'Out of Stock',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    freeShippingNotice: 'Free Delivery across India on orders above ₹999',
    explorePharmacopoeia: 'Shop All Products',
    viewDetails: 'View Details',
    therapeuticIndications: 'Health Benefits',
    activeIngredients: 'Natural Ingredients',
    dosageAndVehicle: 'How to Use & Dosage',
    packagingDetails: 'Packaging Details',
    genuineQuality: '100% Genuine Herbal Products',
    freeDelivery: 'Fast Pan-India Delivery',
    ayurvedicUnaniHeritage: 'Authentic Ayurvedic & Unani Tradition',
    categoriesTitle: 'Shop by Health Category',
    featuredTitle: 'Popular Herbal Remedies',
    bestSellerBadge: 'Best Seller',
    classicalStandard: '100% Natural Formula',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    orderConfirmation: 'Order Confirmed',
    languageName: 'English',
    languageSelect: 'Select Language',

    // Trust & Features
    trustPillar1Title: '100% Natural & Herbal',
    trustPillar1Desc: 'Formulated with pure botanical extracts, herbs, and natural ingredients with zero artificial chemicals.',
    trustPillar2Title: 'Authentic Traditional Recipes',
    trustPillar2Desc: 'Prepared using time-tested Ayurvedic and Unani traditions trusted for generations.',
    trustPillar3Title: 'Fast Pan-India Delivery',
    trustPillar3Desc: 'Carefully packed and delivered directly to your doorstep across 19,000+ pincodes in India.',

    // Cart
    cartEmptyTitle: 'Your Cart is Empty',
    cartEmptyDesc: 'Discover our wide range of pure herbal products for health, vitality, and wellness.',
    shopProducts: 'Shop Products',
    itemsInCart: 'items in cart',
    itemInCart: 'item in cart',
    proceedToCheckout: 'Proceed to Checkout',
    viewFullCart: 'View Full Cart',
    gstIncluded: 'Taxes included • 100% Genuine Products',

    // Auth & Sign In
    customerLogin: 'Customer Login',
    signInSubtitle: 'Enter your mobile number to get a one-time password (OTP) and manage your orders.',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Get OTP',
    verifying: 'Verifying...',
    demoLogin: '1-Click Instant Demo Login',
    demoLoginSubtitle: 'Quick access for instant review without SMS waiting.',
    enterOtp: 'Enter 6-Digit OTP',
    otpSentTo: 'Enter the 6-digit code sent to',
    verifyAndLogin: 'Verify & Sign In',
    resendOtp: 'Resend Code',
    changeNumber: 'Change Number',
    welcomeBack: 'Welcome Back',
    accountActive: 'Your customer account is active.',
    orderTrackingPerk: 'Track Your Orders',
    orderTrackingPerkDesc: 'Real-time courier updates and delivery status to your pincode.',
    qualityPerk: '100% Genuine & Natural',
    qualityPerkDesc: 'Pure herbal extracts without harmful synthetic chemicals.',
    privacyPerk: '100% Secure & Confidential',
    privacyPerkDesc: 'Your personal information is always safe and never shared.',
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
    searchPlaceholder: 'दवा, जड़ी-बूटी या स्वास्थ्य समस्या खोजें...',
    filter: 'फ़िल्टर',
    allFormulations: 'सभी उत्पाद',
    inStockOnly: 'केवल उपलब्ध स्टॉक',
    outOfStock: 'स्टॉक समाप्त',
    addToCart: 'कार्ट में जोड़ें',
    addedToCart: 'कार्ट में जोड़ा गया',
    freeShippingNotice: '₹999 से अधिक के ऑर्डर पर पूरे भारत में मुफ़्त डिलीवरी',
    explorePharmacopoeia: 'सभी उत्पाद देखें',
    viewDetails: 'विवरण देखें',
    therapeuticIndications: 'स्वास्थ्य लाभ व उपयोगिता',
    activeIngredients: 'प्रमुख जड़ी-बूटियां',
    dosageAndVehicle: 'सेवन विधि एवं मात्रा',
    packagingDetails: 'पैकिंग विवरण',
    genuineQuality: '100% शुद्ध आयुर्वेदिक व यूनानी उत्पाद',
    freeDelivery: 'पूरे भारत में तेज़ डिलीवरी',
    ayurvedicUnaniHeritage: 'प्राचीन आयुर्वेदिक एवं यूनानी परंपरा',
    categoriesTitle: 'कैटेगरी के अनुसार उत्पाद',
    featuredTitle: 'लोकप्रिय असरदार उत्पाद',
    bestSellerBadge: 'बेस्ट सेलर',
    classicalStandard: '100% प्राकृतिक फॉर्मूला',
    subtotal: 'उप-योग (Subtotal)',
    shipping: 'डिलीवरी शुल्क',
    total: 'कुल राशि',
    orderConfirmation: 'ऑर्डर सफल हुआ',
    languageName: 'हिंदी',
    languageSelect: 'भाषा चुनें',

    // Trust & Features
    trustPillar1Title: '100% शुद्ध एवं प्राकृतिक',
    trustPillar1Desc: 'असली जड़ी-बूटियों और शुद्ध अर्क से तैयार, बिना किसी हानिकारक केमिकल के।',
    trustPillar2Title: 'पारंपरिक असरदार नुस्खे',
    trustPillar2Desc: 'सदियों पुरानी यूनानी व आयुर्वेदिक परंपराओं के अनुसार तैयार प्रमाणिक औषधियां।',
    trustPillar3Title: 'पूरे भारत में सुरक्षित डिलीवरी',
    trustPillar3Desc: 'भारत के 19,000+ पिनकोड पर सुरक्षित पैकेजिंग के साथ घर तक डिलीवरी।',

    // Cart
    cartEmptyTitle: 'आपकी कार्ट खाली है',
    cartEmptyDesc: 'स्वास्थ्य और ऊर्जा के लिए हमारे शुद्ध प्राकृतिक उत्पादों को एक्सप्लोर करें।',
    shopProducts: 'उत्पाद देखें',
    itemsInCart: 'उत्पाद कार्ट में हैं',
    itemInCart: 'उत्पाद कार्ट में है',
    proceedToCheckout: 'चेकआउट करें',
    viewFullCart: 'पूरी कार्ट देखें',
    gstIncluded: 'सभी टैक्स शामिल • 100% असली उत्पाद',

    // Auth & Sign In
    customerLogin: 'ग्राहक लॉग इन',
    signInSubtitle: 'अपने ऑर्डर देखने और ट्रैक करने के लिए अपना मोबाइल नंबर दर्ज करें।',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'OTP प्राप्त करें',
    verifying: 'सत्यापित हो रहा है...',
    demoLogin: '1-क्लिक डेमो लॉग इन (तुरंत टेस्ट करें)',
    demoLoginSubtitle: 'SMS का इंतज़ार किए बिना तुरंत टेस्ट करने के लिए क्लिक करें।',
    enterOtp: '6 अंकों का OTP दर्ज करें',
    otpSentTo: 'इस नंबर पर भेजा गया कोड दर्ज करें:',
    verifyAndLogin: 'सत्यापित करें और लॉग इन करें',
    resendOtp: 'दोबारा कोड भेजें',
    changeNumber: 'नंबर बदलें',
    welcomeBack: 'स्वागत है',
    accountActive: 'आपका ग्राहक खाता सक्रिय है।',
    orderTrackingPerk: 'ऑर्डर ट्रैक करें',
    orderTrackingPerkDesc: 'अपने ऑर्डर की डिलीवरी स्थिति और लाइव ट्रैकिंग देखें।',
    qualityPerk: '100% असली व प्राकृतिक',
    qualityPerkDesc: 'बिना किसी केमिकल या स्टेरॉयड के शुद्ध जड़ी-बूटियां।',
    privacyPerk: '100% सुरक्षित व गोपनीय',
    privacyPerkDesc: 'आपकी निजी जानकारी हमेशा सुरक्षित रहती है और कभी शेयर नहीं की जाती।',
  },
  ur: {
    // Navigation
    home: 'ہوم',
    about: 'ہمارے متعلق',
    contact: 'ہم سے رابطہ',
    privacyPolicy: 'رازداری پالیسی',
    catalog: 'تمام مصنوعات',
    cart: 'ٹوکری',
    checkout: 'چیک آؤٹ',
    signIn: 'لاگ ان',
    account: 'میرا اکاؤنٹ',
    signOut: 'لاگ آؤٹ',
    searchPlaceholder: 'دوا، جڑی بوٹی یا مرض تلاش کریں...',
    filter: 'فلٹرز',
    allFormulations: 'تمام مصنوعات',
    inStockOnly: 'صرف دستیاب اسٹاک',
    outOfStock: 'دستیاب نہیں',
    addToCart: 'ٹوکری میں شامل کریں',
    addedToCart: 'شامل کر دیا گیا',
    freeShippingNotice: '999 روپے سے زائد کے آرڈر پر پورے بھارت میں مفت ڈلیوری',
    explorePharmacopoeia: 'تمام مصنوعات دیکھیں',
    viewDetails: 'تفصیلات دیکھیں',
    therapeuticIndications: 'طبی فوائد و علامات',
    activeIngredients: 'خالص اجزائے ترکیبی',
    dosageAndVehicle: 'طریقۂ استعمال و خوراک',
    packagingDetails: 'پیکنگ تفصیلات',
    genuineQuality: '100% خالص یونانی و نباتاتی ادویات',
    freeDelivery: 'تیز رفتار ڈلیوری',
    ayurvedicUnaniHeritage: 'مستند یونانی و نباتاتی روایت',
    categoriesTitle: 'امراض و نظام کے مطابق',
    featuredTitle: 'خاص اور مؤثر مرکبات',
    bestSellerBadge: 'نمایاں ترین',
    classicalStandard: '100% قدرتی فارمولا',
    subtotal: 'میزان (Subtotal)',
    shipping: 'ڈلیوری چارجز',
    total: 'کل رقم',
    orderConfirmation: 'آرڈر کامیاب',
    languageName: 'اردو',
    languageSelect: 'زبان منتخب کریں',

    // Trust & Features
    trustPillar1Title: '100% خالص اور نباتاتی',
    trustPillar1Desc: 'خالص جڑی بوٹیوں سے تیار کردہ، کسی بھی قسم کے کیمیکل سے پاک۔',
    trustPillar2Title: 'مستند روایتی نسخے',
    trustPillar2Desc: 'صدیوں پرانی یونانی اور آیورویدک کتب کے مطابق تیار کردہ ادویات۔',
    trustPillar3Title: 'محفوظ تیز رفتار ڈلیوری',
    trustPillar3Desc: 'پوری حفاظت کے ساتھ آپ کی دہلیز تک تیز رفتار ترسیل۔',

    // Cart
    cartEmptyTitle: 'آپ کی ٹوکری خالی ہے',
    cartEmptyDesc: 'صحت اور توانائی کے لیے ہمارے خالص قدرتی مرکبات دیکھیں۔',
    shopProducts: 'مصنوعات دیکھیں',
    itemsInCart: 'اشیاء ٹوکری میں ہیں',
    itemInCart: 'شے ٹوکری میں ہے',
    proceedToCheckout: 'چیک آؤٹ کریں',
    viewFullCart: 'پوری ٹوکری دیکھیں',
    gstIncluded: 'ٹیکس شامل ہے • 100% اصلی مصنوعات',

    // Auth & Sign In
    customerLogin: 'گاہک لاگ ان',
    signInSubtitle: 'اپنا آرڈر دیکھنے اور ٹریک کرنے کے لیے موبائل نمبر درج کریں۔',
    mobileNumber: 'موبائل نمبر',
    sendOtp: 'OTP حاصل کریں',
    verifying: 'تصدیق ہو رہی ہے...',
    demoLogin: '1-کلک فوری ڈیمو لاگ ان',
    demoLoginSubtitle: 'SMS کے بغیر فوری ٹیسٹنگ کے لیے کلک کریں۔',
    enterOtp: '6 ہندسوں کا OTP درج کریں',
    otpSentTo: 'کوڈ اس نمبر پر بھیجا گیا ہے:',
    verifyAndLogin: 'تصدیق کر کے لاگ ان کریں',
    resendOtp: 'دوبارہ کوڈ بھیجیں',
    changeNumber: 'نمبر تبدیل کریں',
    welcomeBack: 'خوش آمدید',
    accountActive: 'آپ کا اکاؤنٹ فعال ہے۔',
    orderTrackingPerk: 'آرڈر ٹریک کریں',
    orderTrackingPerkDesc: 'اپنے آرڈر کی ترسیل اور لائیو اسٹیٹس دیکھیں۔',
    qualityPerk: '100% خالص و قدرتی',
    qualityPerkDesc: 'کیمیکلز سے پاک اصلی جڑی بوٹیاں۔',
    privacyPerk: '100% محفوظ و رازدارانہ',
    privacyPerkDesc: 'آپ کی معلومات ہمیشہ محفوظ اور خفیہ رہتی ہیں۔',
  },
};

const categoryTranslations: Record<string, { en: string; hi: string; ur: string }> = {
  hazim: {
    en: 'Digestive & Stomach Care',
    hi: 'पाचन एवं पेट स्वास्थ्य',
    ur: 'ہاضم (معدہ و ہاضمہ)',
  },
  muqawwi: {
    en: 'Energy & Vitality',
    hi: 'ऊर्जा एवं शारीरिक शक्ति',
    ur: 'مقوی (طاقت و توانائی)',
  },
  sual: {
    en: 'Cough & Respiratory Care',
    hi: 'खांसी, फेफड़े एवं श्वसन',
    ur: 'سعال (کھانسی و سانس)',
  },
  mafasil: {
    en: 'Joint & Muscle Relief',
    hi: 'जोड़ों एवं मांसपेशियों का दर्द',
    ur: 'مفاصل (جوڑوں کا درد)',
  },
  jild: {
    en: 'Skin & Beauty Care',
    hi: 'त्वचा एवं सौंदर्य देखभाल',
    ur: 'جلد (جلدی امراض و حسن)',
  },
  'quwwat-e-mudafiat': {
    en: 'Immunity & Heart Wellness',
    hi: 'रोग प्रतिरोधक क्षमता (इम्युनिटी)',
    ur: 'قوت مدافعت (مدافعت و دل)',
  },
};

const remedyHindiNames: Record<string, string> = {
  'jawarish-kamuni-kabir': 'जवारिश कमूनी कबीर (पेट गैस व पाचन संतुलन)',
  'itrifal-ustukhuddus': 'इत्रीफल उसतुखुद्दूस (सिरदर्द व स्नायु बल)',
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
    return remedy.name;
  };

  const getRemedySubtitle = (remedy: { name: string; urduName?: string; romanUrduName?: string; form?: string }) => {
    if (language === 'ur') {
      return remedy.romanUrduName || remedy.name;
    }
    if (language === 'hi') {
      return `शुद्ध प्राकृतिक ${remedy.form || 'उत्पाद'}`;
    }
    return `100% Pure Natural • ${remedy.form || 'Remedy'}`;
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
