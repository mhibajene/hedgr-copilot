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
