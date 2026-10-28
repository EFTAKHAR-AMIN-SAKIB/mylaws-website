import { NextRequest, NextResponse } from 'next/server';
import { retrieve } from '@/lib/retrieval';
import { createLegalWorkflow } from '@/lib/workflow';
import {
  checkRateLimit,
  isMetaConfigured,
  generateMetaVerifiedAnswer,
} from '@/lib/meta';
import type { AnswerRequest, AnswerResult } from '@/types/contracts';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before asking again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      requestId = crypto.randomUUID(),
      originalMessage,
      language = 'bn',
      facts = [],
      location = null,
      date = null,
    } = body as Partial<AnswerRequest>;

    if (
      typeof originalMessage !== 'string' ||
      !originalMessage.trim() ||
      originalMessage.length > 3000
    ) {
      return NextResponse.json(
        { error: 'Invalid question: must be a non-empty string under 3000 characters.' },
        { status: 400 }
      );
    }

    if (!['en', 'bn'].includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language: allowed values are "en" or "bn".' },
        { status: 400 }
      );
    }

    const request: AnswerRequest = {
      requestId,
      originalMessage: originalMessage.trim(),
      language,
      facts,
      location,
      date,
      requestedMode: 'online',
    };

    // 1. Retrieve candidate verified provisions
    const matches = retrieve(request.originalMessage, 3);
    const candidateProvisions = matches.map((m) => m.provision);

    // 2. Generate canonical Action Checklist & legal workflow
    const workflowResult = createLegalWorkflow(request, 'online');

    // 3. If Meta API is configured, attempt model-assisted verification
    if (isMetaConfigured() && candidateProvisions.length > 0) {
      try {
        const metaRes = await generateMetaVerifiedAnswer(
          request.originalMessage,
          candidateProvisions,
          language
        );

        // Prepend or enrich verified claim
        workflowResult.explanation.unshift({
          text: metaRes.answer,
          sourceIds: metaRes.sourceIds,
        });
      } catch (metaErr) {
        // Fall back gracefully to deterministic verified guidance; do not fail or fabricate
        console.warn('Meta API call failed or citation verification rejected; falling back to canonical workflow:', metaErr);
      }
    }

    return NextResponse.json(workflowResult, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error processing legal request.' },
      { status: 500 }
    );
  }
}
