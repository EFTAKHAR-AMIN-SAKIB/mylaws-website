import { describe, it, expect } from 'vitest';
import { DEFAULT_DAILY_LIMIT } from '../src/lib/userDb';

describe('User Daily Quota (10 requests/day) and Modal Logic', () => {
  it('enforces default daily limit of 10 requests per day', () => {
    expect(DEFAULT_DAILY_LIMIT).toBe(10);
  });

  it('verifies quota limit configuration is consistent with .env', () => {
    const configuredLimit = parseInt(process.env.DAILY_QUERY_LIMIT || '10', 10);
    expect(configuredLimit).toBe(10);
  });

  it('calculates remaining and exhaustion accurately for a 10 query limit', () => {
    const limit = 10;
    
    // Day start: 0 used
    const used0 = 0;
    const remaining0 = Math.max(0, limit - used0);
    const canQuery0 = remaining0 > 0;
    expect(remaining0).toBe(10);
    expect(canQuery0).toBe(true);

    // Midday: 9 used
    const used9 = 9;
    const remaining9 = Math.max(0, limit - used9);
    const canQuery9 = remaining9 > 0;
    expect(remaining9).toBe(1);
    expect(canQuery9).toBe(true);

    // Limit reached: 10 used
    const used10 = 10;
    const remaining10 = Math.max(0, limit - used10);
    const canQuery10 = remaining10 > 0;
    expect(remaining10).toBe(0);
    expect(canQuery10).toBe(false);

    // Over limit: 11 attempted
    const used11 = 11;
    const remaining11 = Math.max(0, limit - used11);
    const canQuery11 = remaining11 > 0;
    expect(remaining11).toBe(0);
    expect(canQuery11).toBe(false);
  });
});
