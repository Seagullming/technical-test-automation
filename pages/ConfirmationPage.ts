import { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly confirmOrderButton: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: 'Checkout Confirmation',
    });

    this.confirmOrderButton = page.locator('#checkout_btn');

    this.totalAmount = page.locator('.confirm_total .totalamout').last();
  }

  productName(product: string): Locator {
    return this.page
      .locator('.confirm_products')
      .getByRole('link', {
        name: product,
        exact: true,
      });
  }

  productRow(product: string): Locator {
    return this.page
      .locator('.confirm_products tbody tr')
      .filter({ hasText: product });
  }

  productQuantity(product: string): Locator {
    return this.productRow(product)
      .locator('td')
      .nth(3);
  }

  productTotal(product: string): Locator {
    return this.productRow(product)
      .locator('td')
      .nth(4);
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}