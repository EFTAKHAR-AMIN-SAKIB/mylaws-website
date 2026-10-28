'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { ChevronUp, ArrowUp } from 'lucide-react';

export function ScrollController() {
  const { lang, t } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!showScrollTop) return null;

  return (
    <div className="no-print fixed bottom-6 right-6 z-40 transition-all duration-300 animate-in fade-in zoom-in-90">
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center h-12 w-12 rounded-full border border-border-light bg-surface-cardLight/95 text-primary-light shadow-lg backdrop-blur-sm hover:border-accent-light hover:bg-surface-light hover:shadow-xl transition-all active:scale-95"
        aria-label={t('পৃষ্ঠার শীর্ষে যান', 'Scroll back to top')}
        title={t('পৃষ্ঠার শীর্ষে যান', 'Scroll to top')}
      >
        {/* Subtle Circular Progress Ring */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#DDD3C1"
            strokeWidth="2.5"
            fill="none"
            opacity="0.4"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#9A6F32"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        </svg>

        {/* Upward Chevron with subtle float animation on hover */}
        <div className="relative flex items-center justify-center text-accent-light group-hover:-translate-y-0.5 transition-transform">
          <ChevronUp className="h-5 w-5" />
        </div>

        {/* Tooltip on Desktop hover */}
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-primary-light px-2 py-1 text-[10px] font-medium text-surface-light opacity-0 shadow transition-opacity group-hover:opacity-100 whitespace-nowrap">
          {t('শীর্ষে যান', 'Back to Top')}
        </span>
      </button>
    </div>
  );
}
