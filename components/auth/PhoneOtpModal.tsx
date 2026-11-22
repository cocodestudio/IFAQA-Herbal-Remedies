'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button3D } from '@/components/ui/Button3D';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { useAuth } from '@/context/AuthContext';
import { validateE164Phone } from '@/lib/formatters';
import { Smartphone, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

export function PhoneOtpModal() {
  const { isPhoneModalOpen, closePhoneModal, signInWithTestAccount } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('+92 300 0000000');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const cleanPhone = phone.trim().replace(/\s+/g, '');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateE164Phone(cleanPhone)) {
      setError('Please enter a valid international phone number in E.164 format (e.g. +92 300 1234567 or +44 7911 123456).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    // Test bypass or mock code '123456'
    if (cleanOtp === '123456') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        signInWithTestAccount(cleanPhone);
        setStep('phone');
        setOtp('');
      }, 300);
    } else {
      setError('Invalid verification code. For development testing, use code: 123456.');
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
      title="Patron Identity & Verification"
      maxWidth="md"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <ArchitecturalBadge variant="notched">Classical Unani Apothecary</ArchitecturalBadge>
          <ArchitecturalBadge variant="diamond">Secure Auth</ArchitecturalBadge>
        </div>

        <p className="text-xs text-ifaqa-blackberry/90 leading-relaxed font-sans">
          Access your personal dispensary orders, formulation consultations, and expedited checkout with single-step phone OTP verification.
        </p>

        {error && (
          <div className="p-3 bg-red-50 border-l-2 border-l-red-800 text-red-950 text-xs">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                International Mobile Number (E.164)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ifaqa-mauve">
                  <Smartphone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 0000000"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-ifaqa-sand/60 text-ifaqa-plum text-sm font-mono focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
                  required
                />
              </div>
              <p className="text-[11px] text-ifaqa-mauve mt-1.5">
                Development test number: <span className="font-mono font-bold text-ifaqa-plum">+92 300 0000000</span>
              </p>
            </div>

            <Button3D
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Dispatching Verification...' : 'Send Verification Code'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button3D>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-ifaqa-plum mb-1.5">
                Enter 6-Digit One-Time Code
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ifaqa-mauve">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="123456"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-ifaqa-sand/60 text-ifaqa-plum text-base font-mono tracking-widest text-center focus:outline-none focus:border-ifaqa-plum focus:ring-1 focus:ring-ifaqa-plum"
                  autoFocus
                  required
                />
              </div>
              <p className="text-[11px] text-ifaqa-mauve mt-1.5">
                Dispatched to <span className="font-mono text-ifaqa-plum">{cleanPhone}</span>. Test bypass code: <span className="font-mono font-bold text-ifaqa-plum">123456</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="px-4 py-2 text-xs font-serif text-ifaqa-blackberry hover:text-ifaqa-plum border border-ifaqa-sand/40"
              >
                Change Phone
              </button>
              <Button3D
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Verifying...' : 'Authenticate & Sign In'}
                <ShieldCheck className="w-4 h-4 ml-2" />
              </Button3D>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
