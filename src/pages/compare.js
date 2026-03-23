export function renderCompare(container) {
    container.innerHTML = `
    <div style="background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);margin:-24px -24px 24px;">
      <div class="nav-tabs" style="border-bottom:none;">
        <div class="nav-tab" onclick="navigateTo('summary')">Summary</div>
        <div class="nav-tab" onclick="navigateTo('clause-breakdown')">Clause breakdown</div>
        <div class="nav-tab" onclick="navigateTo('risk-report')">Risk report</div>
        <div class="nav-tab" onclick="navigateTo('key-dates')">Key dates</div>
        <div class="nav-tab" onclick="navigateTo('ask')">Ask the doc</div>
        <div class="nav-tab active">Compare</div>
      </div>
    </div>

    <!-- Target vs Base layout -->
    <div class="layout-2col-equal mb-20">
      
      <!-- Base Document -->
      <div class="card" style="padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer;background:var(--color-background-secondary);border-color:transparent;">
        <div style="width:36px;height:36px;border-radius:var(--border-radius-md);background:var(--color-background-primary);border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
        </div>
        <div style="flex:1;">
          <div style="font-size:11px;color:var(--color-text-tertiary);margin-bottom:2px;text-transform:uppercase;letter-spacing:0.05em;font-weight:500;">Version 1 (Base)</div>
          <div style="font-size:13px;font-weight:500;color:var(--color-text-primary);">Acme Corp NDA v3.pdf</div>
        </div>
        <span class="badge badge-danger">7.2 Risk</span>
      </div>

      <!-- Target Document -->
      <div class="card" style="padding:12px 14px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor='var(--color-border-info)'" onmouseout="this.style.borderColor='var(--color-border-tertiary)'">
        <div style="width:36px;height:36px;border-radius:var(--border-radius-md);background:var(--color-background-secondary);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-size:20px;color:var(--color-text-tertiary);line-height:1;">+</span>
        </div>
        <div style="flex:1;">
          <div style="font-size:11px;color:var(--color-text-tertiary);margin-bottom:2px;text-transform:uppercase;letter-spacing:0.05em;font-weight:500;">Version 2 (Target)</div>
          <div style="font-size:13px;color:var(--color-text-secondary);">Select document to compare...</div>
        </div>
      </div>

    </div>

    <!-- Empty state before comparison is run -->
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:300px;border:1.5px dashed var(--color-border-secondary);border-radius:var(--border-radius-lg);background:var(--color-background-primary);">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:16px;"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 3l7 7"/><path d="M16 21h5v-5"/><path d="M8 21H3v-5"/><path d="M21 21l-7-7"/><path d="M3 21l7-7"/></svg>
      <div style="font-size:15px;font-weight:500;color:var(--color-text-primary);margin-bottom:8px;">Compare document versions</div>
      <div style="font-size:13px;color:var(--color-text-secondary);max-width:320px;text-align:center;line-height:1.5;">Select a second document above to see a side-by-side diff. LexAI will highlight additions, deletions, and risk changes.</div>
    </div>
  `;
}
