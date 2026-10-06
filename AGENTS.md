# AGENTS.md

Static portfolio site (Samuel Odeyovwi). No build step, no package manager, no tests or linting.

## Run / verify

- No build step — open `index.html` directly or serve: `python -m http.server` (http://localhost:8000).
- There are no tests, lint, or typecheck commands. Verify changes by opening the page in a browser and checking console.

## Layout

- `index.html` — all markup (sections, project cards, carousel markup).
- `styles.css` — all styling; uses CSS custom properties, mobile-first, `.dark-mode` on `body`.
- `app.js` — the only script, loaded at the end of `index.html`.
- `images/` — screenshots; `public/` — resume PDF (`public/Samuel_Odeyovwi_Resume.pdf`).

## Gotchas

- `app.js:2` does `document.getElementById("backToTopBtn")` with **no null check** (unlike `themeToggle`). Removing the button or renaming the ID breaks the whole script.
- Dark mode = `body.dark-mode` class, persisted to `localStorage["theme"]`, falls back to `prefers-color-scheme`. Any new element must get a dark-mode rule in `styles.css`.
- Carousel is data-driven: `initCarousel` runs on every `.carousel-container`. Adding another container with `.carousel-image`, `.carousel-prev`, `.carousel-next`, `.dot` works with no JS changes.
- `README.md`'s file tree and project table are stale (missing the latest `admin-dashboard-mockup.png` / NIIT project). Trust the code, not the README, for current structure.

## Deploy

- Deployed to Netlify free tier; pushing to `main` triggers auto-redeploy (no CI config in repo). Live: https://robotboy-portfolio.netlify.app
- Project images/links point to external repos and URLs (GitHub, Webflow, YouTube) — keep external hrefs intact when editing cards.