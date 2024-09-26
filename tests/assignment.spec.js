const { test, expect } = require('@playwright/test');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { SauceDemoPage } = require('../pageobjects/sauceDemoPage');
const testData = require('../utils/testData');

expect.extend({ toMatchImageSnapshot });

const USERNAME = process.env.SAUCEDEMO_USERNAME || testData.users[0].username;
const PASSWORD = process.env.SAUCEDEMO_PASSWORD || testData.users[0].password;

test.describe('SauceDemo Tests', () => {
  let sauceDemoPage;

  test.beforeEach(async ({ page }) => {
    sauceDemoPage = new SauceDemoPage(page);
    await sauceDemoPage.goto();
    await sauceDemoPage.login(USERNAME, PASSWORD);
  });

  testData.sortingOptions.forEach(({ option, snapshot }) => {
    test(`Verify sorting order (${option})`, async ({ page }) => {
      await sauceDemoPage.selectSortingOption(option);
      const productNames = await sauceDemoPage.getProductNames();
      const sorted = [...productNames].sort((a, b) => b.localeCompare(a));
      expect(productNames).toEqual(sorted);

      expect(await page.screenshot()).toMatchSnapshot(snapshot);
      const violations = await sauceDemoPage.analyzeAccessibility();
      expect(violations).toBeGreaterThanOrEqual(0);
    });
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

    expect(await page.screenshot()).toMatchSnapshot(testData.checkoutDetails.snapshot);
    const violations = await sauceDemoPage.analyzeAccessibility();
    expect(violations).toBeGreaterThanOrEqual(0);
  });
});