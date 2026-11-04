import http from 'http';

function postJson(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const postData = JSON.stringify(data);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${token}`
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body || '{}') }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  const testToken = `test_staging_token_fresh_${Date.now()}`;
  console.log("\n[Test 3] Chattogram Free Legal Aid Query...");
  const res3 = await postJson('http://localhost:3000/api/answer', {
    originalMessage: 'আমি গরিব মানুষ, মামলা চালানোর টাকা নাই, চট্টগ্রামে কি বিনামূল্যে সরকারি উকিল পাওয়া যাবে?',
    language: 'bn',
    facts: [],
    conversationHistory: []
  }, testToken);

  console.log("Status:", res3.status);
  console.log("Recommended Lawyers Count:", res3.data.recommendedLawyers?.length || 0);
  if (res3.data.recommendedLawyers) {
    for (const l of res3.data.recommendedLawyers) {
      console.log(`  - [${l.district}] ${l.nameBn} (${l.barCouncilId}) | Legal Aid Panel: ${l.isLegalAidPanel} | Phone: ${l.phone}`);
    }
  }
}

run().catch(console.error);
