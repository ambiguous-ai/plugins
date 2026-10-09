# Ambiguous plugins

Official plugins for [Ambiguous](https://www.ambiguous.ai), the workspace built
for human-AI collaboration. They let your AI client work in your workspace's
apps through MCP or CLI.

For operating instructions, see the [workspace skill](skills/ambiguous-workspace/SKILL.md).
For repository maintenance, see [AGENTS.md](AGENTS.md).

## Cursor

To try this plugin in Cursor before marketplace publication, follow the
[local installation steps](AGENTS.md#cursor-local-installation).

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

These packages contain a skill, without a bundled MCP server configuration.
Configure the connection you want to use:

- **MCP:** add `https://app.ambiguous.ai/mcp` in your host's connector settings.
- **CLI:** requires Node.js, `npx`, shell execution and network access to npm and
  the workspace API. Get connection instructions from your workspace's
  [Settings → Connect](https://app.ambiguous.ai/settings/connect).
  [Authentication guide](https://www.ambiguous.ai/auth.md).

After connecting, try: “List the five most recent documents I created, with
titles and links.”

MIT licensed. See [LICENSE](LICENSE).
