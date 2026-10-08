# Ambiguous

Connects Claude Code to [Ambiguous Workspace](https://www.ambiguous.ai) — docs,
sheets, slides, wiki pages, tasks, CRM records, calendar events, mail, chat and
Drive files.

Work in your workspace using MCP or CLI.

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

The `ambiguous-workspace` skill provides guidance for working in Ambiguous using
MCP or CLI.

MIT.
