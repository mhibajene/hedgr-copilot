import { expect, test, type Page } from '@playwright/test';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';
import { SIMULATION_DISPLAY_CURRENCIES } from '../lib/state/simulation-display-currency';

// §359 CLASS-A-VAL-002-STABILITY-DANIEL-HOME-001 — Daniel on simulated Home.

const ROUTES = ['/dashboard', '/dashboard?journey=class-a-val-002', '/dashboard-synthetic-journey'] as const;
const FIGURE = 'K21,600';
const RATE_ASSUMPTION = 'Disclosed fixture rate: ZMW 27 per USD. Not a live rate.';
const AS_OF = '2026-10-09T00:00:00.000Z';
const COEXISTENCE =
  'The mock guidance on this page is not calculated from Daniel’s amount. Daniel’s figure neither confirms nor overrides it.';
const CURRENCY_KEY = 'hedgr.simulation.display-currency';

type LedgerTx = {
  txn_ref: string;
  type: 'deposit' | 'withdrawal';
  status: 'settled' | 'pending' | 'failed';
  amount_zmw: number;
  amount_usd: number;
  fx_rate: number;
  created_at: number;
  updated_at: number;
};

const row = (ref: string, type: LedgerTx['type'], status: LedgerTx['status'], usd: number, at: number): LedgerTx => ({
  txn_ref: ref,
  type,
  status,
  amount_zmw: type === 'deposit' ? usd * 20 : 0,
  amount_usd: usd,
  fx_rate: type === 'deposit' ? 20 : 0,
  created_at: at,
  updated_at: at,
});

const ACTIVITY: Record<string, LedgerTx[]> = {
  empty: [],
  settled: [row('d1', 'deposit', 'settled', 5, 1000)],
  changed: [row('d1', 'deposit', 'settled', 5, 1000), row('w1', 'withdrawal', 'settled', 2, 2000)],
  pending: [row('d1', 'deposit', 'settled', 5, 1000), row('d2', 'deposit', 'pending', 4, 1500)],
  failed: [row('d1', 'deposit', 'settled', 5, 1000), row('d2', 'deposit', 'failed', 4, 1500)],
};

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('daniel-home@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

async function seed(page: Page, txs: LedgerTx[], currency?: string) {
  await page.evaluate(({ txs, currency, key }) => {
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: txs }));
    localStorage.removeItem('hedgr:last-home-visit');
    if (currency) localStorage.setItem(key, currency);
  }, { txs, currency, key: CURRENCY_KEY });
}

async function gotoHome(page: Page, route: string) {
  await page.goto(route);
  await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
  await expect(page.getByTestId('dashboard-daniel-read')).toBeVisible();
}

const panel = (page: Page) => page.getByTestId('dashboard-daniel-read');

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return ['localhost', '127.0.0.1', '::1'].includes(url.hostname) ? route.continue() : route.abort();
  });
});

test('renders the same Daniel read on all three simulated Home routes', async ({ page }) => {
  test.setTimeout(120_000);
  await login(page);
  let reference: string | null = null;
  for (const state of ['empty', 'settled', 'pending', 'failed']) {
    await seed(page, ACTIVITY[state]);
    for (const route of ROUTES) {
      await gotoHome(page, route);
      await expect(page.getByTestId('daniel-read-figure')).toHaveText(FIGURE);
      await expect(page.getByTestId('dashboard-balance')).toBeVisible();
      const placement = await page.evaluate(() => {
        const daniel = document.querySelector('[data-testid="dashboard-daniel-read"]')!;
        const hero = document.querySelector('[data-testid="dashboard-balance"]')!;
        return {
          insideHero: hero.contains(daniel) || daniel.contains(hero),
          afterOverview: daniel.previousElementSibling?.getAttribute('data-testid'),
        };
      });
      expect(placement).toEqual({ insideHero: false, afterOverview: 'dashboard-current-overview' });
      const text = await panel(page).innerText();
      reference ??= text;
      expect(text).toBe(reference);
    }
  }
});

test('shows Engine localDisplay above its caption with the complete runtime fixture disclosure', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.changed);
  for (const route of ROUTES) {
    await gotoHome(page, route);
    const figure = page.getByTestId('daniel-read-figure');
    const caption = page.getByTestId('daniel-read-caption');
    await expect(figure).toHaveText(FIGURE);
    await expect(caption).toHaveText('display estimate');
    const figureBox = (await figure.boundingBox())!;
    const captionBox = (await caption.boundingBox())!;
    expect(captionBox.y).toBeGreaterThanOrEqual(figureBox.y + figureBox.height - 1);
    const sizes = await page.evaluate(() => ({
      figure: parseFloat(getComputedStyle(document.querySelector('[data-testid="daniel-read-figure"]')!).fontSize),
      caption: parseFloat(getComputedStyle(document.querySelector('[data-testid="daniel-read-caption"]')!).fontSize),
    }));
    expect(sizes.caption).toBeLessThan(sizes.figure);
    await expect(page.getByTestId('daniel-read-holding')).toContainText('Fictional user-declared holding: USD 800.');
    await expect(page.getByTestId('daniel-read-pair')).toHaveText('Pair: USD/ZMW.');
    await expect(page.getByTestId('daniel-read-rate')).toHaveText(RATE_ASSUMPTION);
    await expect(page.getByTestId('daniel-read-as-of').locator('time')).toHaveAttribute('datetime', AS_OF);
    await expect(page.getByTestId('daniel-read-as-of')).toContainText('fixed example time');
    await expect(panel(page)).not.toContainText('shows as');
  }
});

test('keeps Daniel separate from mock guidance and preserves every notice text', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.settled);
  for (const route of ROUTES) {
    await gotoHome(page, route);
    await expect(page.getByTestId('daniel-read-coexistence')).toHaveText(COEXISTENCE);
    await expect(page.getByRole('region', { name: 'Daniel’s declared holding · Fictional example' })).toBeVisible();
    const status = page.getByTestId('dashboard-current-status');
    await expect(status).toBeVisible();
    await expect(status).not.toContainText('Daniel');
    const statusText = await page.getByTestId('engine-posture-context').innerText();
    await expect(panel(page)).not.toContainText(statusText);
    // Normal mock posture shows no notice banner; Daniel adds none.
    await expect(page.getByTestId('engine-posture-banner')).toHaveCount(0);
  }
});

test('keeps the Daniel read identical when display currency or simulated activity changes', async ({ page }) => {
  test.setTimeout(120_000);
  await login(page);
  let reference: string | null = null;
  for (const { code } of SIMULATION_DISPLAY_CURRENCIES) {
    for (const state of ['empty', 'changed', 'pending', 'failed']) {
      await seed(page, ACTIVITY[state], code);
      await gotoHome(page, '/dashboard?journey=class-a-val-002');
      const html = await panel(page).innerHTML();
      reference ??= html;
      expect(html).toBe(reference);
    }
  }
  // Returning visit after a change.
  await seed(page, ACTIVITY.changed, 'KES');
  await page.evaluate(() => localStorage.setItem('hedgr:last-home-visit', '1500'));
  await gotoHome(page, '/dashboard-synthetic-journey');
  await expect(page.getByTestId('dashboard-current-status')).toHaveAttribute('data-home-state', /^since-/);
  expect(await panel(page).innerHTML()).toBe(reference);
});

test('normalizes new synthetic ZMW deposit rows at the Engine fixture without changing the live API boundary', async ({ page }) => {
  test.setTimeout(60_000);
  await login(page);
  const oldRow = row('old-20-row', 'deposit', 'settled', 5, 1000);
  await seed(page, [oldRow], 'ZMW');
  const oldBefore = await page.evaluate(() => JSON.stringify(JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions[0]));
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await page.goto('/deposit?journey=class-a-val-002');
  await expect(page.getByTestId('deposit-fx-block')).toHaveText('Simulated example rate: 1 USD = 27.00 ZMW');
  await page.getByTestId('deposit-amount').fill(String(DANIEL_FIXTURE_RATE_ZMW_PER_USD * 5));
  await expect(page.getByTestId('deposit-balance-change')).toContainText('shows 135 ZMW as +$5.00');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText('You added $5.00 to your simulated balance');
  const records = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
  expect(records).toHaveLength(2);
  expect(JSON.stringify(records[0])).toBe(oldBefore);
  expect(records[1]).toMatchObject({ type: 'deposit', amount_usd: 5, amount_zmw: 135, fx_rate: DANIEL_FIXTURE_RATE_ZMW_PER_USD });
  expect(requests.filter((url) => /\/v1\/deposits/.test(url))).toEqual([]);
  // The default (non-journey) Deposit keeps the backend/fixed 20 boundary.
  await page.goto('/deposit');
  await page.getByTestId('deposit-amount').fill('100');
  await expect(page.getByTestId('deposit-conversion-preview')).toContainText('shows 100 ZMW as +$5.00');
  // Daniel is unchanged by the new row.
  await gotoHome(page, '/dashboard-synthetic-journey');
  await expect(page.getByTestId('daniel-read-figure')).toHaveText(FIGURE);
});

test('normalizes non-ZMW synthetic deposit ZMW legs at the Engine fixture with unchanged selected-currency amounts', async ({ page }) => {
  test.setTimeout(120_000);
  await login(page);
  for (const [currency, rate, input] of [['KES', 130, '650'], ['NGN', 1500, '7500'], ['GHS', 15, '75'], ['PHP', 56, '280']] as const) {
    await seed(page, [], currency);
    await page.goto('/deposit?journey=class-a-val-002');
    await expect(page.getByTestId('deposit-fx-block')).toHaveText(`Simulated example rate: 1 USD = ${rate.toFixed(2)} ${currency}`);
    await page.getByTestId('deposit-amount').fill(input);
    await expect(page.getByTestId('deposit-balance-change')).toContainText(`shows ${input} ${currency} as +$5.00`);
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByTestId('deposit-confirmation-region')).toContainText('You added $5.00 to your simulated balance');
    const records = await page.evaluate(() => JSON.parse(localStorage.getItem('hedgr:ledger')!).transactions);
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({ type: 'deposit', amount_usd: 5, amount_zmw: 135, fx_rate: DANIEL_FIXTURE_RATE_ZMW_PER_USD });
    await page.goto('/activity?journey=class-a-val-002');
    await expect(page.getByTestId('activity-delta-deposit')).toHaveText('+$5.00');
  }
});

test('contains no prohibited claims in Daniel Home copy', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.settled);
  for (const route of ROUTES) {
    await gotoHome(page, route);
    const text = await panel(page).innerText();
    expect(text).not.toMatch(/\bhedg(e|es|ed|ing)\b/i);
    expect(text).not.toMatch(/anchor|obligation|progress|on track|goal/i);
    expect(text).not.toMatch(/custod|verified|wealth|sufficien|enough|guarantee|protect|recommend|should|advis|action|buy|sell|convert|balance|\bheld\b/i);
    expect(text).toContain('Fictional');
    expect(text).toContain('Not a live rate.');
    expect(text).toContain('fixed example time');
  }
});

test('Daniel panel reflows without clipping or overflow on all three routes', async ({ page }) => {
  test.setTimeout(300_000);
  await login(page);
  const viewports = [
    { width: 390, height: 844, text: 100 },
    { width: 320, height: 700, text: 200 },
  ];
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const { code } of SIMULATION_DISPLAY_CURRENCIES) {
      for (const state of ['empty', 'changed']) {
        await seed(page, ACTIVITY[state], code);
        for (const route of ROUTES) {
          await gotoHome(page, route);
          await page.addStyleTag({ content: `html { font-size: ${viewport.text}%; }` });
          const layout = await page.evaluate(() => {
            const root = document.querySelector<HTMLElement>('[data-testid="dashboard-daniel-read"]')!;
            const clipped = Array.from(root.querySelectorAll<HTMLElement>('*')).filter(
              (node) => node.scrollWidth > node.clientWidth + 1 && getComputedStyle(node).display !== 'inline',
            ).length;
            const figure = root.querySelector('[data-testid="daniel-read-figure"]')!.getBoundingClientRect();
            const caption = root.querySelector('[data-testid="daniel-read-caption"]')!.getBoundingClientRect();
            const box = root.getBoundingClientRect();
            return {
              overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
              panelOverflow: root.scrollWidth - root.clientWidth,
              withinViewport: box.left >= 0 && box.right <= window.innerWidth + 1,
              clipped,
              captionBelowFigure: caption.top >= figure.bottom - 1,
              meters: root.querySelectorAll('progress, meter, [role="progressbar"], a, button, input, select').length,
            };
          });
          expect(layout, `${route} ${code} ${state} ${viewport.width}@${viewport.text}%`).toEqual({
            overflow: expect.any(Number),
            panelOverflow: expect.any(Number),
            withinViewport: true,
            clipped: 0,
            captionBelowFigure: true,
            meters: 0,
          });
          expect(layout.overflow).toBeLessThanOrEqual(1);
          expect(layout.panelOverflow).toBeLessThanOrEqual(1);
          await expect(page.getByTestId('daniel-read-disclosure')).toBeVisible();
          await expect(page.getByTestId('daniel-read-coexistence')).toBeVisible();
          await expect(page.getByRole('region', { name: 'Daniel’s declared holding · Fictional example' })).toBeVisible();
        }
      }
    }
  }
});
