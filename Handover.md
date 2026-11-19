# Handover

## Overview
Current state, recent context, and next steps for the Developer Portfolio SPA. Older detail lives in `git log`.

## Current State
- Live release: **v1.1.12** (deployed 2026-11-19).
- Projects (9 cards, in order): Oportunely, Latent Library, Latent Model Organizer, Latent Tools, Metadata Viewer, Drop-in Brain, Lo-Fi AI, Mr. Wiggy, Corpus Vera.
- Tech Stack cards: Languages (Java, JS, HTML, CSS), Frameworks (Spring, Vue, Angular, Electron), Data & Infra (SQLite, MySQL, Docker), Tooling (Git, Maven, IntelliJ IDEA, VS Code), Agentic Engineering (Claude, Cursor, Antigravity).
- Private-repo cards (Drop-in Brain, Lo-Fi AI, Mr. Wiggy, Corpus Vera) show a muted "Private repo(s), not yet public" footer instead of a GitHub link. Oportunely links to its live site instead.

## Recent Changes (v1.1.9 to v1.1.12)
- **Oportunely card** (`erroralex/Oportunely`, private, live at https://oportunely.com) added first. The text comes from the repo's README and AGENTS.md. On purpose, it leaves out the monthly activity report (grant reporting) and the features still listed as on the way. The cover `assets/oportunely.jpg` is a 960x520 screenshot of the public start page, because the repo has no real screenshots yet. The projects intro now reads "A mix of web and desktop apps...".
- **Drop-in Brain card** rewritten to cover both editions, `erroralex/drop-in-brain` (solo) and `erroralex/drop-in-brain-teams`. It lists Claude Code, Antigravity and Codex (the user's choice; only the teams README names Antigravity). The text is kept to 10 lines so the row height doesn't change.
- **Card order:** Drop-in Brain, Lo-Fi AI, Mr. Wiggy, Corpus Vera at positions 6 to 9.
- **Tech Stack:** renamed "AI-Assisted Dev" to "Agentic Engineering", and "Data & ML" to "Data & Infra" (no ML entries were left). Added Angular to Frameworks and Docker to Data & Infra.
- **Deploy workflow** moved to Node 24 action versions: checkout v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5. upload-pages-artifact v4 and later leave out dotfiles, and the site needs none.

## Deploy Notes
- Tags v1.1.6 to v1.1.8 existed before this round, so the version numbers don't run in order. Run `git tag --sort=-v:refname | head -1` before picking the next tag.
- The v1.1.12 tag run failed because the deploy step looked for the uploaded artifact 0.3 s after the upload finished and found nothing (a timing glitch on GitHub's side). Re-running the failed job then uploaded a second copy and failed with "Multiple artifacts named github-pages". The fix was a fresh run: `gh workflow run deploy.yml --ref v1.1.12`. The failed tag run still shows in the Actions list. This is recorded in AGENTS.md under Deploy.

## Next Steps
- Add explicit `width`/`height` (or a CSS `aspect-ratio`) to the Tech Stack cards' multi-icon images (`.stack-card img`, the skillicons.dev rows). They are the one image type with no reserved space, so they can shift the grid on load.
- Make the `wiggy`, `drop-in-brain`, `drop-in-brain-teams`, `Lo-Fi-AI`, and `corpus-vera` repos public if and when ready, then re-add their "Code on GitHub" links.
- Replace `assets/oportunely.jpg` with a real board capture from the Oportunely demo data once one exists.
- Manual pass on a real device: the projects grid at 320px, 768px and 1280px (9 cards), the timeline glow animation, and the download counters (GitHub's unauthenticated API allows 60 requests per hour per IP).
