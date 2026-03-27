import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly body: Locator;
  readonly topResourcesHeader: Locator;

  constructor(private readonly page: Page) {
    this.body = page.locator('body');
    this.topResourcesHeader = page.getByRole('heading', { name: /top resources/i });
  }

  async goto() {
    await this.page.goto('https://dummyjson.com');
  }

  async assertLoaded() {
    await expect(this.body).toBeVisible();
    await expect(this.topResourcesHeader).toBeVisible();
  }
}
