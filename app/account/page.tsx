'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  MapPin,
  Landmark,
  LifeBuoy,
  Check,
  ShieldCheck,
  ArrowRight,
  Star,
  User as UserIcon,
} from 'lucide-react';
import { AccountShell } from '@/components/account/AccountShell';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import {
  getAccountProfile,
  saveAccountProfile,
  getSavedAddresses,
  getBankAccounts,
  getUpiIds,
  syncCustomerAccountFromDb,
  CustomerAccountProfile,
} from '@/lib/account-storage';
import { getCustomerOrders } from '@/lib/orders-service';
import { getReviewsByCustomer } from '@/lib/reviews-service';
import { Button3D } from '@/components/ui/Button3D';

export default function MyAccountPage() {
  const { user, updateDisplayName } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [profile, setProfile] = useState<CustomerAccountProfile>({
    fullName: '',
    email: '',
    alternatePhone: '',
    gender: 'prefer_not_to_say',
    updatedAt: '',
  });
  const [orderCount, setOrderCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);
  const [payoutCount, setPayoutCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    const refreshFromCache = () => {
      const loaded = getAccountProfile(user.uid);
      setProfile({
        ...loaded,
        fullName: loaded.fullName || (user.displayName !== 'Customer' ? user.displayName || '' : ''),
      });
      setAddressCount(getSavedAddresses(user.uid).length);
      setPayoutCount(getBankAccounts(user.uid).length + getUpiIds(user.uid).length);
    };

    refreshFromCache();
    syncCustomerAccountFromDb(user.uid).then((synced) => {
      if (synced) refreshFromCache();
    });

    getCustomerOrders(user.uid, user.phoneNumber).then((orders) => {
      setOrderCount(orders.length);
    });
    getReviewsByCustomer(user.uid, user.phoneNumber).then((revs) => {
      setReviewCount(revs.length);
    });
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    saveAccountProfile(user.uid, profile);
    if (profile.fullName.trim()) {
      updateDisplayName(profile.fullName.trim());
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2400);
  };

  const quickShortcuts = [
    {
      href: '/account/orders',
      title: 'My Orders',
      desc: 'Track courier status, inspect receipts, or reorder formulations',
      icon: Package,
      meta: `${orderCount} orders`,
    },
    {
      href: '/account/addresses',
      title: 'Saved Addresses',
      desc: 'Manage delivery addresses and default Indian PIN codes',
      icon: MapPin,
      meta: `${addressCount} saved`,
    },
    {
      href: '/account/bank',
      title: 'Bank & UPI Details',
      desc: 'Add refund bank accounts and verified UPI IDs cleanly',
      icon: Landmark,
      meta: `${payoutCount} linked`,
    },
    {
      href: '/account/reviews',
      title: 'My Reviews',
      desc: 'View, edit, or delete all product reviews you submitted',
      icon: Star,
      meta: `${reviewCount} reviews`,
    },
    {
      href: '/account/support',
      title: 'Help & Support',
      desc: 'Contact our Saharanpur dispensary desk or track open tickets',
      icon: LifeBuoy,
      meta: 'Mon–Sat desk',
    },
  ];

  return (
    <AccountShell
      title="My Account"
      subtitle="Manage your personal information, saved delivery details, orders, and payout preferences."
    >
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/account/orders"
          className="bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 p-5 shadow-luxury-card transition-colors group"
        >
          <div className="flex items-center justify-between text-xs text-[#5A6962]">
            <span>Total Orders</span>
            <Package className="w-4 h-4 text-[#5A6962] group-hover:text-ifaqa-plum" strokeWidth={1.5} />
          </div>
          <div className="font-serif text-3xl text-ifaqa-plum mt-2 tabular-nums">
            {orderCount}
          </div>
          <span className="text-xs text-[#165A45] font-medium mt-1 inline-flex items-center gap-1">
            <span>View order history</span>
            <ArrowRight className="w-3.5 h-3.5 rtl-flip" strokeWidth={1.5} />
          </span>
        </Link>

        <Link
          href="/account/addresses"
          className="bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 p-5 shadow-luxury-card transition-colors group"
        >
          <div className="flex items-center justify-between text-xs text-[#5A6962]">
            <span>Saved Addresses</span>
            <MapPin className="w-4 h-4 text-[#5A6962] group-hover:text-ifaqa-plum" strokeWidth={1.5} />
          </div>
          <div className="font-serif text-3xl text-ifaqa-plum mt-2 tabular-nums">
            {addressCount}
          </div>
          <span className="text-xs text-[#165A45] font-medium mt-1 inline-flex items-center gap-1">
            <span>Manage addresses</span>
            <ArrowRight className="w-3.5 h-3.5 rtl-flip" strokeWidth={1.5} />
          </span>
        </Link>

        <Link
          href="/account/bank"
          className="bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 p-5 shadow-luxury-card transition-colors group"
        >
          <div className="flex items-center justify-between text-xs text-[#5A6962]">
            <span>Bank & UPI Methods</span>
            <Landmark className="w-4 h-4 text-[#5A6962] group-hover:text-ifaqa-plum" strokeWidth={1.5} />
          </div>
          <div className="font-serif text-3xl text-ifaqa-plum mt-2 tabular-nums">
            {payoutCount}
          </div>
          <span className="text-xs text-[#165A45] font-medium mt-1 inline-flex items-center gap-1">
            <span>Configure refund details</span>
            <ArrowRight className="w-3.5 h-3.5 rtl-flip" strokeWidth={1.5} />
          </span>
        </Link>
      </div>

      {/* Personal Information Form */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-white rounded-xl border border-ifaqa-plum/10 p-6 sm:p-7 shadow-luxury-card space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ifaqa-plum/10">
          <div className="flex items-center gap-2.5">
            <UserIcon className="w-4 h-4 text-[#5A6962]" strokeWidth={1.5} />
            <h2 className="font-serif text-xl text-ifaqa-plum">Personal information</h2>
          </div>
          {savedToast && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#165A45] bg-[#E8F3EE] px-3 py-1 rounded">
              <Check className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Profile updated</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              placeholder="e.g. Nadeem Ahmad"
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Registered Mobile Number
            </label>
            <div className="h-11 px-3.5 rounded-lg border border-ifaqa-plum/10 bg-ifaqa-linen flex items-center justify-between text-sm font-mono text-ifaqa-plum tabular-nums" dir="ltr">
              <span>{user?.phoneNumber}</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-[#165A45]">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                Verified
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Alternate Phone (Optional)
            </label>
            <input
              type="tel"
              value={profile.alternatePhone}
              onChange={(e) => setProfile({ ...profile, alternatePhone: e.target.value })}
              placeholder="+91 98765 43210"
              dir="ltr"
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm font-mono text-ifaqa-plum bg-white tabular-nums"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Gender
            </label>
            <select
              value={profile.gender}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  gender: e.target.value as CustomerAccountProfile['gender'],
                })
              }
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
            >
              <option value="prefer_not_to_say">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-ifaqa-plum mb-1.5">
              Storefront Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="w-full h-11 px-3.5 rounded-lg border border-ifaqa-plum/15 focus:border-ifaqa-plum focus:outline-none text-sm text-ifaqa-plum bg-white"
            >
              <option value="en">English (Default)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="ur">اردو (Urdu - RTL)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Button3D type="submit" variant="primary" size="md">
            Save profile changes
          </Button3D>
        </div>
      </form>

      {/* Quick Account Shortcuts Grid (Amazon/Flipkart Pattern) */}
      <div className="space-y-3">
        <h2 className="font-serif text-xl text-ifaqa-plum">Your account sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickShortcuts.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white rounded-xl border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 p-5 shadow-luxury-card flex items-start gap-4 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-ifaqa-plum group-hover:text-ifaqa-blackberry">
                      {card.title}
                    </h3>
                    <span className="text-xs font-mono text-[#5A6962] tabular-nums">
                      {card.meta}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A6962] mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AccountShell>
  );
}
