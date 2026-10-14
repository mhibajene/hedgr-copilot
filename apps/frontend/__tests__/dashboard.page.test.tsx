// @vitest-environment jsdom

import React from "react";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  cleanup,
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { ENGINE_NOTICE_COPY } from "../lib/engine/notices";
import type { EngineState } from "../lib/engine/types";
import {
  ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY,
  ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE,
} from "../lib/engine/stability-review-snapshot-copy";

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const dashboardStateMocks = vi.hoisted(() => ({
  transactions: [] as Array<{
    txn_ref: string;
    type: "deposit" | "withdrawal";
    status: "pending" | "settled" | "failed";
    amount_zmw: number;
    amount_usd: number;
    fx_rate: number;
    created_at: number;
    updated_at: number;
  }>,
  clearLedger: vi.fn(),
  policyContexts: [] as Array<string | undefined>,
}));

vi.mock("../lib/hooks/useBalance", () => ({
  useBalance: vi.fn(),
}));

vi.mock("../lib/defi", () => ({
  defiAdapter: {
    getNetApy: vi.fn(() => Promise.resolve(0.05)),
  },
}));

vi.mock("../lib/state/ledger", () => ({
  useLedgerStore: vi.fn(
    (
      selector: (state: {
        transactions: unknown[];
        clear: () => void;
      }) => unknown
    ) =>
      selector({
        transactions: dashboardStateMocks.transactions,
        clear: dashboardStateMocks.clearLedger,
      })
  ),
}));

vi.mock("../lib/engine/useEngineState", () => ({
  useEngineState: vi.fn(),
}));

vi.mock("../lib/policy/usePolicy", () => ({
  usePolicy: vi.fn(() => ({
    isFeatureEnabled: vi.fn(() => false),
  })),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/dashboard"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock("../components", () => ({
  BalanceWithLocalEstimate: ({
    usdAmount,
    ...props
  }: {
    usdAmount: number;
  } & Record<string, unknown>) => {
    const rest = { ...props };
    delete rest.displayEstimate;
    delete rest.displayEstimateParts;
    return <div {...rest}>{usdAmount}</div>;
  },
  PolicyDisclosure: ({ context }: { context?: string }) => {
    dashboardStateMocks.policyContexts.push(context);
    return <div data-testid="policy-disclosure" />;
  },
}));

vi.mock("@hedgr/ui", () => ({
  EmptyState: ({ title, ...props }: { title: string }) => (
    <div {...props}>{title}</div>
  ),
  ErrorState: ({
    title,
    description,
    primaryAction,
    ...props
  }: {
    title: string;
    description: string;
    primaryAction?: unknown;
  }) => {
    void primaryAction;

    return (
      <div {...props}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    );
  },
}));

import DashboardPage from "../app/(app)/dashboard/page";
import { getMockEngineState } from "../lib/engine/mock";
import { useBalance } from "../lib/hooks/useBalance";
import { useEngineState } from "../lib/engine/useEngineState";
import { defiAdapter } from "../lib/defi";
import { usePolicy } from "../lib/policy/usePolicy";
import { usePathname, useSearchParams } from "next/navigation";

function makeBalanceState(
  overrides: Partial<ReturnType<typeof useBalance>> = {}
): ReturnType<typeof useBalance> {
  return {
    total: 100,
    available: 100,
    pending: 0,
    asOf: 1000,
    isLoading: false,
    error: null,
    currency: "USD",
    refresh: vi.fn(),
    ...overrides,
  };
}

function makeCompletedJourneyTransactions(): typeof dashboardStateMocks.transactions {
  return [
    {
      txn_ref: "deposit-1",
      type: "deposit",
      status: "settled",
      amount_zmw: 100,
      amount_usd: 5,
      fx_rate: 20,
      created_at: 1,
      updated_at: 2,
    },
    {
      txn_ref: "withdrawal-1",
      type: "withdrawal",
      status: "settled",
      amount_zmw: 0,
      amount_usd: 2,
      fx_rate: 0,
      created_at: 3,
      updated_at: 4,
    },
  ];
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.localStorage.removeItem("hedgr:last-home-visit");
  window.localStorage.removeItem("hedgr:wallet");
  dashboardStateMocks.transactions = [];
  dashboardStateMocks.clearLedger.mockClear();
  dashboardStateMocks.policyContexts = [];
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams() as ReturnType<typeof useSearchParams>
  );
  vi.mocked(usePathname).mockReturnValue("/dashboard");
  vi.unstubAllEnvs();
});

describe("DashboardPage engine trust surface", () => {
  test("honors the human-readable synthetic journey path outside local development", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(usePathname).mockReturnValue("/dashboard-synthetic-journey");
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 0, available: 0 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );

    render(<DashboardPage />);

    expect(
      (
        await screen.findByRole("link", {
          name: /Add simulated deposit/,
        })
      ).getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(screen.getByTestId("dashboard-orientation").textContent).toContain(
      "Your simulation"
    );
  });

  test("honors the explicit synthetic journey query outside local development", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("journey=class-a-val-002") as ReturnType<
        typeof useSearchParams
      >
    );
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 0, available: 0 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );

    render(<DashboardPage />);

    expect(
      (
        await screen.findByRole("link", {
          name: /Add simulated deposit/,
        })
      ).getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(
      screen
        .getByTestId("dashboard-current-overview")
        .getAttribute("aria-label")
    ).toBe("Current simulation overview");
    const orientation = screen.getByTestId("dashboard-orientation");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Your simulation",
      })
    ).toBeDefined();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(orientation.textContent).toContain("Your simulation");
    expect(screen.getByRole("combobox", { name: "Display currency for this simulation" })).toBeDefined();
    expect(orientation.textContent).not.toMatch(
      /Financial Stability Companion|crypto|blockchain|stablecoin|DeFi|trading|yield routing/i
    );
    expect(screen.getByText("Simulated Hedgr balance")).toBeDefined();
    expect(screen.queryByTestId("dashboard-balance-scope")).toBeNull();
    const explainer = screen.getByTestId(
      "dashboard-synthetic-balance-explainer"
    );
    expect(explainer.textContent).toBe("No simulated activity yet.");
    expect(screen.getByTestId("dashboard-balance").textContent).not.toMatch(
      /Illustrative simulation value only|This balance shows|This balance doesn’t tell you|When funds would be available to withdraw/i
    );
    expect(explainer.textContent).not.toMatch(
      /fixture|informational posture|settlement/i
    );

    expect(screen.queryByText("Does anything need attention?")).toBeNull();
    expect(screen.queryByTestId("engine-simulation-attention-answer")).toBeNull();
    expect(screen.getByText("Start here")).toBeDefined();
    expect(screen.queryByText("Start with a simulated deposit")).toBeNull();
    expect(screen.queryByText("What Hedgr notices")).toBeNull();
    expect(screen.queryByText("This is what happened in your simulation. It doesn’t tell you what will happen next.")).toBeNull();
    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.queryByText("NORMAL")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "Practise with pretend money first. See what changes, and why."
    );
    expect(
      Array.from(screen.getByTestId("dashboard-first-use-steps").querySelectorAll("li")).map((step) => step.textContent)
    ).toEqual([
      "Where things standYou are here. It starts at $0.00.",
      "What happensAdd a simulated deposit.",
      "What changedTry a simulated withdrawal.",
      "How you can tellCheck both entries in Activity.",
    ]);
    expect(screen.getByTestId("dashboard-position-line").textContent).toBe(
      "Your line starts with your first deposit"
    );
    const utilities = screen.getByTestId("dashboard-simulation-utilities");
    expect(Array.from(utilities.children).map((node) => node.getAttribute("data-testid"))).toEqual([
      "dashboard-add-simulated-deposit",
      "dashboard-how-simulation-works",
    ]);
    expect(
      screen
        .getByTestId("dashboard-add-simulated-deposit")
        .getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(screen.getByTestId("dashboard-how-simulation-works").textContent).toBe(
      "How this simulation works"
    );
    expect(screen.queryByText("How your position changed")).toBeNull();
    expect(screen.queryByTestId("dashboard-change-evidence")).toBeNull();
    expect(
      screen.getByTestId("dashboard-current-status").querySelector("img")
    ).toBeNull();

    const allocation = screen.getByTestId("engine-allocation-bands");
    expect(allocation.getAttribute("data-presentation")).toBe("collapsed");
    expect(allocation.textContent).toContain("What you are building toward");
    expect(allocation.textContent).toContain("Now");
    expect(allocation.textContent).toContain("Reserve");
    expect(allocation.textContent).toContain("Growth");
    expect(allocation.textContent).toContain("not separate balances");
    expect(screen.queryByTestId("dashboard-optional-actions")).toBeNull();
    expect(screen.queryByText("What happens next is your decision")).toBeNull();
    expect(screen.queryByText("Do nothing")).toBeNull();
    expect(dashboardStateMocks.policyContexts).toContain("synthetic-research");
    const valuesDetails = screen.getByTestId(
      "engine-allocation-values-details"
    );
    expect(valuesDetails.tagName).toBe("DETAILS");
    expect(valuesDetails.hasAttribute("open")).toBe(false);
    expect(
      screen.getByTestId("engine-allocation-target-roles").textContent
    ).not.toMatch(/\d+%/);
    expect(
      screen
        .getByTestId("engine-allocation-target-roles")
        .querySelector('[role="progressbar"]')
    ).toBeNull();

    expect(screen.queryByTestId("engine-stability-review-snapshot")).toBeNull();
    expect(screen.queryByText("Simulation date")).toBeNull();
    expect(screen.queryByText("Last viewed locally")).toBeNull();
    expect(screen.queryByTestId("dashboard-education")).toBeNull();
  });

  test("consumes the orientation clean-start marker before showing persisted journey state", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(usePathname).mockReturnValue("/dashboard-synthetic-journey");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("reset=1") as ReturnType<typeof useSearchParams>
    );
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );
    const replaceState = vi.spyOn(window.history, "replaceState");
    window.localStorage.setItem("hedgr:wallet", JSON.stringify({ state: { usdBalance: 7 }, version: 0 }));

    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-balance").textContent).toContain("0");
    await waitFor(() => {
      expect(dashboardStateMocks.clearLedger).toHaveBeenCalledTimes(1);
      expect(window.localStorage.getItem("hedgr:wallet")).toBeNull();
    });
    expect(replaceState).toHaveBeenCalledWith(
      window.history.state,
      "",
      "/dashboard-synthetic-journey"
    );
  });

  test("establishes the first completed event without implying a comparison", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("journey=class-a-val-002") as ReturnType<
        typeof useSearchParams
      >
    );
    dashboardStateMocks.transactions = [makeCompletedJourneyTransactions()[0]];
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 5, available: 5 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );

    render(<DashboardPage />);

    expect(await screen.findByTestId("dashboard-simulation-utilities")).toBeDefined();
    expect(
      screen
        .getByTestId("dashboard-add-simulated-deposit")
        .getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(
      screen.getByTestId("dashboard-simulated-withdraw").getAttribute("href")
    ).toBe("/withdraw?journey=class-a-val-002");
    expect(screen.queryByText("How your position changed")).toBeNull();
    expect(screen.queryByTestId("dashboard-change-delta")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "Your first simulated position is now visible. This is your starting point."
    );
    expect(screen.getByText("What Hedgr notices")).toBeDefined();
    expect(screen.queryByTestId("engine-simulation-attention-answer")).toBeNull();
    expect(screen.getByText("This is what happened in your simulation. It doesn’t tell you what will happen next.")).toBeDefined();
  });

  test("restarts a completed explicit synthetic journey only after confirmation", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("journey=class-a-val-002") as ReturnType<
        typeof useSearchParams
      >
    );
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );
    const confirmRestart = vi
      .spyOn(window, "confirm")
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    render(<DashboardPage />);

    const restartButton = await screen.findByRole("button", {
      name: "Restart simulated journey",
    });
    const viewActivity = screen.getByTestId("dashboard-view-activity");
    expect(viewActivity.textContent).toContain("View Activity");
    expect(viewActivity.getAttribute("href")).toBe(
      "/activity?journey=class-a-val-002"
    );
    expect(
      screen
        .getByTestId("dashboard-add-simulated-deposit")
        .getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(
      screen.getByTestId("dashboard-restart-journey").textContent
    ).toContain("begins again at $0");
    expect(screen.queryByTestId("dashboard-change-evidence")).toBeNull();
    expect(screen.queryByText("How your position changed")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "A simulated withdrawal of $2.00 on 1 Jan."
    );
    expect(screen.queryByTestId("engine-simulation-attention-answer")).toBeNull();
    expect(
      screen.queryByRole("link", { name: /Review what changed/ })
    ).toBeNull();

    window.localStorage.setItem("hedgr:wallet", JSON.stringify({ state: { usdBalance: 7 }, version: 0 }));
    fireEvent.click(restartButton);
    expect(dashboardStateMocks.clearLedger).not.toHaveBeenCalled();
    expect(window.localStorage.getItem("hedgr:wallet")).not.toBeNull();

    fireEvent.click(restartButton);
    expect(confirmRestart).toHaveBeenCalledTimes(2);
    expect(dashboardStateMocks.clearLedger).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem("hedgr:wallet")).toBeNull();
  });

  test("does not expose synthetic replay outside the explicit production journey", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );

    render(<DashboardPage />);

    expect(
      screen.queryByRole("button", { name: "Restart simulated journey" })
    ).toBeNull();
    expect(screen.getByTestId("dashboard-orientation").textContent).toContain(
      "This simulated experience provides context, not an instruction."
    );
    expect(
      screen.getByTestId("dashboard-simulated-withdraw").getAttribute("href")
    ).toBe("/withdraw");
  });

  test("converges the default simulated dashboard on the customer hierarchy", () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "fixed");
    vi.mocked(useBalance).mockReturnValue(makeBalanceState());
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("tightening") as EngineState
    );

    render(<DashboardPage />);

    // HOME-EXPERIENCE-001 T1: one "Your position" title; the default route keeps its
    // context / non-instruction sentence verbatim (decision 2).
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Your position");
    expect(screen.getByTestId("dashboard-context-line").textContent).toBe(
      "This simulated experience provides context, not an instruction."
    );
    expect(screen.getByText("Simulated Hedgr balance")).toBeDefined();
    expect(screen.getByText("Includes your simulated activity.")).toBeDefined();
    expect(screen.getByTestId("dashboard-current-overview")).toBeDefined();
    expect(dashboardStateMocks.policyContexts).toContain("default");
    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.getByText("What Hedgr notices")).toBeDefined();
    expect(screen.getByText("Does anything need attention?")).toBeDefined();
    expect(screen.getByTestId("engine-posture-banner")).toBeDefined();
    expect(screen.queryByTestId("engine-posture-action-guidance")).toBeNull();
    expect(screen.getByTestId("engine-allocation-bands")).toBeDefined();
    expect(
      screen.getByTestId("engine-allocation-bands").getAttribute("data-presentation")
    ).toBe("collapsed");
    expect(screen.getByTestId("dashboard-simulation-utilities")).toBeDefined();
    expect(
      screen.getByTestId("dashboard-simulated-withdraw").getAttribute("href")
    ).toBe("/withdraw");
    expect(screen.getByTestId("engine-protective-guidance")).toBeDefined();
    expect(screen.getByTestId("engine-stability-explainer")).toBeDefined();
    const snapshot = screen.getByTestId("engine-stability-review-snapshot");
    expect(snapshot.textContent).toContain(
      ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE
    );
    expect(snapshot.textContent).toContain(
      ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY
    );
    expect(screen.getByText(ENGINE_NOTICE_COPY.tightening.title)).toBeDefined();

    const orderedSections = [
      screen.getByTestId("dashboard-orientation"),
      screen.getByTestId("dashboard-balance"),
      screen.getByTestId("dashboard-current-status"),
      screen.getByTestId("dashboard-simulation-utilities"),
      screen.getByTestId("engine-allocation-bands"),
      screen.getByTestId("dashboard-education"),
      screen.getByTestId("dashboard-disclosures"),
    ];

    for (let index = 0; index < orderedSections.length - 1; index += 1) {
      expect(
        orderedSections[index].compareDocumentPosition(
          orderedSections[index + 1]
        ) & Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    }

    for (const testId of [
      "engine-protective-guidance",
      "engine-stability-explainer",
      "engine-stability-review-details",
      "dashboard-education",
      "dashboard-disclosures",
    ]) {
      const disclosure = screen.getByTestId(testId);
      expect(disclosure.tagName).toBe("DETAILS");
      expect(disclosure.hasAttribute("open")).toBe(false);
    }
  });

  test("mounts the engine posture header in the balance error path", () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "fixed");
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ error: "Unable to load balance" })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("tightened") as EngineState
    );

    render(<DashboardPage />);

    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.getByText("Does anything need attention?")).toBeDefined();
    expect(screen.getByTestId("engine-posture-banner")).toBeDefined();
    expect(screen.getByTestId("engine-allocation-bands")).toBeDefined();
    expect(screen.getByTestId("engine-protective-guidance")).toBeDefined();
    expect(screen.getByTestId("engine-stability-explainer")).toBeDefined();
    const snapshot = screen.getByTestId("engine-stability-review-snapshot");
    expect(snapshot.textContent).toContain(
      ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE
    );
    expect(snapshot.textContent).toContain(
      ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY
    );
    expect(screen.getByTestId("dashboard-error-state")).toBeDefined();
  });
});


describe("Currency context integration", () => {
  function setup() {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.mocked(usePathname).mockReturnValue("/dashboard-synthetic-journey");
    vi.mocked(useEngineState).mockReturnValue(getMockEngineState("normal"));
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total: 3, available: 3 }));
  }

  test("renders after the observation with bounded context, preserving available and pending meaning", () => {
    setup();
    const { rerender } = render(<DashboardPage />);
    expect(screen.getByTestId("dashboard-current-overview").contains(screen.getByTestId("currency-insight"))).toBe(true);
    expect(screen.getByTestId("dashboard-balance").contains(screen.getByTestId("currency-insight"))).toBe(false);
    expect(screen.getByTestId("currency-insight-headline").textContent).toContain("ZMW 4.05 higher");
    expect(screen.queryByTestId("engine-simulation-attention-answer")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toContain("A simulated withdrawal of $2.00 on 1 Jan.");
    // Pending entries must withhold direction even when their numeric net cancels.
    dashboardStateMocks.transactions = dashboardStateMocks.transactions.map(tx => ({ ...tx, status: "pending" }));
    rerender(<DashboardPage />);
    expect(screen.getByText("Waiting for the simulated position to settle.")).toBeDefined();
    expect(screen.queryByTestId("currency-insight-direction")).toBeNull();
    expect(dashboardStateMocks.clearLedger).not.toHaveBeenCalled();
  });

  test("suppresses hydration/loading and stale reset data before rendering the zero-position state", () => {
    setup();
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams("reset=1") as ReturnType<typeof useSearchParams>);
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ asOf: 0 }));
    const { rerender } = render(<DashboardPage />);
    expect(screen.queryByTestId("currency-insight")).toBeNull();
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ isLoading: true }));
    rerender(<DashboardPage />);
    expect(screen.queryByTestId("currency-insight")).toBeNull();
    dashboardStateMocks.transactions = [];
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total: 3, available: 3 }));
    rerender(<DashboardPage />);
    expect(screen.queryByTestId("currency-insight")).toBeNull();
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total: 0, available: 0 }));
    rerender(<DashboardPage />);
    expect(screen.getByText("No position to compare yet.")).toBeDefined();
    expect(screen.queryByTestId("currency-insight-direction")).toBeNull();
  });

  test("reports an invalid position instead of inventing zero", () => {
    setup();
    dashboardStateMocks.transactions = [];
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total: NaN, available: NaN }));
    render(<DashboardPage />);
    expect(screen.getByText("The simulated position is unavailable.")).toBeDefined();
    expect(screen.queryByTestId("currency-insight-direction")).toBeNull();
  });

  // HOME-EXPERIENCE-001 T1 (decision 1): the simulated-activity caption now shows in every
  // simulated context; currency context stays journey-only.
  test.each([
    ["/dashboard", "", false, true],
    ["/dashboard", "journey=class-a-val-002", true, false],
    ["/dashboard-synthetic-journey", "scenario=unavailable-data", false, true],
  ])("isolates %s?%s", (path, query, visible, captionVisible) => {
    setup();
    vi.mocked(usePathname).mockReturnValue(path);
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(query) as ReturnType<typeof useSearchParams>);
    render(<DashboardPage />);
    expect(Boolean(screen.queryByTestId("currency-insight"))).toBe(visible);
    expect(Boolean(screen.queryByText("Includes your simulated activity.", { exact: true }))).toBe(captionVisible);
    expect(screen.queryByTestId("dashboard-balance-scope")).toBeNull();
    if (!visible) expect(screen.queryByText("No other change stands out in the simulated activity.")).toBeNull();
  });

  test.each(["tightening", "tightened", "recovery"] as const)("retains the %s notice beside currency context", posture => {
    setup();
    vi.mocked(useEngineState).mockReturnValue(getMockEngineState(posture));
    render(<DashboardPage />);
    expect(screen.getByTestId("currency-insight")).toBeDefined();
    expect(screen.getByTestId("engine-posture-banner").textContent).toContain(getMockEngineState(posture).notice!.title);
    expect(screen.getByTestId("engine-simulation-attention-answer").textContent).toBe("A change in the guidance needs review.");
  });
});

// T3 surfaces appear only when the ledger-derived position agrees with the displayed
// balance (for example, not during the render before useBalance publishes a change).
describe("Home since-last-visit surfaces", () => {
  test("keeps the existing observation while the displayed balance and ledger position disagree", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    window.localStorage.setItem("hedgr:last-home-visit", "2");
    vi.mocked(usePathname).mockReturnValue("/dashboard-synthetic-journey");
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total: 7, available: 7 }));
    vi.mocked(useEngineState).mockReturnValue(getMockEngineState("normal") as EngineState);
    render(<DashboardPage />);
    await screen.findByTestId("dashboard-current-status");
    expect(screen.queryByTestId("dashboard-change-chip")).toBeNull();
    expect(screen.queryByTestId("dashboard-position-line")).toBeNull();
    expect(screen.queryByText("Since you were last here")).toBeNull();
  });
});

// CLASS-A-VAL-002-HOME-DEDUP-001 (§328): "Since you were last here" is the single explanation
// of change; the default route no longer repeats the latest entry in a "Latest change" strip.
describe("default simulated Home shows the latest change once", () => {
  function renderDefaultHome(total: number) {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "fixed");
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total, available: total }));
    vi.mocked(useEngineState).mockReturnValue(getMockEngineState("normal") as EngineState);
    render(<DashboardPage />);
  }

  test("no strip when there is no previous visit", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    renderDefaultHome(3);
    await screen.findByTestId("dashboard-current-status");
    expect(screen.queryByTestId("dashboard-change-evidence")).toBeNull();
    expect(screen.queryByText("Latest change")).toBeNull();
    expect(screen.getByText("Recent activity")).toBeDefined();
  });

  test("no strip beside 'Since you were last here'", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    window.localStorage.setItem("hedgr:last-home-visit", "2");
    renderDefaultHome(3);
    expect((await screen.findByTestId("engine-posture-context")).textContent).toMatch(
      /^One simulated withdrawal of \$2\.00/
    );
    expect(screen.getByText("Since you were last here")).toBeDefined();
    expect(screen.queryByTestId("dashboard-change-evidence")).toBeNull();
    expect(screen.queryByText("Latest change")).toBeNull();
  });

  test("no strip with a pending entry, which stays visible in Recent activity", async () => {
    dashboardStateMocks.transactions = [
      ...makeCompletedJourneyTransactions(),
      {
        txn_ref: "deposit-pending",
        type: "deposit",
        status: "pending",
        amount_zmw: 20,
        amount_usd: 1,
        fx_rate: 20,
        created_at: 5,
        updated_at: 5,
      },
    ];
    renderDefaultHome(3);
    await screen.findByTestId("dashboard-current-status");
    expect(screen.queryByTestId("dashboard-change-evidence")).toBeNull();
    const recent = screen.getByRole("region", { name: "Recent activity" });
    expect(recent.textContent).toContain("+$1.00");
  });
});

// CLASS-A-VAL-002-HOME-DEDUP-001 (§328 decision 3): Recent activity is hidden only while the
// observation already explains one or several changes since the last visit.
describe("default simulated Home Recent activity overlap", () => {
  function renderDefaultHome(total: number, posture: "normal" | "tightening" = "normal") {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "fixed");
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total, available: total }));
    vi.mocked(useEngineState).mockReturnValue(getMockEngineState(posture) as EngineState);
    render(<DashboardPage />);
  }
  const recentActivity = () => screen.queryByRole("region", { name: "Recent activity" });

  test("hidden while one change since the last visit is explained", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    window.localStorage.setItem("hedgr:last-home-visit", "2");
    renderDefaultHome(3);
    expect((await screen.findByTestId("engine-posture-context")).textContent).toMatch(/^One simulated withdrawal/);
    expect(recentActivity()).toBeNull();
  });

  test("hidden while several changes since the last visit are listed", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    window.localStorage.setItem("hedgr:last-home-visit", "0.5");
    renderDefaultHome(3);
    expect((await screen.findByTestId("engine-posture-context")).textContent).toMatch(/^Two things changed/);
    expect(screen.getByTestId("dashboard-since-entries")).toBeDefined();
    expect(recentActivity()).toBeNull();
  });

  test("shown when nothing changed since the last visit", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    window.localStorage.setItem("hedgr:last-home-visit", "10");
    renderDefaultHome(3);
    expect((await screen.findByTestId("engine-posture-context")).textContent).toMatch(/^Nothing has changed/);
    expect(recentActivity()).not.toBeNull();
  });

  test("shown under a non-normal posture, where the since view does not replace the observation", async () => {
    dashboardStateMocks.transactions = makeCompletedJourneyTransactions();
    window.localStorage.setItem("hedgr:last-home-visit", "2");
    renderDefaultHome(3, "tightening");
    await screen.findByTestId("engine-posture-banner");
    expect(screen.queryByText("Since you were last here")).toBeNull();
    expect(recentActivity()).not.toBeNull();
  });
});

const B_LIMIT = 'This is what happened in your simulation. It doesn’t tell you what will happen next.';
const B_QUALIFIER = 'Illustrative example values, not live targets or advice';
const B_TODAY = new Date(2026, 9, 13, 12).getTime();
const B_YESTERDAY = new Date(2026, 9, 12, 12).getTime();

function setupTicketB(route: string, state: 'fallback' | 'one' | 'several' | 'no-change', type: 'deposit' | 'withdrawal' = 'withdrawal') {
  cleanup();
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');
  vi.spyOn(Date, 'now').mockReturnValue(B_TODAY);
  vi.mocked(usePathname).mockReturnValue(route.split('?')[0]);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(route.split('?')[1]) as ReturnType<typeof useSearchParams>);
  dashboardStateMocks.transactions = [
    { txn_ref: 'b-deposit', type: 'deposit', status: 'settled', amount_zmw: 13500, amount_usd: 500, fx_rate: 27, created_at: B_YESTERDAY, updated_at: B_YESTERDAY },
    { txn_ref: 'b-change', type, status: 'settled', amount_zmw: type === 'deposit' ? 540 : 0, amount_usd: 20, fx_rate: type === 'deposit' ? 27 : 0, created_at: B_TODAY - 3600000, updated_at: B_TODAY - 3600000 },
  ];
  if (state === 'fallback') window.localStorage.removeItem('hedgr:last-home-visit');
  else window.localStorage.setItem('hedgr:last-home-visit', String(state === 'one' ? B_YESTERDAY + 1 : state === 'several' ? B_YESTERDAY - 86400000 : B_TODAY));
  window.localStorage.setItem('hedgr.simulation.display-currency', 'ZMW');
  const total = type === 'deposit' ? 520 : 480;
  vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total, available: total }));
  vi.mocked(useEngineState).mockReturnValue(getMockEngineState('normal'));
  render(<DashboardPage />);
}

const B_ROUTES = ['/dashboard-synthetic-journey', '/dashboard?journey=class-a-val-002'];

test('Journey change inclusion replaces the hero claim and precedes visible limits', async () => {
  for (const route of B_ROUTES) {
    for (const state of ['fallback', 'one', 'several', 'no-change'] as const) {
      setupTicketB(route, state);
      const card = await screen.findByTestId('dashboard-current-status');
      const claim = state === 'several' ? 'These simulated entries are included in the balance above.' : 'This simulated withdrawal is included in the balance above.';
      expect(card.textContent).toContain(B_LIMIT);
      if (state === 'no-change') {
        expect(screen.getByText('Includes your simulated activity.')).toBeDefined();
        expect(card.textContent).not.toContain('included in the balance above');
      } else {
        expect(screen.queryByText('Includes your simulated activity.')).toBeNull();
        const inclusion = screen.getByText(claim, { exact: true });
        const limit = screen.getByText(B_LIMIT, { exact: true });
        expect(inclusion.nextElementSibling).toBe(limit);
        const link = screen.queryByTestId('dashboard-since-link');
        if (link) expect(limit.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      }
    }
  }
});

test('Journey since states use simulation context without current-balance restatement', async () => {
  for (const route of B_ROUTES) {
    for (const type of ['withdrawal', 'deposit'] as const) {
      setupTicketB(route, 'one', type);
      expect((await screen.findByTestId('engine-posture-context')).textContent).toBe(`One simulated ${type} of $20.00 on 13 Oct.`);
    }
    setupTicketB(route, 'several');
    expect((await screen.findByTestId('engine-posture-context')).textContent).toBe('Two simulated entries since 11 Oct.');
    const rows = screen.getByTestId('dashboard-since-entries').querySelectorAll('li');
    expect(Array.from(rows).map(row => row.textContent)).toEqual(['Simulated deposit12 Oct+$500.00', 'Simulated withdrawal13 Oct−$20.00']);
    setupTicketB(route, 'no-change');
    expect((await screen.findByTestId('engine-posture-context')).textContent).toBe('No simulated activity since 13 Oct.');
    expect(screen.getByText('The ZMW estimate can change with the exchange rate.')).toBeDefined();
  }
});

test('own-sim Home renders each figure and claim exactly once', async () => {
  for (const route of B_ROUTES) {
    for (const state of ['fallback', 'one', 'several', 'no-change'] as const) {
      setupTicketB(route, state);
      const card = await screen.findByTestId('dashboard-current-status');
      expect(screen.getAllByTestId('usd-balance')).toHaveLength(1);
      expect(card.textContent?.match(/\$480\.00/g) ?? []).toHaveLength(0);
      expect(card.textContent?.split(B_LIMIT).length).toBe(2);
      expect(card.textContent?.match(/\$20\.00/g) ?? []).toHaveLength(state === 'no-change' ? 0 : 1);
      expect(card.textContent?.match(/\$500\.00/g) ?? []).toHaveLength(state === 'several' ? 1 : 0);
      const activityClaims = (screen.getByTestId('dashboard-balance').textContent ?? '') + card.textContent;
      expect(activityClaims.match(/Includes your simulated activity\.|included in the balance above\./g)).toHaveLength(1);
    }
  }
});

test('Posture qualifier integrates across journey default live and balance-error branches', () => {
  for (const mode of ['journey', 'default', 'live'] as const) {
    for (const error of [false, true]) {
      for (const posture of ['normal', 'tightening', 'tightened', 'recovery'] as const) {
        setupTicketB(mode === 'journey' ? B_ROUTES[0] : '/dashboard', 'fallback');
        cleanup();
        if (mode === 'live') {
          vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'magic');
          vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'live');
        }
        vi.mocked(useBalance).mockReturnValue(makeBalanceState({ total: 480, available: 480, error: error ? 'offline' : null }));
        vi.mocked(useEngineState).mockReturnValue(getMockEngineState(posture));
        render(<DashboardPage />);
        const header = screen.getByTestId('dashboard-current-status');
        expect(header.textContent?.split(B_QUALIFIER).length).toBe(mode === 'live' || posture !== 'normal' ? 2 : 1);
        expect(screen.getByTestId('engine-allocation-bands').textContent?.split(B_QUALIFIER).length).toBe(2);
        if (mode !== 'journey') {
          const snapshot = screen.getByTestId('engine-stability-review-snapshot');
          expect(snapshot.textContent?.split(B_QUALIFIER).length).toBe(2);
          expect(snapshot.textContent).not.toMatch(/Simulation date|Snapshot reflects current system targets as of/);
        }
      }
    }
  }
});

test('Ticket B inclusion preserves pending error loading mismatched first-event and ineligible states', () => {
  for (const variant of ['pending', 'error', 'loading', 'mismatch', 'first-event', 'ineligible', 'non-normal'] as const) {
    setupTicketB(B_ROUTES[0], 'fallback');
    cleanup();
    const balance = makeBalanceState({ total: 480, available: 480 });
    if (variant === 'pending') {
      dashboardStateMocks.transactions.push({ ...dashboardStateMocks.transactions[1], txn_ref: 'b-pending', status: 'pending' });
    } else if (variant === 'error') balance.error = 'offline';
    else if (variant === 'loading') balance.isLoading = true;
    else if (variant === 'mismatch') { balance.total = 490; balance.available = 490; }
    else if (variant === 'first-event') { dashboardStateMocks.transactions.pop(); balance.total = 500; balance.available = 500; }
    else if (variant === 'ineligible') vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('scenario=unavailable-data') as ReturnType<typeof useSearchParams>);
    else vi.mocked(useEngineState).mockReturnValue(getMockEngineState('tightening'));
    vi.mocked(useBalance).mockReturnValue(balance);
    render(<DashboardPage />);
    expect(screen.queryByText(/^(This simulated (deposit|withdrawal)|These simulated entries) (is|are) included in the balance above\.$/)).toBeNull();
    if (variant !== 'loading') expect(screen.getByText('Includes your simulated activity.', { exact: true })).toBeDefined();
  }
});

// §384: expectations are independent literals, never imported runtime copy.
const S18_TITLE = 'Example annual yield (APY)';
const S18_QUALIFIER = 'Illustrative example values, not live targets or advice';
const S18_ERROR = 'Unable to load example yield';
const S18_UNAVAILABLE = 'Example yield unavailable';
type S18State = number | null | 'pending' | 'rejected';

function setupS18(route = '/dashboard', mode: 'simulated' | 'live' = 'simulated', earn = true, status: 'ready' | 'loading' | 'error' = 'ready') {
  cleanup();
  window.localStorage.clear();
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', mode === 'live' ? 'magic' : 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', mode === 'live' ? 'live' : 'stub');
  vi.stubEnv('NEXT_PUBLIC_DEFI_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-10-14T00:00:00.000Z'));
  vi.mocked(usePathname).mockReturnValue(route.split('?')[0]);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(route.split('?')[1]) as ReturnType<typeof useSearchParams>);
  dashboardStateMocks.transactions = [];
  vi.mocked(useBalance).mockReturnValue(makeBalanceState());
  vi.mocked(useEngineState).mockReturnValue(getMockEngineState('normal'));
  vi.mocked(usePolicy).mockReturnValue({
    status, market: 'KE', version: 'v1', resolvedAt: '2026-01-01T00:00:00.000Z', policy: null,
    isFeatureEnabled: vi.fn((key) => status === 'ready' && earn && key === 'earn'),
  });
  vi.mocked(defiAdapter.getNetApy).mockReset();
}

async function renderS18(state: S18State = 0.05) {
  vi.mocked(defiAdapter.getNetApy).mockImplementation(() => {
    if (state === 'pending') return new Promise<number>(() => {});
    if (state === 'rejected') return Promise.reject(new Error('hermetic adapter rejection'));
    // Exercise the existing null branch without changing the adapter contract.
    return Promise.resolve(state as number);
  });
  const view = render(<DashboardPage />);
  await act(async () => { await Promise.resolve(); });
  return view;
}

function expectS18Lock(tile: HTMLElement, state: string) {
  const scope = within(tile);
  const title = scope.getAllByText(S18_TITLE, { exact: true });
  const qualifier = scope.getAllByText(S18_QUALIFIER, { exact: true });
  const value = scope.getAllByText(state, { exact: true });
  expect(title).toHaveLength(1);
  expect(qualifier).toHaveLength(1);
  expect(value).toHaveLength(1);
  expect(Array.from(tile.children).map(child => child.textContent)).toEqual([S18_TITLE, S18_QUALIFIER, state]);
  expect(scope.queryByText('Return rate (context)', { exact: true })).toBeNull();
  expect(title[0].compareDocumentPosition(qualifier[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(qualifier[0].compareDocumentPosition(value[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  for (const element of [...title, ...qualifier, ...value]) {
    expect(element.closest('[hidden], [inert], [aria-hidden="true"]')).toBeNull();
    for (let current: HTMLElement | null = element; current && tile.contains(current); current = current.parentElement) {
      const style = window.getComputedStyle(current);
      expect(style.display).not.toBe('none');
      expect(style.visibility).not.toBe('hidden');
      expect(['', '0']).toContain(style.order);
      expect(style.flexDirection).not.toMatch(/reverse/);
      expect(current.className).not.toMatch(/\b(hidden|invisible|sr-only|order-\S+|flex-\S+-reverse)\b/);
    }
  }
}

function s18Digest(value: string | Buffer) {
  return createHash('sha256').update(value).digest('hex');
}

// Pin every file below these excluded surfaces, including additions/deletions.
const S18_EXCLUDED_ROOTS = [
  'lib/engine', 'lib/defi', 'lib/policy', 'config', 'lib/state',
  'app/(app)/withdraw', 'app/research', 'app/(app)/research-wallet.module.css',
];
function s18ExcludedDigest() {
  const files: string[] = [];
  function visit(path: string) {
    if (statSync(resolve(path)).isDirectory()) {
      for (const child of readdirSync(resolve(path)).sort()) visit(`${path}/${child}`);
    } else files.push(path);
  }
  S18_EXCLUDED_ROOTS.forEach(visit);
  return s18Digest(files.sort().map((path) => `${path}\0${s18Digest(readFileSync(resolve(path)))}`).join('\n'));
}

function s18OutsideTile(view: HTMLElement) {
  const clone = view.cloneNode(true) as HTMLElement;
  clone.querySelector('[data-testid="dashboard-earn-tile"]')?.parentElement?.remove();
  // React's useId sequence is not Home content; canonicalize only generated IDs.
  return clone.innerHTML.replace(/:r[0-9a-z]+:/g, ':react-id:');
}

describe('S18 earn tile fence sweep (§384)', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.mocked(defiAdapter.getNetApy).mockReset().mockResolvedValue(0.05);
    vi.mocked(usePolicy).mockReturnValue({
      status: 'ready', market: '', version: '', resolvedAt: '', policy: null,
      isFeatureEnabled: vi.fn(() => false),
    });
  });

  test('S18 title and qualifier are character-exact and once per visible tile', async () => {
    for (const mode of ['simulated', 'live'] as const) {
      for (const state of [0.05, 'rejected', 'pending', null] as const) {
        setupS18('/dashboard', mode);
        await renderS18(state);
        expectS18Lock(screen.getByTestId('dashboard-earn-tile'), state === 'rejected' ? S18_ERROR : typeof state === 'number' ? '5.00%' : S18_UNAVAILABLE);
      }
    }
  });

  test('S18 qualifier precedes the value or state in visible and assistive order', async () => {
    for (const state of [0.05, 'rejected', 'pending', null] as const) {
      setupS18();
      await renderS18(state);
      expectS18Lock(screen.getByTestId('dashboard-earn-tile'), state === 'rejected' ? S18_ERROR : typeof state === 'number' ? '5.00%' : S18_UNAVAILABLE);
    }
  });

  test('S18 rejection renders the exact example-yield error once', async () => {
    setupS18();
    const view = await renderS18('rejected');
    const tile = screen.getByTestId('dashboard-earn-tile');
    // Rejection stays an error on rerender: no retry, fallback or swallowed error.
    view.rerender(<DashboardPage />);
    expect(defiAdapter.getNetApy).toHaveBeenCalledTimes(1);
    expect(defiAdapter.getNetApy).toHaveBeenCalledWith();
    expect(within(tile).queryByText('Unable to load APY', { exact: true })).toBeNull();
    expect(within(tile).queryByText(S18_UNAVAILABLE, { exact: true })).toBeNull();
    expect(tile.textContent).not.toMatch(/\d+\.\d{2}%/);
    expect(tile.querySelector('button')).toBeNull();
    expectS18Lock(tile, S18_ERROR);
  });

  test('S18 null and pending render the exact unavailable state once', async () => {
    for (const state of ['pending', null] as const) {
      setupS18();
      await renderS18(state);
      const tile = screen.getByTestId('dashboard-earn-tile');
      expect(tile.textContent).not.toMatch(/\bn\/a\b|loading/i);
      expect(within(tile).queryByText(S18_ERROR, { exact: true })).toBeNull();
      expect(defiAdapter.getNetApy).toHaveBeenCalledTimes(1);
      expectS18Lock(tile, S18_UNAVAILABLE);
    }
  });

  test('S18 preserves two-decimal percentage formatting and adapter behavior', async () => {
    for (const [fraction, formatted] of [[0.05, '5.00%'], [0.08, '8.00%'], [0.012345, '1.23%'], [0, '0.00%'], [-0.001, '-0.10%']] as const) {
      setupS18();
      const view = await renderS18(fraction);
      expect(defiAdapter.getNetApy).toHaveBeenCalledTimes(1);
      expect(defiAdapter.getNetApy).toHaveBeenCalledWith();
      view.rerender(<DashboardPage />);
      expect(defiAdapter.getNetApy).toHaveBeenCalledTimes(1);
      expect(within(screen.getByTestId('dashboard-earn-tile')).getByText(formatted, { exact: true })).toBeDefined();
    }
    setupS18();
    await renderS18('rejected');
    expect(screen.getByTestId('dashboard-earn-tile').textContent).not.toMatch(/\d+\.\d{2}%/);
    setupS18();
    await renderS18();
    expectS18Lock(screen.getByTestId('dashboard-earn-tile'), '5.00%');
  });

  test('S18 preserves eligible-journey suppression and policy gates', async () => {
    for (const route of B_ROUTES) {
      for (const example of ['own', 'daniel', 'sarah']) {
        setupS18(`${route}${route.includes('?') ? '&' : '?'}example=${example}`);
        await renderS18();
        expect(screen.queryByTestId('dashboard-earn-tile')).toBeNull();
        expect(screen.getByRole('combobox', { name: 'Choose an example' })).toBeDefined();
        // Existing unconditional adapter mount remains even behind a hidden tile.
        expect(defiAdapter.getNetApy).toHaveBeenCalledTimes(1);
      }
    }
    for (const [earn, status] of [[false, 'ready'], [true, 'loading'], [true, 'error']] as const) {
      setupS18('/dashboard', 'simulated', earn, status);
      await renderS18();
      expect(screen.queryByTestId('dashboard-earn-tile')).toBeNull();
      expect(defiAdapter.getNetApy).toHaveBeenCalledTimes(1);
    }
    setupS18();
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ error: 'offline' }));
    await renderS18();
    expect(screen.queryByTestId('dashboard-earn-tile')).toBeNull();
    for (const route of ['/dashboard?example=daniel', '/dashboard?example=sarah', '/dashboard?journey=class-a-val-002&scenario=unavailable-data']) {
      setupS18(route);
      await renderS18();
      expect(within(screen.getByTestId('dashboard-earn-tile')).getByText('5.00%', { exact: true })).toBeDefined();
    }
    setupS18('/dashboard?journey=class-a-val-002', 'live');
    await renderS18();
    expect(within(screen.getByTestId('dashboard-earn-tile')).getByText('5.00%', { exact: true })).toBeDefined();
    setupS18();
    vi.mocked(useBalance).mockReturnValue(makeBalanceState({ isLoading: true }));
    await renderS18();
    expectS18Lock(screen.getByTestId('dashboard-earn-tile'), '5.00%');
  });

  test('S18 changes no other Home copy or excluded source', async () => {
    const baseline: Record<string, string> = {};
    const cases = [
      ['/dashboard', 'simulated'], ['/dashboard', 'live'],
      ...B_ROUTES.flatMap((route) => ['own', 'daniel', 'sarah'].map((example) => [`${route}${route.includes('?') ? '&' : '?'}example=${example}`, 'simulated'])),
    ];
    for (const [route, mode] of cases) {
      setupS18(route, mode as 'simulated' | 'live');
      const view = await renderS18();
      baseline[`${mode}:${route}`] = s18Digest(s18OutsideTile(view.container));
      expect(useBalance()).toMatchObject({ total: 100, available: 100, pending: 0, currency: 'USD' });
      expect(useEngineState()).toEqual(getMockEngineState('normal'));
    }
    // Captured from unchanged e901a56 before runtime edits; never refresh from green.
    expect(baseline).toEqual({
      "simulated:/dashboard": "0dadda5310541c5d62aec1cb4e919c0d3aa23f82017234d7c85a97fb487393c5",
      "live:/dashboard": "fc912dcd7a591563f2faa95d8b9627b6aa9299e3cd55f5ec5b1c7e99e2348961",
      "simulated:/dashboard-synthetic-journey?example=own": "61a738c8b05c6cd981874835b30d6d25542276fef8ce4f9e46f6537d7a628389",
      "simulated:/dashboard-synthetic-journey?example=daniel": "f533d508f1ebdb0d8122577c6b6558b68f308101a3db96e549b89384f4141e07",
      "simulated:/dashboard-synthetic-journey?example=sarah": "937876d4deeb41c13fb070677fa99544a5b6f471df3276d550ddd134b3a1336d",
      "simulated:/dashboard?journey=class-a-val-002&example=own": "61a738c8b05c6cd981874835b30d6d25542276fef8ce4f9e46f6537d7a628389",
      "simulated:/dashboard?journey=class-a-val-002&example=daniel": "e78fd3584ce555f456e78783207de3b1975bb339d9adb0cd9bcf12bd1cf3ba66",
      "simulated:/dashboard?journey=class-a-val-002&example=sarah": "937876d4deeb41c13fb070677fa99544a5b6f471df3276d550ddd134b3a1336d"
});
    expect(s18ExcludedDigest()).toBe('cea366ecc247a70300f3d1a4c06116f0efaa515b7240210e8839bf04104341ed');
    setupS18();
    await renderS18();
    expectS18Lock(screen.getByTestId('dashboard-earn-tile'), '5.00%');
  });
});
