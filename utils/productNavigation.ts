import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';

export async function navigateToProduct(
  page: Page,
  category: string,
  product: string,
  subcategory?: string
) {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);

  await homePage.goto();
  await homePage.openCategory(category);

  if (subcategory) {
    await categoryPage.openSubcategory(subcategory);
  }

  await categoryPage.openProduct(product);
}