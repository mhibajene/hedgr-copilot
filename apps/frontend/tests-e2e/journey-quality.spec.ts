import { expect, test, type Page, type Locator } from '@playwright/test';
const NOW = Date.parse('2026-10-15T00:00:00Z');
async function seed(page: Page, count: number, currency = 'ZMW') {
  await page.evaluate(({ count, currency }) => {
    const rows = Array.from({ length: count + 1 }, (_, i) => ({ txn_ref: String(i), type: 'deposit', status: 'settled', amount_usd: i ? 5 : 1000, amount_zmw: (i ? 5 : 1000) * 27, fx_rate: 27, created_at: i ? 3000 + i : 1000, updated_at: i ? 3000 + i : 1000 }));
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: rows })); localStorage.setItem('hedgr:last-home-visit', '2000'); localStorage.setItem('hedgr.simulation.display-currency', currency);
  }, { count, currency });
}
async function target(link: Locator) { const size = await link.boundingBox(); expect(size!.width).toBeGreaterThanOrEqual(44); expect(size!.height).toBeGreaterThanOrEqual(44); }
async function keyboardActivate(page: Page, link: Locator) { await link.focus(); await page.keyboard.press('Enter'); }
test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.clock.install({ time: NOW }); await page.clock.setFixedTime(NOW); await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('journey-quality@hedgr.test'); await page.getByRole('button', { name: 'Continue' }).click(); await expect(page).toHaveURL(/\/dashboard/);
});
for (const width of [320, 390, 1440]) {
  test(`JOURNEY-REVIEW-001 recent-change copy and newest-card keyboard focus at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const count of [0, 1, 3]) {
      await seed(page, count); await page.goto('/dashboard-synthetic-journey'); const section = page.getByTestId('dashboard-current-status');
      await expect(section.getByRole('heading')).toHaveText('Recent changes'); await expect(section.locator('ul')).toHaveCount(0);
      if (!count) { await expect(section.getByRole('link', { name: /below/ })).toHaveCount(0); await expect(section).toContainText('No new simulated entries'); continue; }
      await expect(section).toContainText(count === 1 ? "1 new simulated entry since your last visit. It's included in the balance above." : "3 new simulated entries since your last visit. They're included in the balance above.");
      const link = section.getByRole('link', { name: count === 1 ? 'See this change below' : 'See the newest change below' }); await target(link); await target(section.getByRole('link', { name: 'See all in Activity' }));
      const latest = await page.getByTestId('activity-card').textContent(); await page.getByRole('button', { name: 'Earlier change' }).click();
      await page.getByRole('button', { name: 'All changes', exact: true }).click(); await expect(page.getByTestId('activity-card')).toHaveCount(0);
      await keyboardActivate(page, link); const card = page.getByTestId('activity-card').locator('..');
      await expect(card).toBeFocused(); await expect(page.getByTestId('activity-card')).toHaveText(latest!); await expect(page.getByRole('button', { name: 'All changes', exact: true })).toHaveAttribute('aria-expanded', 'false');
      await expect(card).toHaveAttribute('tabindex', '-1'); expect(await card.getAttribute('aria-label')).toBe(await page.getByTestId('activity-announcement').textContent());
      expect(await card.evaluate(n => getComputedStyle(n).outlineWidth)).toBe('2px');
      const rect = await card.boundingBox(); expect(rect!.y).toBeGreaterThanOrEqual(0); expect(rect!.y + rect!.height).toBeLessThanOrEqual(900 - (width < 1024 ? 61 : 0));
      const padding = await page.evaluate(() => getComputedStyle(document.documentElement).scrollPaddingBottom); if (width < 1024) expect(padding).toBe('61px');
      await page.getByRole('button', { name: 'Earlier change' }).click(); await keyboardActivate(page, link); await expect(card).toBeFocused(); await expect(page.getByTestId('activity-card')).toHaveText(latest!);
    }
  });
  test(`JOURNEY-REVIEW-001 Daniel figures disclosure opens and receives focus at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await seed(page, 1); await page.goto('/dashboard-synthetic-journey?example=daniel');
    const toggle = page.getByRole('button', { name: 'All changes · example dates' }); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    const card = page.getByTestId('daniel-since-card'); await expect(card).toContainText('He made two deposits and none since. The chart below shows each kwacha figure, using the example rate for its date.'); await expect(card.getByTestId('daniel-observation')).toHaveCount(0);
    const link = card.getByRole('link', { name: 'Show the figures' }); await target(link); await keyboardActivate(page, link); await expect(toggle).toBeFocused(); await expect(toggle).toHaveAttribute('aria-expanded', 'true'); await expect(page.getByTestId('chart-event-list')).toBeVisible();
    await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'false'); await keyboardActivate(page, link); await expect(toggle).toBeFocused();
    expect((await page.locator('main').innerText()).split('Not a live rate.')).toHaveLength(2);
  });
}
test('JOURNEY-REVIEW-001 all existing grouped own rates and journey previews retain receipt rows', async ({ page }) => {
  for (const [code, rate] of [['ZMW', '27.00'], ['KES', '130.00'], ['NGN', '1,500.00'], ['GHS', '15.00'], ['PHP', '56.00']]) {
    await seed(page, 1, code); await page.goto('/dashboard-synthetic-journey'); await expect(page.locator('[data-component="RateLine"]')).toHaveText(`Example rate: 1 USD = ${rate} ${code}. Not a live rate.`);
    for (const route of ['deposit', 'withdraw']) {
      await seed(page, 1, code); await page.goto(`/${route}?journey=class-a-val-002`);
      await expect(page.getByTestId(`${route}-fx-block`)).toHaveText(`Example rate: 1 USD = ${rate} ${code}. Not a live rate.`);
      expect((await page.locator('main').innerText()).split('Not a live rate.')).toHaveLength(2);
    }
  }
});
