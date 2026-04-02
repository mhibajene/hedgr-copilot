/**
 * Transaction Lifecycle Module
 *
 * Public exports for transaction lifecycle management.
 */

export {
  PublicTxStatus,
  InternalTxStatus,
  type TxLifecycle,
  type TxTimelineStep,
} from './types';

export {
  mapInternalStatusToPublicStatus,
  mapLedgerStatusToPublicStatus,
  LEDGER_STATUS_MAP,
  STATUS_MAP,
  getStatusPresentation,
  getPresentationForPublicStatus,
  txToLifecycle,
  generateTimelineSteps,
  isTerminalStatus,
  isSuccessStatus,
  isErrorStatus,
} from './status-mapper';

export { getExceptionPathClarificationLines } from './public-status-exception-clarification';

export { getReconciliationClarificationLines } from './public-status-reconciliation-clarification';

export { getUnresolvedPathClarificationLines } from './public-status-unresolved-path-clarification';

