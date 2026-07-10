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

export type SyntheticTxExceptionFixtureId =
  | 'pending-review-v1'
  | 'manual-review-v1'
  | 'blocked-v1'
  | 'unavailable-v1'
  | 'failed-v1'
  | 'cancelled-v1';

export interface SyntheticTxExceptionPresentation {
  state: SyntheticTxExceptionState;
  fixtureId: SyntheticTxExceptionFixtureId;
  label: string;
  headline: string;
  body: string;
  supportNote: string;
  comprehensionPrompt: string;
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
    fixtureId: 'pending-review-v1',
    label: 'Pending review',
    headline: 'A synthetic review process is still open.',
    body: 'This fixture means a review exists in the research scenario and has not concluded. It is a temporary review state, not a permanent rejection, unsupported market, or provider decision.',
    supportNote: 'No reviewer, service level, provider, or live request exists outside this fixture.',
    comprehensionPrompt: 'What do you think “Pending review” means here?',
    primaryActionLabel: 'Read the synthetic status explanation',
    tone: 'steady',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.BLOCKED]: {
    state: SyntheticTxExceptionState.BLOCKED,
    fixtureId: 'blocked-v1',
    label: 'Blocked',
    headline: 'A known synthetic rule prevents continuation.',
    body: 'This fixture is a rule-based stop. It is not a review in progress, an unsupported-market finding, or a provider rejection.',
    supportNote: 'The rule exists only in this research fixture; no live policy, endpoint, or provider decision is implied.',
    comprehensionPrompt: 'What do you think “Blocked” means here?',
    primaryActionLabel: 'Read the synthetic status explanation',
    tone: 'blocked',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.FAILED]: {
    state: SyntheticTxExceptionState.FAILED,
    fixtureId: 'failed-v1',
    label: 'Failed',
    headline: 'A synthetic attempt did not complete.',
    body: 'This fixture means a simulated attempt ended without completion. It is not a known-rule block, a provider receipt, or a settlement record.',
    supportNote: 'No retry, refund, provider handoff, or financial record exists in this prototype.',
    comprehensionPrompt: 'What do you think “Failed” means here?',
    primaryActionLabel: 'Read the synthetic status explanation',
    tone: 'attention',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.CANCELLED]: {
    state: SyntheticTxExceptionState.CANCELLED,
    fixtureId: 'cancelled-v1',
    label: 'Cancelled',
    headline: 'The synthetic process was intentionally stopped.',
    body: 'This fixture means the user or the simulated system deliberately ended the scenario. It is not a failure, rejection, or proof of reversal.',
    supportNote: 'No live cancellation, refund, provider instruction, or rail finality exists here.',
    comprehensionPrompt: 'What do you think “Cancelled” means here?',
    primaryActionLabel: 'Read the synthetic status explanation',
    tone: 'neutral',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.UNAVAILABLE]: {
    state: SyntheticTxExceptionState.UNAVAILABLE,
    fixtureId: 'unavailable-v1',
    label: 'Unavailable',
    headline: 'This path is not enabled and its authority is unknown.',
    body: 'This fixture denies progression because no path has been enabled or authorized. It is not a failed attempt, permanent rejection, or unsupported-market conclusion.',
    supportNote: 'Unavailable does not mean a market, endpoint, provider, rail, chain, or stablecoin was rejected or approved.',
    comprehensionPrompt: 'What do you think “Unavailable” means here?',
    primaryActionLabel: 'Read the synthetic status explanation',
    tone: 'neutral',
    isSynthetic: true,
    nonLiveLabel: 'Synthetic / non-live fixture',
  },
  [SyntheticTxExceptionState.MANUAL_REVIEW]: {
    state: SyntheticTxExceptionState.MANUAL_REVIEW,
    fixtureId: 'manual-review-v1',
    label: 'Manual review',
    headline: 'Human review would be required before progression.',
    body: 'This fixture means the scenario cannot progress unless a person reviews it. It is not a pending review already underway or a permanent block.',
    supportNote: 'No reviewer, support operation, service level, or customer-money handling authority exists here.',
    comprehensionPrompt: 'What do you think “Manual review” means here?',
    primaryActionLabel: 'Read the synthetic status explanation',
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
