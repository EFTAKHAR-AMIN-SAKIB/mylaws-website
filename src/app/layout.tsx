import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/AppContext';

export const metadata: Metadata = {
  title: 'MyLaws — বাংলাদেশ আইনি তথ্য ও প্রস্তুতি সহকারী',
  description:
    'সহজ বাংলায় আপনার অধিকার বুঝুন, যাচাইকৃত আইনি বিধান দেখুন, পরবর্তী করণীয় পদক্ষেপের তালিকা নিন এবং অভিযোগ বা জিডির খসড়া প্রস্তুত করুন।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors duration-200">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
