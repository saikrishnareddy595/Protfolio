"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, TIMELINE, SCENE_Z } from "@/lib/scroll";
import { damp, envelope, seeded } from "@/lib/math";
import Portrait, { usePortraitTexture } from "./Portrait";

/**
 * Fallback subject for the hero.
 *
 * The hero normally renders the supplied avatar artwork (see `Portrait.tsx`);
 * this stylised bust — procedural geometry, nothing to download — stands in
 * only when no `public/avatar.*` file is present, so the scene is never empty.
 */

const SKIN = new THREE.Color("#b87d55");
const SKIN_SHADOW = new THREE.Color("#8a5334");
const HAIR = new THREE.Color("#141216");
const BEARD = new THREE.Color("#1a1719");
const KNIT = new THREE.Color("#111114");

/**
 * Maps a unit direction onto the head surface. Used both to deform the base
 * sphere and to plant hair/beard instances, so they always sit flush.
 */
function headSurface(dir: THREE.Vector3, out = new THREE.Vector3()) {
  const d = out.copy(dir).normalize();
  let x = d.x;
  let y = d.y;
  let z = d.z;

  // Taper the lower half of the skull into a jaw and chin.
  const lower = Math.max(0, -y);
  const taper = 1 - 0.3 * lower * lower;
  x *= taper;
  z *= 1 - 0.08 * lower * lower;

  // Slightly flatten the back of the skull, round out the forehead.
  if (z < 0) z *= 0.93;
  if (y > 0.45 && z > 0) z *= 1.03;

  // Push the chin forward and the jawline back.
  if (y < -0.5 && z > 0.25) z += 0.09 * (1 + y);
  // Narrow the temples a touch.
  if (y > 0.25) x *= 1 - 0.06 * (y - 0.25);

  // Global head proportions: slightly tall, slightly narrow front-to-back.
  return out.set(x * 0.86, y * 1.12, z * 0.95);
}

function useHeadGeometry() {
  return useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 96, 96);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const dir = new THREE.Vector3();
    const out = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      dir.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      headSurface(dir, out);
      pos.setXYZ(i, out.x, out.y, out.z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/** A ribbed-knit bump map generated on a canvas — no texture request needed. */
function useKnitTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, size, size);
    for (let x = 0; x < size; x += 6) {
      const g = ctx.createLinearGradient(x, 0, x + 6, 0);
      g.addColorStop(0, "#5a5a5a");
      g.addColorStop(0.5, "#c8c8c8");
      g.addColorStop(1, "#5a5a5a");
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, 6, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(26, 8);
    tex.anisotropy = 4;
    return tex;
  }, []);
}

type Instance = { pos: THREE.Vector3; scale: THREE.Vector3; rot: THREE.Euler };

/** Curly hair volume: tight clustered coils over the scalp, with a real hairline. */
function useHairInstances(count: number): Instance[] {
  return useMemo(() => {
    const rand = seeded(20260903);
    const out: Instance[] = [];
    const dir = new THREE.Vector3();
    const surf = new THREE.Vector3();
    let guard = 0;
    while (out.length < count && guard++ < count * 60) {
      // Sample the upper hemisphere with a bias toward the crown.
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(1 - rand() * 1.35); // 0 = crown
      dir.set(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );

      // Front: a hairline high on the forehead, rising slightly at the temples.
      if (dir.z > 0.2) {
        const hairline = 0.43 + 0.12 * Math.abs(dir.x);
        if (dir.y < hairline) continue;
        // Receding temple notches.
        if (Math.abs(dir.x) > 0.44 && dir.y < 0.66 && rand() > 0.3) continue;
      }
      // Sides: cropped above the ear.
      if (Math.abs(dir.x) > 0.52 && dir.y < 0.05) continue;
      // Back: tapers into the neck.
      if (dir.y < -0.22) continue;

      headSurface(dir, surf);
      const lift = 1.035 + rand() * 0.062;
      const s = 0.044 + rand() * 0.04;
      out.push({
        pos: surf.clone().multiplyScalar(lift),
        scale: new THREE.Vector3(s, s * (0.85 + rand() * 0.32), s),
        rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      });
    }
    return out;
  }, [count]);
}

/** Full beard + moustache, leaving the smile open. */
function useBeardInstances(count: number): Instance[] {
  return useMemo(() => {
    const rand = seeded(778899);
    const out: Instance[] = [];
    const dir = new THREE.Vector3();
    const surf = new THREE.Vector3();
    let guard = 0;
    while (out.length < count && guard++ < count * 40) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(1 - rand() * 2);
      dir.set(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );
      if (dir.z < 0.05) continue;

      const sideness = Math.min(1, Math.abs(dir.x) / 0.6);
      // Higher at the sideburns, with a ragged edge so the cheek line is soft.
      const top = -0.4 + 0.44 * sideness + (rand() - 0.5) * 0.13;
      const isMoustache =
        dir.y > -0.35 && dir.y < -0.19 && Math.abs(dir.x) < 0.3 && dir.z > 0.66;
      if (!isMoustache) {
        if (dir.y > top) continue;
        if (dir.y < -0.92) continue;
        // Keep the mouth clear.
        if (Math.abs(dir.x) < 0.36 && dir.y > -0.6 && dir.y < -0.24 && dir.z > 0.58) continue;
      }

      headSurface(dir, surf);
      const s = 0.028 + rand() * 0.026;
      out.push({
        pos: surf.clone().multiplyScalar(1.014 + rand() * 0.024),
        scale: new THREE.Vector3(s, s * (0.85 + rand() * 0.3), s),
        rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      });
    }
    return out;
  }, [count]);
}

function InstancedBlobs({
  instances,
  color,
  roughness,
  detail,
}: {
  instances: Instance[];
  color: THREE.Color;
  roughness: number;
  detail: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    instances.forEach((inst, i) => {
      q.setFromEuler(inst.rot);
      m.compose(inst.pos, q, inst.scale);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [instances]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, instances.length]}
      castShadow={false}
      frustumCulled={false}
    >
      <icosahedronGeometry args={[1, detail]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={0.04}
        transparent
        flatShading={detail === 0}
      />
    </instancedMesh>
  );
}

/**
 * A stylised almond eye laid flat against the cheekbone rather than a ball
 * pushed through the skull — the group is rotated onto the surface normal so
 * the iris always faces out of the face.
 */
function Eye({ side }: { side: 1 | -1 }) {
  return (
    <group position={[0.3 * side, 0.05, 0.855]} rotation={[-0.06, side * 0.33, 0]}>
      <mesh scale={[0.115, 0.07, 0.045]}>
        <sphereGeometry args={[1, 26, 20]} />
        <meshStandardMaterial color="#e9e0d4" roughness={0.24} transparent />
      </mesh>
      <mesh position={[0, -0.002, 0.03]} scale={[0.053, 0.053, 0.026]}>
        <sphereGeometry args={[1, 22, 18]} />
        <meshStandardMaterial color="#4a2d18" roughness={0.15} transparent />
      </mesh>
      <mesh position={[0, -0.002, 0.045]} scale={[0.024, 0.024, 0.016]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#07050a" roughness={0.04} transparent />
      </mesh>
      {/* Catchlight — sells the studio key light. */}
      <mesh position={[0.02, 0.026, 0.056]}>
        <sphereGeometry args={[0.01, 10, 10]} />
        <meshBasicMaterial color="#ffffff" transparent />
      </mesh>
      {/* Lash line, hugging the top lid. */}
      <mesh position={[0, 0.05, 0.014]} rotation={[0.22, 0, 0]} scale={[0.121, 0.019, 0.036]}>
        <sphereGeometry args={[1, 22, 12]} />
        <meshStandardMaterial color="#1b1417" roughness={0.85} transparent />
      </mesh>
    </group>
  );
}

export function SculptAvatar() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const headGeo = useHeadGeometry();
  const knit = useKnitTexture();

  const density = scroll.tier === "low" ? 0.5 : scroll.tier === "mid" ? 0.75 : 1;
  const hair = useHairInstances(Math.round(1250 * density));
  const beard = useBeardInstances(Math.round(1150 * density));

  const fade = useRef(0);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    const p = scroll.progress;

    const target = envelope(p, TIMELINE.hero.in, TIMELINE.hero.hold, TIMELINE.hero.out, TIMELINE.hero.end);
    fade.current = damp(fade.current, target, 9, d);
    const o = fade.current;

    g.visible = o > 0.004;
    if (!g.visible) return;

    g.traverse((child) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (!mat) return;
      if (Array.isArray(mat)) mat.forEach((m) => (m.opacity = o));
      else mat.opacity = o;
    });

    // Idle float, offset right of centre on desktop to clear the masthead.
    const offset = state.size.width >= 1100 ? 1.95 : state.size.width >= 760 ? 1.1 : 0;
    g.position.x = damp(g.position.x, offset, 4, d);
    g.position.y = -0.42 + Math.sin(t * 0.55) * 0.055 + (state.size.width >= 760 ? 0.35 : 0.75);
    g.position.z = SCENE_Z.avatar + Math.sin(t * 0.34) * 0.05;

    // Mouse-tracked parallax — the torso follows loosely, the head leads.
    const tx = scroll.smoothX;
    const ty = scroll.smoothY;
    g.rotation.y = damp(g.rotation.y, tx * 0.22 + Math.sin(t * 0.25) * 0.02, 4, d);
    g.rotation.x = damp(g.rotation.x, -ty * 0.1, 4, d);

    if (head.current) {
      head.current.rotation.y = damp(head.current.rotation.y, tx * 0.2, 5, d);
      head.current.rotation.x = damp(head.current.rotation.x, -ty * 0.13, 5, d);
    }
  });

  return (
    <group ref={group} position={[0, -0.42, SCENE_Z.avatar]} scale={1.08}>
      {/* ---- Head ---- */}
      <group ref={head} position={[0, 0.92, 0]}>
        <mesh geometry={headGeo}>
          <meshStandardMaterial color={SKIN} roughness={0.58} metalness={0} transparent />
        </mesh>

        {/* Ears */}
        {[1, -1].map((s) => (
          <mesh key={s} position={[0.86 * s, -0.02, -0.02]} rotation={[0, 0, s * 0.16]} scale={[0.09, 0.17, 0.12]}>
            <sphereGeometry args={[1, 20, 20]} />
            <meshStandardMaterial color={SKIN_SHADOW} roughness={0.65} transparent />
          </mesh>
        ))}

        {/* Nose */}
        <mesh position={[0, -0.125, 0.862]} scale={[0.115, 0.15, 0.145]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color={SKIN} roughness={0.55} transparent />
        </mesh>
        {[1, -1].map((s) => (
          <mesh key={s} position={[0.078 * s, -0.2, 0.885]} scale={[0.05, 0.042, 0.05]}>
            <sphereGeometry args={[1, 14, 14]} />
            <meshStandardMaterial color={SKIN_SHADOW} roughness={0.6} transparent />
          </mesh>
        ))}

        {/* Brows */}
        {[1, -1].map((s) => (
          <mesh
            key={s}
            position={[0.3 * s, 0.218, 0.83]}
            rotation={[0.2, s * 0.3, s * 0.19]}
            scale={[0.165, 0.052, 0.075]}
          >
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color={HAIR} roughness={0.85} transparent />
          </mesh>
        ))}

        <Eye side={1} />
        <Eye side={-1} />

        {/* Smile: an open mouth with a hint of teeth. */}
        <group position={[0, -0.42, 0.845]} rotation={[0.1, 0, 0]}>
          <mesh scale={[0.215, 0.07, 0.055]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#2a1113" roughness={0.5} transparent />
          </mesh>
          <mesh position={[0, 0.022, 0.026]} scale={[0.165, 0.03, 0.03]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color="#f4f1ec" roughness={0.28} transparent />
          </mesh>
          <mesh position={[0, -0.035, 0.018]} scale={[0.14, 0.028, 0.028]}>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color="#b8695c" roughness={0.42} transparent />
          </mesh>
        </group>

        <InstancedBlobs instances={hair} color={HAIR} roughness={0.72} detail={1} />
        <InstancedBlobs instances={beard} color={BEARD} roughness={0.88} detail={0} />
      </group>

      {/* ---- Neck ---- */}
      <mesh position={[0, 0.1, -0.02]}>
        <cylinderGeometry args={[0.36, 0.44, 0.62, 32, 1, true]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={0.62} side={THREE.DoubleSide} transparent />
      </mesh>

      {/* Silver chain */}
      <mesh position={[0, -0.1, 0.06]} rotation={[Math.PI / 2 - 0.24, 0, 0]}>
        <torusGeometry args={[0.4, 0.014, 10, 64]} />
        <meshStandardMaterial color="#d9dde4" roughness={0.18} metalness={0.98} transparent />
      </mesh>

      {/* ---- Knit crew-neck sweater ---- */}
      <group position={[0, -1.16, 0]}>
        <mesh scale={[1.55, 1.06, 0.82]}>
          <sphereGeometry args={[1, 48, 40]} />
          <meshPhysicalMaterial
            color={KNIT}
            roughness={0.95}
            metalness={0}
            sheen={1}
            sheenRoughness={0.85}
            sheenColor="#3a3a44"
            bumpMap={knit ?? undefined}
            bumpScale={0.012}
            transparent
          />
        </mesh>
        {/* Shoulders */}
        {[1, -1].map((s) => (
          <mesh key={s} position={[1.26 * s, 0.3, 0]} rotation={[0, 0, s * -0.5]} scale={[0.6, 0.48, 0.5]}>
            <sphereGeometry args={[1, 32, 24]} />
            <meshPhysicalMaterial
              color={KNIT}
              roughness={0.95}
              sheen={1}
              sheenRoughness={0.85}
              sheenColor="#3a3a44"
              bumpMap={knit ?? undefined}
              bumpScale={0.012}
              transparent
            />
          </mesh>
        ))}
        {/* Collar */}
        <mesh position={[0, 0.93, 0.03]} rotation={[Math.PI / 2 - 0.16, 0, 0]}>
          <torusGeometry args={[0.46, 0.08, 14, 48]} />
          <meshPhysicalMaterial
            color="#17171b"
            roughness={0.94}
            sheen={1}
            sheenColor="#41414c"
            bumpMap={knit ?? undefined}
            bumpScale={0.016}
            transparent
          />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Picks the real portrait when the artwork is available and falls back to the
 * sculpt otherwise. Nothing renders while the image is still decoding — the
 * intro loader covers that window.
 */
export function Avatar() {
  const { texture, state } = usePortraitTexture();
  if (state === "ready" && texture) return <Portrait texture={texture} />;
  if (state === "missing") return <SculptAvatar />;
  return null;
}

export default Avatar;
