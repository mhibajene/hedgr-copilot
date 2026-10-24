#!/usr/bin/env bash
set -euo pipefail

full() {
  echo 'docs_only=false'
  exit 0
}

base=${1:-}
head=${2:-}
[[ -n "$base" && -n "$head" ]] || full
git rev-parse --verify --end-of-options "${base}^{commit}" >/dev/null 2>&1 || full
git rev-parse --verify --end-of-options "${head}^{commit}" >/dev/null 2>&1 || full
merge_base=$(git merge-base "$base" "$head") || full
[[ -n "$merge_base" ]] || full
changes=$(mktemp)
trap 'rm -f "$changes"' EXIT
git diff --no-ext-diff --no-textconv --name-status -z --find-renames "$merge_base" "$head" -- > "$changes" || full

paths=()
while IFS= read -r -d '' status; do
  IFS= read -r -d '' path || full
  paths+=("$path")
  case "$status" in
    R*|C*)
      IFS= read -r -d '' path || full
      paths+=("$path")
      ;;
    A|M|D|T|U|X|B) ;;
    *) full ;;
  esac
done < "$changes"
[[ ${#paths[@]} -gt 0 ]] || full

for path in "${paths[@]}"; do
  printf 'Classified path: %q\n' "$path" >&2
  case "$path" in
    apps/*|packages/*|scripts/*|.github/*|docs/ops/about-external/*) full ;;
    docs/*|*.md) ;;
    *) full ;;
  esac
done

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    printf 'E2E SKIPPED: docs-only diff. Playwright did not run.\n'
    printf '%q\n' "${paths[@]}"
  } >> "$GITHUB_STEP_SUMMARY"
fi
echo 'docs_only=true'
