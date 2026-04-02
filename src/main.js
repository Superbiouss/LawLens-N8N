import './index.css';

// Page modules
import { renderUpload } from './pages/upload.js';
import { renderChat } from './pages/chat.js';
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
import { initIcons } from './lib/icons.js';

// Global UI Components
import './components/ui/lex-badge.js';

const routes = {
  dashboard: {
    title: 'Dashboard',
    render: renderDashboard,
    breadcrumb: ['Dashboard'],
  },
  chat: {
    title: 'Normal Chat',
    render: renderChat,
    breadcrumb: ['Normal Chat'],
  },
  analytics: {
    title: 'Portfolio analytics',
    render: renderAnalytics,
    breadcrumb: ['Intelligence', 'Portfolio analytics'],
  },
  compliance: {
    title: 'Compliance checklist',
    render: renderCompliance,
    breadcrumb: ['Intelligence', 'Compliance checklist'],
  },
  upload: {
    title: 'Upload & analyze',
    render: renderUpload,
    breadcrumb: ['Upload & analyze'],
  },
  summary: {
    title: 'Summary',
    render: renderSummary,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Summary'],
  },
  'clause-breakdown': {
    title: 'Clause breakdown',
    render: renderClauseBreakdown,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Clause breakdown'],
  },
  'risk-report': {
    title: 'Risk report',
    render: renderRiskReport,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Risk report'],
  },
  compare: {
    title: 'Compare versions',
    render: renderCompare,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Compare versions'],
  },
  ask: {
    title: 'Ask the doc',
    render: renderAsk,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Ask the doc'],
  },
  vault: {
    title: 'Document vault',
    render: renderVault,
    breadcrumb: ['Document vault'],
  },
  'clause-library': {
    title: 'Clause library',
    render: renderClauseLibrary,
    breadcrumb: ['Drafting', 'Clause library'],
  },
  drafting: {
    title: 'Drafting assistant',
    render: renderDrafting,
    breadcrumb: ['Drafting', 'Drafting assistant'],
  },
  templates: {
    title: 'Template library',
    render: renderTemplates,
    breadcrumb: ['Template library'],
  },
  glossary: {
    title: 'Legal glossary',
    render: renderGlossary,
    breadcrumb: ['Legal glossary'],
  },
  annotations: {
    title: 'Annotation studio',
    render: renderAnnotations,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Annotation studio'],
  },
  team: {
    title: 'Team workspace',
    render: renderTeam,
    breadcrumb: ['Team workspace'],
  },
  'key-dates': {
    title: 'Key dates timeline',
    render: renderKeyDates,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Key dates'],
  },
  export: {
    title: 'Export & share',
    render: renderExport,
    breadcrumb: ['Vault', 'Acme Corp NDA v3.pdf', 'Export & share'],
  },
  settings: {
    title: 'Settings',
    render: renderSettings,
    breadcrumb: ['Settings'],
  },
};

function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = saved;
  updateThemeToggleUI(saved);
}

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Restore mini state
  const isMini = localStorage.getItem('sidebar-mini') === 'true';
  if (isMini) sidebar.classList.add('mini');

  // Restore section states
  const collapsedGroups = JSON.parse(
    localStorage.getItem('sidebar-collapsed-groups') || '[]'
  );
  collapsedGroups.forEach((groupName) => {
    const group = document.querySelector(`.sidebar-group[data-group="${groupName}"]`);
    if (group) group.classList.add('collapsed');
  });

  // Default collapse some groups if first time
  if (!localStorage.getItem('sidebar-collapsed-groups')) {
    const autoCollapse = ['collaborate', 'intelligence', 'drafting', 'system'];
    autoCollapse.forEach((groupName) => {
      const group = document.querySelector(`.sidebar-group[data-group="${groupName}"]`);
      if (group) {
        group.classList.add('collapsed');
        collapsedGroups.push(groupName);
      }
    });
    localStorage.setItem('sidebar-collapsed-groups', JSON.stringify(collapsedGroups));
  }
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
  const icon = btn.querySelector('i');
  if (theme === 'dark') {
    span.textContent = 'Light mode';
    icon.setAttribute('data-lucide', 'sun');
  } else {
    span.textContent = 'Dark mode';
    icon.setAttribute('data-lucide', 'moon');
  }
  initIcons();
}

function getPage() {
  const hash = window.location.hash.slice(2) || 'dashboard';
  return hash;
}

function updateBreadcrumb(crumbs) {
  const el = document.getElementById('breadcrumb');
  el.innerHTML = crumbs
    .map((c, i) => {
      const isLast = i === crumbs.length - 1;
      if (isLast) return `<span class="current">${c}</span>`;
      return `<span>${c}</span><span>›</span>`;
    })
    .join('');
}

function updateNav(page) {
  document.querySelectorAll('.nav-item').forEach((item) => {
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

  document.title = `${route.title} — LAWLENS`;
  updateBreadcrumb(route.breadcrumb);
  updateNav(page);

  const content = document.getElementById('page-content');

  // Trigger fade-in transition
  content.classList.remove('page-transition');
  void content.offsetWidth; // Force reflow
  content.classList.add('page-transition');

  content.innerHTML = '';
  route.render(content);
  initIcons();
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
        <i data-lucide="check-circle-2"></i>
        <span>${message}</span>
    `;

  container.appendChild(toast);
  initIcons();

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

  const logoutBtn = e.target.closest('#logout-btn');
  if (logoutBtn) {
    window.location.href = '../index.html';
    return;
  }

  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('mobile-menu-toggle');

  const miniToggle = e.target.closest('#sidebar-mini-toggle');
  if (miniToggle && sidebar) {
    sidebar.classList.toggle('mini');
    localStorage.setItem('sidebar-mini', sidebar.classList.contains('mini'));
    return;
  }

  const sectionLabel = e.target.closest('.sidebar-section-label');
  if (sectionLabel) {
    const group = sectionLabel.closest('.sidebar-group');
    if (group) {
      group.classList.toggle('collapsed');
      const groupName = group.dataset.group;
      const collapsedGroups = JSON.parse(
        localStorage.getItem('sidebar-collapsed-groups') || '[]'
      );

      if (group.classList.contains('collapsed')) {
        if (!collapsedGroups.includes(groupName)) collapsedGroups.push(groupName);
      } else {
        const index = collapsedGroups.indexOf(groupName);
        if (index > -1) collapsedGroups.splice(index, 1);
      }
      localStorage.setItem('sidebar-collapsed-groups', JSON.stringify(collapsedGroups));
    }
    return;
  }

  if (toggle && toggle.contains(e.target)) {
    sidebar.classList.toggle('open');
  } else if (
    sidebar &&
    !sidebar.contains(e.target) &&
    sidebar.classList.contains('open')
  ) {
    sidebar.classList.remove('open');
  }
});

initTheme();
initSidebar();
initIcons();

// Tab Indicator Update
window.updateTabIndicator = function (tabsContainer) {
  if (!tabsContainer) return;

  let indicator =
    tabsContainer.querySelector('.tab-indicator') ||
    tabsContainer.querySelector('.seg-indicator');

  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = tabsContainer.classList.contains('nav-tabs')
      ? 'tab-indicator'
      : 'seg-indicator';
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
