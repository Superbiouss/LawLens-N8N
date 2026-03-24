import { describe, expect, it } from 'vitest';

import {
  buildConversationId,
  buildN8nRequest,
  extractN8nReply,
  humanizeN8nAgentError,
  sanitizeN8nAgentConfig,
  validateN8nAgentConfig,
} from './n8n-agent-utils.js';

describe('n8n-agent-utils', () => {
  it('sanitizes config values', () => {
    expect(sanitizeN8nAgentConfig({
      webhookUrl: ' https://example.com/webhook ',
      authToken: ' secret-token ',
      enabled: 1,
      includeDocumentContext: false,
    })).toEqual({
      webhookUrl: 'https://example.com/webhook',
      authToken: 'secret-token',
      enabled: true,
      includeDocumentContext: false,
    });
  });

  it('validates only http and https webhook URLs', () => {
    expect(validateN8nAgentConfig({
      webhookUrl: 'ftp://example.com/webhook',
      enabled: true,
    }).valid).toBe(false);

    expect(validateN8nAgentConfig({
      webhookUrl: 'http://localhost:5678/webhook/test',
      enabled: true,
    }).valid).toBe(true);
  });

  it('builds deterministic conversation IDs when helpers are injected', () => {
    const conversationId = buildConversationId('General Chat', {
      now: () => 123456,
      random: () => 0.123456,
    });

    expect(conversationId).toContain('lexai-general-chat-123456-');
  });

  it('builds sanitized webhook payloads', () => {
    expect(buildN8nRequest({
      message: '  Summarize this clause  ',
      history: [
        { role: 'user', content: '  First message  ' },
        { role: 'ai', content: '  Assistant reply  ' },
        { role: 'user', content: '   ' },
      ],
      context: {
        route: 'ask',
        documentName: 'Acme NDA.pdf',
        ignored: undefined,
      },
      conversationId: 'lexai-abc',
      timestamp: '2026-03-24T00:00:00.000Z',
    })).toEqual({
      message: 'Summarize this clause',
      history: [
        { role: 'user', content: 'First message' },
        { role: 'assistant', content: 'Assistant reply' },
      ],
      context: {
        route: 'ask',
        documentName: 'Acme NDA.pdf',
      },
      conversationId: 'lexai-abc',
      source: 'lexai-web',
      timestamp: '2026-03-24T00:00:00.000Z',
    });
  });

  it('extracts replies from nested webhook payloads', () => {
    expect(extractN8nReply({
      data: {
        choices: [
          {
            message: {
              content: 'Reply from choices',
            },
          },
        ],
      },
    })).toBe('Reply from choices');

    expect(extractN8nReply([
      {
        result: {
          output: [
            {
              content: [
                {
                  text: 'Reply from nested output',
                },
              ],
            },
          ],
        },
      },
    ])).toBe('Reply from nested output');
  });

  it('humanizes known agent errors', () => {
    expect(humanizeN8nAgentError(new Error('N8N_WEBHOOK_TIMEOUT'))).toContain('timed out');
    expect(humanizeN8nAgentError(new Error('N8N_WEBHOOK_HTTP_502'))).toContain('HTTP 502');
  });
});
