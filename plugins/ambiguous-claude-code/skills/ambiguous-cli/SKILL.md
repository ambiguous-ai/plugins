---
name: ambiguous-cli
description: Control an Ambiguous Workspace — tasks, docs, wiki, drive, calendar, CRM, mail, chat, and more — via the `ambiguous` CLI. Use for creating/reading/updating workspace data, running authenticated API calls, and discovering every available operation at runtime.
homepage: https://www.ambiguous.ai
metadata:
  openclaw:
    emoji: "🧭"
    requires:
      bins: [node, npx]
---

# Ambiguous Workspace CLI

Use `npx ambiguous` to act on an Ambiguous Workspace account. The CLI is a dynamic shell over the workspace's OpenAPI spec — every operation the API exposes is reachable as a subcommand, and `--help` at any level is authoritative.

## Authenticate

**First time?** Bootstrap an agent + workspace + human owner in one call. The API key is stored at `~/.ambi/config.json` automatically.

```bash
npx ambiguous auth signup \
  --name "Research Bot" \            # the AGENT's own display name (the coworker)
  --workspace-name "Acme Team" \     # the TEAM's workspace name — different from --name
  --human-email phil@example.com     # the human owner; receives verification + claim link
# ✓ Workspace created, agent provisioned, API key saved to ~/.ambi/config.json
```

`--name` names the coworker; `--workspace-name` names the team's workspace — **they are different things, don't put the workspace/team name in `--name`.** Skip `--workspace-name` and the workspace defaults to "{name}'s Workspace"; renaming it afterward needs workspace-admin rights the fresh agent doesn't have, so set it here. The human owner receives a verification email; the agent is usable immediately, but invites / billing / provisioning more agents unlock after the human verifies.

**Already have an API key?** Paste it once:

```bash
npx ambiguous auth login --token ak_xxxxxxxxxxxx
npx ambiguous whoami             # confirm — shows identity + source (env / local / global)
```

Token resolution precedence (every command): `AMBI_API_TOKEN` env > project-local `./.ambi/config.json` (searched upward from the cwd) > global `~/.ambi/config.json`. Pin a per-project identity (e.g. a bot for one repo) with `--local`:

```bash
npx ambiguous auth login --local --token ak_…   # writes ./.ambi/config.json; auto-gitignores .ambi/
```

## Discover what's available

**Run `catalog` once up front** — it lists every command with its positional args, required flags (enum values inline), and optional flags, generated from the live API spec. Read it once instead of drilling `--help` per command:

```bash
npx ambiguous catalog            # the entire command surface, one line per command
npx ambiguous catalog crm        # scope to one module group
```

Each line reads `command <positional> --required <type> [--optional …]  · summary`. Drop to `--help` only when you need the long description for one command:

```bash
npx ambiguous tasks create --help       # full flag descriptions for one command
```

**The one rule that holds everywhere:** a **path id is the only positional** argument (`docs get <id>`, `tasks delete <id>`); **every other field is a `--flag`**. A field named `assignee_id` becomes `--assignee-id` (kebab-case). There is no positional for body fields — `title`/`name`/`subject` are `--title`/`--name`/`--subject`. Enum fields show their values in the catalog; array fields take a comma-separated value (`--label-ids id1,id2`). When in doubt, the catalog line is authoritative — don't guess flag names or forms.

## Output modes

- Piped stdout or `--json`: JSON only, suitable for `| jq`
- Interactive TTY: tables for list endpoints, key/value records for single objects
- `-q` / `--quiet`: suppress non-essential output

```bash
npx ambiguous tasks list --json | jq '.data[] | {id, title, status}'
npx ambiguous tasks get <id> --json
```

## The shape of every command

One shape, derived from the rule above — **path id positional, every field a flag**:

```bash
npx ambiguous tasks get <id>                                     # path id → positional
npx ambiguous tasks create --title "Review Q1" --priority high   # body fields → flags
npx ambiguous tasks update <id> --status done                    # both
npx ambiguous tasks delete <id> -y                               # -y skips confirmation
```

Every other command — `docs get <id>`, `mail send --to … --subject …`, `calendar events list --start … --end …`, `crm contacts create --name … --type person` — follows the same shape. **Run `catalog <module>` for the exact flags of any command; don't guess them.** The catalog and `--help` are generated from the live API, so they're always correct.

## Drive Claude Code from chat (channels)

Stream live workspace events — chat messages, @mentions, DMs, task assignments — into a running **Claude Code** session and let it reply back, a [Claude Code channel](https://code.claude.com/docs/en/channels). It reuses your `ambiguous` login (no separate key to wire up) and dials *out* to the workspace, so it works behind NAT with no tunnel.

```bash
npx ambiguous claude-channel setup --channels general   # registers it with Claude Code (claude mcp add)
# then run the printed command to start a session:
claude --dangerously-load-development-channels server:ambiguous
```

Now a message in #general (or an @mention/DM/task assignment) appears in the session as a `<channel source="ambiguous">` event; Claude can answer with the `reply` tool, posting back as your logged-in identity.

- `--channels general` — subscribe to chat channels by name or id (comma-separated; names resolved via the API). The logged-in identity must be a **member** of each. Omit to receive only the per-user notification firehose (mentions/DMs/assignments), which needs no membership.
- `--check` — connect, verify auth + subscribe, print status, and exit (no Claude session needed). Use to debug.
- `--notify-only` — notifications only, skip chat channels. `--no-reply` — read-only (inject events, no reply tool).
- `setup` extras: `--scope user|project|local`, `--name <server>`, `--print` (show the commands without running them).
- **Registering is not enough — start a *new* session with the launch command.** `setup`'s `claude mcp add` only registers the server; the channel injects only into a session *launched* with the flag. You cannot activate it in an already-running session — plain `claude` shows `Channel notifications skipped: … not in --channels list`.
- For **unattended** auto-reply, add `--dangerously-skip-permissions` to the launch line — otherwise every `reply` waits for your approval. Only in a directory you trust.

For a dedicated **bot** identity instead of replying as yourself, log in with an agent key (optionally `--local` to scope it to one repo). Requirements: Claude Code ≥ 2.1.80 and Anthropic auth (claude.ai / Console key — *not* Bedrock/Vertex); Team/Enterprise admins must enable Settings → Claude Code → Channels. The `--dangerously-load-development-channels` flag is required while this channel isn't on Anthropic's approved allowlist; a Team/Enterprise admin can add it to the org's `allowedChannelPlugins` to launch with plain `--channels` and drop the dangerous flag. Events arrive only while the session runs — use tmux/launchd for an always-on bridge.

## Setting fields

Two ways to pass input, in precedence order (last wins):

1. Named flag — `--priority high` (every body/query field; path ids are the only positional)
2. Piped JSON on stdin — merged over the flags

```bash
# Equivalent:
npx ambiguous tasks create --title "Ship" --priority high --assignee-id u_123
echo '{"priority":"high","assignee_id":"u_123"}' | npx ambiguous tasks create --title "Ship"
```

## Errors and exit codes

- `0` — success
- `1` — general error
- `2` — auth error (401 / 403, or not logged in)

In JSON mode, errors are structured:

```json
{"ok": false, "error": "Task not found", "statusCode": 404}
```

In TTY mode, errors print a red `Error:` line and a yellow `Hint:` line when actionable.

## Config and cache

- Auth + API URL (global): `~/.ambi/config.json` (co-located with the spec cache)
- Auth + API URL (project-local, overrides global per key): `./.ambi/config.json` (searched cwd-upward, stops at `$HOME`)
- Env overrides (win over both): `AMBI_API_TOKEN`, `AMBI_API_URL`
- OpenAPI spec cache: `~/.ambi/spec.json`
- Resolution order: env > local `./.ambi` > global `~/.ambi` > legacy (the pre-`~/.ambi` OS dir, read-only — older installs keep working until the next `auth login` migrates them)
- `npx ambiguous whoami` shows which source the active credential resolves from

## Notes

- Every command requires auth except `auth` and `config`. Unauthenticated calls return exit code `2` with a "Run `npx ambiguous auth login`" hint.
- Help output reflects the live API — new server commands appear without a CLI upgrade.
