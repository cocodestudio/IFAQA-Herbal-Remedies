'use client';

import React, { useEffect, useState } from 'react';
import {
  Landmark,
  Smartphone,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import {
  CustomerBankAccount,
  CustomerUpiId,
  getBankAccounts,
  saveBankAccounts,
  getUpiIds,
  saveUpiIds,
  maskBankAccountNumber,
  validateIfscCode,
  validateUpiId,
} from '@/lib/account-storage';
import { Button3D } from '@/components/ui/Button3D';

export default function AccountBankPage() {
  const { user } = useAuth();
  const [bankAccounts, setBankAccounts] = useState<CustomerBankAccount[]>([]);
  const [upiIds, setUpiIds] = useState<CustomerUpiId[]>([]);

  // UPI Form state
  const [showUpiForm, setShowUpiForm] = useState(false);
  const [upiInput, setUpiInput] = useState('');
  const [upiLabel, setUpiLabel] = useState('Personal UPI');
  const [upiError, setUpiError] = useState<string | null>(null);

  // Bank Form state
  const [showBankForm, setShowBankForm] = useState(false);
  const [holderName, setHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [confirmAccNumber, setConfirmAccNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankError, setBankError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) return;
    setBankAccounts(getBankAccounts(user.uid));
    setUpiIds(getUpiIds(user.uid));
  }, [user]);

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setUpiError(null);

    if (!validateUpiId(upiInput)) {
      setUpiError('Enter a valid UPI ID (for example: name@okaxis or 9876543210@ybl).');
      return;
    }

    const newUpi: CustomerUpiId = {
      id: `upi_${Date.now()}`,
      upiId: upiInput.trim().toLowerCase(),
      label: upiLabel.trim() || 'UPI Handle',
      isPrimary: upiIds.length === 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [newUpi, ...upiIds];
    setUpiIds(updated);
    saveUpiIds(user.uid, updated);
    setUpiInput('');
    setShowUpiForm(false);
  };

  const handleSetPrimaryUpi = (id: string) => {
    if (!user?.uid) return;
    const updated = upiIds.map((u) => ({ ...u, isPrimary: u.id === id }));
    setUpiIds(updated);
    saveUpiIds(user.uid, updated);
  };

  const handleDeleteUpi = (id: string) => {
    if (!user?.uid) return;
    let updated = upiIds.filter((u) => u.id !== id);
    if (updated.length > 0 && !updated.some((u) => u.isPrimary)) {
      updated = updated.map((u, idx) => ({ ...u, isPrimary: idx === 0 }));
    }
    setUpiIds(updated);
    saveUpiIds(user.uid, updated);
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setBankError(null);

    if (holderName.trim().length < 2 || bankName.trim().length < 2) {
      setBankError('Enter both account holder name and bank name.');
      return;
    }

    const digits = accNumber.replace(/\D/g, '');
    const confirmDigits = confirmAccNumber.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 18) {
      setBankError('Enter a valid bank account number (9 to 18 digits).');
      return;
    }
    if (digits !== confirmDigits) {
      setBankError('Account numbers do not match.');
      return;
    }
    if (!validateIfscCode(ifscCode)) {
      setBankError('Enter a valid 11-character IFSC code (for example SBIN0001234).');
      return;
    }

    const { masked, last4 } = maskBankAccountNumber(digits);
    const newBank: CustomerBankAccount = {
      id: `bank_${Date.now()}`,
      accountHolderName: holderName.trim(),
      bankName: bankName.trim(),
      accountNumberMasked: masked,
      last4,
      ifscCode: ifscCode.trim().toUpperCase(),
      isPrimary: bankAccounts.length === 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBank, ...bankAccounts];
    setBankAccounts(updated);
    saveBankAccounts(user.uid, updated);
    setHolderName('');
    setBankName('');
    setAccNumber('');
    setConfirmAccNumber('');
    setIfscCode('');
    setShowBankForm(false);
  };

  const handleSetPrimaryBank = (id: string) => {
    if (!user?.uid) return;
    const updated = bankAccounts.map((b) => ({ ...b, isPrimary: b.id === id }));
    setBankAccounts(updated);
    saveBankAccounts(user.uid, updated);
  };

  const handleDeleteBank = (id: string) => {
    if (!user?.uid) return;
    let updated = bankAccounts.filter((b) => b.id !== id);
    if (updated.length > 0 && !updated.some((b) => b.isPrimary)) {
      updated = updated.map((b, idx) => ({ ...b, isPrimary: idx === 0 }));
    }
    setBankAccounts(updated);
    saveBankAccounts(user.uid, updated);
  };

  return (
    <AccountShell
      title="Bank & UPI Details"
      subtitle="Save a verified UPI ID or Indian bank account for faster refunds on cancelled or returned orders."
    >
      {/* 1. Saved UPI IDs */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ifaqa-plum/10">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <div>
              <h2 className="font-serif text-xl text-ifaqa-plum">Saved UPI IDs</h2>
              <p className="text-xs text-[#5A6962]">Instant refund transfers via UPI</p>
            </div>
          </div>

          {!showUpiForm && (
            <button
              type="button"
              onClick={() => {
                setUpiError(null);
                setShowUpiForm(true);
              }}
              className="h-9 px-3.5 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/15 hover:bg-[#EDE5D5] text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Add UPI ID</span>
            </button>
          )}
        </div>

        {showUpiForm && (
          <form onSubmit={handleAddUpi} className="p-4 rounded-xl bg-ifaqa-linen border border-ifaqa-plum/10 space-y-4">
            {upiError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0" strokeWidth={1.5} />
                <span>{upiError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  UPI ID *
                </label>
                <input
                  type="text"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  placeholder="yourname@okhdfcbank"
                  dir="ltr"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  Label (e.g. GPay / PhonePe)
                </label>
                <input
                  type="text"
                  value={upiLabel}
                  onChange={(e) => setUpiLabel(e.target.value)}
                  placeholder="Personal UPI"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowUpiForm(false)}
                className="h-9 px-4 rounded-lg text-xs font-medium text-[#5A6962] hover:text-ifaqa-plum"
              >
                Cancel
              </button>
              <Button3D type="submit" variant="primary" size="sm">
                Save UPI ID
              </Button3D>
            </div>
          </form>
        )}

        {upiIds.length === 0 && !showUpiForm ? (
          <p className="text-xs text-[#5A6962]">
            No UPI ID linked yet. Add your UPI handle for instant COD or prepaid order refunds.
          </p>
        ) : (
          <div className="space-y-3">
            {upiIds.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-lg border border-ifaqa-plum/10 bg-ifaqa-linen/50 flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-ifaqa-plum" dir="ltr">
                      {u.upiId}
                    </span>
                    {u.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8F3EE] text-[#165A45] text-[11px] font-medium">
                        <Check className="w-3 h-3" strokeWidth={2} />
                        Primary
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#5A6962]">{u.label}</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {!u.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryUpi(u.id)}
                      className="text-[#165A45] font-medium hover:underline"
                    >
                      Set primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteUpi(u.id)}
                    className="text-[#5A6962] hover:text-red-700 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Bank Accounts */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ifaqa-plum/10">
          <div className="flex items-center gap-2.5">
            <Landmark className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <div>
              <h2 className="font-serif text-xl text-ifaqa-plum">Bank Accounts (Refunds)</h2>
              <p className="text-xs text-[#5A6962]">NEFT / IMPS payout destination</p>
            </div>
          </div>

          {!showBankForm && (
            <button
              type="button"
              onClick={() => {
                setBankError(null);
                setShowBankForm(true);
              }}
              className="h-9 px-3.5 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Add bank account</span>
            </button>
          )}
        </div>

        {showBankForm && (
          <form onSubmit={handleAddBank} className="p-5 rounded-xl bg-ifaqa-linen border border-ifaqa-plum/10 space-y-4">
            {bankError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0" strokeWidth={1.5} />
                <span>{bankError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="As printed on bank passbook"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  Bank Name *
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. State Bank of India"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  Account Number *
                </label>
                <input
                  type="password"
                  value={accNumber}
                  onChange={(e) => setAccNumber(e.target.value)}
                  placeholder="9 to 18 digits"
                  dir="ltr"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum bg-white tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  Re-enter Account Number *
                </label>
                <input
                  type="text"
                  value={confirmAccNumber}
                  onChange={(e) => setConfirmAccNumber(e.target.value)}
                  placeholder="Confirm account number"
                  dir="ltr"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum bg-white tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  maxLength={11}
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                  placeholder="SBIN0001234"
                  dir="ltr"
                  className="w-full h-10 px-3 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono uppercase text-ifaqa-plum bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setShowBankForm(false)}
                className="h-9 px-4 rounded-lg text-xs font-medium text-[#5A6962] hover:text-ifaqa-plum"
              >
                Cancel
              </button>
              <Button3D type="submit" variant="primary" size="sm">
                Save bank account
              </Button3D>
            </div>
          </form>
        )}

        {bankAccounts.length === 0 && !showBankForm ? (
          <p className="text-xs text-[#5A6962]">
            No bank account added yet. Adding a bank account lets our Saharanpur dispensary issue direct refunds if a cash-on-delivery item is returned.
          </p>
        ) : (
          <div className="space-y-3">
            {bankAccounts.map((bank) => (
              <div
                key={bank.id}
                className="p-4 rounded-lg border border-ifaqa-plum/10 bg-ifaqa-linen/50 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-ifaqa-plum">{bank.bankName}</span>
                    {bank.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E8F3EE] text-[#165A45] text-[11px] font-medium">
                        <Check className="w-3 h-3" strokeWidth={2} />
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#3E524A]">
                    {bank.accountHolderName}
                  </div>
                  <div className="text-xs font-mono text-[#5A6962] tabular-nums" dir="ltr">
                    A/C: {bank.accountNumberMasked} · IFSC: {bank.ifscCode}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {!bank.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryBank(bank.id)}
                      className="text-[#165A45] font-medium hover:underline"
                    >
                      Set primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteBank(bank.id)}
                    className="text-[#5A6962] hover:text-red-700 inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Disclosure */}
      <div className="bg-ifaqa-cashmere/70 rounded-xl border border-ifaqa-plum/10 p-5 flex items-start gap-3 text-xs text-[#3E524A]">
        <ShieldCheck className="w-4 h-4 text-ifaqa-plum shrink-0 mt-0.5" strokeWidth={1.5} />
        <p className="leading-relaxed">
          Account numbers are masked automatically (only last 4 digits shown). IFAQA Herbal Remedies never stores debit/credit card numbers or CVVs on your browser profile.
        </p>
      </div>
    </AccountShell>
  );
}
