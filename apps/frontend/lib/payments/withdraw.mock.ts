'use client';

import { useLedgerStore } from '../state/ledger';

export type WithdrawStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export type WithdrawTx = { txn_ref: string; amountUSD: number; createdAt: number };

const reg = new Map<string, { status: WithdrawStatus }>();

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const DEFAULT_DELAY = Number(process.env.NEXT_PUBLIC_WITHDRAW_CONFIRM_DELAY_MS ?? '1500');
const DELAY_MS = clamp(DEFAULT_DELAY, 200, 5000);

export type CreateWithdrawOptions = {
  /**
   * When true, mock stays PENDING (no auto-confirm timer). MC-S2-021 review seam only;
   * caller must only set this when local dev simulation guard allows tx review flags.
   */
  skipAutoConfirm?: boolean;
};

export const withdrawMock = {
  async createWithdraw(
    amountUSD: number,
    options?: CreateWithdrawOptions,
  ): Promise<WithdrawTx> {
    const txn_ref = crypto.randomUUID();
    const now = Date.now();

    reg.set(txn_ref, { status: 'PENDING' });

    useLedgerStore.getState().append({
      txn_ref,
      type: 'withdrawal',
      status: 'pending',
      amount_zmw: 0,
      amount_usd: amountUSD,
      fx_rate: 0,
      created_at: now,
      updated_at: now,
    });

    if (!options?.skipAutoConfirm) {
      setTimeout(() => {
        reg.set(txn_ref, { status: 'CONFIRMED' });
        useLedgerStore.getState().confirm(txn_ref);
      }, DELAY_MS);
    }

    return { txn_ref, amountUSD, createdAt: now };
  },
  async status(txn_ref: string): Promise<WithdrawStatus> {
    return reg.get(txn_ref)?.status ?? 'FAILED';
  },
};
