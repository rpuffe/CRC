// Small progressive enhancements shared by every page. The site reads fine
// without any of this; it only adds motion and a few conveniences.
(function() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.querySelector('.site-header');
    const progress = document.querySelector('.scroll-progress');

    // Header shadow + reading progress bar
    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 8);
        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Count a number up from zero (used by hero stats and the visitor counter)
    function countUp(el, target, opts) {
        const prefix = (opts && opts.prefix) || '';
        const suffix = (opts && opts.suffix) || '';
        if (reduceMotion) {
            el.textContent = prefix + target.toLocaleString() + suffix;
            return;
        }
        const duration = (opts && opts.duration) || 1200;
        const start = performance.now();
        function frame(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }
    window.siteCountUp = countUp;

    // Reveal blocks as they scroll into view
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion) {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                entry.target.addEventListener('transitionend', () => {
                    entry.target.classList.add('revealed');
                }, { once: true });
                entry.target.querySelectorAll('[data-count]').forEach((num) => {
                    countUp(num, Number(num.dataset.count), { suffix: num.dataset.suffix });
                });
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach((el) => revealObserver.observe(el));
    }

    // Highlight the nav link for the section on screen
    const navLinks = Array.from(document.querySelectorAll('.header-nav a[href^="#"]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    if (sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((section) => navObserver.observe(section));
    }

    // Soft spotlight that follows the pointer across cards
    if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.spotlight').forEach((card) => {
            card.addEventListener('pointermove', (event) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
            });
        });
    }

    // Copy-to-clipboard buttons
    document.querySelectorAll('[data-copy]').forEach((button) => {
        button.addEventListener('click', async () => {
            const label = button.querySelector('.copy-label');
            try {
                await navigator.clipboard.writeText(button.dataset.copy);
                if (label) label.textContent = 'copied';
            } catch (error) {
                if (label) label.textContent = 'copy failed';
            }
            button.classList.add('copied');
            setTimeout(() => {
                button.classList.remove('copied');
                if (label) label.textContent = 'copy';
            }, 1800);
        });
    });

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
