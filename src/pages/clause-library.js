import { copyText } from './shared/ui-actions.js';

const CLAUSE_LIBRARY = [
  {
    title: 'Standard Confidentiality (Mutual)',
    cat: 'NDA',
    text: 'The Receiving Party shall maintain the Confidential Information in strict confidence and shall not disclose it to any third party without the express written consent of the Disclosing Party...',
    risk: 'Standard',
    color: 'success',
  },
  {
    title: 'Limitation of Liability (Mutual Cap)',
    cat: 'General',
    text: 'Neither party’s aggregate liability for all claims arising out of or related to this Agreement shall exceed the total amount paid or payable by Client under this Agreement...',
    risk: 'Moderate',
    color: 'warning',
  },
  {
    title: 'IP Ownership (Work-for-Hire)',
    cat: 'Consulting',
    text: 'Contractor hereby assigns to Client all right, title and interest in and to all Work Product created, developed, or reduced to practice by Contractor during the term of this Agreement...',
    risk: 'Pro-Client',
    color: 'info',
  },
];

export function renderClauseLibrary(container) {
  const state = {
    query: '',
    category: 'All Categories',
  };

  const render = () => {
    const items = CLAUSE_LIBRARY.filter(item => {
      const matchesQuery = `${item.title} ${item.text}`.toLowerCase().includes(state.query.toLowerCase());
      const matchesCategory = state.category === 'All Categories' || item.cat === state.category;
      return matchesQuery && matchesCategory;
    });

    container.innerHTML = `
      <div class="mb-24">
        <h1 class="page-title">Clause Library</h1>
        <p class="body-text mt-4">Browse and reuse "Gold Standard" legal snippets approved by your team.</p>
      </div>

      <div class="flex gap-12 mb-20">
        <div class="search-bar flex-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="clause-library-search" placeholder="Search clauses (e.g. 'limitation of liability')..." value="${state.query}" class="search-bar-input" />
        </div>
        <select id="clause-library-category" class="clause-library-select">
          ${['All Categories', 'NDA', 'General', 'Consulting'].map(option => `<option ${option === state.category ? 'selected' : ''}>${option}</option>`).join('')}
        </select>
      </div>

      <div class="flex flex-col gap-16">
        ${items.map((item, index) => `
          <div class="card">
            <div class="flex justify-between items-start mb-12">
              <div>
                <span class="badge badge-neutral mb-8">${item.cat}</span>
                <h3 class="clause-library-title">${item.title}</h3>
              </div>
              <span class="badge badge-${item.color}">${item.risk}</span>
            </div>
            <p class="clause-library-snippet">"${item.text}"</p>
            <div class="flex justify-end gap-12 mt-16">
              <button class="btn-sm clause-library-ghost" data-copy-clause="${index}">Copy text</button>
              <button class="btn-sm btn-primary" data-use-clause="${index}">Use in draft</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelector('#clause-library-search')?.addEventListener('input', event => {
      state.query = event.target.value;
      render();
    });

    container.querySelector('#clause-library-category')?.addEventListener('change', event => {
      state.category = event.target.value;
      render();
    });

    container.querySelectorAll('[data-copy-clause]').forEach(button => {
      button.addEventListener('click', () => {
        const clause = items[Number(button.dataset.copyClause)];
        copyText(clause.text, 'Clause copied.');
      });
    });

    container.querySelectorAll('[data-use-clause]').forEach(button => {
      button.addEventListener('click', () => {
        const clause = items[Number(button.dataset.useClause)];
        localStorage.setItem('drafting_insert_clause', clause.text);
        window.navigateTo('drafting');
      });
    });
  };

  render();
}
