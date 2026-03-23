export function renderCompliance(container) {
    container.innerHTML = `
    <div class="layout-2col">
      <div>
        <div class="mb-24">
          <h1 class="page-title">Compliance checklist</h1>
          <p class="body-text mt-4">Verifying document alignment with jurisdictional regulations and internal policy.</p>
        </div>

        <div class="card mb-20" style="padding:20px;">
          <div class="flex justify-between items-center mb-16">
            <p class="section-label" style="margin:0;">Regulation set</p>
            <select style="width:auto;">
              <option>GDPR (Privacy)</option>
              <option>India Contract Act</option>
              <option>California CCPA</option>
              <option>Internal Policy v2.1</option>
            </select>
          </div>

          <div class="stats-row mb-16" style="grid-template-columns: repeat(3, 1fr);">
            <div class="stat-card">
              <div class="stat-number success">65%</div>
              <div class="stat-label">Compliance score</div>
            </div>
            <div class="stat-card">
              <div class="stat-number success">8</div>
              <div class="stat-label">Items passed</div>
            </div>
            <div class="stat-card">
              <div class="stat-number danger">3</div>
              <div class="stat-label">Violations found</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-12">
          ${[
            {
                cat: 'Data privacy', items: [
                    { title: 'Standard GDPR definition of "Personal Data"', status: 'pass' },
                    { title: 'Information security standards (ISO 27001)', status: 'fail', msg: 'Missing technical protection measure descriptions.' },
                    { title: 'Breach notification timeline (72 hours)', status: 'missing' }
                ]
            },
            {
                cat: 'Jurisdiction', items: [
                    { title: 'Indian Contract Act compliance', status: 'pass' },
                    { title: 'Enforceable liquidated damages cap', status: 'fail', msg: 'Amount exceeds $100k internal threshold.' }
                ]
            }
        ].map(sect => `
            <p class="section-label">${sect.cat}</p>
            <div class="card mb-16" style="padding:0;overflow:hidden;">
              ${sect.items.map((item, i, arr) => `
                <div style="padding:16px;${i < arr.length - 1 ? 'border-bottom:0.5px solid var(--color-border-tertiary);' : ''}">
                  <div class="flex justify-between items-center">
                    <span style="font-size:13px;font-weight:500;color:var(--color-text-primary);">${item.title}</span>
                    <span class="badge badge-${item.status === 'pass' ? 'success' : item.status === 'fail' ? 'danger' : 'warning'}">
                      ${item.status === 'pass' ? 'Passed' : item.status === 'fail' ? 'Violation' : 'Missing'}
                    </span>
                  </div>
                  ${item.msg ? `<p class="meta-text mt-8" style="color:var(--color-text-${item.status === 'fail' ? 'danger' : 'secondary'});">${item.msg}</p>` : ''}
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Audit log</p>
        <div class="card mb-16" style="padding:12px;">
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="meta-text">Check run by LexAI</div>
              <div style="font-size:12px;color:var(--color-text-primary);">Today, 2:15 PM</div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="meta-text">Internal policy updated</div>
              <div style="font-size:12px;color:var(--color-text-primary);">15 Jan 2025</div>
            </div>
          </div>
        </div>

        <button class="btn-primary btn-full mb-12">Run re-check</button>
        <button class="btn-full" onclick="navigateTo('export')">Generate compliance report ↗</button>
      </div>
    </div>
  `;
}
