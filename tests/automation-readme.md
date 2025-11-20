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

- Accessibility checks (axe): this project integrates `cypress-axe` and runs a11y checks during the checkout spec. If violations are found, the tests will log violations and may fail depending on the `checkA11y` options. To run with axe locally ensure you have the devDependency installed.

## Running with Accessibility Checks

No extra flags required; accessibility checks run as part of the example checkout spec. To run only the checkout spec:


## Troubleshooting


If you want to collect more detailed axe reports, we can add a reporter step to capture violations to a JSON file and upload as CI artifacts.

## Fail build policy
The tests include a configuration to fail the test run only when violations of a configured impact or above are detected. The default used in the a11y spec is `serious` which means only `serious` and `critical` violations will fail the run.

You can control the fail threshold in three ways:
- Pass an argument to the helper in-spec: `cy.a11yCheck(null, null, 'critical')`
- Set an environment variable for CI: `CYPRESS_AXE_FAIL_IMPACT=serious npx cypress run`
- Change the default in `cypress/support/e2e.js`.

When a failing violation is found the test will throw with a short summary of failing rule IDs and impacts. For CI runs we can also capture the full axe result JSON and upload it as an artifact — tell me if you want that added.
- If `cypress` is not installed, run `npm install --save-dev cypress@^13.0.0`.
- On Windows, if tests fail due to timing, increase timeouts in `cypress.config.js` or add `cy.wait()` temporarily for flakey steps.
