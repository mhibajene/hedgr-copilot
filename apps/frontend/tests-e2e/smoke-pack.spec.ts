import { test, expect } from '@playwright/test';

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
  await context.route('**/*', (route) => {
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

async function clearStorage(page: import('@playwright/test').Page) {
  await page.evaluate(() => window.localStorage.clear());
}

async function loginMock(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('smoke@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test('1 · landing page renders title and main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/hedgr/i);
  await expect(page.getByRole('main')).toBeVisible();
});

test('2 · login page renders and mock auth redirects to dashboard', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);

  await page.goto('/login');
  await expect(page.getByRole('heading', { name: /log in/i })).toBeVisible();
  await expect(page.getByPlaceholder('you@example.com')).toBeVisible();

  await loginMock(page);
  await expect(page.getByText('Total balance')).toBeVisible();
});

test('3 · dashboard shows balance after login', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  const balance = page.getByTestId('usd-balance');
  await expect(balance).toBeVisible({ timeout: 10_000 });
  const text = await balance.textContent();
  expect(text).toMatch(/^\$\d+\.\d{2}$/);
});

test('4 · dashboard shows Stability Engine posture context after login', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  const heldOrRejectedPrimaryTerms = [
    /\bbalanced\b/i,
    /\bmonitoring\b/i,
    /\bmonitoring volatility\b/i,
    /\bprotected\b/i,
    /\bprotective mode active\b/i,
  ];

  const postureContext = page.getByTestId('engine-posture-context');
  await expect(postureContext).toBeVisible({ timeout: 10_000 });
  const postureContextText = await postureContext.textContent();
  expect(postureContextText?.trim().length).toBeGreaterThan(0);
  expect(postureContextText).toContain('Within expected range');
  expect(postureContextText).toContain('conservative yield');
  for (const forbidden of heldOrRejectedPrimaryTerms) {
    expect(postureContextText).not.toMatch(forbidden);
  }

  const postureBadge = page.getByTestId('engine-posture-badge');
  await expect(postureBadge).toBeVisible({ timeout: 10_000 });
  const postureBadgeText = await postureBadge.textContent();
  expect(postureBadgeText?.trim().length).toBeGreaterThan(0);
  expect(postureBadgeText).toBe('NORMAL');

  const snapshotStance = page.getByTestId(
    'engine-stability-review-snapshot-stance',
  );
  await expect(snapshotStance).toBeVisible({ timeout: 10_000 });
  const snapshotStanceText = await snapshotStance.textContent();
  expect(snapshotStanceText).toBe('Where things stand: within expected range');
  for (const forbidden of heldOrRejectedPrimaryTerms) {
    expect(snapshotStanceText).not.toMatch(forbidden);
  }

  const allocationBands = page.getByTestId('engine-allocation-bands');
  await expect(allocationBands).toBeVisible({ timeout: 10_000 });
  await expect(
    allocationBands.getByRole('heading', { name: 'Target posture' }),
  ).toBeVisible();
  const allocationBandsText = await allocationBands.textContent();
  expect(allocationBandsText?.trim().length).toBeGreaterThan(0);
  expect(allocationBandsText).toContain('Stable balance');
  expect(allocationBandsText).toContain('Conservative yield');
  expect(allocationBandsText).toContain('Reserve');
  expect(allocationBandsText).toContain('Targets');
  expect(allocationBandsText).toContain('Informational system targets only');
  expect(allocationBandsText).toContain('Balances');
  expect(allocationBandsText).toContain('Your ledger shows what you hold');
  expect(allocationBandsText).toContain('not your spendable balance');
  expect(allocationBandsText).toContain('Movement');
  expect(allocationBandsText).toContain(
    'Targets do not mean funds have already moved',
  );

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

test('5 · settings page displays trust section', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  await page.goto('/settings');
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByText('Trust & Risk')).toBeVisible();
  await expect(page.getByText('Environment Configuration')).toBeVisible();
});

test('6 · deposit page is functional', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  await page.goto('/deposit');
  await expect(page.getByRole('heading', { name: 'Deposit' })).toBeVisible();
  await expect(page.getByTestId('deposit-amount')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
});

test('7 · nav links allow traversal of critical routes', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  const nav = page.getByTestId('app-nav');
  await expect(nav).toBeVisible();

  for (const label of ['Deposit', 'Withdraw', 'Activity', 'Settings', 'Dashboard']) {
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${label.toLowerCase()}`));
  }
});
