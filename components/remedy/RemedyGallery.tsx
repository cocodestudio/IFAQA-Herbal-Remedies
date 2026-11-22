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
  const allImages = images && images.length > 0 ? images : [primaryImage];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [imageError, setImageError] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="space-y-4 select-none">
      {/* Primary Display Box */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-white border-2 border-ifaqa-sand/60 p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden shadow-luxury-card group">
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] to-[#F5F0E6]/50 pointer-events-none" />

        {/* Specular Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#DFBA73]/15 blur-3xl pointer-events-none" />

        {/* Product Image Presentation with Booklet Fallback */}
        {selectedImage && !imageError ? (
          <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
            <Image
              src={selectedImage}
              alt={remedyName}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority
              onError={() => setImageError(true)}
              className="object-contain filter contrast-[1.03] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative z-10 text-center max-w-sm transition-transform duration-300 group-hover:scale-105">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-ifaqa-plum text-ifaqa-sand border-2 border-ifaqa-sand/50 shadow-md flex items-center justify-center mb-4 p-4">
              <Sparkles className="w-12 h-12" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-ifaqa-plum tracking-wide leading-snug">
              {remedyName}
            </h3>
            {language === 'ur' && urduName && (
              <p dir="rtl" lang="ur" className="font-serif text-lg font-bold text-ifaqa-blackberry mt-1">
                {urduName}
              </p>
            )}
            <p className="text-xs font-serif text-ifaqa-blackberry font-bold uppercase tracking-widest mt-1.5">
              Empirical Apothecary Formulation
            </p>
          </div>
        )}

        <div className="absolute bottom-3 left-3 z-20">
          <ArchitecturalBadge variant="notched">Dispensary Reserve</ArchitecturalBadge>
        </div>
      </div>

      {/* Thumbnails if multiple images exist */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedImage(img);
                setImageError(false);
              }}
              className={`relative w-16 h-16 border p-1 transition-all overflow-hidden ${
                selectedImage === img
                  ? 'border-ifaqa-plum ring-2 ring-ifaqa-plum/30 bg-white shadow-sm'
                  : 'border-ifaqa-sand/40 bg-ifaqa-linen/50 hover:border-ifaqa-blackberry'
              }`}
            >
              <Image
                src={img}
                alt={`${remedyName} - View ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
