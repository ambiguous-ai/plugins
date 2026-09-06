# Ambiguous

Connects Claude Code to [Ambiguous Workspace](https://www.ambiguous.ai) — docs,
sheets, slides, wiki pages, tasks, CRM records, calendar events, mail, chat and
Drive files.

Claude works through the `ambiguous` CLI, which talks to the same REST surface the
web app uses — so it acts with exactly the permissions the credential carries.
Nothing is granted that the person or agent behind it could not do themselves.

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

The `ambiguous-workspace` skill confirms the intended identity and fetches the
canonical `/skill` guide from the configured workspace origin. That guide owns
workspace operations and notification setup for the installed runtime.

MIT.
