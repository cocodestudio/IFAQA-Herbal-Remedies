import React from 'react';
import Link from 'next/link';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Button3D } from '@/components/ui/Button3D';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 mx-auto bg-white border border-ifaqa-sand/40 flex items-center justify-center text-4xl shadow-sm">
        🌿
      </div>

      <div className="space-y-2">
        <ArchitecturalBadge variant="notched">Dispensary Resolution</ArchitecturalBadge>
        <h1 className="font-serif text-3xl font-bold text-ifaqa-plum">
          Unmapped Prescription Canon (404)
        </h1>
        <p className="text-xs sm:text-sm text-ifaqa-mauve font-sans max-w-md mx-auto leading-relaxed">
          The requested formulation route or botanical compendium chapter is not recorded in our master canon.
        </p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/">
          <Button3D variant="secondary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dawakhana Home
          </Button3D>
        </Link>
        <Link href="/catalog">
          <Button3D variant="primary" size="md">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse Full Pharmacopoeia
          </Button3D>
        </Link>
      </div>
    </div>
  );
}
