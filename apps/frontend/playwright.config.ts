import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests-e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
  },
  webServer: {
    // Build + start for a predictable environment (no Doppler needed)
    command: 'pnpm run serve:test',
    url: 'http://localhost:3000/api/health',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
