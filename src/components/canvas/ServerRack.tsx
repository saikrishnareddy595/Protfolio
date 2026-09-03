"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope, inverseLerp, seeded, smoothstep } from "@/lib/math";

/**
 * Scene 04 — the light streaks condense into a monolithic rack that makes a
 * full 360° turn across the section. Because the turn shows every side, the
 * rear gets its own blade panel and the flanks get vent grilles: there is no
 * blank face to rotate through.
 */

const RACK_H = 7.4;
const RACK_W = 4.6;
const RACK_D = 2.6;
const BLADES = 20;
const REAR_BLADES = 16;

type Panel = { pos: THREE.Vector3; rot: THREE.Euler; scale: THREE.Vector3 };
type Led = { pos: THREE.Vector3; rot: THREE.Euler; color: THREE.Color; phase: number; rate: number };

const CYBER = new THREE.Color("#4cc9ff");
const VIOLET = new THREE.Color("#a06bff");
const AMBER = new THREE.Color("#ffc978");
const MINT = new THREE.Color("#7dffb8");

function buildRack(ledsPerBlade: number) {
  const rand = seeded(556677);
  const panels: Panel[] = [];
  const leds: Led[] = [];
  const flat = new THREE.Euler();

  // ---- Front blade stack -------------------------------------------------
  const top = RACK_H / 2 - 0.7;
  const step = (RACK_H - 1.7) / (BLADES - 1);
  for (let i = 0; i < BLADES; i++) {
    const y = top - i * step;
    panels.push({
      pos: new THREE.Vector3(0, y, RACK_D / 2 - 0.05),
      rot: flat,
      scale: new THREE.Vector3(RACK_W - 0.5, step * 0.7, 0.12),
    });

    for (let j = 0; j < ledsPerBlade; j++) {
      // Left half reads as AWS, right half as Azure; the last one is status.
      const x = -RACK_W / 2 + 0.45 + (j / (ledsPerBlade - 1)) * (RACK_W - 0.9);
      const color = j === ledsPerBlade - 1 ? AMBER : j < ledsPerBlade / 2 ? CYBER : VIOLET;
      leds.push({
        pos: new THREE.Vector3(x, y + step * 0.05, RACK_D / 2 + 0.025),
        rot: flat,
        color,
        phase: rand(),
        rate: 0.6 + rand() * 3.4,
      });
    }
  }

  // ---- Rear I/O panel ----------------------------------------------------
  const rStep = (RACK_H - 2.2) / (REAR_BLADES - 1);
  for (let i = 0; i < REAR_BLADES; i++) {
    const y = RACK_H / 2 - 1.0 - i * rStep;
    panels.push({
      pos: new THREE.Vector3(0, y, -RACK_D / 2 + 0.05),
      rot: flat,
      scale: new THREE.Vector3(RACK_W - 0.7, rStep * 0.5, 0.12),
    });
    // Port activity lights, sparser and cooler than the front.
    for (let j = 0; j < 4; j++) {
      const x = -RACK_W / 2 + 0.7 + (j / 3) * (RACK_W - 1.4);
      leds.push({
        pos: new THREE.Vector3(x, y, -RACK_D / 2 - 0.025),
        rot: flat,
        color: j % 2 === 0 ? MINT : AMBER,
        phase: rand(),
        rate: 1.2 + rand() * 4,
      });
    }
  }

  // ---- Side vent grilles -------------------------------------------------
  const vents = 34;
  for (let s = 0; s < 2; s++) {
    const dir = s === 0 ? 1 : -1;
    for (let i = 0; i < vents; i++) {
      const y = RACK_H / 2 - 0.8 - (i / (vents - 1)) * (RACK_H - 1.6);
      panels.push({
        pos: new THREE.Vector3((RACK_W / 2 - 0.02) * dir, y, 0),
        rot: flat,
        scale: new THREE.Vector3(0.06, 0.075, RACK_D - 0.5),
      });
    }
  }

  // ---- Top vent ----------------------------------------------------------
  for (let i = 0; i < 12; i++) {
    const z = -RACK_D / 2 + 0.42 + (i / 11) * (RACK_D - 0.84);
    panels.push({
      pos: new THREE.Vector3(0, RACK_H / 2 - 0.01, z),
      rot: flat,
      scale: new THREE.Vector3(RACK_W - 0.7, 0.06, 0.07),
    });
  }

  return { panels, leds };
}

export function ServerRack() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const panelRef = useRef<THREE.InstancedMesh>(null);
  const ledRef = useRef<THREE.InstancedMesh>(null);
  const fade = useRef(0);

  const ledsPerBlade = scroll.tier === "low" ? 5 : 7;
  const { panels, leds } = useMemo(() => buildRack(ledsPerBlade), [ledsPerBlade]);

  useLayoutEffect(() => {
    const mesh = panelRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    panels.forEach((p, i) => {
      q.setFromEuler(p.rot);
      m.compose(p.pos, q, p.scale);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [panels]);

  useLayoutEffect(() => {
    const mesh = ledRef.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3(0.1, 0.03, 0.02);
    leds.forEach((l, i) => {
      m.compose(l.pos, q, s);
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, l.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [leds]);

  const ledColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    const p = scroll.progress;

    const target = envelope(p, TIMELINE.rack.in, TIMELINE.rack.hold, TIMELINE.rack.out, TIMELINE.rack.end);
    fade.current = damp(fade.current, target, 7, d);
    const o = fade.current;

    g.visible = o > 0.004;
    if (!g.visible) return;

    // Condense out of the streaks: the rack assembles as it fades in.
    const assemble = smoothstep(inverseLerp(TIMELINE.rack.in, 0.78, p));
    g.scale.setScalar(0.84 + assemble * 0.16);

    // A full 360° across the section, plus a pointer-driven nudge.
    const turn = smoothstep(inverseLerp(0.7, 0.95, p));
    if (spin.current) {
      spin.current.rotation.y = damp(
        spin.current.rotation.y,
        -0.5 + turn * Math.PI * 2 + scroll.smoothX * 0.2,
        6,
        d
      );
      spin.current.rotation.x = damp(spin.current.rotation.x, scroll.smoothY * 0.08, 4, d);
    }

    const offset = state.size.width >= 1100 ? 4.7 : state.size.width >= 760 ? 2.2 : 0;
    g.position.x = damp(g.position.x, offset + scroll.smoothX * 0.4, 3, d);
    g.position.y = damp(g.position.y, 0.35 + Math.sin(t * 0.4) * 0.08 + scroll.smoothY * 0.2, 3, d);

    // LED activity: independent blink rates keep it reading as live hardware.
    const mesh = ledRef.current;
    if (mesh && !scroll.reducedMotion) {
      for (let i = 0; i < leds.length; i++) {
        const l = leds[i];
        const blink = 0.3 + 0.7 * Math.pow(0.5 + 0.5 * Math.sin(t * l.rate + l.phase * 12.5), 2);
        ledColor.copy(l.color).multiplyScalar(blink * 2.6 * o);
        mesh.setColorAt(i, ledColor);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    g.traverse((child) => {
      const mesh2 = child as THREE.Mesh;
      const mat = mesh2.material as THREE.Material | undefined;
      if (mat && "opacity" in mat) (mat as THREE.Material).opacity = o;
    });
  });

  return (
    <group ref={group} position={[0, 0.35, SCENE_Z.rack]}>
      {/* Studio rig, parented to the rack so it travels with it. */}
      <spotLight
        position={[7, 7, 12]}
        angle={0.7}
        penumbra={0.9}
        intensity={900}
        distance={40}
        color="#eaf4ff"
      />
      <pointLight position={[-9, 2, 6]} intensity={420} distance={34} color="#4cc9ff" />
      <pointLight position={[8, -3, -8]} intensity={380} distance={34} color="#a06bff" />
      <pointLight position={[0, 6, -10]} intensity={220} distance={30} color="#ffffff" />

      <group ref={spin}>
        {/* Chassis */}
        <RoundedBox args={[RACK_W, RACK_H, RACK_D]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#1a1d24"
            metalness={0.88}
            roughness={0.24}
            envMapIntensity={2.4}
            transparent
          />
        </RoundedBox>

        {/* Front bezel recess */}
        <mesh position={[0, 0, RACK_D / 2 - 0.1]}>
          <boxGeometry args={[RACK_W - 0.3, RACK_H - 0.45, 0.06]} />
          <meshStandardMaterial color="#080a0e" metalness={0.45} roughness={0.65} transparent />
        </mesh>

        {/* Blades, rear I/O, vents — all one instanced draw. */}
        <instancedMesh ref={panelRef} args={[undefined, undefined, panels.length]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#252932"
            metalness={0.8}
            roughness={0.28}
            envMapIntensity={2.0}
            transparent
          />
        </instancedMesh>

        {/* Status LEDs */}
        <instancedMesh ref={ledRef} args={[undefined, undefined, leds.length]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            transparent
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </instancedMesh>

        {/* Vertical light seams on all four corners, so every angle glows. */}
        {[
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ].map(([sx, sz]) => (
          <mesh
            key={`${sx}${sz}`}
            position={[(RACK_W / 2 - 0.02) * sx, 0, (RACK_D / 2 - 0.02) * sz]}
          >
            <boxGeometry args={[0.035, RACK_H - 1.1, 0.035]} />
            <meshBasicMaterial
              color={sx === 1 ? "#4cc9ff" : "#a06bff"}
              transparent
              toneMapped={false}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default ServerRack;
