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
  console.log("=== Testing AI Lawyer Recommendations on /api/answer ===");
  const testToken = `test_staging_token_fresh_${Date.now()}`;

  // Test 1: Sylhet Land Dispute asking for an advocate
  console.log("\n[Test 1] Sylhet Land Dispute (asking for advocate in Sylhet)...");
  const res1 = await postJson('http://localhost:3000/api/answer', {
    originalMessage: 'আমার পৈত্রিক জমি দখল করে নিয়েছে প্রভাবশালীরা। সিলেটের কোনো অভিজ্ঞ আইনজীবী কি আছেন যিনি দেওয়ানি মামলা পরিচালনা করতে পারবেন?',
    language: 'bn',
    facts: [],
    conversationHistory: []
  }, testToken);

  console.log("Response 1 Status:", res1.status);
  console.log("Response 1 Identified Issue:", res1.data.problemSummary?.identifiedIssue);
  console.log("Response 1 Recommended Lawyers Count:", res1.data.recommendedLawyers?.length || 0);
  if (res1.data.recommendedLawyers) {
    for (const l of res1.data.recommendedLawyers) {
      console.log(`  - [${l.district}] ${l.nameBn} (${l.barCouncilId}) | Phone: ${l.phone} | Chamber: ${l.chamberAddressBn}`);
    }
  }

  // Test 2: Follow-up question asking if lawyer is needed
  console.log("\n[Test 2] Dhaka Labour Dispute Follow-Up (asking if lawyer is needed)...");
  const res2 = await postJson('http://localhost:3000/api/answer', {
    originalMessage: 'আমার কি এই বিষয়ে কোনো উকিল নিয়োগ করতে হবে? ঢাকার ভালো কোনো আইনজীবী পাওয়া যাবে?',
    language: 'bn',
    facts: [{ fieldId: 'issue_type', value: 'unpaid_wages' }],
    conversationHistory: [
      { role: 'user', content: 'মালিক গত ৩ মাস ধরে আমার বেতন আটকে রেখেছে, ঢাকার তেজগাঁওয়ে আমার ফ্যাক্টরি।' },
      { role: 'assistant', content: 'শ্রম আইনের ১২৩ ধারায় বেতন পরিশোধের বিধান রয়েছে।' }
    ]
  }, testToken);

  console.log("Response 2 Status:", res2.status);
  console.log("Response 2 Is FollowUp:", res2.data.isFollowUp);
  console.log("Response 2 Recommended Lawyers Count:", res2.data.followUpResponse?.recommendedLawyers?.length || 0);
  if (res2.data.followUpResponse?.recommendedLawyers) {
    for (const l of res2.data.followUpResponse.recommendedLawyers) {
      console.log(`  - [${l.district}] ${l.nameBn} (${l.barCouncilId}) | Phone: ${l.phone} | Chamber: ${l.chamberAddressBn}`);
    }
  }
}

run().catch(console.error);
