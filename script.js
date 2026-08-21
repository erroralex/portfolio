/**
 * Portfolio SPA application logic.
 */

const TAGLINES = [
  'Java Developer based in Umeå',
  'System Development Student',
  'Building the Latent Suite'
];

const TILT_MAX_DEG = 10;

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Each init runs independently: a failure in one (e.g. a selector that
  // doesn't match, an API that throws) must not stop the rest from running,
  // since initScrollReveal is what keeps sections from staying invisible.
  const run = (fn) => {
    try {
      fn();
    } catch (err) {
      console.error(err);
    }
  };

  run(initMobileMenu);
  run(initScrollSpy);
  run(initFooterYear);
  run(initProjectDownloads);

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    const typedText = document.getElementById('typed-text');
    if (typedText) typedText.textContent = TAGLINES[0];
  } else {
    run(initTypedTagline);
    run(initScrollReveal);
    run(initTiltCards);
  }
});

/* ==========================================================================
   Typed tagline
   ========================================================================== */

function initTypedTagline() {
  const target = document.getElementById('typed-text');
  if (!target) return;

  let taglineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const full = TAGLINES[taglineIndex];
    let delay = 55;

    if (!deleting) {
      charIndex += 1;
      if (charIndex >= full.length) {
        deleting = true;
        delay = 1800;
      }
    } else {
      charIndex -= 1;
      delay = 30;
      if (charIndex <= 0) {
        deleting = false;
        taglineIndex = (taglineIndex + 1) % TAGLINES.length;
      }
    }

    target.textContent = full.slice(0, charIndex);
    setTimeout(tick, delay);
  };

  setTimeout(tick, 500);
}

/* ==========================================================================
   Scroll reveal
   ========================================================================== */

function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (targets.length === 0) return;

  if (!('IntersectionObserver' in window)) return;

  // threshold: 0 (not a ratio like 0.15) so reveal fires on first pixel of
  // overlap. A ratio threshold requires that fraction of the *target's own
  // area* to be visible at once, which a tall single-column section (e.g.
  // #projects stacked on mobile) can exceed the viewport height enough to
  // never satisfy, leaving it permanently opacity: 0.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );

  targets.forEach((el) => {
    el.classList.add('reveal-armed');
    observer.observe(el);
  });
}

/* ==========================================================================
   Scrollspy
   ========================================================================== */

function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  const header = document.querySelector('.site-header');

  const setActiveLink = () => {
    const offset = (header ? header.offsetHeight : 0) + 20;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    let currentId = sections[0].getAttribute('id');
    sections.forEach((section) => {
      if (atBottom || section.getBoundingClientRect().top - offset <= 0) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActiveLink();
        ticking = false;
      });
    },
    { passive: true }
  );

  setActiveLink();
}

/* ==========================================================================
   Mobile menu
   ========================================================================== */

function initMobileMenu() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ==========================================================================
   Project card tilt
   ========================================================================== */

function initTiltCards() {
  document.querySelectorAll('[data-tilt-card]').forEach((card) => {
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      // Parallax tilt disabled; keeping the searchlight (--mx/--my) tracking active.
      // const rotY = (px - 0.5) * TILT_MAX_DEG * 2;
      // const rotX = -(py - 0.5) * TILT_MAX_DEG * 2;
      // card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      // card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}

/* ==========================================================================
   Footer year
   ========================================================================== */

function initFooterYear() {
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = String(new Date().getFullYear());
  }
}

/* ==========================================================================
   Project release download counts
   ========================================================================== */

function initProjectDownloads() {
  const targets = document.querySelectorAll('.project-downloads[data-repo]');

  targets.forEach(async (el) => {
    const repo = el.dataset.repo;
    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/releases`);
      if (!response.ok) return;

      const releases = await response.json();
      const totalDownloads = releases.reduce((sum, release) => {
        const assetDownloads = (release.assets || []).reduce((s, asset) => s + asset.download_count, 0);
        return sum + assetDownloads;
      }, 0);

      if (totalDownloads > 0) {
        el.textContent = `${totalDownloads.toLocaleString()} downloads`;
        el.hidden = false;
      }
    } catch {
      // Leave the counter hidden if the GitHub API is unreachable.
    }
  });
}
