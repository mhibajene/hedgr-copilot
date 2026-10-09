// @vitest-environment jsdom

import React from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { EnginePosture, EngineState } from "../lib/engine/types";
import type { DanielRead } from "../lib/engine/daniel-read";

(globalThis as typeof globalThis & { React: typeof React }).React = React;

// §359 CLASS-A-VAL-002-STABILITY-DANIEL-HOME-001 — Daniel on simulated Home.

const homeMocks = vi.hoisted(() => ({
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
  danielOverride: null as DanielRead | null,
}));

// Presentation boundary: tests may substitute a sentinel read to prove Home renders the
// Engine result verbatim (no parsing of localDisplay, no second conversion).
vi.mock("../lib/state/daniel-home-fixture", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../lib/state/daniel-home-fixture")>();
  return {
    ...actual,
    get DANIEL_HOME_READ() {
      return homeMocks.danielOverride ?? actual.DANIEL_HOME_READ;
    },
  };
});

vi.mock("../lib/hooks/useBalance", () => ({ useBalance: vi.fn() }));
vi.mock("../lib/defi", () => ({
  defiAdapter: { getNetApy: vi.fn(() => Promise.resolve(0.05)) },
}));
vi.mock("../lib/state/ledger", () => ({
  useLedgerStore: vi.fn(
    (selector: (state: { transactions: unknown[]; clear: () => void }) => unknown) =>
      selector({ transactions: homeMocks.transactions, clear: homeMocks.clearLedger })
  ),
}));
vi.mock("../lib/engine/useEngineState", () => ({ useEngineState: vi.fn() }));
vi.mock("../lib/policy/usePolicy", () => ({
  usePolicy: vi.fn(() => ({ isFeatureEnabled: vi.fn(() => false) })),
}));
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/dashboard"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));
vi.mock("../components", () => ({
  BalanceWithLocalEstimate: ({ usdAmount, ...props }: { usdAmount: number } & Record<string, unknown>) => {
    const rest = { ...props };
    delete rest.displayEstimate;
    delete rest.displayEstimateParts;
    return <div {...rest}>{usdAmount}</div>;
  },
  PolicyDisclosure: () => <div data-testid="policy-disclosure" />,
}));
vi.mock("@hedgr/ui", () => ({
  EmptyState: ({ title, ...props }: { title: string }) => <div {...props}>{title}</div>,
  ErrorState: ({ title }: { title: string }) => <div>{title}</div>,
}));

import DashboardPage from "../app/(app)/dashboard/page";
import { computeDanielRead, DANIEL_FIXTURE_RATE_ZMW_PER_USD } from "../lib/engine/daniel-read";
import { getMockEngineState } from "../lib/engine/mock";
import { ENGINE_NOTICE_COPY } from "../lib/engine/notices";
import { useBalance } from "../lib/hooks/useBalance";
import { useEngineState } from "../lib/engine/useEngineState";
import { usePathname, useSearchParams } from "next/navigation";
import { DANIEL_HOME_FIXTURE_INPUT, DANIEL_HOME_READ } from "../lib/state/daniel-home-fixture";
import { SIMULATION_DISPLAY_CURRENCIES, SIMULATION_DISPLAY_CURRENCY_KEY } from "../lib/state/simulation-display-currency";
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from "./engine-trust-framing-denylist";

const FIXTURE_AS_OF = "2026-10-09T00:00:00.000Z";
const RATE_ASSUMPTION = "Disclosed fixture rate: ZMW 27 per USD. Not a live rate.";
const ROUTES = ["default", "journey", "synthetic-path"] as const;
type Route = (typeof ROUTES)[number];
const POSTURES: EnginePosture[] = ["normal", "tightening", "tightened", "recovery"];

type Tx = (typeof homeMocks.transactions)[number];
const tx = (ref: string, type: Tx["type"], status: Tx["status"], usd: number, at: number): Tx => ({
  txn_ref: ref,
  type,
  status,
  amount_zmw: type === "deposit" ? usd * 20 : 0,
  amount_usd: usd,
  fx_rate: type === "deposit" ? 20 : 0,
  created_at: at,
  updated_at: at,
});

const ACTIVITY: Record<string, { txs: Tx[]; total: number; available: number; pending: number; lastVisit?: string }> = {
  empty: { txs: [], total: 0, available: 0, pending: 0 },
  settled: { txs: [tx("d1", "deposit", "settled", 5, 1)], total: 5, available: 5, pending: 0 },
  withdrawn: {
    txs: [tx("d1", "deposit", "settled", 5, 1), tx("w1", "withdrawal", "settled", 2, 3)],
    total: 3, available: 3, pending: 0,
  },
  pending: {
    txs: [tx("d1", "deposit", "settled", 5, 1), tx("d2", "deposit", "pending", 4, 2)],
    total: 9, available: 5, pending: 4,
  },
  failed: {
    txs: [tx("d1", "deposit", "settled", 5, 1), tx("d2", "deposit", "failed", 4, 2)],
    total: 5, available: 5, pending: 0,
  },
  returning: {
    txs: [tx("d1", "deposit", "settled", 5, 1), tx("w1", "withdrawal", "settled", 2, 3)],
    total: 3, available: 3, pending: 0, lastVisit: "2",
  },
};

function activate(route: Route, live = false) {
  vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", live ? "magic" : "mock");
  vi.stubEnv("NEXT_PUBLIC_FX_MODE", live ? "live" : "stub");
  vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
  vi.mocked(usePathname).mockReturnValue(route === "synthetic-path" ? "/dashboard-synthetic-journey" : "/dashboard");
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams(route === "journey" ? "journey=class-a-val-002" : "") as ReturnType<typeof useSearchParams>
  );
}

function arrange(state: keyof typeof ACTIVITY, posture: EnginePosture = "normal") {
  const s = ACTIVITY[state];
  homeMocks.transactions = s.txs;
  window.localStorage.removeItem("hedgr:last-home-visit");
  if (s.lastVisit) window.localStorage.setItem("hedgr:last-home-visit", s.lastVisit);
  vi.mocked(useBalance).mockReturnValue({
    total: s.total, available: s.available, pending: s.pending, asOf: 1000,
    isLoading: false, error: null, currency: "USD", refresh: vi.fn(),
  } as ReturnType<typeof useBalance>);
  vi.mocked(useEngineState).mockReturnValue(getMockEngineState(posture) as EngineState);
}

async function renderHome(route: Route, state: keyof typeof ACTIVITY = "empty", posture: EnginePosture = "normal") {
  activate(route);
  arrange(state, posture);
  const view = render(<DashboardPage />);
  await screen.findByTestId("dashboard-current-overview");
  return view;
}

const panel = () => screen.getByTestId("dashboard-daniel-read");

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  homeMocks.danielOverride = null;
  homeMocks.transactions = [];
  window.localStorage.clear();
  vi.unstubAllEnvs();
});

describe("renders the same Daniel read on all three simulated Home routes", () => {
  test("renders the same Daniel read on all three simulated Home routes", async () => {
    let reference: string | null = null;
    for (const route of ROUTES) {
      for (const state of ["empty", "settled", "pending", "failed"] as const) {
        const view = await renderHome(route, state);
        const daniel = panel();
        const hero = screen.getByTestId("dashboard-balance");
        // Separate panel near the hero: never inside the hero, directly after the overview.
        expect(hero.contains(daniel)).toBe(false);
        expect(daniel.contains(hero)).toBe(false);
        expect(daniel.previousElementSibling).toBe(screen.getByTestId("dashboard-current-overview"));
        expect(screen.getByTestId("daniel-read-figure").textContent).toBe("K21,600");
        expect(screen.getByText(/Simulated Hedgr balance/)).toBeDefined();
        reference ??= daniel.outerHTML;
        expect(daniel.outerHTML).toBe(reference);
        view.unmount();
      }
    }
  });
});

describe("shows Engine localDisplay above its caption with the complete runtime fixture disclosure", () => {
  test("shows Engine localDisplay above its caption with the complete runtime fixture disclosure", async () => {
    for (const route of ROUTES) {
      const view = await renderHome(route);
      const figure = screen.getByTestId("daniel-read-figure");
      const caption = screen.getByTestId("daniel-read-caption");
      expect(figure.textContent).toBe("K21,600");
      expect(caption.textContent).toBe("display estimate");
      expect(figure.compareDocumentPosition(caption) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(caption.className).toContain("text-xs");
      expect(figure.className).toContain("text-2xl");

      const disclosure = screen.getByTestId("daniel-read-disclosure");
      expect(screen.getByTestId("daniel-read-holding").textContent).toMatch(/^Fictional user-declared holding: USD 800\./);
      expect(screen.getByTestId("daniel-read-pair").textContent).toBe("Pair: USD/ZMW.");
      expect(screen.getByTestId("daniel-read-rate").textContent).toBe(RATE_ASSUMPTION);
      expect(screen.getByTestId("daniel-read-rate").textContent).toBe(DANIEL_HOME_READ.explanation.rateAssumption);
      const time = screen.getByTestId("daniel-read-as-of").querySelector("time");
      expect(time?.getAttribute("dateTime")).toBe(FIXTURE_AS_OF);
      expect(time?.textContent).toBe(FIXTURE_AS_OF);
      expect(disclosure.textContent).toContain("fixed example time");
      // The deferred holding explanation is not rendered.
      expect(panel().textContent).not.toContain(DANIEL_HOME_READ.explanation.holding);
      expect(panel().textContent).not.toMatch(/shows as/);
      view.unmount();
    }
  });

  test("the runtime fixture is the labelled USD 800 declaration computed through the Engine", () => {
    expect(DANIEL_HOME_FIXTURE_INPUT).toEqual({
      declaredHoldingUsd: 800,
      fixtureRateZmwPerUsd: DANIEL_FIXTURE_RATE_ZMW_PER_USD,
      asOf: FIXTURE_AS_OF,
    });
    expect(DANIEL_HOME_READ).toEqual(computeDanielRead(DANIEL_HOME_FIXTURE_INPUT));
    expect(DANIEL_HOME_READ.engineVersion).toBe("daniel-read-v2");
    expect(DANIEL_HOME_READ.localDisplay).toBe("K21,600");
    const source = readFileSync(resolve(__dirname, "../lib/state/daniel-home-fixture.ts"), "utf8");
    expect(source).toMatch(/RUNTIME fixture/);
    expect(source).toMatch(/DANIEL_FIXTURE_RATE_ZMW_PER_USD/);
    const imports = source.match(/from\s+['"][^'"]+['"]/g) ?? [];
    expect(imports).toEqual(["from '../engine/daniel-read'"]);
    expect(source).not.toMatch(/Date\.now|new Date\(|localStorage/);
  });

  test("Home renders the Engine read verbatim through the presentation boundary", async () => {
    homeMocks.danielOverride = {
      ...DANIEL_HOME_READ,
      localDisplay: "K-SENTINEL 1.234,5",
      explanation: { rateAssumption: "SENTINEL RATE ASSUMPTION", holding: "SENTINEL HOLDING" },
    };
    await renderHome("journey");
    expect(screen.getByTestId("daniel-read-figure").textContent).toBe("K-SENTINEL 1.234,5");
    expect(screen.getByTestId("daniel-read-rate").textContent).toBe("SENTINEL RATE ASSUMPTION");
    expect(panel().textContent).not.toContain("21,600");
    expect(panel().textContent).not.toContain("SENTINEL HOLDING");
  });
});

describe("keeps Daniel separate from mock guidance and preserves every notice text", () => {
  test("keeps Daniel separate from mock guidance and preserves every notice text", async () => {
    for (const route of ROUTES) {
      for (const posture of POSTURES) {
        const view = await renderHome(route, "settled", posture);
        const coexistence = screen.getByTestId("daniel-read-coexistence").textContent ?? "";
        expect(coexistence).toContain("The mock guidance on this page is not calculated from Daniel’s amount.");
        expect(coexistence).toContain("Daniel’s figure neither confirms nor overrides it.");
        const label = screen.getByText("Daniel’s declared holding · Fictional example");
        expect(panel().contains(label)).toBe(true);

        const overview = screen.getByTestId("dashboard-current-overview");
        expect(overview.contains(panel())).toBe(false);
        if (posture !== "normal") {
          const banner = screen.getByTestId("engine-posture-banner");
          const [title, body] = Array.from(banner.querySelectorAll("p")).map((p) => p.textContent);
          expect(title).toBe(ENGINE_NOTICE_COPY[posture].title);
          expect(body).toBe(ENGINE_NOTICE_COPY[posture].body);
          expect(panel().textContent).not.toContain(ENGINE_NOTICE_COPY[posture].title);
        }
        // No influence: substituting a different Daniel read leaves the posture/guidance markup untouched.
        const before = overview.innerHTML;
        view.unmount();
        homeMocks.danielOverride = { ...DANIEL_HOME_READ, localDisplay: "K1" };
        const again = await renderHome(route, "settled", posture);
        expect(screen.getByTestId("dashboard-current-overview").innerHTML).toBe(before);
        homeMocks.danielOverride = null;
        again.unmount();
      }
    }
  });
});

describe("keeps the Daniel read identical when display currency or simulated activity changes", () => {
  test("keeps the Daniel read identical when display currency or simulated activity changes", async () => {
    const baseline = structuredClone(DANIEL_HOME_READ);
    let reference: string | null = null;
    for (const { code } of SIMULATION_DISPLAY_CURRENCIES) {
      for (const state of Object.keys(ACTIVITY)) {
        window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, code);
        const view = await renderHome("journey", state);
        expect(screen.getByTestId("daniel-read-figure").textContent).toBe("K21,600");
        reference ??= panel().outerHTML;
        expect(panel().outerHTML).toBe(reference);
        view.unmount();
      }
    }
    // Ambient clock and storage cannot move the read; same inputs give the same read.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2031-01-01T00:00:00.000Z"));
    window.localStorage.setItem("hedgr:ledger", '{"transactions":[]}');
    expect(computeDanielRead(DANIEL_HOME_FIXTURE_INPUT)).toEqual(baseline);
    expect(DANIEL_HOME_READ).toEqual(baseline);
  });
});

describe("omits Daniel entirely in live mode and preserves live Home", () => {
  test("omits Daniel entirely in live mode and preserves live Home", async () => {
    for (const route of ROUTES) {
      activate(route, true);
      arrange("withdrawn");
      const view = render(<DashboardPage />);
      await screen.findByTestId("dashboard-current-overview");
      expect(screen.queryByTestId("dashboard-daniel-read")).toBeNull();
      expect(document.body.textContent).not.toMatch(/Daniel|Disclosed fixture rate|K21,600/);
      expect(screen.getByText("Your current position")).toBeDefined();
      expect(screen.getByTestId("engine-posture-badge")).toBeDefined();
      expect(screen.getByTestId("engine-posture-action-guidance")).toBeDefined();
      view.unmount();
    }
  });
});

describe("contains no prohibited claims in Daniel Home copy", () => {
  test("contains no prohibited claims in Daniel Home copy", async () => {
    await renderHome("journey", "settled");
    const text = panel().textContent ?? "";
    expect(text.length).toBeGreaterThan(0);
    // §347 language guard and §343 obligation-progress fence.
    expect(text).not.toMatch(/\bhedg(e|es|ed|ing)\b/i);
    expect(text).not.toMatch(/anchor|obligation|progress|on track|goal/i);
    // No custody, verified wealth, sufficiency, guarantee, recommendation, action or balance-held claim.
    expect(text).not.toMatch(/custod|safekeep|verified|wealth|sufficien|enough|guarantee|protect|recommend|should|advis|\bact\b|action|buy|sell|convert|balance|\bheld\b|in your account|you own/i);
    for (const phrase of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
      expect(text.toLowerCase()).not.toContain(phrase);
    }
    // Fixture, time and rate limits accompany the read; the panel offers no action.
    expect(text).toContain("Fictional");
    expect(text).toContain("Not a live rate.");
    expect(text).toContain("fixed example time");
    expect(panel().querySelectorAll("a, button, input, select, progress, meter, [role='progressbar']")).toHaveLength(0);
  });
});
