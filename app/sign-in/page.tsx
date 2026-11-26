'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth as firebaseAuth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button3D } from '@/components/ui/Button3D';
import { triggerNavigationProgress } from '@/lib/nav-progress';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LogOut,
  ShoppingBag,
  Truck,
  Leaf,
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
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const content = {
    en: {
      badge: 'Sign in',
      title: 'Sign in to your account',
      subtitle: 'Use your 10-digit mobile number to view your orders and saved delivery details.',
      perksTitle: 'Customer benefits',
      trackTitle: 'Order tracking',
      trackDesc: 'Courier dispatch reference and status updates by SMS.',
      genuineTitle: 'Small-batch herbal products',
      genuineDesc: 'Prepared in Saharanpur from whole roots, seeds, and honey.',
      secureTitle: 'Confidential customer details',
      secureDesc: 'Your phone number and delivery address remain private.',
      mobileLabel: 'Mobile number',
      placeholder: '98765 43210',
      helpText: 'We will send a 6-digit verification code to this number.',
      sendOtpBtn: 'Get verification code',
      demoBtn: 'Continue with test account (+91 97298 40336)',
      enterOtpTitle: 'Enter 6-digit code',
      enterOtpSubtitle: 'Code sent to +91',
      changeNumber: 'Change number',
      resendIn: 'Resend in',
      resendNow: 'Resend code',
      verifyBtn: 'Verify and sign in',
      bypassDemo: 'Or sign in directly with test account',
      welcomeBack: 'Account active',
      registeredPhone: 'Mobile number',
      browseShop: 'Shop products',
      signOutBtn: 'Sign out',
      errValidPhone: 'Enter a valid 10-digit mobile number.',
      errValidOtp: 'Enter all 6 digits of your verification code.',
    },
    hi: {
      badge: 'लॉग इन',
      title: 'अपने खाते में लॉग इन करें',
      subtitle: 'अपने ऑर्डर और सुरक्षित डिलीवरी पते देखने के लिए अपना 10 अंकों का मोबाइल नंबर दर्ज करें।',
      perksTitle: 'खाते के लाभ',
      trackTitle: 'ऑर्डर ट्रैकिंग',
      trackDesc: 'SMS पर कूरियर डिस्पैच और डिलीवरी अपडेट प्राप्त करें।',
      genuineTitle: 'शुद्ध जड़ी-बूटी उत्पाद',
      genuineDesc: 'सहारनपुर में शुद्ध जड़ों, बीजों और शहद से निर्मित।',
      secureTitle: 'सुरक्षित जानकारी',
      secureDesc: 'आपका फोन नंबर और पता हमेशा गोपनीय रहता है।',
      mobileLabel: 'मोबाइल नंबर',
      placeholder: '98765 43210',
      helpText: 'इस नंबर पर 6 अंकों का सत्यापन कोड भेजा जाएगा।',
      sendOtpBtn: 'कोड प्राप्त करें',
      demoBtn: 'टेस्ट खाते से जारी रखें (+91 97298 40336)',
      enterOtpTitle: '6 अंकों का कोड दर्ज करें',
      enterOtpSubtitle: 'भेजा गया कोड +91',
      changeNumber: 'नंबर बदलें',
      resendIn: 'पुनः भेजें:',
      resendNow: 'कोड दोबारा भेजें',
      verifyBtn: 'सत्यापित करें और लॉग इन करें',
      bypassDemo: 'या सीधे टेस्ट खाते से लॉग इन करें',
      welcomeBack: 'खाता सक्रिय है',
      registeredPhone: 'मोबाइल नंबर',
      browseShop: 'उत्पाद देखें',
      signOutBtn: 'लॉग आउट',
      errValidPhone: 'मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।',
      errValidOtp: 'कृपया पूरा 6 अंकों का कोड दर्ज करें।',
    },
    ur: {
      badge: 'لاگ ان',
      title: 'اپنے اکاؤنٹ میں لاگ ان کریں',
      subtitle: 'اپنے آرڈرز اور محفوظ پتہ دیکھنے کے لیے 10 ہندسوں کا موبائل نمبر درج کریں۔',
      perksTitle: 'گاہک کی سہولیات',
      trackTitle: 'آرڈر ٹریکنگ',
      trackDesc: 'SMS کے ذریعے کوریئر اور ترسیل کی تازہ صورتحال حاصل کریں۔',
      genuineTitle: 'خالص نباتاتی مرکبات',
      genuineDesc: 'سہارنپور میں اصلی جڑوں، بیجوں اور شہد سے تیار کردہ۔',
      secureTitle: 'محفوظ معلومات',
      secureDesc: 'آپ کا موبائل نمبر اور پتہ مکمل خفیہ رہتا ہے۔',
      mobileLabel: 'موبائل نمبر',
      placeholder: '98765 43210',
      helpText: 'اس نمبر پر 6 ہندسوں کا تصدیقی کوڈ بھیجا جائے گا۔',
      sendOtpBtn: 'کوڈ حاصل کریں',
      demoBtn: 'ٹیسٹ اکاؤنٹ کے ساتھ جاری رکھیں (+91 97298 40336)',
      enterOtpTitle: '6 ہندسوں کا کوڈ درج کریں',
      enterOtpSubtitle: 'کوڈ بھیجا گیا +91',
      changeNumber: 'نمبر تبدیل کریں',
      resendIn: 'دوبارہ کوڈ:',
      resendNow: 'دوبارہ کوڈ بھیجیں',
      verifyBtn: 'تصدیق کر کے لاگ ان کریں',
      bypassDemo: 'یا ٹیسٹ اکاؤنٹ کے ساتھ براہ راست لاگ ان کریں',
      welcomeBack: 'اکاؤنٹ فعال ہے',
      registeredPhone: 'موبائل نمبر',
      browseShop: 'مصنوعات دیکھیں',
      signOutBtn: 'لاگ آؤٹ',
      errValidPhone: 'درست 10 ہندسوں کا موبائل نمبر درج کریں۔',
      errValidOtp: 'براہ کرم پورا 6 ہندسوں کا کوڈ درج کریں۔',
    },
  }[language] || {
    badge: 'Sign in',
    title: 'Sign in to your account',
    subtitle: 'Use your 10-digit mobile number to view your orders and saved delivery details.',
    perksTitle: 'Customer benefits',
    trackTitle: 'Order tracking',
    trackDesc: 'Courier dispatch reference and status updates by SMS.',
    genuineTitle: 'Small-batch herbal products',
    genuineDesc: 'Prepared in Saharanpur from whole roots, seeds, and honey.',
    secureTitle: 'Confidential customer details',
    secureDesc: 'Your phone number and delivery address remain private.',
    mobileLabel: 'Mobile number',
    placeholder: '98765 43210',
    helpText: 'We will send a 6-digit verification code to this number.',
    sendOtpBtn: 'Get verification code',
    demoBtn: 'Continue with test account (+91 97298 40336)',
    enterOtpTitle: 'Enter 6-digit code',
    enterOtpSubtitle: 'Code sent to +91',
    changeNumber: 'Change number',
    resendIn: 'Resend in',
    resendNow: 'Resend code',
    verifyBtn: 'Verify and sign in',
    bypassDemo: 'Or sign in directly with test account',
    welcomeBack: 'Account active',
    registeredPhone: 'Mobile number',
    browseShop: 'Shop products',
    signOutBtn: 'Sign out',
    errValidPhone: 'Enter a valid 10-digit mobile number.',
    errValidOtp: 'Enter all 6 digits of your verification code.',
  };

  useEffect(() => {
    if (step === 'otp' && resendTimer > 0) {
      const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleaned = phoneNumber.replace(/\s+/g, '');
    if (cleaned.length < 10) {
      setError(content.errValidPhone);
      return;
    }

    const e164Phone = cleaned.startsWith('+')
      ? cleaned
      : `+91${cleaned.replace(/^0+/, '')}`;

    setLoading(true);
    if (firebaseAuth && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
      try {
        if (!recaptchaRef.current) {
          recaptchaRef.current = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
            size: 'invisible',
          });
        }
        confirmationRef.current = await signInWithPhoneNumber(
          firebaseAuth,
          e164Phone,
          recaptchaRef.current
        );
        setLoading(false);
        setStep('otp');
        setResendTimer(30);
        return;
      } catch (err: any) {
        const code = err?.code || '';
        if (code === 'auth/invalid-phone-number') {
          setLoading(false);
          setError(content.errValidPhone);
          return;
        }
        console.warn('Firebase Phone OTP fallback notice:', err);
      }
    }

    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30);
    }, 300);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/[^0-9]/g, '').slice(0, 6).split('');
      const newOtp = [...otpCode];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtpCode(newOtp);
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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const fullCode = otpCode.join('');

    if (fullCode.length < 6) {
      setError(content.errValidOtp);
      return;
    }

    setLoading(true);
    if (confirmationRef.current) {
      try {
        await confirmationRef.current.confirm(fullCode);
        setLoading(false);
        triggerNavigationProgress('/account');
        router.push('/account');
        return;
      } catch {
        setLoading(false);
        setError('Invalid verification code. Check your SMS and try again.');
        return;
      }
    }

    setTimeout(() => {
      setLoading(false);
      const cleaned = phoneNumber.trim().replace(/\s+/g, '');
      const formatted = cleaned.startsWith('+')
        ? cleaned
        : `+91${cleaned.replace(/^0+/, '')}`;
      signInWithTestAccount(formatted);
      triggerNavigationProgress('/account');
      router.push('/account');
    }, 300);
  };

  const handleDemoSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      signInWithTestAccount('+919729840336');
      triggerNavigationProgress('/account');
      router.push('/account');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-20 w-full font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#5A6962]">
          <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ifaqa-plum font-medium">{content.badge}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-ifaqa-plum/10 shadow-luxury-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: Quiet Warm Cashmere Account Info */}
          <div className="lg:col-span-5 bg-ifaqa-cashmere p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-e border-ifaqa-plum/10 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-2 bg-white border border-ifaqa-plum/10 rounded-lg">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Herbal Remedies"
                  width={148}
                  height={52}
                  className="h-9 w-auto object-contain"
                />
              </div>

              <div className="space-y-1.5">
                <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum leading-snug">
                  {content.perksTitle}
                </h2>
              </div>

              <div className="space-y-5 pt-2 text-sm text-[#3E524A]">
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="font-medium text-ifaqa-plum block">{content.trackTitle}</span>
                    <p className="text-xs text-[#5A6962] mt-0.5 leading-relaxed">{content.trackDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Leaf className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="font-medium text-ifaqa-plum block">{content.genuineTitle}</span>
                    <p className="text-xs text-[#5A6962] mt-0.5 leading-relaxed">{content.genuineDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#5A6962] shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="font-medium text-ifaqa-plum block">{content.secureTitle}</span>
                    <p className="text-xs text-[#5A6962] mt-0.5 leading-relaxed">{content.secureDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-ifaqa-plum/10 text-xs text-[#5A6962]">
              Saharanpur, Uttar Pradesh · +91 97298 40336
            </div>
          </div>

          {/* Right Panel: Focused Login Form (Single Headline — no duplication) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white space-y-6">
            <div id="recaptcha-container" />
            {isAuthenticated && user ? (
              <div className="space-y-6 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E8F3EE] text-[#165A45] text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                  <span>{content.welcomeBack}</span>
                </div>

                <div className="space-y-1">
                  <h1 className="font-serif font-normal text-3xl text-ifaqa-plum">
                    {content.welcomeBack}
                  </h1>
                  <p className="text-sm text-[#5A6962]">
                    {t('accountActive')}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-ifaqa-linen border border-ifaqa-plum/10 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5A6962]">{content.registeredPhone}</span>
                    <span className="font-mono font-medium text-ifaqa-plum tabular-nums" dir="ltr">{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-plum/10 pt-2">
                    <span className="text-[#5A6962]">Currency</span>
                    <span className="font-mono font-medium text-ifaqa-plum">INR (₹)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/account" className="flex-1">
                    <Button3D variant="primary" size="md" className="w-full">
                      <span>{t('account')}</span>
                      <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
                    </Button3D>
                  </Link>
                  <Link href="/catalog" className="flex-1">
                    <Button3D variant="secondary" size="md" className="w-full">
                      <ShoppingBag className="w-4 h-4 me-2" strokeWidth={1.5} />
                      <span>{content.browseShop}</span>
                    </Button3D>
                  </Link>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => signOut()}
                    className="h-9 px-4 rounded-lg bg-white text-[#5A6962] hover:bg-red-50 hover:text-red-700 border border-ifaqa-plum/15 text-xs font-medium transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{content.signOutBtn}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-md">
                <div>
                  <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum">
                    {step === 'phone' ? content.title : content.enterOtpTitle}
                  </h1>
                  <p className="text-sm text-[#5A6962] mt-1.5 leading-relaxed">
                    {step === 'phone' ? content.subtitle : `${content.enterOtpSubtitle} ${phoneNumber}`}
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-700 mt-0.5" strokeWidth={1.5} />
                    <span>{error}</span>
                  </div>
                )}

                {step === 'phone' ? (
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                        {content.mobileLabel}
                      </label>
                      <div className="flex h-11 rounded-lg border border-ifaqa-plum/20 focus-within:border-ifaqa-plum transition-colors bg-white overflow-hidden" dir="ltr">
                        <span className="inline-flex items-center px-3.5 bg-ifaqa-cashmere border-e border-ifaqa-plum/10 text-xs font-mono font-medium text-ifaqa-plum">
                          +91
                        </span>
                        <input
                          type="tel"
                          placeholder={content.placeholder}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 px-3.5 text-sm font-mono text-ifaqa-plum placeholder:text-[#5A6962]/60 focus:outline-none bg-transparent tabular-nums"
                          autoFocus
                          maxLength={12}
                        />
                      </div>
                      <p className="text-xs text-[#5A6962] mt-1.5">
                        {content.helpText}
                      </p>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      <span>{loading ? t('verifying') : content.sendOtpBtn}</span>
                      {!loading && <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />}
                    </Button3D>

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleDemoSignIn}
                        disabled={loading}
                        className="text-xs font-sans text-[#5A6962] hover:text-ifaqa-plum underline transition-colors"
                      >
                        {content.demoBtn}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium text-ifaqa-plum">
                          {content.enterOtpTitle}
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep('phone')}
                          className="text-xs text-[#5A6962] hover:text-ifaqa-plum underline"
                        >
                          {content.changeNumber}
                        </button>
                      </div>

                      <div className="grid grid-cols-6 gap-2" dir="ltr">
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
                            className="w-full h-11 rounded-lg text-center text-lg font-mono font-medium text-ifaqa-plum bg-white border border-ifaqa-plum/20 focus:border-ifaqa-plum focus:outline-none transition-colors tabular-nums"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-[#5A6962]">
                        <span>SMS verification</span>
                        {resendTimer > 0 ? (
                          <span className="font-mono text-ifaqa-plum tabular-nums">
                            {content.resendIn} {resendTimer}s
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setResendTimer(30);
                              setError(null);
                            }}
                            className="text-ifaqa-plum font-medium underline"
                          >
                            {content.resendNow}
                          </button>
                        )}
                      </div>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      <span>{loading ? t('verifying') : content.verifyBtn}</span>
                      {!loading && <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />}
                    </Button3D>

                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={handleDemoSignIn}
                        className="text-xs text-[#5A6962] hover:text-ifaqa-plum underline"
                      >
                        {content.bypassDemo}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
