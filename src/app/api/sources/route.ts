import { NextRequest, NextResponse } from 'next/server';
import { provisions as fallbackProvisions, CORPUS_VERSION, CORPUS_PUBLISHED_AT } from '@/data/legal';
import { searchLibrary } from '@/lib/retrieval';
import { isCloudflareConfigured, fetchProvisionsFromD1 } from '@/lib/cloudflare';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');

  let results = isCloudflareConfigured()
    ? await fetchProvisionsFromD1(1000)
    : fallbackProvisions;

  if (category) {
    results = results.filter((p) => (p.categories && p.categories.length > 0 ? p.categories.includes(category as any) : p.category === category));
  }

  if (q && q.trim().length > 0) {
    results = searchLibrary(q, category as any);
  }

  return NextResponse.json(
    {
      count: results.length,
      corpusVersion: CORPUS_VERSION,
      publishedAt: CORPUS_PUBLISHED_AT,
      consultedDate: '2026-10-30',
      source: isCloudflareConfigured() ? 'cloudflare_d1' : 'local_verified_corpus',
      provisions: results,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
