import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Mock policy payloads (must match ResolvedPolicy schema from lib/policy/schema.ts)
// ---------------------------------------------------------------------------

const SHARED_POLICY_FIELDS = {
  limits: { maxDepositUSD: 10_000, maxWithdrawUSD: 5_000, maxSingleTransferUSD: 2_500 },
  settlement: { localCurrencyFirst: false, localCurrency: 'USD' },
  fx: { requireProvenance: true, requiredFields: ['source', 'timestamp'] },
  disclosures: { requiredKeys: ['risk-warning', 'not-a-bank'] },
  bannedClaims: ['guaranteed-returns', 'fdic-insured', 'risk-free'],
};

/** UNKNOWN market — earn disabled */
const POLICY_EARN_OFF = {
  version: 'v1' as const,
  market: 'UNKNOWN' as const,
  resolvedAt: '2026-01-01T00:00:00.000Z',
  policy: {
    features: { earn: false, earnMode: 'off' as const, payLinks: false, stablecoinSend: false },
    ...SHARED_POLICY_FIELDS,
  },
};

/** KE market — earn enabled */
const POLICY_EARN_ON = {
  version: 'v1' as const,
  market: 'KE' as const,
  resolvedAt: '2026-01-01T00:00:00.000Z',
  policy: {
    features: { earn: true, earnMode: 'pilot' as const, payLinks: false, stablecoinSend: false },
    ...SHARED_POLICY_FIELDS,
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

async function clearAppStorage(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    window.localStorage.clear();
  });
}

async function loginAndGoToDashboard(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
    return route.continue();
  });

  await page.goto('/');
  await clearAppStorage(page);
  await page.reload();
  await clearAppStorage(page);
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Dashboard policy gating', () => {
  test('earn tile is hidden when policy returns earn=false', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_OFF) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('dashboard-earn-tile')).toHaveCount(0);
  });

  test('earn tile is visible when policy returns earn=true', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_ON) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('dashboard-earn-tile')).toBeVisible();
  });

  test('earn tile is hidden when policy fetch fails', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'simulated failure' }) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('dashboard-earn-tile')).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// Navigation policy gating (MC2-3)
//
// Gated nav links use a `shipped` flag — routes that don't exist yet are
// hidden regardless of policy. These tests confirm the deny-by-default
// behaviour: gated links must never leak into the nav while unshipped.
// ---------------------------------------------------------------------------

test.describe('Navigation policy gating', () => {
  test('gated nav links are hidden when policy disallows feature', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_OFF) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('nav-earn-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-paylinks-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-send-link')).toHaveCount(0);
  });

  test('gated nav links stay hidden even when policy allows feature (route unshipped)', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(POLICY_EARN_ON) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('nav-earn-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-paylinks-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-send-link')).toHaveCount(0);
  });

  test('gated nav links are hidden when policy fetch fails', async ({ page }) => {
    await page.route('**/api/policy', (route) =>
      route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'simulated failure' }) }),
    );

    await loginAndGoToDashboard(page);

    await expect(page.getByTestId('nav-earn-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-paylinks-link')).toHaveCount(0);
    await expect(page.getByTestId('nav-send-link')).toHaveCount(0);
  });
});
