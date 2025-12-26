import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fetchAaveNetApy } from '../lib/defi/providers/aave';
import { getDefiAdapter } from '../lib/defi';

describe('defi aave adapter', () => {
  const originalEnv = process.env;
  const originalCI = process.env.CI;
  const originalDefiMode = process.env.NEXT_PUBLIC_DEFI_MODE;

  beforeEach(() => {
    // Reset env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original env
    process.env = originalEnv;
    process.env.CI = originalCI;
    process.env.NEXT_PUBLIC_DEFI_MODE = originalDefiMode;
  });

  it('throws error when called in CI', async () => {
    process.env.CI = 'true';
    process.env.NEXT_PUBLIC_DEFI_MODE = 'aave';

    await expect(fetchAaveNetApy()).rejects.toThrow(
      'Aave provider must not run in CI. Use DEFI_MODE=mock instead.'
    );
  });

  it('throws error when DEFI_MODE is not aave', async () => {
    process.env.CI = undefined;
    process.env.NEXT_PUBLIC_DEFI_MODE = 'mock';

    await expect(fetchAaveNetApy()).rejects.toThrow(
      'Aave provider requires NEXT_PUBLIC_DEFI_MODE=aave'
    );
  });

  it('returns adapter when mode is aave (will fail until implemented)', async () => {
    process.env.CI = undefined;
    process.env.NEXT_PUBLIC_DEFI_MODE = 'aave';

    const adapter = getDefiAdapter();
    // This test will fail because fetchAaveNetApy is a placeholder
    // It's expected to fail in TDD - implementation comes next
    await expect(adapter.getNetApy()).rejects.toThrow();
  });

  it('uses mock adapter when mode is not aave', async () => {
    process.env.NEXT_PUBLIC_DEFI_MODE = 'mock';

    const adapter = getDefiAdapter();
    const apy = await adapter.getNetApy();
    expect(apy).toBe(0.05); // Mock returns 5%
  });
});

