'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  ShieldCheck,
  Lock,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ShoppingBag,
  Truck,
  Leaf,
  Check
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { user, isAuthenticated, signInWithTestAccount, signOut } = useAuth();
  const { language, t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);

  // Content dictionary for dynamic translation
  const content = {
    en: {
      badge: 'Secure Customer Login',
      title: 'Sign In to Your Account',
      subtitle: 'Enter your 10-digit mobile number to receive a one-time password (OTP) and track your orders.',
      perksTitle: 'Why Sign In?',
      perksSubtitle: 'Manage your delivery address, check order status, and reorder quickly.',
      trackTitle: 'Track Orders Live',
      trackDesc: 'Get real-time SMS and tracking updates on all your orders across India.',
      genuineTitle: '100% Genuine Herbal Products',
      genuineDesc: 'Pure Ayurvedic and Unani formulas crafted from authentic natural ingredients.',
      secureTitle: 'Safe & Confidential',
      secureDesc: 'Your personal data and order details are strictly protected and never shared.',
      deliveryTitle: 'Fast Pan-India Delivery',
      deliveryDesc: 'Quick and secure doorstep delivery to all 19,000+ pincodes in India.',
      mobileLabel: 'Mobile Number',
      placeholder: '98765 43210',
      helpText: 'We will send a 6-digit verification code to this number.',
      sendOtpBtn: 'Get OTP',
      demoTitle: 'Quick Testing & Review',
      demoDesc: 'Click below to instantly log in with test credentials without waiting for an SMS.',
      demoBtn: '1-Click Instant Demo Login',
      enterOtpTitle: 'Enter Verification Code (OTP)',
      enterOtpSubtitle: 'Enter the 6-digit code sent to +91',
      changeNumber: 'Change Number',
      resendIn: 'Resend code in',
      resendNow: 'Resend Code',
      verifyBtn: 'Verify & Continue',
      bypassDemo: 'Or click here to instantly bypass with demo code (123456)',
      welcomeBack: 'Welcome Back!',
      accountStatus: 'Active Customer Account',
      registeredPhone: 'Registered Phone:',
      browseShop: 'Shop Products',
      signOutBtn: 'Sign Out',
      footer1: '100% Secure Checkout',
      footer2: 'Zero Spam Calls',
      footer3: 'Easy Order Tracking',
      errValidPhone: 'Please enter a valid 10-digit mobile number.',
      errValidOtp: 'Please enter the complete 6-digit verification code.',
    },
    hi: {
      badge: 'सुरक्षित ग्राहक लॉग इन',
      title: 'अपने खाते में लॉग इन करें',
      subtitle: 'अपने ऑर्डर देखने और ट्रैक करने के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
      perksTitle: 'लॉग इन करने के फायदे',
      perksSubtitle: 'अपने पते सुरक्षित रखें, ऑर्डर ट्रैक करें और आसानी से दोबारा खरीदारी करें।',
      trackTitle: 'लाइव ऑर्डर ट्रैकिंग',
      trackDesc: 'पूरे भारत में अपने ऑर्डर की डिलीवरी स्थिति और लाइव अपडेट प्राप्त करें।',
      genuineTitle: '100% असली आयुर्वेदिक औषधियां',
      genuineDesc: 'शुद्ध प्राकृतिक जड़ी-बूटियों से निर्मित, बिना किसी केमिकल के।',
      secureTitle: 'सुरक्षित एवं गोपनीय',
      secureDesc: 'आपकी जानकारी हमेशा सुरक्षित रहती है और किसी तीसरे पक्ष को नहीं दी जाती।',
      deliveryTitle: 'पूरे भारत में तेज़ डिलीवरी',
      deliveryDesc: 'भारत के 19,000+ पिनकोड पर सुरक्षित होम डिलीवरी।',
      mobileLabel: 'मोबाइल नंबर',
      placeholder: '98765 43210',
      helpText: 'हम इस नंबर पर 6 अंकों का OTP भेजेंगे।',
      sendOtpBtn: 'OTP प्राप्त करें',
      demoTitle: 'त्वरित डेमो एक्सेस',
      demoDesc: 'SMS का इंतज़ार किए बिना तुरंत टेस्ट करने के लिए नीचे क्लिक करें।',
      demoBtn: '1-क्लिक डेमो लॉग इन',
      enterOtpTitle: '6 अंकों का OTP दर्ज करें',
      enterOtpSubtitle: 'इस नंबर पर भेजा गया कोड दर्ज करें: +91',
      changeNumber: 'नंबर बदलें',
      resendIn: 'दोबारा भेजें:',
      resendNow: 'दोबारा कोड भेजें',
      verifyBtn: 'सत्यापित करें और आगे बढ़ें',
      bypassDemo: 'या टेस्ट कोड (123456) से तुरंत बाईपास करें',
      welcomeBack: 'स्वागत है!',
      accountStatus: 'सक्रिय ग्राहक खाता',
      registeredPhone: 'पंजीकृत मोबाइल नंबर:',
      browseShop: 'दवाइयां एवं उत्पाद देखें',
      signOutBtn: 'लॉग आउट',
      footer1: '100% सुरक्षित भुगतान',
      footer2: 'कोई स्पैम कॉल नहीं',
      footer3: 'आसान ऑर्डर ट्रैकिंग',
      errValidPhone: 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।',
      errValidOtp: 'कृपया पूरा 6 अंकों का OTP दर्ज करें।',
    },
    ur: {
      badge: 'محفوظ گاہک لاگ ان',
      title: 'اپنے اکاؤنٹ میں لاگ ان کریں',
      subtitle: 'اپنے آرڈرز دیکھنے اور ٹریک کرنے کے لیے 10 ہندسوں کا موبائل نمبر درج کریں۔',
      perksTitle: 'لاگ ان کے فوائد',
      perksSubtitle: 'اپنا پتہ محفوظ کریں، آرڈر ٹریک کریں اور آسانی سے دوبارہ خریداری کریں۔',
      trackTitle: 'لائیو آرڈر ٹریکنگ',
      trackDesc: 'اپنے آرڈر کی ترسیل کی تازہ ترین صورتحال دیکھیں۔',
      genuineTitle: '100% خالص نباتاتی مرکبات',
      genuineDesc: 'اصلی جڑی بوٹیوں سے تیار شدہ، کیمیکلز سے پاک۔',
      secureTitle: 'مکمل طور پر محفوظ و رازدارانہ',
      secureDesc: 'آپ کا ڈیٹا اور معلومات ہمیشہ محفوظ رہتی ہیں۔',
      deliveryTitle: 'تیز رفتار ہوم ڈلیوری',
      deliveryDesc: 'پورے ملک میں محفوظ پیکنگ کے ساتھ ترسیل۔',
      mobileLabel: 'موبائل نمبر',
      placeholder: '98765 43210',
      helpText: 'ہم اس نمبر پر 6 ہندسوں کا کوڈ بھیجیں گے۔',
      sendOtpBtn: 'OTP حاصل کریں',
      demoTitle: 'فوری ڈیمو رسائی',
      demoDesc: 'SMS کے بغیر فوری ٹیسٹنگ کے لیے نیچے کلک کریں۔',
      demoBtn: '1-کلک ڈیمو لاگ ان',
      enterOtpTitle: '6 ہندسوں کا OTP درج کریں',
      enterOtpSubtitle: 'اس نمبر پر بھیجا گیا کوڈ درج کریں: +91',
      changeNumber: 'نمبر تبدیل کریں',
      resendIn: 'دوبارہ کوڈ:',
      resendNow: 'دوبارہ کوڈ بھیجیں',
      verifyBtn: 'تصدیق کر کے آگے بڑھیں',
      bypassDemo: 'یا ٹیسٹ کوڈ (123456) کے ساتھ فوری لاگ ان کریں',
      welcomeBack: 'خوش آمدید!',
      accountStatus: 'فعال گاہک اکاؤنٹ',
      registeredPhone: 'رجسٹرڈ موبائل نمبر:',
      browseShop: 'مصنوعات دیکھیں',
      signOutBtn: 'لاگ آؤٹ',
      footer1: '100% محفوظ ادائیگی',
      footer2: 'کوئی غیر ضروری کال نہیں',
      footer3: 'آسان آرڈر ٹریکنگ',
      errValidPhone: 'براہ کرم 10 ہندسوں کا درست موبائل نمبر درج کریں۔',
      errValidOtp: 'براہ کرم پورا 6 ہندسوں کا کوڈ درج کریں۔',
    },
  };

  const c = content[language] || content.en;

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = phoneNumber.replace(/[^0-9]/g, '');
    if (clean.length < 10) {
      setError(c.errValidPhone);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30);
    }, 500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.replace(/[^0-9]/g, '').slice(0, 6);
      if (pasted.length > 0) {
        const newOtp = [...otpCode];
        for (let i = 0; i < 6; i++) {
          newOtp[i] = pasted[i] || '';
        }
        setOtpCode(newOtp);
        const nextInput = document.getElementById(`otp-input-${Math.min(pasted.length, 5)}`);
        nextInput?.focus();
      }
      return;
    }

    const newOtp = [...otpCode];
    newOtp[index] = value.replace(/[^0-9]/g, '');
    setOtpCode(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const fullCode = otpCode.join('');

    if (fullCode.length < 6) {
      setError(c.errValidOtp);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const formatted = phoneNumber.startsWith('+91')
        ? phoneNumber
        : `+91 ${phoneNumber.trim()}`;
      signInWithTestAccount(formatted);
      router.push('/');
    }, 500);
  };

  const handleDemoSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signInWithTestAccount('+91 98765 43210');
      router.push('/');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24 w-full">
      {/* 1. Full-Width Clean Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen py-16 md:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-ifaqa-sand/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.2)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative w-full max-w-[1720px] mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">{t('home')}</Link>
            <span>/</span>
            <span className="text-white font-bold">{c.badge}</span>
          </div>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 bg-[#FAF5EC] text-ifaqa-plum font-serif font-bold text-xs uppercase tracking-wider border border-[#DFBA73] shadow-sm">
              {c.badge}
            </span>
          </div>

          <div className="max-w-4xl space-y-2">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              {c.title}
            </h1>
            <p className="text-sm sm:text-base text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-3xl">
              {c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Login Sanctuary Card (12 Columns) */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 -mt-8 sm:-mt-10 z-10 relative">
        <div className="bg-white border-2 border-ifaqa-sand/70 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Customer Perks (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-ifaqa-sand/40 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-2.5 bg-white border border-ifaqa-sand/60 shadow-md">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Herbal Remedies"
                  width={160}
                  height={56}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="space-y-1.5">
                <h2 className="font-serif text-2xl font-bold text-white leading-snug">
                  {c.perksTitle}
                </h2>
                <p className="text-xs text-ifaqa-linen/90 font-sans leading-relaxed">
                  {c.perksSubtitle}
                </p>
              </div>

              {/* Perks List */}
              <div className="space-y-4 pt-2 text-xs font-sans text-ifaqa-linen/95">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">
                      {c.trackTitle}
                    </span>
                    <p className="text-ifaqa-linen/80 text-[11px] mt-0.5 leading-relaxed">
                      {c.trackDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">
                      {c.genuineTitle}
                    </span>
                    <p className="text-ifaqa-linen/80 text-[11px] mt-0.5 leading-relaxed">
                      {c.genuineDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/50 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">
                      {c.secureTitle}
                    </span>
                    <p className="text-ifaqa-linen/80 text-[11px] mt-0.5 leading-relaxed">
                      {c.secureDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20 text-xs font-serif text-ifaqa-sand flex items-center justify-between">
              <span>{c.footer1}</span>
              <span>• {c.footer3}</span>
            </div>
          </div>

          {/* Right Column: Clean Login Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white space-y-6">
            {isAuthenticated && user ? (
              /* Logged In State */
              <div className="space-y-6 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{c.accountStatus}</span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
                    {c.welcomeBack}
                  </h2>
                  <p className="text-xs text-ifaqa-blackberry font-sans">
                    {t('accountActive')}
                  </p>
                </div>

                <div className="p-5 bg-[#FAF5EC] border border-ifaqa-sand/60 space-y-2.5 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">{c.registeredPhone}</span>
                    <span className="font-mono font-bold text-ifaqa-plum text-sm">{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2">
                    <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">Currency:</span>
                    <span className="font-mono font-bold text-ifaqa-plum">INR (₹)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link href="/catalog" className="flex-1">
                    <Button3D variant="primary" size="md" className="w-full justify-center font-bold uppercase text-xs">
                      <ShoppingBag className="w-4 h-4 mr-2 text-ifaqa-sand" />
                      <span>{c.browseShop}</span>
                    </Button3D>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-ifaqa-plum hover:bg-red-50 hover:text-red-800 border-2 border-ifaqa-sand/70 text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{c.signOutBtn}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Phone / OTP Login */
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
                    {step === 'phone' ? c.title : c.enterOtpTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-1.5 leading-relaxed">
                    {step === 'phone' ? c.subtitle : `${c.enterOtpSubtitle} ${phoneNumber}`}
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border-l-4 border-red-700 text-red-900 text-xs font-sans flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-700 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {step === 'phone' ? (
                  /* Step 1: Phone input */
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                        {c.mobileLabel} *
                      </label>
                      <div className="flex border-2 border-ifaqa-sand/70 focus-within:border-ifaqa-plum transition-colors shadow-sm bg-white">
                        <span className="inline-flex items-center px-3.5 bg-[#FAF5EC] border-r border-ifaqa-sand/60 text-xs font-mono font-bold text-ifaqa-plum">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          placeholder={c.placeholder}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 px-4 py-3 text-sm font-mono tracking-wider text-ifaqa-plum placeholder:text-ifaqa-blackberry/50 focus:outline-none bg-transparent"
                          autoFocus
                          maxLength={12}
                        />
                      </div>
                      <p className="text-[11px] text-ifaqa-blackberry/80 font-sans mt-1.5">
                        {c.helpText}
                      </p>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center font-bold text-xs uppercase tracking-wider shadow-md py-3.5"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>{t('verifying')}</span>
                      ) : (
                        <>
                          <span>{c.sendOtpBtn}</span>
                          <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
                        </>
                      )}
                    </Button3D>

                    {/* Quick 1-Click Demo Login */}
                    <div className="pt-3 border-t border-ifaqa-sand/40">
                      <div className="p-4 bg-[#FAF5EC] border border-ifaqa-sand/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-serif uppercase tracking-wider text-ifaqa-plum font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-ifaqa-sand" />
                            <span>{c.demoTitle}</span>
                          </span>
                          <span className="text-[10px] bg-ifaqa-plum text-white px-1.5 py-0.5 font-mono uppercase font-bold">
                            Instant
                          </span>
                        </div>
                        <p className="text-xs text-ifaqa-blackberry font-sans">
                          {c.demoDesc}
                        </p>
                        <button
                          type="button"
                          onClick={handleDemoSignIn}
                          disabled={loading}
                          className="w-full py-2.5 px-4 bg-white border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-ifaqa-sand" />
                          <span>{c.demoBtn}</span>
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Step 2: 6-Digit OTP input */
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold">
                          {c.enterOtpTitle}
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep('phone')}
                          className="text-xs font-serif text-ifaqa-blackberry hover:text-ifaqa-plum underline font-bold"
                        >
                          {c.changeNumber}
                        </button>
                      </div>

                      <div className="grid grid-cols-6 gap-2 sm:gap-3">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            className="w-full h-12 text-center text-lg sm:text-xl font-mono font-bold text-ifaqa-plum bg-white border-2 border-ifaqa-sand/70 focus:border-ifaqa-plum focus:outline-none transition-all shadow-sm"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs font-sans text-ifaqa-blackberry">
                        <span>Didn't receive SMS?</span>
                        {resendTimer > 0 ? (
                          <span className="font-mono text-ifaqa-plum font-bold">
                            {c.resendIn} {resendTimer}s
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setResendTimer(30);
                              setError(null);
                            }}
                            className="text-ifaqa-plum font-bold underline hover:text-ifaqa-blackberry"
                          >
                            {c.resendNow}
                          </button>
                        )}
                      </div>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center font-bold text-xs uppercase tracking-wider shadow-md py-3.5"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>{t('verifying')}</span>
                      ) : (
                        <>
                          <span>{c.verifyBtn}</span>
                          <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
                        </>
                      )}
                    </Button3D>

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleDemoSignIn}
                        className="text-xs font-serif font-bold text-ifaqa-blackberry hover:text-ifaqa-plum underline"
                      >
                        {c.bypassDemo}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Bottom Reassurance Bar */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-12">
        <div className="bg-[#FAF5EC] border border-ifaqa-sand/70 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left text-xs font-sans">
            <div className="space-y-1">
              <span className="font-serif font-bold text-ifaqa-plum uppercase tracking-wider block">
                {c.genuineTitle}
              </span>
              <p className="text-ifaqa-blackberry leading-relaxed">
                {c.genuineDesc}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif font-bold text-ifaqa-plum uppercase tracking-wider block">
                {c.deliveryTitle}
              </span>
              <p className="text-ifaqa-blackberry leading-relaxed">
                {c.deliveryDesc}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif font-bold text-ifaqa-plum uppercase tracking-wider block">
                {c.secureTitle}
              </span>
              <p className="text-ifaqa-blackberry leading-relaxed">
                {c.secureDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
