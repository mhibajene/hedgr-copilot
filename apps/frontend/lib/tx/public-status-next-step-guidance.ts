/**
 * Minimal continuity-orientation copy (MC-S2-018).
 * Copy-only presentation over {@link PublicTxStatus.IN_PROGRESS} — not a process model.
 * At most two short lines; subordinate to exception and reconciliation strips.
 */

import { PublicTxStatus } from './types';
import { isTerminalStatus } from './status-mapper';

const NEXT_STEP_GUIDANCE_LINES: readonly [string, string] = [
  'Your withdrawal is still in progress here — Hedgr has not gone quiet on this request.',
  'Non-final status on this screen does not mean failure; it only means completion is not shown yet.',
];

/**
 * Returns at most two short lines for {@link PublicTxStatus.IN_PROGRESS} only, or null when
 * no continuity-orientation layer applies.
 */
export function getNextStepGuidanceLines(
  publicStatus: PublicTxStatus,
): readonly string[] | null {
  if (isTerminalStatus(publicStatus)) {
    return null;
  }
  if (publicStatus === PublicTxStatus.IN_PROGRESS) {
    return NEXT_STEP_GUIDANCE_LINES;
  }
  return null;
}
