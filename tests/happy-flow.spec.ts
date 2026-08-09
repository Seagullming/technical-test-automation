import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';
import { BasketPage } from '../pages/BasketPage';

test.describe('Guest checkout', () => {

  test('shopper can add a product and update basket quantity', async ({ page }) => {

    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const basketPage = new BasketPage(page);

    const category = 'Makeup';
    const subcategory = 'Cheeks';
    const product = 'BeneFit Girl Meets Pearl';

    await homePage.goto();

    await homePage.openCategory(category);

    await categoryPage.openSubcategory(subcategory);

    await categoryPage.openProduct(product);

    await expect(productPage.productName).toHaveText(product);

    await productPage.setQuantity(1);

    await productPage.addToCart();

    // Verify if basket has been displayed and product added
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

});