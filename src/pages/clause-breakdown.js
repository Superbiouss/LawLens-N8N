import { bindRouteTabs, DOCUMENT_TABS, renderPageTabs } from './shared/page-tabs.js';
import { copyText, escapeHtml } from './shared/ui-actions.js';

const CLAUSES = [
  { id: '1', title: '1. Definition of Confidential Info', risk: 'success', original: 'Confidential Information means all information disclosed by the Disclosing Party in written, oral, graphic, or machine-readable form and marked confidential.', plain: 'This clause defines what information counts as protected under the NDA.', analysis: 'This is a standard definition clause with balanced drafting.' },
  { id: '2', title: '2. Obligations of Receiving Party', risk: 'warning', original: 'The Receiving Party shall use the Confidential Information solely for the Evaluation Purpose and shall protect it with at least reasonable care.', plain: 'The recipient can only use the information for the stated business purpose and must keep it protected.', analysis: 'The duty of care is acceptable, but the purpose language should stay narrow.' },
  { id: '3', title: '3. Exclusions from Confidentiality', risk: 'success', original: 'Confidentiality obligations do not apply to information that is public, previously known, independently developed, or lawfully received from a third party.', plain: 'Some information is excluded if it was already public or known independently.', analysis: 'This is a healthy carve-out and reduces overreach.' },
  { id: '4', title: '4. Term and Termination', risk: 'danger', original: 'This Agreement shall commence on the Effective Date and shall remain in full force and effect for an unlimited period of time. The obligations of confidentiality imposed upon the Receiving Party shall continue in perpetuity.', plain: 'This contract never really ends. The confidentiality obligations continue forever.', analysis: 'Unlimited confidentiality obligations are unusually aggressive. Standard NDAs usually sunset after 2-5 years.' },
  { id: '5', title: '5. Return of Materials', risk: 'success', original: 'Upon written request, the Receiving Party shall promptly return or destroy all Confidential Information and certify destruction if requested.', plain: 'If asked, the recipient has to return or destroy the confidential material.', analysis: 'This is a standard and useful clean-up obligation.' },
  { id: '6', title: '6. No License Granted', risk: 'success', original: 'No license or other rights in any intellectual property are granted or implied by disclosure of Confidential Information.', plain: 'Sharing information does not mean the other party gets any IP rights.', analysis: 'A routine protective clause with no obvious imbalance.' },
  { id: '7', title: '7. Liquidated Damages', risk: 'danger', original: 'Recipient shall pay liquidated damages of $500,000 per violation in the event of any breach of confidentiality.', plain: 'A breach automatically triggers a $500,000 payment.', analysis: 'This is very aggressive and likely over-penalizes even minor breaches.' },
  { id: '8', title: '8. Governing Law', risk: 'warning', original: 'This Agreement shall be governed by the laws of Delaware, and disputes shall be resolved exclusively in Delaware courts.', plain: 'All disputes have to be handled under Delaware law and in Delaware courts.', analysis: 'This may be expensive and inconvenient for non-US counterparties.' },
  { id: '9', title: '9. Assignment', risk: 'danger', original: 'Disclosing Party may assign this Agreement without the consent of the Receiving Party.', plain: 'Acme can transfer the agreement without asking you first.', analysis: 'This is one-sided and should be made mutual or consent-based.' },
  { id: '10', title: '10. Severability', risk: 'success', original: 'If any part of this Agreement is held unenforceable, the remainder shall continue in full force and effect.', plain: 'If one clause is invalid, the rest of the contract still stands.', analysis: 'Standard boilerplate with low risk.' },
  { id: '11', title: '11. Entire Agreement', risk: 'success', original: 'This Agreement constitutes the entire understanding between the parties regarding Confidential Information.', plain: 'This document is the complete agreement on confidentiality.', analysis: 'Standard integration language.' },
];

const ASK_PROMPTS = [
  'What is the standard duration for a software NDA?',
  'How does this affect my trade secrets?',
  'Draft an email to opposing counsel declining this.',
];

export function renderClauseBreakdown(container) {
  const state = {
    activeIndex: 3,
    search: '',
    notes: [],
  };

  const render = () => {
    const visibleClauses = CLAUSES.filter(clause =>
      clause.title.toLowerCase().includes(state.search.toLowerCase()),
    );
    const activeClause = CLAUSES[state.activeIndex];

    container.innerHTML = `
      ${renderPageTabs(DOCUMENT_TABS, 'clause-breakdown', { flush: true })}

      <div class="clause-layout">
        <div class="clause-left">
          <div class="p-16 border-top-tertiary clause-search-shell">
            <input type="text" id="clause-search-input" placeholder="Search clauses..." value="${escapeHtml(state.search)}" />
          </div>
          <div class="flex-1 overflow-y-auto">
            ${visibleClauses.map(clause => `
              <button type="button" class="reset-btn clause-item${clause.id === activeClause.id ? ' active' : ''}" data-clause-id="${clause.id}">
                <div class="severity-dot ${clause.risk === 'danger' ? 'critical' : clause.risk === 'warning' ? 'review' : 'clear'}"></div>
                <span class="fs-13 clause-item-copy">${clause.title}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="clause-middle">
          <div class="mb-24 flex items-center justify-between">
            <div>
              <h2 class="page-title">${activeClause.title}</h2>
              <div class="meta-text mt-8">Clause ${activeClause.id} · Document preview</div>
            </div>
            <span class="badge badge-${activeClause.risk === 'danger' ? 'danger' : activeClause.risk === 'warning' ? 'warning' : 'success'}">${activeClause.risk === 'danger' ? 'Critical Risk' : activeClause.risk === 'warning' ? 'Review' : 'Clear'}</span>
          </div>

          <p class="section-label">Original text</p>
          <div class="clause-text mb-32">${activeClause.original}</div>

          <p class="section-label">Plain English translation</p>
          <p class="body-text fs-15 lh-17 text-primary mb-32">${activeClause.plain}</p>

          <p class="section-label">Red flag analysis</p>
          <div class="card-accent-left ${activeClause.risk === 'warning' ? 'warning' : activeClause.risk === 'success' ? 'success' : 'danger'} mb-16">
            <p class="fs-13 fw-500 text-primary mb-8">${activeClause.title}</p>
            <p class="body-text mb-12">${activeClause.analysis}</p>
            <div class="card-surface mt-8">
              <div class="micro-label mb-4">Suggested fix</div>
              <div class="body-text fs-12">${activeClause.risk === 'danger' ? 'Replace open-ended language with a time-bound obligation and add balanced termination rights.' : activeClause.risk === 'warning' ? 'Consider narrowing the scope or aligning the clause to your preferred fallback position.' : 'No material change required in the UI preview.'}</div>
            </div>
          </div>

          <div class="flex justify-between clause-footer-nav">
            <button class="btn border-transparent" id="prev-clause-btn" ${state.activeIndex === 0 ? 'disabled' : ''}>‹ Previous clause</button>
            <button class="btn text-info border-transparent" id="next-clause-btn" ${state.activeIndex === CLAUSES.length - 1 ? 'disabled' : ''}>Next clause ›</button>
          </div>
        </div>

        <div class="clause-right">
          <p class="section-label">Annotations</p>
          <div class="card mb-16 p-12">
            <textarea id="clause-note-input" placeholder="Add a note or comment for your team..." class="fs-13 clause-note-input"></textarea>
            <div class="flex justify-between items-center mt-12">
              <span class="meta-text">Only visible to your team</span>
              <button class="btn-sm btn-primary" id="post-clause-note-btn">Post</button>
            </div>
          </div>

          <div class="flex flex-col gap-8 mb-16" id="clause-note-list">
            ${state.notes.map(note => `
              <div class="card-surface">
                <div class="meta-text mb-4">John Doe · Just now</div>
                <div class="fs-12 text-primary">${escapeHtml(note)}</div>
              </div>
            `).join('')}
          </div>

          <p class="section-label">Ask about this clause</p>
          <div class="flex flex-col gap-8 mb-24">
            ${ASK_PROMPTS.map(prompt => `
              <button type="button" class="reset-btn card hover-bg-secondary clause-ask-item text-left" data-ask-prompt="${prompt}">
                <span class="clause-ask-item-text">${prompt}</span>
              </button>
            `).join('')}
          </div>

          <p class="section-label">Export clause</p>
          <div class="card p-12">
            <p class="meta-text mb-12">Copy the analysis or original text for use in emails or redlines.</p>
            <div class="flex flex-col gap-8">
              <button class="btn-sm justify-start" id="copy-clause-original-btn">Copy original text</button>
              <button class="btn-sm justify-start" id="copy-clause-analysis-btn">Copy translation & analysis</button>
            </div>
          </div>
        </div>
      </div>
    `;

    bindRouteTabs(container);
    bindClauseBreakdownActions(container, state, render, visibleClauses);

    setTimeout(() => {
      if (window.updateTabIndicator) {
        window.updateTabIndicator(container.querySelector('.nav-tabs'));
      }
    }, 0);
  };

  render();
}

function bindClauseBreakdownActions(container, state, render, visibleClauses) {
  container.querySelector('#clause-search-input')?.addEventListener('input', event => {
    state.search = event.target.value;
    render();
  });

  container.querySelectorAll('[data-clause-id]').forEach(button => {
    button.addEventListener('click', () => {
      const index = CLAUSES.findIndex(clause => clause.id === button.dataset.clauseId);
      if (index >= 0) {
        state.activeIndex = index;
        render();
      }
    });
  });

  container.querySelector('#prev-clause-btn')?.addEventListener('click', () => {
    if (state.activeIndex > 0) {
      state.activeIndex -= 1;
      render();
    }
  });

  container.querySelector('#next-clause-btn')?.addEventListener('click', () => {
    if (state.activeIndex < CLAUSES.length - 1) {
      state.activeIndex += 1;
      render();
    }
  });

  container.querySelector('#post-clause-note-btn')?.addEventListener('click', () => {
    const input = container.querySelector('#clause-note-input');
    const note = input.value.trim();
    if (!note) {
      window.showToast('Write a note first.');
      return;
    }
    state.notes.unshift(note);
    render();
    window.showToast('Clause note posted.');
  });

  container.querySelectorAll('[data-ask-prompt]').forEach(button => {
    button.addEventListener('click', () => {
      sessionStorage.setItem('ask_prefill', button.dataset.askPrompt);
      window.navigateTo('ask');
    });
  });

  const activeClause = CLAUSES[state.activeIndex];
  container.querySelector('#copy-clause-original-btn')?.addEventListener('click', () => {
    copyText(activeClause.original, 'Original clause copied.');
  });
  container.querySelector('#copy-clause-analysis-btn')?.addEventListener('click', () => {
    copyText(`${activeClause.plain}\n\n${activeClause.analysis}`, 'Clause analysis copied.');
  });

  if (!visibleClauses.some(clause => clause.id === activeClause.id) && visibleClauses.length > 0) {
    state.activeIndex = CLAUSES.findIndex(clause => clause.id === visibleClauses[0].id);
    render();
  }
}
