import { CounterPage } from "../../pages/CounterPage";

describe("Counter - Basic Functionality (Expected to Pass)", () => {
  beforeEach(() => {
    CounterPage.visit();
    CounterPage.see(0); // initial state
  });

  describe("Initial State", () => {
    it("TC004: Should display 0 on application load", () => {
      // This test should pass - basic functionality works
      CounterPage.see(0);
    });

    it("TC005: Should have both buttons clickable initially", () => {
      // Test button accessibility
      cy.get("#increment-btn").should("be.visible").and("not.be.disabled");
      cy.get("#decrement-btn").should("be.visible").and("not.be.disabled");
    });
  });

  describe("Basic Increment Functionality", () => {
    it("TC006: Should increment from 0 to 1", () => {
      CounterPage.inc(1);
      CounterPage.see(1);
    });

    it("TC007: Should increment from 1 to 2", () => {
      CounterPage.inc(1);
      CounterPage.inc(1);
      CounterPage.see(2);
    });

    it("TC008: Should handle multiple increments correctly", () => {
      CounterPage.inc(5);
      CounterPage.see(5);
      CounterPage.inc(3);
      CounterPage.see(8);
    });
  });

  describe("UI/UX Functionality", () => {
    it("TC015: Should handle double-clicks correctly", () => {
      // Quick double-click
      cy.get("#increment-btn").dblclick();
      CounterPage.see(2); // Should increment twice
    });

    it("TC016: Should support keyboard navigation", () => {
      // Tab navigation test - focus on increment button
      cy.get("#increment-btn").focus();
      cy.focused().should("have.id", "increment-btn");
    });

    it("TC017: Should respond to keyboard activation", () => {
      cy.get("#increment-btn").focus().type("{enter}");
      CounterPage.see(1);
    });
  });

  describe("Data Integrity", () => {
    it("TC018: Should handle larger numbers correctly", () => {
      CounterPage.inc(10);
      CounterPage.see(10);
      CounterPage.inc(5);
      CounterPage.see(15);
    });

    it("TC019: Should maintain accuracy with rapid clicking", () => {
      // Rapid clicking test
      for (let i = 0; i < 10; i++) {
        cy.get("#increment-btn").click({ force: true });
      }
      CounterPage.see(10);
    });
  });
});