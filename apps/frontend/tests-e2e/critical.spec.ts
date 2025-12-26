import { test, expect } from '@playwright/test';

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
  const usd = page.getByTestId('usd-balance');
  await expect(usd).toBeVisible({ timeout: 10000 });
  await expect(usd).toHaveText('$5.00', { timeout: 10000 });
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
  const usd2 = page.getByTestId('usd-balance');
  await expect(usd2).toBeVisible({ timeout: 10000 });
  await expect(usd2).toHaveText('$4.00', { timeout: 10000 });
});

test('activity page shows confirmed transactions', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('a@b.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);

  // Deposit 100 ZMW
  await page.goto('/deposit');
  await page.getByLabel('Amount (ZMW)').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Deposit CONFIRMED')).toBeVisible({ timeout: 6000 });

  // Withdraw $1
  await page.goto('/withdraw');
  await page.getByLabel('Amount (USD)').fill('1');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Withdraw CONFIRMED')).toBeVisible({ timeout: 6000 });

  // Check Activity page shows two CONFIRMED entries
  await page.goto('/activity');
  await expect(page.getByText('Activity')).toBeVisible();
  
  // Wait for transactions to appear and confirm they are CONFIRMED
  const confirmedBadges = page.getByText('CONFIRMED');
  await expect(confirmedBadges.first()).toBeVisible({ timeout: 10000 });
  const count = await confirmedBadges.count();
  expect(count).toBeGreaterThanOrEqual(2);
  
  // Verify we see both Deposit and Withdraw
  await expect(page.getByText('Deposit')).toBeVisible();
  await expect(page.getByText('Withdraw')).toBeVisible();
});
