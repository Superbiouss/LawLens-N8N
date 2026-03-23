export function renderSummary(container) {
    container.innerHTML = `
    <div style="background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);margin:-24px -24px 24px;">
      <div class="nav-tabs" style="border-bottom:none;">
        <div class="nav-tab active">Summary</div>
        <div class="nav-tab" onclick="navigateTo('clause-breakdown')">Clause breakdown</div>
        <div class="nav-tab" onclick="navigateTo('risk-report')">Risk report</div>
        <div class="nav-tab" onclick="navigateTo('key-dates')">Key dates</div>
        <div class="nav-tab" onclick="navigateTo('ask')">Ask the doc</div>
      </div>
    </div>

    <div class="layout-2col">
      <div>
        <div class="card-accent-left danger mb-16">
          <div class="flex justify-between items-center mb-8">
            <div>
              <p class="section-heading">Acme Corp — Non-Disclosure Agreement v3</p>
              <p class="meta-text mt-4">NDA · 6 pages · Analyzed 2 min ago</p>
            </div>
            <span class="badge badge-danger">High risk</span>
          </div>
          <p class="body-text" style="line-height:1.7;">This is a one-sided mutual NDA that heavily favours Acme Corp. It imposes an unlimited confidentiality term on the Receiving Party, includes a $500,000 per-incident liquidated damages clause, and allows Acme to assign the agreement without consent. Several standard protections for the Receiving Party are absent.</p>
        </div>

        <div class="stats-row mb-16">
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Parties</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">11</div>
            <div class="stat-label">Clauses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number danger">3</div>
            <div class="stat-label">Red flags</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">∞</div>
            <div class="stat-label">Duration</div>
          </div>
        </div>

        <div class="layout-2col-equal mb-16" style="gap:12px;">
          <div>
            <p class="section-label">Parties</p>
            <div class="card" style="padding:12px;display:flex;flex-direction:column;gap:12px;">
              <div class="flex justify-between items-center" style="padding-bottom:12px;border-bottom:0.5px solid var(--color-border-tertiary);">
                <span class="meta-text">Disclosing party</span>
                <span style="font-size:13px;font-weight:500;">Acme Corp</span>
              </div>
              <div class="flex justify-between items-center" style="padding-bottom:12px;border-bottom:0.5px solid var(--color-border-tertiary);">
                <span class="meta-text">Receiving party</span>
                <span style="font-size:13px;font-weight:500;">John Doe</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="meta-text">Governing law</span>
                <span style="font-size:13px;font-weight:500;">Delaware, USA</span>
              </div>
            </div>
          </div>
          <div>
            <p class="section-label">Key dates</p>
            <div class="card" style="padding:14px;">
              <div class="timeline">
                <div class="tl-item">
                  <div class="tl-dot success"></div>
                  <div class="meta-text">Effective date</div>
                  <div style="font-size:13px;font-weight:500;">1 Jan 2025</div>
                </div>
                <div class="tl-item">
                  <div class="tl-dot warning"></div>
                  <div class="meta-text">Expiry</div>
                  <div style="font-size:13px;font-weight:500;color:var(--color-text-warning);">Unlimited — no end date</div>
                </div>
                <div class="tl-item" style="border-left-color:transparent;padding-bottom:0;">
                  <div class="tl-dot"></div>
                  <div class="meta-text">Notice period</div>
                  <div style="font-size:13px;font-weight:500;">Not specified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="section-label">Red flags</p>
        <div class="flex flex-col gap-8 mb-20">
          ${[
            "Unlimited confidentiality term — no sunset clause. You're bound permanently with no way out.",
            "$500,000 liquidated damages per breach — regardless of actual harm. Disproportionate and aggressive.",
            "Acme Corp can assign this agreement to any successor without your consent."
        ].map(r => `
            <div class="card bg-danger flex items-start gap-10" style="padding:10px 14px;background:var(--color-background-danger);border-color:var(--color-border-danger);cursor:pointer;transition:opacity .15s;" onclick="navigateTo('risk-report')" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-text-danger)" stroke-width="1.5" style="margin-top:2px;flex-shrink:0;"><path d="M7 1v8M7 11v1.5"/></svg>
              <div style="font-size:13px;color:var(--color-text-danger);flex:1;line-height:1.5;">${r}</div>
              <div style="color:var(--color-text-danger);opacity:0.5;">›</div>
            </div>
          `).join('')}
        </div>

        <p class="section-label">Obligations</p>
        <div class="card mb-20" style="padding:4px 14px;">
          ${[
            { party: 'John Doe', text: 'Must keep all disclosed information strictly confidential indefinitely.' },
            { party: 'John Doe', text: 'May only use confidential information to evaluate a potential partnership — no other purpose.' },
            { party: 'Acme Corp', text: 'May assign this agreement to any entity without notice or consent.' }
        ].map((o, i, arr) => `
            <div class="flex items-start gap-10" style="padding:12px 0;${i < arr.length - 1 ? 'border-bottom:0.5px solid var(--color-border-tertiary);' : ''}">
              <span class="badge badge-info" style="margin-top:2px;">${o.party}</span>
              <span style="font-size:13px;color:var(--color-text-secondary);line-height:1.5;">${o.text}</span>
            </div>
          `).join('')}
        </div>

        <p class="section-label">Missing standard clauses</p>
        <div class="card" style="padding:8px 14px;">
          ${[
            "Return or destruction of confidential materials on termination",
            "Residual knowledge carve-out (what employees can retain in memory)",
            "Limitation of liability cap for the Disclosing Party",
            "Dispute resolution / mediation step before litigation"
        ].map((m, i, arr) => `
            <div class="flex items-center gap-10" style="padding:10px 0;${i < arr.length - 1 ? 'border-bottom:0.5px solid var(--color-border-tertiary);' : ''}">
              <div style="width:14px;height:1.5px;background:var(--color-border-secondary);flex-shrink:0;"></div>
              <span style="font-size:13px;color:var(--color-text-secondary);">${m}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Risk score</p>
        <div class="card mb-16 text-center">
          <div class="score-ring mb-12">
            <svg viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="28" fill="none" stroke="var(--color-border-tertiary)" stroke-width="6"/>
              <circle cx="36" cy="36" r="28" fill="none" stroke="var(--color-red-400)" stroke-width="6" stroke-dasharray="126 176" stroke-dashoffset="44" stroke-linecap="round"/>
            </svg>
            <div class="score-center">
              <span class="score-number" style="color:var(--color-text-danger);">7.2</span>
              <span class="score-denom">/ 10</span>
            </div>
          </div>
          <p style="font-size:13px;font-weight:500;color:var(--color-text-danger);margin:0 0 2px;">High risk</p>
          <p class="meta-text mt-0">3 critical issues found</p>
        </div>

        <p class="section-label">Explore further</p>
        <div class="card mb-16" style="padding:8px;">
          ${[
            { title: 'Clause breakdown', desc: 'Every clause explained', page: 'clause-breakdown' },
            { title: 'Risk report', desc: 'Full red flag analysis', page: 'risk-report' },
            { title: 'Key dates', desc: 'Timeline & reminders', page: 'key-dates' },
            { title: 'Compare versions', desc: 'Diff against another draft', page: 'compare' }
        ].map(l => `
            <div class="flex items-center justify-between" style="padding:10px 12px;border-radius:var(--border-radius-md);cursor:pointer;transition:background .15s;" onclick="navigateTo('${l.page}')" onmouseover="this.style.background='var(--color-background-secondary)'" onmouseout="this.style.background=''">
              <div>
                <p style="font-size:13px;font-weight:500;color:var(--color-text-primary);margin:0;">${l.title}</p>
                <p style="font-size:11px;color:var(--color-text-tertiary);margin:0;">${l.desc}</p>
              </div>
              <span style="color:var(--color-text-tertiary);">›</span>
            </div>
          `).join('')}
        </div>

        <p class="section-label">Readability</p>
        <div class="card mb-16">
          <div class="flex justify-between mb-8">
            <span class="meta-text">Grade level</span>
            <span style="font-size:12px;font-weight:500;color:var(--color-text-primary);">Grade 14</span>
          </div>
          <div class="flex justify-between mb-8">
            <span class="meta-text">Est. read time</span>
            <span style="font-size:12px;font-weight:500;color:var(--color-text-primary);">8 min</span>
          </div>
          <div class="flex justify-between">
            <span class="meta-text">Word count</span>
            <span style="font-size:12px;font-weight:500;color:var(--color-text-primary);">1,840</span>
          </div>
        </div>

        <p class="section-label">Share & export</p>
        <div class="flex flex-col gap-8">
          <button class="btn-full" onclick="navigateTo('export')">Download summary PDF ↗</button>
          <button class="btn-full">Copy share link</button>
        </div>
      </div>
    </div>
  `;
}
