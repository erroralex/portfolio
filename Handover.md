# Handover

## Overview
This document tracks recent changes, current context, and next steps for the Developer Portfolio SPA project.

## Recent Changes
- Ported the Latent Design System prototype (`docs/Portfolio.dc.html`, `docs/Implementation-Plan.md`) into the production SPA: rewrote `index.html`, `styles.css`, and `script.js` in full with Alexander Nilsson's real bio, career-change narrative, tech stack, and project content. Merged to `main`.
- Implemented the Latent Design System as CSS custom properties (graphite canvas, cyan/violet gradient accents, Inter + JetBrains Mono); no light/dark toggle, this is a fixed dark theme.
- Hero typed-tagline, scroll-reveal on section entry, scrollspy nav highlighting, mobile hamburger menu, all gated behind `prefers-reduced-motion`.
- Hero circular portrait now shows a real cropped photo (`assets/profile-photo.jpg`) instead of the "AN" initials placeholder.
- Tech Stack's AI-Assisted Dev card uses real Claude/Cursor/Antigravity logos, sized to match the other stack icon rows.
- Projects section (retitled from "The Latent Suite" to "Projects", since it now spans more than the Latent Suite) is a drag-to-scroll carousel (`.carousel-outer`/`.carousel-track` in `styles.css`, `initProjectsCarousel()` in `script.js`): prev/next buttons, mouse drag with momentum, touch swipe, native keyboard arrow-key scrolling, edge fade gradients, and cards center themselves when they all fit the viewport. Now has 7 cards: the 4 Latent Suite apps, Mr. Wiggy, Drop-in Brain, and Lo-Fi AI. The three private-repo projects (Mr. Wiggy, Drop-in Brain, Lo-Fi AI) show a "Private repo, not yet public" note instead of a GitHub link, with real descriptions/tags pulled from their READMEs.
- A top accent-glow hover line (cycling cyan/violet/blend) is now a consistent hover pattern across the site: project cards (plus a cursor-following radial shine), Journey timeline cards, Contact link cards, and the primary/outline buttons (View Projects gets a dark-graphite glow + brighter gradient on hover since it already has a bright background; Download CV gets the colored glow like everything else).
- About Me's bio card is now an `about.json`-styled code panel with a Windows-style titlebar (minimize/maximize/close, not macOS dots) and syntax-colored key/value pairs (name, location, role, background, the `"building"` array of all 4 projects, focus, status). Value prop 01 was retitled "Local-first by default" since not everything (Mr. Wiggy, Lo-Fi AI) is strictly local-only.
- Removed the GitHub Activity section (skillicons-based stats cards) entirely.
- Verified locally throughout: HTML tag/anchor checks, `node --check` on `script.js`, and headless-Chromium (Playwright) passes across breakpoints covering scroll-reveal, scrollspy, mobile menu, carousel drag/nav/keyboard scroll, and all hover glow effects, with zero console errors. No real browser was available in this environment.

## Next Steps
- Push a version tag (e.g. `git tag v1.1.0 && git push origin v1.1.0`) to trigger the GitHub Actions deployment.
- Make the `wiggy`, `drop-in-brain`, and `Lo-Fi-AI` repos public if/when ready, then re-add their "Code on GitHub" links (and a real screenshot for Drop-in Brain, which currently doesn't have one).
- Perform a manual pass on a real device/browser for final polish, especially the carousel's drag/momentum feel and the hover glow effects (the local verification above used headless Chromium).
