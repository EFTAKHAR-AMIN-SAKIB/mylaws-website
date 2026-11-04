import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log("Checking wp-json post types...");
  try {
    const typesRes = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/types');
    console.log("Types status:", typesRes.status);
    if (typesRes.status === 200) {
      console.log("Types:", Object.keys(JSON.parse(typesRes.body)));
    }
  } catch (e) {
    console.log("WP types error:", e.message);
  }

  console.log("Fetching /advocate/ HTML...");
  const advRes = await fetchUrl('https://bdadvocates.com/advocate/');
  console.log("Advocate status:", advRes.status, "Length:", advRes.body.length);

  // Search for advocate card markup or profile URLs in /advocate/
  const profileMatches = advRes.body.match(/https:\/\/bdadvocates\.com\/advocate\/[a-zA-Z0-9\-_/]+/g) || [];
  console.log("Profile link count:", profileMatches.length);
  console.log("Sample profile links:", Array.from(new Set(profileMatches)).slice(0, 15));
  
  // Also check if there is text like Advocate name or designations
  const regex = /<h[234][^>]*>(.*?)<\/h[234]>/gi;
  let m;
  const headings = [];
  while ((m = regex.exec(advRes.body)) !== null) {
    headings.push(m[1].replace(/<[^>]+>/g, '').trim());
  }
  console.log("Sample headings in /advocate/:", headings.slice(0, 20));
}

run().catch(console.error);
