import { NextRequest, NextResponse } from 'next/server';
import { prepareDraftDocument, assembleDraftPlainText } from '@/lib/drafts';
import type { DocumentType, DraftFacts } from '@/types/contracts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, facts, id, reviewed } = body as {
      type: DocumentType;
      facts: DraftFacts;
      id?: string;
      reviewed?: boolean;
    };

    if (!type || !['gd', 'dife', 'dncrp'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid document type. Allowed: "gd", "dife", or "dncrp".' },
        { status: 400 }
      );
    }

    if (!facts || !Array.isArray(facts.fields)) {
      return NextResponse.json(
        { error: 'Invalid facts structure. Array of fields required.' },
        { status: 400 }
      );
    }

    const doc = prepareDraftDocument(type, facts, id);
    const plainText = assembleDraftPlainText(doc, Boolean(reviewed));

    return NextResponse.json(
      {
        document: doc,
        plainText,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to prepare draft document.' },
      { status: 500 }
    );
  }
}
