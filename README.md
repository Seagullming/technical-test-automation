# Technical Test Automation

This repository contains Playwright end-to-end tests and reporting setup used for a technical test automation exercise.

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js v24.19.0
- npm v11.17.0
- Git

All project dependencies, including Playwright and Allure reporting packages, are installed via npm.

## Installation

1. Clone the project repository:

```bash
git clone https://github.com/Seagullming/technical-test-automation.git
```

2. Change into the project directory:

```bash
cd <path-to-your-cloned-repository>/technical-test-automation
```

3. Install project dependencies and Playwright browsers:

```bash
npm ci
npx playwright install
```

## Running Test Cases

Run a specific test file from the command line:

```bash
npx playwright test tests/guest-checkout.spec.ts
```

Or run Playwright's interactive test UI:

```bash
npx playwright test --ui
```

To run the full test suite:

```bash
npx playwright test
```

## Test Reports

The project uses Allure as the main report format. Playwright's default HTML report is also available.

### Allure Report (Recommended)

Generate and serve the Allure report after running tests:

```bash
npx allure serve allure-results
```

### Playwright Default Report

Open Playwright's HTML report with:

```bash
npx playwright show-report
```

## Assumptions and trade-offs

- The selected products on the demo website are assumed to remain available.
- The basket test relies on a known product price. This keeps the expected result deterministic but requires updates if the website changes prices.
- Guest checkout data is stored in CSV so test data can be updated without modifying test code.
- Automation focuses on main flows and high-priority validation scenarios rather than covering every possible edge case.
- Tests are focused on desktop browsers; mobile testing is in scope for future work.
