import { bindRouteTabs, DOCUMENT_TABS, renderPageTabs } from './shared/page-tabs.js';

const RED_FLAGS = [
  "Unlimited confidentiality term - no sunset clause. You're bound permanently with no way out.",
  '$500,000 liquidated damages per breach - regardless of actual harm. Disproportionate and aggressive.',
  'Acme Corp can assign this agreement to any successor without your consent.',
];

const OBLIGATIONS = [
  { party: 'John Doe', text: 'Must keep all disclosed information strictly confidential indefinitely.' },
  { party: 'John Doe', text: 'May only use confidential information to evaluate a potential partnership - no other purpose.' },
  { party: 'Acme Corp', text: 'May assign this agreement to any entity without notice or consent.' },
];

const MISSING_CLAUSES = [
  'Return or destruction of confidential materials on termination',
  'Residual knowledge carve-out (what employees can retain in memory)',
  'Limitation of liability cap for the Disclosing Party',
  'Dispute resolution / mediation step before litigation',
];

const EXPLORE_LINKS = [
  { title: 'Clause breakdown', desc: 'Every clause explained', page: 'clause-breakdown' },
  { title: 'Risk report', desc: 'Full red flag analysis', page: 'risk-report' },
  { title: 'Key dates', desc: 'Timeline & reminders', page: 'key-dates' },
  { title: 'Compare versions', desc: 'Diff against another draft', page: 'compare' },
];

export function renderSummary(container) {
  container.innerHTML = `
    ${renderPageTabs(DOCUMENT_TABS, 'summary')}

    <div class="layout-2col">
      <div>
        <div class="card-accent-left danger mb-16">
          <div class="flex justify-between items-center mb-8">
            <div>
              <p class="section-heading">Acme Corp - Non-Disclosure Agreement v3</p>
              <p class="meta-text mt-4">NDA · 6 pages · Analyzed 2 min ago</p>
            </div>
            <span class="badge badge-danger">High risk</span>
          </div>
          <p class="body-text summary-lead-copy">This is a one-sided mutual NDA that heavily favours Acme Corp. It imposes an unlimited confidentiality term on the Receiving Party, includes a $500,000 per-incident liquidated damages clause, and allows Acme to assign the agreement without consent. Several standard protections for the Receiving Party are absent.</p>
        </div>

        <div class="stats-row mb-16">
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Parties</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">11</div>
            <div class="stat-label">Clauses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number danger">3</div>
            <div class="stat-label">Red flags</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">∞</div>
            <div class="stat-label">Duration</div>
          </div>
        </div>

        <div class="layout-2col-equal gap-12 mb-16">
          <div>
            <p class="section-label">Parties</p>
            <div class="card p-12">
              <div class="panel-list">
                <div class="panel-list-row">
                  <span class="meta-text">Disclosing party</span>
                  <span class="fs-13 fw-500">Acme Corp</span>
                </div>
                <div class="panel-list-row">
                  <span class="meta-text">Receiving party</span>
                  <span class="fs-13 fw-500">John Doe</span>
                </div>
                <div class="panel-list-row">
                  <span class="meta-text">Governing law</span>
                  <span class="fs-13 fw-500">Delaware, USA</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p class="section-label">Key dates</p>
            <div class="card p-14">
              <div class="timeline">
                <div class="tl-item">
                  <div class="tl-dot success"></div>
                  <div class="meta-text">Effective date</div>
                  <div class="fs-13 fw-500">1 Jan 2025</div>
                </div>
                <div class="tl-item">
                  <div class="tl-dot warning"></div>
                  <div class="meta-text">Expiry</div>
                  <div class="fs-13 fw-500 text-warning">Unlimited - no end date</div>
                </div>
                <div class="tl-item">
                  <div class="tl-dot"></div>
                  <div class="meta-text">Notice period</div>
                  <div class="fs-13 fw-500">Not specified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="section-label">Red flags</p>
        <div class="flex flex-col gap-8 mb-20 stagger">
          ${renderRedFlags()}
        </div>

        <p class="section-label">Obligations</p>
        <div class="card mb-20 p-14">
          <div class="panel-list">
            ${renderObligations()}
          </div>
        </div>

        <p class="section-label">Missing standard clauses</p>
        <div class="card p-14">
          <div class="panel-list">
            ${renderMissingClauses()}
          </div>
        </div>
      </div>

      <div>
        <p class="section-label">Risk score</p>
        <div class="card mb-16 text-center">
          <div class="score-ring mb-12">
            <svg viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="28" fill="none" stroke="var(--color-border-tertiary)" stroke-width="6"/>
              <circle cx="36" cy="36" r="28" fill="none" stroke="var(--color-red-400)" stroke-width="6" stroke-dasharray="126 176" stroke-dashoffset="44" stroke-linecap="round"/>
            </svg>
            <div class="score-center">
              <span class="score-number text-danger">7.2</span>
              <span class="score-denom">/ 10</span>
            </div>
          </div>
          <p class="fs-13 fw-500 text-danger mb-4">High risk</p>
          <p class="meta-text mt-0">3 critical issues found</p>
        </div>

        <p class="section-label">Explore further</p>
        <div class="card mb-16 p-8">
          ${renderExploreLinks()}
        </div>

        <p class="section-label">Readability</p>
        <div class="card mb-16">
          <div class="flex justify-between mb-8">
            <span class="meta-text">Grade level</span>
            <span class="fs-12 fw-500 text-primary">Grade 14</span>
          </div>
          <div class="flex justify-between mb-8">
            <span class="meta-text">Est. read time</span>
            <span class="fs-12 fw-500 text-primary">8 min</span>
          </div>
          <div class="flex justify-between">
            <span class="meta-text">Word count</span>
            <span class="fs-12 fw-500 text-primary">1,840</span>
          </div>
        </div>

        <p class="section-label">Share & export</p>
        <div class="flex flex-col gap-8">
          <button class="btn-full" id="download-summary-btn">Download summary PDF ↗</button>
          <button class="btn-full" id="share-summary-btn">Copy share link</button>
        </div>
      </div>
    </div>
  `;

  bindRouteTabs(container);
  bindSummaryActions(container);

  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('.nav-tabs'));
    }
  }, 0);
}

function renderRedFlags() {
  return RED_FLAGS.map(flag => `
    <button type="button" class="reset-btn card summary-alert-card flex items-start gap-10 hover-raise-danger" data-nav-target="risk-report">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-text-danger)" stroke-width="1.5" class="flex-shrink-0 mt-4"><path d="M7 1v8M7 11v1.5"/></svg>
      <div class="fs-13 text-danger lh-15 summary-alert-text">${flag}</div>
      <div class="text-danger summary-alert-arrow">›</div>
    </button>
  `).join('');
}

function renderObligations() {
  return OBLIGATIONS.map(obligation => `
    <div class="panel-list-row align-start">
      <span class="badge badge-info mt-4">${obligation.party}</span>
      <span class="fs-13 text-secondary lh-15">${obligation.text}</span>
    </div>
  `).join('');
}

function renderMissingClauses() {
  return MISSING_CLAUSES.map(clause => `
    <div class="panel-list-row align-start">
      <div class="panel-list-dash mt-8"></div>
      <span class="fs-13 text-secondary">${clause}</span>
    </div>
  `).join('');
}

function renderExploreLinks() {
  return EXPLORE_LINKS.map(link => `
    <button type="button" class="reset-btn flex items-center justify-between hover-bg-secondary summary-link-row" data-nav-target="${link.page}">
      <div>
        <p class="fs-13 fw-500 text-primary m-0">${link.title}</p>
        <p class="fs-11 text-tertiary m-0">${link.desc}</p>
      </div>
      <span class="text-tertiary">›</span>
    </button>
  `).join('');
}

function bindSummaryActions(container) {
  container.querySelectorAll('.summary-alert-card, .summary-link-row').forEach(button => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.navTarget);
    });
  });

  container.querySelector('#download-summary-btn').addEventListener('click', () => {
    window.navigateTo('export');
  });

  container.querySelector('#share-summary-btn').addEventListener('click', () => {
    window.showToast('Link copied to clipboard!');
  });
}
