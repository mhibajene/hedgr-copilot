import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { postDeposit } from '../lib/deposits/client';

describe('postDeposit', () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = process.env;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:5050';
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  });

  test('success: returns depositId and txn_ref', async () => {
    const txn_ref = '550e8400-e29b-41d4-a716-446655440000';
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ depositId: 'deposit_abc123', txn_ref }),
    });
    globalThis.fetch = mockFetch;

    const result = await postDeposit({ txn_ref, amount_zmw: 100 });

    expect(result).toEqual({ depositId: 'deposit_abc123', txn_ref });
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5050/v1/deposits',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txn_ref, amount_zmw: 100 }),
      })
    );
  });

  test('non-2xx: throws sanitized error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(postDeposit({ txn_ref: 'ref', amount_zmw: 50 })).rejects.toThrow(
      'Deposit request failed'
    );
  });

  test('network error: throws sanitized error', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    await expect(postDeposit({ txn_ref: 'ref', amount_zmw: 50 })).rejects.toThrow(
      'Deposit request failed'
    );
  });

  test('invalid JSON response: throws sanitized error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ wrong: 'shape' }),
    });

    await expect(postDeposit({ txn_ref: 'ref', amount_zmw: 50 })).rejects.toThrow(
      'Deposit request failed'
    );
  });
});
