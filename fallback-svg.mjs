const number = (value) => Number(value).toFixed(2).replace(/\.00$/, '');
const points = (values) => values.map((point) => `${number(point.x)},${number(point.y)}`).join(' ');

export function renderEarthFallback(earth) {
  const patterns = earth.hatchIslands.map((island, index) =>
    `<pattern id="hatch-${index + 1}" width="${island.spacing}" height="${island.spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(${island.angle})"><line x1="0" y1="0" x2="0" y2="${island.spacing}" stroke="${island.color}" stroke-opacity="0.72" stroke-width="1.2"/></pattern>`,
  );
  const washes = earth.washes.map((wash) =>
    `<polygon data-mark="wash" points="${points(wash.points)}" fill="${wash.color}" fill-opacity="${number(wash.opacity / 255)}"/>`,
  );
  const organic = earth.organicStrokes.map((stroke) =>
    `<polyline data-mark="organic-stroke" points="${points(stroke.points)}" fill="none" stroke="${stroke.color}" stroke-opacity="0.58" stroke-width="${number(stroke.weight * 1.3)}" stroke-linecap="round" stroke-linejoin="round"/>`,
  );
  const hatch = earth.hatchIslands.map((island, index) =>
    `<polygon data-mark="hatch-island" points="${points(island.points)}" fill="url(#hatch-${index + 1})"/>`,
  );
  const mesh = earth.meshTriangles.map((triangle) =>
    `<polygon data-mark="mesh-triangle" points="${points(triangle.points)}" fill="${triangle.color}" fill-opacity="${number(triangle.opacity / 255)}" stroke="${triangle.color}" stroke-opacity="0.74" stroke-width="0.82"/>`,
  );
  const triangle = [...earth.outerTriangle, earth.outerTriangle[0]];

  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720" aria-hidden="true" focusable="false">',
    '<defs>',
    `<clipPath id="earth-clip"><circle cx="${earth.circle.x}" cy="${earth.circle.y}" r="${earth.circle.r}"/></clipPath>`,
    '<filter id="organic-rough" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="27" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2"/></filter>',
    ...patterns,
    '</defs>',
    '<g clip-path="url(#earth-clip)">',
    '<g filter="url(#organic-rough)">',
    ...washes,
    ...organic,
    ...hatch,
    '</g>',
    ...mesh,
    '</g>',
    `<circle data-mark="earth-circle" cx="${earth.circle.x}" cy="${earth.circle.y}" r="${earth.circle.r}" fill="none" stroke="#394bd4" stroke-opacity="0.82" stroke-width="1.4"/>`,
    `<polyline data-mark="outer-triangle" points="${points(triangle)}" fill="none" stroke="#2637b8" stroke-opacity="0.88" stroke-width="1.55" stroke-linejoin="round"/>`,
    '</svg>',
  ].join('\n');
}
