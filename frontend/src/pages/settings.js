import {
  canUseN8nAgent,
  clearN8nAgentConfig,
  getN8nAgentConfig,
  humanizeN8nAgentError,
  saveN8nAgentConfig,
  testN8nAgentConnection,
  validateN8nAgentConfig,
} from '../services/n8n-agent.js';
import { copyText, escapeHtml } from './shared/ui-actions.js';
import { supabase } from '../lib/supabase.js';

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
  const prefetchedTab = sessionStorage.getItem('settings_tab_prefill');

  if (prefetchedTab) {
    const selectedTab = Array.from(tabs).find(
      (tab) => tab.dataset.tab === prefetchedTab,
    );
    if (selectedTab) {
      tabs.forEach((tab) => tab.classList.remove('active'));
      selectedTab.classList.add('active');
      content.innerHTML = renderTab(prefetchedTab);
      sessionStorage.removeItem('settings_tab_prefill');
    }
  }

  // Init Tab Indicator
  setTimeout(() => {
    if (window.updateTabIndicator) {
      window.updateTabIndicator(container.querySelector('#settings-tabs'));
    }
  }, 0);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (window.updateTabIndicator)
        window.updateTabIndicator(tab.parentElement);

      const page = tab.dataset.tab;
      content.innerHTML = renderTab(page);
      bindSettingsContent(container, page);
    });
  });

  const activePage =
    container.querySelector('#settings-tabs .seg-tab.active')?.dataset.tab ||
    'profile';
  bindSettingsContent(container, activePage);
  bindSettingsSidebar(container);
}

function renderTab(page) {
  if (page === 'profile') return renderProfile();
  if (page === 'integrations') return renderIntegrations();
  if (page === 'api') return renderAPI();
  if (page === 'billing') return renderBilling();
  if (page === 'security') return renderSecurity();
  return renderProfile();
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
          <button class="btn-primary settings-fit-btn" id="settings-save-profile-btn">Save changes</button>
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
            <button type="button" class="reset-btn toggle on" id="settings-ai-suggestions-toggle" aria-pressed="true"></button>
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
      {
        name: 'Google Drive',
        desc: 'Sync files directly to your vault.',
        status: 'Connected',
        icon: '#4285F4',
      },
      {
        name: 'Dropbox',
        desc: 'Automatic backup of analyzed reports.',
        status: 'Connect',
        icon: '#0061FF',
      },
      {
        name: 'Slack',
        desc: 'Get alerts when a document risk is detected.',
        status: 'Connect',
        icon: '#4A154B',
      },
      {
        name: 'OneDrive',
        desc: 'Import clauses from corporate storage.',
        status: 'Connect',
        icon: '#00A1F1',
      },
    ]
      .map(
        (i) => `
          <div class="flex items-center justify-between p-12 card-surface">
            <div class="flex items-center gap-12">
              <div style="width:28px;height:28px;background:${i.icon};border-radius:6px;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:14px;font-weight:bold;">${i.name[0]}</div>
              <div>
                <p class="fs-13 fw-500">${i.name}</p>
                <p class="meta-text">${i.desc}</p>
              </div>
            </div>
            <button class="btn-sm ${i.status === 'Connected' ? 'border-transparent' : ''}" data-integration-name="${i.name}" data-integration-status="${i.status}">
                ${i.status}
            </button>
          </div>
        `,
      )
      .join('')}
      </div>
    </div>
    `;
}

function renderAPI() {
  const agent = getN8nAgentConfig();

  return `
    <div class="flex flex-col gap-16">
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
              <button class="btn-sm" id="settings-copy-api-key-btn">Copy</button>
           </div>
        </div>

        <button class="btn-sm border-primary" id="settings-generate-api-key-btn">+ Generate new secret key</button>
      </div>

      <div class="card">
        <div class="flex justify-between items-center mb-16">
          <div>
            <h3 class="section-label mb-4">Backend Orchestration (n8n)</h3>
            <p class="meta-text m-0">Your workspace is connected to the secure orchestration layer.</p>
          </div>
          <span class="badge badge-success">Connected</span>
        </div>

        <div class="flex flex-col gap-16">
          <div class="flex justify-between items-center pt-12 border-top-tertiary">
            <div>
               <p class="fs-13 fw-500">System Health</p>
               <p class="meta-text">The connection to the Supabase Edge Function is established.</p>
            </div>
            <button class="btn-sm" id="test-n8n-connection-btn">Test Connection</button>
          </div>

          <div class="flex justify-between items-center pt-12 border-top-tertiary">
            <div>
              <p class="fs-13 fw-500">Enable webhook routing</p>
              <p class="meta-text">When enabled, chat experiences send messages to the orchestrator.</p>
            </div>
            <button type="button" class="reset-btn toggle ${agent.enabled ? 'on' : ''}" id="n8n-enabled-toggle" aria-pressed="${agent.enabled}"></button>
          </div>

          <div class="flex justify-between items-center pt-12 border-top-tertiary">
            <div>
              <p class="fs-13 fw-500">Include document context</p>
              <p class="meta-text">Sends route and document metadata along with the user message.</p>
            </div>
            <button type="button" class="reset-btn toggle ${agent.includeDocumentContext ? 'on' : ''}" id="n8n-context-toggle" aria-pressed="${agent.includeDocumentContext}"></button>
          </div>

          <div class="card-surface p-12">
            <p class="micro-label mb-8">Payload Preview</p>
            <div class="code-block n8n-payload-preview">{
  "message": "Summarize the obligations",
  "history": [{ "role": "user", "content": "..." }],
  "context": { "route": "ask", "documentName": "Acme Corp NDA v3.pdf" },
  "conversationId": "lawlens-...",
  "source": "lawlens-web"
}</div>
          </div>
        </div>
      </div>
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
         <button class="btn-sm" id="settings-edit-billing-btn">Edit</button>
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
            <button type="button" class="reset-btn toggle off" id="settings-2fa-toggle" aria-pressed="false"></button>
          </div>
          <div class="flex justify-between items-center pt-12 border-top-tertiary">
            <div>
              <p class="fs-13 fw-500">SSO Integration</p>
              <p class="meta-text">Allow login via SAML or Okta.</p>
            </div>
            <button class="btn-sm" id="settings-sso-configure-btn">Configure</button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="section-label mb-16">Password Management</h3>
        <div class="flex flex-col gap-12">
           <input type="password" placeholder="Current password" />
           <input type="password" placeholder="New password" />
           <button class="btn-primary settings-fit-btn" id="settings-update-password-btn">Update password</button>
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
       <button class="btn-sm mt-16 w-full settings-upgrade-btn" id="settings-upgrade-plan-btn">Upgrade plan</button>
    </div>

    <div class="card">
       <p class="section-label">Support</p>
       <div class="flex flex-col gap-8">
          <button class="btn-sm w-full justify-start" data-support-action="documentation">Documentation</button>
          <button class="btn-sm w-full justify-start" data-support-action="help">Help Center</button>
          <button class="btn-sm w-full justify-start" id="settings-logout-btn" style="color: var(--color-text-danger);">Sign out</button>
          <button class="btn-sm w-full justify-start text-danger" data-support-action="delete">Delete Account</button>
       </div>
    </div>
    `;
}

function bindSettingsContent(container, page) {
  if (page === 'profile') {
    container
      .querySelector('#settings-save-profile-btn')
      ?.addEventListener('click', () => {
        window.showToast('Profile updated');
      });

    container
      .querySelector('#settings-ai-suggestions-toggle')
      ?.addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('on');
        event.currentTarget.setAttribute(
          'aria-pressed',
          String(event.currentTarget.classList.contains('on')),
        );
        window.showToast('AI suggestions preference updated');
      });
  }

  if (page === 'integrations') {
    container.querySelectorAll('[data-integration-name]').forEach((button) => {
      button.addEventListener('click', () => {
        const isConnected = button.dataset.integrationStatus === 'Connected';
        button.dataset.integrationStatus = isConnected
          ? 'Connect'
          : 'Connected';
        button.textContent = isConnected ? 'Connect' : 'Connected';
        button.classList.toggle('border-transparent', !isConnected);
        window.showToast(
          `${button.dataset.integrationName} ${isConnected ? 'disconnected' : 'connected'}`,
        );
      });
    });
  }

  if (page === 'api') {
    container
      .querySelector('#settings-copy-api-key-btn')
      ?.addEventListener('click', () => {
        copyText('sk_live_51Px2_demo_preview', 'Key copied');
      });

    container
      .querySelector('#settings-generate-api-key-btn')
      ?.addEventListener('click', () => {
        window.showToast('Key generation would require backend support.');
      });

    bindN8nAgentSettings(container);
  }

  if (page === 'billing') {
    container
      .querySelector('#settings-edit-billing-btn')
      ?.addEventListener('click', () => {
        window.showToast('Billing editor would open here.');
      });
  }

  if (page === 'security') {
    container
      .querySelector('#settings-2fa-toggle')
      ?.addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('on');
        event.currentTarget.setAttribute(
          'aria-pressed',
          String(event.currentTarget.classList.contains('on')),
        );
        window.showToast('2FA updated');
      });

    container
      .querySelector('#settings-sso-configure-btn')
      ?.addEventListener('click', () => {
        window.showToast('SSO setup needs backend configuration.');
      });

    container
      .querySelector('#settings-update-password-btn')
      ?.addEventListener('click', () => {
        window.showToast('Password change submitted in preview mode.');
      });
  }
}

function bindN8nAgentSettings(container) {
  const enabledToggle = container.querySelector('#n8n-enabled-toggle');
  const contextToggle = container.querySelector('#n8n-context-toggle');

  const readConfig = () => ({
    // Inherit URL and Token from env config/defaults. We only toggle settings here now.
    webhookUrl: getN8nAgentConfig().webhookUrl || '',
    authToken: getN8nAgentConfig().authToken || '',
    enabled: enabledToggle?.classList.contains('on') || false,
    includeDocumentContext: contextToggle?.classList.contains('on') || false,
  });

  [enabledToggle, contextToggle].forEach((toggle) => {
    toggle?.addEventListener('click', () => {
      toggle.classList.toggle('on');
      toggle.setAttribute(
        'aria-pressed',
        String(toggle.classList.contains('on')),
      );

      // Auto-save toggle preferences
      const next = readConfig();
      saveN8nAgentConfig(next);
      window.showToast('Orchestrator preferences saved.');
    });
  });

  container
    .querySelector('#test-n8n-connection-btn')
    ?.addEventListener('click', async () => {
      window.showToast('Testing orchestrator connection...');

      try {
        const result = await testN8nAgentConnection();
        window.showToast(
          result.reply
            ? 'Orchestrator responded successfully.'
            : 'Orchestrator responded, but without text.',
        );
      } catch (error) {
        window.showToast(`Test failed: ${humanizeN8nAgentError(error)}`);
      }
    });
}

function bindSettingsSidebar(container) {
  container
    .querySelector('#settings-logout-btn')
    ?.addEventListener('click', async () => {
      if (supabase) {
        await supabase.auth.signOut();
      }
      window.location.href = '../index.html';
    });

  container
    .querySelector('#settings-upgrade-plan-btn')
    ?.addEventListener('click', () => {
      window.showToast('Plan upgrade would continue in billing.');
    });

  container.querySelectorAll('[data-support-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.supportAction;
      if (action === 'documentation')
        window.showToast('Documentation would open in a new tab.');
      else if (action === 'help')
        window.showToast('Help Center would open in a new tab.');
      else window.showToast('Account deletion requires backend confirmation.');
    });
  });
}
