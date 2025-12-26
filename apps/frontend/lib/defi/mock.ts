import type { DefiAdapter } from './types';

export const mockDefi: DefiAdapter = {
  async getNetApy() {
    return 0.05; // 5% APY
  },
};
