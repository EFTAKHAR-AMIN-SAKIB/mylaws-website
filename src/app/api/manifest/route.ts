import { NextResponse } from 'next/server';
import { legalPackManifest, androidReleaseManifest } from '@/data/manifest';

export async function GET() {
  return NextResponse.json(
    {
      legalPack: legalPackManifest,
      androidRelease: androidReleaseManifest,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
