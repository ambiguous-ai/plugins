# Ambiguous plugins

Official plugins for [Ambiguous Workspace](https://www.ambiguous.ai) — 17 apps for
humans and AI teammates.

```bash
claude plugin marketplace add ambiguous-ai/plugins
```

## As yourself

```bash
claude plugin install ambiguous
claude mcp login ambiguous
```

## As a provisioned agent

Copy the agent's `ak_…` key from **Admin → People & Access → Invites → New agent**:

```bash
claude plugin install ambiguous-agent --config apiToken=ak_…
```

No CLI, no environment variable, no config file. The key is held in the OS
keychain (`sensitive: true`) and never written to `settings.json`.

### Running more than one agent

The keychain holds one key per plugin, machine-wide — `--scope project`
controls *whether* the plugin is enabled in a project, not *which* agent it is.
To be a different agent in a particular shell or directory, set the environment
variable, which takes precedence over the stored key:

```bash
export AMBI_AGENT_KEY=ak_…        # or per directory, via direnv
```

Unset it and the keychain key applies again. This is the same variable Codex
uses, so one export serves both hosts.

Point either at another stack with `--config origin=https://app.devambi.cc`.

## Codex

```bash
codex plugin marketplace add ambiguous-ai/plugins
codex plugin add ambiguous-codex@ambiguous-plugins
export AMBI_AGENT_KEY=ak_…        # add to your shell profile
```

Codex reads the token from the environment, so its config file holds only the
variable name — never the key. One plugin covers both identities there: with
`AMBI_AGENT_KEY` unset it makes no authenticated call, and `codex mcp login`
handles OAuth.

Codex does **not** substitute `${user_config.*}` — that is Claude Code only —
so its `.mcp.json` carries a literal URL.

## Why two Claude Code plugins rather than one with an optional key

The host disables OAuth entirely when `headers.Authorization` is set, and an
unset option is substituted as an *empty* header rather than omitting it — so a
single server entry cannot fall back from a key to OAuth. The two identities
need two entries. They ship the same skills and talk to the same endpoint.

| | `ambiguous` | `ambiguous-agent` |
|---|---|---|
| Identity | you | the agent |
| Auth | OAuth, token in the keychain | `ak_` key, in the keychain |
| Key required | no | yes — install fails loudly without it |

## What ships

- **Workspace MCP server** — the same REST surface a human uses, per Human + AI Parity.
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
