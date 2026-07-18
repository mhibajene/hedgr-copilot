"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EngineAllocationBands } from "./EngineAllocationBands";
import { EnginePostureHeader } from "./EnginePostureHeader";
import { EngineProtectiveGuidance } from "./EngineProtectiveGuidance";
import { EngineStabilityExplainer } from "./EngineStabilityExplainer";
import { EngineStabilityReviewSnapshot } from "./EngineStabilityReviewSnapshot";
import { useBalance } from "../../../lib/hooks/useBalance";
import { defiAdapter } from "../../../lib/defi";
import { useLedgerStore } from "../../../lib/state/ledger";
import { EmptyState, ErrorState } from "@hedgr/ui";
import {
  BalanceWithLocalEstimate,
  PolicyDisclosure,
} from "../../../components";
import { useEngineState } from "../../../lib/engine/useEngineState";
import { usePolicy } from "../../../lib/policy/usePolicy";
import { txToLifecycle, type TxLifecycle } from "../../../lib/tx";
import {
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
  return syntheticJourneyActive ? `Synthetic ${title.toLowerCase()}` : title;
}

export default function DashboardPage() {
  const { total, available, pending, isLoading, error, currency, refresh } =
    useBalance();
  const engineState = useEngineState();
  const { isFeatureEnabled } = usePolicy();
  const transactions = useLedgerStore((s) => s.transactions);
  const [apy, setApy] = useState<number | null>(null);
  const [apyError, setApyError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const syntheticJourneyActive = isSyntheticJourneyPrimaryCondition();

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

  const recentActivity = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => b.created_at - a.created_at
    );
    return sorted.slice(0, 3).map(txToLifecycle);
  }, [transactions]);

  const balanceHero = (
    <section
      className="space-y-2"
      aria-labelledby="dashboard-total-balance-label"
      data-testid="dashboard-balance"
    >
      <p
        id="dashboard-total-balance-label"
        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4658A0]"
      >
        Total balance
      </p>
      {isLoading ? (
        <div className="text-4xl font-semibold tabular-nums tracking-tight text-[#171D35] sm:text-[2.75rem] sm:leading-tight">
          …
        </div>
      ) : (
        <BalanceWithLocalEstimate
          usdAmount={ready ? total : 0}
          data-testid="usd-balance"
          className="text-4xl font-semibold tabular-nums tracking-tight text-[#171D35] sm:text-[2.75rem] sm:leading-tight"
        />
      )}
      {ready && !isLoading && total !== available ? (
        <p className="pt-1 text-sm text-[#4658A0]">
          Available now:{" "}
          <span className="font-medium text-[#1F2937] tabular-nums">
            ${available.toFixed(2)}
          </span>
          {pending !== 0 ? (
            <span className="text-[#5F71B9]">
              {" "}
              · Pending {pending > 0 ? "+" : ""}
              {pending.toFixed(2)} {currency}
            </span>
          ) : null}
        </p>
      ) : null}
    </section>
  );

  const educationSection = (
    <section
      className="space-y-4"
      aria-labelledby="dashboard-education-heading"
      data-testid="dashboard-education"
    >
      <div className="space-y-1">
        <h2
          id="dashboard-education-heading"
          className="text-base font-semibold tracking-tight text-[#171D35]"
        >
          Educational content
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-[#4658A0]">
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

  const disclosureSection = (
    <details
      className="rounded-2xl border border-[#A6B0D8] bg-white p-5"
      data-testid="dashboard-disclosures"
    >
      <summary className="cursor-pointer list-none font-medium text-[#171D35] marker:content-none select-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-4">
          <span>Important disclosures</span>
          <span className="text-xs font-medium uppercase tracking-wide text-[#4658A0]">
            View
          </span>
        </span>
      </summary>
      <div className="mt-4 border-t border-[#CAD0E8] pt-4">
        <PolicyDisclosure />
      </div>
    </details>
  );

  if (error) {
    return (
      <main className="p-6 sm:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <EnginePostureHeader engineState={engineState} />
          {balanceHero}
          <EngineAllocationBands engineState={engineState} />
          <EngineStabilityReviewSnapshot engineState={engineState} />
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
    <main className="p-6 sm:p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <EnginePostureHeader engineState={engineState} />
        {balanceHero}

        {isFirstTimeUser && (
          <div
            className="rounded-2xl border border-[#A6B0D8] bg-[#CAD0E8] p-6 text-[#171D35]"
            data-testid="dashboard-empty-state"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 text-[#1F2747]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-[#171D35]">
                  {syntheticJourneyActive
                    ? "Explore a synthetic stability journey"
                    : "Welcome to Hedgr"}
                </h2>
                <p className="mt-1 text-sm text-[#1F2937]">
                  {syntheticJourneyActive
                    ? "Start with a simulated local-currency deposit, then make a simulated withdrawal and verify both fixture records in Activity. No real funds will move."
                    : "Get started by making your first deposit. Your balance and transaction history will appear here once you begin."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={
                      syntheticJourneyActive
                        ? getSyntheticJourneyHref("/deposit")
                        : "/deposit"
                    }
                    className="inline-flex items-center rounded-xl bg-[#1F2747] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#36447C] focus:outline-none focus:ring-2 focus:ring-[#4658A0] focus:ring-offset-2 focus:ring-offset-[#CAD0E8]"
                  >
                    {syntheticJourneyActive
                      ? "Start synthetic deposit"
                      : "Make your first deposit"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <EngineAllocationBands engineState={engineState} />

        <EngineStabilityReviewSnapshot engineState={engineState} />

        {!isFirstTimeUser && !hasNoTransactions && (
          <section
            className="border-t border-[#A6B0D8] pt-6"
            aria-labelledby="dashboard-recent-activity-heading"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2
                id="dashboard-recent-activity-heading"
                className="text-base font-semibold tracking-tight text-[#171D35]"
              >
                Recent activity
              </h2>
              <Link
                href="/activity"
                className="shrink-0 text-sm font-medium text-[#36447C] underline-offset-2 hover:text-[#1F2747] hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-[#CAD0E8] border-t border-[#CAD0E8]">
              {recentActivity.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[#171D35]">
                      {activityTitle(tx, syntheticJourneyActive)}
                    </p>
                    <p className="text-sm text-[#4658A0]">
                      {formatActivityDayLabel(tx.createdAt)}
                    </p>
                  </div>
                  <p
                    className={`shrink-0 tabular-nums text-sm font-semibold ${
                      tx.type === "DEPOSIT"
                        ? "text-[#36447C]"
                        : "text-[#1F2937]"
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

        {isFeatureEnabled("earn") && (
          <div className="max-w-sm">
            <div
              className="rounded-xl border border-[#A6B0D8] bg-white p-4"
              data-testid="dashboard-earn-tile"
            >
              <div className="text-xs font-medium text-[#4658A0]">
                APY (context)
              </div>
              {apyError ? (
                <div className="mt-1 text-xs font-medium text-[#171D35]">
                  {apyError}
                </div>
              ) : (
                <div className="mt-1 text-xl font-semibold tabular-nums text-[#1F2937]">
                  {apy !== null ? `${(apy * 100).toFixed(2)}%` : "—"}
                </div>
              )}
            </div>
          </div>
        )}

        {!isFirstTimeUser && hasNoTransactions && (
          <div className="rounded-2xl border border-[#A6B0D8] bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Recommended Actions</h2>
            <EmptyState
              title="No recommended actions"
              description="You're all caught up! Check back later for personalized recommendations."
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
