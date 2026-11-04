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
  const url = 'https://bdadvocates.com/advocate/?district=Chittagong';
  const res = await fetchUrl(url);
  console.log("District page status:", res.status, "Length:", res.body.length);
  
  // Find all profile links
  const matches = res.body.match(/https:\/\/bdadvocates\.com\/advocate\/[a-z0-9\-]+\//g) || [];
  const unique = Array.from(new Set(matches)).filter(u => !u.includes('/page/') && !u.includes('/feed/') && u !== 'https://bdadvocates.com/advocate/');
  console.log("Unique profiles on Chittagong page 1:", unique.length);
  console.log("Sample profiles:", unique.slice(0, 10));
}

run().catch(console.error);
