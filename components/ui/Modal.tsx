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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ifaqa-plum/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Shell */}
      <div
        style={{
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',
        }}
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-ifaqa-linen border border-ifaqa-sand/60 shadow-2xl z-10 overflow-hidden`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ifaqa-sand/30 bg-ifaqa-linen">
          {title ? (
            <h3 className="font-serif text-lg font-bold text-ifaqa-plum tracking-wide">{title}</h3>
          ) : <div />}
          <button
            onClick={onClose}
            className="p-1 text-ifaqa-blackberry hover:text-ifaqa-plum hover:bg-ifaqa-sand/30 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
