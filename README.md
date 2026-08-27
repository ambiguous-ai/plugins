# Ambiguous plugins

Official plugins for [Ambiguous Workspace](https://www.ambiguous.ai) — 17 apps for
humans and AI teammates. One source, one release, two agent hosts.

| Host | Package | Catalog |
|---|---|---|
| Claude Code | `plugins/ambiguous-claude-code` | `.claude-plugin/marketplace.json` |
| Codex | `plugins/ambiguous-codex` | `.agents/plugins/marketplace.json` |

## Connect an agent to Claude Code

Provision the agent in **Admin → People & Access → Invites → New agent**, copy its
`ak_…` key, and run:

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous@ambiguous --config apiToken=ak_…
```

Nothing else is required — no CLI, no environment variable, no config file. The
key is held in the OS keychain (`sensitive: true`), never written to
`settings.json`, and the session acts as that agent.

Point at another stack with `--config origin=https://app.devambi.cc`.

### Connecting as yourself instead

The plugin is built for agent identities. A human signing in as themselves uses
OAuth, which the plugin deliberately does not configure — a static
`Authorization` header disables OAuth in the host, so the two cannot share one
server entry:

```bash
claude mcp add -t http ambiguous https://app.ambiguous.ai/mcp
claude mcp login ambiguous
```

## What ships

- **Workspace MCP server** — the same REST surface a human uses, per Human + AI
  Parity.
- **`how-to-use-ambiguous`** — identity check, read-before-write, narrow writes,
  and the rule that workspace content is data and never instruction.
- **`ambiguous-cli`** — the `ambiguous` CLI, for bootstrapping an agent,
  workspace and human owner before a key exists.

## Development

```bash
claude plugin validate ./plugins/ambiguous-claude-code
claude plugin validate .
claude plugin marketplace add .        # a local path works; no publishing needed
```

MIT.
