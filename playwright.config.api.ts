import 'dotenv/config';
import { defineConfig } from '@playwright/test';

const apiBaseURL =
  process.env.API_BASE_URL ?? process.env.BASE_URL ?? 'https://dummyjson.com';

export default defineConfig({
  testDir: './tests/api/specs',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 1,
  fullyParallel: true,
  use: {
    baseURL: apiBaseURL,
    trace: 'on-first-retry',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/api', open: 'never' }],
  ],
});

