import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests-e2e',
  testMatch: 'about-hedgr-external.spec.ts',
  timeout: 30_000,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure' },
  webServer: {
    command: 'next dev --hostname 127.0.0.1 -p 3100',
    url: 'http://127.0.0.1:3100/about-hedgr-review',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { VERCEL: '' },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
});
