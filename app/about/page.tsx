'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  BookOpen,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Feather,
  Scale,
  Leaf
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-ifaqa-sand" />,
      title: '100% Wildcrafted Botanicals',
      tagline: 'High-Altitude Harvests',
      description:
        'We use only unadulterated botanical roots, cold-pressed seed oils, Kashmiri saffron, and pure forest honeys. Every harvest is screened for empirical vitality before compounding.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Zero Chemical Shortcuts',
      tagline: 'Pure Canonical Integrity',
      description:
        'No synthetic binding starches, chemical stabilizers, artificial dyes, or adulterating steroids. Our remedies remain exactly as prescribed by ancient medical manuscripts.',
    },
    {
      icon: <Scale className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Classical Compounding Lineage',
      tagline: 'Unani-Tibb & Classical Ayurveda',
      description:
        'Handcrafted via slow-macerated decoctions (Joshanda), traditional electuaries (Majun & Khamira), and purified mineral calces (Kushta/Bhasma) supervised by seasoned hakims.',
    },
    {
      icon: <Clock className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Nationwide Express Dispensary',
      tagline: 'Sanitary Batch Dispensation',
      description:
        'Freshly compounded in sterile amber apothecary glass to preserve volatile plant terpenes, and dispatched rapidly across all 28+ states and territories in India.',
    },
  ];

  const statistics = [
    { value: '100%', label: 'Pure Herbal Ingredients', note: 'Zero synthetic chemicals' },
    { value: '50+', label: 'Master Formulations', note: 'Classical canonical recipes' },
    { value: '28+', label: 'States & UTs Reached', note: 'All-India express dispatch' },
    { value: '100%', label: 'Patient Confidentiality', note: 'Strict apothecary privacy' },
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
            <span className="text-white font-bold">About Us</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-white/10 text-ifaqa-sand border-ifaqa-sand/60">
              Canonical Greco-Arab & Herbal Tradition
            </ArchitecturalBadge>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            The IFAQA Dawakhana Heritage
          </h1>

          <p className="text-sm sm:text-base text-[#F5F0E6] font-sans max-w-3xl font-medium leading-relaxed">
            Preserving classical Greco-Arab Unani-Tibb and Vedic Ayurvedic sciences through meticulous empirical compounding, wildcrafted botanicals, and unwavering dedication to natural healing.
          </p>
        </div>
      </section>

      {/* 2. Main Narrative Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-10 z-10 relative">
        <div className="bg-white border-2 border-ifaqa-sand/70 shadow-2xl p-8 sm:p-14 space-y-12">
          
          {/* Story & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold">
                ESTABLISHED DESI DAWAKHANA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum leading-snug">
                Restoring Sacred Botanical Balance Without Synthetic Compromise
              </h2>
              <p className="text-xs sm:text-sm text-ifaqa-plum/90 font-sans leading-relaxed">
                IFAQA Herbal Remedies was founded upon an uncompromising premise: that authentic healing lies in classical wisdom, untouched by industrial short-cuts. In a world inundated with synthetic pills and adulterated extracts, our dispensary revives classical Greco-Arab (*Unani-Tibb*) manuscripts and canonical Ayurvedic treatises.
              </p>
              <p className="text-xs sm:text-sm text-ifaqa-plum/90 font-sans leading-relaxed">
                Every jar of *Majun*, bottle of *Sharbat*, or calcined *Kushta* that leaves our pharmacy is prepared according to strict empirical canons. We honor bodily humors (*Akhlat*) and natural constitutional equilibrium (*Mizaj*), providing remedies that treat the underlying root cause of bodily ailments rather than masking temporary discomfort.
              </p>
            </div>

            <div className="lg:col-span-5 bg-[#FAF5EC] border-2 border-ifaqa-sand/60 p-6 sm:p-8 space-y-5 shadow-sm text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white border border-ifaqa-sand/60 shadow-md mx-auto">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Heritage Emblem"
                  width={180}
                  height={64}
                  priority
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-serif font-bold text-ifaqa-plum uppercase tracking-wider">
                  The Dawakhana Oath
                </p>
                <blockquote className="text-xs italic font-serif text-ifaqa-blackberry leading-relaxed px-2">
                  &ldquo;To compound no botanical substance of doubtful origin; to preserve the integrity of ancient manuscripts; and to treat each human ailment with sacred care and honesty.&rdquo;
                </blockquote>
              </div>
              <div className="pt-2 border-t border-ifaqa-sand/40 flex items-center justify-center gap-3">
                <ArchitecturalBadge variant="diamond">Canonical Lineage</ArchitecturalBadge>
                <ArchitecturalBadge variant="chamfer">Zero Additives</ArchitecturalBadge>
              </div>
            </div>
          </div>

          {/* 3. The Four Core Pillars */}
          <div className="space-y-6 pt-6 border-t border-ifaqa-sand/40">
            <div>
              <ArchitecturalBadge variant="notched">Dispensary Principles</ArchitecturalBadge>
              <h3 className="font-serif text-2xl font-bold text-ifaqa-plum mt-1">
                The Four Pillars of Pure Compounding
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF8F5] border border-ifaqa-sand/60 hover:border-ifaqa-plum/60 transition-all duration-200 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-ifaqa-plum flex items-center justify-center border border-ifaqa-sand/40">
                      {pillar.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ifaqa-blackberry font-bold bg-white px-2 py-0.5 border border-ifaqa-sand/40">
                      {pillar.tagline}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ifaqa-plum">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Statistics Banner */}
          <div className="bg-ifaqa-plum text-ifaqa-linen p-8 sm:p-10 border-2 border-ifaqa-sand/60 shadow-lg">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {statistics.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-ifaqa-sand">
                    {stat.value}
                  </div>
                  <div className="font-serif text-xs uppercase tracking-wider font-bold text-white">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#F5F0E6]/80 font-sans">
                    {stat.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Bottom Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-ifaqa-sand/40">
            <div>
              <h4 className="font-serif text-lg font-bold text-ifaqa-plum">
                Experience Canonical Botanical Formulations
              </h4>
              <p className="text-xs text-ifaqa-blackberry font-sans mt-0.5">
                Explore our classical pharmacopoeia or consult our dispensary desk today.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link href="/catalog" className="flex-1 sm:flex-none">
                <Button3D variant="primary" size="md" className="w-full justify-center font-bold">
                  <span>Explore Pharmacopoeia</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
                </Button3D>
              </Link>
              <Link href="/contact" className="flex-1 sm:flex-none">
                <button className="w-full px-5 py-3 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-colors shadow-sm">
                  Consult Dispensary
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
