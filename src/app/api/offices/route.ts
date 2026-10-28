import { NextRequest, NextResponse } from 'next/server';
import { verifiedOffices, findOffice } from '@/data/offices';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const office = findOffice(id);
    if (!office) {
      return NextResponse.json({ error: 'Office not found' }, { status: 404 });
    }
    return NextResponse.json({ office });
  }

  return NextResponse.json(
    {
      count: verifiedOffices.length,
      offices: verifiedOffices,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
