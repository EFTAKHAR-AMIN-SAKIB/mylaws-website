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

  it('enforces private no-store cache headers and history deletion controls', async () => {
    const { DELETE, GET } = await import('../src/app/api/user/history/route');
    const { NextRequest } = await import('next/server');

    // Test GET requires authorization header
    const unauthReq = new NextRequest('http://localhost:3000/api/user/history');
    const unauthRes = await GET(unauthReq);
    expect(unauthRes.status).toBe(401);
    expect(unauthRes.headers.get('cache-control')).toContain('private, no-store');

    // Test DELETE requires authorization header
    const deleteReq = new NextRequest('http://localhost:3000/api/user/history?id=test-query-id', {
      method: 'DELETE',
    });
    const deleteRes = await DELETE(deleteReq);
    expect(deleteRes.status).toBe(401);
    expect(deleteRes.headers.get('cache-control')).toContain('private, no-store');
  });
});
