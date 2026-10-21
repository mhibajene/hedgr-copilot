import { expect, test, type Page } from '@playwright/test';
const HOME = ['/dashboard-synthetic-journey', '/dashboard?journey=class-a-val-002'];
const FIRST = Date.parse('2026-10-05T12:00:00Z');
const LAST = Date.parse('2026-10-09T12:00:00Z');
test.use({ timezoneId: 'UTC' });
test.beforeEach(async ({ page, context }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.clock.install({ time: Date.parse('2026-10-21T12:00:00Z') });
  await page.clock.setFixedTime(Date.parse('2026-10-21T12:00:00Z'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('qol@hedgr.test');
  await page.getByRole('button', { name: 'Continue', exact: true }).click(); await expect(page).toHaveURL(/dashboard/);
});
async function seed(page: Page, currency: string, amount = 20.5, visit: number | null = FIRST + 1) {
  await page.goto('/api/policy');
  await page.evaluate(({ currency, amount, visit, FIRST, LAST }) => {
    localStorage.clear(); sessionStorage.clear();
    localStorage.setItem('hedgr.simulation.display-currency', currency);
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [
      { txn_ref: 'first', type: 'deposit', status: 'settled', amount_usd: 4000, amount_zmw: 108000, fx_rate: 27, created_at: FIRST, updated_at: FIRST },
      { txn_ref: 'last', type: 'withdrawal', status: 'settled', amount_usd: amount, amount_zmw: 0, fx_rate: 0, created_at: LAST, updated_at: LAST },
    ] }));
    if (visit !== null) localStorage.setItem('hedgr:last-home-visit', String(visit));
  }, { currency, amount, visit, FIRST, LAST });
}
for (const [width, scale] of [[1440, 1], [390, 1], [320, 2]]) test(`T1-T6/T10 shared stack ${width}@${scale * 100}% root text`, async ({ page }, info) => {
  test.setTimeout(180000); await page.setViewportSize({ width, height: 1000 });
  for (const route of HOME) for (const example of ['own', 'daniel', 'sarah']) for (const currency of ['ZMW', 'NGN', 'KES', 'GHS', 'PHP']) {
    await seed(page, currency); await page.goto(`${route}${example === 'own' ? '' : `${route.includes('?') ? '&' : '?'}example=${example}`}`);
    await page.evaluate(scale => { document.documentElement.style.fontSize = `${16 * scale}px`; }, scale);
    const card = page.getByTestId('activity-card');
    await expect(card).toHaveText(example === 'own' ? 'Withdrawal · 9 Oct · −$20.50' : example === 'daniel' ? 'Deposit · 14 Aug · +$300.00' : 'Deposit · 21 Jul · +ZMW 2,000.00');
    await expect(page.getByTestId('activity-announcement')).toHaveText(example === 'own' ? `${width <= 480 ? 'Since your last visit. ' : ''}Withdrawal, minus 20.50 US dollars, 9 October.` : example === 'daniel' ? 'Deposit, plus 300 US dollars, 14 August.' : 'Deposit, plus 2,000 Zambian kwacha, 21 July.');
    await expect(page.getByTestId('dashboard-position-line-visit')).toHaveCount(0);
    await expect(page.locator('[data-chart-selected]')).toHaveCount(1);
    const earlier = page.getByRole('button', { name: 'Earlier change', exact: true });
    await earlier.focus(); expect(await earlier.evaluate(n => getComputedStyle(n).outlineStyle)).not.toBe('none');
    await earlier.press('ArrowLeft');
    await expect(earlier).toBeDisabled(); await expect(card).toContainText('First deposit');
    await expect(page.getByRole('button', { name: 'Later change', exact: true })).toBeEnabled();
    const toggle = page.getByRole('button', { name: example === 'own' ? 'All changes' : 'All changes · example dates', exact: true });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false'); await toggle.click();
    await expect(page.getByTestId('activity-announcement')).toHaveCount(0);
    await expect(page.getByTestId('chart-event-list').locator('li')).toHaveCount(example === 'daniel' ? 4 : 2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    if (currency === 'ZMW') await page.screenshot({ path: info.outputPath(`${example}-${HOME.indexOf(route)}-${width}-list.png`), fullPage: true });
  }
});
for (const amount of [1, 20, 20.5, 4000.25]) test(`T2 USD ${amount} hero switch invariance`, async ({ page }) => {
  await seed(page, 'ZMW', amount); await page.goto(HOME[0]);
  const before = await page.getByTestId('activity-announcement').textContent();
  await page.getByLabel('Simulation display currency').selectOption('NGN');
  await expect(page.getByTestId('activity-announcement')).toHaveText(before!);
  expect(before).toContain(amount === 1 ? '1 US dollar,' : `${amount.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2 })} US dollars,`);
});
test('T7 NH3 exact branch for zero/nonzero balances and all FX states', async ({ page }) => {
  for (const funded of [false, true]) for (const fx of ['success', 'loading', 'error']) {
    await seed(page, 'ZMW');
    if (!funded) await page.evaluate(() => localStorage.removeItem('hedgr:ledger'));
    await page.route('**/api/fx*', route => fx === 'error' ? route.abort() : fx === 'loading' ? new Promise<void>(() => {}) : route.continue());
    await page.goto('/withdraw?journey=class-a-val-002&scenario=unavailable-data');
    await expect(page.getByText("This example has no rate set, so the local amount and Confirm aren't available.", { exact: true })).toHaveCount(1);
    await expect(page.getByText('Step 3 · check the position after a simulated withdrawal', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to Home', exact: true })).toHaveAttribute('href', '/dashboard?journey=class-a-val-002');
    await expect(page.getByTestId('withdraw-amount')).toHaveCount(0); await expect(page.getByRole('button', { name: /Confirm|Retry rate/ })).toHaveCount(0);
    await page.unroute('**/api/fx*');
  }
});
