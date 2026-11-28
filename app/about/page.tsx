'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Button3D } from '@/components/ui/Button3D';
import { Leaf, ShieldCheck, Award, Truck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const content = {
    badge: 'About',
    title: 'About IFAQA Herbal Remedies',
    subtitle: 'Authentic Unani and Ayurvedic medicines compounded from whole wildcrafted herbs, roots, spices, and natural forest honey in Saharanpur.',
    storyTitle: 'Our craft and everyday commitment',
    storyP1: 'IFAQA Herbal Remedies was built on a straightforward principle: herbal care should be honest, clearly labeled, and free from hidden synthetic additives. Instead of extracted shortcuts or steroid mixtures, every jar and bottle begins with raw medicinal seeds, aromatic roots, dry blossoms, and pure unheated honey.',
    storyP2: 'At our Saharanpur dispensary, formulations are milled, simmered, and blended in small, trackable batches according to classical Unani and Ayurvedic pharmacopoeia standards so families across India receive consistent, fresh preparations directly from source.',
    storyP3: 'Every label states its botanical composition, dosage instructions, and precautions plainly—whether you are ordering a soothing Sharbat for seasonal cough or a daily restorative Majun.',
    oathTitle: 'Purity standard',
    oathQuote: '100% botanical composition — crafted with zero chemical steroids, artificial food coloring, or synthetic bulk fillers.',
    formsTitle: 'Classical dosage forms we prepare',
    formsSubtitle: 'Simple, traditional preparations designed for practical daily use at home.',
    form1Name: 'Majun & Khamira (Herbal Electuaries)',
    form1Desc: 'Fine botanical powders blended slowly into pure honey or raw cane base. Typically taken as 1 teaspoon with lukewarm milk or water.',
    form2Name: 'Safoof (Finely Milled Powders)',
    form2Desc: 'Single-origin dried roots and seeds cleaned by hand and milled without chemical binders for gentle digestive and metabolic support.',
    form3Name: 'Sharbat & Arq (Syrups & Distillates)',
    form3Desc: 'Slow-boiled herbal decoctions and floral/root distillates prepared to soothe cough, throat irritation, liver heat, and general vitality.',
    form4Name: 'Raughan & Marham (Oils & Topical Balms)',
    form4Desc: 'Herb-infused botanical oils and beeswax ointments meant strictly for external massage on joints, muscles, scalp, and skin.',
    whyChooseTitle: 'What sets our formulations apart',
    pillar1Title: 'Whole natural herbs',
    pillar1Desc: 'Whole roots, resin extracts, cardamom, and Kashmiri saffron sourced cleanly with zero filler dilution.',
    pillar2Title: 'Zero chemicals or steroids',
    pillar2Desc: 'Strict batch screening — no hidden corticosteroids, heavy metals, or artificial stabilizers.',
    pillar3Title: 'Small-batch freshness',
    pillar3Desc: 'Prepared in frequent small batches in Saharanpur rather than sitting in distant warehouses for years.',
    pillar4Title: 'Protected Pan-India delivery',
    pillar4Desc: 'Sealed in UV-protective amber glass or food-safe containers and dispatched within 24 business hours.',
    processTitle: 'Four-stage compounding process',
    step1Title: 'Herb selection',
    step1Desc: 'Every batch of dried bark, seed, and blossom is checked for aroma, color, and natural maturity before milling.',
    step2Title: 'Hand cleaning & sorting',
    step2Desc: 'Raw herbs are carefully sifted to clear dust, stems, moisture clumps, and inert matter.',
    step3Title: 'Controlled preparation',
    step3Desc: 'Slow decoction boiling and gentle honey compounding protect delicate active plant compounds.',
    step4Title: 'Sealed glass & pack dispatch',
    step4Desc: 'Packed immediately into moisture-locked jars with clear batch coding and shipped with live tracking.',
    craftCaption: 'Four graded botanical stages on white marble: dried blossoms, wild leaves, whole herbs, and milled roots ready for compounding.',
    aboutPhotoAlt: 'Four wooden apothecary spoons holding dried medicinal flowers, crushed botanical leaves, herbs, and lavender on white marble',
    mortarSectionTitle: 'Hand-compounded botanicals, shipped straight from Saharanpur',
    mortarSectionBody: 'Whether you need a digestive powder after meals, seasonal respiratory comfort, or gentle joint care, our dispensary team keeps every preparation simple, transparent, and authentic.',
    mortarCaption: 'Stone-mortar grinding of colorful medicinal flowers and wild herbs at our Saharanpur preparation house.',
    fact1Val: '31',
    fact1Lbl: 'Active remedies',
    fact2Val: '0%',
    fact2Lbl: 'Synthetic fillers',
    fact3Val: '24 hrs',
    fact3Lbl: 'Dispatch window',
    fact4Val: '24 mo',
    fact4Lbl: 'Standard shelf life',
    ctaTitle: 'Explore our herbal catalog',
    ctaSubtitle: 'Browse powders, electuaries, syrups, and oils by health category or message our Saharanpur team for dosage help.',
    shopBtn: 'Shop products',
    contactBtn: 'Contact us',
  };

  const forms = [
    { name: content.form1Name, desc: content.form1Desc },
    { name: content.form2Name, desc: content.form2Desc },
    { name: content.form3Name, desc: content.form3Desc },
    { name: content.form4Name, desc: content.form4Desc },
  ];

  const pillars = [
    { icon: <Leaf className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar1Title, desc: content.pillar1Desc },
    { icon: <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar2Title, desc: content.pillar2Desc },
    { icon: <Award className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar3Title, desc: content.pillar3Desc },
    { icon: <Truck className="w-4 h-4" strokeWidth={1.5} />, title: content.pillar4Title, desc: content.pillar4Desc },
  ];

  const steps = [
    { num: '01', title: content.step1Title, desc: content.step1Desc },
    { num: '02', title: content.step2Title, desc: content.step2Desc },
    { num: '03', title: content.step3Title, desc: content.step3Desc },
    { num: '04', title: content.step4Title, desc: content.step4Desc },
  ];

  const facts = [
    { value: content.fact1Val, label: content.fact1Lbl },
    { value: content.fact2Val, label: content.fact2Lbl },
    { value: content.fact3Val, label: content.fact3Lbl },
    { value: content.fact4Val, label: content.fact4Lbl },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-8 md:pb-10 w-full font-sans">
      {/* Unified Edge-to-Edge Editorial Header Showcase — Four Botanical Spoons on Marble */}
      <section className="relative w-full border-b border-ifaqa-plum/10 bg-[#F4F3F1] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/about-spoons-craft.jpg"
            alt={content.aboutPhotoAlt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[center_bottom] lg:object-[76%_center]"
          />
          <div
            className="lg:hidden absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(250,248,245,0.94) 0%, rgba(250,248,245,0.84) 50%, rgba(250,248,245,0.26) 78%, rgba(250,248,245,0.04) 100%)',
            }}
          />
          <div
            className="hidden lg:block absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.93) 40%, rgba(250,248,245,0.55) 60%, rgba(250,248,245,0.06) 80%, rgba(250,248,245,0) 100%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ifaqa-linen/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-40 sm:pb-44 lg:py-16">
          <div className="max-w-2xl space-y-3.5 ifaqa-hero-rise">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6962]">
              <Link href="/" className="hover:text-ifaqa-plum transition-colors">{t('home')}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ifaqa-plum font-medium">{content.badge}</span>
            </nav>
            <h1 className="font-serif font-normal text-3xl sm:text-5xl text-ifaqa-plum leading-tight">
              {content.title}
            </h1>
            <p className="text-base sm:text-lg text-[#3E524A] leading-relaxed max-w-xl">
              {content.subtitle}
            </p>
            <p className="inline-flex items-center gap-2 border-s-2 border-ifaqa-mauve ps-3 text-xs text-[#5A6962] pt-1">
              {content.craftCaption}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-10 space-y-8 md:space-y-10">
        {/* Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.storyTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP1}
            </p>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP2}
            </p>
            <p className="text-sm sm:text-base text-[#3E524A] leading-relaxed">
              {content.storyP3}
            </p>
            <div className="p-4 sm:p-5 rounded-xl bg-ifaqa-cashmere/70 border-s-2 border-ifaqa-mauve space-y-1">
              <p className="text-xs font-medium text-[#5A6962]">
                {content.oathTitle}
              </p>
              <p className="text-sm text-ifaqa-plum leading-relaxed">
                {content.oathQuote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-8 shadow-luxury-card space-y-5 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white border border-ifaqa-plum/10 rounded-lg">
              <Image
                src="/images/logo-framed.jpg"
                alt="IFAQA Herbal Remedies"
                width={180}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-normal text-xl text-ifaqa-plum">
                IFAQA Herbal Remedies
              </h3>
              <p className="text-xs text-[#5A6962]">
                Near Mandi Wali Masjid, Bartha Kayasth Pather, Saharanpur - 247231 (U.P.)
              </p>
            </div>
            <div className="pt-4 border-t border-ifaqa-plum/10 grid grid-cols-2 gap-3 text-start text-xs">
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">100% herbal</span>
                <span className="text-[#5A6962]">No synthetic additives</span>
              </div>
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">Direct dispatch</span>
                <span className="text-[#5A6962]">Pan-India courier</span>
              </div>
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">Support line</span>
                <span className="text-[#5A6962] font-mono">+91 97298 40336</span>
              </div>
              <div className="p-3 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10">
                <span className="font-medium text-ifaqa-plum block">Mon – Sat</span>
                <span className="text-[#5A6962]">9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Classical Dosage Forms (Real everyday guide for customers) */}
        <div className="space-y-4 pt-6 border-t border-ifaqa-plum/10">
          <div>
            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.formsTitle}
            </h3>
            <p className="text-sm text-[#5A6962] mt-1">
              {content.formsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {forms.map((f, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 space-y-1.5 shadow-luxury-card"
              >
                <h4 className="font-sans text-sm sm:text-base font-semibold text-ifaqa-plum">
                  {f.name}
                </h4>
                <p className="text-sm text-[#5A6962] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 4 Commitments + Side Mortar Image Showcase (Desktop side-by-side, Mobile text cleanly over translucent photo) */}
        <div className="pt-6 border-t border-ifaqa-plum/10 space-y-4 ifaqa-scroll-reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
              {content.whyChooseTitle}
            </h3>
            <p className="text-xs text-[#5A6962] max-w-md">
              {content.mortarCaption}
            </p>
          </div>

          {/* Mobile Unified Backdrop Layout: 4 cards over translucent mortar image */}
          <div className="lg:hidden relative rounded-2xl overflow-hidden border border-ifaqa-plum/10 bg-[#F4EFE6]">
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/images/about-artisan-mortar.jpg"
                alt={content.mortarCaption}
                fill
                loading="lazy"
                sizes="100vw"
                className="object-cover object-[center_bottom]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(250,248,245,0.93) 0%, rgba(250,248,245,0.85) 56%, rgba(250,248,245,0.34) 84%, rgba(250,248,245,0.06) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 p-4 sm:p-6 pb-40 sm:pb-44 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/85 backdrop-blur-sm border border-ifaqa-plum/10 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center shrink-0">
                      {p.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-sans text-sm font-medium text-ifaqa-plum">
                        {p.title}
                      </h4>
                      <p className="text-xs text-[#3E524A] leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <p className="text-xs font-medium text-ifaqa-plum bg-white/80 backdrop-blur-sm border border-ifaqa-plum/10 rounded-lg px-3 py-2 inline-block">
                  {content.mortarSectionTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop 4 Options (Left) + Artisan Mortar Image + Caption (Right) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 hover:border-ifaqa-plum/25 shadow-luxury-card transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center shrink-0">
                    {p.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-sans text-base font-medium text-ifaqa-plum">
                      {p.title}
                    </h4>
                    <p className="text-sm text-[#5A6962] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-ifaqa-plum/10 bg-white shadow-luxury-card flex flex-col">
              <div className="relative flex-1 min-h-[240px] bg-[#F4EFE6] group overflow-hidden">
                <Image
                  src="/images/about-artisan-mortar.jpg"
                  alt={content.mortarCaption}
                  fill
                  loading="lazy"
                  sizes="40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 bg-ifaqa-linen border-t border-ifaqa-plum/10 space-y-1">
                <h4 className="font-serif font-normal text-lg text-ifaqa-plum">
                  {content.mortarSectionTitle}
                </h4>
                <p className="text-xs text-[#5A6962] leading-relaxed">
                  {content.mortarSectionBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Compounding Process */}
        <div className="space-y-4 pt-6 border-t border-ifaqa-plum/10">
          <h3 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
            {content.processTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-5 rounded-xl bg-white border border-ifaqa-plum/10 space-y-2 shadow-luxury-card"
              >
                <span className="font-mono text-sm font-medium text-[#C5A059] tabular-nums block">
                  {st.num}
                </span>
                <h4 className="font-sans text-base font-medium text-ifaqa-plum">
                  {st.title}
                </h4>
                <p className="text-sm text-[#5A6962] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Factual Key Numbers + Compact Bottom CTA */}
        <div className="space-y-5 pt-2">
          <div className="bg-ifaqa-cashmere rounded-2xl border border-ifaqa-plum/10 p-6 sm:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-start">
              {facts.map((st, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-serif text-3xl text-ifaqa-plum tabular-nums">
                    {st.value}
                  </div>
                  <div className="text-xs font-sans text-[#5A6962]">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-ifaqa-plum/10 shadow-luxury-card flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center lg:text-start max-w-2xl">
              <h4 className="font-serif font-normal text-2xl sm:text-3xl text-ifaqa-plum">
                {content.ctaTitle}
              </h4>
              <p className="text-sm text-[#5A6962]">
                {content.ctaSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/catalog">
                <Button3D variant="primary" size="md">
                  <span>{content.shopBtn}</span>
                  <ArrowRight className="w-4 h-4 ms-2" strokeWidth={1.5} />
                </Button3D>
              </Link>
              <Link href="/contact">
                <Button3D variant="outline" size="md">
                  {content.contactBtn}
                </Button3D>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
