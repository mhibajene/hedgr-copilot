/**
 * Per-Market Policy Overlays (v1)
 *
 * Each overlay is a partial Policy object. During resolution the resolver
 * performs a **shallow merge**: for each top-level key present in the overlay,
 * the overlay value *replaces* the baseline value entirely (no deep merge).
 *
 * Because merge is shallow, overlays must supply **complete** sub-objects
 * for any top-level key they override. Keys omitted from an overlay will
 * retain the GM-RP baseline value.
 */

import type { Policy } from './schema';
import type { Market } from './schema';
import { BASELINE_POLICY } from './defaults';

// ---------------------------------------------------------------------------
// Overlay type — each key is optional; when present it fully replaces
// the corresponding baseline key.
// ---------------------------------------------------------------------------
export type PolicyOverlay = Partial<Policy>;

// ---------------------------------------------------------------------------
// ZW — Zimbabwe
// ---------------------------------------------------------------------------
const ZW_OVERLAY: PolicyOverlay = {
  features: {
    earn: false,
    earnMode: 'off',
    payLinks: false,
    stablecoinSend: false,
  },
  settlement: {
    localCurrencyFirst: true,
    localCurrency: 'ZWL',
  },
};

// ---------------------------------------------------------------------------
// ZA — South Africa
// ---------------------------------------------------------------------------
const ZA_OVERLAY: PolicyOverlay = {
  features: {
    ...BASELINE_POLICY.features,
    stablecoinSend: false, // until travel-rule ready
  },
};

// ---------------------------------------------------------------------------
// KE — Kenya
// ---------------------------------------------------------------------------
const KE_OVERLAY: PolicyOverlay = {
  features: {
    earn: true,
    earnMode: 'pilot',
    payLinks: false,
    stablecoinSend: false,
  },
  limits: {
    maxDepositUSD: 5_000,
    maxWithdrawUSD: 2_500,
    maxSingleTransferUSD: 1_000,
  },
  disclosures: {
    requiredKeys: ['risk-warning', 'not-a-bank', 'pilot-program-terms'],
  },
};

// ---------------------------------------------------------------------------
// UNKNOWN — deny-by-default, strongest limits
// ---------------------------------------------------------------------------
const UNKNOWN_OVERLAY: PolicyOverlay = {
  features: {
    earn: false,
    earnMode: 'off',
    payLinks: false,
    stablecoinSend: false,
  },
  limits: {
    maxDepositUSD: 1_000,
    maxWithdrawUSD: 500,
    maxSingleTransferUSD: 250,
  },
  settlement: {
    localCurrencyFirst: false,
    localCurrency: 'USD',
  },
  disclosures: {
    requiredKeys: ['risk-warning', 'not-a-bank', 'unsupported-region'],
  },
  bannedClaims: ['guaranteed-returns', 'fdic-insured', 'risk-free', 'regulated'],
};

// ---------------------------------------------------------------------------
// Lookup map
// ---------------------------------------------------------------------------
export const OVERLAYS: Record<Market, PolicyOverlay> = {
  ZW: ZW_OVERLAY,
  ZA: ZA_OVERLAY,
  KE: KE_OVERLAY,
  UNKNOWN: UNKNOWN_OVERLAY,
};
