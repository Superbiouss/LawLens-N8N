export function renderKeyDates(container) {
    container.innerHTML = `
    <div class="flex justify-between items-center mb-24">
      <div>
        <h1 class="page-title">Key dates timeline</h1>
        <p class="body-text mt-4">Automated extraction of all deadlines, expiries, and notice periods.</p>
      </div>
      <div class="flex gap-8">
        <button class="btn">Sync with calendar</button>
        <button class="btn-primary">Add custom date</button>
      </div>
    </div>

    <div class="layout-2col">
      <div>
        <div class="card mb-24" style="padding:40px 60px;">
          <p class="section-label mb-24">Timeline view</p>
          <div class="timeline" style="padding-left:40px;">
            ${[
            { date: '1 Jan 2025', title: 'Effective Date', desc: 'Contract comes into full force.', status: 'success' },
            { date: '15 Feb 2025', title: 'First Milestone', desc: 'Acme Corp to deliver initial assets.', status: 'info' },
            { date: '1 Mar 2025', title: 'Payment Due', desc: 'Invoice #442 payment deadline.', status: 'warning' },
            { date: '1 Jan 2026', title: 'Auto-renewal Notice', desc: 'Deadline to opt-out of renewal.', status: 'danger' },
            { date: 'Unlimited', title: 'Expiry', desc: 'No fixed end date in current draft.', status: 'danger' },
        ].map(item => `
              <div class="tl-item">
                <div class="tl-dot ${item.status}"></div>
                <div style="font-size:12px;font-weight:500;color:var(--color-text-${item.status === 'danger' ? 'danger' : 'secondary'});margin-bottom:4px;">${item.date}</div>
                <div style="font-size:15px;font-weight:500;color:var(--color-text-primary);">${item.title}</div>
                <p class="meta-text mt-4">${item.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="section-label">Upcoming notifications</p>
        <div class="flex flex-col gap-8">
          <div class="card-accent-left warning">
            <div class="flex justify-between items-center">
              <span style="font-size:13px;font-weight:500;">Payment Due in 6 days</span>
              <span class="meta-text">1 Mar 2025</span>
            </div>
          </div>
          <div class="card-accent-left info">
            <div class="flex justify-between items-center">
              <span style="font-size:13px;font-weight:500;">Milestone review required</span>
              <span class="meta-text">15 Feb 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="section-label">Reminders</p>
        <div class="card-surface mb-16">
          <div class="flex items-center gap-10 mb-8">
            <div class="toggle on"></div>
            <span style="font-size:12px;color:var(--color-text-primary);">Email notifications</span>
          </div>
          <p class="meta-text">Sent to you and 2 team members 3 days before any deadline.</p>
        </div>

        <div class="card-surface mb-24">
          <div class="flex items-center gap-10 mb-8">
            <div class="toggle"></div>
            <span style="font-size:12px;color:var(--color-text-primary);">SMS alerts</span>
          </div>
          <p class="meta-text">Only for critical contract expiries.</p>
        </div>

        <p class="section-label">Filter by type</p>
        <div class="flex flex-col gap-2 mb-24">
          <div class="nav-item active"><span>Expiries</span></div>
          <div class="nav-item"><span>Payments</span></div>
          <div class="nav-item"><span>Deliverables</span></div>
          <div class="nav-item"><span>Notices</span></div>
        </div>
      </div>
    </div>
  `;
}
