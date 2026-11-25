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
        className={`chamfer-badge inline-flex items-center px-2.5 py-0.5 text-xs font-sans font-medium bg-ifaqa-plum text-ifaqa-linen shrink-0 whitespace-nowrap ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'ruled') {
    return (
      <span
        data-badge="ruled"
        className={`ruled-badge inline-flex items-center ps-2 pe-2.5 py-0.5 text-xs font-sans font-medium text-ifaqa-plum border-s-2 border-s-ifaqa-mauve bg-ifaqa-cashmere shrink-0 whitespace-nowrap ${className}`}
      >
        {children}
      </span>
    );
  }

  if (variant === 'diamond') {
    return (
      <span
        data-badge="diamond"
        className={`diamond-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-sans font-medium bg-ifaqa-plum text-ifaqa-linen border border-ifaqa-plum/15 rounded shrink-0 whitespace-nowrap ${className}`}
      >
        <span className="text-[8px] text-ifaqa-sand" aria-hidden="true">◆</span>
        <span>{children}</span>
      </span>
    );
  }

  // Default: Quiet Stone Label
  return (
    <span
      data-badge="notched"
      className={`notched-badge inline-flex items-center px-2.5 py-0.5 text-xs font-sans font-medium border border-ifaqa-plum/10 bg-ifaqa-cashmere text-ifaqa-plum rounded shrink-0 whitespace-nowrap ${className}`}
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
