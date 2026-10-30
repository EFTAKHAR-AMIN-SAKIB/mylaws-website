import { NextResponse } from 'next/server';
import { isMetaConfigured, getMetaModelName } from '@/lib/meta';
import { legalPackManifest } from '@/data/manifest';
import { canonicalProvisions } from '@/data/legal.generated';

export async function GET() {
  const configured = isMetaConfigured();
  return NextResponse.json(
    {
      status: 'operational',
      mode: configured ? 'meta_assisted' : 'deterministic_guided',
      keyConfigured: configured,
      model: configured ? getMetaModelName() : null,
      legalPackVersion: legalPackManifest.id,
      corpusVersion: legalPackManifest.legalVersion,
      provisionsCount: canonicalProvisions.length,
      verifiedDate: '2026-10-30',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
