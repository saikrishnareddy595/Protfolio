"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope } from "@/lib/math";
import Portrait, { usePortraitTexture } from "./Portrait";

/**
 * Hero subject.
 *
 * The hero renders the supplied avatar artwork (`public/avatar.*`) as a
 * floating glass slab — see `Portrait.tsx`. When no artwork is present it
 * falls back to an abstract neural core rather than a stand-in likeness: a
 * wrong face is worse than no face.
 */

/** Abstract fallback: a slowly turning lattice with a hot emissive centre. */
function NeuralCore() {
  const group = useRef<THREE.Group>(null);
  const fade = useRef(0);

  const materials = useMemo(
    () => ({
      shell: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#4cc9ff"),
        wireframe: true,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
      inner: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#a06bff"),
        wireframe: true,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
      core: new THREE.MeshBasicMaterial({
        color: new THREE.Color("#dff2ff"),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    }),
    []
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;

    const target = envelope(
      scroll.progress,
      TIMELINE.hero.in,
      TIMELINE.hero.hold,
      TIMELINE.hero.out,
      TIMELINE.hero.end
    );
    fade.current = damp(fade.current, target, 9, d);
    const o = fade.current;

    g.visible = o > 0.004;
    if (!g.visible) return;

    materials.shell.opacity = o * 0.32;
    materials.inner.opacity = o * 0.22;
    materials.core.opacity = o * (0.5 + 0.2 * Math.sin(t * 1.3));

    if (!scroll.reducedMotion) {
      g.rotation.y += d * 0.12;
      g.rotation.x = Math.sin(t * 0.21) * 0.16;
    }

    const offset = state.size.width >= 1100 ? 1.95 : state.size.width >= 760 ? 1.1 : 0;
    g.position.x = damp(g.position.x, offset, 4, d);
    g.position.y = damp(g.position.y, 0.25 + Math.sin(t * 0.5) * 0.08, 4, d);
    g.rotation.z = damp(g.rotation.z, scroll.smoothX * 0.12, 3, d);
  });

  return (
    <group ref={group} position={[0, 0.25, SCENE_Z.avatar]}>
      <mesh material={materials.shell}>
        <icosahedronGeometry args={[1.85, 2]} />
      </mesh>
      <mesh material={materials.inner} rotation={[0.6, 0.4, 0]}>
        <icosahedronGeometry args={[1.15, 1]} />
      </mesh>
      <mesh material={materials.core}>
        <sphereGeometry args={[0.28, 24, 24]} />
      </mesh>
    </group>
  );
}

/**
 * Picks the real portrait when the artwork is available. Nothing renders while
 * the image is still decoding — the intro loader covers that window.
 */
export function Avatar() {
  const { texture, depth, state } = usePortraitTexture();
  if (state === "ready" && texture) return <Portrait texture={texture} depth={depth} />;
  if (state === "missing") return <NeuralCore />;
  return null;
}

export default Avatar;
