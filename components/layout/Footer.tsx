'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { ShieldCheck, Sparkles, MapPin, Phone, Mail, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const categories = [
    { name: 'Digestive & Stomach Equilibrium (Hazim)', href: '/catalog/hazim' },
    { name: 'Vitality & Cognitive Energy (Muqawwi)', href: '/catalog/muqawwi' },
    { name: 'Respiratory & Bronchial Elixirs (Sual)', href: '/catalog/sual' },
    { name: 'Joint Mobility & Musculoskeletal (Mafasil)', href: '/catalog/mafasil' },
    { name: 'Dermatological Health & Pure Extracts (Jild)', href: '/catalog/jild' },
    { name: 'Immunity & Cardiac Wellness (Quwwat-e-Mudafiat)', href: '/catalog/quwwat-e-mudafiat' },
  ];

  return (
    <footer className="bg-ifaqa-plum text-ifaqa-linen border-t border-ifaqa-sand/40 pt-16 pb-12 font-serif select-none">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-14 border-b border-ifaqa-blackberry/90">
          {/* Column 1: Master Framed Heritage Emblem */}
          <div className="space-y-4">
            <div className="relative w-52 h-32 border-2 border-ifaqa-sand/60 p-2.5 bg-ifaqa-linen/10 overflow-hidden shadow-sm">
              <Image
                src="/images/logo-framed.jpg"
                alt="IFAQA Herbal Remedies Classical Heritage Stamp"
                width={208}
                height={128}
                className="w-full h-full object-contain filter contrast-105"
              />
            </div>
            <p className="text-xs text-ifaqa-sand font-serif font-bold italic tracking-wide">
              IFAQA HERBAL REMEDIES • DESI DAWAKHANA
            </p>
            <p className="text-xs text-ifaqa-linen/95 font-sans leading-relaxed">
              Classical Unani & Ayurvedic herbal pharmacopoeia compounded with pure botanical extracts. Prepared under traditional empirical standards, delivering potent wellness all over India and worldwide.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <ArchitecturalBadge variant="diamond">Empirical Canons</ArchitecturalBadge>
              <ArchitecturalBadge variant="notched" className="bg-ifaqa-blackberry text-ifaqa-linen border-ifaqa-sand/40">
                100% Herbal
              </ArchitecturalBadge>
            </div>
          </div>

          {/* Column 2: Pharmacopoeia Disciplines */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ifaqa-sand font-bold font-mono">
              Therapeutic Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-ifaqa-linen/95">
              {categories.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="hover:text-ifaqa-sand transition-colors block py-0.5 font-medium">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quality & Dispensary Heritage */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ifaqa-sand font-bold font-mono">
              Quality Assurance
            </h4>
            <ul className="space-y-3 text-xs font-sans text-ifaqa-linen/90">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>Zero synthetic chemicals or artificial preservatives added.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>Hand-sorted wildcrafted botanicals, seeds, roots, and pure resins.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>Custom compounded according to classical herbal canons.</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Global Courier */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ifaqa-sand font-bold font-mono">
              Dispensary & Contact
            </h4>
            <div className="space-y-2.5 text-xs font-sans text-ifaqa-linen/95">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ifaqa-sand shrink-0 mt-0.5" />
                <span>Serving all cities & states across India, with express international courier worldwide.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ifaqa-sand shrink-0" />
                <span>+91 Verified Dispensary Support</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ifaqa-sand shrink-0" />
                <span>care@ifaqaremedies.com</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href="/catalog"
                className="inline-block px-4 py-2 text-xs font-serif font-bold uppercase tracking-wider bg-ifaqa-sand text-ifaqa-plum hover:bg-white transition-colors"
              >
                Browse All Remedies
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Notices */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-ifaqa-linen/80">
          <p>© {new Date().getFullYear()} IFAQA Herbal Remedies. All rights reserved. Registered Desi Dawakhana.</p>
          <div className="flex items-center gap-6">
            <Link href="/catalog" className="hover:text-ifaqa-sand transition-colors">Apothecary Index</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/cart" className="hover:text-ifaqa-sand transition-colors">Shopping Cart</Link>
            <span className="text-ifaqa-sand/40">•</span>
            <Link href="/checkout" className="hover:text-ifaqa-sand transition-colors">Secure Checkout</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
