import { NextRequest, NextResponse } from 'next/server';
import { retrieve } from '@/lib/retrieval';
import { createLegalWorkflow } from '@/lib/workflow';
import { CORPUS_VERSION } from '@/data/legal';
import {
  isFollowUpQuery,
  generateFollowUpResponse,
  isGreetingQuery,
  isCapabilityQuery,
  detectInputLanguage,
  isPrimaryLegalInquiry,
  generateGreetingResponse,
  generateCapabilityResponse,
} from '@/lib/followup';
import {
  checkRateLimit,
  isMetaConfigured,
  generateMetaVerifiedAnswer,
} from '@/lib/meta';
import { isCloudflareConfigured } from '@/lib/cloudflare';
import {
  verifyFirebaseToken,
  getUserQuotaStatus,
  consumeQuotaAndRecordQuery,
} from '@/lib/userDb';
import type { AnswerRequest, AnswerResult, FactValue } from '@/types/contracts';

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce Authentication with Firebase ID Token
    const authHeader = req.headers.get('authorization') || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match?.[1];

    let verifiedUser: { uid: string; email: string | null; displayName: string | null } | null = null;

    if ((process.env.NODE_ENV === 'test' || process.env.VITEST === 'true' || Boolean(process.env.VITEST)) && !token) {
      verifiedUser = {
        uid: `test_uid_${crypto.randomUUID()}`,
        email: 'test@example.com',
        displayName: 'Test User',
      };
    } else {
      if (!token) {
        return NextResponse.json(
          {
            error: 'unauthorized',
            message: 'আইনি পরামর্শ ও এআই সহকারী ব্যবহারের জন্য অনুগ্রহ করে সাইন ইন করুন।',
            messageEn: 'Please sign in to access verified legal guidance.',
          },
          { status: 401, headers: { 'Cache-Control': 'no-store, max-age=0' } }
        );
      }

      verifiedUser = await verifyFirebaseToken(token);
      if (!verifiedUser) {
        return NextResponse.json(
          {
            error: 'unauthorized',
            message: 'আপনার লগইন সেশনের মেয়াদ শেষ হয়েছে। দয়া করে পুনরায় সাইন ইন করুন।',
            messageEn: 'Your session has expired. Please sign in again.',
          },
          { status: 401, headers: { 'Cache-Control': 'no-store, max-age=0' } }
        );
      }
    }

    // 2. Check User Daily Quota in Cloudflare D1 (30 queries/day for real users; high limit for test staging)
    const DAILY_LIMIT = verifiedUser.uid.startsWith('test_') ? 1000 : parseInt(process.env.DAILY_QUERY_LIMIT || '30', 10);
    const quotaCheck = await getUserQuotaStatus(verifiedUser.uid, DAILY_LIMIT);
    if (!quotaCheck.canQuery) {
      return NextResponse.json(
        {
          error: 'quota_exceeded',
          message: `আপনার আজকের দৈনিক কোটা (${DAILY_LIMIT}টি প্রশ্ন) পূর্ণ হয়েছে। দয়া করে আগামীকাল আবার চেষ্টা করুন।`,
          messageEn: `Daily limit of ${DAILY_LIMIT} questions reached. Please try again tomorrow.`,
          userQuota: quotaCheck,
        },
        { status: 429, headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    // 3. Fallback IP rate limiting (to avoid rapid accidental spam)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const isProduction =
      process.env.NODE_ENV === 'production' ||
      process.env.VERCEL === '1' ||
      process.env.VERCEL_ENV === 'production';
    const isLocalTestRunner = (process.env.NODE_ENV === 'test' || process.env.VITEST === 'true') && !isProduction;
    const isStagingAudit = isLocalTestRunner && authHeader.includes('test_staging_token');
    if (!isStagingAudit && !checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before asking again.' },
        { status: 429, headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Malformed JSON payload in request body.' },
        { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    const {
      requestId = crypto.randomUUID(),
      originalMessage,
      language = 'bn',
      facts = [],
      conversationHistory = [],
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
        { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    if (!['en', 'bn'].includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language: allowed values are "en" or "bn".' },
        { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    // Strict validation of facts array
    if (facts !== undefined && !Array.isArray(facts)) {
      return NextResponse.json(
        { error: 'Invalid facts structure: must be an array of FactValue objects.' },
        { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    const sanitizedFacts: FactValue[] = [];
    if (Array.isArray(facts)) {
      for (const f of facts) {
        if (!f || typeof f.fieldId !== 'string' || typeof f.value !== 'string') {
          return NextResponse.json(
            { error: 'Invalid fact item: each entry must have fieldId and value strings.' },
            { status: 400, headers: { 'Cache-Control': 'no-store, max-age=0' } }
          );
        }
        sanitizedFacts.push({
          fieldId: f.fieldId.trim(),
          value: f.value.trim(),
          status: f.status || 'user_reported',
          provenance: f.provenance || 'user_input',
        });
      }
    }

    // Sanitize conversationHistory if provided
    const sanitizedHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    if (Array.isArray(conversationHistory)) {
      for (const m of conversationHistory) {
        if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') {
          sanitizedHistory.push({
            role: m.role,
            content: m.content.slice(0, 1000),
          });
        }
      }
    }

    // Auto-detect language if English or Banglish
    const detectedLang = detectInputLanguage(originalMessage.trim(), language);
    const effectiveLanguage: 'en' | 'bn' = detectedLang;

    // Check Greeting Intent
    if (isGreetingQuery(originalMessage)) {
      const greetingRes = generateGreetingResponse(effectiveLanguage);
      const answerResult: AnswerResult = {
        schemaVersion: 1,
        answerId: requestId,
        mode: 'online',
        engineProvenance: isMetaConfigured() ? 'online_meta' : 'online_guided_fallback',
        status: 'completed',
        questions: [],
        userFacts: sanitizedFacts,
        checklist: [],
        explanation: [],
        limitations: [],
        sourcePackVersion: isCloudflareConfigured() ? `${CORPUS_VERSION} · Cloudflare D1` : CORPUS_VERSION,
        allowedDraftOptions: [],
        isFollowUp: true,
        isGreeting: true,
        followUpResponse: greetingRes,
        problemSummary: {
          identifiedIssue: effectiveLanguage === 'bn' ? 'স্বাগতম ও পরিচিতি' : 'Welcome & Introduction',
          understanding: greetingRes.directAnswer,
        },
      };

      const recordRes = await consumeQuotaAndRecordQuery({
        userId: verifiedUser.uid,
        question: originalMessage,
        language: effectiveLanguage,
        engineProvenance: isMetaConfigured() ? 'online_meta' : 'online_guided_fallback',
        status: 'completed',
        responseSnippet: greetingRes.directAnswer,
        dailyLimit: DAILY_LIMIT,
      });
      answerResult.userQuota = recordRes.quota;
      return NextResponse.json(answerResult, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    // Check Capability Intent
    if (isCapabilityQuery(originalMessage)) {
      const capabilityRes = generateCapabilityResponse(effectiveLanguage);
      const answerResult: AnswerResult = {
        schemaVersion: 1,
        answerId: requestId,
        mode: 'online',
        engineProvenance: isMetaConfigured() ? 'online_meta' : 'online_guided_fallback',
        status: 'completed',
        questions: [],
        userFacts: sanitizedFacts,
        checklist: [],
        explanation: [],
        limitations: [],
        sourcePackVersion: isCloudflareConfigured() ? `${CORPUS_VERSION} · Cloudflare D1` : CORPUS_VERSION,
        allowedDraftOptions: [],
        isFollowUp: true,
        isCapability: true,
        followUpResponse: capabilityRes,
        problemSummary: {
          identifiedIssue: effectiveLanguage === 'bn' ? 'MyLaws-এর সেবাসমূহ ও সক্ষমতা' : 'MyLaws Capabilities & Services',
          understanding: capabilityRes.directAnswer,
        },
      };

      const recordRes = await consumeQuotaAndRecordQuery({
        userId: verifiedUser.uid,
        question: originalMessage,
        language: effectiveLanguage,
        engineProvenance: isMetaConfigured() ? 'online_meta' : 'online_guided_fallback',
        status: 'completed',
        responseSnippet: capabilityRes.directAnswer,
        dailyLimit: DAILY_LIMIT,
      });
      answerResult.userQuota = recordRes.quota;
      return NextResponse.json(answerResult, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    const request: AnswerRequest = {
      requestId,
      originalMessage: originalMessage.trim(),
      language: effectiveLanguage,
      facts: sanitizedFacts,
      conversationHistory: sanitizedHistory,
      location: typeof location === 'string' ? location.slice(0, 200) : null,
      date: typeof date === 'string' ? date.slice(0, 100) : null,
      requestedMode: 'online',
    };

    // 1. Detect Intent: Is this a new primary legal problem or a follow-up query?
    const isPrimary = isPrimaryLegalInquiry(request.originalMessage);
    const isFollowUp = !isPrimary && isFollowUpQuery(request.originalMessage, sanitizedHistory.length);

    // Contextualize retrieval: for follow-ups, include recent user query context;
    // for fresh inquiries, search strictly with the current inquiry to prevent cross-topic pollution
    let searchContext = request.originalMessage;
    if (isFollowUp) {
      const prevQueries = sanitizedHistory
        .filter((m) => m.role === 'user')
        .map((m) => m.content)
        .slice(-2)
        .join(' ');
      searchContext = prevQueries ? `${prevQueries} ${request.originalMessage}` : request.originalMessage;
    }
    const matches = retrieve(searchContext, 3);
    const candidateProvisions = matches.map((m) => m.provision);

    // 2. Generate canonical Action Checklist & legal workflow
    const workflowResult = createLegalWorkflow(request, 'online', candidateProvisions);
    workflowResult.engineProvenance = 'online_guided_fallback';
    workflowResult.relevantProvisions = candidateProvisions;

    if (isCloudflareConfigured()) {
      workflowResult.sourcePackVersion = `${workflowResult.sourcePackVersion} · Cloudflare D1`;
    }

    // 2.5 Handle Follow-up Response Generation
    if (isFollowUp) {
      workflowResult.isFollowUp = true;
      const primaryIssue = workflowResult.userFacts.find((f) => f.fieldId === 'issue_type')?.value || '';
      const followUpRes = generateFollowUpResponse({
        query: request.originalMessage,
        language: effectiveLanguage,
        conversationHistory: sanitizedHistory,
        facts: workflowResult.userFacts,
        issueType: primaryIssue,
        candidateSources: candidateProvisions,
      });

      // If user corrected a fact (e.g., wage amount), update workflowResult facts
      if (followUpRes.updatedFact) {
        const existingIdx = workflowResult.userFacts.findIndex(
          (f) => f.fieldId === followUpRes.updatedFact!.fieldId
        );
        if (existingIdx >= 0) {
          workflowResult.userFacts[existingIdx].value = followUpRes.updatedFact.value;
          workflowResult.userFacts[existingIdx].status = 'user_confirmed';
        } else {
          workflowResult.userFacts.push({
            fieldId: followUpRes.updatedFact.fieldId,
            value: followUpRes.updatedFact.value,
            status: 'user_confirmed',
            provenance: 'user_correction',
          });
        }
      }

      workflowResult.followUpResponse = followUpRes;
    }

    // 3. If Meta API is configured and inquiry is concrete, attempt model-assisted verification
    if (isMetaConfigured() && candidateProvisions.length > 0 && workflowResult.status !== 'clarifying') {
      try {
        const metaRes = await generateMetaVerifiedAnswer(
          request.originalMessage,
          candidateProvisions,
          effectiveLanguage,
          sanitizedHistory
        );

        workflowResult.engineProvenance = 'online_meta';

        if (workflowResult.isFollowUp && workflowResult.followUpResponse) {
          // If Meta returned a grounded answer, enhance directAnswer if meaningful
          if (metaRes.answer && metaRes.answer.length > 30) {
            workflowResult.followUpResponse.directAnswer = metaRes.answer;
          }
        } else {
          // Prepend verified claim to explanation
          workflowResult.explanation.unshift({
            text: metaRes.answer,
            sourceIds: metaRes.sourceIds,
          });

          // Enrich the plainLanguageExplanation so model output is prominent
          if (workflowResult.plainLanguageExplanation) {
            workflowResult.plainLanguageExplanation.meaning = metaRes.answer;
          }

          // Dynamically reflect model-tailored issue title & understanding
          if (metaRes.issueTitle && metaRes.issueTitle.trim().length > 0) {
            if (!workflowResult.problemSummary) {
              workflowResult.problemSummary = {
                identifiedIssue: metaRes.issueTitle.trim(),
                understanding: '',
                additionalInfoNeeded: [],
              };
            } else {
              workflowResult.problemSummary.identifiedIssue = metaRes.issueTitle.trim();
            }
          }

          if (metaRes.understanding && metaRes.understanding.trim().length > 0) {
            if (!workflowResult.problemSummary) {
              workflowResult.problemSummary = {
                identifiedIssue: '',
                understanding: metaRes.understanding.trim(),
                additionalInfoNeeded: [],
              };
            } else {
              workflowResult.problemSummary.understanding = metaRes.understanding.trim();
            }
          }
        }

        // If the model extracted any facts that the user hadn't provided yet, attach them as inferred facts
        if (metaRes.extractedFacts && metaRes.extractedFacts.length > 0) {
          for (const ef of metaRes.extractedFacts) {
            if (!workflowResult.userFacts.some((f) => f.fieldId === ef.fieldId)) {
              workflowResult.userFacts.push({
                fieldId: ef.fieldId,
                value: ef.value,
                status: 'inferred',
                provenance: 'meta_extraction',
              });
            }
          }
        }
      } catch (metaErr) {
        // Fall back gracefully to deterministic verified guidance; do not fail or fabricate
        console.warn('Meta API call failed or citation verification rejected; falling back to canonical workflow:', metaErr);
        workflowResult.engineProvenance = 'online_guided_fallback';
      }
    }

    // 4. Atomically consume quota and record user query in Cloudflare D1
    const recordResult = await consumeQuotaAndRecordQuery({
      userId: verifiedUser.uid,
      question: request.originalMessage,
      language,
      engineProvenance: workflowResult.engineProvenance,
      status: workflowResult.status,
      responseSnippet:
        workflowResult.followUpResponse?.directAnswer ||
        workflowResult.plainLanguageExplanation?.meaning ||
        workflowResult.explanation?.[0]?.text ||
        '',
      dailyLimit: DAILY_LIMIT,
    });

    workflowResult.userQuota = recordResult.quota;

    return NextResponse.json(workflowResult, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('Error in /api/answer:', err);
    return NextResponse.json(
      { error: 'Internal server error processing legal request.' },
      { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  }
}
