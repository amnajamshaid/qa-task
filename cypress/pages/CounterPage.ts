const sel = {
  counter: "#counter",
  inc: "#increment-btn",
  dec: "#decrement-btn",
};

export const CounterPage = {
  visit() {
    cy.visit("/");
  },
  see(n: number) {
    cy.get(sel.counter).should("have.text", String(n));
  },
  inc(times = 1) {
    for (let i = 0; i < times; i++) cy.get(sel.inc).click();
  },
  dec(times = 1) {
    for (let i = 0; i < times; i++) cy.get(sel.dec).click();
  }
};
