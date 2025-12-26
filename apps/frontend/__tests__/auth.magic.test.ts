import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';

// Mock Magic Admin SDK before importing the route
const mockGetMetadataByToken = vi.fn();

vi.mock('@magic-sdk/admin', () => {
  return {
    Magic: vi.fn().mockImplementation(() => ({
      users: {
        getMetadataByToken: mockGetMetadataByToken,
      },
    })),
  };
});

describe('auth.magic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MAGIC_SECRET_KEY = 'sk_test_123';
  });

  it('valid DID token → verify endpoint returns 200', async () => {
    // Setup
    mockGetMetadataByToken.mockResolvedValue({
      email: 'test@hedgr.app',
      issuer: 'did:magic:123',
    });

    const handler = (await import('../pages/api/auth/verify')).default;
    
    const req = {
      method: 'POST',
      body: { didToken: 'valid-did-token' },
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    // Execute
    await handler(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true, email: 'test@hedgr.app' });
    expect(mockGetMetadataByToken).toHaveBeenCalledWith('valid-did-token');
  });

  it('invalid DID token → returns 401', async () => {
    // Setup
    mockGetMetadataByToken.mockRejectedValue(new Error('Invalid token'));

    const handler = (await import('../pages/api/auth/verify')).default;
    
    const req = {
      method: 'POST',
      body: { didToken: 'invalid-did-token' },
    } as NextApiRequest;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    } as unknown as NextApiResponse;

    // Execute
    await handler(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(String) });
    expect(mockGetMetadataByToken).toHaveBeenCalledWith('invalid-did-token');
  });
});

