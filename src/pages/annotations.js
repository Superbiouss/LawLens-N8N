export function renderAnnotations(container) {
    container.innerHTML = `
    <div style="background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);margin:-24px -24px 0;">
      <div class="nav-tabs" style="border-bottom:none;">
        <div class="nav-tab" onclick="navigateTo('summary')">Summary</div>
        <div class="nav-tab" onclick="navigateTo('clause-breakdown')">Clause breakdown</div>
        <div class="nav-tab active">Annotation studio</div>
        <div class="nav-tab" onclick="navigateTo('team')">Team activities</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 340px;height:calc(100vh - var(--topbar-height) - 44px);margin:0 -24px -24px;">
      
      <!-- Doc Viewer -->
      <div style="background:var(--color-background-tertiary);overflow-y:auto;padding:40px;display:flex;justify-content:center;">
        <div class="card" style="max-width:800px;width:100%;min-height:1000px;padding:60px 80px;box-shadow:var(--shadow-soft);">
          <h2 style="font-size:18px;font-weight:500;margin-bottom:40px;text-align:center;text-transform:uppercase;letter-spacing:0.1em;">NON-DISCLOSURE AGREEMENT</h2>
          <p style="font-size:12px;margin-bottom:20px;line-height:1.6;">This NON-DISCLOSURE AGREEMENT (the "Agreement") is entered into as of January 1, 2025, by and between Acme Corp ("Discloser") and John Doe ("Recipient").</p>
          
          <p class="fs-13 fw-500 mb-12">1. DEFINITION OF CONFIDENTIAL INFORMATION</p>
          <p style="font-size:12px;margin-bottom:20px;line-height:1.7;">"Confidential Information" shall mean all information disclosed by Discloser to Recipient which is in written, graphic, machine readable or other tangible form and is marked as "Confidential" or "Proprietary".</p>

          <p class="fs-13 fw-500 mb-12">2. OBLIGATIONS OF RECEIVING PARTY</p>
          <p style="font-size:12px;margin-bottom:20px;line-height:1.7;">Recipient agrees that at all times and notwithstanding any termination or expiration of this Agreement, Recipient will hold in strict confidence and <span style="background:var(--color-highlight-warning);border-bottom:1.5px solid var(--color-coral-400);cursor:help;" title="Clicked annotation">not disclose to any third party Confidential Information</span>, except as approved in writing by Discloser. Recipient will also use Confidential Information for no purpose other than the Evaluation Purpose.</p>

          <p class="fs-13 fw-500 mb-12">3. LIQUIDATED DAMAGES</p>
          <p style="font-size:12px;margin-bottom:20px;line-height:1.7;">In the event of any breach of the confidentiality obligations hereunder, the parties agree that the harm to Discloser would be difficult to quantify and Recipient shall pay as liquidated damages <span style="background:var(--color-highlight-danger);border-bottom:1.5px solid var(--color-red-400);">the sum of $500,000 per violation</span>.</p>
        </div>
      </div>

      <!-- Annotation Panel -->
      <div style="background:var(--color-background-primary);border-left:0.5px solid var(--color-border-tertiary);display:flex;flex-direction:column;">
        <div style="padding:16px;border-bottom:0.5px solid var(--color-border-tertiary);display:flex;justify-content:space-between;items-center;">
          <h3 class="section-label m-0">Annotations (3)</h3>
          <div class="flex gap-4">
            <button class="btn-sm">New</button>
            <button class="btn-sm">Resolve</button>
          </div>
        </div>

        <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;">
          
          <!-- Comment Card -->
          <div class="card" style="padding:12px;border-color:var(--color-border-danger);background:var(--color-background-info);">
            <div class="flex items-center gap-8 mb-8">
              <div class="chat-avatar user" style="width:20px;height:20px;">JD</div>
              <span class="fs-12 fw-500">John Doe</span>
              <span class="meta-text fs-10">10:42 AM</span>
            </div>
            <p class="fs-12 text-primary lh-15">This damages clause is a dealbreaker. We need to cap this at 1x the contract value or actual harm.</p>
            <div style="margin-top:10px;padding-top:10px;border-top:0.5px solid var(--color-border-tertiary);">
              <div class="flex items-center gap-8">
                <div class="chat-avatar user" style="width:20px;height:20px;background:var(--color-brand-purple);color:#FFFFFF;">AS</div>
                <span class="fs-12 fw-500">Anand S.</span>
                <span class="meta-text fs-10">Just now</span>
              </div>
              <p class="fs-12 text-secondary" style="margin-top:4px;">Agreed. I'll draft the redline for this.</p>
            </div>
          </div>

          <!-- Highlight Entry -->
          <div class="card" style="padding:12px;">
            <div class="flex items-center gap-8 mb-8">
              <div class="severity-dot review"></div>
              <span class="fs-11 fw-500 text-warning" style="text-transform:uppercase;">Clause 2 · Highlight</span>
            </div>
            <p class="fs-12 text-secondary" style="line-height:1.4;">"not disclose to any third party Confidential Information"</p>
            <button class="btn-sm mt-8 w-full" style="border-style:dashed;">+ Add comment</button>
          </div>

        </div>

        <!-- Input -->
        <div style="padding:16px;border-top:0.5px solid var(--color-border-tertiary);">
          <textarea placeholder="Write a comment..." style="height:60px;"></textarea>
          <div class="flex justify-between items-center mt-8">
            <span class="meta-text">Press Ctrl+Enter to post</span>
            <button class="btn-sm btn-primary">Post</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
