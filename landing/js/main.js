/**
 * LexAI Landing Page — Main Script
 * Handles: theme management, mobile nav, waitlist form, reveal animations.
 * No external dependencies.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────
     * 1. THEME MANAGEMENT
     * Persists preference in localStorage.
     * Syncs with the main app's 'data-theme' attribute.
     * ───────────────────────────────────────────── */
    const THEME_KEY = 'lex-theme';

    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }

    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (_) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (_) { /* private mode — ignore */ }
    }

    // Initialize theme on page load
    const savedTheme = getSavedTheme() || getSystemTheme();
    applyTheme(savedTheme);

    // Wire up toggle button
    function initThemeToggle() {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        btn.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            saveTheme(next);
        });
    }

    /* ─────────────────────────────────────────────
     * 2. MOBILE NAVIGATION
     * ───────────────────────────────────────────── */
    function initMobileNav() {
        const openBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('mobile-nav-close');
        const overlay = document.getElementById('mobile-nav');
        if (!openBtn || !overlay) return;

        const links = overlay.querySelectorAll('.mobile-nav-link');

        function open() {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            closeBtn && closeBtn.focus();
        }

        function close() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        openBtn.addEventListener('click', open);
        closeBtn && closeBtn.addEventListener('click', close);
        links.forEach(function (link) {
            link.addEventListener('click', close);
        });

        // Close on backdrop (outside content)
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) close();
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('open')) {
                close();
            }
        });
    }

    /* ─────────────────────────────────────────────
     * 3. WAITLIST FORM
     * Stores email in localStorage as a mock.
     * Replace fetch() call with Supabase SDK when ready.
     * ───────────────────────────────────────────── */
    function initWaitlistForm() {
        const form = document.getElementById('waitlist-form');
        const wrap = document.getElementById('waitlist-form-wrap');
        const input = document.getElementById('waitlist-email');
        const submitBtn = document.getElementById('waitlist-submit');
        if (!form || !wrap) return;

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = (input.value || '').trim();

            if (!isValidEmail(email)) {
                input.style.borderColor = 'var(--color-text-danger)';
                input.focus();
                return;
            }

            // Reset error state
            input.style.borderColor = '';

            // Optimistic UI — show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Joining…';

            // ── Supabase integration placeholder ──────────────────────
            // Replace this block with:
            //
            // const { error } = await supabase
            //   .from('leads')
            //   .insert({ email, source: 'landing-waitlist', created_at: new Date().toISOString() });
            //
            // ─────────────────────────────────────────────────────────

            // Mock async operation (150 ms)
            setTimeout(function () {
                // Store locally as a fallback / offline record
                try {
                    const leads = JSON.parse(localStorage.getItem('lex-leads') || '[]');
                    if (!leads.includes(email)) {
                        leads.push(email);
                        localStorage.setItem('lex-leads', JSON.stringify(leads));
                    }
                } catch (_) { /* ignore */ }

                // Show success state
                wrap.classList.add('submitted');

                // Dispatch a custom event in case the parent app wants to listen
                document.dispatchEvent(new CustomEvent('lex:waitlist-submit', { detail: { email } }));
            }, 150);
        });

        // Live validation feedback (on blur)
        input.addEventListener('blur', function () {
            if (input.value && !isValidEmail(input.value)) {
                input.style.borderColor = 'var(--color-text-danger)';
            } else {
                input.style.borderColor = '';
            }
        });

        input.addEventListener('input', function () {
            input.style.borderColor = '';
            if (submitBtn.disabled) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Join waitlist';
            }
        });
    }

    /* ─────────────────────────────────────────────
     * 4. SCROLL REVEAL ANIMATIONS
     * Simple IntersectionObserver — adds .visible to .reveal elements.
     * ───────────────────────────────────────────── */
    function initReveal() {
        if (!('IntersectionObserver' in window)) {
            // Degrade gracefully
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ─────────────────────────────────────────────
     * 5. NAVBAR SCROLL SHADOW
     * Adds a subtle shadow to the sticky nav on scroll.
     * ───────────────────────────────────────────── */
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        function onScroll() {
            if (window.scrollY > 8) {
                navbar.style.boxShadow = '0 1px 0 var(--color-border-tertiary), 0 4px 24px rgba(0,0,0,0.06)';
            } else {
                navbar.style.boxShadow = '';
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ─────────────────────────────────────────────
     * 6. SMOOTH ANCHOR SCROLLING
     * Offsets scroll to clear the sticky navbar height (60px).
     * ───────────────────────────────────────────── */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (!target) return;
                e.preventDefault();
                const offset = 72; // navbar height + breathing room
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }

    /* ─────────────────────────────────────────────
     * INIT
     * ───────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initThemeToggle();
        initMobileNav();
        initWaitlistForm();
        initReveal();
        initNavbarScroll();
        initSmoothScroll();
    });

})();
