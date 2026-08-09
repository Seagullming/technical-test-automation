import { Page, Locator } from '@playwright/test';

export class BasketPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly shoppingItemTable: Locator;
  readonly updateButton: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Shopping Cart' });
    this.shoppingItemTable = page.locator('.shopping-cart-table');
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
  }
  productRow(productName: string): Locator {
    return this.page
      .locator('table.table tbody tr')
      .filter({ hasText: productName });
  }

  productName(productName: string): Locator {
    return this.productRow(productName)
      .getByRole('link', {
        name: productName,
        exact: true,
      });
  }

  quantityInput(productName: string): Locator {
    return this.productRow(productName)
      .locator('input[name^="quantity"]');
  }

  unitPrice(productName: string): Locator {
    return this.productRow(productName)
      .locator('td')
      .nth(3);
  }

  lineTotal(productName: string): Locator {
    return this.productRow(productName)
      .locator('td')
      .nth(5);
  }

  async updateQuantity(productName: string, quantity: number) {
    await this.quantityInput(productName)
      .fill(quantity.toString());

    await this.updateButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

