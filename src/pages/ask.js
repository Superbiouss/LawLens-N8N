export function renderAsk(container) {
    container.innerHTML = `
    <div style="background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);margin:-24px -24px 0;">
      <div class="nav-tabs" style="border-bottom:none;">
        <div class="nav-tab" onclick="navigateTo('summary')">Summary</div>
        <div class="nav-tab" onclick="navigateTo('clause-breakdown')">Clause breakdown</div>
        <div class="nav-tab" onclick="navigateTo('risk-report')">Risk report</div>
        <div class="nav-tab" onclick="navigateTo('key-dates')">Key dates</div>
        <div class="nav-tab active">Ask the doc</div>
      </div>
    </div>

    <!-- 2 column layout: Chat on left, context on right -->
    <div style="display:grid;grid-template-columns:1fr 280px;height:calc(100vh - var(--topbar-height) - 44px);margin:0 -24px -24px;">
      
      <!-- Left sidebar: Chat Area -->
      <div style="display:flex;flex-direction:column;background:var(--color-background-primary);border-right:0.5px solid var(--color-border-tertiary);">
        <div style="flex:1;overflow-y:auto;padding:32px 40px;display:flex;flex-direction:column;gap:24px;">
          
          <div class="chat-msg">
            <div class="chat-avatar ai">L</div>
            <div class="chat-bubble">
              <p>Hi. I've analyzed the <strong>Acme Corp Non-Disclosure Agreement v3</strong>. What would you like to know about it?</p>
              <div class="flex gap-8 flex-wrap mt-12">
                <span class="badge badge-neutral" style="cursor:pointer;background:var(--color-background-primary);">Summarize the obligations</span>
                <span class="badge badge-neutral" style="cursor:pointer;background:var(--color-background-primary);">What are the red flags?</span>
                <span class="badge badge-neutral" style="cursor:pointer;background:var(--color-background-primary);">Can I assign this?</span>
              </div>
            </div>
          </div>

          <div class="chat-msg">
            <div class="chat-avatar user" style="background:var(--color-border-secondary);">JD</div>
            <div class="chat-bubble">
              <p style="color:var(--color-text-primary);">Is the $500K damages clause enforceable in India?</p>
            </div>
          </div>

          <div class="chat-msg">
            <div class="chat-avatar ai">L</div>
            <div class="chat-bubble">
              <p>Under Indian law (specifically Section 74 of the Indian Contract Act, 1872), courts generally do not enforce liquidated damages clauses as a "penalty." Instead, they only award reasonable compensation up to the maximum amount stipulated (in this case $500,000) based on the <em>actual</em> loss suffered <span class="citation-badge" title="View Clause 3">Clause 3</span>.</p>
              <p>Because this clause sets a fixed, high penalty without requiring Acme Corp to prove actual harm, an Indian court is likely to view it as a penalty and require Acme to prove actual damages before awarding compensation.</p>
              <p>However, you would still face the burden and cost of litigation to contest it if Acme Corp brought a suit.</p>
              
              <div class="disclaimer-callout mt-16">
                <strong>Disclaimer:</strong> This analysis is AI-generated and does not constitute legal advice. Jurisdictional enforceability can depend on specific case facts. Consult a qualified Indian legal professional before taking action.
              </div>
            </div>
          </div>

        </div>

        <!-- Chat Input -->
        <div class="ask-bar" style="border-top:0.5px solid var(--color-border-tertiary);padding:16px 24px;">
          <input type="text" placeholder="Ask anything about the Acme Corp NDA..." style="height:44px;border-radius:22px;padding:0 20px;box-shadow:0 2px 4px rgba(0,0,0,0.02);" />
          <button class="btn-primary" style="border-radius:22px;padding:0 20px;">Send ↗</button>
        </div>
      </div>

      <!-- Right sidebar: Document Context -->
      <div style="background:var(--color-background-tertiary);padding:20px;overflow-y:auto;">
        <p class="section-label">Document Context</p>
        
        <div class="card mb-16" style="padding:12px;">
          <div class="flex items-center gap-8 mb-8">
            <div style="width:24px;height:24px;border-radius:4px;background:var(--color-background-danger);display:flex;align-items:center;justify-content:center;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </div>
            <div style="font-size:13px;font-weight:500;">Acme Corp NDA v3.pdf</div>
          </div>
          <div class="meta-text mb-4">6 pages · 11 clauses</div>
          <div class="badge badge-danger">High risk</div>
        </div>

        <p class="section-label">Referenced Clauses</p>
        <div class="card-surface mb-16" style="cursor:pointer;transition:border-color .15s;border:1px solid transparent;" onmouseover="this.style.borderColor='var(--color-border-info)'" onmouseout="this.style.borderColor='transparent'">
          <div class="flex justify-between items-center mb-4">
            <span style="font-size:12px;font-weight:500;color:var(--color-text-info);">Clause 3</span>
            <span class="badge badge-danger" style="font-size:9px;padding:1px 6px;">Critical</span>
          </div>
          <p class="meta-text" style="font-size:11px;margin:0;line-height:1.4;">Liquidated Damages: $500,000 per incident regardless of actual harm...</p>
        </div>

        <p class="section-label">History</p>
        <div class="flex flex-col gap-4">
          <div class="meta-text" style="padding:4px 0;cursor:pointer;">Can I assign this?</div>
          <div class="meta-text" style="padding:4px 0;cursor:pointer;">What are the red flags?</div>
        </div>
      </div>
    </div>
  `;
}
