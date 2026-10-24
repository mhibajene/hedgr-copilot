#!/usr/bin/env bash
set -euo pipefail
script_dir=$(cd "$(dirname "$0")" && pwd)
classifier="$script_dir/ci-eff-001-docs-only.sh"
scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
export GIT_AUTHOR_NAME=CI-EFF-001 GIT_COMMITTER_NAME=CI-EFF-001
export GIT_AUTHOR_EMAIL=ci-eff-001@example.invalid GIT_COMMITTER_EMAIL=ci-eff-001@example.invalid
count=0

new_repo() {
  count=$((count + 1))
  mkdir "$scratch/$count"
  cd "$scratch/$count"
  git init -q
  git config commit.gpgsign false
  git config core.hooksPath /dev/null
  printf 'initial\n' > initial.txt
  git add .
  git commit -qm initial
  base=$(git rev-parse HEAD)
}
file() {
  mkdir -p "$(dirname "./$1")"
  printf 'CI-EFF-001 fixture\n' > "$1"
}
commit() {
  git add -A
  git commit -qm 'CI-EFF-001 fixture'
}
expect() {
  name=$1
  expected=$2
  actual=$(GITHUB_STEP_SUMMARY="$scratch/summary-$count" bash "$classifier" "$base" HEAD)
  [[ "$actual" == "docs_only=$expected" ]] || { echo "FAIL: $name ($actual)"; exit 1; }
  if [[ "$expected" == true ]]; then
    IFS= read -r first_line < "$scratch/summary-$count"
    [[ "$first_line" == 'E2E SKIPPED: docs-only diff. Playwright did not run.' ]]
  else
    [[ ! -e "$scratch/summary-$count" ]]
  fi
  echo "PASS: $name"
}
check() {
  name=$1
  expected=$2
  shift 2
  new_repo
  for path in "$@"; do file "$path"; done
  commit
  expect "$name" "$expected"
}

check docs-only true docs/example.md docs/example.json
check about-external false docs/ops/about-external/x.md
check mixed-docs-app false docs/example.md apps/frontend/example.ts
check .github false .github/example.yml
check root-README true README.md
new_repo
expect empty-diff false
check RAP-JSON-only true docs/ops/bridge/repo-authority-projection.json
check AGENTS-STATUS-RAP true AGENTS.md docs/ops/HEDGR_STATUS.md docs/ops/bridge/repo-authority-projection.json
check history-only true docs/ops/history/example.json
check STATUS-script false docs/ops/HEDGR_STATUS.md scripts/bridge/rap-provenance-rebind.test.mjs
for prefix in apps packages scripts .github; do
  check "denied-prefix-markdown-$prefix" false "$prefix/example.md"
done
check unusual-filenames true 'docs/a b.json' $'docs/a\tb.md' $'docs/a\nb.md' 'docs/$(false)`false`.md' '-leading.md'
check unusual-denied-filename false $'apps/a\nb.md'
check other-path false example.json
new_repo
base=0000000000000000000000000000000000000000
expect missing-base false
new_repo
file docs/example.md
commit
real_git=$(command -v git)
mkdir "$scratch/bin"
printf '#!/usr/bin/env bash\nexit 1\n' > "$scratch/bin/git"
chmod +x "$scratch/bin/git"
actual=$(PATH="$scratch/bin:$PATH" bash "$classifier" "$base" HEAD)
[[ "$actual" == docs_only=false ]]
echo 'PASS: git-failure'
# Let object/range resolution succeed, then fail the diff itself.
printf '#!/usr/bin/env bash\nif [[ "$1" == diff ]]; then exit 1; fi\nexec "%s" "$@"\n' "$real_git" > "$scratch/bin/git"
actual=$(PATH="$scratch/bin:$PATH" bash "$classifier" "$base" HEAD)
[[ "$actual" == docs_only=false ]]
echo 'PASS: diff-failure'
for direction in into-denied out-of-denied; do
  new_repo
  if [[ "$direction" == into-denied ]]; then old=docs/example.md; new=apps/example.md; else old=apps/example.md; new=docs/example.md; fi
  file "$old"
  commit
  base=$(git rev-parse HEAD)
  mkdir -p "$(dirname "$new")"
  git mv "$old" "$new"
  commit
  expect "rename-$direction" false
 done
new_repo
common=$base
file apps/base-only.md
commit
base=$(git rev-parse HEAD)
git checkout -q --detach "$common"
file docs/head-only.json
commit
expect merge-base-complete-diff true
# Exercise the actual workflow fallback with a missing script, then a failing script.
wrapper=$(awk '/          if ! bash .github\/scripts\/ci-eff-001-docs-only.sh/ {p=1} p && /^      - name:/ {exit} p {sub(/^          /, ""); print}' "$script_dir/../workflows/e2e-smoke.yml")
[[ -n "$wrapper" ]]
for failure in missing-script failing-script; do
  new_repo
  if [[ "$failure" == failing-script ]]; then
    mkdir -p .github/scripts
    printf 'exit 17\n' > .github/scripts/ci-eff-001-docs-only.sh
  fi
  GITHUB_OUTPUT="$scratch/fallback-$count" PR_BASE="$base" PR_HEAD=HEAD bash -e -c "$wrapper"
  [[ $(cat "$scratch/fallback-$count") == docs_only=false ]]
  echo "PASS: script-failure-$failure"
done
echo 'CI-EFF-001 classifier cases passed.'
