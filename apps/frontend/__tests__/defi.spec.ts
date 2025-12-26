import { describe, it, expect } from 'vitest';
import { defiAdapter } from '../lib/defi';
import { useWalletStore } from '../lib/state/wallet';

describe('defi mock + wallet store', () => {
  it('APY is positive', async () => {
    const apy = await defiAdapter.getNetApy();
    expect(apy).toBeGreaterThan(0);
  });
  it('balance mirrors store updates', () => {
    const st = useWalletStore.getState();
    st.reset();
    st.creditUSD(10);
    expect(useWalletStore.getState().usdBalance).toBe(10);
  });
});
