const VAULT_DOCS = [
  {
    name: 'Acme Corp NDA v3.pdf',
    type: 'NDA',
    risk: '7.2',
    riskType: 'danger',
    date: '2 min ago',
  },
  {
    name: 'Freelance Agreement.docx',
    type: 'Employment',
    risk: '4.5',
    riskType: 'warning',
    date: '3 days ago',
  },
  {
    name: 'SaaS Terms - Spark.js.pdf',
    type: 'Commercial',
    risk: '2.1',
    riskType: 'success',
    date: '1 week ago',
  },
  {
    name: 'Office Rental Mumbai.pdf',
    type: 'Lease',
    risk: '3.8',
    riskType: 'warning',
    date: '2 weeks ago',
  },
  {
    name: 'Beta Program Terms.pdf',
    type: 'Commercial',
    risk: '6.4',
    riskType: 'danger',
    date: '1 month ago',
  },
];

const CATEGORIES = [
  { key: 'All documents', count: 12 },
  { key: 'NDA', count: 5 },
  { key: 'Employment', count: 3 },
  { key: 'Commercial', count: 4 },
  { key: 'Shared with me', count: 2 },
];

export function renderVault(container) {
  const state = {
    query: '',
    category: 'All documents',
    view: 'list',
    sort: 'Last modified',
  };

  const render = () => {
    const docs = VAULT_DOCS.filter((doc) => {
      const matchesQuery = doc.name
        .toLowerCase()
        .includes(state.query.toLowerCase());
      const matchesCategory =
        state.category === 'All documents' || doc.type === state.category;
      return matchesQuery && matchesCategory;
    }).sort((a, b) => {
      if (state.sort === 'Name A-Z') return a.name.localeCompare(b.name);
      if (state.sort === 'Risk score') return Number(b.risk) - Number(a.risk);
      return 0;
    });

    container.innerHTML = `
      <div class="flex justify-between items-center mb-24">
        <div>
          <h1 class="page-title">Document vault</h1>
          <p class="body-text mt-4">Secure storage for all your analyzed legal documents.</p>
        </div>
        <button class="btn-primary" id="vault-add-document-btn">+ Add document</button>
      </div>

      <div class="vault-layout">
        <div>
          <div class="flex flex-col gap-2">
            ${CATEGORIES.map(
              (category) => `
              <button type="button" class="reset-btn nav-item vault-cat-item${category.key === state.category ? ' active' : ''}" data-vault-category="${category.key}">
                <span>${category.key}</span>
                <span class="meta-text ml-auto">${category.count}</span>
              </button>
            `,
            ).join('')}
          </div>

          <div class="mt-24 p-12 card-surface vault-security-card">
            <p class="vault-security-title">Vault security</p>
            <p class="vault-security-copy">Your documents are encrypted with AES-256. Audit logs are available in settings.</p>
          </div>
        </div>

        <div>
          <div class="flex gap-12 mb-16">
            <input type="text" id="vault-search-input" placeholder="Search vault..." class="vault-search-input" value="${state.query}" />
            <select id="vault-sort-select" class="vault-sort-select">
              <option ${state.sort === 'Last modified' ? 'selected' : ''}>Last modified</option>
              <option ${state.sort === 'Risk score' ? 'selected' : ''}>Risk score</option>
              <option ${state.sort === 'Name A-Z' ? 'selected' : ''}>Name A-Z</option>
            </select>
            <div class="flex gap-2 ml-auto">
              <button class="btn-sm ${state.view === 'grid' ? 'active' : ''}" data-vault-view="grid">Grid view</button>
              <button class="btn-sm ${state.view === 'list' ? 'active' : ''}" data-vault-view="list">List view</button>
            </div>
          </div>

          ${state.view === 'list' ? renderVaultTable(docs) : renderVaultGrid(docs)}
        </div>
      </div>
    `;

    bindVaultActions(container, state, render, docs);
  };

  render();
}

function renderVaultTable(docs) {
  return `
    <div class="card vault-table-shell">
      <table class="vault-table">
        <thead class="vault-thead">
          <tr>
            <th class="vault-th">Name</th>
            <th class="vault-th">Type</th>
            <th class="vault-th">Risk</th>
            <th class="vault-th">Modified</th>
            <th class="vault-table-end"></th>
          </tr>
        </thead>
        <tbody>
          ${docs
            .map(
              (doc) => `
            <tr class="hover-bg-secondary vault-row" data-open-doc="${doc.name}">
              <td class="vault-cell">
                <div class="flex items-center gap-10">
                  <div class="vault-file-icon">
                    <i data-lucide="file-text" style="color: var(--color-text-secondary); width: 12px; height: 12px;"></i>
                  </div>
                  <span class="fw-500">${doc.name}</span>
                </div>
              </td>
              <td class="vault-cell text-secondary">${doc.type}</td>
              <td class="vault-cell">
                <div class="flex items-center gap-6">
                  <div class="severity-dot ${doc.riskType === 'danger' ? 'critical' : doc.riskType === 'warning' ? 'review' : 'clear'}"></div>
                  <span class="fw-500 vault-risk-value ${doc.riskType}">${doc.risk}</span>
                </div>
              </td>
              <td class="vault-cell text-tertiary">${doc.date}</td>
              <td class="vault-cell text-tertiary vault-table-end">•••</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderVaultGrid(docs) {
  return `
    <div class="grid vault-grid">
      ${docs
        .map(
          (doc) => `
        <button type="button" class="reset-btn doc-card text-left" data-open-doc="${doc.name}">
          <div class="doc-card-body">
            <div class="flex justify-between items-center mb-12">
              <span class="badge badge-neutral">${doc.type}</span>
              <span class="badge badge-${doc.riskType === 'danger' ? 'danger' : doc.riskType === 'warning' ? 'warning' : 'success'}">${doc.risk} risk</span>
            </div>
            <p class="fs-13 fw-500 text-primary mb-8">${doc.name}</p>
            <p class="meta-text">${doc.date}</p>
          </div>
        </button>
      `,
        )
        .join('')}
    </div>
  `;
}

function bindVaultActions(container, state, render) {
  container
    .querySelector('#vault-add-document-btn')
    ?.addEventListener('click', () => {
      window.navigateTo('upload');
    });

  container
    .querySelector('#vault-search-input')
    ?.addEventListener('input', (event) => {
      state.query = event.target.value;
      render();
    });

  container.querySelectorAll('[data-vault-category]').forEach((button) => {
    button.addEventListener('click', () => {
      state.category = button.dataset.vaultCategory;
      render();
    });
  });

  container.querySelectorAll('[data-vault-view]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view = button.dataset.vaultView;
      render();
    });
  });

  container
    .querySelector('#vault-sort-select')
    ?.addEventListener('change', (event) => {
      state.sort = event.target.value;
      render();
    });

  container.querySelectorAll('[data-open-doc]').forEach((button) => {
    button.addEventListener('click', () => {
      window.navigateTo('summary');
    });
  });
}
