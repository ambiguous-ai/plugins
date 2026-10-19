#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

if (process.argv.slice(2).some(arg => arg !== '--check')) {
  throw new Error('Usage: node scripts/sync-manifests.mjs [--check]');
}
const root = fileURLToPath(new URL('../', import.meta.url));
const check = process.argv.includes('--check');
const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const source = read('plugin.json');
const shared = ['name', 'version', 'description', 'author', 'homepage', 'repository', 'license', 'keywords'];
const plugin = Object.fromEntries(shared.map(field => [field, source[field]]));
const clientMcp = {
  mcpServers: Object.fromEntries(Object.entries(read('mcp.json').mcpServers).map(([name, server]) => [
    name,
    { ...server, type: server.type === 'streamable-http' ? 'http' : server.type },
  ])),
};
const privacyPolicyURL = `${source.homepage}/legal/privacy`;
const outputs = new Map([
  ['plugins/ambiguous-claude-code/.claude-plugin/plugin.json', {
    ...plugin,
    mcpServers: './.mcp.json',
    privacyPolicyUrl: privacyPolicyURL,
  }],
  ['plugins/ambiguous-codex/.codex-plugin/plugin.json', {
    ...plugin,
    skills: './skills/',
    mcpServers: './.mcp.json',
    interface: {
      displayName: 'Ambiguous Workspace',
      shortDescription: '18 apps for humans and AI teammates.',
      longDescription: source.description,
      developerName: source.author.name,
      category: 'Productivity',
      capabilities: ['Interactive', 'Write'],
      websiteURL: source.homepage,
      privacyPolicyURL,
      termsOfServiceURL: `${source.homepage}/legal/terms`,
      brandColor: '#405ef2',
      defaultPrompt: [
        "What's on my Ambiguous calendar today?",
        'Summarise my unread Ambiguous messages.',
        'Create a task in Ambiguous and assign it.',
      ],
      logo: './assets/logo.svg',
    },
  }],
  ['.claude-plugin/marketplace.json', {
    $schema: 'https://json.schemastore.org/claude-code-marketplace.json',
    name: 'ambiguous-ai',
    owner: { name: source.author.name, email: source.author.email },
    description: source.description,
    plugins: [{
      name: source.name,
      source: './plugins/ambiguous-claude-code',
      description: source.description,
      version: source.version,
      category: 'productivity',
      tags: ['productivity', 'crm', 'tasks', 'docs', 'wiki', 'calendar', 'mail', 'chat', 'workspace', 'cli'],
    }],
  }],
  ['.agents/plugins/marketplace.json', {
    name: 'ambiguous-ai',
    interface: { displayName: 'Ambiguous Workspace' },
    plugins: [{
      name: source.name,
      source: { source: 'local', path: './plugins/ambiguous-codex' },
      description: source.description,
      policy: { installation: 'AVAILABLE' },
      category: 'Productivity',
    }],
  }],
  ['plugins/ambiguous-claude-code/.mcp.json', clientMcp],
  ['plugins/ambiguous-codex/.mcp.json', clientMcp],
]);

let stale = false;
for (const [path, manifest] of outputs) {
  const output = JSON.stringify(manifest, null, 2) + '\n';
  if (check && readFileSync(resolve(root, path), 'utf8') === output) continue;
  if (check) {
    console.error(`sync-manifests: STALE — ${path}`);
    stale = true;
  } else {
    writeFileSync(resolve(root, path), output);
    console.log(`sync-manifests: wrote ${path}`);
  }
}
if (stale) process.exitCode = 1;
else console.log('sync-manifests: OK');
