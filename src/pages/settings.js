export function renderSettings(container) {
    container.innerHTML = `
    <div class="mb-24">
      <h1 class="page-title">Settings</h1>
      <p class="body-text mt-4">Manage your account, preferences, and integrations.</p>
    </div>

    <div class="layout-2col">
      <div>
        <div class="seg-tabs mb-24">
          <div class="seg-tab active">Profile</div>
          <div class="seg-tab">Integrations</div>
          <div class="seg-tab">API Keys</div>
          <div class="seg-tab">Billing</div>
          <div class="seg-tab">Security</div>
        </div>

        <div class="flex flex-col gap-24">
          
          <div class="card">
            <h3 class="section-label mb-16">Profile Information</h3>
            <div class="flex flex-col gap-16">
              <div class="flex gap-12">
                <div style="flex:1;">
                  <label class="meta-text mb-4 block">First Name</label>
                  <input type="text" value="John" />
                </div>
                <div style="flex:1;">
                  <label class="meta-text mb-4 block">Last Name</label>
                  <input type="text" value="Doe" />
                </div>
              </div>
              <div>
                <label class="meta-text mb-4 block">Email Address</label>
                <input type="email" value="john@startup.com" />
              </div>
              <button class="btn-primary" style="width:fit-content;">Save changes</button>
            </div>
          </div>

          <div class="card">
            <h3 class="section-label mb-16">Preferences</h3>
            <div class="flex flex-col gap-12">
              <div class="flex justify-between items-center">
                <div>
                  <p style="font-size:13px;font-weight:500;">Default Analysis Depth</p>
                  <p class="meta-text">Choose how detailed the AI analysis should be by default.</p>
                </div>
                <select style="width:140px;">
                  <option>Full Analysis</option>
                  <option>Quick Scan</option>
                </select>
              </div>
              <div class="flex justify-between items-center pt-12 border-top:0.5px solid var(--color-border-tertiary);">
                <div>
                  <p style="font-size:13px;font-weight:500;">AI Suggestions</p>
                  <p class="meta-text">Enable predictive legal terms and auto-complete in Ask the Doc.</p>
                </div>
                <div class="toggle on"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div>
        <div class="card-surface mb-24" style="background:var(--color-background-purple);">
           <p style="font-size:12px;font-weight:600;color:var(--color-brand-purple);margin-bottom:8px;">Enterprise Plan</p>
           <p style="font-size:24px;font-weight:500;color:var(--color-text-primary);">$129<span style="font-size:14px;color:var(--color-text-tertiary);">/mo</span></p>
           <div class="progress-track mt-12 mb-8"><div class="progress-bar" style="width:45%;background:var(--color-brand-purple);"></div></div>
           <p class="meta-text">45 of 100 documents analyzed this month.</p>
           <button class="btn-sm mt-16 w-full" style="background:white;border-color:var(--color-brand-purple);color:var(--color-brand-purple);">Upgrade plan</button>
        </div>

        <p class="section-label">Connected Apps</p>
        <div class="flex flex-col gap-8">
          <div class="card-surface flex items-center justify-between p-12">
             <div class="flex items-center gap-8">
                <div style="width:20px;height:20px;background:#E4405F;border-radius:4px;"></div>
                <span style="font-size:12px;">Google Drive</span>
             </div>
             <span class="meta-text">Connected</span>
          </div>
          <div class="card-surface flex items-center justify-between p-12">
             <div class="flex items-center gap-8">
                <div style="width:20px;height:20px;background:#4A154B;border-radius:4px;"></div>
                <span style="font-size:12px;">Slack</span>
             </div>
             <span class="meta-text">Connect</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
