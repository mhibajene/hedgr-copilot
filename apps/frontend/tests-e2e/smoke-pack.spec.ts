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
  await expect(page.getByText("Simulated balance", { exact: true })).toBeVisible();
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
    "The simulated position is within its expected range."
  );
  for (const forbidden of heldOrRejectedPrimaryTerms) {
    expect(postureContextText).not.toMatch(forbidden);
  }

  await expect(page.getByText("Does anything need attention?")).toBeVisible();
  await expect(page.getByTestId("engine-simulation-attention-answer")).toHaveText(
    "No important change shown"
  );
  await expect(page.getByTestId("engine-posture-badge")).toHaveCount(0);

  await expect(page.getByTestId("engine-stability-review-snapshot")).toHaveCount(0);
  await expect(page.getByText("Simulation date")).toHaveCount(0);
  await expect(page.getByText("Last viewed locally")).toHaveCount(0);

  const allocationBands = page.getByTestId("engine-allocation-bands");
  await expect(allocationBands).toBeVisible({ timeout: 10_000 });
  await expect(allocationBands).toHaveAttribute("data-presentation", "collapsed");
  await expect(
    allocationBands.getByRole("heading", { name: "Stability guidance" })
  ).toBeVisible();
  await expect(allocationBands).toContainText(
    "See what Hedgr prioritizes when interpreting stability"
  );
  await expect(allocationBands).toContainText(
    "preserve value, keep access and risk visible"
  );
  await expect(allocationBands).toContainText(
    "context, not an instruction"
  );
  await expect(allocationBands).toContainText(
    "Nothing here represents a balance, holding, account, or money being divided or moved"
  );
  const allocationDetails = page.getByTestId("engine-allocation-details");
  await expect(allocationDetails).not.toHaveAttribute("open", "");
  const allocationSummary = allocationDetails.locator(":scope > summary");
  await allocationSummary.focus();
  await expect(allocationSummary).toBeFocused();
  await allocationSummary.press("Enter");
  await expect(allocationDetails).toHaveAttribute("open", "");
  const allocationBandsText = await allocationBands.textContent();
  expect(allocationBandsText?.trim().length).toBeGreaterThan(0);
  expect(allocationBandsText).toContain("Core stability target");
  expect(allocationBandsText).not.toContain("Stable balance");
  expect(allocationBandsText).toContain("Conservative yield");
  expect(allocationBandsText).toContain("Reserve");
  expect(allocationBandsText).toContain("Stability targets");
  expect(allocationBandsText).toContain("Guidance only");
  expect(allocationBandsText).toContain("Balance");
  expect(allocationBandsText).toContain("The percentages do not divide it");
  expect(allocationBandsText).toContain("No instruction or money movement");
  expect(allocationBandsText).toContain(
    "a target does not mean money has been divided, held, or moved"
  );
  const targetDistinction = page.getByTestId(
    "engine-allocation-target-details"
  );
  const targetDistinctionSummary = targetDistinction.locator(
    ":scope > summary"
  );
  await targetDistinctionSummary.focus();
  await expect(targetDistinctionSummary).toBeFocused();
  await targetDistinctionSummary.press("Enter");
  await expect(targetDistinction).toHaveAttribute("open", "");

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

test("5 · settings page displays trust section", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: "Settings" })).toBeVisible();
  await expect(page.getByText("Trust & Risk")).toBeVisible();
  await expect(page.getByText("Environment Configuration")).toBeVisible();
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

test("7 · nav links allow traversal of critical routes", async ({ page }) => {
  await page.goto("/");
  await clearStorage(page);
  await loginMock(page);

  const nav = page.getByTestId("app-nav");
  await expect(nav).toBeVisible();

  for (const label of [
    "Deposit",
    "Withdraw",
    "Activity",
    "Settings",
    "Dashboard",
  ]) {
    await page.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${label.toLowerCase()}`));
  }
});
