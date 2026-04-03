import { copyText, downloadTextFile } from './shared/ui-actions.js';

const RECENT_EXPORTS = [
  { name: 'Summary_Report.pdf', date: 'Today, 2:40 PM', user: 'You' },
  { name: 'Redlines_Draft_1.docx', date: 'Yesterday', user: 'You' },
  { name: 'Summary_Full.pdf', date: '2 days ago', user: 'Anand S.' },
];

export function renderExport(container) {
  container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Export & share</h1>
      <p class="body-text mt-4">Download your analysis in professional formats or share with stakeholders.</p>
    </div>

    <div class="layout-2col">
      <div>
        <p class="section-label">Download analysis</p>
        <div class="export-grid mb-24">
          <div class="card-surface text-center hover-border-info export-card">
            <div class="export-icon danger">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-danger)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <p class="export-card-title">Analysis PDF</p>
            <p class="meta-text mt-4">Professional report with risk score and summaries.</p>
            <button class="btn-sm mt-16 w-full" data-export-file="analysis-pdf">Download</button>
          </div>

          <div class="card-surface text-center hover-border-info export-card">
            <div class="export-icon info">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-info)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <p class="export-card-title">Word Redlines</p>
            <p class="meta-text mt-4">Draft suggested changes directly into DOCX.</p>
            <button class="btn-sm mt-16 w-full" data-export-file="word-redlines">Download</button>
          </div>
        </div>

        <p class="section-label">Share with link</p>
        <div class="card mb-24">
          <p class="meta-text mb-12">Anyone with this link can view the summary and risk report.</p>
          <div class="flex gap-8">
            <input type="text" id="share-link-input" value="https://lawlens.app/share/acme-nda-77x2" readonly class="export-share-input" />
            <button class="btn-primary" id="copy-share-link-btn">Copy link</button>
          </div>
          <div class="flex items-center gap-12 mt-16 p-12 card-surface">
            <button type="button" class="reset-btn toggle on" id="allow-comments-toggle" aria-pressed="true"></button>
            <span class="fs-12 text-primary">Allow comments & annotations</span>
          </div>
        </div>

        <p class="section-label">Recent exports</p>
        <div class="card export-history-shell">
          ${RECENT_EXPORTS.map(
            (item, index, arr) => `
            <div class="flex items-center justify-between p-12 ${index < arr.length - 1 ? 'border-top-tertiary export-history-row' : ''}">
              <div class="flex items-center gap-10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
                <div>
                  <div class="fs-13 fw-500">${item.name}</div>
                  <div class="meta-text fs-10">${item.date} · by ${item.user}</div>
                </div>
              </div>
              <button class="btn-sm export-redownload-btn" data-redownload-name="${item.name}">Re-download</button>
            </div>
          `,
          ).join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Permissions</p>
        <div class="card-surface mb-24">
          <div class="flex flex-col gap-8">
            <div class="flex justify-between items-center">
              <span class="fs-12 text-secondary">Public link</span>
              <span class="badge badge-warning">Enabled</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="fs-12 text-secondary">Password protect</span>
              <span class="badge badge-neutral">Disabled</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="fs-12 text-secondary">Link expiry</span>
              <span class="meta-text">30 Days</span>
            </div>
          </div>
        </div>

        <p class="section-label">Integration sync</p>
        <div class="card-surface">
          <div class="flex items-center gap-10 mb-12">
            <div class="export-sync-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M6 2l6 4-6 4-6-4 6-4zm0 20l-6-4 6-4 6 4-6 4zm6-10l6 4-6 4-6-4 6-4zm6-10l6 4-6 4-6-4 6-4zm0 20l-6-4 6-4 6 4-6 4z"/></svg>
            </div>
            <span class="fs-13 fw-500">Dropbox</span>
            <span class="badge badge-success ml-auto">Linked</span>
          </div>
          <p class="meta-text">All exports are automatically synced to <code>/Apps/LAWLENS/Exports</code></p>
        </div>
      </div>
    </div>
  `;

  bindExportActions(container);
}

function bindExportActions(container) {
  container.querySelectorAll('[data-export-file]').forEach((button) => {
    button.addEventListener('click', () => {
      const isPdf = button.dataset.exportFile === 'analysis-pdf';
      downloadTextFile(
        isPdf ? 'analysis-report.txt' : 'word-redlines.txt',
        isPdf
          ? 'LAWLENS analysis report preview\n\nSummary, risk findings, and obligations would be exported here.'
          : 'LAWLENS redline preview\n\nSuggested clause edits would be exported here.',
      );
    });
  });

  container
    .querySelector('#copy-share-link-btn')
    ?.addEventListener('click', () => {
      copyText(
        container.querySelector('#share-link-input').value,
        'Share link copied.',
      );
    });

  container
    .querySelector('#allow-comments-toggle')
    ?.addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('on');
      event.currentTarget.setAttribute(
        'aria-pressed',
        String(event.currentTarget.classList.contains('on')),
      );
      window.showToast(
        `Comments ${event.currentTarget.classList.contains('on') ? 'enabled' : 'disabled'} on shared link.`,
      );
    });

  container.querySelectorAll('[data-redownload-name]').forEach((button) => {
    button.addEventListener('click', () => {
      downloadTextFile(
        button.dataset.redownloadName.replace(/\.(pdf|docx)$/i, '.txt'),
        `Preview export for ${button.dataset.redownloadName}`,
      );
    });
  });
}
