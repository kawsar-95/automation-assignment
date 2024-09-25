const { test, expect } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

test.describe('SauceDemo Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
  });

  test('Verify sorting order (Z to A)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'za');
    const productNames = await page.$$eval('.inventory_item_name', items =>
      items.map(item => item.textContent.trim())
    );
    const sorted = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sorted);


  });

  test('Verify price order (high to low)', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'hilo');
    const productPrices = await page.$$eval('.inventory_item_price', items =>
      items.map(item => parseFloat(item.textContent.replace('$', '')))
    );
    const sorted = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sorted);

  });

  test('Add multiple items to cart and validate checkout journey', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    const confirmationMessage = await page.textContent('.complete-header');
    expect(confirmationMessage).toBe('Thank you for your order!');

  });


});