'use client';
import type { DepositProvider, DepositTx, TxStatus } from './provider';

const reg = new Map<string, { status: TxStatus }>();
const uid = () => Math.random().toString(36).slice(2);

export const momoMock: DepositProvider = {
  async createDeposit(amountZMW: number): Promise<DepositTx> {
    const id = uid();
    reg.set(id, { status: 'PENDING' });
    const delay = Math.min(5000, 1000 + Math.floor(Math.random() * 3000));
    setTimeout(() => reg.set(id, { status: 'CONFIRMED' }), delay);
    return { id, amountZMW, createdAt: Date.now() };
  },
  async status(id: string): Promise<TxStatus> {
    return reg.get(id)?.status ?? 'FAILED';
  },
};

