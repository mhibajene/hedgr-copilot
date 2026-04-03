/**
 * Constrained-path clarity (MC-S2-019): smooth path may need more time or checks;
 * processing can still proceed legitimately. Distinct from unresolved persistence (MC-S2-017)
 * and continuity / “not gone quiet” (MC-S2-018). IN_PROGRESS only in v1.
 * “Fallback” / “constrained path” are ticket concepts — user copy stays plain retail language.
 */

import { PublicTxStatus } from './types';
import { isTerminalStatus } from './status-mapper';

/** Prefer one line; second line only if it adds non-duplicative meaning. */
const FALLBACK_PATH_CLARIFICATION_LINES: readonly [string, string] = [
  'Sometimes processing uses more time or checks than the simplest withdrawal would suggest.',
  'That can still be a normal way for your request to move forward.',
];

/**
 * Returns compact clarification for {@link PublicTxStatus.IN_PROGRESS} only, or null when
 * no constrained-path layer applies.
 */
export function getFallbackPathClarificationLines(
  publicStatus: PublicTxStatus,
): readonly string[] | null {
  if (isTerminalStatus(publicStatus)) {
    return null;
  }
  if (publicStatus === PublicTxStatus.IN_PROGRESS) {
    return FALLBACK_PATH_CLARIFICATION_LINES;
  }
  return null;
}
