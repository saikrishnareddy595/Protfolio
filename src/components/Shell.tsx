"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { detectTier, scroll, type PerfTier } from "@/lib/scroll";
import ScrollDriver from "./ScrollDriver";
import Nav from "./ui/Nav";
import ScrollRail from "./ui/ScrollRail";
import Loader from "./ui/Loader";
import Hero from "./ui/Hero";
import SceneSection from "./ui/SceneSection";
import Closing from "./ui/Closing";
import { scenes } from "@/lib/content";

// The WebGL layer never renders on the server: it has no meaningful HTML output
// and shipping it into the SSR pass would only delay first paint of the copy.
const Scene = dynamic(() => import("./canvas/Scene"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function Shell() {
  const [tier, setTier] = useState<PerfTier | null>(null);
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [started, setStarted] = useState(false);

  // Everything the 3D layer needs to know about this device, resolved once
  // before the canvas mounts so no scene has to re-initialise later.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      scroll.reducedMotion = mq.matches;
      setReduced(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);

    const t = detectTier();
    scroll.tier = t;
    setTier(t);
    setWebgl(hasWebGL());

    return () => mq.removeEventListener("change", apply);
  }, []);

  // Give the first frames a beat to compile shaders before revealing the page.
  useEffect(() => {
    if (tier === null) return;
    if (!webgl) {
      setCanvasReady(true);
      return;
    }
    const id = setTimeout(() => setCanvasReady(true), 900);
    return () => clearTimeout(id);
  }, [tier, webgl]);

  const onExit = useCallback(() => {
    scroll.ready = true;
    setStarted(true);
  }, []);

  const toggleMotion = useCallback(() => {
    setReduced((v) => {
      scroll.reducedMotion = !v;
      return !v;
    });
  }, []);

  return (
    <>
      <Loader done={canvasReady} onExit={onExit} />

      {/* ---- The fixed 3D backdrop ---- */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        {tier && webgl ? (
          <Scene tier={tier} reduced={reduced} />
        ) : (
          // Static stand-in when WebGL is unavailable — the page still reads.
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(76,201,255,0.14),transparent_60%),radial-gradient(90%_70%_at_20%_80%,rgba(160,107,255,0.12),transparent_60%)]" />
        )}
        <div className="grain absolute inset-0" />
      </div>

      <ScrollDriver />
      <Nav reduced={reduced} onToggleMotion={toggleMotion} />
      <ScrollRail />

      {/* ---- The HTML story ---- */}
      <main className="relative z-10">
        <Hero started={started} />
        <SceneSection scene={scenes[0]} align="left" />
        <SceneSection scene={scenes[1]} align="right" />
        <SceneSection scene={scenes[2]} align="left" />
        <Closing />
      </main>
    </>
  );
}

export default Shell;
