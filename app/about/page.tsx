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
  Leaf,
  Flame,
  Droplets,
  Sun,
  Truck,
  Check
} from 'lucide-react';

export default function AboutPage() {
  const compoundingStages = [
    {
      num: '01',
      title: 'Wildcrafted Harvest',
      subtitle: 'Ethical High-Altitude Foraging',
      desc: 'Raw botanicals, alpine roots, and wild herbs gathered by generational foragers across the pristine Himalayan valleys, Kashmir, and virgin forests during peak astrological potencies.',
      badge: 'SOURCE VERIFIED',
    },
    {
      num: '02',
      title: 'Botanical Sorting & Tri-Screening',
      subtitle: 'Zero Adulteration Protocol',
      desc: 'Every root, seed pod, and resin batch undergoes rigorous organoleptic inspection and macroscopic cleansing to remove dirt, extraneous stems, or inferior specimens.',
      badge: '100% ORGANIC',
    },
    {
      num: '03',
      title: 'Canonical Artisanal Compounding',
      subtitle: 'Slow Decoctions & Macerations',
      desc: 'Formulations prepared in traditional heavy-gauge copper vats, seasoned stone mortars (Kharal), and gentle sun-matured syrups (*Sharbats*) without modern industrial heat damage.',
      badge: 'CLASSICAL CRAFT',
    },
    {
      num: '04',
      title: 'Calcined Mineral Purification',
      subtitle: 'Kushta & Bhasma Alchemy',
      desc: 'Medicinal pearls, coral, gold foil, and calces undergo classical incineration (*Taqtir & Puta*) to transform minerals into bioavailable, non-toxic micro-crystalline essences.',
      badge: 'HERMETIC PURITY',
    },
    {
      num: '05',
      title: 'Sanitary Amber Preservation',
      subtitle: 'Apothecary Tamper-Proof Bottling',
      desc: 'Sealed fresh in amber pharmaceutical-grade glass to shield delicate volatile botanical terpenes against UV light, followed by pan-India express dispatch.',
      badge: 'EXPRESS DISPATCH',
    },
  ];

  const corePillars = [
    {
      icon: <Leaf className="w-6 h-6 text-ifaqa-sand" />,
      title: '100% Pure Wildcrafted Botanicals',
      tagline: 'High-Altitude Harvests',
      description:
        'We use only unadulterated botanical roots, cold-pressed seed oils, pure Kashmiri saffron, and natural forest honeys. Every ingredient is screened for empirical vitality before compounding.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Zero Chemical Shortcuts & Steroids',
      tagline: 'Pure Canonical Integrity',
      description:
        'Zero synthetic binding starches, chemical stabilizers, artificial dyes, artificial sweeteners, or adulterating steroids. Our remedies remain exactly as prescribed by classical manuscripts.',
    },
    {
      icon: <Scale className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Classical Greco-Arab & Vedic Lineage',
      tagline: 'Unani-Tibb & Classical Ayurveda',
      description:
        'Handcrafted via slow-macerated decoctions (Joshanda), traditional electuaries (Majun & Khamira), and purified mineral calces (Kushta/Bhasma) supervised by seasoned hakims.',
    },
    {
      icon: <Droplets className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Natural Forest Honey Preservation',
      tagline: 'Natural Conservation',
      description:
        'Instead of chemical sodium benzoate or parabens, our syrups and electuaries utilize raw unpasteurized forest honey as an organic, enzyme-rich preservative for perpetual shelf stability.',
    },
    {
      icon: <Sun className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Tailored Anupana (Carrier Vehicle) Wisdom',
      tagline: 'Holistic Bio-Availability',
      description:
        'Every medicine is coupled with canonical delivery guidance—whether taken with warm raw goat milk, distilled rose water (Arq Gulab), or honey—ensuring deep cellular absorption.',
    },
    {
      icon: <Clock className="w-6 h-6 text-ifaqa-sand" />,
      title: 'Nationwide Express Dispensary Delivery',
      tagline: 'Sanitary Batch Dispensation',
      description:
        'Freshly compounded in sterile amber apothecary glass to preserve volatile plant terpenes, and dispatched rapidly across all 28+ states and union territories in India.',
    },
  ];

  const humoralSystems = [
    {
      name: 'Dam (Sanguine / Blood)',
      quality: 'Hot & Moist',
      organ: 'Heart & Liver',
      description: 'Regulates vitality, muscular warmth, tissue nutrition, and overall systemic vigor.',
    },
    {
      name: 'Balgham (Phlegmatic / Phlegm)',
      quality: 'Cold & Moist',
      organ: 'Brain & Lungs',
      description: 'Maintains bodily lubrication, joint synovial fluid, cellular hydration, and calm temperament.',
    },
    {
      name: 'Safra (Choleric / Yellow Bile)',
      quality: 'Hot & Dry',
      organ: 'Gallbladder & Digestive Tract',
      description: 'Drives digestion, metabolic fire, mental sharpness, and digestive nutrient breakdown.',
    },
    {
      name: 'Sauda (Melancholic / Black Bile)',
      quality: 'Cold & Dry',
      organ: 'Spleen & Skeletal System',
      description: 'Provides structural density, bone integrity, vascular tone, and emotional resilience.',
    },
  ];

  const statistics = [
    { value: '100%', label: 'Pure Herbal Botanical Purity', note: 'Zero synthetic chemical additives' },
    { value: '50+', label: 'Canonical Master Formulations', note: 'Unani-Tibb & Vedic Ayurvedic scripts' },
    { value: '28+', label: 'States & Union Territories', note: 'All-India express courier reach' },
    { value: '24-Hr', label: 'Dispensary Dispatch Cycle', note: 'Fresh batch sealed in amber glass' },
    { value: '100%', label: 'Sacred Patron Privacy', note: 'Strict medical confidentiality' },
  ];

  return (
    <div className="min-h-screen bg-ifaqa-linen select-none pb-24 w-full">
      {/* 1. Full-Width Grand Hero Banner */}
      <section className="relative w-full bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen py-20 md:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 border-b-2 border-ifaqa-sand/50 overflow-hidden">
        {/* Subtle Ambient Gold Radial Glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.22)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(197,160,89,0.12)_0%,transparent_50%)] pointer-events-none" />

        <div className="relative w-full max-w-[1720px] mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-ifaqa-sand">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">About Our Heritage</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-[#FAF5EC] text-ifaqa-plum border border-[#DFBA73] font-serif font-bold text-xs shadow-md">
              Canonical Greco-Arab & Vedic Botanical Science
            </ArchitecturalBadge>
          </div>

          <div className="max-w-5xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              The Sovereign Legacy of IFAQA Herbal Remedies
            </h1>

            <p className="text-base sm:text-xl text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-4xl">
              Reviving centuries-old manuscripts of Greco-Arab *Unani-Tibb* and classical Ayurvedic scriptures through uncompromising empirical compounding, pure wildcrafted botanicals, and devoted patient care for patrons across India and worldwide.
            </p>
          </div>

          {/* Key Assurance Badges */}
          <div className="pt-4 flex flex-wrap gap-4 items-center text-xs font-mono tracking-wider text-ifaqa-sand">
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>EST. REGISTERED DESI DAWAKHANA</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>CANONICAL COMPILATIONS OF IBN SINA & CHARAKA</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>ZERO SYNTHETIC STEROIDS OR CHEMICALS</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Full-Width Narrative & Philosophy Section */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Narrative Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <ArchitecturalBadge variant="diamond">Empirical Canons</ArchitecturalBadge>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ifaqa-plum leading-tight">
                Restoring Sacred Botanical Balance Without Synthetic Compromise
              </h2>
            </div>

            <p className="text-sm sm:text-base text-ifaqa-plum/90 font-sans leading-relaxed">
              IFAQA Herbal Remedies was founded upon an uncompromising premise: that true, enduring healing lies in classical wisdom, untouched by industrial short-cuts. In a modern era flooded with quick-fix synthetic pills, artificial steroids, and mass-market diluted extracts, our dispensary stands as a sanctuary for authentic Greco-Arab (*Unani-Tibb*) medicine and canonical Ayurvedic pharmacology.
            </p>

            <p className="text-sm sm:text-base text-ifaqa-plum/90 font-sans leading-relaxed">
              Every jar of *Majun*, bottle of *Sharbat*, calcined *Kushta*, or herbal *Joshanda* that departs our dawakhana is formulated according to classical humoral philosophy. Rather than merely suppressing superficial symptoms, we evaluate the patient’s foundational constitution (*Mizaj*) and underlying bodily humors (*Akhlat*), revitalizing natural organic vitality from within.
            </p>

            <div className="p-6 bg-[#FAF5EC] border-l-4 border-ifaqa-plum space-y-2">
              <p className="font-serif text-sm font-bold text-ifaqa-plum uppercase tracking-wider">
                The Compounding Canon
              </p>
              <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans italic leading-relaxed">
                &ldquo;Disease is a disturbance in constitutional equilibrium; recovery is the restoration of that harmony through pure botanical agents whose elemental qualities directly counter the deranged humor.&rdquo;
              </p>
              <span className="block text-[11px] font-mono text-ifaqa-blackberry/70 uppercase">
                — Derived from Ibn Sina’s Canon of Medicine (Al-Qanun fi al-Tibb)
              </span>
            </div>
          </div>

          {/* Right Showcase Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-ifaqa-sand/70 p-8 sm:p-12 shadow-2xl space-y-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white border-2 border-ifaqa-sand/70 shadow-md mx-auto">
              <Image
                src="/images/logo-framed.jpg"
                alt="IFAQA Heritage Emblem"
                width={200}
                height={72}
                priority
                className="h-14 w-auto object-contain"
              />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold block bg-ifaqa-plum text-white py-1">
                ESTABLISHED DESI DAWAKHANA
              </span>
              <h3 className="font-serif text-2xl font-bold text-ifaqa-plum">
                The Sacred Dawakhana Oath
              </h3>
              <blockquote className="text-xs sm:text-sm italic font-serif text-ifaqa-blackberry leading-relaxed px-4">
                &ldquo;We swear by the sacred integrity of medicine never to compound a plant whose purity is suspect, never to substitute synthetic adulterants for empirical botanicals, and to treat every patient with sacred care, honesty, and confidentiality.&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-ifaqa-sand/40 grid grid-cols-2 gap-3 text-left">
              <div className="p-3 bg-[#FAF8F5] border border-ifaqa-sand/40">
                <span className="text-[10px] font-mono uppercase text-ifaqa-blackberry font-bold block">Compounding Style</span>
                <span className="font-serif text-xs font-bold text-ifaqa-plum">Classical Kharal & Maceration</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-ifaqa-sand/40">
                <span className="text-[10px] font-mono uppercase text-ifaqa-blackberry font-bold block">Purity Assurance</span>
                <span className="font-serif text-xs font-bold text-ifaqa-plum">Zero Synthetic Binders</span>
              </div>
            </div>
          </div>

        </div>

        {/* 3. The 4 Humors of Canonical Medicine (Full-Width Card Grid) */}
        <div className="space-y-8 pt-8 border-t-2 border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="notched">Classical Constitutional Science</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              The Four Canonical Bodily Humors (*Akhlat*)
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 max-w-3xl leading-relaxed">
              In classical Greco-Arab Unani-Tibb, optimal human vitality depends upon the dynamic equilibrium of four bodily humors. Every IFAQA formulation is compounded to correct specific constitutional disharmonies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {humoralSystems.map((humor, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum transition-all duration-200 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-ifaqa-sand/30">
                  <span className="font-mono text-xs font-bold text-ifaqa-sand uppercase tracking-wider">
                    Humor {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono bg-ifaqa-plum text-white px-2 py-0.5 font-bold uppercase">
                    {humor.quality}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-ifaqa-plum">
                  {humor.name}
                </h4>
                <div className="text-xs font-serif font-bold text-ifaqa-blackberry">
                  Primary Seat: {humor.organ}
                </div>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  {humor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Full-Width 5-Stage Compounding Process */}
        <div className="space-y-8 pt-8 border-t-2 border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="chamfer">Pharmaceutical Methodology</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              Our 5-Stage Empirical Compounding Process
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 max-w-3xl leading-relaxed">
              How rare raw botanicals are transformed into potent, canonical classical remedies inside our dispensary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {compoundingStages.map((stage) => (
              <div
                key={stage.num}
                className="p-6 bg-[#FAF8F5] border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum hover:bg-white transition-all duration-200 shadow-md space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-ifaqa-sand">
                      {stage.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-[#FAF5EC] text-ifaqa-plum border border-ifaqa-sand/60 px-1.5 py-0.5">
                      {stage.badge}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ifaqa-plum leading-snug">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] font-serif font-bold text-ifaqa-sand uppercase tracking-wider">
                    {stage.subtitle}
                  </p>
                  <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Full-Width 6 Core Pillars of Botanical Integrity */}
        <div className="space-y-8 pt-8 border-t-2 border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="notched">Dispensary Principles</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              The Six Pillars of Canonical Purity
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-7 bg-white border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum hover:shadow-xl transition-all duration-200 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-ifaqa-plum flex items-center justify-center border-2 border-ifaqa-sand/50 shadow-md">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ifaqa-blackberry font-bold bg-[#FAF8F5] px-2.5 py-1 border border-ifaqa-sand/40">
                    {pillar.tagline}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-ifaqa-plum">
                  {pillar.title}
                </h4>
                <p className="text-xs text-ifaqa-plum/90 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Full-Width Statistics Banner */}
        <div className="bg-gradient-to-r from-[#0E3B2D] via-[#165A45] to-[#0B2D22] text-ifaqa-linen p-8 sm:p-14 border-2 border-ifaqa-sand/60 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-ifaqa-sand/30">
            {statistics.map((stat, idx) => (
              <div key={idx} className="space-y-2 pt-4 lg:pt-0">
                <div className="font-serif text-3xl sm:text-5xl font-bold text-ifaqa-sand drop-shadow-md">
                  {stat.value}
                </div>
                <div className="font-serif text-xs uppercase tracking-wider font-bold text-white">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#F5F0E6]/85 font-sans">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Full-Width Call-to-Action Bar */}
        <div className="p-8 sm:p-12 bg-white border-2 border-ifaqa-sand/70 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-3xl">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum">
              Experience Classical Desi Dawakhana Medicines
            </h4>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans leading-relaxed">
              Explore our full catalog of handcrafted herbal formulations or connect directly with our dispensary desk for tailored guidance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center">
            <Link href="/catalog">
              <Button3D variant="primary" size="lg" className="font-bold text-xs uppercase tracking-wider shadow-md">
                <span>Explore Full Pharmacopoeia</span>
                <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
              </Button3D>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3.5 border-2 border-ifaqa-plum text-ifaqa-plum hover:bg-ifaqa-plum hover:text-white text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                Consult Dispensary Desk
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
