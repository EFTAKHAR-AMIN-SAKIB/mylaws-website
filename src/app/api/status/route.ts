import { NextResponse } from 'next/server';
import { isMetaConfigured, getMetaModelName } from '@/lib/meta';
import { legalPackManifest } from '@/data/manifest';

export async function GET() {
  const configured = isMetaConfigured();
  return NextResponse.json(
    {
      status: 'operational',
      mode: configured ? 'meta_assisted' : 'deterministic_guided',
      keyConfigured: configured,
      model: configured ? getMetaModelName() : null,
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
