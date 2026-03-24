const DATE_ITEMS = [
  { type: 'Expiries', date: '1 Jan 2025', title: 'Effective Date', desc: 'Contract comes into full force.', status: 'success' },
  { type: 'Deliverables', date: '15 Feb 2025', title: 'First Milestone', desc: 'Acme Corp to deliver initial assets.', status: 'info' },
  { type: 'Payments', date: '1 Mar 2025', title: 'Payment Due', desc: 'Invoice #442 payment deadline.', status: 'warning' },
  { type: 'Notices', date: '1 Jan 2026', title: 'Auto-renewal Notice', desc: 'Deadline to opt-out of renewal.', status: 'danger' },
  { type: 'Expiries', date: 'Unlimited', title: 'Expiry', desc: 'No fixed end date in current draft.', status: 'danger' },
];

export function renderKeyDates(container) {
  const state = {
    filter: 'Expiries',
    email: true,
    sms: false,
  };

  const render = () => {
    const timeline = DATE_ITEMS.filter(item => item.type === state.filter);

    container.innerHTML = `
      <div class="flex justify-between items-center mb-24">
        <div>
          <h1 class="page-title">Key dates timeline</h1>
          <p class="body-text mt-4">Automated extraction of all deadlines, expiries, and notice periods.</p>
        </div>
        <div class="flex gap-8">
          <button class="btn" id="sync-calendar-btn">Sync with calendar</button>
          <button class="btn-primary" id="add-custom-date-btn">Add custom date</button>
        </div>
      </div>

      <div class="layout-2col">
        <div>
          <div class="card mb-24 key-dates-card">
            <p class="section-label mb-24">Timeline view</p>
            <div class="timeline key-dates-timeline">
              ${timeline.map(item => `
                <div class="tl-item">
                  <div class="tl-dot ${item.status}"></div>
                  <div class="key-dates-date ${item.status}">${item.date}</div>
                  <div class="key-dates-title">${item.title}</div>
                  <p class="meta-text mt-4">${item.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <p class="section-label">Upcoming notifications</p>
          <div class="flex flex-col gap-8">
            ${renderNotifications(state.filter)}
          </div>
        </div>

        <div>
          <p class="section-label">Reminders</p>
          <div class="card-surface mb-16">
            <div class="flex items-center gap-10 mb-8">
              <button type="button" class="reset-btn toggle ${state.email ? 'on' : ''}" id="email-reminder-toggle" aria-pressed="${state.email}"></button>
              <span class="fs-12 text-primary">Email notifications</span>
            </div>
            <p class="meta-text">Sent to you and 2 team members 3 days before any deadline.</p>
          </div>

          <div class="card-surface mb-24">
            <div class="flex items-center gap-10 mb-8">
              <button type="button" class="reset-btn toggle ${state.sms ? 'on' : ''}" id="sms-reminder-toggle" aria-pressed="${state.sms}"></button>
              <span class="fs-12 text-primary">SMS alerts</span>
            </div>
            <p class="meta-text">Only for critical contract expiries.</p>
          </div>

          <p class="section-label">Filter by type</p>
          <div class="flex flex-col gap-2 mb-24">
            ${['Expiries', 'Payments', 'Deliverables', 'Notices'].map(filter => `
              <button type="button" class="reset-btn nav-item text-left ${state.filter === filter ? 'active' : ''}" data-date-filter="${filter}">
                <span>${filter}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    bindKeyDateActions(container, state, render);
  };

  render();
}

function renderNotifications(filter) {
  const notifications = {
    Expiries: [{ title: 'Renewal decision due soon', date: '1 Jan 2026', tone: 'danger' }],
    Payments: [{ title: 'Payment due in 6 days', date: '1 Mar 2025', tone: 'warning' }],
    Deliverables: [{ title: 'Milestone review required', date: '15 Feb 2025', tone: 'info' }],
    Notices: [{ title: 'Renewal notice window open', date: '1 Jan 2026', tone: 'danger' }],
  };

  return (notifications[filter] || []).map(item => `
    <div class="card-accent-left ${item.tone === 'warning' ? 'warning' : item.tone === 'info' ? 'info' : ''}">
      <div class="flex justify-between items-center">
        <span class="fs-13 fw-500">${item.title}</span>
        <span class="meta-text">${item.date}</span>
      </div>
    </div>
  `).join('');
}

function bindKeyDateActions(container, state, render) {
  container.querySelector('#sync-calendar-btn')?.addEventListener('click', () => {
    window.showToast('Calendar sync requires an external calendar connection.');
  });

  container.querySelector('#add-custom-date-btn')?.addEventListener('click', () => {
    window.showToast('Custom date creation would open a scheduling modal.');
  });

  container.querySelector('#email-reminder-toggle')?.addEventListener('click', () => {
    state.email = !state.email;
    render();
  });

  container.querySelector('#sms-reminder-toggle')?.addEventListener('click', () => {
    state.sms = !state.sms;
    render();
  });

  container.querySelectorAll('[data-date-filter]').forEach(button => {
    button.addEventListener('click', () => {
      state.filter = button.dataset.dateFilter;
      render();
    });
  });
}
