'use client';

import React, { Component, ReactNode } from 'react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.warn(`SectionErrorBoundary [${this.props.sectionName || 'section'}]:`, error?.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
            <div className="p-4 rounded-xl bg-ifaqa-cashmere/70 border border-ifaqa-plum/10 flex items-center justify-between gap-3 text-xs text-[#5A6962]">
              <span>Unable to display this section cleanly right now.</span>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="px-3 py-1.5 rounded-md bg-white border border-ifaqa-plum/15 text-ifaqa-plum font-medium hover:bg-ifaqa-linen shrink-0"
              >
                Reload section
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
