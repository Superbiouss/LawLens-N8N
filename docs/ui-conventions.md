# UI Conventions

These are the default UI rules for this project. New UI work should follow them before introducing one-off markup or styles.

## 1. Styling Source Of Truth

- Use theme tokens from `src/index.css`.
- Prefer shared component classes and utilities over page-local inline styling.
- Do not introduce raw hex or rgba values in page templates when a token already exists.

## 2. Inline Style Policy

- Do not add new inline `style="..."` attributes without a documented exception.
- If a page repeats the same inline pattern more than once, convert it into a shared class.
- Dynamic visual state should use class toggles such as `is-active`, `selected`, `muted`, `danger`, or utility classes instead of string-built style mutations.

## 3. Interactive States

- All interactive UI must support `hover`, `focus-visible`, and disabled/read-only states where relevant.
- Prefer class-based state styling over inline `onmouseover` / `onmouseout`.
- Use semantic `button` or `a` elements for clickable controls whenever possible.

## 4. Dark Mode Rules

- Dark mode should always use the same semantic token family as light mode.
- Text, borders, badges, pills, and chart/status colors must keep readable contrast in both themes.
- Accent surfaces should remain readable without relying on opacity-only styling.

## 5. Reuse Before Reinventing

Prefer existing primitives and utilities for repeated UI:

- `card-surface`
- `section-label`
- `stat-card`
- `nav-tabs`
- `chip`
- `pill`
- `btn-sm`, `btn-brand-solid`, `btn-between-tertiary`
- `depth-card`
- `clause-item`, `clause-ask-item`
- `draft-*`, `risk-*`, `vault-*` helpers

If a pattern appears in multiple pages and does not fit an existing primitive, add a reusable class in `src/index.css` before repeating it.

## 6. Layout Guidance

- Use shared layout helpers such as `layout-2col`, `layout-2col-wide`, `vault-layout`, and spacing utilities before adding local spacing rules.
- Keep page sections split by intent: header, stats, main content, sidebar, empty state.
- Large templates should be decomposed into helper render functions when a page becomes difficult to scan.

## 7. Accessibility Baseline

- All clickable controls need a visible keyboard focus state.
- Icon-only controls need an accessible label or text alternative.
- Avoid clickable `div`s when a semantic `button` is possible.
- Preserve readable heading hierarchy and text contrast in both themes.

## 8. Definition Of Done For UI Changes

A UI task is not complete until:

- no new inline styles were introduced
- dark mode remains visually consistent
- focus visibility is preserved
- repeated patterns were converted to shared classes or helpers
- key screens were checked against `docs/ui-qa.md`
