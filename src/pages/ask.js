import { bindRouteTabs, DOCUMENT_TABS, renderPageTabs } from './shared/page-tabs.js';
import { escapeHtml } from './shared/ui-actions.js';

const SUGGESTED_QUESTIONS = [
  'Summarize the obligations',
  'What are the red flags?',
  'Can I assign this?',
];

const HISTORY_ITEMS = [
  'Can I assign this?',
  'What are the red flags?',
];

const ASK_RESPONSES = [
  {
    test: /red flag|risk/i,
    response: `The biggest red flags are the unlimited confidentiality term, the $500,000 liquidated damages clause, and the unilateral assignment right. Each of those is already marked critical in the risk report.`,
  },
  {
    test: /assign/i,
    response: `Not safely as written. The current draft lets Acme Corp assign the agreement without your consent, but it does not give you equivalent protection.`,
  },
  {
    test: /india|indian/i,
    response: `In the UI preview, LexAI would point you to Section 74 of the Indian Contract Act and explain that courts usually award reasonable compensation rather than enforce a penalty mechanically.`,
  },
];

export function renderAsk(container) {
  container.innerHTML = `
    ${renderPageTabs(DOCUMENT_TABS, 'ask', { flush: true })}

    <div class="workspace-shell">
      <div class="workspace-main with-divider">
        <div class="workspace-scroll" id="ask-thread">
          <div class="chat-msg">
            <div class="chat-avatar ai">L</div>
            <div class="chat-bubble">
              <p>Hi. I've analyzed the <strong>Acme Corp Non-Disclosure Agreement v3</strong>. What would you like to know about it?</p>
              <div class="flex gap-8 flex-wrap mt-12">
                ${renderSuggestedQuestions()}
              </div>
            </div>
          </div>

          <div class="chat-msg">
            <div class="chat-avatar user chat-avatar-muted">JD</div>
            <div class="chat-bubble">
              <p class="text-primary">Is the $500K damages clause enforceable in India?</p>
            </div>
          </div>

          <div class="chat-msg">
            <div class="chat-avatar ai">L</div>
            <div class="chat-bubble">
              <p>Under Indian law (specifically Section 74 of the Indian Contract Act, 1872), courts generally do not enforce liquidated damages clauses as a "penalty." Instead, they only award reasonable compensation up to the maximum amount stipulated (in this case $500,000) based on the <em>actual</em> loss suffered <span class="citation-badge" title="View Clause 3">Clause 3</span>.</p>
              <p>Because this clause sets a fixed, high penalty without requiring Acme Corp to prove actual harm, an Indian court is likely to view it as a penalty and require Acme to prove actual damages before awarding compensation.</p>
              <p>However, you would still face the burden and cost of litigation to contest it if Acme Corp brought a suit.</p>

              <div class="disclaimer-callout mt-16">
                <strong>Disclaimer:</strong> This analysis is AI-generated and does not constitute legal advice. Jurisdictional enforceability can depend on specific case facts. Consult a qualified Indian legal professional before taking action.
              </div>
            </div>
          </div>
        </div>

        <div class="ask-bar p-16">
          <input type="text" id="ask-input" class="ask-input" placeholder="Ask anything about the Acme Corp NDA..." />
          <button class="btn-primary ask-send-btn" id="ask-send-btn">Send ↗</button>
        </div>
      </div>

      <div class="workspace-sidebar">
        <p class="section-label">Document Context</p>

        <div class="card mb-16 p-12">
          <div class="flex items-center gap-8 mb-8">
            <div class="icon-tile-sm icon-danger">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <div class="context-card-title">Acme Corp NDA v3.pdf</div>
          </div>
          <div class="meta-text mb-4">6 pages · 11 clauses</div>
          <div class="badge badge-danger">High risk</div>
        </div>

        <p class="section-label">Referenced Clauses</p>
        <button type="button" class="reset-btn card-surface mb-16 hover-border-info context-clause-card w-full text-left" data-nav-target="clause-breakdown">
          <div class="flex justify-between items-center mb-4">
            <span class="fs-12 fw-500 text-info">Clause 3</span>
            <span class="badge badge-danger citation-tiny">Critical</span>
          </div>
          <p class="meta-text citation-copy m-0">Liquidated Damages: $500,000 per incident regardless of actual harm...</p>
        </button>

        <p class="section-label">History</p>
        <div class="flex flex-col gap-4">
          ${renderHistoryItems()}
        </div>
      </div>
    </div>
  `;

  bindRouteTabs(container);
  bindAskInteractions(container);

  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('.nav-tabs'));
    }
  }, 0);
}

function renderSuggestedQuestions() {
  return SUGGESTED_QUESTIONS.map(question => `
    <button type="button" class="reset-btn badge badge-neutral chat-chip" data-question="${question}">
      ${question}
    </button>
  `).join('');
}

function renderHistoryItems() {
  return HISTORY_ITEMS.map(item => `
    <button type="button" class="reset-btn meta-text history-link" data-question="${item}">
      ${item}
    </button>
  `).join('');
}

function bindAskInteractions(container) {
  container.querySelectorAll('.context-clause-card').forEach(button => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.navTarget);
    });
  });

  const input = container.querySelector('#ask-input');
  const thread = container.querySelector('#ask-thread');
  const prefetchedQuestion = sessionStorage.getItem('ask_prefill');

  container.querySelectorAll('[data-question]').forEach(button => {
    button.addEventListener('click', () => {
      input.value = button.dataset.question;
      input.focus();
    });
  });

  const submit = () => {
    const question = input.value.trim();
    if (!question) {
      window.showToast('Type a question first.');
      return;
    }

    appendChatMessage(thread, 'user', escapeHtml(question));
    appendChatMessage(thread, 'ai', escapeHtml(resolveAnswer(question)));
    input.value = '';
    thread.scrollTop = thread.scrollHeight;
  };

  container.querySelector('#ask-send-btn').addEventListener('click', submit);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

  if (prefetchedQuestion) {
    input.value = prefetchedQuestion;
    sessionStorage.removeItem('ask_prefill');
    submit();
  }
}

function resolveAnswer(question) {
  return ASK_RESPONSES.find(item => item.test.test(question))?.response
    || 'This UI preview can handle common contract questions locally. For document-specific legal reasoning beyond the demo, the backend AI analysis pipeline would answer here.';
}

function appendChatMessage(thread, tone, message) {
  const isUser = tone === 'user';
  thread.insertAdjacentHTML('beforeend', `
    <div class="chat-msg">
      <div class="chat-avatar ${isUser ? 'user chat-avatar-muted' : 'ai'}">${isUser ? 'JD' : 'L'}</div>
      <div class="chat-bubble">
        <p class="${isUser ? 'text-primary' : ''}">${message}</p>
      </div>
    </div>
  `);
}
