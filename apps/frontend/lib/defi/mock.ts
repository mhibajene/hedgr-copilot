import type { DefiAdapter } from './types';
const MODE = process.env.NEXT_PUBLIC_DEFI_MODE ?? 'mock';

export const mockDefi: DefiAdapter = {
  async getNetApy() {
    if (MODE !== 'mock') throw new Error('Non-mock defi not implemented');
    return 0.05; // 5% APY
  },
};
