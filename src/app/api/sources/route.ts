import { NextRequest, NextResponse } from 'next/server';
import { provisions as fallbackProvisions } from '@/data/legal';
import { searchLibrary } from '@/lib/retrieval';
import { isCloudflareConfigured, fetchProvisionsFromD1 } from '@/lib/cloudflare';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');

  let results = isCloudflareConfigured()
    ? await fetchProvisionsFromD1(200)
    : fallbackProvisions;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (q && q.trim().length > 0) {
    results = searchLibrary(q, category as any);
  }

  return NextResponse.json(
    {
      count: results.length,
      provisions: results,
      consultedDate: '2026-10-26',
      source: isCloudflareConfigured() ? 'cloudflare_d1' : 'local_verified_corpus',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
