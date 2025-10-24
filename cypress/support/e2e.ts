import 'cypress-mochawesome-reporter/register';

// Note: Cypress runs these hooks once PER SPEC FILE, not once for entire test run
// This is Cypress limitation - there's no true "global before/after all specs" hook

before(() => {
  const specName = Cypress.spec.name;
  cy.log(`� Starting spec: ${specName}`);
  cy.task('log', `� Starting spec: ${specName}`);
});

after(() => {
  const specName = Cypress.spec.name;
  cy.log(`✅ Completed spec: ${specName}`);  
  cy.task('log', `✅ Completed spec: ${specName}`);
});

// Per-test logging (runs before/after each individual test)
beforeEach(function () {
  const testName = this.currentTest?.fullTitle();
  cy.log(`🧪 START: ${testName}`);
  cy.task('log', `🧪 START: ${testName}`);
});

afterEach(function () {
  const testName = this.currentTest?.fullTitle();
  const testState = this.currentTest?.state;
  cy.log(`${testState === 'passed' ? '✅' : '❌'} END: ${testName} - ${testState}`);
  cy.task('log', `${testState === 'passed' ? '✅' : '❌'} END: ${testName} - ${testState}`);
});