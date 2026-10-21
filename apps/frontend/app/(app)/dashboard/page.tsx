"use client";

import { getSimulationDisplayRate, setSimulationDisplayCurrency, useSimulationDisplayCurrency } from "../../../lib/state/simulation-display-currency";
import finish from '../product-finish.module.css';
import home from './synthetic-home.module.css';
import { SimulationDisplayCurrencySelector } from '../../../components/SimulationDisplayCurrencySelector';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { EngineAllocationBands } from "./EngineAllocationBands";
import { EnginePostureHeader } from "./EnginePostureHeader";
import { countChanges } from "./lineLabels";
import { PositionLine } from "./PositionLine";
import { ChartSourceAmountsContext } from "./ExampleLineChart";
import { clearSimulationReceipt } from "../simulation-receipt";
import { formatLocalCurrency } from "../../../lib/utils/money";
import { DanielExampleHome } from './DanielExampleHome';
import { SarahExampleHome } from './SarahExampleHome';
import { HomeHero } from './HomeHero';
import { RateLine } from './RateLine';
import { CurrencyInsight } from "./CurrencyInsight";
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
import { ENGINE_ILLUSTRATIVE_VALUES_LABEL } from "../../../lib/engine/stability-review-snapshot-copy";
import { usePolicy } from "../../../lib/policy/usePolicy";
import { getEnvironmentMode } from "../../../lib/env/mode";
import {
  buildPositionEntries,
  clearLastVisit,
  formatChangeCount,
  formatDateLine,
  formatShortDate,
  formatUsd,
  readLastVisit,
  summariseSinceLastVisit,
  writeLastVisit,
} from "../../../lib/state/last-visit";
import {
  PublicTxStatus,
  txToLifecycle,
  type TxLifecycle,
} from "../../../lib/tx";
import {
  CLASS_A_VAL_002_DANIEL_EXAMPLE,
  CLASS_A_VAL_002_SARAH_EXAMPLE,
  CLASS_A_VAL_002_DASHBOARD_PATH,
  CLASS_A_VAL_002_EXAMPLE_PARAM,
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_RESET_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  SYNTHETIC_JOURNEY_EXAMPLES,
  getSyntheticJourneyHref,
  isSyntheticJourneyPrimaryCondition,
  isSyntheticJourneyLinkContext,
  isSyntheticJourneyResetRequested,
  parseSyntheticJourneyExample,
} from "../../../lib/state/synthetic-journey";
import { DANIEL_HOME_READ, DANIEL_HOME_TIMELINE } from "../../../lib/state/daniel-home-fixture";
import { SARAH_HOME_READ } from "../../../lib/state/sarah-home-fixture";

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

// HOME-EXPERIENCE-001 T5: one restrained arrival motion after a confirmed change.
const ARRIVAL_SETTLE_MS = 600;

function motionAllowed(): boolean {
  if (typeof window === "undefined" || typeof window.requestAnimationFrame !== "function") return false;
  try {
    return typeof window.matchMedia === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

// Retired wallet balance mode (§344) left this key in some browsers. Nothing reads
// it; a journey reset removes it so no stale balance outlives the clean start.
function removeRetiredWalletBalance(): void {
  try {
    window.localStorage.removeItem("hedgr:wallet");
  } catch {
    // no-op
  }
}

export default function DashboardPage() {
  const { total, available, pending, asOf, isLoading, error, currency, refresh } =
    useBalance();
  const engineState = useEngineState();
  const { isFeatureEnabled } = usePolicy();
  const transactions = useLedgerStore((s) => s.transactions);
  const clearTransactions = useLedgerStore((s) => s.clear);
  const sourceAmounts = useMemo(() => new Map(transactions.flatMap(tx => tx.type === "deposit" && tx.source_local_amount !== undefined && tx.source_local_currency ? [[tx.txn_ref, formatLocalCurrency(tx.source_local_amount, tx.source_local_currency)] as const] : [])), [transactions]);
  const [apy, setApy] = useState<number | null>(null);
  const [apyError, setApyError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const syntheticJourneyLinkContext = isSyntheticJourneyLinkContext(searchParams?.toString(), pathname);
  const syntheticJourneyEligible = isSyntheticJourneyPrimaryCondition(
    searchParams?.toString(),
    pathname
  );
  const syntheticJourneyActive =
    syntheticJourneyEligible &&
    (pathname === CLASS_A_VAL_002_DASHBOARD_PATH ||
      searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
        CLASS_A_VAL_002_JOURNEY_VALUE);
  // §362: Daniel's reserve shows only on the journey Home, selected only by the URL.
  const selectedExample = parseSyntheticJourneyExample(searchParams?.toString());
  const danielExample =
    syntheticJourneyActive && selectedExample === CLASS_A_VAL_002_DANIEL_EXAMPLE;
  const sarahExample =
    syntheticJourneyActive && selectedExample === CLASS_A_VAL_002_SARAH_EXAMPLE;
  const exampleActive = danielExample || sarahExample;
  const displayCurrency = useSimulationDisplayCurrency(syntheticJourneyActive && !exampleActive);
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
      .catch(() => setApyError("Unable to load example yield"));
  }, []);

  useEffect(() => {
    if (cleanStartRequested || (sarahExample && searchParams?.has(CLASS_A_VAL_002_RESET_PARAM))) {
      // §374: eligible Sarah consumes reset while refusing all simulation writes.
      if (!sarahExample) {
        clearTransactions();
        clearSimulationReceipt();
        removeRetiredWalletBalance();
        if (searchParams?.get("study") === "1") setSimulationDisplayCurrency("ZMW");
      }
      const resetParams = new URLSearchParams(searchParams?.toString());
      resetParams.delete(CLASS_A_VAL_002_RESET_PARAM);
      resetParams.delete("study");
      const resetTarget = syntheticJourneyActive && selectedExample !== "own"
        ? `${pathname}?${resetParams.toString()}`
        : CLASS_A_VAL_002_DASHBOARD_PATH;
      window.history.replaceState(
        window.history.state,
        "",
        resetTarget
      );
    }
    setReady(true);
  }, [cleanStartRequested, clearTransactions, pathname, searchParams, selectedExample, syntheticJourneyActive, sarahExample]);

  // HOME-EXPERIENCE-001 T3: read the previous Home visit once, then record this one.
  // A journey reset only clears the value; the next ordinary Home visit records it.
  const [previousVisit, setPreviousVisit] = useState<number | null>(null);
  const [visitRead, setVisitRead] = useState(false);
  const [today, setToday] = useState<number | null>(null);
  const visitRecorded = useRef(false);
  // §362: an example never records a visit; arriving on one and returning records none either.
  const arrivedOnExample = useRef(exampleActive);
  useEffect(() => {
    if (exampleActive) {
      if (danielExample) setToday((current) => current ?? Date.now());
      return;
    }
    if (!productSimulationActive || visitRecorded.current) return;
    visitRecorded.current = true;
    const now = Date.now();
    if (cleanStartRequested) {
      clearLastVisit();
      setPreviousVisit(null);
    } else {
      setPreviousVisit(readLastVisit());
      if (!arrivedOnExample.current) writeLastVisit(now);
    }
    setToday(now);
    setVisitRead(true);
  }, [productSimulationActive, cleanStartRequested, exampleActive, danielExample]);

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
    removeRetiredWalletBalance();
    clearLastVisit();
    setPreviousVisit(null);
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
    !(hasNoTransactions && Number.isFinite(total) && total > 0);
  const currencyComparisonPending = pending !== 0 || total !== available ||
    transactions.some((tx) => tx.status === "pending");

  // T3 surfaces derive only from completed ledger entries (Activity order). They
  // appear only when that derivation agrees with the displayed balance; otherwise
  // Home keeps the existing observation.
  const positionEntries = useMemo(
    () => buildPositionEntries(transactions.map(txToLifecycle)),
    [transactions]
  );
  const positionLoading = productSimulationActive && (!ready || asOf === 0 || isLoading);
  const ledgerPosition = positionEntries.at(-1)?.balanceAfter ?? 0;
  const positionDerivable =
    productSimulationActive && ready && visitRead && !positionLoading && !error &&
    (!cleanStartRequested || (hasNoTransactions && total === 0)) &&
    !currencyComparisonPending && Math.abs(ledgerPosition - total) < 0.005;
  const normalPosture = engineState.posture === "normal";
  const firstUse = positionDerivable && transactions.length === 0;
  const sinceSummary =
    positionDerivable && previousVisit !== null && positionEntries.length > 0
      ? summariseSinceLastVisit(positionEntries, previousVisit)
      : null;
  // HOME-DEDUP-001 (§328 decision 3): while the observation explains one or several changes,
  // default-route Recent activity would repeat those entries, so it is hidden.
  const sinceChangesShown =
    normalPosture && !positionLoading && sinceSummary !== null && sinceSummary.kind !== "no-change";
  const sinceDelta =
    sinceSummary && sinceSummary.kind !== "no-change"
      ? +(sinceSummary.to - sinceSummary.from).toFixed(2)
      : 0;
  // Only the journey names its display currency explicitly; default Home omits the line.
  const estimateCurrency = syntheticJourneyActive ? displayCurrency : null;

  // T5 arrival: count from the last figure seen and settle the line.
  // Runs once per Home arrival, only for a confirmed change; reduced motion shows the end state.
  const arrivalChange =
    sinceSummary && normalPosture && sinceSummary.kind !== "no-change" && sinceDelta !== 0
      ? sinceSummary
      : null;
  const arrivalKey = arrivalChange ? `${arrivalChange.from}:${arrivalChange.to}` : "";
  const [arrivalPhase, setArrivalPhase] = useState<"idle" | "running" | "done">("idle");
  const [arrivalProgress, setArrivalProgress] = useState(0);
  const [arrivalAnnouncement, setArrivalAnnouncement] = useState("");
  const arrivalStarted = useRef(false);
  useEffect(() => {
    if (!arrivalKey || !arrivalChange || arrivalStarted.current) return;
    arrivalStarted.current = true;
    const change = +(arrivalChange.to - arrivalChange.from).toFixed(2);
    const sentence = syntheticJourneyActive
      ? `Your simulated balance is now ${formatUsd(arrivalChange.to)}. On your last visit it was ${formatUsd(arrivalChange.from)}.`
      : `Your position is now ${formatUsd(arrivalChange.to)}, ${formatUsd(change)} ${change > 0 ? "higher" : "lower"} than on your last visit.`;
    const finish = () => {
      setArrivalProgress(1);
      setArrivalPhase("done");
      setArrivalAnnouncement(sentence);
    };
    if (!motionAllowed()) {
      finish();
      return;
    }
    setArrivalPhase("running");
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ARRIVAL_SETTLE_MS);
      setArrivalProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = window.requestAnimationFrame(tick);
      else finish();
    };
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      finish();
    };
    // arrivalKey captures the only inputs that matter; the summary object is rebuilt each render.
  }, [arrivalKey, syntheticJourneyActive]);
  // Before the first frame, show the last-seen figure only when motion will actually run.
  const arrivalAnimating =
    arrivalChange !== null && arrivalPhase !== "done" && (arrivalPhase === "running" || motionAllowed());
  const arrivalSettle = arrivalAnimating ? arrivalProgress : 1;
  const displayedTotal = arrivalAnimating && arrivalChange
    ? +(arrivalChange.from + (arrivalChange.to - arrivalChange.from) * arrivalProgress).toFixed(2)
    : total;
  const trustHref = syntheticJourneyLinkContext
    ? `/settings/trust?${CLASS_A_VAL_002_JOURNEY_PARAM}=${CLASS_A_VAL_002_JOURNEY_VALUE}`
    : "/settings/trust";
  const openSimulationExplainer = () => {
    const details = document.querySelector<HTMLDetailsElement>(
      '[data-testid="simulation-technical-details"]'
    );
    if (!details) {
      window.location.assign(trustHref);
      return;
    }
    details.open = true;
    details.querySelector("summary")?.focus();
    details.scrollIntoView({ block: "nearest" });
  };

  const journeyActivityIncluded = syntheticJourneyActive && normalPosture && positionDerivable &&
    (sinceSummary
      ? sinceSummary.kind !== "no-change"
      : syntheticComparison.comparisonState === "change" && syntheticComparison.lastEvent !== undefined);

  const balanceHeroTail = <>
      {productSimulationActive ? (
        <p className="sr-only" role="status" data-testid="dashboard-arrival-announcement">
          {arrivalAnnouncement}
        </p>
      ) : null}
      {positionLoading ? (
        <p className={home.balanceCaption} data-testid="dashboard-synthetic-balance-explainer">Loading your position…</p>
      ) : firstUse ? (
        <p className={home.balanceCaption} data-testid="dashboard-synthetic-balance-explainer">No simulated activity yet.</p>
      ) : syntheticJourneyActive ? (
        journeyActivityIncluded ? null : <p className={home.balanceCaption} data-testid="dashboard-synthetic-balance-explainer">Includes your simulated activity.</p>
      ) : productSimulationActive && ready && !isLoading ? (
        <p
          className={home.balanceCaption}
          data-testid="dashboard-synthetic-balance-explainer"
        >
          Includes your simulated activity.
        </p>
      ) : null}
      {ready && !isLoading && total !== available ? (
        <p className={home.available}>
          {syntheticJourneyActive ? "Available in simulation:" : "Available now:"}{" "}
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
  </>;
  const balanceHero = syntheticJourneyActive ? (
    <HomeHero label="Simulated Hedgr balance" labelId="dashboard-total-balance-label" usdAmount={ready && !cleanStartRequested ? displayedTotal : 0} currency={displayCurrency} ownSimulation figureTestId="usd-balance" testId="dashboard-balance" selector={<SimulationDisplayCurrencySelector placement="position" />} loading={positionLoading} isLoading={isLoading}>
      {balanceHeroTail}
    </HomeHero>
  ) : (
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
          {productSimulationActive ? "Simulated Hedgr balance" : "Your current position"}
        </p>
        {syntheticJourneyActive ? <SimulationDisplayCurrencySelector placement="position" /> : null}
      </div>
      {positionLoading ? (
        <div className={home.amount} data-testid="dashboard-balance-loading" aria-busy="true">
          <span className={`${home.skeleton} ${home.skeletonAmount}`} aria-hidden="true" />
          <span className={`${home.skeleton} ${home.skeletonLine}`} aria-hidden="true" />
        </div>
      ) : isLoading ? (
        <div className={`${home.amount} tabular-nums`}>
          …
        </div>
      ) : (
        <BalanceWithLocalEstimate
          usdAmount={ready && !cleanStartRequested ? displayedTotal : 0}
          data-testid="usd-balance"
          className={`${home.amount} tabular-nums`}
        />
      )}
      {balanceHeroTail}
    </section>
  );

  const productRouteHref = (
    route: "/deposit" | "/withdraw" | "/activity"
  ) => (syntheticJourneyLinkContext ? getSyntheticJourneyHref(route) : route);

  const homeUtilities = syntheticJourneyActive ? (
    <nav aria-label="Simulation utilities" className={home.utilities} data-testid="dashboard-simulation-utilities">
      <Link href={productRouteHref("/deposit")} className={home.utility} data-testid="dashboard-add-simulated-deposit">
        <span>Add simulated deposit</span>
      </Link>
      {syntheticComparison.comparisonState === "first-event" ? (
        <Link href={productRouteHref("/withdraw")} className={home.utility} data-testid="dashboard-simulated-withdraw">
          <span>Simulate a withdrawal</span>
        </Link>
      ) : firstUse && normalPosture ? (
        <button type="button" onClick={openSimulationExplainer} className={home.utility} data-testid="dashboard-how-simulation-works">
          <span>How this simulation works</span>
        </button>
      ) : (
        <Link href={productRouteHref("/activity")} className={home.utility} data-testid="dashboard-view-activity">
          <span>View Activity</span>
        </Link>
      )}
    </nav>
  ) : (
    <nav aria-label="Simulation utilities" className={home.utilities} data-testid="dashboard-simulation-utilities">
      <Link href={productRouteHref("/deposit")} className={home.utility} data-testid="dashboard-add-simulated-deposit">
        <span>Add simulated deposit</span>
      </Link>
      <Link href={productRouteHref("/activity")} className={home.utility} data-testid="dashboard-view-activity">
        <span>View Activity</span>
      </Link>
      <Link href={productRouteHref("/withdraw")} className={home.utility} data-testid="dashboard-simulated-withdraw">
        <span>Simulate a withdrawal</span>
      </Link>
    </nav>
  );

  const ownRateLine = syntheticJourneyActive ? <RateLine code={displayCurrency} rate={getSimulationDisplayRate(displayCurrency)} /> : null;

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
        latestChangeCreatedAt={syntheticComparison.lastEvent?.createdAt}
        homeDate={today}
        changeIncludedInBalance={positionDerivable}
      />
      {ownRateLine}
    </div>
  );

  const positionLine = positionDerivable ? (
    <ChartSourceAmountsContext.Provider value={sourceAmounts}><PositionLine entries={positionEntries} lastVisit={previousVisit} settle={arrivalSettle} visualise={syntheticJourneyActive} heroAmount={total} /></ChartSourceAmountsContext.Provider>
  ) : null;

  const ObservationHeading = syntheticJourneyActive ? "h2" : "p";
  const observationLabel = (text: string) => (
    <ObservationHeading id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">
      {text}
    </ObservationHeading>
  );
  const guaranteeLine = (
    <p className="text-xs leading-relaxed text-hedgr-500">
      {syntheticJourneyActive && !danielExample
        ? "This is what happened in your simulation. It doesn’t tell you what will happen next."
        : "This is what happened in the example. It doesn’t tell you what will happen next."}
    </p>
  );
  const activityHref = productRouteHref("/activity");
  const sinceLink = (label: string) => (
    <Link href={activityHref} className={home.sinceLink} data-testid="dashboard-since-link">
      <span>{label}</span>
      {syntheticJourneyActive ? null : <span aria-hidden="true">→</span>}
    </Link>
  );

  let homeObservation = observation;
  if (normalPosture && positionLoading) {
    homeObservation = (
      <div className={home.observation} data-testid="dashboard-observation-loading" aria-hidden="true">
        <span className={`${home.skeleton} ${home.skeletonLine}`} />
        <span className={`${home.skeleton} ${home.skeletonLine}`} style={{ width: "90%" }} />
        <span className={`${home.skeleton} ${home.skeletonLine}`} />
      </div>
    );
  } else if (normalPosture && firstUse) {
    homeObservation = (
      <div className={home.observation}>
        <section
          className={`space-y-3 ${finish.observationHeader}`}
          aria-labelledby="dashboard-current-status-label"
          data-testid="dashboard-current-status"
          data-home-state="first-use"
        >
          {observationLabel("Start here")}
          <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark" data-testid="engine-posture-context">
            {syntheticJourneyActive
              ? "Practise with pretend money first. See what changes, and why."
              : "Practise with pretend money first. Hedgr shows what changes, and why."}
          </p>
          <ol className={home.firstUseSteps} data-testid="dashboard-first-use-steps">
            <li aria-current="step">
              {syntheticJourneyActive ? <strong>Where things stand</strong> : null}
              <span>You are here. It starts at {formatUsd(total)}.</span>
            </li>
            <li>
              {syntheticJourneyActive ? <strong>What happens</strong> : null}
              <span>Add a simulated deposit.</span>
            </li>
            <li>
              {syntheticJourneyActive ? <strong>What changed</strong> : null}
              <span>Try a simulated withdrawal.</span>
            </li>
            <li>
              {syntheticJourneyActive ? <strong>How you can tell</strong> : null}
              <span>Check both entries in Activity.</span>
            </li>
          </ol>
        </section>
        {ownRateLine}
      </div>
    );
  } else if (normalPosture && sinceSummary) {
    homeObservation = (
      <div className={home.observation}>
        <section
          className={`space-y-3 ${finish.observationHeader}`}
          aria-labelledby="dashboard-current-status-label"
          data-testid="dashboard-current-status"
          data-home-state={`since-${sinceSummary.kind}`}
        >
          {observationLabel("Since you were last here")}
          {sinceSummary.kind === "no-change" ? (
            <>
              <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark" data-testid="engine-posture-context">
                {syntheticJourneyActive ? <>{countChanges(0, true)}</> : <>
                  Nothing has changed since {formatShortDate(sinceSummary.since)}. Your position is still{" "}
                  <span data-observation-amount>{formatUsd(sinceSummary.balance)}</span>.
                </>}
              </p>
              {estimateCurrency ? (
                <p className="text-sm leading-relaxed text-hedgr-600">
                  The {estimateCurrency} estimate can change with the exchange rate.
                </p>
              ) : null}
            </>
          ) : sinceSummary.kind === "one" ? (
            <>
              {!syntheticJourneyActive && (<p className="max-w-xl text-sm leading-relaxed text-hedgr-dark" data-testid="engine-posture-context">
                {syntheticJourneyActive ? countChanges(1, true) : <>One simulated {sinceSummary.entry.type === "DEPOSIT" ? "deposit" : "withdrawal"} of{" "}
                <span data-observation-amount>{formatUsd(sinceSummary.entry.amountUSD)}</span> on{" "}
                {formatShortDate(sinceSummary.entry.at)}{syntheticJourneyActive ? "." : <>
                  {" "}took your position from {formatUsd(sinceSummary.from)} to {formatUsd(sinceSummary.to)}.
                </>}</>}
              </p>)}
              {syntheticJourneyActive ? (
                <p className="text-sm leading-relaxed text-hedgr-dark">
                  This simulated {sinceSummary.entry.type === "DEPOSIT" ? "deposit" : "withdrawal"} is included in the balance above.
                </p>
              ) : sinceLink("See the entry")}
            </>
          ) : (
            <>
              {!syntheticJourneyActive && (<p className="max-w-xl text-sm leading-relaxed text-hedgr-dark" data-testid="engine-posture-context">
                {syntheticJourneyActive ? <>
                  {countChanges(sinceSummary.entries.length, true)}
                </> : <>
                  {formatChangeCount(sinceSummary.entries.length)} things changed since{" "}
                  {formatShortDate(sinceSummary.since)}. Your position went from {formatUsd(sinceSummary.from)} to{" "}
                  <span data-observation-amount>{formatUsd(sinceSummary.to)}</span>.
                </>}
              </p>)}
              {syntheticJourneyActive ? null : <ul className={home.sinceList} data-testid="dashboard-since-entries">
                {sinceSummary.entries.map((entry) => (
                  <li key={entry.id}>
                    <span>
                      <strong>{entry.type === "DEPOSIT" ? "Simulated deposit" : "Simulated withdrawal"}</strong>
                      <small>{formatShortDate(entry.at)}</small>
                    </span>
                    <span>
                      {entry.type === "DEPOSIT" ? "+" : "−"}
                      {formatUsd(entry.amountUSD)}
                    </span>
                  </li>
                ))}
              </ul>}
              {syntheticJourneyActive ? (
                <p className="text-sm leading-relaxed text-hedgr-dark">
                  These simulated entries are included in the balance above.
                </p>
              ) : sinceLink("See all in Activity")}
            </>
          )}
          {guaranteeLine}
          {syntheticJourneyActive && sinceSummary.kind !== "no-change"
            ? sinceLink(sinceSummary.kind === "one" ? "See the entry" : "See all in Activity")
            : null}
        </section>
        {ownRateLine}
      </div>
    );
  }

  const currencyContext = currencyContextVisible ? (
    <CurrencyInsight
      rateLineOnHome
      usdAmount={total}
      currency={displayCurrency}
      latestDisplayRate={getSimulationDisplayRate(displayCurrency)}
      ready={currencyContextVisible}
      pending={currencyComparisonPending}
    />
  ) : null;

  // §362/§365: picker and return share URL-only navigation, preserving the mounted
  // Home and its visit guard. Neither resets nor writes the simulation.
  const exampleHref = (value: string, search: string, path: string) => {
    const params = new URLSearchParams(search);
    params.delete(CLASS_A_VAL_002_RESET_PARAM);
    if (SYNTHETIC_JOURNEY_EXAMPLES.some((example) => example.id === value)) params.set(CLASS_A_VAL_002_EXAMPLE_PARAM, value);
    else params.delete(CLASS_A_VAL_002_EXAMPLE_PARAM);
    const query = params.toString();
    return `${path}${query ? `?${query}` : ""}`;
  };
  const chooseExample = (value: string) => {
    window.history.pushState(null, "", exampleHref(value, window.location.search, window.location.pathname));
  };
  const danielPanel = danielExample ? (
    <>
    <DanielExampleHome
      currentRead={DANIEL_HOME_READ}
      timeline={DANIEL_HOME_TIMELINE}
      returnHref={exampleHref("own", searchParams?.toString() ?? "", pathname ?? CLASS_A_VAL_002_DASHBOARD_PATH)}
      onReturn={() => chooseExample("own")}
      limitation={guaranteeLine}
    />
    <CurrencyInsight
      usdAmount={DANIEL_HOME_READ.declaredHolding.amount}
      currency="ZMW"
      latestDisplayRate={getSimulationDisplayRate('ZMW')}
      ready={ready}
    />
    </>
  ) : null;
  const examplePicker = syntheticJourneyActive ? (
    <div className="mt-2 w-full min-w-0 max-w-xs">
      <label htmlFor="dashboard-example-picker" className="mb-1 block text-sm font-medium text-hedgr-800">
        Choose an example
      </label>
      <div className={home.examplePicker}>
        <span aria-hidden="true" data-testid="example-picker-value">
          {SYNTHETIC_JOURNEY_EXAMPLES.find((example) => example.id === selectedExample)?.label ?? "Your own simulation"}
        </span>
        <select
          id="dashboard-example-picker"
          value={selectedExample}
          onChange={(event) => chooseExample(event.target.value)}
        >
          <option value="own">Your own simulation</option>
          {SYNTHETIC_JOURNEY_EXAMPLES.map((example) => (
            <option key={example.id} value={example.id}>{example.label}</option>
          ))}
        </select>
      </div>
    </div>
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
        <>
          <div className={home.overviewGrid}>
            <div className={home.positionPanel}>
              {balanceHero}
              {positionLine}
            </div>
            <div className={home.insights}>
              {homeObservation}
              {homeUtilities}
            </div>
          </div>
          {currencyContext}
        </>
      ) : productSimulationActive ? (
        <div className={home.overviewGrid}>
          <div className={home.positionPanel}>{balanceHero}{positionLine}</div>
          <div className={home.insights}>
          {homeObservation}
          {homeUtilities}
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

  const accordionChevron = (
    <span className={home.chevron} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false">
        <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const educationSection = syntheticJourneyActive ? null : (
    <details className={home.accordion} data-testid="dashboard-education">
      <summary className={home.accordionSummary}>
        <span>How Hedgr sets its targets</span>
        {accordionChevron}
      </summary>
      <div className={`${home.accordionContent} space-y-3`}>
        <EngineStabilityReviewSnapshot engineState={engineState} />
        <EngineProtectiveGuidance />
        <EngineStabilityExplainer />
      </div>
    </details>
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

  if (error && !exampleActive) {
    return (
      <main className={`${home.page} ${home.scopeFirst}`}>
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
    <main className={`${home.page} ${home.scopeFirst}`}>
      <div
        className={home.content}
      >
        <section
          aria-labelledby="dashboard-orientation-heading"
          className="space-y-0.5 pb-1 sm:space-y-2"
          data-testid="dashboard-orientation"
        >
          {productSimulationActive && !exampleActive && today !== null ? (
            <p className={home.dateLine} data-testid="dashboard-date-line">
              {formatDateLine(today)}
            </p>
          ) : null}
          <h1
            id="dashboard-orientation-heading"
            className="text-xl font-bold tracking-tight text-hedgr-800 sm:text-4xl"
          >
            {syntheticJourneyActive ? exampleActive ? "Example" : "Your simulation" : "Your position"}
          </h1>
          {examplePicker}
          {!syntheticJourneyActive ? <p className={home.contextLine} data-testid="dashboard-context-line">
            {productSimulationActive
              ? 'This simulated experience provides context, not an instruction.'
              : 'This experience provides context, not an instruction.'}
          </p> : null}
        </section>

        {sarahExample ? <SarahExampleHome read={SARAH_HOME_READ} /> : danielExample ? danielPanel : currentOverview}

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
                href={productRouteHref("/deposit")}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-hedgr-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 focus:ring-offset-hedgr-100"
              >
                Make your first deposit
              </Link>
            </div>
          </div>
        )}

        {exampleActive ? (
          <div className={home.support}>{disclosureSection}</div>
        ) : syntheticJourneyActive ? (
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
        ) : null}



        {syntheticJourneyActive && !exampleActive && hasSyntheticFixtureState && (
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

        {!syntheticJourneyActive && !isFirstTimeUser && !hasNoTransactions && !sinceChangesShown && (
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
                href={productRouteHref("/activity")}
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
                    {sourceAmounts.has(tx.id) ? <span className="block text-sm font-normal">{sourceAmounts.get(tx.id)}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(!syntheticJourneyActive || !explicitSyntheticJourney) &&
          isFeatureEnabled("earn") && (
            <div className="max-w-sm">
              <div
                className="rounded-xl border border-hedgr-200 bg-white p-4"
                data-testid="dashboard-earn-tile"
              >
                <div className="text-xs font-medium text-hedgr-500">
                  Example annual yield (APY)
                </div>
                <p className="mt-1 text-xs text-hedgr-800">
                  {ENGINE_ILLUSTRATIVE_VALUES_LABEL}
                </p>
                {apyError ? (
                  <div className="mt-1 text-xs font-medium text-hedgr-800">
                    {apyError}
                  </div>
                ) : (
                  <div className="mt-1 text-xl font-semibold tabular-nums text-hedgr-dark">
                    {apy !== null ? `${(apy * 100).toFixed(2)}%` : "Example yield unavailable"}
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

        {!syntheticJourneyActive ? (
          <div className={home.support}>
            {productSimulationActive || !isFirstTimeUser ? (
              <details className={home.accordion} data-testid="dashboard-planning-targets">
                <summary className={home.accordionSummary}>
                  <span>Planning targets{productSimulationActive ? <span className={home.accordionSubtitle}>Targets only · No money moved</span> : null}</span>
                  {accordionChevron}
                </summary>
                <div className={home.accordionContent}><EngineAllocationBands engineState={engineState} collapsed={productSimulationActive} /></div>
              </details>
            ) : null}
            {educationSection}
            {disclosureSection}
          </div>
        ) : null}
      </div>
    </main>
  );
}
