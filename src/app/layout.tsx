import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/components/AppContext';
import { AuthProvider } from '@/components/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { MobileBottomNav } from '@/components/MobileBottomNav';

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
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' },
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
      <body className="min-h-screen bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors duration-200">
        <AppProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col pb-16 md:pb-0">
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
