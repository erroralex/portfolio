# Handover

## Overview
This document tracks recent changes, current context, and next steps for the Developer Portfolio SPA project.

## Recent Changes
- Fixed a bug where whole sections (About/Stack/Projects/Journey/Contact) could render as a permanent black void: they were `opacity: 0` by default in CSS and only an `IntersectionObserver` in `script.js` ever revealed them. A direct `#section` link (jumping straight past sections before the observer attaches), a blocked/slow script load, or an error thrown by an unrelated init function could all leave a section invisible forever. Reworked so sections are visible by default and JS has to opt a section *into* the hidden state (`.reveal-armed`) right before observing it; each init function in `script.js` now runs independently so one throwing doesn't take down the rest.
- Fixed a related FOUC: the black canvas background only applied once `styles.css` finished downloading, so a cold/slow load could briefly flash the browser's default background. Added an inline `<style>` in `<head>` that sets it immediately.
- Added a new project card for **Corpus Vera** (`erroralex/corpus-vera`, private repo): a config-driven news article/comment scraper with an admin UI and local-Ollama-assisted site drafting. Content (kind, stack, description, tags) was pulled from the repo's own README via `gh` (private, but authenticated). Styled like the other private-repo cards (Wiggy, Drop-in Brain, Lo-Fi AI) — "Private repo, not yet public" instead of a GitHub link.
- v1.1.2/v1.1.3 (nav top-glow rework, scrollspy fix, contrast fix, image optimization + local screenshots, parallax disable, AI-config untracking, Corpus Vera card) are live — see git log for that batch's detail if needed; not re-summarized here to keep this doc current rather than a running changelog.

## Next Steps
- Add explicit `width`/`height` (or a CSS `aspect-ratio`) to the Tech Stack cards' multi-icon images (`.stack-card img`, the skillicons.dev rows) — the one remaining image type with no reserved space, so it can shift the grid on load.
- Make the `wiggy`, `drop-in-brain`, `Lo-Fi-AI`, and `corpus-vera` repos public if/when ready, then re-add their "Code on GitHub" links.
- Perform a manual pass on a real device/browser: the projects grid at various breakpoints (7 cards), the timeline glow animation, and the download counters (GitHub's unauthenticated API is rate-limited to 60 req/hr per IP).
- `docs/README.md` is a working copy for the GitHub profile README, not part of this site — confirm whether it belongs in this repo or should move to the `erroralex/erroralex` profile repo, and commit it there.
