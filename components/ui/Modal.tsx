'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'md' }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#0B2D22]/40 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-ifaqa-linen rounded-2xl border border-ifaqa-plum/10 shadow-luxury-lifted z-10 overflow-hidden font-sans`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-ifaqa-plum/10 bg-white">
          {title ? (
            <h3 className="font-sans text-base font-semibold text-ifaqa-plum">{title}</h3>
          ) : <div />}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#5A6962] hover:text-ifaqa-plum hover:bg-ifaqa-cashmere transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
