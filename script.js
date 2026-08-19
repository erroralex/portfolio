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
  initProjectsCarousel(prefersReducedMotion);

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
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * TILT_MAX_DEG * 2;
      const rotX = -(py - 0.5) * TILT_MAX_DEG * 2;
      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}

/* ==========================================================================
   Projects carousel: nav buttons + drag-to-scroll
   ========================================================================== */

function initProjectsCarousel(prefersReducedMotion) {
  const track = document.getElementById('projects-track');
  const prevBtn = document.getElementById('projects-prev');
  const nextBtn = document.getElementById('projects-next');
  if (!track) return;

  const scrollByCard = (direction) => {
    const card = track.querySelector('.project-card');
    const amount = card ? card.getBoundingClientRect().width + 24 : 320;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let lastX = 0;
  let velocityX = 0;
  let momentumFrame = null;

  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    track.style.scrollBehavior = 'auto';
    startX = e.pageX;
    startScrollLeft = track.scrollLeft;
    lastX = e.pageX;
    velocityX = 0;
    cancelAnimationFrame(momentumFrame);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    velocityX = e.pageX - lastX;
    lastX = e.pageX;
    track.scrollLeft = startScrollLeft - (e.pageX - startX);
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.scrollBehavior = '';

    if (prefersReducedMotion) return;

    let momentum = velocityX * 12;
    const decelerate = () => {
      momentum *= 0.92;
      track.scrollLeft -= momentum;
      if (Math.abs(momentum) > 0.5) {
        momentumFrame = requestAnimationFrame(decelerate);
      }
    };
    decelerate();
  });

  let touchStartX = 0;
  let touchStartScrollLeft = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartScrollLeft = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const dx = touchStartX - e.touches[0].clientX;
    track.scrollLeft = touchStartScrollLeft + dx;
  }, { passive: true });
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
