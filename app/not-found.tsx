import React from 'react';
import Link from 'next/link';
import { Button3D } from '@/components/ui/Button3D';
import { ArrowLeft, Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6 font-sans">
      <div className="w-12 h-12 rounded-xl mx-auto bg-ifaqa-cashmere border border-ifaqa-plum/10 flex items-center justify-center text-[#5A6962]">
        <Leaf className="w-5 h-5" strokeWidth={1.5} />
      </div>

      <div className="space-y-2">
        <p className="font-mono text-xs text-[#5A6962]">404</p>
        <h1 className="font-serif font-normal text-3xl text-ifaqa-plum">
          Page not found
        </h1>
        <p className="text-sm text-[#5A6962] max-w-md mx-auto leading-relaxed">
          The page you are looking for has moved or is no longer listed in the store.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/">
          <Button3D variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 me-2 rtl-flip" strokeWidth={1.5} />
            <span>Back to home</span>
          </Button3D>
        </Link>
        <Link href="/catalog">
          <Button3D variant="primary" size="md">
            <span>Browse products</span>
          </Button3D>
        </Link>
      </div>
    </div>
  );
}
