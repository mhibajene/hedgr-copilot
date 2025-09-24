#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DENY = new Set(['latest', '*']);

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.git') || e.name === 'dist' || e.name === '.next') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (e.isFile() && e.name === 'package.json') acc.push(p);
  }
  return acc;
}

function checkBlock(pkgPath, blockName, block) {
  const problems = [];
  if (!block) return problems;
  for (const [name, version] of Object.entries(block)) {
    if (typeof version === 'string' && DENY.has(version.trim())) {
      problems.push({ pkgPath, blockName, name, version });
    }
  }
  return problems;
}

async function main() {
  const files = await walk(ROOT);
  const issues = [];
  for (const file of files) {
    const json = JSON.parse(await fs.readFile(file, 'utf8'));
    issues.push(
      ...checkBlock(file, 'dependencies', json.dependencies),
      ...checkBlock(file, 'devDependencies', json.devDependencies),
      ...checkBlock(file, 'peerDependencies', json.peerDependencies)
    );
  }
  if (issues.length) {
    console.error('❌ Version guard failed. Replace "latest" or "*" with pinned ranges:');
    for (const i of issues) {
      console.error(` - ${path.relative(ROOT, i.pkgPath)} → ${i.blockName}.${i.name} = "${i.version}"`);
    }
    process.exit(1);
  } else {
    console.log('✅ Version guard passed.');
  }
}

main().catch((e) => {
  console.error('Guard errored:', e);
  process.exit(2);
});