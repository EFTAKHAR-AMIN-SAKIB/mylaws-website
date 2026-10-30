import type { Provision } from '@/data/legal';
import { provisions as localProvisions } from '@/data/legal';

export interface CloudflareD1Config {
  accountId: string;
  token: string;
  databaseId: string;
}

export function getCloudflareConfig(): CloudflareD1Config | null {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID?.trim();

  if (!accountId || !token || !databaseId) {
    return null;
  }

  return { accountId, token, databaseId };
}

export function isCloudflareConfigured(): boolean {
  return getCloudflareConfig() !== null;
}

/**
 * Execute an arbitrary SQL query against Cloudflare D1
 */
export async function queryD1<T = any>(
  sql: string,
  params: any[] = [],
  timeoutMs = 6000
): Promise<T[] | null> {
  const config = getCloudflareConfig();
  if (!config) return null;

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/d1/database/${config.databaseId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params }),
        signal: AbortSignal.timeout(timeoutMs),
      }
    );

    if (!res.ok) {
      console.warn(`Cloudflare D1 query responded with status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (!data.success) {
      console.warn('Cloudflare D1 query errors:', data.errors);
      return null;
    }

    return (data.result?.[0]?.results as T[]) || [];
  } catch (err) {
    console.warn('Cloudflare D1 query failed; using local fallback:', err);
    return null;
  }
}

/**
 * Fetch all provisions directly from Cloudflare D1 with instant fallback to local dataset
 */
export async function fetchProvisionsFromD1(limit = 1000): Promise<Provision[]> {
  const rows = await queryD1<any>(
    'SELECT * FROM provisions ORDER BY id ASC LIMIT ?',
    [limit]
  );

  if (!rows || rows.length === 0) {
    return localProvisions;
  }

  return rows.map((r) => {
    // Map D1 row back to Provision interface
    const localMatch = localProvisions.find((lp) => lp.id === r.id);
    let parsedCategories: any[] = localMatch?.categories || [r.category || 'rights'];
    if (r.categories) {
      try {
        parsedCategories = JSON.parse(r.categories);
      } catch {
        parsedCategories = [r.category || 'rights'];
      }
    }

    return {
      id: r.id,
      category: r.category || localMatch?.category || 'rights',
      categories: parsedCategories,
      actId: r.act_id || localMatch?.actId,
      act: localMatch?.act || { bn: r.act_id, en: r.act_id },
      section: r.section_number,
      title: { bn: r.title_bn, en: r.title_en },
      quote: r.verbatim_quote_bn,
      sourceLanguage: localMatch?.sourceLanguage || 'bn',
      sourceUrl: r.bdlaws_url,
      checkedOn: localMatch?.checkedOn || '2026-10-30',
      versionNote: localMatch?.versionNote || { bn: '', en: '' },
      explanation: { bn: r.plain_explanation_bn, en: r.plain_explanation_en },
      caution: { bn: r.caution_bn || '', en: r.caution_en || '' },
      keywords: localMatch?.keywords || [],
      contentHash: r.content_hash || localMatch?.contentHash,
      reviewStatus: r.review_status || localMatch?.reviewStatus || 'auto_checked',
      legalStatus: r.legal_status || localMatch?.legalStatus || 'active',
    };
  });
}

/**
 * Fetch single provision by ID from Cloudflare D1
 */
export async function fetchProvisionByIdFromD1(id: string): Promise<Provision | null> {
  const rows = await queryD1<any>(
    'SELECT * FROM provisions WHERE id = ? LIMIT 1',
    [id]
  );

  if (!rows || rows.length === 0) {
    return localProvisions.find((p) => p.id === id) || null;
  }

  const r = rows[0];
  const localMatch = localProvisions.find((lp) => lp.id === r.id);
  return {
    id: r.id,
    category: r.category || localMatch?.category || 'rights',
    act: localMatch?.act || { bn: r.act_id, en: r.act_id },
    section: r.section_number,
    title: { bn: r.title_bn, en: r.title_en },
    quote: r.verbatim_quote_bn,
    sourceLanguage: localMatch?.sourceLanguage || 'bn',
    sourceUrl: r.bdlaws_url,
    checkedOn: localMatch?.checkedOn || '2026-10-29',
    versionNote: localMatch?.versionNote || { bn: '', en: '' },
    explanation: { bn: r.plain_explanation_bn, en: r.plain_explanation_en },
    caution: { bn: r.caution_bn || '', en: r.caution_en || '' },
    keywords: localMatch?.keywords || [],
  };
}
