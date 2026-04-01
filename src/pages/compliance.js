export function renderCompliance(container) {
  container.innerHTML = `
    <div class="layout-2col">
      <div>
        <div class="mb-24">
          <h1 class="page-title">Compliance checklist</h1>
          <p class="body-text mt-4">Verifying document alignment with jurisdictional regulations and internal policy.</p>
        </div>

        <div class="card mb-20 p-20">
          <div class="flex justify-between items-center mb-16">
            <p class="section-label m-0">Regulation set</p>
            <select class="w-auto">
              <option>GDPR (Privacy)</option>
              <option>India Contract Act</option>
              <option>California CCPA</option>
              <option>Internal Policy v2.1</option>
            </select>
          </div>

          <div class="stats-row mb-16 grid-3">
            <div class="stat-card">
              <div class="stat-number success">65%</div>
              <div class="stat-label">Compliance score</div>
            </div>
            <div class="stat-card">
              <div class="stat-number success">8</div>
              <div class="stat-label">Items passed</div>
            </div>
            <div class="stat-card">
              <div class="stat-number danger">3</div>
              <div class="stat-label">Violations found</div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-12">
          ${[
      {
        cat: 'Data privacy',
        items: [
          {
            title: 'Standard GDPR definition of "Personal Data"',
            status: 'pass',
          },
          {
            title: 'Information security standards (ISO 27001)',
            status: 'fail',
            msg: 'Missing technical protection measure descriptions.',
          },
          {
            title: 'Breach notification timeline (72 hours)',
            status: 'missing',
          },
        ],
      },
      {
        cat: 'Jurisdiction',
        items: [
          { title: 'Indian Contract Act compliance', status: 'pass' },
          {
            title: 'Enforceable liquidated damages cap',
            status: 'fail',
            msg: 'Amount exceeds $100k internal threshold.',
          },
        ],
      },
    ]
      .map(
        (sect) => `
            <p class="section-label">${sect.cat}</p>
            <div class="card card-flush mb-16">
              ${sect.items
            .map(
              (item, i, arr) => `
                <div class="p-16 ${i < arr.length - 1 ? 'border-b' : ''}">
                  <div class="flex justify-between items-center">
                    <span class="fs-13 fw-500 text-primary">${item.title}</span>
                    <lex-badge variant="${item.status === 'pass' ? 'success' : item.status === 'fail' ? 'danger' : 'warning'}">
                      ${item.status === 'pass' ? 'Passed' : item.status === 'fail' ? 'Violation' : 'Missing'}
                    </lex-badge>
                  </div>
                  ${item.msg ? `<p class="meta-text mt-8 ${item.status === 'fail' ? 'text-danger' : 'text-secondary'}">${item.msg}</p>` : ''}
                </div>
              `,
            )
            .join('')}
            </div>
          `,
      )
      .join('')}
        </div>
      </div>

      <div>
        <p class="section-label">Audit log</p>
        <div class="card mb-16 p-12">
          <div class="timeline">
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="meta-text">Check run by LAWLENS</div>
              <div class="fs-12 text-primary">Today, 2:15 PM</div>
            </div>
            <div class="tl-item">
              <div class="tl-dot"></div>
              <div class="meta-text">Internal policy updated</div>
              <div class="fs-12 text-primary">15 Jan 2025</div>
            </div>
          </div>
        </div>

        <button class="btn-primary btn-full mb-12" id="run-compliance-check-btn">Run re-check</button>
        <button class="btn-full" id="generate-compliance-report-btn">Generate compliance report ↗</button>
      </div>
    </div>
  `;


  container
    .querySelector('#run-compliance-check-btn')
    ?.addEventListener('click', () => {
      window.showToast('Compliance re-check queued in the UI preview.');
    });

  container
    .querySelector('#generate-compliance-report-btn')
    ?.addEventListener('click', () => {
      window.navigateTo('export');
    });
}
