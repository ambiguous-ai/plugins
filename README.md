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

These packages include the workspace skill and hosted MCP connector. Use either
connection:

- **MCP:** authenticate the bundled Ambiguous connector in your host to complete
  the browser OAuth flow. Its endpoint is `https://app.ambiguous.ai/mcp`; no API
  address or token needs to be pasted. Choose yourself or an agent you manage on
  the consent screen.
- **CLI:** requires Node.js, `npx`, shell execution and network access to npm and
  the workspace API. Get connection instructions from your workspace's
  [Settings → Connect](https://app.ambiguous.ai/settings/connect).
  [Authentication guide](https://www.ambiguous.ai/auth.md).

After connecting, the skill saves the included workspace defaults in the
harness's persistent instructions and verifies them by reading them back.
If MCP and CLI are both configured, the skill checks their identities before
choosing a connection.

After connecting, try: “List the five most recent documents I created, with
titles and links.”

MIT licensed. See [LICENSE](LICENSE).
