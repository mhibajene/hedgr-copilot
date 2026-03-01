// @vitest-environment jsdom

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { useLedgerStore, LEDGER_SCHEMA_VERSION } from '../lib/state/ledger';
import type { Tx } from '../lib/state/ledger';

describe('LedgerStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
    useLedgerStore.getState().clear();
  });

  test('append → confirm → list contains entry', () => {
    const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(2000);
    const now = Date.now();
    const tx: Tx = {
      txn_ref: 'tx-ref-1',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 100,
      amount_usd: 5.0,
      fx_rate: 20,
      created_at: now,
      updated_at: now,
    };

    useLedgerStore.getState().append(tx);
    const state1 = useLedgerStore.getState();
    expect(state1.transactions).toHaveLength(1);
    expect(state1.transactions[0]).toMatchObject({
      txn_ref: 'tx-ref-1',
      type: 'deposit',
      amount_usd: 5.0,
      status: 'pending',
    });

    useLedgerStore.getState().confirm('tx-ref-1');
    const state2 = useLedgerStore.getState();
    expect(state2.transactions[0].status).toBe('settled');
    nowSpy.mockRestore();
  });

  test('persist works after page reload (mock localStorage)', async () => {
    const now = Date.now();
    const tx: Tx = {
      txn_ref: 'tx-ref-2',
      type: 'withdrawal',
      status: 'pending',
      amount_zmw: 0,
      amount_usd: 1.0,
      fx_rate: 0,
      created_at: now,
      updated_at: now,
    };

    useLedgerStore.getState().append(tx);
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const stored = window.localStorage.getItem('hedgr:ledger');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.version).toBe(LEDGER_SCHEMA_VERSION);
    expect(parsed.transactions).toHaveLength(1);
    expect(parsed.transactions[0].txn_ref).toBe('tx-ref-2');
  });

  test('version mismatch on load clears ledger (safe evolution)', async () => {
    const now = Date.now();
    const tx: Tx = {
      txn_ref: 'old-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 100,
      amount_usd: 5,
      fx_rate: 20,
      created_at: now,
      updated_at: now,
    };
    window.localStorage.setItem(
      'hedgr:ledger',
      JSON.stringify({ version: 1, transactions: [tx] })
    );
    useLedgerStore.persist.rehydrate();
    await new Promise((r) => setTimeout(r, 50));
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(0);
  });

  test('idempotency: same txn_ref appended twice results in one entry', () => {
    const now = Date.now();
    const tx: Tx = {
      txn_ref: 'same-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 50,
      amount_usd: 2.5,
      fx_rate: 20,
      created_at: now,
      updated_at: now,
    };

    useLedgerStore.getState().append(tx);
    useLedgerStore.getState().append(tx);

    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].txn_ref).toBe('same-ref');
  });

  test('upsertTx creates if missing', () => {
    const tx: Tx = {
      txn_ref: 'new-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 100,
      amount_usd: 5,
      fx_rate: 20,
      created_at: 1000,
      updated_at: 1000,
    };
    useLedgerStore.getState().upsertTx(tx);
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0]).toMatchObject({
      txn_ref: 'new-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 100,
      amount_usd: 5,
      created_at: 1000,
      updated_at: 1000,
    });
  });

  test('upsertTx merges allowed fields', () => {
    const tx: Tx = {
      txn_ref: 'merge-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 100,
      amount_usd: 5,
      fx_rate: 20,
      created_at: 1000,
      updated_at: 1000,
    };
    useLedgerStore.getState().append(tx);
    useLedgerStore.getState().upsertTx({
      txn_ref: 'merge-ref',
      status: 'settled',
      updated_at: 2000,
    });
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].status).toBe('settled');
    expect(state.transactions[0].updated_at).toBe(2000);
    expect(state.transactions[0].amount_zmw).toBe(100);
    expect(state.transactions[0].created_at).toBe(1000);
  });

  test('upsertTx does not overwrite immutables', () => {
    const tx: Tx = {
      txn_ref: 'immutable-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 100,
      amount_usd: 5,
      fx_rate: 20,
      created_at: 1000,
      updated_at: 1000,
    };
    useLedgerStore.getState().append(tx);
    useLedgerStore.getState().upsertTx({
      txn_ref: 'immutable-ref',
      amount_zmw: 999,
      fx_rate: 999,
      status: 'failed',
      updated_at: 2000,
    });
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].amount_zmw).toBe(100);
    expect(state.transactions[0].fx_rate).toBe(20);
    expect(state.transactions[0].status).toBe('failed');
    expect(state.transactions[0].updated_at).toBe(2000);
  });

  test('fail sets failure_reason', () => {
    const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(2000);
    const tx: Tx = {
      txn_ref: 'fail-ref',
      type: 'withdrawal',
      status: 'pending',
      amount_zmw: 0,
      amount_usd: 10,
      fx_rate: 0,
      created_at: 1000,
      updated_at: 1000,
    };
    useLedgerStore.getState().append(tx);
    useLedgerStore.getState().fail('fail-ref', 'X');
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].status).toBe('failed');
    expect(state.transactions[0].failure_reason).toBe('X');
    nowSpy.mockRestore();
  });

  test('no duplicate entries: upsertTx twice with same txn_ref', () => {
    const tx: Tx = {
      txn_ref: 'dup-ref',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 50,
      amount_usd: 2.5,
      fx_rate: 20,
      created_at: 1000,
      updated_at: 1000,
    };
    useLedgerStore.getState().upsertTx(tx);
    useLedgerStore.getState().upsertTx({ ...tx, status: 'settled', updated_at: 2000 });
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].status).toBe('settled');
    expect(state.transactions[0].updated_at).toBe(2000);
  });
});
