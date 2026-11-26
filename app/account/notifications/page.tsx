'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Download, Trash2, Check, Globe, ShieldCheck } from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import {
  CustomerPreferences,
  getAccountPrefs,
  saveAccountPrefs,
  getAccountProfile,
  getSavedAddresses,
  getBankAccounts,
  getUpiIds,
  syncCustomerAccountFromDb,
  clearCustomerAccountLocalData,
} from '@/lib/account-storage';

export default function AccountNotificationsPage() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [prefs, setPrefs] = useState<CustomerPreferences>({
    orderSms: true,
    dispatchUpdates: true,
    restockAlerts: false,
    promotionalEmails: false,
  });
  const [savedFlag, setSavedFlag] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    setPrefs(getAccountPrefs(user.uid));
    syncCustomerAccountFromDb(user.uid).then(() => {
      setPrefs(getAccountPrefs(user.uid));
    });
  }, [user]);

  const togglePref = (key: keyof CustomerPreferences) => {
    if (!user?.uid) return;
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    saveAccountPrefs(user.uid, updated);
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 1800);
  };

  const handleDownloadSummary = () => {
    if (!user?.uid) return;
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      account: {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        profile: getAccountProfile(user.uid),
      },
      savedAddresses: getSavedAddresses(user.uid),
      refundMethods: {
        upiIds: getUpiIds(user.uid),
        bankAccounts: getBankAccounts(user.uid),
      },
      preferences: getAccountPrefs(user.uid),
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ifaqa-account-summary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearLocalData = () => {
    if (!user?.uid) return;
    clearCustomerAccountLocalData(user.uid);
    setPrefs(getAccountPrefs(user.uid));
    setConfirmClear(false);
    setSavedFlag(true);
    setTimeout(() => setSavedFlag(false), 1800);
  };

  const toggles: Array<{
    key: keyof CustomerPreferences;
    title: string;
    desc: string;
  }> = [
    {
      key: 'orderSms',
      title: 'Order confirmation SMS',
      desc: 'Receive SMS confirmation on your verified mobile number when an order is placed.',
    },
    {
      key: 'dispatchUpdates',
      title: 'Courier tracking & dispatch alerts',
      desc: 'Notifications when your remedies leave our Saharanpur dispensary with courier details.',
    },
    {
      key: 'restockAlerts',
      title: 'Seasonal formulation restock alerts',
      desc: 'One-time notice when out-of-batch seasonal preparations become available.',
    },
    {
      key: 'promotionalEmails',
      title: 'Herbal advisories & seasonal catalogs',
      desc: 'Occasional dispensary updates and seasonal wellness notes.',
    },
  ];

  return (
    <AccountShell
      title="Preferences & Privacy"
      subtitle="Control order notifications, storefront display language, and your stored customer information."
    >
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-ifaqa-plum/10">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <h2 className="font-serif text-xl text-ifaqa-plum">Notification preferences</h2>
          </div>
          {savedFlag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#E8F3EE] text-[#165A45] text-xs font-medium">
              <Check className="w-3.5 h-3.5" strokeWidth={2} />
              Saved
            </span>
          )}
        </div>

        <div className="divide-y divide-ifaqa-plum/10">
          {toggles.map((item) => {
            const active = prefs[item.key];
            return (
              <div
                key={item.key}
                className="py-4 first:pt-1 last:pb-1 flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-sm font-medium text-ifaqa-plum">{item.title}</h3>
                  <p className="text-xs text-[#5A6962] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => togglePref(item.key)}
                  className={`w-11 h-6 rounded-md p-0.5 transition-colors shrink-0 flex items-center ${
                    active ? 'bg-ifaqa-plum justify-end' : 'bg-ifaqa-plum/15 justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-sm bg-white shadow-sm block" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Storefront Language */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-ifaqa-plum/10">
          <Globe className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <h2 className="font-serif text-xl text-ifaqa-plum">Preferred language</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              { code: 'en', name: 'English', note: 'International default' },
              { code: 'hi', name: 'हिंदी (Hindi)', note: 'Devanagari UI' },
              { code: 'ur', name: 'اردو (Urdu)', note: 'Right-to-left (RTL)' },
            ] as Array<{ code: LanguageCode; name: string; note: string }>
          ).map((opt) => (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`p-3.5 rounded-lg border text-start transition-colors ${
                language === opt.code
                  ? 'bg-ifaqa-cashmere border-ifaqa-plum text-ifaqa-plum'
                  : 'bg-white border-ifaqa-plum/15 text-[#5A6962] hover:bg-ifaqa-linen'
              }`}
            >
              <span className="text-sm font-semibold text-ifaqa-plum block">{opt.name}</span>
              <span className="text-xs text-[#5A6962] block mt-0.5">{opt.note}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy & Account Data Controls */}
      <div className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 shadow-luxury-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-ifaqa-plum/10">
          <ShieldCheck className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
          <h2 className="font-serif text-xl text-ifaqa-plum">Privacy & stored account data</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadSummary}
            className="h-10 px-4 rounded-lg bg-white border border-ifaqa-plum/15 hover:bg-ifaqa-cashmere text-ifaqa-plum text-xs font-medium inline-flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <span>Download my saved data (JSON)</span>
          </button>

          {!confirmClear ? (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="h-10 px-4 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-700 text-xs font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              <span>Clear saved profile & addresses</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 text-xs">
              <span className="text-red-900">Clear saved browser profile data?</span>
              <button
                type="button"
                onClick={handleClearLocalData}
                className="px-2.5 py-1 rounded bg-red-700 text-white font-medium"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-2 py-1 text-[#5A6962] hover:text-ifaqa-plum"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-[#5A6962]">
          Review full terms on our{' '}
          <Link href="/privacy-policy" className="text-ifaqa-plum font-medium underline">
            Privacy Policy
          </Link>{' '}
          page.
        </p>
      </div>
    </AccountShell>
  );
}
