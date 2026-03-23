export function renderUpload(container) {
    container.innerHTML = `
    <div class="layout-2col">
      <div>
        <div class="mb-16">
          <h1 class="page-title">Analyze a document</h1>
          <p class="body-text mt-8">Upload, paste, or link a legal document to get an instant plain-English analysis.</p>
        </div>

        <div class="seg-tabs mb-16" id="upload-tabs">
          <div class="seg-tab active" data-tab="upload">Upload file</div>
          <div class="seg-tab" data-tab="paste">Paste text</div>
          <div class="seg-tab" data-tab="url">From URL</div>
        </div>

        <div id="panel-upload">
          <div class="upload-zone" id="dropzone">
            <div style="width:40px;height:40px;border-radius:var(--border-radius-md);background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"/><path d="M12 12V4"/><path d="M8 8l4-4 4 4"/></svg>
            </div>
            <p id="dropzone-title" style="font-size:14px;font-weight:500;color:var(--color-text-primary);margin:0 0 4px;">Drop your document here</p>
            <p id="dropzone-sub" style="font-size:12px;color:var(--color-text-tertiary);margin:0 0 14px;">or click to browse files</p>
            <div class="flex gap-6" style="justify-content:center;flex-wrap:wrap;">
              <span class="badge badge-neutral">PDF</span>
              <span class="badge badge-neutral">DOCX</span>
              <span class="badge badge-neutral">TXT</span>
              <span class="badge badge-neutral">up to 50 MB</span>
            </div>
          </div>
        </div>

        <div id="panel-paste" style="display:none">
          <textarea rows="8" placeholder="Paste the full text of your legal document here..." style="font-family:var(--font-mono);height:160px;"></textarea>
        </div>

        <div id="panel-url" style="display:none">
          <div class="flex gap-8">
            <input type="url" placeholder="https://drive.google.com/... or any public document URL" style="flex:1;" />
            <button class="btn-sm">Fetch</button>
          </div>
          <p style="font-size:11px;color:var(--color-text-tertiary);margin:6px 0 0;">Supports Google Drive, Dropbox, OneDrive, and direct PDF links.</p>
        </div>

        <div class="mt-20">
          <p class="section-label">Document type</p>
          <div class="flex gap-6" style="flex-wrap:wrap;" id="dtypes">
            <div class="pill active" data-dtype>Auto-detect</div>
            <div class="pill" data-dtype>NDA</div>
            <div class="pill" data-dtype>Employment</div>
            <div class="pill" data-dtype>Lease</div>
            <div class="pill" data-dtype>SaaS / MSA</div>
            <div class="pill" data-dtype>Terms of service</div>
            <div class="pill" data-dtype>Other</div>
          </div>
        </div>

        <div class="mt-20">
          <p class="section-label">Analysis depth</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="card depth-card selected" id="d-quick" style="cursor:pointer;transition:border-color .15s;">
              <p style="font-size:13px;font-weight:500;color:var(--color-text-primary);margin:0 0 2px;">Quick scan</p>
              <p style="font-size:11px;color:var(--color-text-tertiary);margin:0;">Summary + red flags only. ~10 sec.</p>
            </div>
            <div class="card depth-card" id="d-full" style="cursor:pointer;transition:border-color .15s;">
              <p style="font-size:13px;font-weight:500;color:var(--color-text-primary);margin:0 0 2px;">Full analysis</p>
              <p style="font-size:11px;color:var(--color-text-tertiary);margin:0;">Every clause, obligations, timeline. ~30 sec.</p>
            </div>
          </div>
        </div>

        <button class="btn-primary btn-full mt-20" id="analyze-btn" disabled>Analyze document</button>

        <div id="progress-wrap" style="display:none;margin-top:20px;">
          <div class="progress-track"><div class="progress-bar" id="pbar" style="width:0%"></div></div>
          <div class="flex flex-col gap-8 mt-12" id="psteps">
            <div class="flex items-center gap-10" style="font-size:13px;color:var(--color-text-primary);font-weight:500;" id="ps1"><div class="spinner"></div>Reading document structure</div>
            <div class="flex items-center gap-10" style="font-size:13px;color:var(--color-text-tertiary);" id="ps2"><div class="severity-dot" style="width:7px;height:7px;background:var(--color-border-secondary);"></div>Identifying parties & dates</div>
            <div class="flex items-center gap-10" style="font-size:13px;color:var(--color-text-tertiary);" id="ps3"><div class="severity-dot" style="width:7px;height:7px;background:var(--color-border-secondary);"></div>Extracting clauses</div>
            <div class="flex items-center gap-10" style="font-size:13px;color:var(--color-text-tertiary);" id="ps4"><div class="severity-dot" style="width:7px;height:7px;background:var(--color-border-secondary);"></div>Assessing risk level</div>
            <div class="flex items-center gap-10" style="font-size:13px;color:var(--color-text-tertiary);" id="ps5"><div class="severity-dot" style="width:7px;height:7px;background:var(--color-border-secondary);"></div>Generating plain-English summary</div>
          </div>
        </div>

        <div class="mt-24" style="padding-top:20px;border-top:0.5px solid var(--color-border-tertiary);">
          <p class="section-label">Recent documents</p>
          ${renderRecentDocs()}
        </div>
      </div>

      <div>
        <div class="card mb-16">
          <p style="font-size:12px;font-weight:500;color:var(--color-text-secondary);margin:0 0 10px;">What you'll get</p>
          <div class="flex flex-col gap-8">
            ${['Plain-English summary of the whole document', 'Parties, key dates & obligations identified', 'Red flags and one-sided clauses highlighted', 'Overall risk score (Low / Medium / High)', 'Missing standard clauses flagged'].map(t => `
              <div class="flex items-center gap-8" style="align-items:flex-start;">
                <div style="width:6px;height:6px;border-radius:50%;background:var(--color-text-success);margin-top:6px;flex-shrink:0;"></div>
                <span style="font-size:12px;color:var(--color-text-secondary);line-height:1.5;">${t}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card mb-16">
          <p style="font-size:12px;font-weight:500;color:var(--color-text-secondary);margin:0 0 6px;">Privacy</p>
          <p style="font-size:12px;color:var(--color-text-tertiary);line-height:1.6;margin:0;">Your documents are processed securely and never stored beyond your session unless you choose to save them to your vault.</p>
        </div>

        <div class="card">
          <p style="font-size:12px;font-weight:500;color:var(--color-text-secondary);margin:0 0 2px;">Not a lawyer</p>
          <p style="font-size:12px;color:var(--color-text-tertiary);line-height:1.6;margin:0;">This tool provides AI-assisted analysis. Always consult a qualified legal professional for binding decisions.</p>
        </div>
      </div>
    </div>
  `;

    // Tab switching
    container.querySelectorAll('.seg-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.seg-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            ['upload', 'paste', 'url'].forEach(p => {
                const panel = container.querySelector(`#panel-${p}`);
                if (panel) panel.style.display = p === tab.dataset.tab ? 'block' : 'none';
            });
        });
    });

    // Document type pills
    container.querySelectorAll('[data-dtype]').forEach(pill => {
        pill.addEventListener('click', () => {
            container.querySelectorAll('[data-dtype]').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Depth cards
    container.querySelectorAll('.depth-card').forEach(card => {
        card.addEventListener('click', () => {
            container.querySelectorAll('.depth-card').forEach(c => {
                c.classList.remove('selected');
                c.style.borderColor = '';
                c.style.background = '';
            });
            card.classList.add('selected');
            card.style.borderColor = 'var(--color-border-info)';
            card.style.background = 'var(--color-background-info)';
        });
    });

    // Init selected depth
    const quick = container.querySelector('#d-quick');
    if (quick) { quick.style.borderColor = 'var(--color-border-info)'; quick.style.background = 'var(--color-background-info)'; }

    // Drop zone click simulation
    const dropzone = container.querySelector('#dropzone');
    dropzone.addEventListener('click', () => {
        container.querySelector('#dropzone-title').textContent = 'contract_nda_v3.pdf';
        container.querySelector('#dropzone-sub').textContent = '142 KB — ready to analyze';
        dropzone.classList.add('has-file');
        container.querySelector('#analyze-btn').disabled = false;
    });

    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('drag'); });
    dropzone.addEventListener('dragleave', () => { dropzone.classList.remove('drag'); });
    dropzone.addEventListener('drop', (e) => { e.preventDefault(); dropzone.click(); });

    // Analyze button
    container.querySelector('#analyze-btn').addEventListener('click', () => {
        startAnalysis(container);
    });
}

function startAnalysis(container) {
    container.querySelector('#analyze-btn').style.display = 'none';
    container.querySelector('#progress-wrap').style.display = 'block';

    const steps = ['ps1', 'ps2', 'ps3', 'ps4', 'ps5'];
    const pcts = [15, 35, 58, 78, 100];
    let step = 0;

    function advance() {
        if (step >= steps.length) return;
        if (step > 0) {
            const prev = container.querySelector(`#${steps[step - 1]}`);
            prev.style.color = 'var(--color-text-secondary)';
            prev.innerHTML = `<div style="width:7px;height:7px;border-radius:50%;background:var(--color-text-success);flex-shrink:0;"></div>${prev.textContent.trim()}`;
        }
        const cur = container.querySelector(`#${steps[step]}`);
        cur.style.color = 'var(--color-text-primary)';
        cur.style.fontWeight = '500';
        if (step > 0) {
            cur.innerHTML = `<div class="spinner"></div>${cur.textContent.trim()}`;
        }
        container.querySelector('#pbar').style.width = pcts[step] + '%';
        step++;
        if (step < steps.length) {
            setTimeout(advance, 1100);
        } else {
            setTimeout(() => { window.navigateTo('summary'); }, 1200);
        }
    }
    advance();
}

function renderRecentDocs() {
    const docs = [
        { name: 'Acme Corp — NDA v3.pdf', ago: '2 days ago', risk: 'high', page: 'summary' },
        { name: 'Freelance Services Agreement — Jan 2025.docx', ago: '5 days ago', risk: 'medium', page: 'summary' },
        { name: 'Office Lease — Mumbai — 2025.pdf', ago: 'Last week', risk: 'low', page: 'summary' },
    ];
    return docs.map(d => `
    <div class="flex items-center gap-10" style="padding:8px 0;border-bottom:0.5px solid var(--color-border-tertiary);cursor:pointer;" onclick="navigateTo('${d.page}')">
      <div style="width:28px;height:28px;border-radius:var(--border-radius-md);background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
      </div>
      <div style="flex:1;font-size:13px;font-weight:500;color:var(--color-text-primary);">${d.name}</div>
      <div style="font-size:11px;color:var(--color-text-tertiary);">${d.ago}</div>
      <span class="badge badge-${d.risk === 'high' ? 'danger' : d.risk === 'medium' ? 'warning' : 'success'}">${d.risk.charAt(0).toUpperCase() + d.risk.slice(1)} risk</span>
    </div>
  `).join('');
}
