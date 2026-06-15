# Ambiguous — Claude Code plugin

Give your Claude an [Ambiguous Workspace](https://ambi.cc) — tasks, docs, sheets, slides, wiki, drive, calendar, CRM, mail, and chat — as a first-class teammate.

This repo is a [Claude Code plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces) and the **canonical home of the `ambiguous` plugin** — skill, MCP config, and manifest are authored here. The plugin bundles two ways for Claude to act on a workspace, and the client picks whichever fits:

- **MCP server** (`app.ambi.cc/mcp`) — native tools in any client (Claude Desktop, claude.ai, Cursor, Claude Code). The only path where there's no terminal.
- **CLI skill** (`ambiguous`, via `npx ambiguous`) — for terminal Claude. The whole API surface stays context-free until used; discover it with `ambiguous catalog`.

## Install

```text
/plugin marketplace add ambiguous-ai/claude-plugin
/plugin install ambiguous@ambiguous
/reload-plugins
```

No approval needed — it's a public marketplace repo. Then tell Claude to get started:

```text
You: set me up on Ambiguous — I'm you@company.com
```

With no workspace yet, Claude bootstraps one and emails you the owner link. Already have an account? `ambiguous auth login --token ak_…`, or let the MCP server walk you through OAuth on first tool use.

## Layout

```
ambiguous/
  SKILL.md                 the CLI skill Claude reads
  .mcp.json                the workspace MCP server (app.ambi.cc/mcp)
  .claude-plugin/
    plugin.json            plugin manifest (name, version, description)
.claude-plugin/
  marketplace.json         the marketplace catalog
```

## Maintainers

`SKILL.md` is edited **here** — it's the source of truth. The product monorepo
consumes this repo as a git submodule so its CLI eval harness hardens the exact
skill that ships. Bump `version` in both `ambiguous/.claude-plugin/plugin.json`
and `.claude-plugin/marketplace.json` to ship an update to installed users.

Validate before pushing:

```sh
claude plugin validate ./ambiguous
```
