"use client";

import { formatSimulationDisplayEstimate, getSimulationDisplayRate, useSimulationDisplayCurrency } from "../../../lib/state/simulation-display-currency";
import finish from '../product-finish.module.css';
import home from './synthetic-home.module.css';
import { SimulationDisplayCurrencySelector } from '../../../components/SimulationDisplayCurrencySelector';

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EngineAllocationBands } from "./EngineAllocationBands";
import { EnginePostureHeader } from "./EnginePostureHeader";
import { CurrencyInsight } from "./CurrencyInsight";
import { EngineProtectiveGuidance } from "./EngineProtectiveGuidance";
import { EngineStabilityExplainer } from "./EngineStabilityExplainer";
import { EngineStabilityReviewSnapshot } from "./EngineStabilityReviewSnapshot";
import { useBalance } from "../../../lib/hooks/useBalance";
import { getBalanceMode } from "../../../lib/state/balance.mode";
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
import { getEnvironmentMode } from "../../../lib/env/mode";
import {
  PublicTxStatus,
  txToLifecycle,
  type TxLifecycle,
} from "../../../lib/tx";
import {
  CLASS_A_VAL_002_DASHBOARD_PATH,
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  getSyntheticJourneyHref,
  isSyntheticJourneyPrimaryCondition,
  isSyntheticJourneyResetRequested,
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

export default function DashboardPage() {
  const { total, available, pending, asOf, isLoading, error, currency, refresh } =
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
  const syntheticJourneyEligible = isSyntheticJourneyPrimaryCondition(
    searchParams?.toString(),
    pathname
  );
  const syntheticJourneyActive =
    syntheticJourneyEligible &&
    (pathname === CLASS_A_VAL_002_DASHBOARD_PATH ||
      searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
        CLASS_A_VAL_002_JOURNEY_VALUE);
  const displayCurrency = useSimulationDisplayCurrency(syntheticJourneyActive);
  const simulatedEnvironment = getEnvironmentMode() !== "live";
  const productSimulationActive =
    syntheticJourneyActive || simulatedEnvironment;
  const explicitSyntheticJourney =
    syntheticJourneyActive;
  const cleanStartRequested = isSyntheticJourneyResetRequested(
    searchParams?.toString()
  );

  useEffect(() => {
    defiAdapter
      .getNetApy()
      .then(setApy)
      .catch(() => setApyError("Unable to load APY"));
  }, []);

  useEffect(() => {
    if (cleanStartRequested) {
      clearTransactions();
      resetWallet();
      window.history.replaceState(
        window.history.state,
        "",
        CLASS_A_VAL_002_DASHBOARD_PATH
      );
    }
    setReady(true);
  }, [cleanStartRequested, clearTransactions, resetWallet]);

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

    return {
      comparisonState,
      lastEvent,
    };
  }, [completedSyntheticActivity]);

  // Wait for the existing balance projection and preference hydration. After reset,
  // the ledger can be empty one render before useBalance publishes the cleared total.
  const currencyContextVisible = syntheticJourneyActive && ready && asOf > 0 &&
    !isLoading && !error &&
    (!cleanStartRequested || (hasNoTransactions && total === 0)) &&
    !(getBalanceMode() === "ledger" && hasNoTransactions && Number.isFinite(total) && total > 0);
  const currencyComparisonPending = pending !== 0 || total !== available ||
    transactions.some((tx) => tx.status === "pending");

  const balanceHero = (
    <section
      className={`space-y-1 ${home.position}`}
      aria-labelledby="dashboard-total-balance-label"
      data-testid="dashboard-balance"
    >
      <div className={home.balanceHeading}>
        <p
          id="dashboard-total-balance-label"
          className="text-xs font-semibold tracking-tight text-hedgr-800"
        >
          {syntheticJourneyActive ? "Simulated balance" : "Your current position"}
        </p>
        {syntheticJourneyActive ? <SimulationDisplayCurrencySelector placement="position" /> : null}
      </div>
      {isLoading ? (
        <div className={`${home.amount} tabular-nums`}>
          …
        </div>
      ) : (
        <BalanceWithLocalEstimate
          usdAmount={ready && !cleanStartRequested ? total : 0}
          displayEstimate={syntheticJourneyActive ? formatSimulationDisplayEstimate(ready && !cleanStartRequested ? total : 0, displayCurrency) : undefined}
          data-testid="usd-balance"
          className={`${home.amount} tabular-nums`}
        />
      )}
      {syntheticJourneyActive ? <p className={home.balanceCaption} data-testid="dashboard-synthetic-balance-explainer">Illustrative simulation value only.</p> : null}
      {productSimulationActive && !syntheticJourneyActive && ready && !isLoading ? (
        <p
          className={home.balanceCaption}
          data-testid="dashboard-synthetic-balance-explainer"
        >
          Illustrative position only.
        </p>
      ) : null}
      {ready && !isLoading && total !== available ? (
        <p className={home.available}>
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

  const productRouteHref = (
    route: "/deposit" | "/withdraw" | "/activity"
  ) => (syntheticJourneyActive ? getSyntheticJourneyHref(route) : route);

  const homeUtilities = (
    <nav
      aria-label="Simulation utilities"
      className={home.utilities}
      data-testid="dashboard-simulation-utilities"
    >
      <Link
        href={productRouteHref("/deposit")}
        className={home.utility}
        data-testid="dashboard-add-simulated-deposit"
      >
        <Image
          src="/icons/add-simulated-deposit.png"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="h-9 w-9 shrink-0 object-contain"
        />
        <span className="text-sm font-semibold leading-snug sm:text-base">
          Add simulated deposit
        </span>
      </Link>
      <Link
        href={productRouteHref("/activity")}
        className={home.utility}
        data-testid="dashboard-view-activity"
      >
        <Image
          src="/icons/view-activity.png"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="h-9 w-9 shrink-0 object-contain"
        />
        <span className="whitespace-nowrap text-sm font-semibold leading-snug sm:text-base">
          View Activity
        </span>
      </Link>
      {!syntheticJourneyActive ? (
        <Link
          href={productRouteHref("/withdraw")}
          className={`${home.utility} col-span-full`}
          data-testid="dashboard-simulated-withdraw"
        >
          Simulate a withdrawal
        </Link>
      ) : null}
    </nav>
  );

  const observation = (
    <div className={home.observation}>
      <EnginePostureHeader
        redesigned={syntheticJourneyActive}
        engineState={engineState}
        currencyContextVisible={currencyContextVisible}
        syntheticJourneyActive
        comparisonState={syntheticComparison.comparisonState}
        latestChangeType={syntheticComparison.lastEvent?.type}
        latestChangeAmountUSD={syntheticComparison.lastEvent?.amountUSD}
      />
    </div>
  );

  const currencyContext = currencyContextVisible ? (
    <CurrencyInsight
      redesigned
      usdAmount={total}
      currency={displayCurrency}
      latestDisplayRate={getSimulationDisplayRate(displayCurrency)}
      ready={currencyContextVisible}
      pending={currencyComparisonPending}
    />
  ) : null;

  const currentOverview = (
    <section
      aria-label={
        productSimulationActive
          ? "Current simulation overview"
          : "Current account overview"
      }
      className={home.overview}
      data-testid="dashboard-current-overview"
    >
      {syntheticJourneyActive ? (
        <div className={home.overviewGrid}>
          <div className={home.positionPanel}>
            {balanceHero}
            {homeUtilities}
          </div>
          <div className={home.insights}>
            {observation}
            {currencyContext}
          </div>
        </div>
      ) : productSimulationActive ? (
        <div className={home.overviewGrid}>
          <div className={home.positionPanel}>{balanceHero}{homeUtilities}</div>
          <div className={home.insights}>
          {recentActivity[0] ? (
            <section
              className="flex flex-wrap items-baseline justify-between gap-4 border-y border-hedgr-100 py-3"
              aria-label="Latest simulated change"
              data-testid="dashboard-change-evidence"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
                  Latest change
                </p>
                <p className="mt-1 text-sm font-semibold text-hedgr-800">
                  {activityTitle(recentActivity[0], true)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-hedgr-800">
                {recentActivity[0].type === "DEPOSIT" ? "+" : "-"}$
                {recentActivity[0].amountUSD.toFixed(2)}
              </p>
            </section>
          ) : null}
          {observation}
          {currencyContext}
          </div>
        </div>
      ) : (
        <div className={home.overviewGrid}>
          <div className={home.positionPanel}>{balanceHero}</div>
          <div className={home.observation}>
            <EnginePostureHeader engineState={engineState} />
          </div>
        </div>
      )}
    </section>
  );

  const educationSection = syntheticJourneyActive ? null : (
    <details
      className="border-y border-hedgr-100 bg-white py-2"
      data-testid="dashboard-education"
    >
      <summary className="flex min-h-11 flex-wrap cursor-pointer list-none items-center justify-between gap-4 font-medium text-hedgr-800 marker:content-none select-none [&::-webkit-details-marker]:hidden">
        <span>How Hedgr interprets stability</span>
        <span className="text-xs font-medium uppercase tracking-wide text-hedgr-500">
          View
        </span>
      </summary>
      <div className="mt-4 space-y-3 border-t border-hedgr-100 pt-4">
        <EngineStabilityReviewSnapshot engineState={engineState} />
        <EngineProtectiveGuidance />
        <EngineStabilityExplainer />
      </div>
    </details>
  );

  const accordionChevron = (
    <span className={home.chevron} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false">
        <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const disclosureSection = (
    <details
      className={home.accordion}
      data-testid="dashboard-disclosures"
    >
      <summary className={home.accordionSummary}><span>Important disclosures</span>{accordionChevron}</summary>
      <div className={home.accordionContent}>
        <PolicyDisclosure
          context={syntheticJourneyActive ? "synthetic-research" : "default"}
        />
      </div>
    </details>
  );

  if (error) {
    return (
      <main className={home.page}>
        <div
          className={`mx-auto space-y-6 sm:space-y-8 ${
            productSimulationActive ? "max-w-5xl" : "max-w-2xl"
          }`}
        >
          {currentOverview}
          <EngineAllocationBands
            engineState={engineState}
            collapsed={productSimulationActive}
          />
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
    <main className={home.page}>
      <div
        className={home.content}
      >
        <section
          aria-labelledby="dashboard-orientation-heading"
          className="space-y-0.5 pb-1 sm:space-y-2"
          data-testid="dashboard-orientation"
        >
          {!syntheticJourneyActive ? <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-hedgr-500">Financial position</p> : null}
          <h1
            id="dashboard-orientation-heading"
            className="text-xl font-bold tracking-tight text-hedgr-800 sm:text-4xl"
          >
            {syntheticJourneyActive ? "Your position" : "See what you have and what changed."}
          </h1>
          {!syntheticJourneyActive ? <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark">
            Hedgr helps you understand and maintain your financial stability.{' '}
            {syntheticJourneyActive
              ? 'This walkthrough provides context, not an instruction.'
              : productSimulationActive
                ? 'This simulated experience provides context, not an instruction.'
                : 'This experience provides context, not an instruction.'}
          </p> : null}
        </section>

        {currentOverview}

        {isFirstTimeUser && !productSimulationActive && (
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

        {syntheticJourneyActive ? (
          <div className={home.support}>
            <details className={home.accordion} data-testid="research-planning-targets">
              <summary className={home.accordionSummary}>
                <span>Planning targets<span className={home.accordionSubtitle}>Targets only · No money moved</span></span>
                {accordionChevron}
              </summary>
              <div className={home.accordionContent}><EngineAllocationBands engineState={engineState} collapsed /></div>
            </details>
            {disclosureSection}
          </div>
        ) : productSimulationActive || !isFirstTimeUser ? (
          <EngineAllocationBands engineState={engineState} collapsed={productSimulationActive} />
        ) : null}



        {syntheticJourneyActive && hasSyntheticFixtureState && (
          <section
            className={`${finish.replay} text-hedgr-800`}
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
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-hedgr-200 bg-white px-4 py-2.5 text-sm font-semibold text-hedgr-800 transition-colors hover:border-hedgr-300 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
              >
                Restart simulated journey
              </button>
            </div>
          </section>
        )}

        {!syntheticJourneyActive && !isFirstTimeUser && !hasNoTransactions && (
          <section
            className="border-t border-hedgr-200 pt-6"
            aria-labelledby="dashboard-recent-activity-heading"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
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
                  className="flex flex-wrap items-baseline justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-hedgr-800">
                      {activityTitle(tx, productSimulationActive)}
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

        {!productSimulationActive && !isFirstTimeUser && hasNoTransactions && (
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

        {!syntheticJourneyActive ? disclosureSection : null}
      </div>
    </main>
  );
}
