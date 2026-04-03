/* global window, document, sessionStorage, localStorage */
import {
  bindRouteTabs,
  DOCUMENT_TABS,
  renderPageTabs,
} from './shared/page-tabs.js';
import {
  renderAgentStatusCard,
  renderChatMessage,
  renderPromptChips,
} from './shared/chat-ui.js';
import {
  createPendingAssistantMessage,
  createUserChatMessage,
  formatAgentError,
  formatAssistantMessage,
  getAgentStatusMeta,
  resolveAgentReply,
} from '../services/chat-service.js';
import { getN8nAgentConfig } from '../services/n8n-agent.js';

const SUGGESTED_QUESTIONS = [
  'Summarize the obligations',
  'What are the red flags?',
  'Can I assign this?',
];

const HISTORY_ITEMS = ['Can I assign this?', 'What are the red flags?'];

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
    response: `In the UI preview, LAWLENS would point you to Section 74 of the Indian Contract Act and explain that courts usually award reasonable compensation rather than enforce a penalty mechanically.`,
  },
];

export function renderAsk(container) {
  const state = {
    messages: [
      {
        role: 'assistant',
        html: `Hi. I've analyzed the <strong>Acme Corp Non-Disclosure Agreement v3</strong>. What would you like to know about it?`,
      },
      {
        role: 'user',
        html: 'Is the $500K damages clause enforceable in India?',
      },
      {
        role: 'assistant',
        html: `Under Indian law (specifically Section 74 of the Indian Contract Act, 1872), courts generally do not enforce liquidated damages clauses as a "penalty." Instead, they only award reasonable compensation up to the maximum amount stipulated (in this case $500,000) based on the <em>actual</em> loss suffered <span class="citation-badge" title="View Clause 3">Clause 3</span>.<br/><br/>Because this clause sets a fixed, high penalty without requiring Acme Corp to prove actual harm, an Indian court is likely to view it as a penalty and require Acme to prove actual damages before awarding compensation.<br/><br/>However, you would still face the burden and cost of litigation to contest it if Acme Corp brought a suit.<div class="disclaimer-callout mt-16"><strong>Disclaimer:</strong> This analysis is AI-generated and does not constitute legal advice. Jurisdictional enforceability can depend on specific case facts. Consult a qualified Indian legal professional before taking action.</div>`,
      },
    ],
    sending: false,
  };

  const render = () => {
    const agentStatus = getAgentStatusMeta();

    container.innerHTML = `
      ${renderPageTabs(DOCUMENT_TABS, 'ask', { flush: true })}

      <div class="workspace-shell">
        <div class="workspace-main with-divider">
          <div class="workspace-scroll" id="ask-thread">
            ${renderMessages(state.messages)}
          </div>

          <div class="ask-bar p-16">
            <input type="text" id="ask-input" class="ask-input" placeholder="Ask anything about the Acme Corp NDA..." ${state.sending ? 'disabled' : ''} />
            <button class="btn-primary ask-send-btn" id="ask-send-btn" ${state.sending ? 'disabled' : ''}>${state.sending ? 'Sending...' : 'Send ↗'}</button>
          </div>
        </div>

        <div class="workspace-sidebar">
          ${renderAgentStatusCard(agentStatus, { buttonId: 'open-agent-settings-btn' })}

          <p class="section-label">Document Context</p>

          <div class="card mb-16 p-12">
            <div class="flex items-center gap-8 mb-8">
              <div class="icon-tile-sm icon-danger">
                <i data-lucide="file-text" style="color: var(--color-text-danger); width: 12px; height: 12px;"></i>
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
    bindAskInteractions(container, state, render);

    setTimeout(() => {
      if (window.updateTabIndicator) {
        window.updateTabIndicator(container.querySelector('.nav-tabs'));
      }

      const thread = container.querySelector('#ask-thread');
      if (thread) thread.scrollTop = thread.scrollHeight;
    }, 0);
  };

  render();
}

function renderMessages(messages) {
  const intro = `
    <div class="chat-msg">
      <div class="chat-avatar ai">L</div>
      <div class="chat-bubble">
        <p>Hi. I've analyzed the <strong>Acme Corp Non-Disclosure Agreement v3</strong>. What would you like to know about it?</p>
        <div class="flex gap-8 flex-wrap mt-12">
          ${renderPromptChips(SUGGESTED_QUESTIONS, 'data-question')}
        </div>
      </div>
    </div>
  `;

  const remaining = messages
    .slice(1)
    .map((message) => renderChatMessage(message))
    .join('');
  return `${intro}${remaining}`;
}

function renderHistoryItems() {
  return HISTORY_ITEMS.map(
    (item) => `
    <button type="button" class="reset-btn meta-text history-link" data-question="${item}">
      ${item}
    </button>
  `,
  ).join('');
}

function bindAskInteractions(container, state, render) {
  container.querySelectorAll('.context-clause-card').forEach((button) => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.navTarget);
    });
  });

  container
    .querySelector('#open-agent-settings-btn')
    ?.addEventListener('click', () => {
      sessionStorage.setItem('settings_tab_prefill', 'api');
      window.navigateTo('settings');
    });

  const input = container.querySelector('#ask-input');
  const prefetchedQuestion = sessionStorage.getItem('ask_prefill');

  container.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.question;
      input.focus();
    });
  });

  const submit = async () => {
    const question = input.value.trim();
    if (!question || state.sending) {
      if (!question) window.showToast('Type a question first.');
      return;
    }

    state.messages.push(createUserChatMessage(question));
    state.messages.push(createPendingAssistantMessage('Thinking...'));
    state.sending = true;
    input.value = '';
    render();

    try {
      const reply = await getAgentReply(question, state.messages);
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: formatAssistantMessage(reply),
      };
    } catch (error) {
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: formatAgentError(
          error,
          "I couldn't reach the configured AI agent. Check the webhook settings and try again.",
        ),
      };
    } finally {
      state.sending = false;
      render();
    }
  };

  container.querySelector('#ask-send-btn')?.addEventListener('click', () => {
    submit();
  });

  input?.addEventListener('keydown', (event) => {
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

async function getAgentReply(question, messages) {
  return resolveAgentReply({
    question,
    messages,
    fallback: resolveFallbackAnswer,
    context: {
      route: 'ask',
      documentName: 'Acme Corp NDA v3.pdf',
      documentId: 'acme-nda-v3', // This will be dynamic in later phases
      clauseCount: 11,
      riskLevel: 'High',
    },
    conversationScope: 'ask-doc',
  });
}

function resolveFallbackAnswer(question) {
  return (
    ASK_RESPONSES.find((item) => item.test.test(question))?.response ||
    'The n8n webhook is not configured yet, so this screen is using the built-in fallback answerer. Add your webhook in Settings > API Keys to route questions to your external LLM agent.'
  );
}
