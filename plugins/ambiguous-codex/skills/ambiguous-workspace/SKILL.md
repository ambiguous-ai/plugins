---
name: ambiguous-workspace
description: Work in an Ambiguous Workspace — docs, chat, tasks, calendar, mail, drive, CRM, wiki, sheets, slides. Use when the user references an Ambiguous link or @mention, or asks to read, create, or change anything in their workspace.
---

# How to use Ambiguous

Two things about this session that no single tool can tell you. Everything else
is in the tool descriptions.

## Ambiguous may be connected more than once

A connector configured in the host and this plugin can both be present. Each
connection has its own credential, so they can resolve to different identities
or different workspaces, and their tools have the same names under different
prefixes.

Call `auth_whoami` on each prefix. If they differ, ask which to use, then use
that prefix for the whole task. Do not read from one and write to the other.

## No tools means no credential

Say so and stop. The credential is set either in the host's settings or as
`AMBI_API_TOKEN` before the host starts. Hosts connect to MCP servers at
startup, so it needs a restart either way — retrying will not help.

Do not sign up for a new identity to work around it. A missing credential does
not mean the account is missing.
