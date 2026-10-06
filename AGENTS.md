# AGENTS.md

Static portfolio site (Samuel Odeyovwi). No build step, no package manager, no tests or linting. Design language: "Signal Sheet" — an engineering-schematic identity (grid background, mono labels, amber accent).

## Run / verify

- No build step — open `index.html` directly or serve: `python -m http.server` (http://localhost:8000).
- No tests, lint, or typecheck. Verify by loading the page and checking the browser console (loads clean, zero errors, in Chromium). Beware browser caching while iterating — a hard reload or a fresh port avoids stale `styles.css`/`app.js`.

## Layout

- `index.html` — all markup: sections, project `article.module` cards, 2 filmstrip galleries, the lightbox `<dialog>`, and the inline flash-free theme bootstrap in `<head>` (index.html:9-18).
- `styles.css` — all styling; tokens on `:root` (light) and `:root[data-theme="dark"]` (styles.css:9-36).
- `app.js` — the only script, loaded at the end of `index.html`.
- `images/` — project screenshots; `public/` — resume PDF (`public/Samuel_Odeyovwi_Resume.pdf`).
- Fonts load from the Fontsource CDN (Space Grotesk, IBM Plex Mono, Silkscreen) via `<link>`s in `<head>`.
- The original redesign snapshot is kept outside the repo at `~/share/portfolio-ui-snapshot/receive/index.html`. Do not delete it.

## Gotchas

- Dark mode is an HTML-attribute contract: `data-theme="light|dark"` on `<html>`, persisted to `localStorage["so-theme"]`, falling back to legacy `localStorage["theme"]` and then `prefers-color-scheme`. The inline `<head>` bootstrap (index.html:9-18) applies it before first paint, so there is no flash. `app.js` toggles the attribute and keeps the switch's `aria-checked`/`aria-label` in sync. Every themed element needs its own `:root[data-theme="dark"]` rule — nothing inverts automatically.
- Galleries are data-driven: each `.filmstrip[data-gallery]` is wired by the loop at app.js:124. Required shape: `.fs-slide` images (first also `.on`), matching `.fs-thumb` buttons (first `.on` + `aria-pressed="true"`), `.fs-prev`, `.fs-next`, `.fs-main`, and a `.fs-count`. Clicking `.fs-main` opens the shared `#lightbox` `<dialog>` (app.js:105-170). Slides use `object-fit:cover` with `object-position:top`, so expect cropping; adjust the `aspect-ratio`/height on `.fs-viewer` in `styles.css`, not the markup.
- Project links point to external demos/code (GitHub, Webflow, YouTube, Google Drive). They are all `target="_blank"` with `rel="noopener noreferrer"` — keep external hrefs and rel attrs intact when editing cards.
- `prefers-reduced-motion` (styles.css:270) disables reveals and animations; the scramble-name effect and smooth scroll are also gated in `app.js`.

## Deploy

- Netlify free tier; pushing to `main` auto-redeploys (no CI config in repo). Live: https://robotboy-portfolio.netlify.app
