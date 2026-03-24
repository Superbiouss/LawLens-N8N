export function renderExport(container) {
  container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Export & share</h1>
      <p class="body-text mt-4">Download your analysis in professional formats or share with stakeholders.</p>
    </div>

    <div class="layout-2col">
      <div>
        <p class="section-label">Download analysis</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;" class="mb-24">
          
          <div class="card-surface text-center hover-border-info" style="padding:24px;cursor:pointer;border:1px solid transparent;">
            <div style="width:48px;height:48px;border-radius:var(--border-radius-md);background:var(--color-background-danger);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-danger)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <p style="font-size:14px;font-weight:500;color:var(--color-text-primary);">Analysis PDF</p>
            <p class="meta-text mt-4">Professional report with risk score and summaries.</p>
            <button class="btn-sm mt-16 w-full">Download</button>
          </div>

          <div class="card-surface text-center hover-border-info" style="padding:24px;cursor:pointer;border:1px solid transparent;">
            <div style="width:48px;height:48px;border-radius:var(--border-radius-md);background:var(--color-background-info);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-info)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <p style="font-size:14px;font-weight:500;color:var(--color-text-primary);">Word Redlines</p>
            <p class="meta-text mt-4">Draft suggested changes directly into DOCX.</p>
            <button class="btn-sm mt-16 w-full">Download</button>
          </div>

        </div>

        <p class="section-label">Share with link</p>
        <div class="card mb-24">
          <p class="meta-text mb-12">Anyone with this link can view the summary and risk report.</p>
          <div class="flex gap-8">
            <input type="text" value="https://lexai.app/share/acme-nda-77x2" readonly style="flex:1;background:var(--color-background-secondary);border-style:dashed;" />
            <button class="btn-primary">Copy link</button>
          </div>
          <div class="flex items-center gap-12 mt-16 p-12 card-surface">
            <div class="toggle on"></div>
            <span style="font-size:12px;color:var(--color-text-primary);">Allow comments & annotations</span>
          </div>
        </div>

        <p class="section-label">Recent exports</p>
        <div class="card" style="padding:0;overflow:hidden;">
          ${[
      { name: 'Summary_Report.pdf', date: 'Today, 2:40 PM', user: 'You' },
      { name: 'Redlines_Draft_1.docx', date: 'Yesterday', user: 'You' },
      { name: 'Summary_Full.pdf', date: '2 days ago', user: 'Anand S.' },
    ].map((e, i, arr) => `
            <div class="flex items-center justify-between p-12" style="${i < arr.length - 1 ? 'border-bottom:0.5px solid var(--color-border-tertiary);' : ''}">
              <div class="flex items-center gap-10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                <div>
                  <div style="font-size:13px;font-weight:500;">${e.name}</div>
                  <div class="meta-text" style="font-size:10px;">${e.date} · by ${e.user}</div>
                </div>
              </div>
              <button class="btn-sm" style="border:none;color:var(--color-text-info);">Re-download</button>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Permissions</p>
        <div class="card-surface mb-24">
          <div class="flex flex-col gap-8">
            <div class="flex justify-between items-center">
              <span style="font-size:12px;color:var(--color-text-secondary);">Public link</span>
              <span class="badge badge-warning">Enabled</span>
            </div>
            <div class="flex justify-between items-center">
              <span style="font-size:12px;color:var(--color-text-secondary);">Password protect</span>
              <span class="badge badge-neutral">Disabled</span>
            </div>
            <div class="flex justify-between items-center">
              <span style="font-size:12px;color:var(--color-text-secondary);">Link expiry</span>
              <span class="meta-text">30 Days</span>
            </div>
          </div>
        </div>

        <p class="section-label">Integration sync</p>
        <div class="card-surface">
          <div class="flex items-center gap-10 mb-12">
             <div style="width:24px;height:24px;background:#0061FF;border-radius:4px;display:flex;align-items:center;justify-content:center;">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M6 2l6 4-6 4-6-4 6-4zm0 20l-6-4 6-4 6 4-6 4zm6-10l6 4-6 4-6-4 6-4zm6-10l6 4-6 4-6-4 6-4zm0 20l-6-4 6-4 6 4-6 4z"/></svg>
             </div>
             <span style="font-size:13px;font-weight:500;">Dropbox</span>
             <span class="badge badge-success ml-auto">Linked</span>
          </div>
          <p class="meta-text">All exports are automatically synced to <code>/Apps/LexAI/Exports</code></p>
        </div>
      </div>
    </div>
  `;
}
