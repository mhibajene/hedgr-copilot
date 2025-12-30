// @vitest-environment node

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the cookies module before importing the route
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn(() => null),
  })),
}));

describe('/api/balance endpoint', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  test('GET returns correct balance shape', async () => {
    // Enable ledger mode
    process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER = 'true';

    const { GET } = await import('../app/api/balance/route');
    
    const request = new Request('http://localhost/api/balance');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('available');
    expect(data).toHaveProperty('pending');
    expect(data).toHaveProperty('currency');
    expect(data).toHaveProperty('asOf');
    expect(data.currency).toBe('USD');
    expect(typeof data.total).toBe('number');
    expect(typeof data.available).toBe('number');
    expect(typeof data.pending).toBe('number');
    expect(typeof data.asOf).toBe('number');
  });

  test('GET computes balance from ledger query param', async () => {
    process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER = 'true';

    const { GET } = await import('../app/api/balance/route');

    const ledgerData = [
      {
        id: 'tx_1',
        type: 'DEPOSIT',
        amountUSD: 100,
        status: 'CONFIRMED',
        createdAt: Date.now(),
        confirmedAt: Date.now(),
      },
      {
        id: 'tx_2',
        type: 'WITHDRAW',
        amountUSD: 25,
        status: 'CONFIRMED',
        createdAt: Date.now(),
        confirmedAt: Date.now(),
      },
    ];

    const ledgerParam = encodeURIComponent(JSON.stringify(ledgerData));
    const request = new Request(`http://localhost/api/balance?ledger=${ledgerParam}`);
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.available).toBe(75);
    expect(data.total).toBe(75);
    expect(data.pending).toBe(0);
  });

  test('GET returns zero balance with empty ledger', async () => {
    process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER = 'true';

    const { GET } = await import('../app/api/balance/route');

    const request = new Request('http://localhost/api/balance');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.available).toBe(0);
    expect(data.total).toBe(0);
    expect(data.pending).toBe(0);
  });

  test('GET handles invalid ledger param gracefully', async () => {
    process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER = 'true';

    const { GET } = await import('../app/api/balance/route');

    const request = new Request('http://localhost/api/balance?ledger=invalid-json');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.available).toBe(0);
  });

  test('POST computes balance from request body', async () => {
    process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER = 'true';

    const { POST } = await import('../app/api/balance/route');

    const transactions = [
      {
        id: 'tx_1',
        type: 'DEPOSIT',
        amountUSD: 200,
        status: 'CONFIRMED',
        createdAt: Date.now(),
        confirmedAt: Date.now(),
      },
      {
        id: 'tx_2',
        type: 'DEPOSIT',
        amountUSD: 50,
        status: 'PENDING',
        createdAt: Date.now(),
      },
    ];

    const request = new Request('http://localhost/api/balance', {
      method: 'POST',
      body: JSON.stringify({ transactions }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.available).toBe(200);
    expect(data.pending).toBe(50);
    expect(data.total).toBe(250);
  });

  test('returns zero balance when ledger mode is disabled', async () => {
    process.env.NEXT_PUBLIC_BALANCE_FROM_LEDGER = 'false';

    // Need to re-import to pick up new env
    vi.resetModules();
    vi.mock('next/headers', () => ({
      cookies: vi.fn(() => ({
        get: vi.fn(() => null),
      })),
    }));
    
    const { GET } = await import('../app/api/balance/route');

    const ledgerData = [
      {
        id: 'tx_1',
        type: 'DEPOSIT',
        amountUSD: 100,
        status: 'CONFIRMED',
        createdAt: Date.now(),
      },
    ];

    const ledgerParam = encodeURIComponent(JSON.stringify(ledgerData));
    const request = new Request(`http://localhost/api/balance?ledger=${ledgerParam}`);
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    // In wallet mode, API returns zeros (client handles balance)
    expect(data.available).toBe(0);
  });
});

