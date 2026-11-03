import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('plan-intent@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});

test('PLAN-INTENT-001 own simulation offers an optional purpose question after its hero', async ({ page }) => {
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.locator('[data-component="HomeHero"]')).toBeVisible();
  const card = page.getByTestId('planning-read-card');
  await expect(card.getByRole('group', { name: 'What is this portion meant to support?' })).toBeVisible();
  await card.getByRole('radio', { name: 'A payment on a date', exact: true }).check();
  await expect(card.getByTestId('planning-read-labels').getByRole('heading').first()).toHaveText('Goals');
});
