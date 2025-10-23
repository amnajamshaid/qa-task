import { CounterPage } from "../../pages/CounterPage";

describe("Counter - basic", () => {
  beforeEach(() => {
    CounterPage.visit();
    CounterPage.see(0); // initial state
  });

  it("increments to 1 when clicking Increment once", () => {
    CounterPage.inc(1);
    CounterPage.see(1);
  });
});