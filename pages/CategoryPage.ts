import { Page, Locator } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  subcategoryLink(subcategoryName: string): Locator {
    return this.page.getByRole('link', {
      name: subcategoryName,
      exact: true,
    });
  }

  productLink(productName: string): Locator {
    return this.page.getByRole('link', {
      name: productName,
      exact: true,
    });
  }

  async openSubcategory(subcategoryName: string) {
    await this.subcategoryLink(subcategoryName).click();
  }

  async openProduct(productName: string) {
    await this.productLink(productName).click();
  }
}