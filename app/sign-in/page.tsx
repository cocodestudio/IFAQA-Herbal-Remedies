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
  HeartHandshake
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
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24">
      {/* 1. Header Banner */}
      <section className="relative w-full bg-ifaqa-plum text-ifaqa-linen py-12 md:py-16 px-4 sm:px-8 border-b border-ifaqa-sand/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto space-y-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">Patron Sign In</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-white/10 text-ifaqa-sand border-ifaqa-sand/60">
              Dispensary Patron Access
            </ArchitecturalBadge>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Distinguished Patron Authentication
          </h1>

          <p className="text-sm sm:text-base text-[#F5F0E6] font-sans max-w-2xl font-medium leading-relaxed">
            Secure two-factor patron verification for tracking botanical orders, consulting classical hakims, and accessing prescription history.
          </p>
        </div>
      </section>

      {/* 2. Main Authentication Sanctuary Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-8 z-10 relative">
        <div className="bg-white border-2 border-ifaqa-sand/70 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Heritage & Privileges (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-ifaqa-sand/40">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-2.5 bg-white border border-ifaqa-sand/60 shadow-md">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Heritage Emblem"
                  width={160}
                  height={56}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold">
                  EST. DESI DAWAKHANA
                </span>
                <h2 className="font-serif text-2xl font-bold text-white leading-snug">
                  Canonical Hakimi Records & Care
                </h2>
                <p className="text-xs text-ifaqa-linen/90 font-sans leading-relaxed">
                  Your registered patron access safeguards botanical prescriptions, personal health consultations, and direct dispensary notifications.
                </p>
              </div>

              {/* Privileges Checklist */}
              <div className="space-y-3 pt-2 text-xs font-sans text-ifaqa-linen/95">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <BookOpen className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-bold text-white">Classical Formulation Records:</span>
                    <p className="text-ifaqa-linen/80 text-[11px]">Track active remedies, dosage vehicles (anupana), and batch details.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Truck className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-bold text-white">Pan-India Express Dispatch:</span>
                    <p className="text-ifaqa-linen/80 text-[11px]">Live courier updates to all 28+ states and territories with zero delay.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <ShieldCheck className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="font-bold text-white">100% Medical Privacy:</span>
                    <p className="text-ifaqa-linen/80 text-[11px]">Protected by sacred patient confidentiality. Data is never brokered.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Seal */}
            <div className="pt-8 border-t border-white/20 mt-8 text-[11px] font-serif text-ifaqa-sand/90 flex items-center justify-between">
              <span>Pure Classical Formulations</span>
              <span>• Zero Synthetics</span>
            </div>
          </div>

          {/* Right Column: Interactive Authentication Form (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            {isAuthenticated && user ? (
              /* Already Authenticated State */
              <div className="space-y-6 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Patron Access Verified</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
                    Welcome, Distinguished Patron
                  </h2>
                  <p className="text-xs text-ifaqa-blackberry font-sans">
                    You are securely authenticated with the dispensary records.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF5EC] border border-ifaqa-sand/60 space-y-3">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-ifaqa-blackberry font-medium uppercase tracking-wider">Registered Phone:</span>
                    <span className="font-mono font-bold text-ifaqa-plum text-sm">{user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans border-t border-ifaqa-sand/30 pt-2">
                    <span className="text-ifaqa-blackberry font-medium uppercase tracking-wider">Patron Status:</span>
                    <span className="font-serif font-bold text-emerald-800">Active Dawakhana Member</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans border-t border-ifaqa-sand/30 pt-2">
                    <span className="text-ifaqa-blackberry font-medium uppercase tracking-wider">Currency:</span>
                    <span className="font-mono font-bold text-ifaqa-plum">INR (₹)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link href="/catalog" className="flex-1">
                    <Button3D variant="primary" size="md" className="w-full justify-center font-bold">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>Browse Catalog</span>
                    </Button3D>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-ifaqa-plum hover:bg-red-50 hover:text-red-800 border-2 border-ifaqa-sand/70 text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Authentication Flow: Phone & OTP */
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold">
                    Secure 2FA Login
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum mt-1">
                    {step === 'phone' ? 'Enter Patron Mobile Number' : 'Verify One-Time Passcode'}
                  </h2>
                  <p className="text-xs text-ifaqa-blackberry font-sans mt-1.5 leading-relaxed">
                    {step === 'phone'
                      ? 'Enter your 10-digit mobile number to receive a secure dispensary one-time passcode.'
                      : `Enter the 6-digit authentication code dispatched to +91 ${phoneNumber}.`}
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 bg-red-50 border-l-4 border-red-700 text-red-900 text-xs font-sans flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-700 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {step === 'phone' ? (
                  /* Step 1: Phone Form */
                  <form onSubmit={handleSendOtp} className="space-y-5">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                        Mobile Number
                      </label>
                      <div className="flex border-2 border-ifaqa-sand/70 focus-within:border-ifaqa-plum transition-colors shadow-sm bg-white">
                        <span className="inline-flex items-center px-3.5 bg-[#FAF5EC] border-r border-ifaqa-sand/60 text-xs font-mono font-bold text-ifaqa-plum">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1 px-4 py-3 text-sm font-mono tracking-wider text-ifaqa-plum placeholder:text-ifaqa-blackberry/50 focus:outline-none bg-transparent"
                          autoFocus
                          maxLength={12}
                        />
                      </div>
                      <p className="text-[11px] text-ifaqa-blackberry/80 font-sans mt-1.5">
                        Applicable to all standard mobile connections across India.
                      </p>
                    </div>

                    <Button3D
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center font-bold text-sm shadow-md"
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
                      <div className="p-4 bg-[#FAF5EC] border border-ifaqa-sand/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-ifaqa-plum font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-ifaqa-sand" />
                            <span>Quick Developer & Reviewer Access</span>
                          </span>
                          <span className="text-[10px] bg-ifaqa-plum text-ifaqa-linen px-1.5 py-0.5 font-mono uppercase font-semibold">
                            Instant
                          </span>
                        </div>
                        <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                          Test patron privileges immediately with one click without waiting for an SMS.
                        </p>
                        <button
                          type="button"
                          onClick={handleDemoSignIn}
                          disabled={loading}
                          className="w-full py-2.5 px-4 bg-white border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-ifaqa-sand" />
                          <span>1-Click Instant Demo Sign In</span>
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Step 2: 6-Digit OTP Form */
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold">
                          6-Digit Passcode
                        </label>
                        <button
                          type="button"
                          onClick={() => setStep('phone')}
                          className="text-xs font-serif text-ifaqa-blackberry hover:text-ifaqa-plum underline"
                        >
                          Change Number
                        </button>
                      </div>

                      {/* 6 Digit Input Cells */}
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
                            className="w-full h-12 text-center text-lg sm:text-xl font-mono font-bold text-ifaqa-plum bg-white border-2 border-ifaqa-sand/70 focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum focus:outline-none transition-all shadow-sm"
                            autoFocus={idx === 0}
                          />
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs font-sans text-ifaqa-blackberry">
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
                      className="w-full justify-center font-bold text-sm shadow-md"
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
    </div>
  );
}
