import {
  renderAgentStatusCard,
  renderChatMessage,
  renderPromptChips,
  renderChatHistoryPanel,
  renderTypingIndicator,
  renderChatError,
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
  deleteChatMessage,
  getUserDisplayName,
  updateChatSessionTitle,
  generateChatTitleAI,
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
  container.className = 'chat-page-container';
  const state = {
    messages: [], // Start empty for animation
    sending: false,
    historyOpen: false,
    sessions: [],
    currentSessionId: null,
    isTyping: false,
  };

  const render = () => {
    container.innerHTML = `
      <div class="chat-glow-1"></div>
      <div class="chat-glow-2"></div>
      
      <div class="workspace-shell">
        <div class="workspace-main">
          <header class="chat-header-minimal">
            <span class="chat-title-badge">Normal Chat</span>
          </header>

          <div class="workspace-scroll" id="chat-thread">
            <div class="chat-thread-inner">
              ${state.messages.length === 0 && !state.isTyping ? `
                <div class="premium-empty-hero animate-chat-entry">
                  <div class="hero-logo-orb">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h1>How can LawLens help today?</h1>
                  <p>I'm your dedicated legal intelligence assistant. Ask me to draft clauses, analyze risks, or explain complex legal concepts.</p>
                  <div class="flex gap-12 flex-wrap justify-center mt-32">
                    ${renderPromptChips(CHAT_STARTERS, 'data-chat-starter')}
                  </div>
                </div>
              ` : `
                ${state.messages
                  .map((message) => renderChatMessage(message))
                  .join('')}
                ${state.isTyping ? renderTypingIndicator() : ''}
              `}
              <div id="anchor"></div>
            </div>
          </div>

          <div class="ask-container-sleek">
            <div class="chat-thread-inner">
              <div class="ask-bar-premium">
                <input type="text" id="chat-input" class="ask-input-premium" placeholder="Message LawLens..." autocomplete="off" />
                <button class="ask-send-btn-premium" id="chat-send-btn" ${state.sending ? 'disabled' : ''} title="Send Message">
                  <i data-lucide="arrow-up" style="width: 20px; height: 20px;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside class="chat-history-sidebar">
          ${renderChatHistoryPanel(state.sessions, state.currentSessionId, true)}
        </aside>
      </div>
    `;

    bindChatInteractions(container, state, render, triggerInitialGreeting);

    if (window.lucide) {
      window.lucide.createIcons();
    }

    scrollToBottom();
  };

  const scrollToBottom = (force = false) => {
    setTimeout(() => {
      const anchor = container.querySelector('#anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: force ? 'auto' : 'smooth', block: 'end' });
      }
    }, 50);
  };

  const triggerInitialGreeting = async () => {
    if (state.currentSessionId || state.messages.length > 0) return;
    
    state.isTyping = true;
    render();
    
    const name = await getUserDisplayName();
    await new Promise(r => setTimeout(r, 1200));
    
    const greetingText = `Hello ${name || 'there'}! I'm LAWLENS. I've been trained on thousands of legal documents to help you with research, drafting, and analysis. What can we look at together?`;
    
    state.isTyping = false;
    state.messages = [{
      role: 'assistant',
      html: formatAssistantMessage(greetingText),
      content: greetingText,
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
    render();
    triggerInitialGreeting();
  });

  container.querySelectorAll('[data-chat-starter]').forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.chatStarter;
      input.focus();
    });
  });

  // Message Actions (Copy/Delete)
  container.addEventListener('click', async (e) => {
    const copyBtn = e.target.closest('.copy-msg-btn');
    if (copyBtn) {
      const msgRow = copyBtn.closest('.chat-msg');
      const text = state.messages.find((m, i) => i === Array.from(msgRow.parentNode.children).indexOf(msgRow))?.content;
      if (text) {
        navigator.clipboard.writeText(text);
        window.showToast('Copied to clipboard.');
      }
      return;
    }

    const deleteBtn = e.target.closest('.delete-msg-btn');
    if (deleteBtn) {
      const msgRow = deleteBtn.closest('.chat-msg');
      const idx = Array.from(msgRow.parentNode.children).indexOf(msgRow);
      const msg = state.messages[idx];
      
      if (msg.id) {
        await deleteChatMessage(msg.id);
      }
      
      state.messages.splice(idx, 1);
      render();
      window.showToast('Message deleted.');
      return;
    }

    const retryBtn = e.target.closest('#retry-chat-btn');
    if (retryBtn) {
      const lastUserMsg = [...state.messages].reverse().find(m => m.role === 'user');
      if (lastUserMsg) {
        state.messages = state.messages.filter(m => m !== state.messages[state.messages.length - 1]);
        input.value = lastUserMsg.content;
        submit();
      }
    }
  });

  const submit = async () => {
    const question = input.value.trim();
    if (!question || state.sending) return;

    const userMsg = createUserChatMessage(question);
    state.messages.push(userMsg);
    state.messages.push(createPendingAssistantMessage('Thinking...'));
    state.sending = true;
    input.value = '';
    render();

    try {
      if (!state.currentSessionId) {
        const session = await createChatSession(question);
        if (session) {
          state.currentSessionId = session.id;
          state.sessions = [session, ...state.sessions];
          if (state.messages.length > 0 && state.messages[0].role === 'assistant') {
            const savedGreeting = await saveChatMessage(session.id, 'assistant', state.messages[0].content);
            if (savedGreeting) state.messages[0].id = savedGreeting.id;
          }
        }
      }

      if (state.currentSessionId) {
        const savedUserMsg = await saveChatMessage(state.currentSessionId, 'user', question);
        if (savedUserMsg) state.messages[state.messages.length - 2].id = savedUserMsg.id;
      }

      const reply = await getChatReply(question, state.messages);
      const savedAiMsg = state.currentSessionId 
        ? await saveChatMessage(state.currentSessionId, 'assistant', reply)
        : null;

      state.messages[state.messages.length - 1] = {
        id: savedAiMsg?.id,
        role: 'assistant',
        html: formatAssistantMessage(reply),
        content: reply
      };

      if (state.messages.length === 3) {
        const aiTitle = await generateChatTitleAI(question, reply);
        if (aiTitle) {
          await updateChatSessionTitle(state.currentSessionId, aiTitle);
          state.sessions = state.sessions.map(s => s.id === state.currentSessionId ? { ...s, title: aiTitle } : s);
        }
      }
    } catch (error) {
      state.messages[state.messages.length - 1] = {
        role: 'assistant',
        html: renderChatError(formatAgentError(error)),
      };
    } finally {
      state.sending = false;
      render();
      window.initIcons(); 
    }
  };

  container.querySelector('#chat-send-btn')?.addEventListener('click', submit);
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });

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
    'The Normal Chat webhook is not configured yet. Configure your agents in Settings to enable real-time intelligence.'
  );
}
