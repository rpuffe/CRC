#!/usr/bin/env bash
#
# Post-deploy smoke test for a static site.
# Generic and reusable: configured entirely through environment variables.
#
#   SITE_URL         base URL to check, e.g. https://example.com   (required)
#   EXPECTED_CONTENT string that must appear on the homepage, if set
#   COUNTER_API      visitor-counter endpoint; checked only if set
#   RETRIES          attempts before giving up on the homepage      (default: 5)
#   RETRY_DELAY      seconds between attempts                        (default: 5)
#
set -euo pipefail

: "${SITE_URL:?SITE_URL is not set; apply the CloudFormation stack update first}"
RETRIES="${RETRIES:-5}"
RETRY_DELAY="${RETRY_DELAY:-5}"

fail() { echo "FAIL: $*" >&2; exit 1; }

# curl with sane defaults: follow redirects, fail on HTTP errors, bounded time.
fetch() { curl -sfL --max-time 15 "$@"; }

echo "Smoke testing ${SITE_URL} ..."

# 1. Homepage responds 200, retrying to ride out edge propagation / cold starts.
code=""
for attempt in $(seq 1 "${RETRIES}"); do
  code=$(curl -sL -o /dev/null --max-time 15 -w "%{http_code}" "${SITE_URL}" || true)
  [ "${code}" = "200" ] && break
  echo "  attempt ${attempt}/${RETRIES}: HTTP ${code:-000}, retrying in ${RETRY_DELAY}s..."
  sleep "${RETRY_DELAY}"
done
[ "${code}" = "200" ] || fail "site returned HTTP ${code:-000} after ${RETRIES} attempts"
echo "OK: ${SITE_URL} -> 200"

# 2. Homepage serves expected content (if configured).
# Body is captured first; matching via here-string avoids a pipefail/SIGPIPE
# false negative (grep -q closes the pipe before curl finishes writing).
if [ -n "${EXPECTED_CONTENT:-}" ]; then
  body=$(fetch "${SITE_URL}") || fail "could not fetch ${SITE_URL}"
  grep -qF "${EXPECTED_CONTENT}" <<<"${body}" \
    || fail "live site missing expected content '${EXPECTED_CONTENT}'"
  echo "OK: expected content present"
fi

# 3. Visitor counter API healthy (only if this site has one).
if [ -n "${COUNTER_API:-}" ]; then
  body=$(fetch "${COUNTER_API}") || fail "counter API unreachable"
  grep -qE '"count"[[:space:]]*:[[:space:]]*[0-9]+' <<<"${body}" \
    || fail "bad counter response: ${body}"
  echo "OK: counter API healthy -> ${body}"
fi

echo "All smoke tests passed. Deploy verified."
