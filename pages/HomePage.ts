import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  categoryLink(categoryName: string): Locator {
    return this.page.getByRole('link', {
      name: categoryName,
      exact: true,
    });
  }

  async goto() {
    await this.page.goto('/');
  }

  async openCategory(categoryName: string) {
    await this.categoryLink(categoryName).click();
  }
}