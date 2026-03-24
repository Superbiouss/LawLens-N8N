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
            <div title="John Doe (You)" class="draft-avatar draft-avatar-user">JD</div>
            <div title="LexAI (AI Assistant)" class="draft-avatar draft-avatar-ai">AI</div>
            <div title="Sarah (Legal Review)" class="draft-avatar draft-avatar-review">S</div>
         </div>
         <button class="btn-primary" onclick="showToast('Document saved to vault')">Save Draft</button>
      </div>
    </div>

    <div class="layout-2col layout-2col-wide">
      <div class="card p-0 draft-editor-shell">
         <!-- Toolbar -->
         <div class="draft-toolbar">
            <select class="draft-select">
               <option>Heading 1</option>
               <option>Heading 2</option>
               <option selected>Body Text</option>
            </select>
            <div class="draft-toolbar-divider"></div>
            <button class="btn-sm draft-icon-btn"><b>B</b></button>
            <button class="btn-sm draft-icon-btn"><i>I</i></button>
            <button class="btn-sm draft-icon-btn"><u>U</u></button>
            <div class="draft-toolbar-divider"></div>
            <button class="btn-sm draft-icon-btn">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
         </div>

         <!-- Editor Area -->
         <div class="draft-editor-area" contenteditable="true">
            <h2 class="draft-title">MUTUAL NON-DISCLOSURE AGREEMENT</h2>
            <p>This NON-DISCLOSURE AGREEMENT (the "Agreement") is entered into as of January 24, 2026 (the "Effective Date"), by and between Acme Corp and [COUNTERPARTY NAME].</p>
            <p class="mt-20">1. <u>Purpose</u>. The parties wish to explore a business opportunity of mutual interest and in connection with this opportunity, may disclose certain proprietary and confidential information.</p>
            <p class="draft-highlight">2. <u>Confidentiality</u>. The Receiving Party shall maintain the Confidential Information in strict confidence and shall not disclose it to any third party for a period of five (5) years from the date of disclosure.</p>
            <p class="mt-20">3. <u>Exclusions</u>. The obligations in Section 2 shall not apply to information that: (a) is or becomes publicly known through no fault of the Receiving Party...</p>
         </div>
      </div>

      <div>
         <div class="card draft-sticky">
            <div class="flex items-center gap-8 mb-16">
               <div class="draft-dot"></div>
               <h3 class="section-label m-0">AI Assistant</h3>
            </div>
            
            <div class="flex flex-col gap-12">
               <div class="card-surface p-12 draft-risk-card">
                  <p class="draft-risk-title">Risk Detected</p>
                  <p class="draft-risk-sub">Section 2 specifies a 5-year tail. Standard for this industry is 2 years.</p>
                  <button class="btn-sm w-full btn-brand-solid" onclick="showToast('Applying clause improvement')">Fix to Standard (2 Year)</button>
               </div>

               <div class="pt-12 border-top-tertiary">
                  <p class="meta-text mb-8">Suggest alternative for Section 2:</p>
                  <div class="flex flex-col gap-8">
                     <div class="card-surface p-10 cursor-pointer hover-bg-secondary fs-11">
                        "The obligations shall survive termination but not exceed two (2) years."
                     </div>
                     <div class="card-surface p-10 cursor-pointer hover-bg-secondary fs-11">
                        "Standard NDA exclusion for public knowledge and prior disclosure."
                     </div>
                  </div>
               </div>
               
               <div class="mt-12">
                  <button class="btn-sm w-full btn-between-tertiary">
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
