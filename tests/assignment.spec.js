import { test, expect } from '@playwright/test';
import { SauceDemoPage } from '../pageobjects/sauceDemoPage';
import testData from '../utils/testData.json';

const USERNAME = process.env.SAUCEDEMO_USERNAME || testData.users[0].username;
const PASSWORD = process.env.SAUCEDEMO_PASSWORD || testData.users[0].password;
const RUN_VISUAL_TESTS = process.env.RUN_VISUAL_TESTS === 'true';

test.describe('SauceDemo Tests', () => {
  let sauceDemoPage;

  test.beforeEach(async ({ page }) => {
    sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoPage.goto();
    await sauceDemoPage.login(USERNAME, PASSWORD);
  });

  test('Verify sorting order for Z-A', async ({ page }) => {
    await sauceDemoPage.selectSortingOption('za');
    const productNames = await sauceDemoPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);

    if (RUN_VISUAL_TESTS) {
      await page.waitForTimeout(1000); // Wait for 1 second before taking the screenshot
      await expect(page).toHaveScreenshot('screenshot-za.png');
    }

    const violations = await sauceDemoPage.analyzeAccessibility();
    expect(violations).toBeGreaterThanOrEqual(0);
  });

  test('Verify price order for high-low', async ({ page }) => {
    await sauceDemoPage.selectSortingOption('hilo');
    const productPrices = await sauceDemoPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);

    if (RUN_VISUAL_TESTS) {
      await page.waitForTimeout(1000); // Wait for 1 second before taking the screenshot
      await expect(page).toHaveScreenshot('screenshot-hilo.png');
    }

    const violations = await sauceDemoPage.analyzeAccessibility();
    expect(violations).toBeGreaterThanOrEqual(0);
  });

  test('Add multiple items to cart and validate checkout journey', async ({ page }) => {
    await sauceDemoPage.addItemToCart('sauce-labs-backpack');
    await sauceDemoPage.addItemToCart('sauce-labs-bike-light');
    await sauceDemoPage.goToCart();
    await sauceDemoPage.checkout(
      testData.checkoutDetails.firstName,
      testData.checkoutDetails.lastName,
      testData.checkoutDetails.postalCode
    );
    const confirmationMessage = await sauceDemoPage.getConfirmationMessage();
    expect(confirmationMessage).toBe(testData.checkoutDetails.confirmationMessage);

    if (RUN_VISUAL_TESTS) {
      await expect(page).toHaveScreenshot('screenshot-checkout.png');
    }

    const violations = await sauceDemoPage.analyzeAccessibility();
    expect(violations).toBeGreaterThanOrEqual(0);
  });
});