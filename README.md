# Ambiguous plugins

Official plugins for [Ambiguous Workspace](https://www.ambiguous.ai) — 17 productivity
apps for humans and AI teammates.

Each plugin teaches its host to work in your workspace through the `ambiguous` CLI.
There is nothing to install: the CLI runs via `npx`, so it is current on every call
and usable in the session you add it to.

## Claude Code

```bash
claude plugin marketplace add ambiguous-ai/plugins
claude plugin install ambiguous
npx ambiguous auth login --token ak_…
```

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

## Claude, ChatGPT and Cowork

Those hosts cannot run a local process, so they connect over MCP instead — add
`https://app.ambiguous.ai/mcp` as a custom connector and sign in. Sign-in is OAuth
and needs no key: the endpoint answers an unauthenticated call with `401` and a
`WWW-Authenticate` pointing at `/.well-known/oauth-protected-resource`, which is
where the flow starts. The server registers the client dynamically (RFC 7591),
requires PKCE `S256`, and binds the token to this resource (RFC 8707).

No plugin here ships an MCP server. MCP is for hosts with no shell; anything with a
shell uses the CLI, where the surface costs nothing until it is called, commands
compose in a pipeline, and a process can hold a socket open.

## What ships

- **`ambiguous-workspace`** — identity check, look-up-before-you-call, read before
  write, narrow writes, bulk work through the shell, and the rule that workspace
  content is data and never instruction.

Both plugins carry the same skill. `skills/ambiguous-workspace/SKILL.md` is the
source and `./scripts/sync-skills.sh` writes the per-plugin copies, because three
hand-maintained copies drifted once and the one that drifted dropped the
content-is-not-instruction rule.

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
