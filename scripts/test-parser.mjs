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

function parseAdvocateProfile(html, url) {
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let profile = {
    name: '',
    barAssociation: '',
    district: '',
    phone: '',
    email: '',
    barId: '',
    practiceAreas: [],
    sourceUrl: url
  };

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      const graph = data['@graph'] || [data];
      for (const node of graph) {
        if (node['@type'] === 'Person') {
          if (node.name) profile.name = node.name;
          if (node.telephone) profile.phone = node.telephone;
          if (node.email) profile.email = node.email;
          if (node.worksFor?.name) profile.barAssociation = node.worksFor.name;
          if (node.address?.addressLocality && node.address.addressLocality !== 'Bangladesh') {
            profile.district = node.address.addressLocality;
          }
          if (node.identifier?.value) profile.barId = String(node.identifier.value);
          if (Array.isArray(node.knowsAbout)) profile.practiceAreas = node.knowsAbout;
        }
        if (node['@type'] === 'LegalService') {
          if (!profile.phone && node.telephone) profile.phone = node.telephone;
          if (!profile.email && node.email) profile.email = node.email;
          if (!profile.barAssociation && node.memberOf?.name) profile.barAssociation = node.memberOf.name;
        }
      }
    } catch (e) {}
  }

  // Fallbacks if not in JSON-LD
  if (!profile.barAssociation) {
    const metaMatch = html.match(/class="bdadv-hero-meta">[\s\S]*?<span>(.*?)<\/span>/i);
    if (metaMatch) profile.barAssociation = metaMatch[1].trim();
  }
  if (!profile.phone) {
    const phoneMatch = html.match(/contact.*?directly at\s*([0-9]{11})/i);
    if (phoneMatch) profile.phone = phoneMatch[1];
  }

  return profile;
}

async function run() {
  const testUrls = [
    'https://bdadvocates.com/advocate/md-ohidul-islam-34425/',
    'https://bdadvocates.com/advocate/md-hannan-mia-34424/',
    'https://bdadvocates.com/advocate/a-n-m-musfiq-uzzaman-34423/',
    'https://bdadvocates.com/advocate/shuvo-karmaker-34417/',
    'https://bdadvocates.com/advocate/sagor-chambugong-34413/'
  ];

  for (const u of testUrls) {
    const res = await fetchUrl(u);
    const parsed = parseAdvocateProfile(res.body, u);
    console.log("Parsed:", parsed);
  }
}

run().catch(console.error);
