# LexAI — Brand Guidelines
**Version 1.0 · Legal Document Summarizer**

---

## 1. Brand identity

### 1.1 Product name
**LexAI** — always written as a single word with a capital L and capital AI. Never written as "Lex AI", "LexAi", or "lexai". The full product name is **LexAI Legal Document Summarizer** for formal contexts; **LexAI** for all in-product usage.

### 1.2 Brand personality
LexAI presents as a trusted, expert colleague — not a corporate legal tool. The tone is direct, calm, and precise. LexAI never exaggerates risk to create alarm, and never downplays risk to avoid discomfort. It is the most honest voice in the room.

**Brand attributes:**
- Expert but not intimidating
- Direct but not blunt
- Reassuring but not dishonest
- Precise but not cold

### 1.3 Logo mark
The logo consists of the wordmark **LexAI** set in Arial Bold, paired with a 7×7px filled circle in `#534AB7` (Purple 400) as the dot element. The dot appears to the left of the wordmark in the navigation bar context.

**Logo lockup (nav bar):**
```
● LexAI
```

The dot is always Purple 400 (`#534AB7`). The wordmark is always the primary text colour of the surrounding surface. Never place the logo on a coloured background — it always sits on white or the page background.

---

## 2. Colour system

The LexAI colour system is built on nine ramps, each with seven stops. Every colour used in the product comes from this palette — no off-palette hex values are permitted.

### 2.1 Primary palette

**Purple** — the LexAI brand colour. Used for the logo, primary accents, active states, and the primary CTA button.

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `purple-50` | Lightest fill | `#EEEDFE` | Background fills for purple-toned cards and banners |
| `purple-100` | Light fill | `#CECBF6` | Hover states on purple backgrounds |
| `purple-200` | Mid-light | `#AFA9EC` | Secondary purple fills |
| `purple-400` | Brand purple | `#7F77DD` | Decorative accents, chart fills |
| `purple-600` | **Primary** | `#534AB7` | Logo dot, primary button, active tab indicator |
| `purple-800` | Dark | `#3C3489` | Heading text on purple-50 backgrounds |
| `purple-900` | Darkest | `#26215C` | Deep purple text, rarely used |

### 2.2 Semantic colours

These colours carry meaning across the entire product. They must only be used for their defined purpose.

**Danger / Critical (Red)** — used for high-risk flags, critical compliance failures, destructive actions.

| Token | Hex | Usage |
|-------|-----|-------|
| `red-50` | `#FCEBEB` | Background for danger callouts and flag cards |
| `red-100` | `#F7C1C1` | Hover on red backgrounds |
| `red-400` | `#E24B4A` | Risk meter fill, danger badge text |
| `red-600` | `#A32D2D` | Border on danger cards |
| `red-800` | `#791F1F` | Body text on red-50 backgrounds |

**Warning / Review (Amber)** — used for review-level flags, partial compliance, upcoming deadlines.

| Token | Hex | Usage |
|-------|-----|-------|
| `amber-50` | `#FAEEDA` | Background for warning callouts |
| `amber-100` | `#FAC775` | Hover on amber backgrounds |
| `amber-400` | `#EF9F27` | Warning chart fills |
| `amber-600` | `#BA7517` | Warning badge text, border |
| `amber-800` | `#633806` | Body text on amber-50 backgrounds |

**Success / Passing (Teal / Green)** — used for passed checks, approved states, clear clauses, connected integrations.

| Token | Hex | Usage |
|-------|-----|-------|
| `teal-50` | `#E1F5EE` | Background for success callouts |
| `teal-400` | `#1D9E75` | Success meter fills, toggle-on state |
| `teal-600` | `#0F6E56` | Success badge border |
| `teal-800` | `#085041` | Body text on teal-50 backgrounds |
| `green-50` | `#EAF3DE` | Alt success background |
| `green-400` | `#639922` | Chart fills for positive data |

**Info / Neutral-active (Blue)** — used for document context indicators, informational badges, "in your docs" highlights, info callouts.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-50` | `#E6F1FB` | Background for info callouts and "in your docs" banners |
| `blue-400` | `#378ADD` | Info chart fills |
| `blue-600` | `#185FA5` | Info badge border, active doc indicator |
| `blue-800` | `#0C447C` | Body text on blue-50 backgrounds |

### 2.3 Neutral palette (Gray)

Used for all structural surfaces, borders, muted text, and neutral states.

| Token | Hex | Usage |
|-------|-----|-------|
| `gray-50` | `#F1EFE8` | Page background (tertiary surface) |
| `gray-100` | `#D3D1C7` | Default border colour (at 0.15α) |
| `gray-200` | `#B4B2A9` | Secondary border (at 0.3α) |
| `gray-400` | `#888780` | Muted text (tertiary) |
| `gray-600` | `#5F5E5A` | Secondary text |
| `gray-800` | `#444441` | Near-black for table cells |
| `gray-900` | `#2C2C2A` | Rarely used deep gray |

### 2.4 Supporting ramps

**Coral** — used for the Lease document category stripe and related decorative elements.

| Token | Hex |
|-------|-----|
| `coral-50` | `#FAECE7` |
| `coral-400` | `#D85A30` |
| `coral-800` | `#712B13` |

**Pink** — used for the Service Agreements category stripe and related decorative elements.

| Token | Hex |
|-------|-----|
| `pink-50` | `#FBEAF0` |
| `pink-400` | `#D4537E` |
| `pink-800` | `#72243E` |

### 2.5 CSS variables (implementation reference)

```css
:root {
  /* Surfaces */
  --color-background-primary:    #FFFFFF;
  --color-background-secondary:  #F7F6F2;
  --color-background-tertiary:   #F1EFE8;
  --color-background-danger:     #FCEBEB;
  --color-background-warning:    #FAEEDA;
  --color-background-success:    #E1F5EE;
  --color-background-info:       #E6F1FB;

  /* Text */
  --color-text-primary:          #1A1A1A;
  --color-text-secondary:        #5F5E5A;
  --color-text-tertiary:         #888780;
  --color-text-danger:           #A32D2D;
  --color-text-warning:          #BA7517;
  --color-text-success:          #0F6E56;
  --color-text-info:             #185FA5;

  /* Borders */
  --color-border-tertiary:       rgba(136, 135, 128, 0.15);
  --color-border-secondary:      rgba(136, 135, 128, 0.30);
  --color-border-primary:        rgba(136, 135, 128, 0.40);
  --color-border-danger:         rgba(163, 45, 45, 0.35);
  --color-border-warning:        rgba(186, 117, 23, 0.35);
  --color-border-success:        rgba(15, 110, 86, 0.35);
  --color-border-info:           rgba(24, 95, 165, 0.35);

  /* Brand */
  --color-brand-purple:          #534AB7;
  --color-brand-purple-light:    #EEEDFE;

  /* Typography */
  --font-sans:   'Anthropic Sans', system-ui, -apple-system, sans-serif;
  --font-serif:  Georgia, 'Times New Roman', serif;
  --font-mono:   'JetBrains Mono', 'Fira Code', 'Courier New', monospace;

  /* Radius */
  --border-radius-sm:   4px;
  --border-radius-md:   8px;
  --border-radius-lg:   12px;
  --border-radius-xl:   16px;
}
```

---

## 3. Typography

### 3.1 Typefaces

| Context | Typeface | Notes |
|---------|----------|-------|
| UI (all surfaces) | Anthropic Sans → system-ui fallback | Default for everything |
| Document definitions, pull quotes | Georgia (serif) | Used exclusively in Legal Glossary definitions and blockquote-style callouts |
| Code, original clause text, API keys | JetBrains Mono → Fira Code → Courier New | Any monospace context |

### 3.2 Type scale

| Element | Size | Weight | Colour | Usage |
|---------|------|--------|--------|-------|
| Page title | 22px | 500 | Primary | Page-level headings (Summary, Risk Report, etc.) |
| Section heading | 16px | 500 | Primary | In-page section labels |
| Card title | 13–14px | 500 | Primary | Document name in card, clause name |
| Body text | 13–14px | 400 | Secondary | Summaries, descriptions, explanations |
| Metadata / labels | 11–12px | 400 | Tertiary | File info, timestamps, secondary descriptions |
| Micro labels (caps) | 10px | 500 | Tertiary | Uppercase section dividers, `letter-spacing: 0.07em` |
| Badge / pill text | 10–11px | 500 | Semantic | Risk pills, status badges, tags |

**Weight rules — two weights only:**
- `400` (regular) — body text, descriptions, metadata
- `500` (medium) — headings, labels, badge text, active states

Never use `600`, `700`, or `bold` — they render too heavy against the soft surfaces.

### 3.3 Writing rules

- **Sentence case always.** Never Title Case. Never ALL CAPS (except 10px micro labels). This applies to button labels, nav items, table headers, headings, and badge text.
- **Plain English first.** Every piece of UI text should be understandable without legal training. If a label requires a tooltip to be understood, rewrite the label.
- **Active voice.** "Negotiate this clause" not "This clause should be negotiated."
- **No filler.** Remove "Please", "In order to", "Simply", "Just". Get to the point.
- **Verdict over description.** "Do not sign without negotiation" not "This clause has a high risk level."

---

## 4. Layout & spacing

### 4.1 Page structure

All product pages use one of three layout patterns:

**Two-column (standard):** `1fr 260–280px` — main content left, contextual panel right. Used on: Summary, Risk Report, Ask the Doc, Compliance Checklist, Settings, Export & Share.

**Three-column:** `200–220px 1fr 240–280px` — left navigation rail, main content, right panel. Used on: Clause Breakdown, Annotation Studio, Template Library, Legal Glossary.

**Two-column symmetric:** `1fr 1fr` — equal-weight columns. Used on: Export & Share (export vs share), Upload & Analyze (main vs context).

### 4.2 Spacing scale

| Token | Value | Usage |
|-------|-------|-------|
| `4px` | — | Micro gaps (icon to label, pill internal padding) |
| `8px` | — | Card internal gaps, small component spacing |
| `12px` | — | Standard component gaps |
| `16px` | `1rem` | Section padding, card padding |
| `20–24px` | `1.25–1.5rem` | Page padding, main content padding |
| `32px` | `2rem` | Section-to-section vertical rhythm |

### 4.3 Border radius

| Token | Value | Usage |
|-------|-------|-------|
| `--border-radius-sm` | `4px` | Badges, pills, small chips |
| `--border-radius-md` | `8px` | Buttons, inputs, small cards, tooltips |
| `--border-radius-lg` | `12px` | Standard cards, document cards, modals |
| `--border-radius-xl` | `16px` | Large modals, full-page panels (rare) |
| `999px` | — | Fully rounded pills (risk badges, filter pills, tags) |

**Rule:** Never apply border radius to elements with a single-sided border (e.g. left-border accent cards). Use `border-radius: 0` on single-side bordered elements.

### 4.4 Borders

All borders are `0.5px solid` — not `1px`. The 0.5px default is intentional; it creates a lighter, more refined visual than standard 1px borders.

The single exception is the selected/active accent border on featured items, which uses `1.5px` (e.g. selected document card, selected plan card). This is the only emphasis weight permitted.

```css
/* Standard */
border: 0.5px solid var(--color-border-tertiary);

/* Hover */
border: 0.5px solid var(--color-border-secondary);

/* Active / selected */
border: 1.5px solid var(--color-border-info);

/* Left-accent (risk cards, inline comments) */
border-left: 3px solid var(--color-border-danger);
border-radius: 0;
```

---

## 5. Component library

### 5.1 Cards

**Standard card** — the default container for bounded content:
```css
background: var(--color-background-primary);
border: 0.5px solid var(--color-border-tertiary);
border-radius: var(--border-radius-lg);
padding: 1rem 1.25rem;
```

**Surface card (metric/stat)** — for summary numbers:
```css
background: var(--color-background-secondary);
border-radius: var(--border-radius-md);
padding: 0.75rem 0.875rem;
/* No border */
```

**Left-accent card** — for flags, warnings, inline comments:
```css
background: var(--color-background-primary);
border: 0.5px solid var(--color-border-tertiary);
border-left: 3px solid var(--color-border-danger); /* or warning/success/info */
border-radius: 0 var(--border-radius-lg) var(--border-radius-lg) 0;
padding: 12px 16px;
```

**Document card (vault grid):**
```css
background: var(--color-background-primary);
border: 0.5px solid var(--color-border-tertiary);
border-radius: var(--border-radius-lg);
overflow: hidden;
/* Risk stripe: 3px colored top border inside the card */
```

### 5.2 Badges and pills

Risk severity pills:
```css
/* High risk */
background: var(--color-background-danger);
color: var(--color-text-danger);
border: 0.5px solid var(--color-border-danger);
border-radius: 999px;
font-size: 11px;
font-weight: 500;
padding: 3px 10px;

/* Medium risk — amber */
/* Low risk — teal/success */
/* Neutral — gray-secondary */
```

Category tags (in glossary, template library):
```css
background: transparent;
border: 0.5px solid var(--color-border-tertiary);
border-radius: 999px;
font-size: 11px;
color: var(--color-text-secondary);
padding: 3px 9px;
cursor: pointer;

/* Active state */
background: var(--color-background-secondary);
border-color: var(--color-border-primary);
color: var(--color-text-primary);
font-weight: 500;
```

### 5.3 Toggles

```css
/* Track */
width: 34px;
height: 19px;
border-radius: 10px;
background: var(--color-border-secondary); /* off */
background: var(--color-text-success);    /* on */
transition: background 0.2s;

/* Thumb */
width: 15px;
height: 15px;
border-radius: 50%;
background: #ffffff;
transition: transform 0.2s;
transform: translateX(0);   /* off */
transform: translateX(15px); /* on */
```

### 5.4 Inputs and selects

All form elements share a consistent 36px height with `0.5px solid var(--color-border-tertiary)` border and `var(--border-radius-md)` corners. Focus ring uses `box-shadow: 0 0 0 2px var(--color-border-info)` — no coloured borders on focus.

### 5.5 Buttons

```css
/* Default (outline style) */
background: transparent;
border: 0.5px solid var(--color-border-secondary);
border-radius: var(--border-radius-md);
color: var(--color-text-primary);
font-size: 12–13px;
font-weight: 500;
padding: 6–10px 14–20px;
transition: background 0.15s;

/* Hover */
background: var(--color-background-secondary);

/* Active */
transform: scale(0.98);

/* Primary CTA */
background: var(--color-text-primary); /* near-black */
color: var(--color-background-primary); /* white */
border: none;
```

**Buttons that trigger navigation or external actions append `↗` to the label.** Inline contextual actions do not.

### 5.6 Navigation tabs

```css
/* Tab strip */
border-bottom: 0.5px solid var(--color-border-tertiary);
padding: 0 20px;

/* Tab item (inactive) */
font-size: 12px;
color: var(--color-text-tertiary);
border-bottom: 2px solid transparent;
padding: 9px 12px;

/* Tab item (active) */
color: var(--color-text-primary);
font-weight: 500;
border-bottom: 2px solid var(--color-text-primary);
```

### 5.7 Left navigation rail

```css
/* Rail container */
border-right: 0.5px solid var(--color-border-tertiary);
background: var(--color-background-primary);
padding: 14px 0;

/* Nav item (inactive) */
padding: 7px 10px;
border-radius: var(--border-radius-md);
border-left: 2px solid transparent;

/* Nav item (hover) */
background: var(--color-background-secondary);

/* Nav item (active) */
background: var(--color-background-secondary);
border-left: 2px solid var(--color-text-primary);
```

### 5.8 Risk score ring

The risk score ring uses an SVG circle with `stroke-dasharray` to render the arc. Colour is determined by score:

| Score range | Colour |
|-------------|--------|
| 0.0 – 3.9 | `var(--color-text-success)` (teal) |
| 4.0 – 6.9 | `var(--color-text-warning)` (amber) |
| 7.0 – 10.0 | `var(--color-text-danger)` (red) |

The ring is 64–72px diameter. The score number is centred inside in 16–18px `font-weight: 500`.

---

## 6. Iconography

LexAI uses minimal SVG icons throughout the product. All icons follow these rules:

- **Stroke-only.** Never filled icons — always `fill="none"` with `stroke` applied.
- **Stroke width:** `1.5px` universally. Never `1px` or `2px`.
- **Size:** `12–14px` inline, `16px` in navigation, `20–24px` for decorative/feature icons.
- **Colour:** Always inherits from context using CSS colour variables. Never hardcoded hex on icons.
- **Style:** Round line caps and joins (`stroke-linecap="round"`, `stroke-linejoin="round"`).

The icon set follows the Lucide icon design language — geometric, clean, with consistent optical sizing.

---

## 7. Motion & interaction

LexAI is a low-motion interface. Animations serve a functional purpose — they communicate state change, not add decoration.

### 7.1 Transition values

```css
/* Standard UI transitions */
transition: background 0.15s ease;
transition: border-color 0.15s ease;
transition: opacity 0.15s ease;
transition: color 0.15s ease;

/* Toggle state change */
transition: background 0.2s ease;
transition: transform 0.2s ease;

/* Toast appearance */
animation: savedFlash 2s ease forwards;
```

### 7.2 Permitted animations

- **State transitions:** Hover backgrounds, border colour changes, toggle thumb movement
- **Toast notifications:** Fade in/up, hold, fade out
- **Processing spinners:** `animation: spin 0.7s linear infinite`
- **Typing indicator:** `animation: blink 1.2s infinite` with staggered delays

### 7.3 Prohibited animations

- Gradient transitions
- Shadow animations
- Page transition animations (instant navigation)
- Parallax or scroll-triggered decorative effects
- Looping background animations on content pages

---

## 8. Semantic colour usage rules

These rules govern how colours map to meaning. Violating them breaks the visual language of risk communication — the most critical function of the product.

| Colour | Meaning | Permitted uses | Prohibited uses |
|--------|---------|----------------|-----------------|
| **Red / Danger** | Critical risk, do not proceed | Critical flags, high-risk badges, failing compliance items, destructive actions | General error states unrelated to legal risk, decorative use |
| **Amber / Warning** | Review needed, proceed with caution | Review-level flags, upcoming deadlines, partial compliance, pending states | General "secondary" colour, decorative use |
| **Teal / Green / Success** | Passing, clear, approved | Passing clauses, approved review items, connected integrations, low-risk documents | Positive sentiment unrelated to a specific check result |
| **Blue / Info** | Informational, active, linked | "In your docs" indicators, citation badges, informational callouts, active tab | Decorative, brand colour (purple is brand) |
| **Purple** | Brand, primary selection | Logo, primary CTA, active state indicator in nav | Risk communication, semantic meaning |
| **Gray** | Neutral, structural | Borders, muted text, surface backgrounds, neutral states | Any state that has a semantic meaning |

---

## 9. Document and clause display conventions

### 9.1 Original clause text

Always displayed in monospace (`--font-mono`), in `var(--color-background-secondary)` with `border-radius: var(--border-radius-md)`, `padding: 8px 10px`. Font size 11px. Inline highlighted phrases use a coloured background matching the flag severity:

```css
/* Critical highlight within clause text */
background: rgba(226, 75, 74, 0.18);
border-radius: 2px;
padding: 0 1px;

/* Warning highlight */
background: rgba(186, 117, 23, 0.15);

/* Info highlight */
background: rgba(55, 138, 221, 0.15);
```

### 9.2 Plain-English definitions (Glossary)

The main definition in the Legal Glossary uses `font-family: var(--font-serif)`. This is the only surface in the product where serif typography is used. It creates a deliberate, authoritative reading experience appropriate for legal definitions.

### 9.3 Risk stripe

Document cards in the vault grid use a `3px` coloured stripe along the top edge to communicate risk at a glance, before any label is read:

```css
/* Inside the card, top edge */
height: 3px;
background: #E24B4A; /* High risk */
background: #EF9F27; /* Medium risk */
background: #1D9E75; /* Low risk */
```

### 9.4 Citation badges (Ask the Doc)

Inline clause citations in chat responses use:
```css
background: var(--color-background-info);
color: var(--color-text-info);
border: 0.5px solid var(--color-border-info);
border-radius: 4px;
font-size: 10px;
font-weight: 500;
padding: 1px 6px;
cursor: pointer;
```

---

## 10. Formatting prohibitions

The following are explicitly prohibited across all product surfaces. These rules exist to maintain the flat, clean, trustworthy aesthetic appropriate for a legal tool.

| Prohibited | Reason |
|-----------|--------|
| `box-shadow` (except focus rings) | Creates depth that conflicts with flat design language |
| Gradients on UI surfaces | Flash during streaming, conflicts with flat aesthetic |
| `blur` or `backdrop-filter` | Performance cost, inconsistent across surfaces |
| Glow or neon effects | Inappropriate for a legal tool's brand register |
| `border-radius` on single-sided borders | Renders incorrectly; looks unfinished |
| All-caps text (except 10px micro labels) | Conflicts with sentence-case convention |
| Mid-sentence bold text | Bold is for headings and labels only |
| Font weight 600 or 700 | Too heavy; use 500 for emphasis |
| External fonts in product UI | Performance; Anthropic Sans is the standard |
| Comic Sans, Papyrus, or novelty fonts | Not applicable in a legal product |
| Animated backgrounds on content pages | Distracting in a reading/review context |
| Coloured page backgrounds | All page backgrounds use gray-50 or white only |

---

## 11. Voice & tone

### 11.1 Core voice characteristics

**Expert.** LexAI has done the legal reading for you. It speaks with confidence, not hedging. "This clause gives Acme Corp unilateral assignment rights" — not "This clause might potentially suggest that Acme Corp could possibly have some rights around assignment."

**Direct.** Get to the verdict fast. Users are reading this because they're stressed about a contract. "Do not sign without negotiation" — not "There are a number of considerations to bear in mind before proceeding with executing this agreement."

**Specific.** Vague warnings are useless. "The $500K damages clause may be unenforceable in India under Section 74 of the Indian Contract Act" — not "There may be some enforceability issues in some jurisdictions."

**Honest.** LexAI does not catastrophise to seem smart. If a clause is fine, say it's fine. "Standard boilerplate — no action needed."

### 11.2 Copy examples by context

| Context | Do | Don't |
|---------|-----|-------|
| Risk verdict | "Do not sign without negotiation." | "This document presents certain challenges that may warrant consideration." |
| Red flag | "Unlimited term — you're bound permanently with no exit." | "The duration clause may be somewhat concerning." |
| Passing clause | "Standard. No action needed." | "This clause appears to be in relatively acceptable form." |
| AI disclaimer | "This is AI-generated analysis, not legal advice. Consult a qualified lawyer before signing." | "Please note that the information provided herein should not be construed as constituting legal advice." |
| Empty state | "No documents yet. Upload your first contract to get started." | "It looks like you haven't added any documents yet! Get started by uploading a contract." |
| Error | "Upload failed. Check the file is a PDF or DOCX under 50 MB." | "Oops! Something went wrong. Please try again." |

### 11.3 Disclaimers

The AI disclaimer appears contextually — embedded inside answers that involve jurisdiction-specific enforceability, not as a global footer. Format:

```
This analysis is AI-generated and does not constitute legal advice.
Always consult a qualified legal professional before signing.
```

Styled as an amber warning callout when appearing inside an answer, or as small muted text (`font-size: 12px; color: var(--color-text-tertiary); font-style: italic`) when appearing as a section footer.

---

## 12. Responsive design

LexAI is designed primarily for desktop use (1280px+). Mobile views are simplified but fully functional.

### 12.1 Breakpoints

| Breakpoint | Width | Layout changes |
|------------|-------|---------------|
| Desktop (default) | ≥ 1280px | Full three-column / two-column layouts |
| Tablet | 768–1279px | Left rail collapses to icon-only; right panel moves below main |
| Mobile | < 768px | Single column; navigation moves to bottom tab bar |

### 12.2 Mobile priority features

On mobile, the following pages are fully optimised: Upload & Analyze, Summary, Risk Report. The following are readable but not optimised for mobile workflows: Annotation Studio, Compare Versions, Team Workspace.

---

## 13. Accessibility

- **Contrast:** All text meets WCAG AA minimum (4.5:1 for body text, 3:1 for large text). The color system is calibrated so semantic text colours (danger, warning, success, info) on their matching background colours all pass AA.
- **Focus rings:** All interactive elements have a visible focus ring: `box-shadow: 0 0 0 2px var(--color-border-info)`.
- **Motion:** All animations respect `prefers-reduced-motion`. When reduced motion is active, transitions use `opacity` only, no `transform`.
- **Screen readers:** All icon-only buttons have `aria-label`. Status indicators (risk pills, connected dots) have `aria-label` in addition to visual colour.
- **Keyboard navigation:** Full tab order across all pages. No keyboard traps. Modal dialogs use focus trap.

---

## 14. Document category colour mapping

Each document type has an assigned colour from the brand palette. Used for the left-rail folder icons, document card stripes, and template category headers.

| Document type | Colour | Hex (400 stop) |
|--------------|--------|----------------|
| NDA | Purple | `#7F77DD` |
| Employment | Teal | `#1D9E75` |
| Lease | Coral | `#D85A30` |
| SaaS / MSA | Blue | `#378ADD` |
| Service agreements | Pink | `#D4537E` |
| IP & licensing | Amber | `#EF9F27` |
| Custom | Gray | `#888780` |

---

## 15. File and asset naming conventions

| Asset type | Convention | Example |
|------------|-----------|---------|
| React components | PascalCase | `RiskReportPage.tsx`, `ClauseCard.tsx` |
| CSS modules | camelCase matching component | `riskReportPage.module.css` |
| Icons | kebab-case | `icon-flag-danger.svg` |
| Export outputs | Snake case with doc name | `acme_nda_v3_summary.pdf` |
| Template files | Snake case | `mutual_nda_india_dpdp_v2.json` |
| Brand assets | kebab-case | `lexai-logo-purple.svg`, `lexai-og-image.png` |

---

*LexAI Brand Guidelines · v1.0 · Internal use only*
*Maintain alignment with these guidelines across all product surfaces, marketing materials, and exported documents.*
