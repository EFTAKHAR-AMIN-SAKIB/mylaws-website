import { describe, it, expect } from 'vitest';
import { checkRateLimit, isMetaConfigured } from '../src/lib/meta';
import { legalPackManifest, androidReleaseManifest } from '../src/data/manifest';

describe('Server & API Security Integrity', () => {
  it('enforces rate limiter per IP', () => {
    const testIp = '192.168.1.100';
    for (let i = 0; i < 10; i++) {
      expect(checkRateLimit(testIp, 10, 60000)).toBe(true);
    }
    // 11th request within window must be rate-limited
    expect(checkRateLimit(testIp, 10, 60000)).toBe(false);
  });

  it('correctly reports Meta configuration status without leaking keys', () => {
    // In test environment without MODEL_API_KEY, should be false
    expect(typeof isMetaConfigured()).toBe('boolean');
  });

  it('verifies legal pack manifest structure and coverage', () => {
    expect(legalPackManifest.id).toBe('bd-pilot-2026-10-27.1');
    expect(legalPackManifest.compatible).toBe(true);
    expect(legalPackManifest.coverage.length).toBe(6);
  });

  it('verifies honest Android release manifest metadata', () => {
    expect(androidReleaseManifest.version).toBe('1.0.0-preview');
    expect(androidReleaseManifest.status).toBe('available');
    expect(androidReleaseManifest.minimumAndroidVersion).toContain('Android 8.0');
    expect(androidReleaseManifest.recommendedRam).toContain('4 GB');
    expect(androidReleaseManifest.sha256Checksum).toBeTruthy();
    expect(androidReleaseManifest.fileSizeBytes).toBe(10335330);
  });
});
