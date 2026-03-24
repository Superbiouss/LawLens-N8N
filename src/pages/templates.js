const TEMPLATES = [
  { name: 'Mutual NDA', cat: 'Intellectual Property', desc: 'Standard non-disclosure agreement for mutual information exchange.', usage: '2.4k uses', risk: 'low' },
  { name: 'Software Development Agreement', cat: 'Service Agreements', desc: 'Contract for outsourcing software development work.', usage: '1.2k uses', risk: 'medium' },
  { name: 'Standard Employment Contract', cat: 'Employment', desc: 'Full-time employment agreement with standard clauses.', usage: '5.1k uses', risk: 'medium' },
  { name: 'Commercial Lease Agreement', cat: 'Real Estate', desc: 'Lease for office or retail space in commercial properties.', usage: '800 uses', risk: 'high' },
  { name: 'SaaS Master Service Agreement', cat: 'Service Agreements', desc: 'Framework agreement for licensing software as a service.', usage: '1.5k uses', risk: 'medium' },
  { name: 'Founder Agreement', cat: 'Corporate', desc: 'Governing agreement for startup co-founders.', usage: '600 uses', risk: 'high' },
];

const TEMPLATE_FILTERS = ['All templates', 'Employment', 'Intellectual Property', 'Service Agreements', 'Real Estate', 'Corporate'];

export function renderTemplates(container) {
  const state = {
    filter: 'All templates',
  };

  const render = () => {
    const visibleTemplates = TEMPLATES.filter(template =>
      state.filter === 'All templates' || template.cat === state.filter,
    );

    container.innerHTML = `
      <div class="flex justify-between items-center mb-24">
        <div>
          <h1 class="page-title">Template library</h1>
          <p class="body-text mt-4">Standardized starting points for commonly used legal documents.</p>
        </div>
        <button class="btn-primary" id="create-template-btn">+ Create custom template</button>
      </div>

      <div class="flex gap-8 mb-20 overflow-x-auto template-filter-row">
        ${TEMPLATE_FILTERS.map(filter => `
          <button type="button" class="reset-btn pill${filter === state.filter ? ' active' : ''}" data-template-filter="${filter}">
            ${filter}
          </button>
        `).join('')}
      </div>

      <div class="grid stagger template-grid">
        ${visibleTemplates.map(template => `
          <div class="card doc-card template-card">
            <div class="doc-card-body flex-1">
              <div class="flex justify-between items-center mb-12">
                <span class="micro-label">${template.cat}</span>
                <span class="badge badge-${template.risk === 'low' ? 'success' : template.risk === 'medium' ? 'warning' : 'danger'}">${template.risk.charAt(0).toUpperCase() + template.risk.slice(1)} risk</span>
              </div>
              <h3 class="template-title">${template.name}</h3>
              <p class="meta-text template-copy">${template.desc}</p>
            </div>
            <div class="template-footer">
              <span class="meta-text template-usage">${template.usage}</span>
              <button class="btn-sm template-use-btn" data-template-name="${template.name}">Use template</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelector('#create-template-btn')?.addEventListener('click', () => {
      window.showToast('Custom template creation would open the drafting flow.');
    });

    container.querySelectorAll('[data-template-filter]').forEach(button => {
      button.addEventListener('click', () => {
        state.filter = button.dataset.templateFilter;
        render();
      });
    });

    container.querySelectorAll('[data-template-name]').forEach(button => {
      button.addEventListener('click', () => {
        localStorage.setItem('drafting_insert_clause', `${button.dataset.templateName} template inserted as a starting point.`);
        window.navigateTo('drafting');
      });
    });
  };

  render();
}
