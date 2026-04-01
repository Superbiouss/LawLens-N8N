import {
  bindRouteTabs,
  DOCUMENT_TABS,
  renderPageTabs,
} from './shared/page-tabs.js';

const COMPARE_OPTIONS = [
  {
    id: 'nda-v4',
    name: 'Acme Corp NDA v4.pdf',
    score: '5.9',
    deltas: [
      {
        tone: 'success',
        title: 'Liquidated damages cap reduced',
        detail:
          'Version 4 replaces the fixed $500,000 penalty with a cap tied to proven damages.',
      },
      {
        tone: 'warning',
        title: 'Assignment clause still one-sided',
        detail:
          'Acme still retains broader transfer rights than the counterparty.',
      },
      {
        tone: 'danger',
        title: 'No mutual liability cap added',
        detail:
          'The target draft still omits a balanced limitation of liability clause.',
      },
    ],
  },
  {
    id: 'nda-client-redline',
    name: 'Acme Corp NDA - Client Redline.docx',
    score: '4.3',
    deltas: [
      {
        tone: 'success',
        title: 'Confidentiality tail shortened',
        detail:
          'The redline changes the confidentiality survival term from perpetual to 2 years.',
      },
      {
        tone: 'success',
        title: 'Mutual consent added for assignment',
        detail:
          'Both parties now need prior written consent before assigning the agreement.',
      },
      {
        tone: 'warning',
        title: 'Jurisdiction still Delaware-only',
        detail:
          'Venue remains Delaware, which may still create cross-border enforcement friction.',
      },
    ],
  },
];

export function renderCompare(container) {
  container.innerHTML = `
    ${renderPageTabs([...DOCUMENT_TABS, { page: 'compare', label: 'Compare' }], 'compare')}

    <div class="layout-2col-equal mb-20 gap-16">
      <div class="card-surface compare-doc-card compare-doc-card-base">
        <div class="compare-doc-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
        </div>
        <div class="flex-1">
          <div class="compare-doc-kicker">Version 1 (Base)</div>
          <div class="compare-doc-title">Acme Corp NDA v3.pdf</div>
        </div>
        <span class="badge badge-danger">7.2 Risk</span>
      </div>

      <div class="card hover-border-info compare-target-card">
        <div class="compare-doc-icon compare-doc-icon-add">
          <span class="compare-doc-plus">+</span>
        </div>
        <div class="flex-1">
          <div class="compare-doc-kicker">Version 2 (Target)</div>
          <label class="meta-text block mb-4" for="compare-target-select">Select document to compare</label>
          <select id="compare-target-select">
            <option value="">Choose a document...</option>
            ${COMPARE_OPTIONS.map((option) => `<option value="${option.id}">${option.name}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>

    <div id="compare-results">
      ${renderCompareEmptyState()}
    </div>
  `;

  bindRouteTabs(container);
  bindCompareActions(container);

  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('.nav-tabs'));
    }
  }, 0);
}

function bindCompareActions(container) {
  const select = container.querySelector('#compare-target-select');
  const results = container.querySelector('#compare-results');

  select?.addEventListener('change', () => {
    const selected = COMPARE_OPTIONS.find((item) => item.id === select.value);

    if (!selected) {
      results.innerHTML = renderCompareEmptyState();
      return;
    }

    results.innerHTML = renderCompareResult(selected);
    results
      .querySelector('#compare-open-summary-btn')
      ?.addEventListener('click', () => {
        window.navigateTo('summary');
      });
  });
}

function renderCompareEmptyState() {
  return `
    <div class="compare-empty-state">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="compare-empty-icon"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 3l7 7"/><path d="M16 21h5v-5"/><path d="M8 21H3v-5"/><path d="M21 21l-7-7"/><path d="M3 21l7-7"/></svg>
      <div class="compare-empty-title">Compare document versions</div>
      <div class="compare-empty-copy">Select a second document above to see a side-by-side diff. LAWLENS will highlight additions, deletions, and risk changes.</div>
    </div>
  `;
}

function renderCompareResult(selected) {
  return `
    <div class="stats-row mb-20 compare-stats-row">
      <div class="stat-card">
        <div class="stat-number danger">7.2</div>
        <div class="stat-label">Base risk</div>
      </div>
      <div class="stat-card">
        <div class="stat-number success">${selected.score}</div>
        <div class="stat-label">Target risk</div>
      </div>
      <div class="stat-card">
        <div class="stat-number success">2</div>
        <div class="stat-label">Improved clauses</div>
      </div>
      <div class="stat-card">
        <div class="stat-number warning">1</div>
        <div class="stat-label">Open concerns</div>
      </div>
    </div>

    <div class="card mb-20">
      <div class="flex justify-between items-center mb-12">
        <div>
          <p class="section-label">Comparison summary</p>
          <p class="fs-13 fw-500 text-primary m-0">${selected.name}</p>
        </div>
        <button class="btn-sm" id="compare-open-summary-btn">Open target summary ↗</button>
      </div>
      <div class="flex flex-col gap-12">
        ${selected.deltas
          .map(
            (delta) => `
          <div class="card-surface compare-delta-row">
            <div class="flex items-start gap-10">
              <div class="severity-dot ${delta.tone === 'success' ? 'clear' : delta.tone === 'warning' ? 'review' : 'critical'} mt-4"></div>
              <div>
                <p class="fs-13 fw-500 text-primary mb-4">${delta.title}</p>
                <p class="meta-text m-0">${delta.detail}</p>
              </div>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}
