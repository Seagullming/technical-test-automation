import { Page, Locator } from '@playwright/test';

export class GuestCheckoutPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly regionSelect: Locator;
  readonly postcodeInput: Locator;
  readonly countrySelect: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator('#guestFrm_firstname');
    this.lastNameInput = page.locator('#guestFrm_lastname');
    this.emailInput = page.locator('#guestFrm_email');
    this.addressInput = page.locator('#guestFrm_address_1');
    this.cityInput = page.locator('#guestFrm_city');
    this.regionSelect = page.locator('#guestFrm_zone_id');
    this.postcodeInput = page.locator('#guestFrm_postcode');
    this.countrySelect = page.locator('#guestFrm_country_id');

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });
  }

  async enterGuestDetails(details: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    region: string;
    postcode: string;
    country: string;
  }) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.postcodeInput.fill(details.postcode);

    await this.countrySelect.selectOption({
      label: details.country,
    });

    await this.regionSelect.selectOption({
      label: details.region,
    });
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
}