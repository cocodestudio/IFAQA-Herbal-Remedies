'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-[#FAF8F5] text-[#0B2D22] font-sans min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#0B2D22]/15 p-8 text-center space-y-4 shadow-sm">
          <h1 className="text-2xl font-serif font-normal text-[#0B2D22]">
            IFAQA Herbal Remedies
          </h1>
          <p className="text-sm text-[#5A6962] leading-relaxed">
            A display error occurred. Click below to restore the storefront cleanly.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="h-10 px-6 rounded-lg bg-[#0B2D22] text-[#FAF8F5] text-sm font-medium hover:bg-[#165A45] transition-colors"
          >
            Reload storefront
          </button>
        </div>
      </body>
    </html>
  );
}
