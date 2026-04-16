# Portfolio multi-site preview

This repo now lets you preview every niche demo site from one place. Each site is built with a path prefix (e.g. `/barber`, `/dentist`) so they can be hosted side‑by‑side on one static host or via the local Express server.

## Prerequisites
- Node 18+ and npm

## Quick start (local)
1) Install root deps (needed for the Express server):
```bash
npm install
```
2) Build everything with path prefixes (installs per‑site deps on first run and outputs to `sites/<site>/dist/public`):
```bash
./scripts/build-all.sh
```
3) Serve all demos on one port:
```bash
npm run serve
```
Then open `http://localhost:4173` for the site list, or jump straight to `http://localhost:4173/barber`, `.../dentist`, etc. Stop the server anytime with `Ctrl+C` or `pkill -f serve.mjs`.

### Local preview with GitHub Pages paths
If you want local URLs to match how they’ll be hosted on Pages (e.g., `https://<user>.github.io/portfolio/<slug>/`):
```bash
BASE_PREFIX=/portfolio ./scripts/build-all.sh
BASE_PREFIX=/portfolio npm run serve
# open http://localhost:4173/portfolio/<slug>/
```

## Develop a single site
```bash
cd sites/<site>
npm install        # first time only
npm run dev        # runs at http://localhost:5000 by default
```
If you want to preview a site under its path prefix during dev, run:
```bash
BASE_PATH=/barber VITE_BASE_PATH=/barber npm run dev
```

## Deploying
Each built site lives in `sites/<site>/dist/public` and already expects to be served from `/<site>/`. Upload those folders to GitHub Pages (or any static host) under matching paths and everything will resolve correctly.

### GitHub Pages (project site) hints
- Pages for a repo are served from `https://<user>.github.io/<repo>/…`. Set a base prefix so assets resolve correctly.
- One-shot export (recommended):
  ```bash
  BASE_PREFIX=/portfolio ./scripts/export-gh-pages.sh
  ```
  This rebuilds everything with the prefix and stages static files in `docs/<slug>/` plus an index page.
  Enable GitHub Pages with the **/docs** folder as the source, commit/push, and your sites will be reachable at `https://<user>.github.io/portfolio/<slug>/`.
- Local preview with the same prefix:
  ```bash
  BASE_PREFIX=/portfolio npm run serve
  # open http://localhost:4173/portfolio/<slug>/
  ```
