import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env', 'utf-8');
const accountId = env.match(/CLOUDFLARE_ACCOUNT_ID=([^\r\n]+)/)?.[1];
const token = env.match(/CLOUDFLARE_API_TOKEN=([^\r\n]+)/)?.[1];
const dbId = env.match(/CLOUDFLARE_D1_DATABASE_ID=([^\r\n]+)/)?.[1];

const backupPath = process.argv[2] || path.join('backups', 'd1_backup_latest.json');

if (!fs.existsSync(backupPath)) {
  console.error(`Backup file not found at ${backupPath}`);
  process.exit(1);
}

const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
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

async function restore() {
  const includeUsers = process.argv.includes('--include-users');
  console.log(`Restoring D1 from ${backupPath} (recorded at ${backupData.timestamp})...`);
  console.log(`Mode: ${includeUsers ? 'FULL RESTORE (including users & queries)' : 'CORPUS-ONLY RESTORE (preserving users & query histories)'}`);
  
  for (const [tableName, tableObj] of Object.entries(backupData.tables)) {
    // Preserve user accounts and queries unless explicitly requested
    if (!includeUsers && (tableName === 'users' || tableName === 'user_queries')) {
      console.log(`Skipping table "${tableName}" to preserve user accounts and query histories.`);
      continue;
    }

    console.log(`Restoring ${tableName} (${tableObj.rowCount} rows)...`);
    // Delete existing rows
    await executeSql(`DELETE FROM "${tableName}"`);
    
    // Insert rows in batches of 10
    const rows = tableObj.rows;
    for (let i = 0; i < rows.length; i += 10) {
      const batch = rows.slice(i, i + 10);
      for (const row of batch) {
        const cols = Object.keys(row);
        const placeholders = cols.map(() => '?').join(', ');
        const values = Object.values(row);
        await executeSql(
          `INSERT INTO "${tableName}" (${cols.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`,
          values
        );
      }
    }
    console.log(`Restored ${tableName} successfully.`);
  }
  console.log('Database restore complete!');
}

// Only run if called directly with --confirm
if (process.argv.includes('--confirm')) {
  restore().catch(err => {
    console.error('Restore failed:', err);
    process.exit(1);
  });
} else {
  console.log('Safety check: pass --confirm to actually execute restore.');
}
