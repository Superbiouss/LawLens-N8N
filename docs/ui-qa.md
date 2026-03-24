# UI QA

Last updated: 2026-03-24

## Core Routes To Check

- `dashboard`
- `upload`
- `summary`
- `risk-report`
- `ask`
- `annotations`
- `settings`

## Light And Dark Theme Checklist

- Confirm top navigation tabs remain readable and visually aligned in both themes.
- Verify cards, sidebars, and workspace layouts keep distinct but professional contrast.
- Check danger, warning, success, and info surfaces for readable text and borders.
- Validate focus-visible rings on tabs, pills, buttons, dropzones, and contextual action chips.
- Confirm badge/pill states remain readable against dark surfaces.
- Review sidebar/workspace split layouts for border clarity and no washed-out panels.

## Accessibility Checklist

- Keyboard users can reach page tabs, segmented tabs, pills, primary actions, and recent-document rows.
- Clickable rows use semantic `button` elements where refactored.
- The upload dropzone responds to both pointer and keyboard activation.
- Icon-only or icon-led controls retain readable labels and focus styling.

## Current Pass Summary

- Shared document/review tabs now render through semantic buttons on refactored pages.
- Upload, summary, risk report, ask, and annotations now use shared layout primitives and class-based states.
- Inline hover handlers remain removed project-wide.
- Automated build or browser verification could not be run in this shell because `node` is unavailable.

## Next QA Candidates

- `compare`
- `clause-breakdown`
- `settings`
- `dashboard`
