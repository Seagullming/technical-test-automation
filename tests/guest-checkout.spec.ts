import { test, expect } from '@playwright/test';

import { ProductPage } from '../pages/ProductPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';
import { GuestCheckoutPage } from '../pages/GuestCheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { SuccessfulConfirmationPage } from '../pages/SuccessfulConfirmationPage';
import { navigateToProduct } from '../utils/productNavigation';
import { GuestCheckoutData } from '../types/GuestCheckoutData';
import { readCsv } from '../utils/csvReader';


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

  await expect(productPage.productName).toHaveText(product);

  // Add 1 product to basket
  await productPage.setQuantity(1);
  await productPage.addToCart();

  // Verify basket and product
  await expect(basketPage.heading).toBeVisible();

  await expect(
    basketPage.productName(product)
  ).toBeVisible();

  await expect(
    basketPage.quantityInput(product)
  ).toHaveValue('1');

  // Verify unit price and initial line total
  await expect(
    basketPage.unitPrice(product)
  ).toHaveText('$19.00');

  await expect(
    basketPage.lineTotal(product)
  ).toHaveText('$19.00');

  // Update quantity from 1 to 2
  await basketPage.updateQuantity(product, 2);

  // Verify updated quantity
  await expect(
    basketPage.quantityInput(product)
  ).toHaveValue('2');

  // Verify line total has recalculated
  await expect(
    basketPage.lineTotal(product)
  ).toHaveText('$38.00');
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

    // Read guest checkout details from CSV
    const guestData =
      readCsv<GuestCheckoutData>('guest-checkout.csv')[0];

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

    // Verify product added
    await expect(
      basketPage.productName(product)
    ).toBeVisible();

    // Proceed to checkout
    await basketPage.proceedToCheckout();

    // Continue as guest
    await loginPage.continueAsGuest();

    // Enter mandatory guest details from CSV
    await guestCheckoutPage.enterGuestDetails(
      guestData
    );

    await guestCheckoutPage.continueCheckout();

    // Verify checkout confirmation page
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