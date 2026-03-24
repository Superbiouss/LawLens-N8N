const N8N_AGENT_KEY = 'n8n_agent_config';
const N8N_CONVERSATION_KEY = 'n8n_agent_conversation_id';

export function getN8nAgentConfig() {
  try {
    const raw = localStorage.getItem(N8N_AGENT_KEY);
    if (!raw) return getDefaultConfig();
    return { ...getDefaultConfig(), ...JSON.parse(raw) };
  } catch (error) {
    return getDefaultConfig();
  }
}

export function saveN8nAgentConfig(config) {
  const next = { ...getDefaultConfig(), ...config };
  localStorage.setItem(N8N_AGENT_KEY, JSON.stringify(next));
  return next;
}

export function clearN8nAgentConfig() {
  localStorage.removeItem(N8N_AGENT_KEY);
}

export function getN8nConversationId(scope = 'default') {
  const storageKey = `${N8N_CONVERSATION_KEY}_${scope}`;
  let current = sessionStorage.getItem(storageKey);
  if (!current) {
    current = `lexai-${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(storageKey, current);
  }
  return current;
}

export async function askN8nAgent({ message, history = [], context = {}, conversationScope = 'default' }) {
  const config = getN8nAgentConfig();

  if (!config.webhookUrl) {
    throw new Error('N8N_WEBHOOK_NOT_CONFIGURED');
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (config.authToken) {
    headers.Authorization = `Bearer ${config.authToken}`;
  }

  const response = await fetch(config.webhookUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      history,
      context,
      conversationId: getN8nConversationId(conversationScope),
      source: 'lexai-web',
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`N8N_WEBHOOK_HTTP_${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  return {
    reply: extractReply(payload),
    raw: payload,
  };
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

function getDefaultConfig() {
  return {
    webhookUrl: '',
    authToken: '',
    enabled: false,
    includeDocumentContext: true,
  };
}

function extractReply(payload) {
  if (typeof payload === 'string') {
    return payload;
  }

  const directCandidates = [
    payload?.reply,
    payload?.message,
    payload?.output,
    payload?.text,
    payload?.answer,
    payload?.response,
    payload?.data?.reply,
    payload?.data?.message,
    payload?.data?.output,
    payload?.data?.text,
  ];

  const direct = directCandidates.find(value => typeof value === 'string' && value.trim());
  if (direct) return direct;

  if (Array.isArray(payload)) {
    const arrayReply = payload
      .map(item => extractReply(item))
      .find(value => typeof value === 'string' && value.trim());
    if (arrayReply) return arrayReply;
  }

  throw new Error('N8N_WEBHOOK_INVALID_RESPONSE');
}
