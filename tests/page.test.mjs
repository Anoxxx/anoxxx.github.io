import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { BRUSH_API } from '../brush-api.mjs';

const sourcePath = new URL('./fixtures/personal-p5-selected.html', import.meta.url);
const readCandidate = (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const block = (html, pattern, label) => {
  const value = html.match(pattern)?.[1];
  assert.ok(value, `missing ${label}`);
  return normalize(value);
};

test('name, pronunciation, and all three English paragraphs are source-exact', async () => {
  const [source, candidate] = await Promise.all([
    readFile(sourcePath, 'utf8'),
    readCandidate('index.html'),
  ]);
  const sourceName = block(source, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i, 'source name');
  const candidateName = block(candidate, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i, 'candidate name');
  const sourcePronunciation = block(source, /<p class="pronunciation">([\s\S]*?)<\/p>/i, 'source pronunciation');
  const candidatePronunciation = block(candidate, /<p class="pronunciation">([\s\S]*?)<\/p>/i, 'candidate pronunciation');
  const sourceBiography = block(source, /<div class="biography">([\s\S]*?)<\/div>/i, 'source biography');
  const candidateBiography = block(candidate, /<div class="biography">([\s\S]*?)<\/div>/i, 'candidate biography');

  assert.equal(candidateName, sourceName);
  assert.equal(candidatePronunciation, sourcePronunciation);
  assert.equal(candidateBiography, sourceBiography);
  assert.equal((candidateBiography.match(/<p>/g) ?? []).length, 3);
  assert.doesNotMatch(candidate, /[\u3400-\u9fff]/);
  assert.doesNotMatch(candidate, /data-set-language|language-switch/);
});

test('the page is one flat color with no paper or archival skin', async () => {
  const [html, css] = await Promise.all([readCandidate('index.html'), readCandidate('styles.css')]);

  assert.match(css, /--page:\s*#[0-9a-f]{6}/i);
  assert.doesNotMatch(`${html}\n${css}`, /paper|field-note|archival/i);
  assert.doesNotMatch(css, /gradient|background-image/i);
});

test('the typography uses only intentionally shipped or system fonts', async () => {
  const css = await readCandidate('styles.css');

  assert.doesNotMatch(css, /--sans:\s*Inter\b/);
  assert.match(css, /--sans:[^;]*ui-sans-serif[^;]*-apple-system/);
});

test('semantic copy stays outside the p5 canvas and eager fallback', async () => {
  const html = await readCandidate('index.html');
  const visual = html.match(/<earth-p5\b[^>]*>([\s\S]*?)<\/earth-p5>/i)?.[1];

  assert.match(html, /<main\b/);
  assert.match(html, /<article\b/);
  assert.match(html, /<figure\b[^>]+data-opening-strategy="editorial-scene"/);
  assert.match(html, /<figcaption\b/);
  assert.ok(visual);
  assert.match(visual, /<img\b[^>]+earth-fallback\.svg/);
  assert.doesNotMatch(visual, /<(?:h1|p|figcaption|span)\b/i);
});

test('the enhanced renderer resolves standalone p5.brush and uses only its declared surface', async () => {
  const [html, renderer] = await Promise.all([readCandidate('index.html'), readCandidate('earth-renderer.mjs')]);
  const used = [...renderer.matchAll(/brush\.(\w+)/g)].map((match) => match[1]);

  assert.match(html, /"p5\.brush\/standalone"\s*:\s*"\.\/vendor\/p5-brush\.esm\.js"/);
  assert.match(renderer, /import\(['"]p5\.brush\/standalone['"]\)/);
  assert.deepEqual([...new Set(used)].sort(), [...BRUSH_API].sort());
  assert.match(renderer, /URLSearchParams[\s\S]*static/);
  assert.match(renderer, /search\.has\(['"]reduced['"]\)/);
  assert.match(renderer, /prefers-reduced-motion/);
  assert.match(renderer, /getContext\(['"]webgl2['"]/);
  assert.match(renderer, /Math\.min\(window\.devicePixelRatio\s*\|\|\s*1,\s*2\)/);
  assert.match(renderer, /webglcontextlost/);
  assert.match(renderer, /typeof ResizeObserver\s*!==\s*['"]function['"]/);
  assert.match(renderer, /typeof window\.matchMedia\s*!==\s*['"]function['"]/);
  assert.match(renderer, /await loadBrush\(\);[\s\S]*if \(!this\.isConnected\) return;/);
});

test('desktop and mobile are deliberately composed rather than canvas-sized layout', async () => {
  const css = await readCandidate('styles.css');

  assert.match(css, /h1\s*\{[\s\S]*word-spacing:\s*0\.08em/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)/);
  assert.match(css, /\.earth-stage[\s\S]*position:\s*absolute/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*\.earth-stage/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /earth-p5\[data-motion="reduced"\][^{]*\.earth-canvas\s*\{\s*transition:\s*none/);
});

test('intermediate desktop widths reserve a separate visual column', async () => {
  const css = await readCandidate('styles.css');

  assert.match(css, /@media\s*\(min-width:\s*641px\)\s*and\s*\(max-width:\s*1150px\)/);
  assert.match(css, /@media\s*\(min-width:\s*641px\)[\s\S]*\.earth-stage\s*\{[\s\S]*right:\s*-8vw;[\s\S]*width:\s*48vw;/);
  assert.match(css, /@media\s*\(min-width:\s*641px\)[\s\S]*\.content\s*\{[\s\S]*width:\s*min\(54vw,\s*38rem\);/);
});
