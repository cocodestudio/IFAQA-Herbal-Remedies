'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Leaf } from 'lucide-react';

interface RemedyGalleryProps {
  primaryImage: string;
  images?: string[];
  remedyName: string;
  urduName: string;
}

export function RemedyGallery({
  primaryImage,
  images = [],
  remedyName,
  urduName,
}: RemedyGalleryProps) {
  const allImages = useMemo(() => {
    const merged: string[] = [];
    const seen = new Set<string>();
    for (const src of [primaryImage, ...(images || [])]) {
      const clean = (src || '').trim();
      if (clean && !seen.has(clean)) {
        seen.add(clean);
        merged.push(clean);
      }
    }
    return merged.slice(0, 10);
  }, [primaryImage, images]);

  const [selectedImage, setSelectedImage] = useState(allImages[0] || '');
  const [imageError, setImageError] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setSelectedImage((prev) => (prev && allImages.includes(prev) ? prev : allImages[0] || ''));
    setImageError(false);
  }, [allImages]);

  return (
    <div className="space-y-3 select-none">
      {/* Clean product showcase on white ground */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
        {selectedImage && !imageError ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt={remedyName}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority
              onError={() => setImageError(true)}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="text-center max-w-sm space-y-2">
            <div className="w-16 h-16 rounded-xl mx-auto bg-ifaqa-cashmere text-ifaqa-plum flex items-center justify-center">
              <Leaf className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-lg font-medium text-ifaqa-plum">
              {remedyName}
            </h3>
            {language === 'ur' && urduName && (
              <p dir="rtl" lang="ur" className="font-urdu text-base text-[#5A6962]">
                {urduName}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Gallery Thumbnails (Supports up to 10 photos set in Admin) */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {allImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => {
                setSelectedImage(img);
                setImageError(false);
              }}
              className={`relative w-16 h-16 rounded-lg border p-1 transition-colors overflow-hidden bg-white shrink-0 ${
                selectedImage === img
                  ? 'border-ifaqa-plum ring-1 ring-ifaqa-plum/30'
                  : 'border-ifaqa-plum/15 hover:border-ifaqa-plum/40'
              }`}
            >
              <Image
                src={img}
                alt={`${remedyName} view ${idx + 1}`}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
