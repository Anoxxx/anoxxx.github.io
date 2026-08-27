import { copyFile, mkdir, rm } from 'node:fs/promises';

const root = new URL('./', import.meta.url);
const build = new URL('./build/', root);

const copy = async (source, destination = source) => {
  const target = new URL(destination, build);
  await mkdir(new URL('./', target), { recursive: true });
  await copyFile(new URL(source, root), target);
};

await rm(build, { recursive: true, force: true });
await mkdir(build, { recursive: true });

await Promise.all([
  copy('index.html'),
  copy('styles.css'),
  copy('brush-api.mjs'),
  copy('earth-model.mjs'),
  copy('earth-renderer.mjs'),
  copy('earth-fallback.svg'),
  copy('public/CNAME', 'CNAME'),
  copy('public/.nojekyll', '.nojekyll'),
  copy('public/robots.txt', 'robots.txt'),
  copy('vendor/p5-brush.esm.js'),
  copy('vendor/p5-brush.LICENSE.md'),
]);

console.log('Built the static personal site in build/.');
