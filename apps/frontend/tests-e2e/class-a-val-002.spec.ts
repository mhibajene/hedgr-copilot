import { expect, test, type Page } from '@playwright/test';

const browserErrors = new WeakMap<Page, string[]>();

async function clearStorage(page: Page) {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
}

async function seedCompletedJourneyStorage(page: Page) {
  await page.goto('/');
  await page.evaluate(() => {
    window.localStorage.clear();
    window.localStorage.setItem(
      'hedgr:ledger',
      JSON.stringify({
        version: 2,
        transactions: [
          {
            txn_ref: 'stale-deposit',
            type: 'deposit',
            status: 'settled',
            amount_zmw: 100,
            amount_usd: 5,
            fx_rate: 20,
            created_at: 1,
            updated_at: 2,
          },
          {
            txn_ref: 'stale-withdrawal',
            type: 'withdrawal',
            status: 'settled',
            amount_zmw: 0,
            amount_usd: 2,
            fx_rate: 0,
            created_at: 3,
            updated_at: 4,
          },
        ],
      })
    );
    window.localStorage.setItem(
      'hedgr:wallet',
      JSON.stringify({ state: { usdBalance: 3 }, version: 0 })
    );
  });
}

async function login(page: Page) {
  await page.goto('/login');
  await page
    .getByPlaceholder('you@example.com')
    .fill('class-a-val-002@hedgr.test');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await page.goto('/orientation');
  await expect(page).toHaveURL(/\/orientation$/);
  await page.getByTestId('orientation-continue').click();
  await expect(page).toHaveURL(/\/dashboard-synthetic-journey$/);
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
    const isLocal = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);

    if (!isLocal) return route.abort();
    if (url.pathname === '/v1/fx/latest') return route.abort();
    return route.continue();
  });
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page) ?? []).toEqual([]);
});

test('synthetic Settings withholds About Hedgr before unaided evidence', async ({
  page,
}) => {
  await clearStorage(page);
  await login(page);
  await page.goto('/settings?journey=class-a-val-002');

  await expect(
    page.getByRole('link', { name: 'About Hedgr', exact: true })
  ).toHaveCount(0);
  await expect(page.getByText('Why Hedgr exists', { exact: true })).toHaveCount(
    0
  );
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

  await seedCompletedJourneyStorage(page);
  await login(page);

  const persistedStart = await page.evaluate(() => ({
    ledger: JSON.parse(window.localStorage.getItem('hedgr:ledger') ?? '{}'),
    wallet: JSON.parse(window.localStorage.getItem('hedgr:wallet') ?? '{}'),
  }));
  expect(persistedStart.ledger.transactions).toEqual([]);
  expect(persistedStart.wallet.state.usdBalance).toBe(0);
  await expect(page.getByTestId('trust-disclosure-banner')).toContainText(
    'Simulation · no real money'
  );
  await expect(
    page.getByRole('region', { name: 'Simulation disclosure' })
  ).toBeVisible();
  const simulationDetails = page.getByTestId('simulation-technical-details');
  await expect(simulationDetails).not.toHaveAttribute('open', '');
  await simulationDetails.getByText('How this simulation works').click();
  await expect(simulationDetails).toContainText(
    'Rates are fixed for this simulation, and no live financial service is connected.'
  );
  await expect(simulationDetails).toContainText(
    'The selected country changes simulated currency display only.'
  );
  await expect(simulationDetails).not.toContainText(/Auth:|DeFi:|FX:/);
  const currencyDisplay = page.getByLabel('Simulation currency display');
  if ((await currencyDisplay.count()) === 1) {
    await expect(currencyDisplay).toContainText(
      'Currency display: Zambia (ZMW)'
    );
  } else {
    await expect(currencyDisplay).toHaveCount(0);
  }
  await expect(
    page.getByRole('button', { name: 'Dismiss trust disclosure' })
  ).toHaveCount(0);
  const journeyShell = page.getByTestId('synthetic-journey-shell');
  await expect(journeyShell).not.toContainText('Simulation · no real money');
  await expect(journeyShell).not.toContainText('CLASS-A-VAL-002');
  await expect(journeyShell).toContainText('your position');
  await expect(journeyShell).toContainText('See where you stand');
  await expect(journeyShell).toContainText('current position and its evidence');
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText(
    '1Position'
  );
  const primaryNav = page.getByTestId('nav-links');
  await expect(
    primaryNav.getByRole('link', { name: 'Home', exact: true })
  ).toHaveAttribute('href', '/dashboard-synthetic-journey');
  await expect(
    primaryNav.getByRole('link', { name: 'Settings', exact: true })
  ).toHaveAttribute('href', '/settings?journey=class-a-val-002');
  await expect(
    primaryNav.getByRole('link', { name: 'Activity', exact: true })
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole('link', { name: 'Copilot', exact: true })
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole('link', { name: 'Deposit', exact: true })
  ).toHaveCount(0);
  await expect(
    primaryNav.getByRole('link', { name: 'Withdraw', exact: true })
  ).toHaveCount(0);
  await primaryNav.getByRole('link', { name: 'Settings', exact: true }).click();
  await expect(page).toHaveURL(/\/settings\?journey=class-a-val-002/);
  await expect(page.getByTestId('settings-account')).toContainText(
    'Verification status'
  );
  await expect(page.getByTestId('settings-preferences')).toContainText(
    'No preferences available yet'
  );
  await expect(page.getByTestId('settings-trust-information')).toContainText(
    'No real customer money is held or moved'
  );
  await expect(page.getByText('Environment Configuration')).toHaveCount(0);
  await expect(page.getByText(/Auth: mock|DeFi: mock|FX: fixed/)).toHaveCount(
    0
  );
  await expect(page.getByText(/unlock all features/i)).toHaveCount(0);
  await expect(page.getByTestId('synthetic-journey-shell')).toHaveCount(0);
  const settingsNav = page.getByTestId('nav-links');
  await expect(
    settingsNav.getByRole('link', { name: 'Home', exact: true })
  ).toHaveAttribute('href', '/dashboard-synthetic-journey');
  await settingsNav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL(/\/dashboard-synthetic-journey/);
  await expect(page.getByTestId('synthetic-journey-shell')).toBeVisible();
  const initialJourneyCopy = (await journeyShell.textContent()) ?? '';
  expect(initialJourneyCopy).not.toMatch(
    /Financial Stability Companion|Activity explains|fixture|informational posture|settlement/i
  );
  const dashboardOrientation = page.getByTestId('dashboard-orientation');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'See what you have and what changed.',
    })
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(dashboardOrientation).toContainText('Financial position');
  await expect(dashboardOrientation).toContainText(
    'Hedgr helps you understand and maintain your financial stability.'
  );
  await expect(dashboardOrientation).toContainText('not an instruction');
  await expect(dashboardOrientation).toContainText(
    'This walkthrough provides context, not an instruction.'
  );
  await expect(dashboardOrientation).not.toContainText(
    /crypto|blockchain|stablecoin|DeFi|trading|yield routing/i
  );
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(
    page.getByText('Your current position', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByTestId('dashboard-synthetic-balance-explainer')
  ).toHaveText('Illustrative position only.');
  await expect(page.getByTestId('dashboard-simulation-utilities')).toBeVisible();
  await expect(page.getByTestId('dashboard-add-simulated-deposit')).toHaveAttribute(
    'href',
    '/deposit?journey=class-a-val-002'
  );
  await expect(page.getByTestId('dashboard-view-activity')).toHaveAttribute(
    'href',
    '/activity?journey=class-a-val-002'
  );
  await expect(page.getByTestId('dashboard-change-evidence')).toHaveCount(0);
  await expect(page.getByText('How your position changed')).toHaveCount(0);
  await expect(page.getByText('Does anything need attention?')).toBeVisible();
  await expect(
    page.getByTestId('engine-simulation-attention-answer')
  ).toHaveText('There is not enough information to compare yet.');
  await expect(page.getByTestId('dashboard-current-status')).not.toContainText(
    'NORMAL'
  );
  await expect(page.getByTestId('engine-posture-context')).toHaveText(
    'Nothing to compare yet. A first completed simulated event will create a starting point.'
  );
  await expect(page.getByTestId('dashboard-current-status')).toContainText(
    'What Hedgr notices'
  );
  await expect(
    page.getByTestId('dashboard-current-status').locator('img')
  ).toHaveCount(0);
  await expect(page.getByTestId('dashboard-current-status')).not.toContainText(
    /score|gauge|safe|all clear/i
  );
  const stabilityGuidance = page.getByTestId('engine-allocation-bands');
  await expect(stabilityGuidance).toHaveAttribute(
    'data-presentation',
    'collapsed'
  );
  await expect(stabilityGuidance).toContainText('What you are building toward');
  await expect(stabilityGuidance).toContainText('not money set aside');
  await expect(page.getByTestId('engine-allocation-bands')).toBeVisible();
  await expect(page.getByTestId('dashboard-optional-actions')).toHaveCount(0);
  const valuesDetails = page.getByTestId('engine-allocation-values-details');
  const targetRoles = page.getByTestId('engine-allocation-target-roles');
  await expect(targetRoles).toBeVisible();
  await expect(targetRoles).toContainText('Now');
  await expect(targetRoles).toContainText('Reserve');
  await expect(targetRoles).toContainText('Growth');
  await expect(targetRoles).not.toContainText(/\d+%/);
  await expect(valuesDetails.locator(':scope > summary')).toHaveAccessibleName(
    'View planning percentages'
  );
  await expect(valuesDetails).not.toHaveAttribute('open', '');
  await expect(
    page.getByTestId('engine-allocation-band-coreTargetPct')
  ).not.toBeVisible();
  await valuesDetails.getByText('View planning percentages').click();
  await expect(
    page.getByTestId('engine-allocation-band-coreTargetPct')
  ).toBeVisible();
  await expect(
    page.getByTestId('engine-allocation-band-coreTargetPct')
  ).toContainText('Now');
  await expect(
    page.getByTestId('engine-allocation-band-coreTargetPct')
  ).toContainText(/Now\s*50%/);
  const targetStructure = page.getByTestId('engine-allocation-structure');
  await expect(targetStructure.locator('[role="progressbar"]')).toHaveCount(0);
  await expect(targetStructure).not.toContainText(
    /[$£€]|funded|account|holding|allocated/i
  );
  await expect(page.getByTestId('engine-allocation-boundary')).toContainText(
    'not separate balances'
  );
  await expect(page.getByTestId('engine-allocation-boundary')).toContainText(
    'do not divide or move simulated money'
  );
  await expect(page.getByTestId('dashboard-optional-actions')).toHaveCount(0);
  await expect(
    page.getByTestId('engine-stability-review-snapshot')
  ).toHaveCount(0);
  await expect(page.getByText('Simulation date')).toHaveCount(0);
  await expect(page.getByText('Last viewed locally')).toHaveCount(0);
  await expect(page.getByTestId('dashboard-education')).toHaveCount(0);
  const dashboardMainCopy = (await page.getByRole('main').textContent()) ?? '';
  expect(dashboardMainCopy).not.toContain('—');

  const disclosureDetails = page.getByTestId('dashboard-disclosures');
  await disclosureDetails.locator(':scope > summary').click();
  const policyDisclosures = page.getByTestId('policy-disclosures');
  await expect(policyDisclosures).toContainText(
    'This research walkthrough creates no real financial exposure.'
  );
  await expect(policyDisclosures).toContainText(
    'This research prototype is not a bank account and does not accept deposits.'
  );
  await expect(policyDisclosures).not.toContainText(
    /digital assets|afford to lose|insured by|government agency/i
  );

  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await expect(page).toHaveURL(/\/deposit\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText(
    '2First event'
  );
  await expect(page.getByTestId('synthetic-journey-shell')).toContainText(
    'Create the first comparison point'
  );
  await expect(page.getByTestId('deposit-synthetic-condition')).toContainText(
    'see how the simulated position changes'
  );
  await expect(page.getByTestId('deposit-fx-block')).toContainText(
    'Simulated example rate: 1 USD = 20.00 ZMW'
  );

  const depositAmount = page.getByTestId('deposit-amount');
  const depositConfirm = page.getByRole('button', { name: 'Confirm' });
  await depositAmount.fill('-100');
  await expect(depositAmount).toHaveValue('-100');
  await expect(depositAmount).toHaveAttribute('aria-invalid', 'true');
  await expect(
    page.getByText('Enter a deposit amount greater than 0 ZMW.')
  ).toBeVisible();
  await expect(depositConfirm).toBeDisabled();

  await depositAmount.fill('100');
  await expect(page.getByTestId('deposit-conversion-preview')).toContainText(
    '$5.00'
  );
  await expect(page.getByTestId('deposit-balance-change')).toContainText(
    'shows 100 ZMW as +$5.00'
  );
  await depositConfirm.click();
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText(
    'The simulated balance increased by $5.00',
    { timeout: 10_000 }
  );
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText(
    'No account was charged and no real money moved'
  );
  expect(depositContractRequests).toBe(0);

  await page
    .getByRole('link', { name: 'Continue to simulated withdrawal' })
    .click();
  await expect(page).toHaveURL(/\/withdraw\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText(
    '3Change'
  );
  await expect(page.getByTestId('synthetic-journey-shell')).toContainText(
    'See what changes and what remains'
  );
  await expect(page.getByTestId('withdraw-synthetic-condition')).toContainText(
    'check the position after a simulated withdrawal'
  );
  await expect(
    page.getByText('Simulated balance before this step:')
  ).toContainText('$5.00');

  const withdrawAmount = page.getByTestId('withdraw-amount');
  const withdrawConfirm = page.getByRole('button', { name: 'Confirm' });
  await expect(withdrawAmount).toHaveValue('');
  await expect(withdrawConfirm).toBeDisabled();

  await withdrawAmount.fill('-2');
  await expect(withdrawAmount).toHaveAttribute('aria-invalid', 'true');
  await expect(
    page.getByText('Enter a withdrawal amount greater than $0.')
  ).toBeVisible();
  await expect(withdrawConfirm).toBeDisabled();

  await withdrawAmount.fill('');
  await expect(withdrawAmount).toHaveValue('');
  await withdrawAmount.press('1');
  await withdrawAmount.press('5');
  await expect(withdrawAmount).toHaveValue('15');
  await expect(
    page.getByText('Amount exceeds available balance.')
  ).toBeVisible();
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
    { timeout: 10_000 }
  );
  await expect(page.getByTestId('withdraw-status-description')).toContainText(
    'No bank transfer or real payout occurred'
  );
  await expect(
    page.getByTestId('withdraw-status-exception-clarification')
  ).toHaveCount(0);
  await expect(
    page.getByTestId('withdraw-status-next-step-guidance')
  ).toHaveCount(0);
  await expect(
    page.getByTestId('withdraw-balance-reconciliation')
  ).toContainText('$3.00 remains');

  await page.getByRole('link', { name: 'Review simulated activity' }).click();
  await expect(page).toHaveURL(/\/activity\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText(
    '4Evidence'
  );
  await expect(page.getByTestId('synthetic-journey-shell')).toContainText(
    'Review the record of each change'
  );
  await expect(page.getByTestId('activity-synthetic-condition')).toHaveCount(0);
  const activityReconciliation = page.getByTestId(
    'activity-balance-reconciliation'
  );
  await expect(activityReconciliation).toContainText(
    'Current simulated position'
  );
  await expect(activityReconciliation).toContainText(
    'From completed entries:'
  );
  await expect(page.getByTestId('activity-reconciliation-deposits')).toHaveText(
    '+$5.00'
  );
  await expect(
    page.getByTestId('activity-reconciliation-withdrawals')
  ).toHaveText('$2.00');
  await expect(page.getByTestId('activity-reconciliation-remaining')).toHaveText(
    '$3.00'
  );
  await expect(page.getByTestId('activity-type-deposit')).toHaveText(
    'Simulated deposit'
  );
  await expect(page.getByTestId('activity-type-withdraw')).toHaveText(
    'Simulated withdrawal'
  );
  await expect(page.getByTestId('activity-delta-deposit')).toHaveText('+$5.00');
  await expect(page.getByTestId('activity-result-deposit')).toHaveText(
    '→ $5.00 resulting'
  );
  await expect(page.getByTestId('activity-row-deposit')).not.toContainText(
    'ZMW'
  );
  await expect(page.getByTestId('activity-delta-withdraw')).toHaveText(
    '-$2.00'
  );
  await expect(page.getByTestId('activity-result-withdraw')).toHaveText(
    '→ $3.00 resulting'
  );
  await expect(
    page.getByTestId('activity-row-withdraw').getByText('0', { exact: true })
  ).toHaveCount(0);
  await expect(
    page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')
  ).toHaveCount(0);

  const withdrawalRow = page.getByTestId('activity-row-withdraw');
  await withdrawalRow.click();
  await expect(page.getByTestId('tx-detail-type')).toHaveText(
    'Simulated withdrawal'
  );
  await expect(page.getByTestId('tx-detail-close')).toBeFocused();
  await expect(page.getByTestId('tx-detail-amount')).toContainText('−$2.00');
  await expect(page.getByText('Time')).toBeVisible();
  await expect(page.getByText('Context')).toBeVisible();
  await expect(page.getByTestId('tx-detail-resulting-position')).toHaveText(
    '$3.00'
  );
  await expect(page.getByTestId('tx-detail-id')).toHaveCount(0);
  await expect(page.getByTestId('tx-detail-timeline')).toHaveCount(0);
  await expect(page.getByTestId('tx-detail-simulation-note')).toContainText(
    'No real money moved'
  );
  await expect(
    page.getByTestId('tx-detail-modal').getByText('0', { exact: true })
  ).toHaveCount(0);
  await page.keyboard.press('Shift+Tab');
  await expect(
    page.getByRole('button', { name: 'Close', exact: true })
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByTestId('tx-detail-close')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('tx-detail-modal')).toHaveCount(0);
  await expect(withdrawalRow).toBeFocused();

  await page.getByRole('link', { name: 'Return to current position' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByTestId('dashboard-simulation-utilities')).toBeVisible();
  await expect(page.getByTestId('dashboard-add-simulated-deposit')).toHaveAttribute(
    'href',
    '/deposit?journey=class-a-val-002'
  );
  await expect(page.getByTestId('dashboard-view-activity')).toHaveAttribute(
    'href',
    '/activity?journey=class-a-val-002'
  );
  await expect(page.getByTestId('dashboard-change-evidence')).toHaveCount(0);
  await expect(page.getByText('How your position changed')).toHaveCount(0);
  await expect(page.getByTestId('engine-posture-context')).toHaveText(
    'The simulated expense explains why the current position is $2.00 lower.'
  );
  await expect(page.getByTestId('dashboard-optional-actions')).toHaveCount(0);

  const restartJourney = page.getByRole('button', {
    name: 'Restart simulated journey',
  });
  await expect(restartJourney).toBeVisible();
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain(
      'clears only the simulated balance and Activity stored on this device'
    );
    await dialog.accept();
  });
  await restartJourney.click();

  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(
    page.getByTestId('dashboard-add-simulated-deposit')
  ).toBeVisible();
  await expect(page.getByTestId('dashboard-optional-actions')).toHaveCount(0);

  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible({
    timeout: 10_000,
  });
  await page
    .getByRole('link', { name: 'Continue to simulated withdrawal' })
    .click();
  await page.getByTestId('withdraw-amount').fill('2');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('withdraw-status-region')).toHaveAttribute(
    'data-status',
    'SUCCESS',
    { timeout: 10_000 }
  );
  await page.getByRole('link', { name: 'Review simulated activity' }).click();

  await expect(page.getByTestId('activity-type-deposit')).toHaveCount(1);
  await expect(page.getByTestId('activity-type-withdraw')).toHaveCount(1);
  await expect(
    page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')
  ).toHaveCount(0);
  await page.getByRole('link', { name: 'Return to current position' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(
    page.getByRole('button', { name: 'Restart simulated journey' })
  ).toBeVisible();
});

test('unavailable data remains a blocked secondary trust scenario', async ({
  page,
}) => {
  await clearStorage(page);
  await login(page);
  await page.goto('/deposit?journey=class-a-val-002&scenario=unavailable-data');

  await expect(
    page.getByTestId('deposit-market-data-continuity')
  ).toContainText('Exchange rate data is temporarily unavailable');
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeDisabled();
  await expect(
    page.getByRole('link', { name: 'Return to the simulated deposit' })
  ).toBeVisible();
});

test('mobile keeps the persistent boundary and current research step visible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await clearStorage(page);
  await login(page);

  await expect(page.getByTestId('trust-disclosure-banner')).toBeVisible();
  await expect(page.getByTestId('synthetic-journey-shell')).toBeVisible();
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText(
    '1Position'
  );
  await expect(
    page.getByTestId('dashboard-add-simulated-deposit')
  ).toBeVisible();

  const visiblePageMetrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(visiblePageMetrics.documentWidth).toBeLessThanOrEqual(
    visiblePageMetrics.viewportWidth
  );
  const currentOverviewBox = await page
    .getByTestId('dashboard-current-overview')
    .boundingBox();
  const planningBox = await page
    .getByTestId('engine-allocation-bands')
    .boundingBox();
  expect(currentOverviewBox?.y).toBeLessThan(844);
  expect(planningBox?.y).toBeLessThan(844 * 2);

  const navToggle = page.getByTestId('nav-toggle');
  const navToggleBox = await navToggle.boundingBox();
  expect(navToggleBox?.width).toBeGreaterThanOrEqual(44);
  expect(navToggleBox?.height).toBeGreaterThanOrEqual(44);
  await navToggle.click();
  const mobileNav = page.getByTestId('nav-links-mobile');
  await expect(mobileNav).toBeVisible();
  for (const [label, href] of [
    ['Home', '/dashboard-synthetic-journey'],
    ['Settings', '/settings?journey=class-a-val-002'],
  ]) {
    const navLink = mobileNav.getByRole('link', { name: label, exact: true });
    await expect(navLink).toBeVisible();
    await expect(navLink).toHaveAttribute('href', href);
  }
  await expect(
    mobileNav.getByRole('link', { name: 'Deposit', exact: true })
  ).toHaveCount(0);
  await expect(
    mobileNav.getByRole('link', { name: 'Withdraw', exact: true })
  ).toHaveCount(0);
  await expect(
    mobileNav.getByRole('link', { name: 'Activity', exact: true })
  ).toHaveCount(0);
  await expect(
    mobileNav.getByRole('link', { name: 'Copilot', exact: true })
  ).toHaveCount(0);
});
