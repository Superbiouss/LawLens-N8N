export const DEFAULT_N8N_AGENT_CONFIG = Object.freeze({
  webhookUrl: '',
  authToken: '',
  enabled: false,
  includeDocumentContext: true,
});

const NESTED_REPLY_KEYS = [
  'data',
  'result',
  'response',
  'message',
  'output',
  'content',
  'choices',
  'messages',
  'items',
];

export function sanitizeN8nAgentConfig(config = {}) {
  return {
    webhookUrl: String(config.webhookUrl || '').trim(),
    authToken: String(config.authToken || '').trim(),
    enabled: Boolean(config.enabled),
    includeDocumentContext: config.includeDocumentContext !== false,
  };
}

export function getPersistedN8nAgentConfig(config = {}) {
  const sanitized = sanitizeN8nAgentConfig(config);
  return {
    webhookUrl: sanitized.webhookUrl,
    enabled: sanitized.enabled,
    includeDocumentContext: sanitized.includeDocumentContext,
  };
}

export function validateN8nAgentConfig(config = {}) {
  const sanitized = sanitizeN8nAgentConfig(config);

  if (!sanitized.webhookUrl) {
    return {
      valid: false,
      message: 'Add the n8n webhook URL first.',
      config: sanitized,
    };
  }

  try {
    const url = new URL(sanitized.webhookUrl);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('INVALID_PROTOCOL');
    }
  } catch {
    return {
      valid: false,
      message: 'Add a valid http or https webhook URL.',
      config: sanitized,
    };
  }

  return {
    valid: true,
    message: '',
    config: sanitized,
  };
}

export function canUseN8nAgent(config = {}) {
  const validation = validateN8nAgentConfig(config);
  return Boolean(validation.valid && validation.config.enabled);
}

export function normalizeConversationScope(scope = 'default') {
  return (
    String(scope || 'default')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'default'
  );
}

export function buildConversationId(scope = 'default', options = {}) {
  const now = options.now || Date.now;
  const random = options.random || Math.random;
  const normalizedScope = normalizeConversationScope(scope);
  return `lexai-${normalizedScope}-${now()}-${random().toString(36).slice(2, 8)}`;
}

export function buildN8nRequest({
  message,
  history = [],
  context = {},
  conversationId,
  source = 'lexai-web',
  timestamp = new Date().toISOString(),
}) {
  const nextMessage = String(message || '').trim();

  if (!nextMessage) {
    throw new Error('N8N_WEBHOOK_EMPTY_MESSAGE');
  }

  return {
    message: nextMessage,
    history: normalizeHistory(history),
    context: normalizeContext(context),
    conversationId: String(conversationId || '').trim(),
    source,
    timestamp,
  };
}

export function extractN8nReply(payload, depth = 0) {
  if (depth > 5 || payload == null) {
    throw new Error('N8N_WEBHOOK_INVALID_RESPONSE');
  }

  if (typeof payload === 'string') {
    const text = payload.trim();
    if (text) return text;
    throw new Error('N8N_WEBHOOK_EMPTY_RESPONSE');
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const reply = tryExtractN8nReply(item, depth + 1);
      if (reply) return reply;
    }

    throw new Error('N8N_WEBHOOK_INVALID_RESPONSE');
  }

  if (typeof payload === 'object') {
    const directCandidates = [
      payload.reply,
      payload.message,
      payload.output,
      payload.text,
      payload.answer,
      payload.response,
      payload.content,
      payload.result,
      payload.completion,
      payload?.data?.reply,
      payload?.data?.message,
      payload?.data?.output,
      payload?.data?.text,
      payload?.data?.answer,
      payload?.choices?.[0]?.message?.content,
      payload?.choices?.[0]?.text,
      payload?.output?.[0]?.text,
      payload?.output?.[0]?.content?.[0]?.text,
    ];

    const direct = directCandidates.find(
      (value) => typeof value === 'string' && value.trim(),
    );
    if (direct) return direct.trim();

    for (const key of NESTED_REPLY_KEYS) {
      const nested = tryExtractN8nReply(payload[key], depth + 1);
      if (nested) return nested;
    }

    for (const value of Object.values(payload)) {
      const nested = tryExtractN8nReply(value, depth + 1);
      if (nested) return nested;
    }
  }

  throw new Error('N8N_WEBHOOK_INVALID_RESPONSE');
}

export function humanizeN8nAgentError(error) {
  if (error?.message === 'N8N_WEBHOOK_NOT_CONFIGURED') {
    return 'Webhook URL not configured.';
  }

  if (error?.message === 'N8N_WEBHOOK_INVALID_URL') {
    return 'Webhook URL is invalid. Use a valid http or https address.';
  }

  if (error?.message === 'N8N_WEBHOOK_EMPTY_MESSAGE') {
    return 'Message cannot be empty.';
  }

  if (error?.message === 'N8N_WEBHOOK_EMPTY_RESPONSE') {
    return 'Webhook responded without any text content.';
  }

  if (error?.message === 'N8N_WEBHOOK_INVALID_RESPONSE') {
    return 'Webhook returned a response shape that LexAI could not parse.';
  }

  if (error?.message === 'N8N_WEBHOOK_TIMEOUT') {
    return 'Webhook timed out before responding.';
  }

  if (
    typeof error?.message === 'string' &&
    error.message.startsWith('N8N_WEBHOOK_HTTP_')
  ) {
    return `Webhook returned HTTP ${error.message.replace('N8N_WEBHOOK_HTTP_', '')}.`;
  }

  if (error?.name === 'TypeError') {
    return 'Network request failed. Check CORS, webhook availability, or connectivity.';
  }

  return error?.message || 'Unknown connection error.';
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .map((item) => ({
      role: normalizeRole(item?.role),
      content: String(item?.content || '').trim(),
    }))
    .filter((item) => item.content);
}

function normalizeRole(role) {
  const normalized = String(role || 'user')
    .trim()
    .toLowerCase();

  if (
    normalized === 'assistant' ||
    normalized === 'system' ||
    normalized === 'user'
  ) {
    return normalized;
  }

  if (normalized === 'ai') {
    return 'assistant';
  }

  return 'user';
}

function normalizeContext(context) {
  if (!context || typeof context !== 'object' || Array.isArray(context)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(context).filter(([, value]) => value !== undefined),
  );
}

function tryExtractN8nReply(payload, depth) {
  if (payload == null) return '';

  try {
    return extractN8nReply(payload, depth);
  } catch {
    return '';
  }
}
