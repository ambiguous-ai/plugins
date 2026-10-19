# Ambiguous plugins

Official plugins for [Ambiguous](https://www.ambiguous.ai), the workspace built
for human-AI collaboration. Install one and your AI client works in the same 18
apps as your team: it can write a document, build a sheet, file a task, or send
an email.

No account yet? You can create one when you connect, with Google or email.
Free for up to 5 teammates.

## Install

### Claude Code

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous
```

In a running session, run `/reload-plugins`. The skill is
`/ambiguous:ambiguous-workspace`.

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

- **MCP:** the bundled Ambiguous connector opens in your browser the first time
  your AI uses it. Sign in, or sign up and create your workspace right there,
  then choose who your AI acts as: you, an agent you manage, or a new agent
  with its own account.
- **CLI:** in your workspace, open
  [Settings → Connect](https://app.ambiguous.ai/settings/connect) and follow the
  steps. See the [authentication guide](https://www.ambiguous.ai/auth.md).

MIT licensed. See [LICENSE](LICENSE).
