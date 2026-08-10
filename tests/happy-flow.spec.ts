import { test, expect } from '@playwright/test';

import { ProductPage } from '../pages/ProductPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';
import { GuestCheckoutPage } from '../pages/GuestCheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { SuccessfulConfirmationPage } from '../pages/SuccessfulConfirmationPage';
import { navigateToProduct } from '../utils/productNavigation';

test.describe('Guest checkout', () => {

  test('shopper can browse a product through subcategory and open product details', async ({ page }) => {
    const productPage = new ProductPage(page);

    await navigateToProduct(
      page,
      'Makeup',
      'BeneFit Girl Meets Pearl',
      'Cheeks'
    );

    await expect(productPage.productName)
      .toHaveText('BeneFit Girl Meets Pearl');
  });


  test('shopper can browse a product directly through category and open product details', async ({ page }) => {
    const productPage = new ProductPage(page);

    await navigateToProduct(
      page,
      'Skincare',
      'Total Moisture Facial Cream'
    );

    await expect(productPage.productName)
      .toHaveText('Total Moisture Facial Cream');
  });


  test('shopper can add a product and update basket quantity', async ({ page }) => {
    const productPage = new ProductPage(page);
    const basketPage = new BasketPage(page);

    const product = 'BeneFit Girl Meets Pearl';

    await navigateToProduct(
      page,
      'Makeup',
      product,
      'Cheeks'
    );

    await expect(productPage.productName)
      .toHaveText(product);

    await productPage.setQuantity(1);
    await productPage.addToCart();

    // Verify basket is displayed and product was added
    await expect(basketPage.heading).toBeVisible();

    await expect(
      basketPage.productName(product)
    ).toBeVisible();

    await expect(
      basketPage.quantityInput(product)
    ).toHaveValue('1');

    // Update basket quantity
    await basketPage.updateQuantity(product, 2);

    await expect(
      basketPage.quantityInput(product)
    ).toHaveValue('2');
  });


  test('shopper can complete guest checkout successfully', async ({ page }) => {
    const productPage = new ProductPage(page);
    const basketPage = new BasketPage(page);
    const loginPage = new LoginPage(page);
    const guestCheckoutPage = new GuestCheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const successfulConfirmationPage =
      new SuccessfulConfirmationPage(page);

    const category = 'Makeup';
    const subcategory = 'Cheeks';
    const product = 'BeneFit Girl Meets Pearl';

    // Browse to product
    await navigateToProduct(
      page,
      category,
      product,
      subcategory
    );

    // Add product to basket
    await productPage.setQuantity(1);
    await productPage.addToCart();

    await expect(
      basketPage.productName(product)
    ).toBeVisible();

    // Proceed to checkout
    await basketPage.proceedToCheckout();

    // Continue as guest
    await loginPage.continueAsGuest();

    // Enter mandatory guest details
    await guestCheckoutPage.enterGuestDetails({
      firstName: 'Test',
      lastName: 'Customer',
      email: 'test.customer@example.com',
      address: '123 Test Street',
      city: 'Wellington',
      region: 'Wellington',
      postcode: '6011',
      country: 'New Zealand',
    });

    await guestCheckoutPage.continueCheckout();

    // Verify checkout confirmation
    await expect(
      confirmationPage.heading
    ).toBeVisible();

    await expect(
      confirmationPage.productName(product)
    ).toBeVisible();

    await expect(
      confirmationPage.productQuantity(product)
    ).toHaveText('1');

    // Confirm order
    await confirmationPage.confirmOrder();

    // Verify successful order
    await expect(
      successfulConfirmationPage.heading
    ).toBeVisible();

    await expect(
      successfulConfirmationPage.successMessage
    ).toBeVisible();
  });


  test('guest checkout validates mandatory fields', async ({ page }) => {
  const productPage = new ProductPage(page);
  const basketPage = new BasketPage(page);
  const loginPage = new LoginPage(page);
  const guestCheckoutPage = new GuestCheckoutPage(page);

  const product = 'BeneFit Girl Meets Pearl';

  // Browse to product
  await navigateToProduct(
    page,
    'Makeup',
    product,
    'Cheeks'
  );

  // Add product to basket
  await productPage.setQuantity(1);
  await productPage.addToCart();

  // Proceed to checkout
  await basketPage.proceedToCheckout();

  // Continue as guest
  await loginPage.continueAsGuest();

  // Ensure country is not selected
  await guestCheckoutPage.clearCountry();

  // Submit form with mandatory fields blank
  await guestCheckoutPage.continueCheckout();

  // Verify mandatory field validation messages
  await expect(
    guestCheckoutPage.firstNameError
  ).toBeVisible();

  await expect(
    guestCheckoutPage.lastNameError
  ).toBeVisible();

  await expect(
    guestCheckoutPage.emailError
  ).toBeVisible();

  await expect(
    guestCheckoutPage.addressError
  ).toBeVisible();

  await expect(
    guestCheckoutPage.cityError
  ).toBeVisible();

  await expect(
    guestCheckoutPage.postcodeError
  ).toBeVisible();

  await expect(
    guestCheckoutPage.countryError
  ).toBeVisible();
});
});