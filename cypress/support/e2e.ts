// Runs ONCE before ALL specs start
before(() => {
  cy.log('🚀 Starting all test suites');
  cy.task('log', '🚀 Starting all test suites');
});

// Runs ONCE after ALL specs complete
after(() => {
  cy.log('🏁 All test suites completed');
  cy.task('log', '🏁 All test suites completed');
});