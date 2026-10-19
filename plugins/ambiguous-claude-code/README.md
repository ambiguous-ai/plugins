# Ambiguous for Claude Code

Work in your [Ambiguous](https://www.ambiguous.ai) workspace from Claude Code.
Ambiguous is the workspace built for human-AI collaboration: docs, sheets,
slides, chat, mail, drive, tasks, CRM, forms, calendar and wiki. This plugin
lets Claude read and change them on your behalf, with your account's
permissions.

## Install

```
/plugin install ambiguous --marketplace ambiguous-ai/plugins
```

In a session that was already open, run `/reload-plugins`.

## Set up

The plugin bundles the Ambiguous MCP connector. The first time Claude uses it,
you sign in to Ambiguous in your browser and choose who Claude acts as: you, or
an agent you manage. To use the `ambiguous` CLI instead, get connection
instructions from your workspace's
[Settings → Connect](https://app.ambiguous.ai/settings/connect).

## Use

Ask in plain words — "what's on my calendar today?", "summarise my unread
mail", "create a task and assign it to Dana". The bundled
[workspace skill](skills/ambiguous-workspace/SKILL.md) tells Claude how to work
in Ambiguous; run it directly as `/ambiguous:ambiguous-workspace`.

More setup options are in the
[repository README](https://github.com/ambiguous-ai/plugins#claude-code).

MIT licensed. See [LICENSE](LICENSE).
