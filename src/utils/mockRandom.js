/** Deterministic pseudo-random generator so the same seed always yields the same mock figures. */
export function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
    h |= 0;
  }
  h = Math.imul(h ^ (h >>> 15), 1 | h);
  h ^= h + Math.imul(h ^ (h >>> 7), 61 | h);
  return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
}

export function seededInt(seed, min, max) {
  return min + Math.floor(seededRandom(seed) * (max - min + 1));
}

/** Distributes `total` across `districts` with realistic variance. Sorted highest to lowest unless `sort: false`. */
export function districtBreakdown(seedKey, total, districts, { sort = true } = {}) {
  const weights = districts.map((d) => 0.35 + seededRandom(seedKey + d));
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const result = districts.map((district, i) => ({ district, value: Math.round((weights[i] / weightSum) * total) }));
  return sort ? result.sort((a, b) => b.value - a.value) : result;
}
