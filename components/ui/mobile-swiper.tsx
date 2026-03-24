'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { uiContent } from '@/data/dataUi';

interface MobileSwiperProps {
  children: ReactNode[];
  breakpoint?: number;
  itemsPerView?: number;
  spaceBetween?: number;
  className?: string;
  gridClassName?: string;
  swiperClassName?: string;
  showDots?: boolean;
  dotClassName?: string;
}

export default function MobileSwiper({
  children,
  breakpoint = 768,
  itemsPerView = 1,
  spaceBetween = 16,
  className = '',
  gridClassName = '',
  swiperClassName = '',
  showDots = true,
  dotClassName = '',
}: MobileSwiperProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Use refs for drag so we never read stale state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const items = Array.isArray(children) ? children : [children];
  const maxIndex = Math.max(0, items.length - itemsPerView);

  // Track container width via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  // Reset to first slide when switching modes
  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  // Pixel width per slide accounting for gaps
  const totalGap = spaceBetween * (itemsPerView - 1);
  const slideWidth = containerWidth > 0
    ? (containerWidth - totalGap) / itemsPerView
    : 0;

  // Translate the track: each step moves by one slideWidth + one gap
  const trackTranslateX = -currentIndex * (slideWidth + spaceBetween);

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const endX = 'changedTouches' in e
      ? e.changedTouches[0].clientX
      : (e as React.MouseEvent).clientX;

    const distance = dragStartX.current - endX;
    const threshold = Math.max(50, slideWidth * 0.25);

    if (distance > threshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (distance < -threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Desktop: just render the grid wrapper
  if (!isMobile) {
    return (
      <div className={gridClassName}>
        {items}
      </div>
    );
  }

  return (
    // Outer wrapper must be `relative` so arrow buttons position correctly
    <div className={`relative ${className}`}>
      {/* Overflow clip viewport */}
      <div
        ref={containerRef}
        className={`overflow-hidden w-full ${swiperClassName}`}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => { isDragging.current = false; }}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        style={{ cursor: 'grab', userSelect: 'none' }}
      >
        {/* Sliding track */}
        <div
          className="flex"
          style={{
            gap: `${spaceBetween}px`,
            transform: `translateX(${trackTranslateX}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 [&>*]:!opacity-100 [&>*]:!transform-none"
              style={{
                width: slideWidth > 0 ? `${slideWidth}px` : `${100 / itemsPerView}%`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Prev Arrow — always in DOM, hidden when at start */}
      <button
        onClick={() => goTo(currentIndex - 1)}
        className={`absolute left-2 top-1/3 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
          currentIndex > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label={uiContent.swiper.prevAriaLabel}
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Arrow — always in DOM, hidden when at end */}
      <button
        onClick={() => goTo(currentIndex + 1)}
        className={`absolute right-2 top-1/3 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 ${
          currentIndex < maxIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label={uiContent.swiper.nextAriaLabel}
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-PRIMARY w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              } ${dotClassName}`}
              aria-label={`${uiContent.swiper.goToSlideAriaLabel} ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
