import { describe, it, expect } from 'vitest';
import { defiAdapter } from '../lib/defi';

describe('defi mock', () => {
  it('APY is positive', async () => {
    const apy = await defiAdapter.getNetApy();
    expect(apy).toBeGreaterThan(0);
  });
});
