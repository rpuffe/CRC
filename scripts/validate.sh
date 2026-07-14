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

shopt -s nullglob
html_files=("${SRC_DIR}"/*.html)
[ "${#html_files[@]}" -gt 0 ] || fail "no HTML files found in ${SRC_DIR}/"

# Optional content marker (catches an empty or wrong page being shipped).
if [ -n "${EXPECTED_CONTENT:-}" ]; then
  grep -qF "${EXPECTED_CONTENT}" "${SRC_DIR}/index.html" \
    || fail "index.html missing expected content '${EXPECTED_CONTENT}'"
fi

# Junk files that should never be published.
if find "${SRC_DIR}" -name '.DS_Store' -o -name 'Thumbs.db' | grep -q .; then
  fail "junk file(s) present in ${SRC_DIR}/ (.DS_Store / Thumbs.db) — exclude them from the deploy"
fi

# Every HTML document must be complete and every referenced local asset or page
# must exist. External URLs and in-page anchors are skipped.
missing=0
for html_file in "${html_files[@]}"; do
  grep -qi '</html>' "${html_file}" \
    || { echo "FAIL: ${html_file} has no closing </html> tag (truncated?)" >&2; missing=1; }

  while IFS= read -r ref; do
    [ -n "${ref}" ] || continue
    base="${ref%%\?*}"               # drop ?v=N cache-busting query
    [ -f "${SRC_DIR}/${base}" ] \
      || { echo "FAIL: ${html_file} references missing file: ${ref}" >&2; missing=1; }
  done < <(grep -oE '(href|src)="[^"#:]+"' "${html_file}" | cut -d'"' -f2 | sort -u)
done
[ "${missing}" -eq 0 ] || fail "HTML validation failed"

echo "Validation passed."
