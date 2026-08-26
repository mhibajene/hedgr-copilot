"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EngineAllocationBands } from "./EngineAllocationBands";
import { EnginePostureHeader } from "./EnginePostureHeader";
import { EngineProtectiveGuidance } from "./EngineProtectiveGuidance";
import { EngineStabilityExplainer } from "./EngineStabilityExplainer";
import { EngineStabilityReviewSnapshot } from "./EngineStabilityReviewSnapshot";
import { useBalance } from "../../../lib/hooks/useBalance";
import { defiAdapter } from "../../../lib/defi";
import { useLedgerStore } from "../../../lib/state/ledger";
import { useWalletStore } from "../../../lib/state/wallet";
import { EmptyState, ErrorState } from "@hedgr/ui";
import {
  BalanceWithLocalEstimate,
  PolicyDisclosure,
} from "../../../components";
import { useEngineState } from "../../../lib/engine/useEngineState";
import { usePolicy } from "../../../lib/policy/usePolicy";
import {
  PublicTxStatus,
  txToLifecycle,
  type TxLifecycle,
} from "../../../lib/tx";
import { isCopilotEnabled } from "../../../config/env";
import {
  CLASS_A_VAL_002_DASHBOARD_PATH,
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  getSyntheticJourneyHref,
  isSyntheticJourneyPrimaryCondition,
} from "../../../lib/state/synthetic-journey";

function formatActivityDayLabel(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function activityTitle(
  tx: TxLifecycle,
  syntheticJourneyActive: boolean
): string {
  const title = tx.type === "DEPOSIT" ? "Deposit" : "Withdrawal";
  return syntheticJourneyActive ? `Simulated ${title.toLowerCase()}` : title;
}

type SyntheticComparisonState = "empty" | "first-event" | "change";

function signedAmount(tx: TxLifecycle): number {
  return tx.type === "DEPOSIT" ? tx.amountUSD : -tx.amountUSD;
}

function formatSignedUSD(value: number): string {
  const sign = value >= 0 ? "+" : "−";
  return `${sign}$${Math.abs(value).toFixed(2)}`;
}

export default function DashboardPage() {
  const { total, available, pending, isLoading, error, currency, refresh } =
    useBalance();
  const engineState = useEngineState();
  const { isFeatureEnabled } = usePolicy();
  const transactions = useLedgerStore((s) => s.transactions);
  const clearTransactions = useLedgerStore((s) => s.clear);
  const resetWallet = useWalletStore((s) => s.reset);
  const [apy, setApy] = useState<number | null>(null);
  const [apyError, setApyError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const syntheticJourneyActive = isSyntheticJourneyPrimaryCondition(
    searchParams?.toString(),
    pathname
  );
  const explicitSyntheticJourney =
    syntheticJourneyActive &&
    (pathname === CLASS_A_VAL_002_DASHBOARD_PATH ||
      searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
        CLASS_A_VAL_002_JOURNEY_VALUE);

  useEffect(() => {
    defiAdapter
      .getNetApy()
      .then(setApy)
      .catch(() => setApyError("Unable to load APY"));
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  const hasNoTransactions = transactions.length === 0;
  const isFirstTimeUser =
    ready && hasNoTransactions && available === 0 && !isLoading;
  const hasSyntheticFixtureState =
    ready && !isLoading && (!hasNoTransactions || available !== 0);

  const restartSyntheticJourney = () => {
    if (!syntheticJourneyActive) return;

    const confirmed = window.confirm(
      "Restart the simulated journey? This clears only the simulated balance and Activity stored on this device. No real money or external records are affected."
    );
    if (!confirmed) return;

    clearTransactions();
    resetWallet();
  };

  const recentActivity = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => b.created_at - a.created_at
    );
    return sorted.slice(0, 3).map(txToLifecycle);
  }, [transactions]);

  const completedSyntheticActivity = useMemo(
    () =>
      transactions
        .map(txToLifecycle)
        .filter((tx) => tx.status === PublicTxStatus.SUCCESS)
        .sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id)),
    [transactions]
  );

  const syntheticComparison = useMemo(() => {
    const completedCount = completedSyntheticActivity.length;
    const comparisonState: SyntheticComparisonState =
      completedCount === 0
        ? "empty"
        : completedCount === 1
        ? "first-event"
        : "change";
    const lastEvent = completedSyntheticActivity.at(-1);
    const currentPosition = completedSyntheticActivity.reduce(
      (sum, tx) => sum + signedAmount(tx),
      0
    );
    const previousPosition = lastEvent
      ? currentPosition - signedAmount(lastEvent)
      : 0;

    return {
      comparisonState,
      lastEvent,
      previousPosition: +previousPosition.toFixed(2),
      currentPosition: +currentPosition.toFixed(2),
    };
  }, [completedSyntheticActivity]);

  const balanceHero = (
    <section
      className="space-y-2"
      aria-labelledby="dashboard-total-balance-label"
      data-testid="dashboard-balance"
    >
      <p
        id="dashboard-total-balance-label"
        className="text-xs font-semibold uppercase tracking-[0.12em] text-hedgr-500"
      >
        {syntheticJourneyActive ? "Your current position" : "Total balance"}
      </p>
      {isLoading ? (
        <div className="text-4xl font-semibold tabular-nums tracking-tight text-hedgr-800 sm:text-[2.75rem] sm:leading-tight">
          …
        </div>
      ) : (
        <BalanceWithLocalEstimate
          usdAmount={ready ? total : 0}
          data-testid="usd-balance"
          className="text-4xl font-semibold tabular-nums tracking-tight text-hedgr-800 sm:text-[2.75rem] sm:leading-tight"
        />
      )}
      {syntheticJourneyActive && ready && !isLoading ? (
        <p
          className="max-w-md pt-1 text-sm leading-relaxed text-hedgr-dark"
          data-testid="dashboard-synthetic-balance-explainer"
        >
          Simulation only. Not a real balance. No money is held or moved.
        </p>
      ) : null}
      {ready && !isLoading && total !== available ? (
        <p className="pt-1 text-sm text-hedgr-500">
          Available now:{" "}
          <span className="font-medium text-hedgr-dark tabular-nums">
            ${available.toFixed(2)}
          </span>
          {pending !== 0 ? (
            <span className="text-hedgr-400">
              {" "}
              · Pending {pending > 0 ? "+" : ""}
              {pending.toFixed(2)} {currency}
            </span>
          ) : null}
        </p>
      ) : null}
    </section>
  );

  const syntheticChangeEvidence = (
    <section
      className="space-y-3"
      aria-labelledby="dashboard-change-evidence-heading"
      data-testid="dashboard-change-evidence"
      data-comparison-state={syntheticComparison.comparisonState}
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hedgr-500">
          What changed
        </p>
        <h2
          id="dashboard-change-evidence-heading"
          className="text-base font-semibold tracking-tight text-hedgr-800"
        >
          {syntheticComparison.comparisonState === "empty"
            ? "Nothing to compare yet"
            : syntheticComparison.comparisonState === "first-event"
            ? "Your first position is now visible"
            : "The current position reconciles to the change"}
        </h2>
      </div>

      {syntheticComparison.comparisonState === "empty" ? (
        <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark">
          Complete the first simulated event to create a starting point.
        </p>
      ) : (
        <div
          className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center"
          aria-label={`Position changed from $${syntheticComparison.previousPosition.toFixed(
            2
          )} by ${formatSignedUSD(
            signedAmount(syntheticComparison.lastEvent!)
          )} to $${syntheticComparison.currentPosition.toFixed(2)}`}
        >
          <div className="rounded-2xl bg-hedgr-100/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-hedgr-500">
              {syntheticComparison.comparisonState === "first-event"
                ? "Started at"
                : "Before"}
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-hedgr-800">
              ${syntheticComparison.previousPosition.toFixed(2)}
            </p>
          </div>
          <span className="hidden text-hedgr-400 sm:block" aria-hidden="true">
            →
          </span>
          <div className="rounded-2xl border border-hedgr-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-hedgr-500">
              {syntheticComparison.lastEvent?.type === "DEPOSIT"
                ? "Simulated deposit"
                : "Simulated expense"}
            </p>
            <p
              className="mt-1 text-xl font-semibold tabular-nums text-hedgr-800"
              data-testid="dashboard-change-delta"
            >
              {formatSignedUSD(signedAmount(syntheticComparison.lastEvent!))}
            </p>
          </div>
          <span className="hidden text-hedgr-400 sm:block" aria-hidden="true">
            →
          </span>
          <div className="rounded-2xl border border-hedgr-primary bg-hedgr-100/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-hedgr-500">
              Now
            </p>
            <p
              className="mt-1 text-xl font-semibold tabular-nums text-hedgr-800"
              data-testid="dashboard-change-result"
            >
              ${syntheticComparison.currentPosition.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {syntheticComparison.comparisonState !== "empty" ? (
        <Link
          href={getSyntheticJourneyHref("/activity")}
          className="inline-flex text-sm font-medium text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
          data-testid="dashboard-balance-evidence"
        >
          View the completed-event evidence
        </Link>
      ) : null}
    </section>
  );

  const currentOverview = (
    <section
      aria-label={
        syntheticJourneyActive
          ? "Current simulation overview"
          : "Current account overview"
      }
      className="rounded-3xl border border-hedgr-200 bg-white p-5 sm:p-7"
      data-testid="dashboard-current-overview"
    >
      {syntheticJourneyActive ? (
        <div className="space-y-6">
          {balanceHero}
          <div className="border-t border-hedgr-100 pt-6">
            {syntheticChangeEvidence}
          </div>
          <div className="border-t border-hedgr-100 pt-6">
            <EnginePostureHeader
              engineState={engineState}
              syntheticJourneyActive
              comparisonState={syntheticComparison.comparisonState}
              latestChangeType={syntheticComparison.lastEvent?.type}
              latestChangeAmountUSD={
                syntheticComparison.lastEvent
                  ? syntheticComparison.lastEvent.amountUSD
                  : undefined
              }
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(13rem,0.8fr)] sm:gap-6">
          <div>{balanceHero}</div>
          <div className="border-t border-hedgr-100 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <EnginePostureHeader engineState={engineState} />
          </div>
        </div>
      )}
    </section>
  );

  const educationSection = syntheticJourneyActive ? null : (
    <section
      className="space-y-4"
      aria-labelledby="dashboard-education-heading"
      data-testid="dashboard-education"
    >
      <div className="space-y-1">
        <h2
          id="dashboard-education-heading"
          className="text-base font-semibold tracking-tight text-hedgr-800"
        >
          Educational content
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-hedgr-500">
          Open these explanations when you want more context about the existing
          stability structure.
        </p>
      </div>
      <div className="space-y-3">
        <EngineProtectiveGuidance />
        <EngineStabilityExplainer />
      </div>
    </section>
  );

  const syntheticActions = syntheticJourneyActive ? (
    <section
      className="space-y-4 rounded-3xl border border-hedgr-200 bg-white p-5 sm:p-6"
      aria-labelledby="dashboard-optional-actions-heading"
      data-testid="dashboard-optional-actions"
    >
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hedgr-500">
          Optional next step
        </p>
        <h2
          id="dashboard-optional-actions-heading"
          className="text-base font-semibold tracking-tight text-hedgr-800"
        >
          What happens next is your decision
        </h2>
      </div>
      <div
        className="grid gap-3 sm:grid-cols-2"
        data-testid={
          syntheticComparison.comparisonState === "empty"
            ? "dashboard-empty-state"
            : undefined
        }
      >
        <Link
          href={
            syntheticComparison.comparisonState === "empty"
              ? getSyntheticJourneyHref("/deposit")
              : getSyntheticJourneyHref("/activity")
          }
          className="rounded-2xl bg-hedgr-primary p-4 text-white transition-colors hover:bg-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
        >
          <span className="block text-sm font-semibold">
            {syntheticComparison.comparisonState === "empty"
              ? "Start first simulated event"
              : "Review what changed"}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-hedgr-100">
            {syntheticComparison.comparisonState === "empty"
              ? "Create a starting point when you are ready."
              : "See every completed event and its resulting position."}
          </span>
        </Link>
        <div className="rounded-2xl border border-hedgr-200 bg-hedgr-100/40 p-4">
          <h3 className="text-sm font-semibold text-hedgr-800">Do nothing</h3>
          <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
            Stay with the current position. No action is required by this
            simulation.
          </p>
        </div>
      </div>
      {isCopilotEnabled() && syntheticComparison.comparisonState !== "empty" ? (
        <Link
          href="/chat"
          className="inline-flex text-sm font-medium text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
          data-testid="dashboard-copilot-context-link"
        >
          Ask Copilot about this change
        </Link>
      ) : null}
    </section>
  ) : null;

  const disclosureSection = (
    <details
      className="rounded-2xl border border-hedgr-200 bg-white p-5"
      data-testid="dashboard-disclosures"
    >
      <summary className="cursor-pointer list-none font-medium text-hedgr-800 marker:content-none select-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-4">
          <span>Important disclosures</span>
          <span className="text-xs font-medium uppercase tracking-wide text-hedgr-500">
            View
          </span>
        </span>
      </summary>
      <div className="mt-4 border-t border-hedgr-100 pt-4">
        <PolicyDisclosure
          context={syntheticJourneyActive ? "synthetic-research" : "default"}
        />
      </div>
    </details>
  );

  if (error) {
    return (
      <main className="p-4 sm:p-8">
        <div
          className={`mx-auto space-y-6 sm:space-y-8 ${
            syntheticJourneyActive ? "max-w-5xl" : "max-w-2xl"
          }`}
        >
          {currentOverview}
          <EngineAllocationBands
            engineState={engineState}
            collapsed={syntheticJourneyActive}
          />
          {!syntheticJourneyActive ? (
            <EngineStabilityReviewSnapshot engineState={engineState} />
          ) : null}
          <ErrorState
            title="Unable to load your balance"
            description="We couldn't fetch your account balance. Please try again."
            primaryAction={{ label: "Retry", onClick: refresh }}
            data-testid="dashboard-error-state"
          />
          {educationSection}
          {disclosureSection}
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-8">
      <div
        className={`mx-auto space-y-6 sm:space-y-8 ${
          syntheticJourneyActive ? "max-w-5xl" : "max-w-2xl"
        }`}
      >
        {!syntheticJourneyActive ? (
          <h1 className="sr-only">Dashboard</h1>
        ) : null}
        {syntheticJourneyActive ? (
          <section
            aria-labelledby="dashboard-orientation-heading"
            className="space-y-2"
            data-testid="dashboard-orientation"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-hedgr-500">
              Financial position
            </p>
            <h1
              id="dashboard-orientation-heading"
              className="text-2xl font-semibold tracking-tight text-hedgr-800 sm:text-3xl"
            >
              See what you have and what changed.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark">
              Hedgr helps you understand and maintain your financial stability.
              This simulation provides context, not an instruction or proof that
              money moved.
            </p>
          </section>
        ) : null}

        {currentOverview}

        {isFirstTimeUser && !syntheticJourneyActive && (
          <div
            className="rounded-2xl border border-hedgr-200 bg-hedgr-100/60 p-5 text-hedgr-800 sm:p-6"
            data-testid="dashboard-empty-state"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-hedgr-500">
                  Primary journey action
                </p>
                <h2 className="mt-1 text-lg font-semibold text-hedgr-800">
                  See your position clearly
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
                  Start by exploring a deposit when you are ready. Your balance
                  and activity will appear here once you begin.
                </p>
              </div>
              <Link
                href="/deposit"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-hedgr-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 focus:ring-offset-hedgr-100"
              >
                Make your first deposit
              </Link>
            </div>
          </div>
        )}

        {syntheticJourneyActive || !isFirstTimeUser ? (
          <EngineAllocationBands
            engineState={engineState}
            collapsed={syntheticJourneyActive}
          />
        ) : null}

        {syntheticActions}

        {syntheticJourneyActive && hasSyntheticFixtureState && (
          <section
            className="rounded-2xl border border-hedgr-200 bg-hedgr-100/40 p-5 text-hedgr-800 sm:p-6"
            data-testid="dashboard-restart-journey"
            aria-labelledby="dashboard-restart-journey-heading"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-lg">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-hedgr-500">
                  Simulated journey replay
                </p>
                <h2
                  id="dashboard-restart-journey-heading"
                  className="mt-1 text-base font-semibold text-hedgr-800"
                >
                  Run the simulated journey again
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
                  Restarting removes only this device&apos;s simulated position
                  and Activity so the example begins again at $0. No real money
                  or external records are affected.
                </p>
              </div>
              <button
                type="button"
                onClick={restartSyntheticJourney}
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-hedgr-200 bg-white px-4 py-2.5 text-sm font-semibold text-hedgr-800 transition-colors hover:border-hedgr-300 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
              >
                Restart simulated journey
              </button>
            </div>
          </section>
        )}

        {!syntheticJourneyActive ? (
          <EngineStabilityReviewSnapshot engineState={engineState} />
        ) : null}

        {!syntheticJourneyActive && !isFirstTimeUser && !hasNoTransactions && (
          <section
            className="border-t border-hedgr-200 pt-6"
            aria-labelledby="dashboard-recent-activity-heading"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2
                id="dashboard-recent-activity-heading"
                className="text-base font-semibold tracking-tight text-hedgr-800"
              >
                Recent activity
              </h2>
              <Link
                href="/activity"
                className="shrink-0 text-sm font-medium text-hedgr-600 underline-offset-2 hover:text-hedgr-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-hedgr-100 border-t border-hedgr-100">
              {recentActivity.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-hedgr-800">
                      {activityTitle(tx, false)}
                    </p>
                    <p className="text-sm text-hedgr-500">
                      {formatActivityDayLabel(tx.createdAt)}
                    </p>
                  </div>
                  <p
                    className={`shrink-0 tabular-nums text-sm font-semibold ${
                      tx.type === "DEPOSIT"
                        ? "text-hedgr-600"
                        : "text-hedgr-dark"
                    }`}
                  >
                    {tx.type === "DEPOSIT" ? "+" : "-"}$
                    {tx.amountUSD.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {educationSection}

        {(!syntheticJourneyActive || !explicitSyntheticJourney) &&
          isFeatureEnabled("earn") && (
            <div className="max-w-sm">
              <div
                className="rounded-xl border border-hedgr-200 bg-white p-4"
                data-testid="dashboard-earn-tile"
              >
                <div className="text-xs font-medium text-hedgr-500">
                  Return rate (context)
                </div>
                {apyError ? (
                  <div className="mt-1 text-xs font-medium text-hedgr-800">
                    {apyError}
                  </div>
                ) : (
                  <div className="mt-1 text-xl font-semibold tabular-nums text-hedgr-dark">
                    {apy !== null ? `${(apy * 100).toFixed(2)}%` : "n/a"}
                  </div>
                )}
              </div>
            </div>
          )}

        {!syntheticJourneyActive && !isFirstTimeUser && hasNoTransactions && (
          <div className="rounded-2xl border border-hedgr-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Nothing needs action</h2>
            <EmptyState
              title="Nothing has changed"
              description="Nothing has changed that requires a decision. Check again when you want an update."
              className="py-8"
              data-testid="dashboard-no-actions"
            />
          </div>
        )}

        {disclosureSection}
      </div>
    </main>
  );
}
