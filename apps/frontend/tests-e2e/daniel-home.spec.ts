import { expect, test, type Page } from '@playwright/test';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';
import { SIMULATION_DISPLAY_CURRENCIES } from '../lib/state/simulation-display-currency';

// §359 CLASS-A-VAL-002-STABILITY-DANIEL-HOME-001 — Daniel's Engine read on Home.
// §362 CLASS-A-VAL-002-HOME-EXAMPLE-PICKER-001 — Daniel only on the journey Home, by `example=daniel`.

const DEFAULT_HOME = '/dashboard';
const JOURNEY_ROUTES = ['/dashboard?journey=class-a-val-002', '/dashboard-synthetic-journey'] as const;
const FIGURE = 'K21,600';
const RATE_ASSUMPTION = 'Disclosed fixture rate: ZMW 27 per USD. Not a live rate.';
const COPY = { since: 'Since Daniel was last here', visit: 'Daniel’s last visit', back: 'Back to your own simulation', current: 'Now', lastDate: '25 Sep 2026', currentDate: '9 Oct 2026' };
const AS_OF = '2026-10-09T00:00:00.000Z';
const CURRENCY_KEY = 'hedgr.simulation.display-currency';
const PICKER = 'Choose an example';
const OPTIONS = ['Your own simulation', "Daniel's reserve"];

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

/** `example=daniel` on a journey route, keeping its existing query. */
const danielRoute = (route: string) => `${route}${route.includes('?') ? '&' : '?'}example=daniel`;

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

/** Your own simulation (or an unrecognised example). */
async function gotoHome(page: Page, route: string) {
  await page.goto(route);
  await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
}

/** Daniel's reserve on a journey route. */
async function gotoDaniel(page: Page, route: string) {
  await page.goto(danielRoute(route));
  await expect(page.getByTestId('dashboard-daniel-read')).toBeVisible();
}

const panel = (page: Page) => page.getByTestId('dashboard-daniel-read');
const picker = (page: Page) => page.getByRole('combobox', { name: PICKER });

async function storageSnapshot(page: Page) {
  return page.evaluate(() => {
    const dump = (store: Storage) =>
      Object.fromEntries(Array.from({ length: store.length }, (_, i) => store.key(i)!).sort().map((k) => [k, store.getItem(k)]));
    return { local: dump(localStorage), session: dump(sessionStorage) };
  });
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return ['localhost', '127.0.0.1', '::1'].includes(url.hostname) ? route.continue() : route.abort();
  });
});

test('omits the picker and Daniel from default simulated Home', async ({ page }) => {
  await login(page);
  for (const state of ['empty', 'settled']) {
    await seed(page, ACTIVITY[state]);
    for (const route of [DEFAULT_HOME, `${DEFAULT_HOME}?example=daniel`]) {
      await gotoHome(page, route);
      await expect(page.getByTestId('dashboard-balance')).toBeVisible();
      await expect(page.getByText('Simulated Hedgr balance')).toBeVisible();
      await expect(page.getByTestId('dashboard-daniel-read')).toHaveCount(0);
      await expect(picker(page)).toHaveCount(0);
      await expect(page.locator('main')).not.toContainText(/Daniel|K21,600|Your own simulation/);
    }
  }
});

test('shows Your own simulation by default on both journey routes without Daniel', async ({ page }) => {
  await login(page);
  for (const state of ['empty', 'settled']) {
    await seed(page, ACTIVITY[state]);
    for (const route of JOURNEY_ROUTES) {
      await gotoHome(page, route);
      await expect(picker(page)).toBeVisible();
      await expect(picker(page).locator('option:checked')).toHaveText('Your own simulation');
      await expect(page.getByTestId('dashboard-balance')).toBeVisible();
      await expect(page.getByText('Simulated Hedgr balance')).toBeVisible();
      await expect(page.getByTestId('dashboard-daniel-read')).toHaveCount(0);
      // Directly under the "Your position" heading.
      const underHeading = await page.evaluate(() => {
        const heading = document.querySelector('#dashboard-orientation-heading')!;
        return heading.nextElementSibling?.getAttribute('aria-label');
      });
      expect(underHeading).toBe(PICKER);
    }
  }
});

test("shows only Daniel's reserve when the example is selected", async ({ page }) => {
  await login(page);
  for (const state of ['empty', 'changed']) {
    await seed(page, ACTIVITY[state]);
    for (const route of JOURNEY_ROUTES) {
      await gotoDaniel(page, route);
      await expect(picker(page).locator('option:checked')).toHaveText("Daniel's reserve");
      await expect(page.getByTestId('dashboard-orientation')).toBeVisible();
      await expect(page.getByTestId('dashboard-disclosures')).toBeVisible();
      await expect(page.getByTestId('daniel-read-figure')).toHaveText(FIGURE);
      await expect(page.getByTestId('daniel-read-caption')).toHaveText('display estimate');
      await expect(page.getByTestId('daniel-read-disclosure').locator('li')).toHaveCount(4);
      for (const testId of [
        'dashboard-current-overview',
        'dashboard-balance',
        'dashboard-simulation-utilities',
        'dashboard-add-simulated-deposit',
        'dashboard-simulated-withdraw',
        'dashboard-current-status',
        'engine-posture-context',
        'dashboard-restart-journey',
        'research-planning-targets',
        'dashboard-planning-targets',
        'dashboard-education',
        'daniel-read-coexistence',
      ]) {
        await expect(page.getByTestId(testId), testId).toHaveCount(0);
      }
      await expect(page.locator('main')).not.toContainText(
        /Recent activity|Simulated Hedgr balance|Restart simulated journey|Planning targets|mock guidance/,
      );
    }
  }
});

test('returning to your own simulation leaves the simulated state unchanged', async ({ page }) => {
  test.setTimeout(60_000);
  await login(page);
  await seed(page, [], 'ZMW');
  await page.goto('/deposit?journey=class-a-val-002');
  await page.getByTestId('deposit-amount').fill(String(DANIEL_FIXTURE_RATE_ZMW_PER_USD * 5));
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText('You added $5.00 to your simulated balance');

  for (const route of JOURNEY_ROUTES) {
    await gotoHome(page, route);
    const balance = page.getByTestId('usd-balance');
    await expect(balance).toContainText('$5.00');
    const balanceBefore = await balance.innerText();
    const before = await storageSnapshot(page);
    expect(before.local['hedgr:ledger']).toContain('"amount_usd":5');

    await picker(page).selectOption({ label: "Daniel's reserve" });
    await expect(panel(page)).toBeVisible();
    await expect(page.getByTestId('dashboard-balance')).toHaveCount(0);
    expect(await storageSnapshot(page)).toEqual(before);

    await picker(page).selectOption({ label: 'Your own simulation' });
    await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
    await expect(panel(page)).toHaveCount(0);
    await expect(page.getByTestId('usd-balance')).toHaveText(balanceBefore);
    expect(await storageSnapshot(page)).toEqual(before);
    expect(new URL(page.url()).searchParams.has('example')).toBe(false);
  }
});

test('falls back to your own simulation for an unknown example value', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.settled);
  for (const route of JOURNEY_ROUTES) {
    for (const value of ['sarah', 'DANIEL']) {
      await gotoHome(page, `${route}${route.includes('?') ? '&' : '?'}example=${value}`);
      await expect(picker(page).locator('option:checked')).toHaveText('Your own simulation');
      await expect(page.getByTestId('dashboard-balance')).toBeVisible();
      await expect(page.getByTestId('dashboard-daniel-read')).toHaveCount(0);
    }
  }
});

test('example picker is labelled, keyboard-operable and reflows', async ({ page }) => {
  test.setTimeout(180_000);
  await login(page);
  await seed(page, ACTIVITY.changed);

  // Labelled, exact options in order, keyboard selection navigates and keeps the journey.
  for (const route of JOURNEY_ROUTES) {
    await gotoHome(page, route);
    const select = picker(page);
    await expect(select).toBeVisible();
    await expect(select.locator('option')).toHaveText(OPTIONS);
    await select.focus();
    // Type-ahead selects on a focused closed select on every platform (arrow keys open the menu on macOS).
    await page.keyboard.press('D');
    await expect(panel(page)).toBeVisible();
    const daniel = new URL(page.url());
    expect(daniel.pathname).toBe(new URL(route, 'http://x').pathname);
    expect(daniel.searchParams.get('example')).toBe('daniel');
    expect(daniel.searchParams.has('reset')).toBe(false);
    if (route.includes('journey=')) expect(daniel.searchParams.get('journey')).toBe('class-a-val-002');
    await expect(picker(page)).toBeFocused();
    // Let the browser's type-ahead buffer lapse so "Y" starts a new search.
    await page.waitForTimeout(1_100);
    await page.keyboard.press('Y');
    await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
    const own = new URL(page.url());
    expect(own.pathname).toBe(new URL(route, 'http://x').pathname);
    expect(own.searchParams.has('example')).toBe(false);
    expect(own.searchParams.has('reset')).toBe(false);
    if (route.includes('journey=')) expect(own.searchParams.get('journey')).toBe('class-a-val-002');
  }

  // No clipping or horizontal overflow at 390 px / 100% and 320 px / 200% text.
  for (const viewport of [
    { width: 390, height: 844, text: 100 },
    { width: 320, height: 700, text: 200 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const route of JOURNEY_ROUTES) {
      for (const selection of ['own', 'daniel'] as const) {
        if (selection === 'daniel') await gotoDaniel(page, route);
        else await gotoHome(page, route);
        await page.addStyleTag({ content: `html { font-size: ${viewport.text}%; }` });
        const layout = await page.evaluate(() => {
          const select = document.querySelector<HTMLSelectElement>('select[aria-label="Choose an example"]')!;
          const box = select.getBoundingClientRect();
          const daniel = document.querySelector<HTMLElement>('[data-testid="dashboard-daniel-read"]');
          const clipped = daniel
            ? Array.from(daniel.querySelectorAll<HTMLElement>('*')).filter(
                (node) => node.scrollWidth > node.clientWidth + 1 && getComputedStyle(node).display !== 'inline',
              ).length
            : 0;
          return {
            overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
            pickerWithinViewport: box.left >= 0 && box.right <= window.innerWidth + 1,
            pickerClipped: select.scrollWidth > select.clientWidth + 1,
            danielWithinViewport: daniel
              ? daniel.getBoundingClientRect().left >= 0 && daniel.getBoundingClientRect().right <= window.innerWidth + 1
              : true,
            danielOverflow: daniel ? daniel.scrollWidth - daniel.clientWidth : 0,
            clipped,
          };
        });
        const label = `${route} ${selection} ${viewport.width}@${viewport.text}%`;
        expect(layout.overflow, label).toBeLessThanOrEqual(1);
        expect(layout.danielOverflow, label).toBeLessThanOrEqual(1);
        expect(layout, label).toMatchObject({
          pickerWithinViewport: true,
          pickerClipped: false,
          danielWithinViewport: true,
          clipped: 0,
        });
        await expect(picker(page)).toBeVisible();
        if (selection === 'daniel') {
          await expect(page.getByTestId('daniel-read-disclosure')).toBeVisible();
          await expect(page.getByRole('region', { name: 'Daniel’s declared holding · Fictional example' })).toBeVisible();
        }
      }
    }
  }
});

test('shows Engine localDisplay above its caption with the complete runtime fixture disclosure', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.changed);
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, route);
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
    await expect(panel(page)).toContainText('Declared USD 800 shows as K21,600 at this rate.');
  }
});

test('keeps the Daniel read identical when display currency or simulated activity changes', async ({ page }) => {
  test.setTimeout(120_000);
  await login(page);
  let reference: string | null = null;
  for (const { code } of SIMULATION_DISPLAY_CURRENCIES) {
    for (const state of ['empty', 'changed', 'pending', 'failed']) {
      await seed(page, ACTIVITY[state], code);
      await gotoDaniel(page, '/dashboard?journey=class-a-val-002');
      const html = await panel(page).evaluate((node) => { const clone = node.cloneNode(true) as HTMLElement; clone.querySelector('a')?.remove(); return clone.innerHTML; });
      reference ??= html;
      expect(html).toBe(reference);
    }
  }
  // Returning visit after a change.
  await seed(page, ACTIVITY.changed, 'KES');
  await page.evaluate(() => localStorage.setItem('hedgr:last-home-visit', '1500'));
  await gotoDaniel(page, '/dashboard-synthetic-journey');
  expect(await panel(page).evaluate((node) => { const clone = node.cloneNode(true) as HTMLElement; clone.querySelector('a')?.remove(); return clone.innerHTML; })).toBe(reference);
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
  await gotoDaniel(page, '/dashboard-synthetic-journey');
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
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, route);
    const text = await panel(page).innerText();
    expect(text).not.toMatch(/\bhedg(e|es|ed|ing)\b/i);
    expect(text).not.toMatch(/anchor|obligation|progress|on track|goal/i);
    expect(text).not.toMatch(/custod|verified|wealth|sufficien|enough|guarantee|protect|recommend|should|advis|action|buy|sell|convert|balance|\bheld\b/i);
    expect(text).toContain('Fictional');
    expect(text).toContain('Not a live rate.');
    expect(text).toContain('fixed example time');
  }
});

// §365: the full example Home, preserving the earlier picker/rate controls above.
const lastRead = {
  figure: 'K23,600',
  holding: 'Declared USD 800 shows as K23,600 at this rate.',
  rate: 'Disclosed fixture rate: ZMW 29.5 per USD. Not a live rate.',
  asOf: '2026-09-25T00:00:00.000Z',
};
const currentRead = {
  figure: FIGURE,
  holding: 'Declared USD 800 shows as K21,600 at this rate.',
  rate: RATE_ASSUMPTION,
  asOf: AS_OF,
};

async function expectCurrencyContext(page: Page) {
  const context = page.getByRole('region', { name: 'Currency context', exact: true });
  await expect(context).toBeVisible();
  const points = context.getByTestId('daniel-currency-point');
  await expect(points).toHaveCount(2);
  await expect(points.nth(0)).toContainText(COPY.visit);
  await expect(points.nth(1)).toContainText(COPY.current);
  await expect(context.getByTestId('daniel-currency-figure')).toHaveText([lastRead.figure, currentRead.figure]);
  await expect(context.getByTestId('daniel-currency-rate')).toHaveText([lastRead.rate, currentRead.rate]);
  for (const figure of await context.getByTestId('daniel-currency-figure').all()) {
    const lines = await figure.evaluate((node) => {
      const range = document.createRange(); range.selectNodeContents(node);
      return Array.from(range.getClientRects()).filter((rect) => rect.width > 0).length;
    });
    expect(lines, 'each Engine figure remains a complete, unbroken number').toBe(1);
  }
  const boxes = await points.evaluateAll((nodes) => nodes.map((node) => {
    const r = node.getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, width: r.width };
  }));
  expect(boxes[0].width).toBeGreaterThan(0);
  expect(boxes[1].left).toBeGreaterThanOrEqual(boxes[0].right);
  expect(boxes[0].top).toBe(boxes[1].top);
  await expect(context).not.toContainText(/higher|lower|increase|decrease|difference|delta|\+|−|→|↑|↓/i);
  await expect(context.locator('svg, [data-delta], [data-direction], button, [role="dialog"]')).toHaveCount(0);
}

test("Daniel's reserve shows his example as a full Home", async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.changed, 'KES');
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, route);
    await expect(page.getByTestId('daniel-home-grid')).toBeVisible();
    await expect(page.getByTestId('daniel-read-figure')).toHaveText(FIGURE);
    await expect(page.getByTestId('daniel-read-caption')).toHaveText('display estimate');
    const chart = page.getByTestId('dashboard-position-line');
    await expect(chart).toHaveAttribute('aria-hidden', 'true');
    await expect(chart.locator('span[style*="top:"]')).toHaveCount(3);
    await expect(page.getByTestId('dashboard-position-line-visit')).toHaveText(COPY.visit);
    await expect(chart).not.toContainText(/Today|max|9 Oct|25 Sep/);
    const card = page.getByRole('region', { name: COPY.since, exact: true });
    await expect(card).toBeVisible();
    await expect(card.getByTestId('daniel-observation-holding')).toHaveText([lastRead.holding, currentRead.holding]);
    await expect(card.getByTestId('daniel-observation-rate')).toHaveText([lastRead.rate, currentRead.rate]);
    await expect(card.locator('time')).toHaveText([COPY.lastDate, COPY.currentDate]);
    await expect(card.locator('time').nth(0)).toHaveAttribute('datetime', lastRead.asOf);
    await expect(card.locator('time').nth(1)).toHaveAttribute('datetime', currentRead.asOf);
    await expect(card).toContainText('This is what happened in the example. It doesn’t tell you what will happen next.');
    await expect(page.getByTestId('daniel-read-as-of').locator('time')).toHaveText(COPY.currentDate);
    await expect(panel(page)).not.toContainText(/balance/i);
  }
});

test("Daniel's example offers no actions on your simulation", async ({ page }) => {
  await login(page);
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, route);
    await expect(panel(page).getByRole('link', { name: COPY.back })).toBeVisible();
    await expect(panel(page).locator('a')).toHaveCount(1);
    await expect(panel(page).locator('button, input, select')).toHaveCount(0);
    await expect(page.locator('main a[href*="/deposit"], main a[href*="/withdraw"], main a[href*="/activity"]')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/View Activity|Restart simulated journey|Simulate a withdrawal/);
  }
});

test("Daniel's example shows no mock guidance, planning targets, date line or display-currency selector", async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.changed);
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, route);
    await expect(page.getByTestId('dashboard-date-line')).toHaveCount(0);
    await expect(page.getByRole('combobox', { name: /display currency/i })).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText(/Start here|Recent activity|Planning targets|mock guidance/);
    await expect(page.getByTestId('engine-posture-banner')).toHaveCount(0);
    await expect(page.getByTestId('daniel-read-coexistence')).toHaveCount(0);
    await expect(page.getByTestId('dashboard-disclosures')).toBeVisible();
    await expectCurrencyContext(page);
  }
});

test("Daniel's example ignores your simulation", async ({ page }) => {
  test.setTimeout(90_000);
  await login(page);
  let reference: string | null = null;
  for (const route of JOURNEY_ROUTES) {
    for (const state of ['empty', 'changed']) {
      await seed(page, ACTIVITY[state], 'KES');
      await page.evaluate(() => {
        localStorage.setItem('hedgr:last-home-visit', '1500');
        localStorage.setItem('hedgr:review-snapshot', 'preserved-review-value');
      });
      const before = await storageSnapshot(page);
      await gotoDaniel(page, route);
      await expectCurrencyContext(page);
      const html = await panel(page).evaluate((node) => {
        const clone = node.cloneNode(true) as HTMLElement;
        clone.querySelector('a')?.remove();
        return clone.innerHTML;
      });
      reference ??= html;
      expect(html).toBe(reference);
      expect(await storageSnapshot(page)).toEqual(before);
    }
  }
});

test('Back to your own simulation returns without writing', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.changed, 'KES');
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, `${route}&keep=1`.replace('/dashboard-synthetic-journey&', '/dashboard-synthetic-journey?'));
    const before = await storageSnapshot(page);
    const link = panel(page).getByRole('link', { name: COPY.back });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    const target = new URL(href!, page.url());
    expect(target.pathname).toBe(new URL(route, 'http://x').pathname);
    expect(target.searchParams.has('example')).toBe(false);
    expect(target.searchParams.has('reset')).toBe(false);
    expect(target.searchParams.get('keep')).toBe('1');
    if (route.includes('journey=')) expect(target.searchParams.get('journey')).toBe('class-a-val-002');
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
    await expect(page.getByTestId('usd-balance')).toContainText('$3.00');
    expect(await storageSnapshot(page)).toEqual(before);
  }
});

test("Daniel's example Home reflows", async ({ page }) => {
  test.setTimeout(120_000);
  await login(page);
  await seed(page, ACTIVITY.changed);
  for (const viewport of [{ width: 390, height: 844, text: 100 }, { width: 320, height: 700, text: 200 }, { width: 1440, height: 1000, text: 100 }]) {
    await page.setViewportSize(viewport);
    for (const route of JOURNEY_ROUTES) {
      await gotoDaniel(page, route);
      await page.addStyleTag({ content: `html { font-size: ${viewport.text}%; }` });
      await expectCurrencyContext(page);
      await expect(page.getByRole('region', { name: COPY.since, exact: true })).toBeVisible();
      await expect(page.getByTestId('daniel-read-disclosure')).toBeVisible();
      const layout = await panel(page).evaluate((root) => {
        const nodes = [root, ...root.querySelectorAll<HTMLElement>('*')];
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          clipped: nodes.filter((node) => node.clientWidth > 0 && node.scrollWidth > node.clientWidth + 1 && getComputedStyle(node).display !== 'inline').map((node) => node.getAttribute('data-testid') ?? node.tagName),
          columns: getComputedStyle(root.querySelector('[data-testid="daniel-home-grid"]')!).gridTemplateColumns.split(' ').length,
        };
      });
      expect(layout.overflow, `${route} ${viewport.width}@${viewport.text}%`).toBeLessThanOrEqual(1);
      expect(layout.clipped).toEqual([]);
      expect(layout.columns).toBe(viewport.width === 1440 ? 2 : 1);
      await picker(page).focus();
      await expect(picker(page)).toBeFocused();
      await panel(page).getByRole('link', { name: COPY.back }).focus();
      await page.keyboard.press('Enter');
      await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
    }
  }
});

test('own simulation, default Home and live mode stay unchanged', async ({ page }) => {
  await login(page);
  await seed(page, ACTIVITY.changed);
  await page.evaluate(() => localStorage.setItem('hedgr:last-home-visit', '1500'));
  await gotoHome(page, '/dashboard?journey=class-a-val-002');
  await expect(page.getByTestId('dashboard-position-line-visit')).toHaveText('Your last visit');
  await expect(page.getByTestId('dashboard-date-line')).toBeVisible();
  await expect(page.getByTestId('daniel-currency-context')).toHaveCount(0);
  await gotoHome(page, '/dashboard?example=daniel');
  await expect(picker(page)).toHaveCount(0);
  await expect(page.getByTestId('dashboard-daniel-read')).toHaveCount(0);
  await gotoHome(page, '/dashboard-synthetic-journey?example=unknown');
  await expect(picker(page)).toHaveValue('own');
  // Live mode query eligibility is covered by the named Vitest contract; this build is hermetic mock mode.
});

test("Daniel's currency context shows two Engine figures side by side with no computed difference", async ({ page }) => {
  await login(page);
  for (const route of JOURNEY_ROUTES) {
    await gotoDaniel(page, route);
    await expectCurrencyContext(page);
    await expect(panel(page)).not.toContainText(/K2,000|higher|lower|increase|decrease|delta|difference|\+|−|→|↑|↓/i);
  }
});
