'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles } from 'lucide-react';

interface RemedyGalleryProps {
  primaryImage: string;
  images?: string[];
  remedyName: string;
  urduName: string;
}

export function RemedyGallery({ primaryImage, images = [], remedyName, urduName }: RemedyGalleryProps) {
  const allImages = images.length > 0 ? images : [primaryImage];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const { language } = useLanguage();

  return (
    <div className="space-y-4 select-none">
      {/* Primary Display Box */}
      <div className="relative aspect-square w-full bg-gradient-to-b from-ifaqa-linen/80 to-ifaqa-cashmere/25 border-2 border-ifaqa-sand/60 p-6 sm:p-8 flex flex-col items-center justify-center overflow-hidden shadow-luxury-card group">
        <div className="absolute inset-0 bg-gradient-to-t from-ifaqa-plum/10 to-transparent pointer-events-none" />

        {/* Specular Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-ifaqa-sand/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-sm transition-transform duration-300 group-hover:scale-105">
          <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-white border border-ifaqa-sand/50 shadow-md flex items-center justify-center mb-4 p-4">
            <span className="text-5xl sm:text-6xl select-none filter drop-shadow">🌿</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-ifaqa-plum tracking-wide leading-snug">
            {remedyName}
          </h3>

          {language === 'ur' && urduName && (
            <p
              dir="rtl"
              lang="ur"
              className="font-serif text-lg font-bold text-ifaqa-blackberry mt-1"
            >
              {urduName}
            </p>
          )}

          <p className="text-xs font-serif text-ifaqa-blackberry font-bold uppercase tracking-widest mt-1.5">
            Empirical Apothecary Formulation
          </p>
        </div>

        <div className="absolute bottom-3 left-3">
          <ArchitecturalBadge variant="notched">Dispensary Reserve</ArchitecturalBadge>
        </div>
      </div>

      {/* Thumbnails if multiple images exist */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 border p-1 transition-all ${
                selectedImage === img
                  ? 'border-ifaqa-plum bg-white shadow-sm'
                  : 'border-ifaqa-sand/40 bg-ifaqa-linen/50 hover:border-ifaqa-blackberry'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center text-xs text-ifaqa-plum font-serif">
                🌿 {idx + 1}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
