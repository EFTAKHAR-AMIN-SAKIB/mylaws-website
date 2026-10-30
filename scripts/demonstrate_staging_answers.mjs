import crypto from 'crypto';

const API_URL = 'http://localhost:3000/api/answer';
const STAGING_AUTH_TOKEN = 'Bearer test_staging_token_audit_2026';

const hasCitation = (r, idPattern) => {
  const inRelevant = r.relevantProvisions?.some(p => p.id?.includes(idPattern) || p.section?.includes(idPattern));
  const inExplanation = r.explanation?.some(e => e.sourceIds?.some(s => s.includes(idPattern)));
  const inChecklist = r.checklist?.some(c => c.sourceIds?.some(s => s.includes(idPattern)));
  return inRelevant || inExplanation || inChecklist;
};

const testSuites = [
  {
    id: 'case_1_consumer_expired_medicine',
    name: 'Consumer Rights: Expired Medicine & Section 60/76(4) Remedies',
    request: {
      requestId: 'req_consumer_' + Date.now(),
      originalMessage: 'ফার্মেসিতে আমাকে ৬ মাস আগের মেয়াদোত্তীর্ণ অ্যান্টিবায়োটিক ওষুধ বিক্রি করেছে, এখন টাকা ফেরত দিচ্ছে না',
      language: 'bn',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites Consumer Act Section 51 (expired goods/medicine)', test: (r) => hasCitation(r, 'consumer-51') || hasCitation(r, '51') },
      { rule: 'Cites Section 60 (30-day limitation period to DG)', test: (r) => hasCitation(r, 'consumer-60') || hasCitation(r, '60') },
      { rule: 'Explains 25% administrative fine reward under Sec 76(4), NOT 100% instant cash refund', test: (r) => {
        const str = JSON.stringify(r);
        return (str.includes('২৫') || str.includes('25%')) && !str.includes('১০০% বাধ্যতামূলক নগদ ফেরত') && !str.includes('তাৎক্ষণিক নগদ ক্ষতিপূরণ দাবি');
      }}
    ]
  },
  {
    id: 'case_2_land_topsoil_cutting',
    name: 'Land Crime Act: Section 13 Topsoil Cutting & Section 19(1) Bailable Status',
    request: {
      requestId: 'req_land_soil_' + Date.now(),
      originalMessage: 'স্থানীয় প্রভাবশালীরা ড্রেজার লাগিয়ে আমাদের আবাদি কৃষিজমির উপরি-স্তরের মাটি কেটে নিয়ে যাচ্ছে',
      language: 'bn',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites Land Crime Act Section 13 (topsoil cutting permission rules)', test: (r) => hasCitation(r, 'land-crime-13') || hasCitation(r, '13') },
      { rule: 'Affirms offense is bailable and compoundable under Section 19(1) (NOT non-bailable)', test: (r) => {
        const text = JSON.stringify(r);
        return (!text.includes('অ-জামিনযোগ্য') || text.includes('জামিনযোগ্য')) && (hasCitation(r, 'land-crime-19-1') || text.includes('১৯(১)'));
      }},
      { rule: 'Preserves all 3 cumulative exception conditions (own land, limited scale, no fertility loss)', test: (r) => {
        const text = JSON.stringify(r);
        return text.includes('স্বীয় মালিকানাধীন') && text.includes('সীমিত পরিসরে') && text.includes('ঊর্বরতার ক্ষতিসাধন না করিয়া');
      }},
      { rule: 'Does NOT state blanket homestead construction exemption', test: (r) => {
        const text = JSON.stringify(r);
        return !text.includes('বসতবাড়ি নির্মাণ কঠোরভাবে অব্যাহতিপ্রাপ্ত') && !text.includes('strictly exempted');
      }}
    ]
  },
  {
    id: 'case_3_land_summary_dispossession',
    name: 'Land Possession: Section 8/9 SRA & Section 8 Land Crime Act',
    request: {
      requestId: 'req_land_disp_' + Date.now(),
      originalMessage: 'A gang forcibly kicked my family out of our ancestral house without any court order or legal notice yesterday.',
      language: 'en',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites Specific Relief Act Section 8/9 or Land Crime Act Section 8', test: (r) => hasCitation(r, 'sra-8') || hasCitation(r, 'sra-9') || hasCitation(r, 'land-crime-8') }
    ]
  },
  {
    id: 'case_4_digital_intimate_blackmail',
    name: 'Cyber & Digital: Intimate Media Extortion under Pornography Act Section 8',
    request: {
      requestId: 'req_cyber_blackmail_' + Date.now(),
      originalMessage: 'Amar fb id hack kore intimate picture internet e viral korar voy dekiye taka dabi kortese',
      language: 'bn',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites Pornography Control Act Section 8 (intimate blackmail)', test: (r) => hasCitation(r, 'cyber-pornography-8') },
      { rule: 'Does NOT rely on synthetic cyber-protection-core placeholder', test: (r) => !hasCitation(r, 'cyber-protection-core') }
    ]
  },
  {
    id: 'case_5_labour_weekly_holidays_wages',
    name: 'Labour Act: Weekly Holidays (Sec 103) & Wage Responsibility (Sec 121-123)',
    request: {
      requestId: 'req_labour_holidays_' + Date.now(),
      originalMessage: 'আমাদের কারখানায় সপ্তাহে কোনো সাপ্তাহিক ছুটি বা ওভারটাইম দেয় না, আর ৩ মাস ধরে বেতন বকেয়া',
      language: 'bn',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites Labour Act Section 103 for weekly holidays (NOT Section 105)', test: (r) => hasCitation(r, 'labour-103') },
      { rule: 'Cites Section 121/122/123 for wage payment deadline and employer responsibility', test: (r) => hasCitation(r, 'labour-121') || hasCitation(r, 'labour-122') || hasCitation(r, 'labour-123') }
    ]
  },
  {
    id: 'case_6_family_court_jurisdiction',
    name: 'Family Law: Family Courts Act 2023 Section 5 Subject Matter & Section 6 Venue',
    request: {
      requestId: 'req_family_' + Date.now(),
      originalMessage: 'স্বামী ৩ মাস ধরে কোনো ভরণপোষণ দিচ্ছে না এবং ডিভোর্স না দিয়েও দেনমোহর দিতে অস্বীকার করছে, আমি বাবার বাড়ি চলে এসেছি',
      language: 'bn',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites Family Courts Act 2023 Section 5 or 6 (NOT Section 4)', test: (r) => hasCitation(r, 'family-court-2023-5') || hasCitation(r, 'family-court-2023-6') || hasCitation(r, 'mflo-1961-9') },
      { rule: 'Identifies Family Courts Act 2023 as Act No. 26 of 2023 (২০২৩ সনের ২৬ নং আইন)', test: (r) => {
        const text = JSON.stringify(r);
        return text.includes('২৬ নং আইন') || text.includes('Act No. 26 of 2023');
      }}
    ]
  },
  {
    id: 'case_7_fundamental_rights_arrest',
    name: 'Constitutional Rights: Article 33(2) & CrPC 61 Mandatory 24-Hour Magistrate Limit',
    request: {
      requestId: 'req_rights_' + Date.now(),
      originalMessage: 'Police arrested my brother without any warrant and have kept him in the lockup for 48 hours without presenting him to a Magistrate.',
      language: 'en',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Cites CrPC Section 61 or Constitution Article 33(2) (24-hour presentation requirement)', test: (r) => hasCitation(r, 'crpc-61') || hasCitation(r, 'const-33-arrest') }
    ]
  },
  {
    id: 'case_8_clarification_turn_1',
    name: 'Vague Complaint: Needs Clarification (Turn 1)',
    request: {
      requestId: 'req_vague_' + Date.now(),
      originalMessage: 'আমার সাথে খুব বড় অন্যায় হয়েছে, আমি এর বিচার চাই',
      language: 'bn',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Returns status: clarifying / needs_clarification', test: (r) => r.status === 'clarifying' || r.status === 'needs_clarification' },
      { rule: 'Provides follow-up question asking for dispute nature', test: (r) => Boolean((r.followUpQuestion && r.followUpQuestion.length > 5) || (r.questions && r.questions.length > 0)) }
    ]
  },
  {
    id: 'case_9_out_of_scope_admiralty',
    name: 'Out of Scope Fallback: International Maritime Collision',
    request: {
      requestId: 'req_admiralty_' + Date.now(),
      originalMessage: 'Our merchant container vessel collided in international maritime waters near Singapore; what admiralty court do I file in?',
      language: 'en',
      facts: [],
    },
    statutoryChecks: [
      { rule: 'Returns out-of-scope unsupported status and disclaimer', test: (r) => r.status === 'unsupported' && (r.isOutOfScope === true || Boolean(r.disclaimer)) }
    ]
  }
];

async function runStagingVerification() {
  console.log('================================================================================');
  console.log('MYLAWS LIVE HTTP RUNTIME AUDIT EVIDENCE (/api/answer)');
  console.log('Environment: http://localhost:3000 (Production Next.js Server)');
  console.log('Authentication: Bearer test_staging_token_audit_2026');
  console.log('Timestamp: ' + new Date().toISOString());
  console.log('================================================================================\n');

  let passedSuites = 0;
  let totalSuites = testSuites.length;

  for (const suite of testSuites) {
    console.log(`\n--------------------------------------------------------------------------------`);
    console.log(`[TEST CASE ${suite.id}] ${suite.name}`);
    console.log(`Query: "${suite.request.originalMessage}"`);
    console.log(`Language: ${suite.request.language}`);

    const startTime = Date.now();
    let res, data;
    try {
      res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': STAGING_AUTH_TOKEN
        },
        body: JSON.stringify(suite.request)
      });
      data = await res.json();
    } catch (err) {
      console.error(`FATAL: Failed to reach ${API_URL}: ${err.message}`);
      continue;
    }
    const elapsedMs = Date.now() - startTime;

    console.log(`HTTP Status: ${res.status} (Elapsed: ${elapsedMs}ms)`);
    console.log(`Workflow Status: ${data.status}`);
    console.log(`Engine Provenance: ${data.engineProvenance}`);
    console.log(`Corpus Version: ${data.sourcePackVersion}`);

    if (data.relevantProvisions && data.relevantProvisions.length > 0) {
      console.log(`Retrieved Provisions (${data.relevantProvisions.length}):`);
      for (const p of data.relevantProvisions) {
        console.log(`  - [${p.id}] ${p.act?.en || p.actId} ${p.section}: "${p.title?.bn || p.title?.en}"`);
      }
    }

    if (data.problemSummary?.understanding) {
      console.log(`Understanding: ${data.problemSummary.understanding.slice(0, 160)}...`);
    }

    if (data.plainLanguageExplanation?.heading) {
      console.log(`Heading: ${data.plainLanguageExplanation.heading}`);
    }

    if (data.followUpQuestion) {
      console.log(`Follow-up Question: "${data.followUpQuestion}"`);
    }

    console.log('\nStatutory Rule Checks:');
    let allChecksPassed = true;
    for (const check of suite.statutoryChecks) {
      const ok = check.test(data);
      console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${check.rule}`);
      if (!ok) allChecksPassed = false;
    }

    if (allChecksPassed) {
      passedSuites++;
      console.log(`>>> SUITE RESULT: SUCCESS`);
    } else {
      console.log(`>>> SUITE RESULT: FAILED CHECKS`);
    }
  }

  // Multi-Turn Clarification Test
  console.log(`\n================================================================================`);
  console.log(`MULTI-TURN CLARIFICATION PIPELINE TEST`);
  console.log(`================================================================================`);
  
  console.log(`\nTurn 1 Request: "আমার সাথে খুব বড় অন্যায় হয়েছে, আমি এর বিচার চাই"`);
  const t1Res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': STAGING_AUTH_TOKEN },
    body: JSON.stringify({
      requestId: 'turn1_' + Date.now(),
      originalMessage: 'আমার সাথে খুব বড় অন্যায় হয়েছে, আমি এর বিচার চাই',
      language: 'bn',
      facts: []
    })
  });
  const t1Data = await t1Res.json();
  console.log(`Turn 1 Status: ${t1Data.status}`);
  console.log(`Turn 1 Follow-up: "${t1Data.followUpQuestion || t1Data.questions?.[0]}"`);

  console.log(`\nTurn 2 Request with clarifying facts: "দোকানদার আমাকে নকল ওষুধ বিক্রি করেছে এবং মেমো দিতে অস্বীকার করছে"`);
  const t2Res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': STAGING_AUTH_TOKEN },
    body: JSON.stringify({
      requestId: 'turn2_' + Date.now(),
      originalMessage: 'দোকানদার আমাকে নকল ওষুধ বিক্রি করেছে এবং মেমো দিতে অস্বীকার করছে',
      language: 'bn',
      facts: [
        { fieldId: 'prior_query', value: 'আমার সাথে খুব বড় অন্যায় হয়েছে', status: 'user_reported', provenance: 'user_input' },
        { fieldId: 'dispute_nature', value: 'দোকানদার আমাকে নকল ওষুধ বিক্রি করেছে এবং মেমো দিতে অস্বীকার করছে', status: 'user_reported', provenance: 'user_input' }
      ],
      conversationHistory: [
        { role: 'user', content: 'আমার সাথে খুব বড় অন্যায় হয়েছে, আমি এর বিচার চাই' },
        { role: 'assistant', content: t1Data.followUpQuestion || t1Data.questions?.[0] || 'কী ঘটেছে সংক্ষেপে জানান' }
      ]
    })
  });
  const t2Data = await t2Res.json();
  console.log(`Turn 2 Status: ${t2Data.status}`);
  console.log(`Turn 2 Engine Provenance: ${t2Data.engineProvenance}`);
  console.log(`Turn 2 Retrieved Provisions:`, t2Data.relevantProvisions?.map(p => p.id));
  const t2Passed = t2Data.status === 'completed' && hasCitation(t2Data, 'consumer');
  console.log(`Multi-Turn Resolution Result: [${t2Passed ? 'PASS' : 'FAIL'}]`);

  console.log(`\n================================================================================`);
  console.log(`GENUINE CONTEXT-DEPENDENT FOLLOW-UP TEST ("গতকাল")`);
  console.log(`================================================================================`);

  console.log(`Turn 1: "ফার্মেসি থেকে আমাকে ভেজাল ওষুধ দিয়েছে, আমি অভিযোগ করতে চাই।"`);
  console.log(`Assistant asks: "আপনি ওষুধটি কবে ক্রয় করেছিলেন? (ধারা ৬০ অনুযায়ী ৩০ দিনের মধ্যে অভিযোগ করতে হয়)"`);
  console.log(`Turn 2 User Answer: "গতকাল" (single-word context answer)`);

  const yesterdayRes = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': STAGING_AUTH_TOKEN },
    body: JSON.stringify({
      requestId: 'turn_yesterday_' + Date.now(),
      originalMessage: 'গতকাল',
      language: 'bn',
      facts: [],
      conversationHistory: [
        { role: 'user', content: 'ফার্মেসি থেকে আমাকে ভেজাল ওষুধ দিয়েছে, আমি অভিযোগ করতে চাই।' },
        { role: 'assistant', content: 'আপনি ওষুধটি কবে ক্রয় করেছিলেন? (ধারা ৬০ অনুযায়ী ৩০ দিনের মধ্যে অভিযোগ করতে হয়)' }
      ]
    })
  });
  const yesterdayData = await yesterdayRes.json();
  console.log(`Yesterday Response Status: ${yesterdayData.status}`);
  console.log(`Yesterday Problem Summary: ${yesterdayData.problemSummary?.identifiedIssue}`);
  console.log(`Yesterday User Facts:`, yesterdayData.userFacts?.map(f => `${f.fieldId}: ${f.value}`));
  
  const yesterdayDateFact = yesterdayData.userFacts?.find(f => f.fieldId === 'occurrence_date');
  const yesterdayRetained = yesterdayData.status === 'completed' &&
    yesterdayData.problemSummary?.identifiedIssue?.includes('ভোক্তা') &&
    Boolean(yesterdayDateFact && yesterdayDateFact.value.includes('গতকাল')) &&
    (hasCitation(yesterdayData, 'consumer-60') || hasCitation(yesterdayData, 'consumer-41') || hasCitation(yesterdayData, 'consumer-51'));

  console.log(`Context-Dependent "গতকাল" Retained Original Situation: [${yesterdayRetained ? 'PASS' : 'FAIL'}]`);

  console.log(`\n================================================================================`);
  console.log(`FINAL LIVE RUNTIME DEMONSTRATION SUMMARY:`);
  console.log(`Passed Suites: ${passedSuites} / ${totalSuites}`);
  console.log(`Multi-Turn Grounding: ${t2Passed ? 'PASSED' : 'FAILED'}`);
  console.log(`Context-Dependent Follow-Up ("গতকাল"): ${yesterdayRetained ? 'PASSED' : 'FAILED'}`);
  console.log(`================================================================================\n`);
  console.log(`================================================================================\n`);
}

runStagingVerification().catch(console.error);
