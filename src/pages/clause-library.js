export function renderClauseLibrary(container) {
    container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Clause Library</h1>
      <p class="body-text mt-4">Browse and reuse "Gold Standard" legal snippets approved by your team.</p>
    </div>

    <div class="flex gap-12 mb-20">
       <div class="search-bar" style="flex:1;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" placeholder="Search clauses (e.g. 'limitation of liability')..." style="border:none;background:transparent;outline:none;width:100%;font-size:13px;color:var(--color-text-primary);" />
       </div>
       <select style="width:160px;">
          <option>All Categories</option>
          <option>NDA / Confidentiality</option>
          <option>Employment</option>
          <option>Intellectual Property</option>
          <option>Termination</option>
       </select>
    </div>

    <div class="flex flex-col gap-16">
      ${[
            {
                title: 'Standard Confidentiality (Mutual)',
                cat: 'NDA',
                text: 'The Receiving Party shall maintain the Confidential Information in strict confidence and shall not disclose it to any third party without the express written consent of the Disclosing Party...',
                risk: 'Standard',
                color: 'success'
            },
            {
                title: 'Limitation of Liability (Mutual Cap)',
                cat: 'General',
                text: 'Neither party’s aggregate liability for all claims arising out of or related to this Agreement shall exceed the total amount paid or payable by Client under this Agreement...',
                risk: 'Moderate',
                color: 'warning'
            },
            {
                title: 'IP Ownership (Work-for-Hire)',
                cat: 'Consulting',
                text: 'Contractor hereby assigns to Client all right, title and interest in and to all Work Product created, developed, or reduced to practice by Contractor during the term of this Agreement...',
                risk: 'Pro-Client',
                color: 'info'
            }
        ].map(c => `
        <div class="card">
           <div class="flex justify-between items-start mb-12">
              <div>
                 <span class="badge badge-neutral mb-8">${c.cat}</span>
                 <h3 style="font-size:14px;font-weight:600;">${c.title}</h3>
              </div>
              <span class="badge badge-${c.color}">${c.risk}</span>
           </div>
           <p style="font-size:12px;line-height:1.6;color:var(--color-text-secondary);padding:12px;background:var(--color-background-secondary);border-radius:4px;font-family:var(--font-serif);">
              "${c.text}"
           </p>
           <div class="flex justify-end gap-12 mt-16">
              <button class="btn-sm" style="border:none;background:transparent;">Copy text</button>
              <button class="btn-sm btn-primary" onclick="navigateTo('drafting')">Use in draft</button>
           </div>
        </div>
      `).join('')}
    </div>
    `;
}
