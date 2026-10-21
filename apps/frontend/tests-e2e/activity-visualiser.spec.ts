import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const ROUTES = ['/dashboard-synthetic-journey', '/dashboard?journey=class-a-val-002'];
const NOW = Date.parse('2026-10-15T12:00:00Z');
const FIRST = Date.parse('2026-10-08T12:00:00Z');
const NEXT = Date.parse('2026-10-09T12:00:00Z');
const row = (type: 'deposit' | 'withdrawal', amount: number, at: number, status = 'settled') => ({ txn_ref: `${type}-${at}`, type, status, amount_usd: amount, amount_zmw: amount * 27, fx_rate: 27, created_at: at, updated_at: at });
const STATES = {
  empty: { rows: [], visit: null },
  first: { rows: [row('deposit', 500, FIRST)], visit: null },
  several: { rows: [row('deposit', 500, FIRST), row('withdrawal', 20, NEXT), row('deposit', 10, NEXT + 1000)], visit: null },
  returning: { rows: [row('deposit', 500, FIRST), row('withdrawal', 20, NEXT)], visit: FIRST + 1 },
};
test.use({ timezoneId: 'UTC' });
test.beforeEach(async ({ context, page }) => {
  await context.route('**/*', route => ['localhost', '127.0.0.1', '::1'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.clock.install({ time: NOW }); await page.clock.setFixedTime(NOW);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/login'); await page.getByPlaceholder('you@example.com').fill('visualiser@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click(); await expect(page).toHaveURL(/\/dashboard/);
});
async function seed(page: Page, state: { rows: ReturnType<typeof row>[]; visit: number | null }, currency = 'ZMW') {
  // Unmount Home before writes; pending visit/review effects cannot overwrite fixtures.
  await page.goto('/api/policy');
  await page.evaluate(({ state, currency }) => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: state.rows }));
    if (state.visit === null) localStorage.removeItem('hedgr:last-home-visit'); else localStorage.setItem('hedgr:last-home-visit', String(state.visit));
    localStorage.setItem('hedgr.simulation.display-currency', currency);
  }, { state, currency });
}
async function openList(page: Page, example = false) {
  const toggle = page.getByRole('button', { name: example ? 'All changes · example dates' : 'All changes', exact: true });
  if (await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
  return page.getByTestId('chart-event-list');
}
for (const [width, scale] of [[1440, 1], [390, 1], [320, 2]]) test(`V7 V8 V10 V15 V18 V19 accessible actual Homes ${width} text ${scale * 100}%`, async ({ page }, info) => {
  test.setTimeout(180_000); await page.setViewportSize({ width, height: 1000 });
  for (const [routeIndex, route] of ROUTES.entries()) {
    for (const [stateName, state] of Object.entries(STATES)) {
      await seed(page, state); await page.goto(route);
      await page.evaluate(scale => { document.documentElement.style.fontSize = `${16 * scale}px`; }, scale);
      const chart = page.getByTestId('example-line-chart');
      if (stateName === 'empty') {
        await expect(page.getByTestId('dashboard-position-line')).toHaveText('No deposits yet. Your first one will start this chart.');
        await expect(chart).toHaveCount(0);
      } else {
        await expect(chart).toHaveCount(1); await expect(chart).not.toHaveAttribute('aria-hidden', 'true');
        await expect(chart.locator('svg')).toHaveAttribute('aria-hidden', 'true');
        await expect(chart.locator('svg [tabindex], svg button, svg a')).toHaveCount(0);
        const dots = chart.getByTestId('chart-event-dot'); expect(await dots.count()).toBeGreaterThan(0);
        await expect(dots.first()).toHaveAttribute('aria-hidden', 'true');
        const listToggle = chart.getByRole('button', { name: 'All changes', exact: true });
        await listToggle.focus(); await expect(listToggle).toBeFocused();
        expect(await listToggle.evaluate(n => getComputedStyle(n).outlineStyle)).not.toBe('none');
        const list = await openList(page); await expect(list).toBeVisible();
        await expect(list.locator('li')).toHaveCount(state.rows.length);
        if (stateName === 'first') await expect(list).toHaveText('First deposit · 8 Oct · +$500.00');
        if (stateName === 'returning') {
          await expect(page.getByTestId('dashboard-position-line-visit')).toHaveCount(0);
          await expect(page.getByTestId('engine-posture-context')).toHaveCount(0);
          await expect(page.getByTestId('example-line-chart').locator('[data-chart-label]')).toHaveText('1 change since your last visit');
          const text = await page.locator('main').innerText();
          expect(text.split('$20.00').length - 1).toBe(1); expect(text.split('−$20.00').length - 1).toBe(1);
        } else await expect(page.getByTestId('dashboard-position-line-visit')).toHaveCount(0);
        if (width === 320) for (const label of await chart.locator('[data-chart-label]').all()) await expect(label).not.toBeVisible();
        await expect(page.getByTestId('dashboard-change-chip')).toHaveCount(0);
        await expect(page.getByTestId('dashboard-since-entries')).toHaveCount(0);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      const dir = process.env.HEDGR_VISUALISER_SCREENSHOTS ?? info.outputPath('screenshots'); mkdirSync(dir, { recursive: true });
      await page.screenshot({ path: join(dir, `own-${stateName}-route${routeIndex}-${width}-text${scale * 100}.png`), fullPage: true });
    }
    for (const example of ['daniel', 'sarah']) {
      await seed(page, STATES.empty); await page.goto(`${route}${route.includes('?') ? '&' : '?'}example=${example}`);
      await page.evaluate(scale => { document.documentElement.style.fontSize = `${16 * scale}px`; }, scale);
      const chart = page.getByTestId('example-line-chart'); await expect(chart).toHaveCount(1);
      await expect(chart.getByTestId('chart-event-dot').first()).toHaveAttribute('aria-hidden', 'true');
      await expect(page.getByTestId('dashboard-position-line-visit')).toHaveCount(0);
      const list = await openList(page, true); await expect(list.locator('li')).toHaveText(example === 'daniel' ? [
        'First deposit · 12 Jun · +$500.00', 'Deposit · 14 Aug · +$300.00', '≈ ZMW 19,600.00 · 9 Sep · example rate 24.5', '≈ ZMW 23,600.00 · 25 Sep · example rate 29.5',
      ] : ['First deposit · 14 Apr · +ZMW 4,000.00', 'Deposit · 21 Jul · +ZMW 2,000.00']);
      const panel = page.getByTestId(`dashboard-${example}-read`); const text = await panel.innerText();
      for (const amount of example === 'daniel' ? ['$500.00', '$300.00', '$800.00'] : ['ZMW 4,000.00', 'ZMW 2,000.00', '$1000.00']) expect(text.split(amount).length - 1).toBe(1);
      const outsideHero = await panel.evaluate(n => { const copy = n.cloneNode(true) as HTMLElement; copy.querySelector('[data-testid="sarah-read-figure"]')?.remove(); return copy.textContent; });
      expect(outsideHero).not.toMatch(/6,000|K\d|grow|rising|increase|progress|towards|funded|enough|cover|remaining|left to|% of|→/i);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      const dir = process.env.HEDGR_VISUALISER_SCREENSHOTS ?? info.outputPath('screenshots'); mkdirSync(dir, { recursive: true });
      await panel.scrollIntoViewIfNeeded();
      await page.screenshot({ path: join(dir, `${example}-route${routeIndex}-${width}-text${scale * 100}.png`), fullPage: true });
    }
  }
});
test('V2 V3 V4 responsive label budgets and count-only overflow on real route', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await seed(page, { rows: [row('deposit', 500, FIRST), ...Array.from({ length: 4 }, (_, i) => row('deposit', 10 + i, NEXT + i * 1000))], visit: FIRST + 1 });
    await page.goto(ROUTES[0]);
    await expect(page.getByTestId('example-line-chart').locator('[data-chart-label]')).toHaveCount(1);
    await expect(page.getByTestId('example-line-chart').locator('[data-chart-label]')).toHaveText('4 changes since your last visit');
    expect(await page.getByTestId('example-line-chart').locator('[data-chart-label]').innerText()).not.toMatch(/\$|\d+\.\d{2}/);
  }
});
test('V11 all five currencies preserve caption/rate/current figures and V16 2027 year rule', async ({ page }) => {
  for (const [currency, amount, rate] of [['ZMW', '12,960.00', '27'], ['KES', '62,400.00', '130'], ['NGN', '720,000.00', '1,500'], ['GHS', '7,200.00', '15'], ['PHP', '26,880.00', '56']]) {
    await seed(page, STATES.returning, currency); await page.goto(ROUTES[0]);
    await expect(page.getByTestId('local-balance-figure')).toHaveText(`≈ ${currency} ${amount}`);
    await expect(page.getByText('Example figure, not a quote', { exact: true })).toBeVisible();
    await expect(page.locator('[data-component="RateLine"]')).toHaveText(`Example rate: ${currency} ${rate} per US dollar. Not a live rate.`);
  }
  await page.clock.setFixedTime(Date.parse('2027-10-15T12:00:00Z'));
  for (const example of ['daniel', 'sarah']) {
    await seed(page, STATES.empty); await page.goto(`${ROUTES[0]}?example=${example}`);
    await openList(page, true);
    await expect(page.getByTestId('chart-event-list').locator('li').first()).toHaveText(example === 'daniel' ? 'First deposit · 12 Jun 2026 · +$500.00' : 'First deposit · 14 Apr 2026 · +ZMW 4,000.00');
  }
});

const S2_COUNT = /^(No changes|\d+ changes?)( since your last visit)?$/;
const RETURNING_COUNT = /(No changes|\d+ changes?) since your last visit/g;
const chartCounts = (page: Page) => page.getByTestId('example-line-chart').locator('[data-chart-label]').filter({ hasText: S2_COUNT });
async function s2Viewport(page: Page, width: number, scale: number) {
  await page.setViewportSize({ width, height: 1000 });
  await page.evaluate(scale => { document.documentElement.style.fontSize = `${16 * scale}px`; }, scale);
}
const returningState = (count: number) => ({
  rows: [row('deposit', 500, FIRST), ...Array.from({ length: count }, (_, i) => row('deposit', 10 + i, NEXT + i * 1000))],
  visit: FIRST + 1,
});
for (const [width, scale] of [[1440, 1], [390, 1], [320, 2]]) {
  test(`S5 e2e-own-sim-once ${width}@${scale * 100}%`, async ({ page }) => {
    for (const route of ROUTES) {
      await seed(page, returningState(2)); await page.goto(route); await s2Viewport(page, width, scale);
      await expect(chartCounts(page)).toHaveCount(1);
      await expect(chartCounts(page)).toHaveText('2 changes since your last visit');
      await expect(page.getByTestId('example-line-chart').getByText('1 change since your last visit', { exact: true })).toHaveCount(0);
      await expect(page.getByTestId('dashboard-position-line-visit')).toHaveCount(0);
      await expect(page.getByTestId('engine-posture-context')).toHaveCount(0);
      if (width === 320) await expect(chartCounts(page)).not.toBeVisible();
    }
  });
  for (const [id, example] of [['S6 e2e-daniel-once', 'daniel'], ['S7 e2e-sarah-once', 'sarah']]) {
    test(`${id} ${width}@${scale * 100}%`, async ({ page }) => {
      for (const route of ROUTES) {
        await seed(page, STATES.empty); await page.goto(`${route}${route.includes('?') ? '&' : '?'}example=${example}`);
        await s2Viewport(page, width, scale);
        await expect(chartCounts(page)).toHaveCount(0);
      }
    });
  }
  test(`S8 e2e-no-new-styling ${width}@${scale * 100}%`, async ({ page }) => {
    await seed(page, returningState(3)); await page.goto(ROUTES[0]); await s2Viewport(page, width, scale);
    const labels = chartCounts(page);
    await expect(labels).toHaveCount(1);
    await expect(labels).toHaveAttribute('data-placement', 'above');
    await expect(labels).toHaveClass(/visualiserLabel/);
    await expect(page.getByTestId('example-line-chart').locator('[data-chart-label][data-placement="below"]')).toHaveCount(0);
    expect(await labels.evaluate(n => ({ tag: n.tagName, parent: n.parentElement!.className, transform: (n as HTMLElement).style.transform }))).toMatchObject({ tag: 'SPAN', parent: expect.stringMatching(/visualiserPlot/), transform: '' });
  });
  test(`S10 e2e-count-once-per-page ${width}@${scale * 100}%`, async ({ page }) => {
    test.setTimeout(90_000);
    for (const route of ROUTES) for (const count of [1, 2, 4, 0]) {
      await seed(page, returningState(count)); await page.goto(route); await s2Viewport(page, width, scale);
      await expect(chartCounts(page)).toHaveCount(count === 0 ? 0 : 1);
      const expected = count === 0 ? 'No changes since your last visit' : `${count} ${count === 1 ? 'change' : 'changes'} since your last visit`;
      expect((await page.locator('main').textContent())!.match(RETURNING_COUNT)).toEqual([expected]);
      if (count === 0) {
        await expect(page.getByTestId('engine-posture-context')).toHaveText(expected);
        expect(await page.getByTestId('chart-event-dot').count()).toBeGreaterThan(0);
      } else {
        await expect(chartCounts(page)).toHaveText(expected);
        await expect(page.getByTestId('engine-posture-context')).toHaveCount(0);
      }
    }
  });
  test(`S11 e2e-examples-plain-label ${width}@${scale * 100}%`, async ({ page }) => {
    for (const route of ROUTES) for (const example of ['daniel', 'sarah']) {
      await seed(page, returningState(2)); await page.goto(`${route}${route.includes('?') ? '&' : '?'}example=${example}`);
      await s2Viewport(page, width, scale);
      await expect(chartCounts(page)).toHaveCount(0);
      expect((await page.locator('main').textContent())!.match(RETURNING_COUNT) ?? []).toEqual([]);
    }
  });
}
