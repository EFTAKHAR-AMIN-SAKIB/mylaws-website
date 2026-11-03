'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentUrlRef = useRef<string>('');

  // Handle route change completion
  useEffect(() => {
    const fullUrl = `${pathname}?${searchParams.toString()}`;
    if (currentUrlRef.current && currentUrlRef.current !== fullUrl) {
      // Route has successfully changed -> finish the bar
      setProgress(100);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 350);
    }
    currentUrlRef.current = fullUrl;
  }, [pathname, searchParams]);

  // Intercept click on internal links to start progress smoothly
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Find closest anchor
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const targetAttr = target.getAttribute('target');

      // Only handle local internal links that aren't download, new tab, hash, or external
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        targetAttr === '_blank' ||
        target.hasAttribute('download')
      ) {
        return;
      }

      // If linking to same route, ignore
      if (href === pathname || href === window.location.pathname) {
        return;
      }

      // Check if origin matches
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
      } catch {
        return;
      }

      // Start navigation animation
      setVisible(true);
      setProgress(20);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setProgress((prev) => (prev < 65 ? 65 : prev));
        timerRef.current = setTimeout(() => {
          setProgress((prev) => (prev < 85 ? 85 : prev));
        }, 300);
      }, 150);
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[3px] bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-[#7E5723] via-[#B68B4C] to-[#DFBB84] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(182,139,76,0.65),0_0_4px_rgba(223,187,132,0.85)] relative"
        style={{
          width: `${progress}%`,
          opacity: visible || progress === 100 ? 1 : 0,
        }}
      >
        {/* Glowing leading spark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FFE5A3] shadow-[0_0_8px_#FFE5A3] -mr-1" />
      </div>
    </div>
  );
}
