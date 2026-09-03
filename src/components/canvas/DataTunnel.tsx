"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope, seeded } from "@/lib/math";

/**
 * Scene 03 — the graph dissolves into a neon corridor of streaming events.
 * Streak length is bound to live scroll velocity, so flicking the wheel
 * physically stretches the light into hyperspace and easing off relaxes it.
 */

const LENGTH = SCENE_Z.tunnelStart - SCENE_Z.tunnelEnd; // positive span

const WALL_VERT = /* glsl */ `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const WALL_FRAG = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uSpeed;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying vec2 vUv;
  varying float vDepth;

  void main() {
    // Longitudinal rails + travelling rings = a data pipe, not a disco tube.
    float rails = smoothstep(0.86, 1.0, sin(vUv.x * 226.19) * 0.5 + 0.5);

    float ringPos = fract(vUv.y * 26.0 - uTime * uSpeed);
    float rings = smoothstep(0.94, 1.0, 1.0 - ringPos) * 0.9;

    float pulse = 0.5 + 0.5 * sin(vUv.y * 8.0 - uTime * 1.4);

    float mask = rails * (0.28 + 0.72 * pulse) + rings * 0.55;

    // Fade the pipe out close to the camera so we never see the seam.
    float near = smoothstep(1.5, 12.0, vDepth);
    float far = 1.0 - smoothstep(46.0, 74.0, vDepth);

    vec3 col = mix(uColorA, uColorB, vUv.y);
    gl_FragColor = vec4(col * mask, mask * uOpacity * near * far);
    if (gl_FragColor.a < 0.004) discard;
    #include <colorspace_fragment>
  }
`;

export function DataTunnel() {
  const group = useRef<THREE.Group>(null);
  const streaks = useRef<THREE.InstancedMesh>(null);
  const wallMat = useRef<THREE.ShaderMaterial>(null);
  const fade = useRef(0);
  const stretch = useRef(1);
  const flow = useRef(0);

  const count = scroll.tier === "low" ? 220 : scroll.tier === "mid" ? 400 : 640;

  const seeds = useMemo(() => {
    const rand = seeded(31337);
    return Array.from({ length: count }, () => {
      const angle = rand() * Math.PI * 2;
      const radius = 3.8 + Math.pow(rand(), 0.75) * 10.2;
      return {
        angle,
        radius,
        z: rand() * LENGTH,
        speed: 6 + rand() * 26,
        len: 0.8 + Math.pow(rand(), 2.2) * 5,
        width: 0.012 + rand() * 0.036,
        tint: Math.pow(rand(), 1.4),
      };
    });
  }, [count]);

  useLayoutEffect(() => {
    const mesh = streaks.current;
    if (!mesh) return;
    const a = new THREE.Color("#4cc9ff");
    const b = new THREE.Color("#a06bff");
    const c = new THREE.Color();
    seeds.forEach((s, i) => {
      c.copy(a).lerp(b, s.tint).multiplyScalar(1.35 + s.tint * 0.6);
      mesh.setColorAt(i, c);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [seeds]);

  // Initial values only — R3F clones this onto the material, so per-frame
  // updates go through `wallMat.current.uniforms`.
  const wallUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uSpeed: { value: 1 },
      uColorA: { value: new THREE.Color("#2a86b8") },
      uColorB: { value: new THREE.Color("#6d43b8") },
    }),
    []
  );

  const scratch = useMemo(
    () => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), v: new THREE.Vector3(), s: new THREE.Vector3() }),
    []
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    const p = scroll.progress;

    const target = envelope(p, TIMELINE.tunnel.in, TIMELINE.tunnel.hold, TIMELINE.tunnel.out, TIMELINE.tunnel.end);
    fade.current = damp(fade.current, target, 7, d);
    const o = fade.current;

    g.visible = o > 0.004;
    if (!g.visible) return;

    // Scroll velocity → streak length. This is the whole trick of the scene.
    const v = Math.min(Math.abs(scroll.velocity), 1);
    const targetStretch = scroll.reducedMotion ? 1 : 1 + v * 11;
    stretch.current = damp(stretch.current, targetStretch, 5, d);
    flow.current += d * (scroll.reducedMotion ? 2 : 10 + v * 170);

    const mesh = streaks.current;
    if (mesh) {
      const { m, q, v: pos, s } = scratch;
      q.identity();
      for (let i = 0; i < seeds.length; i++) {
        const sd = seeds[i];
        // Wrap along the corridor; the camera flies the other way for parallax.
        let z = (sd.z + flow.current * (sd.speed / 16)) % LENGTH;
        if (z < 0) z += LENGTH;
        pos.set(Math.cos(sd.angle) * sd.radius, Math.sin(sd.angle) * sd.radius, -z);
        s.set(sd.width, sd.width, sd.len * stretch.current);
        m.compose(pos, q, s);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = o * 0.78;
    }

    const wu = wallMat.current?.uniforms;
    if (wu) {
      wu.uTime.value = t;
      wu.uOpacity.value = o * 0.42;
      wu.uSpeed.value = 0.5 + v * 5;
    }

    // A slow roll makes the corridor feel like it has depth and banking.
    g.rotation.z = damp(g.rotation.z, t * 0.06 + scroll.smoothX * 0.16, 3, d);
    g.position.x = damp(g.position.x, scroll.smoothX * 0.6, 3, d);
    g.position.y = damp(g.position.y, scroll.smoothY * 0.4, 3, d);
  });

  return (
    <group ref={group} position={[0, 0, SCENE_Z.tunnelStart]}>
      <instancedMesh ref={streaks} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          opacity={0}
        />
      </instancedMesh>

      {/* The pipe wall itself, seen from the inside. */}
      <mesh position={[0, 0, -LENGTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[15, 15, LENGTH, 64, 1, true]} />
        <shaderMaterial
          ref={wallMat}
          vertexShader={WALL_VERT}
          fragmentShader={WALL_FRAG}
          uniforms={wallUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default DataTunnel;
