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

async function testSearch(term) {
  const url = `https://bdadvocates.com/wp-json/wp/v2/advocate?search=${encodeURIComponent(term)}&per_page=5`;
  const res = await fetchUrl(url);
  console.log(`Search for "${term}": Status ${res.status}, Total: ${res.headers['x-wp-total']}`);
  if (res.status === 200) {
    const items = JSON.parse(res.body);
    console.log(items.map(i => ({ title: i.title?.rendered, link: i.link })));
  }
}

async function run() {
  await testSearch('Chittagong');
  await testSearch('Sylhet');
  await testSearch('Rajshahi');
  await testSearch('Khulna');
  await testSearch('Barisal');
  await testSearch('Rangpur');
  await testSearch('Mymensingh');
}

run().catch(console.error);
