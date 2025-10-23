# Counter App - E2E Testing Project

A simple counter application with comprehensive Cypress E2E testing demonstrating professional QA practices and requirements-driven test development.

## 🎯 Project Overview

**Application**: Counter that should only display positive numbers with increment/decrement functionality  
**Testing Framework**: Cypress with TypeScript  
**CI/CD**: GitHub Actions pipeline  
**Approach**: Requirements-first testing (tests intentionally fail to demonstrate bugs)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd qa-task
npm install
```

### 2. Run Application & Tests
```bash
# Start application and run tests (recommended)
npm run test:smoke

# OR run separately:
npm run start          # Start server on http://localhost:3000
npm run cypress:open   # Open Cypress GUI (in new terminal)
```

## 📋 Test Results Overview

### ✅ Basic Functionality Tests (10/10 passing)
- Application loads correctly
- Increment functionality works
- UI/UX features function properly

### ❌ Requirements Validation Tests (6/8 failing - intentional)
**Critical Bug Found**: Application allows negative numbers despite requirement stating "only positive numbers"

**Failing Test Examples**:
- TC001: Decrement from 0 → Expected: `0`, Actual: `-1` 
- TC002: Multiple decrements from 0 → Expected: `0`, Actual: `-5`
- TC011: Excessive decrements → Expected: `0`, Actual: `-8`

## 🧪 Testing Strategy

### Test Organization
- **`basic-functionality.cy.ts`** - Regression tests (should pass)
- **`requirements-validation.cy.ts`** - Requirements compliance (fails due to bugs)

### Why Tests Intentionally Fail
Following industry best practices:
1. ✅ Tests validate requirements, not broken implementations
2. ✅ Failing tests provide evidence of defects
3. ✅ Demonstrates test reliability and bug detection capability

## 📁 Project Structure

```
├── task/index.html                    # Counter application
├── cypress/
│   ├── e2e/counter/                   # Test files
│   │   ├── basic-functionality.cy.ts  # Passing tests
│   │   └── requirements-validation.cy.ts # Failing tests (bugs)
│   └── pages/CounterPage.ts           # Page Object Model
├── test-plan/edge-cases.md            # Test plan & strategy
├── .github/workflows/ci.yml           # GitHub Actions CI
└── cypress.config.ts                  # Cypress configuration
```

## 🔄 CI/CD Pipeline

**Trigger**: Automatic on Pull Requests and pushes to main  
**Environment**: Ubuntu with matrix strategy  
**Browsers**: Chrome AND Firefox (parallel execution)  
**Artifacts**: Test videos and failure screenshots (per browser)  
**View Results**: Check "Actions" tab in GitHub repository
**Cross-browser Testing**: Pipeline runs identical tests on both browsers to ensure compatibility