import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  const res = await fetchUrl('https://bdadvocates.com/advocate/moni-rani-das-34426/');
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  while ((match = jsonLdRegex.exec(res.body)) !== null) {
    count++;
    console.log(`=== JSON-LD #${count} ===`);
    try {
      const parsed = JSON.parse(match[1]);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log("Raw string:", match[1].slice(0, 300));
    }
  }
}

run().catch(console.error);
