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
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    discipline: 'hazim',
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
    { value: 'general', label: 'General Dispensary & Dosage Inquiries' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTicketId(`IFQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 700);
  };

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
            <span className="text-white font-bold">Contact Dispensary</span>
          </div>

          <div className="pt-2">
            <ArchitecturalBadge variant="notched" className="bg-white/10 text-ifaqa-sand border-ifaqa-sand/60">
              Direct Dispensary & Hakim Helpline
            </ArchitecturalBadge>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Consult Our Dispensary Desk
          </h1>

          <p className="text-sm sm:text-base text-[#F5F0E6] font-sans max-w-3xl font-medium leading-relaxed">
            Direct communication with our classical compounding dispensary for tailored herbal recommendations, dosage and anupana guidance, and pan-India dispatch inquiries.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-10 z-10 relative">
        <div className="bg-white border-2 border-ifaqa-sand/70 shadow-2xl p-8 sm:p-12 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Interactive Consultation Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-blackberry font-bold">
                  Patient Health Inquiry
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ifaqa-plum mt-1">
                  Send a Confidential Inquiry
                </h2>
                <p className="text-xs text-ifaqa-blackberry font-sans mt-1.5 leading-relaxed">
                  Provide your symptoms or question below. A consulting hakeem will review your inquiry within 24 hours.
                </p>
              </div>

              {submitted ? (
                /* Success State Card */
                <div className="p-8 bg-[#FAF5EC] border-2 border-ifaqa-sand/80 space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-800 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900">
                        Consultation Request Dispatched
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ifaqa-plum">
                        Thank You, {formData.fullName || 'Patron'}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-ifaqa-sand/60 space-y-2 text-xs font-sans">
                    <div className="flex items-center justify-between">
                      <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Reference Token:</span>
                      <span className="font-mono text-sm font-bold text-ifaqa-plum">{ticketId}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2">
                      <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Contact Phone:</span>
                      <span className="font-mono text-ifaqa-plum font-bold">+91 {formData.phone}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-ifaqa-sand/30 pt-2">
                      <span className="text-ifaqa-blackberry uppercase tracking-wider font-bold">Review SLA:</span>
                      <span className="font-serif text-emerald-800 font-bold">Within 24 Business Hours</span>
                    </div>
                  </div>

                  <p className="text-xs text-ifaqa-blackberry font-sans leading-relaxed">
                    Your inquiry has been encrypted and assigned to our classical dispensary hakeem desk. All health information remains strictly confidential.
                  </p>

                  <div className="pt-2 flex gap-3">
                    <Button3D
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ fullName: '', phone: '', email: '', discipline: 'hazim', message: '' });
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      Submit Another Inquiry
                    </Button3D>
                    <Link href="/catalog">
                      <Button3D variant="primary" size="sm">
                        Browse Pharmacopoeia
                      </Button3D>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Contact / Consultation Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Patron / Patient Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans text-ifaqa-plum bg-white border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                        Mobile Number *
                      </label>
                      <div className="flex border-2 border-ifaqa-sand/60 focus-within:border-ifaqa-plum transition-colors bg-white">
                        <span className="inline-flex items-center px-3 bg-[#FAF5EC] border-r border-ifaqa-sand/60 text-xs font-mono font-bold text-ifaqa-plum">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 px-3 py-2.5 text-xs font-mono text-ifaqa-plum placeholder:text-ifaqa-blackberry/50 focus:outline-none bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="patron@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs font-sans text-ifaqa-plum bg-white border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                        Therapeutic Concern
                      </label>
                      <select
                        value={formData.discipline}
                        onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs font-sans text-ifaqa-plum bg-white border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:outline-none transition-colors"
                      >
                        {disciplines.map((d) => (
                          <option key={d.value} value={d.value}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-ifaqa-plum font-bold mb-1.5">
                      Symptoms / Inquiry Detail *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please describe symptoms, prior treatments, or questions regarding formulation dosage and duration..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-xs font-sans text-ifaqa-plum bg-white border-2 border-ifaqa-sand/60 focus:border-ifaqa-plum focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-ifaqa-blackberry font-sans">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Your inquiry is treated with strict medical confidentiality.</span>
                  </div>

                  <Button3D
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center font-bold text-sm shadow-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Dispatching Consultation Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit To Dispensary Hakeem</span>
                        <Send className="w-4 h-4 ml-2 text-ifaqa-sand" />
                      </>
                    )}
                  </Button3D>
                </form>
              )}
            </div>

            {/* Right Column: Direct Dispensary Channels & Hours (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#165A45] via-[#0B2D22] to-[#061811] text-ifaqa-linen p-8 sm:p-10 flex flex-col justify-between border-2 border-ifaqa-sand/60 shadow-lg">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center p-2.5 bg-white border border-ifaqa-sand/60 shadow-md">
                  <Image
                    src="/images/logo-framed.jpg"
                    alt="IFAQA Heritage Emblem"
                    width={160}
                    height={56}
                    priority
                    className="h-10 w-auto object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-ifaqa-sand font-bold">
                    CENTRAL DISPENSARY DESK
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    IFAQA Herbal Remedies
                  </h3>
                  <p className="text-xs text-ifaqa-linen/85 font-sans leading-relaxed">
                    Registered Desi Dawakhana & Classical Unani Dispensary.
                  </p>
                </div>

                {/* Contact Channels */}
                <div className="space-y-4 pt-2 text-xs font-sans text-ifaqa-linen/95">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-white uppercase tracking-wider block">Verified Helpline</span>
                      <span className="font-mono text-ifaqa-sand font-bold text-sm">+91 Verified Hakeem Desk</span>
                      <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">Available Mon–Sat: 9:00 AM – 8:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-white uppercase tracking-wider block">Dispensary Email</span>
                      <span className="font-mono text-ifaqa-sand font-bold text-sm">care@ifaqaremedies.com</span>
                      <p className="text-[11px] text-ifaqa-linen/75 mt-0.5">Replies dispatched within 24 business hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-white uppercase tracking-wider block">Dispensary Hours</span>
                      <p className="text-ifaqa-linen/90 font-medium">Monday – Saturday: 9:00 AM – 8:00 PM</p>
                      <p className="text-ifaqa-linen/75 text-[11px]">Sunday: 10:00 AM – 2:00 PM (Emergency Orders)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-ifaqa-plum border border-ifaqa-sand/60 flex items-center justify-center shrink-0 mt-0.5 text-ifaqa-sand">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-white uppercase tracking-wider block">Dispensary Reach</span>
                      <p className="text-ifaqa-linen/90 font-medium">Nationwide Express Courier across India</p>
                      <p className="text-ifaqa-linen/75 text-[11px]">International Courier to global destinations.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/20 mt-6 text-[11px] font-serif text-ifaqa-sand flex items-center justify-between">
                <span>Encrypted Health Communications</span>
                <span>• Strict Privacy</span>
              </div>
            </div>

          </div>

          {/* 3. Dispensary FAQ Section */}
          <div className="pt-8 border-t border-ifaqa-sand/40 space-y-6">
            <div>
              <ArchitecturalBadge variant="notched">Patient Guidance</ArchitecturalBadge>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ifaqa-plum mt-1">
                Frequently Asked Dispensary Questions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-[#FAF8F5] border border-ifaqa-sand/60 space-y-2">
                <h4 className="font-serif text-sm font-bold text-ifaqa-plum">
                  How are remedies packaged for transit?
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  Every formulation is vacuum-sealed in dark amber pharmaceutical glass/food-grade containers, wrapped in shock-absorbent cushioning, and dispatched in plain, discreet cartons.
                </p>
              </div>

              <div className="p-5 bg-[#FAF8F5] border border-ifaqa-sand/60 space-y-2">
                <h4 className="font-serif text-sm font-bold text-ifaqa-plum">
                  Can I request tailored dosage advice?
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  Yes. Our Hakims review your health condition and provide classical *Anupana* instructions (such as warm goat milk, honey water, or herbal decoctions).
                </p>
              </div>

              <div className="p-5 bg-[#FAF8F5] border border-ifaqa-sand/60 space-y-2">
                <h4 className="font-serif text-sm font-bold text-ifaqa-plum">
                  What is the courier transit timeline?
                </h4>
                <p className="text-xs text-ifaqa-plum/85 font-sans leading-relaxed">
                  Dispatched within 24 hours of order placement. Delivery typically takes 2 to 4 business days to major metros and 3 to 6 days to remote regions across India.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
