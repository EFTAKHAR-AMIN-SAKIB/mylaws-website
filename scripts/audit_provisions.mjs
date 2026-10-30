import fs from 'fs';
import path from 'path';

const workspaceDir = 'E:/vibe coding/POIDH/MyLaws Website';
const provisions = JSON.parse(fs.readFileSync(path.join(workspaceDir, 'src/data/corpus/provisions.json'), 'utf-8'));
const acts = JSON.parse(fs.readFileSync(path.join(workspaceDir, 'src/data/corpus/acts.json'), 'utf-8'));
const actMap = new Map(acts.map(a => [a.id, a]));

console.log(`Auditing ${provisions.length} canonical provisions against ${acts.length} acts...\n`);

const auditResults = [];

for (const p of provisions) {
  const act = actMap.get(p.actId);
  const issues = [];

  if (!act) {
    issues.push(`Act ID ${p.actId} not found in acts.json`);
  }

  if (!p.sectionNumber || !p.sectionNumber.trim()) {
    issues.push(`Missing sectionNumber`);
  }

  if (!p.sourceUrl || !p.sourceUrl.startsWith('http')) {
    issues.push(`Invalid or missing sourceUrl`);
  }

  if (!p.originalText || p.originalText.trim().length < 20) {
    issues.push(`Suspiciously short originalText (${p.originalText?.length || 0} chars)`);
  }

  // Check specific sections flagged by user
  if (p.actId === 'act_consumer_2009') {
    if (p.id === 'consumer-49' && /expired|মেয়াদোত্তীর্ণ/i.test(p.title.en + p.title.bn)) {
      issues.push(`CRITICAL: Expired goods mapped to Section 49 instead of Section 51`);
    }
    if (p.id === 'consumer-45' && /adulterat|ভেজাল/i.test(p.title.en + p.title.bn)) {
      issues.push(`CRITICAL: Adulteration mapped to Section 45 instead of Section 41`);
    }
    if (p.id === 'consumer-76' && /30\s*days|৩০\s*দিন/i.test(p.plainExplanation?.en + p.plainExplanation?.bn)) {
      issues.push(`CRITICAL: 30-day limitation attributed to Section 76 instead of Section 60`);
    }
  }

  if (p.actId === 'act_land_crime_2023') {
    if (p.id === 'land-crime-8' && (/soil|মাটি|boundary/i.test(p.title.en + p.title.bn))) {
      issues.push(`CRITICAL: Land Crime Section 8 mapped to soil/boundary instead of summary recovery of possession`);
    }
  }

  if (p.actId === 'act_cyber_security_2023') {
    if (p.legalStatus !== 'repealed') {
      issues.push(`Cyber Security Act 2023 provision marked as '${p.legalStatus}', should be 'repealed' with savings note`);
    }
    if (p.id === 'cyber-25') {
      issues.push(`CRITICAL: Defamation/speech section 25 of CSA 2023 is abolished/repealed; cannot be active guidance`);
    }
  }

  auditResults.push({
    id: p.id,
    actId: p.actId,
    section: p.sectionNumber,
    titleEn: p.title?.en || '',
    titleBn: p.title?.bn || '',
    legalStatus: p.legalStatus,
    reviewStatus: p.reviewStatus,
    issues,
    sourceUrl: p.sourceUrl
  });
}

const criticalIssues = auditResults.filter(r => r.issues.length > 0);
console.log(`Audit Complete: ${criticalIssues.length} provisions have flagged issues:`);
for (const ci of criticalIssues) {
  console.log(`- [${ci.id}] (${ci.section}): ${ci.issues.join('; ')}`);
}
