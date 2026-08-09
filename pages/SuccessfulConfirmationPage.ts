import { Page, Locator } from '@playwright/test';

export class SuccessfulConfirmationPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: 'Your Order Has Been Processed!',
    });

    this.successMessage = page.getByText(
      'Your order has been successfully processed!'
    );
  }
}