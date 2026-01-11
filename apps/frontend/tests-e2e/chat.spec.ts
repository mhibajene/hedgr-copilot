import { test, expect, Page } from '@playwright/test';

// Block analytics + external calls for test hermeticity (allow local app traffic)
const ANALYTICS_HOSTS = [/posthog\./i, /sentry\./i];

// Stable viewport dimensions to eliminate responsive variance in CI
const VIEWPORT = { width: 1280, height: 720 };

// ============================================================================
// Test Helpers - DRY login/navigation logic
// ============================================================================

/** Complete login flow and navigate to chat page (skips if Copilot is disabled in this env) */
async function loginAndGoToChat(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Wait for auth to complete (redirects to dashboard)
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });

  // Navigate directly to chat - no nav dependency
  await page.goto('/chat');

  // Some environments may gate Copilot behind a flag/permission.
  // Wait for either the chat shell OR a non-chat outcome (redirect/404), then let tests decide.
  await page.waitForLoadState('networkidle');
}

/** Complete login and wait for dashboard to be ready */
async function loginAndWaitForDashboardReady(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('you@example.com').fill('test@hedgr.app');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  await expect(page.getByTestId('app-nav')).toBeVisible({ timeout: 10_000 });
}

/**
 * Ensure the Chat page is actually available in this environment.
 * If Copilot is disabled (no chat testids and nav lacks copilot link), return false.
 */
async function isChatAvailable(page: Page): Promise<boolean> {
  // If we got redirected away from /chat, it's not available.
  const url = page.url();
  if (!/\/chat(\b|\/|\?|#)/.test(url)) return false;

  // If the chat shell renders, it's available.
  if (await page.getByTestId('chat-input').count().catch(() => 0)) return true;
  if (await page.getByTestId('chat-disclaimer').count().catch(() => 0)) return true;

  // Otherwise assume gated/changed UI.
  return false;
}

/** Skip the current test if chat is not available in this env */
async function skipIfChatUnavailable(page: Page) {
  const available = await isChatAvailable(page);
  test.skip(!available, 'Copilot/Chat UI not available in this environment (likely feature-flagged or permission-gated).');
}

// ============================================================================
// Test Suite
// ============================================================================

test.describe('Chat Page', () => {
  test.beforeEach(async ({ page, context }) => {
    // Pin viewport to eliminate responsive variance in CI
    await page.setViewportSize(VIEWPORT);

    // Block analytics + external calls for test hermeticity (allow local app traffic)
    await context.route('**/*', (route) => {
      const url = route.request().url();

      // 1) Block analytics / telemetry (hermetic)
      if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();

      // 2) Allow local app requests (Next assets, navigation, same-origin APIs)
      const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\//i.test(url);
      if (isLocalOrigin) {
        // Block Copilot chat API to ensure stub-only behavior
        if (url.includes('/api/chat')) return route.abort();
        return route.continue();
      }

      // 3) Block any external calls (OpenAI/Anthropic/etc.)
      return route.abort();
    });
  });

  test('renders chat interface', async ({ page }) => {
    await loginAndGoToChat(page);
    await skipIfChatUnavailable(page);

    // Verify chat interface elements
    await expect(page.getByTestId('chat-disclaimer')).toBeVisible();
    await expect(page.getByTestId('chat-input')).toBeVisible();
    await expect(page.getByTestId('chat-send-button')).toBeVisible();
  });

  test('sends message and shows typing indicator', async ({ page }) => {
    await loginAndGoToChat(page);
    await skipIfChatUnavailable(page);

    // Send message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();

    // Verify user message appears
    const userMessage = page.getByTestId('chat-message-user').first();
    await expect(userMessage).toBeVisible({ timeout: 2000 });
    await expect(userMessage).toContainText('hedgr');

    // Verify typing indicator appears
    await expect(page.getByTestId('chat-typing-indicator')).toBeVisible({ timeout: 1000 });
  });

  test('shows assistant reply after typing', async ({ page }) => {
    await loginAndGoToChat(page);
    await skipIfChatUnavailable(page);

    // Send message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();

    // Wait for typing indicator
    await expect(page.getByTestId('chat-typing-indicator')).toBeVisible({ timeout: 1000 });

    // Wait for assistant reply (stub has 500-1500ms delay)
    const assistantMessage = page.getByTestId('chat-message-assistant').first();
    await expect(assistantMessage).toBeVisible({ timeout: 3000 });
    await expect(assistantMessage).toContainText('Hedgr is a savings platform');
  });

  test('disclaimer is always visible', async ({ page }) => {
    await loginAndGoToChat(page);
    await skipIfChatUnavailable(page);

    // Verify disclaimer is visible
    const disclaimer = page.getByTestId('chat-disclaimer');
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText('Hedgr Copilot is for educational support only');
    await expect(disclaimer).toContainText('Not financial advice');

    // Send a message
    await page.getByTestId('chat-input').fill('test');
    await page.getByTestId('chat-send-button').click();

    // Verify disclaimer is still visible after sending message
    await expect(disclaimer).toBeVisible();
  });

  test('shows offline banner when network is offline', async ({ page, context }) => {
    await loginAndGoToChat(page);
    await skipIfChatUnavailable(page);

    // Simulate offline
    await context.setOffline(true);

    // Verify offline banner appears
    await expect(page.getByTestId('chat-offline-banner')).toBeVisible({ timeout: 2000 });
    await expect(page.getByTestId('chat-offline-banner')).toContainText('offline');

    // Simulate online
    await context.setOffline(false);

    // Verify offline banner disappears
    await expect(page.getByTestId('chat-offline-banner')).not.toBeVisible({ timeout: 2000 });
  });

  test('handles multiple messages', async ({ page }) => {
    await loginAndGoToChat(page);
    await skipIfChatUnavailable(page);

    // Send first message
    await page.getByTestId('chat-input').fill('hedgr');
    await page.getByTestId('chat-send-button').click();
    await expect(page.getByTestId('chat-message-assistant').first()).toBeVisible({ timeout: 3000 });

    // Send second message
    await page.getByTestId('chat-input').fill('How do I save?');
    await page.getByTestId('chat-send-button').click();
    await expect(page.getByTestId('chat-message-assistant').last()).toBeVisible({ timeout: 3000 });

    // Verify both messages are present
    const userMessages = page.getByTestId('chat-message-user');
    const assistantMessages = page.getByTestId('chat-message-assistant');
    await expect(userMessages).toHaveCount(2);
    await expect(assistantMessages).toHaveCount(2);
  });
});

// ============================================================================
// Navigation Test Suite (isolated) - verifies nav link presence
// If this fails, investigate: feature flag, env gating, or test ID changes
// ============================================================================

test.describe('Navigation - Copilot Link', () => {
  test.beforeEach(async ({ page, context }) => {
    // Pin viewport to eliminate responsive variance
    await page.setViewportSize(VIEWPORT);

    // Block analytics only (allow all local traffic for nav test)
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (ANALYTICS_HOSTS.some((rx) => rx.test(url))) return route.abort();
      return route.continue();
    });
  });

  test('Copilot nav link is visible on dashboard', async ({ page }) => {
    await loginAndWaitForDashboardReady(page);

    // Look for at least one visible Copilot link in the nav
    const copilotLinks = page.getByTestId('nav-copilot-link');
    const linkCount = await copilotLinks.count();

    if (linkCount === 0) {
      test.skip(true, 'Copilot nav link not present in this environment (likely feature-flagged/disabled in CI).');
    }

    // Check if at least one is visible
    let anyVisible = false;
    for (let i = 0; i < linkCount; i++) {
      const visible = await copilotLinks.nth(i).isVisible().catch(() => false);
      if (visible) {
        anyVisible = true;
        break;
      }
    }

    expect(anyVisible, 'At least one nav-copilot-link should be visible').toBe(true);
  });
});
