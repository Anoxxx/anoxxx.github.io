import test from 'node:test';
import assert from 'node:assert/strict';

import { DEFAULT_SEED, generateEarth, insideEarth } from '../earth-model.mjs';

test('one seed reproduces one Earth exactly', () => {
  const first = generateEarth(DEFAULT_SEED);
  const second = generateEarth(DEFAULT_SEED);

  assert.deepEqual(second, first);
  assert.notDeepEqual(generateEarth('another-earth').organicStrokes[0], first.organicStrokes[0]);
});

test('organic and measured regimes share one circular Earth and one triangle', () => {
  const earth = generateEarth(DEFAULT_SEED);

  assert.equal(earth.organicStrokes.length, 192);
  assert.equal(earth.washes.length, 5);
  assert.equal(earth.hatchIslands.length, 3);
  assert.ok(earth.meshTriangles.length >= 58);
  assert.equal(earth.outerTriangle.length, 3);
  assert.ok(earth.organicStrokes.flatMap((stroke) => stroke.points).every((point) => insideEarth(point, earth.circle, 0.99)));
  assert.ok(earth.meshTriangles.flatMap((triangle) => triangle.points).every((point) => insideEarth(point, earth.circle, 1.001)));
});

test('the left side is organic and the right side is measured without becoming two globes', () => {
  const earth = generateEarth(DEFAULT_SEED);
  const leftPoints = earth.organicStrokes.flatMap((stroke) => stroke.points);
  const rightPoints = earth.meshTriangles.flatMap((triangle) => triangle.points);

  assert.ok(leftPoints.every((point) => point.x <= earth.circle.x + 18));
  assert.ok(rightPoints.every((point) => point.x >= earth.circle.x - 8));
  assert.deepEqual(new Set(earth.palette), new Set(['#2637b8', '#394bd4', '#5547c7', '#7164e8', '#8c82f2']));
});
