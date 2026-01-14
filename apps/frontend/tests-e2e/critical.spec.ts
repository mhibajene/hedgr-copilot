import { test, expect } from '@playwright/test';

// Block analytics and external calls for test hermeticity
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

// Helper to clear all app storage for hermetic tests
async function clearAppStorage(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    // Clear all localStorage keys used by the app
    window.localStorage.removeItem('hedgr:ledger');
    window.localStorage.removeItem('hedgr:wallet');
    window.localStorage.clear();
  });
}

test.beforeEach(async ({ context, page }) => {
  // Block analytics
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
    return route.continue();
  });
  
  // Navigate first, then clear storage
  await page.goto('/');
  await clearAppStorage(page);
  // Reload to ensure clean state is applied
  await page.reload();
  await clearAppStorage(page);
});

test('mock login works', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('founder@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test('yield visible on dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText('APY')).toBeVisible();
});

test('deposit stub increases balance', async ({ page }) => {
  // Clear storage again to be absolutely sure
  await clearAppStorage(page);
  
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  
  // Verify initial balance is $0.00
  const initialBalance = page.getByTestId('usd-balance');
  await expect(initialBalance).toHaveText('$0.00', { timeout: 5000 });
  
  await page.goto('/deposit');
  
  // Verify deposit input is clearable/editable
  const depositInput = page.getByTestId('deposit-amount');
  await depositInput.fill('');
  await expect(depositInput).toHaveValue('');
  await depositInput.fill('100');
  await expect(depositInput).toHaveValue('100');
  
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Deposit CONFIRMED')).toBeVisible({ timeout: 6000 });
  await page.goto('/dashboard');
  const usd = page.getByTestId('usd-balance');
  await expect(usd).toBeVisible({ timeout: 10000 });
  // SSoT: 100 ZMW at FX_MODE=fixed (rate 20) = $5.00
  await expect(usd).toHaveText('$5.00', { timeout: 10000 });
});

test('withdraw stub decreases balance', async ({ page }) => {
  // Clear storage again to be absolutely sure
  await clearAppStorage(page);
  
  // seed via deposit
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  
  // Verify we start at $0.00
  const initialBalance = page.getByTestId('usd-balance');
  await expect(initialBalance).toHaveText('$0.00', { timeout: 5000 });
  
  await page.goto('/deposit');
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Deposit CONFIRMED')).toBeVisible({ timeout: 6000 });

  // withdraw 1 USD
  await page.goto('/withdraw');
  await page.getByLabel('Amount (USD)').fill('1');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Withdraw CONFIRMED')).toBeVisible({ timeout: 6000 });
  await page.goto('/dashboard');
  const usd2 = page.getByTestId('usd-balance');
  await expect(usd2).toBeVisible({ timeout: 10000 });
  // SSoT: $5.00 - $1.00 = $4.00
  await expect(usd2).toHaveText('$4.00', { timeout: 10000 });
});

test('activity page shows confirmed transactions', async ({ page }) => {
  // Clear storage again to be absolutely sure
  await clearAppStorage(page);
  
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  // Deposit 100 ZMW
  await page.goto('/deposit');
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Deposit CONFIRMED')).toBeVisible({ timeout: 6000 });

  // Withdraw $1
  await page.goto('/withdraw');
  await page.getByLabel('Amount (USD)').fill('1');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Withdraw CONFIRMED')).toBeVisible({ timeout: 6000 });

  // Check Activity page shows two CONFIRMED entries
  await page.goto('/activity');
  await expect(page.getByRole('heading', { name: 'Activity' })).toBeVisible();
  
  // Wait for activity list to appear
  const activityList = page.getByTestId('activity-list');
  await expect(activityList).toBeVisible({ timeout: 10000 });
  
  // Verify SUCCESS status badges via lifecycle-aware TxStatusPill selectors (at least 2)
  const confirmedBadges = page.locator(
    '[data-testid="tx-status-pill"][data-status="SUCCESS"]'
  );
  await expect(confirmedBadges.first()).toBeVisible({ timeout: 10_000 });
  const count = await confirmedBadges.count();
  expect(count).toBeGreaterThanOrEqual(2);
  
  // Verify we see both Deposit and Withdraw using unambiguous test IDs
  const depositRow = page.getByTestId('activity-row-deposit');
  const withdrawRow = page.getByTestId('activity-row-withdraw');
  await expect(depositRow.first()).toBeVisible();
  await expect(withdrawRow.first()).toBeVisible();
});
