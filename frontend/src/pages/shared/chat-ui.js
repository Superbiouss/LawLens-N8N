import { escapeHtml } from '../../services/text-utils.js';

export function renderChatMessage(message, options = {}) {
  const isUser = message.role === 'user';
  const roleClass = isUser ? 'chat-msg-user' : 'chat-msg-ai';
  const userInitials = options.userInitials || 'U';
  const animationClass = message.animate ? 'animate-chat-entry' : '';

  const messageId = message.id || '';

  // AI Avatar is the Brand Logo Dot
  const aiAvatar = `
    <div class="chat-avatar ai">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    </div>
  `;

  const userAvatar = `
    <div class="chat-avatar user">${userInitials}</div>
  `;

  return `
    <div class="chat-msg ${roleClass} ${animationClass}" data-message-id="${messageId}" data-role="${message.role}">
      ${isUser ? userAvatar : aiAvatar}
      <div class="chat-bubble${message.pending ? ' chat-bubble-pending' : ''}">
        <div class="chat-bubble-content">
          ${message.html}
        </div>
        ${(!message.pending && isUser) ? `
          <div class="chat-actions">
            <button class="chat-action-btn delete-msg-btn" title="Delete message">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export function renderChatError(errorContent) {
  return `
    <div class="chat-msg animate-chat-entry chat-msg-error">
      <div class="chat-avatar ai chat-avatar-danger">!</div>
      <div class="chat-bubble chat-bubble-error">
        <div class="chat-bubble-content">
          ${errorContent}
        </div>
        <div class="mt-12">
          <button class="btn-sm btn-danger-outline" id="retry-chat-btn" style="display: inline-flex; align-items: center; gap: 6px;">
            <i data-lucide="refresh-cw"></i> Retry
          </button>
        </div>
      </div>
    </div>
  `;
}

export function renderTypingIndicator() {
  return `
    <div class="chat-msg chat-msg-ai animate-chat-entry" id="typing-indicator">
      <div class="chat-avatar ai">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
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
    <button type="button" class="reset-btn chat-chip" ${dataAttribute}="${escapeHtml(item)}">
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

export function renderChatHistoryPanel(sessions, currentSessionId, isSidebar = false) {
  return `
    <div class="${isSidebar ? 'chat-history-sidebar' : 'chat-history-panel'}" id="chat-history-panel">
      <div class="panel-header">
        <p class="section-label m-0">
          <i data-lucide="clock" style="width:16px; height:16px;"></i>
          History
        </p>
        ${!isSidebar ? '<button class="btn-icon-sm" id="close-history-btn" title="Close History"><i data-lucide="x" style="width:16px; height:16px;"></i></button>' : ''}
      </div>
      <div class="panel-body">
        <button id="new-chat-btn">
          <i data-lucide="plus" style="width:14px; height:14px;"></i>
          New Chat Session
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
      <i data-lucide="message-square" class="history-item-icon" style="width: 14px; height: 14px;"></i>
      <div class="history-title" title="${escapeHtml(session.title)}">${escapeHtml(session.title)}</div>
      <button class="history-delete-btn" title="Delete conversation" data-session-delete="${session.id}">
        <i data-lucide="trash-2" style="width:14px; height:14px;"></i>
      </button>
    </div>
  `;
}
