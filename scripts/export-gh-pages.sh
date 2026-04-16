#!/usr/bin/env bash
set -euo pipefail

# Build all sites for GitHub Pages and stage static files into ./docs.
# Usage: BASE_PREFIX=/portfolio ./scripts/export-gh-pages.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCS_DIR="$ROOT_DIR/docs"
SITES=(portfolio barber car-repair dentist gym hvac plumber roofing spa tattoo veterinary)

BASE_PREFIX="${BASE_PREFIX:-}"
BASE_PREFIX="${BASE_PREFIX%/}"
BASE_PREFIX="${BASE_PREFIX#/}"
if [[ -z "$BASE_PREFIX" ]]; then
  echo "BASE_PREFIX is required for GitHub Pages (e.g. /portfolio)" 1>&2
  exit 1
fi
BASE_PREFIX="/$BASE_PREFIX"

echo "Building with BASE_PREFIX=$BASE_PREFIX" 1>&2
BASE_PREFIX="$BASE_PREFIX" "$ROOT_DIR/scripts/build-all.sh"

echo "Clearing $DOCS_DIR" 1>&2
rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"

echo "Copying static builds into docs/" 1>&2
for site in "${SITES[@]}"; do
  src="$ROOT_DIR/sites/$site/dist/public"
  dest="$DOCS_DIR/$site"
  if [[ ! -d "$src" ]]; then
    echo "   skipping $site (missing build at $src)" 1>&2
    continue
  fi
  mkdir -p "$dest"
  cp -a "$src"/. "$dest"/
  echo "   copied $site -> docs/$site" 1>&2
done

echo "Writing docs/index.html" 1>&2
cat > "$DOCS_DIR/index.html" <<HTML
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Portfolio Sites</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.5; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
      ul { padding-left: 1.2rem; }
    </style>
  </head>
  <body>
    <h1>Portfolio Sites</h1>
    <p>Hosted under <code>${BASE_PREFIX}</code> + slug</p>
    <ul>
      $(for s in "${SITES[@]}"; do echo "<li><a href=\"${BASE_PREFIX}/${s}/\">${BASE_PREFIX}/${s}/</a></li>"; done)
    </ul>
  </body>
</html>
HTML

echo "Export ready in $DOCS_DIR. Push this (or gh-pages) to GitHub Pages." 1>&2
