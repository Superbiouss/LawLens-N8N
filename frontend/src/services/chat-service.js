import { apiClient } from '../lib/api-client.js';
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
    .filter((message) => !message.pending)
    .map((message) => ({
      role: message.role === 'ai' ? 'assistant' : message.role || 'user',
      content: stripHtml(message.html || message.content || ''),
    }))
    .filter((message) => message.content.trim())
    .slice(-limit);
}

export function formatAssistantMessage(text) {
  return formatMultilineHtml(text);
}

export function formatAgentError(
  error,
  intro = "I couldn't reach the configured AI agent.",
) {
  const message = error.message || (typeof error === 'string' ? error : 'Unknown error');
  return `${intro}<div class="disclaimer-callout mt-16"><strong>Reason:</strong> ${escapeHtml(message)}</div>`;
}

export function getAgentStatusMeta() {
  // Now using Supabase Edge Functions as the primary orchestrator
  return {
    connected: true,
    tone: 'connected',
    description: 'Connected via LawLens Orchestrator',
  };
}

export async function resolveAgentReply({
  question,
  messages,
  fallback,
  context = {},
  conversationScope = 'default',
}) {
  try {
    const response = await apiClient.orchestrate('ask', {
      question,
      history: buildChatHistory(messages),
      context,
      conversationScope,
      documentId: context.documentId
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return response.answer || response.reply;
  } catch (error) {
    console.error('Agent lookup failed, checking fallback...', error);
    if (fallback) {
      return fallback(question);
    }
    throw error;
  }
}
