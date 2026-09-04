"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope } from "@/lib/math";
import Portrait, { usePortraitTexture } from "./Portrait";

/**
 * Hero subject.
 *
 * No portrait ships with the site, so the hero is the abstract neural lattice
 * below, turning slowly inside the particle field. Dropping an image into `public/avatar.*` (plus its depth
 * companion — see `public/README.md`) switches the hero to that artwork,
 * rendered as displaced 3D geometry by `Portrait.tsx`.
 */

/** A slowly turning lattice of glowing nodes. */
function NeuralCore() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const fade = useRef(0);

  // Low subdivision on purpose: a dense wireframe sphere reads as a generic
  // globe, where a coarse one reads as a constructed lattice.
  const shellGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.32, 1), []);
  const innerGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.82, 0), []);

  // One glowing node per lattice vertex, deduplicated — the geometry is
  // non-indexed, so every vertex is repeated once per face touching it.
  const vertices = useMemo(() => {
    const pos = shellGeometry.getAttribute("position");
    const seen = new Set<string>();
    const out: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const key = `${v.x.toFixed(3)}|${v.y.toFixed(3)}|${v.z.toFixed(3)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(v);
    }
    return out;
  }, [shellGeometry]);

  useEffect(() => {
    return () => {
      shellGeometry.dispose();
      innerGeometry.dispose();
    };
  }, [shellGeometry, innerGeometry]);

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
      node: new THREE.MeshBasicMaterial({
        color: new THREE.Color(1.1, 1.9, 2.4),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    }),
    []
  );

  useEffect(() => {
    const held = materials;
    return () => Object.values(held).forEach((m) => m.dispose());
  }, [materials]);

  const scratch = useMemo(
    () => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: new THREE.Vector3() }),
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

    materials.shell.opacity = o * 0.5;
    materials.inner.opacity = o * 0.34;
    // Additive blending multiplies colour by alpha, so alpha carries the
    // scroll fade only — the per-node pulse rides on scale instead.
    materials.node.opacity = o;

    // Nodes breathe out of phase with one another so the lattice never reads
    // as a single rigid object.
    const mesh = nodes.current;
    if (mesh) {
      const { m, q, s } = scratch;
      q.identity();
      for (let i = 0; i < vertices.length; i++) {
        const pulse = scroll.reducedMotion
          ? 1
          : 0.7 + 0.5 * Math.pow(0.5 + 0.5 * Math.sin(t * 1.6 + i * 1.7), 2);
        s.setScalar(0.032 * pulse);
        m.compose(vertices[i], q, s);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    if (!scroll.reducedMotion) {
      g.rotation.y += d * 0.12;
      g.rotation.x = Math.sin(t * 0.21) * 0.16;
    }

    const offset = state.size.width >= 1100 ? 2.4 : state.size.width >= 760 ? 1.3 : 0;
    g.position.x = damp(g.position.x, offset + scroll.smoothX * 0.3, 4, d);
    g.position.y = damp(
      g.position.y,
      (state.size.width >= 760 ? 0.35 : 0.9) + Math.sin(t * 0.5) * 0.08,
      4,
      d
    );
    g.rotation.z = damp(g.rotation.z, scroll.smoothX * 0.12, 3, d);
  });

  return (
    <group ref={group} position={[0, 0.35, SCENE_Z.avatar]}>
      <mesh geometry={shellGeometry} material={materials.shell} />
      <mesh geometry={innerGeometry} material={materials.inner} rotation={[0.6, 0.4, 0]} />
      <instancedMesh
        ref={nodes}
        args={[undefined, undefined, vertices.length]}
        material={materials.node}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 8, 8]} />
      </instancedMesh>
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
