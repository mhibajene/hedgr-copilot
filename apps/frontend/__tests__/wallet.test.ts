// @vitest-environment jsdom

import { beforeEach, describe, expect, test } from 'vitest';
import { useWalletStore } from '../lib/state/wallet';

describe('WalletStore fallback integrity', () => {
  beforeEach(() => {
    window.localStorage.clear();
    useWalletStore.getState().reset();
  });

  test('sanitizes a persisted negative balance during hydration', async () => {
    window.localStorage.setItem(
      'hedgr:wallet',
      JSON.stringify({ state: { usdBalance: -230 }, version: 0 }),
    );

    await useWalletStore.persist.rehydrate();

    expect(useWalletStore.getState().usdBalance).toBe(0);
  });

  test('never debits below zero', () => {
    useWalletStore.getState().creditUSD(50);
    useWalletStore.getState().debitUSD(30);
    expect(useWalletStore.getState().usdBalance).toBe(20);

    useWalletStore.getState().debitUSD(30);
    expect(useWalletStore.getState().usdBalance).toBe(0);
  });

  test('ignores non-positive and non-finite mutations', () => {
    useWalletStore.getState().creditUSD(-10);
    useWalletStore.getState().creditUSD(Number.NaN);
    useWalletStore.getState().debitUSD(-10);
    useWalletStore.getState().debitUSD(Number.POSITIVE_INFINITY);

    expect(useWalletStore.getState().usdBalance).toBe(0);
  });
});
