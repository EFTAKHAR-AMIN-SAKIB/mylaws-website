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
  console.log("Profile status:", res.status, "Length:", res.body.length);
  // Remove scripts and style tags to see text content
  const clean = res.body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Extract text snippets
  const textMatches = clean.match(/<div[^>]*class="[^"]*profile[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
  console.log("Profile divs:", textMatches.length);

  // Search for labels like Bar, Enrollment, District, Court, Phone, Mobile, Chamber
  const lines = clean.split('\n').map(l => l.replace(/<[^>]+>/g, ' ').trim()).filter(l => l.length > 0);
  const relevant = lines.filter(l => /advocate|bar|enroll|district|court|phone|mobile|chamber|address|experience|supreme/i.test(l));
  console.log("Relevant lines in profile page (first 30):", relevant.slice(0, 30));
}

run().catch(console.error);
