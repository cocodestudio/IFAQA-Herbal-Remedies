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
  ArrowRight,
  Server,
  Users,
  Check,
  Clock,
  KeyRound,
  FileCheck
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const tenets = [
    {
      icon: <EyeOff className="w-6 h-6 text-ifaqa-sand" />,
      title: '1. Patient Health & Formulation Confidentiality',
      badge: 'SACRED MEDICAL PRIVACY',
      content:
        'All health queries, physical symptoms, consultation records, and purchased botanical remedies are protected under sacred apothecary confidentiality. We never disclose, broadcast, or discuss your health matters with any external entity, insurer, or medical advertising network.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-ifaqa-sand" />,
      title: '2. Absolute Ban on Commercial Data Brokering',
      badge: 'ZERO DATA MONETIZATION',
      content:
        'IFAQA Herbal Remedies operates solely as an authentic desi dawakhana. We do not sell, rent, license, or trade patron contact details, mobile numbers, or email addresses to commercial brokers, telemarketers, or marketing aggregators under any circumstances.',
    },
    {
      icon: <Lock className="w-6 h-6 text-ifaqa-sand" />,
      title: '3. Mobile Number & Two-Factor Authentication Protocol',
      badge: 'TRANSACTIONAL PURPOSE ONLY',
      content:
        'Your registered phone number is utilized strictly for two functional purposes: dispatching secure one-time passcodes (OTP) for account authentication, and transmitting critical courier tracking milestones regarding your order. We never conduct unsolicited robocalls.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-ifaqa-sand" />,
      title: '4. Encrypted Transactions & Zero Payment Retention',
      badge: 'BANK-GRADE PCI-DSS SECURITY',
      content:
        'All financial transactions are handled through secure, PCI-DSS compliant payment gateways governed by Reserve Bank of India (RBI) standards. IFAQA never stores or retains debit/credit card numbers, UPI PINs, or CVV credentials on our servers.',
    },
    {
      icon: <Package className="w-6 h-6 text-ifaqa-sand" />,
      title: '5. Plain & Discreet Dispatch Packaging',
      badge: 'COMPLETE TRANSIT PRIVACY',
      content:
        'To protect patron privacy upon physical delivery, all botanical remedies are sealed inside unmarked, heavy-gauge cartons without diagnostic or therapeutic labels on the exterior. Only standard courier logistics information is printed.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-ifaqa-sand" />,
      title: '6. Patron Sovereignty & Complete Record Erasure',
      badge: 'UNCONDITIONAL PATRON RIGHTS',
      content:
        'Every registered patron retains sovereign control over their records. You hold the unconditional right to request an export of your order history, or request permanent deletion of your phone number and customer profile by contacting our privacy officer.',
    },
    {
      icon: <Server className="w-6 h-6 text-ifaqa-sand" />,
      title: '7. Cryptographic Protection & Infrastructure Security',
      badge: 'TLS 1.3 ENCRYPTION',
      content:
        'All interactions across our online dispensary are encrypted in transit using industry-standard TLS 1.3 cryptography. Server data is isolated behind strict firewall access controls with role-based authentication.',
    },
    {
      icon: <Users className="w-6 h-6 text-ifaqa-sand" />,
      title: '8. Minor Protection & Family Consultations',
      badge: 'GUARDIAN CONSENT MANDATE',
      content:
        'We do not knowingly collect personal data from minors under 18 years of age without explicit guardian involvement. Consultations for adolescents are conducted solely through verified parent or guardian representation.',
    },
  ];

  const patronRights = [
    {
      right: 'Right to Access & Inspection',
      desc: 'You may at any time request a comprehensive ledger of all remedies ordered, consultations logged, and addresses on file.',
    },
    {
      right: 'Right to Rectification',
      desc: 'You may update or correct outdated phone numbers, delivery pincodes, or medical history details at will.',
    },
    {
      right: 'Right to Complete Erasure (Be Forgotten)',
      desc: 'Upon written notice to our Privacy Officer, all customer records and contact logs will be permanently deleted from our active database.',
    },
    {
      right: 'Right to Restrict Processing',
      desc: 'You may revoke authorization for SMS dispatch updates while maintaining essential patron account status.',
    },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24 w-full">
      {/* 1. Full-Width Grand Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen py-20 md:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-ifaqa-sand/50 overflow-hidden">
        {/* Ambient Gold Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(197,160,89,0.12)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative w-full max-w-[1720px] mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">Patron Privacy Policy</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-[#FAF5EC] text-ifaqa-plum border border-[#DFBA73] font-serif font-bold text-xs shadow-md">
              Patron Confidentiality & Medical Privacy Charter
            </ArchitecturalBadge>
          </div>

          <div className="max-w-5xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              Patron Confidentiality & Data Protection Charter
            </h1>

            <p className="text-base sm:text-xl text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-4xl">
              Our formal commitment to protecting your personal health details, consultation inquiries, payment transactions, and identity under the highest standards of apothecary integrity.
            </p>
          </div>

          {/* Quick Assurance Badges */}
          <div className="pt-4 flex flex-wrap gap-4 items-center text-xs font-mono tracking-wider text-ifaqa-sand">
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>ZERO THIRD-PARTY DATA BROKERING</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>PCI-DSS ENCRYPTED PAYMENT PROTOCOLS</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>UNCONDITIONAL RECORD ERASURE RIGHTS</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Full-Width Content Layout */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 space-y-16">
        
        {/* Top Pledge Callout */}
        <div className="p-8 sm:p-12 bg-white border-2 border-ifaqa-sand/70 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ifaqa-sand/30 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold bg-ifaqa-plum text-white px-2.5 py-1 inline-block">
              CANONICAL MEDICAL CONFIDENTIALITY
            </span>
            <span className="text-xs font-mono text-ifaqa-blackberry font-bold bg-[#FAF8F5] border border-ifaqa-sand/60 px-3 py-1">
              STATUTORY COMPLIANCE • REVISED 2026
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum leading-snug">
            The Sacred Covenant of the Desi Dawakhana
          </h2>

          <p className="text-sm sm:text-base text-ifaqa-plum/90 font-sans leading-relaxed">
            In classical Unani and Ayurvedic traditions, the discussion of bodily ailments, humors (*Akhlat*), and individual prescriptions carries the sanctity of a physician’s sacred covenant. At IFAQA Herbal Remedies, we treat our patrons’ health information with the highest degree of medical privacy. Whether you order digestive tonics, seek consultation for vitality, or consult our Hakims regarding chronic musculoskeletal discomfort, your records remain safely sealed within our dawakhana.
          </p>
        </div>

        {/* 3. The 8 Core Tenets Grid (Full-Width 2x4 Layout) */}
        <div className="space-y-8">
          <div>
            <ArchitecturalBadge variant="notched">Statutory & Ethical Safeguards</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              The Eight Tenets of Patron Privacy
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 max-w-3xl leading-relaxed">
              Every principle below is strictly enforced across our digital systems, dispensary staff, and courier logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tenets.map((tenet, idx) => (
              <div
                key={idx}
                className="p-8 bg-white border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum transition-all duration-200 shadow-md space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-ifaqa-plum flex items-center justify-center border-2 border-ifaqa-sand/50 shadow-md">
                      {tenet.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ifaqa-blackberry font-bold bg-[#FAF8F5] px-2.5 py-1 border border-ifaqa-sand/40">
                      {tenet.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-ifaqa-plum">
                    {tenet.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-ifaqa-plum/85 font-sans leading-relaxed">
                    {tenet.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Patron Sovereignty: The 4 Inalienable Rights */}
        <div className="space-y-8 pt-8 border-t-2 border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="chamfer">Patron Sovereignty</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              Your Inalienable Rights as an IFAQA Patron
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 max-w-3xl leading-relaxed">
              You retain sovereign control over your medical and transactional identity at all times.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {patronRights.map((r, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FAF8F5] border-2 border-ifaqa-sand/60 shadow-md space-y-3"
              >
                <div className="w-8 h-8 bg-ifaqa-plum text-ifaqa-sand flex items-center justify-center font-mono font-bold text-xs border border-ifaqa-sand/40">
                  0{idx + 1}
                </div>
                <h4 className="font-serif text-base font-bold text-ifaqa-plum">
                  {r.right}
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Statutory Grievance & Privacy Officer Panel */}
        <div className="p-8 sm:p-14 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen border-2 border-ifaqa-sand/70 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center text-ifaqa-sand">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold block">
                STATUTORY DISPENSARY APPOINTMENT
              </span>
              <h4 className="font-serif text-2xl font-bold text-white">
                Dispensary Grievance & Privacy Officer
              </h4>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ifaqa-linen/90 font-sans leading-relaxed max-w-4xl">
            In compliance with Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules and modern healthcare data protection standards, our appointed Privacy Officer is directly accessible to address inquiries, process record deletion requests, or investigate grievances:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/20 text-xs font-sans text-ifaqa-linen/95">
            <div className="p-4 bg-white/5 border border-ifaqa-sand/30">
              <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold text-[11px]">Officer In-Charge:</span>
              <span className="font-serif font-bold text-white text-sm block mt-1">Dispensary Compliance Desk</span>
              <span className="text-[11px] text-ifaqa-linen/75 mt-0.5 block">IFAQA Herbal Remedies</span>
            </div>

            <div className="p-4 bg-white/5 border border-ifaqa-sand/30">
              <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold text-[11px]">Direct Electronic Mail:</span>
              <span className="font-mono text-white text-sm block mt-1">privacy@ifaqaremedies.com</span>
              <span className="text-[11px] text-ifaqa-linen/75 mt-0.5 block">Encrypted direct mailbox</span>
            </div>

            <div className="p-4 bg-white/5 border border-ifaqa-sand/30">
              <span className="text-ifaqa-sand font-mono uppercase tracking-wider block font-bold text-[11px]">Response SLA Guarantee:</span>
              <span className="font-serif text-emerald-300 text-sm block mt-1 font-bold">Within 48 Business Hours</span>
              <span className="text-[11px] text-ifaqa-linen/75 mt-0.5 block">Binding statutory response</span>
            </div>
          </div>
        </div>

        {/* 6. Full-Width Bottom Action Bar */}
        <div className="p-8 sm:p-12 bg-white border-2 border-ifaqa-sand/70 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-3xl">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              Have Privacy Questions or Need Formulation Advice?
            </h4>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans leading-relaxed">
              Our dispensary desk is at your service. Connect with our Hakims or explore our classical pharmacopoeia.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center">
            <Link href="/contact">
              <Button3D variant="primary" size="lg" className="font-bold text-xs uppercase tracking-wider shadow-md">
                <span>Contact Dispensary Desk</span>
                <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
              </Button3D>
            </Link>
            <Link href="/catalog">
              <button className="px-6 py-3.5 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                Explore Pharmacopoeia
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
