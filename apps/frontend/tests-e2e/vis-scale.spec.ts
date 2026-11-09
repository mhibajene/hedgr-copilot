import { expect, test, type Page } from '@playwright/test';

const home = '/dashboard-synthetic-journey';
async function seed(page: Page, balances: number[], visit: number | null = null) {
  await page.goto('/api/policy');
  await page.evaluate(({ balances, visit }) => {
    localStorage.clear();
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: balances.map((value, index) => {
      const delta = value - (balances[index - 1] ?? 0);
      return { txn_ref: `scale-${index}`, type: delta < 0 ? 'withdrawal' : 'deposit', status: 'settled', amount_usd: Math.abs(delta), amount_zmw: Math.abs(delta) * 27, fx_rate: 27, created_at: 1000 + index * 1000, updated_at: 1000 + index * 1000 };
    }) }));
    if (visit !== null) localStorage.setItem('hedgr:last-home-visit', String(visit));
  }, { balances, visit });
  await page.goto(home);
  await expect(page.getByTestId('usd-balance')).toHaveText(`$${balances.at(-1)!.toFixed(2)}`);
}
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('scale@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click(); await expect(page).toHaveURL(/\/dashboard$/);
});

test('VIS-SCALE-001 fixed own-only window and full fallback retain real history', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await seed(page, [500, 510, 520, 530, 540, 550]);
  const chart = page.getByTestId('example-line-chart');
  await expect(chart.locator('svg [data-series-at]')).toHaveCount(4);
  await expect(chart).toHaveAttribute('data-vis-scale-state', 'plot');
  await seed(page, [500, 1000, 1500, 2000, 2500, 3000]);
  await expect(chart).toHaveAttribute('data-vis-scale-state', 'activity-only');
  await expect(chart.locator('svg')).toHaveCount(0);
  await expect(chart).toContainText("The chart can't be drawn at its fixed scale for these changes. Every change is still listed in All changes.");
  await page.getByRole('button', { name: 'All changes', exact: true }).click();
  await expect(chart.getByTestId('chart-event-list').locator('li')).toHaveCount(6);
});
