'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, getLanguageMeta } from '@/lib/languages';
import { setActiveTranslationLanguage } from '@/lib/auto-translate';

export type LanguageCode = string;

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isTranslating: boolean;
  supportedLanguages: SupportedLanguage[];
  currentLanguageMeta: SupportedLanguage;
  t: (key: string) => string;
  getRemedyTitle: (remedy: { name: string; urduName?: string; romanUrduName?: string; slug?: string }) => string;
  getRemedySubtitle: (remedy: { name: string; urduName?: string; romanUrduName?: string; form?: string }) => string;
  getCategoryTitle: (cat: { id: string; name: string; urduName?: string }) => string;
}

const baseLabels: Record<string, string> = {
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

  trustPillar1Title: 'Whole herbs and natural resins',
  trustPillar1Desc:
    'Prepared from wildcrafted roots, seeds, and natural honey without synthetic fillers or steroids.',
  trustPillar2Title: 'Small-batch Saharanpur crafting',
  trustPillar2Desc:
    'Every syrups, powder, and electuary batch follows traditional Unani and Ayurvedic decoction methods.',
  trustPillar3Title: 'Direct courier across India',
  trustPillar3Desc:
    'Orders ship in protective UV-shielded containers with tracking sent to your mobile number.',

  cartEmptyTitle: 'Your cart is empty',
  cartEmptyDesc: 'Browse single-herb powders, electuaries, syrups, and botanical oils.',
  shopProducts: 'Browse catalog',
  itemsInCart: 'items',
  itemInCart: 'item',
  proceedToCheckout: 'Proceed to checkout',
  viewFullCart: 'View cart',
  gstIncluded: 'Taxes included at checkout',

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
};

const categoryDefaultTitles: Record<string, string> = {
  hazim: 'Digestive & Gastrointestinal Care',
  muqawwi: 'Vitality & General Tonics',
  sual: 'Respiratory & Throat Wellness',
  mafasil: 'Joints & Musculoskeletal Relief',
  jild: 'Skin & Blood Purification',
  'quwwat-e-mudafiat': 'Immunity & Longevity',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Restore saved preference cleanly after initial hydration
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ifaqa_language');
      if (saved && saved.trim()) {
        setLanguageState(saved.trim());
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Fixed LTR layout ALWAYS — auto-translate visible DOM nodes cleanly into active language
  useEffect(() => {
    setActiveTranslationLanguage(language, setIsTranslating);
  }, [language]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    const clean = (lang || 'en').trim() || 'en';
    setLanguageState(clean);
    try {
      window.localStorage.setItem('ifaqa_language', clean);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback((key: string): string => {
    return baseLabels[key] || key;
  }, []);

  const getRemedyTitle = useCallback(
    (remedy: { name: string }) => remedy?.name || '',
    []
  );

  const getRemedySubtitle = useCallback(
    (remedy: { form?: string }) => `Herbal ${remedy?.form || 'Remedy'}`,
    []
  );

  const getCategoryTitle = useCallback(
    (cat: { id?: string; name?: string }) => {
      if (cat?.name && cat.name !== cat.id) return cat.name;
      const slug = (cat?.id || '').toLowerCase();
      return categoryDefaultTitles[slug] || cat?.name || '';
    },
    []
  );

  const currentLanguageMeta = getLanguageMeta(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isTranslating,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageMeta,
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
