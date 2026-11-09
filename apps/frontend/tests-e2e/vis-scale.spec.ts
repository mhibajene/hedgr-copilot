import { createHash } from 'node:crypto';
import { VIS_SCALE_COPY } from '../lib/copy/vis-scale-copy';
import { expect, test, type Page } from '@playwright/test';

const home = '/dashboard-synthetic-journey';
async function seed(page: Page, balances: number[], visit: number | null = null, sameTime = false) {
  await page.goto('/api/policy');
  await page.evaluate(({ balances, visit, sameTime }) => {
    localStorage.clear();
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: balances.map((value, index) => {
      const delta = value - (balances[index - 1] ?? 0);
      return { txn_ref: `scale-${index}`, type: delta < 0 ? 'withdrawal' : 'deposit', status: 'settled', amount_usd: Math.abs(delta), amount_zmw: Math.abs(delta) * 27, fx_rate: 27, created_at: sameTime ? 1000 : 1000 + index * 1000, updated_at: sameTime ? 1000 : 1000 + index * 1000 };
    }) }));
    if (visit !== null) localStorage.setItem('hedgr:last-home-visit', String(visit));
  }, { balances, visit, sameTime });
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
  await expect(chart).toContainText(VIS_SCALE_COPY.fallback);
  await page.getByRole('button', { name: 'All changes', exact: true }).click();
  await expect(chart.getByTestId('chart-event-list').locator('li')).toHaveCount(6);
});

async function geometry(page: Page) {
  return page.getByTestId('example-line-chart').evaluate(n => {
    const plot = n.firstElementChild!;
    const bounds = plot.getBoundingClientRect();
    return { width: bounds.width, height: bounds.height, root: parseFloat(getComputedStyle(document.documentElement).fontSize), dpr: devicePixelRatio,
      slots: Number(n.getAttribute('data-vis-scale-slots')),
      points: [...n.querySelectorAll('svg [data-series-at]')].map(g => ({ value: Number(g.getAttribute('data-series-value')), xy: g.getAttribute('transform')!.match(/-?\d+(?:\.\d+)?/g)!.map(Number), id: g.getAttribute('data-event-id') })),
      paths: [...n.querySelectorAll('svg path')].map(g => g.getAttribute('d')) };
  });
}

for (const width of [390, 320]) for (const rootText of [100, 200]) test(`VIS-SCALE-001 geometry and copy fit ${width}px ${rootText}% root text`, async ({ page }, info) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width, height: 900 });
  for (const count of [1, 2, 4, 5, 6, 12]) {
    const balances = count === 1 ? [10] : Array.from({ length: count }, (_, i) => 500 + i * 10);
    await seed(page, balances);
    if (rootText === 200) await page.addStyleTag({ content: 'html {font-size:200% !important}' });
    const chart = page.getByTestId('example-line-chart');
    await expect(chart).toHaveAttribute('data-vis-scale-state', 'plot');
    await expect.poll(async () => { const g = await geometry(page); return g.slots === (g.width >= 768 ? 8 : g.width >= 240 ? 4 : 2); }).toBe(true);
    await expect.poll(async () => (await geometry(page)).points.at(-1)!.xy[1]).toBeCloseTo(94 - balances.at(-1)! * 0.088, 6);
    const g = await geometry(page); const gutter = Math.min(g.width / 2, g.root * 0.75);
    expect(g.points).toHaveLength(Math.min(count, g.slots));
    g.points.forEach((p, i) => {
      expect(p.xy[0] * g.width / 300).toBeCloseTo(g.width - gutter - (g.points.length - 1 - i) * (g.width - 2 * gutter) / g.slots, 5);
      expect(p.xy[1]).toBeCloseTo(94 - p.value * 0.088, 6);
    });
    if (g.points.length > 1) expect((g.points[0].xy[1] - g.points[1].xy[1]) * g.height / 100).toBeCloseTo(g.height * 0.0088, 5);
    await info.attach(`geometry-${count}`, { body: JSON.stringify({ ...g, rootText, browserZoom: 'UNTESTED' }), contentType: 'application/json' });
  }
  await seed(page, [500, 1000, 1500, 2000, 2500, 3000]);
  if (rootText === 200) await page.addStyleTag({ content: 'html {font-size:200% !important}' });
  const fallback = page.getByTestId('vis-scale-fallback');
  await expect(fallback).toHaveText(VIS_SCALE_COPY.fallback);
  const plot = await fallback.evaluate(n => ({ plot: n.parentElement!.getBoundingClientRect().toJSON(), text: n.getBoundingClientRect().toJSON() }));
  expect(plot.text.bottom).toBeLessThanOrEqual(plot.plot.bottom + 1);
  const earlier = page.getByRole('button', { name: 'Earlier change', exact: true });
  await earlier.scrollIntoViewIfNeeded();
  const a = (await earlier.boundingBox())!; const b = (await fallback.boundingBox())!;
  expect(a.y).toBeGreaterThanOrEqual(b.y + b.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: info.outputPath(`fallback-${width}-${rootText}-root-text.png`), fullPage: true });
});

test('VIS-SCALE-001 fallback transitions and selection/list/resize agreement', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await seed(page, [1200, 900, 800, 700, 600, 500, 400, 300]);
  const chart = page.getByTestId('example-line-chart');
  for (let i = 0; i < 6; i++) await page.getByRole('button', { name: 'Earlier change', exact: true }).click();
  await expect(chart).toHaveAttribute('data-vis-scale-start', '1');
  await expect(chart.locator('svg, [data-chart-selected], [data-chart-label], [data-testid="chart-event-dot"]')).toHaveCount(0);
  await expect(page.getByTestId('vis-scale-fallback')).toHaveText(VIS_SCALE_COPY.fallback);
  await expect(page.getByTestId('activity-card')).toContainText('300.00');
  await expect(page.getByTestId('vis-scale-fallback')).not.toHaveAttribute('aria-live');
  await expect(chart.locator('[aria-live]')).toHaveCount(1);
  await page.getByRole('button', { name: 'All changes', exact: true }).click();
  await expect(chart.getByTestId('chart-event-list').locator('li')).toHaveCount(8);
  await page.getByRole('button', { name: 'All changes', exact: true }).click();
  await expect(chart).toHaveAttribute('data-vis-scale-start', '1');
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: 'Later change', exact: true }).click();
    await expect(chart).toHaveAttribute('data-vis-scale-start', '1');
  }
  await page.getByRole('button', { name: 'Later change', exact: true }).click();
  await expect(chart).toHaveAttribute('data-vis-scale-state', 'plot');
  await expect(chart.locator('[data-chart-selected]')).toHaveAttribute('data-event-id', 'scale-5');
  await page.setViewportSize({ width: 320, height: 900 });
  await expect(chart.locator('[data-chart-selected]')).toHaveAttribute('data-event-id', 'scale-5');
  await page.getByRole('button', { name: 'Earlier change', exact: true }).press('ArrowLeft');
  await expect(chart.locator('[data-chart-selected]')).toHaveAttribute('data-event-id', 'scale-4');
});

test('VIS-SCALE-001 currencies and FX slider preserve base USD geometry and ledger', async ({ page }) => {
  await seed(page, [500, 510, 520, 530, 540, 550]);
  const before = await geometry(page); const ledger = await page.evaluate(() => localStorage.getItem('hedgr:ledger'));
  for (const currency of ['KES', 'NGN', 'GHS', 'PHP', 'ZMW']) {
    await page.getByRole('combobox', { name: 'Display currency for this simulation' }).selectOption(currency);
    expect(await geometry(page)).toEqual(before);
    expect(await page.evaluate(() => localStorage.getItem('hedgr:ledger'))).toBe(ledger);
  }
  await page.getByRole('button', { name: 'Currency context', exact: true }).click();
  const slider = page.getByRole('slider', { name: 'Try an example rate' });
  for (const key of ['Home', 'End']) { await slider.press(key); expect(await geometry(page)).toEqual(before); }
  await page.getByRole('button', { name: 'Back to Home', exact: true }).click();
});

test('VIS-SCALE-001 examples retain captured pre-change geometry/text', async ({ page }) => {
  for (const [example, hash] of [['daniel', '1beacfb373b9af5e87959b792c38f9d17a23337966dcec20bceaa941366b8d65'], ['sarah', 'efa96c7e00eb260fc2dde6bd80db4af1a15636360759dd9f5a6a907e3ce64349']]) {
    await page.goto(`${home}?example=${example}`); const chart = page.getByTestId('example-line-chart'); await expect(chart).toBeVisible();
    const value = await chart.evaluate(n => ({ paths: [...n.querySelectorAll('svg path')].map(p => p.getAttribute('d')), series: [...n.querySelectorAll('svg [data-series-at]')].map(p => [p.getAttribute('data-series-at'), p.getAttribute('data-series-value'), p.getAttribute('transform')]), dots: [...n.querySelectorAll('[data-testid="chart-event-dot"]')].map(p => p.getAttribute('style')), text: n.textContent }));
    expect(createHash('sha256').update(JSON.stringify(value)).digest('hex')).toBe(hash);
    await expect(chart).not.toHaveAttribute('data-vis-scale-state');
    await expect(page.getByTestId('vis-scale-fallback')).toHaveCount(0);
  }
});

test('VIS-SCALE-001 boundary cases retain every change and emit fixture-only fallback observations', async ({ page }, info) => {
  test.setTimeout(90000);
  const observations = [];
  for (const [name, balances, outside] of [
    ['endpoints', [0, 1000], false], ['zero', [0, 0], false], ['equal', [500, 500], false],
    ['just above', [1000.01], true], ['negative segment ending at zero', [-0.01, 0], true], ['large', [1000000], true],
    ['pre-window boundary', [1200, 900, 800, 700, 600], true], ['six500', [500, 1000, 1500, 2000, 2500, 3000], true],
  ] as const) {
    await seed(page, [...balances]);
    const chart = page.getByTestId('example-line-chart');
    await expect(chart).toHaveAttribute('data-vis-scale-state', outside ? 'activity-only' : 'plot');
    await expect(chart.locator('svg')).toHaveCount(outside ? 0 : 1);
    if (outside) await expect(page.getByTestId('vis-scale-fallback')).toHaveText(VIS_SCALE_COPY.fallback);
    await page.getByRole('button', { name: 'All changes', exact: true }).click();
    await expect(chart.getByTestId('chart-event-list').locator('li')).toHaveCount(balances.length);
    observations.push({ fixture: name, observedState: await chart.getAttribute('data-vis-scale-state'), eventCount: balances.length, kind: 'AUTOMATED_FIXTURE_NOT_TESTER_USAGE' });
  }
  await info.attach('fixture-fallback-observations', { body: JSON.stringify(observations), contentType: 'application/json' });
});

test('VIS-SCALE-001 visit variants do not reserve slots', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  let initialX: number[] | undefined;
  for (const sameTime of [false, true]) for (const visit of [null, 500, 2500, 9000]) {
    await seed(page, [500, 510, 520, 530, 540, 550], visit, sameTime);
    const chart = page.getByTestId('example-line-chart');
    await expect(chart).toHaveAttribute('data-vis-scale-slots', '4');
    const g = await geometry(page);
    expect(g.points.map(p => p.id)).toEqual(['scale-2', 'scale-3', 'scale-4', 'scale-5']);
    const actualX = g.points.map(p => p.xy[0]);
    if (initialX) expect(actualX).toEqual(initialX); else initialX = actualX;
    await expect(chart.locator('[data-chart-selected]')).toHaveAttribute('data-event-id', 'scale-5');
  }
});


test('VIS-SCALE-001 query journey alias opts in; default Home retains its legacy line', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await seed(page, [500, 510, 520, 530, 540, 550]);
  await page.goto('/dashboard?journey=class-a-val-002');
  await expect(page.getByTestId('example-line-chart')).toHaveAttribute('data-vis-scale-slots', '4');
  await expect(page.getByTestId('example-line-chart').locator('svg [data-series-at]')).toHaveCount(4);
  await page.goto('/dashboard');
  await expect(page.locator('[data-vis-scale-state]')).toHaveCount(0);
  await expect(page.getByTestId('dashboard-position-line')).toHaveAttribute('data-state', 'line');
});
