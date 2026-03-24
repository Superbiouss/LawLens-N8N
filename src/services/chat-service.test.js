import { describe, expect, it } from 'vitest';

import {
  buildChatHistory,
  formatAgentError,
  formatAssistantMessage,
  getAgentStatusMeta,
} from './chat-service.js';

describe('chat-service', () => {
  it('builds clean chat history from rendered messages', () => {
    expect(buildChatHistory([
      { role: 'assistant', html: '<strong>Hello</strong>' },
      { role: 'user', html: 'What is the risk?' },
      { role: 'assistant', html: 'Thinking...', pending: true },
      { role: 'ai', html: '<em>Fallback</em>' },
    ])).toEqual([
      { role: 'assistant', content: 'Hello' },
      { role: 'user', content: 'What is the risk?' },
      { role: 'assistant', content: 'Fallback' },
    ]);
  });

  it('limits history to the most recent messages', () => {
    const history = buildChatHistory(
      Array.from({ length: 6 }, (_, index) => ({
        role: 'user',
        html: `Message ${index + 1}`,
      })),
      3,
    );

    expect(history).toEqual([
      { role: 'user', content: 'Message 4' },
      { role: 'user', content: 'Message 5' },
      { role: 'user', content: 'Message 6' },
    ]);
  });

  it('formats assistant text safely for chat bubbles', () => {
    expect(formatAssistantMessage('<b>Hello</b>\nWorld')).toBe('&lt;b&gt;Hello&lt;/b&gt;<br/>World');
  });

  it('escapes humanized error messages before rendering', () => {
    expect(formatAgentError(new Error('<script>alert(1)</script>'))).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });

  it('returns consistent agent status copy', () => {
    expect(getAgentStatusMeta({
      webhookUrl: 'https://example.com/webhook',
      enabled: true,
      includeDocumentContext: true,
      authToken: '',
    })).toMatchObject({
      connected: true,
      tone: 'connected',
    });

    expect(getAgentStatusMeta({
      webhookUrl: '',
      enabled: false,
      includeDocumentContext: true,
      authToken: '',
    })).toMatchObject({
      connected: false,
      tone: 'disconnected',
    });
  });
});
