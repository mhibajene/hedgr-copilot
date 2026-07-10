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
  steady: 'border-blue-200 bg-blue-50 text-blue-950',
  attention: 'border-red-200 bg-red-50 text-red-950',
  blocked: 'border-amber-200 bg-amber-50 text-amber-950',
  neutral: 'border-gray-200 bg-gray-50 text-gray-950',
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
          className="rounded-md border border-current/20 px-2 py-0.5 text-xs font-medium"
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
        className="mt-4 rounded-md border border-current/20 px-3 py-2 text-sm font-medium text-current/60"
      >
        {presentation.primaryActionLabel}
      </button>
    </section>
  );
}

export default SyntheticTxExceptionNotice;
