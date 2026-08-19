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

  initMobileMenu();
  initScrollSpy();
  initFooterYear();

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    const typedText = document.getElementById('typed-text');
    if (typedText) typedText.textContent = TAGLINES[0];
  } else {
    initTypedTagline();
    initScrollReveal();
    initTiltCards();
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   Scrollspy
   ========================================================================== */

function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-10% 0px -60% 0px', threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
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
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * TILT_MAX_DEG).toFixed(2)}deg) rotateY(${(px * TILT_MAX_DEG).toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
    };

    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
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
