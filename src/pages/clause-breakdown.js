export function renderClauseBreakdown(container) {
    container.innerHTML = `
    <div style="background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);margin:-24px -24px 0;">
      <div class="nav-tabs" style="border-bottom:none;">
        <div class="nav-tab" onclick="navigateTo('summary')">Summary</div>
        <div class="nav-tab active">Clause breakdown</div>
        <div class="nav-tab" onclick="navigateTo('risk-report')">Risk report</div>
        <div class="nav-tab" onclick="navigateTo('key-dates')">Key dates</div>
        <div class="nav-tab" onclick="navigateTo('ask')">Ask the doc</div>
      </div>
    </div>

    <!-- 3 column layout specifically for breakdown -->
    <div style="display:grid;grid-template-columns:260px 1fr 280px;height:calc(100vh - var(--topbar-height) - 44px);margin:0 -24px -24px;">
      
      <!-- Left sidebar: Clause list -->
      <div style="border-right:0.5px solid var(--color-border-tertiary);background:var(--color-background-primary);overflow-y:auto;display:flex;flex-direction:column;">
        <div style="padding:16px;border-bottom:0.5px solid var(--color-border-tertiary);">
          <input type="text" placeholder="Search clauses..." />
        </div>
        <div style="flex:1;overflow-y:auto;">
          ${[
            { id: '1', title: '1. Definition of Confidential Info', risk: 'success' },
            { id: '2', title: '2. Obligations of Receiving Party', risk: 'warning' },
            { id: '3', title: '3. Exclusions from Confidentiality', risk: 'success' },
            { id: '4', title: '4. Term and Termination', risk: 'danger', active: true },
            { id: '5', title: '5. Return of Materials', risk: 'success' },
            { id: '6', title: '6. No License Granted', risk: 'success' },
            { id: '7', title: '7. Liquidated Damages', risk: 'danger' },
            { id: '8', title: '8. Governing Law', risk: 'warning' },
            { id: '9', title: '9. Assignment', risk: 'danger' },
            { id: '10', title: '10. Severability', risk: 'success' },
            { id: '11', title: '11. Entire Agreement', risk: 'success' },
        ].map(c => `
            <div style="padding:12px 16px;border-bottom:0.5px solid var(--color-border-tertiary);cursor:pointer;display:flex;align-items:center;gap:10px;${c.active ? 'background:var(--color-background-secondary);border-left:2px solid var(--color-text-primary);' : 'border-left:2px solid transparent;transition:background .15s;'}" ${!c.active ? 'onmouseover="this.style.background=\'var(--color-background-secondary)\'" onmouseout="this.style.background=\'\'"' : ''}>
              <div class="severity-dot ${c.risk === 'danger' ? 'critical' : c.risk === 'warning' ? 'review' : 'clear'}"></div>
              <span style="font-size:13px;color:var(--color-text-${c.active ? 'primary' : 'secondary'});font-weight:${c.active ? '500' : '400'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;">${c.title}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Middle area: Clause content -->
      <div style="background:var(--color-background-primary);overflow-y:auto;padding:32px 40px;display:flex;flex-direction:column;border-right:0.5px solid var(--color-border-tertiary);">
        <div class="mb-24 flex items-center justify-between">
          <div>
            <h2 class="page-title">4. Term and Termination</h2>
            <div class="meta-text mt-8">Page 2 · Paragraph 4</div>
          </div>
          <span class="badge badge-danger">Critical Risk</span>
        </div>

        <p class="section-label">Original text</p>
        <div class="clause-text mb-32">
          4.1 This Agreement shall commence on the Effective Date and shall remain in full force and effect for an <span class="clause-highlight-danger">unlimited period of time</span> until such time as the parties execute a subsequent agreement expressly superseding this Agreement.
          <br/><br/>
          4.2 The obligations of confidentiality imposed upon the Receiving Party shall survive any termination or expiration of this Agreement and shall continue in perpetuity. <span class="clause-highlight-warning">No termination of this Agreement shall relieve the Receiving Party</span> of the negative covenants described herein.
        </div>

        <p class="section-label">Plain English translation</p>
        <p class="body-text mb-32" style="font-size:15px;line-height:1.7;color:var(--color-text-primary);">
          This contract never expires. The rules about keeping Acme Corp's information secret will last forever, even if you never actually do business together. You cannot end this agreement unless you sign a new contract with them.
        </p>

        <p class="section-label">Red flag analysis</p>
        <div class="card-accent-left danger mb-16">
          <p style="font-size:13px;font-weight:500;color:var(--color-text-primary);margin:0 0 8px;">Unlimited confidentiality term</p>
          <p class="body-text mb-12">The NDA imposes confidentiality obligations with no end date. Unlike standard NDAs which expire after 2–5 years, this binds you permanently.</p>
          <div class="card-surface mt-8">
            <div class="micro-label mb-4">Suggested fix</div>
            <div class="body-text" style="font-size:12px;">Replace "unlimited period of time" with "a period of 3 years from the date of disclosure."</div>
          </div>
        </div>

        <div style="margin-top:auto;display:flex;justify-content:space-between;padding-top:24px;border-top:0.5px solid var(--color-border-tertiary);">
          <button class="btn" style="border-color:transparent;" disabled>‹ Previous clause</button>
          <button class="btn" style="border-color:transparent;color:var(--color-text-info);">Next clause ›</button>
        </div>
      </div>

      <!-- Right sidebar: Action panel -->
      <div style="background:var(--color-background-tertiary);overflow-y:auto;padding:20px;">
        <p class="section-label">Annotations</p>
        
        <div class="card mb-16" style="padding:12px;">
          <textarea placeholder="Add a note or comment for your team..." style="height:80px;border-color:transparent;background:transparent;padding:0;font-size:13px;box-shadow:none;"></textarea>
          <div class="flex justify-between items-center mt-12">
            <span class="meta-text">Only visible to your team</span>
            <button class="btn-sm btn-primary">Post</button>
          </div>
        </div>

        <p class="section-label">Ask about this clause</p>
        <div class="flex flex-col gap-8 mb-24">
          <div class="card" style="padding:10px 12px;cursor:pointer;transition:background .15s;" onmouseover="this.style.background='var(--color-background-secondary)'" onmouseout="this.style.background='var(--color-background-primary)'">
            <span style="font-size:12px;color:var(--color-text-info);">What is the standard duration for a software NDA?</span>
          </div>
          <div class="card" style="padding:10px 12px;cursor:pointer;transition:background .15s;" onmouseover="this.style.background='var(--color-background-secondary)'" onmouseout="this.style.background='var(--color-background-primary)'">
            <span style="font-size:12px;color:var(--color-text-info);">How does this affect my trade secrets?</span>
          </div>
          <div class="card" style="padding:10px 12px;cursor:pointer;transition:background .15s;" onmouseover="this.style.background='var(--color-background-secondary)'" onmouseout="this.style.background='var(--color-background-primary)'">
            <span style="font-size:12px;color:var(--color-text-info);">Draft an email to opposing counsel declining this.</span>
          </div>
        </div>

        <p class="section-label">Export clause</p>
        <div class="card" style="padding:12px;">
          <p class="meta-text mb-12">Copy the analysis or original text for use in emails or redlines.</p>
          <div class="flex flex-col gap-8">
            <button class="btn-sm" style="justify-content:flex-start;">Copy original text</button>
            <button class="btn-sm" style="justify-content:flex-start;">Copy translation & analysis</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
