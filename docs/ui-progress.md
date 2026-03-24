# UI Progress

Last updated: 2026-03-24

## Completed Tasks

1. Established a measurable UI baseline.
2. Added project UI conventions.
3. Added an inline-style guardrail script and package command.
4. Introduced shared UI primitives and page-tab helpers.
5. Migrated the highest-traffic pages to those shared patterns.
6. Standardized interaction states around class-based styling and semantic controls.
7. Split large page templates into smaller render helpers on key routes.
8. Applied an accessibility quick pass to the refactored pages.
9. Added a dedicated UI QA checklist.
10. Recorded the latest cleanup metrics and remaining debt.

## Before And After

| Metric | Before | Current |
| --- | ---: | ---: |
| Inline `style="..."` attrs | 450 | 178 |
| Inline hover handlers | 14 | 0 |
| High-debt key pages (`upload`, `summary`, `risk-report`, `ask`, `annotations`) | 125 | 4 |

## Shared Work Added

- `src/pages/shared/page-tabs.js`
- shared workspace/layout primitives in `src/index.css`
- shared list/panel/button reset utilities in `src/index.css`

## Remaining Highest-Debt Pages

| Page | Inline style count |
| --- | ---: |
| `src/pages/team.js` | 21 |
| `src/pages/export.js` | 19 |
| `src/pages/analytics.js` | 18 |
| `src/pages/vault.js` | 17 |
| `src/pages/compare.js` | 17 |

## Suggested Next Slice

- migrate `compare` and `clause-breakdown` to the shared page-tab helper
- clean `dashboard` and `vault` row interactions into semantic buttons
- replace remaining inline action toasts in `settings` with bound event listeners
