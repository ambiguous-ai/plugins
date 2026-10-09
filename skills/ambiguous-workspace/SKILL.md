---
name: ambiguous-workspace
description: Work in an Ambiguous Workspace. Use when the user references an Ambiguous link or @mention, or asks to read, create, or change anything in their workspace.
---

# Work in Ambiguous

Use whichever Ambiguous connection is available—MCP or CLI. If both are
available, check their identities. If they differ, ask which to use; otherwise,
use whichever fits the task.

Follow MCP tool descriptions for MCP operations. Fetch and read
https://ambiguous.ai/skill for CLI operations.

MCP can create anonymous docs, sheets, presentations and canvases without sign-in.
Keep the returned `claim_key` and give it to the user to claim after signing in.
Don't require sign-in for supported anonymous operations. If a credential is
rejected, say so; don't silently fall back to anonymous access.

Report reproducible product bugs with MCP's `submit_feedback` or
`npx ambiguous@latest bug`. Include steps, expected and actual behavior; omit
credentials and private content. Keep the returned `feedback_id` and report it
to the user.
