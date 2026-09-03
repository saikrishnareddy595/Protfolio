"use client";

import { chapters } from "./content";

/**
 * A single mutable object shared between the GSAP ScrollTrigger driver (DOM)
 * and every `useFrame` callback in the R3F scene. Writing here instead of to
 * React state is what keeps the 3D layer at 60fps: scroll never triggers a
 * React render.
 */

export type PerfTier = "low" | "mid" | "high";

export type ScrollState = {
  /** 0 → 1 across the whole page. */
  progress: number;
  /** Smoothed scroll velocity, roughly -1 → 1. Drives the data-tunnel stretch. */
  velocity: number;
  /** Instantaneous delta of `progress` per frame, before smoothing. */
  delta: number;
  /** Pointer position in normalised device coordinates (-1 → 1). */
  pointerX: number;
  pointerY: number;
  /** Damped pointer, used for parallax so the avatar never snaps. */
  smoothX: number;
  smoothY: number;
  /** Set once the intro loader has finished. */
  ready: boolean;
  reducedMotion: boolean;
  tier: PerfTier;
  /** The live smooth-scroll instance, when one is running. */
  lenis: { scrollTo: (target: number | string | HTMLElement, opts?: object) => void } | null;
};

export const scroll: ScrollState = {
  progress: 0,
  velocity: 0,
  delta: 0,
  pointerX: 0,
  pointerY: 0,
  smoothX: 0,
  smoothY: 0,
  ready: false,
  reducedMotion: false,
  tier: "high",
  lenis: null,
};

/**
 * Scene bands along the global 0 → 1 timeline. The HTML sections and the 3D
 * scenes both derive from these numbers, so the copy always lines up with
 * whatever is on screen behind it.
 */
export const TIMELINE = {
  hero: { in: -0.06, hold: 0.0, out: 0.085, end: 0.135 },
  graph: { in: 0.17, hold: 0.26, out: 0.38, end: 0.44 },
  tunnel: { in: 0.4, hold: 0.5, out: 0.62, end: 0.7 },
  rack: { in: 0.66, hold: 0.76, out: 0.92, end: 0.99 },
} as const;

/**
 * Camera dolly along -Z. Each scene owns a slab of world space, so flying
 * "into" the network is a real translation rather than a cross-fade.
 */
export const CAMERA_Z: [number, number][] = [
  [0.0, 9],
  [0.08, 8.2],
  [0.12, 5.5],
  [0.17, -6],
  [0.21, -16],
  [0.3, -19.5],
  [0.38, -23],
  [0.44, -33],
  [0.5, -70],
  [0.62, -96],
  [0.7, -110],
  [0.78, -117.5],
  [0.93, -119.5],
  [1.0, -120],
];

export const SCENE_Z = {
  avatar: 0,
  graph: -42,
  tunnelStart: -58,
  tunnelEnd: -112,
  rack: -134,
} as const;

/** Section heights in vh, in scroll order. The 3D timeline is tuned to these. */
export const SECTION_VH = {
  hero: 140,
  scene: 220,
  contact: 160,
} as const;

/**
 * Where each section's top must land on the 0 → 1 timeline. Applied by
 * measuring the real DOM, so the scenes stay locked to the copy even when a
 * section renders taller than nominal. Sourced from the chapter list so the
 * ids can never drift away from the sections they address.
 */
export const TIMELINE_STOPS: { id: string; t: number }[] = chapters.map(
  ({ id, t }) => ({ id, t })
);

/**
 * Navigate to a section. Routes through the smooth-scroll instance when one is
 * running so nav clicks glide instead of teleporting, and falls back to native
 * scrolling when it isn't (reduced motion, or before hydration).
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (scroll.lenis) {
    scroll.lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    return;
  }
  el.scrollIntoView({ behavior: scroll.reducedMotion ? "auto" : "smooth", block: "start" });
}

export function detectTier(): PerfTier {
  if (typeof window === "undefined") return "high";
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 820;
  if (cores <= 4 || mem <= 4 || (coarse && narrow)) return "low";
  if (cores <= 8 || mem <= 8 || coarse) return "mid";
  return "high";
}
