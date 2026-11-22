import React from 'react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button3D({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: Button3DProps) {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs tracking-wider',
    md: 'px-5 py-2.5 text-xs font-bold tracking-wider uppercase',
    lg: 'px-7 py-3.5 text-sm font-bold tracking-widest uppercase',
  };

  const variantStyles = {
    primary: 'bg-ifaqa-plum text-white hover:bg-ifaqa-blackberry shadow-md hover:shadow-lg',
    secondary: 'bg-ifaqa-linen text-ifaqa-plum border border-ifaqa-sand/60 hover:bg-ifaqa-cashmere/50 shadow-sm',
    accent: 'bg-gradient-to-br from-[#B2949D] to-[#6B5F6F] text-white shadow-md hover:opacity-95',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-ifaqa-plum',
    ghost: 'text-ifaqa-plum hover:bg-ifaqa-sand/20',
  };

  return (
    <button
      disabled={disabled}
      style={{
        transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease, box-shadow 150ms ease, opacity 150ms ease, color 150ms ease',
      }}
      className={`inline-flex items-center justify-center font-serif select-none active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
