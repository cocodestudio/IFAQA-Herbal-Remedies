'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Leaf } from 'lucide-react';

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
    <div className="space-y-3 select-none">
      {/* Borderless clean product showcase on white ground */}
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

      {/* Thumbnails if multiple images exist */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedImage(img);
                setImageError(false);
              }}
              className={`relative w-16 h-16 rounded-lg border p-1 transition-colors overflow-hidden bg-white ${
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
