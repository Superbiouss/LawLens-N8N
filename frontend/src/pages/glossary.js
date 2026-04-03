import { apiClient } from '../lib/api-client.js';

export async function renderGlossary(container) {
  const state = {
    query: '',
    activeLetter: 'A', // Default to A
    terms: [],
    loading: true,
    error: null
  };

  const loadData = async () => {
    try {
      state.terms = await apiClient.intelligence.listGlossary();
      // Find the first letter that actually has terms
      const availableLetters = [...new Set(state.terms.map(t => t.term[0].toUpperCase()))].sort();
      if (availableLetters.length > 0) {
        state.activeLetter = availableLetters[0];
      }
    } catch (err) {
      state.error = err.message;
    } finally {
      state.loading = false;
      render();
    }
  };

  const render = () => {
    if (state.loading) {
      container.innerHTML = `
        <div class="layout-single-column p-40 text-center">
          <svg class="spinner" viewBox="0 0 50 50" style="width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 16px;"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="var(--color-brand-purple)"></circle></svg>
          <p class="body-text">Loading legal glossary...</p>
        </div>
      `;
      return;
    }

    if (state.error) {
       container.innerHTML = `
        <div class="layout-single-column p-40 text-center">
          <p class="body-text text-danger">Failed to load glossary: ${state.error}</p>
          <button class="btn-primary mt-16" onclick="window.location.reload()">Retry</button>
        </div>
      `;
      return;
    }

    const visibleTerms = state.terms.filter(
      (term) =>
        term.term.toUpperCase().startsWith(state.activeLetter) &&
        `${term.term} ${term.definition}`
          .toLowerCase()
          .includes(state.query.toLowerCase()),
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
          ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            .split('')
            .map(
              (letter) => {
                const hasTerms = state.terms.some(t => t.term.toUpperCase().startsWith(letter));
                return `
                  <button type="button" 
                    class="reset-btn meta-text text-center glossary-char ${letter === state.activeLetter ? 'active glossary-char-active' : ''} ${!hasTerms ? 'opacity-30' : ''}" 
                    data-glossary-letter="${letter}"
                    ${!hasTerms ? 'title="No terms for this letter"' : ''}>
                    ${letter}
                  </button>
                `;
              }
            )
            .join('')}
        </div>

        <div class="flex flex-col gap-32">
          <div id="sect-${state.activeLetter}">
            <p class="section-label mb-16">${state.activeLetter}</p>
            <div class="flex flex-col gap-24">
              ${
                visibleTerms.length > 0
                  ? visibleTerms
                      .map(
                        (term) => `
                <div>
                  <h3 class="glossary-term-title">${term.term}</h3>
                  <div class="card glossary-term-card">
                    <p class="definition-text">${term.definition}</p>
                    ${
                      term.context
                        ? `
                      <div class="card-surface mt-16">
                        <span class="micro-label mb-4">India Legal Context</span>
                        <p class="meta-text">${term.context}</p>
                      </div>
                    `
                        : ''
                    }
                  </div>
                </div>
              `,
                      )
                      .join('')
                  : '<div class="card"><p class="meta-text">No glossary terms match this search yet.</p></div>'
              }
            </div>
          </div>
        </div>
      </div>
    `;

    container
      .querySelector('#glossary-search-input')
      ?.addEventListener('input', (event) => {
        state.query = event.target.value;
      });
    
    container
      .querySelector('#glossary-search-btn')
      ?.addEventListener('click', () => {
        state.query = container.querySelector('#glossary-search-input').value;
        render();
      });

    container.querySelectorAll('[data-glossary-letter]').forEach((button) => {
      button.addEventListener('click', () => {
        state.activeLetter = button.dataset.glossaryLetter;
        render();
      });
    });
  };

  await loadData();
}
