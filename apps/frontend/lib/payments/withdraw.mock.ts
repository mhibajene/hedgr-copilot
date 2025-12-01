'use client';

export type WithdrawStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export type WithdrawTx = { id: string; amountUSD: number; createdAt: number };

const reg = new Map<string, { status: WithdrawStatus }>();

const uid = () => Math.random().toString(36).slice(2);

export const withdrawMock = {
  async createWithdraw(amountUSD: number): Promise<WithdrawTx> {
    const id = uid();
    reg.set(id, { status: 'PENDING' });
    const delay = Math.min(5000, 1000 + Math.floor(Math.random() * 3000));
    setTimeout(() => reg.set(id, { status: 'CONFIRMED' }), delay);
    return { id, amountUSD, createdAt: Date.now() };
  },
  async status(id: string): Promise<WithdrawStatus> { return reg.get(id)?.status ?? 'FAILED'; },
};

