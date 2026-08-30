// @vitest-environment jsdom

import React from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
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
  resetWallet: vi.fn(),
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

vi.mock("../lib/state/wallet", () => ({
  useWalletStore: vi.fn((selector: (state: { reset: () => void }) => unknown) =>
    selector({ reset: dashboardStateMocks.resetWallet })
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
  }) => <div {...props}>{usdAmount}</div>,
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
import { usePathname, useSearchParams } from "next/navigation";

function makeBalanceState(
  overrides: Partial<ReturnType<typeof useBalance>> = {}
) {
  return {
    total: 100,
    available: 100,
    pending: 0,
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
  dashboardStateMocks.transactions = [];
  dashboardStateMocks.clearLedger.mockClear();
  dashboardStateMocks.resetWallet.mockClear();
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
          name: /Start first simulated event/,
        })
      ).getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(screen.getByTestId("dashboard-orientation").textContent).toContain(
      "See what you have and what changed."
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
          name: /Start first simulated event/,
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
        name: "See what you have and what changed.",
      })
    ).toBeDefined();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(orientation.textContent).toContain("Financial position");
    expect(orientation.textContent).toContain(
      "Hedgr helps you understand and maintain your financial stability."
    );
    expect(orientation.textContent).toContain("not an instruction");
    expect(orientation.textContent).toContain(
      "This walkthrough provides context, not an instruction."
    );
    expect(orientation.textContent).not.toMatch(
      /Financial Stability Companion|crypto|blockchain|stablecoin|DeFi|trading|yield routing/i
    );
    expect(screen.getByText("Your current position")).toBeDefined();
    const explainer = screen.getByTestId(
      "dashboard-synthetic-balance-explainer"
    );
    expect(explainer.textContent).toBe("Illustrative position only.");
    expect(explainer.textContent).not.toMatch(
      /fixture|informational posture|settlement/i
    );

    expect(screen.getByText("Does anything need attention?")).toBeDefined();
    expect(
      screen.getByTestId("engine-simulation-attention-answer").textContent
    ).toBe("There is not enough information to compare yet.");
    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.queryByText("NORMAL")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "Nothing to compare yet. A first completed simulated event will create a starting point."
    );
    expect(
      screen
        .getByTestId("dashboard-change-evidence")
        .getAttribute("data-comparison-state")
    ).toBe("empty");
    expect(screen.getByText("How your position changed")).toBeDefined();
    expect(screen.getByTestId("dashboard-change-count").textContent).toBe(
      "No completed simulated changes yet"
    );

    const allocation = screen.getByTestId("engine-allocation-bands");
    expect(allocation.getAttribute("data-presentation")).toBe("collapsed");
    expect(allocation.textContent).toContain("What you are building toward");
    expect(allocation.textContent).toContain("Now");
    expect(allocation.textContent).toContain("Reserve");
    expect(allocation.textContent).toContain("Growth");
    expect(allocation.textContent).toContain("not separate balances");
    const optionalAction = screen.getByTestId("dashboard-empty-state");
    expect(
      allocation.compareDocumentPosition(optionalAction) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(optionalAction.textContent).toContain("Do nothing");
    expect(
      screen.getByTestId("dashboard-optional-actions").textContent
    ).toContain("What happens next is your decision");
    expect(screen.getByRole("main").textContent).not.toContain("—");
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

    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-balance").textContent).toContain("0");
    await waitFor(() => {
      expect(dashboardStateMocks.clearLedger).toHaveBeenCalledTimes(1);
      expect(dashboardStateMocks.resetWallet).toHaveBeenCalledTimes(1);
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

    const evidence = await screen.findByTestId("dashboard-change-evidence");
    expect(evidence.getAttribute("data-comparison-state")).toBe("first-event");
    expect(evidence.textContent).toContain("How your position changed");
    expect(screen.getByTestId("dashboard-change-count").textContent).toBe(
      "1 completed simulated change"
    );
    expect(evidence.textContent).toContain("$0.00");
    expect(screen.getByTestId("dashboard-change-delta").textContent).toBe(
      "+$5.00"
    );
    expect(screen.getByTestId("dashboard-change-result").textContent).toBe(
      "$5.00"
    );
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "A first simulated position is now visible. There is no earlier position to compare yet."
    );
    expect(
      screen.getByTestId("engine-simulation-attention-answer").textContent
    ).toBe("There is no earlier position to compare yet.");
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
    const balanceEvidence = screen.getByTestId("dashboard-balance-evidence");
    expect(balanceEvidence.textContent).toContain("View Activity");
    expect(balanceEvidence.getAttribute("href")).toBe(
      "/activity?journey=class-a-val-002"
    );
    expect(
      screen.getByTestId("dashboard-restart-journey").textContent
    ).toContain("begins again at $0");
    const evidence = screen.getByTestId("dashboard-change-evidence");
    expect(evidence.getAttribute("data-comparison-state")).toBe("change");
    expect(evidence.textContent).toContain("$5.00");
    expect(screen.getByTestId("dashboard-change-count").textContent).toBe(
      "2 completed simulated changes"
    );
    expect(screen.getByTestId("dashboard-change-delta").textContent).toBe(
      "−$2.00"
    );
    expect(screen.getByTestId("dashboard-change-result").textContent).toBe(
      "$3.00"
    );
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "The simulated expense explains why the current position is $2.00 lower."
    );
    expect(
      screen.getByTestId("engine-simulation-attention-answer").textContent
    ).toBe("No other change stands out in the information shown.");
    expect(
      screen
        .getByRole("link", { name: /Review what changed/ })
        .getAttribute("href")
    ).toBe("/activity?journey=class-a-val-002");

    fireEvent.click(restartButton);
    expect(dashboardStateMocks.clearLedger).not.toHaveBeenCalled();
    expect(dashboardStateMocks.resetWallet).not.toHaveBeenCalled();

    fireEvent.click(restartButton);
    expect(confirmRestart).toHaveBeenCalledTimes(2);
    expect(dashboardStateMocks.clearLedger).toHaveBeenCalledTimes(1);
    expect(dashboardStateMocks.resetWallet).toHaveBeenCalledTimes(1);
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
    expect(screen.queryByTestId("dashboard-orientation")).toBeNull();
  });

  test("mounts the engine posture header in the primary dashboard path", () => {
    vi.mocked(useBalance).mockReturnValue(makeBalanceState());
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("tightening") as EngineState
    );

    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-current-overview")).toBeDefined();
    expect(dashboardStateMocks.policyContexts).toContain("default");
    expect(screen.getByTestId("engine-posture-badge")).toBeDefined();
    expect(screen.getByTestId("engine-posture-badge").textContent).toBe(
      "TIGHTENING"
    );
    expect(screen.getByTestId("engine-posture-banner")).toBeDefined();
    expect(
      screen.getByTestId("engine-posture-action-guidance").textContent
    ).toBe("There is nothing here you need to manage.");
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
    expect(screen.getByText(ENGINE_NOTICE_COPY.tightening.title)).toBeDefined();

    const orderedSections = [
      screen.getByTestId("dashboard-balance"),
      screen.getByTestId("dashboard-current-status"),
      screen.getByTestId("engine-allocation-bands"),
      snapshot,
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
      "dashboard-disclosures",
    ]) {
      const disclosure = screen.getByTestId(testId);
      expect(disclosure.tagName).toBe("DETAILS");
      expect(disclosure.hasAttribute("open")).toBe(false);
    }
  });

  test("mounts the engine posture header in the balance error path", () => {
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ error: "Unable to load balance" })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("tightened") as EngineState
    );

    render(<DashboardPage />);

    expect(screen.getByTestId("engine-posture-badge").textContent).toBe(
      "TIGHTENED"
    );
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
