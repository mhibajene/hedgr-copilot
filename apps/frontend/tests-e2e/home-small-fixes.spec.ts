import { expect, test, type Page } from '@playwright/test';
import { LAST_VISIT_STORAGE_KEY } from '../lib/state/last-visit';
import { SIMULATION_DISPLAY_CURRENCIES } from '../lib/state/simulation-display-currency';

const AXIS_TIME = /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{1,2}\/\d{1,2}|Today/;
const FORWARD_COPY = /toward|target|goal|on track|you will|will grow/i;
const ATTRIBUTION =
  'This is what happened in the example. It doesn’t tell you what will happen next.';
const RUST = 'rgb(150, 63, 34)';
const EVIDENCE = '/opt/cursor/artifacts/home-small-fixes-20261009';
const HOME_ROUTES = ['/dashboard', '/dashboard?journey=class-a-val-002'] as const;

type LedgerTx = {
  txn_ref: string;
  type: 'deposit' | 'withdrawal';
  status: 'settled';
  amount_zmw: number;
  amount_usd: number;
  fx_rate: number;
  created_at: number;
  updated_at: number;
};

function deposit(amountUsd = 5, at = 1000): LedgerTx {
  return {
    txn_ref: `deposit-${at}`,
    type: 'deposit',
    status: 'settled',
    amount_zmw: amountUsd * 20,
    amount_usd: amountUsd,
    fx_rate: 20,
    created_at: at,
    updated_at: at,
  };
}

function withdraw(amountUsd = 2, at = 2000): LedgerTx {
  return {
    txn_ref: `withdraw-${at}`,
    type: 'withdrawal',
    status: 'settled',
    amount_zmw: 0,
    amount_usd: amountUsd,
    fx_rate: 0,
    created_at: at,
    updated_at: at,
  };
}

async function login(page: Page, email: string) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill(email);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

async function loginJourney(page: Page) {
  await login(page, 'home-small-fixes-journey@hedgr.test');
  await page.goto('/orientation');
  await page.getByTestId('orientation-continue').click();
  await expect(page).toHaveURL(/\/dashboard-synthetic-journey/);
}

async function seed(page: Page, txs: LedgerTx[], lastVisit?: number | null) {
  await page.evaluate(
    ({ txs, lastVisit, visitKey }) => {
      window.localStorage.setItem(
        'hedgr:ledger',
        JSON.stringify({ version: 2, transactions: txs })
      );
      if (lastVisit === null) window.localStorage.removeItem(visitKey);
      else if (typeof lastVisit === 'number') {
        window.localStorage.setItem(visitKey, String(lastVisit));
      }
    },
    { txs, lastVisit, visitKey: LAST_VISIT_STORAGE_KEY }
  );
}

async function applyTextSize(page: Page, percent: number) {
  await page.addStyleTag({ content: `html { font-size: ${percent}%; }` });
}

async function gotoHome(page: Page, route: string) {
  await page.goto(route);
  await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
}

async function dashedHorizontalLineCount(page: Page) {
  const line = page.getByTestId('dashboard-position-line');
  if ((await line.count()) === 0) return 0;
  return line.locator('line').evaluateAll((lines) =>
    lines.filter((node) => {
      const y1 = node.getAttribute('y1');
      const y2 = node.getAttribute('y2');
      const dash = getComputedStyle(node).strokeDasharray;
      return y1 === y2 && dash !== 'none' && dash !== '';
    }).length
  );
}

function parseRgb(color: string) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    const isLocal = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
    if (!isLocal) return route.abort();
    if (url.pathname === '/v1/fx/latest') return route.abort();
    return route.continue();
  });
});

test('Home line shows no dashed guide or max label on either route', async ({ page }) => {
  await login(page, 'home-small-fixes-line@hedgr.test');
  await seed(page, [deposit(5, 1000), withdraw(2, 2000)], 500);
  for (const route of [...HOME_ROUTES, '/dashboard-synthetic-journey']) {
    await gotoHome(page, route);
    const line = page.getByTestId('dashboard-position-line');
    await expect(line).toBeVisible();
    expect(await dashedHorizontalLineCount(page)).toBe(0);
    await expect(line).not.toContainText('$5.00');
  }
});

test('Home change amounts use the sentence ink, not emphasis, on either route', async ({ page }) => {
  await login(page, 'home-small-fixes-ink@hedgr.test');
  for (const route of HOME_ROUTES) {
    await seed(page, [deposit(), withdraw()], null);
    await gotoHome(page, route);
    const whatChanged = page.getByTestId('dashboard-current-status');
    await expect(whatChanged).toBeVisible();
    for (const amount of await whatChanged.locator('[data-observation-amount]').all()) {
      const colors = await amount.evaluate((el) => {
        const parent = el.closest('p');
        return {
          amount: getComputedStyle(el).color,
          parent: parent ? getComputedStyle(parent).color : '',
        };
      });
      expect(colors.amount).toBe(colors.parent);
      expect(colors.amount).not.toBe(RUST);
    }

    await seed(page, [deposit(), withdraw()], 500);
    await gotoHome(page, route);
    const since = page.getByTestId('dashboard-current-status');
    await expect(since).toContainText('Since you were last here');
    for (const amount of await since.locator('[data-observation-amount]').all()) {
      const colors = await amount.evaluate((el) => {
        const parent = el.closest('p');
        return {
          amount: getComputedStyle(el).color,
          parent: parent ? getComputedStyle(parent).color : '',
        };
      });
      expect(colors.amount).toBe(colors.parent);
      expect(colors.amount).not.toBe(RUST);
    }

    await expect(page.getByTestId('dashboard-balance')).not.toContainText(/[↑↓]/);
    await expect(page.getByTestId('dashboard-current-status')).not.toContainText(/[↑↓]/);
  }
});

test('Home shows no change chip after a deposit or withdrawal on either route', async ({ page }) => {
  await login(page, 'home-small-fixes-chip@hedgr.test');
  for (const route of HOME_ROUTES) {
    await seed(page, [deposit()], 500);
    await gotoHome(page, route);
    await expect(page.getByTestId('dashboard-current-status')).toContainText('Since you were last here');
    await expect(page.getByTestId('dashboard-change-chip')).toHaveCount(0);

    await seed(page, [deposit(), withdraw()], 500);
    await gotoHome(page, route);
    await expect(page.getByTestId('dashboard-current-status')).toContainText('Since you were last here');
    await expect(page.getByTestId('dashboard-change-chip')).toHaveCount(0);

    await page.reload();
    await expect(page.getByTestId('dashboard-current-status')).toContainText('Since you were last here');
    await expect(page.getByTestId('dashboard-change-chip')).toHaveCount(0);
  }
});

test('Home after the first deposit offers Simulate a withdrawal on either route', async ({ page }) => {
  test.setTimeout(90_000);
  await loginJourney(page);
  await page.goto('/dashboard-synthetic-journey?reset=1');
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible();
  await page.getByRole('link', { name: 'Back to your position' }).click();
  await expect(page.getByTestId('dashboard-simulated-withdraw')).toBeVisible();
  await expect(page.getByTestId('dashboard-view-activity')).toHaveCount(0);
  await page.getByTestId('dashboard-simulated-withdraw').click();
  await expect(page).toHaveURL(/\/withdraw\?journey=class-a-val-002/);
  await page.getByTestId('withdraw-amount').fill('2');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('withdraw-status-region')).toBeVisible();
  await page.getByRole('link', { name: 'Back to your position' }).click();
  await expect(page.getByTestId('dashboard-view-activity')).toBeVisible();
  await expect(page.getByTestId('dashboard-simulated-withdraw')).toHaveCount(0);

  await login(page, 'home-small-fixes-default-utils@hedgr.test');
  await page.goto('/dashboard');
  await seed(page, [], null);
  await gotoHome(page, '/dashboard');
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible();
  await page.getByRole('link', { name: 'Home', exact: true }).first().click();
  await expect(page.getByTestId('dashboard-simulated-withdraw')).toBeVisible();
  await expect(page.getByTestId('dashboard-add-simulated-deposit')).toBeVisible();
  await expect(page.getByTestId('dashboard-view-activity')).toBeVisible();
});

const estimateAmounts: Record<string, string> = {
  ZMW: '9,600.00',
  KES: '62,400.00',
  NGN: '720,000.00',
  GHS: '7,200.00',
  PHP: '26,880.00',
};

test('hero caption sits under the local figure for every display currency', async ({ page }) => {
  test.setTimeout(180_000);
  await loginJourney(page);
  await seed(page, [deposit(500, 1000), withdraw(20, 2000)]);
  const viewports = [
    { width: 390, height: 844, text: 100 },
    { width: 320, height: 700, text: 200 },
  ];
  for (const currency of SIMULATION_DISPLAY_CURRENCIES) {
    await page.evaluate((code) => {
      window.localStorage.setItem('hedgr.simulation.display-currency', code);
    }, currency.code);
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoHome(page, '/dashboard?journey=class-a-val-002');
      await applyTextSize(page, viewport.text);
      const figure = page.getByTestId('local-balance-figure');
      const caption = page.getByTestId('local-balance-caption');
      await expect(page.getByTestId('local-balance')).toHaveText(
        `≈ ${currency.code} ${estimateAmounts[currency.code]} display estimate`
      );
      const figureBox = (await figure.boundingBox())!;
      const captionBox = (await caption.boundingBox())!;
      expect(captionBox.y).toBeGreaterThanOrEqual(figureBox.y + figureBox.height - 1);
      const sizes = await page.evaluate(() => {
        const figureEl = document.querySelector('[data-testid="local-balance-figure"]')!;
        const captionEl = document.querySelector('[data-testid="local-balance-caption"]')!;
        const figureStyle = getComputedStyle(figureEl);
        const lineHeight = parseFloat(figureStyle.lineHeight) || parseFloat(figureStyle.fontSize) * 1.2;
        return {
          figure: parseFloat(figureStyle.fontSize),
          caption: parseFloat(getComputedStyle(captionEl).fontSize),
          figureHeight: figureEl.getBoundingClientRect().height,
          lineHeight,
          text: figureEl.textContent ?? '',
        };
      });
      expect(sizes.caption).toBeLessThan(sizes.figure);
      expect(sizes.figureHeight).toBeLessThanOrEqual(sizes.lineHeight * 2 + 1);
      expect(sizes.text).toBe(`≈ ${currency.code} ${estimateAmounts[currency.code]}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }

  await gotoHome(page, '/dashboard');
  await expect(page.getByTestId('local-balance-figure')).toHaveCount(0);
  await expect(page.getByTestId('local-balance-caption')).toHaveCount(0);
});

test('Home axis does not imply time on either route', async ({ page }) => {
  await login(page, 'home-small-fixes-axis@hedgr.test');
  await seed(page, [deposit(), withdraw()], 500);
  for (const route of HOME_ROUTES) {
    await gotoHome(page, route);
    const line = page.getByTestId('dashboard-position-line');
    await expect(line).toBeVisible();
    const text = (await line.textContent()) ?? '';
    expect(text).not.toMatch(AXIS_TIME);
  }
});

test('Home layout holds across routes states currencies and text size', async ({ page }) => {
  test.setTimeout(240_000);
  await login(page, 'home-small-fixes-layout@hedgr.test');
  const states = {
    empty: { txs: [] as LedgerTx[], lastVisit: null as number | null },
    'first-event': { txs: [deposit()], lastVisit: null },
    change: { txs: [deposit(), withdraw()], lastVisit: null },
    'returning-visit': { txs: [deposit(), withdraw()], lastVisit: 500 },
  } as const;
  const viewports = [
    { width: 390, height: 844, text: 100, label: '390' },
    { width: 320, height: 700, text: 200, label: '320-200' },
  ];

  for (const currency of SIMULATION_DISPLAY_CURRENCIES) {
    await page.evaluate((code) => {
      window.localStorage.setItem('hedgr.simulation.display-currency', code);
    }, currency.code);
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (const [stateName, state] of Object.entries(states)) {
        await seed(page, [...state.txs], state.lastVisit);
        await gotoHome(page, '/dashboard?journey=class-a-val-002');
        await applyTextSize(page, viewport.text);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        const hero = page.getByTestId('dashboard-balance');
        await expect(hero).toBeVisible();
        if (state.txs.length > 0) {
          await expect(page.getByTestId('local-balance-figure')).toBeVisible();
          await expect(page.getByTestId('local-balance-caption')).toBeVisible();
        }
        const status = page.getByTestId('dashboard-current-status');
        if ((await status.getAttribute('data-home-state'))?.startsWith('since-') &&
            (await status.getAttribute('data-home-state')) !== 'since-no-change') {
          await expect(status).toContainText(ATTRIBUTION);
        } else if (await status.getByTestId('engine-posture-context').count()) {
          const label = await status.locator('#dashboard-current-status-label').textContent();
          if (label === 'What changed' || (await status.textContent())?.includes('What Hedgr notices')) {
            await expect(status).toContainText(ATTRIBUTION);
          }
        }
        if (currency.code === 'NGN') {
          await page.screenshot({
            path: `${EVIDENCE}/layout-journey-NGN-${stateName}-${viewport.label}.png`,
            fullPage: true,
          });
        }
      }
    }
  }

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const [stateName, state] of Object.entries(states)) {
      await seed(page, [...state.txs], state.lastVisit);
      await gotoHome(page, '/dashboard');
      await applyTextSize(page, viewport.text);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.getByTestId('dashboard-balance')).toBeVisible();
      const status = page.getByTestId('dashboard-current-status');
      if ((await status.getAttribute('data-home-state'))?.startsWith('since-one') ||
          (await status.getAttribute('data-home-state')) === 'since-several') {
        await expect(status).toContainText(ATTRIBUTION);
      }
      await page.screenshot({
        path: `${EVIDENCE}/layout-default-${stateName}-${viewport.label}.png`,
        fullPage: true,
      });
    }
  }
});

test('Home adds no totals meters progress gap or gain-loss colour', async ({ page }) => {
  await login(page, 'home-small-fixes-fence@hedgr.test');
  await seed(page, [deposit(), withdraw()], 500);
  for (const route of HOME_ROUTES) {
    await gotoHome(page, route);
    await expect(page.locator('progress, meter, [role=progressbar]')).toHaveCount(0);
    expect(await dashedHorizontalLineCount(page)).toBe(0);

    const colors = await page.evaluate(() => {
      const nodes = [
        ...document.querySelectorAll('[data-observation-amount]'),
        ...document.querySelectorAll('[data-testid="dashboard-since-entries"] li > span:last-child'),
        document.querySelector('[data-testid="usd-balance"]'),
      ].filter(Boolean) as HTMLElement[];
      return nodes.map((node) => getComputedStyle(node).color);
    });
    for (const color of colors) {
      expect(color).not.toBe(RUST);
      const rgb = parseRgb(color);
      if (rgb) {
        expect(rgb.g > rgb.r + 40 || rgb.r > rgb.g + 80).toBe(false);
      }
    }

    const scoped = await page.evaluate(() => {
      const selectors = [
        '[data-testid="dashboard-balance"]',
        '[data-testid="dashboard-current-status"]',
        '[data-testid="dashboard-position-line"]',
        '[data-testid="dashboard-simulation-utilities"]',
        '[data-testid="dashboard-first-use-steps"]',
      ];
      return selectors
        .map((selector) => document.querySelector(selector)?.textContent ?? '')
        .join('\n');
    });
    expect(scoped).not.toMatch(FORWARD_COPY);
  }
});
