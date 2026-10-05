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

test('pending simulated Deposit completes once after in-app navigation and remount', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-18T00:00:00Z') });
  await clearStorage(page);
  await login(page);
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await expect(page.getByTestId('deposit-amount')).toBeVisible();
  await page.clock.pauseAt(new Date('2026-09-18T01:00:00Z'));
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Processing…' })).toBeVisible();
  await page.getByTestId('nav-links').getByRole('link', { name: 'Activity', exact: true }).click();
  await expect(page).toHaveURL(/\/activity\?journey=class-a-val-002/);
  expect(await page.evaluate(() => JSON.parse(window.localStorage.getItem('hedgr:ledger') ?? '{}').transactions[0].status)).toBe('pending');
  await page.clock.fastForward(2000);
  await expect(page.getByTestId('activity-row-deposit')).toContainText('Completed');
  await page.clock.resume();
  await page.getByRole('link', { name: 'Back to your position' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$5.00');
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await expect(page.getByTestId('deposit-amount')).toBeVisible();
  await page.clock.fastForward(2000);
  const records = await page.evaluate(() => JSON.parse(window.localStorage.getItem('hedgr:ledger') ?? '{}').transactions);
  expect(records).toHaveLength(1);
  expect(records[0]).toMatchObject({ type: 'deposit', amount_usd: 5, status: 'settled' });
});

test('restart during a pending simulated Deposit prevents the old timer restoring funds', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-18T00:00:00Z') });
  await clearStorage(page);
  await login(page);
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await expect(page.getByTestId('deposit-amount')).toBeVisible();
  await page.clock.pauseAt(new Date('2026-09-18T01:00:00Z'));
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Processing…' })).toBeVisible();
  await page.getByTestId('nav-links').getByRole('link', { name: 'Home', exact: true }).click();
  expect(await page.evaluate(() => JSON.parse(window.localStorage.getItem('hedgr:ledger') ?? '{}').transactions[0].status)).toBe('pending');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('clears only the simulated balance and Activity stored on this device');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Restart simulated journey' }).click();
  await page.clock.fastForward(2000);
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  const records = await page.evaluate(() => JSON.parse(window.localStorage.getItem('hedgr:ledger') ?? '{}').transactions);
  expect(records).toEqual([]);
});

test('simulated withdrawal rejects fractional cents, refreshes the next draft and retains a full withdrawal result', async ({ page }) => {
  await clearStorage(page);
  await login(page);
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await page.getByRole('button', { name: 'Confirm', exact: true }).click();
  await expect(page.getByTestId('deposit-confirmation-region')).toBeVisible();
  await page.getByRole('link', { name: 'Continue to simulated withdrawal' }).click();
  const amount = page.getByTestId('withdraw-amount');
  const confirm = page.getByRole('button', { name: 'Confirm', exact: true });
  for (const invalid of ['0.001', '1.001']) {
    await amount.fill(invalid);
    await expect(amount).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#withdraw-amount-error')).toHaveText('Enter at least $0.01 using no more than two decimal places.');
    await expect(confirm).toBeDisabled();
    await expect(page.getByTestId('withdraw-balance-preview')).toHaveCount(0);
  }
  expect(await page.evaluate(() => JSON.parse(window.localStorage.getItem('hedgr:ledger') ?? '{}').transactions.length)).toBe(1);
  await amount.fill('1');
  await confirm.click();
  await expect(page.getByTestId('withdraw-status-title')).toHaveText(/^You took \$\d+\.\d{2} out of your simulated balance$/);
  await expect(confirm).toBeDisabled();
  await amount.fill('2');
  await expect(page.getByTestId('withdraw-status-region')).toHaveCount(0);
  await expect(page.getByTestId('withdraw-balance-preview')).toContainText('$4.00 − $2.00 = $2.00');
  await confirm.click();
  await expect(page.getByTestId('withdraw-status-title')).toHaveText(/^You took \$\d+\.\d{2} out of your simulated balance$/);
  // Editing the completed value creates a fresh draft even when the intended amount is identical.
  await amount.fill('');
  await amount.fill('2');
  await confirm.click();
  await expect(page.getByTestId('withdraw-status-title')).toHaveText('Simulated withdrawal in progress');
  await expect(page.getByTestId('withdraw-no-funds')).toHaveCount(0);
  await expect(page.locator('#withdraw-amount-error')).toHaveCount(0);
  await expect(page.getByTestId('withdraw-status-title')).toHaveText(/^You took \$\d+\.\d{2} out of your simulated balance$/);
  await expect(page.getByTestId('withdraw-balance-reconciliation')).toContainText('→ $0.00');
  await page.getByRole('link', { name: 'Review Activity' }).click();
  await expect(page.getByTestId('activity-row-withdraw')).toHaveCount(3);
  await page.getByRole('link', { name: 'Back to your position' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
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
    'The display currency preference changes illustrative simulation estimates only.'
  );
  await expect(simulationDetails).not.toContainText(/Auth:|DeFi:|FX:/);
  const currencyDisplay = page.getByLabel('Simulation currency display');
  await expect(currencyDisplay).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Dismiss trust disclosure' })
  ).toHaveCount(0);
  const journeyShell = page.getByTestId('synthetic-journey-shell');
  await expect(journeyShell).not.toContainText('Simulation · no real money');
  await expect(journeyShell).not.toContainText('CLASS-A-VAL-002');
  await expect(journeyShell.getByRole('link', { name: 'Hedgr Home' })).toBeVisible();
  const primaryNav = page.getByTestId('synthetic-bottom-nav');
  await expect(
    primaryNav.getByRole('link', { name: 'Home', exact: true })
  ).toHaveAttribute('href', '/dashboard-synthetic-journey');
  await expect(
    primaryNav.getByRole('link', { name: 'Settings', exact: true })
  ).toHaveAttribute('href', '/settings?journey=class-a-val-002');
  await expect(
    primaryNav.getByRole('link', { name: 'Activity', exact: true })
  ).toHaveAttribute('href', '/activity?journey=class-a-val-002');
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
    'Used for simulation estimates'
  );
  await expect(page.getByTestId('settings-trust-information')).toContainText(
    'No real customer money is held or moved'
  );
  await expect(page.getByText('Environment Configuration')).toHaveCount(0);
  await expect(page.getByText(/Auth: mock|DeFi: mock|FX: fixed/)).toHaveCount(
    0
  );
  await expect(page.getByText(/unlock all features/i)).toHaveCount(0);
  // Settings now shares the approved brand header without exposing research internals.
  await expect(page.getByTestId('synthetic-journey-shell')).toBeVisible();
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
      name: 'Your position',
    })
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(dashboardOrientation).toContainText('Your position');
  await expect(dashboardOrientation).not.toContainText(
    /crypto|blockchain|stablecoin|DeFi|trading|yield routing/i
  );
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(
    page.getByText('Simulated Hedgr balance', { exact: true })
  ).toBeVisible();
  await expect(
    page.getByTestId('dashboard-synthetic-balance-explainer')
  ).toHaveText('No simulated activity yet.');
  await expect(page.getByTestId('dashboard-simulation-utilities')).toBeVisible();
  await expect(page.getByTestId('dashboard-add-simulated-deposit')).toHaveAttribute(
    'href',
    '/deposit?journey=class-a-val-002'
  );
  // HOME-EXPERIENCE-001 T3: first use offers the simulation explainer instead of an empty Activity.
  await expect(page.getByTestId('dashboard-view-activity')).toHaveCount(0);
  await expect(page.getByTestId('dashboard-how-simulation-works')).toHaveText('How this simulation works');
  await expect(page.getByTestId('dashboard-change-evidence')).toHaveCount(0);
  await expect(page.getByText('How your position changed')).toHaveCount(0);
  await expect(page.getByText('Does anything need attention?')).toHaveCount(0);
  await expect(
    page.getByTestId('engine-simulation-attention-answer')
  ).toHaveCount(0);
  await expect(page.getByText('This is what happened in the example. It doesn’t tell you what will happen next.')).toHaveCount(0);
  await expect(page.getByTestId('dashboard-current-status')).not.toContainText(
    'NORMAL'
  );
  // HOME-EXPERIENCE-001 T3: the first-use card replaces the empty comparison.
  await expect(page.getByTestId('engine-posture-context')).toHaveText(
    'Practise with pretend money first. Hedgr shows what changes, and why.'
  );
  await expect(page.getByTestId('dashboard-current-status')).toContainText('Start here');
  await expect(page.getByTestId('dashboard-first-use-steps').locator('li[aria-current="step"]')).toHaveText(
    'Where things standYou are here. It starts at $0.00.'
  );
  await expect(page.getByTestId('dashboard-position-line')).toHaveText('Your line starts with your first deposit');
  await expect(page.getByTestId('dashboard-current-status')).not.toContainText('What Hedgr notices');
  await expect(
    page.getByTestId('dashboard-current-status').locator('img')
  ).toHaveCount(0);
  await expect(page.getByTestId('dashboard-current-status')).not.toContainText(
    /score|gauge|safe|all clear/i
  );
  await page.getByTestId('research-planning-targets').locator(':scope > summary').click();
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
  expect(dashboardMainCopy.replace('Nothing to compare yet. Add a simulated deposit when you’re ready — this is practice money only.', '')).not.toContain('—');

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
    'What happens'
  );
  await expect(page.getByTestId('synthetic-journey-shell')).toContainText('Step 2 of 4 · What happens');
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
    'You added $5.00 to your simulated balance',
    { timeout: 10_000 }
  );
  await expect(page.getByTestId('deposit-confirmation-region')).toContainText(
    'Real money movedNone'
  );
  expect(depositContractRequests).toBe(0);

  const firstEventHome = await page.context().newPage();
  await firstEventHome.goto('/dashboard-synthetic-journey');
  await expect(firstEventHome.getByTestId('usd-balance')).toHaveText('$5.00');
  // HOME-EXPERIENCE-001 T3: the first deposit since the last Home visit.
  await expect(firstEventHome.getByTestId('engine-posture-context')).toHaveText(
    /^One simulated deposit of \$5\.00 on \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) took your position from \$0\.00 to \$5\.00\.$/
  );
  await expect(firstEventHome.getByTestId('dashboard-change-chip')).toHaveText(/^↑\$5\.00 since \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/);
  await expect(firstEventHome.getByText('Does anything need attention?')).toHaveCount(0);
  await expect(firstEventHome.getByTestId('engine-simulation-attention-answer')).toHaveCount(0);
  await expect(firstEventHome.getByText(
    'This is what happened in the example. It doesn’t tell you what will happen next.'
  )).toBeVisible();
  await firstEventHome.close();

  await page
    .getByRole('link', { name: 'Continue to simulated withdrawal' })
    .click();
  await expect(page).toHaveURL(/\/withdraw\?journey=class-a-val-002/);
  await expect(page.getByTestId('synthetic-journey-current-step')).toHaveText(
    'What changed'
  );
  await expect(page.getByTestId('synthetic-journey-shell')).toContainText('Step 3 of 4 · What changed');
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
  // HOME-EXPERIENCE-001 T2: the receipt carries the no-real-money boundary.
  await expect(page.getByTestId('withdraw-status-region')).toContainText('Real money movedNone');
  await expect(
    page.getByTestId('withdraw-status-exception-clarification')
  ).toHaveCount(0);
  await expect(
    page.getByTestId('withdraw-status-next-step-guidance')
  ).toHaveCount(0);
  await expect(
    page.getByTestId('withdraw-balance-reconciliation')
  ).toContainText('→ $3.00');

  await page.getByRole('link', { name: 'Review Activity' }).click();
  await expect(page).toHaveURL(/\/activity\?journey=class-a-val-002/);
  await expect(page.getByRole('heading', { name: 'Activity', exact: true })).toBeVisible();
  await expect(page.getByTestId('activity-synthetic-condition')).toHaveCount(0);
  const activityReconciliation = page.getByTestId(
    'activity-balance-reconciliation'
  );
  await expect(activityReconciliation).toContainText(
    'Simulated balance'
  );
  await expect(activityReconciliation).toContainText(
    'From completed simulated entries only.'
  );
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
  // HOME-EXPERIENCE-001 T4: the entry thread replaces the balance-after strip.
  await expect(page.getByTestId('activity-result-deposit')).toHaveCount(0);
  await expect(page.getByTestId('activity-status-line-deposit')).toHaveText(/^Completed · \d{2}:\d{2}$/);
  await expect(page.getByTestId('activity-row-deposit')).not.toContainText(
    'ZMW'
  );
  const depositRow = page.getByTestId('activity-row-deposit');
  await depositRow.click();
  const depositDetail = page.locator('main details[open]');
  await expect(depositDetail).toContainText('Before$0.00');
  await expect(depositDetail).toContainText('After$5.00');
  await expect(depositDetail).not.toContainText('ZMW');
  await depositRow.press('Enter');
  await expect(depositDetail).toHaveCount(0);
  await expect(depositRow).toBeFocused();
  await expect(page.getByTestId('activity-delta-withdraw')).toHaveText('−$2.00');
  await expect(page.getByTestId('activity-day-balance').first()).toHaveText('Balance $3.00');
  await expect(page.getByTestId('activity-thread-start')).toHaveText(/^Started at \$0\.00 · \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/);
  await expect(page.getByTestId('activity-next-step')).toContainText('See it on your position');
  await expect(page.getByTestId('activity-back-to-position')).toHaveCSS('background-color', 'rgb(31, 39, 71)');
  const withdrawalRow = page.getByTestId('activity-row-withdraw');
  await withdrawalRow.click();
  const withdrawalDetail = page.locator('main details[open]');
  await expect(withdrawalDetail).toContainText('Before$5.00');
  await expect(withdrawalDetail).toContainText('After$3.00');
  await expect(withdrawalDetail).toContainText('No real money moved');
  await expect(withdrawalDetail).not.toContainText('ZMW');
  await withdrawalRow.press('Enter');
  await expect(withdrawalDetail).toHaveCount(0);
  await expect(withdrawalRow).toBeFocused();

  await page.getByRole('link', { name: 'Back to your position' }).click();
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
  // HOME-EXPERIENCE-001 T3: one withdrawal since the first-event Home visit.
  await expect(page.getByTestId('engine-posture-context')).toHaveText(
    /^One simulated withdrawal of \$2\.00 on \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) took your position from \$5\.00 to \$3\.00\.$/
  );
  await expect(page.getByTestId('dashboard-change-chip')).toHaveText(/^↓\$2\.00 since \d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/);
  await expect(page.getByTestId('dashboard-since-link')).toHaveAttribute('href', '/activity?journey=class-a-val-002');
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
  expect(await page.evaluate(() => localStorage.getItem('hedgr:last-home-visit'))).not.toBeNull();
  await restartJourney.click();

  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  // Restart clears the last-visit value (§7a decision 7); first use returns.
  await expect(page.getByTestId('dashboard-first-use-steps')).toBeVisible();
  await expect(page.getByTestId('dashboard-change-chip')).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('hedgr:last-home-visit')))
    .toBeNull();
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
  await page.getByRole('link', { name: 'Review Activity' }).click();

  await expect(page.getByTestId('activity-type-deposit')).toHaveCount(1);
  await expect(page.getByTestId('activity-type-withdraw')).toHaveCount(1);
  await expect(
    page.locator('[data-testid="tx-status-pill"][data-status="SUCCESS"]')
  ).toHaveCount(0);
  await page.getByRole('link', { name: 'Back to your position' }).click();
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

test('unavailable data panel reflows at 320px and 200% text', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await clearStorage(page);
  await login(page);
  await page.goto('/deposit?journey=class-a-val-002&scenario=unavailable-data');
  const panel = page.getByTestId('deposit-market-data-continuity');
  await expect(panel).toContainText('What is paused');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });

  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth);
  const panelBox = (await panel.boundingBox())!;
  const headline = panel.getByRole('heading');
  const headlineBox = (await headline.boundingBox())!;
  expect(headlineBox.x + headlineBox.width).toBeLessThanOrEqual(
    panelBox.x + panelBox.width
  );
  const headlineFit = await headline.evaluate((el) => ({
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
  }));
  expect(headlineFit.scrollWidth).toBeLessThanOrEqual(headlineFit.clientWidth);
  const retry = panel.getByRole('button', { name: 'Retry rate' });
  await expect(retry).toBeVisible();
  expect((await retry.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});

test('mobile keeps the persistent boundary and current research step visible', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await clearStorage(page);
  await login(page);

  await expect(page.getByTestId('trust-disclosure-banner')).toBeVisible();
  await expect(page.getByTestId('synthetic-journey-shell')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your position', exact: true })).toBeVisible();
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
    .getByTestId('research-planning-targets')
    .boundingBox();
  expect(currentOverviewBox?.y).toBeLessThan(844);
  expect(planningBox?.y).toBeLessThan(844 * 2);

  const mobileNav = page.getByTestId('synthetic-bottom-nav');
  await expect(mobileNav).toBeVisible();
  for (const [label, href] of [
    ['Home', '/dashboard-synthetic-journey'],
    ['Settings', '/settings?journey=class-a-val-002'],
    ['Activity', '/activity?journey=class-a-val-002'],
  ]) {
    const navLink = mobileNav.getByRole('link', { name: label, exact: true });
    await expect(navLink).toBeVisible();
    const box = (await navLink.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    await expect(navLink).toHaveAttribute('href', href);
  }
  await expect(
    mobileNav.getByRole('link', { name: 'Deposit', exact: true })
  ).toHaveCount(0);
  await expect(
    mobileNav.getByRole('link', { name: 'Withdraw', exact: true })
  ).toHaveCount(0);
  await expect(
    mobileNav.getByRole('link', { name: 'Copilot', exact: true })
  ).toHaveCount(0);
});

// HOME-EXPERIENCE-001 T3: since-last-visit variants, position line and last-visit reset.
test('Home explains what changed since the last visit and clears it on reset', async ({
  page,
}) => {
  const date = String.raw`\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
  await clearStorage(page);
  await login(page);
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.getByTestId('dashboard-date-line')).toHaveText(
    /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday) \d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|December)$/
  );
  await expect(page.getByTestId('dashboard-first-use-steps')).toBeVisible();

  // Two entries between Home visits.
  await page.getByTestId('dashboard-add-simulated-deposit').click();
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('deposit-confirmed')).toHaveText('You added $5.00 to your simulated balance');
  await page.getByRole('link', { name: 'Continue to simulated withdrawal' }).click();
  await page.getByTestId('withdraw-amount').fill('2');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('withdraw-balance-reconciliation')).toContainText('$5.00 → $3.00');
  await page.getByRole('link', { name: 'Back to your position' }).click();

  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByTestId('dashboard-current-status')).toContainText('Since you were last here');
  await expect(page.getByTestId('engine-posture-context')).toHaveText(
    new RegExp(`^Two things changed since ${date}\\. Your position went from \\$0\\.00 to \\$3\\.00\\.$`)
  );
  const entries = page.getByTestId('dashboard-since-entries').locator('li');
  await expect(entries).toHaveCount(2);
  await expect(entries.nth(0)).toHaveText(new RegExp(`^Simulated deposit${date}\\+\\$5\\.00$`));
  await expect(entries.nth(1)).toHaveText(new RegExp(`^Simulated withdrawal${date}−\\$2\\.00$`));
  await expect(page.getByTestId('dashboard-since-link')).toHaveText('See all in Activity→');
  await expect(page.getByTestId('dashboard-change-chip')).toHaveText(new RegExp(`^↑\\$3\\.00 since ${date}$`));
  await expect(page.getByTestId('dashboard-position-line-visit')).toHaveText('Your last visit');
  await expect(page.getByTestId('dashboard-position-line')).toContainText('Today');
  await expect(page.getByText('This is what happened in the example. It doesn’t tell you what will happen next.')).toBeVisible();

  // Nothing changed since that visit.
  await page.reload();
  await expect(page.getByTestId('engine-posture-context')).toHaveText(
    new RegExp(`^Nothing has changed since ${date}\\. Your position is still \\$3\\.00\\.$`)
  );
  await expect(page.getByText('The ZMW estimate can still move with the exchange rate.')).toBeVisible();
  await expect(page.getByTestId('dashboard-change-chip')).toHaveText(new RegExp(`^–No change since ${date}$`));

  // Journey reset clears the value; first use returns on both routes.
  expect(await page.evaluate(() => localStorage.getItem('hedgr:last-home-visit'))).not.toBeNull();
  await page.goto('/dashboard-synthetic-journey?reset=1');
  await expect(page.getByTestId('usd-balance')).toHaveText('$0.00');
  await expect(page.getByTestId('dashboard-first-use-steps')).toBeVisible();
  await expect(page.getByTestId('dashboard-change-chip')).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('hedgr:last-home-visit')))
    .toBeNull();
  // The next ordinary Home visit records the value again.
  await page.goto('/dashboard');
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('hedgr:last-home-visit')))
    .not.toBeNull();
  await expect(page.getByTestId('dashboard-first-use-steps').locator('li').first()).toHaveText(
    'You are here. It starts at $0.00.'
  );
  await expect(page.getByText(/Step 1|Position$/)).toHaveCount(0);
});

// HOME-EXPERIENCE-001 T4: the entry thread and its next step reflow at 320px and 200% text.
test('Activity thread reflows at 320px and 200% text on both routes', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await login(page);
  await seedCompletedJourneyStorage(page);
  for (const route of ['/activity?journey=class-a-val-002', '/activity']) {
    await page.goto(route);
    await expect(page.getByTestId('activity-day-balance').first()).toHaveText('Balance $3.00');
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth))
      .toBeLessThanOrEqual(1);
    for (const card of await page.locator('[data-testid^="activity-row-"]').all()) {
      await expect.poll(() => card.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    }
    const back = page.getByTestId('activity-back-to-position');
    await expect(back).toHaveText('Back to your position');
    await expect.poll(() => back.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(1);
    expect((await back.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
});

// HOME-EXPERIENCE-001 T5: one arrival motion after a confirmed change; reduced motion shows the end state.
async function recordWithdrawalSinceLastHomeVisit(page: Page) {
  await clearStorage(page);
  await login(page);
  await page.goto('/deposit?journey=class-a-val-002');
  await page.getByTestId('deposit-amount').fill('100');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('deposit-confirmed')).toBeVisible();
  await page.getByRole('link', { name: 'Back to your position' }).click();
  await expect(page.getByTestId('usd-balance')).toHaveText('$5.00');
  await page.goto('/withdraw?journey=class-a-val-002');
  await page.getByTestId('withdraw-amount').fill('2');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await expect(page.getByTestId('withdraw-balance-reconciliation')).toContainText('$5.00 → $3.00');
}

const arrivalSentence = 'Your position is now $3.00, $2.00 lower than on your last visit.';

test('Home counts from the last figure seen after a confirmed change', async ({ page }) => {
  await recordWithdrawalSinceLastHomeVisit(page);
  // Pause on the loaded receipt, then arrive client-side so no full load waits on frozen timers.
  await page.clock.pauseAt(new Date(Date.now() + 60_000));
  await page.getByTestId('withdraw-status-region').getByRole('link', { name: 'Back to your position' }).click();
  await expect(page.getByTestId('dashboard-change-chip')).toBeAttached();
  await expect(page.getByTestId('usd-balance')).toHaveText('$5.00');
  await expect(page.getByTestId('dashboard-change-chip')).toHaveCSS('opacity', '0');
  await expect(page.getByTestId('dashboard-arrival-announcement')).toHaveText('');

  await page.clock.runFor(700);
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByTestId('dashboard-arrival-announcement')).toHaveText(arrivalSentence);
  await expect(page.getByTestId('dashboard-change-chip')).toHaveCSS('opacity', '1');
  await expect(page.getByTestId('dashboard-arrival-announcement')).toHaveAttribute('role', 'status');

  // It runs once: a reload with no new change shows no motion and no sentence.
  await page.clock.resume();
  await page.reload();
  await expect(page.getByTestId('usd-balance')).toHaveText('$3.00');
  await expect(page.getByTestId('dashboard-change-chip')).toHaveText(/No change since/);
  await expect(page.getByTestId('dashboard-arrival-announcement')).toHaveText('');
});

test('reduced motion shows the new figure, line and chip at once', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await recordWithdrawalSinceLastHomeVisit(page);
  await page.goto('/dashboard-synthetic-journey');
  await expect(page.getByTestId('dashboard-change-chip')).toBeAttached();
  // The first frame with the chip already shows the final figure.
  expect(await page.getByTestId('usd-balance').textContent()).toBe('$3.00');
  await expect(page.getByTestId('dashboard-change-chip')).toHaveCSS('opacity', '1');
  await expect(page.getByTestId('dashboard-change-chip')).toHaveCSS('animation-name', 'none');
  await expect(page.getByTestId('dashboard-arrival-announcement')).toHaveText(arrivalSentence);
});
