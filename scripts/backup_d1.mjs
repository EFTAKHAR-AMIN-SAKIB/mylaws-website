import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env', 'utf-8');
const accountId = env.match(/CLOUDFLARE_ACCOUNT_ID=([^\r\n]+)/)?.[1];
const token = env.match(/CLOUDFLARE_API_TOKEN=([^\r\n]+)/)?.[1];
const dbId = env.match(/CLOUDFLARE_D1_DATABASE_ID=([^\r\n]+)/)?.[1];

if (!accountId || !token || !dbId) {
  console.error('Missing Cloudflare credentials in .env');
  process.exit(1);
}

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

async function backup() {
  console.log('Starting Cloudflare D1 backup...');
  const tables = await executeSql("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE '_cf_%'");
  
  const backupData = {
    timestamp: new Date().toISOString(),
    databaseId: dbId,
    tables: {}
  };

  for (const t of tables) {
    const tableName = t.name;
    const schema = t.sql;
    const rows = await executeSql(`SELECT * FROM "${tableName}"`);
    console.log(`Backed up table ${tableName}: ${rows.length} rows`);
    backupData.tables[tableName] = {
      schema,
      rowCount: rows.length,
      rows
    };
  }

  const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join('backups', `d1_backup_${timestampStr}.json`);
  const latestBackupFile = path.join('backups', 'd1_backup_latest.json');

  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf-8');
  fs.writeFileSync(latestBackupFile, JSON.stringify(backupData, null, 2), 'utf-8');
  console.log(`Backup completed successfully! Written to ${backupFile} and ${latestBackupFile}`);
}

backup().catch(err => {
  console.error('Backup failed:', err);
  process.exit(1);
});
