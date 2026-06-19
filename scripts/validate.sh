#!/usr/bin/env bash
#
# Pre-deploy validation for a static site directory.
# Generic and reusable: configured entirely through environment variables.
#
#   SRC_DIR          directory to validate            (default: site)
#   EXPECTED_CONTENT string that must appear in index.html, if set
#
set -euo pipefail

SRC_DIR="${SRC_DIR:-site}"

fail() { echo "FAIL: $*" >&2; exit 1; }

echo "Validating ${SRC_DIR}/ ..."

# Directory and a non-empty index.html must exist.
[ -d "${SRC_DIR}" ]                || fail "${SRC_DIR}/ directory not found"
[ -s "${SRC_DIR}/index.html" ]     || fail "${SRC_DIR}/index.html missing or empty"

# index.html must be a complete document, not a truncated/garbled file.
grep -qi '</html>' "${SRC_DIR}/index.html" \
  || fail "index.html has no closing </html> tag (truncated?)"

# Optional content marker (catches an empty or wrong page being shipped).
if [ -n "${EXPECTED_CONTENT:-}" ]; then
  grep -qF "${EXPECTED_CONTENT}" "${SRC_DIR}/index.html" \
    || fail "index.html missing expected content '${EXPECTED_CONTENT}'"
fi

# Junk files that should never be published.
if find "${SRC_DIR}" -name '.DS_Store' -o -name 'Thumbs.db' | grep -q .; then
  fail "junk file(s) present in ${SRC_DIR}/ (.DS_Store / Thumbs.db) — exclude them from the deploy"
fi

# Every local asset referenced in index.html must actually exist.
# External (http:, mailto:, tel:, data:) and in-page anchor (#) links are
# skipped: the regex excludes any ref containing ':' or '#'.
missing=0
while IFS= read -r ref; do
  [ -n "${ref}" ] || continue
  base="${ref%%\?*}"                 # drop ?v=N cache-busting query
  [ -f "${SRC_DIR}/${base}" ] || { echo "FAIL: referenced asset not found: ${ref}" >&2; missing=1; }
done < <(grep -oE '(href|src)="[^"#:]+"' "${SRC_DIR}/index.html" | cut -d'"' -f2 | sort -u)
[ "${missing}" -eq 0 ] || fail "broken asset reference(s) in index.html"

echo "Validation passed."
