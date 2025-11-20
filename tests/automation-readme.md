# Automation README

This document explains how to run the Cypress end-to-end tests for the Book Store app.

## Install

Open a terminal in the project root and run:

```powershell
npm install
```

(If `cypress` was added to `devDependencies`, the above will install it.)

## Run the app locally

Start the dev server:

```powershell
npm start
```

Open a second terminal to run tests.

## Run Cypress (headed)

```powershell
npm run cypress:open
```

This opens the Cypress Test Runner UI where you can run tests interactively.

## Run Cypress (headless)

```powershell
npm run cypress:run
# or
npm run test:e2e
```

## Notes

- Tests assume the app is available at `http://localhost:3000`.
- The example test writes and reads `localStorage` (orders) to assert that a Pending order was created.
- If the Paystack window blocks test execution, tests stop at the payment initiation and still assert localStorage. Consider mocking or stubbing payment calls for CI.

## Troubleshooting

- If `cypress` is not installed, run `npm install --save-dev cypress@^13.0.0`.
- On Windows, if tests fail due to timing, increase timeouts in `cypress.config.js` or add `cy.wait()` temporarily for flakey steps.
