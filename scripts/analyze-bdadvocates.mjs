import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log("Fetching bdadvocates.com homepage...");
  const res = await fetchUrl('https://bdadvocates.com/');
  console.log("Status:", res.status, "Length:", res.body.length);

  // Look for internal links: lawyer profiles, categories, districts, search
  const linkRegex = /href="([^"]+)"/g;
  const links = new Set();
  let m;
  while ((m = linkRegex.exec(res.body)) !== null) {
    const href = m[1];
    if (href.startsWith('https://bdadvocates.com') || href.startsWith('/')) {
      links.add(href);
    }
  }
  console.log("Total unique internal links found on homepage:", links.size);
  const sampleLinks = Array.from(links).slice(0, 40);
  console.log("Sample links:", sampleLinks);
}

run().catch(console.error);
