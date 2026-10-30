import type { AndroidReleaseManifest, PackState } from '@/types/contracts';

export const legalPackManifest: PackState = {
  id: 'bd-release-2026-10-30.3',
  modelVersion: 'deterministic-statutory-v2',
  legalVersion: '2026.10.30-batch2.2',
  indexVersion: 'fts-bm25-v2',
  templateVersion: 'templates-v2',
  status: 'ready',
  compatible: true,
  coverage: [
    'Selected 255 statutory provisions across 7 core categories from 31 Bangladesh statutes',
    'Labour Act, 2006 (Wages, weekly holidays, termination, maternity, compensation)',
    'The Penal Code, 1860 & Police Act, 1861 (GD, threats, extortion, hurt, unlawful assembly)',
    'Cyber Protection Act 2026 & Pornography Control Act 2012 (Intimate extortion, hacking, ID fraud)',
    'Consumers’ Right Protection Act, 2009 (Adulteration, fake goods, expired goods, 30-day limit, 25% reward)',
    'Land Crime Act 2023 & Specific Relief Act 1877 (Dispossession, topsoil cutting, bailable status, SRA 8/9)',
    'Family Courts Act, 2023 (Act No. 26 of 2023) & MFLO 1961 (Dower, maintenance, custody, divorce)',
    'Constitution of Bangladesh 1972 & Legal Aid Services Act 2000 (Art 33 24hr limit, 16699 legal aid)'
  ],
  sizeBytes: 450000,
  freeBytesRequired: 1500000,
  completedBytes: 450000,
  error: null,
};

export const androidReleaseManifest: AndroidReleaseManifest = {
  version: '1.0.0-preview',
  versionCode: 1,
  releaseDate: '2026-10-28',
  status: 'available',
  apkUrl: '/downloads/mylaws-v1-preview.apk',
  fileSizeBytes: 10335330, // 10.3 MB
  sha256Checksum: 'b7b95f475a836ed1d6ba39d4d7e116989126a588c99a8412cccbd3a6563f5445',
  minimumAndroidVersion: 'Android 8.0 (API level 26)',
  recommendedRam: '4 GB physical RAM (2 GB devices can run online mode and static reference)',
  testedDevices: [
    'Pixel 6 / 7 (Android 14) - Verified Navigation & Bangla Fonts',
    'Samsung Galaxy A14 (Android 13, 4 GB RAM) - Tested UI & PDF Generation',
    'Android Studio Emulator (API 34, x86_64)',
  ],
  changeLog: [
    'Phase 1: Full bilingual Compose interface with Noto Bengali typography',
    'Action Checklist with dynamic state persistence and undo capability',
    'Bangla draft generators: GD Application and DIFE Written Complaint',
    'Deterministic service contracts matching web backend API schema',
    'Multi-page A4 PDF rendering with embedded Bengali font support',
  ],
};
