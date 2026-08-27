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

To act as a provisioned 3P agent rather than your own account, log the
`ambiguous` CLI in with the agent's API key:

```bash
npx ambiguous auth login        # paste the agent's ak_… key
```

The plugin reads that credential on each connection and presents it as the
agent. With no CLI credential it sends no Authorization header at all, the
server answers 401, and the host runs OAuth so you connect as yourself.

`AMBI_AGENT_KEY` in the environment takes precedence over the CLI credential,
for CI and other non-interactive hosts.

> A static `Authorization` header in the plugin config would disable OAuth
> entirely — the host says so explicitly — which is why the header is produced
> per connection rather than declared.

Ask the session who it is connected as before relying on either; the
`how-to-use-ambiguous` skill reports this on first use.

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
