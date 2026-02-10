/**
 * GM-RP Baseline Policy (v1)
 *
 * Conservative-by-default global baseline. Every market overlay starts
 * from this object and replaces top-level keys via shallow merge.
 *
 * All high-risk features are OFF unless an overlay explicitly enables them.
 * FX provenance is always required, even in fixed mode.
 */

import type { Policy } from './schema';

export const BASELINE_POLICY: Policy = {
  features: {
    earn: false,
    earnMode: 'off',
    payLinks: false,
    stablecoinSend: false,
  },

  limits: {
    maxDepositUSD: 10_000,
    maxWithdrawUSD: 5_000,
    maxSingleTransferUSD: 2_500,
  },

  settlement: {
    localCurrencyFirst: false,
    localCurrency: 'USD',
  },

  fx: {
    requireProvenance: true,
    requiredFields: ['source', 'timestamp'],
  },

  disclosures: {
    requiredKeys: ['risk-warning', 'not-a-bank'],
  },

  bannedClaims: ['guaranteed-returns', 'fdic-insured', 'risk-free'],
};
