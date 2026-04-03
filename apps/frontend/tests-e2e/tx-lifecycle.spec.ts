import { test, expect } from '@playwright/test';
import { waitForDepositFxReady } from './helpers/fx-ready';

// Block analytics and external calls for test hermeticity
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

test.beforeEach(async ({ context }) => {
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
    return route.continue();
  });
});

test.describe('Transaction Lifecycle - Activity Display', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test for hermetic state
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.clear();
    });
  });

  test('successful transaction shows SUCCESS status pill and completed timeline', async ({
    page,
  }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Perform a deposit
    await page.goto('/deposit');

    const amountInput = page.getByTestId('deposit-amount');
    await amountInput.fill('');
    await amountInput.fill('100');

    await waitForDepositFxReady(page);
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Wait for confirmation
    const confirmationMsg = page.getByTestId('deposit-confirmed');
    await expect(confirmationMsg).toBeVisible({ timeout: 10000 });

    // Navigate to activity
    await page.getByRole('link', { name: 'Activity' }).click();
    await expect(page).toHaveURL(/\/activity/);

    // Verify activity list is shown
    const activityList = page.getByTestId('activity-list');
    await expect(activityList).toBeVisible();

    // Check for deposit row with SUCCESS status pill
    const depositRow = page.getByTestId('activity-row-deposit').first();
    await expect(depositRow).toBeVisible();
    await expect(depositRow).toHaveAttribute('data-activity-status', 'SUCCESS');

    // Verify TxStatusPill is shown with correct data-testid attributes
    const statusPill = depositRow.getByTestId('tx-status-pill');
    await expect(statusPill).toBeVisible();
    await expect(statusPill).toHaveAttribute('data-status', 'SUCCESS');
    await expect(statusPill).toHaveText('Completed');

    // Click to open detail modal
    await depositRow.click();

    // Verify modal opens
    const modal = page.getByTestId('tx-detail-modal');
    await expect(modal).toBeVisible();

    // Verify transaction type in modal
    const txType = page.getByTestId('tx-detail-type');
    await expect(txType).toHaveText('Deposit');

    // Verify amount is shown
    const txAmount = page.getByTestId('tx-detail-amount');
    await expect(txAmount).toBeVisible();

    // Verify timeline shows completed state
    const timeline = page.getByTestId('tx-detail-timeline');
    await expect(timeline).toBeVisible();

    // Verify SUCCESS step in timeline
    const successStep = page.getByTestId('timeline-step-SUCCESS');
    await expect(successStep).toBeVisible();

    // Close modal
    await page.getByTestId('tx-detail-close').click();
    await expect(modal).not.toBeVisible();
  });

  test('in-progress transaction shows PENDING_INIT status pill (fixture)', async ({
    page,
  }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Inject a pending transaction fixture directly via localStorage (ledger contract shape)
    await page.evaluate(() => {
      const now = Date.now();
      const pendingTx = {
        txn_ref: 'tx_pending_fixture',
        type: 'deposit',
        status: 'pending',
        amount_zmw: 500,
        amount_usd: 25.0,
        fx_rate: 20,
        created_at: now,
        updated_at: now,
      };

      const ledgerState = { version: 2, transactions: [pendingTx] };
      window.localStorage.setItem('hedgr:ledger', JSON.stringify(ledgerState));
    });

    // Navigate to activity
    await page.goto('/activity');

    // Verify activity list is shown
    const activityList = page.getByTestId('activity-list');
    await expect(activityList).toBeVisible();

    // Check for deposit row with PENDING_INIT status
    const depositRow = page.getByTestId('activity-row-deposit').first();
    await expect(depositRow).toBeVisible();
    await expect(depositRow).toHaveAttribute('data-activity-status', 'PENDING_INIT');

    // Verify TxStatusPill shows pending state
    const statusPill = depositRow.getByTestId('tx-status-pill');
    await expect(statusPill).toBeVisible();
    await expect(statusPill).toHaveAttribute('data-status', 'PENDING_INIT');
    await expect(statusPill).toHaveText('Pending');

    // Click to open detail modal
    await depositRow.click();

    // Verify modal opens
    const modal = page.getByTestId('tx-detail-modal');
    await expect(modal).toBeVisible();

    // Verify timeline shows processing state (not yet completed)
    const timeline = page.getByTestId('tx-detail-timeline');
    await expect(timeline).toBeVisible();

    // Verify PENDING_INIT step is shown and active
    const pendingStep = page.getByTestId('timeline-step-PENDING_INIT');
    await expect(pendingStep).toBeVisible();
  });

  test('failed transaction shows FAILED status pill with readable error in detail view (fixture)', async ({
    page,
  }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Inject a failed transaction fixture directly via localStorage (ledger contract shape)
    await page.evaluate(() => {
      const now = Date.now();
      const failedTx = {
        txn_ref: 'tx_failed_fixture',
        type: 'withdrawal',
        status: 'failed',
        amount_zmw: 0,
        amount_usd: 50.0,
        fx_rate: 0,
        created_at: now - 60000,
        updated_at: now,
        failure_reason: 'Insufficient funds in source account',
      };

      const ledgerState = { version: 2, transactions: [failedTx] };
      window.localStorage.setItem('hedgr:ledger', JSON.stringify(ledgerState));
    });

    // Navigate to activity
    await page.goto('/activity');

    // Verify activity list is shown
    const activityList = page.getByTestId('activity-list');
    await expect(activityList).toBeVisible();

    // Check for withdraw row with FAILED status
    const withdrawRow = page.getByTestId('activity-row-withdraw').first();
    await expect(withdrawRow).toBeVisible();
    await expect(withdrawRow).toHaveAttribute('data-activity-status', 'FAILED');

    // Verify TxStatusPill shows failed state
    const statusPill = withdrawRow.getByTestId('tx-status-pill');
    await expect(statusPill).toBeVisible();
    await expect(statusPill).toHaveAttribute('data-status', 'FAILED');
    await expect(statusPill).toHaveText('Failed');

    // Click to open detail modal
    await withdrawRow.click();

    // Verify modal opens
    const modal = page.getByTestId('tx-detail-modal');
    await expect(modal).toBeVisible();

    // Verify transaction type
    const txType = page.getByTestId('tx-detail-type');
    await expect(txType).toHaveText('Withdrawal');

    // Verify timeline shows failed state
    const failedStep = page.getByTestId('timeline-step-FAILED');
    await expect(failedStep).toBeVisible();

    // Verify failure reason is displayed
    const failureReason = page.getByTestId('tx-detail-failure-reason');
    await expect(failureReason).toBeVisible();
    await expect(failureReason).toContainText('Reason');
  });

  test('no raw/low-level statuses visible in UI', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Inject transactions (ledger contract shape: pending → PENDING_INIT, settled → SUCCESS)
    await page.evaluate(() => {
      const now = Date.now();
      const transactions = [
        {
          txn_ref: 'tx_1',
          type: 'deposit',
          status: 'pending',
          amount_zmw: 0,
          amount_usd: 10.0,
          fx_rate: 1,
          created_at: now,
          updated_at: now,
        },
        {
          txn_ref: 'tx_2',
          type: 'withdrawal',
          status: 'settled',
          amount_zmw: 0,
          amount_usd: 5.0,
          fx_rate: 0,
          created_at: now - 1000,
          updated_at: now,
        },
      ];

      const ledgerState = { version: 2, transactions };
      window.localStorage.setItem('hedgr:ledger', JSON.stringify(ledgerState));
    });

    await page.goto('/activity');

    // Get all status pills on the page
    const statusPills = page.getByTestId('tx-status-pill');
    const count = await statusPills.count();

    expect(count).toBe(2);

    // Verify none show raw internal statuses
    for (let i = 0; i < count; i++) {
      const pill = statusPills.nth(i);
      const text = await pill.textContent();
      const status = await pill.getAttribute('data-status');

      // Should show user-friendly labels, not internal codes
      expect(text).not.toBe('PENDING');
      expect(text).not.toBe('CONFIRMED');
      expect(text).not.toBe('L2_PENDING');
      expect(text).not.toBe('BRIDGE_INIT');

      // Should use public status enum values
      const validPublicStatuses = [
        'PENDING_INIT',
        'IN_PROGRESS',
        'SUCCESS',
        'FAILED',
        'REVERSED',
        'EXPIRED',
      ];
      expect(validPublicStatuses).toContain(status);
    }
  });

  test('TxStatusPill has stable data-testid selectors', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Perform a deposit to get a real transaction
    await page.goto('/deposit');

    const amountInput = page.getByTestId('deposit-amount');
    await amountInput.fill('');
    await amountInput.fill('50');

    await waitForDepositFxReady(page);
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByTestId('deposit-confirmed')).toBeVisible({ timeout: 10000 });

    await page.getByRole('link', { name: 'Activity' }).click();

    // Verify data-testid="tx-status-pill" is present
    const statusPill = page.getByTestId('tx-status-pill').first();
    await expect(statusPill).toBeVisible();

    // Verify data-status attribute is present
    const dataStatus = await statusPill.getAttribute('data-status');
    expect(dataStatus).toBeTruthy();
    expect(['PENDING_INIT', 'IN_PROGRESS', 'SUCCESS', 'FAILED', 'REVERSED', 'EXPIRED']).toContain(
      dataStatus
    );
  });

  test('transaction detail modal can be opened and closed', async ({ page }) => {
    // Login first to establish authenticated session
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Inject a transaction (ledger contract shape)
    await page.evaluate(() => {
      const now = Date.now();
      const tx = {
        txn_ref: 'tx_modal_test',
        type: 'deposit',
        status: 'settled',
        amount_zmw: 2000,
        amount_usd: 100.0,
        fx_rate: 20,
        created_at: now,
        updated_at: now,
      };

      window.localStorage.setItem(
        'hedgr:ledger',
        JSON.stringify({ version: 2, transactions: [tx] })
      );
    });

    await page.goto('/activity');

    // Click transaction row to open modal
    const txRow = page.getByTestId('activity-row-deposit').first();
    await txRow.click();

    // Modal should be visible
    const modal = page.getByTestId('tx-detail-modal');
    await expect(modal).toBeVisible();

    // Verify all required elements are present
    await expect(page.getByTestId('tx-detail-type')).toBeVisible();
    await expect(page.getByTestId('tx-detail-amount')).toBeVisible();
    await expect(page.getByTestId('tx-detail-id')).toBeVisible();
    await expect(page.getByTestId('tx-detail-timeline')).toBeVisible();

    // Close via close button (primary close path)
    await page.getByTestId('tx-detail-close').click();
    await expect(modal).not.toBeVisible();

    // Reopen and close via Escape key
    await txRow.click();
    await expect(modal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });
});

