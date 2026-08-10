import { Page, Locator } from '@playwright/test';
import { GuestCheckoutData } from '../types/GuestCheckoutData';

export class GuestCheckoutPage {
  readonly page: Page;

  // Mandatory fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly regionSelect: Locator;
  readonly postcodeInput: Locator;
  readonly countrySelect: Locator;

  // Validation messages
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly regionError: Locator;
  readonly postcodeError: Locator;
  readonly countryError: Locator;

  readonly continueButton: Locator;
  

  constructor(page: Page) {
    this.page = page;

    // Mandatory fields
    this.firstNameInput = page.locator('#guestFrm_firstname');
    this.lastNameInput = page.locator('#guestFrm_lastname');
    this.emailInput = page.locator('#guestFrm_email');
    this.addressInput = page.locator('#guestFrm_address_1');
    this.cityInput = page.locator('#guestFrm_city');
    this.regionSelect = page.locator('#guestFrm_zone_id');
    this.postcodeInput = page.locator('#guestFrm_postcode');
    this.countrySelect = page.locator('#guestFrm_country_id');

    // Validation messages
    this.firstNameError = page.getByText(
      'First Name must be greater than 3 and less than 32 characters!'
    );

    this.lastNameError = page.getByText(
      'Last Name must be greater than 3 and less than 32 characters!'
    );

    this.emailError = page.getByText(
      'E-Mail Address does not appear to be valid!'
    );

    this.addressError = page.getByText(
      'Address 1 must be greater than 3 and less than 128 characters!'
    );

    this.cityError = page.getByText(
      'City must be greater than 3 and less than 128 characters!'
    );

    this.regionError = page.getByText(
      'Please select a region / state!'
    );

    this.postcodeError = page.getByText(
      'Zip/postal code must be between 3 and 10 characters!'
    );

    this.countryError = page.getByText(
      'Please select a country!'
    );

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });
  }

  async enterGuestDetails(details: GuestCheckoutData) {
  
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.postcodeInput.fill(details.postcode);

    // Country selection updates available regions
    await this.countrySelect.selectOption({
      label: details.country,
    });

    await this.regionSelect.selectOption({
      label: details.region,
    });
  }

  async clearCountry() {
    await this.countrySelect.selectOption('FALSE');
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
}