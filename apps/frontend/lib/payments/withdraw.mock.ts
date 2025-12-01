'use client';

export type WithdrawStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export type WithdrawTx = { id: string; amountUSD: number; createdAt: number };

const reg = new Map<string, { status: WithdrawStatus }>();

let seq = 0;

const uid = () => `wd_${Date.now()}_${++seq}`;

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const DEFAULT_DELAY = Number(process.env.NEXT_PUBLIC_WITHDRAW_CONFIRM_DELAY_MS ?? '1500');

const DELAY_MS = clamp(DEFAULT_DELAY, 200, 5000);

export const withdrawMock = {
  async createWithdraw(amountUSD: number): Promise<WithdrawTx> {
    const id = uid();
    reg.set(id, { status: 'PENDING' });
    setTimeout(() => reg.set(id, { status: 'CONFIRMED' }), DELAY_MS);
    return { id, amountUSD, createdAt: Date.now() };
  },
  async status(id: string): Promise<WithdrawStatus> { return reg.get(id)?.status ?? 'FAILED'; },
};

