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
      "No deposits yet. Your first one will start this chart."
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
      "A simulated withdrawal on 1 Jan."
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
    expect(screen.getByRole("button", { name: /^Currency context$/ }).textContent).toContain("Try example exchange rates");
    expect(screen.queryByTestId("engine-simulation-attention-answer")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toContain("A simulated withdrawal on 1 Jan.");
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
      await screen.findByTestId('dashboard-current-status');
      expect(screen.queryByTestId('engine-posture-context')).toBeNull();
      expect(screen.getByTestId('example-line-chart').querySelector('[data-chart-label]')!.textContent).toBe('1 change since your last visit');
    }
    setupTicketB(route, 'several');
    await screen.findByTestId('dashboard-current-status');
    expect(screen.queryByTestId('engine-posture-context')).toBeNull();
    expect(screen.getByTestId('example-line-chart').querySelector('[data-chart-label]')!.textContent).toBe('2 changes since your last visit');
    expect(screen.queryByTestId('dashboard-since-entries')).toBeNull();
    const rows = screen.getByTestId('chart-event-list').querySelectorAll('li');
    expect(Array.from(rows).map(row => row.textContent)).toEqual(['First deposit +$500.00 · 12 Oct', 'Withdrawal −$20.00 · 13 Oct']);
    setupTicketB(route, 'no-change');
    expect((await screen.findByTestId('engine-posture-context')).textContent).toBe('No changes since your last visit');
    expect(screen.getByText('The ZMW estimate can change with the exchange rate.')).toBeDefined();
  }
});

test('S9 status-line-no-count-in-sim', async () => {
  for (const route of B_ROUTES) {
    for (const [state, count] of [['one', 1], ['several', 2]] as const) {
      setupTicketB(route, state);
      const card = await screen.findByTestId('dashboard-current-status');
      expect(screen.queryByTestId('engine-posture-context')).toBeNull();
      expect(within(card).getByRole('heading', { name: 'Since you were last here' })).toBeDefined();
      expect(card.textContent).toContain(count === 1 ? 'This simulated withdrawal is included in the balance above.' : 'These simulated entries are included in the balance above.');
      expect(screen.getByTestId('example-line-chart').querySelector('[data-chart-label]')!.textContent).toBe(`${count} ${count === 1 ? 'change' : 'changes'} since your last visit`);
    }
    setupTicketB(route, 'no-change');
    expect((await screen.findByTestId('engine-posture-context')).textContent).toBe('No changes since your last visit');
    expect(screen.getAllByText('No changes since your last visit', { exact: true })).toHaveLength(1);
    expect(screen.getByTestId('example-line-chart').querySelectorAll('[data-chart-label]')).toHaveLength(0);
    expect(screen.getAllByTestId('chart-event-dot').length).toBeGreaterThan(0);
  }
  for (const [state, expected] of [
    ['one', 'One simulated withdrawal of $20.00 on 13 Oct took your position from $500.00 to $480.00.'],
    ['several', 'Two things changed since 11 Oct. Your position went from $0.00 to $480.00.'],
    ['no-change', 'Nothing has changed since 13 Oct. Your position is still $480.00.'],
  ] as const) {
    setupTicketB('/dashboard', state);
    expect((await screen.findByTestId('engine-posture-context')).textContent).toBe(expected);
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
      expect(card.textContent?.match(/\$20\.00/g) ?? []).toHaveLength(0);
      expect(card.textContent?.match(/\$500\.00/g) ?? []).toHaveLength(0);
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
// §398 F1: immutable six-path manifest at 0ca5ab8d (unchanged at activation base).
// R1–R16 cover the replacement behaviour; every other source and manifest entry stays pinned.
const RESEARCH_PRE_RUNTIME_HASHES: Record<string, string> = {
  "app/research/ResearchChrome.tsx": "a6fc1d55bead2486c6aa9b91baaf5e9aa7c59fc5ff2fd7acaa78a5faf03887b0",
  "app/research/research.module.css": "8587613e47a81f7fc6ff3f2dacf9f70138014f9fba87120b8771ab2cdd2ff03a",
  "app/research/reserve-scenario/ReserveScenarioStimulus.tsx": "b4a93a21b248df48d18802b563f40fd93529dfe188f0fabe2584ea73fab5ecff",
  "app/research/reserve-scenario/page.tsx": "718e8d215cf886415faf4b2cf54ed4b966dbe542cc16beac744a0a4535211f78",
  "app/research/stability-scenarios/ScenarioStimulus.tsx": "54727ac864c17ec943c424cd69ccd96d9d36c15d8e32b6dd63f288631950146b",
  "app/research/stability-scenarios/page.tsx": "f45d77e2bbac700da54b6e6c2884b6c128b181a9256119cfc7002313baed4b32"
};
function s18ExcludedDigest() {
  // Prove only the additive Sarah field changed before retaining the historical pin.
  expect(s18Digest(releaseGate003PreRuntime('lib/state/synthetic-journey.ts', readFileSync(resolve('lib/state/synthetic-journey.ts')).toString()))).toBe('ac3d3d29607619c2f8196a5ef062677c8a2796a531e87b31ad90106cce78a9f9');
  const files: string[] = [];
  function visit(path: string) {
    if (statSync(resolve(path)).isDirectory()) {
      for (const child of readdirSync(resolve(path)).sort()) visit(`${path}/${child}`);
    } else files.push(path);
  }
  S18_EXCLUDED_ROOTS.forEach(visit);
  return s18Digest(files.sort().map((path) => `${path}\0${RESEARCH_PRE_RUNTIME_HASHES[path] ?? (path === 'lib/state/synthetic-journey.ts' ? 'd1f5117cd75691c4d7404dbe7746673e3bdbd168c225f10bb5447163e3584366' : s18Digest(scPreRuntime(releaseGatePreRuntime(path, studyBridgePreRuntime(path, releaseGate002PreRuntime(path, releaseGate003PreRuntime(path, readFileSync(resolve(path)).toString())))), SC_ENGINE_SOURCE_EDITS[path] ?? [])))}`).join('\n'));
}

function s18OutsideTile(view: HTMLElement) {
  const clone = view.cloneNode(true) as HTMLElement;
  clone.querySelector('[data-testid="dashboard-earn-tile"]')?.parentElement?.remove();
  if (clone.querySelector('#dashboard-example-picker')) {
    // HOME-SOFTHALO-RATESLIDER-BUNDLE-001: only the replaced modal/launcher region.
    clone.querySelector('[data-testid="currency-insight"]')?.remove();
    const protectedHero = Array.from(clone.querySelectorAll('[data-testid="dashboard-arrival-announcement"], [data-testid="dashboard-synthetic-balance-explainer"], [class*="available"]')).map(n => n.textContent);
    const example = clone.querySelector('[data-testid="dashboard-daniel-read"], [data-testid="dashboard-sarah-read"]');
    const protectedExample = example ? Array.from(example.querySelectorAll('p, a')).map(n => n.textContent).filter(t => t?.startsWith('Example rate:') || t?.startsWith('This is what happened') || t?.startsWith('Fictional course fee.') || t === 'Go to your own simulation' || t === 'Due 1 Oct 2027.') : [];
    clone.querySelectorAll('[data-testid="dashboard-position-line"], [data-testid="chart-event-list"], [data-testid="daniel-invariant"]').forEach(n => n.remove());
    clone.querySelectorAll('[data-home-state^="since-"] [data-testid="engine-posture-context"]').forEach(n => { n.textContent = ':authorised-since:'; });
    clone.querySelector('[data-testid="dashboard-since-entries"]')?.remove();
    clone.querySelector('#dashboard-orientation-heading')?.remove();
    clone.querySelector('[data-testid="dashboard-balance"]')?.remove();
    example?.remove();
    clone.querySelectorAll('[data-component="RateLine"]').forEach(n => n.remove());
    return JSON.stringify({ outside: clone.innerHTML.replace(/:r[0-9a-z]+:/g, ':react-id:'), protectedHero, protectedExample });
  }
  // Default/live HTML and their two original hashes remain byte-for-byte controls.
  return scPreRuntime(clone.innerHTML.replace(/:r[0-9a-z]+:/g, ':react-id:'), SC_NON_JOURNEY_HTML_EDITS);
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
      if (route.includes('example=daniel')) {
        expect(screen.getByTestId('daniel-invariant').textContent).toBe('He made two deposits and none since. Each kwacha figure uses the example rate for its date.');
        expect(screen.getByTestId('chart-event-list').textContent).toContain('First deposit +$500.00 · 12 Jun');
      } else if (route.includes('example=sarah')) {
        expect(screen.getByTestId('chart-event-list').textContent).toBe('First deposit +ZMW 4,000.00 · 14 AprDeposit +ZMW 2,000.00 · 21 Jul');
      }
      expect(useBalance()).toMatchObject({ total: 100, available: 100, pending: 0, currency: 'USD' });
      expect(useEngineState()).toEqual(getMockEngineState('normal'));
    }
    // §391 F3: captured on unmodified b3ada40 before runtime, after excluding only
    // authorised journey regions. Both original non-journey hashes stay fixed.
    expect(baseline).toEqual({
      "simulated:/dashboard": "0dadda5310541c5d62aec1cb4e919c0d3aa23f82017234d7c85a97fb487393c5",
      "live:/dashboard": "fc912dcd7a591563f2faa95d8b9627b6aa9299e3cd55f5ec5b1c7e99e2348961",
      "simulated:/dashboard-synthetic-journey?example=own": "3af19b8cd1692dcde91d989b80e5d9a8d773b5e55f568fcc99c1e218f03b26cc",
      "simulated:/dashboard-synthetic-journey?example=daniel": "c55064116f69b225003fc31573f27a602e8af88fa323f0db6e9f2ef0139b0cad",
      "simulated:/dashboard-synthetic-journey?example=sarah": "06e277c1f75575e1fe56fa6170ff15a2537a99f15884e1617dc9535cfe644de0",
      "simulated:/dashboard?journey=class-a-val-002&example=own": "3af19b8cd1692dcde91d989b80e5d9a8d773b5e55f568fcc99c1e218f03b26cc",
      "simulated:/dashboard?journey=class-a-val-002&example=daniel": "c55064116f69b225003fc31573f27a602e8af88fa323f0db6e9f2ef0139b0cad",
      "simulated:/dashboard?journey=class-a-val-002&example=sarah": "06e277c1f75575e1fe56fa6170ff15a2537a99f15884e1617dc9535cfe644de0"
});
    expect(s18ExcludedDigest()).toBe('cea366ecc247a70300f3d1a4c06116f0efaa515b7240210e8839bf04104341ed');
    setupS18();
    await renderS18();
    expectS18Lock(screen.getByTestId('dashboard-earn-tile'), '5.00%');
  });
});

// §394: exact pre-runtime old/new snippets; all original S18 hashes remain.
function studyBridgePreRuntime(path: string, value: string): string {
  return path === 'app/research/ResearchBridge.tsx'
    ? value.replace('/dashboard-synthetic-journey?reset=1&study=1', '/dashboard-synthetic-journey?reset=1')
    : value;
}
const SC_ENGINE_SOURCE_EDITS: Record<string, string[][]> = {
  "lib/engine/notices.ts": [
    [
      "\nexport const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {\n  tightening: {\n    title: 'Stability protection is tightening',\n    body: 'The system is moving toward a more protective mix while conditions are reviewed. When protection and the reserve take priority, the conservative yield target can be lower. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',\n  },\n  tightened: {\n    title: 'Stability protection is elevated',\n    body: 'The system is holding a more protective mix with the reserve prioritized while conditions stay elevated. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',\n  },\n  recovery: {\n    title: 'Stability protection is easing',\n    body: 'The system is moving toward steadier targets as conditions stabilize, with reserve discipline still in view. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',\n  },\n};\n",
      "\nexport const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {\n  tightening: {\n    title: 'Targets are changing',\n    body: 'When the Reserve target goes up, the target for earning can go down. These are targets, not your balance.',\n  },\n  tightened: {\n    title: 'Targets are set higher than usual',\n    body: 'These are targets, not your balance.',\n  },\n  recovery: {\n    title: 'Targets are returning to usual',\n    body: 'These are targets, not your balance.',\n  },\n};\n"
    ]
  ],
  "lib/engine/posture-context.ts": [
    [
      "/** One short sentence per posture: definition only. No banner disclaimers duplicated here. */\nexport const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {\n  normal:\n    'Within expected range. Most of your balance stays steady, with conservative yield and reserve capacity kept visible.',\n  tightening:\n    'Protective posture is increasing. Reserve targets are more prominent while conditions are reviewed.',\n  tightened:\n    'Protective posture is elevated. Reserve targets stay prioritized until conditions ease.',\n  recovery:\n    'Within expected range. Targets are easing toward a steadier posture while reserve discipline remains visible.',\n};\n",
      "/** One short sentence per posture: definition only. No banner disclaimers duplicated here. */\nexport const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {\n  normal:\n    'Within the usual range. The main target is the largest of the three planning targets.',\n  tightening:\n    'The Reserve target is going up while conditions are reviewed.',\n  tightened:\n    'The Reserve target is higher than usual until conditions ease.',\n  recovery:\n    'Within the usual range. Targets are returning to their usual levels.',\n};\n"
    ]
  ],
  "lib/engine/protective-guidance-copy.ts": [
    [
      " * Principle-level only. Does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.\n */\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'Protection in plain terms';\n\n/** One framing paragraph: deliberate intent, not operational status. */\nexport const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =\n  'Hedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.';\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [\n  'Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.',\n  'The Reserve above still means readiness in principle. Targets are informational, not your ledger balance.',\n  'A protective posture does not by itself stop a withdrawal from processing or imply lockup.',\n];\n",
      " * Principle-level only. Does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.\n */\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'When targets change';\n\n/** One framing paragraph: deliberate intent, not operational status. */\nexport const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =\n  'In harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.';\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [\n  'The Reserve above still means readiness in principle. Targets are informational, not your ledger balance.',\n  'A higher Reserve target does not stop or delay a withdrawal.',\n];\n"
    ]
  ],
  "lib/engine/stability-explainer-copy.ts": [
    [
      "  definition: string;\n}> = [\n  {\n    term: 'Stable balance',\n    definition: 'The primary holding lane. It is held steady to preserve value.',\n  },\n  {\n    term: 'Conservative yield',\n",
      "  definition: string;\n}> = [\n  {\n    term: 'Main target',\n    definition: 'One of the three planning targets. It is a percentage, not money set aside.',\n  },\n  {\n    term: 'Conservative yield',\n"
    ],
    [
      "];\n\nexport const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [\n  'Most of the structure is held steady. Conservative yield and a reserve are quieter supporting lanes. This shows system intent, not a map of where funds sit.',\n  'When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution. It does not describe completed movement.',\n];\n\nexport const ENGINE_STABILITY_EXPLAINER_FOOTER =\n",
      "];\n\nexport const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [\n  'The three planning targets show a plan. None of them shows where money sits.',\n  'When Hedgr is more cautious, the Reserve target goes up and the target for earning goes down. Nothing is moved.',\n];\n\nexport const ENGINE_STABILITY_EXPLAINER_FOOTER =\n"
    ]
  ],
  "lib/engine/stability-review-snapshot-copy.ts": [
    [
      "  'Illustrative example values, not live targets or advice';\n\nconst STANCE_BY_POSTURE: Record<EnginePosture, string> = {\n  normal: 'Where things stand: within expected range',\n  tightening: 'Where things stand: protective posture increasing',\n  tightened: 'Where things stand: protective posture elevated',\n  recovery: 'Where things stand: within expected range, easing steadily',\n};\n\nexport function getEngineStabilityReviewSnapshotStance(\n",
      "  'Illustrative example values, not live targets or advice';\n\nconst STANCE_BY_POSTURE: Record<EnginePosture, string> = {\n  normal: 'Where things stand: within the usual range',\n  tightening: 'Where things stand: Reserve target going up',\n  tightened: 'Where things stand: Reserve target higher than usual',\n  recovery: 'Where things stand: targets returning to usual',\n};\n\nexport function getEngineStabilityReviewSnapshotStance(\n"
    ],
    [
      "  '“Available” still means ready to use in principle; these targets stay informational.';\n\nexport const ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY =\n  'A protective posture does not, on its own, mean withdrawals are blocked or delayed.';\n\nexport const ENGINE_STABILITY_REVIEW_CADENCE_CUE =\n  'Use this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.';\n\nexport function getEngineStabilityReviewTimestampLine(\n  formattedUpdatedAt: string,\n",
      "  '“Available” still means ready to use in principle; these targets stay informational.';\n\nexport const ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY =\n  'A higher Reserve target does not stop or delay a withdrawal.';\n\nexport const ENGINE_STABILITY_REVIEW_CADENCE_CUE =\n  'Check in here whenever you like. Nothing here asks you to act.';\n\nexport function getEngineStabilityReviewTimestampLine(\n  formattedUpdatedAt: string,\n"
    ]
  ]
};
const SC_NON_JOURNEY_HTML_EDITS = [
  [
    "l-5 leading-relaxed text-[#36447C]\"><li>Most of the structure is held steady. Conservative yield and a reserve are quieter supporting lanes. This shows system intent, not a map of where funds sit.</li><li>When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution. It does not describe completed movement.</li></ul><p class=\"max-w-xl text-xs le",
    "l-5 leading-relaxed text-[#36447C]\"><li>The three planning targets show a plan. None of them shows where money sits.</li><li>When Hedgr is more cautious, the Reserve target goes up and the target for earning goes down. Nothing is moved.</li></ul><p class=\"max-w-xl text-xs le"
  ],
  [
    "ax-w-xl leading-relaxed text-[#1F2937]\">Hedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.</p><ul class=\"mt-4 max-w-xl list-disc ",
    "ax-w-xl leading-relaxed text-[#1F2937]\">In harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.</p><ul class=\"mt-4 max-w-xl list-disc "
  ],
  [
    "ass=\"inline font-medium text-[#171D35]\">Stable balance</dt><dd class=\"inline text-[#1F2937]\"> — The primary holding lane. It is held steady to preserve value.</dd></div><div><dt class=\"inline font",
    "ass=\"inline font-medium text-[#171D35]\">Main target</dt><dd class=\"inline text-[#1F2937]\"> — One of the three planning targets. It is a percentage, not money set aside.</dd></div><div><dt class=\"inline font"
  ],
  [
    "engine-allocation-boundary\" aria-label=\"Stability guidance boundary\"><span class=\"font-semibold text-hedgr-800\">Guidance only.</span> This planning structure is context, not an instruction. It does not show current money or prove that simulated money was divided or moved.</aside><aside class=\"max-w-xl border-t",
    "engine-allocation-boundary\" aria-label=\"What these targets are not\">Targets only. They are not an instruction, and they do not divide or move your balance.</aside><aside class=\"max-w-xl border-t"
  ],
  [
    "tid=\"engine-allocation-philosophy\">Hedgr's guidance makes its priorities visible in this simulation: preserve value first, keep access and risk visible, and understand the situation before action.</p><div class=\"space-y-3\" data-testid=\"engine-allocation-target-roles\" aria-label=\"Stability target roles\"><p class=\"max-w-xl text-sm leading-relaxed text-hedgr-dark\">Hedgr represents those priorities through three distinct target roles.</p><dl class=\"divide-y divide-hedgr-100 border-y border-hedgr-100\"><div class=\"grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-4\" data-testid=\"engine-allocation-role-coreTargetPct\"><dt><span class=\"block text-sm font-semibold text-hedgr-800\">Core stability target</span><span class=\"mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-hedgr-500\">Primary stability role</span></dt><dd class=\"text-sm leading-relaxed text-hedgr-dark\">Preserve value as the primary stability priority.</dd></div><div class=\"grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-4\" data-testid=\"engine-allocation-role-yieldCapPct\"><dt><span class=\"block text-sm font-semibold text-hedgr-800\">Conservative yield</span><span class=\"mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-hedgr-500\">Supporting role</span></dt><dd class=\"text-sm leading-relaxed text-hedgr-dark\">Keep return opportunity limited and conditional.</dd></div><div class=\"grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-4\" data-testid=\"engine-allocation-role-liquidityTargetPct\"><dt><span class=\"block text-sm font-semibold text-hedgr-800\">Reserve</span><span class=\"mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-hedgr-500\">Supporting role</span></dt><dd class=\"text-sm leading-relaxed text-hedgr-dark\">Keep a buffer ready if needed.</dd></div></dl></div><p class=\"max-w-xl text-sm leading-rela",
    "tid=\"engine-allocation-philosophy\">Hedgr shows its targets here: what it sets first, how access works and what the risks are.</p><p class=\"max-w-xl text-sm leading-rela"
  ],
  [
    "-testid=\"engine-posture-context\">Within expected range. Most of your balance stays steady, with conservative yield and reserve capacity kept visible.</p><p class=\"text-sm font-medium text-",
    "-testid=\"engine-posture-context\">Within the usual range. The main target is the largest of the three planning targets.</p><p class=\"text-sm font-medium text-"
  ],
  [
    "nal, not your ledger balance.</li><li>A protective posture does not by itself stop a withdrawal from processing or imply lockup.</li></ul></div></details><details clas",
    "nal, not your ledger balance.</li><li>A higher Reserve target does not stop or delay a withdrawal.</li></ul></div></details><details clas"
  ],
  [
    "cation-targets-intro\">These percentages describe a simulated planning structure for those roles. They are guidance, not current money.</p><dl class=\"divide-y divide-h",
    "cation-targets-intro\">These percentages are Hedgr's planning targets for each role. They are not money.</p><dl class=\"divide-y divide-h"
  ],
  [
    "d text-hedgr-800\">Current state</span>. The simulated balance shown above is separate from this guidance. The percentages do not divide it.</p><p><span class=\"font-semibold text-hedgr-800\">No instruction or movement</span>. Guidance does not tell you what to do, and a target does not divide or move simulated money.</p></div></details></aside></div></sec",
    "d text-hedgr-800\">Current state</span>. Your balance shown above is separate from these targets.</p></div></details></aside></div></sec"
  ],
  [
    "gine-stability-review-snapshot-cadence\">Use this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.</p><p class=\"max-w-xl leadi",
    "gine-stability-review-snapshot-cadence\">Check in here whenever you like. Nothing here asks you to act.</p><p class=\"max-w-xl leadi"
  ],
  [
    "ng targets</span>. The percentages show intended stability priorities in this simulation only.</p><details class=\"mt-3\" data-testid=\"",
    "ng targets</span>. The percentages show how Hedgr divides its plan.</p><details class=\"mt-3\" data-testid=\""
  ],
  [
    "ext-sm leading-relaxed text-hedgr-dark\">The largest target, focused on preserving value.</dd></div><dd class=\"flex items-baseli",
    "ext-sm leading-relaxed text-hedgr-dark\">One of the three targets.</dd></div><dd class=\"flex items-baseli"
  ],
  [
    "ems-center justify-between gap-4\"><span>Protection in plain terms</span><span class=\"text-xs font-medium ",
    "ems-center justify-between gap-4\"><span>When targets change</span><span class=\"text-xs font-medium "
  ],
  [
    "ne-allocation-trust-legend\" aria-label=\"Detailed stability target distinction\"><p><span class=\"font-semibold text-hed",
    "ne-allocation-trust-legend\" aria-label=\"More about targets\"><p><span class=\"font-semibold text-hed"
  ],
  [
    "ccordionSummary_e19afb\"><span>How Hedgr interprets stability</span><span class=\"_chevron_e19afb\" ari",
    "ccordionSummary_e19afb\"><span>How Hedgr sets its targets</span><span class=\"_chevron_e19afb\" ari"
  ],
  [
    "semibold tracking-tight text-hedgr-800\">Stability guidance</h2><p class=\"text-xs leading-relaxed t",
    "semibold tracking-tight text-hedgr-800\">Planning targets</h2><p class=\"text-xs leading-relaxed t"
  ],
  [
    "ppercase tracking-wide text-hedgr-500\">Primary stability guidance</span></dt><dd id=\"engine-allocation-ba",
    "ppercase tracking-wide text-hedgr-500\">Planning target</span></dt><dd id=\"engine-allocation-ba"
  ],
  [
    "ecoration-hedgr-200 underline-offset-4\">Verify what stability targets mean</summary><div class=\"mt-3 ",
    "ecoration-hedgr-200 underline-offset-4\">What these targets mean</summary><div class=\"mt-3 "
  ],
  [
    "shot-stance\">Where things stand: within expected range</p></div><dl class=\"mt-4 grid gap",
    "shot-stance\">Where things stand: within the usual range</p></div><dl class=\"mt-4 grid gap"
  ],
  [
    "k text-sm font-semibold text-hedgr-800\">Core stability target</span><span class=\"mt-0.5 block ",
    "k text-sm font-semibold text-hedgr-800\">Main target</span><span class=\"mt-0.5 block "
  ],
  [
    "uppercase tracking-wide text-hedgr-500\">Stability target</span><span class=\"block text-lg f",
    "uppercase tracking-wide text-hedgr-500\">Target</span><span class=\"block text-lg f"
  ],
  [
    "nciple; these targets stay informational.</p><p class=\"max-w-xl leading-relaxed text-hedgr-dark\">A protective posture does not, on its own, mean withdrawals are blocked or delayed.</p></div></details></section><details ",
    "nciple; these targets stay informational.</p></div></details></section><details "
  ],
  [
    "2.5 pl-5 leading-relaxed text-[#36447C]\"><li>Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.</li><li>The Reserve above still means readi",
    "2.5 pl-5 leading-relaxed text-[#36447C]\"><li>The Reserve above still means readi"
  ],
  [
    "aption\">See the planning position shown in this simulation and why it is structured this way. These",
    "aption\">See the planning position shown and why it is structured this way. These"
  ]
];

function scPreRuntime(value: string, edits: readonly (readonly string[])[]): string {
  for (const [before, after] of edits) value = value.replaceAll(after, before);
  return value;
}

// RELEASE-GATE-FIX-001 P3: exact immutable-base source edits; all original pins remain.
const RELEASE_GATE_SOURCE_EDITS: Record<string, string[][]> = {
  "lib/state/ledger.ts": [
    [
      "/** Bump when ledger Tx shape or persisted format changes; mismatch on load \u2192 clear. */",
      "/** Bump for incompatible persisted formats; optional display metadata stays compatible. Mismatch on load \u2192 clear. */"
    ],
    [
      "  fx_rate: number;",
      "  fx_rate: number;\n  /** Original deposit input for display only; never used in balance or FX arithmetic. */\n  source_local_amount?: number;\n  source_local_currency?: string;"
    ],
    [
      "          fx_rate: update.fx_rate!,",
      "          fx_rate: update.fx_rate!,\n          ...(update.source_local_amount !== undefined ? { source_local_amount: update.source_local_amount } : {}),\n          ...(update.source_local_currency !== undefined ? { source_local_currency: update.source_local_currency } : {}),"
    ]
  ],
  "app/(app)/withdraw/page.tsx": [
    [
      "          <p className=\"text-xs font-semibold uppercase tracking-wide text-hedgr-500\">\n            What would remain\n          </p>\n          <p className=\"mt-1 text-lg font-semibold tabular-nums text-hedgr-800\">\n            ${displayedBalanceBefore.toFixed(2)} \u2212 ${usd.toFixed(2)} = $\n            {remainingAfterWithdrawal.toFixed(2)}\n          </p>",
      "          <p className=\"mt-1 text-lg font-semibold tabular-nums text-hedgr-800\">\n            What would remain: ${remainingAfterWithdrawal.toFixed(2)}\n          </p>"
    ],
    [
      "[{ label: 'Balance', value: <span data-testid=\"withdraw-balance-reconciliation\">${displayedBalanceBefore.toFixed(2)} \u2192 <b>${remainingAfterWithdrawal.toFixed(2)}</b></span> }]",
      "[{ label: 'Balance now ', value: <span data-testid=\"withdraw-balance-reconciliation\"><b>${remainingAfterWithdrawal.toFixed(2)}</b></span> }]"
    ]
  ]
};
function releaseGatePreRuntime(path: string, value: string): string {
  for (const [old, replacement] of [...(RELEASE_GATE_SOURCE_EDITS[path] ?? [])].reverse()) {
    const count = value.split(replacement).length - 1;
    expect(count, path).toBe(1);
    value = value.replace(replacement, old);
  }
  return value;
}

// RELEASE-GATE-FIX-002: reverse only exact authorised link snippets to immutable 01fd6b5.
const RELEASE_GATE_002_SOURCE_EDITS: Record<string, string[][]> = {
  "app/(app)/withdraw/page.tsx": [
    [
      "  getSyntheticJourneyHref,\n  isSyntheticJourneyPrimaryCondition,\n} from '../../../lib/state/synthetic-journey';\n\n",
      "  getSyntheticJourneyHref,\n  isSyntheticJourneyPrimaryCondition,\n  isSyntheticJourneyLinkContext,\n} from '../../../lib/state/synthetic-journey';\n\n"
    ],
    [
      "  const txReviewFlags = useMemo(() => resolveTxReviewSimulatorFlags(search), [search]);\n  const reviewSeamActive = isTxReviewSeamActive(txReviewFlags);\n  const syntheticJourneyActive =\n    isSyntheticJourneyPrimaryCondition(search) &&\n",
      "  const txReviewFlags = useMemo(() => resolveTxReviewSimulatorFlags(search), [search]);\n  const reviewSeamActive = isTxReviewSeamActive(txReviewFlags);\n  const syntheticJourneyLinkContext = isSyntheticJourneyLinkContext(search);\n  const syntheticJourneyActive =\n    isSyntheticJourneyPrimaryCondition(search) &&\n"
    ],
    [
      "          description=\"We couldn't fetch your account balance. Please try again.\"\n          primaryAction={{ label: 'Retry', onClick: refresh }}\n          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}\n          data-testid=\"withdraw-balance-error\"\n        />\n",
      "          description=\"We couldn't fetch your account balance. Please try again.\"\n          primaryAction={{ label: 'Retry', onClick: refresh }}\n          secondaryAction={{ label: 'Go to Dashboard', href: syntheticJourneyLinkContext ? getSyntheticJourneyHref('/dashboard') : '/dashboard' }}\n          data-testid=\"withdraw-balance-error\"\n        />\n"
    ],
    [
      "          description=\"We couldn't fetch the available withdrawal methods. Please try again.\"\n          primaryAction={{ label: 'Retry', onClick: retryLoadMethods }}\n          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}\n          data-testid=\"withdraw-methods-error\"\n        />\n",
      "          description=\"We couldn't fetch the available withdrawal methods. Please try again.\"\n          primaryAction={{ label: 'Retry', onClick: retryLoadMethods }}\n          secondaryAction={{ label: 'Go to Dashboard', href: syntheticJourneyLinkContext ? getSyntheticJourneyHref('/dashboard') : '/dashboard' }}\n          data-testid=\"withdraw-methods-error\"\n        />\n"
    ],
    [
      "            </svg>\n          }\n          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}\n          data-testid=\"withdraw-no-methods\"\n        />\n",
      "            </svg>\n          }\n          secondaryAction={{ label: 'Go to Dashboard', href: syntheticJourneyLinkContext ? getSyntheticJourneyHref('/dashboard') : '/dashboard' }}\n          data-testid=\"withdraw-no-methods\"\n        />\n"
    ],
    [
      "              ? 'Add simulated deposit'\n              : 'Make a deposit',\n            href: syntheticJourneyActive\n              ? getSyntheticJourneyHref('/deposit')\n              : '/deposit',\n",
      "              ? 'Add simulated deposit'\n              : 'Make a deposit',\n            href: syntheticJourneyLinkContext\n              ? getSyntheticJourneyHref('/deposit')\n              : '/deposit',\n"
    ],
    [
      "            title=\"Check the evidence\"\n            why=\"Activity lists both entries and the balance after each one.\"\n            primary={{ label: 'Review Activity', href: syntheticJourneyActive ? getSyntheticJourneyHref('/activity') : '/activity' }}\n            secondary={{ label: 'Back to your position', href: syntheticJourneyActive ? getSyntheticJourneyHref('/dashboard') : '/dashboard' }}\n          />\n        </div>\n",
      "            title=\"Check the evidence\"\n            why=\"Activity lists both entries and the balance after each one.\"\n            primary={{ label: 'Review Activity', href: syntheticJourneyLinkContext ? getSyntheticJourneyHref('/activity') : '/activity' }}\n            secondary={{ label: 'Back to your position', href: syntheticJourneyLinkContext ? getSyntheticJourneyHref('/dashboard') : '/dashboard' }}\n          />\n        </div>\n"
    ]
  ]
};
function releaseGate002PreRuntime(path: string, value: string): string {
  for (const [old, replacement] of RELEASE_GATE_002_SOURCE_EDITS[path] ?? []) {
    if (value.includes(replacement)) {
      expect(value.split(replacement), path).toHaveLength(2);
      value = value.replace(replacement, old);
    } else expect(value, path).toContain(old);
  }
  return value;
}

// RELEASE-GATE-FIX-003: exact authorised hunks reversed before all historical pins.
const RELEASE_GATE_003_SOURCE_EDITS: Record<string, string[][]> = {
  "app/(app)/withdraw/page.tsx": [
    [
      "  CLASS_A_VAL_002_JOURNEY_VALUE,\n  getSyntheticJourneyHref,\n  isSyntheticJourneyPrimaryCondition,\n  isSyntheticJourneyLinkContext,\n} from '../../../lib/state/synthetic-journey';\n\ninterface WithdrawMethod {\n  id: string;\n",
      "  CLASS_A_VAL_002_JOURNEY_VALUE,\n  getSyntheticJourneyHref,\n  isSyntheticJourneyPrimaryCondition,\n  isSyntheticJourneyLinkContext,\n  isSyntheticJourneyUnavailableDataScenario,\n} from '../../../lib/state/synthetic-journey';\n\ninterface WithdrawMethod {\n  id: string;\n"
    ],
    [
      "\n  const txReviewFlags = useMemo(() => resolveTxReviewSimulatorFlags(search), [search]);\n  const reviewSeamActive = isTxReviewSeamActive(txReviewFlags);\n  const syntheticJourneyLinkContext = isSyntheticJourneyLinkContext(search);\n  const syntheticJourneyActive =\n    isSyntheticJourneyPrimaryCondition(search) &&\n    searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===\n      CLASS_A_VAL_002_JOURNEY_VALUE;\n",
      "\n  const txReviewFlags = useMemo(() => resolveTxReviewSimulatorFlags(search), [search]);\n  const reviewSeamActive = isTxReviewSeamActive(txReviewFlags);\n  const syntheticJourneyLinkContext = isSyntheticJourneyLinkContext(search);\n  const unavailableDataScenario = isSyntheticJourneyUnavailableDataScenario(search);\n  const syntheticJourneyActive =\n    isSyntheticJourneyPrimaryCondition(search) &&\n    searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===\n      CLASS_A_VAL_002_JOURNEY_VALUE;\n"
    ],
    [
      "  const displayCurrency = useSimulationDisplayCurrency(syntheticJourneyActive);\n  const quote = syntheticJourneyActive ? displayCurrency : marketQuote;\n  const fx = useLatestFx(`USD${marketQuote}`);\n  const backendRate = fx.status === 'success' && fx.data ? fx.data.rate : null;\n  const rate = syntheticJourneyActive ? getSimulationDisplayRate(displayCurrency) : backendRate;\n  const confirmTx = useLedgerStore((s) => s.confirm);\n  const failTx = useLedgerStore((s) => s.fail);\n\n  const [usdInput, setUsdInput] = useState('');\n",
      "  const displayCurrency = useSimulationDisplayCurrency(syntheticJourneyActive);\n  const quote = syntheticJourneyActive ? displayCurrency : marketQuote;\n  const fx = useLatestFx(`USD${marketQuote}`);\n  const backendRate = fx.status === 'success' && fx.data ? fx.data.rate : null;\n  const rate = unavailableDataScenario ? null : syntheticJourneyActive ? getSimulationDisplayRate(displayCurrency) : backendRate;\n  const confirmTx = useLedgerStore((s) => s.confirm);\n  const failTx = useLedgerStore((s) => s.fail);\n\n  const [usdInput, setUsdInput] = useState('');\n"
    ],
    [
      "  if (available === 0 && !simulatedResultActive) {\n    return (\n      <main className={`mx-auto max-w-xl p-6 ${finish.choice}`}>\n        <h1 className=\"text-2xl font-semibold\">Withdraw</h1>\n        <EmptyState\n          title={\n            productSimulationActive\n              ? 'No simulated funds to withdraw'\n",
      "  if (available === 0 && !simulatedResultActive) {\n    return (\n      <main className={`mx-auto max-w-xl p-6 ${finish.choice}`}>\n        <h1 className=\"text-2xl font-semibold\">Withdraw</h1>\n        {unavailableDataScenario ? (\n          <MarketDataContinuityPanel\n            route=\"withdraw\"\n            onRetryFx={fx.retry}\n            labelled={productSimulationActive}\n            data-testid=\"withdraw-market-data-continuity\"\n          />\n        ) : null}\n        <EmptyState\n          title={\n            productSimulationActive\n              ? 'No simulated funds to withdraw'\n"
    ],
    [
      "          data-testid=\"withdraw-fx-block\"\n        >\n          Simulated example rate: 1 USD = {rate?.toFixed(2)} {quote}\n        </div>\n      ) : fx.status === 'error' ? (\n        <MarketDataContinuityPanel\n          route=\"withdraw\"\n          onRetryFx={fx.retry}\n          labelled={productSimulationActive}\n",
      "          data-testid=\"withdraw-fx-block\"\n        >\n          Simulated example rate: 1 USD = {rate?.toFixed(2)} {quote}\n        </div>\n      ) : unavailableDataScenario || fx.status === 'error' ? (\n        <MarketDataContinuityPanel\n          route=\"withdraw\"\n          onRetryFx={fx.retry}\n          labelled={productSimulationActive}\n"
    ]
  ],
  "lib/state/ledger.ts": [
    [
      "      storage: createLedgerStorage(\n        typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage)\n      ),\n      partialize: (state) => ({ transactions: state.transactions }),\n    }\n  )\n);\n",
      "      storage: createLedgerStorage(\n        typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage)\n      ),\n      partialize: (state) => ({ transactions: state.transactions }),\n      onRehydrateStorage: () => (state) => {\n        if (!state || typeof window === 'undefined' || !state.transactions.some(tx => tx.status === 'pending')) return;\n        // Load after this store has initialized; do not alter persisted entries.\n        void import('../deposits/synthetic-deposit-lifecycle').then(({ recoverSyntheticDeposits }) => recoverSyntheticDeposits());\n        void import('../payments/withdraw.mock').then(({ recoverSyntheticWithdrawals }) => recoverSyntheticWithdrawals());\n      },\n    }\n  )\n);\n"
    ]
  ],
  "lib/state/synthetic-journey.ts": [
    [
      "\n/** \u00a7391: one registry for URL identity, picker names and locked fictional deposit facts. */\nexport const SYNTHETIC_JOURNEY_EXAMPLES = Object.freeze([\n  Object.freeze({ id: CLASS_A_VAL_002_DANIEL_EXAMPLE, name: 'Daniel\u2019s reserve', deposits: Object.freeze([Object.freeze({ at: '2026-06-12T00:00:00.000Z', amount: 500, currency: 'USD' as const }), Object.freeze({ at: '2026-08-14T00:00:00.000Z', amount: 300, currency: 'USD' as const })]), get label() { return this.name.replace('\u2019', \"'\"); } }),\n  Object.freeze({ id: CLASS_A_VAL_002_SARAH_EXAMPLE, name: 'Sarah\u2019s course fee', holding: Object.freeze({ amount: 6000, currency: 'ZMW' as const }), deposits: Object.freeze([Object.freeze({ at: '2026-04-14T00:00:00.000Z', amount: 4000, currency: 'ZMW' as const }), Object.freeze({ at: '2026-07-21T00:00:00.000Z', amount: 2000, currency: 'ZMW' as const })]), get label() { return this.name.replace('\u2019', \"'\"); } }),\n] as const);\n\nexport function parseSyntheticJourneyExample(search?: string): 'own' | (typeof SYNTHETIC_JOURNEY_EXAMPLES)[number]['id'] {\n  const id = getSearchParams(search).get(CLASS_A_VAL_002_EXAMPLE_PARAM);\n",
      "\n/** \u00a7391: one registry for URL identity, picker names and locked fictional deposit facts. */\nexport const SYNTHETIC_JOURNEY_EXAMPLES = Object.freeze([\n  Object.freeze({ id: CLASS_A_VAL_002_DANIEL_EXAMPLE, name: 'Daniel\u2019s reserve', deposits: Object.freeze([Object.freeze({ at: '2026-06-12T00:00:00.000Z', amount: 500, currency: 'USD' as const }), Object.freeze({ at: '2026-08-14T00:00:00.000Z', amount: 300, currency: 'USD' as const })]), get label() { return this.name.replace('\u2019', \"'\"); } }),\n  Object.freeze({ id: CLASS_A_VAL_002_SARAH_EXAMPLE, name: 'Sarah\u2019s course fee', holding: Object.freeze({ amount: 6000, currency: 'ZMW' as const }), usdHolding: Object.freeze({ amount: 222.22, currency: 'USD' as const }), deposits: Object.freeze([Object.freeze({ at: '2026-04-14T00:00:00.000Z', amount: 4000, currency: 'ZMW' as const }), Object.freeze({ at: '2026-07-21T00:00:00.000Z', amount: 2000, currency: 'ZMW' as const })]), get label() { return this.name.replace('\u2019', \"'\"); } }),\n] as const);\n\nexport function parseSyntheticJourneyExample(search?: string): 'own' | (typeof SYNTHETIC_JOURNEY_EXAMPLES)[number]['id'] {\n  const id = getSearchParams(search).get(CLASS_A_VAL_002_EXAMPLE_PARAM);\n"
    ]
  ]
};
function releaseGate003PreRuntime(path: string, value: string): string {
  for (const [old, replacement] of RELEASE_GATE_003_SOURCE_EDITS[path] ?? []) {
    expect(value.split(replacement), path).toHaveLength(2);
    value = value.replace(replacement, old);
  }
  return value;
}
