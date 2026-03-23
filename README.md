# LexAI — Legal Document Summarizer

LexAI is a powerful, AI-driven legal document assistant designed to help legal professionals and businesses quickly analyze, summarize, and extract key insights from complex legal contracts.

## Features

- **AI Analysis**: Get instant summaries of complex legal terms.
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
   git clone https://github.com/Superbiouss/LexAi.git
   cd LexAi
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
- `src/pages/`: Modular page components for all 15 screens.

## License

This project is licensed under the MIT License.
