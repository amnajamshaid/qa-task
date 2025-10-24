# Test Cases & Priorities

## Test Cases

| ID | Description | Priority | Status |
|----|-------------|----------|--------|
| **TC001** | Decrement from 0 should stay at 0 | **P0** | ❌ FAIL |
| **TC002** | Multiple decrements from 0 should stay at 0 | **P0** | ❌ FAIL |
| **TC003** | Decrement from 1 correctly returns to 0 | **P1** | ✅ PASS |
| **TC004** | Initial counter value is 0 | **P1** | ✅ PASS |
| **TC005** | Buttons are visible and enabled on load | **P1** | ✅ PASS |
| **TC006** | Single increment from 0 to 1 | **P1** | ✅ PASS |
| **TC007** | Increment from 1 to 2 | **P1** | ✅ PASS |
| **TC008** | Multiple sequential increments | **P1** | ✅ PASS |
| **TC009** | 0 → decrement → increment sequence | **P0** | ❌ FAIL |
| **TC010** | 1 → decrement → increment sequence | **P1** | ✅ PASS |
| **TC011** | Excessive decrements should floor at 0 | **P0** | ❌ FAIL |
| **TC013** | Mixed increment/decrement operations | **P0** | ❌ FAIL |
| **TC014** | Complex scenarios prevent negatives | **P0** | ❌ FAIL |
| **TC015** | Double-click increment behavior | **P2** | ✅ PASS |
| **TC016** | Keyboard navigation with Tab | **P2** | ✅ PASS |
| **TC017** | Enter/Space activate focused button | **P2** | ✅ PASS |
| **TC018** | Large numbers display correctly | **P2** | ✅ PASS |
| **TC019** | Rapid clicking maintains accuracy | **P2** | ✅ PASS |

---

## Test Coverage

**By Priority:**
- **P0 (Critical):** 6 tests — 0% passing
- **P1 (High):** 8 tests — 100% passing
- **P2 (Medium):** 4 tests — 100% passing

**By Type:**
- Boundary value testing
- State transition validation
- Basic operations (increment/decrement)
- UI state validation
- Accessibility (keyboard navigation)
- Performance (rapid clicks, large numbers)
- UX (double-click)

**Total:** 18 automated test cases