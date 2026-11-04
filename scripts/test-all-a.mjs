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
  const url = 'https://bdadvocates.com/advocate/';
  const res = await fetchUrl(url);
  // Look for any <a> tags inside the main section (skip header and footer)
  const allHrefs = [];
  const hrefRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = hrefRegex.exec(res.body)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!href.includes('wp-content') && !href.includes('facebook') && !href.includes('twitter') && text.length > 2) {
      allHrefs.push({ href, text });
    }
  }
  console.log("Total a tags:", allHrefs.length);
  // print tags that have more than 2 words or might be advocate names
  const candidateNames = allHrefs.filter(h => h.href.includes('/advocate/') && !h.href.includes('district=') && !h.href.includes('/page/'));
  console.log("Candidate advocate links:", candidateNames.slice(0, 20));
}

run().catch(console.error);
