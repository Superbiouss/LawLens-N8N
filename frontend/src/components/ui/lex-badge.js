/**
 * LexBadge — A reusable UI component for status indicators and labels.
 * Usage: <lex-badge variant="info">New</lex-badge>
 */
class LexBadge extends HTMLElement {
    static get observedAttributes() {
        return ['variant'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const variant = this.getAttribute('variant') || 'neutral';
        // Use Light DOM to leverage global index.css badge styles
        this.className = `badge badge-${variant}`;
    }
}

if (!customElements.get('lex-badge')) {
    customElements.define('lex-badge', LexBadge);
}
