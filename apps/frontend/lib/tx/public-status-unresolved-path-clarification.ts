/**
 * Minimal unresolved-path trust copy (MC-S2-017).
 * Same public status as MC-S2-015/016 — additional calm framing only, not a second state.
 * At most two short lines; lighter than exception and reconciliation blocks.
 */

import { PublicTxStatus } from './types';
import { isTerminalStatus } from './status-mapper';

const UNRESOLVED_PATH_LINES: readonly [string, string] = [
  'This withdrawal is still unresolved here — it has not been forgotten or dropped.',
  'That does not automatically mean something is wrong, or loss, lockup, or hidden balance changes.',
];

/**
 * Returns at most two short lines for {@link PublicTxStatus.IN_PROGRESS} only, or null when
 * no unresolved-path footnote applies.
 */
export function getUnresolvedPathClarificationLines(
  publicStatus: PublicTxStatus,
): readonly string[] | null {
  if (isTerminalStatus(publicStatus)) {
    return null;
  }
  if (publicStatus === PublicTxStatus.IN_PROGRESS) {
    return UNRESOLVED_PATH_LINES;
  }
  return null;
}
