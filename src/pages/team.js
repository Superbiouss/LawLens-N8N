export function renderTeam(container) {
  container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Team workspace</h1>
      <p class="body-text mt-4">Collaborate on document reviews and manage team permissions.</p>
    </div>

    <div class="layout-2col">
      <div>
        <div class="flex justify-between items-center mb-16">
          <p class="section-label m-0">Members</p>
          <button class="btn-sm" id="team-invite-btn">+ Invite member</button>
        </div>

        <div class="card card-flush mb-24">
          ${[
      {
        name: 'John Doe',
        role: 'Owner',
        email: 'john@startup.com',
        initial: 'JD',
        status: 'Active',
      },
      {
        name: 'Anand S.',
        role: 'Expert Reviewer',
        email: 'anand@startup.com',
        initial: 'AS',
        status: 'Active',
      },
      {
        name: 'Sarah J.',
        role: 'General Counsel',
        email: 'sarah@legalservices.com',
        initial: 'SJ',
        status: 'Active',
      },
      {
        name: 'Mike T.',
        role: 'Reviewer',
        email: 'mike@startup.com',
        initial: 'MT',
        status: 'Invited',
      },
    ]
      .map(
        (m, i, arr) => `
            <div class="flex items-center justify-between p-16 ${i < arr.length - 1 ? 'border-b' : ''}">
              <div class="flex items-center gap-12">
                <div class="chat-avatar user avatar-user">${m.initial}</div>
                <div>
                  <div class="fs-13 fw-500">${m.name}</div>
                  <div class="meta-text fs-11">${m.email}</div>
                </div>
              </div>
              <div class="flex items-center gap-12">
                <span class="badge ${m.role === 'Owner' ? 'badge-info' : 'badge-neutral'}">${m.role}</span>
                <span class="fs-12 text-tertiary">${m.status}</span>
                <span class="text-tertiary cursor-pointer px-8">•••</span>
              </div>
            </div>
          `,
      )
      .join('')}
        </div>

        <p class="section-label">Review queue</p>
        <div class="card card-flush">
           ${[
      {
        doc: 'Acme Corp NDA v3.pdf',
        assigned: 'Anand S.',
        status: 'in-progress',
      },
      {
        doc: 'Freelance Agreement.docx',
        assigned: 'Sarah J.',
        status: 'pending',
      },
    ]
      .map(
        (r, i, arr) => `
             <div class="flex items-center justify-between p-16 ${i < arr.length - 1 ? 'border-b' : ''}">
                <div class="flex items-center gap-10">
                  <div class="severity-dot ${r.status === 'in-progress' ? 'review' : 'missing'}"></div>
                  <span class="fs-13 fw-500">${r.doc}</span>
                </div>
                <div class="flex items-center gap-12">
                   <div class="meta-text">Assigned to <strong>${r.assigned}</strong></div>
                   <button class="btn-sm" data-team-view-doc="${r.doc}">View ↗</button>
                </div>
             </div>
           `,
      )
      .join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Sharing activity</p>
        <div class="card p-16 mb-24">
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="fs-12"><strong>Sarah J.</strong> annotated <code>Acme Corp NDA v3.pdf</code></div>
              <div class="meta-text mt-4">2 hours ago</div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="fs-12"><strong>John Doe</strong> shared <code>Office Rental.pdf</code> with team</div>
              <div class="meta-text mt-4">Yesterday</div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="fs-12"><strong>LexAI</strong> completed analysis of 12 documents</div>
              <div class="meta-text mt-4">2 days ago</div>
            </div>
          </div>
        </div>

        <p class="section-label">Roles & Permissions</p>
        <div class="card-surface p-16">
          <ul class="list-reset flex flex-col gap-12">
             <li>
               <div class="fs-12 fw-500 mb-2">Expert Reviewer</div>
               <div class="meta-text fs-11">Can annotate, edit suggestions, and share compliance reports.</div>
             </li>
             <li>
               <div class="fs-12 fw-500 mb-2">Reviewer</div>
               <div class="meta-text fs-11">Can view, comment, and download summaries.</div>
             </li>
          </ul>
        </div>
      </div>
    </div>
  `;


  container.querySelector('#team-invite-btn')?.addEventListener('click', () => {
    window.showToast('Invite flow would send an email from the backend.');
  });

  container.querySelectorAll('[data-team-view-doc]').forEach((button) => {
    button.addEventListener('click', () => {
      window.navigateTo('annotations');
    });
  });
}
