#!/usr/bin/env bash
set -euo pipefail

# Build every site with a path prefix so they can be hosted side-by-side.
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SITES=(portfolio barber car-repair dentist gym hvac plumber roofing spa tattoo veterinary)
BASE_PREFIX="${BASE_PREFIX:-}"
BASE_PREFIX="${BASE_PREFIX%/}"
BASE_PREFIX="${BASE_PREFIX#/}"
if [[ -n "$BASE_PREFIX" ]]; then
  BASE_PREFIX="/$BASE_PREFIX"
fi

for site in "${SITES[@]}"; do
  SITE_DIR="$ROOT_DIR/sites/$site"
  echo "\n→ Building $site" 1>&2
  if [[ ! -d "$SITE_DIR" ]]; then
    echo "   skipping missing folder $SITE_DIR" 1>&2
    continue
  fi

  if [[ ! -d "$SITE_DIR/node_modules" ]]; then
    echo "   installing deps…" 1>&2
    (cd "$SITE_DIR" && npm install)
  fi

  BASE_PATH="$BASE_PREFIX/$site"
  BASE_PATH="${BASE_PATH//\/\//\/}"
  VITE_BASE_PATH="$BASE_PATH"
  (cd "$SITE_DIR" && BASE_PATH="$BASE_PATH" VITE_BASE_PATH="$VITE_BASE_PATH" npm run build)
done
