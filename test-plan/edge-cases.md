# Edge Cases & Test-First Rationale

This document summarizes the edge cases identified for the Counter app and records our decision to follow a requirements-first (test-first) approach.

## Requirements-first approach
- Tests assert the requirement: "Counter should only display positive numbers".
- Per QA best-practice we write these tests first and allow them to fail to prove the requirement is not met.
- Failing tests are evidence of defects and help drive development and prioritization.

## High-priority edge cases (must be automated)
- **TC001**: Decrement from 0 should keep counter at 0 (never negative)
- **TC002**: Multiple decrements from 0 should still keep counter at 0
- **TC003**: From 1, decrement becomes 0 (normal behaviour)
- **TC004**: Basic increment functionality (0 → 1)
- **TC005**: Basic increment functionality (1 → 2)
- **TC006**: Sequences like 0→decrement→increment should not produce negative values
- **TC007**: Excessive decrements (e.g., decrement 10 times) should floor at 0

## Medium-priority edge cases
- **TC008**: Rapid clicking increments — ensure correctness under stress
- **TC009**: Rapid clicking decrements — ensure correctness under stress
- **TC010**: Double-click increment behavior should be deterministic
- **TC011**: Double-click decrement behavior should be deterministic
- **TC012**: Keyboard activation (Enter/Space) should activate increment button
- **TC013**: Keyboard activation (Enter/Space) should activate decrement button
- **TC014**: Mixed rapid increment/decrement operations

## Low-priority edge cases
- **TC015**: Very large numbers display and formatting (1000+)
- **TC016**: Accessibility and focus outlines visibility
- **TC017**: Button states and visual feedback
- **TC018**: Cross-browser compatibility (Edge, Firefox, Safari)

## Evidence strategy
- Failing tests + CI artifacts (videos/screenshots/logs) will be used as bug evidence.
- Tests live in `cypress/e2e/counter/` and are split into:
  - `requirements-validation.cy.ts` (failing tests demonstrating defects)
  - `basic-functionality.cy.ts` (tests that assert functionality that already passes)

## Next steps
1. Run the failing tests locally to capture output and artifacts.
2. Open a PR showing tests failing; attach failing artifacts in CI.
3. Work with the dev team to fix the app; rerun tests to confirm fixes.
