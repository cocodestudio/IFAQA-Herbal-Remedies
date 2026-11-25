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
    sm: 'h-9 px-3.5 text-xs font-medium',
    md: 'h-10 px-5 text-sm font-medium',
    lg: 'h-11 sm:h-12 px-6 text-sm font-medium',
  };

  const variantStyles = {
    primary: 'bg-ifaqa-plum text-ifaqa-linen hover:bg-ifaqa-blackberry border border-ifaqa-plum shadow-sm',
    secondary: 'bg-ifaqa-cashmere text-ifaqa-plum border border-ifaqa-plum/15 hover:bg-[#EDE5D5]',
    accent: 'bg-ifaqa-mauve text-ifaqa-plum font-medium hover:bg-ifaqa-sand border border-ifaqa-plum/15',
    outline: 'border border-ifaqa-plum/25 text-ifaqa-plum bg-white hover:bg-ifaqa-cashmere/60',
    ghost: 'text-ifaqa-plum hover:bg-ifaqa-cashmere',
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg font-sans select-none transition-[background-color,border-color,color,transform,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
