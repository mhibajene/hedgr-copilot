import { expect, test, type Page } from '@playwright/test';

async function clearStorage(page: Page) {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
}

async function login(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('class-a-val-002@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.goto('/dashboard?journey=class-a-val-002');
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

test('CLASS-A-VAL-002 traverses Dashboard → Deposit → Withdraw → Activity with consistent fixtures', async ({
  page,
}) => {
  let depositContractRequests = 0;
  page.on('request', (request) => {
    if (new URL(request.url()).pathname === '/v1/deposits') {
      depositContractRequests += 1;
    }
  });

  await clearStorage(page);
  await login(page);

  await expect(page.getByTestId('trust-disclosure-banner')).toContainText(
    'Simulation Mode — No Real Money',
  );
  const simulationDetails = page.getByTestId('simulation-technical-details');
  await expect(simulationDetails).not.toHaveAttribute('open', '');
  await simulationDetails.getByText('How this simulation works').click();
  await expect(simulationDetails).toContainText('Auth: mock');
  await expect(simulationDetails).toContainText('DeFi: mock');
  await expect(simulationDetails).toContainText('FX: fixed');
  await expect(page.getByRole('button', { name: 'Dismiss trust disclosure' })).toHaveCount(0);
  const journeyShell = page.getByTestId('synthetic-journey-shell');
  await expect(journeyShell).toContainText('CLASS-A-VAL-002');
  await expect(journeyShell).toContainText(
    'Settings and Copilot are outside this participant journey',
  );
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(page.getByTestId('engine-allocation-band-coreTargetPct')).toContainText(
    'Target share · 50%',
  );
  await expect(page.getByTestId('engine-stability-review-snapshot')).toContainText(
    'Fixture target date',
  );
  await expect(page.getByTestId('engine-stability-review-snapshot')).toContainText(
    'Last viewed locally',
  );

  await page.getByRole('link', { name: 'Start synthetic deposit' }).click();
  await expect(page).toHaveURL(/\/deposit\?journey=class-a-val-002/);
  await expect(page.getByTestId('deposit-synthetic-condition')).toContainText(
    'no real funds',
  );
  await expect(page.getByTestId('deposit-fx-block')).toContainText(
    'Synthetic preview rate: 1 USD = 20.00 ZMW',
  );

  const depositAmount = page.getByTestId('deposit-amount');
  const depositConfirm = page.getByRole('button', { name: 'Confirm' });
  await depositAmount.fill('-100');
  await expect(depositAmount).toHaveValue('-100');
  await expect(depositAmount).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a deposit amount greater than 0 ZMW.')).toBeVisible();
  await expect(depositConfirm).toBeDisabled();

  await depositAmount.fill('100');
  await expect(page.getByTestId('deposit-conversion-preview')).toContainText('$5.00');
  await depositConfirm.click();
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText(
    'No external account was charged and no money moved',
    { timeout: 10_000 },
  );
  expect(depositContractRequests).toBe(0);

  await page.getByRole('link', { name: 'Continue to synthetic withdrawal' }).click();
  await expect(page).toHaveURL(/\/withdraw\?journey=class-a-val-002/);
  await expect(page.getByTestId('withdraw-synthetic-condition')).toContainText(
    'cannot contact a bank, provider, rail, or settlement service',
  );
  await expect(page.getByText('Current balance:')).toContainText('$5.00');

  const withdrawAmount = page.getByTestId('withdraw-amount');
  const withdrawConfirm = page.getByRole('button', { name: 'Confirm' });
  await expect(withdrawAmount).toHaveValue('');
  await expect(withdrawConfirm).toBeDisabled();

  await withdrawAmount.fill('-2');
  await expect(withdrawAmount).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a withdrawal amount greater than $0.')).toBeVisible();
  await expect(withdrawConfirm).toBeDisabled();

  await withdrawAmount.fill('');
  await expect(withdrawAmount).toHaveValue('');
  await withdrawAmount.press('1');
  await withdrawAmount.press('5');
  await expect(withdrawAmount).toHaveValue('15');
  await expect(page.getByText('Amount exceeds available balance.')).toBeVisible();
  await expect(withdrawConfirm).toBeDisabled();

  await withdrawAmount.fill('2');
  await expect(withdrawConfirm).toBeEnabled();
  await withdrawConfirm.click();
  await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute(
    'data-status',
    'SUCCESS',
    { timeout: 10_000 },
  );
  await expect(page.getByTestId('withdraw-status-description')).toContainText(
    'No bank transfer, payout, or settlement occurred',
  );

  await page.getByRole('link', { name: 'Continue to synthetic activity' }).click();
  await expect(page).toHaveURL(/\/activity\?journey=class-a-val-002/);
  await expect(page.getByTestId('activity-synthetic-condition')).toContainText(
    'not proof of a deposit, payout, provider action, or external settlement',
  );
  await expect(page.getByTestId('activity-type-deposit')).toHaveText('Synthetic deposit');
  await expect(page.getByTestId('activity-type-withdraw')).toHaveText(
    'Synthetic withdrawal',
  );
  await expect(page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')).toHaveCount(2);

  await page.getByRole('link', { name: 'Return to dashboard summary' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByText('Synthetic deposit').first()).toBeVisible();
  await expect(page.getByText('Synthetic withdrawal').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'View all' })).toHaveAttribute(
    'href',
    '/activity?journey=class-a-val-002',
  );

  const restartJourney = page.getByRole('button', { name: 'Restart synthetic journey' });
  await expect(restartJourney).toBeVisible();
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain(
      'clears only the simulated balance and Activity stored on this device',
    );
    await dialog.accept();
  });
  await restartJourney.click();

  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(page.getByRole('link', { name: 'Start synthetic deposit' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View all' })).toHaveCount(0);

  await page.getByRole('link', { name: 'Start synthetic deposit' }).click();
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible({
    timeout: 10_000,
  });
  await page.getByRole('link', { name: 'Continue to synthetic withdrawal' }).click();
  await page.getByTestId('withdraw-amount').fill('2');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute(
    'data-status',
    'SUCCESS',
    { timeout: 10_000 },
  );
  await page.getByRole('link', { name: 'Continue to synthetic activity' }).click();

  await expect(page.getByTestId('activity-type-deposit')).toHaveCount(1);
  await expect(page.getByTestId('activity-type-withdraw')).toHaveCount(1);
  await expect(page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')).toHaveCount(2);
  await page.getByRole('link', { name: 'Return to dashboard summary' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByRole('button', { name: 'Restart synthetic journey' })).toBeVisible();
});

test('unavailable data remains a blocked secondary trust scenario', async ({ page }) => {
  await clearStorage(page);
  await login(page);
  await page.goto('/deposit?journey=class-a-val-002&scenario=unavailable-data');

  await expect(page.getByTestId('deposit-market-data-continuity')).toContainText(
    'Exchange rate data is temporarily unavailable',
  );
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeDisabled();
  await expect(
    page.getByRole('link', { name: 'Return to the primary synthetic journey' }),
  ).toBeVisible();
});

test('mobile keeps the persistent boundary and four-step research path visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await clearStorage(page);
  await login(page);

  await expect(page.getByTestId('trust-disclosure-banner')).toBeVisible();
  await expect(page.getByTestId('synthetic-journey-shell')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Start synthetic deposit' })).toBeVisible();

  await page.getByTestId('nav-toggle').click();
  const mobileNav = page.getByTestId('nav-links-mobile');
  await expect(mobileNav).toBeVisible();
  for (const [label, href] of [
    ['Dashboard', '/dashboard?journey=class-a-val-002'],
    ['Deposit', '/deposit?journey=class-a-val-002'],
    ['Withdraw', '/withdraw?journey=class-a-val-002'],
    ['Activity', '/activity?journey=class-a-val-002'],
  ]) {
    const navLink = mobileNav.getByRole('link', { name: label, exact: true });
    await expect(navLink).toBeVisible();
    await expect(navLink).toHaveAttribute('href', href);
  }
});
