'use client';

import React from 'react';
import {
  type SyntheticTxExceptionState,
  resolveSyntheticTxExceptionPresentation,
} from '../lib/tx';

export interface SyntheticTxExceptionNoticeProps {
  state: SyntheticTxExceptionState | string;
  className?: string;
}

const toneClasses = {
  steady: 'border-hedgr-200 bg-hedgr-100 text-hedgr-800',
  attention: 'border-hedgr-800 bg-hedgr-white text-hedgr-800',
  blocked: 'border-hedgr-300 bg-hedgr-white text-hedgr-dark',
  neutral: 'border-hedgr-200 bg-hedgr-white text-hedgr-dark',
};

export function SyntheticTxExceptionNotice({
  state,
  className = '',
}: SyntheticTxExceptionNoticeProps) {
  const presentation = resolveSyntheticTxExceptionPresentation(state);

  return (
    <section
      data-testid="synthetic-tx-exception-notice"
      data-state={presentation.state}
      data-synthetic="true"
      aria-live="polite"
      className={`rounded-lg border p-4 ${toneClasses[presentation.tone]} ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p
          data-testid="synthetic-tx-exception-label"
          className="text-sm font-semibold"
        >
          {presentation.label}
        </p>
        <span
          data-testid="synthetic-tx-exception-non-live-label"
          className="rounded-md border border-hedgr-300 bg-hedgr-100 px-2 py-0.5 text-xs font-medium text-hedgr-800"
        >
          {presentation.nonLiveLabel}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-semibold">{presentation.headline}</h3>
      <p className="mt-2 text-sm leading-6 text-current/80">{presentation.body}</p>
      <p
        data-testid="synthetic-tx-exception-support-note"
        className="mt-3 text-xs leading-5 text-current/70"
      >
        {presentation.supportNote}
      </p>
      <button
        type="button"
        disabled
        aria-disabled="true"
        data-testid="synthetic-tx-exception-primary-action"
        className="mt-4 cursor-not-allowed rounded-md border border-hedgr-200 bg-hedgr-100 px-3 py-2 text-sm font-medium text-hedgr-700"
      >
        {presentation.primaryActionLabel}
      </button>
    </section>
  );
}

export default SyntheticTxExceptionNotice;
