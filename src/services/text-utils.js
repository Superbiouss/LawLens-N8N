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

  if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
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
