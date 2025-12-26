import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

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

    const { POST } = await import('../app/api/auth/verify/route');
    const request = new NextRequest('http://localhost/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ didToken: 'valid-did-token' }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Execute
    const response = await POST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.email).toBe('test@hedgr.app');
    expect(mockGetMetadataByToken).toHaveBeenCalledWith('valid-did-token');
  });

  it('invalid DID token → returns 401', async () => {
    // Setup
    mockGetMetadataByToken.mockRejectedValue(new Error('Invalid token'));

    const { POST } = await import('../app/api/auth/verify/route');
    const request = new NextRequest('http://localhost/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ didToken: 'invalid-did-token' }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Execute
    const response = await POST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(401);
    expect(data.error).toBeDefined();
    expect(mockGetMetadataByToken).toHaveBeenCalledWith('invalid-did-token');
  });
});

