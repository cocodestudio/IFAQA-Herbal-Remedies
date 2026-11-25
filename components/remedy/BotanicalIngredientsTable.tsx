import React from 'react';
import { HerbalIngredient } from '@/lib/types';

interface BotanicalIngredientsTableProps {
  ingredients: HerbalIngredient[];
}

export function BotanicalIngredientsTable({ ingredients }: BotanicalIngredientsTableProps) {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-ifaqa-linen border border-ifaqa-plum/10 text-sm text-[#5A6962]">
        Full botanical composition details are listed on the packaging label.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-ifaqa-plum/10 bg-white">
      <table className="w-full text-start border-collapse">
        <thead>
          <tr className="bg-ifaqa-cashmere/70 text-[#5A6962] border-b border-ifaqa-plum/10 text-xs font-sans font-medium">
            <th className="py-3 px-4 font-medium text-start">Botanical name</th>
            <th className="py-3 px-4 font-medium text-start">Ingredient</th>
            <th className="py-3 px-4 font-medium text-start">Part used</th>
            <th className="py-3 px-4 font-medium text-end">Proportion</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ifaqa-plum/10 text-sm font-sans">
          {ingredients.map((ing, idx) => (
            <tr key={idx} className="hover:bg-ifaqa-linen/60 transition-colors">
              <td className="py-3 px-4 text-[#5A6962] max-w-[220px] break-words">
                {ing.botanicalName}
              </td>
              <td className="py-3 px-4 text-ifaqa-plum font-medium">
                {ing.commonName}
              </td>
              <td className="py-3 px-4 text-[#5A6962]">
                {ing.partUsed}
              </td>
              <td className="py-3 px-4 font-mono text-xs text-ifaqa-plum text-end tabular-nums">
                {ing.proportion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
