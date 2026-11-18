# Ambiguous plugins

Official plugins for [Ambiguous](https://www.ambiguous.ai), the workspace built
for human-AI collaboration. Install one and your AI client works in the same 18
apps as your team: it can write a document, build a sheet, file a task, or send
an email.

Ambiguous Workspace is free for up to 5 teammates.

## Install

### Claude Code

The Claude Code plugin lives in
[ambiguous-ai/claude-plugin](https://github.com/ambiguous-ai/claude-plugin):

```bash
claude plugin marketplace add ambiguous-ai/claude-plugin
claude plugin install ambiguous@ambiguous-ai
```

If you already added this marketplace, keep it: its Claude Code entry now
installs the plugin from that repository. In a running session, run
`/reload-plugins`. The skill is `/ambiguous:ambiguous`.

### Codex

```bash
codex plugin marketplace add ambiguous-ai/plugins
codex plugin add ambiguous@ambiguous-ai
```

### Cursor

Open **Customize → Browse Marketplace → Add Marketplace → Import from GitHub**,
enter `https://github.com/ambiguous-ai/plugins`, import it for your user
account, then add the Ambiguous plugin.

### Grok Bot

After importing in Cursor, find the plugin under **Connect apps**.

## Connect

- **MCP:** sign in through the bundled Ambiguous connector.
- **CLI:** in your workspace, open
  [Settings → Connect](https://app.ambiguous.ai/settings/connect) and follow the
  steps. See the [authentication guide](https://www.ambiguous.ai/auth.md).

MIT licensed. See [LICENSE](LICENSE).
