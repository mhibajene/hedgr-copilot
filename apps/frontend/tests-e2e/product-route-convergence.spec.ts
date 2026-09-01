import { expect, test, type Page } from '@playwright/test';
import {
  waitForDepositFxReady,
  waitForWithdrawFxReady,
} from './helpers/fx-ready';

const browserErrors = new WeakMap<Page, string[]>();

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('route-convergence@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function clearFinancialState(page: Page) {
  await page.evaluate(() => {
    window.localStorage.removeItem('hedgr:ledger');
    window.localStorage.removeItem('hedgr:wallet');
  });
}

test.beforeEach(async ({ context, page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('console', (message) => {
    if (
      message.type() === 'error' &&
      message.text() !== 'Failed to load resource: net::ERR_FAILED'
    ) {
      errors.push(`console: ${message.text()}`);
    }
  });

  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    const local = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
    return local ? route.continue() : route.abort();
  });
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page) ?? []).toEqual([]);
});

test('default routes share the simulated customer model without research framing', async ({
  page,
}) => {
  let sameOriginFxRequests = 0;
  let backendFxRequests = 0;
  let backendDepositRequests = 0;
  page.on('request', (request) => {
    const pathname = new URL(request.url()).pathname;
    if (pathname === '/api/fx') sameOriginFxRequests += 1;
    if (pathname === '/v1/fx/latest') backendFxRequests += 1;
    if (pathname === '/v1/deposits') backendDepositRequests += 1;
  });

  await login(page);
  await clearFinancialState(page);
  await page.goto('/dashboard');

  await expect(page.getByTestId('trust-disclosure-banner')).toContainText(
    'Simulation · no real money'
  );
  await expect(page.getByText(/Auth: mock|DeFi: mock|FX: fixed/)).toHaveCount(0);
  const primaryNav = page.getByTestId('nav-links');
  await expect(
    primaryNav.getByRole('link', { name: 'Home', exact: true })
  ).toHaveAttribute('href', '/dashboard');
  await expect(
    primaryNav.getByRole('link', { name: 'Settings', exact: true })
  ).toHaveAttribute('href', '/settings');
  for (const label of ['Dashboard', 'Deposit', 'Withdraw', 'Activity']) {
    await expect(
      primaryNav.getByRole('link', { name: label, exact: true })
    ).toHaveCount(0);
  }

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'See what you have and what changed.',
    })
  ).toBeVisible();
  await expect(page.getByTestId('dashboard-orientation')).toContainText(
    'Hedgr helps you understand and maintain your financial stability.'
  );
  await expect(page.getByTestId('dashboard-orientation')).toContainText(
    'This simulated experience provides context, not an instruction.'
  );
  await expect(page.getByTestId('synthetic-journey-shell')).toHaveCount(0);
  await expect(page.getByText(/Step 1|Position$/)).toHaveCount(0);
  await expect(page.getByText('Your current position', { exact: true })).toBeVisible();
  await expect(page.getByText('What Hedgr notices', { exact: true })).toBeVisible();
  await expect(page.getByText('Does anything need attention?')).toBeVisible();
  await expect(page.getByTestId('engine-allocation-bands')).toBeVisible();
  await expect(page.getByTestId('dashboard-add-simulated-deposit')).toHaveAttribute(
    'href',
    '/deposit'
  );
  await expect(page.getByTestId('dashboard-simulated-withdraw')).toHaveAttribute(
    'href',
    '/withdraw'
  );
  await expect(page.getByTestId('dashboard-view-activity')).toHaveAttribute(
    'href',
    '/activity'
  );
  await expect(page.getByTestId('dashboard-education')).not.toHaveAttribute(
    'open',
    ''
  );

  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await expect(page).toHaveURL(/\/deposit$/);
  await expect(page.getByTestId('deposit-simulation-context')).toContainText(
    'no real money moves'
  );
  await expect(page.getByText(/Step 2/)).toHaveCount(0);
  await expect(page.getByLabel('Simulated deposit amount')).toBeVisible();
  await waitForDepositFxReady(page);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByText('Simulated deposit recorded')).toBeVisible({
    timeout: 6_000,
  });
  expect(sameOriginFxRequests).toBeGreaterThan(0);
  expect(backendFxRequests).toBe(0);
  expect(backendDepositRequests).toBe(0);

  await page
    .getByRole('link', { name: 'Continue to simulated withdrawal' })
    .click();
  await expect(page).toHaveURL(/\/withdraw$/);
  await expect(page.getByTestId('withdraw-simulation-context')).toContainText(
    'no bank transfer or real payout occurs'
  );
  await expect(page.getByText(/Step 3/)).toHaveCount(0);
  await page.getByLabel('Amount to simulate (USD)').fill('2');
  await waitForWithdrawFxReady(page);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute(
    'data-status',
    'SUCCESS',
    { timeout: 6_000 }
  );
  await page.getByRole('link', { name: 'Review simulated activity' }).click();

  await expect(page).toHaveURL(/\/activity$/);
  await expect(page.getByTestId('activity-simulation-context')).toContainText(
    'No entry represents real money moving.'
  );
  await expect(page.getByTestId('activity-balance-reconciliation')).toContainText(
    '$3.00'
  );
  await expect(page.getByTestId('activity-row-deposit')).toContainText(
    'Simulated deposit'
  );
  await expect(page.getByTestId('activity-row-withdraw')).toContainText(
    'Simulated withdrawal'
  );

  await page.goto('/settings');
  await expect(page.getByTestId('settings-account')).toBeVisible();
  await expect(page.getByTestId('settings-preferences')).toContainText(
    'This simulated product does not currently offer customer-controlled settings.'
  );
  await expect(page.getByText(/prototype/i)).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'About Hedgr', exact: true })
  ).toBeVisible();

  await page.goto('/settings?journey=class-a-val-002');
  await expect(
    page.getByRole('link', { name: 'About Hedgr', exact: true })
  ).toHaveCount(0);
});

test('clean synthetic withdrawal preserves the governed Deposit route', async ({
  page,
}) => {
  await login(page);
  await clearFinancialState(page);
  await page.goto('/withdraw?journey=class-a-val-002');

  const empty = page.getByTestId('withdraw-no-funds');
  await expect(empty).toContainText('No simulated funds to withdraw');
  await expect(empty).toContainText(
    'No account is funded and no real money moves.'
  );
  await expect(empty).not.toContainText('fund your account');
  await expect(
    page.getByRole('link', { name: 'Add simulated deposit' })
  ).toHaveAttribute('href', '/deposit?journey=class-a-val-002');
});

test('default customer hierarchy remains usable at 390 by 844', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await login(page);
  await page.goto('/dashboard');

  await expect(page.getByTestId('dashboard-orientation')).toBeVisible();
  await expect(page.getByTestId('dashboard-current-overview')).toBeVisible();
  await expect(page.getByTestId('engine-allocation-bands')).toBeVisible();

  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth);

  const navToggle = page.getByTestId('nav-toggle');
  await expect(navToggle).toBeVisible();
  await navToggle.click();
  const mobileNav = page.getByTestId('nav-links-mobile');
  await expect(mobileNav.getByRole('link', { name: 'Home', exact: true })).toBeVisible();
  await expect(
    mobileNav.getByRole('link', { name: 'Settings', exact: true })
  ).toBeVisible();
  for (const label of ['Deposit', 'Withdraw', 'Activity']) {
    await expect(
      mobileNav.getByRole('link', { name: label, exact: true })
    ).toHaveCount(0);
  }
});
