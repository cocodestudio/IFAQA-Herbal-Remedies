'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface ShimmerImageProps extends Omit<ImageProps, 'onLoad'> {
  wrapperClassName?: string;
  shimmerClassName?: string;
  hideShimmer?: boolean;
  onImageLoad?: () => void;
}

export function ShimmerImage({
  className = '',
  wrapperClassName = '',
  shimmerClassName = '',
  hideShimmer = false,
  onImageLoad,
  alt,
  fill,
  ...rest
}: ShimmerImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [rest.src]);

  const handleLoad = () => {
    setLoaded(true);
    onImageLoad?.();
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    rest.onError?.(e);
  };

  const showImageImmediately = Boolean(rest.priority || hideShimmer);
  const opacityClass = loaded || showImageImmediately ? 'opacity-100' : 'opacity-0';

  if (fill) {
    return (
      <>
        {!loaded && !hideShimmer && (
          <div
            aria-hidden="true"
            className={`absolute inset-0 ifaqa-shimmer-surface pointer-events-none ${shimmerClassName}`}
          />
        )}
        <Image
          {...rest}
          ref={imgRef}
          fill
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-300 ease-out ${opacityClass}`}
        />
      </>
    );
  }

  return (
    <span className={`relative inline-flex items-center justify-center ${wrapperClassName}`}>
      {!loaded && !hideShimmer && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded ifaqa-shimmer-surface pointer-events-none ${shimmerClassName}`}
        />
      )}
      <Image
        {...rest}
        ref={imgRef}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} transition-opacity duration-300 ease-out ${opacityClass}`}
      />
    </span>
  );
}
