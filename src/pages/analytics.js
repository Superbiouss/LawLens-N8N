export function renderAnalytics(container) {
  container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Portfolio Analytics</h1>
      <p class="body-text mt-4">Cross-document insights and risk exposure trends.</p>
    </div>

    <div class="layout-3col mb-24">
      <div class="card">
        <p class="meta-text mb-8">Average Portfolio Risk</p>
        <div class="flex items-end gap-8">
           <span style="font-size:28px;font-weight:600;color:var(--color-text-warning);">4.2</span>
           <span class="meta-text mb-4">/ 10.0</span>
        </div>
        <p style="font-size:11px;color:var(--color-text-success);margin-top:8px;">↓ 12% from last month</p>
      </div>
      <div class="card">
        <p class="meta-text mb-8">Contract Volume</p>
        <div class="flex items-end gap-8">
           <span style="font-size:28px;font-weight:600;">128</span>
           <span class="meta-text mb-4">Files</span>
        </div>
        <p style="font-size:11px;color:var(--color-text-secondary);margin-top:8px;">14 pending review</p>
      </div>
      <div class="card">
        <p class="meta-text mb-8">Compliance Score</p>
        <div class="flex items-end gap-8">
           <span style="font-size:28px;font-weight:600;color:var(--color-text-success);">92%</span>
        </div>
        <p style="font-size:11px;color:var(--color-text-success);margin-top:8px;">↑ 3% improvement</p>
      </div>
    </div>

    <div class="layout-2col">
      <div class="card">
        <h3 class="section-label mb-16">Risk Exposure by Entity</h3>
        <div class="flex flex-col gap-12">
          ${[
            { name: 'Acme Corp', risk: 85, color: 'var(--color-text-danger)' },
            {
              name: 'Global Tech',
              risk: 42,
              color: 'var(--color-text-warning)',
            },
            {
              name: 'Zenith Logistics',
              risk: 15,
              color: 'var(--color-text-success)',
            },
            {
              name: 'CloudScale Inc',
              risk: 38,
              color: 'var(--color-text-warning)',
            },
          ]
            .map(
              (e) => `
            <div>
              <div class="flex justify-between items-center mb-6">
                <span style="font-size:13px;font-weight:500;">${e.name}</span>
                <span style="font-size:11px;color:var(--color-text-tertiary);">${e.risk}% Exposure</span>
              </div>
              <div class="progress-track" style="height:6px;">
                <div class="progress-bar" style="width:${e.risk}%; background:${e.color};"></div>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <div class="card">
        <h3 class="section-label mb-16">Risk Heatmap (Category)</h3>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:4px;">
           ${[
             { label: 'Liabilty', intensity: 0.9, color: 'danger' },
             { label: 'Termination', intensity: 0.6, color: 'warning' },
             { label: 'IP Rights', intensity: 0.3, color: 'success' },
             { label: 'Non-Compete', intensity: 0.8, color: 'danger' },
             { label: 'Indemnity', intensity: 0.7, color: 'warning' },
             { label: 'Governing Law', intensity: 0.2, color: 'success' },
             { label: 'Assignment', intensity: 0.4, color: 'info' },
             { label: 'Confidentiality', intensity: 0.1, color: 'success' },
             { label: 'Force Majeure', intensity: 0.5, color: 'info' },
           ]
             .map(
               (h) => `
             <div class="card-surface" style="height:60px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--color-background-${h.color});border-color:var(--color-border-${h.color});">
                <span style="font-size:10px;font-weight:600;text-align:center;">${h.label}</span>
                <span style="font-size:9px;opacity:0.6;">${(h.intensity * 100).toFixed(0)}%</span>
             </div>
           `,
             )
             .join('')}
        </div>
      </div>
    </div>

    <div class="card mt-24">
       <h3 class="section-label mb-16">Portfolio Compliance Trend</h3>
       <div style="height:180px;width:100%;position:relative;display:flex;align-items:flex-end;gap:12px;padding-top:20px;">
          <!-- SVG Trend Line (Mock) -->
          <svg style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:visible;">
             <path d="M0,150 L50,130 L100,140 L150,100 L200,110 L250,90 L300,70 L350,80 L400,40 L450,50 L500,30" 
                   fill="none" 
                   stroke="var(--color-brand-purple)" 
                   stroke-width="2.5" 
                   stroke-linecap="round" 
                   stroke-linejoin="round"
                   style="stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dash 2s linear forwards;" />
          </svg>
          <div style="position:absolute;bottom:-20px;width:100%;display:flex;justify-content:space-between;color:var(--color-text-tertiary);font-size:10px;">
             <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span><span>NOV</span>
          </div>
       </div>
    </div>

    <style>
      @keyframes dash {
        to { stroke-dashoffset: 0; }
      }
    </style>
    `;
}
