import { test, expect } from "@playwright/test";

/**
 * Smoke Pack — fast, hermetic gate covering critical UX states.
 *
 * Every test blocks ALL non-localhost origins so the suite never makes
 * live network calls (CoinGecko, Sentry, PostHog, Magic, OpenAI, etc.).
 */

// ---------------------------------------------------------------------------
// Hermeticity: allow only same-origin (localhost / 127.0.0.1) traffic
// ---------------------------------------------------------------------------

test.beforeEach(async ({ context }) => {
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//i.test(url)) {
      return route.continue();
    }
    return route.abort();
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function clearStorage(page: import("@playwright/test").Page) {
  await page.evaluate(() => window.localStorage.clear());
}

async function loginMock(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.getByPlaceholder("you@example.com").fill("smoke@hedgr.test");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("1 · landing page renders title and main landmark", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/hedgr/i);
  await expect(page.getByRole("main")).toBeVisible();
});

test("2 · login page renders and mock auth redirects to dashboard", async ({
  page,
}) => {
  await page.goto("/");
  await clearStorage(page);

  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /log in/i })).toBeVisible();
  await expect(page.getByPlaceholder("you@example.com")).toBeVisible();

  await loginMock(page);
  await expect(
    page.getByText("Your current position", { exact: true })
  ).toBeVisible();
});

test("3 · dashboard shows balance after login", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  const balance = page.getByTestId("usd-balance");
  await expect(balance).toBeVisible({ timeout: 10_000 });
  const text = await balance.textContent();
  expect(text).toMatch(/^\$\d+\.\d{2}$/);
});

test("4 · dashboard shows human-readable stability context after login", async ({
  page,
}) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  const heldOrRejectedPrimaryTerms = [
    /\bbalanced\b/i,
    /\bmonitoring\b/i,
    /\bmonitoring volatility\b/i,
    /\bprotected\b/i,
    /\bprotective mode active\b/i,
  ];

  const postureContext = page.getByTestId("engine-posture-context");
  await expect(postureContext).toBeVisible({ timeout: 10_000 });
  const postureContextText = await postureContext.textContent();
  expect(postureContextText?.trim().length).toBeGreaterThan(0);
  expect(postureContextText).toBe(
    "Nothing to compare yet. A first completed simulated event will create a starting point."
  );
  for (const forbidden of heldOrRejectedPrimaryTerms) {
    expect(postureContextText).not.toMatch(forbidden);
  }

  await expect(page.getByText("Does anything need attention?")).toBeVisible();
  await expect(
    page.getByTestId("engine-simulation-attention-answer")
  ).toHaveText("There is not enough information to compare yet.");
  await expect(page.getByTestId("dashboard-current-status")).toContainText(
    "What Hedgr notices"
  );
  await expect(page.getByTestId("dashboard-current-status")).not.toContainText(
    /score|gauge|safe|all clear/i
  );
  await expect(page.getByTestId("engine-posture-badge")).toHaveCount(0);

  await expect(
    page.getByTestId("engine-stability-review-snapshot")
  ).toHaveCount(0);
  await expect(page.getByText("Simulation date")).toHaveCount(0);
  await expect(page.getByText("Last viewed locally")).toHaveCount(0);

  const allocationBands = page.getByTestId("engine-allocation-bands");
  await expect(allocationBands).toBeVisible({ timeout: 10_000 });
  await expect(allocationBands).toHaveAttribute(
    "data-presentation",
    "collapsed"
  );
  await expect(
    allocationBands.getByRole("heading", {
      name: "What you are building toward",
    })
  ).toBeVisible();
  await expect(allocationBands).toContainText("not money set aside");
  const targetRoles = page.getByTestId("engine-allocation-target-roles");
  await expect(targetRoles).toBeVisible();
  await expect(targetRoles).toContainText("Now");
  await expect(targetRoles).toContainText("Reserve");
  await expect(targetRoles).toContainText("Growth");
  await expect(targetRoles).not.toContainText(/\d+%/);

  const valuesDetails = page.getByTestId("engine-allocation-values-details");
  const valuesSummary = valuesDetails.locator(":scope > summary");
  await expect(valuesDetails).not.toHaveAttribute("open", "");
  await valuesSummary.focus();
  await expect(valuesSummary).toBeFocused();
  await valuesSummary.press("Enter");
  await expect(valuesDetails).toHaveAttribute("open", "");
  await expect(page.getByTestId("engine-allocation-boundary")).toContainText(
    "not separate balances"
  );
  const allocationBandsText = await allocationBands.textContent();
  expect(allocationBandsText?.trim().length).toBeGreaterThan(0);
  expect(allocationBandsText).toContain("Now");
  expect(allocationBandsText).toContain("Reserve");
  expect(allocationBandsText).toContain("Growth");
  expect(allocationBandsText).toContain(
    "do not divide or move simulated money"
  );
  const targetStructure = page.getByTestId("engine-allocation-structure");
  await expect(targetStructure.locator('[role="progressbar"]')).toHaveCount(0);
  await expect(targetStructure).not.toContainText(
    /[$£€]|funded|account|holding|allocated/i
  );
  await expect(
    page.getByTestId("engine-allocation-band-coreTargetPct")
  ).toContainText(/Now\s*50%/);
  await expect(
    page.getByTestId("engine-allocation-band-yieldCapPct")
  ).toContainText(/Growth\s*20%/);
  await expect(
    page.getByTestId("engine-allocation-band-liquidityTargetPct")
  ).toContainText(/Reserve\s*30%/);
  await expect(page.getByTestId("dashboard-optional-actions")).toHaveCount(0);

  const allocationExecutionDriftTerms = [
    /\bexecuted allocation\b/i,
    /\bsettled allocation\b/i,
    /\bsettled position\b/i,
    /\ballocated to your\b/i,
    /\byour allocation\b/i,
    /\byour portfolio allocation\b/i,
  ];
  for (const forbidden of allocationExecutionDriftTerms) {
    expect(allocationBandsText).not.toMatch(forbidden);
  }
});

test("5 · settings page keeps customer information and trust boundaries legible", async ({
  page,
}) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await expect(page.getByTestId("settings-account")).toContainText(
    "Verification status"
  );
  await expect(page.getByTestId("settings-preferences")).toContainText(
    "No preferences available yet"
  );
  await expect(page.getByTestId("settings-trust-information")).toContainText(
    "No real customer money is held or moved"
  );
  await expect(page.getByText("Environment Configuration")).toHaveCount(0);
  await expect(page.getByText(/Auth: mock|DeFi: mock|FX: fixed/)).toHaveCount(
    0
  );
  await expect(page.getByText(/unlock all features/i)).toHaveCount(0);
});

test("6 · deposit page is functional", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  await page.goto("/deposit");
  await expect(page.getByRole("heading", { name: "Deposit" })).toBeVisible();
  await expect(page.getByTestId("deposit-amount")).toBeVisible();
  await expect(page.getByRole("button", { name: "Confirm" })).toBeVisible();
});

test("7 · synthetic primary nav stays bounded to Home and Settings", async ({
  page,
}) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  const nav = page.getByTestId("app-nav");
  await expect(nav).toBeVisible();
  await page.goto("/dashboard-synthetic-journey");

  const primaryNav = page.getByTestId("nav-links");
  await expect(
    primaryNav.getByRole("link", { name: "Home", exact: true })
  ).toHaveAttribute("href", "/dashboard-synthetic-journey");
  await expect(
    primaryNav.getByRole("link", { name: "Settings", exact: true })
  ).toHaveAttribute("href", "/settings?journey=class-a-val-002");
  await expect(
    primaryNav.getByRole("link", { name: "Activity", exact: true })
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole("link", { name: "Copilot", exact: true })
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole("link", { name: "Deposit", exact: true })
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole("link", { name: "Withdraw", exact: true })
  ).toHaveCount(0);
});
