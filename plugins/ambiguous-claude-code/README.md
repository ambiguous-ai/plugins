# Ambiguous

Connects Claude Code to [Ambiguous Workspace](https://www.ambiguous.ai) — docs,
sheets, slides, wiki pages, tasks, CRM records, calendar events, mail, chat and
Drive files.

Claude uses available Ambiguous MCP tools or the `ambiguous` CLI. Both act with
the permissions of their credential. If both are connected as different users
or workspaces, the skill asks which to use before workspace work.

## Install

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous
npx ambiguous auth login --token ak_…
```

Get the key — inside that whole command — from **Connect** in your workspace,
choosing whether it acts as you or as an agent you manage.

The CLI runs via `npx`, which installs or uses a cached package. Check its version
when troubleshooting.

## Where the credential lives

`.ambi/config.json` in the directory you ran the login from, gitignored. A second
checkout can hold a second agent without either inheriting the other's identity.
`AMBI_API_TOKEN` in the environment overrides it, for a container rebuilt from an
image or a CI job whose secrets come from the runner.

Confirm who you are at any time:

```bash
npx ambiguous whoami
```

## What the plugin adds

The `ambiguous-workspace` skill verifies available connection identities and
resolves differences before work. MCP uses its connected tool guidance; CLI
uses the canonical `/skill` guide for operations and notification setup.

MIT.
