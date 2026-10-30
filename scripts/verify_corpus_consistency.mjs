import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const workspaceDir = process.cwd();

async function main() {
  console.log('=== Corpus Consistency & Cryptographic Verification ===\n');

  // 1. Source of Truth
  const rawProvisions = JSON.parse(fs.readFileSync(path.join(workspaceDir, 'src/data/corpus/provisions.json'), 'utf8'));
  const versionData = JSON.parse(fs.readFileSync(path.join(workspaceDir, 'src/data/corpus/version.json'), 'utf8'));
  console.log(`1. Source of Truth (provisions.json):`);
  console.log(`   Count: ${rawProvisions.length}`);
  console.log(`   Corpus Version: ${versionData.corpusVersion}`);
  console.log(`   Published Hash: ${versionData.contentHash}`);

  // 2. Generated legal.generated.ts
  const legalModule = await import('file:///' + path.join(workspaceDir, 'src/data/legal.generated.ts').replace(/\\/g, '/'));
  console.log(`\n2. Compiled Module (legal.generated.ts):`);
  console.log(`   Count: ${legalModule.provisions.length}`);
  console.log(`   Canonical Provisions Count: ${legalModule.canonicalProvisions.length}`);
  console.log(`   Corpus Version: ${legalModule.CORPUS_VERSION}`);
  console.log(`   Exported Hash: ${legalModule.CORPUS_HASH}`);

  // 3. Offline Pack
  const offlinePack = JSON.parse(fs.readFileSync(path.join(workspaceDir, 'public/packs/mylaws_corpus_latest.json'), 'utf8'));
  console.log(`\n3. Offline Downloadable Pack (mylaws_corpus_latest.json):`);
  console.log(`   Count: ${offlinePack.provisionCount || offlinePack.provisions?.length}`);
  console.log(`   Version: ${offlinePack.version}`);
  console.log(`   Exported Hash: ${offlinePack.contentHash}`);

  // 4. Staging /api/sources HTTP endpoint
  let apiSources;
  try {
    const res = await fetch('http://localhost:3000/api/sources');
    apiSources = await res.json();
    console.log(`\n4. Live /api/sources Endpoint:`);
    console.log(`   Count: ${apiSources.count}`);
    console.log(`   Source: ${apiSources.source}`);
    console.log(`   Corpus Version: ${apiSources.corpusVersion}`);
  } catch (err) {
    console.error(`\n4. Live /api/sources Endpoint: Failed to fetch (${err.message})`);
  }

  // Cross-verification
  const rawIds = new Set(rawProvisions.map(p => p.id));
  const generatedIds = new Set(legalModule.provisions.map(p => p.id));
  const offlineIds = new Set(offlinePack.provisions.map(p => p.id));
  const apiIds = apiSources ? new Set(apiSources.provisions.map(p => p.id)) : null;

  console.log('\n=== Integrity Checks ===');
  console.log(`All IDs match between Source and Generated: ${rawIds.size === generatedIds.size && [...rawIds].every(id => generatedIds.has(id))}`);
  console.log(`All IDs match between Source and Offline Pack: ${rawIds.size === offlineIds.size && [...rawIds].every(id => offlineIds.has(id))}`);
  if (apiIds) {
    console.log(`All IDs match between Source and /api/sources: ${rawIds.size === apiIds.size && [...rawIds].every(id => apiIds.has(id))}`);
  }

  // Check Hashes
  let hashMismatch = 0;
  for (const raw of rawProvisions) {
    const gen = legalModule.provisions.find(p => p.id === raw.id);
    const off = offlinePack.provisions.find(p => p.id === raw.id);
    if (!gen || !off) {
      hashMismatch++;
      continue;
    }
    if (raw.contentHash !== gen.contentHash || raw.contentHash !== off.contentHash) {
      hashMismatch++;
      console.warn(`Hash mismatch for ${raw.id}: raw=${raw.contentHash}, gen=${gen.contentHash}, off=${off.contentHash}`);
    }
  }

  console.log(`Per-provision SHA-256 Hash Mismatches: ${hashMismatch}`);
  console.log(`Corpus Version Consistency: ${versionData.corpusVersion === legalModule.CORPUS_VERSION && versionData.corpusVersion === offlinePack.version && (!apiSources || versionData.corpusVersion === apiSources.corpusVersion)}`);
}

main().catch(console.error);
