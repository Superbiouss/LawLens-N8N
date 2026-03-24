const TERMS = [
  {
    letter: 'L',
    name: 'Liquidated Damages',
    body: 'A specific amount of money designated in a contract to be paid by one party to the other in the event of a breach. The amount is agreed upon at the time of contract signing and is intended to represent a fair estimate of actual damages, rather than a penalty.',
    note: 'Found in Clause 3 of Acme Corp NDA v3.pdf ($500,000).',
  },
  {
    letter: 'L',
    name: 'Limitation of Liability',
    body: 'A clause in a contract that limits the amount one party has to pay to the other party if there is a legal dispute or breach. This is often capped at the total professional fees paid or a specific dollar amount.',
    note: 'This clause is missing from your current NDA draft. It is considered a critical protection.',
  },
  {
    letter: 'L',
    name: 'License',
    body: `A permission granted by one party to another to use intellectual property or perform an action that would otherwise be prohibited. In NDAs, clauses often expressly state that "no license is granted" to ensure that sharing information doesn't imply ownership transfer.`,
  },
];

export function renderGlossary(container) {
  const state = {
    query: '',
    activeLetter: 'L',
  };

  const render = () => {
    const visibleTerms = TERMS.filter(term =>
      term.letter === state.activeLetter
      && `${term.name} ${term.body}`.toLowerCase().includes(state.query.toLowerCase()),
    );

    container.innerHTML = `
      <div class="flex justify-between items-center mb-24">
        <div>
          <h1 class="page-title">Legal glossary</h1>
          <p class="body-text mt-4">Plain-English definitions for complex legal terminology used in your documents.</p>
        </div>
        <div class="flex gap-8">
          <input type="text" id="glossary-search-input" placeholder="Search terms..." class="glossary-search-input" value="${state.query}" />
          <button class="btn-primary" id="glossary-search-btn">Search</button>
        </div>
      </div>

      <div class="glossary-layout">
        <div class="glossary-rail">
          ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `
            <button type="button" class="reset-btn meta-text text-center glossary-char ${letter === state.activeLetter ? 'active glossary-char-active' : ''}" data-glossary-letter="${letter}">
              ${letter}
            </button>
          `).join('')}
        </div>

        <div class="flex flex-col gap-32">
          <div id="sect-${state.activeLetter}">
            <p class="section-label mb-16">${state.activeLetter}</p>
            <div class="flex flex-col gap-24">
              ${visibleTerms.length > 0 ? visibleTerms.map(term => `
                <div>
                  <h3 class="glossary-term-title">${term.name}</h3>
                  <div class="card glossary-term-card">
                    <p class="definition-text">${term.body}</p>
                    ${term.note ? `
                      <div class="card-surface mt-16">
                        <span class="micro-label mb-4">${term.name === 'Liquidated Damages' ? 'In your documents' : 'Note'}</span>
                        <p class="meta-text">${term.note}</p>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('') : '<div class="card"><p class="meta-text">No glossary terms match this search yet.</p></div>'}
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#glossary-search-input')?.addEventListener('input', event => {
      state.query = event.target.value;
      render();
    });

    container.querySelector('#glossary-search-btn')?.addEventListener('click', () => {
      window.showToast(state.query ? `Filtered glossary for "${state.query}"` : 'Showing all terms for this letter.');
    });

    container.querySelectorAll('[data-glossary-letter]').forEach(button => {
      button.addEventListener('click', () => {
        state.activeLetter = button.dataset.glossaryLetter;
        render();
      });
    });
  };

  render();
}
