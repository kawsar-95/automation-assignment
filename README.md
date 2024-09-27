# Sauce Demo App Automation

This project automates testing of the Sauce Demo web application using **Playwright**. It covers functionalities like logging in, sorting products, adding items to the cart, and completing the checkout process. Additionally, **accessibility** and **visual** testing capabilities have been integrated to ensure the app is user-friendly and visually correct across pages. The **Page Object Model (POM)** design pattern is employed for code structure.

## Prerequisites

- **Node.js**: Ensure that you have the latest version installed. Download it from [Node.js](https://nodejs.org/).
- **Playwright**: The Playwright testing framework is used to automate browser actions. Learn more at [Playwright](https://playwright.dev/).
- **IDE**: It is recommended to use **Visual Studio Code** for development.

## Setup Instructions

1. **Clone this repository** using your preferred command line tool:

   ```bash
   git clone <repository-url>
   cd Sauce-Demo-App-Automation
   ```
2. **Install dependencies** and Playwright:

   ```bash
   npm install
   npm install @playwright/test
   ```

## Running Tests

### Functional Tests

1. **Test Execution**:
   i. **Headless mode**: Run the default set of functional tests using Playwright. Execute:

   ```bash
   npm run sauce-demo-test
   ```

   ii. **Headed mode**: Run the default set of functional tests using Playwright headed mode. Execute:

   ```bash
    npx playwright test --ui 
   ```
2. **Results**: View test reports after execution. A browser window will display a detailed breakdown of passed and failed tests.

### Accessibility Tests

1. **Accessibility Setup**: Use the **axe-core** library, integrated with Playwright, to check for accessibility issues on the web pages.
2. **How to Run Accessibility Tests**: Execute the following command to run accessibility tests independently:
   i. **Headless mode**: Run the default set of accessibility tests using Axe-Playwright. Execute:

   ```bash
   npm run accessibility-test
   ```

ii. **Headed mode**: Run the default set of accessibility tests using Axe-Playwright headed mode. Execute:

```bash
 npx playwright test --ui 
```

4. **Accessibility Report**: After the test run, an accessibility report is generated, highlighting any issues such as missing ARIA attributes, poor contrast ratios, or structural issues. The results are printed in the console for quick review.

#### **Accessibility Tests Overview**:

- **Scope**: Ensures the app is accessible to all users, including those using screen readers or other assistive technologies.
- **Checks**: The tests evaluate accessibility standards like keyboard navigation, ARIA landmarks, and semantic HTML.

### Visual Regression Tests

1. **Visual Testing Setup**: Use the **jest-image-snapshot** alongside **Playwright** to conduct visual regression testing, ensuring the UI maintains consistency across updates.
2. **How to Run Visual Tests**: Execute the visual comparison tests with:

   ```bash
   npm run visual-test
   ```
3. **Visual Comparison Report**: jest-image-snapshot captures screenshots of key UI elements and compares them to baseline images. Any differences will be highlighted in the report, pointing out deviations in layout, colors, or fonts.

#### **Visual Test Scenarios**:

- **Visual Consistency**: Ensures critical UI components (e.g., buttons, modals, product listings) remain visually unchanged after updates.
- **Baseline Images**: Stored in the `/backstop_data/bitmaps_reference` directory, these images are used for comparison.
- **Difference Reporting**: Highlights pixel-level differences between actual and expected UI states.

### Test Details

#### Overview

This suite tests various key functionalities of the Sauce Demo app, including logging in, sorting products, adding items to the cart, and checking out. The **Page Object Model (POM)** is used to organize test scripts for maintainability.

- **Login Test**: Verifies user authentication functionality.
- **Inventory Sorting**: Ensures products can be sorted by name (Z-A) and price (high to low).
- **Cart Management**: Adds multiple products to the cart and verifies the cart contents.
- **Checkout Process**: Completes the checkout process and validates order confirmation.

#### Test Scenarios

##### **Login Test**:

- Fills in login credentials and asserts that the user is logged in successfully.

##### **Sorting Tests**:

- Verifies that products are sorted correctly by name (Z-A) and by price (high to low).

##### **Cart Test**:

- Adds multiple items to the cart and verifies that all items are correctly listed in the cart.

##### **Checkout Test**:

- Completes the checkout process and confirms that the correct order confirmation message is displayed.

### Page Object Model (POM)

The pages are structured in the Page Object Model as follows:

- **LoginPage.js**: Manages login operations, including navigation and user authentication.
- **InventoryPage.js**: Handles product sorting and adding items to the cart.
- **CartPage.js**: Manages cart operations and initiates the checkout process.
- **CheckoutPage.js**: Completes the checkout process and verifies the order confirmation message.

### Best Practices

- **Page Object Model (POM)**: This design pattern enhances test maintainability and readability by separating page-specific actions into dedicated classes.
- **Separation of Concerns**: Tests focus on a single piece of functionality, making them easier to understand, debug, and maintain.
- **Reusability**: Common actions, such as logging in and sorting products, are encapsulated in reusable methods within their respective page classes.
- **Accessibility Testing**: Ensure that the app complies with accessibility standards, making it usable for all users.
- **Visual Regression Testing**: Incorporate visual regression testing to validate that the app's visual elements remain consistent and that no unintended UI changes occur.

## Reporting

- **Functional Tests**: Playwright generates a detailed report after test execution. View it by running:

  ```bash
  npx playwright show-report
  ```
- **Accessibility Report**: Accessibility issues will be highlighted directly in the console output.
- **Visual Report**: View the differences between baseline and actual images in the `/backstop_data/html` folder, generated by jest-image-snapshot.

---

## NB

This README provides a comprehensive guide for setting up and running the Sauce Demo App automation project, including functional, accessibility, and visual tests using Playwright and jest-image-snapshot.
