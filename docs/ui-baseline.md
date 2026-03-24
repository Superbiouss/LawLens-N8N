# UI Baseline

Last updated: 2026-03-24

## Current Baseline

- Inline `style="..."` attributes across `src/pages`: `63`
- Inline hover handlers (`onmouseover` / `onmouseout`): `0`
- Build verification: blocked locally because `node` is not available in the shell environment

## Highest-Debt Pages

| Page                       | Inline style count |
| -------------------------- | -----------------: |
| `src/pages/team.js`        |                 21 |
| `src/pages/analytics.js`   |                 18 |
| `src/pages/compliance.js`  |                 11 |
| `src/pages/settings.js`    |                  8 |
| `src/pages/upload.js`      |                  3 |
| `src/pages/risk-report.js` |                  1 |
| `src/pages/dashboard.js`   |                  1 |
| `src/pages/glossary.js`    |                  0 |
| `src/pages/templates.js`   |                  0 |

## Current Key Routes For UI Review

- `dashboard`
- `upload`
- `summary`
- `risk-report`
- `settings`

## Progress Snapshot

- Initial measured inline style count: `450`
- Previous guardrail checkpoints: `299`, then `178`
- Current inline style count: `63`
- Current reduction from initial state: `387`
- Hover handlers removed: `14 -> 0`
- Shared page-tab helper introduced for document/review flows
- High-traffic pages migrated to shared primitives: `upload`, `summary`, `risk-report`, `ask`, `annotations`

## Notes

- The remaining debt is concentrated in large page template strings, not the global design system.
- Dark mode is already token-driven at the global level, so the next gains are mostly page-level cleanup and accessibility.
- The inline-style guardrail should now treat `63` as the new ceiling.
