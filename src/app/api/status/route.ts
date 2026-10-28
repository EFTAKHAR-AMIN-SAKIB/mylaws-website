import { NextResponse } from 'next/server';
import { isMetaConfigured, getMetaModelName } from '@/lib/meta';
import { legalPackManifest } from '@/data/manifest';

export async function GET() {
  return NextResponse.json(
    {
      status: 'operational',
      configured: isMetaConfigured(),
      model: getMetaModelName(),
      legalPackVersion: legalPackManifest.id,
      provisionsCount: 23,
      verifiedDate: '2026-10-26',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
