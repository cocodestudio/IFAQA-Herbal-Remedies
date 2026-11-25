import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface ContraindicationsCalloutProps {
  contraindications?: string[];
}

export function ContraindicationsCallout({ contraindications }: ContraindicationsCalloutProps) {
  const hasContraindications = contraindications && contraindications.length > 0;

  if (!hasContraindications) {
    return (
      <div className="p-4 rounded-xl bg-ifaqa-linen border border-ifaqa-plum/10 text-sm text-[#3E524A] leading-relaxed">
        <p className="font-medium text-ifaqa-plum mb-0.5">
          General wellness guidance
        </p>
        <p className="text-xs text-[#5A6962]">
          Suitable for adult use with a balanced diet. Consult a qualified physician if pregnant, nursing, or taking prescription medication.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-[#FDF6EB] border border-[#C5A059]/30 text-ifaqa-plum text-sm">
      <div className="flex items-center gap-2 mb-2 font-medium text-xs text-ifaqa-plum">
        <ShieldAlert className="w-4 h-4 text-[#99752D] shrink-0" strokeWidth={1.5} />
        <span>Usage precautions</span>
      </div>
      <ul className="space-y-1.5 list-disc list-inside text-xs text-[#3E524A]">
        {contraindications.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
