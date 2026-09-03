"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z } from "@/lib/scroll";
import { damp, envelope, seeded } from "@/lib/math";

/**
 * The neural field: a slow, glowing particle volume wrapped around the avatar
 * and stretching back into the -Z corridor, so the camera flies *through* it
 * on the way to the agent graph.
 *
 * Built from instanced, view-space-billboarded quads rather than gl.POINTS —
 * point sprites cap out at tiny sizes on some drivers, quads never do.
 */

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uOpacity;
  uniform float uDrift;

  attribute vec3 aOffset;
  attribute float aScale;
  attribute float aPhase;
  attribute float aTint;

  varying vec2 vUv;
  varying float vAlpha;
  varying float vTint;

  void main() {
    vec3 p = aOffset;

    // Lazy, organic drift — never quite the same loop twice.
    p.x += sin(uTime * 0.21 + aPhase * 6.283) * uDrift;
    p.y += cos(uTime * 0.17 + aPhase * 4.712) * uDrift;
    p.z += sin(uTime * 0.13 + aPhase * 9.424) * uDrift * 0.6;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    // Billboard in view space: the quad always faces the camera.
    mv.xy += position.xy * (uSize * aScale);

    gl_Position = projectionMatrix * mv;

    float twinkle = 0.5 + 0.5 * sin(uTime * 1.5 + aPhase * 12.566);
    float near = smoothstep(0.9, 6.5, dist);
    float far = 1.0 - smoothstep(48.0, 82.0, dist);

    vUv = uv;
    vAlpha = uOpacity * (0.35 + 0.65 * twinkle) * near * far;
    vTint = aTint;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying vec2 vUv;
  varying float vAlpha;
  varying float vTint;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    // Ascending edges only — a reversed smoothstep is undefined in GLSL.
    float core = 1.0 - smoothstep(0.0, 1.0, d);

    // Tight centre plus a wide halo reads as an emissive node under bloom.
    float alpha = pow(core, 2.2) * 0.55 + pow(core, 9.0);
    if (alpha < 0.004) discard;

    vec3 col = mix(uColorA, uColorB, vTint);
    col += vec3(pow(core, 14.0)) * 0.8;

    gl_FragColor = vec4(col, alpha * vAlpha);
    #include <colorspace_fragment>
  }
`;

export function NeuralField() {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const fade = useRef(0);

  const count = scroll.tier === "low" ? 2000 : scroll.tier === "mid" ? 3800 : 6000;

  const { geometry, synapses } = useMemo(() => {
    const rand = seeded(424242);
    const offsets = new Float32Array(count * 3);
    const scale = new Float32Array(count);
    const phase = new Float32Array(count);
    const tint = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Two thirds form a shell around the subject; the rest tunnel backwards.
      const corridor = rand() > 0.6;
      let x: number, y: number, z: number;

      if (corridor) {
        const r = 3.4 + Math.pow(rand(), 0.6) * 13;
        const a = rand() * Math.PI * 2;
        x = Math.cos(a) * r;
        y = Math.sin(a) * r * 0.72;
        z = -3 - rand() * 34;
      } else {
        const r = 2.6 + Math.pow(rand(), 0.45) * 9;
        const theta = rand() * Math.PI * 2;
        const phi = Math.acos(1 - rand() * 2);
        x = Math.sin(phi) * Math.cos(theta) * r;
        y = Math.cos(phi) * r * 0.82;
        z = Math.sin(phi) * Math.sin(theta) * r * 0.9;
      }

      offsets[i * 3] = x;
      offsets[i * 3 + 1] = y;
      offsets[i * 3 + 2] = z;
      scale[i] = 0.035 + Math.pow(rand(), 2.0) * 0.135;
      phase[i] = rand();
      tint[i] = Math.pow(rand(), 1.6);
    }

    const plane = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = plane.index;
    geo.setAttribute("position", plane.attributes.position);
    geo.setAttribute("uv", plane.attributes.uv);
    geo.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 3));
    geo.setAttribute("aScale", new THREE.InstancedBufferAttribute(scale, 1));
    geo.setAttribute("aPhase", new THREE.InstancedBufferAttribute(phase, 1));
    geo.setAttribute("aTint", new THREE.InstancedBufferAttribute(tint, 1));
    geo.instanceCount = count;
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -16), 64);

    // Sparse synapses between neighbouring nodes: enough to read as a network,
    // few enough that the hero stays quiet. O(n·k) with a small candidate pool.
    const pool: number[] = [];
    for (let i = 0; i < count; i += 7) pool.push(i);
    const segs: number[] = [];
    const colors: number[] = [];
    const a = new THREE.Color("#4cc9ff");
    const b = new THREE.Color("#a06bff");
    const tmp = new THREE.Color();
    const maxLinks = scroll.tier === "low" ? 120 : 320;
    for (let pi = 0; pi < pool.length && segs.length / 6 < maxLinks; pi++) {
      const i = pool[pi];
      const ix = offsets[i * 3];
      const iy = offsets[i * 3 + 1];
      const iz = offsets[i * 3 + 2];
      for (let pj = pi + 1; pj < Math.min(pi + 26, pool.length); pj++) {
        const j = pool[pj];
        const dx = offsets[j * 3] - ix;
        const dy = offsets[j * 3 + 1] - iy;
        const dz = offsets[j * 3 + 2] - iz;
        const dsq = dx * dx + dy * dy + dz * dz;
        if (dsq > 5 || dsq < 0.4) continue;
        segs.push(ix, iy, iz, offsets[j * 3], offsets[j * 3 + 1], offsets[j * 3 + 2]);
        tmp.copy(a).lerp(b, tint[i]);
        colors.push(tmp.r * 0.1, tmp.g * 0.1, tmp.b * 0.1, tmp.r * 0.7, tmp.g * 0.7, tmp.b * 0.7);
        break;
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(segs, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    lineGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, -16), 64);

    plane.dispose();
    return { geometry: geo, synapses: lineGeo };
  }, [count]);

  // R3F clones the `uniforms` prop onto the material, so every per-frame write
  // has to go through the material ref — not through this initial object.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 1 },
      uOpacity: { value: 0 },
      uDrift: { value: 0.5 },
      uColorA: { value: new THREE.Color("#5cd0ff") },
      uColorB: { value: new THREE.Color("#a06bff") },
    }),
    []
  );

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const p = scroll.progress;

    // Lives across the hero and hands over to the agent graph.
    const target = envelope(p, -0.05, 0.02, 0.3, 0.42);
    fade.current = damp(fade.current, target, 6, d);

    const u = matRef.current?.uniforms;
    if (u) {
      u.uTime.value = state.clock.elapsedTime;
      u.uOpacity.value = fade.current;
      u.uDrift.value = scroll.reducedMotion ? 0.1 : 0.5;
    }

    if (lineMat.current) lineMat.current.opacity = fade.current * 0.34;

    const g = group.current;
    if (!g) return;
    g.visible = fade.current > 0.004;
    if (!g.visible) return;

    g.rotation.y += d * 0.018;
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
    // A gentle counter-parallax against the avatar deepens the hero.
    g.position.x = damp(g.position.x, scroll.smoothX * -0.9, 3, d);
    g.position.y = damp(g.position.y, scroll.smoothY * -0.5, 3, d);
  });

  return (
    <group ref={group} position={[0, 0, SCENE_Z.avatar]}>
      <mesh geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <lineSegments geometry={synapses} frustumCulled={false}>
        <lineBasicMaterial
          ref={lineMat}
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}

export default NeuralField;
