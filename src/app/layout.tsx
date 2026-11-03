import type { Metadata, Viewport } from 'next';
import React, { Suspense } from 'react';
import './globals.css';
import { AppProvider } from '@/components/AppContext';
import { AuthProvider } from '@/components/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { NavigationProgressBar } from '@/components/NavigationProgressBar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F1EDE1',
};

export const metadata: Metadata = {
  title: 'MyLaws — বাংলাদেশ আইনি তথ্য ও প্রস্তুতি সহকারী',
  description:
    'সহজ বাংলায় আপনার অধিকার বুঝুন, যাচাইকৃত আইনি বিধান দেখুন, পরবর্তী করণীয় পদক্ষেপের তালিকা নিন এবং অভিযোগ বা জিডির খসড়া প্রস্তুত করুন।',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MyLaws',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-bg-light text-primary-light transition-colors duration-200 relative selection:bg-accent-light/20 selection:text-primary-light">
        <AppProvider>
          <AuthProvider>
            {/* Top Navigation Loading Bar for Moving Between Pages */}
            <Suspense fallback={null}>
              <NavigationProgressBar />
            </Suspense>

            {/* Main Application Shell */}
            <div className="min-h-screen flex flex-col pb-16 md:pb-0 relative z-10">
              {children}
            </div>

            <AuthModal />
            <MobileBottomNav />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
