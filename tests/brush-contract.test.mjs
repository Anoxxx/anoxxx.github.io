import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { BRUSH_API } from '../brush-api.mjs';

test('the first-class brush route pins the standalone package exactly', async () => {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
  const lock = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url)));

  assert.equal(packageJson.dependencies['p5.brush'], '2.2.2');
  assert.equal(lock.packages['node_modules/p5.brush'].version, '2.2.2');
  assert.equal(lock.packages['node_modules/p5'], undefined);
});

test('one concise API surface covers both material regimes', () => {
  assert.deepEqual(BRUSH_API, [
    'createCanvas', 'seed', 'noiseSeed', 'clear', 'scaleBrushes',
    'noStroke', 'fill', 'fillBleed', 'fillTexture', 'polygon',
    'noFill', 'noHatch', 'set', 'line', 'hatch', 'circle', 'render',
  ]);
  assert.ok(BRUSH_API.length <= 17);
});

test('the test command is portable across shells', async () => {
  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

  assert.doesNotMatch(packageJson.scripts.test, /[*?\[\]]/);
  for (const file of [
    'brush-contract.test.mjs',
    'build.test.mjs',
    'earth-model.test.mjs',
    'fallback.test.mjs',
    'page.test.mjs',
  ]) {
    assert.match(packageJson.scripts.test, new RegExp(`tests/${file.replaceAll('.', '\\.')}`));
  }
});
