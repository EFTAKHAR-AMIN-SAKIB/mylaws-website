import { NextRequest, NextResponse } from 'next/server';
import { provisions } from '@/data/legal';
import { searchLibrary } from '@/lib/retrieval';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');

  let results = provisions;

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (q && q.trim().length > 0) {
    results = searchLibrary(q);
  }

  return NextResponse.json(
    {
      count: results.length,
      provisions: results,
      consultedDate: '2026-10-26',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
