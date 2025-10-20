'use client';
import type { DepositProvider, DepositTx, TxStatus } from './provider';

const reg = new Map<string, { status: TxStatus }>();
let seq = 0;
const uid = () => `tx_${Date.now()}_${++seq}`;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
// deterministic by default; overridable for tests if needed
const DEFAULT_DELAY = Number(process.env.NEXT_PUBLIC_MOMO_CONFIRM_DELAY_MS ?? '1500');
const DELAY_MS = clamp(DEFAULT_DELAY, 200, 5000);

export const momoMock: DepositProvider = {
  async createDeposit(amountZMW: number): Promise<DepositTx> {
    const id = uid();
    reg.set(id, { status: 'PENDING' });
    setTimeout(() => reg.set(id, { status: 'CONFIRMED' }), DELAY_MS);
    return { id, amountZMW, createdAt: Date.now() };
  },
  async status(id: string): Promise<TxStatus> {
    return reg.get(id)?.status ?? 'FAILED';
  },
};

