export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function stripHtml(value = '') {
  const input = String(value);

  if (
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  ) {
    const div = document.createElement('div');
    div.innerHTML = input;
    return div.textContent || div.innerText || '';
  }

  return input
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function formatMultilineHtml(value) {
  return escapeHtml(value).replace(/\n/g, '<br/>');
}

/**
 * A robust regex-based Markdown parser.
 * Supports: Bold (**), Italics (*), Lists (un/ordered), Code (`), and Line breaks.
 */
export function parseMarkdown(text = '') {
  if (!text) return '';

  // 1. Escape HTML for security
  let html = escapeHtml(text.trim());

  // 2. Multi-line code blocks: ```code```
  html = html.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');

  // 3. Inline code: `code`
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // 4. Bold-Italics: ***text*** (Must be before bold/italics)
  html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');

  // 5. Bold: **text** or __text__
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // 6. Italics: *text* or _text_
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // 7. Blockquotes: > text
  html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');
  // Combine consecutive blockquotes
  html = html.replace(/<\/blockquote>\n?<blockquote>/g, '<br/>');

  // 8. Headers: # Title
  html = html.replace(/^### (.*$)/gm, '<h3 class="chat-header">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="chat-header">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="chat-header">$1</h1>');

  // 9. Unordered lists: - item or * item
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n?<ul>/g, '');

  // 10. Ordered lists: 1. item
  html = html.replace(/^\s*(\d+)\.\s+(.*)$/gm, '<ol><li value="$1">$2</li></ol>');
  html = html.replace(/<\/ol>\n?<ol>/g, '');

  // 11. Paragraphs and Line Breaks
  const hasBlockElements = /^(#|\s*[-*]\s|\s*\d+\.\s|>|```)/m.test(text) || text.includes('\n\n');

  if (hasBlockElements) {
    // Multi-line/Block logic
    html = html.replace(/\n\s*\n/g, '</p><p>');

    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      if (/^<(ul|ol|li|h1|h2|h3|pre|code|blockquote|p|<\/p)/.test(line.trim())) {
        return line;
      }
      return line ? line + '<br/>' : '';
    });

    let finalized = processedLines.join('\n');
    
    if (!finalized.startsWith('<h') && !finalized.startsWith('<p') && !finalized.startsWith('<ul') && !finalized.startsWith('-') && !finalized.startsWith('<ol')) {
      finalized = '<p>' + finalized + '</p>';
    }
    return finalized.replace(/<p><\/p>/g, '').replace(/(<br\/>)+$/g, '');
  } else {
    // Single-line/Simple text logic: Just do the inline replacements and return
    return html.replace(/\n/g, '<br/>');
  }
}
