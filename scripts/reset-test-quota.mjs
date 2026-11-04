import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const config = {};
env.split('\n').forEach(line => {
  const [k, ...v] = line.trim().split('=');
  if (k && v.length) config[k.trim()] = v.join('=').trim();
});

async function resetQuota() {
  const accountId = config.CLOUDFLARE_ACCOUNT_ID;
  const dbId = config.CLOUDFLARE_D1_DATABASE_ID;
  const token = config.CLOUDFLARE_API_TOKEN;

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sql: 'UPDATE users SET dailyQueryCount = 0 WHERE id = ?',
      params: ['test_uid_123']
    })
  });
  const data = await res.json();
  console.log('Reset response:', data.success);
}
resetQuota().catch(console.error);
