import React, { useState, useEffect, useRef, CSSProperties } from 'react';

export interface PictureSource {
  srcSet: string;
  type?: string;
  media?: string;
  sizes?: string;
}

export interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  pictureSources?: PictureSource[];
  placeholderColor?: string;
  showSkeleton?: boolean;
  className?: string;
  imgClassName?: string;
  rootMargin?: string;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  priority = false,
  fetchPriority,
  pictureSources,
  placeholderColor = 'bg-slate-200/50 dark:bg-slate-800/50',
  showSkeleton = true,
  className = '',
  imgClassName = '',
  rootMargin = '200px',
  onLoad,
  style,
  srcSet,
  sizes,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine effective fetchpriority: if priority is true, default to 'high'
  const computedFetchPriority = fetchPriority || (priority ? 'high' : undefined);
  const loadingStrategy = priority ? 'eager' : 'lazy';

  useEffect(() => {
    if (priority || isInView) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView, rootMargin]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const containerStyle: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio ? { aspectRatio } : {}),
    ...style,
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={containerStyle}
    >
      {/* Lightweight Blur-Up / Skeleton placeholder to prevent CLS */}
      {showSkeleton && !isLoaded && (
        <div
          className={`absolute inset-0 z-0 animate-pulse transition-opacity duration-500 ease-out ${placeholderColor}`}
          aria-hidden="true"
        />
      )}

      {/* Render actual image / picture once in view or if eager/priority */}
      {isInView ? (
        pictureSources && pictureSources.length > 0 ? (
          <picture className="w-full h-full block">
            {pictureSources.map((ps, idx) => (
              <source
                key={idx}
                srcSet={ps.srcSet}
                type={ps.type}
                media={ps.media}
                sizes={ps.sizes || sizes}
              />
            ))}
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              srcSet={srcSet}
              sizes={sizes}
              loading={loadingStrategy}
              fetchPriority={computedFetchPriority}
              decoding="async"
              onLoad={handleImageLoad}
              className={`w-full h-full transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${imgClassName}`}
              {...rest}
            />
          </picture>
        ) : (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={sizes}
            loading={loadingStrategy}
            fetchPriority={computedFetchPriority}
            decoding="async"
            onLoad={handleImageLoad}
            className={`w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
            {...rest}
          />
        )
      ) : (
        /* Fallback SSR / SEO element for crawlers before JS observer triggers */
        <noscript>
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={sizes}
            className={imgClassName}
            {...rest}
          />
        </noscript>
      )}
    </div>
  );
};

export default LazyImage;
