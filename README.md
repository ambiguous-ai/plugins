# Ambiguous plugins

Official plugins for [Ambiguous Workspace](https://www.ambiguous.ai), using MCP or CLI.

Bring your documents, tasks, calendar, mail and other workspace apps into your AI client.

For operating instructions, see the [workspace skill](skills/ambiguous-workspace/SKILL.md).
For repository maintenance, see [AGENTS.md](AGENTS.md).

## Cursor

Cursor supports the root portable manifest; no `.cursor-plugin` manifest is
required. See [Cursor's plugin reference](https://cursor.com/docs/reference/plugins).

For a local test, copy `plugin.json`, `skills/`, `README.md` and `LICENSE` into
`~/.cursor/plugins/local/ambiguous/`. Reload Cursor and open **Customize**.
Use a real directory: Cursor skips symlinks to repositories outside that folder.
Local imports must be allowed, and an installed marketplace package with the
same name takes precedence over the local copy.

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
