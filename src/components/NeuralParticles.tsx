"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  fpsLimit: 60,
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  particles: {
    number: {
      value: 55,
      density: { enable: true },
    },
    color: {
      value: ["#7C3AED", "#06B6D4", "#a78bfa", "#22d3ee"],
    },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.2, max: 0.55 },
      animation: {
        enable: true,
        speed: 0.8,
        sync: false,
      },
    },
    size: {
      value: { min: 1.5, max: 3.5 },
      animation: {
        enable: true,
        speed: 1.2,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 160,
      color: "#7C3AED",
      opacity: 0.18,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: false,
      },
      resize: { enable: true },
    },
    modes: {
      grab: {
        distance: 180,
        links: { opacity: 0.45 },
      },
    },
  },
  detectRetina: true,
};

export function NeuralParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="neural-particles"
      options={particleOptions}
      className="absolute inset-0 z-0"
    />
  );
}
