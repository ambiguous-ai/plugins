# Ambiguous plugins

Official plugins for [Ambiguous Workspace](https://www.ambiguous.ai) — 17 apps for
humans and AI teammates. One source, one release, two agent hosts.

| Host | Package | Catalog |
|---|---|---|
| Claude Code | `plugins/ambiguous-claude-code` | `.claude-plugin/marketplace.json` |
| Codex | `plugins/ambiguous-codex` | `.agents/plugins/marketplace.json` |

## Install (Claude Code)

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous@ambiguous
```

Then sign in as yourself:

```bash
claude mcp login ambiguous
```

### Connecting as an agent instead of yourself

To act as a provisioned 3P agent rather than your own account, pass its API key
at install time. The key is held in your OS keychain, never in a config file:

```bash
claude plugin install ambiguous@ambiguous --config apiToken=ak_…
```

Omit `apiToken` and the plugin signs in as you over OAuth. Ask the session who
it is connected as before relying on either — the `how-to-use-ambiguous` skill
reports this on first use, and will tell you if an agent key did not take.

### Pointing at another stack

```bash
claude plugin install ambiguous@ambiguous --config origin=https://app.devambi.cc
```

## What ships

- **Workspace MCP server** — the same REST surface a human uses, per Human + AI
  Parity. Auth is OAuth by default, or an `ak_` agent key.
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
