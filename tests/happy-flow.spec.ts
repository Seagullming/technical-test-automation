import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { BasketPage } from '../pages/BasketPage';
import { navigateToProduct } from '../utils/productNavigation';

test.describe('Guest checkout', () => {

  test('shopper can browse a product through subcategory dropdownand open up product details', async ({ page }) => {

    const productPage = new ProductPage(page);
    await navigateToProduct(page, 'Makeup', 'Cheeks', 'BeneFit Girl Meets Pearl');
    await expect(productPage.productName).toHaveText('BeneFit Girl Meets Pearl');
});

test('shopper can add a product and update basket quantity', async ({ page }) => {

  const basketPage = new BasketPage(page);
  const productPage = new ProductPage(page);
    await navigateToProduct(page, 'Skincare', 'Cheeks', 'BeneFit Girl Meets Pearl');
    await expect(productPage.productName).toHaveText('BeneFit Girl Meets Pearl');

  await productPage.setQuantity(1);

  await productPage.addToCart();

  // Verify if basket has been displayed and product added
  await expect(basketPage.heading).toBeVisible();

  await expect(
    basketPage.productName('BeneFit Girl Meets Pearl')
  ).toBeVisible();

  await expect(
    basketPage.quantityInput('BeneFit Girl Meets Pearl')
  ).toHaveValue('1');

  // Update basket quantity
  await basketPage.updateQuantity('BeneFit Girl Meets Pearl', 2);

  await expect(
    basketPage.quantityInput('BeneFit Girl Meets Pearl')
  ).toHaveValue('2');
});

});