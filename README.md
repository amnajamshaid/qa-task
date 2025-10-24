# Counter App - QA Automation Framework

## 📋 Project Overview

This project is a comprehensive **end-to-end testing framework** for a simple Counter web application. The framework demonstrates professional QA practices including requirements-driven testing, automated test execution, CI/CD integration, and detailed reporting.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Cypress** | v15.5.0 | E2E testing framework - fast execution, built-in screenshots/videos, excellent debugging |
| **Mochawesome Reporter** | v4.0.2 | HTML reports with embedded screenshots, charts, and test metrics |
| **TypeScript** | v5.9.3 | Type-safe test code for better maintainability and IDE support |
| **http-server** | v14.1.1 | Lightweight static file server for local testing |
| **start-server-and-test** | v2.1.2 | Ensures server is ready before tests run |
| **GitHub Actions** | - | CI/CD platform for automated multi-browser testing (Chrome + Firefox) |

---

## 📁 Project Structure

```
qa-task/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD pipeline
├── cypress/
│   ├── e2e/
│   │   └── counter/
│   │       ├── basic-functionality.cy.ts      # Tests for working features (10 tests, all passing)
│   │       └── requirements-validation.cy.ts  # Tests for critical bug (8 tests, 6 failing)
│   ├── pages/
│   │   └── CounterPage.ts            # Page Object Model for Counter app
│   ├── reports/
│   │   └── mochawesome/              # Generated HTML reports with screenshots
│   ├── screenshots/                  # Failure screenshots (auto-generated)
│   ├── support/
│   │   └── e2e.ts                    # Global hooks and reporter registration
│   └── videos/                       # Test execution videos (optional)
├── task/
│   └── index.html                    # Application under test (Counter app)
├── cypress.config.ts                 # Cypress configuration & reporter settings
├── package.json                      # Dependencies and npm scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

### Key Files & Directories

| Path | Description |
|------|-------------|
| `cypress/e2e/counter/` | Test specifications organized by feature |
| `cypress/pages/` | Page Object Models (abstraction layer for UI interactions) |
| `cypress/reports/mochawesome/` | HTML test reports with embedded screenshots |
| `cypress.config.ts` | Cypress settings, reporter config, retry logic |
| `.github/workflows/ci.yml` | Automated testing pipeline (Chrome + Firefox matrix) |
| `task/index.html` | Simple counter application being tested |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/amnajamshaid/qa-task.git
cd qa-task

# Install dependencies
npm install
```

---

## 🧪 Running Tests Locally

### Option 1: GUI Mode (Interactive - Recommended for Development)

**Best for:** Debugging, writing new tests, watching tests run in real-time

```bash
# Start the app and open Cypress Test Runner
npm run test:gui
```

**What happens:**
1. Starts the counter app on `http://localhost:3000`
2. Opens Cypress interactive GUI
3. Click on any test file to run it
4. See tests execute in real browser
5. Use time-travel debugging and DOM snapshots

---

### Option 2: Headless Mode (Command Line)

**Best for:** Quick verification, CI/CD simulation, generating reports

```bash
# Run all tests headlessly with HTML report
npm run test:report
```

**What happens:**
1. Cleans old reports
2. Starts the counter app on `http://localhost:3000`
3. Runs all tests in headless Chrome
4. Generates HTML report with screenshots
5. Stops the server

**Output:**
```
✓ 10 tests passed
✗ 6 tests failed (intentionally - demonstrating bugs)
✗ 2 tests skipped
Report: cypress/reports/mochawesome/index.html
```

---

## 📊 Viewing Test Reports

### Local Reports

**After running tests in headless mode:**

```bash
# Open the HTML report in your default browser
start cypress/reports/mochawesome/index.html
```

**Report includes:**
- ✅ Test pass/fail summary with charts
- 📸 Embedded screenshots at failure points
- ⏱️ Test duration metrics
- 🔄 Retry attempt details (if tests were retried)
- 📋 Full test logs and stack traces

---

### GitHub Actions Reports

**Viewing CI/CD test results:**

1. **Go to Actions Tab**
   - Navigate to: https://github.com/amnajamshaid/qa-task/actions

2. **Select Workflow Run**
   - Click on the specific workflow run (e.g., "verify")

3. **Download Artifacts**
   - Scroll to "Artifacts" section at bottom
   - Download:
     - `test-report-chrome` - HTML report from Chrome tests
     - `test-report-firefox` - HTML report from Firefox tests
     - `cypress-screenshots-chrome` - Failure screenshots (Chrome)
     - `cypress-screenshots-firefox` - Failure screenshots (Firefox)

4. **View Reports**
   - Extract the downloaded ZIP file
   - Open `index.html` in your browser

**Artifact Retention:** 90 days

---

## 🏗️ Maintainability & Scalability

This project is designed with best practices to ensure **easy maintenance** and **future growth**.

### What Makes It Maintainable

| Design Pattern | Implementation | Benefit |
|----------------|----------------|---------|
| **Page Object Model (POM)** | `cypress/pages/CounterPage.ts` | UI changes require updates in only ONE file, not every test |
| **TypeScript** | All test files use `.ts` extension | Catch errors at compile-time, autocomplete, type safety |
| **Modular Test Structure** | Tests organized by feature in `cypress/e2e/counter/` | Easy to locate and modify specific test suites |
| **Centralized Config** | `cypress.config.ts` | All settings (retries, timeouts, reporter) in one place |
| **Descriptive Test Names** | `TC001`, `TC002` with clear descriptions | Quick understanding of test purpose |
| **Code Reusability** | Helper methods in Page Objects (`inc()`, `dec()`, `see()`) | DRY principle - write once, use everywhere |

### What Makes It Scalable

| Feature | How It Scales | Example |
|---------|---------------|---------|
| **Feature-Based Organization** | `cypress/e2e/{featureName}/` | Add new feature folders easily (e.g., `login/`, `checkout/`) |
| **Parallel Execution** | CI runs Chrome + Firefox simultaneously | Add more browsers without increasing time |
| **Automatic CI Integration** | New tests auto-detected by GitHub Actions | No pipeline updates needed for new tests |
| **Report Aggregation** | Mochawesome merges all test results | Handles hundreds of tests in single report |
| **Environment Variables** | `BASE_URL` configurable via env vars | Test against dev, staging, prod environments |
| **Retry Logic** | Configured in `cypress.config.ts` | Handles flaky tests without code changes |

---

## ➕ Adding New Features

### Example: Adding a "Reset Button" Feature

#### Step 1: Update Page Object Model

**File:** `cypress/pages/CounterPage.ts`

```typescript
export class CounterPage {
  // ... existing methods ...

  // Add new method for reset button
  static reset() {
    cy.get("#reset-btn").click();
  }
}
```

**Why:** Single source of truth for UI interactions

---

#### Step 2: Create New Test File

**File:** `cypress/e2e/counter/reset-functionality.cy.ts`

```typescript
import { CounterPage } from "../../pages/CounterPage";

describe("Counter - Reset Functionality", () => {
  beforeEach(() => {
    CounterPage.visit();
  });

  it("TC020: Should reset counter to 0 from positive value", () => {
    CounterPage.inc(5);
    CounterPage.see(5);
    CounterPage.reset();
    CounterPage.see(0);
  });

  it("TC021: Should keep counter at 0 when already at 0", () => {
    CounterPage.see(0);
    CounterPage.reset();
    CounterPage.see(0);
  });
});
```

**Why:** Follows existing naming convention and structure

---

#### Step 3: Run Tests Locally

```bash
# Test the new feature
npx cypress run --spec "cypress/e2e/counter/reset-functionality.cy.ts"

# Or use GUI mode for debugging
npm run test:gui
```

**Why:** Verify tests work before pushing to CI

---

#### Step 4: Updated Project Structure

**After adding the reset feature, your project structure looks like:**

```
qa-task/
├── .github/
│   └── workflows/
│       └── ci.yml
├── cypress/
│   ├── e2e/
│   │   └── counter/
│   │       ├── basic-functionality.cy.ts         # 10 tests (existing)
│   │       ├── requirements-validation.cy.ts     # 8 tests (existing)
│   │       └── reset-functionality.cy.ts         # 2 tests (NEW ✨)
│   ├── pages/
│   │   └── CounterPage.ts                        # Updated with reset() method
│   ├── reports/
│   │   └── mochawesome/
│   │       └── index.html                        # Now includes 20 total tests
│   ├── screenshots/
│   ├── support/
│   │   └── e2e.ts
│   └── videos/
├── task/
│   └── index.html
├── cypress.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

**Changes:**
- ✅ Added 1 new test file: `reset-functionality.cy.ts`
- ✅ Updated 1 Page Object: `CounterPage.ts` (added `reset()` method)
- ✅ CI automatically detects and runs 20 tests (was 18)
- ✅ No configuration changes needed!

---

## 🔄 CI/CD Pipeline Flow

### GitHub Actions Workflow

**File:** `.github/workflows/ci.yml`

**Triggers:**
- ✅ Every push to `main` branch
- ✅ All pull requests

**Execution Strategy:** Matrix build (parallel execution)

```
┌─────────────────────────────────────────────────────────┐
│            GitHub Actions Workflow Triggered            │
│         (Push to main / Pull Request / Manual)          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Matrix Strategy      │
              │  browsers: [chrome,    │
              │            firefox]    │
              └────────────────────────┘
                           │
           ┌───────────────┴───────────────┐
           │                               │
           ▼                               ▼
┌──────────────────────┐      ┌──────────────────────┐
│   e2e (chrome)       │      │   e2e (firefox)      │
│   Run in parallel    │      │   Run in parallel    │
└──────────────────────┘      └──────────────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 1. Checkout  │              │ 1. Checkout  │
   └──────────────┘              └──────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 2. Setup     │              │ 2. Setup     │
   │    Node.js   │              │    Node.js   │
   └──────────────┘              └──────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 3. Install   │              │ 3. Install   │
   │ Dependencies │              │ Dependencies │
   └──────────────┘              └──────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 4. Clean Old │              │ 4. Clean Old │
   │    Reports   │              │    Reports   │
   └──────────────┘              └──────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 5. Start App │              │ 5. Start App │
   │   & Run Tests│              │   & Run Tests│
   │   (Chrome)   │              │   (Firefox)  │
   └──────────────┘              └──────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 6. Upload    │              │ 6. Upload    │
   │ HTML Reports │              │ HTML Reports │
   └──────────────┘              └──────────────┘
           │                               │
           ▼                               ▼
   ┌──────────────┐              ┌──────────────┐
   │ 7. Upload    │              │ 7. Upload    │
   │ Screenshots  │              │ Screenshots  │
   └──────────────┘              └──────────────┘
           │                               │
           └───────────────┬───────────────┘
                           ▼
              ┌────────────────────────┐
              │   Workflow Complete    │
              │   Artifacts Available  │
              └────────────────────────┘
```

### Pipeline Steps Explained

| Step | Action | Duration | Purpose |
|------|--------|----------|---------|
| **1. Checkout** | Clone repository | ~1s | Get latest code |
| **2. Setup Node.js** | Install Node.js v20 | ~5s | Runtime environment |
| **3. Install Dependencies** | `npm ci` | ~15s | Install Cypress & packages |
| **4. Clean Reports** | Delete old reports | ~1s | Fresh test results |
| **5. Run Tests** | Start app + Execute Cypress | ~2m 13s | Run 18 tests |
| **6. Upload Reports** | Save HTML reports as artifacts | ~1s | Share results |
| **7. Upload Screenshots** | Save failure screenshots | ~2s | Debug evidence |

**Total Time:** ~2 minutes 42 seconds per browser  
**Parallel Execution:** Both browsers run simultaneously

---

### 📊 View Live Test Runs

**Latest Workflow Runs:**

| Browser | Status | Duration | Artifacts |
|---------|--------|----------|-----------|
| 🟢 **Chrome** | [View Run](#) | 2m 42s | [Download Reports](#) |
| 🟦 **Firefox** | [View Run](#) | 2m 38s | [Download Reports](#) |

---

## 🎯 Complete Test Flow Example

### Test Case: TC001 - Decrement from 0 Should Stay at 0

**Demonstrates:** How a failing test exposes bugs and generates evidence

---

#### 1️⃣ Test Code (TypeScript)

```typescript
// File: cypress/e2e/counter/requirements-validation.cy.ts
it("TC001: Should NOT allow negative numbers when decrementing from 0", () => {
  CounterPage.dec(1);  // Click decrement once
  CounterPage.see(0);  // Assert counter should stay at 0
});
```

---

#### 2️⃣ Page Object Abstraction

```typescript
// File: cypress/pages/CounterPage.ts
static dec(times: number = 1) {
  for (let i = 0; i < times; i++) {
    cy.get("#decrement-btn").click();
  }
}

static see(expectedValue: number) {
  cy.get("#counter").should("have.text", expectedValue.toString());
}
```

---

#### 3️⃣ Execution Flow

```
┌──────────────────────────────────────────────────────────────┐
│ Step 1: Test Starts                                          │
├──────────────────────────────────────────────────────────────┤
│ • Cypress visits http://localhost:3000                       │
│ • Counter displays: 0                                        │
└──────────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ Step 2: Execute Action                                       │
├──────────────────────────────────────────────────────────────┤
│ • CounterPage.dec(1) → Click #decrement-btn                  │
│ • Counter updates to: -1 ❌                                  │
└──────────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ Step 3: Assertion Fails                                      │
├──────────────────────────────────────────────────────────────┤
│ • CounterPage.see(0) → Expected: "0"                         │
│                      → Actual: "-1" ❌                       │
│ • AssertionError thrown                                      │
└──────────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ Step 4: Evidence Collection (Automatic)                      │
├──────────────────────────────────────────────────────────────┤
│ • Screenshot captured showing "-1" on screen                 │
│ • Error stack trace recorded                                 │
│ • Test marked as FAILED in reporter                          │
└──────────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ Step 5: Retry Attempt (Configured: 1 retry)                  │
├──────────────────────────────────────────────────────────────┤
│ • Test reruns automatically                                  │
│ • Same failure occurs: -1 instead of 0                       │
│ • Second screenshot captured                                 │
└──────────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ Step 6: Report Generation                                    │
├──────────────────────────────────────────────────────────────┤
│ • Mochawesome merges test results                            │
│ • HTML report generated with:                                │
│   - Test status: FAILED ❌                                   │
│   - Screenshots embedded (both attempts)                     │
│   - Duration: ~500ms                                         │
│   - Error message with stack trace                           │
└──────────────────────────────────────────────────────────────┘
                           ▼
┌──────────────────────────────────────────────────────────────┐
│ Step 7: CI/CD Artifact Upload                                │
├──────────────────────────────────────────────────────────────┤
│ • HTML report → test-report-chrome.zip                       │
│ • Screenshots → cypress-screenshots-chrome.zip               │
│ • Available for download from GitHub Actions                 │
└──────────────────────────────────────────────────────────────┘
```

---

#### 4️⃣ Generated Artifacts

**HTML Report Entry:**
```
❌ TC001: Should NOT allow negative numbers when decrementing from 0
   Duration: 487ms
   Attempts: 2 (both failed)
   
   Error: AssertionError: expected '-1' to equal '0'
   
   📸 Screenshot (Attempt 1): counter-displays-negative-one.png
   📸 Screenshot (Attempt 2): counter-displays-negative-one-retry.png
```

**Screenshot Shows:**
- Counter display: `-1` (in red highlight)
- Decrement button (clicked)
- Visual proof of bug

---

#### 5️⃣ What This Demonstrates

✅ **Maintainable:** Page Object hides UI details, test code is readable  
✅ **Automated:** No manual intervention needed  
✅ **Evidence-Rich:** Screenshots prove the bug exists  
✅ **CI-Ready:** Same test runs locally and in GitHub Actions  
✅ **Retry Logic:** Handles flakiness with automatic retries  
✅ **Reporting:** Professional HTML report for stakeholders  

---

