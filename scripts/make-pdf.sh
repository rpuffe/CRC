#!/usr/bin/env bash
#
# Regenerate the résumé PDF from the built résumé page, so the PDF and the
# site never drift apart. Run after `npm run build`.
#
#   CHROME   path to a Chrome/Chromium binary (default: macOS Google Chrome)
#   OUT      output file                       (default: public/Robert-Puffe-Resume.pdf)
#
set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="${OUT:-public/Robert-Puffe-Resume.pdf}"
PAGE="$(pwd)/dist/resume.html"

[ -f "${PAGE}" ] || { echo "FAIL: ${PAGE} not found; run npm run build first" >&2; exit 1; }
[ -x "${CHROME}" ] || { echo "FAIL: Chrome not found at ${CHROME}; set CHROME" >&2; exit 1; }

# Serve dist/ briefly: the page uses root-relative asset URLs, which file:// cannot resolve.
PORT=4179
python3 -m http.server "${PORT}" --directory dist >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "${SERVER_PID}" 2>/dev/null || true' EXIT
sleep 1

"${CHROME}" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="${OUT}" "http://localhost:${PORT}/resume.html" 2>/dev/null

echo "Wrote ${OUT}"
