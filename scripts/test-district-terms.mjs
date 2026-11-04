import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  const res = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate_district?per_page=100');
  console.log("Status:", res.status);
  const terms = JSON.parse(res.body);
  console.log("Total district terms:", terms.length);
  const withCounts = terms.map(t => ({ id: t.id, name: t.name, slug: t.slug, count: t.count }));
  console.log("Top district terms with counts:", withCounts.sort((a,b) => b.count - a.count).slice(0, 30));

  // Can we query /wp-json/wp/v2/advocate?advocate_district=<id> ?
  if (terms.length > 0) {
    const term = withCounts.find(t => t.count > 0 && t.name !== 'Dhaka') || withCounts[1];
    console.log(`Testing query for district ${term.name} (id ${term.id})...`);
    const qRes = await fetchUrl(`https://bdadvocates.com/wp-json/wp/v2/advocate?advocate_district=${term.id}&per_page=5`);
    console.log("Query status:", qRes.status, "Total in header:", qRes.headers['x-wp-total']);
    if (qRes.status === 200) {
      const qItems = JSON.parse(qRes.body);
      console.log("Returned items:", qItems.map(i => ({ id: i.id, title: i.title?.rendered, link: i.link })));
    }
  }
}

run().catch(console.error);
