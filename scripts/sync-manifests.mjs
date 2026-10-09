#!/usr/bin/env node
// Shared metadata is authored in root plugin.json; host-specific fields stay local.
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
const outputs = new Map();

for (const path of [
  'plugins/ambiguous-claude-code/.claude-plugin/plugin.json',
  'plugins/ambiguous-codex/.codex-plugin/plugin.json',
]) {
  const manifest = read(path);
  for (const field of shared) manifest[field] = source[field];
  if (manifest.interface) {
    manifest.interface.longDescription = source.description;
    manifest.interface.developerName = source.author.name;
    manifest.interface.websiteURL = source.homepage;
  }
  outputs.set(path, manifest);
}

for (const path of ['.claude-plugin/marketplace.json', '.agents/plugins/marketplace.json']) {
  const marketplace = read(path);
  if ('description' in marketplace) marketplace.description = source.description;
  if (marketplace.owner) marketplace.owner.email = source.author.email;
  const entry = marketplace.plugins.find(plugin => plugin.name === source.name);
  if (!entry) throw new Error(`Missing ${source.name} entry in ${path}`);
  entry.description = source.description;
  if ('version' in entry) entry.version = source.version;
  outputs.set(path, marketplace);
}

let stale = false;
for (const [path, manifest] of outputs) {
  const output = JSON.stringify(manifest, null, 2) + '\n';
  if (readFileSync(resolve(root, path), 'utf8') === output) continue;
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
