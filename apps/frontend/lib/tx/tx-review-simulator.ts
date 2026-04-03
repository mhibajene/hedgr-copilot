/**
 * MC-S2-021: Transaction mock-state observability seam (review-only).
 *
 * Query params are dev-only, simulation-only, and ticket-scoped — not a generic
 * tx simulation framework. Further flags require a new ticket and governance.
 *
 * `bypassFxForConfirm` is a reviewability override only (see MC-S2-021 / HEDGR_STATUS §27).
 * It must not be treated as precedent for prod pricing, fallback rates, or execution rules.
 */

import { isLocalDevSimulationSeamEnabled } from '../dev/local-simulation-guard';

/** Review-only: allow starting mock confirm when FX rate is missing (local dev only). */
export const TX_REVIEW_BYPASS_FX_PARAM = 'txReviewBypassFx';

/** Review-only: hold withdraw mock in PENDING for trust-surface inspection (local dev only). */
export const TX_REVIEW_HOLD_PENDING_PARAM = 'txReviewHoldPending';

/** Only `1` is accepted as “on”; avoids truthy ambiguities. */
const PARAM_ON = '1';

export type TxReviewSimulatorFlags = {
  bypassFxForConfirm: boolean;
  holdWithdrawPending: boolean;
};

const DEFAULT_FLAGS: TxReviewSimulatorFlags = {
  bypassFxForConfirm: false,
  holdWithdrawPending: false,
};

export function resolveTxReviewSimulatorFlags(
  search: string | undefined,
): TxReviewSimulatorFlags {
  if (!isLocalDevSimulationSeamEnabled() || !search) {
    return { ...DEFAULT_FLAGS };
  }

  const params = new URLSearchParams(
    search.startsWith('?') ? search.slice(1) : search,
  );

  return {
    bypassFxForConfirm: params.get(TX_REVIEW_BYPASS_FX_PARAM) === PARAM_ON,
    holdWithdrawPending: params.get(TX_REVIEW_HOLD_PENDING_PARAM) === PARAM_ON,
  };
}

export function isTxReviewSeamActive(flags: TxReviewSimulatorFlags): boolean {
  return flags.bypassFxForConfirm || flags.holdWithdrawPending;
}
