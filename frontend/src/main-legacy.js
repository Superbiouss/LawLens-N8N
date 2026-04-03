/**
 * LAWLENS Landing Page — Main Script
 * Handles: theme management, mobile nav, waitlist form, reveal animations.
 * No external dependencies.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────────
     * 1. THEME MANAGEMENT
     * Hardcoded to 'dark' for the Linear aesthetic.
     * ───────────────────────────────────────────── */
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    applyTheme();

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
     * 7. BENTO GRID GLOW EFFECT
     * Tracks mouse to illuminate feature cards
     * ───────────────────────────────────────────── */
    function initBentoGlow() {
        const grid = document.querySelector('.features-grid');
        if (!grid) return;
        
        grid.addEventListener('mousemove', function(e) {
            for (const card of document.querySelectorAll('.feature-card')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
            }
        });
    }

    /* ─────────────────────────────────────────────
     * 7. INTERACTIVE AUDIT ANIMATION
     * Sequenced "Aha!" moment for product preview.
     * ───────────────────────────────────────────── */
    function initAuditAnimation() {
        const section = document.querySelector('.product-preview');
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAuditSequence();
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(section);

        function startAuditSequence() {
            const lens = document.getElementById('audit-lens');
            const h1 = document.getElementById('highlight-1');
            const v1 = document.getElementById('verdict-1');
            const h2 = document.getElementById('highlight-2');
            const v2 = document.getElementById('verdict-2');
            const scoreBadge = document.getElementById('risk-score-badge');
            const scoreValue = document.getElementById('risk-score-value');

            // 1. Start Lens Sweep
            setTimeout(() => lens.classList.add('animating'), 500);

            // 2. High Risk Clause Spot (T+1200ms)
            setTimeout(() => {
                h1.classList.add('active');
                v1.classList.add('active');
                scoreBadge.classList.add('pop');
                animateScore(0, 4.2, 800);
            }, 1200);

            // 3. Second Clause Spot (T+2200ms)
            setTimeout(() => {
                h2.classList.add('active');
                v2.classList.add('active');
                animateScore(4.2, 8.4, 800);
            }, 2200);
            
            // 4. Final Pop (T+3000ms)
            setTimeout(() => {
                scoreBadge.classList.add('pop');
                setTimeout(() => scoreBadge.classList.remove('pop'), 400);
            }, 3000);
        }

        function animateScore(start, end, duration) {
            const startTime = performance.now();
            
            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = start + (end - start) * progress;
                const el = document.getElementById('risk-score-value');
                if (el) el.textContent = current.toFixed(1);
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        }
    }

    /* ─────────────────────────────────────────────
     * 8. COMMAND-K TYPING HINT
     * Cycling animation for search capability.
     * ───────────────────────────────────────────── */
    function initCommandKHint() {
        const textEl = document.getElementById('typing-text');
        if (!textEl) return;

        const queries = [
            "Find liability caps in this MSA...",
            "Check governing law for Vendor B...",
            "Spot auto-renewal clauses...",
            "Does this have a non-compete?",
            "Summarize termination rights..."
        ];

        let queryIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentQuery = queries[queryIndex];
            
            if (isDeleting) {
                textEl.textContent = currentQuery.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                textEl.textContent = currentQuery.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentQuery.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                queryIndex = (queryIndex + 1) % queries.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    /* ─────────────────────────────────────────────
     * INIT
     * ───────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initMobileNav();
        initWaitlistForm();
        initReveal();
        initNavbarScroll();
        initSmoothScroll();
        initBentoGlow();
        initAuditAnimation();
        initCommandKHint();
    });

})();
