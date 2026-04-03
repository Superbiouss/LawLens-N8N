import { apiClient } from '../lib/api-client.js';
import { supabase } from '../lib/supabase.js';
import { escapeHtml, formatMultilineHtml, stripHtml, parseMarkdown } from './text-utils.js';

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
  return parseMarkdown(text);
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
      const errorMsg = `[Technical Error] Orchestrator failed: ${response.error}`;
      throw new Error(errorMsg);
    }

    return response.answer || response.reply;
  } catch (error) {
    console.error('Agent lookup failed:', error);
    
    // If it's a technical error we want to debug, don't use fallback
    if (error.message.includes('[Technical Error]') || !fallback) {
      throw error;
    }
    
    return fallback(question);
  }
}

/**
 * Chat History Functions
 */

export async function fetchChatSessions() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching chat sessions:', error);
    return [];
  }
  return data;
}

export async function fetchChatMessages(sessionId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
  
  return data.map(msg => ({
    role: msg.role,
    html: msg.role === 'user' ? escapeHtml(msg.content) : formatMultilineHtml(msg.content),
    content: msg.content // Raw content
  }));
}

export async function createChatSession(firstUserMessage) {
  if (!supabase) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const title = generateChatTitle(firstUserMessage);
  
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert([{ 
      user_id: user.id, 
      title 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating chat session:', error);
    return null;
  }
  return data;
}

export async function saveChatMessage(sessionId, role, content) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{ 
      session_id: sessionId, 
      role, 
      content 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving chat message:', error);
    return null;
  }

  // Update session's updated_at timestamp
  await supabase
    .from('chat_sessions')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', sessionId);

  return data;
}

export async function deleteChatSession(sessionId) {
  if (!supabase) return false;
  
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .eq('id', sessionId);

  if (error) {
    console.error('Error deleting chat session:', error);
    return false;
  }
  return true;
}

function generateChatTitle(message) {
  const cleanMsg = stripHtml(message).trim();
  if (!cleanMsg) return 'New Chat';
  
  const words = cleanMsg.split(/\s+/);
  if (words.length <= 5) return cleanMsg;
  
  return words.slice(0, 5).join(' ') + '...';
}

/**
 * Fetches the current user's display name or email for personalization.
 */
export async function getUserDisplayName() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 'there';
    
    // Check for full name in metadata first
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
    if (fullName) return fullName.split(' ')[0]; // Just use first name for friendly vibe
    
    // Fallback to email username
    return user.email.split('@')[0] || 'there';
  } catch (err) {
    console.error('Error fetching user name:', err);
    return 'there';
  }
}
