export const DOCUMENT_TABS = [
  { page: 'summary', label: 'Summary' },
  { page: 'clause-breakdown', label: 'Clause breakdown' },
  { page: 'risk-report', label: 'Risk report' },
  { page: 'key-dates', label: 'Key dates' },
  { page: 'ask', label: 'Ask the doc' },
];

export const REVIEW_TABS = [
  { page: 'summary', label: 'Summary' },
  { page: 'clause-breakdown', label: 'Clause breakdown' },
  { page: 'annotations', label: 'Annotation studio' },
  { page: 'team', label: 'Team activities' },
];

export function renderPageTabs(tabs, activePage, options = {}) {
  const shellClass = options.flush
    ? 'page-tabs-shell flush'
    : 'page-tabs-shell';

  return `
    <div class="${shellClass}">
      <div class="nav-tabs no-border-bottom">
        ${tabs
          .map(
            (tab) => `
          <button
            type="button"
            class="reset-btn nav-tab${tab.page === activePage ? ' active' : ''}"
            ${tab.page === activePage ? 'aria-current="page"' : `data-nav-target="${tab.page}"`}
          >
            ${tab.label}
          </button>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

export function bindRouteTabs(container) {
  container.querySelectorAll('[data-nav-target]').forEach((tab) => {
    tab.addEventListener('click', () => {
      window.navigateTo(tab.dataset.navTarget);
    });
  });
}
