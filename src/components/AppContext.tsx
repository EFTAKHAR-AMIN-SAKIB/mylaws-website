'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/data/legal';

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  t: (bn: string, en: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('bn');
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only load non-sensitive preferences from localStorage
    try {
      const savedLang = localStorage.getItem('mylaws_lang') as Lang;
      if (savedLang && (savedLang === 'bn' || savedLang === 'en')) {
        setLangState(savedLang);
      }

      const savedTheme = localStorage.getItem('mylaws_theme') as 'light' | 'dark';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      setThemeState(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
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

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    try {
      localStorage.setItem('mylaws_theme', next);
    } catch {}
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const t = (bnText: string, enText: string) => (lang === 'bn' ? bnText : enText);

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      <div className={mounted ? '' : 'invisible'}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
