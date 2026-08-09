import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = page.locator('h1.productname');
    this.productPrice = page.locator('.productfilneprice');
    this.quantityInput = page.locator('#product_quantity');
    this.addToCartButton = page.getByRole('link', {
      name: 'Add to Cart',
    });
  }

  colourOption(colour: string): Locator {
    return this.page.getByLabel(colour, { exact: true });
  }

  async selectColour(colour: string) {
    await this.colourOption(colour).check();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}