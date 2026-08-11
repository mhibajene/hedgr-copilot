// @vitest-environment jsdom

import React from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
    (selector: (state: { transactions: unknown[]; clear: () => void }) => unknown) =>
      selector({
        transactions: dashboardStateMocks.transactions,
        clear: dashboardStateMocks.clearLedger,
      })
  ),
}));

vi.mock("../lib/state/wallet", () => ({
  useWalletStore: vi.fn(
    (selector: (state: { reset: () => void }) => unknown) =>
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
  PolicyDisclosure: () => <div data-testid="policy-disclosure" />,
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
        await screen.findByRole("link", { name: "Start simulated deposit" })
      ).getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(screen.getByTestId("dashboard-orientation").textContent).toContain(
      "Hedgr has read your simulated position for you."
    );
  });

  test("honors the explicit synthetic journey query outside local development", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(
        "journey=class-a-val-002"
      ) as ReturnType<typeof useSearchParams>
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
        await screen.findByRole("link", { name: "Start simulated deposit" })
      ).getAttribute("href")
    ).toBe("/deposit?journey=class-a-val-002");
    expect(
      screen.getByTestId("dashboard-current-overview").getAttribute("aria-label")
    ).toBe("Current simulation overview");
    const orientation = screen.getByTestId("dashboard-orientation");
    expect(orientation.textContent).toContain("Financial position");
    // Institution carries the first interpretive step (CLASS-A-VAL-002-WARMTH-001).
    expect(orientation.textContent).toContain(
      "Hedgr has read your simulated position for you."
    );
    // Guidance-versus-instruction and no-money-moved boundary remain (semantic invariant).
    expect(orientation.textContent).toContain("not an instruction");
    expect(orientation.textContent).toContain("not proof that money moved");
    // Participant retains judgement (semantic invariant).
    expect(orientation.textContent).toContain("your decision");
    expect(orientation.textContent).not.toMatch(
      /Financial Stability Companion|crypto wallet|bank|budgeting app|trading product/i
    );
    expect(screen.getByText("Simulated balance")).toBeDefined();
    const explainer = screen.getByTestId(
      "dashboard-synthetic-balance-explainer"
    );
    expect(explainer.textContent).toContain(
      "exists only in this research simulation"
    );
    expect(explainer.textContent).toContain("not a real account balance");
    expect(explainer.textContent).toContain("no money is being held or moved");
    expect(explainer.textContent).not.toMatch(
      /fixture|informational posture|settlement/i
    );

    expect(screen.getByText("Does anything need attention?")).toBeDefined();
    expect(
      screen.getByTestId("engine-simulation-attention-answer").textContent
    ).toBe("No important change shown");
    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.queryByText("NORMAL")).toBeNull();
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "The simulated position is within its expected range."
    );

    const allocation = screen.getByTestId("engine-allocation-bands");
    expect(allocation.getAttribute("data-presentation")).toBe("collapsed");
    expect(allocation.textContent).toContain("Stability guidance");
    expect(allocation.textContent).toContain(
      "See what Hedgr prioritizes when interpreting stability"
    );
    const prioritiesDetails = screen.getByTestId(
      "engine-allocation-priorities-details"
    );
    const rolesDetails = screen.getByTestId("engine-allocation-roles-details");
    const valuesDetails = screen.getByTestId("engine-allocation-values-details");
    for (const details of [prioritiesDetails, rolesDetails, valuesDetails]) {
      expect(details.tagName).toBe("DETAILS");
      expect(details.hasAttribute("open")).toBe(false);
    }
    expect(
      screen.getByTestId("engine-allocation-target-roles").textContent
    ).not.toMatch(/\d+%/);

    expect(
      screen.queryByTestId("engine-stability-review-snapshot")
    ).toBeNull();
    expect(screen.queryByText("Simulation date")).toBeNull();
    expect(screen.queryByText("Last viewed locally")).toBeNull();
    expect(screen.queryByTestId("dashboard-education")).toBeNull();
  });

  test("restarts a completed explicit synthetic journey only after confirmation", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(
        "journey=class-a-val-002"
      ) as ReturnType<typeof useSearchParams>
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
    expect(screen.getByTestId("dashboard-restart-journey").textContent).toContain(
      "begins again at $0"
    );

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
      screen.getByTestId("dashboard-current-status"),
      screen.getByTestId("dashboard-balance"),
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
