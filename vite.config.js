import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function htmlInputs() {
  const root = process.cwd();
  const files = fs.readdirSync(root)
    .filter(f => f.endsWith('.html'))
    // These are fetched partials / templates, not pages.
    .filter(f => !['empty.html'].includes(f));

  // Always include index.html first.
  files.sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)));

  const inputs = {};
  for (const f of files) {
    const name = path.basename(f, '.html');
    inputs[name] = path.resolve(root, f);
  }
  return inputs;
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: htmlInputs(),
    },
  },
});
