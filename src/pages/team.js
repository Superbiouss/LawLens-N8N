export function renderTeam(container) {
    container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Team workspace</h1>
      <p class="body-text mt-4">Collaborate on document reviews and manage team permissions.</p>
    </div>

    <div class="layout-2col">
      <div>
        <div class="flex justify-between items-center mb-16">
          <p class="section-label" style="margin:0;">Members</p>
          <button class="btn-sm">+ Invite member</button>
        </div>

        <div class="card mb-24" style="padding:0;overflow:hidden;">
          ${[
            { name: 'John Doe', role: 'Owner', email: 'john@startup.com', initial: 'JD', status: 'Active' },
            { name: 'Anand S.', role: 'Expert Reviewer', email: 'anand@startup.com', initial: 'AS', status: 'Active' },
            { name: 'Sarah J.', role: 'General Counsel', email: 'sarah@legalservices.com', initial: 'SJ', status: 'Active' },
            { name: 'Mike T.', role: 'Reviewer', email: 'mike@startup.com', initial: 'MT', status: 'Invited' },
        ].map((m, i, arr) => `
            <div class="flex items-center justify-between p-16" style="${i < arr.length - 1 ? 'border-bottom:0.5px solid var(--color-border-tertiary);' : ''}">
              <div class="flex items-center gap-12">
                <div class="chat-avatar user" style="width:32px;height:32px;background:var(--color-background-secondary);">${m.initial}</div>
                <div>
                  <div style="font-size:13px;font-weight:500;">${m.name}</div>
                  <div class="meta-text" style="font-size:11px;">${m.email}</div>
                </div>
              </div>
              <div class="flex items-center gap-12">
                <span class="badge ${m.role === 'Owner' ? 'badge-info' : 'badge-neutral'}">${m.role}</span>
                <span style="font-size:12px;color:var(--color-text-tertiary);">${m.status}</span>
                <span style="color:var(--color-text-tertiary);cursor:pointer;padding:0 8px;">•••</span>
              </div>
            </div>
          `).join('')}
        </div>

        <p class="section-label">Review queue</p>
        <div class="card" style="padding:0;overflow:hidden;">
           ${[
            { doc: 'Acme Corp NDA v3.pdf', assigned: 'Anand S.', status: 'in-progress' },
            { doc: 'Freelance Agreement.docx', assigned: 'Sarah J.', status: 'pending' },
        ].map((r, i, arr) => `
             <div class="flex items-center justify-between p-16" style="${i < arr.length - 1 ? 'border-bottom:0.5px solid var(--color-border-tertiary);' : ''}">
                <div class="flex items-center gap-10">
                  <div class="severity-dot ${r.status === 'in-progress' ? 'review' : 'missing'}"></div>
                  <span style="font-size:13px;font-weight:500;">${r.doc}</span>
                </div>
                <div class="flex items-center gap-12">
                   <div class="meta-text">Assigned to <strong>${r.assigned}</strong></div>
                   <button class="btn-sm">View ↗</button>
                </div>
             </div>
           `).join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Sharing activity</p>
        <div class="card mb-24" style="padding:16px;">
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div style="font-size:12px;"><strong>Sarah J.</strong> annotated <code>Acme Corp NDA v3.pdf</code></div>
              <div class="meta-text mt-4">2 hours ago</div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div style="font-size:12px;"><strong>John Doe</strong> shared <code>Office Rental.pdf</code> with team</div>
              <div class="meta-text mt-4">Yesterday</div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div style="font-size:12px;"><strong>LexAI</strong> completed analysis of 12 documents</div>
              <div class="meta-text mt-4">2 days ago</div>
            </div>
          </div>
        </div>

        <p class="section-label">Roles & Permissions</p>
        <div class="card-surface" style="padding:16px;">
          <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:12px;">
             <li>
               <div style="font-size:12px;font-weight:500;margin-bottom:2px;">Expert Reviewer</div>
               <div class="meta-text" style="font-size:11px;">Can annotate, edit suggestions, and share compliance reports.</div>
             </li>
             <li>
               <div style="font-size:12px;font-weight:500;margin-bottom:2px;">Reviewer</div>
               <div class="meta-text" style="font-size:11px;">Can view, comment, and download summaries.</div>
             </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
