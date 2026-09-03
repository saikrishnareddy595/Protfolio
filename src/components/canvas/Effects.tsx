"use client";

import { useMemo } from "react";
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import type { PerfTier } from "@/lib/scroll";

/**
 * Bloom is what turns additive geometry into "neon". Everything else here is
 * restraint: a hint of aberration at the edges, a vignette, and film grain to
 * kill banding on the near-black background.
 */
export function Effects({ tier, reducedMotion }: { tier: PerfTier; reducedMotion: boolean }) {
  const aberration = useMemo(() => new THREE.Vector2(0.00055, 0.00075), []);

  if (tier === "low") {
    return (
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom mipmapBlur intensity={0.75} luminanceThreshold={0.3} luminanceSmoothing={0.3} radius={0.6} />
        <Vignette offset={0.24} darkness={0.72} eskil={false} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={tier === "high" ? 4 : 0} enableNormalPass={false}>
      <Bloom
        mipmapBlur
        intensity={reducedMotion ? 0.9 : 1.25}
        luminanceThreshold={0.22}
        luminanceSmoothing={0.32}
        radius={0.78}
      />
      <ChromaticAberration
        offset={aberration}
        radialModulation
        modulationOffset={0.35}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.22} />
      <Vignette offset={0.2} darkness={0.78} eskil={false} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}

export default Effects;
