const clamp = function clamp(x, a, b) {
  return Math.max(a, Math.min(x, b));
};

const smoothstep = function smoothstep(edge0, edge1, x) {
  // Scale, bias and saturate x to 0..1 range
  const newX = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  // Evaluate polynomial
  return newX * newX * (3 - 2 * newX);
};

export default smoothstep;
