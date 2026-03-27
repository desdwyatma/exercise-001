import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('UI: Check Top Resources on https://dummyjson.com', () => {
  test('@positive @docs-home @home list Top Resources on Home page', async ({ page }) => {

    const home = new HomePage(page);
    await home.goto();
    await home.assertLoaded();

    const topResourcesHeader = page.getByRole('heading', { name: /top resources/i });
    await expect(topResourcesHeader).toBeVisible();

    const topResourceSection = topResourcesHeader.locator('..');
    const resourceLinks = topResourceSection.locator('a');

    const linkCount = await resourceLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    const resourceNames: string[] = [];
    for (let i = 0; i < linkCount; i++) {
      const text = await resourceLinks.nth(i).innerText();
      resourceNames.push(text);
    }
    console.log('Top Resources founded:', resourceNames);
  });
});