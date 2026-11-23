import React from 'react';
import { DosageInstructions } from '@/lib/types';
import { ArchitecturalBadge } from '@/components/ui/ArchitecturalBadge';
import { Clock, Beaker, ShieldAlert } from 'lucide-react';
import { ContraindicationsCallout } from './ContraindicationsCallout';

interface DosageGuideProps {
  dosage: DosageInstructions;
}

export function DosageGuide({ dosage }: DosageGuideProps) {
  if (!dosage) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dosage Amount */}
        <div className="p-4 bg-white border border-ifaqa-sand/40">
          <div className="flex items-center gap-2 text-ifaqa-blackberry text-xs font-serif uppercase tracking-wider mb-2 font-bold">
            <Beaker className="w-4 h-4 text-ifaqa-mauve" />
            <span>Prescribed Quantity</span>
          </div>
          <p className="font-serif text-base font-bold text-ifaqa-plum">
            {dosage.amount}
          </p>
        </div>

        {/* Administration Timing */}
        <div className="p-4 bg-white border border-ifaqa-sand/40">
          <div className="flex items-center gap-2 text-ifaqa-blackberry text-xs font-serif uppercase tracking-wider mb-2 font-bold">
            <Clock className="w-4 h-4 text-ifaqa-mauve" />
            <span>Administration Timing</span>
          </div>
          <p className="font-serif text-base font-bold text-ifaqa-plum">
            {dosage.timing}
          </p>
        </div>
      </div>

      {/* Recommended Consumption Guide */}
      <div className="p-5 bg-ifaqa-linen border border-ifaqa-sand/60">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-ifaqa-plum">
            How to Take (Recommended with)
          </h4>
          <ArchitecturalBadge variant="diamond">Usage Guide</ArchitecturalBadge>
        </div>
        <p className="font-serif text-base text-ifaqa-plum font-semibold">
          {dosage.anupana}
        </p>
        <p className="text-[11px] text-ifaqa-mauve font-sans mt-2 leading-relaxed">
          Taking this herbal remedy with the recommended liquid (such as warm water, milk, or honey) helps your body absorb the natural botanical nutrients for maximum benefit.
        </p>
      </div>

      {/* Medical Contraindications */}
      <div>
        <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-ifaqa-plum mb-2">
          Clinical Contraindications & Precautions
        </h4>
        <ContraindicationsCallout contraindications={dosage.contraindications} />
      </div>
    </div>
  );
}
