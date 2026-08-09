import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly guestCheckoutOption: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.guestCheckoutOption = page.locator('#accountFrm_accountguest');

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });
  }

  async continueAsGuest() {
    await this.guestCheckoutOption.check();
    await this.continueButton.click();
  }
}