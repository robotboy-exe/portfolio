# AGENTS.md

Static portfolio site (Samuel Odeyovwi). No build step, no package manager, no tests or linting.

## Run / verify

- No build step — open `index.html` directly or serve: `python -m http.server` (http://localhost:8000).
- No tests, lint, or typecheck. Verify by loading the page and checking the browser console (loads clean, zero errors, in Chromium).

## Layout

- `index.html` — all markup: sections, project cards, 2 carousels.
- `styles.css` — all styling; CSS custom properties, mobile-first, `body.dark-mode`.
- `app.js` — the only script, loaded at the end of `index.html`.
- `images/` — project screenshots; `public/` — resume PDF (`public/Samuel_Odeyovwi_Resume.pdf`).
- README's file tree/project table currently match the repo; trust the code if they drift.

## Gotchas

- Dark mode = `body.dark-mode`, persisted to `localStorage["theme"]`, falling back to `prefers-color-scheme`. It is applied by `app.js` (script at end of body, no inline anti-FOUC script), so it initializes after load. Any new element needs its own `body.dark-mode` rule in `styles.css`; the footer rule lives at styles.css:467.
- Carousels are data-driven: `initCarousel` (app.js:49) runs on every `.carousel-container` (app.js:109). Each container needs `.carousel-image` (first one marked `active`), `.carousel-prev`, `.carousel-next`, and one `.dot` per slide (first `.dot` also `active`) — no JS changes required. Container height is hardcoded to 240px (styles.css:263) to match `.project-screenshot`; slides are cropped with `object-fit: cover`, so expect cropping. Slides auto-advance every 5s, pause on hover, and the timer resets on manual interaction; prev/next/dots stay hidden until hover on pointer devices, but are always shown under `@media (hover: none)` (styles.css:370).
- Project-card links point to external demos/code (GitHub, Webflow, YouTube, Google Drive). They are all `target="_blank"` with `rel="noopener noreferrer"` — keep external hrefs and rel attrs intact when editing cards.

## Deploy

- Netlify free tier; pushing to `main` auto-redeploys (no CI config in repo). Live: https://robotboy-portfolio.netlify.app
