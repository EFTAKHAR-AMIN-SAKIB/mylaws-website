'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { useAuth } from './AuthContext';
import {
  Scale,
  Sparkles,
  FileText,
  BookOpen,
  History,
  Home,
} from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { lang, t } = useApp();
  const { user, openAuthModal } = useAuth();

  // On /ask with active chat dock, we let the chat dock handle the bottom screen real estate
  // but on all other pages (and initial /ask), MobileBottomNav gives a 100% native app experience.
  const isAskPage = pathname === '/ask';

  const navItems = [
    {
      href: '/',
      label: t('হোম', 'Home'),
      icon: Home,
      exact: true,
    },
    {
      href: '/ask',
      label: t('সহকারী', 'Assistant'),
      icon: Sparkles,
      exact: false,
      highlight: true,
    },
    {
      href: '/drafts',
      label: t('খসড়া', 'Drafts'),
      icon: FileText,
      exact: false,
    },
    {
      href: '/sources',
      label: t('উৎস', 'Sources'),
      icon: BookOpen,
      exact: false,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F0]/95 dark:bg-[#1a1715]/95 backdrop-blur-xl border-t border-[#DDD3C1]/80 shadow-[0_-4px_24px_rgba(35,31,28,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-2 transition-transform duration-200"
      id="mobile-bottom-nav"
    >
      <div className="flex items-center justify-around px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-3 min-w-[60px] rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#9A6F32] font-semibold'
                  : 'text-[#5A534A] hover:text-[#231F1C]'
              }`}
            >
              {/* Active Indicator Top Pill */}
              {isActive && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-[#9A6F32] animate-in fade-in zoom-in duration-150" />
              )}

              <div
                className={`relative flex items-center justify-center p-1 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#9A6F32]/12 text-[#9A6F32]'
                    : item.highlight
                    ? 'text-[#9A6F32]'
                    : ''
                }`}
              >
                <Icon className={`h-5 w-5 ${item.highlight && !isActive ? 'text-[#9A6F32]' : ''}`} />
                {item.highlight && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#9A6F32] animate-pulse" />
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 leading-tight tracking-tight ${
                  lang === 'bn' ? 'font-hind font-semibold' : 'font-cinzel'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
