# Alexander Nilsson — Portfolio SPA: Implementation Plan

## 1. Overview
A single-page, responsive portfolio for Alexander Nilsson (erroralex), a System Development student transitioning from a construction career. Built as a static SPA for GitHub Pages, themed with the **Latent Design System** (the brand system for his Latent Suite of apps), with subtle scroll/hover/typing animations.

**Design source of truth:** `Portfolio.dc.html` (the working prototype). This plan describes how to port it into the existing `portfolio` repo (`index.html` / `styles.css` / `script.js`) for production deployment.

## 2. Goals
- Replace the current placeholder-content portfolio with real bio, real projects, real CV link.
- Apply the Latent Design System tokens (color, type, spacing, radius, shadow, motion) site-wide.
- Keep it a static SPA: no build step, deployable to GitHub Pages as-is.
- Subtle, tasteful motion: scroll-reveal, typed tagline, hover tilt on project cards — nothing gratuitous.

## 3. Information Architecture
Single page, anchor-linked sections, sticky header nav with scrollspy:

1. **Header** — logo (ALX mark) + name, nav (About / Stack / Projects / Journey / Contact), Download CV button, mobile hamburger menu.
2. **Hero** — name, "Software Developer" headline (gradient text), typed rotating tagline, social icon row (GitHub/LinkedIn/Email), CTA buttons (View Projects / Download CV), stats strip (apps shipped / years hands-on / % local-first), circular portrait photo slot.
3. **About** — bio card (career-change narrative) + 3 value props (Local-first, Discipline & precision, Built to last).
4. **Tech Stack** — 5 cards: Languages, Frameworks, Data & ML, Tooling, AI-Assisted Dev (Claude/Cursor/Antigravity).
5. **Projects ("The Latent Suite")** — 5 cards (Latent Library, Latent Model Organizer, Latent Tools, Metadata Viewer, wiggy), each with a real README screenshot, stacked-card visual treatment, and cursor-following tilt on hover.
6. **Career Journey** — timeline: Construction Industry (2006–2025) → System Development Student → Independent Developer.
7. **GitHub Activity** — link-out card to GitHub profile + top-languages summary (external stats images are unreliable cross-origin, so a static fallback card is used).
8. **Contact** — GitHub / LinkedIn / Email link cards.
9. **Footer** — copyright, back-to-top link.

## 4. Visual System (Latent Design System)
- **Color:** near-black graphite canvas (`#0A0A0D`), flat surface levels (`#14151B`, `#23252F`, `#262835`), hairline borders (6–18% white). Accents: Latent Cyan `#4FD8D0` (primary) and Latent Violet `#9B7EF5` (secondary). Cyan→violet gradient reserved for the hero headline text and the single primary CTA ("View Projects") — never used as a full background.
- **Type:** Inter (UI) + JetBrains Mono (code/mono accents), same pairing used across all three Latent apps.
- **Radius:** 6px inputs, 8px buttons, 12px cards/panels, full-pill for badges/tags.
- **Shadow/elevation:** soft, dark, low-contrast card/panel shadows; hairline borders do most of the separation work, not shadow.
- **Motion:** 120–280ms, `cubic-bezier(.4,0,.2,1)`, fades + small translations. No bounce/spring easing.
- **Background atmosphere:** two faint (~5–6% opacity) radial glows, cyan top-left / violet bottom-right, over the graphite canvas.

## 5. Content Inventory (real, already gathered)
- **Bio:** System Development Student transitioning from construction; nearly 20 years as a carpenter and tower crane operator at NCC Sverige AB, Umeå (2006–2025).
- **Projects:** Latent Library, Latent Model Organizer, Latent Tools, Metadata Viewer (descriptions and screenshot URLs sourced from each repo's README), plus `wiggy` as a placeholder "in progress" card.
- **Contact:** github.com/erroralex, LinkedIn, alexander.106.nilsson@gmail.com.
- **CV:** `assets/Alexander-Nilsson-CV.pdf` (provided).
- **Logo:** `assets/alx-logo.png` (provided ALX mark).

## 6. Interactions & Motion Spec
- **Typed tagline:** cycles through 3 phrases (Java Developer based in Umeå / System Development Student / Building the Latent Suite) with a type/delete effect and blinking cursor.
- **Scroll reveal:** sections fade + translate up into view via `IntersectionObserver`, respecting `prefers-reduced-motion`.
- **Scrollspy nav:** active section highlighted in the header nav as the user scrolls.
- **Project card tilt:** on hover, cards rotate toward the cursor (`perspective` + `rotateX/rotateY`) and lift slightly; cards also sit on an offset, rotated "stacked" backing card for a physical stacked-paper feel.
- **Mobile menu:** hamburger toggles a slide-down nav list; closes on link click.

## 7. Tech Notes for Porting to the Static Repo
- Pull in the Latent Design System token stylesheets (`colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`) and reference CSS variables directly (`var(--color-accent-primary)`, etc.) rather than hardcoding hex values — keeps future rebrands to one file.
- Keep everything static: no bundler, no framework required — vanilla HTML/CSS/JS, matching the existing repo's stack.
- External images (project screenshots, skill icons) are loaded directly from `raw.githubusercontent.com` and `skillicons.dev`; no local copies needed. GitHub stats widgets (`github-readme-stats.vercel.app`) are unreliable in sandboxed contexts — ship a static fallback card instead of depending on them being reachable.
- Respect `prefers-reduced-motion: reduce` for all animation (typing, reveal, tilt).

## 8. Deployment (GitHub Pages)
1. Merge the new markup/styles/script into `portfolio/index.html`, `styles.css`, `script.js` (or keep the single-file structure if preferred).
2. Confirm the existing GitHub Actions workflow (`.github/workflows/deploy.yml`) still targets the right branch/tag trigger.
3. Push a version tag (e.g. `git tag v1.1.0 && git push origin v1.1.0`) to trigger deployment, per the existing Handover.md next-steps.
4. Verify on the live Pages URL: nav scrollspy, mobile menu, CV download, all external links (GitHub/LinkedIn/mailto), and reduced-motion behavior.

## 9. Open Items / Future Iteration
- Add a real portrait photo into the hero circular image slot (currently a placeholder).
- Confirm exact start year for the "System Development Student" timeline entry (currently labeled "Recent" pending a precise date).
- Fill in the `wiggy` project description once available.
- Optional: swap the static GitHub-activity fallback for a self-hosted/cached stats image if reliability improves.
