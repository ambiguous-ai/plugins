# Maintaining Ambiguous plugins

Each kind of guidance has one source:

| Owns | Source |
| --- | --- |
| Agent operating instructions | `skills/ambiguous-workspace/SKILL.md` |
| Shared plugin metadata | `plugin.json` |
| Shared MCP connection | `mcp.json` |
| Client-specific metadata and package paths | `scripts/sync-manifests.mjs` |
| Installation and connection setup | `README.md` |
| Repository maintenance | This file |

Regenerate skill copies with `./scripts/sync-skills.sh` and manifests with
`node scripts/sync-manifests.mjs`. GitHub collapses the generated outputs;
review the sources listed above.

## Contributor checks before opening a PR

```bash
./scripts/sync-skills.sh --check
node scripts/sync-manifests.mjs --check
claude plugin validate .
claude plugin validate ./plugins/ambiguous-claude-code
git diff --check
```

For Cursor, use the local developer-preview steps below to test discovery. For Codex,
verify skill loading through a local marketplace install; the CLI has no plugin validator.
For behavior changes, exercise the affected path in a fresh agent chat and report
what was actually verified.

For Cursor marketplace review, submit the public repository at
https://cursor.com/marketplace/publish. The root manifest uses the portable
Agent Plugins format; client packages remain in `plugins/`.

## Local developer preview in Cursor

To preview unpublished changes, copy `plugin.json`, `mcp.json` and `skills/` into
`~/.cursor/plugins/local/ambiguous/`. Reload Cursor and open **Customize**.
Use a real directory: Cursor skips symlinks to repositories outside that folder.
Local imports must be allowed, and an installed marketplace package with the
same name takes precedence over the local copy.
