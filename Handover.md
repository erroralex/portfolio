# Handover

## Overview
This document tracks recent changes, current context, and next steps for the Developer Portfolio SPA project.

## Recent Changes
- Ported the Latent Design System prototype (`docs/Portfolio.dc.html`, `docs/Implementation-Plan.md`) into the production SPA: rewrote `index.html`, `styles.css`, and `script.js` in full with Alexander Nilsson's real bio, career-change narrative, tech stack, and project content. Merged to `main`.
- Implemented the Latent Design System as CSS custom properties (graphite canvas, cyan/violet gradient accents, Inter + JetBrains Mono); no light/dark toggle, this is a fixed dark theme.
- Hero typed-tagline, scroll-reveal on section entry, scrollspy nav highlighting, mobile hamburger menu, all gated behind `prefers-reduced-motion`.
- Tech Stack's AI-Assisted Dev card uses real Claude/Cursor/Antigravity logos (`assets/claude-icon.png`, `assets/cursor-app-icon.png`, `assets/google-antigravity-logo-icon.png`), sized to match the other stack icon rows.
- Projects is a drag-to-scroll carousel (`.carousel-outer`/`.carousel-track` in `styles.css`, `initProjectsCarousel()` in `script.js`): prev/next buttons, mouse drag with momentum, touch swipe, native keyboard arrow-key scrolling, edge fade gradients, and cards center themselves when they all fit the viewport. Cards have a top accent-glow hover line, a cursor-following radial shine, and per-card accent-tinted tag pills cycling cyan/violet/blend. Momentum drag-fling is skipped under `prefers-reduced-motion`.
- The same top accent-glow hover effect (cycling cyan/violet/blend) was added to the Journey timeline cards.
- wiggy project card: renamed to "Mr. Wiggy", real Spring Boot + Electron description and tags pulled from its README, `assets/wiggy.png` (pixel-art companion character) as thumbnail. Its repo is private, so there's a "Private repo, not yet public" note instead of a GitHub link.
- Removed the GitHub Activity section (skillicons-based stats cards) entirely.
- Verified locally throughout: HTML tag/anchor checks, `node --check` on `script.js`, and headless-Chromium (Playwright) passes at 375/768/1280px+ covering scroll-reveal, scrollspy, mobile menu, carousel drag/nav/keyboard scroll, and hover glow effects, all with zero console errors. No real browser was available in this environment.

## Next Steps
- Push a version tag (e.g. `git tag v1.1.0 && git push origin v1.1.0`) to trigger the GitHub Actions deployment.
- Add a real portrait photo into the hero circular slot (currently initials "AN" as a placeholder).
- Make the `wiggy` repo public if/when it's ready, then re-add its "Code on GitHub" link and swap the thumbnail for a real app screenshot.
- Perform a manual pass on a real device/browser for final polish, especially the carousel's drag/momentum feel and the hover glow effects (the local verification above used headless Chromium).
