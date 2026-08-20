# Handover

## Overview
This document tracks recent changes, current context, and next steps for the Developer Portfolio SPA project.

## Recent Changes
- Added a new project card for **Corpus Vera** (`erroralex/corpus-vera`, private repo): a config-driven news article/comment scraper with an admin UI and local-Ollama-assisted site drafting. Content (kind, stack, description, tags) was pulled from the repo's own README via `gh` (private, but authenticated). Styled like the other private-repo cards (Wiggy, Drop-in Brain, Lo-Fi AI) — "Private repo, not yet public" instead of a GitHub link.
- Screenshot asset: resized `assets/corpus-vera.jpeg` (1664x896, 175KB) the same way as the other project thumbnails → `assets/corpus-vera.jpg` (960x517, 72KB), original removed.
- v1.1.2 (nav top-glow rework, scrollspy fix, contrast fix, image optimization + local screenshots, parallax disable, AI-config untracking) is live — see git log for that batch's detail if needed; not re-summarized here to keep this doc current rather than a running changelog.

## Next Steps
- Push a new version tag (e.g. `v1.1.3`) to trigger the GitHub Actions deployment for the Corpus Vera card.
- Add explicit `width`/`height` (or a CSS `aspect-ratio`) to the Tech Stack cards' multi-icon images (`.stack-card img`, the skillicons.dev rows) — the one remaining image type with no reserved space, so it can shift the grid on load.
- Make the `wiggy`, `drop-in-brain`, `Lo-Fi-AI`, and now `corpus-vera` repos public if/when ready, then re-add their "Code on GitHub" links.
- Perform a manual pass on a real device/browser: the projects grid at various breakpoints (now 7 cards), the timeline glow animation, and the download counters (GitHub's unauthenticated API is rate-limited to 60 req/hr per IP).
- `docs/README.md` is a working copy for the GitHub profile README, not part of this site — confirm whether it belongs in this repo or should move to the `erroralex/erroralex` profile repo, and commit it there.
