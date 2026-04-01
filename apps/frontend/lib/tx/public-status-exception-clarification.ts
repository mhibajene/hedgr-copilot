/**
 * Non-final public transaction status — calm exception-path clarification (MC-S2-015).
 * Centralized in lib/tx so withdraw and other surfaces can share one trust contract.
 */

import { PublicTxStatus } from './types';
import { isTerminalStatus } from './status-mapper';

/**
 * Plain-language lines for in-flight public statuses only.
 * Terminal outcomes (success, failure, reversed, expired) return null — no exception-path block.
 */
const NON_FINAL_CLARIFICATION_LINES: readonly string[] = [
  'Still processing — this is not final yet. Taking more time can be normal; it does not mean funds are at risk.',
  'This status alone does not mean funds are gone from your account before this step completes.',
  'No completion time is promised on this screen.',
];

/**
 * Returns short clarification lines for non-final {@link PublicTxStatus} values, or null when
 * no exception-path framing applies (terminal states, including success).
 */
export function getExceptionPathClarificationLines(
  publicStatus: PublicTxStatus,
): readonly string[] | null {
  if (isTerminalStatus(publicStatus)) {
    return null;
  }
  if (publicStatus === PublicTxStatus.PENDING_INIT || publicStatus === PublicTxStatus.IN_PROGRESS) {
    return NON_FINAL_CLARIFICATION_LINES;
  }
  return null;
}
