export function renderTemplates(container) {
  container.innerHTML = `
    <div class="flex justify-between items-center mb-24">
      <div>
        <h1 class="page-title">Template library</h1>
        <p class="body-text mt-4">Standardized starting points for commonly used legal documents.</p>
      </div>
      <button class="btn-primary">+ Create custom template</button>
    </div>

    <div class="flex gap-8 mb-20 overflow-x-auto" style="padding-bottom:10px;">
      <div class="pill active">All templates</div>
      <div class="pill">Employment</div>
      <div class="pill">Intellectual Property</div>
      <div class="pill">Service Agreements</div>
      <div class="pill">Real Estate</div>
      <div class="pill">Corporate</div>
    </div>

    <div class="grid stagger" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:20px;">
      ${[
      { name: 'Mutual NDA', cat: 'IP', desc: 'Standard non-disclosure agreement for mutual information exchange.', usage: '2.4k uses', risk: 'low' },
      { name: 'Software Development Agreement', cat: 'Services', desc: 'Contract for outsourcing software development work.', usage: '1.2k uses', risk: 'medium' },
      { name: 'Standard Employment Contract', cat: 'HR', desc: 'Full-time employment agreement with standard clauses.', usage: '5.1k uses', risk: 'medium' },
      { name: 'Commercial Lease Agreement', cat: 'Estate', desc: 'Lease for office or retail space in commercial properties.', usage: '800 uses', risk: 'high' },
      { name: 'SaaS Master Service Agreement', cat: 'SaaS', desc: 'Framework agreement for licensing software as a service.', usage: '1.5k uses', risk: 'medium' },
      { name: 'Founder Agreement', cat: 'Corporate', desc: 'Governing agreement for startup co-founders.', usage: '600 uses', risk: 'high' }
    ].map(t => `
        <div class="card doc-card" style="display:flex;flex-direction:column;">
          <div class="doc-card-body" style="flex:1;">
            <div class="flex justify-between items-center mb-12">
              <span class="micro-label">${t.cat}</span>
              <span class="badge badge-${t.risk === 'low' ? 'success' : t.risk === 'medium' ? 'warning' : 'danger'}">${t.risk.charAt(0).toUpperCase() + t.risk.slice(1)} risk</span>
            </div>
            <h3 style="font-size:14px;font-weight:500;color:var(--color-text-primary);margin-bottom:8px;">${t.name}</h3>
            <p class="meta-text" style="line-height:1.5;">${t.desc}</p>
          </div>
          <div style="padding:12px;border-top:0.5px solid var(--color-border-tertiary);background:var(--color-background-secondary);display:flex;justify-content:between;align-items:center;">
             <span class="meta-text" style="font-size:10px;">${t.usage}</span>
             <button class="btn-sm" style="padding:4px 10px;font-size:11px;background:var(--color-background-primary);">Use template</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
