'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  CreditCard,
  FileText,
  Mail,
  UserCheck,
  CheckCircle2,
  Package,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <EyeOff className="w-5 h-5 text-ifaqa-sand" />,
      title: '1. Patient Health & Formulation Confidentiality',
      badge: 'SACRED MEDICAL TRUST',
      content:
        'All health queries, physical symptoms, consultation records, and purchased herbal formulations are held under strict apothecary confidentiality. We never disclose, broadcast, or discuss your health matters with any external entity or medical advertising network.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-ifaqa-sand" />,
      title: '2. Absolute Ban on Commercial Data Brokering',
      badge: 'ZERO DATA MONETIZATION',
      content:
        'IFAQA Herbal Remedies operates solely as an authentic desi dawakhana. We do not sell, rent, license, or trade customer contact details, phone numbers, or email addresses to brokers, telemarketers, or marketing aggregators under any circumstances.',
    },
    {
      icon: <Lock className="w-5 h-5 text-ifaqa-sand" />,
      title: '3. Mobile Number & Two-Factor Authentication',
      badge: 'TRANSACTIONAL USE ONLY',
      content:
        'Your registered phone number is utilized strictly for two purposes: dispatching secure one-time passcodes (OTP) for account authentication, and transmitting critical courier tracking milestones regarding your order. We never send unsolicited marketing robocalls.',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-ifaqa-sand" />,
      title: '4. Encrypted Transactions & Zero Payment Retention',
      badge: 'BANK-GRADE SECURITY',
      content:
        'All financial transactions are handled through secure, PCI-DSS compliant payment gateways governed by Reserve Bank of India (RBI) standards. IFAQA never stores or retains debit/credit card numbers, UPI PINs, or CVV credentials on our servers.',
    },
    {
      icon: <Package className="w-5 h-5 text-ifaqa-sand" />,
      title: '5. Plain & Discreet Dispatch Packaging',
      badge: 'COMPLETE TRANSIT PRIVACY',
      content:
        'To protect patron privacy upon physical delivery, all botanical remedies are sealed inside unmarked, heavy-gauge cartons without diagnostic or therapeutic labels on the exterior. Only standard courier logistics information is printed.',
    },
    {
      icon: <UserCheck className="w-5 h-5 text-ifaqa-sand" />,
      title: '6. Patron Rights: Export & Complete Record Erasure',
      badge: 'PATRON SOVEREIGNTY',
      content:
        'Every registered patron retains sovereign control over their records. You hold the unconditional right to request an export of your order history, or request permanent deletion of your phone number and customer profile by contacting our privacy officer.',
    },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24">
      {/* 1. Hero Header Banner */}
      <section className="relative w-full bg-ifaqa-plum text-ifaqa-linen py-14 md:py-20 px-4 sm:px-8 border-b border-ifaqa-sand/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">Privacy Policy</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-white/10 text-ifaqa-sand border-ifaqa-sand/60">
              Patron Confidentiality & Medical Privacy
            </ArchitecturalBadge>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Patron Confidentiality & Data Protection
          </h1>

          <p className="text-sm sm:text-base text-[#F5F0E6] font-sans max-w-3xl font-medium leading-relaxed">
            Our formal commitment to protecting your personal health details, consultation inquiries, payment transactions, and identity under the highest standards of apothecary integrity.
          </p>
        </div>
      </section>

      {/* 2. Main Privacy Document Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-10 z-10 relative">
        <div className="bg-white border-2 border-ifaqa-sand/70 shadow-2xl p-8 sm:p-14 space-y-12">
          
          {/* Top Medical Pledge */}
          <div className="p-6 sm:p-8 bg-[#FAF5EC] border-2 border-ifaqa-sand/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold">
                CANONICAL MEDICAL CONFIDENTIALITY
              </span>
              <span className="text-[10px] font-mono text-ifaqa-plum bg-white border border-ifaqa-sand/60 px-2 py-0.5 font-bold">
                REVISED 2026
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ifaqa-plum">
              The Sacred Trust of the Desi Dawakhana
            </h2>
            <p className="text-xs sm:text-sm text-ifaqa-plum/90 font-sans leading-relaxed">
              In classical medicine, the discussion of bodily imbalances and therapeutic compounding carries the weight of a solemn covenant. At IFAQA Herbal Remedies, we regard the privacy of our patrons with reverence. Whether you order digestive tonics, vitality formulations, or consult our Hakims regarding chronic ailments, your information remains safely sealed within our dispensary.
            </p>
          </div>

          {/* 3. Six Core Principles Grid */}
          <div className="space-y-6">
            <div>
              <ArchitecturalBadge variant="notched">Apothecary Privacy Tenets</ArchitecturalBadge>
              <h3 className="font-serif text-2xl font-bold text-ifaqa-plum mt-1">
                Our Legal & Ethical Safeguards
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF8F5] border border-ifaqa-sand/60 hover:border-ifaqa-plum/60 transition-all duration-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 bg-ifaqa-plum flex items-center justify-center border border-ifaqa-sand/40">
                      {sec.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ifaqa-blackberry font-bold bg-white px-2 py-0.5 border border-ifaqa-sand/40">
                      {sec.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ifaqa-plum">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Grievance Officer & Contact Desk */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen border-2 border-ifaqa-sand/60 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-ifaqa-sand" />
              <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Dispensary Grievance & Privacy Officer
              </h4>
            </div>
            <p className="text-xs text-ifaqa-linen/90 font-sans leading-relaxed max-w-3xl">
              If you have any questions regarding your health records, wish to invoke your right to record deletion, or desire clarity on how our dispensary safeguards patron data, our appointed Privacy Officer is directly available:
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-sans text-ifaqa-linen/95 border-t border-white/20 pt-4">
              <div>
                <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold">Official Desk:</span>
                <span className="font-serif font-bold text-white">Dispensary Privacy & Compliance Office</span>
              </div>
              <div>
                <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold">Email Direct:</span>
                <span className="font-mono text-white">privacy@ifaqaremedies.com</span>
              </div>
              <div>
                <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold">Response Guarantee:</span>
                <span className="font-serif text-white">Within 48 Business Hours</span>
              </div>
            </div>
          </div>

          {/* 5. Bottom Navigation Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-ifaqa-sand/40">
            <div>
              <h4 className="font-serif text-lg font-bold text-ifaqa-plum">
                Have Inquiries or Need Guidance?
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans mt-0.5">
                Our dispensary desk is at your service for consultations and order assistance.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href="/contact" className="flex-1 sm:flex-none">
                <Button3D variant="primary" size="md" className="w-full justify-center font-bold">
                  <span>Contact Dispensary</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
                </Button3D>
              </Link>
              <Link href="/" className="flex-1 sm:flex-none">
                <button className="w-full px-5 py-3 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm">
                  Return to Home
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
