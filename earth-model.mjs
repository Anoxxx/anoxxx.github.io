export const DEFAULT_SEED = 'zhengfei / triangular-earth / 2026';
export const BASE_SIZE = 720;

const TAU = Math.PI * 2;
const PALETTE = ['#2637b8', '#394bd4', '#5547c7', '#7164e8', '#8c82f2'];
const round = (value) => Math.round(value * 1000) / 1000;

function hashSeed(seed) {
  let hash = 2166136261;
  for (const character of String(seed)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = hashSeed(seed);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function insideEarth(point, circle, scale = 1) {
  const dx = point.x - circle.x;
  const dy = point.y - circle.y;
  return dx * dx + dy * dy <= (circle.r * scale) ** 2;
}

function keepInside(point, circle, scale = 0.97) {
  const dx = point.x - circle.x;
  const dy = point.y - circle.y;
  const distance = Math.hypot(dx, dy);
  const limit = circle.r * scale;
  if (distance <= limit) return point;
  return {
    x: circle.x + (dx / distance) * limit,
    y: circle.y + (dy / distance) * limit,
  };
}

function organicStart(random, circle) {
  const angle = Math.PI / 2 + random() * Math.PI;
  const radius = Math.sqrt(random()) * circle.r * 0.94;
  return {
    x: circle.x + Math.cos(angle) * radius,
    y: circle.y + Math.sin(angle) * radius,
  };
}

function makeOrganicStroke(random, circle, index) {
  const points = [organicStart(random, circle)];
  let cursor = points[0];
  let direction = Math.atan2(cursor.y - circle.y, cursor.x - circle.x) + Math.PI / 2;
  const length = 10 + random() * 20;
  for (let segment = 0; segment < 2; segment += 1) {
    direction += (random() - 0.5) * 0.42;
    let next = {
      x: cursor.x + Math.cos(direction) * length,
      y: cursor.y + Math.sin(direction) * length,
    };
    if (next.x > circle.x + 18 || !insideEarth(next, circle, 0.99)) {
      direction += Math.PI * 0.78;
      next = {
        x: cursor.x + Math.cos(direction) * length * 0.72,
        y: cursor.y + Math.sin(direction) * length * 0.72,
      };
    }
    next = keepInside(next, circle, 0.985);
    next.x = Math.min(next.x, circle.x + 18);
    points.push(next);
    cursor = next;
  }
  return {
    id: `organic-${index + 1}`,
    brush: ['2B', 'charcoal', 'HB'][index % 3],
    color: PALETTE[(index + Math.floor(random() * PALETTE.length)) % PALETTE.length],
    weight: [0.72, 0.95, 1.22, 1.5][index % 4],
    points: points.map((point) => ({ x: round(point.x), y: round(point.y) })),
  };
}

function irregularIsland(random, circle, x, y, rx, ry, count = 12) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * TAU;
    const wobble = 0.78 + random() * 0.28;
    const point = keepInside({
      x: x + Math.cos(angle) * rx * wobble,
      y: y + Math.sin(angle) * ry * wobble,
    }, circle, 0.95);
    point.x = Math.min(point.x, circle.x + 8);
    return { x: round(point.x), y: round(point.y) };
  });
}

function makeWashes(random, circle) {
  return [
    [circle.x - 112, circle.y - 112, 102, 74],
    [circle.x - 92, circle.y + 54, 126, 88],
    [circle.x - 172, circle.y + 2, 70, 120],
    [circle.x - 35, circle.y - 160, 82, 58],
    [circle.x - 30, circle.y + 154, 88, 62],
  ].map(([x, y, rx, ry], index) => ({
    id: `wash-${index + 1}`,
    color: PALETTE[(index + 2) % PALETTE.length],
    opacity: [36, 42, 30, 34, 28][index],
    bleed: [0.28, 0.34, 0.22, 0.26, 0.2][index],
    texture: [0.5, 0.58, 0.42, 0.46, 0.4][index],
    points: irregularIsland(random, circle, x, y, rx, ry, 14),
  }));
}

function makeHatchIslands(random, circle) {
  return [
    [circle.x - 155, circle.y - 78, 64, 44],
    [circle.x - 82, circle.y + 118, 74, 38],
    [circle.x - 35, circle.y - 28, 48, 70],
  ].map(([x, y, rx, ry], index) => ({
    id: `hatch-${index + 1}`,
    color: PALETTE[(index + 1) % PALETTE.length],
    spacing: [8, 10, 7][index],
    angle: [-22, 28, -46][index],
    points: irregularIsland(random, circle, x, y, rx, ry, 10),
  }));
}

function makeMesh(random, circle) {
  const step = 50;
  const rowHeight = step * Math.sqrt(3) / 2;
  const triangles = [];
  const minX = circle.x - 8;
  const maxX = circle.x + circle.r;
  const minY = circle.y - circle.r;
  const maxY = circle.y + circle.r;

  const rows = Math.ceil((maxY - minY) / rowHeight) + 1;
  const cols = Math.ceil((maxX - minX) / step) + 2;
  const points = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      x: minX + col * step + (row % 2 ? step / 2 : 0),
      y: minY + row * rowHeight,
    })),
  );

  const addTriangle = (candidate) => {
    if (!candidate.every((point) => point.x >= minX && insideEarth(point, circle, 1.001))) return;
    const index = triangles.length;
    triangles.push({
      id: `mesh-${index + 1}`,
      color: PALETTE[(index + Math.floor(random() * PALETTE.length)) % PALETTE.length],
      opacity: index % 5 === 0 ? 32 : index % 3 === 0 ? 18 : 0,
      points: candidate.map((point) => ({ x: round(point.x), y: round(point.y) })),
    });
  };

  for (let row = 0; row < rows - 1; row += 1) {
    for (let col = 0; col < cols - 1; col += 1) {
      const topLeft = points[row][col];
      const topRight = points[row][col + 1];
      const bottomLeft = points[row + 1][col];
      const bottomRight = points[row + 1][col + 1];
      if (row % 2 === 0) {
        addTriangle([topLeft, topRight, bottomLeft]);
        addTriangle([topRight, bottomRight, bottomLeft]);
      } else {
        addTriangle([topLeft, topRight, bottomRight]);
        addTriangle([topLeft, bottomRight, bottomLeft]);
      }
    }
  }
  return triangles;
}

export function generateEarth(seed = DEFAULT_SEED) {
  const random = seededRandom(seed);
  const circle = { x: 360, y: 342, r: 244 };
  return {
    meta: { seed: String(seed), size: BASE_SIZE },
    palette: [...PALETTE],
    circle,
    outerTriangle: [
      { x: 360, y: 34 },
      { x: 676, y: 610 },
      { x: 44, y: 610 },
    ],
    organicStrokes: Array.from({ length: 192 }, (_, index) =>
      makeOrganicStroke(random, circle, index),
    ),
    washes: makeWashes(random, circle),
    hatchIslands: makeHatchIslands(random, circle),
    meshTriangles: makeMesh(random, circle),
  };
}
