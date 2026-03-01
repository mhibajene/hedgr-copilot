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
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
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

test('4 · settings page displays trust section', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  await page.goto('/settings');
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByText('Trust & Risk')).toBeVisible();
  await expect(page.getByText('Environment Configuration')).toBeVisible();
});

test('5 · deposit page is functional', async ({ page }) => {
  await page.goto('/');
  await clearStorage(page);
  await loginMock(page);

  await page.goto('/deposit');
  await expect(page.getByRole('heading', { name: 'Deposit' })).toBeVisible();
  await expect(page.getByTestId('deposit-amount')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
});

test('6 · nav links allow traversal of critical routes', async ({ page }) => {
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
