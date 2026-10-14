# Ambiguous plugins

Official plugins for [Ambiguous](https://www.ambiguous.ai), the workspace built
for human-AI collaboration. They let your AI client work in your workspace's
apps through MCP or CLI.

For operating instructions, see the [workspace skill](skills/ambiguous-workspace/SKILL.md).
For repository maintenance, see [AGENTS.md](AGENTS.md).

## Cursor and Grok Bot

In Cursor, open **Customize → Browse Marketplace → Add Marketplace → Import from
GitHub** and enter `https://github.com/ambiguous-ai/plugins`. Import it for your
user account, then add the Ambiguous plugin. In Grok Bot, find the imported plugin
under **Connect apps**.

Contributors testing unpublished changes can use the
[local developer preview](AGENTS.md#local-developer-preview-in-cursor).

## Claude Code

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous
```

In an existing session, run `/reload-plugins` to activate the installed skill.
It is available as `/ambiguous:ambiguous-workspace`.

## Codex

```bash
codex plugin marketplace add ambiguous-ai/plugins
codex plugin add ambiguous@ambiguous-ai
```

## Connect

- **MCP:** sign in through the bundled Ambiguous connector.
- **CLI:** get connection instructions from your workspace's
  [Settings → Connect](https://app.ambiguous.ai/settings/connect).
  [Authentication guide](https://www.ambiguous.ai/auth.md).

MIT licensed. See [LICENSE](LICENSE).
