import {
  bindRouteTabs,
  REVIEW_TABS,
  renderPageTabs,
} from './shared/page-tabs.js';
import { escapeHtml } from './shared/ui-actions.js';

export function renderAnnotations(container) {
  container.innerHTML = `
    ${renderPageTabs(REVIEW_TABS, 'annotations', { flush: true })}

    <div class="workspace-shell wide-sidebar">
      <div class="workspace-doc">
        <div class="card workspace-paper">
          <h2 class="doc-legal-title">Non-Disclosure Agreement</h2>
          <p class="doc-copy doc-copy-tight">This NON-DISCLOSURE AGREEMENT (the "Agreement") is entered into as of January 1, 2025, by and between Acme Corp ("Discloser") and John Doe ("Recipient").</p>

          <p class="fs-13 fw-500 mb-12">1. DEFINITION OF CONFIDENTIAL INFORMATION</p>
          <p class="doc-copy">"Confidential Information" shall mean all information disclosed by Discloser to Recipient which is in written, graphic, machine readable or other tangible form and is marked as "Confidential" or "Proprietary".</p>

          <p class="fs-13 fw-500 mb-12">2. OBLIGATIONS OF RECEIVING PARTY</p>
          <p class="doc-copy">Recipient agrees that at all times and notwithstanding any termination or expiration of this Agreement, Recipient will hold in strict confidence and <span class="doc-highlight-warning" title="Clicked annotation">not disclose to any third party Confidential Information</span>, except as approved in writing by Discloser. Recipient will also use Confidential Information for no purpose other than the Evaluation Purpose.</p>

          <p class="fs-13 fw-500 mb-12">3. LIQUIDATED DAMAGES</p>
          <p class="doc-copy">In the event of any breach of the confidentiality obligations hereunder, the parties agree that the harm to Discloser would be difficult to quantify and Recipient shall pay as liquidated damages <span class="doc-highlight-danger">the sum of $500,000 per violation</span>.</p>
        </div>
      </div>

      <div class="workspace-panel">
        <div class="workspace-panel-header">
          <h3 class="section-label m-0">Annotations (3)</h3>
          <div class="flex gap-4">
            <button class="btn-sm">New</button>
            <button class="btn-sm">Resolve</button>
          </div>
        </div>

        <div class="workspace-panel-scroll" id="annotation-list">
          <div class="card p-12 annotation-card-info">
            <div class="flex items-center gap-8 mb-8">
              <div class="chat-avatar user chat-avatar-sm">JD</div>
              <span class="fs-12 fw-500">John Doe</span>
              <span class="meta-text fs-10">10:42 AM</span>
            </div>
            <p class="fs-12 text-primary lh-15">This damages clause is a dealbreaker. We need to cap this at 1x the contract value or actual harm.</p>
            <div class="annotation-reply">
              <div class="flex items-center gap-8">
                <div class="chat-avatar user chat-avatar-sm chat-avatar-brand">AS</div>
                <span class="fs-12 fw-500">Anand S.</span>
                <span class="meta-text fs-10">Just now</span>
              </div>
              <p class="fs-12 text-secondary annotation-reply-copy">Agreed. I'll draft the redline for this.</p>
            </div>
          </div>

          <div class="card p-12">
            <div class="flex items-center gap-8 mb-8">
              <div class="severity-dot review"></div>
              <span class="fs-11 fw-500 text-warning annotation-label">Clause 2 · Highlight</span>
            </div>
            <p class="fs-12 text-secondary annotation-quote">"not disclose to any third party Confidential Information"</p>
            <button class="btn-sm mt-8 w-full annotation-action">+ Add comment</button>
          </div>
        </div>

        <div class="workspace-panel-footer">
          <textarea placeholder="Write a comment..." class="annotation-input" id="annotation-input"></textarea>
          <div class="flex justify-between items-center mt-8">
            <span class="meta-text">Press Ctrl+Enter to post</span>
            <button class="btn-sm btn-primary" id="post-annotation-btn">Post</button>
          </div>
        </div>
      </div>
    </div>
  `;

  bindRouteTabs(container);
  bindAnnotationActions(container);

  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('.nav-tabs'));
    }
  }, 0);
}

function bindAnnotationActions(container) {
  const list = container.querySelector('#annotation-list');
  const input = container.querySelector('#annotation-input');

  container
    .querySelectorAll('.workspace-panel-header .btn-sm')[0]
    ?.addEventListener('click', () => {
      input.focus();
      window.showToast('Start a new annotation below.');
    });

  container
    .querySelectorAll('.workspace-panel-header .btn-sm')[1]
    ?.addEventListener('click', () => {
      const firstCard = list.querySelector('.card');
      if (!firstCard) {
        window.showToast('No open annotations to resolve.');
        return;
      }
      firstCard.remove();
      window.showToast('Annotation resolved.');
    });

  container
    .querySelector('.annotation-action')
    ?.addEventListener('click', () => {
      input.value = 'Commenting on Clause 2 highlight...';
      input.focus();
    });

  const submit = () => {
    const value = input.value.trim();
    if (!value) {
      window.showToast('Write a comment first.');
      return;
    }

    list.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="card p-12">
        <div class="flex items-center gap-8 mb-8">
          <div class="chat-avatar user chat-avatar-sm">JD</div>
          <span class="fs-12 fw-500">John Doe</span>
          <span class="meta-text fs-10">Just now</span>
        </div>
        <p class="fs-12 text-primary lh-15">${escapeHtml(value)}</p>
      </div>
    `,
    );
    input.value = '';
    window.showToast('Annotation posted.');
  };

  container
    .querySelector('#post-annotation-btn')
    ?.addEventListener('click', submit);
  input.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  });
}
