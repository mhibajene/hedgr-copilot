// @vitest-environment jsdom

import React from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import type { EnginePosture, EngineState } from "../lib/engine/types";
import type { DanielRead, DanielReadInput } from "../lib/engine/daniel-read";

(globalThis as typeof globalThis & { React: typeof React }).React = React;

// §359 CLASS-A-VAL-002-STABILITY-DANIEL-HOME-001 — Daniel's Engine read on Home.
// §362 CLASS-A-VAL-002-HOME-EXAMPLE-PICKER-001 — Daniel only on the journey Home, by `example=daniel`.

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
  timelineOverride: null as readonly DanielRead[] | null,
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
    get DANIEL_HOME_TIMELINE() {
      const timeline = (actual as typeof actual & { DANIEL_HOME_TIMELINE?: readonly DanielRead[] }).DANIEL_HOME_TIMELINE;
      return homeMocks.timelineOverride ?? (homeMocks.danielOverride ? timeline?.map((read, index) =>
        index === 2 ? homeMocks.danielOverride ?? read : read
      ) : timeline);
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
import * as homeFixture from "../lib/state/daniel-home-fixture";
import { SIMULATION_DISPLAY_CURRENCIES, SIMULATION_DISPLAY_CURRENCY_KEY } from "../lib/state/simulation-display-currency";
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from "./engine-trust-framing-denylist";

const FIXTURE_AS_OF = "2026-10-09T00:00:00.000Z";
const RATE_ASSUMPTION = "Disclosed fixture rate: ZMW 27 per USD. Not a live rate.";
const ROUTES = ["default", "journey", "synthetic-path"] as const;
const JOURNEY_ROUTES = ["journey", "synthetic-path"] as const;
type Route = (typeof ROUTES)[number];
type JourneyRoute = (typeof JOURNEY_ROUTES)[number];
const POSTURES: EnginePosture[] = ["normal", "tightening", "tightened", "recovery"];
const PICKER = "Choose an example";
const OPTIONS = ["Your own simulation", "Daniel's reserve"];
// Founder lock, 11 Oct 2026: "Lock 1-6 as recommended"; character-exact assertions.
const LOCKED_COPY = {
  since: "Since Daniel was last here",
  visit: "Daniel’s last visit",
  currencyVisit: "At Daniel’s last visit",
  back: "Back to your own simulation",
  current: "Now",
  currentDate: "9 Oct 2026",
  lastDate: "25 Sep 2026",
};
const LIMITATION = "This is what happened in the example. It doesn’t tell you what will happen next.";
const expectedTimelineInputs: DanielReadInput[] = [
  { declaredHoldingUsd: 800, fixtureRateZmwPerUsd: 24.5, asOf: "2026-09-09T00:00:00.000Z" },
  { declaredHoldingUsd: 800, fixtureRateZmwPerUsd: 29.5, asOf: "2026-09-25T00:00:00.000Z" },
  DANIEL_HOME_FIXTURE_INPUT,
];
const expectedTimeline = expectedTimelineInputs.map(computeDanielRead);

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

function searchFor(route: Route, example?: string): string {
  const params = new URLSearchParams(route === "journey" ? "journey=class-a-val-002" : "");
  if (example !== undefined) params.set("example", example);
  return params.toString();
}

function activate(route: Route, live = false, example?: string) {
  vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", live ? "magic" : "mock");
  vi.stubEnv("NEXT_PUBLIC_FX_MODE", live ? "live" : "stub");
  vi.stubEnv("NEXT_PUBLIC_APP_ENV", "prod");
  vi.mocked(usePathname).mockReturnValue(route === "synthetic-path" ? "/dashboard-synthetic-journey" : "/dashboard");
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams(searchFor(route, example)) as ReturnType<typeof useSearchParams>
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

/** Your own simulation (or an unrecognised `example`) on any simulated Home route. */
async function renderHome(route: Route, state: keyof typeof ACTIVITY = "empty", posture: EnginePosture = "normal", example?: string) {
  activate(route, false, example);
  arrange(state, posture);
  const view = render(<DashboardPage />);
  await screen.findByTestId("dashboard-current-overview");
  return view;
}

/** Daniel's reserve (`example=daniel`) on a journey Home route. */
async function renderDaniel(route: JourneyRoute, state: keyof typeof ACTIVITY = "empty", posture: EnginePosture = "normal") {
  activate(route, false, "daniel");
  arrange(state, posture);
  const view = render(<DashboardPage />);
  await screen.findByTestId("dashboard-daniel-read");
  return view;
}

const panel = () => screen.getByTestId("dashboard-daniel-read");
const picker = () => screen.getByRole("combobox", { name: PICKER }) as HTMLSelectElement;
const OWN_SIMULATION_ONLY = [
  "dashboard-current-overview",
  "dashboard-balance",
  "dashboard-simulation-utilities",
  "dashboard-add-simulated-deposit",
  "dashboard-simulated-withdraw",
  "dashboard-view-activity",
  "dashboard-how-simulation-works",
  "dashboard-current-status",
  "engine-posture-context",
  "engine-posture-banner",
  "dashboard-restart-journey",
  "research-planning-targets",
  "dashboard-planning-targets",
  "dashboard-education",
  "daniel-read-coexistence",
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  homeMocks.danielOverride = null;
  homeMocks.timelineOverride = null;
  homeMocks.transactions = [];
  homeMocks.clearLedger.mockClear();
  window.localStorage.clear();
  window.history.replaceState(null, "", "/");
  vi.unstubAllEnvs();
});

describe("omits the picker and Daniel from default simulated Home", () => {
  test("omits the picker and Daniel from default simulated Home", async () => {
    for (const state of ["empty", "settled", "pending", "failed"] as const) {
      for (const example of [undefined, "daniel"]) {
        const view = await renderHome("default", state, "normal", example);
        expect(screen.queryByTestId("dashboard-daniel-read")).toBeNull();
        expect(screen.queryByRole("combobox", { name: PICKER })).toBeNull();
        expect(document.body.textContent).not.toMatch(/Daniel|K21,600|Your own simulation/);
        expect(screen.getByTestId("dashboard-balance")).toBeDefined();
        expect(screen.getByText(/Simulated Hedgr balance/)).toBeDefined();
        view.unmount();
      }
    }
  });
});

describe("shows Your own simulation by default on both journey routes without Daniel", () => {
  test("shows Your own simulation by default on both journey routes without Daniel", async () => {
    for (const route of JOURNEY_ROUTES) {
      for (const state of ["empty", "settled", "returning"] as const) {
        const view = await renderHome(route, state);
        const select = picker();
        expect(select.selectedOptions[0]?.textContent).toBe("Your own simulation");
        expect(Array.from(select.options).map((o) => o.textContent)).toEqual(OPTIONS);
        // Directly under the "Your position" heading, inside orientation; no helper line.
        const heading = screen.getByRole("heading", { level: 1, name: "Your position" });
        expect(heading.nextElementSibling).toBe(select);
        expect(screen.getByTestId("dashboard-orientation").contains(select)).toBe(true);
        expect(select.getAttribute("aria-describedby")).toBeNull();
        expect(screen.getByTestId("dashboard-balance")).toBeDefined();
        expect(screen.getByText(/Simulated Hedgr balance/)).toBeDefined();
        expect(screen.queryByTestId("dashboard-daniel-read")).toBeNull();
        expect(document.body.textContent).not.toMatch(/K21,600|Daniel’s declared holding/);
        view.unmount();
      }
    }
  });

  test("choosing an example navigates on the same route, keeps journey and drops reset, with no storage", async () => {
    const cases = [
      {
        route: "journey" as const,
        start: "/dashboard?journey=class-a-val-002&reset=1",
        daniel: "/dashboard?journey=class-a-val-002&example=daniel",
        own: "/dashboard?journey=class-a-val-002",
      },
      {
        route: "synthetic-path" as const,
        start: "/dashboard-synthetic-journey?reset=1",
        daniel: "/dashboard-synthetic-journey?example=daniel",
        own: "/dashboard-synthetic-journey",
      },
    ];
    for (const { route, start, daniel, own } of cases) {
      const view = await renderHome(route, "settled");
      // A lingering reset marker in the address must never be carried forward by the picker.
      window.history.replaceState(null, "", start);
      const setItem = vi.spyOn(Storage.prototype, "setItem");
      const removeItem = vi.spyOn(Storage.prototype, "removeItem");
      const before = JSON.stringify({ ...window.localStorage });
      fireEvent.change(picker(), { target: { value: "daniel" } });
      expect(`${window.location.pathname}${window.location.search}`).toBe(daniel);
      fireEvent.change(picker(), { target: { value: "own" } });
      expect(`${window.location.pathname}${window.location.search}`).toBe(own);
      expect(setItem).not.toHaveBeenCalled();
      expect(removeItem).not.toHaveBeenCalled();
      expect(JSON.stringify({ ...window.localStorage })).toBe(before);
      expect(homeMocks.clearLedger).not.toHaveBeenCalled();
      setItem.mockRestore();
      removeItem.mockRestore();
      view.unmount();
    }
  });
});

describe("shows only Daniel's reserve when the example is selected", () => {
  test("shows only Daniel's reserve when the example is selected", async () => {
    for (const route of JOURNEY_ROUTES) {
      for (const state of ["empty", "settled", "pending", "failed", "returning"] as const) {
        const setItem = vi.spyOn(Storage.prototype, "setItem");
        const getItem = vi.spyOn(Storage.prototype, "getItem");
        // arrange() seeds storage itself; only calls made by Home after this point count.
        activate(route, false, "daniel");
        arrange(state);
        setItem.mockClear();
        getItem.mockClear();
        const view = render(<DashboardPage />);
        await screen.findByTestId("dashboard-daniel-read");
        expect(picker().selectedOptions[0]?.textContent).toBe("Daniel's reserve");
        expect(screen.getByTestId("dashboard-orientation")).toBeDefined();
        expect(screen.getByTestId("dashboard-disclosures")).toBeDefined();
        expect(screen.getByTestId("daniel-read-figure").textContent).toBe("K21,600");
        expect(screen.getByTestId("daniel-read-caption").textContent).toBe("display estimate");
        expect(screen.getByTestId("daniel-read-disclosure").querySelectorAll("li")).toHaveLength(4);
        for (const testId of OWN_SIMULATION_ONLY) {
          expect(screen.queryByTestId(testId), testId).toBeNull();
        }
        expect(document.body.textContent).not.toMatch(
          /Recent activity|Simulated Hedgr balance|Restart simulated journey|Planning targets|mock guidance/
        );
        expect(screen.queryByRole("link", { name: /deposit|withdraw|activity/i })).toBeNull();
        // Daniel's reserve never touches the user's simulation: no visit, ledger or preference access.
        expect(setItem).not.toHaveBeenCalled();
        const readKeys = getItem.mock.calls.map(([key]) => key);
        expect(readKeys).not.toContain("hedgr:last-home-visit");
        expect(readKeys).not.toContain(SIMULATION_DISPLAY_CURRENCY_KEY);
        expect(homeMocks.clearLedger).not.toHaveBeenCalled();
        setItem.mockRestore();
        getItem.mockRestore();
        view.unmount();
      }
    }
  });
});

describe("falls back to your own simulation for an unknown example value", () => {
  test("falls back to your own simulation for an unknown example value", async () => {
    for (const route of JOURNEY_ROUTES) {
      for (const example of ["sarah", "DANIEL", "", "own"]) {
        const view = await renderHome(route, "settled", "normal", example);
        expect(picker().selectedOptions[0]?.textContent).toBe("Your own simulation");
        expect(screen.getByTestId("dashboard-balance")).toBeDefined();
        expect(screen.queryByTestId("dashboard-daniel-read")).toBeNull();
        view.unmount();
      }
    }
  });
});

describe("shows Engine localDisplay above its caption with the complete runtime fixture disclosure", () => {
  test("shows Engine localDisplay above its caption with the complete runtime fixture disclosure", async () => {
    for (const route of JOURNEY_ROUTES) {
      const view = await renderDaniel(route);
      const figure = screen.getByTestId("daniel-read-figure");
      const caption = screen.getByTestId("daniel-read-caption");
      expect(figure.textContent).toBe("K21,600");
      expect(caption.textContent).toBe("display estimate");
      expect(figure.compareDocumentPosition(caption) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      expect(caption.className).toContain("text-xs");
      expect(figure.className).toContain("amount");

      const disclosure = screen.getByTestId("daniel-read-disclosure");
      expect(screen.getByTestId("daniel-read-holding").textContent).toMatch(/^Fictional user-declared holding: USD 800\./);
      expect(screen.getByTestId("daniel-read-pair").textContent).toBe("Pair: USD/ZMW.");
      expect(screen.getByTestId("daniel-read-rate").textContent).toBe(RATE_ASSUMPTION);
      expect(screen.getByTestId("daniel-read-rate").textContent).toBe(DANIEL_HOME_READ.explanation.rateAssumption);
      const time = screen.getByTestId("daniel-read-as-of").querySelector("time");
      expect(time?.getAttribute("dateTime")).toBe(FIXTURE_AS_OF);
      expect(time?.textContent).toBe(LOCKED_COPY.currentDate);
      expect(disclosure.textContent).toContain("fixed example time");
      expect(panel().contains(screen.getByText("Daniel’s declared holding · Fictional example"))).toBe(true);
      expect(panel().textContent).toContain(DANIEL_HOME_READ.explanation.holding);
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
    await renderDaniel("journey");
    expect(screen.getByTestId("daniel-read-figure").textContent).toBe("K-SENTINEL 1.234,5");
    expect(screen.getByTestId("daniel-read-rate").textContent).toBe("SENTINEL RATE ASSUMPTION");
    expect(panel().textContent).not.toContain("21,600");
    expect(panel().textContent).toContain("SENTINEL HOLDING");
  });
});

describe("keeps Daniel separate from mock guidance and preserves every notice text", () => {
  test("keeps Daniel separate from mock guidance and preserves every notice text", async () => {
    for (const posture of POSTURES) {
      // Your own simulation: every notice text is unchanged and Daniel is absent.
      for (const route of ROUTES) {
        const view = await renderHome(route, "settled", posture);
        expect(screen.queryByTestId("dashboard-daniel-read")).toBeNull();
        expect(screen.queryByTestId("daniel-read-coexistence")).toBeNull();
        if (posture !== "normal") {
          const banner = screen.getByTestId("engine-posture-banner");
          const [title, body] = Array.from(banner.querySelectorAll("p")).map((p) => p.textContent);
          expect(title).toBe(ENGINE_NOTICE_COPY[posture].title);
          expect(body).toBe(ENGINE_NOTICE_COPY[posture].body);
        }
        view.unmount();
      }
      // Daniel's reserve: no mock guidance, notice or coexistence line, whatever the posture.
      for (const route of JOURNEY_ROUTES) {
        const view = await renderDaniel(route, "settled", posture);
        expect(screen.queryByTestId("engine-posture-banner")).toBeNull();
        expect(screen.queryByTestId("daniel-read-coexistence")).toBeNull();
        if (posture !== "normal") {
          expect(document.body.textContent).not.toContain(ENGINE_NOTICE_COPY[posture].title);
        }
        view.unmount();
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
        for (const route of JOURNEY_ROUTES) {
          window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, code);
          const view = await renderDaniel(route, state);
          expect(screen.getByTestId("daniel-read-figure").textContent).toBe("K21,600");
          const content = panel().cloneNode(true) as HTMLElement;
          content.querySelector("a")?.remove();
          reference ??= content.outerHTML;
          expect(content.outerHTML).toBe(reference);
          view.unmount();
        }
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

describe("omits the picker and Daniel in live mode", () => {
  test("omits the picker and Daniel in live mode", async () => {
    for (const route of ROUTES) {
      for (const example of [undefined, "daniel"]) {
        activate(route, true, example);
        arrange("withdrawn");
        const view = render(<DashboardPage />);
        await screen.findByTestId("dashboard-current-overview");
        expect(screen.queryByTestId("dashboard-daniel-read")).toBeNull();
        expect(screen.queryByRole("combobox", { name: PICKER })).toBeNull();
        expect(document.body.textContent).not.toMatch(/Daniel|Disclosed fixture rate|K21,600|Your own simulation/);
        expect(screen.getByText("Your current position")).toBeDefined();
        expect(screen.getByTestId("engine-posture-badge")).toBeDefined();
        expect(screen.getByTestId("engine-posture-action-guidance")).toBeDefined();
        view.unmount();
      }
    }
  });
});

describe("contains no prohibited claims in Daniel Home copy", () => {
  test("contains no prohibited claims in Daniel Home copy", async () => {
    await renderDaniel("journey", "settled");
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
    // Fixture, time and rate limits accompany the read; only URL return navigation is offered.
    expect(text).toContain("Fictional");
    expect(text).toContain("Not a live rate.");
    expect(text).toContain("fixed example time");
    expect(panel().querySelectorAll("a")).toHaveLength(1);
    expect(panel().querySelectorAll("button, input, select, progress, meter, [role='progressbar']")).toHaveLength(0);
    // The picker's locked option names carry no currency or claim.
    const pickerText = Array.from(picker().options).map((o) => o.textContent).join(" ");
    expect(pickerText).not.toMatch(/USD|ZMW|K21|\$|hedg|guarantee|protect|recommend/i);
  });
});

// §365 CLASS-A-VAL-002-HOME-EXAMPLE-DASHBOARD-001 — all nine named contracts.
describe("Daniel's reserve shows his example as a full Home", () => {
  test("Daniel's reserve shows his example as a full Home", async () => {
    for (const route of JOURNEY_ROUTES) {
      const view = await renderDaniel(route, "returning");
      const grid = panel().querySelector('[data-testid="daniel-home-grid"]');
      expect(grid?.className).toContain("overviewGrid");
      expect(screen.getByTestId("daniel-read-figure").textContent).toBe(expectedTimeline[2].localDisplay);
      expect(screen.getByTestId("daniel-read-caption").textContent).toBe("display estimate");
      expect(screen.getByTestId("daniel-read-holding").textContent).toContain("USD 800. Hedgr only reads it.");
      expect(screen.getByRole("region", { name: "Daniel’s declared holding · Fictional example" })).toBeDefined();
      const chart = screen.getByTestId("dashboard-position-line");
      expect(chart.getAttribute("aria-hidden")).toBe("true");
      expect(chart.querySelectorAll('span[style*="top:"]')).toHaveLength(3);
      expect(screen.getByTestId("dashboard-position-line-visit").textContent).toBe(LOCKED_COPY.visit);
      expect(chart.textContent).not.toMatch(/Today|max|9 Oct|25 Sep/);
      const card = screen.getByRole("region", { name: LOCKED_COPY.since });
      const observations = card.querySelectorAll('[data-testid="daniel-observation"]');
      expect(observations).toHaveLength(2);
      for (const [index, node] of Array.from(observations).entries()) {
        expect(node.querySelector('[data-testid="daniel-observation-holding"]')?.textContent).toBe(expectedTimeline[index + 1].explanation.holding);
        expect(node.querySelector('[data-testid="daniel-observation-rate"]')?.textContent).toBe(expectedTimeline[index + 1].explanation.rateAssumption);
        expect(node.querySelector("time")?.getAttribute("datetime")).toBe(expectedTimeline[index + 1].asOf);
      }
      expect(Array.from(card.querySelectorAll("time")).map((time) => time.textContent)).toEqual([
        LOCKED_COPY.lastDate, LOCKED_COPY.currentDate,
      ]);
      expect(card.textContent).toContain(LIMITATION);
      expect(panel().textContent).not.toMatch(/balance/i);
      view.unmount();
    }
  });
});

test("Daniel's example timeline comes only from the Engine", () => {
  // Optional access keeps unchanged runtime loadable: red is an absent fixture assertion,
  // not an import error that would prevent the other behavior contracts from running.
  const fixture = homeFixture as typeof homeFixture & {
    DANIEL_HOME_TIMELINE_INPUTS?: readonly Readonly<DanielReadInput>[];
    DANIEL_HOME_TIMELINE?: readonly DanielRead[];
  };
  const inputs = fixture.DANIEL_HOME_TIMELINE_INPUTS;
  const reads = fixture.DANIEL_HOME_TIMELINE;
  expect(inputs).toEqual(expectedTimelineInputs);
  expect(reads).toHaveLength(3);
  expect(Object.isFrozen(inputs)).toBe(true);
  expect(Object.isFrozen(reads)).toBe(true);
  expect(inputs?.every(Object.isFrozen)).toBe(true);
  expect(inputs?.[2]).toBe(DANIEL_HOME_FIXTURE_INPUT);
  expect(reads?.[2]).toEqual(DANIEL_HOME_READ);
  inputs!.forEach((input, index) => {
    expect(reads![index]).toEqual(computeDanielRead(input));
    expect(computeDanielRead(input)).toEqual(computeDanielRead(input));
    const { asOf, localDisplay, localAmountZmwMinor, explanation, ...invariant } = reads![index];
    expect(invariant).toEqual({
      engineVersion: "daniel-read-v2", pair: "USD/ZMW",
      declaredHolding: { amount: 800, currency: "USD", source: "user-declared", access: "read-only" },
    });
    expect({ asOf, localDisplay, localAmountZmwMinor, explanation }).toEqual({
      asOf: expectedTimeline[index].asOf,
      localDisplay: expectedTimeline[index].localDisplay,
      localAmountZmwMinor: expectedTimeline[index].localAmountZmwMinor,
      explanation: expectedTimeline[index].explanation,
    });
  });
  const source = readFileSync(resolve(__dirname, "../lib/state/daniel-home-fixture.ts"), "utf8");
  expect(source).toMatch(/\.map\(computeDanielRead\)/);
  expect(source).not.toMatch(/Date\.now|new Date\(|localStorage/);
  expect(source.match(/from\s+['"][^'"]+['"]/g)).toEqual(["from '../engine/daniel-read'"]);
});

test("Daniel's example offers no actions on your simulation", async () => {
  await renderDaniel("journey", "settled");
  expect(within(panel()).getByRole("link", { name: LOCKED_COPY.back })).toBeDefined();
  expect(panel().querySelectorAll("a")).toHaveLength(1);
  expect(panel().querySelectorAll("button, input, select")).toHaveLength(0);
  expect(document.querySelectorAll('main a[href*="/deposit"], main a[href*="/withdraw"], main a[href*="/activity"]')).toHaveLength(0);
  expect(document.body.textContent).not.toMatch(/View Activity|Restart simulated journey|Simulate a withdrawal/);
});

test("Daniel's example shows no mock guidance, planning targets, date line or display-currency selector", async () => {
  await renderDaniel("journey", "returning", "tightened");
  expect(screen.queryByTestId("dashboard-date-line")).toBeNull();
  for (const id of OWN_SIMULATION_ONLY) expect(screen.queryByTestId(id), id).toBeNull();
  expect(screen.queryByRole("combobox", { name: /display currency/i })).toBeNull();
  expect(document.body.textContent).not.toMatch(/Start here|Recent activity|Planning targets|mock guidance/);
  expect(screen.getByTestId("dashboard-disclosures")).toBeDefined();
  expect(screen.getByRole("region", { name: "Currency context" })).toBeDefined();
});

test("Daniel's example ignores your simulation", async () => {
  let reference: string | null = null;
  for (const route of JOURNEY_ROUTES) {
    for (const state of ["empty", "returning"] as const) {
      window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, "KES");
      window.localStorage.setItem("hedgr:ledger", JSON.stringify(ACTIVITY[state].txs));
      window.localStorage.setItem("hedgr:review-snapshot", "preserved-review-value");
      activate(route, false, "daniel");
      arrange(state);
      const before = JSON.stringify({ ...window.localStorage });
      const setItem = vi.spyOn(Storage.prototype, "setItem");
      const removeItem = vi.spyOn(Storage.prototype, "removeItem");
      const view = render(<DashboardPage />);
      await screen.findByTestId("daniel-currency-context");
      // Compare fictional content; the return href intentionally preserves each route.
      const content = panel().cloneNode(true) as HTMLElement;
      content.querySelector("a")?.remove();
      reference ??= content.innerHTML;
      expect(content.innerHTML).toBe(reference);
      expect(JSON.stringify({ ...window.localStorage })).toBe(before);
      expect(setItem).not.toHaveBeenCalled();
      expect(removeItem).not.toHaveBeenCalled();
      expect(homeMocks.clearLedger).not.toHaveBeenCalled();
      setItem.mockRestore(); removeItem.mockRestore(); view.unmount();
    }
  }
});

test("Back to your own simulation returns without writing", async () => {
  for (const route of JOURNEY_ROUTES) {
    const view = await renderDaniel(route, "returning");
    const pathname = route === "journey" ? "/dashboard" : "/dashboard-synthetic-journey";
    const query = route === "journey" ? "journey=class-a-val-002&" : "";
    // The href preserves the route and unrelated query; no reset is carried into it.
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(`${query}example=daniel&keep=1`) as ReturnType<typeof useSearchParams>);
    view.rerender(<DashboardPage />);
    const link = within(panel()).getByRole("link", { name: LOCKED_COPY.back });
    expect(link.getAttribute("href")).toBe(`${pathname}?${query}keep=1`);
    const before = JSON.stringify({ ...window.localStorage });
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const removeItem = vi.spyOn(Storage.prototype, "removeItem");
    expect(link.getAttribute("href")).not.toMatch(/example=|reset=/);
    expect(JSON.stringify({ ...window.localStorage })).toBe(before);
    expect(setItem).not.toHaveBeenCalled(); expect(removeItem).not.toHaveBeenCalled();
    expect(homeMocks.clearLedger).not.toHaveBeenCalled();
    setItem.mockRestore(); removeItem.mockRestore(); view.unmount();
  }
});

test("own simulation, default Home and live mode stay unchanged", async () => {
  const originalRead = computeDanielRead(DANIEL_HOME_FIXTURE_INPUT);
  expect(DANIEL_HOME_READ).toEqual(originalRead);
  const view = await renderHome("journey", "returning");
  expect(screen.getByTestId("dashboard-position-line-visit").textContent).toBe("Your last visit");
  expect(screen.getByTestId("dashboard-date-line")).toBeDefined();
  expect(screen.queryByTestId("daniel-currency-context")).toBeNull();
  expect(picker().selectedOptions[0]?.textContent).toBe(OPTIONS[0]);
  view.unmount();
  // Default/unknown/live eligibility and rate/transaction controls are retained above
  // and in the existing hermetic Playwright contracts, rather than weakened or replaced.
});

test("Daniel's currency context shows two Engine figures side by side with no computed difference", async () => {
  homeMocks.timelineOverride = expectedTimeline.map((read, index) => ({
    ...read,
    // Numeric and textual sentinels deliberately disagree: the text cannot be recomputed.
    localAmountZmwMinor: [170, 310, 90][index],
    localDisplay: `ENGINE FIGURE ${index}`,
    explanation: { holding: `ENGINE HOLDING ${index}`, rateAssumption: `ENGINE RATE ${index}` },
  }));
  homeMocks.danielOverride = homeMocks.timelineOverride[2];
  await renderDaniel("journey");
  const context = screen.getByRole("region", { name: "Currency context" });
  const columns = Array.from(context.querySelectorAll('[data-testid="daniel-currency-point"]'));
  expect(columns).toHaveLength(2);
  expect(columns[0].nextElementSibling).toBe(columns[1]);
  expect(columns[0].parentElement?.className).toContain("grid-cols-2");
  expect(Array.from(context.querySelectorAll('[data-testid="daniel-currency-figure"]')).map((node) => node.textContent)).toEqual([
    "ENGINE FIGURE 1", "ENGINE FIGURE 2",
  ]);
  expect(Array.from(context.querySelectorAll('[data-testid="daniel-currency-rate"]')).map((node) => node.textContent)).toEqual([
    "ENGINE RATE 1", "ENGINE RATE 2",
  ]);
  expect(columns[0].querySelector("p")?.textContent).toBe(LOCKED_COPY.currencyVisit);
  expect(columns[1].querySelector("p")?.textContent).toBe(LOCKED_COPY.current);
  expect(screen.getByTestId("daniel-read-figure").textContent).toBe("ENGINE FIGURE 2");
  expect(screen.getByTestId("dashboard-position-line").querySelectorAll('span[style*="top:"]')).toHaveLength(3);
  expect(panel().textContent).not.toMatch(/K21,600|K23,600|higher|lower|increase|decrease|delta|difference|\+|−|→|↑|↓/i);
  expect(context.querySelectorAll('svg, [data-delta], [data-direction], button, [role="dialog"]')).toHaveLength(0);
  const source = readFileSync(resolve(__dirname, "../app/(app)/dashboard/DanielExampleHome.tsx"), "utf8");
  expect(source).toContain("localAmountZmwMinor");
  expect(source).not.toMatch(/CurrencyInsight|compareCurrencyExample|estimateCents|getSimulationDisplayRate|formatSimulationDisplay|lib\/fx|parseFloat|parseInt|Number\(.*localDisplay/);
  expect(source).not.toMatch(/research|__tests__|golden|fixtureRateZmwPerUsd|\.localAmountZmwMinor\s*[-+*/]/);
});


test("Founder-locked copy and dates are character-exact across Daniel's example Home", async () => {
  for (const route of JOURNEY_ROUTES) {
    const view = await renderDaniel(route);
    expect(document.getElementById("dashboard-current-status-label")?.textContent).toBe(LOCKED_COPY.since);
    expect(screen.getByTestId("dashboard-position-line-visit").textContent).toBe(LOCKED_COPY.visit);
    expect(within(panel()).getByRole("link", { name: LOCKED_COPY.back }).textContent).toBe(LOCKED_COPY.back);
    expect(screen.getByTestId("daniel-read-as-of").textContent).toBe(`As of ${LOCKED_COPY.currentDate}, a fixed example time.`);
    const card = screen.getByTestId("daniel-since-card");
    expect(Array.from(card.querySelectorAll("time")).map((time) => [time.textContent, time.getAttribute("datetime")])).toEqual([
      [LOCKED_COPY.lastDate, expectedTimeline[1].asOf], [LOCKED_COPY.currentDate, expectedTimeline[2].asOf],
    ]);
    const context = screen.getByTestId("daniel-currency-context");
    const points = context.querySelectorAll('[data-testid="daniel-currency-point"]');
    expect.soft(Array.from(points).map((point) => point.querySelector("p")?.textContent)).toEqual([
      LOCKED_COPY.currencyVisit, LOCKED_COPY.current,
    ]);
    expect(Array.from(context.querySelectorAll("time")).map((time) => [time.textContent, time.getAttribute("datetime")])).toEqual([
      [LOCKED_COPY.lastDate, expectedTimeline[1].asOf], [LOCKED_COPY.currentDate, expectedTimeline[2].asOf],
    ]);
    expect(context.querySelectorAll("time")[1]?.textContent).toBe(screen.getByTestId("daniel-read-as-of").querySelector("time")?.textContent);
    expect(context.textContent).not.toMatch(/higher|lower|increase|decrease|difference|delta|balance/i);
    view.unmount();
  }
});
