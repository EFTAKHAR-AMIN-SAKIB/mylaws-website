'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/data/legal';

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: 'light';
  toggleTheme: () => void;
  t: (bn: string, en: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Exclusively light mode: remove any dark class and clear legacy theme preference
    try {
      localStorage.removeItem('mylaws_theme');
      document.documentElement.classList.remove('dark');
    } catch {}

    try {
      const savedLang = localStorage.getItem('mylaws_lang') as Lang;
      if (savedLang && (savedLang === 'bn' || savedLang === 'en')) {
        setLangState(savedLang);
      }
    } catch {
      // In private browsing or restricted environments, keep in-memory defaults
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('mylaws_lang', newLang);
    } catch {}
  };

  // Locked to light mode: no-op toggle preserved for interface stability
  const toggleTheme = () => {
    document.documentElement.classList.remove('dark');
  };

  const t = (bnText: string, enText: string) => (lang === 'bn' ? bnText : enText);

  return (
    <AppContext.Provider value={{ lang, setLang, theme: 'light', toggleTheme, t }}>
      <div className={mounted ? '' : 'invisible'}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
