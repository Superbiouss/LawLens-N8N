# LAWLENS — Legal Document Summarizer

LAWLENS is a powerful, AI-driven legal document assistant designed to help legal professionals and businesses quickly analyze, summarize, and extract key insights from complex legal contracts.

## Features

- **AI Analysis**: Get instant summaries of complex legal terms.
- **Normal Chat**: General legal chat for drafting help, negotiation prep, and concept questions.
- **Risk Assessment**: High-fidelity risk scores (1-10) with detailed breakdowns of critical issues and missing protections.
- **Clause Breakdown**: Side-by-side original text vs. plain-English translations.
- **Ask the Doc**: Conversational AI interface for querying document specifics with citations.
- **Compliance Checklist**: Adherence tracking for standard regulations (GDPR, ISO, etc.).
- **Annotation Studio**: Collaborative review and internal team comments.
- **Document Vault**: Centralized management for all your legal assets.

## Tech Stack

- **Frontend**: Vanilla JavaScript (SPA)
- **Styling**: Vanilla CSS (Custom Design System)
- **Build Tool**: Vite
- **Typography**: Inter (UI), Georgia (Serif), JetBrains Mono (Code)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Superbiouss/LAWLENS.git
   cd LAWLENS
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Project Structure

- `index.html`: Main application shell.
- `src/main.js`: Hash-based SPA router and entry point.
- `src/index.css`: Global design system and component styles.
- `src/pages/`: Modular page components for the application screens and workflows.
- `src/services/`: Shared service layer for chat, n8n agent integration, text utilities, and browser storage.
- `docs/ui-baseline.md`: Current UI debt baseline and top offenders.
- `docs/ui-conventions.md`: Styling and interaction rules for contributors.
- `docs/ui-qa.md`: Manual light/dark and accessibility QA checklist.
- `docs/ui-progress.md`: Cleanup progress and remaining high-debt pages.

## UI Maintenance

- Run `npm run check:inline-styles` before merging UI-heavy changes.
- Use `docs/ui-conventions.md` as the default implementation guide for new screens and refactors.

## Quality Commands

- `npm run lint`: Run the ESLint baseline.
- `npm run test`: Run Vitest unit tests for shared services.
- `npm run format:check`: Verify Prettier formatting.
- `npm run ci`: Run lint, tests, inline-style guardrail, build, and format checks.

## n8n Agent Notes

- Normal Chat and Ask the Doc now use the same webhook settings but keep separate conversation scopes.
- The optional bearer token is stored in `sessionStorage`, so it lasts only for the current browser session.
- For production, route webhook traffic through a backend proxy instead of exposing a long-lived secret to the browser.

## License

This project is licensed under the MIT License.

## UI QA Checklist (Light/Dark)

Use this quick pass before merging UI changes:

- Verify all primary pages in both themes: `dashboard`, `upload`, `summary`, `risk-report`, `settings`.
- Confirm no inline hover handlers (`onmouseover` / `onmouseout`) are introduced.
- Check text contrast for headings, body, badges, pills, and muted metadata.
- Verify focus visibility on keyboard navigation (`Tab` / `Shift+Tab`) for links, buttons, tabs, pills, and inputs.
- Validate accent surfaces (danger/warning/info/success) remain readable in dark mode.
- Ensure cards, toasts, and glass surfaces keep consistent elevation/shadows in both themes.
