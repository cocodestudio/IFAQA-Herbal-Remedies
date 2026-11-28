'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  User,
  Package,
  MapPin,
  Landmark,
  Bell,
  LifeBuoy,
  LogOut,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { triggerNavigationProgress } from '@/lib/nav-progress';

interface AccountShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AccountShell({ title, subtitle, children }: AccountShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
  const { language, t } = useLanguage();

  const labels = {
    en: {
      breadcrumbAccount: 'Account',
      settingsHeading: 'Account settings',
      verifiedMember: 'Verified mobile account',
      signOut: 'Sign out',
      guestTitle: 'Sign in to access your account',
      guestSubtitle:
        'Manage your personal details, track active orders, save delivery addresses, and set up bank or UPI details for refunds.',
      signInCta: 'Sign in with mobile OTP',
      browseCta: 'Browse catalog',
      nav: {
        profile: 'My Account',
        profileSub: 'Personal info & overview',
        orders: 'My Orders',
        ordersSub: 'Track, reorder & receipts',
        addresses: 'Saved Addresses',
        addressesSub: 'Delivery PIN codes & homes',
        reviews: 'My Reviews',
        reviewsSub: 'Ratings & feedback you shared',
        bank: 'Bank & UPI Details',
        bankSub: 'Refund accounts & UPI IDs',
        notifications: 'Preferences & Privacy',
        notificationsSub: 'Alerts, language & data',
        support: 'Help & Support',
        supportSub: 'Tickets & Saharanpur desk',
      },
    },
    hi: {
      breadcrumbAccount: 'मेरा खाता',
      settingsHeading: 'खाता सेटिंग्स',
      verifiedMember: 'सत्यापित मोबाइल खाता',
      signOut: 'साइन आउट',
      guestTitle: 'अपना खाता देखने के लिए साइन इन करें',
      guestSubtitle:
        'अपनी व्यक्तिगत जानकारी प्रबंधित करें, ऑर्डर ट्रैक करें, डिलीवरी पते सहेजें और रिफंड के लिए बैंक या UPI विवरण जोड़ें।',
      signInCta: 'मोबाइल OTP से साइन इन करें',
      browseCta: 'सभी उत्पाद देखें',
      nav: {
        profile: 'मेरा प्रोफ़ाइल',
        profileSub: 'व्यक्तिगत जानकारी और सारांश',
        orders: 'मेरे ऑर्डर',
        ordersSub: 'ट्रैक करें और फिर से ऑर्डर करें',
        addresses: 'सहेजे गए पते',
        addressesSub: 'डिलीवरी पिन कोड और पते',
        reviews: 'मेरी समीक्षाएं',
        reviewsSub: 'आपकी उत्पाद रेटिंग और प्रतिक्रिया',
        bank: 'बैंक और UPI विवरण',
        bankSub: 'रिफंड खाता और UPI आईडी',
        notifications: 'प्राथमिकताएं और गोपनीयता',
        notificationsSub: 'अलर्ट, भाषा और डेटा',
        support: 'सहायता और समर्थन',
        supportSub: 'शिकायत टिकट और संपर्क',
      },
    },
    ur: {
      breadcrumbAccount: 'میرا اکاؤنٹ',
      settingsHeading: 'اکاؤنٹ سیٹنگز',
      verifiedMember: 'تصدیق شدہ موبائل اکاؤنٹ',
      signOut: 'سائن آؤٹ',
      guestTitle: 'اپنا اکاؤنٹ کھولنے کے لیے سائن ان کریں',
      guestSubtitle:
        'اپنی ذاتی معلومات، آرڈرز کی ٹریکنگ، ڈلیوری پتے اور ریفنڈ کے لیے بینک یا یو پی آئی کی تفصیلات منظم کریں۔',
      signInCta: 'موبائل OTP سے سائن ان کریں',
      browseCta: 'مصنوعات دیکھیں',
      nav: {
        profile: 'میرا اکاؤنٹ',
        profileSub: 'ذاتی معلومات اور خلاصہ',
        orders: 'میرے آرڈرز',
        ordersSub: 'ٹریکنگ اور دوبارہ آرڈر',
        addresses: 'محفوظ پتے',
        addressesSub: 'ڈلیوری پن کوڈ اور پتے',
        reviews: 'میرے تبصرے',
        reviewsSub: 'آپ کی درجہ بندی اور آراء',
        bank: 'بینک اور UPI تفصیلات',
        bankSub: 'ریفنڈ اکاؤنٹ اور یو پی آئی',
        notifications: 'ترجیحات اور رازداری',
        notificationsSub: 'الرٹس، زبان اور ڈیٹا',
        support: 'ہیلپ اینڈ سپورٹ',
        supportSub: 'ٹکٹ اور کسٹمر ڈیسک',
      },
    },
  }[language] || {
    breadcrumbAccount: 'Account',
    settingsHeading: 'Account settings',
    verifiedMember: 'Verified mobile account',
    signOut: 'Sign out',
    guestTitle: 'Sign in to access your account',
    guestSubtitle:
      'Manage your personal details, track active orders, save delivery addresses, and set up bank or UPI details for refunds.',
    signInCta: 'Sign in with mobile OTP',
    browseCta: 'Browse catalog',
    nav: {
      profile: 'My Account',
      profileSub: 'Personal info & overview',
      orders: 'My Orders',
      ordersSub: 'Track, reorder & receipts',
      addresses: 'Saved Addresses',
      addressesSub: 'Delivery PIN codes & homes',
      reviews: 'My Reviews',
      reviewsSub: 'Ratings & feedback you shared',
      bank: 'Bank & UPI Details',
      bankSub: 'Refund accounts & UPI IDs',
      notifications: 'Preferences & Privacy',
      notificationsSub: 'Alerts, language & data',
      support: 'Help & Support',
      supportSub: 'Tickets & Saharanpur desk',
    },
  };

  const navItems = [
    { href: '/account', label: labels.nav.profile, sub: labels.nav.profileSub, icon: User },
    { href: '/account/orders', label: labels.nav.orders, sub: labels.nav.ordersSub, icon: Package },
    { href: '/account/addresses', label: labels.nav.addresses, sub: labels.nav.addressesSub, icon: MapPin },
    { href: '/account/reviews', label: labels.nav.reviews, sub: labels.nav.reviewsSub, icon: Star },
    { href: '/account/bank', label: labels.nav.bank, sub: labels.nav.bankSub, icon: Landmark },
    { href: '/account/notifications', label: labels.nav.notifications, sub: labels.nav.notificationsSub, icon: Bell },
    { href: '/account/support', label: labels.nav.support, sub: labels.nav.supportSub, icon: LifeBuoy },
  ];

  const handleSignOut = async () => {
    await signOut();
    triggerNavigationProgress('/');
    router.push('/');
  };

  const displayName = user?.displayName && user.displayName !== 'Customer' ? user.displayName : 'IFAQA Member';
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'CM';

  if (!isAuthenticated || !user) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 select-none font-sans">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-ifaqa-plum/10 shadow-luxury-card p-8 sm:p-10 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center mx-auto border border-ifaqa-plum/10">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif font-normal text-3xl text-ifaqa-plum">
              {labels.guestTitle}
            </h1>
            <p className="text-sm text-[#5A6962] leading-relaxed">
              {labels.guestSubtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/sign-in"
              className="w-full sm:w-auto h-11 px-6 rounded-lg bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>{labels.signInCta}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="/catalog"
              className="w-full sm:w-auto h-11 px-6 rounded-lg bg-white border border-ifaqa-plum/15 text-ifaqa-plum hover:bg-ifaqa-cashmere text-sm font-medium inline-flex items-center justify-center transition-colors"
            >
              {labels.browseCta}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-10 select-none font-sans">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center flex-wrap gap-2 text-xs text-[#5A6962]">
        <Link href="/" className="hover:text-ifaqa-plum transition-colors">
          {t('home')}
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/account" className="hover:text-ifaqa-plum transition-colors">
          {labels.breadcrumbAccount}
        </Link>
        {pathname !== '/account' && (
          <>
            <span aria-hidden="true">/</span>
            <span className="text-ifaqa-plum font-medium">{title}</span>
          </>
        )}
      </nav>

      {/* Page Title */}
      <div className="mb-6 border-b border-ifaqa-plum/10 pb-5">
        <h1 className="font-serif font-normal text-3xl sm:text-4xl text-ifaqa-plum">
          {title}
        </h1>
        <p className="text-sm text-[#3E524A] mt-1.5 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Main Split: Sticky Left Settings Sidebar + Right Section Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Settings Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-20 bg-white rounded-xl border border-ifaqa-plum/10 shadow-luxury-card overflow-hidden">
          {/* Customer Identity Header */}
          <div className="p-4 sm:p-5 bg-ifaqa-cashmere/70 border-b border-ifaqa-plum/10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-ifaqa-plum text-ifaqa-linen flex items-center justify-center font-serif text-base font-medium shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-ifaqa-plum truncate">
                {displayName}
              </div>
              <div className="text-xs font-mono text-[#5A6962] tabular-nums truncate" dir="ltr">
                {user.phoneNumber}
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#165A45] mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{labels.verifiedMember}</span>
              </div>
            </div>
          </div>

          {/* Mobile Horizontal Section Strip (< lg) */}
          <nav
            aria-label="Account sections"
            className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar p-3 border-b border-ifaqa-plum/10"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 border transition-colors ${
                    isActive
                      ? 'bg-ifaqa-plum text-ifaqa-linen border-ifaqa-plum'
                      : 'bg-white text-[#5A6962] border-ifaqa-plum/15 hover:text-ifaqa-plum hover:bg-ifaqa-linen'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Vertical Settings Menu (>= lg) */}
          <nav aria-label={labels.settingsHeading} className="hidden lg:block p-3 space-y-1">
            <div className="px-3 pt-1 pb-2 text-xs font-medium text-[#5A6962]">
              {labels.settingsHeading}
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-ifaqa-cashmere text-ifaqa-plum font-medium border-s-2 border-ifaqa-mauve'
                      : 'text-[#5A6962] hover:bg-ifaqa-linen hover:text-ifaqa-plum'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-ifaqa-plum' : 'text-[#5A6962] group-hover:text-ifaqa-plum'
                      }`}
                      strokeWidth={1.5}
                    />
                    <div className="min-w-0">
                      <span className="text-sm block truncate">{item.label}</span>
                      <span className="text-[11px] text-[#5A6962] block truncate font-normal">
                        {item.sub}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-ifaqa-plum' : 'text-[#5A6962]/50 group-hover:text-ifaqa-plum'
                    }`}
                    strokeWidth={1.5}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Sign Out Footer inside Sidebar */}
          <div className="p-3 border-t border-ifaqa-plum/10">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full h-10 px-3 rounded-lg flex items-center gap-2.5 text-sm font-medium text-[#5A6962] hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              <span>{labels.signOut}</span>
            </button>
          </div>
        </aside>

        {/* Right Main Content */}
        <section className="flex-1 w-full min-w-0 space-y-6">
          {children}
        </section>
      </div>
    </div>
  );
}
