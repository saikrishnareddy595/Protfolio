"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scroll, TIMELINE_STOPS } from "@/lib/scroll";
import { clamp } from "@/lib/math";

gsap.registerPlugin(ScrollTrigger);

/**
 * The bridge between the DOM scrollbar and the 3D world. Everything it
 * produces is written into the plain `scroll` object — never React state — so
 * scrolling does not cost a single re-render.
 *
 * Progress is *remapped* rather than taken raw: each HTML section is measured
 * and pinned to the timeline value its 3D scene expects. Sections whose real
 * height differs from the nominal one (long capability lists on a narrow
 * phone, a taller font fallback) therefore can't drift the scenes out of sync
 * with the copy in front of them.
 */
export function ScrollDriver() {
  useEffect(() => {
    const doc = document.documentElement;
    let rawVelocity = 0;
    let stops: { y: number; t: number }[] = [];

    const measure = () => {
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const next: { y: number; t: number }[] = [];
      for (const stop of TIMELINE_STOPS) {
        const el = document.getElementById(stop.id);
        if (!el) continue;
        const y = el.getBoundingClientRect().top + window.scrollY;
        // Keep the table strictly increasing so the remap stays invertible.
        const prev = next[next.length - 1];
        next.push({ y: prev ? Math.max(y, prev.y + 1) : Math.max(0, y), t: stop.t });
      }
      const last = next[next.length - 1];
      if (!last || max > last.y) next.push({ y: max, t: 1 });
      stops = next;
    };

    const remap = (y: number) => {
      if (stops.length < 2) return 0;
      if (y <= stops[0].y) return stops[0].t;
      for (let i = 0; i < stops.length - 1; i++) {
        const a = stops[i];
        const b = stops[i + 1];
        if (y <= b.y) return a.t + ((y - a.y) / (b.y - a.y)) * (b.t - a.t);
      }
      return 1;
    };

    measure();

    const trigger = ScrollTrigger.create({
      trigger: doc,
      start: "top top",
      end: "bottom bottom",
      onRefresh: measure,
      onUpdate: (self) => {
        scroll.progress = clamp(remap(self.scroll()), 0, 1);
        rawVelocity = clamp(Math.abs(self.getVelocity()) / 2600, 0, 1);
      },
    });

    // Decay + smooth the velocity every tick so the tunnel relaxes naturally
    // instead of snapping back the instant the wheel stops.
    const tick = () => {
      rawVelocity *= 0.9;
      scroll.velocity += (rawVelocity - scroll.velocity) * 0.14;
    };
    gsap.ticker.add(tick);

    const onPointer = (e: PointerEvent) => {
      scroll.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scroll.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    // Device orientation stands in for the mouse on phones and tablets.
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      scroll.pointerX = clamp(e.gamma / 32, -1, 1);
      scroll.pointerY = clamp((e.beta - 45) / 32, -1, 1);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("deviceorientation", onOrientation, { passive: true });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Fonts and images change section heights; re-measure once they land.
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return null;
}

export default ScrollDriver;
