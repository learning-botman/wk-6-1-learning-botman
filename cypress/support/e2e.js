// cypress/support/e2e.js
import 'cypress-axe';

// Optional: custom command to run full a11y check and log violations
Cypress.Commands.add('a11yCheck', (context = null, options = null, failImpact = null) => {
  // failImpact: one of 'minor'|'moderate'|'serious'|'critical' or null to not fail
  const envFail = Cypress.env('AXE_FAIL_IMPACT');
  const threshold = failImpact || envFail || null;
  const IMPACT_ORDER = { minor: 1, moderate: 2, serious: 3, critical: 4 };

  cy.injectAxe();
  cy.checkA11y(context, options, (violations) => {
    if (!violations || violations.length === 0) return;

    // Log summary for CI/runner visibility
    // eslint-disable-next-line no-console
    console.groupCollapsed(`A11y Violations: ${violations.length}`);
    violations.forEach((v) => {
      // eslint-disable-next-line no-console
      console.error(`${v.id} [${v.impact}]: ${v.nodes.length} node(s)`);
    });
    // eslint-disable-next-line no-console
    console.groupEnd();

    if (threshold && IMPACT_ORDER[threshold]) {
      const threshVal = IMPACT_ORDER[threshold];
      const severe = violations.filter((v) => IMPACT_ORDER[v.impact] >= threshVal);
      if (severe && severe.length) {
        const msgs = severe.map((v) => `${v.id} [${v.impact}]: ${v.nodes.length}`).join('; ');
        throw new Error(`Accessibility failures (impact >= ${threshold}): ${msgs}`);
      }
    }
  });
});
