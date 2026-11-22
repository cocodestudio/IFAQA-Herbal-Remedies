import React from 'react';
import { HerbalIngredient } from '@/lib/types';

interface BotanicalIngredientsTableProps {
  ingredients: HerbalIngredient[];
}

export function BotanicalIngredientsTable({ ingredients }: BotanicalIngredientsTableProps) {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="p-4 bg-ifaqa-linen/50 border border-ifaqa-sand/30 text-xs text-ifaqa-mauve italic">
        Botanical ingredient formulation is currently in dispensary review.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-ifaqa-sand/40 bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ifaqa-linen text-ifaqa-plum border-b border-ifaqa-sand/40 text-xs font-serif uppercase tracking-wider">
            <th className="py-3 px-4 font-bold">Botanical (Latin)</th>
            <th className="py-3 px-4 font-bold">Common & Traditional Name</th>
            <th className="py-3 px-4 font-bold">Part Utilized</th>
            <th className="py-3 px-4 font-bold text-right">Proportion</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ifaqa-sand/20 text-xs font-sans">
          {ingredients.map((ing, idx) => (
            <tr key={idx} className="hover:bg-ifaqa-linen/20 transition-colors">
              <td className="py-3 px-4 font-serif italic text-ifaqa-plum font-semibold break-words overflow-wrap-anywhere hyphens-auto max-w-[200px]">
                {ing.botanicalName}
              </td>
              <td className="py-3 px-4 text-ifaqa-blackberry font-medium">
                {ing.commonName}
              </td>
              <td className="py-3 px-4 text-ifaqa-mauve">
                {ing.partUsed}
              </td>
              <td className="py-3 px-4 font-mono font-bold text-ifaqa-plum text-right">
                {ing.proportion}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
