# Playwright Test Automation

This repository contains automated tests built using [Playwright](https://playwright.dev/).

## Prerequisites

Before running the Playwright tests, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v12.0.0 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

Follow these steps to install dependencies and run the Playwright tests.

### 1. Clone the repository

```bash
git clone https://github.com/kawsar-95/automation-assignment.git
cd <repository-directory>
```

### 2. Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Install Playwright Browsers

Playwright comes with its own set of browsers. To install them, use:

```bash
npx playwright install
```

### 4. Run Playwright Tests

To run all Playwright tests, execute the following command:

```bash
npm test
```

### 5. Run a Specific Test File

To run a specific test, you can specify the file path like this:

```bash
npx playwright test tests/assignment.spec.js
```

### 6. View Test Report

Playwright generates a test report that you can view in your browser. After running the tests, open the HTML report using:

```bash
npx playwright show-report
```

### 7. Debug Mode

You can run tests in headed mode (with the browser UI) for debugging:

```bash
npx playwright test --headed
```

### 8. Running Tests with Trace Viewer

To enable tracing for debugging purposes:

```bash
npx playwright test --trace on
```

After running tests with traces, open the trace viewer using:

```bash
npx playwright show-trace <trace-file>
```

## Folder Structure

```bash
.
├── .github/                   # GitHub Actions workflows
│   └── workflows/
├── ManualTesting/             # Manual testing documents
├── node_modules/              # Node.js modules
├── pageobjects/               # Page Object Models
│   └── sauceDemoPage.js
├── playwright-report/         # Playwright test reports
├── test-results/              # Test results
├── tests/                     # Test files
│   └── assignment.spec.js
│   └── assignment.spec.js-snapshots
├── utils/                     # Utility files
├── .gitignore                 # Git ignore file
├── package.json               # Node.js dependencies and scripts
├── playwright.config.js       # Playwright configuration file
└── README.md                  # This file
```

## Key Sections

1. **Prerequisites:** Basic tools required to run the Playwright tests.
2. **Installation and Running Tests:** Commands for setup, installation, and running tests.
3. **Running Specific Tests, Reports, and Debugging:** Instructions to run specific tests, view reports, and debug.
4. **Folder Structure:** Outline of your project structure to help navigate through files.

## Learn More

For more information on Playwright, visit the official [documentation](https://playwright.dev/docs/intro).