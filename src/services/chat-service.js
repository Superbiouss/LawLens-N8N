import { askN8nAgent, canUseN8nAgent, getN8nAgentConfig, humanizeN8nAgentError } from './n8n-agent.js';
import { escapeHtml, formatMultilineHtml, stripHtml } from './text-utils.js';

export function createUserChatMessage(question) {
  return {
    role: 'user',
    html: escapeHtml(question),
  };
}

export function createPendingAssistantMessage(label = 'Thinking...') {
  return {
    role: 'assistant',
    html: label,
    pending: true,
  };
}

export function buildChatHistory(messages, limit = 12) {
  return messages
    .filter(message => !message.pending)
    .map(message => ({
      role: message.role === 'ai' ? 'assistant' : (message.role || 'user'),
      content: stripHtml(message.html || message.content || ''),
    }))
    .filter(message => message.content.trim())
    .slice(-limit);
}

export function formatAssistantMessage(text) {
  return formatMultilineHtml(text);
}

export function formatAgentError(error, intro = "I couldn't reach the configured AI agent.") {
  return `${intro}<div class="disclaimer-callout mt-16"><strong>Reason:</strong> ${escapeHtml(humanizeN8nAgentError(error))}</div>`;
}

export function getAgentStatusMeta(config = getN8nAgentConfig()) {
  const connected = canUseN8nAgent(config);

  return {
    connected,
    tone: connected ? 'connected' : 'disconnected',
    description: connected
      ? 'Connected to n8n webhook'
      : 'Using local fallback until webhook is configured',
  };
}

export async function resolveAgentReply({
  question,
  messages,
  fallback,
  context = {},
  conversationScope = 'default',
}) {
  const config = getN8nAgentConfig();

  if (!canUseN8nAgent(config)) {
    return Promise.resolve(fallback(question, config));
  }

  const response = await askN8nAgent({
    message: question,
    history: buildChatHistory(messages),
    context,
    conversationScope,
  });

  return response.reply;
}
