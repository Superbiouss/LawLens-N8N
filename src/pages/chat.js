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

const CHAT_STARTERS = [
  'Draft a mutual NDA opening clause',
  'Explain liquidated damages in plain English',
  'What should I negotiate in a vendor agreement?',
];

const CHAT_FALLBACKS = [
  {
    test: /nda|non-disclosure/i,
    response:
      'A strong NDA usually defines confidential information clearly, limits use to a stated purpose, adds standard exclusions, and sets a reasonable confidentiality survival period.',
  },
  {
    test: /liquidated damages|penalty/i,
    response:
      'Liquidated damages are a pre-agreed estimate of loss for breach. They are strongest when the amount is commercially reasonable and not punitive.',
  },
  {
    test: /vendor|msa|service agreement/i,
    response:
      'For a vendor agreement, start with scope, service levels, data protection, IP ownership, limitation of liability, termination rights, and payment timing.',
  },
];

export function renderChat(container) {
  const state = {
    messages: [
      {
        role: 'assistant',
        html: 'Hi. I can help with legal drafting, negotiation prep, and general contract questions. What are you working on?',
      },
    ],
    sending: false,
  };

  const render = () => {
    const agentStatus = getAgentStatusMeta();

    container.innerHTML = `
      <div class="mb-24">
        <h1 class="page-title">Normal Chat</h1>
        <p class="body-text mt-4">General-purpose legal chat powered by your configured AI agent, separate from the document-specific Ask the Doc workflow.</p>
      </div>

      <div class="workspace-shell">
        <div class="workspace-main with-divider">
          <div class="workspace-scroll" id="chat-thread">
            <div class="chat-msg">
              <div class="chat-avatar ai">L</div>
              <div class="chat-bubble">
                <p>Hi. I can help with legal drafting, negotiation prep, and general contract questions. What are you working on?</p>
                <div class="flex gap-8 flex-wrap mt-12">
                  ${renderPromptChips(CHAT_STARTERS, 'data-chat-starter')}
                </div>
              </div>
            </div>
            ${state.messages
              .slice(1)
              .map((message) => renderChatMessage(message))
              .join('')}
          </div>

          <div class="ask-bar p-16">
            <input type="text" id="chat-input" class="ask-input" placeholder="Ask a general legal question..." ${state.sending ? 'disabled' : ''} />
            <button class="btn-primary ask-send-btn" id="chat-send-btn" ${state.sending ? 'disabled' : ''}>${state.sending ? 'Sending...' : 'Send ↗'}</button>
          </div>
        </div>

        <div class="workspace-sidebar">
          ${renderAgentStatusCard(agentStatus, { buttonId: 'open-chat-agent-settings-btn' })}

          <p class="section-label">What This Chat Is For</p>
          <div class="card mb-16 p-12">
            <div class="flex flex-col gap-8">
              <div class="meta-text">General legal concepts</div>
              <div class="meta-text">Negotiation talking points</div>
              <div class="meta-text">Drafting help</div>
              <div class="meta-text">Clause brainstorming</div>
            </div>
          </div>

          <p class="section-label">Quick Jump</p>
          <div class="flex flex-col gap-8">
            <button class="btn-sm w-full justify-start" data-chat-nav="upload">Analyze a document</button>
            <button class="btn-sm w-full justify-start" data-chat-nav="clause-library">Open clause library</button>
            <button class="btn-sm w-full justify-start" data-chat-nav="drafting">Go to drafting assistant</button>
          </div>
        </div>
      </div>
    `;

    bindChatInteractions(container, state, render);

    setTimeout(() => {
      const thread = container.querySelector('#chat-thread');
      if (thread) thread.scrollTop = thread.scrollHeight;
    }, 0);
  };

  render();
}

function bindChatInteractions(container, state, render) {
  container
    .querySelector('#open-chat-agent-settings-btn')
    ?.addEventListener('click', () => {
      sessionStorage.setItem('settings_tab_prefill', 'api');
      window.navigateTo('settings');
    });

  container.querySelectorAll('[data-chat-nav]').forEach((button) => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.chatNav);
    });
  });

  const input = container.querySelector('#chat-input');

  container.querySelectorAll('[data-chat-starter]').forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.chatStarter;
      input.focus();
    });
  });

  const submit = async () => {
    const question = input.value.trim();
    if (!question || state.sending) {
      if (!question) window.showToast('Type a message first.');
      return;
    }

    state.messages.push(createUserChatMessage(question));
    state.messages.push(createPendingAssistantMessage('Thinking...'));
    state.sending = true;
    input.value = '';
    render();

    try {
      const reply = await getChatReply(question, state.messages);
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: formatAssistantMessage(reply),
      };
    } catch (error) {
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: formatAgentError(error),
      };
    } finally {
      state.sending = false;
      render();
    }
  };

  container.querySelector('#chat-send-btn')?.addEventListener('click', submit);
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });
}

async function getChatReply(question, messages) {
  return resolveAgentReply({
    question,
    messages,
    fallback: resolveChatFallback,
    context: {
      route: 'chat',
      mode: 'general',
      workspace: 'main',
    },
    conversationScope: 'general-chat',
  });
}

function resolveChatFallback(question) {
  return (
    CHAT_FALLBACKS.find((item) => item.test.test(question))?.response ||
    'The Normal Chat webhook is not configured yet, so this screen is using the local fallback responder. Configure your n8n webhook in Settings > API Keys to use your external LLM agent here.'
  );
}
