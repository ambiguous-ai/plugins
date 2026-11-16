#!/usr/bin/env bash
# The plugin skill is the served operating guide, https://www.ambiguous.ai/skill.md.
#
# Source and maintenance commands: AGENTS.md.
# Each client discovers skills inside its own package directory, and the
# portable package reads skills/ at the root.
set -euo pipefail
cd "$(dirname "$0")/.."

SOURCE_URL="https://www.ambiguous.ai/skill.md"
SKILL_NAME="ambiguous-workspace"
TARGETS=(
  "skills/ambiguous-workspace/SKILL.md"
  "plugins/ambiguous-claude-code/skills/ambiguous-workspace/SKILL.md"
  "plugins/ambiguous-codex/skills/ambiguous-workspace/SKILL.md"
)

expected=$(mktemp)
trap 'rm -f "$expected"' EXIT
curl --fail --silent --show-error --location "$SOURCE_URL" \
  | awk -v name="$SKILL_NAME" 'NR > 1 && !renamed && /^name: / { print "name: " name; renamed = 1; next } { print }' \
  > "$expected"
grep -q "^name: $SKILL_NAME$" "$expected" || { echo "sync-skills: $SOURCE_URL has no name line to set" >&2; exit 1; }

if [ "${1:-}" = "--check" ]; then
  status=0
  for t in "${TARGETS[@]}"; do
    if ! cmp -s "$expected" "$t"; then
      echo "sync-skills: STALE — $t differs from $SOURCE_URL" >&2
      status=1
    fi
  done
  [ $status -eq 0 ] && echo "sync-skills: OK — ${#TARGETS[@]} copies match $SOURCE_URL"
  exit $status
fi

for t in "${TARGETS[@]}"; do
  mkdir -p "$(dirname "$t")"
  cp "$expected" "$t"
  echo "sync-skills: wrote $t"
done
