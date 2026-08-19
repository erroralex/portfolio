/**
 * Portfolio SPA Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initProjects();
  initContactForm();
  initScrollSpy();
  initFooterYear();
});

/* ==========================================================================
   Theme Management (Light / Dark)
   ========================================================================== */

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  // Listen for OS theme changes if user hasn't explicitly set one
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#f8fafc');
  }
}

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */

function initNavigation() {
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const siteNav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !siteNav) return;

  const toggleMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !siteNav.classList.contains('open');
    siteNav.classList.toggle('open', shouldOpen);
    navToggle.setAttribute('aria-expanded', String(shouldOpen));
  };

  navToggle.addEventListener('click', () => toggleMenu());

  // Close menu when clicking navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMenu(false);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      toggleMenu(false);
      navToggle.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (
      siteNav.classList.contains('open') &&
      !siteNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   Dynamic Projects & Filtering
   ========================================================================== */

const PROJECTS = [
  {
    id: 'portfolio-spa',
    title: 'Interactive Developer Portfolio',
    description: 'Clean, accessible single-page portfolio built with vanilla web technologies, dynamic filtering, custom design tokens, and drop-in AI assistant governance.',
    category: 'frontend',
    categoryLabel: 'Frontend',
    date: '2026',
    tags: ['HTML5', 'CSS3', 'ES6+ JavaScript', 'GitHub Pages', 'a11y'],
    demoUrl: '#top',
    codeUrl: 'https://github.com/erroralex/portfolio'
  },
  {
    id: 'cloud-metrics-dashboard',
    title: 'Real-time Metrics Dashboard',
    description: 'A performant telemetry monitoring dashboard visualizing operational metrics, real-time event streams, and service health status.',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    date: '2025',
    tags: ['JavaScript', 'WebSockets', 'Chart.js', 'REST API'],
    demoUrl: 'https://github.com/erroralex',
    codeUrl: 'https://github.com/erroralex'
  },
  {
    id: 'dev-workflow-cli',
    title: 'Developer Workflow Automation CLI',
    description: 'A lightweight command-line tool suite for automated project scaffolding, linting, git hooks verification, and deployment validation.',
    category: 'tools',
    categoryLabel: 'Tools & CLI',
    date: '2025',
    tags: ['Node.js', 'CLI', 'Automation', 'Git'],
    demoUrl: 'https://github.com/erroralex',
    codeUrl: 'https://github.com/erroralex'
  },
  {
    id: 'markdown-task-manager',
    title: 'Accessible Task Kanban SPA',
    description: 'Single-page task planner and board with offline persistence, keyboard-first navigation, and WCAG AA color accessibility.',
    category: 'frontend',
    categoryLabel: 'Frontend',
    date: '2024',
    tags: ['Vanilla JS', 'Local Storage', 'CSS Grid', 'ARIA'],
    demoUrl: 'https://github.com/erroralex',
    codeUrl: 'https://github.com/erroralex'
  }
];

function initProjects() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  renderProjects(PROJECTS, container);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const filtered = filter === 'all' 
        ? PROJECTS 
        : PROJECTS.filter((p) => p.category === filter);

      renderProjects(filtered, container);
    });
  });
}

function renderProjects(projects, container) {
  container.innerHTML = '';

  if (projects.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'section-desc';
    emptyMsg.textContent = 'No projects found for this category.';
    container.appendChild(emptyMsg);
    return;
  }

  projects.forEach((proj) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-category', proj.category);

    const header = document.createElement('div');
    header.className = 'project-card-header';
    
    const tag = document.createElement('span');
    tag.className = 'project-tag';
    tag.textContent = proj.categoryLabel;

    const date = document.createElement('span');
    date.className = 'project-date';
    date.textContent = proj.date;

    header.appendChild(tag);
    header.appendChild(date);

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = proj.title;

    const desc = document.createElement('p');
    desc.className = 'project-description';
    desc.textContent = proj.description;

    const techList = document.createElement('ul');
    techList.className = 'project-tech-list';
    proj.tags.forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      techList.appendChild(li);
    });

    const links = document.createElement('div');
    links.className = 'project-links';

    if (proj.codeUrl) {
      const codeLink = document.createElement('a');
      codeLink.href = proj.codeUrl;
      codeLink.className = 'project-link';
      codeLink.target = '_blank';
      codeLink.rel = 'noopener noreferrer';
      codeLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        <span>Code</span>
      `;
      links.appendChild(codeLink);
    }

    if (proj.demoUrl) {
      const demoLink = document.createElement('a');
      demoLink.href = proj.demoUrl;
      demoLink.className = 'project-link';
      if (proj.demoUrl.startsWith('http')) {
        demoLink.target = '_blank';
        demoLink.rel = 'noopener noreferrer';
      }
      demoLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
        <span>Live Demo</span>
      `;
      links.appendChild(demoLink);
    }

    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(techList);
    card.appendChild(links);

    container.appendChild(card);
  });
}

/* ==========================================================================
   Contact Form Validation & Submission Handling
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');

  const validate = () => {
    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'name-error', 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameInput, 'name-error');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'email-error', 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'email-error', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, 'email-error');
    }

    // Message validation
    if (!messageInput.value.trim()) {
      showError(messageInput, 'message-error', 'Please write a message.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'message-error', 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      clearError(messageInput, 'message-error');
    }

    return isValid;
  };

  // Real-time input clearing
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validate();
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Simulate in-flight submission
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';

    try {
      // Emulate brief network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      feedback.hidden = false;
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Thank you! Your message has been prepared. Feel free to connect on GitHub as well!';

      form.reset();
    } catch {
      feedback.hidden = false;
      feedback.className = 'form-feedback error';
      feedback.textContent = 'An error occurred while sending. Please reach out via GitHub directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

function showError(input, errorElementId, message) {
  input.classList.add('error');
  const errorElem = document.getElementById(errorElementId);
  if (errorElem) {
    errorElem.textContent = message;
  }
}

function clearError(input, errorElementId) {
  input.classList.remove('error');
  const errorElem = document.getElementById(errorElementId);
  if (errorElem) {
    errorElem.textContent = '';
  }
}

/* ==========================================================================
   Scroll Spy / Active Navigation Highlighting
   ========================================================================== */

function initScrollSpy() {
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px'
    }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* ==========================================================================
   Footer Current Year
   ========================================================================== */

function initFooterYear() {
  const yearElem = document.getElementById('current-year');
  if (yearElem) {
    yearElem.textContent = String(new Date().getFullYear());
  }
}
