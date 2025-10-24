# Counter App – QA Automation Framework

> End-to-end test automation suite for a simple Counter web application, validating business requirements and demonstrating quality-first engineering practices with Cypress, TypeScript, and CI/CD integration.

---

## 📋 Executive Summary

**What this does:**  
Comprehensive E2E testing framework for a Counter web application that validates critical business requirements (non-negative constraint), basic functionality, and edge cases including rapid interactions, keyboard accessibility, and boundary value scenarios.

**Tech Stack:**
- **Testing Framework:** Cypress 15.5.0
- **Language:** TypeScript 5.9.3
- **Reporting:** Mochawesome (HTML + JSON)
- **CI/CD:** GitHub Actions (multi-browser matrix)
- **Server:** http-server (static file serving)
- **Pattern:** Page Object Model (POM)

**Why it matters:**
- ✅ **Requirements-first approach** – Tests written to validate business rules before implementation
- ✅ **Fast feedback loop** – Parallel execution with Chrome & Firefox in CI
- ✅ **High visibility** – Beautiful HTML reports with screenshots/videos for failed tests
- ✅ **Production-ready** – Clean architecture, TypeScript safety, maintainable patterns

---

## 🚀 Quick Start

### Prerequisites
- **Node.js:** v18.x or v20.x
- **npm:** 8.x or higher
- **OS:** Windows, macOS, or Linux

### Installation

```bash
# Clone the repository
git clone https://github.com/amnajamshaid/qa-task.git
cd qa-task

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests headless + generate HTML report (continues even if tests fail)
npm run test:report

# Open Cypress Test Runner (interactive GUI for local debugging)
npm run test:gui

# Run tests headless without report generation
npm run test:smoke

# Individual commands
npm run clean:reports        # Clean old reports
npm run merge:reports        # Merge JSON reports
npm run generate:report      # Generate HTML report
```

### Viewing Reports

**Local:**
- HTML Report: `cypress/reports/html/index.html`
- JSON Reports: `cypress/reports/mochawesome/`

**GitHub Actions:**
- Navigate to **Actions** tab → Select workflow run
- Scroll to **Artifacts** section
- Download `test-report-chrome` or `test-report-firefox`
- Open `index.html` in browser

**Application Under Test:**
- Local dev server: `http://localhost:3000` (auto-started by test scripts)
- Configurable via `BASE_URL` environment variable

---

## 📁 Project Structure

```
qa-task/
│
├── task/                              # Application Under Test (AUT)
│   └── index.html                     # Simple counter web app
│
├── cypress/
│   ├── e2e/
│   │   └── counter/
│   │       ├── basic-functionality.cy.ts        # Tests for working features (10 tests)
│   │       └── requirements-validation.cy.ts    # Tests for critical requirements (8 tests)
│   │
│   ├── pages/
│   │   └── CounterPage.ts             # Page Object Model for Counter
│   │
│   ├── support/
│   │   └── e2e.ts                     # Global config, custom commands, hooks
│   │
│   ├── reports/
│   │   ├── mochawesome/               # JSON reports per spec
│   │   └── html/                      # Merged HTML report
│   │
│   ├── screenshots/                   # Auto-captured on test failure
│   └── videos/                        # Full test execution recordings
│
├── test-plan/
│   └── edge-cases.md                  # Test strategy, edge cases, rationale
│
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions pipeline (Chrome + Firefox)
│
├── cypress.config.ts                  # Cypress configuration
├── tsconfig.json                      # TypeScript compiler configuration
├── package.json                       # Dependencies & NPM scripts
├── .gitignore                         # Git ignore rules
└── README.md                          # This file
```

---

## 🎯 How to Run (Local & CI)

### Local Execution

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run test:report` | **Recommended** – Cleans reports, runs all tests headless, generates HTML report | Daily regression, pre-commit |
| `npm run test:gui` | Opens Cypress GUI with live reload | Local debugging, test development |
| `npm run test:smoke` | Headless test run without report generation | Quick validation |

### CI Execution (GitHub Actions)

**Trigger Events:**
- Push to `main` branch
- Pull requests targeting `main`

**Pipeline Steps:**
1. Checkout code
2. Setup Node.js 20.x with npm cache
3. Install dependencies (`npm ci`)
4. Start application server (`http-server` on port 3000)
5. Run Cypress tests in **Chrome** and **Firefox** (parallel matrix)
6. Clean & merge Mochawesome JSON reports
7. Generate consolidated HTML report
8. Upload artifacts:
   - HTML reports (`test-report-chrome`, `test-report-firefox`)
   - Videos (`cypress-videos-chrome`, `cypress-videos-firefox`)
   - Screenshots (`cypress-screenshots-chrome`, `cypress-screenshots-firefox`)

**Key Features:**
- ✅ `continue-on-error: true` – Pipeline continues even if tests fail
- ✅ `if: always()` – Artifacts uploaded regardless of test outcome
- ✅ Multi-browser matrix – Chrome & Firefox validated in parallel

---

## ⚙️ Configuration

### Base URL
- **Default:** `http://localhost:3000`
- **Override:** Set `BASE_URL` environment variable or modify `cypress.config.ts`

```typescript
// cypress.config.ts
baseUrl: process.env.BASE_URL || "http://localhost:3000"
```

### Environment Variables

```bash
# Override base URL
export BASE_URL=http://localhost:8080

# Cypress-specific vars
export CYPRESS_VIDEO=true
```

### Selectors Strategy
- **Preferred:** ID selectors (`#counter`, `#increment-btn`, `#decrement-btn`)
- **Why:** Application uses IDs; stable and performant
- **Future:** Migrate to `[data-cy="..."]` attributes for test stability during UI refactoring

### Reporter Configuration

```typescript
// cypress.config.ts
reporter: "mochawesome",
reporterOptions: {
  reportDir: "cypress/reports/mochawesome",
  overwrite: false,      // Keep individual spec reports
  html: false,           // Generate HTML after merge
  json: true,            // Generate JSON for merging
  timestamp: "mmddyyyy_HHMMss"  // Unique filenames
}
```

---

## 🧪 Test Strategy & Coverage

### Scope
**Application:** Counter web component with increment/decrement buttons  
**Critical Requirement:** Counter must only display **positive numbers** (≥ 0)

### Test Levels
- **Primary:** UI End-to-End (E2E) testing via Cypress
- **Approach:** Black-box testing with minimal mocking
- **Realistic Behavior:** Tests interact with actual DOM and JavaScript logic

### Coverage Breakdown

#### 1️⃣ **Requirements Validation Tests** (`requirements-validation.cy.ts`) – 8 Tests
Tests that validate the **critical non-negative constraint**. Many tests intentionally **FAIL** to demonstrate bugs.

| Test ID | Description | Expected Result | Status |
|---------|-------------|-----------------|--------|
| TC001 | Decrement from 0 should stay at 0 | Counter = 0 | ❌ FAILS (shows -1) |
| TC002 | Multiple decrements from 0 should stay at 0 | Counter = 0 | ❌ FAILS (shows -5) |
| TC003 | Decrement from 1 correctly returns to 0 | Counter = 0 | ✅ PASSES |
| TC009 | 0→decrement→increment sequence | Counter = 0 then 1 | ❌ FAILS |
| TC010 | 1→decrement→increment sequence | Correct transitions | ✅ PASSES |
| TC011 | Excessive decrements should floor at 0 | Counter = 0 | ❌ FAILS |
| TC013 | Mixed inc/dec operations handle negatives | Counter = 0 | ❌ FAILS |
| TC014 | Complex scenarios prevent negatives | Counter = 0 | ❌ FAILS |

**Key Insight:** 6/8 tests fail, proving the application **does not enforce** the positive-only requirement.

#### 2️⃣ **Basic Functionality Tests** (`basic-functionality.cy.ts`) – 10 Tests
Tests for features that work correctly.

| Category | Test IDs | Coverage |
|----------|----------|----------|
| **Initial State** | TC004, TC005 | Loads at 0, buttons enabled |
| **Increment** | TC006, TC007, TC008 | Single, multiple, sequential increments |
| **UI/UX** | TC015, TC016, TC017 | Double-click, keyboard nav, Enter/Space activation |
| **Data Integrity** | TC018, TC019 | Large numbers, rapid clicking accuracy |

**Result:** All 10 tests **PASS**, confirming basic increment functionality works.

### Priority Levels

| Priority | Description | Test Count | Example |
|----------|-------------|------------|---------|
| **P0** | Critical business rule | 6 | Non-negative constraint |
| **P1** | Core functionality | 8 | Increment/decrement operations |
| **P2** | UX/Accessibility | 4 | Keyboard support, rapid clicks |

### Non-Goals (Future Work)
- ❌ Cross-device visual regression testing (Percy, Applitools)
- ❌ Full WCAG 2.1 accessibility audit (axe-core integration planned)
- ❌ Performance testing (load time, rendering metrics)
- ❌ API mocking (no backend in this app)

---

## 🗺️ Traceability Matrix

**Requirements ↔ Test Cases ↔ Spec Files**

| Req ID | Requirement (Plain English) | Test Case ID | Spec File | Status |
|--------|----------------------------|--------------|-----------|--------|
| **R-001** | Counter initializes at 0 on page load | TC004 | `basic-functionality.cy.ts` | ✅ PASS |
| **R-002** | Increment button increases counter by 1 | TC006, TC007, TC008 | `basic-functionality.cy.ts` | ✅ PASS |
| **R-003** | **Counter value must never be negative** | TC001, TC002, TC009, TC011, TC013, TC014 | `requirements-validation.cy.ts` | ❌ FAIL |
| **R-004** | Decrement button decreases counter by 1 (when > 0) | TC003, TC010 | `requirements-validation.cy.ts` | ✅ PASS |
| **R-005** | Rapid clicking maintains count accuracy | TC019 | `basic-functionality.cy.ts` | ✅ PASS |
| **R-006** | Keyboard (Enter/Space) activates buttons | TC016, TC017 | `basic-functionality.cy.ts` | ✅ PASS |
| **R-007** | Double-click handles multiple events correctly | TC015 | `basic-functionality.cy.ts` | ✅ PASS |
| **R-008** | Buttons are visible and enabled initially | TC005 | `basic-functionality.cy.ts` | ✅ PASS |

**Full test steps and expected results:** See `test-plan/edge-cases.md`

---

## 📊 Reporting

### Mochawesome HTML Reports

**Features:**
- 📈 **Charts & Graphs** – Pass/fail pie charts, duration graphs
- 🖼️ **Screenshots** – Automatically embedded in report for failed tests only
- 📹 **Videos** – Full test execution videos saved separately (see artifacts)
- 🔍 **Stack Traces** – Detailed error messages with line numbers
- ⏱️ **Timing** – Execution time per test and suite

**What Gets Attached to Failed Tests:**
- ✅ **Screenshots** - Embedded directly in HTML report at point of failure
- ✅ **Videos** - Separate .mp4 files in `cypress/videos/` (full test run)
- ✅ **Error Stack Trace** - Full error details with line numbers

**Report Generation Flow:**

```
Run Tests → Generate JSON per spec → Merge JSONs → Generate HTML Report → cypress/reports/html/index.html
```

**NPM Scripts:**
```json
{
  "clean:reports": "Delete old reports before test run",
  "merge:reports": "Merge all mochawesome*.json into report.json",
  "generate:report": "Convert merged JSON to HTML with charts",
  "test:report": "Full pipeline: clean → test → merge → generate"
}
```

**CI Artifacts:**
- Reports persist for 90 days in GitHub Actions
- Downloadable as ZIP archives
- No login required for artifact download (public repos)

---

## 🎨 Design Decisions (The "Why")

### Why Cypress (vs. Selenium/WebDriver)?

| Feature | Cypress | Selenium |
|---------|---------|----------|
| **Setup** | Zero config, single binary | Complex driver management |
| **Async Handling** | Built-in retryability | Manual `WebDriverWait`, brittle |
| **Debugging** | Time-travel debugger, live reload | Browser DevTools only |
| **Speed** | Runs in browser, direct DOM access | Network overhead, slower |
| **CI Integration** | Official GitHub Action | Custom scripts needed |
| **Trade-offs** | Single browser instance, no multi-tab | Full browser automation, complex flows |

**Decision:** Cypress for faster development, better DX, and built-in waiting strategies. Selenium would be preferred for legacy browser support or complex multi-window scenarios.

---

### Why TypeScript (vs. JavaScript)?

✅ **Type Safety** – Catch errors at compile time  
✅ **IntelliSense** – Auto-completion for Cypress commands  
✅ **Refactoring Confidence** – Rename variables safely across files  
✅ **Maintainability** – Self-documenting code with interfaces  

**Example:**
```typescript
// TypeScript ensures correct types
CounterPage.see(0);      // ✅ number
CounterPage.see("0");    // ❌ Compile error

// JavaScript allows runtime errors
CounterPage.see("0");    // ✅ No error until runtime
```

---

### Why Page Object Model (POM)?

**Without POM (Inline Selectors):**
```typescript
it("should increment", () => {
  cy.get("#increment-btn").click();
  cy.get("#counter").should("have.text", "1");
});
```

**Problems:**
- ❌ Selector duplication across tests
- ❌ Hard to update if UI changes
- ❌ Tests coupled to DOM structure

**With POM:**
```typescript
// cypress/pages/CounterPage.ts
export const CounterPage = {
  inc(times = 1) { /* ... */ },
  see(n: number) { /* ... */ }
};

// In test
it("should increment", () => {
  CounterPage.inc(1);
  CounterPage.see(1);
});
```

**Benefits:**
- ✅ Single source of truth for selectors
- ✅ Readable, business-language tests
- ✅ Easy maintenance (change selector once)
- ✅ Reusable methods (`.inc(5)`, `.dec(3)`)

---

### Why Mochawesome (vs. Default Spec Reporter)?

| Feature | Mochawesome | Spec Reporter |
|---------|-------------|---------------|
| **Format** | HTML + JSON | Console only |
| **Charts** | Yes (pie, bar) | No |
| **Screenshots** | Embedded | Separate files |
| **Shareable** | Yes (single HTML) | No |
| **CI Friendly** | Artifact upload | Logs only |

**Decision:** Mochawesome for stakeholder visibility and CI artifact storage.

---

### Why ID Selectors (vs. `data-cy` attributes)?

**Current:**
```typescript
cy.get("#increment-btn")
```

**Best Practice:**
```html
<button data-cy="increment">Increment</button>
```
```typescript
cy.get("[data-cy='increment']")
```

**Reasoning:**
- **Current:** App uses IDs; changing would require code modification
- **Trade-off:** IDs are stable in this simple app but risky if IDs are reused or dynamic
- **Future:** Migrate to `data-cy` for test-only selectors resilient to CSS/styling changes

---

## 🔧 Extensibility & Maintenance

### Adding New Tests

1. **Create spec file:**
   ```bash
   cypress/e2e/counter/new-feature.cy.ts
   ```

2. **Use Page Object:**
   ```typescript
   import { CounterPage } from "../../pages/CounterPage";

   describe("New Feature", () => {
     it("should do X", () => {
       CounterPage.visit();
       // Your test logic
     });
   });
   ```

3. **Run tests:**
   ```bash
   npm run test:report
   ```

---

### Custom Commands

**Define in `cypress/support/e2e.ts`:**
```typescript
declare namespace Cypress {
  interface Chainable {
    incrementBy(n: number): void;
  }
}

Cypress.Commands.add("incrementBy", (n: number) => {
  for (let i = 0; i < n; i++) {
    cy.get("#increment-btn").click();
  }
});
```

**Use in tests:**
```typescript
cy.incrementBy(5); // Custom command
```

---

### Scaling & Performance

**Current:** ~18 tests, ~2 min execution time

**Optimization Strategies:**

| Technique | Implementation | Benefit |
|-----------|----------------|---------|
| **Parallelization** | GitHub Actions matrix + `--parallel` flag | 50% faster |
| **Test Tagging** | `@smoke`, `@regression` in test names | Run subsets |
| **Spec Sharding** | `--spec` pattern in CI | Distribute load |
| **Smart Retries** | `retries: { runMode: 1 }` | Reduce flakiness |

**Example Parallel Execution:**
```yaml
# .github/workflows/ci.yml
strategy:
  matrix:
    browser: [chrome, firefox, edge]
    shard: [1, 2, 3]
```

---

## ♿ Accessibility & Quality Notes

### Current Coverage
✅ **Keyboard Navigation** – Enter/Space activates buttons (TC016, TC017)  
✅ **Focus Management** – Buttons are focusable  
⚠️ **ARIA Labels** – Not tested (app lacks `aria-label`)  
⚠️ **Color Contrast** – Not validated  

### Future Work
- [ ] Integrate **axe-core** plugin for automated a11y checks
- [ ] Validate WCAG 2.1 Level AA compliance
- [ ] Screen reader testing (NVDA, JAWS)

**Example axe-core integration:**
```typescript
import "cypress-axe";

it("should have no a11y violations", () => {
  CounterPage.visit();
  cy.injectAxe();
  cy.checkA11y();
});
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Symptom:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Option 1: Kill process on port 3000
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# macOS/Linux
lsof -ti:3000 | xargs kill

# Option 2: Change port in package.json
"start": "http-server task -p 8080 -c-1"
# Update start-server-and-test URL too
```

---

### Empty or Corrupted Report

**Symptom:** `SyntaxError: Unexpected end of JSON input`

**Cause:** Old `report.json` file interfering with merge

**Solution:**
```bash
# Manual cleanup
npm run clean:reports

# Already handled in test:report script
```

---

### CI Test Flakiness

**Common Causes:**
1. **Network delays** – App server not fully ready
2. **Timing issues** – Assertions run before DOM updates
3. **Resource contention** – Parallel tests competing

**Solutions:**
```typescript
// ✅ GOOD: Built-in retry
cy.get("#counter").should("have.text", "5");

// ❌ BAD: No retry
expect(cy.get("#counter").text()).to.equal("5");

// ✅ GOOD: Explicit wait for server
cy.visit("/", { timeout: 10000 });
```

---

### Screenshots Not Captured

**Symptom:** No screenshots folder after test failures

**Check:**
1. `cypress.config.ts` has `screenshotsFolder` (default: `cypress/screenshots`)
2. Tests are actually failing (screenshots only on failure)
3. Run locally first: `npm run test:report`

**Force screenshot:**
```typescript
cy.screenshot("debug-counter-state");
```

---

## 🚀 Future Work

### High Priority
- [ ] **Parallelization in CI** – Use `cypress-parallel` or GitHub matrix sharding
- [ ] **Per-PR Comment Bot** – Post test summary + report link on PRs
- [ ] **Cross-Browser Matrix** – Add Edge, Safari (via BrowserStack/Sauce Labs)
- [ ] **Flake Detection** – Track retry rates, flag unstable tests

### Medium Priority
- [ ] **Visual Regression** – Integrate Percy or Applitools for UI snapshots
- [ ] **Accessibility Automation** – `cypress-axe` for WCAG checks
- [ ] **Test Data Factories** – Generate dynamic test data for complex UIs
- [ ] **Performance Metrics** – Lighthouse CI for load time tracking

### Low Priority
- [ ] **Allure Reporting** – Alternative to Mochawesome with history tracking
- [ ] **Docker Environment** – Containerize app + tests for consistency
- [ ] **Component Testing** – Cypress Component Testing for isolated button tests

---

## 📚 Appendix

### NPM Scripts Reference

```json
{
  "start": "http-server task -p 3000 -c-1",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run",
  "test:smoke": "start-server-and-test start http://localhost:3000 cypress:run",
  "test:gui": "start-server-and-test start http://localhost:3000 cypress:open",
  "clean:reports": "node -e \"const fs = require('fs'); const dir = 'cypress/reports'; if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });\"",
  "merge:reports": "mochawesome-merge cypress/reports/mochawesome/mochawesome*.json > cypress/reports/mochawesome/report.json",
  "generate:report": "marge cypress/reports/mochawesome/report.json -f index -o cypress/reports/html",
  "test:report": "npm run clean:reports && npm run test:smoke || (npm run merge:reports && npm run generate:report)"
}
```

**Script Breakdown:**

| Script | Description | When to Use |
|--------|-------------|-------------|
| `start` | Serve app on port 3000 | Manual testing |
| `cypress:open` | Open Cypress GUI | Local development |
| `cypress:run` | Headless test execution | CI, quick checks |
| `test:smoke` | Full test suite with server startup | Pre-commit |
| `test:gui` | GUI with server startup | Debugging |
| `clean:reports` | Delete old reports | Before fresh run |
| `merge:reports` | Combine JSON reports | Post-test |
| `generate:report` | Create HTML from JSON | Post-merge |
| `test:report` | **Main command** – Clean, test, report | Daily use |

---

### Key Files & Their Purpose

| File | Purpose | When to Modify |
|------|---------|----------------|
| `cypress.config.ts` | Cypress configuration (baseUrl, retries, reporter) | Changing URLs, adding plugins |
| `tsconfig.json` | TypeScript compiler options | Changing module resolution |
| `package.json` | Dependencies & scripts | Adding packages, scripts |
| `.github/workflows/ci.yml` | GitHub Actions pipeline | Changing CI behavior |
| `cypress/pages/CounterPage.ts` | Page Object Model | New UI elements |
| `cypress/support/e2e.ts` | Global hooks, custom commands | Shared test logic |
| `test-plan/edge-cases.md` | Test strategy documentation | New requirements |

---

### Badges (Placeholder)

Replace with real URLs once deployed:

```markdown
![CI Status](https://github.com/amnajamshaid/qa-task/workflows/verify/badge.svg)
![Cypress](https://img.shields.io/badge/cypress-15.5.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)
![License](https://img.shields.io/badge/license-ISC-lightgrey)
```

**Live Badges:**
- **CI Status:** `https://github.com/amnajamshaid/qa-task/actions/workflows/ci.yml/badge.svg`
- **Coverage:** (Add after integrating code coverage)

---

### Additional Resources

**Documentation:**
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Mochawesome Configuration](https://github.com/adamgruber/mochawesome)
- [TypeScript with Cypress](https://docs.cypress.io/guides/tooling/typescript-support)

**Community:**
- [Cypress Discord](https://discord.gg/cypress)
- [GitHub Discussions](https://github.com/amnajamshaid/qa-task/discussions)

---

## 👤 Author

**Amna Jamshaid**  
GitHub: [@amnajamshaid](https://github.com/amnajamshaid)

---

## 📄 License

ISC License

---

## 🎯 Interview Talking Points

When presenting this project, emphasize:

1. **Requirements-First Mindset** – Tests written to prove bugs exist (6/8 failing tests)
2. **CI/CD Integration** – Multi-browser matrix, artifact uploads, continue-on-error
3. **Clean Architecture** – Page Object Model, TypeScript, separation of concerns
4. **Reporting Excellence** – Mochawesome HTML with charts, embedded screenshots
5. **Scalability** – Discussed parallelization, sharding, future enhancements
6. **Documentation** – This README is production-ready, onboards new team members
7. **Trade-off Awareness** – Cypress vs. Selenium, ID vs. data-cy selectors

**Demo Flow:**
1. Show failing tests locally (`npm run test:report`)
2. Open HTML report, point out failure details
3. Walk through `CounterPage.ts` POM pattern
4. Show CI pipeline in GitHub Actions
5. Discuss how tests drive development priorities

---

**Last Updated:** October 24, 2025  
**Project Version:** 1.0.0


I want you to give me a new readme.md 


1. include project overview
2.. what we used to test it and why
3.  project structure 
4. how this project is maintainable and scaleable.
and how can someone add some new feature into this project since its maintainable and scaleable
5. how to run the project locally gui and headless both and how to view reports same for  github 
6. one complete test flow example
7. complete github pipeline flow and make space to add the running jobs links to attach to it. 
8. what type of testcases we are covering?
9. whats the test coverage 
10. 