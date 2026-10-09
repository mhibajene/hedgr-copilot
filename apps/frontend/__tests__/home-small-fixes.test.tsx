// @vitest-environment jsdom

import React from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import type { EngineState } from "../lib/engine/types";
import { PositionLine } from "../app/(app)/dashboard/PositionLine";
import {
  formatSimulationDisplayEstimate,
  SIMULATION_DISPLAY_CURRENCIES,
} from "../lib/state/simulation-display-currency";
import { getSyntheticJourneyHref } from "../lib/state/synthetic-journey";
import type { PositionEntry } from "../lib/state/last-visit";

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
    displayEstimate: _displayEstimate,
    displayEstimateParts: _displayEstimateParts,
    ...props
  }: {
    usdAmount: number;
    displayEstimate?: string;
    displayEstimateParts?: { figure: string; caption: string };
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
    asOf: 1000,
    isLoading: false,
    error: null,
    currency: "USD",
    refresh: vi.fn(),
    ...overrides,
  };
}

function depositTx(createdAt = 1) {
  return {
    txn_ref: "deposit-1",
    type: "deposit" as const,
    status: "settled" as const,
    amount_zmw: 100,
    amount_usd: 5,
    fx_rate: 20,
    created_at: createdAt,
    updated_at: createdAt,
  };
}

function withdrawalTx(createdAt = 3) {
  return {
    txn_ref: "withdrawal-1",
    type: "withdrawal" as const,
    status: "settled" as const,
    amount_zmw: 0,
    amount_usd: 2,
    fx_rate: 0,
    created_at: createdAt,
    updated_at: createdAt,
  };
}

const depositThenWithdraw: PositionEntry[] = [
  {
    id: "deposit-1",
    type: "DEPOSIT",
    amountUSD: 5,
    at: 10,
    balanceBefore: 0,
    balanceAfter: 5,
  },
  {
    id: "withdrawal-1",
    type: "WITHDRAW",
    amountUSD: 2,
    at: 20,
    balanceBefore: 5,
    balanceAfter: 3,
  },
];

const AXIS_TIME = /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{1,2}\/\d{1,2}|Today/;
const PROGRESS_COPY = /✓|✔|\d+\s*(of|\/)\s*\d+|%|step\s*\d/i;
const ATTRIBUTION =
  "This is what happened in the example. It doesn’t tell you what will happen next.";

function activateRoute(route: "default" | "journey") {
  vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
  vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
  vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
  if (route === "journey") {
    vi.mocked(usePathname).mockReturnValue("/dashboard");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams("journey=class-a-val-002") as ReturnType<
        typeof useSearchParams
      >
    );
  } else {
    vi.mocked(usePathname).mockReturnValue("/dashboard");
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams() as ReturnType<typeof useSearchParams>
    );
  }
}

function utilityTestIds() {
  return Array.from(
    screen.getByTestId("dashboard-simulation-utilities").children
  ).map((node) => node.getAttribute("data-testid"));
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

describe.each(["default", "journey"] as const)(
  "Home small fixes on the %s route",
  (route) => {
    test("Home position line draws no max guide or max label on either route", () => {
      const lastVisit = 1;
      render(
        <PositionLine entries={depositThenWithdraw} lastVisit={lastVisit} />
      );
      const line = screen.getByTestId("dashboard-position-line");
      expect(line.querySelectorAll("svg line")).toHaveLength(1);
      expect(line.textContent).not.toContain("$5.00");
    });

    test("Home hides the change chip while the since card shows on either route", async () => {
      activateRoute(route);
      dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
      window.localStorage.setItem("hedgr:last-home-visit", "2");
      vi.mocked(useBalance).mockReturnValue(
        makeBalanceState({ total: 3, available: 3 })
      );
      vi.mocked(useEngineState).mockReturnValue(
        getMockEngineState("normal") as EngineState
      );

      const first = render(<DashboardPage />);
      const changed = await screen.findByTestId("dashboard-current-status");
      expect(changed.getAttribute("data-home-state")).toMatch(/^since-/);
      expect(screen.queryByTestId("dashboard-change-chip")).toBeNull();
      first.unmount();

      window.localStorage.setItem("hedgr:last-home-visit", "10");
      const second = render(<DashboardPage />);
      const unchanged = await screen.findByTestId("dashboard-current-status");
      expect(unchanged.getAttribute("data-home-state")).toBe("since-no-change");
      expect(screen.queryByTestId("dashboard-change-chip")).toBeNull();
      second.unmount();

      window.localStorage.removeItem("hedgr:last-home-visit");
      activateRoute(route);
      dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
      vi.mocked(useBalance).mockReturnValue(
        makeBalanceState({ total: 3, available: 3 })
      );
      vi.mocked(useEngineState).mockReturnValue(
        getMockEngineState("normal") as EngineState
      );
      render(<DashboardPage />);
      await screen.findByTestId("dashboard-current-status");
      expect(screen.queryByTestId("dashboard-change-chip")).toBeNull();
    });

    test("Home axis shows no date or Today and keeps even spacing", () => {
      const lastVisit = 1;
      render(
        <PositionLine entries={depositThenWithdraw} lastVisit={lastVisit} />
      );
      const line = screen.getByTestId("dashboard-position-line");
      expect(line.textContent ?? "").not.toMatch(AXIS_TIME);

      const events: Array<{ kind: "entry" | "visit" }> = [
        { kind: "visit" },
        { kind: "entry" },
        { kind: "entry" },
      ];
      const dots = Array.from(
        line.querySelectorAll<HTMLElement>('span[style*="left"][style*="top"]')
      );
      const entryIndexes = events
        .map((event, index) => (event.kind === "entry" ? index : -1))
        .filter((index) => index >= 0);
      expect(dots).toHaveLength(entryIndexes.length);
      entryIndexes.forEach((eventIndex, i) => {
        expect(dots[i].style.left).toBe(
          `${((eventIndex + 1) / (events.length + 1)) * 100}%`
        );
      });
    });

    test("attribution stays in the change card after the explanation", async () => {
      activateRoute(route);
      dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
      window.localStorage.setItem("hedgr:last-home-visit", "2");
      vi.mocked(useBalance).mockReturnValue(
        makeBalanceState({ total: 3, available: 3 })
      );
      vi.mocked(useEngineState).mockReturnValue(
        getMockEngineState("normal") as EngineState
      );
      const sinceRender = render(<DashboardPage />);
      const sinceCard = await screen.findByTestId("dashboard-current-status");
      const sinceContext = sinceCard.querySelector(
        '[data-testid="engine-posture-context"]'
      );
      const sinceAttribution = Array.from(sinceCard.querySelectorAll("p")).find(
        (node) => node.textContent === ATTRIBUTION
      );
      expect(sinceAttribution).toBeDefined();
      expect(
        sinceContext!.compareDocumentPosition(sinceAttribution!) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      sinceRender.unmount();

      window.localStorage.removeItem("hedgr:last-home-visit");
      render(<DashboardPage />);
      const whatChanged = await screen.findByTestId("dashboard-current-status");
      const context = whatChanged.querySelector(
        '[data-testid="engine-posture-context"]'
      );
      const attribution = Array.from(whatChanged.querySelectorAll("p")).find(
        (node) => node.textContent === ATTRIBUTION
      );
      expect(attribution).toBeDefined();
      expect(
        context!.compareDocumentPosition(attribution!) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    });
  }
);

describe("journey utilities offer the withdrawal at step 3 and one contextual action per step", () => {
  test("journey utilities offer the withdrawal at step 3 and one contextual action per step", async () => {
    activateRoute("journey");
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );

    dashboardStateMocks.transactions = [];
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 0, available: 0 })
    );
    const empty = render(<DashboardPage />);
    await screen.findByTestId("dashboard-simulation-utilities");
    expect(utilityTestIds()).toEqual([
      "dashboard-add-simulated-deposit",
      "dashboard-how-simulation-works",
    ]);
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.getByTestId("dashboard-simulation-utilities").textContent).not.toMatch(
      PROGRESS_COPY
    );
    empty.unmount();

    dashboardStateMocks.transactions = [depositTx()];
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 5, available: 5 })
    );
    const firstEvent = render(<DashboardPage />);
    await screen.findByTestId("dashboard-simulation-utilities");
    expect(utilityTestIds()).toEqual([
      "dashboard-add-simulated-deposit",
      "dashboard-simulated-withdraw",
    ]);
    expect(screen.getByTestId("dashboard-simulated-withdraw").getAttribute("href")).toBe(
      getSyntheticJourneyHref("/withdraw")
    );
    expect(screen.getByTestId("dashboard-simulated-withdraw").textContent).toBe(
      "Simulate a withdrawal"
    );
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.getByTestId("dashboard-simulation-utilities").textContent).not.toMatch(
      PROGRESS_COPY
    );
    firstEvent.unmount();

    dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    render(<DashboardPage />);
    await screen.findByTestId("dashboard-simulation-utilities");
    expect(utilityTestIds()).toEqual([
      "dashboard-add-simulated-deposit",
      "dashboard-view-activity",
    ]);
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(screen.getByTestId("dashboard-simulation-utilities").textContent).not.toMatch(
      PROGRESS_COPY
    );
  });
});

describe("default Home keeps its retained elements", () => {
  test("default Home keeps its retained elements", async () => {
    const states = [
      { txs: [] as typeof dashboardStateMocks.transactions, total: 0 },
      { txs: [depositTx()], total: 5 },
      { txs: [depositTx(), withdrawalTx()], total: 3 },
    ];
    for (const state of states) {
      cleanup();
      activateRoute("default");
      dashboardStateMocks.transactions = state.txs;
      vi.mocked(useBalance).mockReturnValue(
        makeBalanceState({ total: state.total, available: state.total })
      );
      vi.mocked(useEngineState).mockReturnValue(
        getMockEngineState("normal") as EngineState
      );
      render(<DashboardPage />);
      await screen.findByTestId("dashboard-simulation-utilities");
      expect(utilityTestIds()).toEqual([
        "dashboard-add-simulated-deposit",
        "dashboard-view-activity",
        "dashboard-simulated-withdraw",
      ]);
      expect(screen.getByTestId("dashboard-context-line")).toBeDefined();
      expect(screen.queryByTestId("local-balance")).toBeNull();
    }

    cleanup();
    activateRoute("default");
    dashboardStateMocks.transactions = [];
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 0, available: 0 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );
    render(<DashboardPage />);
    const steps = await screen.findByTestId("dashboard-first-use-steps");
    expect(Array.from(steps.querySelectorAll("li")).map((step) => step.textContent)).toEqual([
      "You are here. It starts at $0.00.",
      "Add a simulated deposit.",
      "Try a simulated withdrawal.",
      "Check both entries in Activity.",
    ]);
    expect(steps.querySelector("li")?.getAttribute("aria-current")).toBe("step");

    cleanup();
    activateRoute("default");
    dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
    window.localStorage.setItem("hedgr:last-home-visit", "2");
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );
    render(<DashboardPage />);
    expect(
      (await screen.findByTestId("engine-posture-context")).textContent
    ).toMatch(/^One simulated withdrawal/);
    expect(screen.queryByRole("region", { name: "Recent activity" })).toBeNull();

    cleanup();
    activateRoute("default");
    dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
    window.localStorage.setItem("hedgr:last-home-visit", "10");
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );
    render(<DashboardPage />);
    expect(
      (await screen.findByTestId("engine-posture-context")).textContent
    ).toMatch(/^Nothing has changed/);
    expect(screen.queryByRole("region", { name: "Recent activity" })).not.toBeNull();
  });
});

describe("live Home is unchanged", () => {
  test("live Home is unchanged", async () => {
    vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "magic");
    vi.stubEnv("NEXT_PUBLIC_FX_MODE", "live");
    vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
    dashboardStateMocks.transactions = [depositTx(), withdrawalTx()];
    window.localStorage.setItem("hedgr:last-home-visit", "2");
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ total: 3, available: 3 })
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState("normal") as EngineState
    );
    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByTestId("dashboard-current-status")).toBeDefined();
    });
    expect(screen.queryByTestId("dashboard-position-line")).toBeNull();
    expect(screen.queryByText("Since you were last here")).toBeNull();
    expect(screen.queryByTestId("dashboard-change-chip")).toBeNull();
    expect(screen.getByTestId("engine-posture-badge")).toBeDefined();
    expect(screen.getByTestId("engine-posture-action-guidance")).toBeDefined();
  });
});

describe("display estimate composition", () => {
  test("keeps the composed display estimate for every currency at $480", () => {
    const amounts: Record<string, string> = {
      ZMW: "9,600.00",
      KES: "62,400.00",
      NGN: "720,000.00",
      GHS: "7,200.00",
      PHP: "26,880.00",
    };
    for (const { code } of SIMULATION_DISPLAY_CURRENCIES) {
      expect(formatSimulationDisplayEstimate(480, code)).toBe(
        `≈ ${code} ${amounts[code]} display estimate`
      );
    }
  });
});
