export function renderDashboard(container) {
  container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Welcome back, John</h1>
      <p class="body-text mt-4">Here's an overview of your legal intelligence landscape.</p>
    </div>

    <div class="stats-row mb-24">
      <div class="stat-card">
        <div class="stat-number">12</div>
        <div class="stat-label">Total Documents</div>
      </div>
      <div class="stat-card">
        <div class="stat-number danger">3</div>
        <div class="stat-label">Critical Red Flags</div>
      </div>
      <div class="stat-card">
        <div class="stat-number warning">8</div>
        <div class="stat-label">Compliance Tasks</div>
      </div>
      <div class="stat-card">
        <div class="stat-number success">94%</div>
        <div class="stat-label">Vault Integrity</div>
      </div>
    </div>

    <div class="layout-2col">
      <div>
        <div class="flex justify-between items-center mb-16">
          <h3 class="section-label">Recent Activity</h3>
          <button class="btn-sm" data-nav-target="vault">View vault</button>
        </div>
        <div class="flex flex-col gap-10">
          ${[
            {
              name: 'Acme Corp NDA v3.pdf',
              type: 'NDA',
              status: 'Analysis Complete',
              risk: 'high',
              time: '2h ago',
            },
            {
              name: 'Freelance Agreement.docx',
              type: 'Service',
              status: 'Extraction Pending',
              risk: 'medium',
              time: '5h ago',
            },
            {
              name: 'Office Mumbai Lease.pdf',
              type: 'Lease',
              status: 'Compliant',
              risk: 'low',
              time: 'Yesterday',
            },
          ]
            .map(
              (item) => `
            <button type="button" class="reset-btn card flex items-center gap-12 dashboard-activity-row" data-nav-target="summary">
              <div class="dashboard-doc-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
              </div>
              <div class="flex-1 text-left">
                <p class="dashboard-activity-title">${item.name}</p>
                <p class="meta-text">${item.type} • ${item.status}</p>
              </div>
              <div class="flex flex-col items-end gap-4">
                <span class="badge badge-${item.risk === 'high' ? 'danger' : item.risk === 'medium' ? 'warning' : 'success'}">${item.risk} risk</span>
                <span class="micro-label dashboard-activity-time">${item.time}</span>
              </div>
            </button>
          `,
            )
            .join('')}
        </div>

        <div class="mt-24">
          <h3 class="section-label mb-16">Quick Actions</h3>
          <div class="dashboard-quick-grid">
            <button type="button" class="reset-btn card-surface dashboard-quick-card text-left" data-nav-target="upload">
              <p class="dashboard-quick-title">+ Analyze Document</p>
              <p class="meta-text">Upload a new contract for instant insights.</p>
            </button>
            <button type="button" class="reset-btn card-surface dashboard-quick-card text-left" data-nav-target="compare">
              <p class="dashboard-quick-title">Compare Versions</p>
              <p class="meta-text">Check for differences between two revisions.</p>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div class="card mb-20 dashboard-health-card">
          <h3 class="section-label mb-12 dashboard-health-label">Legal Health Score</h3>
          <div class="score-ring mb-12">
            <svg viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(124, 77, 255, 0.1)" stroke-width="3"></path>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-brand-purple)" stroke-width="3" stroke-dasharray="82, 100"></path>
            </svg>
            <div class="score-center">
              <span class="score-number dashboard-health-score">82</span>
              <span class="score-denom">/ 100</span>
            </div>
          </div>
          <p class="meta-text dashboard-health-copy">Your portfolio is in good shape. 3 documents need attention.</p>
        </div>

        <div class="card">
          <h3 class="section-label mb-16">Upcoming Deadlines</h3>
          <div class="flex flex-col gap-12">
            ${[
              { task: 'NDA Renewal', date: 'Mar 28', color: 'danger' },
              { task: 'Audit Report Due', date: 'Apr 02', color: 'warning' },
              { task: 'Board Resolution', date: 'Apr 15', color: 'info' },
            ]
              .map(
                (item) => `
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-8">
                  <div class="dashboard-deadline-dot" style="background:var(--color-text-${item.color});"></div>
                  <span class="fs-12 text-primary">${item.task}</span>
                </div>
                <span class="meta-text">${item.date}</span>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-nav-target]').forEach((button) => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.navTarget);
    });
  });
}
