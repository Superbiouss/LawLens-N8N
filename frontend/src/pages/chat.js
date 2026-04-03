import {
  renderAgentStatusCard,
  renderChatMessage,
  renderPromptChips,
  renderChatHistoryPanel,
  renderTypingIndicator,
} from './shared/chat-ui.js';
import {
  createPendingAssistantMessage,
  createUserChatMessage,
  formatAgentError,
  formatAssistantMessage,
  getAgentStatusMeta,
  resolveAgentReply,
  fetchChatSessions,
  fetchChatMessages,
  createChatSession,
  saveChatMessage,
  deleteChatSession,
  getUserDisplayName,
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

export async function renderChat(container) {
  const state = {
    messages: [], // Start empty for animation
    sending: false,
    historyOpen: false,
    sessions: [],
    currentSessionId: null,
    isTyping: false,
  };

  const render = () => {
    const agentStatus = getAgentStatusMeta();

    container.innerHTML = `
      <div class="mb-24 flex justify-between items-center">
        <div>
          <h1 class="page-title">Normal Chat</h1>
          <p class="body-text mt-4">General-purpose legal chat powered by your configured AI agent.</p>
        </div>
      </div>

      <div class="workspace-shell">
        <div class="workspace-main with-divider">
          ${renderChatHistoryPanel(state.sessions, state.currentSessionId)}
          
          <div class="workspace-scroll" id="chat-thread">
            ${state.messages
              .map((message, index) => {
                const isFirst = index === 0 && message.role === 'assistant' && !state.currentSessionId;
                return `
                  ${renderChatMessage(message)}
                  ${isFirst ? `
                    <div class="flex gap-8 flex-wrap mt-12 mb-16 ml-44">
                      ${renderPromptChips(CHAT_STARTERS, 'data-chat-starter')}
                    </div>
                  ` : ''}
                `;
              })
              .join('')}
            ${state.isTyping ? renderTypingIndicator() : ''}
          </div>

          <div class="ask-bar p-16">
            <button class="history-toggle-btn mr-12" id="toggle-history-btn" title="View History">
              <i data-lucide="history"></i> History
            </button>
            <input type="text" id="chat-input" class="ask-input" placeholder="Ask a general legal question..." ${state.sending ? 'disabled' : ''} />
            <button class="btn-primary ask-send-btn ml-12" id="chat-send-btn" ${state.sending ? 'disabled' : ''}>${state.sending ? 'Sending...' : 'Send ↗'}</button>
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

    // Toggle history class
    const historyPanel = container.querySelector('#chat-history-panel');
    if (state.historyOpen) {
      historyPanel.classList.add('active');
    }

    bindChatInteractions(container, state, render, triggerInitialGreeting);

    setTimeout(() => {
      const thread = container.querySelector('#chat-thread');
      if (thread) thread.scrollTop = thread.scrollHeight;
    }, 0);
  };

  const triggerInitialGreeting = async () => {
    if (state.currentSessionId || state.messages.length > 0) return;
    
    state.isTyping = true;
    render();
    
    const name = await getUserDisplayName();
    
    // Natural delay
    await new Promise(r => setTimeout(r, 1000));
    
    state.isTyping = false;
    state.messages = [{
      role: 'assistant',
      html: `Hello **${name}**! Welcome to your **Normal Chat**. I'm here to help you brainstorm legal concepts, clarify legal jargon, or just discuss any of your general legal queries. What's on your mind today?`,
      animate: true
    }];
    render();
  };

  // Initial load
  state.sessions = await fetchChatSessions();
  render();
  triggerInitialGreeting();
}

function bindChatInteractions(container, state, render, triggerInitialGreeting) {
  const input = container.querySelector('#chat-input');

  // History Toggles
  container.querySelector('#toggle-history-btn')?.addEventListener('click', () => {
    state.historyOpen = true;
    render();
  });

  container.querySelector('#close-history-btn')?.addEventListener('click', () => {
    state.historyOpen = false;
    render();
  });

  // History Actions
  container.querySelectorAll('[data-session-id]').forEach(item => {
    item.addEventListener('click', async (e) => {
      if (e.target.closest('.history-delete-btn')) return;
      
      const sessionId = item.dataset.sessionId;
      if (state.currentSessionId === sessionId) return;

      state.sending = true;
      state.currentSessionId = sessionId;
      render();

      const messages = await fetchChatMessages(sessionId);
      state.messages = messages;
      state.sending = false;
      render();
    });
  });

  container.querySelectorAll('[data-session-delete]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const sessionId = btn.dataset.sessionDelete;
      const confirmed = confirm('Are you sure you want to delete this conversation?');
      if (!confirmed) return;

      const success = await deleteChatSession(sessionId);
      if (success) {
        state.sessions = state.sessions.filter(s => s.id !== sessionId);
        if (state.currentSessionId === sessionId) {
          state.currentSessionId = null;
          state.messages = [];
          triggerInitialGreeting();
        }
        render();
        window.showToast('Chat deleted.');
      }
    });
  });

  container.querySelector('#new-chat-btn')?.addEventListener('click', () => {
    state.currentSessionId = null;
    state.messages = [];
    state.historyOpen = false;
    render();
    triggerInitialGreeting();
  });

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

    const userMsg = createUserChatMessage(question);
    state.messages.push(userMsg);
    state.messages.push(createPendingAssistantMessage('Thinking...'));
    state.sending = true;
    input.value = '';
    render();

    try {
      // 1. Ensure we have a session
      if (!state.currentSessionId) {
        const session = await createChatSession(question);
        if (session) {
          state.currentSessionId = session.id;
          state.sessions = [session, ...state.sessions];
        }
      }

      // 2. Save user message
      if (state.currentSessionId) {
        await saveChatMessage(state.currentSessionId, 'user', question);
      }

      // 3. Get AI reply
      const reply = await getChatReply(question, state.messages);
      
      // 4. Update state and save AI message
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: formatAssistantMessage(reply),
        content: reply
      };

      if (state.currentSessionId) {
        await saveChatMessage(state.currentSessionId, 'assistant', reply);
      }
    } catch (error) {
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: formatAgentError(error),
      };
    } finally {
      state.sending = false;
      render();
      window.initIcons(); // Re-init icons for Lucide components
    }
  };

  container.querySelector('#chat-send-btn')?.addEventListener('click', submit);
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

  // Re-init lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
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
