import { expect, test } from '@playwright/test';

// §348: reject saved memory at the read boundary, preserving the separate fingerprint behaviour.
test.beforeEach(async ({ context }) => {
  await context.route('**/*', route =>
    ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

for (const [name, raw] of [
  ['invalid date', JSON.stringify([{ viewedAt: 'not-a-date', changeVsPrior: 'changed', posture: 'recovery' }])],
  ['missing memory', null],
  ['malformed entry', JSON.stringify([{ changeVsPrior: 'unchanged', posture: 'recovery' }])],
  ['corrupt JSON', '{broken'],
  ['valid control', JSON.stringify([{ viewedAt: '2026-04-01T12:00:00.000Z', changeVsPrior: 'changed', posture: 'recovery' }])],
] as const) {
  test(`/dashboard review safely reads ${name}`, async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('review-memory@hedgr.test');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByTestId('engine-stability-review-snapshot')).toBeAttached();
    await page.evaluate(raw => {
      localStorage.removeItem('hedgr:engine-review-snapshot-fingerprint');
      localStorage.removeItem('hedgr:engine-review-snapshot-memory');
      if (raw !== null) localStorage.setItem('hedgr:engine-review-snapshot-memory', raw);
    }, raw);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/dashboard');
    await page.getByTestId('dashboard-education').locator(':scope > summary').click();
    const snapshot = page.getByTestId('engine-stability-review-snapshot');
    await expect(snapshot).toBeVisible();
    await snapshot.locator('details > summary').click();
    const rows = page.getByTestId('engine-stability-review-memory-entry');
    await expect(page.getByTestId('engine-stability-review-snapshot-change-signal')).toHaveCount(0);
    if (name === 'valid control') {
      await expect(rows).toHaveCount(1);
      await expect(rows).toBeVisible();
      await expect(rows).toContainText('Apr 1, 2026');
      await expect(rows).toContainText('Informational targets differ from your prior check.');
    } else {
      await expect(rows).toHaveCount(0);
      await expect(snapshot).not.toContainText('Informational targets differ from your prior check.');
      await expect(snapshot).not.toContainText('Informational targets unchanged since your prior check.');
    }
    expect(errors).toEqual([]);
  });
}
