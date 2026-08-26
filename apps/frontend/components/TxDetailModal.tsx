'use client';

import React, { useEffect, useRef } from 'react';
import {
  type TxLifecycle,
  type TxTimelineStep,
  PublicTxStatus,
  generateTimelineSteps,
} from '../lib/tx';
import { TxStatusPill } from './TxStatusPill';

export interface TxDetailModalProps {
  transaction: TxLifecycle | null;
  isOpen: boolean;
  onClose: () => void;
  simulated?: boolean;
  resultingBalance?: number;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function TimelineStepIcon({
  step,
  isLast,
}: {
  step: TxTimelineStep;
  isLast: boolean;
}) {
  const getIconColor = () => {
    if (step.isCompleted) {
      if (step.status === PublicTxStatus.FAILED) return 'bg-red-500';
      if (step.status === PublicTxStatus.REVERSED) return 'bg-purple-500';
      if (step.status === PublicTxStatus.EXPIRED) return 'bg-gray-500';
      return 'bg-emerald-500';
    }
    if (step.isActive) return 'bg-blue-500';
    return 'bg-gray-300';
  };

  const getLineColor = () => {
    if (step.isCompleted) return 'bg-emerald-500';
    if (step.isActive) return 'bg-blue-300';
    return 'bg-gray-200';
  };

  return (
    <div className="flex flex-col items-center">
      {/* Circle indicator */}
      <div
        className={`relative flex h-4 w-4 items-center justify-center rounded-full ${getIconColor()}`}
      >
        {step.isCompleted && (
          <svg
            className="h-2.5 w-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {step.isActive && (
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
        )}
      </div>
      {/* Connecting line */}
      {!isLast && <div className={`h-8 w-0.5 ${getLineColor()}`} />}
    </div>
  );
}

function TimelineStep({
  step,
  isLast,
}: {
  step: TxTimelineStep;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-3" data-testid={`timeline-step-${step.status}`}>
      <TimelineStepIcon step={step} isLast={isLast} />
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        <p
          className={`text-sm font-medium ${
            step.isCompleted || step.isActive
              ? 'text-gray-900'
              : 'text-gray-400'
          }`}
        >
          {step.label}
        </p>
        {step.timestamp && (
          <p className="text-xs text-gray-500 mt-0.5">
            {formatDateTime(step.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * TxDetailModal - Transaction detail view with lifecycle timeline
 *
 * Shows complete transaction information including:
 * - Transaction type and amounts
 * - Current status with TxStatusPill
 * - Visual lifecycle timeline
 * - Failure reasons when applicable
 *
 * Test selectors:
 * - data-testid="tx-detail-modal" - Modal container
 * - data-testid="tx-detail-type" - Transaction type
 * - data-testid="tx-detail-amount" - Amount display
 * - data-testid="tx-detail-timeline" - Timeline container
 * - data-testid="tx-detail-failure-reason" - Failure reason (if applicable)
 */
export function TxDetailModal({
  transaction,
  isOpen,
  onClose,
  simulated = false,
  resultingBalance,
}: TxDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !transaction) return null;

  const timelineSteps = simulated ? [] : generateTimelineSteps(transaction);
  const signedAmount = `${transaction.type === 'DEPOSIT' ? '+' : '−'}$${transaction.amountUSD.toFixed(2)}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      aria-describedby={simulated ? 'tx-detail-description' : undefined}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        data-testid="tx-detail-backdrop"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          tabIndex={-1}
          data-testid="tx-detail-modal"
          className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all w-full max-w-md"
        >
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
                data-testid="tx-detail-type"
              >
                {simulated
                  ? transaction.type === 'DEPOSIT'
                    ? 'Simulated deposit'
                    : 'Simulated withdrawal'
                  : transaction.type === 'DEPOSIT'
                    ? 'Deposit'
                    : 'Withdrawal'}
              </h3>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
                onClick={onClose}
                data-testid="tx-detail-close"
                aria-label="Close activity detail"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-6">
            {/* Amount and Status */}
            <div className="flex items-center justify-between gap-4">
              <div data-testid="tx-detail-amount">
                {simulated ? (
                  <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">
                    Simulated amount
                  </p>
                ) : null}
                <p className="text-3xl font-bold text-gray-900">
                  {simulated
                    ? signedAmount
                    : `$${transaction.amountUSD.toFixed(2)}`}
                </p>
                {transaction.amountZMW !== undefined && transaction.amountZMW > 0 ? (
                  <p className="text-sm text-gray-500 mt-1">
                    {transaction.amountZMW.toFixed(2)} ZMW
                  </p>
                ) : null}
              </div>
              {!simulated ? (
                <TxStatusPill status={transaction.status} size="md" />
              ) : null}
            </div>

            {simulated ? (
              <dl className="divide-y divide-hedgr-100 border-y border-hedgr-100 text-sm">
                <div className="flex items-start justify-between gap-4 py-3">
                  <dt className="text-hedgr-500">Time</dt>
                  <dd className="text-right font-medium text-hedgr-800">
                    <time dateTime={new Date(transaction.createdAt).toISOString()}>
                      {formatDateTime(transaction.createdAt)}
                    </time>
                  </dd>
                </div>
                {resultingBalance !== undefined ? (
                  <div className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-hedgr-500">Resulting position</dt>
                    <dd
                      className="font-semibold tabular-nums text-hedgr-800"
                      data-testid="tx-detail-resulting-position"
                    >
                      ${resultingBalance.toFixed(2)}
                    </dd>
                  </div>
                ) : null}
                <div className="py-3">
                  <dt className="text-hedgr-500">Context</dt>
                  <dd className="mt-1 leading-relaxed text-hedgr-dark">
                    {transaction.type === 'DEPOSIT'
                      ? 'This event added to the illustrative position.'
                      : 'This event reduced the illustrative position.'}
                  </dd>
                </div>
              </dl>
            ) : (
              <>
                {/* Transaction ID */}
                <div className="rounded-lg bg-gray-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Transaction ID
                  </p>
                  <p
                    className="mt-1 truncate font-mono text-sm text-gray-700"
                    data-testid="tx-detail-id"
                  >
                    {transaction.id}
                  </p>
                </div>

                {/* Timeline */}
                <div data-testid="tx-detail-timeline">
                  <p className="mb-4 text-xs uppercase tracking-wide text-gray-500">
                    Timeline
                  </p>
                  <div className="pl-1">
                    {timelineSteps.map((step, index) => (
                      <TimelineStep
                        key={step.status}
                        step={step}
                        isLast={index === timelineSteps.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Failure Reason */}
            {transaction.failureReason && (
              <div
                className="rounded-lg bg-red-50 border border-red-100 px-4 py-3"
                data-testid="tx-detail-failure-reason"
              >
                <p className="text-xs text-red-600 uppercase tracking-wide">
                  Reason
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {transaction.failureReason}
                </p>
              </div>
            )}

            {/* Note */}
            {transaction.note && (
              <div
                className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3"
                data-testid="tx-detail-note"
              >
                <p className="text-xs text-blue-600 uppercase tracking-wide">
                  Note
                </p>
                <p className="text-sm text-blue-700 mt-1">{transaction.note}</p>
              </div>
            )}
            {simulated ? (
              <p
                id="tx-detail-description"
                className="rounded-lg border border-hedgr-200 bg-hedgr-100/50 px-4 py-3 text-sm leading-relaxed text-hedgr-dark"
                data-testid="tx-detail-simulation-note"
              >
                Illustrative evidence only. No real money moved.
              </p>
            ) : null}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-6 py-4">
            <button
              type="button"
              className="min-h-11 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TxDetailModal;
