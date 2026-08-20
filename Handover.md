# Handover

## Overview
This document tracks recent changes, current context, and next steps for the Developer Portfolio SPA project.

## Recent Changes
- Fixed the "Back to top" footer link: `id="top"` was on the sticky header, so once it stuck to `top: 0` its `getBoundingClientRect()` always read 0 and the browser treated it as already in view, never scrolling. Moved `id="top"` to `<body>` instead.
- Removed the hero stats strip (Apps shipped / Years of hands-on work / Local-first), including its now-dead `.hero-stats`/`.hero-stat*` CSS.
- Fixed a corner color-bleed artifact on the `View Projects` primary button: its gradient used a fixed `135deg`, which doesn't match the button's actual (wide) aspect ratio and blew teal into the top-right corner. Switched to `linear-gradient(to bottom right, ...)` so the diagonal is computed for the element's own shape. Hover keeps the brighter gradient; the top-edge hover glow line is now white instead of the dark canvas color.
- Replaced the drag/touch project carousel with a responsive CSS grid (`.projects-grid`): 1 column on mobile, 2 from 640px, 3 from 1080px. Removed `initProjectsCarousel()` and all its drag/momentum/touch listeners from `script.js`, and the carousel wrapper/nav-button/edge-fade CSS. Cards keep their existing tilt and hover-glow effects.
- Added a live "N downloads" counter next to the "Code on GitHub" link on the 4 public-repo project cards. `initProjectDownloads()` in `script.js` fetches each repo's `/releases` from the GitHub API client-side, sums asset `download_count` across all releases, and reveals the counter (stays hidden on fetch failure or a zero count). Markup wraps the link + counter in a new `.project-footer` row; private-repo cards are unchanged.
- Added an animated glow to the Journey timeline's vertical connector line (`.timeline::after`): a single soft highlight travels down the line on an 8s ease-in-out loop, shifting color to match each card's own accent (teal top card, violet middle, blend at the bottom) as it passes. Built as one static full-height gradient revealed through a small moving `mask-image` window; iterated a few times to fix visual issues:
  - First pass covered the whole line in color — narrowed to a small traveling band.
  - Second pass had two bands visible at once and a hard color transition instead of tracking card colors — rebuilt as a single static color map masked by one moving window.
  - Band length halved (180px → 90px) and a `mask-size` of 110px was settled on for a softer look.
  - `filter: blur()` was removed entirely: blurring a masked 8px-wide strip rasterized at low quality and looked pixelated compared to the crisp card-hover gradients elsewhere on the site. Softness now comes purely from the mask gradient's own stops (no blur filter), keeping it crisp.
  - Respects `prefers-reduced-motion` via the site's existing global rule that zeroes animation durations.
- Verified locally throughout: `node --check` on `script.js`, HTML structure checks after the carousel-to-grid change, and a manual GitHub API sanity check confirming the download-count response shape. No real browser was available in this environment; the timeline glow and hover states were iterated based on screenshots the user provided.

## Next Steps
- Push a version tag (e.g. `git tag v1.1.0 && git push origin v1.1.0`) to trigger the GitHub Actions deployment.
- Make the `wiggy`, `drop-in-brain`, and `Lo-Fi-AI` repos public if/when ready, then re-add their "Code on GitHub" links (and a real screenshot for Drop-in Brain, which currently doesn't have one).
- Perform a manual pass on a real device/browser for final polish: the new projects grid at various breakpoints, the timeline glow animation (mask-image/`mix-blend-mode: screen` support varies slightly across engines), and the download counters (GitHub's unauthenticated API is rate-limited to 60 req/hr per IP; fine for normal traffic but worth knowing about).
