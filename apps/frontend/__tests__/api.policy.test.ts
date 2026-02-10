// @vitest-environment node

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { ResolvedPolicySchema } from '../lib/policy/schema';

describe('/api/policy endpoint', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  // -----------------------------------------------------------------------
  // AC3: API returns policy
  // -----------------------------------------------------------------------
  test('GET returns 200 with correct shape', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'ZW';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const { GET } = await import('../app/api/policy/route');
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('version', 'v1');
    expect(data).toHaveProperty('market', 'ZW');
    expect(data).toHaveProperty('resolvedAt');
    expect(data).toHaveProperty('policy');

    // resolvedAt should be a valid ISO date
    expect(Number.isNaN(Date.parse(data.resolvedAt))).toBe(false);
  });

  test('response passes schema validation', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'ZA';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const { GET } = await import('../app/api/policy/route');
    const response = await GET();
    const data = await response.json();

    const parsed = ResolvedPolicySchema.safeParse(data);
    expect(parsed.success).toBe(true);
  });

  test('returns UNKNOWN when no env is set', async () => {
    delete process.env.NEXT_PUBLIC_MARKET_SELECTED;
    delete process.env.NEXT_PUBLIC_MARKET_MODE;

    const { GET } = await import('../app/api/policy/route');
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.market).toBe('UNKNOWN');
    expect(data.version).toBe('v1');
    expect(data.policy.features.earn).toBe(false);
    expect(data.policy.features.payLinks).toBe(false);
    expect(data.policy.features.stablecoinSend).toBe(false);
  });

  test('returns UNKNOWN policy for auto mode', async () => {
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'KE';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'auto';

    const { GET } = await import('../app/api/policy/route');
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    // Auto mode → UNKNOWN in MC-1
    expect(data.market).toBe('UNKNOWN');
  });

  test('echoes the correct market for each supported market', async () => {
    for (const market of ['ZW', 'ZA', 'KE', 'UNKNOWN'] as const) {
      vi.resetModules();
      process.env.NEXT_PUBLIC_MARKET_SELECTED = market;
      process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

      const { GET } = await import('../app/api/policy/route');
      const response = await GET();
      const data = await response.json();

      expect(data.market).toBe(market);

      const parsed = ResolvedPolicySchema.safeParse(data);
      expect(parsed.success).toBe(true);
    }
  });

  test('policy version comes from resolver, not env', async () => {
    process.env.MARKET_POLICY_VERSION = 'v99';
    process.env.NEXT_PUBLIC_MARKET_SELECTED = 'ZW';
    process.env.NEXT_PUBLIC_MARKET_MODE = 'manual';

    const { GET } = await import('../app/api/policy/route');
    const response = await GET();
    const data = await response.json();

    expect(data.version).toBe('v1');
  });
});
