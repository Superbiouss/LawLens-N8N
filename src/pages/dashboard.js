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
        <div class="stat-label">Critial Red Flags</div>
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
          <button class="btn-sm" onclick="navigateTo('vault')">View vault</button>
        </div>
        <div class="flex flex-col gap-10">
          ${[
            { name: 'Acme Corp NDA v3.pdf', type: 'NDA', status: 'Analysis Complete', risk: 'high', time: '2h ago' },
            { name: 'Freelance Agreement.docx', type: 'Service', status: 'Extraction Pending', risk: 'medium', time: '5h ago' },
            { name: 'Office Mumbai Lease.pdf', type: 'Lease', status: 'Compliant', risk: 'low', time: 'Yesterday' }
        ].map(item => `
            <div class="card flex items-center gap-12" style="padding:12px 16px;cursor:pointer;" onclick="navigateTo('summary')">
              <div style="width:32px;height:32px;border-radius:var(--border-radius-md);background:var(--color-background-secondary);display:flex;align-items:center;justify-content:center;">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
              </div>
              <div style="flex:1;">
                <p style="font-size:13px;font-weight:500;">${item.name}</p>
                <p class="meta-text">${item.type} • ${item.status}</p>
              </div>
              <div class="flex flex-col items-end gap-4">
                <span class="badge badge-${item.risk === 'high' ? 'danger' : item.risk === 'medium' ? 'warning' : 'success'}">${item.risk} risk</span>
                <span style="font-size:10px;color:var(--color-text-tertiary);">${item.time}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-24">
           <h3 class="section-label mb-16">Quick Actions</h3>
           <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="card-surface" style="cursor:pointer;" onclick="navigateTo('upload')">
                 <p style="font-size:13px;font-weight:500;margin-bottom:4px;">+ Analyze Document</p>
                 <p class="meta-text">Upload a new contract for instant insights.</p>
              </div>
              <div class="card-surface" style="cursor:pointer;" onclick="navigateTo('compare')">
                 <p style="font-size:13px;font-weight:500;margin-bottom:4px;">Compare Versions</p>
                 <p class="meta-text">Check for differences between two revisions.</p>
              </div>
           </div>
        </div>
      </div>

      <div>
        <div class="card mb-20" style="background:var(--color-background-purple);border:none;">
           <h3 class="section-label mb-12" style="color:var(--color-brand-purple);">Legal Health Score</h3>
           <div class="score-ring mb-12">
              <svg viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(124, 77, 255, 0.1)" stroke-width="3"></path>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-brand-purple)" stroke-width="3" stroke-dasharray="82, 100"></path>
              </svg>
              <div class="score-center">
                 <span class="score-number" style="color:var(--color-brand-purple);">82</span>
                 <span class="score-denom">/ 100</span>
              </div>
           </div>
           <p class="meta-text" style="text-align:center;color:var(--color-brand-purple);opacity:0.8;">Your portfolio is in good shape. 3 documents need attention.</p>
        </div>

        <div class="card">
           <h3 class="section-label mb-16">Upcoming Deadlines</h3>
           <div class="flex flex-col gap-12">
              ${[
            { task: 'NDA Renewal', date: 'Mar 28', color: 'danger' },
            { task: 'Audit Report Due', date: 'Apr 02', color: 'warning' },
            { task: 'Board Resolution', date: 'Apr 15', color: 'info' }
        ].map(d => `
                <div class="flex items-center justify-between">
                   <div class="flex items-center gap-8">
                      <div style="width:6px;height:6px;border-radius:50%;background:var(--color-text-${d.color});"></div>
                      <span style="font-size:12px;">${d.task}</span>
                   </div>
                   <span class="meta-text">${d.date}</span>
                </div>
              `).join('')}
           </div>
        </div>
      </div>
    </div>
    `;
}
