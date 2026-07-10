export const SyntheticTxExceptionState = {
  PENDING: 'pending',
  BLOCKED: 'blocked',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  UNAVAILABLE: 'unavailable',
  MANUAL_REVIEW: 'manual-review',
} as const;

export type SyntheticTxExceptionState =
  (typeof SyntheticTxExceptionState)[keyof typeof SyntheticTxExceptionState];

export type SyntheticTxExceptionTone = 'steady' | 'attention' | 'blocked' | 'neutral';

export interface SyntheticTxExceptionPresentation {
  state: SyntheticTxExceptionState;
  label: string;
  headline: string;
  body: string;
  supportNote: string;
  primaryActionLabel: string;
  tone: SyntheticTxExceptionTone;
  isSynthetic: true;
  nonLiveLabel: 'Synthetic / non-live fixture';
}

export const SYNTHETIC_TX_EXCEPTION_PRESENTATIONS: Record<
  SyntheticTxExceptionState,
  SyntheticTxExceptionPresentation
> = {
  [SyntheticTxExceptionState.PENDING]: {
    state: SyntheticTxExceptionState.PENDING,
    label: 'Pending review',
    headline: 'The request is waiting in a synthetic review state.',
    body: 'No funds are being moved. This fixture only checks how a pending exception is explained before any live rail exists.',
    supportNote: 'Support ownership and timing would require later provider and operations evidence.',
    primaryActionLabel: 'Review status context',
    tone: 'steady',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.BLOCKED]: {
    state: SyntheticTxExceptionState.BLOCKED,
    label: 'Blocked',
    headline: 'The request is blocked in this synthetic fixture.',
    body: 'The safest visible state is a stop condition until policy, provider, or operational evidence says otherwise.',
    supportNote: 'No regulatory, endpoint, or provider approval is implied by this state.',
    primaryActionLabel: 'Review blocker context',
    tone: 'blocked',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.FAILED]: {
    state: SyntheticTxExceptionState.FAILED,
    label: 'Failed',
    headline: 'The synthetic request could not continue.',
    body: 'This state is a presentation fixture for failure explanation only; it is not a provider receipt or settlement record.',
    supportNote: 'Retry, refund, and evidence handoff rules require separate operating authority.',
    primaryActionLabel: 'Review failure context',
    tone: 'attention',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.CANCELLED]: {
    state: SyntheticTxExceptionState.CANCELLED,
    label: 'Cancelled',
    headline: 'The synthetic request has been cancelled.',
    body: 'Cancellation here is a mock presentation state. It does not prove reversal rights, refund timing, or local rail finality.',
    supportNote: 'Later provider evidence would need to define cancellation and refund paths.',
    primaryActionLabel: 'Review cancellation context',
    tone: 'neutral',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.UNAVAILABLE]: {
    state: SyntheticTxExceptionState.UNAVAILABLE,
    label: 'Unavailable',
    headline: 'This path is unavailable in the synthetic contract.',
    body: 'The interface denies action when state is unknown, unsupported, or not authorized for live use.',
    supportNote: 'Unavailable does not mean a market, endpoint, provider, rail, chain, or stablecoin has been rejected or approved.',
    primaryActionLabel: 'Review availability context',
    tone: 'neutral',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.MANUAL_REVIEW]: {
    state: SyntheticTxExceptionState.MANUAL_REVIEW,
    label: 'Manual review',
    headline: 'The synthetic request is marked for manual review.',
    body: 'This fixture shows a calm review posture only. It does not create support operations or customer-money handling authority.',
    supportNote: 'Manual review ownership, service levels, and escalation evidence remain future requirements.',
    primaryActionLabel: 'Review manual context',
    tone: 'steady',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
};

export function getSyntheticTxExceptionPresentation(
  state: SyntheticTxExceptionState
): SyntheticTxExceptionPresentation {
  return SYNTHETIC_TX_EXCEPTION_PRESENTATIONS[state];
}

export function resolveSyntheticTxExceptionPresentation(
  state: string | null | undefined
): SyntheticTxExceptionPresentation {
  const normalized = state?.trim().toLowerCase();
  const knownStates = Object.values(SyntheticTxExceptionState);
  if (knownStates.includes(normalized as SyntheticTxExceptionState)) {
    return SYNTHETIC_TX_EXCEPTION_PRESENTATIONS[
      normalized as SyntheticTxExceptionState
    ];
  }
  return SYNTHETIC_TX_EXCEPTION_PRESENTATIONS[
    SyntheticTxExceptionState.UNAVAILABLE
  ];
}
