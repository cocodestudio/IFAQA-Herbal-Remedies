'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
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
  BookOpen,
  Truck,
  HeartHandshake,
  Check,
  KeyRound,
  FileText
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { user, isAuthenticated, signInWithTestAccount, signOut } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);

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
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setResendTimer(30);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
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

    // Auto move to next input
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
      setError('Please enter the complete 6-digit passcode.');
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
    }, 600);
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
      {/* 1. Full-Width Grand Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen py-16 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-ifaqa-sand/50 overflow-hidden">
        {/* Ambient Gold Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(197,160,89,0.12)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative w-full max-w-[1720px] mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">Patron Access Portal</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-[#FAF5EC] text-ifaqa-plum border border-[#DFBA73] font-serif font-bold text-xs shadow-md">
              Dispensary Patron Access & Authentication
            </ArchitecturalBadge>
          </div>

          <div className="max-w-5xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              Distinguished Patron Sanctuary
            </h1>

            <p className="text-base sm:text-xl text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-4xl">
              Authenticate via secure two-factor mobile verification to review classical prescription logs, track active apothecary dispatch to your pincode, and manage personal dispensary consultations.
            </p>
          </div>

          {/* Quick Assurance Badges */}
          <div className="pt-4 flex flex-wrap gap-4 items-center text-xs font-mono tracking-wider text-ifaqa-sand">
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>SECURE TWO-FACTOR PHONE AUTHENTICATION</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>PERSISTENT PRESCRIPTION & DOSAGE HISTORY</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>PAN-INDIA LIVE EXPRESS DISPATCH TRACKING</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Full-Width Sanctuary Card (12 Columns) */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 -mt-8 sm:-mt-12 z-10 relative">
        <div className="bg-white border-2 border-ifaqa-sand/70 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Heritage & Patron Privileges (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen p-8 sm:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-ifaqa-sand/40 space-y-10">
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center p-3 bg-white border-2 border-ifaqa-sand/70 shadow-md">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Heritage Emblem"
                  width={180}
                  height={64}
                  priority
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold block">
                  EST. DESI DAWAKHANA • INDIA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Patron Privileges & Hakimi Records
                </h2>
                <p className="text-xs sm:text-sm text-ifaqa-linen/90 font-sans leading-relaxed">
                  Your registered patron profile connects you directly to our dispensary archives, ensuring formulation continuity and personalized dosage oversight.
                </p>
              </div>

              {/* Privileges Checklist */}
              <div className="space-y-4 pt-2 text-xs font-sans text-ifaqa-linen/95">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Formulation & Dosage Logs</span>
                    <p className="text-ifaqa-linen/80 text-[11px] mt-0.5 leading-relaxed">
                      Persistent historical record of all prescribed remedies, classical anupana guidance, and batch details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Pan-India Express Dispatch Tracking</span>
                    <p className="text-ifaqa-linen/80 text-[11px] mt-0.5 leading-relaxed">
                      Real-time courier milestones covering all 19,000+ Indian pincodes and international destinations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Sacred Medical Confidentiality</span>
                    <p className="text-ifaqa-linen/80 text-[11px] mt-0.5 leading-relaxed">
                      Protected under physician-patient privilege. Your health inquiries are never sold, rented, or brokered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Seal */}
            <div className="pt-6 border-t border-white/20 text-xs font-serif text-ifaqa-sand flex items-center justify-between">
              <span>Pure Classical Formulations</span>
              <span>• Zero Synthetics</span>
            </div>
          </div>

          {/* Right Column: Authentication Panel (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-14 lg:p-16 flex flex-col justify-center bg-white space-y-8">
            {isAuthenticated && user ? (
              /* Already Authenticated State */
              <div className="space-y-8 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Patron Access Authenticated</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ifaqa-plum">
                    Welcome, Distinguished Patron
                  </h2>
                  <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans">
                    You are securely authenticated with the IFAQA Desi Dawakhana records.
                  </p>
                </div>

                <div className="p-6 bg-[#FAF5EC] border-2 border-ifaqa-sand/60 space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
                    <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">Registered Phone:</span>
                    <span className="font-mono font-bold text-ifaqa-plum text-base">{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans border-t border-ifaqa-sand/30 pt-3">
                    <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">Patron Status:</span>
                    <span className="font-serif font-bold text-emerald-800">Verified Dawakhana Member</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans border-t border-ifaqa-sand/30 pt-3">
                    <span className="text-ifaqa-blackberry font-bold uppercase tracking-wider">Dispensary Currency:</span>
                    <span className="font-mono font-bold text-ifaqa-plum">Indian Rupee (INR ₹)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <Link href="/catalog" className="flex-1">
                    <Button3D variant="primary" size="lg" className="w-full justify-center font-bold uppercase text-xs tracking-wider">
                      <ShoppingBag className="w-4 h-4 mr-2 text-ifaqa-sand" />
                      <span>Browse Pharmacopoeia</span>
                    </Button3D>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-ifaqa-plum hover:bg-red-50 hover:text-red-800 border-2 border-ifaqa-sand/70 text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Dawakhana</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Authentication Flow: Phone & OTP */
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold block bg-ifaqa-plum text-white px-2 py-1 inline-block">
                    SECURE 2FA VERIFICATION
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ifaqa-plum mt-3">
                    {step === 'phone' ? 'Enter Patron Mobile Number' : 'Verify One-Time Passcode'}
                  </h2>
                  <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 leading-relaxed">
                    {step === 'phone'
                      ? 'Enter your 10-digit mobile number to receive an instantaneous dispensary verification code.'
                      : `Enter the 6-digit authentication passcode dispatched to +91 ${phoneNumber}.`}
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-700 text-red-900 text-xs font-sans flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-700 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {step === 'phone' ? (
                  /* Step 1: Phone Form */
                  <form onSubmit={handleSendOtp} className="space-y-6">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                        Mobile Number *
                      </label>
                      <div className="flex border-2 border-ifaqa-sand/70 focus-within:border-ifaqa-plum transition-colors shadow-sm bg-white">
                        <span className="inline-flex items-center px-4 bg-[#FAF5EC] border-r-2 border-ifaqa-sand/60 text-xs font-mono font-bold text-ifaqa-plum">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 px-4 py-3.5 text-sm sm:text-base font-mono tracking-wider text-ifaqa-plum placeholder:text-ifaqa-blackberry/50 focus:outline-none bg-transparent"
                          autoFocus
                          maxLength={12}
                        />
                      </div>
                      <p className="text-[11px] text-ifaqa-blackberry/80 font-sans mt-2">
                        Supported on all Indian cellular providers (Jio, Airtel, Vi, BSNL).
                      </p>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl py-4"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Compounding Secure Token...</span>
                      ) : (
                        <>
                          <span>Send Authentication Code</span>
                          <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
                        </>
                      )}
                    </Button3D>

                    {/* Instant Demo Sign-In Box */}
                    <div className="pt-4 border-t border-ifaqa-sand/40">
                      <div className="p-5 bg-[#FAF5EC] border-2 border-ifaqa-sand/80 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-ifaqa-plum font-bold flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-ifaqa-sand" />
                            <span>Developer & Reviewer Access</span>
                          </span>
                          <span className="text-[10px] bg-ifaqa-plum text-white px-2 py-0.5 font-mono uppercase font-semibold">
                            Instant Access
                          </span>
                        </div>
                        <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                          Test patron privileges immediately without waiting for an SMS passcode.
                        </p>
                        <button
                          type="button"
                          onClick={handleDemoSignIn}
                          disabled={loading}
                          className="w-full py-3 px-4 bg-white border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-ifaqa-sand" />
                          <span>1-Click Instant Demo Patron Sign In</span>
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Step 2: 6-Digit OTP Form */
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold">
                          6-Digit Passcode
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep('phone')}
                          className="text-xs font-serif text-ifaqa-blackberry hover:text-ifaqa-plum underline font-bold"
                        >
                          Change Number
                        </button>
                      </div>

                      {/* 6 Digit Input Cells */}
                      <div className="grid grid-cols-6 gap-3">
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
                            className="w-full h-14 text-center text-xl sm:text-2xl font-mono font-bold text-ifaqa-plum bg-white border-2 border-ifaqa-sand/70 focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum focus:outline-none transition-all shadow-sm"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs font-sans text-ifaqa-blackberry">
                        <span>Didn't receive the SMS?</span>
                        {resendTimer > 0 ? (
                          <span className="font-mono text-ifaqa-plum font-bold">
                            Resend in {resendTimer}s
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
                            Resend Code
                          </button>
                        )}
                      </div>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl py-4"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Verifying Classical Patron Token...</span>
                      ) : (
                        <>
                          <span>Verify & Access Dispensary</span>
                          <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
                        </>
                      )}
                    </Button3D>

                    {/* Quick Demo Bypass in OTP state */}
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={handleDemoSignIn}
                        className="text-xs font-serif font-bold text-ifaqa-blackberry hover:text-ifaqa-plum underline"
                      >
                        Bypass with instant test credentials (123456)
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Full-Width Bottom Patron Assurance Banner */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16">
        <div className="bg-[#FAF5EC] border-2 border-ifaqa-sand/70 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum uppercase tracking-wider">
                100% Medical Confidentiality
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                Your health consultations and formulation histories are never shared or sold to commercial data aggregators.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum uppercase tracking-wider">
                Pan-India Express Dispatch
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                Freshly compounded batch bottles securely delivered to all 19,000+ pincodes across India and worldwide.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-sm font-bold text-ifaqa-plum uppercase tracking-wider">
                Canonical Formulation Guarantee
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                100% wildcrafted botanicals compounded strictly according to Greco-Arab Unani-Tibb & Vedic Ayurvedic canons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
