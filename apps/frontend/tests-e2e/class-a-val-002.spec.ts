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

test('CLASS-A-VAL-002 traverses Dashboard → Deposit → Withdraw → Activity with consistent simulated records', async ({
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
    'Simulation Mode. No Real Money',
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
  await expect(journeyShell).toContainText('Simulated money journey');
  await expect(journeyShell).toContainText('Complete the current step');
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText('1Dashboard');
  const initialJourneyCopy = (await journeyShell.textContent()) ?? '';
  expect(initialJourneyCopy).not.toMatch(/Activity explains|fixture|informational posture|settlement/i);
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(page.getByText('Simulated balance', { exact: true })).toBeVisible();
  await expect(page.getByTestId('dashboard-synthetic-balance-explainer')).toContainText(
    'not a real account balance',
  );
  await expect(page.getByTestId('engine-allocation-band-coreTargetPct')).toContainText(
    'Stability target · 50%',
  );
  await expect(page.getByTestId('engine-stability-review-snapshot')).toContainText(
    'Simulation date',
  );
  await expect(page.getByTestId('engine-stability-review-snapshot')).toContainText(
    'Last viewed locally',
  );

  await page.getByRole('link', { name: 'Start simulated deposit' }).click();
  await expect(page).toHaveURL(/\/deposit\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText('2Deposit');
  await expect(page.getByTestId('deposit-synthetic-condition')).toContainText(
    'records only a simulated deposit',
  );
  await expect(page.getByTestId('deposit-fx-block')).toContainText(
    'Simulated example rate: 1 USD = 20.00 ZMW',
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
  await expect(page.getByTestId('deposit-balance-change')).toContainText(
    'shows 100 ZMW as +$5.00',
  );
  await depositConfirm.click();
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText(
    'The simulated balance increased by $5.00',
    { timeout: 10_000 },
  );
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText(
    'No account was charged and no real money moved',
  );
  expect(depositContractRequests).toBe(0);

  await page.getByRole('link', { name: 'Continue to simulated withdrawal' }).click();
  await expect(page).toHaveURL(/\/withdraw\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText('3Withdraw');
  await expect(page.getByTestId('withdraw-synthetic-condition')).toContainText(
    'No bank or payment provider is contacted',
  );
  await expect(page.getByText('Simulated balance before this step:')).toContainText('$5.00');

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
  const withdrawBalancePreview = page.getByTestId('withdraw-balance-preview');
  await expect(withdrawBalancePreview).toContainText('$5.00');
  await expect(withdrawBalancePreview).toContainText('$2.00');
  await expect(withdrawBalancePreview).toContainText('$3.00');
  await withdrawConfirm.click();
  await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute(
    'data-status',
    'SUCCESS',
    { timeout: 10_000 },
  );
  await expect(page.getByTestId('withdraw-status-description')).toContainText(
    'No bank transfer or real payout occurred',
  );
  await expect(page.getByTestId('withdraw-status-exception-clarification')).toHaveCount(0);
  await expect(page.getByTestId('withdraw-status-next-step-guidance')).toHaveCount(0);
  await expect(page.getByTestId('withdraw-balance-reconciliation')).toContainText(
    '$3.00 remains',
  );

  await page.getByRole('link', { name: 'Review simulated activity' }).click();
  await expect(page).toHaveURL(/\/activity\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText('4Activity');
  await expect(page.getByTestId('activity-synthetic-condition')).toContainText(
    'It does not mean a bank transfer or real payout occurred',
  );
  const activityReconciliation = page.getByTestId('activity-balance-reconciliation');
  await expect(activityReconciliation).toContainText('Simulated deposits+$5.00');
  await expect(activityReconciliation).toContainText('Simulated withdrawals−$2.00');
  await expect(activityReconciliation).toContainText('Remaining simulated balance$3.00');
  await expect(page.getByTestId('activity-type-deposit')).toHaveText('Simulated deposit');
  await expect(page.getByTestId('activity-type-withdraw')).toHaveText(
    'Simulated withdrawal',
  );
  await expect(
    page.getByTestId('activity-row-withdraw').getByText('0', { exact: true }),
  ).toHaveCount(0);
  await expect(page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')).toHaveCount(2);

  await page.getByTestId('activity-row-withdraw').click();
  await expect(page.getByTestId('tx-detail-type')).toHaveText('Simulated withdrawal');
  await expect(page.getByText('Simulation record ID')).toBeVisible();
  await expect(page.getByText('Simulated step status')).toBeVisible();
  await expect(page.getByTestId('tx-detail-simulation-note')).toContainText(
    'not a bank or payment provider record',
  );
  await expect(
    page.getByTestId('tx-detail-modal').getByText('0', { exact: true }),
  ).toHaveCount(0);
  await page.getByTestId('tx-detail-close').click();

  await page.getByRole('link', { name: 'Return to simulated balance' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByText('Simulated deposit').first()).toBeVisible();
  await expect(page.getByText('Simulated withdrawal').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'View all' })).toHaveAttribute(
    'href',
    '/activity?journey=class-a-val-002',
  );

  const restartJourney = page.getByRole('button', { name: 'Restart simulated journey' });
  await expect(restartJourney).toBeVisible();
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain(
      'clears only the simulated balance and Activity stored on this device',
    );
    await dialog.accept();
  });
  await restartJourney.click();

  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(page.getByRole('link', { name: 'Start simulated deposit' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View all' })).toHaveCount(0);

  await page.getByRole('link', { name: 'Start simulated deposit' }).click();
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible({
    timeout: 10_000,
  });
  await page.getByRole('link', { name: 'Continue to simulated withdrawal' }).click();
  await page.getByTestId('withdraw-amount').fill('2');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute(
    'data-status',
    'SUCCESS',
    { timeout: 10_000 },
  );
  await page.getByRole('link', { name: 'Review simulated activity' }).click();

  await expect(page.getByTestId('activity-type-deposit')).toHaveCount(1);
  await expect(page.getByTestId('activity-type-withdraw')).toHaveCount(1);
  await expect(page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')).toHaveCount(2);
  await page.getByRole('link', { name: 'Return to simulated balance' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByRole('button', { name: 'Restart simulated journey' })).toBeVisible();
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
    page.getByRole('link', { name: 'Return to the simulated deposit' }),
  ).toBeVisible();
});

test('mobile keeps the persistent boundary and current research step visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await clearStorage(page);
  await login(page);

  await expect(page.getByTestId('trust-disclosure-banner')).toBeVisible();
  await expect(page.getByTestId('synthetic-journey-shell')).toBeVisible();
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText('1Dashboard');
  await expect(page.getByRole('link', { name: 'Start simulated deposit' })).toBeVisible();

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
