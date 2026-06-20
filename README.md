# Fox Media Adobe Site

A static web application for Adobe activation messaging, status checking, and bulk subscription lookup.

## Project Structure

Root files:
- `index.html` — main app entry point and React/Babel single-page UI.
- `index.css` — global styling and layout.
- `status.html` — standalone status checker page.
- `README.md` — documentation and usage instructions.
- `.gitignore` — ignores local tools, caches, and editor files.

Assets:
- `assets/images/logo.png` — main Fox Media logo.
- `assets/images/logo2.png` — secondary logo used in the bulk/status pages.

Development tools:
- `scratch/` — support scripts and utilities used during development.
  - `append_css.js`, `temp_code.jsx`, and many helper scripts live here.
  - `scratch/package.json` and `scratch/package-lock.json` manage dev dependencies.

## Recommended File Order for Understanding

1. `index.html` — app shell, scripts, and React components.
2. `index.css` — UI theme, layout, and component styling.
3. `status.html` — separate page logic and UI for status checking.
4. `assets/images/` — logo image assets used by the UI.
5. `scratch/` — developer utilities and extraction scripts.

## How to Run Locally

This is a static HTML/CSS/JS site. The easiest way to run it locally is with a simple static server.

### Option 1: Open directly

1. Open `index.html` in your browser.
2. If the browser blocks local `file://` scripts, use a local server instead.

### Option 2: Use a local server

From the project root:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deployment

The site is ready for static hosting.

Recommended options:
- GitHub Pages (from the `main` branch root)
- Netlify / Vercel / any static web host

## Notes

- `index.html` loads React and Babel directly in the browser.
- `status.html` is a separate static page for status checks.
- The `assets/images/` folder now stores logo assets for clearer file organization.
- `scratch/` contains helper scripts and is not required for the production site.

## Next Improvements

If you want, I can also:
- reorganize the app into a `src/` + `public/` layout
- convert it into a Vite-based React project
- improve the UI to match your example admin theme exactly
