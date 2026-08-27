import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const build = new URL('../build/', import.meta.url);

test('the production build is self-contained for GitHub Pages', async () => {
  await rm(build, { recursive: true, force: true });

  const result = spawnSync(process.execPath, ['build.mjs'], {
    cwd: root,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const expected = [
    'index.html',
    'styles.css',
    'brush-api.mjs',
    'earth-model.mjs',
    'earth-renderer.mjs',
    'earth-fallback.svg',
    'CNAME',
    '.nojekyll',
    'vendor/p5-brush.esm.js',
    'vendor/p5-brush.LICENSE.md',
  ];
  await Promise.all(expected.map((entry) => access(new URL(entry, build))));

  const html = await readFile(new URL('index.html', build), 'utf8');
  assert.match(html, /\.\/vendor\/p5-brush\.esm\.js/);
  assert.match(html, /\.\/earth-renderer\.mjs/);
  assert.match(html, /\.\/earth-fallback\.svg/);
  assert.doesNotMatch(html, /%PUBLIC_URL%|static\/js\/main\./);
  assert.doesNotMatch(html, /\.\/node_modules\//);
});
