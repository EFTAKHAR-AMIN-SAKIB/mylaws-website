import fs from 'fs';
import path from 'path';

const workspaceDir = 'E:/vibe coding/POIDH/MyLaws Website';
const env = fs.readFileSync(path.join(workspaceDir, '.env'), 'utf-8');
const accountId = env.match(/CLOUDFLARE_ACCOUNT_ID=([^\r\n]+)/)?.[1];
const token = env.match(/CLOUDFLARE_API_TOKEN=([^\r\n]+)/)?.[1];
const dbId = env.match(/CLOUDFLARE_D1_DATABASE_ID=([^\r\n]+)/)?.[1];

const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`;

async function executeSql(sql, params = []) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(`D1 query failed: ${JSON.stringify(data.errors)}`);
  }
  return data.result?.[0]?.results;
}

async function sync() {
  console.log('1. Checking and migrating D1 schema...');
  const tableInfo = await executeSql('PRAGMA table_info(provisions)');
  const colNames = new Set(tableInfo.map(c => c.name));

  const requiredCols = [
    { name: 'categories', type: 'TEXT' },
    { name: 'content_hash', type: 'TEXT' },
    { name: 'corpus_version', type: 'TEXT' },
    { name: 'review_status', type: 'TEXT' },
    { name: 'legal_status', type: 'TEXT' },
  ];

  for (const col of requiredCols) {
    if (!colNames.has(col.name)) {
      console.log(`Adding column "${col.name}" to D1 provisions table...`);
      await executeSql(`ALTER TABLE provisions ADD COLUMN ${col.name} ${col.type}`);
    }
  }

  // Create corpus_metadata table
  await executeSql(`
    CREATE TABLE IF NOT EXISTS corpus_metadata (
      version TEXT PRIMARY KEY,
      published_at TEXT NOT NULL,
      provision_count INTEGER NOT NULL,
      acts_count INTEGER NOT NULL,
      content_hash TEXT NOT NULL
    );
  `);

  // Load canonical data
  const moduleData = await import(
    'file:///' + path.join(workspaceDir, 'src/data/legal.generated.ts').replace(/\\/g, '/')
  );
  const provisions = moduleData.provisions;
  const acts = moduleData.canonicalActs || moduleData.acts || [];
  const CORPUS_VERSION = moduleData.CORPUS_VERSION;
  const CORPUS_PUBLISHED_AT = moduleData.CORPUS_PUBLISHED_AT || moduleData.PUBLISHED_AT;
  const CORPUS_HASH = moduleData.CORPUS_HASH;

  console.log(`2. Syncing ${acts.length} acts into D1 table "acts"...`);
  for (const act of acts) {
    await executeSql(
      `INSERT OR REPLACE INTO acts (
        id, name_bn, name_en, act_number, year, category, official_bdlaws_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        act.id,
        act.name.bn,
        act.name.en,
        act.actNumber || '',
        act.year,
        act.categories[0] || 'rights',
        act.officialUrl || '',
      ]
    );
  }

  console.log(`3. Syncing ${provisions.length} canonical pilot provisions in batches of 10...`);
  const batchSize = 10;
  for (let i = 0; i < provisions.length; i += batchSize) {
    const batch = provisions.slice(i, i + batchSize);
    for (const p of batch) {
      await executeSql(
        `INSERT OR REPLACE INTO provisions (
          id, act_id, section_number, title_bn, title_en,
          verbatim_quote_bn, plain_explanation_bn, plain_explanation_en,
          caution_bn, caution_en, bdlaws_url, category,
          categories, content_hash, corpus_version, review_status, legal_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.actId || p.act.en,
          p.section,
          p.title.bn,
          p.title.en,
          p.quote,
          p.explanation.bn,
          p.explanation.en,
          p.caution.bn,
          p.caution.en,
          p.sourceUrl,
          p.category,
          JSON.stringify(p.categories || [p.category]),
          p.contentHash || '',
          CORPUS_VERSION,
          p.reviewStatus || 'auto_checked',
          p.legalStatus || 'active',
        ]
      );
    }
    process.stdout.write(`  Synced ${Math.min(i + batchSize, provisions.length)} / ${provisions.length}\r`);
  }
  console.log(`\nAll ${provisions.length} provisions synced successfully!`);

  console.log('4. Recording published corpus release metadata...');
  await executeSql(
    `INSERT OR REPLACE INTO corpus_metadata (
      version, published_at, provision_count, acts_count, content_hash
    ) VALUES (?, ?, ?, ?, ?)`,
    [
      CORPUS_VERSION,
      CORPUS_PUBLISHED_AT,
      provisions.length,
      acts.length,
      CORPUS_HASH,
    ]
  );

  const countRes = await executeSql('SELECT count(*) as total FROM provisions');
  const actsCountRes = await executeSql('SELECT count(*) as total FROM acts');
  console.log(`\nVerified Production D1 state:`);
  console.log(`  Provisions count: ${countRes[0].total}`);
  console.log(`  Acts count: ${actsCountRes[0].total}`);
  console.log(`  Corpus Version: ${CORPUS_VERSION}`);
}

sync().catch(err => {
  console.error('D1 sync error:', err);
  process.exit(1);
});
