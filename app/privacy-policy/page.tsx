'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Button3D } from '@/components/ui/Button3D';
import { ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  const content = {
    badge: 'Privacy Policy',
    title: 'Privacy policy and customer data',
    subtitle: 'How IFAQA Herbal Remedies handles your contact details, orders, and payments.',
    introTitle: 'Overview',
    introDesc: 'We collect only the information needed to fulfill and deliver your orders accurately. Customer details are kept confidential and are never shared with third-party data brokers or external marketers.',
    sec1Title: '1. Information collected',
    sec1Desc: 'Your full name, mobile phone number (for OTP sign-in and delivery notifications), street address, and item selection.',
    sec2Title: '2. How details are used',
    sec2Desc: 'Used solely to verify customer orders, dispatch parcels from Saharanpur, share courier tracking updates, and respond to questions.',
    sec3Title: '3. Zero third-party selling',
    sec3Desc: 'We never sell, rent, or trade your mobile number, email address, or order records to external advertisers or marketing lists.',
    sec4Title: '4. Payment handling',
    sec4Desc: 'Online payments process through encrypted payment gateways. We never store card numbers, CVV codes, or bank passwords.',
    sec5Title: '5. Discreet outer packaging',
    sec5Desc: 'Parcels ship in plain protective outer boxes without product illness descriptions printed on the shipping label.',
    sec6Title: '6. Updating or deleting your record',
    sec6Desc: 'Contact our Saharanpur support desk anytime to review, update, or remove your saved customer account details.',
    grievanceTitle: 'Privacy inquiries and data requests',
    grievanceDesc: 'To request updates or deletion of your order contact history, reach our Saharanpur office directly:',
    officerLabel: 'Office',
    officerValue: 'IFAQA Herbal Remedies, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)',
    emailLabel: 'Email',
    emailValue: 'support@ifaqa.in',
    phoneLabel: 'Phone',
    phoneValue: '+91 97298 40336',
    ctaTitle: 'Questions about an order or delivery',
    ctaSubtitle: 'Message our customer support team directly.',
    contactBtn: 'Contact support',
    shopBtn: 'Browse products',
  };

  const sections = [
    { title: content.sec1Title, desc: content.sec1Desc },
    { title: content.sec2Title, desc: content.sec2Desc },
    { title: content.sec3Title, desc: content.sec3Desc },
    { title: content.sec4Title, desc: content.sec4Desc },
    { title: content.sec5Title, desc: content.sec5Desc },
    { title: content.sec6Title, desc: content.sec6Desc },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-20 w-full font-sans">
      <section className="w-full border-b border-ifaqa-plum/10 bg-ifaqa-linen py-10 md:py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6962]">
            <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ifaqa-plum font-medium">{content.badge}</span>
          </nav>
          <h1 className="font-serif font-normal text-3xl sm:text-5xl text-ifaqa-plum leading-tight">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 space-y-12">
        {/* Intro */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-ifaqa-plum/10 shadow-luxury-card space-y-2 max-w-4xl">
          <h2 className="font-serif font-normal text-2xl text-ifaqa-plum">
            {content.introTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
            {content.introDesc}
          </p>
        </div>

        {/* Policy Clauses (Clean 2-column reading structure) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-ifaqa-plum/10 space-y-2"
            >
              <h3 className="text-base font-semibold text-ifaqa-plum">
                {sec.title}
              </h3>
              <p className="text-sm text-[#5A6962] leading-relaxed">
                {sec.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Grievance Contact */}
        <div className="p-6 sm:p-8 rounded-2xl bg-ifaqa-cashmere border border-ifaqa-plum/10 space-y-4">
          <h3 className="font-serif font-normal text-2xl text-ifaqa-plum">
            {content.grievanceTitle}
          </h3>
          <p className="text-sm text-[#3E524A] leading-relaxed max-w-3xl">
            {content.grievanceDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-sm">
            <div className="p-4 rounded-xl bg-white border border-ifaqa-plum/10">
              <span className="text-xs text-[#5A6962] block">{content.officerLabel}</span>
              <span className="font-medium text-ifaqa-plum block mt-1">{content.officerValue}</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-ifaqa-plum/10">
              <span className="text-xs text-[#5A6962] block">{content.emailLabel}</span>
              <a href="mailto:support@ifaqa.in" dir="ltr" className="font-mono text-ifaqa-plum hover:underline block mt-1 break-all">
                {content.emailValue}
              </a>
            </div>
            <div className="p-4 rounded-xl bg-white border border-ifaqa-plum/10">
              <span className="text-xs text-[#5A6962] block">{content.phoneLabel}</span>
              <a href="tel:+919729840336" dir="ltr" className="font-mono text-ifaqa-plum hover:underline block mt-1 tabular-nums">
                {content.phoneValue}
              </a>
            </div>
          </div>
        </div>

        {/* Action Strip */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-ifaqa-plum/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-start">
            <h4 className="font-serif font-normal text-2xl text-ifaqa-plum">
              {content.ctaTitle}
            </h4>
            <p className="text-sm text-[#5A6962]">
              {content.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button3D variant="primary" size="md">
                <span>{content.contactBtn}</span>
                <ArrowRight className="w-4 h-4 ms-2" strokeWidth={1.5} />
              </Button3D>
            </Link>
            <Link href="/catalog">
              <Button3D variant="outline" size="md">
                {content.shopBtn}
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
