import { apiClient } from '../lib/api-client.js';

export async function renderCompliance(container) {
  // Initial loading state
  container.innerHTML = `
    <div class="layout-single-column p-40 text-center">
      <svg class="spinner" viewBox="0 0 50 50" style="width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 16px;"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="var(--color-brand-purple)"></circle></svg>
      <p class="body-text">Loading compliance packs...</p>
    </div>
  `;

  try {
    const packs = await apiClient.intelligence.listCompliancePacks();
    
    renderMain(container, packs);
  } catch (error) {
    container.innerHTML = `
        <div class="layout-single-column p-40 text-center">
          <p class="body-text text-danger">Failed to load compliance data: ${error.message}</p>
          <button class="btn-primary mt-16" onclick="window.location.reload()">Retry</button>
        </div>
      `;
  }
}

function renderMain(container, packs) {
  const selectedPack = packs[0] || null;

  container.innerHTML = `
    <div class="layout-2col">
      <div>
        <div class="mb-24">
          <h1 class="page-title">Compliance checklist</h1>
          <p class="body-text mt-4">Verifying document alignment with jurisdictional regulations and internal policy.</p>
        </div>

        <div class="card mb-20 p-20">
          <div class="flex justify-between items-center mb-16">
            <p class="section-label m-0">Regulation set</p>
            <select class="w-auto" id="compliance-pack-selector">
              ${packs.map(p => `<option value="${p.id}" ${p.id === selectedPack?.id ? 'selected' : ''}>${p.law_name}</option>`).join('')}
              <option>Internal Policy v2.1</option>
            </select>
          </div>

          <div class="stats-row mb-16 grid-3">
            <div class="stat-card">
              <div class="stat-number success">--</div>
              <div class="stat-label">Compliance score</div>
            </div>
            <div class="stat-card">
              <div class="stat-number success">--</div>
              <div class="stat-label">Items passed</div>
            </div>
            <div class="stat-card">
              <div class="stat-number danger">--</div>
              <div class="stat-label">Violations found</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-12" id="compliance-items-container">
          ${renderPackItems(selectedPack)}
        </div>
      </div>

      <div>
        <p class="section-label">Audit log</p>
        <div class="card mb-16 p-12">
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="meta-text">Check run by LAWLENS</div>
              <div class="fs-12 text-primary">Today, 2:15 PM</div>
            </div>
          </div>
        </div>

        <button class="btn-primary btn-full mb-12" id="run-compliance-check-btn">Run re-check</button>
        <button class="btn-full" id="generate-compliance-report-btn">Generate compliance report ↗</button>
      </div>
    </div>
  `;

  // Selector listener
  container.querySelector('#compliance-pack-selector')?.addEventListener('change', (e) => {
    const pack = packs.find(p => p.id === e.target.value);
    const itemContainer = container.querySelector('#compliance-items-container');
    if (itemContainer) itemContainer.innerHTML = renderPackItems(pack);
  });

  // Action listeners
  container.querySelector('#run-compliance-check-btn')?.addEventListener('click', () => {
    window.showToast('Compliance re-check queued. Connecting to N8N...');
  });

  container.querySelector('#generate-compliance-report-btn')?.addEventListener('click', () => {
    window.navigateTo('export');
  });
}

function renderPackItems(pack) {
  if (!pack) return '<div class="card p-16 text-center"><p class="meta-text">No requirements found for this regulation.</p></div>';

  return `
    <p class="section-label">${pack.law_name} Requirements</p>
    <div class="card card-flush mb-16">
      ${pack.requirements.map((item, i, arr) => `
        <div class="p-16 ${i < arr.length - 1 ? 'border-b' : ''}">
          <div class="flex justify-between items-center">
            <span class="fs-13 fw-500 text-primary">${item.check}</span>
            <lex-badge variant="${item.type === 'critical' ? 'danger' : 'warning'}">
              ${item.type === 'critical' ? 'Critical' : 'Requirement'}
            </lex-badge>
          </div>
          <p class="meta-text mt-8 text-secondary">Awaiting document analysis session.</p>
        </div>
      `).join('')}
    </div>
  `;
}
