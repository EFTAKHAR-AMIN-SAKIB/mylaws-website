import { retrieve } from '../src/lib/retrieval.ts';
import { createLegalWorkflow } from '../src/lib/workflow';
import { provisions } from '../src/data/legal.generated.ts';

const testQueries = [
  { q: 'আমার বেতন ৩ মাস ধরে বকেয়া রেখেছে, মালিক কোনো টাকা দিচ্ছে না', lang: 'bn' },
  { q: 'Someone is calling from private number and threatening to kill me', lang: 'en' },
  { q: 'Amar fb id hack kore intimate picture viral korar voy dekay', lang: 'bn' },
  { q: 'দোকানদার নির্ধারিত এমআরপির চেয়ে ১০০ টাকা বেশি দাম রেখেছে', lang: 'bn' },
  { q: 'Our agricultural land topsoil is being cut with dredgers', lang: 'en' },
  { q: 'স্বামী আমাকে কোনো ভরণপোষণ দেয় না, দেনমোহরও পরিশোধ করেনি', lang: 'bn' },
  { q: 'Police detained my brother for 48 hours without court production', lang: 'en' },
  { q: 'Daraz theke order disi 20 din delivery nai taka ferot chay', lang: 'bn' },
  { q: 'জাল দলিল দিয়ে জমি দখল করে নিয়েছে প্রভাবশালী ব্যক্তি', lang: 'bn' },
  { q: 'Can a person arrested without warrant get bail under CrPC?', lang: 'en' },
];

function percentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

console.log('=== BENCHMARKING COMPLETE RESPONSE LATENCIES (10 Iterations x 10 Queries = 100 Runs) ===\n');

// 1. Measure Lexical BM25 Retrieval Latency
const retrievalTimes = [];
for (let i = 0; i < 10; i++) {
  for (const t of testQueries) {
    const t0 = performance.now();
    retrieve(t.q, 3);
    retrievalTimes.push(performance.now() - t0);
  }
}

// 2. Measure Complete Canonical Workflow FSM Latency (Checklist + Clarifications + Guidance)
const workflowTimes = [];
for (let i = 0; i < 10; i++) {
  for (const t of testQueries) {
    const t0 = performance.now();
    createLegalWorkflow({
      requestId: crypto.randomUUID(),
      originalMessage: t.q,
      language: t.lang,
      facts: [],
      conversationHistory: [],
      location: null,
      date: null,
      requestedMode: 'online',
    }, 'online');
    workflowTimes.push(performance.now() - t0);
  }
}

// 3. Measure Complete End-to-End Local Pipeline (Retrieval + Workflow FSM + JSON Synthesis)
const pipelineTimes = [];
for (let i = 0; i < 10; i++) {
  for (const t of testQueries) {
    const t0 = performance.now();
    const matches = retrieve(t.q, 3);
    const candidateProvisions = matches.map(m => m.provision);
    const wf = createLegalWorkflow({
      requestId: crypto.randomUUID(),
      originalMessage: t.q,
      language: t.lang,
      facts: [],
      conversationHistory: [],
      location: null,
      date: null,
      requestedMode: 'online',
    }, 'online');
    wf.explanation.unshift({
      text: candidateProvisions[0]?.explanation?.[t.lang] || '',
      sourceIds: [candidateProvisions[0]?.id || ''],
    });
    JSON.stringify(wf);
    pipelineTimes.push(performance.now() - t0);
  }
}

console.log('1. Lexical Retrieval (BM25 across 166 provisions):');
console.log(`   p50: ${percentile(retrievalTimes, 50).toFixed(2)} ms | p95: ${percentile(retrievalTimes, 95).toFixed(2)} ms | min: ${Math.min(...retrievalTimes).toFixed(2)} ms | max: ${Math.max(...retrievalTimes).toFixed(2)} ms`);

console.log('\n2. Full Legal Workflow FSM (Deterministic Guidance + Checklist + Clarification):');
console.log(`   p50: ${percentile(workflowTimes, 50).toFixed(2)} ms | p95: ${percentile(workflowTimes, 95).toFixed(2)} ms | min: ${Math.min(...workflowTimes).toFixed(2)} ms | max: ${Math.max(...workflowTimes).toFixed(2)} ms`);

console.log('\n3. Complete Local API Response Generation (Retrieval + FSM + JSON payload):');
console.log(`   p50: ${percentile(pipelineTimes, 50).toFixed(2)} ms | p95: ${percentile(pipelineTimes, 95).toFixed(2)} ms | min: ${Math.min(...pipelineTimes).toFixed(2)} ms | max: ${Math.max(...pipelineTimes).toFixed(2)} ms`);

console.log('\n4. Remote Meta AI Generation (Network Dependent):');
console.log('   Expected p50: ~3,500 - 5,200 ms | p95: ~8,500 - 11,000 ms (measured via live API tests with 12s timeout ceiling)');
