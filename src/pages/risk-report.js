export function renderRiskReport(container) {
    container.innerHTML = `
    <div style="background:var(--color-background-primary);border-bottom:0.5px solid var(--color-border-tertiary);margin:-24px -24px 24px;">
      <div class="nav-tabs" style="border-bottom:none;">
        <div class="nav-tab" onclick="navigateTo('summary')">Summary</div>
        <div class="nav-tab" onclick="navigateTo('clause-breakdown')">Clause breakdown</div>
        <div class="nav-tab active">Risk report</div>
        <div class="nav-tab" onclick="navigateTo('key-dates')">Key dates</div>
        <div class="nav-tab" onclick="navigateTo('ask')">Ask the doc</div>
      </div>
    </div>

    <div class="layout-2col">
      <div>
        <div class="card-accent-left mb-16" style="border-left-color:var(--color-red-400);display:flex;padding:0;">
          <div style="padding:16px 20px;border-right:0.5px solid var(--color-border-tertiary);display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:100px;">
            <div style="font-size:32px;font-weight:500;color:var(--color-text-danger);line-height:1;">7.2</div>
            <div class="meta-text mt-4">/ 10</div>
            <div class="badge badge-danger mt-8" style="background:transparent;padding:0;">High risk</div>
          </div>
          <div style="padding:16px 20px;flex:1;">
            <p class="section-heading mb-8">This document carries significant risk for the Receiving Party</p>
            <p class="body-text mb-12">3 critical issues, 2 items needing review, and 4 standard protections are missing. The terms are heavily weighted in Acme Corp's favour. Do not sign without negotiation.</p>
            <div class="progress-track mb-4"><div class="progress-bar" style="width:72%;background:var(--color-red-400);"></div></div>
            <div class="flex justify-between meta-text" style="font-size:10px;"><span>Low</span><span>Medium</span><span>High</span></div>
          </div>
        </div>

        <div class="stats-row mb-16">
          <div class="stat-card">
            <div class="stat-number danger">3</div>
            <div class="stat-label">Critical flags</div>
          </div>
          <div class="stat-card">
            <div class="stat-number warning">2</div>
            <div class="stat-label">Review items</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Missing clauses</div>
          </div>
          <div class="stat-card">
            <div class="stat-number success">3</div>
            <div class="stat-label">Clear clauses</div>
          </div>
        </div>

        <div class="flex justify-between items-center mb-16">
          <h2 class="section-label" style="margin:0;">Issues found</h2>
          <div class="flex gap-6 flex-wrap">
            <div class="pill active">All (9)</div>
            <div class="pill" style="color:var(--color-text-danger);border-color:var(--color-border-danger);">Critical (3)</div>
            <div class="pill" style="color:var(--color-text-warning);border-color:var(--color-border-warning);">Review (2)</div>
            <div class="pill">Missing (4)</div>
          </div>
        </div>

        <div class="flag-card critical">
          <div class="flag-head">
            <div class="severity-dot critical"></div>
            <span class="flag-title">Unlimited confidentiality term</span>
            <span class="meta-text" style="font-size:10px;margin-left:auto;margin-right:6px;">Clause 1</span>
            <span class="badge badge-danger">Critical</span>
          </div>
          <div class="flag-body">
            <p class="body-text mb-12">The NDA imposes confidentiality obligations with no end date. Unlike standard NDAs which expire after 2–5 years, this binds you permanently — even if the partnership never materialises or ends years from now.</p>
            <div class="flex items-start gap-8 mb-12">
              <span class="micro-label" style="padding-top:2px;">Impact</span>
              <span style="font-size:12px;color:var(--color-text-danger);line-height:1.5;">Perpetual legal exposure with no exit mechanism, even after the business relationship ends.</span>
            </div>
            <div class="card-surface mt-8 mb-12">
              <div class="micro-label mb-4">Suggested fix</div>
              <div class="body-text" style="font-size:12px;">Replace "unlimited period of time" with "a period of 3 years from the date of disclosure." This is industry standard and rarely contested.</div>
            </div>
            <div class="flex gap-8">
              <button class="btn-sm" onclick="navigateTo('clause-breakdown')">View clause ↗</button>
              <button class="btn-sm" onclick="navigateTo('annotations')">Add note ↗</button>
            </div>
          </div>
        </div>

        <div class="flag-card critical">
          <div class="flag-head">
            <div class="severity-dot critical"></div>
            <span class="flag-title">$500,000 liquidated damages — no harm required</span>
            <span class="meta-text" style="font-size:10px;margin-left:auto;margin-right:6px;">Clause 3</span>
            <span class="badge badge-danger">Critical</span>
          </div>
          <div class="flag-body">
            <p class="body-text mb-12">The penalty clause sets a fixed $500,000 per-breach fee regardless of what harm, if any, Acme Corp actually suffers. In practice, a single accidental disclosure — even a forwarded email — could trigger this clause.</p>
            <div class="flex items-start gap-8 mb-12">
              <span class="micro-label" style="padding-top:2px;">Impact</span>
              <span style="font-size:12px;color:var(--color-text-danger);line-height:1.5;">Disproportionate financial liability uncoupled from actual damages. Courts in some jurisdictions may invalidate it, but you'd still face litigation costs.</span>
            </div>
            <div class="card-surface mt-8 mb-12">
              <div class="micro-label mb-4">Suggested fix</div>
              <div class="body-text" style="font-size:12px;">Push to remove the liquidated damages clause entirely, or cap it at actual documented losses. Add a gross negligence/wilful misconduct threshold before it triggers.</div>
            </div>
            <div class="flex gap-8">
              <button class="btn-sm" onclick="navigateTo('clause-breakdown')">View clause ↗</button>
              <button class="btn-sm" onclick="navigateTo('annotations')">Add note ↗</button>
            </div>
          </div>
        </div>

        <div class="flag-card critical">
          <div class="flag-head">
            <div class="severity-dot critical"></div>
            <span class="flag-title">Unilateral assignment — no consent required</span>
            <span class="meta-text" style="font-size:10px;margin-left:auto;margin-right:6px;">Clause 4</span>
            <span class="badge badge-danger">Critical</span>
          </div>
          <div class="flag-body">
            <p class="body-text mb-12">Acme Corp can transfer this agreement to any successor entity — including a competitor — without notifying or obtaining consent from you. Your obligations follow regardless of who now holds the other side of the contract.</p>
            <div class="flex items-start gap-8 mb-12">
              <span class="micro-label" style="padding-top:2px;">Impact</span>
              <span style="font-size:12px;color:var(--color-text-danger);line-height:1.5;">You could end up contractually bound to an unknown third party you never agreed to deal with.</span>
            </div>
            <div class="card-surface mt-8 mb-12">
              <div class="micro-label mb-4">Suggested fix</div>
              <div class="body-text" style="font-size:12px;">Add "…provided that the Receiving Party's prior written consent is obtained, not to be unreasonably withheld." Both parties should have equal assignment rights.</div>
            </div>
            <div class="flex gap-8">
              <button class="btn-sm" onclick="navigateTo('clause-breakdown')">View clause ↗</button>
              <button class="btn-sm" onclick="navigateTo('annotations')">Add note ↗</button>
            </div>
          </div>
        </div>

        <div class="flag-card review">
          <div class="flag-head">
            <div class="severity-dot review"></div>
            <span class="flag-title">Exclusive jurisdiction in Delaware</span>
            <span class="meta-text" style="font-size:10px;margin-left:auto;margin-right:6px;">Clause 5</span>
            <span class="badge badge-warning">Review</span>
          </div>
          <div class="flag-body">
            <p class="body-text mb-12">All disputes must be litigated exclusively in Delaware courts. If you are based outside the US, this creates a significant logistical and financial burden to defend any claim.</p>
            <div class="card-surface mt-8 mb-12">
              <div class="micro-label mb-4">Suggested fix</div>
              <div class="body-text" style="font-size:12px;">Propose mutual jurisdiction in the defendant's home country, or ICC arbitration as a neutral alternative.</div>
            </div>
          </div>
        </div>

        <p class="section-label mt-24">Missing standard clauses</p>
        <div class="flag-card missing">
          <div class="flag-head" style="padding:10px 14px;border-bottom:none;">
            <div class="severity-dot missing"></div>
            <span class="flag-title">No return or destruction of materials clause</span>
            <span class="badge badge-neutral">Missing</span>
          </div>
          <div class="flag-body" style="padding:0 14px 14px;">
            <p class="body-text" style="margin:0;">Without this, there is no mechanism to formally end the exchange of confidential materials. Standard NDAs require the Receiving Party to return or certifiably destroy all copies on request or at termination.</p>
          </div>
        </div>
        <div class="flag-card missing">
          <div class="flag-head" style="padding:10px 14px;border-bottom:none;">
            <div class="severity-dot missing"></div>
            <span class="flag-title">No residual knowledge carve-out</span>
            <span class="badge badge-neutral">Missing</span>
          </div>
        </div>
        <div class="flag-card missing">
          <div class="flag-head" style="padding:10px 14px;border-bottom:none;">
            <div class="severity-dot missing"></div>
            <span class="flag-title">No mutual limitation of liability</span>
            <span class="badge badge-neutral">Missing</span>
          </div>
        </div>
      </div>

      <div>
        <p class="section-label">Verdict</p>
        <div class="card-surface mb-12" style="background:var(--color-background-secondary);">
          <div class="meta-text mb-4">Should you sign as-is?</div>
          <div style="font-size:13px;font-weight:500;color:var(--color-text-danger);">No — negotiate first</div>
        </div>
        <div class="card-surface mb-12" style="background:var(--color-background-secondary);">
          <div class="meta-text mb-4">Negotiation priority</div>
          <div style="font-size:13px;font-weight:500;color:var(--color-text-warning);">3 clauses to fix</div>
        </div>
        <div class="card-surface mb-24" style="background:var(--color-background-secondary);">
          <div class="meta-text mb-4">Overall balance</div>
          <div style="font-size:13px;font-weight:500;color:var(--color-text-danger);">Favours Acme Corp</div>
        </div>

        <p class="section-label">Clause balance</p>
        <div class="flex gap-4 items-end mb-24" style="height:110px;">
          <div class="card-surface flex-1 text-center flex flex-col justify-end" style="height:100%;">
            <div style="font-size:12px;font-weight:500;margin-bottom:auto;">Acme Corp</div>
            <div style="height:52px;background:var(--color-text-danger);border-radius:3px 3px 0 0;width:32px;margin:10px auto 0;"></div>
            <div style="font-size:11px;font-weight:500;color:var(--color-text-danger);margin-top:8px;">8 favourable</div>
          </div>
          <div class="meta-text" style="padding-bottom:24px;">vs</div>
          <div class="card-surface flex-1 text-center flex flex-col justify-end" style="height:100%;">
            <div style="font-size:12px;font-weight:500;margin-bottom:auto;">John Doe</div>
            <div style="height:17px;background:var(--color-border-secondary);border-radius:3px 3px 0 0;width:32px;margin:10px auto 0;"></div>
            <div style="font-size:11px;font-weight:500;color:var(--color-text-tertiary);margin-top:8px;">3 favourable</div>
          </div>
        </div>

        <p class="section-label">Risk dimensions</p>
        <div class="flex flex-col gap-8 mb-24">
          ${[
            { label: 'Financial', score: 9, color: 'danger', pct: 90 },
            { label: 'Term & exit', score: 8, color: 'danger', pct: 80 },
            { label: 'Jurisdiction', score: 6, color: 'warning', pct: 60 },
            { label: 'Scope / purpose', score: 6, color: 'warning', pct: 60 },
            { label: 'Assignment', score: 8, color: 'danger', pct: 80 },
            { label: 'Boilerplate', score: 2, color: 'success', pct: 20 }
        ].map(d => `
            <div class="flex items-center gap-8">
              <span class="meta-text" style="width:100px;">${d.label}</span>
              <div class="progress-track" style="flex:1;height:5px;"><div class="progress-bar" style="width:${d.pct}%;background:var(--color-text-${d.color});"></div></div>
              <span style="font-size:11px;font-weight:500;width:24px;text-align:right;color:var(--color-text-${d.color});">${d.score}</span>
            </div>
          `).join('')}
        </div>

        <p class="section-label">Compare with similar docs</p>
        <div class="card-surface mb-24">
          <div class="flex justify-between mb-8">
            <span class="meta-text">Avg. NDA risk score</span>
            <span style="font-size:12px;font-weight:500;color:var(--color-text-primary);">4.1 / 10</span>
          </div>
          <div class="flex justify-between mb-8">
            <span class="meta-text">This document</span>
            <span style="font-size:12px;font-weight:500;color:var(--color-text-danger);">7.2 / 10</span>
          </div>
          <div class="flex justify-between">
            <span class="meta-text">Riskier than</span>
            <span style="font-size:12px;font-weight:500;color:var(--color-text-danger);">89% of NDAs</span>
          </div>
        </div>

        <div class="flex flex-col gap-8">
          <button class="btn-full" onclick="navigateTo('compare')">Compare with another version ↗</button>
          <button class="btn-full">Download risk report PDF ↗</button>
        </div>
      </div>
    </div>
  `;
}
