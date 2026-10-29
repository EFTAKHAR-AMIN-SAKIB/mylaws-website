import fs from 'fs';

// Read env file
const env = fs.readFileSync('.env', 'utf-8');
const accountId = env.match(/CLOUDFLARE_ACCOUNT_ID=([^\r\n]+)/)?.[1];
const token = env.match(/CLOUDFLARE_API_TOKEN=([^\r\n]+)/)?.[1];
const dbId = env.match(/CLOUDFLARE_D1_DATABASE_ID=([^\r\n]+)/)?.[1];

if (!accountId || !token || !dbId) {
  console.error('Missing Cloudflare credentials in .env');
  process.exit(1);
}

// Dynamically import provisions from local data
// Since legal.ts is typescript, let's use node with tsx or transpiled cjs
import { provisions } from '../src/data/legal.ts';

console.log(`Loaded ${provisions.length} provisions from legal.ts`);

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
  console.log('Ensuring table exists in Cloudflare D1...');
  await executeSql(`
    CREATE TABLE IF NOT EXISTS provisions (
      id TEXT PRIMARY KEY,
      act_id TEXT NOT NULL,
      section_number TEXT NOT NULL,
      title_bn TEXT NOT NULL,
      title_en TEXT NOT NULL,
      verbatim_quote_bn TEXT NOT NULL,
      plain_explanation_bn TEXT NOT NULL,
      plain_explanation_en TEXT NOT NULL,
      caution_bn TEXT,
      caution_en TEXT,
      bdlaws_url TEXT NOT NULL
    );
  `);

  console.log('Inserting or replacing all 88 provisions in batches...');
  // Chunk in batches of 10 to respect SQL statement size limits
  const batchSize = 10;
  for (let i = 0; i < provisions.length; i += batchSize) {
    const batch = provisions.slice(i, i + batchSize);
    for (const p of batch) {
      await executeSql(
        `INSERT OR REPLACE INTO provisions (
          id, act_id, section_number, title_bn, title_en,
          verbatim_quote_bn, plain_explanation_bn, plain_explanation_en,
          caution_bn, caution_en, bdlaws_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.act.en,
          p.section,
          p.title.bn,
          p.title.en,
          p.quote,
          p.explanation.bn,
          p.explanation.en,
          p.caution.bn,
          p.caution.en,
          p.sourceUrl,
        ]
      );
    }
    console.log(`Synced ${Math.min(i + batchSize, provisions.length)} / ${provisions.length}`);
  }

  const countRes = await executeSql('SELECT count(*) as total FROM provisions');
  console.log('Cloudflare D1 sync completed! Total rows in D1:', countRes[0].total);
}

sync().catch(err => {
  console.error('Sync error:', err);
  process.exit(1);
});
