// @vitest-environment node

import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import {
  resolvePolicy,
  coerceMarket,
  coerceMode,
  POLICY_VERSION,
  PolicySchema,
  ResolvedPolicySchema,
  type Market,
} from '../lib/policy';
import { BASELINE_POLICY } from '../lib/policy/defaults';
import { OVERLAYS } from '../lib/policy/overlays';

describe('Policy Resolver', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  // -----------------------------------------------------------------------
  // AC1: Deterministic resolution — ZW
  // -----------------------------------------------------------------------
  describe('AC1: deterministic resolution (ZW)', () => {
    test('baseline + ZW overlay produces correct policy', () => {
      const result = resolvePolicy({ market: 'ZW', mode: 'manual' });

      // Version from resolver constant
      expect(result.version).toBe('v1');
      expect(result.market).toBe('ZW');
      expect(typeof result.resolvedAt).toBe('string');

      // ZW overlay features
      expect(result.policy.features.earn).toBe(false);
      expect(result.policy.features.payLinks).toBe(false);
      expect(result.policy.features.stablecoinSend).toBe(false);

      // ZW settlement overlay
      expect(result.policy.settlement.localCurrencyFirst).toBe(true);
      expect(result.policy.settlement.localCurrency).toBe('ZWL');

      // FX from baseline (not overridden by ZW)
      expect(result.policy.fx.requireProvenance).toBe(true);
      expect(result.policy.fx.requiredFields).toEqual(['source', 'timestamp']);

      // Limits from baseline (not overridden by ZW)
      expect(result.policy.limits).toEqual(BASELINE_POLICY.limits);
    });

    test('resolved policy passes schema validation', () => {
      const result = resolvePolicy({ market: 'ZW', mode: 'manual' });
      const parsed = ResolvedPolicySchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // AC1: Deterministic resolution — ZA
  // -----------------------------------------------------------------------
  describe('AC1: deterministic resolution (ZA)', () => {
    test('baseline + ZA overlay produces correct policy', () => {
      const result = resolvePolicy({ market: 'ZA', mode: 'manual' });

      expect(result.market).toBe('ZA');
      expect(result.policy.features.stablecoinSend).toBe(false);

      // ZA does not override settlement, so baseline remains
      expect(result.policy.settlement).toEqual(BASELINE_POLICY.settlement);
    });
  });

  // -----------------------------------------------------------------------
  // AC1: Deterministic resolution — KE (pilot)
  // -----------------------------------------------------------------------
  describe('AC1: deterministic resolution (KE)', () => {
    test('KE overlay enables earn in pilot mode with strict limits', () => {
      const result = resolvePolicy({ market: 'KE', mode: 'manual' });

      expect(result.market).toBe('KE');
      expect(result.policy.features.earn).toBe(true);
      expect(result.policy.features.earnMode).toBe('pilot');
      expect(result.policy.features.payLinks).toBe(false);

      // KE has stricter limits than baseline
      expect(result.policy.limits.maxDepositUSD).toBe(5_000);
      expect(result.policy.limits.maxWithdrawUSD).toBe(2_500);
      expect(result.policy.limits.maxSingleTransferUSD).toBe(1_000);

      // KE requires pilot-program-terms disclosure
      expect(result.policy.disclosures.requiredKeys).toContain('pilot-program-terms');
    });
  });

  // -----------------------------------------------------------------------
  // AC2: Conservative fallback — UNKNOWN
  // -----------------------------------------------------------------------
  describe('AC2: conservative fallback (UNKNOWN)', () => {
    test('UNKNOWN market denies high-risk features', () => {
      const result = resolvePolicy({ market: 'UNKNOWN', mode: 'manual' });

      expect(result.market).toBe('UNKNOWN');
      expect(result.policy.features.earn).toBe(false);
      expect(result.policy.features.payLinks).toBe(false);
      expect(result.policy.features.stablecoinSend).toBe(false);
      expect(result.policy.features.earnMode).toBe('off');
    });

    test('UNKNOWN has strongest limits', () => {
      const result = resolvePolicy({ market: 'UNKNOWN', mode: 'manual' });

      expect(result.policy.limits.maxDepositUSD).toBe(1_000);
      expect(result.policy.limits.maxWithdrawUSD).toBe(500);
      expect(result.policy.limits.maxSingleTransferUSD).toBe(250);
    });

    test('UNKNOWN includes unsupported-region disclosure', () => {
      const result = resolvePolicy({ market: 'UNKNOWN', mode: 'manual' });
      expect(result.policy.disclosures.requiredKeys).toContain('unsupported-region');
    });
  });

  // -----------------------------------------------------------------------
  // Missing / invalid env → UNKNOWN (explicit)
  // -----------------------------------------------------------------------
  describe('missing or invalid env → UNKNOWN', () => {
    test('coerceMarket returns UNKNOWN when env is undefined', () => {
      expect(coerceMarket(undefined)).toBe('UNKNOWN');
    });

    test('coerceMarket returns UNKNOWN when env is empty string', () => {
      expect(coerceMarket('')).toBe('UNKNOWN');
    });

    test('coerceMarket returns UNKNOWN for invalid market code', () => {
      expect(coerceMarket('US')).toBe('UNKNOWN');
      expect(coerceMarket('invalid')).toBe('UNKNOWN');
      expect(coerceMarket('ZM')).toBe('UNKNOWN'); // ZM is app market, not policy market
    });

    test('coerceMarket returns valid market for valid codes', () => {
      expect(coerceMarket('ZW')).toBe('ZW');
      expect(coerceMarket('ZA')).toBe('ZA');
      expect(coerceMarket('KE')).toBe('KE');
      expect(coerceMarket('UNKNOWN')).toBe('UNKNOWN');
    });

    test('coerceMode returns manual when env is undefined', () => {
      expect(coerceMode(undefined)).toBe('manual');
    });

    test('coerceMode returns manual for invalid mode', () => {
      expect(coerceMode('invalid')).toBe('manual');
      expect(coerceMode('')).toBe('manual');
    });

    test('missing NEXT_PUBLIC_MARKET_SELECTED resolves to UNKNOWN with conservative policy', () => {
      delete process.env.NEXT_PUBLIC_MARKET_SELECTED;
      delete process.env.NEXT_PUBLIC_MARKET_MODE;

      // Import dynamically to pick up env changes
      const market = coerceMarket(process.env.NEXT_PUBLIC_MARKET_SELECTED);
      const mode = coerceMode(process.env.NEXT_PUBLIC_MARKET_MODE);

      expect(market).toBe('UNKNOWN');
      expect(mode).toBe('manual');

      const result = resolvePolicy({ market, mode });

      expect(result.market).toBe('UNKNOWN');
      expect(result.policy.features.earn).toBe(false);
      expect(result.policy.features.payLinks).toBe(false);
      expect(result.policy.features.stablecoinSend).toBe(false);
      expect(result.policy.limits.maxDepositUSD).toBe(1_000);
    });

    test('invalid NEXT_PUBLIC_MARKET_SELECTED resolves to UNKNOWN', () => {
      process.env.NEXT_PUBLIC_MARKET_SELECTED = 'NOPE';

      const market = coerceMarket(process.env.NEXT_PUBLIC_MARKET_SELECTED);
      const result = resolvePolicy({ market, mode: 'manual' });

      expect(result.market).toBe('UNKNOWN');
      expect(result.policy.features.earn).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // Auto mode → UNKNOWN (MC-1)
  // -----------------------------------------------------------------------
  describe('auto mode resolves to UNKNOWN', () => {
    test('auto mode always resolves to UNKNOWN in MC-1', () => {
      const result = resolvePolicy({ market: 'ZW', mode: 'auto' });
      expect(result.market).toBe('UNKNOWN');
      expect(result.policy.features.earn).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // Schema validation
  // -----------------------------------------------------------------------
  describe('schema validation', () => {
    test('all market overlays produce valid policies', () => {
      const markets: Market[] = ['ZW', 'ZA', 'KE', 'UNKNOWN'];
      for (const market of markets) {
        const result = resolvePolicy({ market, mode: 'manual' });
        const parsed = ResolvedPolicySchema.safeParse(result);
        expect(parsed.success).toBe(true);
      }
    });

    test('PolicySchema rejects invalid config (wrong type)', () => {
      const invalid = {
        ...BASELINE_POLICY,
        features: { earn: 'yes', earnMode: 'off', payLinks: false, stablecoinSend: false },
      };
      const result = PolicySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    test('PolicySchema rejects config with missing required field', () => {
      const invalid = {
        features: BASELINE_POLICY.features,
        limits: BASELINE_POLICY.limits,
        // settlement missing
        fx: BASELINE_POLICY.fx,
        disclosures: BASELINE_POLICY.disclosures,
        bannedClaims: BASELINE_POLICY.bannedClaims,
      };
      const result = PolicySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    test('PolicySchema rejects invalid earnMode value', () => {
      const invalid = {
        ...BASELINE_POLICY,
        features: { earn: false, earnMode: 'invalid', payLinks: false, stablecoinSend: false },
      };
      const result = PolicySchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // AC4: No env coupling / hermetic
  // -----------------------------------------------------------------------
  describe('AC4: no env coupling', () => {
    test('resolvePolicy does not require secrets or external access', () => {
      // Clear all non-policy env to prove no coupling
      const safeEnv = { NODE_ENV: 'test' };
      process.env = safeEnv as NodeJS.ProcessEnv;

      // Should resolve without any env vars
      const result = resolvePolicy({ market: 'UNKNOWN', mode: 'manual' });
      expect(result.version).toBe('v1');
      expect(result.market).toBe('UNKNOWN');
      expect(result.policy.features.earn).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // POLICY_VERSION constant
  // -----------------------------------------------------------------------
  describe('POLICY_VERSION', () => {
    test('version is v1 and owned by resolver', () => {
      expect(POLICY_VERSION).toBe('v1');
    });

    test('resolved policy uses resolver version, not env', () => {
      process.env.MARKET_POLICY_VERSION = 'v99';
      const result = resolvePolicy({ market: 'ZW', mode: 'manual' });
      expect(result.version).toBe('v1');
    });
  });

  // -----------------------------------------------------------------------
  // Shallow merge semantics
  // -----------------------------------------------------------------------
  describe('shallow merge semantics', () => {
    test('overlay replaces entire top-level key, not individual nested fields', () => {
      // KE overlay provides complete `limits` — verify baseline limits are NOT mixed in
      const result = resolvePolicy({ market: 'KE', mode: 'manual' });
      const keOverlay = OVERLAYS.KE;

      // KE overlay has limits, so the entire limits block should come from overlay
      if (keOverlay.limits) {
        expect(result.policy.limits).toEqual(keOverlay.limits);
      }
    });

    test('keys not in overlay retain baseline values', () => {
      // ZW overlay does not set limits, so baseline limits should remain
      const result = resolvePolicy({ market: 'ZW', mode: 'manual' });
      expect(result.policy.limits).toEqual(BASELINE_POLICY.limits);

      // ZW overlay does not set fx, so baseline fx should remain
      expect(result.policy.fx).toEqual(BASELINE_POLICY.fx);
    });
  });
});
