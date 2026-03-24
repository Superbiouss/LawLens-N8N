export function renderVault(container) {
    container.innerHTML = `
    <div class="flex justify-between items-center mb-24">
      <div>
        <h1 class="page-title">Document vault</h1>
        <p class="body-text mt-4">Secure storage for all your analyzed legal documents.</p>
      </div>
      <button class="btn-primary" onclick="navigateTo('upload')">+ Add document</button>
    </div>

    <div class="vault-layout">
      <!-- Sidebar Categories -->
      <div>
        <div class="flex flex-col gap-2">
          <div class="nav-item active vault-cat-item">
            <span>All documents</span>
            <span class="meta-text ml-auto">12</span>
          </div>
          <div class="nav-item vault-cat-item">
            <span>NDAs</span>
            <span class="meta-text ml-auto">5</span>
          </div>
          <div class="nav-item vault-cat-item">
            <span>Employment</span>
            <span class="meta-text ml-auto">3</span>
          </div>
          <div class="nav-item vault-cat-item">
            <span>Commercial</span>
            <span class="meta-text ml-auto">4</span>
          </div>
          <div class="nav-item vault-cat-item">
            <span>Shared with me</span>
            <span class="meta-text ml-auto">2</span>
          </div>
        </div>

        <div class="mt-24 p-12 card-surface" style="background:var(--color-background-info);">
          <p style="font-size:12px;font-weight:500;color:var(--color-text-info);margin-bottom:4px;">Vault security</p>
          <p style="font-size:11px;color:var(--color-text-info);line-height:1.5;">Your documents are encrypted with AES-256. Audit logs are available in settings.</p>
        </div>
      </div>

      <!-- Document List -->
      <div>
        <div class="flex gap-12 mb-16">
          <input type="text" placeholder="Search vault..." style="max-width:300px;" />
          <select style="max-width:150px;">
            <option>Last modified</option>
            <option>Risk score</option>
            <option>Name A-Z</option>
          </select>
          <div class="flex gap-2 ml-auto">
            <button class="btn-sm">Grid view</button>
            <button class="btn-sm active">List view</button>
          </div>
        </div>

        <div class="card" style="padding:0;overflow:hidden;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead style="background:var(--color-background-secondary);border-bottom:0.5px solid var(--color-border-tertiary);">
              <tr>
                <th class="vault-th">Name</th>
                <th class="vault-th">Type</th>
                <th class="vault-th">Risk</th>
                <th class="vault-th">Modified</th>
                <th style="padding:12px 16px;text-align:right;"></th>
              </tr>
            </thead>
            <tbody>
              ${[
            { name: 'Acme Corp NDA v3.pdf', type: 'NDA', risk: '7.2', riskType: 'danger', date: '2 min ago' },
            { name: 'Freelance Agreement.docx', type: 'Employment', risk: '4.5', riskType: 'warning', date: '3 days ago' },
            { name: 'SaaS Terms - Spark.js.pdf', type: 'Commercial', risk: '2.1', riskType: 'success', date: '1 week ago' },
            { name: 'Office Rental Mumbai.pdf', type: 'Lease', risk: '3.8', riskType: 'warning', date: '2 weeks ago' },
            { name: 'Beta Program Terms.pdf', type: 'Commercial', risk: '6.4', riskType: 'danger', date: '1 month ago' },
        ].map(d => `
                <tr class="hover-bg-secondary" style="border-bottom:0.5px solid var(--color-border-tertiary);cursor:pointer;" onclick="navigateTo('summary')">
                  <td style="padding:12px 16px;">
                    <div class="flex items-center gap-10">
                      <div style="width:24px;height:24px;border-radius:4px;background:var(--color-background-secondary);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:0.5px solid var(--color-border-tertiary);">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                      </div>
                      <span class="fw-500">${d.name}</span>
                    </div>
                  </td>
                  <td class="text-secondary" style="padding:12px 16px;">${d.type}</td>
                  <td style="padding:12px 16px;">
                    <div class="flex items-center gap-6">
                      <div class="severity-dot ${d.riskType === 'danger' ? 'critical' : d.riskType === 'warning' ? 'review' : 'clear'}"></div>
                      <span style="color:var(--color-text-${d.riskType});font-weight:500;">${d.risk}</span>
                    </div>
                  </td>
                  <td class="text-tertiary" style="padding:12px 16px;">${d.date}</td>
                  <td class="text-tertiary" style="padding:12px 16px;text-align:right;">•••</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
