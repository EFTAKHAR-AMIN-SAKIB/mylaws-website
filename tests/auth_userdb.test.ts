import { describe, it, expect } from 'vitest';
import { verifyFirebaseToken } from '../src/lib/userDb';

describe('Firebase Auth & Quota Logic', () => {
  it('correctly verifies mock tokens in test environment', async () => {
    const verified = await verifyFirebaseToken('test_mock_jwt_token');
    expect(verified).not.toBeNull();
    expect(verified?.uid).toBe('test_uid_123');
    expect(verified?.email).toBe('test@example.com');
  });

  it('rejects invalid or missing tokens', async () => {
    const verified = await verifyFirebaseToken('');
    expect(verified).toBeNull();
  });
});
