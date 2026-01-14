import { test, expect } from '@playwright/test';

// Block analytics and external calls for test hermeticity
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
    return route.continue();
  });
});

test.describe('Balance SSoT - Ledger as Single Source of Truth', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test for hermetic state
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
    });
  });

  test('dashboard shows zero balance initially', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Wait for the balance element to be visible
    const balanceEl = page.getByTestId('usd-balance');
    await expect(balanceEl).toBeVisible();
    
    // Should show $0.00 initially
    await expect(balanceEl).toHaveText('$0.00');
  });

  test('deposit flow updates balance correctly', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Start at dashboard to see initial balance
    const balanceEl = page.getByTestId('usd-balance');
    await expect(balanceEl).toBeVisible();
    
    // Verify initial balance is 0
    await expect(balanceEl).toHaveText('$0.00');

    // Navigate to deposit page using nav link (explicit selector to avoid CTA ambiguity)
    await page.getByRole('link', { name: 'Deposit', exact: true }).click();
    await expect(page).toHaveURL(/\/deposit/);

    // Enter deposit amount (100 ZMW)
    const amountInput = page.getByTestId('deposit-amount');
    await amountInput.fill('');
    await amountInput.fill('100');

    // Check FX preview is shown
    const fxPreview = page.locator('text=FX Preview');
    await expect(fxPreview).toBeVisible();

    // Click confirm to initiate deposit
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Wait for confirmation (mock should confirm quickly)
    const confirmationMsg = page.getByTestId('deposit-confirmed');
    await expect(confirmationMsg).toBeVisible({ timeout: 10000 });
    await expect(confirmationMsg).toHaveText('Deposit CONFIRMED');

    // Navigate to dashboard using nav link
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Balance should now be updated (100 ZMW at default rate of 20 = $5.00)
    await expect(balanceEl).not.toHaveText('$0.00');
    // The exact amount depends on FX rate, but should be positive
    const balanceText = await balanceEl.textContent();
    expect(balanceText).toMatch(/\$\d+\.\d{2}/);
    expect(parseFloat(balanceText?.replace('$', '') || '0')).toBeGreaterThan(0);
  });

  test('activity page shows deposit entry after successful deposit', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Perform a deposit first
    await page.goto('/deposit');

    const amountInput = page.getByTestId('deposit-amount');
    await amountInput.fill('');
    await amountInput.fill('200');

    await page.getByRole('button', { name: 'Confirm' }).click();

    // Wait for confirmation
    const confirmationMsg = page.getByTestId('deposit-confirmed');
    await expect(confirmationMsg).toBeVisible({ timeout: 10000 });

    // Navigate to activity page using nav link
    await page.getByRole('link', { name: 'Activity' }).click();
    await expect(page).toHaveURL(/\/activity/);

    // Should see the deposit entry using unambiguous test IDs
    const activityList = page.getByTestId('activity-list');
    await expect(activityList).toBeVisible();
    
    // Use specific test ID for deposit row (not ambiguous text selector)
    const depositRow = page.getByTestId('activity-row-deposit');
    await expect(depositRow.first()).toBeVisible();
    
    // Verify SUCCESS status via lifecycle-aware TxStatusPill selector
    const confirmedPill = page.locator(
      '[data-testid="tx-status-pill"][data-status="SUCCESS"]'
    );
    await expect(confirmedPill.first()).toBeVisible({ timeout: 10_000 });
  });

  test('balance endpoint returns correct shape', async ({ page }) => {
    // Test the API endpoint directly
    const response = await page.request.get('/api/balance');
    expect(response.ok()).toBe(true);

    const data = await response.json();
    
    // Verify response shape
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('available');
    expect(data).toHaveProperty('pending');
    expect(data).toHaveProperty('currency');
    expect(data).toHaveProperty('asOf');
    
    expect(data.currency).toBe('USD');
    expect(typeof data.total).toBe('number');
    expect(typeof data.available).toBe('number');
    expect(typeof data.pending).toBe('number');
  });

  test('withdraw page shows current balance from ledger', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // First, make a deposit to have some balance
    await page.goto('/deposit');
    
    const amountInput = page.getByTestId('deposit-amount');
    await amountInput.fill('');
    await amountInput.fill('100');
    
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByTestId('deposit-confirmed')).toBeVisible({ timeout: 10000 });

    // Navigate to withdraw page using nav link
    await page.getByRole('link', { name: 'Withdraw' }).click();
    await expect(page).toHaveURL(/\/withdraw/);

    // Should show current balance
    const balanceText = page.locator('text=Current balance');
    await expect(balanceText).toBeVisible();
    
    // Balance should be greater than 0
    const balanceValue = await page.locator('text=Current balance').locator('..').textContent();
    expect(balanceValue).toMatch(/\$\d+\.\d{2}/);
  });
});
