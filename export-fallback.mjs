import { writeFile } from 'node:fs/promises';

import { DEFAULT_SEED, generateEarth } from './earth-model.mjs';
import { renderEarthFallback } from './fallback-svg.mjs';

const earth = generateEarth(DEFAULT_SEED);
const destination = new URL('./earth-fallback.svg', import.meta.url);
await writeFile(destination, renderEarthFallback(earth), 'utf8');
console.log(`wrote ${destination.pathname} (${earth.organicStrokes.length} organic strokes, ${earth.meshTriangles.length} measured triangles)`);
