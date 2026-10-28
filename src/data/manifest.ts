import type { AndroidReleaseManifest, PackState } from '@/types/contracts';

export const legalPackManifest: PackState = {
  id: 'bd-pilot-2026-10-27.1',
  modelVersion: 'muse-spark-1.3',
  legalVersion: '2026-10-26-corpus-v1',
  indexVersion: 'fts-bm25-v1',
  templateVersion: 'templates-v1',
  status: 'ready',
  compatible: true,
  coverage: [
    'Bangladesh Labour Act, 2006 (Sections 5, 108, 123, 124A, 132)',
    'Constitution of Bangladesh (Articles 27, 28, 31, 33, 35, 43, 44)',
    'Consumers’ Right Protection Act, 2009 (Sections 40, 44, 45, 60)',
    'Transfer of Property Act, 1882 (Sections 53C, 54, 54A)',
    'Domestic Violence (Prevention and Protection) Act, 2010 (Sections 3, 11)',
    'Penal Code, 1860 (Sections 503, 507)',
  ],
  sizeBytes: 142000,
  freeBytesRequired: 500000,
  completedBytes: 142000,
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
