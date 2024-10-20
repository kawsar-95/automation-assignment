const AxeBuilder = require('@axe-core/playwright').default;

class SauceDemoPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }

  async selectSortingOption(option) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async getProductNames() {
    return await this.page.$$eval('.inventory_item_name', items =>
      items.map(item => item.textContent.trim())
    );
  }

  async getProductPrices() {
    return await this.page.$$eval('.inventory_item_price', items =>
      items.map(item => parseFloat(item.textContent.replace('$', ''))));
  }

  async addItemToCart(item) {
    await this.page.click(`[data-test="add-to-cart-${item}"]`);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async checkout(firstName, lastName, postalCode) {
    await this.page.click('[data-test="checkout"]');
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
    await this.page.click('[data-test="finish"]');
  }

  async getConfirmationMessage() {
    return await this.page.textContent('.complete-header');
  }

  async analyzeAccessibility() {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page }).analyze();
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility Violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    }
    return accessibilityScanResults.violations.length;
  }
}

module.exports = { SauceDemoPage };