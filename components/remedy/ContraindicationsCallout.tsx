import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface ContraindicationsCalloutProps {
  contraindications?: string[];
}

export function ContraindicationsCallout({ contraindications }: ContraindicationsCalloutProps) {
  const hasContraindications = contraindications && contraindications.length > 0;

  if (!hasContraindications) {
    return (
      <div className="p-4 bg-ifaqa-linen/50 border-l-2 border-l-ifaqa-sand text-ifaqa-plum text-xs font-sans leading-relaxed">
        <p className="font-semibold font-serif text-ifaqa-blackberry mb-0.5">
          General Wellness Formulation:
        </p>
        <p className="text-ifaqa-mauve">
          No specific contraindications recorded. Suitable for general adult wellness under customary dietary guidance. Consult your personal physician or certified Hakeem if pregnant or nursing.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50/70 border-l-2 border-l-amber-800 text-amber-950 text-xs font-sans">
      <div className="flex items-center gap-2 mb-2 font-serif font-bold text-amber-900 uppercase tracking-wider">
        <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" />
        <span>Precautionary Guidance</span>
      </div>
      <ul className="space-y-1.5 list-disc list-inside">
        {contraindications.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
