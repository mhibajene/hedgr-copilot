/**
 * Non-final completion-adjacent trust copy (MC-S2-016).
 * Distinct from exception-path clarification (MC-S2-015): smallest safe meaning only —
 * not final, still being confirmed, not automatically wrong — without operations vocabulary.
 */

import { PublicTxStatus } from './types';
import { isTerminalStatus } from './status-mapper';

/**
 * Plain-language lines for {@link PublicTxStatus.IN_PROGRESS} only (v1 withdraw anchor).
 * Terminals and other non-final statuses return null so this stays a narrow clarification layer.
 */
const IN_PROGRESS_RECONCILIATION_LINES: readonly string[] = [
  'This withdrawal is not final yet — some details may still be confirmed before it is complete.',
  'Waiting longer during this step can be normal and does not automatically mean something is wrong.',
  'This screen does not promise when confirmation will finish.',
];

/**
 * Returns completion-adjacent clarification for in-progress public status, or null when
 * no extra non-finality framing applies.
 */
export function getReconciliationClarificationLines(
  publicStatus: PublicTxStatus,
): readonly string[] | null {
  if (isTerminalStatus(publicStatus)) {
    return null;
  }
  if (publicStatus === PublicTxStatus.IN_PROGRESS) {
    return IN_PROGRESS_RECONCILIATION_LINES;
  }
  return null;
}
