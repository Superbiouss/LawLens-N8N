import { supabase } from '../lib/supabase.js';
import { apiClient } from '../lib/api-client.js';

export function renderUpload(container) {
  container.innerHTML = `
    <div class="layout-2col">
      <div>
        <div class="mb-16">
          <h1 class="page-title">Analyze a document</h1>
          <p class="body-text mt-8">Upload, paste, or link a legal document to get an instant plain-English analysis.</p>
        </div>

        ${renderUploadTabs()}
        ${renderUploadPanels()}

        <div class="mt-20">
          <p class="section-label">Document type</p>
          <div class="flex gap-6 upload-pill-row" id="dtypes">
            ${renderDocumentTypes()}
          </div>
        </div>

        <div class="mt-20">
          <p class="section-label">Analysis depth</p>
          <div class="upload-depth-grid">
            ${renderDepthCards()}
          </div>
        </div>

        <button class="btn-primary btn-full mt-20" id="analyze-btn" disabled>Analyze document</button>

        <div id="progress-wrap" class="hidden mt-20">
          <div class="progress-track"><div class="progress-bar" id="pbar"></div></div>
          <div class="flex flex-col gap-8 mt-12" id="psteps">
            <div class="progress-step active" id="ps1"><div class="spinner"></div>Reading document structure</div>
            <div class="progress-step muted" id="ps2"><div class="severity-dot progress-dot-muted"></div>Identifying parties & dates</div>
            <div class="progress-step muted" id="ps3"><div class="severity-dot progress-dot-muted"></div>Extracting clauses</div>
            <div class="progress-step muted" id="ps4"><div class="severity-dot progress-dot-muted"></div>Assessing risk level</div>
            <div class="progress-step muted" id="ps5"><div class="severity-dot progress-dot-muted"></div>Generating plain-English summary</div>
          </div>
        </div>

        <div class="mt-24 upload-divider-section">
          <p class="section-label">Recent documents</p>
          <div class="stagger">
            ${renderRecentDocs()}
          </div>
        </div>
      </div>

      <div>
        ${renderUploadSidebar()}
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('.seg-tabs'));
    }
  }, 0);

  bindUploadTabs(container);
  bindDocumentTypes(container);
  bindDepthCards(container);
  bindDropzone(container);
  bindAlternateSources(container);
  bindRecentDocs(container);

  container.querySelector('#analyze-btn').addEventListener('click', () => {
    startAnalysis(container);
  });
}

function renderUploadTabs() {
  const tabs = [
    { id: 'upload', label: 'Upload file', active: true },
    { id: 'paste', label: 'Paste text' },
    { id: 'url', label: 'From URL' },
  ];

  return `
    <div class="seg-tabs mb-16" id="upload-tabs">
      ${tabs
      .map(
        (tab) => `
        <button
          type="button"
          class="reset-btn seg-tab${tab.active ? ' active' : ''}"
          data-tab="${tab.id}"
          ${tab.active ? 'aria-current="page"' : ''}
        >
          ${tab.label}
        </button>
      `,
      )
      .join('')}
    </div>
  `;
}

function renderUploadPanels() {
  return `
    <div id="panel-upload">
      <div class="upload-zone" id="dropzone" role="button" tabindex="0" aria-label="Upload a legal document">
        <div class="upload-drop-icon">
          <i data-lucide="upload"></i>
        </div>
        <p id="dropzone-title" class="dropzone-title">Drop your document here</p>
        <p id="dropzone-sub" class="dropzone-sub">or click to browse files</p>
        <div class="flex gap-6 upload-badge-row">
          <span class="badge badge-neutral">PDF</span>
          <span class="badge badge-neutral">DOCX</span>
          <span class="badge badge-neutral">TXT</span>
          <span class="badge badge-neutral">up to 50 MB</span>
        </div>
      </div>
    </div>

    <div id="panel-paste" class="hidden">
      <textarea rows="8" class="upload-paste-area" id="paste-input" placeholder="Paste the full text of your legal document here..."></textarea>
    </div>

    <div id="panel-url" class="hidden">
      <div class="flex gap-8 upload-url-row">
        <input type="url" class="upload-url-input" id="url-input" placeholder="https://drive.google.com/... or any public document URL" />
        <button class="btn-sm" id="fetch-url-btn">Fetch</button>
      </div>
      <p class="fs-11 text-tertiary upload-url-note">Supports Google Drive, Dropbox, OneDrive, and direct PDF links.</p>
    </div>
  `;
}

function renderDocumentTypes() {
  return [
    'Auto-detect',
    'NDA',
    'Employment',
    'Lease',
    'SaaS / MSA',
    'Terms of service',
    'Other',
  ]
    .map(
      (label, index) => `
      <button type="button" class="reset-btn pill${index === 0 ? ' active' : ''}" data-dtype>${label}</button>
    `,
    )
    .join('');
}

function renderDepthCards() {
  return [
    {
      id: 'd-quick',
      title: 'Quick scan',
      copy: 'Summary + red flags only. ~10 sec.',
      selected: true,
    },
    {
      id: 'd-full',
      title: 'Full analysis',
      copy: 'Every clause, obligations, timeline. ~30 sec.',
    },
  ]
    .map(
      (option) => `
    <button type="button" class="reset-btn card depth-card${option.selected ? ' selected' : ''}" id="${option.id}">
      <p class="fs-13 fw-500 text-primary mb-4">${option.title}</p>
      <p class="fs-11 text-tertiary m-0">${option.copy}</p>
    </button>
  `,
    )
    .join('');
}

function renderUploadSidebar() {
  const checklist = [
    'Plain-English summary of the whole document',
    'Parties, key dates & obligations identified',
    'Red flags and one-sided clauses highlighted',
    'Overall risk score (Low / Medium / High)',
    'Missing standard clauses flagged',
  ];

  return `
    <div class="card mb-16">
      <p class="fs-12 fw-500 text-secondary mb-12">What you'll get</p>
      <div class="check-list">
        ${checklist
      .map(
        (item) => `
          <div class="check-list-item">
            <div class="check-list-dot"></div>
            <span class="fs-12 text-secondary lh-15">${item}</span>
          </div>
        `,
      )
      .join('')}
      </div>
    </div>

    <div class="card mb-16">
      <p class="fs-12 fw-500 text-secondary mb-4">Privacy</p>
      <p class="fs-12 text-tertiary lh-16 m-0">Your documents are processed securely and never stored beyond your session unless you choose to save them to your vault.</p>
    </div>

    <div class="card">
      <p class="fs-12 fw-500 text-secondary mb-4">Not a lawyer</p>
      <p class="fs-12 text-tertiary lh-16 m-0">This tool provides AI-assisted analysis. Always consult a qualified legal professional for binding decisions.</p>
    </div>
  `;
}

function bindUploadTabs(container) {
  container.querySelectorAll('.seg-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.seg-tab').forEach((item) => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-current', 'page');

      ['upload', 'paste', 'url'].forEach((panelId) => {
        const panel = container.querySelector(`#panel-${panelId}`);
        if (panel)
          panel.classList.toggle('hidden', panelId !== tab.dataset.tab);
      });

      if (window.updateTabIndicator) {
        window.updateTabIndicator(container.querySelector('.seg-tabs'));
      }
    });
  });
}

function bindDocumentTypes(container) {
  container.querySelectorAll('[data-dtype]').forEach((pill) => {
    pill.addEventListener('click', () => {
      container
        .querySelectorAll('[data-dtype]')
        .forEach((item) => item.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

function bindDepthCards(container) {
  container.querySelectorAll('.depth-card').forEach((card) => {
    card.addEventListener('click', () => {
      container
        .querySelectorAll('.depth-card')
        .forEach((item) => item.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
}

function bindDropzone(container) {
  const dropzone = container.querySelector('#dropzone');

  const handleFile = (file) => {
    if (!file) return;
    // Store file in a data attribute or global for the analyze button
    window.__lawlens_pending_upload = file;

    container.querySelector('#dropzone-title').textContent = file.name;
    const mb = (file.size / (1024 * 1024)).toFixed(2);
    container.querySelector('#dropzone-sub').textContent = `${mb} MB - ready to analyze`;
    dropzone.classList.add('has-file');
    container.querySelector('#analyze-btn').disabled = false;
  };

  const selectFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt';
    input.onchange = (e) => handleFile(e.target.files[0]);
    input.click();
  };

  dropzone.addEventListener('click', selectFile);
  dropzone.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectFile();
    }
  });
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('drag');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag');
  });
  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('drag');
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
    }
  });
}

function bindAlternateSources(container) {
  const analyzeBtn = container.querySelector('#analyze-btn');
  const pasteInput = container.querySelector('#paste-input');
  const urlInput = container.querySelector('#url-input');
  const fetchUrlBtn = container.querySelector('#fetch-url-btn');
  const title = container.querySelector('#dropzone-title');
  const sub = container.querySelector('#dropzone-sub');
  const dropzone = container.querySelector('#dropzone');

  pasteInput?.addEventListener('input', () => {
    const text = pasteInput.value.trim();
    const hasText = text.length > 0;
    analyzeBtn.disabled = !hasText;

    if (hasText) {
      const file = new File([text], 'pasted-document.txt', { type: 'text/plain' });
      window.__lawlens_pending_upload = file;
      title.textContent = 'Pasted document text';
      sub.textContent = `${text.split(/\s+/).length} words ready to analyze`;
      dropzone.classList.add('has-file');
    } else if (!urlInput?.value.trim()) {
      window.__lawlens_pending_upload = null;
      resetUploadPreview(container);
    }
  });

  fetchUrlBtn?.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
      window.showToast('Paste a public document URL first.');
      return;
    }

    const file = new File([url], 'remote-link.txt', { type: 'text/uri-list' });
    window.__lawlens_pending_upload = file;

    analyzeBtn.disabled = false;
    title.textContent = 'Remote document linked';
    sub.textContent = `${url.replace(/^https?:\/\//, '').slice(0, 42)} ready to analyze`;
    dropzone.classList.add('has-file');
    window.showToast('URL captured for analysis preview.');
  });
}

function resetUploadPreview(container) {
  container.querySelector('#dropzone-title').textContent =
    'Drop your document here';
  container.querySelector('#dropzone-sub').textContent =
    'or click to browse files';
  container.querySelector('#dropzone').classList.remove('has-file');
  container.querySelector('#analyze-btn').disabled = true;
}

function bindRecentDocs(container) {
  container.querySelectorAll('[data-nav-target]').forEach((button) => {
    button.addEventListener('click', () => {
      window.navigateTo(button.dataset.navTarget);
    });
  });
}

async function startAnalysis(container) {
  const file = window.__lawlens_pending_upload;
  if (!file) {
    window.showToast('Please select a file first.');
    return;
  }

  const mainArea = container.querySelector('.layout-2col > div:first-child');
  container.querySelector('#analyze-btn').classList.add('hidden');
  container.querySelector('#progress-wrap').classList.remove('hidden');

  const steps = ['ps1', 'ps2', 'ps3', 'ps4', 'ps5'];
  let currentStep = 0;

  const updateProgress = (stepIndex, pct) => {
    if (stepIndex > 0) {
      const prev = container.querySelector(`#${steps[stepIndex - 1]}`);
      if (prev) {
        prev.classList.remove('active');
        prev.innerHTML = `<div class="progress-dot-done"></div>${prev.textContent.trim()}`;
      }
    }
    const cur = container.querySelector(`#${steps[stepIndex]}`);
    if (cur) {
      cur.classList.remove('muted');
      cur.classList.add('active');
      cur.innerHTML = `<div class="spinner"></div>${cur.textContent.trim()}`;
    }
    const pbar = container.querySelector('#pbar');
    if (pbar) pbar.style.width = `${pct}%`;
  };

  try {
    // Step 1: Upload to Supabase Storage
    updateProgress(0, 15);

    if (!supabase) {
      throw new Error('Supabase is not configured. Running in local demo mode.');
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You must be logged in to upload documents.');

    const filePath = `${session.user.id}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Step 2: Generate Signed URL for n8n
    updateProgress(1, 35);
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('documents')
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (signedUrlError) throw signedUrlError;

    // Step 3: Trigger n8n Ingestion
    updateProgress(2, 60);
    const orchestratorResponse = await apiClient.orchestrate('document_ingest', {
      fileUrl: signedUrlData.signedUrl,
      fileName: file.name,
      fileType: file.type,
      analysisDepth: container.querySelector('.depth-card.selected')?.id || 'd-quick'
    });

    updateProgress(3, 85);
    // (Simulate waiting for async analysis to complete)
    await new Promise(resolve => setTimeout(resolve, 2000));

    updateProgress(4, 100);
    await new Promise(resolve => setTimeout(resolve, 500));

    window.__lawlens_pending_upload = null;
    window.navigateTo('summary');

  } catch (error) {
    console.error('Analysis failed:', error);
    if (error.message.includes('demo mode')) {
      // Fallback for demo mode
      let mockStep = 1;
      const interval = setInterval(() => {
        if (mockStep >= 5) {
          clearInterval(interval);
          window.navigateTo('summary');
        } else {
          updateProgress(mockStep, mockStep * 20);
          mockStep++;
        }
      }, 1000);
    } else {
      window.showToast(error.message || 'Failed to analyze document.');
      container.querySelector('#analyze-btn').classList.remove('hidden');
      container.querySelector('#progress-wrap').classList.add('hidden');
    }
  }
}

function renderRecentDocs() {
  const docs = [
    {
      name: 'Acme Corp - NDA v3.pdf',
      ago: '2 days ago',
      risk: 'high',
      page: 'summary',
    },
    {
      name: 'Freelance Services Agreement - Jan 2025.docx',
      ago: '5 days ago',
      risk: 'medium',
      page: 'summary',
    },
    {
      name: 'Office Lease - Mumbai - 2025.pdf',
      ago: 'Last week',
      risk: 'low',
      page: 'summary',
    },
  ];

  return docs
    .map(
      (doc) => `
    <button type="button" class="reset-btn flex items-center gap-10 recent-doc-row" data-nav-target="${doc.page}">
      <div class="recent-doc-icon">
        <i data-lucide="file-text"></i>
      </div>
      <div class="fs-13 fw-500 text-primary recent-doc-name">${doc.name}</div>
      <div class="fs-11 text-tertiary">${doc.ago}</div>
      <span class="badge badge-${doc.risk === 'high' ? 'danger' : doc.risk === 'medium' ? 'warning' : 'success'}">${doc.risk.charAt(0).toUpperCase() + doc.risk.slice(1)} risk</span>
    </button>
  `,
    )
    .join('');
}
