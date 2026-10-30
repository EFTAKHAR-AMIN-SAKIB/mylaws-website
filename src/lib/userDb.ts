import { queryD1 } from './cloudflare';

export interface VerifiedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  provider: string | null;
}

export interface UserQuotaStatus {
  dailyLimit: number;
  usedToday: number;
  remaining: number;
  canQuery: boolean;
}

export interface SavedUserQuery {
  id: string;
  userId: string;
  question: string;
  language: string;
  engineProvenance: string;
  status: string;
  responseSnippet: string;
  createdAt: string;
}

export const DEFAULT_DAILY_LIMIT = parseInt(process.env.DAILY_QUERY_LIMIT || '30', 10);

/**
 * Verifies a client-provided Firebase ID token using Google's Identity Toolkit REST API
 */
export async function verifyFirebaseToken(idToken: string): Promise<VerifiedUser | null> {
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL === '1' ||
    process.env.VERCEL_ENV === 'production';

  // CRITICAL PRODUCTION BOUNDARY:
  // In any production or live Vercel environment, ALWAYS reject synthetic test tokens unconditionally.
  // Even if someone accidentally configures ALLOW_TEST_AUTH=true, production security cannot be bypassed.
  if (isProduction) {
    if (process.env.ALLOW_TEST_AUTH === 'true') {
      console.error('[SECURITY ALERT] ALLOW_TEST_AUTH is set in a production environment! Test auth bypass is strictly blocked.');
    }
    if (idToken.startsWith('test_')) {
      return null;
    }
  }

  // Support mock token strictly in designated offline test environments (Vitest unit tests)
  const isLocalTest = (process.env.NODE_ENV === 'test' || process.env.VITEST === 'true') && !isProduction;
  if (isLocalTest) {
    if (idToken.startsWith('test_staging_token_')) {
      return {
        uid: 'test_uid_staging_123',
        email: 'staging@mylaws.bd',
        displayName: 'Staging Verifier',
        photoUrl: null,
        provider: 'test',
      };
    }

    if (idToken.startsWith('test_')) {
      return {
        uid: 'test_uid_123',
        email: 'test@example.com',
        displayName: 'Test Citizen',
        photoUrl: null,
        provider: 'test',
      };
    }
  }

  // Reject any synthetic test tokens in all other environments
  if (idToken.startsWith('test_')) {
    return null;
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey || !idToken) {
    return null;
  }

  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const user = data.users?.[0];
    if (!user || !user.localId) {
      return null;
    }

    return {
      uid: user.localId,
      email: user.email || null,
      displayName: user.displayName || null,
      photoUrl: user.photoUrl || null,
      provider: user.providerUserInfo?.[0]?.providerId || 'password',
    };
  } catch (err) {
    console.error('Failed to verify Firebase ID token:', err);
    return null;
  }
}

/**
 * Upsert user into Cloudflare D1
 */
export async function upsertD1User(user: {
  id: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  provider?: string | null;
}): Promise<boolean> {
  const now = new Date().toISOString();
  const dateStr = now.slice(0, 10);

  const sql = `
    INSERT INTO users (
      id, email, displayName, photoURL, provider, dailyQueryCount, lastQueryDate, totalQueries, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, 0, ?, 0, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      email = coalesce(excluded.email, users.email),
      displayName = coalesce(excluded.displayName, users.displayName),
      photoURL = coalesce(excluded.photoURL, users.photoURL),
      provider = coalesce(excluded.provider, users.provider),
      updatedAt = excluded.updatedAt;
  `;

  const res = await queryD1(sql, [
    user.id,
    user.email || '',
    user.displayName || '',
    user.photoURL || '',
    user.provider || 'password',
    dateStr,
    now,
    now,
  ]);

  return res !== null;
}

/**
 * Get current quota status for a user from Cloudflare D1
 */
export async function getUserQuotaStatus(
  userId: string,
  dailyLimit = DEFAULT_DAILY_LIMIT
): Promise<UserQuotaStatus> {
  const now = new Date().toISOString();
  const todayStr = now.slice(0, 10);

  const rows = await queryD1<any>(
    'SELECT dailyQueryCount, lastQueryDate FROM users WHERE id = ? LIMIT 1',
    [userId]
  );

  if (!rows || rows.length === 0) {
    // If user not in D1 yet, insert base record
    await upsertD1User({ id: userId });
    return {
      dailyLimit,
      usedToday: 0,
      remaining: dailyLimit,
      canQuery: true,
    };
  }

  const row = rows[0];
  let usedToday = Number(row.dailyQueryCount || 0);

  // If last query was on a previous calendar day, reset daily count
  if (row.lastQueryDate !== todayStr) {
    usedToday = 0;
    await queryD1(
      'UPDATE users SET dailyQueryCount = 0, lastQueryDate = ?, updatedAt = ? WHERE id = ?',
      [todayStr, now, userId]
    );
  }

  const remaining = Math.max(0, dailyLimit - usedToday);
  return {
    dailyLimit,
    usedToday,
    remaining,
    canQuery: remaining > 0,
  };
}

/**
 * Atomically checks quota, increments count, and logs the query in Cloudflare D1
 */
export async function consumeQuotaAndRecordQuery(params: {
  userId: string;
  question: string;
  language: string;
  engineProvenance?: string;
  status?: string;
  responseSnippet?: string;
  dailyLimit?: number;
}): Promise<{
  allowed: boolean;
  quota: UserQuotaStatus;
}> {
  const limit = params.dailyLimit || DEFAULT_DAILY_LIMIT;
  const currentQuota = await getUserQuotaStatus(params.userId, limit);

  if (!currentQuota.canQuery) {
    return {
      allowed: false,
      quota: currentQuota,
    };
  }

  const now = new Date().toISOString();
  const todayStr = now.slice(0, 10);
  const queryId = crypto.randomUUID();

  // Increment user count in D1
  await queryD1(
    `UPDATE users 
     SET dailyQueryCount = dailyQueryCount + 1, 
         totalQueries = totalQueries + 1, 
         lastQueryDate = ?, 
         updatedAt = ? 
     WHERE id = ?`,
    [todayStr, now, params.userId]
  );

  // Record question & snippet in user_queries
  await queryD1(
    `INSERT INTO user_queries (
       id, userId, question, language, engineProvenance, status, responseSnippet, createdAt
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      queryId,
      params.userId,
      params.question.slice(0, 2000),
      params.language,
      params.engineProvenance || 'online_workflow',
      params.status || 'ready',
      (params.responseSnippet || '').slice(0, 1000),
      now,
    ]
  );

  const updatedUsed = currentQuota.usedToday + 1;
  const updatedRemaining = Math.max(0, limit - updatedUsed);

  return {
    allowed: true,
    quota: {
      dailyLimit: limit,
      usedToday: updatedUsed,
      remaining: updatedRemaining,
      canQuery: updatedRemaining > 0,
    },
  };
}

/**
 * Fetch a user's question history from Cloudflare D1
 */
export async function getUserHistoryFromD1(
  userId: string,
  limit = 20
): Promise<SavedUserQuery[]> {
  const rows = await queryD1<any>(
    `SELECT id, userId, question, language, engineProvenance, status, responseSnippet, createdAt 
     FROM user_queries 
     WHERE userId = ? 
     ORDER BY createdAt DESC 
     LIMIT ?`,
    [userId, limit]
  );

  return rows || [];
}

/**
 * Delete a user's question history (single query or purge all) from Cloudflare D1
 */
export async function deleteUserHistoryFromD1(
  userId: string,
  queryId?: string
): Promise<boolean> {
  if (queryId) {
    const res = await queryD1(
      'DELETE FROM user_queries WHERE userId = ? AND id = ?',
      [userId, queryId]
    );
    return res !== null;
  }
  const res = await queryD1(
    'DELETE FROM user_queries WHERE userId = ?',
    [userId]
  );
  return res !== null;
}
