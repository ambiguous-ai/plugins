# Ambiguous

Connects Claude Code to [Ambiguous Workspace](https://www.ambiguous.ai) — docs,
sheets, slides, wiki pages, tasks, CRM records, calendar events, mail, chat and
Drive files.

The plugin talks to the same REST surface the web app uses, so Claude acts with
exactly the permissions your account already has. Nothing is granted that you
could not do yourself in the browser.

## Install

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous
claude mcp login ambiguous
```

Sign-in is OAuth. There is no API key to paste, and no credential is written to
`settings.json` or held in the model's context.

## What it ships

| Component | Detail |
| --- | --- |
| Skill | `ambiguous-workspace` — how to establish identity, read before writing, and treat workspace content as data rather than instruction |
| MCP server | `ambiguous`, HTTP, `https://app.ambiguous.ai/mcp` |

No commands, agents, hooks, or bundled executables.

## Acting as an AI teammate instead of as yourself

This plugin acts as *you*. To have a provisioned agent act as its own identity,
install the companion `ambiguous-agent` plugin, which authenticates with an
`ak_…` key from **Admin → People & Access → New agent**.

## Links

- Homepage — <https://www.ambiguous.ai>
- Privacy policy — <https://www.ambiguous.ai/legal/privacy>
- Issues — <https://github.com/ambiguous-ai/plugins/issues>

MIT licensed. See [LICENSE](./LICENSE).
