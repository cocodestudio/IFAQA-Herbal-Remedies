'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Truck,
  Check,
  User,
  Calendar,
  Globe
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cityState: '',
    discipline: 'hazim',
    duration: '1-6months',
    languagePref: 'en',
    timeSlot: 'afternoon',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const disciplines = [
    { value: 'hazim', label: 'Digestive & Stomach Care (Hazim)' },
    { value: 'muqawwi', label: 'Vitality, Nerve & Energy (Muqawwi)' },
    { value: 'sual', label: 'Respiratory, Bronchial & Cough (Sual)' },
    { value: 'mafasil', label: 'Joint Mobility & Musculoskeletal (Mafasil)' },
    { value: 'jild', label: 'Skin & Dermatology (Jild)' },
    { value: 'quwwat-e-mudafiat', label: 'Immunity & Cardiac Wellness' },
    { value: 'chronic', label: 'Chronic Imbalances / Multiple Ailments' },
    { value: 'general', label: 'General Dosage & Dispensary Inquiry' },
  ];

  const transitSpeeds = [
    { region: 'Metro Hubs (Delhi, Mumbai, Bengaluru, Hyderabad)', time: '24 – 48 Hours' },
    { region: 'Tier 2 & Tier 3 Regional Districts', time: '2 – 4 Business Days' },
    { region: 'North-East & Hill Station Pincodes', time: '4 – 6 Business Days' },
    { region: 'International Express Courier (UK, UAE, US, Canada)', time: '5 – 8 Business Days' },
  ];

  const consultationSteps = [
    {
      step: '01',
      title: 'Confidential Inquiry',
      desc: 'Submit your health symptoms, medical background, or dosage questions through this private dispensary form.',
    },
    {
      step: '02',
      title: 'Constitutional Diagnosis',
      desc: 'Our consulting Hakims examine your humoral predisposition (*Mizaj*) and underlying metabolic causes.',
    },
    {
      step: '03',
      title: 'Customized Prescription & Anupana',
      desc: 'Receive tailored classical formulation recommendations, dietary regimens, and optimal carrier vehicles.',
    },
    {
      step: '04',
      title: 'Pan-India Express Dispatch',
      desc: 'Fresh batches are vacuum-sealed in amber pharmaceutical bottles and dispatched with real-time tracking.',
    },
  ];

  const faqs = [
    {
      q: 'How do I know which classical remedy matches my ailment?',
      a: 'Our classical formulations are categorized by therapeutic system and physiological humor. When in doubt, provide your symptoms via this consultation form or call our Hakeem Desk for personalized anupana guidance.',
    },
    {
      q: 'Are consultations strictly private and confidential?',
      a: 'Yes, unconditionally. All health inquiries, symptoms discussed, and patient names are protected by sacred apothecary privacy. We never share or monetize patient information under any circumstance.',
    },
    {
      q: 'Can these botanical remedies be taken alongside modern prescriptions?',
      a: 'Most classical herbal decoctions and electuaries are gentle and non-interfering. However, our Hakims advise maintaining a 1.5 to 2-hour interval between allopathic tablets and classical botanicals.',
    },
    {
      q: 'How are delicate amber glass bottles protected during transit?',
      a: 'Every bottle is hermetically sealed, cushioned in multilayer shock-absorbent corrugated packaging, and dispatched in plain, unmarked exterior cartons for maximum safety and privacy.',
    },
    {
      q: 'Do you deliver to remote towns and villages across India?',
      a: 'Yes. Through our contracted express courier network and India Post Speed Post integration, we reach all 19,000+ delivery pincodes spanning all 28 states and union territories.',
    },
    {
      q: 'How do I request a refill of an ongoing formulation?',
      a: 'Simply provide your previous Order ID or Phone Number to our helpline, or place an order directly through our online pharmacopoeia index with instantaneous dispatch.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTicketId(`IFQ-CONS-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 700);
  };

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
            <span className="text-white font-bold">Dispensary Desk & Inquiries</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-[#FAF5EC] text-ifaqa-plum border border-[#DFBA73] font-serif font-bold text-xs shadow-md">
              Direct Dispensary & Hakim Consultation Desk
            </ArchitecturalBadge>
          </div>

          <div className="max-w-5xl space-y-4">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight">
              Consult Our Classical Dispensary Desk
            </h1>

            <p className="text-base sm:text-xl text-[#F5F0E6] font-sans font-medium leading-relaxed max-w-4xl">
              Direct medical communication with our classical compounding dispensary for tailored botanical recommendations, dosage vehicles (*Anupana*), formulation inquiries, and pan-India express courier tracking.
            </p>
          </div>

          {/* Quick Assurance Bar */}
          <div className="pt-4 flex flex-wrap gap-4 items-center text-xs font-mono tracking-wider text-ifaqa-sand">
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>HAKEEM REVIEW WITHIN 24 BUSINESS HOURS</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>100% PATIENT MEDICAL CONFIDENTIALITY</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 border border-ifaqa-sand/40">
              <Check className="w-4 h-4 text-ifaqa-sand" />
              <span>EXPRESS DELIVERY TO ALL 19,000+ PINCODES</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Full-Width Consultation & Dispensary Layout */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 space-y-20">
        
        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Interactive Consultation Desk (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-ifaqa-sand/70 p-8 sm:p-12 shadow-2xl space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold block bg-ifaqa-plum text-white px-2 py-1 inline-block">
                PATIENT CONSULTATION DESK
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-3">
                Send a Confidential Health Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 leading-relaxed">
                Provide your symptoms, prior diagnoses, or formulation questions below. A consulting hakeem will review your inquiry with sacred medical confidentiality.
              </p>
            </div>

            {submitted ? (
              /* Success State Card */
              <div className="p-8 sm:p-10 bg-[#FAF5EC] border-2 border-ifaqa-sand/80 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-800 text-white flex items-center justify-center shrink-0 border border-emerald-950">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900 block">
                      Consultation Request Logged & Dispatched
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ifaqa-plum">
                      Thank You, {formData.fullName || 'Distinguished Patron'}
                    </h3>
                  </div>
                </div>

                <div className="p-5 bg-white border-2 border-ifaqa-sand/60 space-y-3 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Dispensary Token ID:</span>
                    <span className="font-mono text-base font-bold text-ifaqa-plum bg-[#FAF8F5] px-2 py-0.5 border border-ifaqa-sand/40">{ticketId}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2.5">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Patron Phone:</span>
                    <span className="font-mono text-ifaqa-plum font-bold">+91 {formData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2.5">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Location:</span>
                    <span className="font-serif text-ifaqa-plum font-bold">{formData.cityState || 'India Pincode'}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2.5">
                    <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Hakeem Desk Turnaround:</span>
                    <span className="font-serif text-emerald-800 font-bold">Within 24 Business Hours</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans leading-relaxed">
                  Your inquiry has been encrypted and routed directly to our chief apothecary compounding unit. You will receive an SMS and phone advisory regarding recommended remedies and proper dosage.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Button3D
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        cityState: '',
                        discipline: 'hazim',
                        duration: '1-6months',
                        languagePref: 'en',
                        timeSlot: 'afternoon',
                        message: '',
                      });
                    }}
                    variant="secondary"
                    size="md"
                    className="font-bold uppercase text-xs"
                  >
                    Submit Another Inquiry
                  </Button3D>
                  <Link href="/catalog">
                    <Button3D variant="primary" size="md" className="font-bold uppercase text-xs">
                      <span>Explore Pharmacopoeia</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 text-ifaqa-sand" />
                    </Button3D>
                  </Link>
                </div>
              </div>
            ) : (
              /* Comprehensive Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hakim / Patron Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      Mobile Number (For WhatsApp / Call) *
                    </label>
                    <div className="flex border-2 border-ifaqa-sand/60 focus-within:border-ifaqa-plum transition-colors bg-[#FAF8F5] focus-within:bg-white shadow-sm">
                      <span className="inline-flex items-center px-3.5 bg-[#FAF5EC] border-r border-ifaqa-sand/60 text-xs font-mono font-bold text-ifaqa-plum">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-4 py-3 text-xs sm:text-sm font-mono text-ifaqa-plum placeholder:text-ifaqa-blackberry/50 focus:outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      City / State / Pincode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lucknow, UP / Mumbai, MH"
                      value={formData.cityState}
                      onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="patron@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      Therapeutic Concern *
                    </label>
                    <select
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      className="w-full px-3 py-3 text-xs font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors shadow-sm"
                    >
                      {disciplines.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      Duration of Symptoms
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-3 text-xs font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors shadow-sm"
                    >
                      <option value="recent">Under 1 Month (Recent)</option>
                      <option value="1-6months">1 to 6 Months</option>
                      <option value="6-12months">6 to 12 Months</option>
                      <option value="chronic">1+ Years (Chronic Condition)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                      Language Preference
                    </label>
                    <select
                      value={formData.languagePref}
                      onChange={(e) => setFormData({ ...formData, languagePref: e.target.value })}
                      className="w-full px-3 py-3 text-xs font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors shadow-sm"
                    >
                      <option value="en">English Consultation</option>
                      <option value="hi">हिंदी (Hindi Consultation)</option>
                      <option value="ur">اردو (Urdu Consultation)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-2">
                    Detailed Symptoms, History & Questions *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your health symptoms in detail (e.g., digestive acidity, lack of energy, chronic dry cough, joint stiffness, dietary habits, or past remedies tried)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-xs sm:text-sm font-sans text-ifaqa-plum bg-[#FAF8F5] border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:bg-white focus:outline-none transition-colors resize-y shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-2.5 text-xs text-ifaqa-blackberry font-sans p-3 bg-[#FAF8F5] border border-ifaqa-sand/40">
                  <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
                  <span>All symptoms and details are protected under sacred apothecary patient privacy.</span>
                </div>

                <Button3D
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center font-bold text-sm uppercase tracking-widest shadow-xl py-4"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Dispatching Inquiry to Hakeem Desk...</span>
                  ) : (
                    <>
                      <span>Transmit Consultation To Chief Hakeem</span>
                      <Send className="w-4 h-4 ml-2 text-ifaqa-sand" />
                    </>
                  )}
                </Button3D>
              </form>
            )}
          </div>

          {/* Right Column: Dispensary Command Center & Transit Speeds (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Dispensary Card */}
            <div className="bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen p-8 sm:p-10 border-2 border-ifaqa-sand/60 shadow-2xl space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-white border-2 border-ifaqa-sand/60 shadow-md">
                <Image
                  src="/images/logo-framed.jpg"
                  alt="IFAQA Heritage Emblem"
                  width={180}
                  height={64}
                  priority
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold">
                  CENTRAL REGISTERED DAWAKHANA
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  IFAQA Herbal Remedies
                </h3>
                <p className="text-xs text-ifaqa-linen/85 font-sans leading-relaxed">
                  Classical Unani Pharmacopoeia & Botanical Compounding Dispensary.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-5 pt-3 text-xs font-sans text-ifaqa-linen/95 divide-y divide-white/10">
                <div className="flex items-start gap-3.5 pt-3">
                  <div className="w-9 h-9 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Direct Hakeem Helpline</span>
                    <span className="font-mono text-ifaqa-sand font-bold text-base block mt-0.5">+91 Verified Hakeem Desk</span>
                    <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">Monday to Saturday: 9:00 AM – 8:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3">
                  <div className="w-9 h-9 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Dispensary Care Email</span>
                    <span className="font-mono text-ifaqa-sand font-bold text-sm block mt-0.5">care@ifaqaremedies.com</span>
                    <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">Electronic inquiries answered within 24 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3">
                  <div className="w-9 h-9 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Compounding & Consultation Hours</span>
                    <p className="text-ifaqa-linen font-medium mt-0.5">Mon – Sat: 9:00 AM – 8:00 PM IST</p>
                    <p className="text-ifaqa-linen/75 text-[11px]">Sunday: 10:00 AM – 2:00 PM IST (Emergency Dispatch)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3">
                  <div className="w-9 h-9 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-serif font-bold text-white uppercase tracking-wider block text-xs">Central Registered Dispensary</span>
                    <p className="text-ifaqa-linen font-medium mt-0.5">IFAQA Herbal Remedies Dawakhana, India</p>
                    <p className="text-ifaqa-linen/75 text-[11px]">Express courier network covering all Indian states & territories.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courier Transit Speeds Box */}
            <div className="p-6 bg-white border-2 border-ifaqa-sand/70 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-ifaqa-plum" />
                <h4 className="font-serif text-sm font-bold text-ifaqa-plum uppercase tracking-wider">
                  Express Courier Transit Speeds
                </h4>
              </div>

              <div className="space-y-2.5 text-xs font-sans">
                {transitSpeeds.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-ifaqa-sand/40">
                    <span className="text-ifaqa-blackberry font-medium">{t.region}</span>
                    <span className="font-mono font-bold text-ifaqa-plum text-right shrink-0 ml-2">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* 3. The 4-Step Consultation Protocol (Full-Width Card Row) */}
        <div className="space-y-8 pt-8 border-t-2 border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="notched">Dispensary Protocol</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              How Dispensary Consultations Function
            </h3>
            <p className="text-xs sm:text-sm text-ifaqa-blackberry font-sans mt-2 max-w-3xl leading-relaxed">
              From your initial inquiry to customized formulation and safe doorstep dispensation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationSteps.map((st) => (
              <div
                key={st.step}
                className="p-6 bg-white border-2 border-ifaqa-sand/60 hover:border-ifaqa-plum transition-all duration-200 shadow-md space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-ifaqa-sand/30">
                  <span className="font-mono text-2xl font-bold text-ifaqa-sand">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold bg-[#FAF5EC] text-ifaqa-plum px-2 py-0.5 border border-ifaqa-sand/60">
                    PROTOCOL
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-ifaqa-plum">
                  {st.title}
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Full-Width 6-Item FAQ Grid */}
        <div className="space-y-8 pt-8 border-t-2 border-ifaqa-sand/40">
          <div>
            <ArchitecturalBadge variant="chamfer">Frequently Asked Questions</ArchitecturalBadge>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ifaqa-plum mt-1.5">
              Dispensary Guidance & Answers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border-2 border-ifaqa-sand/60 shadow-md space-y-3"
              >
                <h4 className="font-serif text-sm font-bold text-ifaqa-plum leading-snug">
                  {faq.q}
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Bottom Reassurance Call to Action */}
        <div className="p-8 sm:p-12 bg-gradient-to-r from-[#0E3B2D] via-[#165A45] to-[#0B2D22] text-ifaqa-linen border-2 border-ifaqa-sand/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-3xl">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Prefer Immediate Direct Dialogue?
            </h4>
            <p className="text-xs sm:text-sm text-[#F5F0E6]/90 font-sans leading-relaxed">
              Our chief dispensary desk is available Monday through Saturday. Call our helpline or explore our classical pharmacopoeia formulations directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center">
            <Link href="/catalog">
              <Button3D variant="primary" size="lg" className="font-bold text-xs uppercase tracking-wider shadow-md">
                <span>Browse Pharmacopoeia</span>
                <ArrowRight className="w-4 h-4 ml-2 text-ifaqa-sand" />
              </Button3D>
            </Link>
            <Link href="/">
              <button className="px-6 py-3.5 border-2 border-ifaqa-sand text-ifaqa-linen hover:bg-white hover:text-ifaqa-plum text-xs font-serif font-bold uppercase tracking-wider transition-all duration-200 shadow-sm">
                Return to Home
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
