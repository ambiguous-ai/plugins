# Maintaining Ambiguous plugins

Each kind of guidance has one source:

| Owns | Source |
| --- | --- |
| Agent operating instructions | `skills/ambiguous-workspace/SKILL.md` |
| Shared plugin metadata | `plugin.json` |
| Client-specific metadata and package paths | Client manifests and marketplace manifests |
| Installation and connection setup | `README.md` |
| Repository maintenance | This file |

Edit sources, not generated values. After changing the skill, run
`./scripts/sync-skills.sh`. After changing shared metadata, run
`node scripts/sync-manifests.mjs`. Client packages need their own files, so
synchronization generates the required copies without separate authorship.

Before submitting:

```bash
./scripts/sync-skills.sh --check
node scripts/sync-manifests.mjs --check
claude plugin validate .
claude plugin validate ./plugins/ambiguous-claude-code
git diff --check
```

For Cursor, use the local installation steps below to test discovery. For Codex,
verify skill loading through a local marketplace install; the CLI has no plugin validator.
For behavior changes, exercise the affected path in a fresh agent chat and report
what was actually verified.

For Cursor marketplace review, submit the public repository at
https://cursor.com/marketplace/publish. The root manifest uses the portable
Agent Plugins format; client packages remain in `plugins/`.

Never commit credentials, `.ambi/config.json` or environment files.

## Cursor local installation

Cursor supports the root portable manifest; no `.cursor-plugin` manifest is
required. See [Cursor's plugin reference](https://cursor.com/docs/reference/plugins).

Copy `plugin.json`, `skills/`, `README.md` and `LICENSE` into
`~/.cursor/plugins/local/ambiguous/`. Reload Cursor and open **Customize**.
Use a real directory: Cursor skips symlinks to repositories outside that folder.
Local imports must be allowed, and an installed marketplace package with the
same name takes precedence over the local copy.
