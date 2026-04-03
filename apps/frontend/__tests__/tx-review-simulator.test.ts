import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  resolveTxReviewSimulatorFlags,
  isTxReviewSeamActive,
  TX_REVIEW_BYPASS_FX_PARAM,
  TX_REVIEW_HOLD_PENDING_PARAM,
} from '../lib/tx/tx-review-simulator';

const ORIGINAL_CI = process.env.CI;
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

describe('tx review simulator (MC-S2-021)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    if (ORIGINAL_CI === undefined) {
      delete process.env.CI;
    } else {
      process.env.CI = ORIGINAL_CI;
    }
    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    process.env.NEXT_PUBLIC_APP_ENV = ORIGINAL_APP_ENV;
  });

  describe('blocked contexts (no activation; params ignored)', () => {
    test.each([
      {
        label: 'CI',
        env: () => {
          process.env.CI = 'true';
          process.env.NODE_ENV = 'development';
          process.env.NEXT_PUBLIC_APP_ENV = 'dev';
        },
      },
      {
        label: 'NODE_ENV=test',
        env: () => {
          delete process.env.CI;
          process.env.NODE_ENV = 'test';
          process.env.NEXT_PUBLIC_APP_ENV = 'dev';
        },
      },
      {
        label: 'NEXT_PUBLIC_APP_ENV not dev',
        env: () => {
          delete process.env.CI;
          process.env.NODE_ENV = 'development';
          process.env.NEXT_PUBLIC_APP_ENV = 'stg';
        },
      },
      {
        label: 'NODE_ENV=production',
        env: () => {
          delete process.env.CI;
          process.env.NODE_ENV = 'production';
          process.env.NEXT_PUBLIC_APP_ENV = 'dev';
        },
      },
    ])('flags stay false when $label despite query params', ({ env }) => {
      env();
      const q = `?${TX_REVIEW_BYPASS_FX_PARAM}=1&${TX_REVIEW_HOLD_PENDING_PARAM}=1`;
      const flags = resolveTxReviewSimulatorFlags(q);
      expect(flags.bypassFxForConfirm).toBe(false);
      expect(flags.holdWithdrawPending).toBe(false);
      expect(isTxReviewSeamActive(flags)).toBe(false);
    });
  });

  describe('approved local dev', () => {
    beforeEach(() => {
      vi.unstubAllEnvs();
      delete process.env.CI;
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_APP_ENV = 'dev';
    });

    test('no explicit params: no activation (normal dev flow)', () => {
      expect(resolveTxReviewSimulatorFlags(undefined)).toEqual({
        bypassFxForConfirm: false,
        holdWithdrawPending: false,
      });
      expect(resolveTxReviewSimulatorFlags('')).toEqual({
        bypassFxForConfirm: false,
        holdWithdrawPending: false,
      });
      expect(isTxReviewSeamActive(resolveTxReviewSimulatorFlags('?'))).toBe(false);
    });

    test('only bypass when txReviewBypassFx=1', () => {
      const flags = resolveTxReviewSimulatorFlags(`?${TX_REVIEW_BYPASS_FX_PARAM}=1`);
      expect(flags).toEqual({
        bypassFxForConfirm: true,
        holdWithdrawPending: false,
      });
      expect(isTxReviewSeamActive(flags)).toBe(true);
    });

    test('only hold when txReviewHoldPending=1', () => {
      const flags = resolveTxReviewSimulatorFlags(`?${TX_REVIEW_HOLD_PENDING_PARAM}=1`);
      expect(flags).toEqual({
        bypassFxForConfirm: false,
        holdWithdrawPending: true,
      });
      expect(isTxReviewSeamActive(flags)).toBe(true);
    });

    test('non-1 values do not activate', () => {
      const flags = resolveTxReviewSimulatorFlags(
        `?${TX_REVIEW_BYPASS_FX_PARAM}=true&${TX_REVIEW_HOLD_PENDING_PARAM}=yes`,
      );
      expect(flags.bypassFxForConfirm).toBe(false);
      expect(flags.holdWithdrawPending).toBe(false);
    });
  });
});
