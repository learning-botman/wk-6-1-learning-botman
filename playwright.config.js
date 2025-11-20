// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'playwright',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  retries: process.env.CI ? 1 : 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chromium'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop WebKit'] } },
  ],
});
