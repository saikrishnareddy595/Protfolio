export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Frame-rate independent damping. `lambda` is roughly "smoothing strength". */
export const damp = (a: number, b: number, lambda: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-lambda * dt));

export const inverseLerp = (a: number, b: number, v: number) =>
  a === b ? 0 : clamp((v - a) / (b - a));

export const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

export const smootherstep = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

/** Progress inside [start, end] of a global 0..1 value, eased. */
export const band = (v: number, start: number, end: number) =>
  smoothstep(inverseLerp(start, end, v));

/**
 * A 0 → 1 → 0 envelope: ramps up over [a, b], holds through [b, c],
 * ramps down over [c, d]. Used to fade scenes in and out of the timeline.
 */
export const envelope = (v: number, a: number, b: number, c: number, d: number) => {
  if (v <= a || v >= d) return 0;
  if (v < b) return smoothstep(inverseLerp(a, b, v));
  if (v <= c) return 1;
  return 1 - smoothstep(inverseLerp(c, d, v));
};

/** Piecewise-linear keyframe evaluation with smooth interpolation. */
export const keyframes = (v: number, points: [number, number][]) => {
  if (points.length === 0) return 0;
  if (v <= points[0][0]) return points[0][1];
  const last = points[points.length - 1];
  if (v >= last[0]) return last[1];
  for (let i = 0; i < points.length - 1; i++) {
    const [t0, v0] = points[i];
    const [t1, v1] = points[i + 1];
    if (v >= t0 && v <= t1) {
      return lerp(v0, v1, smoothstep(inverseLerp(t0, t1, v)));
    }
  }
  return last[1];
};

/** Deterministic pseudo-random so geometry is identical on server and client. */
export const seeded = (seed: number) => {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
};
