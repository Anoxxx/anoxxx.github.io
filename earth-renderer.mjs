import { BRUSH_API } from './brush-api.mjs';
import { BASE_SIZE, DEFAULT_SEED, generateEarth } from './earth-model.mjs';

const search = new URLSearchParams(window.location.search);
const staticMode = search.has('static');
const forcedReducedMotion = search.has('reduced');

function supportsWebGL2() {
  const probe = document.createElement('canvas');
  return Boolean(probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true }));
}

const loadBrush = () => {
  if (!supportsWebGL2()) {
    return Promise.reject(new DOMException('WebGL2 is unavailable.', 'NotSupportedError'));
  }
  return import('p5.brush/standalone');
};
let brushesScaled = false;

function mapPoint(point, size) {
  return [
    (point.x / BASE_SIZE) * size - size / 2,
    (point.y / BASE_SIZE) * size - size / 2,
    1,
  ];
}

function groupStrokes(strokes) {
  const groups = new Map();
  for (const stroke of strokes) {
    const key = `${stroke.brush}|${stroke.color}|${stroke.weight}`;
    const group = groups.get(key) ?? [];
    group.push(stroke);
    groups.set(key, group);
  }
  return groups;
}

function drawEarth(brush, host, earth, size) {
  for (const method of BRUSH_API) {
    if (typeof brush[method] !== 'function') {
      throw new TypeError(`p5.brush/standalone is missing ${method}()`);
    }
  }

  const canvas = brush.createCanvas(size, size, {
    parent: host,
    pixelDensity: Math.min(window.devicePixelRatio || 1, 2),
    id: 'triangular-earth-canvas',
  });
  canvas.className = 'earth-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  brush.seed(earth.meta.seed);
  brush.noiseSeed(earth.meta.seed);
  if (!brushesScaled) {
    brush.scaleBrushes(1.75);
    brushesScaled = true;
  }
  brush.clear('#f1f2ff');

  brush.noStroke();
  brush.noHatch();
  for (const wash of earth.washes) {
    brush.fill(wash.color, wash.opacity);
    brush.fillBleed(wash.bleed, 'out');
    brush.fillTexture(wash.texture, 0.24, true);
    brush.polygon(wash.points.map((point) => mapPoint(point, size)));
  }

  brush.noFill();
  brush.noHatch();
  for (const group of groupStrokes(earth.organicStrokes).values()) {
    const sample = group[0];
    brush.set(sample.brush, sample.color, sample.weight);
    for (const stroke of group) {
      const mapped = stroke.points.map((point) => mapPoint(point, size));
      brush.line(mapped[0][0], mapped[0][1], mapped[1][0], mapped[1][1]);
      brush.line(mapped[1][0], mapped[1][1], mapped[2][0], mapped[2][1]);
    }
  }

  brush.noFill();
  for (const island of earth.hatchIslands) {
    brush.set('HB', island.color, 0.72);
    brush.hatch(island.spacing * size / BASE_SIZE, island.angle, {
      rand: 0.12,
      continuous: false,
      gradient: false,
    });
    brush.polygon(island.points.map((point) => mapPoint(point, size)));
    brush.noHatch();
  }

  brush.noHatch();
  for (const triangle of earth.meshTriangles) {
    brush.set('rotring', triangle.color, 0.62);
    if (triangle.opacity > 0) {
      brush.fill(triangle.color, triangle.opacity);
      brush.fillBleed(0.012, 'out');
      brush.fillTexture(0.04, 0.86, false);
    } else {
      brush.noFill();
    }
    brush.polygon(triangle.points.map((point) => mapPoint(point, size)));
  }

  brush.noFill();
  brush.noHatch();
  brush.set('rotring', '#394bd4', 0.72);
  const center = mapPoint(earth.circle, size);
  brush.circle(center[0], center[1], earth.circle.r * size / BASE_SIZE);

  brush.set('rotring', '#2637b8', 1.02);
  for (let index = 0; index < earth.outerTriangle.length; index += 1) {
    const from = mapPoint(earth.outerTriangle[index], size);
    const to = mapPoint(earth.outerTriangle[(index + 1) % earth.outerTriangle.length], size);
    brush.line(from[0], from[1], to[0], to[1]);
  }

  brush.render();
  return canvas;
}

class TriangularEarth extends HTMLElement {
  #earth;
  #motionQuery;
  #observer;
  #frame = 0;
  #drawing = false;
  #rerender = false;
  #lastSize = 0;

  connectedCallback() {
    if (this.#observer) return;
    if (typeof ResizeObserver !== 'function' || typeof window.matchMedia !== 'function') {
      this.dataset.renderer = 'fallback';
      this.dataset.enhancementError = 'NotSupportedError';
      return;
    }
    this.#earth = generateEarth(this.getAttribute('seed') || DEFAULT_SEED);
    this.#motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.dataset.motion = forcedReducedMotion || this.#motionQuery.matches ? 'reduced' : 'static';
    this.#motionQuery.addEventListener('change', this.#handleMotionChange);
    this.#observer = new ResizeObserver(this.#queueRender);
    this.#observer.observe(this);
    this.#queueRender();
  }

  disconnectedCallback() {
    this.#observer?.disconnect();
    this.#motionQuery?.removeEventListener('change', this.#handleMotionChange);
    cancelAnimationFrame(this.#frame);
    this.querySelector('canvas')?.remove();
  }

  #handleMotionChange = () => {
    this.dataset.motion = forcedReducedMotion || this.#motionQuery.matches ? 'reduced' : 'static';
  };

  #showFallback = (reason) => {
    this.querySelector('canvas')?.remove();
    this.dataset.renderer = 'fallback';
    this.dataset.enhancementError = reason;
  };

  #handleContextLost = (event) => {
    event.preventDefault();
    this.#showFallback('WebGLContextLost');
  };

  #queueRender = () => {
    cancelAnimationFrame(this.#frame);
    this.#frame = requestAnimationFrame(this.#render);
  };

  #render = async () => {
    const rect = this.getBoundingClientRect();
    const size = Math.max(1, Math.round(Math.min(rect.width, rect.height)));
    if (size === this.#lastSize && this.dataset.renderer === 'p5-brush') return;
    if (this.#drawing) {
      this.#rerender = true;
      return;
    }

    this.#drawing = true;
    this.#rerender = false;
    try {
      const brush = await loadBrush();
      if (!this.isConnected) return;
      this.querySelector('canvas')?.remove();
      const canvas = drawEarth(brush, this, this.#earth, size);
      canvas.addEventListener('webglcontextlost', this.#handleContextLost, { once: true });
      this.#lastSize = size;
      this.dataset.renderer = 'p5-brush';
      this.dataset.webgl = 'webgl2';
      this.removeAttribute('data-enhancement-error');
      this.dispatchEvent(new CustomEvent('triangular-earth:ready', { bubbles: true }));
    } catch (error) {
      this.#showFallback(error instanceof Error ? error.name : 'UnknownError');
    } finally {
      this.#drawing = false;
      if (this.#rerender) this.#queueRender();
    }
  };
}

if (!staticMode && !customElements.get('earth-p5')) {
  customElements.define('earth-p5', TriangularEarth);
}

export { TriangularEarth, drawEarth };
