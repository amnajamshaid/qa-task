import { defineConfig } from "cypress";  

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    video: true,
    retries: { runMode: 1, openMode: 0 },
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {
      // Task for logging in both GUI and headless modes
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    }
  }
});