import { test, expect } from '@playwright/test';

// Guarantee a clean wallet (localStorage) before any page scripts run
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
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
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.goto('/deposit');
  await page.getByLabel('Amount (ZMW)').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Deposit CONFIRMED')).toBeVisible({ timeout: 6000 });
  await page.goto('/dashboard');
  await expect(page.getByTestId('usd-balance')).toHaveText('$5.00', { timeout: 6000 });
});

test('withdraw stub decreases balance', async ({ page }) => {
  // seed via deposit
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.goto('/deposit');
  await page.getByLabel('Amount (ZMW)').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Deposit CONFIRMED')).toBeVisible({ timeout: 6000 });

  // withdraw 1 USD
  await page.goto('/withdraw');
  await page.getByLabel('Amount (USD)').fill('1');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Withdraw CONFIRMED')).toBeVisible({ timeout: 6000 });
  await page.goto('/dashboard');
  await expect(page.getByTestId('usd-balance')).toHaveText('$4.00', { timeout: 6000 });
});
