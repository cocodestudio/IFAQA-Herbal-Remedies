import React from 'react';
import { DosageInstructions } from '@/lib/types';
import { Clock, Scale } from 'lucide-react';
import { ContraindicationsCallout } from './ContraindicationsCallout';

interface DosageGuideProps {
  dosage: DosageInstructions;
}

export function DosageGuide({ dosage }: DosageGuideProps) {
  if (!dosage) return null;

  return (
    <div className="space-y-5 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-ifaqa-linen border border-ifaqa-plum/10">
          <div className="flex items-center gap-2 text-[#5A6962] text-xs font-medium mb-1.5">
            <Scale className="w-4 h-4" strokeWidth={1.5} />
            <span>Recommended dosage</span>
          </div>
          <p className="text-base font-medium text-ifaqa-plum">
            {dosage.amount}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-ifaqa-linen border border-ifaqa-plum/10">
          <div className="flex items-center gap-2 text-[#5A6962] text-xs font-medium mb-1.5">
            <Clock className="w-4 h-4" strokeWidth={1.5} />
            <span>Timing</span>
          </div>
          <p className="text-base font-medium text-ifaqa-plum">
            {dosage.timing}
          </p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-ifaqa-cashmere/70 border border-ifaqa-plum/10 space-y-1.5">
        <h4 className="text-xs font-medium text-[#5A6962]">
          How to take (with recommended liquid)
        </h4>
        <p className="text-base font-medium text-ifaqa-plum">
          {dosage.anupana}
        </p>
        <p className="text-xs text-[#3E524A] leading-relaxed pt-1">
          Taking this preparation with lukewarm water, milk, or honey supports consistent absorption alongside meals.
        </p>
      </div>

      <div>
        <h4 className="text-xs font-medium text-[#5A6962] mb-2">
          Precautions
        </h4>
        <ContraindicationsCallout contraindications={dosage.contraindications} />
      </div>
    </div>
  );
}
