import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
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

async function run() {
  console.log('1. Checking table info...');
  const tableInfo = await executeSql('PRAGMA table_info(provisions)');
  const colNames = tableInfo.map(c => c.name);

  if (!colNames.includes('category')) {
    console.log('Adding "category" column to D1 table "provisions"...');
    await executeSql('ALTER TABLE provisions ADD COLUMN category TEXT');
    console.log('Column "category" added successfully.');
  } else {
    console.log('Column "category" already exists.');
  }

  // Populate category for each row from legal.ts
  const { provisions } = await import('../src/data/legal.ts');
  console.log(`Setting category for all ${provisions.length} rows...`);

  for (const p of provisions) {
    await executeSql('UPDATE provisions SET category = ? WHERE id = ?', [p.category, p.id]);
  }

  console.log('Querying fresh category breakdown directly from production D1:');
  const totalRes = await executeSql('SELECT count(*) as total FROM provisions');
  const catRes = await executeSql('SELECT category, count(*) as count FROM provisions GROUP BY category ORDER BY count DESC');

  console.log('Production D1 Total:', totalRes[0].total);
  console.log('Production D1 Category Distribution:');
  console.log(JSON.stringify(catRes, null, 2));
}

run().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
