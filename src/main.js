import './index.css';

// Page modules
import { renderUpload } from './pages/upload.js';
import { renderDashboard } from './pages/dashboard.js';
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
import { renderAnalytics } from './pages/analytics.js';
import { renderClauseLibrary } from './pages/clause-library.js';
import { renderDrafting } from './pages/drafting.js';

const routes = {
    'dashboard': { title: 'Dashboard', render: renderDashboard, breadcrumb: ['Dashboard'] },
    'analytics': { title: 'Portfolio analytics', render: renderAnalytics, breadcrumb: ['Intelligence', 'Portfolio analytics'] },
    'compliance': { title: 'Compliance checklist', render: renderCompliance, breadcrumb: ['Intelligence', 'Compliance checklist'] },
    'upload': { title: 'Upload & analyze', render: renderUpload, breadcrumb: ['Upload & analyze'] },
    'summary': { title: 'Summary', render: renderSummary, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Summary'] },
    'clause-breakdown': { title: 'Clause breakdown', render: renderClauseBreakdown, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Clause breakdown'] },
    'risk-report': { title: 'Risk report', render: renderRiskReport, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Risk report'] },
    'compare': { title: 'Compare versions', render: renderCompare, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Compare versions'] },
    'ask': { title: 'Ask the doc', render: renderAsk, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Ask the doc'] },
    'vault': { title: 'Document vault', render: renderVault, breadcrumb: ['Document vault'] },
    'clause-library': { title: 'Clause library', render: renderClauseLibrary, breadcrumb: ['Drafting', 'Clause library'] },
    'drafting': { title: 'Drafting assistant', render: renderDrafting, breadcrumb: ['Drafting', 'Drafting assistant'] },
    'templates': { title: 'Template library', render: renderTemplates, breadcrumb: ['Template library'] },
    'glossary': { title: 'Legal glossary', render: renderGlossary, breadcrumb: ['Legal glossary'] },
    'annotations': { title: 'Annotation studio', render: renderAnnotations, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Annotation studio'] },
    'team': { title: 'Team workspace', render: renderTeam, breadcrumb: ['Team workspace'] },
    'key-dates': { title: 'Key dates timeline', render: renderKeyDates, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Key dates'] },
    'export': { title: 'Export & share', render: renderExport, breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Export & share'] },
    'settings': { title: 'Settings', render: renderSettings, breadcrumb: ['Settings'] },
};

function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = saved;
    updateThemeToggleUI(saved);
}

function toggleTheme() {
    const current = document.body.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    localStorage.setItem('theme', next);
    updateThemeToggleUI(next);
    window.showToast(`Switched to ${next} mode`);
}

function updateThemeToggleUI(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const span = btn.querySelector('span');
    const svg = btn.querySelector('svg');
    if (theme === 'dark') {
        span.textContent = 'Light mode';
        svg.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    } else {
        span.textContent = 'Dark mode';
        svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />';
    }
}

function getPage() {
    const hash = window.location.hash.slice(2) || 'dashboard';
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

    // Trigger fade-in transition
    content.classList.remove('page-transition');
    void content.offsetWidth; // Force reflow
    content.classList.add('page-transition');

    content.innerHTML = '';
    route.render(content);
}

// Navigation helper for use by pages
window.navigateTo = function (page) {
    window.location.hash = `#/${page}`;
};

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

// Toast Notification System
window.showToast = function (message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// Theme Toggle Listener
document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('#theme-toggle');
    if (themeBtn) {
        toggleTheme();
        return;
    }

    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('mobile-menu-toggle');

    if (toggle && toggle.contains(e.target)) {
        sidebar.classList.toggle('open');
    } else if (sidebar && !sidebar.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

initTheme();

// Tab Indicator Update
window.updateTabIndicator = function (tabsContainer) {
    if (!tabsContainer) return;

    let indicator = tabsContainer.querySelector('.tab-indicator') || tabsContainer.querySelector('.seg-indicator');

    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = tabsContainer.classList.contains('nav-tabs') ? 'tab-indicator' : 'seg-indicator';
        tabsContainer.appendChild(indicator);
    }

    const activeTab = tabsContainer.querySelector('.active');
    if (activeTab) {
        indicator.style.left = activeTab.offsetLeft + 'px';
        indicator.style.width = activeTab.offsetWidth + 'px';
    }
};

// Auto-update indicators on window resize
window.addEventListener('resize', () => {
    document.querySelectorAll('.nav-tabs, .seg-tabs').forEach(updateTabIndicator);
});
