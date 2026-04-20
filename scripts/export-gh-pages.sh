#!/usr/bin/env bash
set -euo pipefail

# Build all sites for GitHub Pages and stage static files into ./docs.
# Usage: ./scripts/export-gh-pages.sh
# Optional override: BASE_PREFIX=/custom-path ./scripts/export-gh-pages.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCS_DIR="$ROOT_DIR/docs"
SITES=(portfolio barber car-repair dentist gym hvac plumber roofing spa tattoo veterinary)

BASE_PREFIX="${BASE_PREFIX:-}"
if [[ -z "$BASE_PREFIX" ]]; then
  # GitHub project pages are typically hosted at /<repo-name>/.
  BASE_PREFIX="/$(basename "$ROOT_DIR")"
fi
BASE_PREFIX="${BASE_PREFIX%/}"
BASE_PREFIX="${BASE_PREFIX#/}"
BASE_PREFIX="/$BASE_PREFIX"

echo "Building with BASE_PREFIX=$BASE_PREFIX" 1>&2
BASE_PREFIX="$BASE_PREFIX" "$ROOT_DIR/scripts/build-all.sh"

echo "Clearing $DOCS_DIR" 1>&2
rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"

echo "Copying portfolio build to docs/ root" 1>&2
portfolio_src="$ROOT_DIR/sites/portfolio/dist/public"
if [[ ! -d "$portfolio_src" ]]; then
  echo "portfolio build missing at $portfolio_src" 1>&2
  exit 1
fi
cp -a "$portfolio_src"/. "$DOCS_DIR"/

echo "Copying niche site builds into docs/<slug>/" 1>&2
for site in "${SITES[@]}"; do
  if [[ "$site" == "portfolio" ]]; then
    continue
  fi
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

echo "Export ready in $DOCS_DIR. Push this (or gh-pages) to GitHub Pages." 1>&2
