import { bindRouteTabs, DOCUMENT_TABS, renderPageTabs } from './shared/page-tabs.js';
import { downloadTextFile } from './shared/ui-actions.js';

const RISK_ISSUES = [
  {
    tone: 'critical',
    title: 'Unlimited confidentiality term',
    clause: 'Clause 1',
    badge: 'Critical',
    body: 'The NDA imposes confidentiality obligations with no end date. Unlike standard NDAs which expire after 2-5 years, this binds you permanently - even if the partnership never materialises or ends years from now.',
    impact: 'Perpetual legal exposure with no exit mechanism, even after the business relationship ends.',
    fix: 'Replace "unlimited period of time" with "a period of 3 years from the date of disclosure." This is industry standard and rarely contested.',
  },
  {
    tone: 'critical',
    title: '$500,000 liquidated damages - no harm required',
    clause: 'Clause 3',
    badge: 'Critical',
    body: 'The penalty clause sets a fixed $500,000 per-breach fee regardless of what harm, if any, Acme Corp actually suffers. In practice, a single accidental disclosure - even a forwarded email - could trigger this clause.',
    impact: "Disproportionate financial liability uncoupled from actual damages. Courts in some jurisdictions may invalidate it, but you'd still face litigation costs.",
    fix: 'Push to remove the liquidated damages clause entirely, or cap it at actual documented losses. Add a gross negligence/wilful misconduct threshold before it triggers.',
  },
  {
    tone: 'critical',
    title: 'Unilateral assignment - no consent required',
    clause: 'Clause 4',
    badge: 'Critical',
    body: 'Acme Corp can transfer this agreement to any successor entity - including a competitor - without notifying or obtaining consent from you. Your obligations follow regardless of who now holds the other side of the contract.',
    impact: 'You could end up contractually bound to an unknown third party you never agreed to deal with.',
    fix: `Add "…provided that the Receiving Party's prior written consent is obtained, not to be unreasonably withheld." Both parties should have equal assignment rights.`,
  },
  {
    tone: 'review',
    title: 'Exclusive jurisdiction in Delaware',
    clause: 'Clause 5',
    badge: 'Review',
    body: 'All disputes must be litigated exclusively in Delaware courts. If you are based outside the US, this creates a significant logistical and financial burden to defend any claim.',
    fix: `Propose mutual jurisdiction in the defendant's home country, or ICC arbitration as a neutral alternative.`,
  },
];

const MISSING_CLAUSES = [
  {
    title: 'No return or destruction of materials clause',
    body: 'Without this, there is no mechanism to formally end the exchange of confidential materials. Standard NDAs require the Receiving Party to return or certifiably destroy all copies on request or at termination.',
  },
  { title: 'No residual knowledge carve-out' },
  { title: 'No mutual limitation of liability' },
];

const RISK_DIMENSIONS = [
  { label: 'Financial', score: 9, color: 'danger', pct: 90 },
  { label: 'Term & exit', score: 8, color: 'danger', pct: 80 },
  { label: 'Jurisdiction', score: 6, color: 'warning', pct: 60 },
  { label: 'Scope / purpose', score: 6, color: 'warning', pct: 60 },
  { label: 'Assignment', score: 8, color: 'danger', pct: 80 },
  { label: 'Boilerplate', score: 2, color: 'success', pct: 20 },
];

export function renderRiskReport(container) {
  container.innerHTML = `
    ${renderPageTabs(DOCUMENT_TABS, 'risk-report')}

    <div class="layout-2col">
      <div>
        <div class="card-accent-left mb-16 risk-hero">
          <div class="risk-hero-score">
            <div class="fs-32 fw-500 text-danger summary-score-tight">7.2</div>
            <div class="meta-text mt-4">/ 10</div>
            <div class="badge badge-danger mt-8 risk-badge-plain">High risk</div>
          </div>
          <div class="risk-hero-main">
            <p class="section-heading mb-8">This document carries significant risk for the Receiving Party</p>
            <p class="body-text mb-12">3 critical issues, 2 items needing review, and 4 standard protections are missing. The terms are heavily weighted in Acme Corp's favour. Do not sign without negotiation.</p>
            <div class="progress-track mb-4"><div class="progress-bar risk-progress-danger"></div></div>
            <div class="flex justify-between meta-text fs-10"><span>Low</span><span>Medium</span><span>High</span></div>
          </div>
        </div>

        <div class="stats-row mb-16">
          <div class="stat-card">
            <div class="stat-number danger">3</div>
            <div class="stat-label">Critical flags</div>
          </div>
          <div class="stat-card">
            <div class="stat-number warning">2</div>
            <div class="stat-label">Review items</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Missing clauses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number success">3</div>
            <div class="stat-label">Clear clauses</div>
          </div>
        </div>

        <div class="flex justify-between items-center mb-16">
          <h2 class="section-label m-0">Issues found</h2>
          <div class="flex gap-6 flex-wrap">
            <button type="button" class="reset-btn pill active" data-filter="all">All (9)</button>
            <button type="button" class="reset-btn pill pill-danger-outline" data-filter="critical">Critical (3)</button>
            <button type="button" class="reset-btn pill pill-warning-outline" data-filter="review">Review (2)</button>
            <button type="button" class="reset-btn pill" data-filter="missing">Missing (4)</button>
          </div>
        </div>

        <div class="flex flex-col gap-10 stagger" id="risk-issues">
          ${renderIssueCards()}
        </div>

        <div id="risk-missing-section">
          <p class="section-label mt-24">Missing standard clauses</p>
          ${renderMissingCards()}
        </div>
      </div>

      <div>
        <p class="section-label">Verdict</p>
        <div class="card-surface mb-12 risk-verdict">
          <div class="meta-text mb-4">Should you sign as-is?</div>
          <div class="fs-13 fw-500 text-danger">No - negotiate first</div>
        </div>
        <div class="card-surface mb-12 risk-verdict">
          <div class="meta-text mb-4">Negotiation priority</div>
          <div class="fs-13 fw-500 text-warning">3 clauses to fix</div>
        </div>
        <div class="card-surface mb-24 risk-verdict">
          <div class="meta-text mb-4">Overall balance</div>
          <div class="fs-13 fw-500 text-danger">Favours Acme Corp</div>
        </div>

        <p class="section-label">Clause balance</p>
        <div class="flex gap-4 items-end mb-24 risk-balance-chart">
          <div class="card-surface flex-1 text-center flex flex-col justify-end risk-balance-col">
            <div class="risk-balance-title">Acme Corp</div>
            <div class="risk-balance-bar-danger"></div>
            <div class="fs-11 fw-500 text-danger mt-8">8 favourable</div>
          </div>
          <div class="meta-text risk-balance-vs">vs</div>
          <div class="card-surface flex-1 text-center flex flex-col justify-end risk-balance-col">
            <div class="risk-balance-title">John Doe</div>
            <div class="risk-balance-bar-muted"></div>
            <div class="fs-11 fw-500 text-tertiary mt-8">3 favourable</div>
          </div>
        </div>

        <p class="section-label">Risk dimensions</p>
        <div class="flex flex-col gap-8 mb-24">
          ${renderRiskDimensions()}
        </div>

        <p class="section-label">Compare with similar docs</p>
        <div class="card-surface mb-24">
          <div class="flex justify-between mb-8">
            <span class="meta-text">Avg. NDA risk score</span>
            <span class="fs-12 fw-500 text-primary">4.1 / 10</span>
          </div>
          <div class="flex justify-between mb-8">
            <span class="meta-text">This document</span>
            <span class="fs-12 fw-500 text-danger">7.2 / 10</span>
          </div>
          <div class="flex justify-between">
            <span class="meta-text">Riskier than</span>
            <span class="fs-12 fw-500 text-danger">89% of NDAs</span>
          </div>
        </div>

        <div class="flex flex-col gap-8">
          <button class="btn-full" data-nav-target="compare">Compare with another version ↗</button>
          <button class="btn-full" id="download-risk-report-btn">Download risk report PDF ↗</button>
        </div>
      </div>
    </div>
  `;

  bindRouteTabs(container);
  bindRiskActions(container);

  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('.nav-tabs'));
    }
  }, 0);
}

function renderIssueCards() {
  return RISK_ISSUES.map(issue => `
    <div class="flag-card ${issue.tone}">
      <div class="flag-head">
        <div class="severity-dot ${issue.tone}"></div>
        <span class="flag-title">${issue.title}</span>
        <span class="meta-text fs-10 ml-auto mr-6">${issue.clause}</span>
        <span class="badge badge-${issue.tone === 'critical' ? 'danger' : 'warning'}">${issue.badge}</span>
      </div>
      <div class="flag-body">
        <p class="body-text mb-12">${issue.body}</p>
        ${issue.impact ? `
          <div class="flex items-start gap-8 mb-12">
            <span class="micro-label pt-2">Impact</span>
            <span class="fs-12 text-${issue.tone === 'critical' ? 'danger' : 'warning'} lh-15">${issue.impact}</span>
          </div>
        ` : ''}
        <div class="card-surface mt-8 mb-12">
          <div class="micro-label mb-4">Suggested fix</div>
          <div class="body-text fs-12">${issue.fix}</div>
        </div>
        ${issue.tone === 'critical' ? `
          <div class="flex gap-8">
            <button class="btn-sm" data-nav-target="clause-breakdown">View clause ↗</button>
            <button class="btn-sm" data-nav-target="annotations">Add note ↗</button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderMissingCards() {
  return MISSING_CLAUSES.map(item => `
    <div class="flag-card missing">
      <div class="flag-head risk-missing-head">
        <div class="severity-dot missing"></div>
        <span class="flag-title">${item.title}</span>
        <span class="badge badge-neutral">Missing</span>
      </div>
      ${item.body ? `
        <div class="flag-body p-14">
          <p class="body-text m-0">${item.body}</p>
        </div>
      ` : ''}
    </div>
  `).join('');
}

function renderRiskDimensions() {
  return RISK_DIMENSIONS.map(dimension => `
    <div class="flex items-center gap-8">
      <span class="meta-text risk-dimension-label">${dimension.label}</span>
      <div class="progress-track risk-dimension-track"><div class="progress-bar" style="width:${dimension.pct}%;background:var(--color-text-${dimension.color});"></div></div>
      <span class="risk-dimension-score text-${dimension.color}">${dimension.score}</span>
    </div>
  `).join('');
}

function bindRiskActions(container) {
  container.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      container.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      applyRiskFilter(container, button.dataset.filter);
    });
  });

  container.querySelectorAll('.btn-sm[data-nav-target], .btn-full[data-nav-target]').forEach(button => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.navTarget);
    });
  });

  container.querySelector('#download-risk-report-btn')?.addEventListener('click', () => {
    downloadTextFile('risk-report.txt', [
      'LexAI Risk Report Preview',
      '',
      'Overall risk: 7.2 / 10',
      'Critical issues: 3',
      'Review items: 2',
      'Missing clauses: 4',
      '',
      ...RISK_ISSUES.map(issue => `- ${issue.title}: ${issue.fix}`),
    ].join('\n'));
  });
}

function applyRiskFilter(container, filter) {
  container.querySelectorAll('#risk-issues .flag-card').forEach(card => {
    card.classList.toggle('hidden', filter !== 'all' && !card.classList.contains(filter));
  });

  const missingSection = container.querySelector('#risk-missing-section');
  if (missingSection) {
    missingSection.classList.toggle('hidden', !['all', 'missing'].includes(filter));
  }
}
