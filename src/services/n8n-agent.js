import { readJSON, readString, removeByPrefix, removeKey, writeJSON, writeString } from './browser-storage.js';
import {
  DEFAULT_N8N_AGENT_CONFIG,
  buildConversationId,
  buildN8nRequest,
  canUseN8nAgent,
  extractN8nReply,
  getPersistedN8nAgentConfig,
  humanizeN8nAgentError,
  normalizeConversationScope,
  sanitizeN8nAgentConfig,
  validateN8nAgentConfig,
} from './n8n-agent-utils.js';

const N8N_AGENT_KEY = 'n8n_agent_config';
const N8N_AGENT_TOKEN_KEY = 'n8n_agent_auth_token';
const N8N_CONVERSATION_KEY = 'n8n_agent_conversation_id';
const DEFAULT_TIMEOUT_MS = 30000;

export function getN8nAgentConfig() {
  const persisted = readJSON(globalThis.localStorage, N8N_AGENT_KEY, {});
  const authToken = readString(globalThis.sessionStorage, N8N_AGENT_TOKEN_KEY, '');
  return sanitizeN8nAgentConfig({ ...DEFAULT_N8N_AGENT_CONFIG, ...persisted, authToken });
}

export function saveN8nAgentConfig(config) {
  const next = sanitizeN8nAgentConfig(config);
  writeJSON(globalThis.localStorage, N8N_AGENT_KEY, getPersistedN8nAgentConfig(next));

  if (next.authToken) {
    writeString(globalThis.sessionStorage, N8N_AGENT_TOKEN_KEY, next.authToken);
  } else {
    removeKey(globalThis.sessionStorage, N8N_AGENT_TOKEN_KEY);
  }

  return next;
}

export function clearN8nAgentConfig() {
  removeKey(globalThis.localStorage, N8N_AGENT_KEY);
  removeKey(globalThis.sessionStorage, N8N_AGENT_TOKEN_KEY);
  removeByPrefix(globalThis.sessionStorage, `${N8N_CONVERSATION_KEY}_`);
}

export function getN8nConversationId(scope = 'default') {
  const normalizedScope = normalizeConversationScope(scope);
  const storageKey = `${N8N_CONVERSATION_KEY}_${normalizedScope}`;
  let current = readString(globalThis.sessionStorage, storageKey, '');

  if (!current) {
    current = buildConversationId(normalizedScope);
    writeString(globalThis.sessionStorage, storageKey, current);
  }

  return current;
}

export async function askN8nAgent({
  message,
  history = [],
  context = {},
  conversationScope = 'default',
  signal,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}) {
  const config = getN8nAgentConfig();
  const validation = validateN8nAgentConfig(config);

  if (!validation.config.webhookUrl) {
    throw new Error('N8N_WEBHOOK_NOT_CONFIGURED');
  }

  if (!validation.valid) {
    throw new Error('N8N_WEBHOOK_INVALID_URL');
  }

  const requestBody = buildN8nRequest({
    message,
    history,
    context,
    conversationId: getN8nConversationId(conversationScope),
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  if (validation.config.authToken) {
    headers.Authorization = `Bearer ${validation.config.authToken}`;
  }

  const controller = !signal && typeof AbortController === 'function'
    ? new AbortController()
    : null;
  const activeSignal = signal || controller?.signal;
  const timeoutId = controller
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  try {
    const response = await fetch(validation.config.webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
      signal: activeSignal,
    });

    if (!response.ok) {
      throw new Error(`N8N_WEBHOOK_HTTP_${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    return {
      reply: extractN8nReply(payload),
      raw: payload,
      request: requestBody,
    };
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('N8N_WEBHOOK_TIMEOUT');
    }

    throw error;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function testN8nAgentConnection() {
  return askN8nAgent({
    message: 'Connection test from LexAI UI',
    history: [],
    context: {
      route: 'settings',
      documentName: 'Connection test',
    },
    conversationScope: 'settings-test',
  });
}

export {
  DEFAULT_N8N_AGENT_CONFIG,
  canUseN8nAgent,
  humanizeN8nAgentError,
  sanitizeN8nAgentConfig,
  validateN8nAgentConfig,
};
