import { test, expect } from '@playwright/test';

test('mock login works', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('founder@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});
