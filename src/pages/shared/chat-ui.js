import { escapeHtml } from '../../services/text-utils.js';

export function renderChatMessage(message, options = {}) {
  const isUser = message.role === 'user';
  const userInitials = options.userInitials || 'JD';
  const assistantInitials = options.assistantInitials || 'L';

  return `
    <div class="chat-msg">
      <div class="chat-avatar ${isUser ? 'user chat-avatar-muted' : 'ai'}">${isUser ? userInitials : assistantInitials}</div>
      <div class="chat-bubble${message.pending ? ' chat-bubble-pending' : ''}">
        <p class="${isUser ? 'text-primary' : ''}">${message.html}</p>
      </div>
    </div>
  `;
}

export function renderPromptChips(items, dataAttribute) {
  return items.map(item => `
    <button type="button" class="reset-btn badge badge-neutral chat-chip" ${dataAttribute}="${escapeHtml(item)}">
      ${escapeHtml(item)}
    </button>
  `).join('');
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
