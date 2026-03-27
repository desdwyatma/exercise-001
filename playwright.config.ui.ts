import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = 'https://dummyjson.com';
const headless =
  process.env.PW_HEADLESS !== undefined
    ? process.env.PW_HEADLESS.toLowerCase() !== 'false'
    : true;

export default defineConfig({
  testDir: './tests/ui/specs',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 1,
  fullyParallel: true,
  use: {
    baseURL,
    headless,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless,
        video: 'on',
        screenshot: 'only-on-failure',
      },
    },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/ui', open: 'never' }],
  ],
});
