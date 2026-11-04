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
  const url = 'https://bdadvocates.com/advocate/?bar=Chittagong+Bar+Association';
  const res = await fetchUrl(url);
  console.log("Status:", res.status, "Length:", res.body.length);
  // Find advocate profile links: matches /advocate/[slug-id]/
  const matches = res.body.match(/https:\/\/bdadvocates\.com\/advocate\/[a-z0-9\-]+-\d+\//g) || [];
  console.log("Matches:", matches.length, matches.slice(0, 10));

  // Let's also check if there is an AJAX endpoint or script doing the filtering
  const scripts = res.body.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
  for (const s of scripts) {
    if (s.includes('admin-ajax.php') || s.includes('action:') || s.includes('nonce')) {
      console.log("Interesting script snippet:", s.slice(0, 250));
    }
  }
}

run().catch(console.error);
