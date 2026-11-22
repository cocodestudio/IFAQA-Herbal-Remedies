import React from 'react';

export type BadgeVariant = 'notched' | 'chamfer' | 'ruled' | 'diamond';

interface ArchitecturalBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function ArchitecturalBadge({
  variant = 'notched',
  children,
  className = '',
}: ArchitecturalBadgeProps) {
  if (variant === 'chamfer') {
    return (
      <span
        data-badge="chamfer"
        style={{
          clipPath: "polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)"
        }}
        className={`chamfer-badge inline-flex items-center px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-ifaqa-linen bg-ifaqa-plum shrink-0 whitespace-nowrap ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'ruled') {
    return (
      <span
        data-badge="ruled"
        className={`ruled-badge inline-flex items-center pl-2 pr-2.5 py-0.5 text-[10px] sm:text-[11px] font-sans font-medium tracking-wide text-ifaqa-plum border-l-2 border-l-ifaqa-blackberry bg-ifaqa-sand/25 shrink-0 whitespace-nowrap ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'diamond') {
    return (
      <span
        data-badge="diamond"
        className={`diamond-badge inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-ifaqa-plum text-ifaqa-linen border border-ifaqa-sand/40 font-serif shrink-0 whitespace-nowrap ${className}`}
      >
        <span className="text-[8px] text-ifaqa-sand">◆</span>
        <span>{children}</span>
      </span>
    );
  }

  // Default: Notched Apothecary Bevel
  return (
    <span
      data-badge="notched"
      className={`notched-badge inline-flex items-center px-2.5 py-0.5 text-[10px] sm:text-[11px] font-serif font-semibold tracking-wider uppercase border border-ifaqa-sand/80 bg-ifaqa-linen text-ifaqa-plum shadow-sm shrink-0 whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

export function NotchedBevelBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <ArchitecturalBadge variant="notched" className={className}>{children}</ArchitecturalBadge>;
}

export function ChamferTag({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <ArchitecturalBadge variant="chamfer" className={className}>{children}</ArchitecturalBadge>;
}
