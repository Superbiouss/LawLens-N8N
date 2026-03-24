export function renderGlossary(container) {
    container.innerHTML = `
    <div class="flex justify-between items-center mb-24">
      <div>
        <h1 class="page-title">Legal glossary</h1>
        <p class="body-text mt-4">Plain-English definitions for complex legal terminology used in your documents.</p>
      </div>
      <div class="flex gap-8">
        <input type="text" placeholder="Search terms..." style="width:260px;" />
        <button class="btn-primary">Search</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:60px 1fr;gap:24px;">
      <!-- Alphabetical Nav -->
      <div style="display:flex;flex-direction:column;gap:4px;position:sticky;top:80px;height:fit-content;">
        ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => `
          <div class="meta-text text-center glossary-char ${char === 'L' ? 'active' : ''}" style="padding:4px;cursor:pointer;border-radius:4px;${char === 'L' ? 'background:var(--color-background-purple);color:var(--color-brand-purple);font-weight:600;' : ''}">
            ${char}
          </div>
        `).join('')}
      </div>

      <!-- Definitions -->
      <div class="flex flex-col gap-32">
        <div id="sect-L">
          <p class="section-label mb-16">L</p>
          <div class="flex flex-col gap-24">
            
            <div>
              <h3 style="font-size:16px;font-weight:500;color:var(--color-text-primary);margin-bottom:8px;">Liquidated Damages</h3>
              <div class="card" style="padding:20px;">
                <p class="definition-text">A specific amount of money designated in a contract to be paid by one party to the other in the event of a breach. The amount is agreed upon at the time of contract signing and is intended to represent a fair estimate of actual damages, rather than a penalty.</p>
                <div class="card-surface mt-16">
                  <span class="micro-label mb-4">In your documents</span>
                  <p class="meta-text">Found in <strong>Clause 3</strong> of <code>Acme Corp NDA v3.pdf</code> ($500,000).</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style="font-size:16px;font-weight:500;color:var(--color-text-primary);margin-bottom:8px;">Limitation of Liability</h3>
              <div class="card" style="padding:20px;">
                <p class="definition-text">A clause in a contract that limits the amount one party has to pay to the other party if there is a legal dispute or breach. This is often capped at the total professional fees paid or a specific dollar amount.</p>
                <div class="card-surface mt-16">
                  <span class="micro-label mb-4">Note</span>
                  <p class="meta-text">This clause is <strong>missing</strong> from your current NDA draft. It is considered a critical protection.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 style="font-size:16px;font-weight:500;color:var(--color-text-primary);margin-bottom:8px;">License</h3>
              <div class="card" style="padding:20px;">
                <p class="definition-text">A permission granted by one party to another to use intellectual property or perform an action that would otherwise be prohibited. In NDAs, clauses often expressly state that "no license is granted" to ensure that sharing information doesn't imply ownership transfer.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;
}
