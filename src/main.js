import './index.css';

// Page modules
import { renderUpload } from './pages/upload.js';
import { renderSummary } from './pages/summary.js';
import { renderClauseBreakdown } from './pages/clause-breakdown.js';
import { renderRiskReport } from './pages/risk-report.js';
import { renderCompare } from './pages/compare.js';
import { renderAsk } from './pages/ask.js';
import { renderVault } from './pages/vault.js';
import { renderTemplates } from './pages/templates.js';
import { renderGlossary } from './pages/glossary.js';
import { renderAnnotations } from './pages/annotations.js';
import { renderTeam } from './pages/team.js';
import { renderCompliance } from './pages/compliance.js';
import { renderKeyDates } from './pages/key-dates.js';
import { renderExport } from './pages/export.js';
import { renderSettings } from './pages/settings.js';

const routes = {
    'upload': { title: 'Upload & analyze', render: renderUpload, breadcrumb: ['Upload & analyze'] },
    'summary': { title: 'Summary', render: renderSummary, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Summary'] },
    'clause-breakdown': { title: 'Clause breakdown', render: renderClauseBreakdown, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Clause breakdown'] },
    'risk-report': { title: 'Risk report', render: renderRiskReport, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Risk report'] },
    'compare': { title: 'Compare versions', render: renderCompare, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Compare versions'] },
    'ask': { title: 'Ask the doc', render: renderAsk, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Ask the doc'] },
    'vault': { title: 'Document vault', render: renderVault, breadcrumb: ['Document vault'] },
    'templates': { title: 'Template library', render: renderTemplates, breadcrumb: ['Template library'] },
    'glossary': { title: 'Legal glossary', render: renderGlossary, breadcrumb: ['Legal glossary'] },
    'annotations': { title: 'Annotation studio', render: renderAnnotations, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Annotation studio'] },
    'team': { title: 'Team workspace', render: renderTeam, breadcrumb: ['Team workspace'] },
    'compliance': { title: 'Compliance checklist', render: renderCompliance, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Compliance checklist'] },
    'key-dates': { title: 'Key dates timeline', render: renderKeyDates, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Key dates'] },
    'export': { title: 'Export & share', render: renderExport, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Export & share'] },
    'settings': { title: 'Settings', render: renderSettings, breadcrumb: ['Settings'] },
};

function getPage() {
    const hash = window.location.hash.slice(2) || 'upload';
    return hash;
}

function updateBreadcrumb(crumbs) {
    const el = document.getElementById('breadcrumb');
    el.innerHTML = crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        if (isLast) return `<span class="current">${c}</span>`;
        return `<span>${c}</span><span>›</span>`;
    }).join('');
}

function updateNav(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

function navigate() {
    const page = getPage();
    const route = routes[page];
    if (!route) {
        window.location.hash = '#/upload';
        return;
    }

    document.title = `${route.title} — LexAI`;
    updateBreadcrumb(route.breadcrumb);
    updateNav(page);

    const content = document.getElementById('page-content');
    content.innerHTML = '';
    route.render(content);
}

// Navigation helper for use by pages
window.navigateTo = function (page) {
    window.location.hash = `#/${page}`;
};

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
