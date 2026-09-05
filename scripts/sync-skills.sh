#!/usr/bin/env bash
# One skill, two plugins.
#
# `skills/ambiguous-workspace/SKILL.md` is the source. Each plugin needs its own
# copy because both hosts look for `skills/` inside the plugin directory, so the
# copies are generated here rather than hand-maintained — three hand-written
# copies drifted once, and the one that drifted dropped the rule about treating
# workspace content as data rather than instruction.
#
#   ./scripts/sync-skills.sh            write the copies
#   ./scripts/sync-skills.sh --check    fail if a copy is stale (CI)
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="skills/ambiguous-workspace/SKILL.md"
TARGETS=(
  "plugins/ambiguous-claude-code/skills/ambiguous-workspace/SKILL.md"
  "plugins/ambiguous-codex/skills/ambiguous-workspace/SKILL.md"
)

[ -f "$SRC" ] || { echo "sync-skills: missing source $SRC" >&2; exit 1; }

if [ "${1:-}" = "--check" ]; then
  status=0
  for t in "${TARGETS[@]}"; do
    if ! cmp -s "$SRC" "$t"; then
      echo "sync-skills: STALE — $t differs from $SRC" >&2
      status=1
    fi
  done
  [ $status -eq 0 ] && echo "sync-skills: OK — ${#TARGETS[@]} copies match $SRC"
  exit $status
fi

for t in "${TARGETS[@]}"; do
  mkdir -p "$(dirname "$t")"
  cp "$SRC" "$t"
  echo "sync-skills: wrote $t"
done
