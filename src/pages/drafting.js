export function renderDrafting(container) {
   container.innerHTML = `
    <div class="mb-24 flex justify-between items-center">
      <div>
        <h1 class="page-title">Drafting Assistant</h1>
        <p class="body-text mt-4">AI-powered legal creation and redlining studio.</p>
      </div>
      <div class="flex items-center gap-12">
         <!-- Collaboration Dots (UX Polish) -->
         <div class="flex -space-x-8">
            <div title="John Doe (You)" style="width:24px;height:24px;border-radius:50%;background:#EF4444;border:2px solid var(--color-background-primary);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold;z-index:3;">JD</div>
            <div title="LexAI (AI Assistant)" style="width:24px;height:24px;border-radius:50%;background:var(--color-brand-purple);border:2px solid var(--color-background-primary);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold;z-index:2;">AI</div>
            <div title="Sarah (Legal Review)" style="width:24px;height:24px;border-radius:50%;background:#10B981;border:2px solid var(--color-background-primary);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:bold;z-index:1;">S</div>
         </div>
         <button class="btn-primary" onclick="showToast('Document saved to vault')">Save Draft</button>
      </div>
    </div>

    <div class="layout-2col" style="grid-template-columns: 1fr 340px;">
      <div class="card p-0" style="min-height:600px;display:flex;flex-direction:column;overflow:hidden;">
         <!-- Toolbar -->
         <div style="padding:8px 16px;border-bottom:0.5px solid var(--color-border-tertiary);background:var(--color-background-secondary);display:flex;gap:12px;align-items:center;">
            <select style="width:120px;font-size:11px;padding:4px 8px;">
               <option>Heading 1</option>
               <option>Heading 2</option>
               <option selected>Body Text</option>
            </select>
            <div style="height:16px;width:0.5px;background:var(--color-border-tertiary);"></div>
            <button class="btn-sm" style="width:32px;height:32px;padding:0;background:transparent;border:none;"><b>B</b></button>
            <button class="btn-sm" style="width:32px;height:32px;padding:0;background:transparent;border:none;"><i>I</i></button>
            <button class="btn-sm" style="width:32px;height:32px;padding:0;background:transparent;border:none;"><u>U</u></button>
            <div style="height:16px;width:0.5px;background:var(--color-border-tertiary);"></div>
            <button class="btn-sm" style="width:32px;height:32px;padding:0;background:transparent;border:none;">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
         </div>

         <!-- Editor Area -->
         <div style="flex:1;padding:40px 60px;font-family:var(--font-serif);font-size:15px;line-height:1.7;color:var(--color-text-primary);outline:none;overflow-y:auto;" contenteditable="true">
            <h2 style="margin-bottom:20px;font-family:var(--font-sans);font-weight:600;">MUTUAL NON-DISCLOSURE AGREEMENT</h2>
            <p>This NON-DISCLOSURE AGREEMENT (the "Agreement") is entered into as of January 24, 2026 (the "Effective Date"), by and between Acme Corp and [COUNTERPARTY NAME].</p>
            <p style="margin-top:20px;">1. <u>Purpose</u>. The parties wish to explore a business opportunity of mutual interest and in connection with this opportunity, may disclose certain proprietary and confidential information.</p>
            <p style="margin-top:20px;background:rgba(83, 74, 183, 0.08);border-left:3px solid var(--color-brand-purple);padding:12px;">2. <u>Confidentiality</u>. The Receiving Party shall maintain the Confidential Information in strict confidence and shall not disclose it to any third party for a period of five (5) years from the date of disclosure.</p>
            <p style="margin-top:20px;">3. <u>Exclusions</u>. The obligations in Section 2 shall not apply to information that: (a) is or becomes publicly known through no fault of the Receiving Party...</p>
         </div>
      </div>

      <div>
         <div class="card" style="position:sticky;top:24px;">
            <div class="flex items-center gap-8 mb-16">
               <div style="width:6px;height:6px;border-radius:50%;background:var(--color-brand-purple);"></div>
               <h3 class="section-label" style="margin-bottom:0;">AI Assistant</h3>
            </div>
            
            <div class="flex flex-col gap-12">
               <div class="card-surface p-12" style="background:var(--color-background-purple);border-color:var(--color-brand-purple-400);">
                  <p style="font-size:12px;font-weight:600;color:var(--color-brand-purple);margin-bottom:4px;">Risk Detected</p>
                  <p style="font-size:12px;opacity:0.8;margin-bottom:12px;">Section 2 specifies a 5-year tail. Standard for this industry is 2 years.</p>
                  <button class="btn-sm w-full" style="background:var(--color-brand-purple);color:white;border:none;" onclick="showToast('Applying clause improvement')">Fix to Standard (2 Year)</button>
               </div>

               <div style="padding-top:12px;border-top:0.5px solid var(--color-border-tertiary);">
                  <p class="meta-text mb-8">Suggest alternative for Section 2:</p>
                  <div class="flex flex-col gap-8">
                     <div class="card-surface p-10 cursor-pointer" style="font-size:11px;" onmouseover="this.style.background='var(--color-background-secondary)'" onmouseout="this.style.background=''">
                        "The obligations shall survive termination but not exceed two (2) years."
                     </div>
                     <div class="card-surface p-10 cursor-pointer" style="font-size:11px;" onmouseover="this.style.background='var(--color-background-secondary)'" onmouseout="this.style.background=''">
                        "Standard NDA exclusion for public knowledge and prior disclosure."
                     </div>
                  </div>
               </div>
               
               <div class="mt-12">
                  <button class="btn-sm w-full" style="justify-content:space-between;border-color:var(--color-border-tertiary);">
                     <span>Ask LexAI to draft...</span>
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
    `;
}
