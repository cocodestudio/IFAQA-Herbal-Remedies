'use client';

import React, { useState, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth as firebaseAuth } from '@/lib/firebase';
import { clearRecaptchaSlot, createFreshRecaptcha } from '@/lib/recaptcha';
import { Modal } from '@/components/ui/Modal';
import { Button3D } from '@/components/ui/Button3D';
import { useAuth } from '@/context/AuthContext';
import { validateE164Phone } from '@/lib/formatters';
import { Smartphone, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

export function PhoneOtpModal() {
  const { isPhoneModalOpen, closePhoneModal, signInWithTestAccount } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const cleanPhone = phone.trim().replace(/\s+/g, '');

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateE164Phone(cleanPhone)) {
      setError('Enter a valid mobile number (e.g. +91 98765 43210).');
      return;
    }

    setLoading(true);
    if (firebaseAuth && process.env.NEXT_PUBLIC_MOCK_FALLBACK !== 'true') {
      try {
        const verifier = createFreshRecaptcha(
          firebaseAuth,
          'recaptcha-modal-container',
          recaptchaRef
        );
        confirmationRef.current = await signInWithPhoneNumber(
          firebaseAuth,
          cleanPhone,
          verifier
        );
        setLoading(false);
        setStep('otp');
        return;
      } catch (err: any) {
        clearRecaptchaSlot('recaptcha-modal-container', recaptchaRef);
        setLoading(false);
        const code = err?.code || '';
        if (code === 'auth/invalid-phone-number') {
          setError('Invalid phone number format. Include country code (e.g. +91).');
        } else if (
          code === 'auth/operation-not-allowed' ||
          code === 'auth/billing-not-enabled'
        ) {
          const isLocalhost =
            typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
          if (isLocalhost) {
            confirmationRef.current = null;
            setLoading(false);
            setStep('otp');
            setError('Live SMS blocked on localhost. Enter Firebase test code (123456).');
            return;
          }
          setError(
            code === 'auth/billing-not-enabled'
              ? 'Live SMS requires Firebase Blaze plan or configured test numbers in Firebase Console.'
              : 'SMS for India (+91) blocked. Go to Firebase Console → Authentication → Settings → SMS region policy → Allow India (+91).'
          );
        } else {
          setError(`${err?.message || 'Unable to send OTP via Firebase.'} (${code || 'error'})`);
        }
        return;
      }
    }

    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 250);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6) {
      setError('Enter the 6-digit verification code.');
      return;
    }

    setLoading(true);
    if (confirmationRef.current) {
      try {
        await confirmationRef.current.confirm(cleanOtp);
        setLoading(false);
        setStep('phone');
        setOtp('');
        closePhoneModal();
        return;
      } catch {
        setLoading(false);
        setError('Invalid verification code. Please check the SMS and try again.');
        return;
      }
    }

    if (cleanOtp === '123456') {
      signInWithTestAccount(cleanPhone);
      setLoading(false);
      setStep('phone');
      setOtp('');
    } else {
      setLoading(false);
      setError('Invalid code.');
    }
  };

  const resetAndClose = () => {
    setStep('phone');
    setOtp('');
    setError(null);
    closePhoneModal();
  };

  return (
    <Modal
      isOpen={isPhoneModalOpen}
      onClose={resetAndClose}
      title="Sign in"
      maxWidth="md"
    >
      <div className="space-y-4 font-sans">
        <div id="recaptcha-modal-container" />
        <p className="text-sm text-[#5A6962] leading-relaxed">
          Enter your mobile number to view your order status and saved addresses.
        </p>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                Mobile number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-[#5A6962]">
                  <Smartphone className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full h-10 ps-9 pe-3 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum text-sm font-mono focus:outline-none focus:border-ifaqa-plum tabular-nums"
                  required
                />
              </div>
            </div>

            <Button3D
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full"
            >
              <span>{loading ? 'Sending code' : 'Get verification code'}</span>
              <ArrowRight className="w-4 h-4 ms-2 rtl-flip" strokeWidth={1.5} />
            </Button3D>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                Enter 6-digit code
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-[#5A6962]">
                  <KeyRound className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  dir="ltr"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123456"
                  className="w-full h-10 ps-9 pe-3 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum text-base font-mono tracking-widest text-center focus:outline-none focus:border-ifaqa-plum tabular-nums"
                  autoFocus
                  required
                />
              </div>
              <p className="text-xs text-[#5A6962] mt-1.5">
                Sent to <span className="font-mono text-ifaqa-plum" dir="ltr">{cleanPhone}</span>
              </p>
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="h-10 px-4 rounded-lg text-xs font-sans font-medium text-[#5A6962] hover:text-ifaqa-plum border border-ifaqa-plum/15"
              >
                Change
              </button>
              <Button3D
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="flex-1"
              >
                <ShieldCheck className="w-4 h-4 me-2" strokeWidth={1.5} />
                <span>{loading ? 'Verifying' : 'Verify and sign in'}</span>
              </Button3D>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
