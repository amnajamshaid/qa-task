import { CounterPage } from "../../pages/CounterPage";

describe("Counter - Requirements Validation", () => {
  beforeEach(() => {
    CounterPage.visit();
    CounterPage.see(0); // initial state
  });

  describe("Critical Requirement: Positive Numbers Only", () => {
    it("TC001: Should NOT allow negative numbers when decrementing from 0", () => {
      // Start at 0, try to decrement
      CounterPage.dec(1);
      // REQUIREMENT: Should stay at 0 (positive only)
      CounterPage.see(0); // This will FAIL - demonstrates the bug
    });

    it("TC002: Should stay at 0 when decrementing multiple times from 0", () => {
      // Multiple decrements from 0
      CounterPage.dec(5);
      // REQUIREMENT: Should never go below 0
      CounterPage.see(0); // This will FAIL - shows bug with multiple clicks
    });

    it("TC003: Should handle decrement from 1 correctly", () => {
      // Increment to 1, then decrement
      CounterPage.inc(1);
      CounterPage.see(1);
      CounterPage.dec(1);
      // This should work correctly
      CounterPage.see(0); // This should PASS
    });
  });

  describe("Boundary Value Testing", () => {
    it("TC009: Should handle 0→decrement→increment sequence correctly", () => {
      CounterPage.dec(1); // Try to go negative
      CounterPage.see(0); // Should stay 0 (WILL FAIL)
      CounterPage.inc(1); // Then increment
      CounterPage.see(1); // Should show 1
    });

    it("TC010: Should handle 1→decrement→increment sequence correctly", () => {
      CounterPage.inc(1); // Go to 1
      CounterPage.dec(1); // Back to 0
      CounterPage.see(0);
      CounterPage.inc(1); // Up to 1
      CounterPage.see(1);
    });

    it("TC011: Should never go negative with excessive decrements", () => {
      CounterPage.inc(2); // Start at 2
      CounterPage.dec(10); // Try to go way negative
      // REQUIREMENT: Should stop at 0
      CounterPage.see(0); // This will FAIL - demonstrates major bug
    });
  });

  describe("Rapid Operations Testing", () => {
    it("TC013: Should handle mixed increment/decrement operations correctly", () => {
      CounterPage.inc(5); // Go to 5
      CounterPage.see(5);
      CounterPage.dec(10); // Try to go negative
      // REQUIREMENT: Should stop at 0, not go to -5
      CounterPage.see(0); // This will FAIL
    });

    it("TC014: Should prevent negative values in complex scenarios", () => {
      CounterPage.inc(3); // Start at 3
      CounterPage.dec(3); // Back to 0
      CounterPage.see(0);
      CounterPage.dec(5); // Try to go negative
      // REQUIREMENT: Should stay at 0
      CounterPage.see(0); // This will FAIL
    });
  });
});