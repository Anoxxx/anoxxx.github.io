import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { DEFAULT_SEED, generateEarth } from '../earth-model.mjs';
import { renderEarthFallback } from '../fallback-svg.mjs';

test('the fallback preserves both regimes as one deterministic Earth', () => {
  const earth = generateEarth(DEFAULT_SEED);
  const first = renderEarthFallback(earth);
  const second = renderEarthFallback(earth);

  assert.equal(first, second);
  assert.match(first, /^<svg[^>]+width="720"[^>]+height="720"/);
  assert.equal((first.match(/data-mark="organic-stroke"/g) ?? []).length, 192);
  assert.equal((first.match(/data-mark="wash"/g) ?? []).length, 5);
  assert.equal((first.match(/data-mark="hatch-island"/g) ?? []).length, 3);
  assert.equal((first.match(/data-mark="mesh-triangle"/g) ?? []).length, earth.meshTriangles.length);
  assert.match(first, /data-mark="outer-triangle"/);
  assert.match(first, /data-mark="earth-circle"/);
  assert.doesNotMatch(first, /<(?:text|title|desc|script)\b/i);
});

test('the committed fallback matches the deterministic model', async () => {
  const expected = renderEarthFallback(generateEarth(DEFAULT_SEED));
  const committed = await readFile(new URL('../earth-fallback.svg', import.meta.url), 'utf8');

  assert.equal(committed.replaceAll('\r\n', '\n'), expected);
});
