export function renderSettings(container) {
  container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Settings</h1>
      <p class="body-text mt-4">Manage your account, preferences, and integrations.</p>
    </div>

    <div class="layout-2col">
      <div>
        <div class="seg-tabs mb-24" id="settings-tabs">
          <div class="seg-tab active" data-tab="profile">Profile</div>
          <div class="seg-tab" data-tab="integrations">Integrations</div>
          <div class="seg-tab" data-tab="api">API Keys</div>
          <div class="seg-tab" data-tab="billing">Billing</div>
          <div class="seg-tab" data-tab="security">Security</div>
        </div>

        <div id="settings-content">
          ${renderProfile()}
        </div>
      </div>

      <div id="settings-sidebar">
        ${renderSideInfo()}
      </div>
    </div>
    `;

  // Tab switching
  const tabs = container.querySelectorAll('#settings-tabs .seg-tab');
  const content = container.querySelector('#settings-content');

  // Init Tab Indicator
  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('#settings-tabs'));
    }
  }, 0);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (window.updateTabIndicator) window.updateTabIndicator(tab.parentElement);

      const page = tab.dataset.tab;
      if (page === 'profile') content.innerHTML = renderProfile();
      else if (page === 'integrations') content.innerHTML = renderIntegrations();
      else if (page === 'api') content.innerHTML = renderAPI();
      else if (page === 'billing') content.innerHTML = renderBilling();
      else if (page === 'security') content.innerHTML = renderSecurity();
    });
  });
}

function renderProfile() {
  return `
    <div class="flex flex-col gap-24">
      <div class="card">
        <h3 class="section-label mb-16">Profile Information</h3>
        <div class="flex flex-col gap-16">
          <div class="flex gap-12">
            <div class="flex-1">
              <label class="meta-text mb-4 block">First Name</label>
              <input type="text" value="John" />
            </div>
            <div class="flex-1">
              <label class="meta-text mb-4 block">Last Name</label>
              <input type="text" value="Doe" />
            </div>
          </div>
          <div>
            <label class="meta-text mb-4 block">Email Address</label>
            <input type="email" value="john@startup.com" />
          </div>
          <button class="btn-primary" style="width:fit-content;" onclick="showToast('Profile updated')">Save changes</button>
        </div>
      </div>

      <div class="card">
        <h3 class="section-label mb-16">Preferences</h3>
        <div class="flex flex-col gap-12">
          <div class="flex justify-between items-center">
            <div>
              <p class="fs-13 fw-500">Default Analysis Depth</p>
              <p class="meta-text">Choose how detailed the AI analysis should be by default.</p>
            </div>
            <select style="width:140px;">
              <option>Full Analysis</option>
              <option>Quick Scan</option>
            </select>
          </div>
          <div class="flex justify-between items-center pt-12 border-top-tertiary">
            <div>
              <p class="fs-13 fw-500">AI Suggestions</p>
              <p class="meta-text">Enable predictive legal terms and auto-complete in Ask the Doc.</p>
            </div>
            <div class="toggle on"></div>
          </div>
        </div>
      </div>
    </div>
    `;
}

function renderIntegrations() {
  return `
    <div class="card">
      <h3 class="section-label mb-16">Connected Integrations</h3>
      <div class="flex flex-col gap-16">
        ${[
      { name: 'Google Drive', desc: 'Sync files directly to your vault.', status: 'Connected', icon: '#4285F4' },
      { name: 'Dropbox', desc: 'Automatic backup of analyzed reports.', status: 'Connect', icon: '#0061FF' },
      { name: 'Slack', desc: 'Get alerts when a document risk is detected.', status: 'Connect', icon: '#4A154B' },
      { name: 'OneDrive', desc: 'Import clauses from corporate storage.', status: 'Connect', icon: '#00A1F1' }
    ].map(i => `
          <div class="flex items-center justify-between p-12 card-surface">
            <div class="flex items-center gap-12">
              <div style="width:28px;height:28px;background:${i.icon};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:14px;font-weight:bold;">${i.name[0]}</div>
              <div>
                <p class="fs-13 fw-500">${i.name}</p>
                <p class="meta-text">${i.desc}</p>
              </div>
            </div>
            <button class="btn-sm" style="${i.status === 'Connected' ? 'border-color:transparent;' : ''}" onclick="showToast('${i.name} ${i.status === 'Connected' ? 'manage' : 'connecting'}')">
                ${i.status}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
    `;
}

function renderAPI() {
  return `
    <div class="card">
      <h3 class="section-label mb-16">API Access</h3>
      <p class="meta-text mb-16">Use our API to programmatically analyze documents and fetch compliance data.</p>
      
      <div class="card-surface p-12 mb-16">
         <div class="flex justify-between items-center mb-8">
            <span class="fs-12 fw-600">Main Production Key</span>
            <span class="badge badge-success">Active</span>
         </div>
         <div class="flex gap-8">
            <input type="password" value="sk_live_51Px2..." disabled style="flex:1;background:var(--color-background-primary);" />
            <button class="btn-sm" onclick="showToast('Key copied')">Copy</button>
         </div>
      </div>

      <button class="btn-sm" style="border-color:var(--color-border-primary);">+ Generate new secret key</button>
    </div>
    `;
}

function renderBilling() {
  return `
    <div class="card mb-16">
      <h3 class="section-label mb-16">Subscription Details</h3>
      <div class="flex flex-col gap-12">
        <div class="flex justify-between items-center">
            <span class="fs-13">Current Plan</span>
            <span class="badge badge-info">Enterprise</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="fs-13">Billing Cycle</span>
            <span class="meta-text">Monthly (Next: April 12, 2026)</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="fs-13">Member Seats</span>
            <span class="meta-text">8 of 20 used</span>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="section-label mb-16">Payment Method</h3>
      <div class="flex items-center gap-12 card-surface p-12">
         <div style="width:36px;height:24px;background:#1A1F71;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:8px;font-weight:bold;">VISA</div>
         <div class="flex-1">
            <p class="fs-13 fw-500">Visa ending in 4242</p>
            <p class="meta-text">Expires 12/28</p>
         </div>
         <button class="btn-sm" onclick="showToast('Edit card')">Edit</button>
      </div>
    </div>
    `;
}

function renderSecurity() {
  return `
    <div class="flex flex-col gap-16">
      <div class="card">
        <h3 class="section-label mb-16">Security Settings</h3>
        <div class="flex flex-col gap-12">
          <div class="flex justify-between items-center">
            <div>
              <p class="fs-13 fw-500">Two-Factor Authentication</p>
              <p class="meta-text">Secure your account with a secondary verification code.</p>
            </div>
            <div class="toggle off" onclick="this.classList.toggle('on'); showToast('2FA updated');"></div>
          </div>
          <div class="flex justify-between items-center pt-12 border-top-tertiary">
            <div>
              <p class="fs-13 fw-500">SSO Integration</p>
              <p class="meta-text">Allow login via SAML or Okta.</p>
            </div>
            <button class="btn-sm" onclick="showToast('SSO setup')">Configure</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="section-label mb-16">Password Management</h3>
        <div class="flex flex-col gap-12">
           <input type="password" placeholder="Current password" />
           <input type="password" placeholder="New password" />
           <button class="btn-primary" style="width:fit-content;" onclick="showToast('Password changed')">Update password</button>
        </div>
      </div>
    </div>
    `;
}

function renderSideInfo() {
  return `
    <div class="card-surface mb-20" style="background:var(--color-background-purple);">
       <p class="fs-12 fw-600" style="color:var(--color-brand-purple);margin-bottom:8px;">Enterprise Plan</p>
       <p class="fs-24 fw-500 text-primary">$129<span class="text-tertiary" style="font-size:14px;">/mo</span></p>
       <div class="progress-track mt-12 mb-8"><div class="progress-bar" style="width:45%;background:var(--color-brand-purple);"></div></div>
       <p class="meta-text">45 of 100 documents analyzed this month.</p>
       <button class="btn-sm mt-16 w-full" style="background:var(--color-background-primary);border-color:var(--color-brand-purple);color:var(--color-brand-purple);">Upgrade plan</button>
    </div>

    <div class="card">
       <p class="section-label">Support</p>
       <div class="flex flex-col gap-8">
          <button class="btn-sm w-full justify-start">Documentation</button>
          <button class="btn-sm w-full justify-start">Help Center</button>
          <button class="btn-sm w-full justify-start text-danger">Delete Account</button>
       </div>
    </div>
    `;
}
