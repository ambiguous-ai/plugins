# Ambiguous plugins

Official plugins for [Ambiguous Workspace](https://www.ambiguous.ai) — 17 productivity
apps for humans and AI teammates.

Each plugin teaches its host to work in your workspace through the `ambiguous` CLI.
The CLI runs via `npx`, which installs or uses a cached package. Confirm its version
when troubleshooting; `npx` does not guarantee the latest release on every call.

## Portable Agent Plugin

The root [plugin.json](plugin.json) follows the
[Agent Plugins 1.0 specification](https://agent-plugins.org/specification).
Compatible clients discover the entry skill in `skills/ambiguous-workspace/`.
Repository guidance is in [AGENTS.md](AGENTS.md).

## Cursor

Submit this repository's root `plugin.json` as a portable Agent Plugin. Cursor
supports that format for skills; a `.cursor-plugin` manifest and an MCP server
are not required. See [Cursor's plugin reference](https://cursor.com/docs/reference/plugins).

For a local discovery check, copy `plugin.json`, `skills/`, `README.md` and
`LICENSE` into `~/.cursor/plugins/local/ambiguous/`. Use a real directory:
Cursor skips symlinks to repositories outside its local plugins folder.
Reload Cursor and open **Customize** to confirm `ambiguous-workspace` appears.
Local plugin imports must be enabled; an installed marketplace plugin with the
same name takes precedence over the local copy.

In the project directory where Cursor will run commands, use the workspace's
**Settings → Connect** instructions to authenticate, then ask Cursor to report
its Ambiguous identity and list your documents. Check that it uses the CLI,
confirms the intended workspace, and reads the served `/skill` guide. This
plugin needs Node.js, `npx`, shell execution and access to the npm registry and
the configured workspace origin.

## Connection choice

| Session | Workspace operations | Credential |
| --- | --- | --- |
| Cursor, Claude Code or Codex with a shell | `ambiguous` CLI | Project-local CLI login; `AMBI_API_TOKEN` for environment overrides |
| Hosted connector session without a shell | MCP connector | OAuth held by that host |

Choose one connection for a session. Missing MCP tools in a shell plugin is
expected; check the CLI identity instead. Missing CLI credentials mean the
existing workspace needs connecting, not that a new workspace should be created.

## Claude Code

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous
npx ambiguous auth login --token ak_…
```

If Claude Code is already open, run `/reload-plugins` in that session to activate
the installed skill. It is available as `/ambiguous:ambiguous-workspace`.

## Codex

```bash
codex plugin marketplace add ambiguous-ai/plugins
codex plugin add ambiguous@ambiguous-ai
npx ambiguous auth login --token ak_…
```

## Where the key comes from

**Connect** in your workspace mints one for the identity you choose — yourself, an
agent you manage, or a new agent — and hands you that whole command, key included.

The credential is stored in `.ambi/config.json` **in the directory you ran it from**,
so a second checkout can hold a second agent without either inheriting the other's
identity. `AMBI_API_TOKEN` in the environment overrides it, for a container rebuilt
from an image or a CI job whose secrets come from the runner.

Point at another stack with `AMBI_API_URL=https://app.devambi.cc`.

## Hosted MCP connectors

For a hosted session without shell access, connect over MCP instead — add
`https://app.ambiguous.ai/mcp` as a custom connector and sign in. Sign-in is OAuth
and needs no key: the endpoint answers an unauthenticated tool call with `401` and a
`WWW-Authenticate` pointing at `/.well-known/oauth-protected-resource`, which is
where the flow starts. The server registers the client dynamically (RFC 7591),
requires PKCE `S256`, and binds the token to this resource (RFC 8707).

No plugin here ships an MCP server. MCP is for hosts with no shell; anything with a
shell uses the CLI, where the surface costs nothing until it is called, commands
compose in a pipeline, and a process can hold a socket open.

## What ships

- **`ambiguous-workspace`** — checks the intended identity, then fetches the
  canonical `/skill` guide from the configured workspace origin. That guide owns
  setup, workspace operations and runtime-specific notification handling.

Both plugins carry the same entry skill. `skills/ambiguous-workspace/SKILL.md` is
its source and `./scripts/sync-skills.sh` writes the per-plugin copies. Operating
instructions live in Workspace's served guide so plugin releases cannot leave
customers with a separate event-listening recipe.

## Development

```bash
./scripts/sync-skills.sh --check                      # copies match the source
claude plugin validate .                              # the marketplace manifest
claude plugin validate ./plugins/ambiguous-claude-code
claude plugin marketplace add .                       # a local path works; no publishing needed
```

Codex ships no validator — `codex plugin` is `add`, `list`, `marketplace`, `remove`
(0.148.0) — so `plugins/ambiguous-codex` is checked by installing it from a local
marketplace and confirming the skill loads.

MIT.
