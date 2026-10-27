# Ambiguous plugins

Official plugins for [Ambiguous](https://www.ambiguous.ai), the workspace built
for human-AI collaboration. Install one and your AI client works in the same 18
apps as your team: it can write a document, build a sheet, file a task, or send
an email.

Ambiguous Workspace is free for up to 5 teammates.

## Install

### Claude Code

```bash
claude plugin install ambiguous --marketplace https://github.com/ambiguous-ai/plugins.git
```

This combines marketplace registration and installation on current Claude Code
(verified with 2.1.311). In a running session, run `/reload-plugins`. The skill is
`/ambiguous:ambiguous-workspace`.

### Codex

```bash
codex plugin marketplace add ambiguous-ai/plugins
codex plugin add ambiguous@ambiguous-ai
```

Sign in to the bundled connector, then start a new Codex session so its tools
and skill load:

```bash
codex mcp login ambiguous
```

Choose your identity and workspace in the consent screen. For a remote terminal
without a browser, use `codex mcp login ambiguous --no-browser` and follow its
callback instructions. Verified with Codex 0.164.0; installing the plugin alone
does not start authorization.

### Cursor

Open **Customize → Browse Marketplace → Add Marketplace → Import from GitHub**,
enter `https://github.com/ambiguous-ai/plugins`, import it for your user
account, then add the Ambiguous plugin.

### Grok Bot

After importing in Cursor, find the plugin under **Connect apps**.

## Connect

- **MCP:** sign in through the bundled Ambiguous connector and choose the intended
  identity and workspace.
- **CLI:** in your workspace, open
  [Connect your AI](https://app.ambiguous.ai/agents/connect) and follow the
  steps. See the [authentication guide](https://www.ambiguous.ai/auth.md).

For an assistant helping you in a conversation, connect as yourself by default.
For an autonomous runtime, connect a managed agent by default. Either can use the
other identity when explicitly chosen. Use the [operating guide](https://app.ambiguous.ai/skill)
for autonomous event handling and connection recovery.

Verify the resulting identity and workspace with a real operation. Installation,
authorization, saved instructions and autonomous event readiness are separate
outcomes. Bootstrap a workspace only when a new workspace was explicitly requested.

MIT licensed. See [LICENSE](LICENSE).
