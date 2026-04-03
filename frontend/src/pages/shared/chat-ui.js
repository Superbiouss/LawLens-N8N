import { escapeHtml } from '../../services/text-utils.js';

export function renderChatMessage(message, options = {}) {
  const isUser = message.role === 'user';
  const userInitials = options.userInitials || 'JD';
  const assistantInitials = options.assistantInitials || 'L';
  const animationClass = message.animate ? 'animate-chat-entry' : '';

  return `
    <div class="chat-msg ${animationClass}">
      <div class="chat-avatar ${isUser ? 'user chat-avatar-muted' : 'ai'}">${isUser ? userInitials : assistantInitials}</div>
      <div class="chat-bubble${message.pending ? ' chat-bubble-pending' : ''}">
        <p class="${isUser ? 'text-primary' : ''}">${message.html}</p>
      </div>
    </div>
  `;
}

export function renderTypingIndicator(assistantInitials = 'L') {
  return `
    <div class="chat-msg animate-chat-entry" id="typing-indicator">
      <div class="chat-avatar ai">${assistantInitials}</div>
      <div class="chat-bubble">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;
}

export function renderPromptChips(items, dataAttribute) {
  return items
    .map(
      (item) => `
    <button type="button" class="reset-btn badge badge-neutral chat-chip" ${dataAttribute}="${escapeHtml(item)}">
      ${escapeHtml(item)}
    </button>
  `,
    )
    .join('');
}

export function renderAgentStatusCard(status, options = {}) {
  const buttonId = options.buttonId || 'open-agent-settings-btn';
  const buttonLabel = options.buttonLabel || 'Configure';

  return `
    <div class="ask-agent-status ${status.tone}">
      <div>
        <p class="section-label mb-4">AI Agent</p>
        <p class="meta-text m-0">${escapeHtml(status.description)}</p>
      </div>
      <button class="btn-sm" id="${buttonId}">${escapeHtml(buttonLabel)}</button>
    </div>
  `;
}

export function renderChatHistoryPanel(sessions, currentSessionId) {
  return `
    <div class="chat-history-panel" id="chat-history-panel">
      <div class="panel-header">
        <p class="section-label m-0">Conversation History</p>
        <button class="btn-icon-sm" id="close-history-btn" title="Close History">×</button>
      </div>
      <div class="panel-body">
        <button class="btn-sm w-full mb-12 justify-center" id="new-chat-btn">
          New Chat
        </button>
        <div class="history-list">
          ${sessions.length === 0 ? '<p class="meta-text p-16 text-center">No past chats yet.</p>' : sessions.map(s => renderChatHistoryItem(s, currentSessionId)).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderChatHistoryItem(session, currentSessionId) {
  const isActive = session.id === currentSessionId;
  return `
    <div class="history-item ${isActive ? 'active' : ''}" data-session-id="${session.id}">
      <div class="history-title" title="${escapeHtml(session.title)}">${escapeHtml(session.title)}</div>
      <button class="history-delete-btn" title="Delete conversation" data-session-delete="${session.id}">
        Delete
      </button>
    </div>
  `;
}
