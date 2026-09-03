"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope } from "@/lib/math";

/**
 * The hero subject: the supplied avatar portrait, rendered in the 3D scene as a
 * floating glass slab rather than a flat <img>. It bows slightly toward the
 * camera, tracks the pointer with a 2.5D parallax offset between subject and
 * background, and is graded into the site palette so it belongs in the void.
 *
 * Drop the artwork at `public/avatar.png` (or .jpg / .webp / .avif) — the first
 * candidate that loads wins. If none is present the abstract neural core in
 * `Avatar.tsx` is used instead — a wrong face is worse than no face.
 */

export const PORTRAIT_CANDIDATES = [
  "/avatar.jpg",
  "/avatar.png",
  "/avatar.jpeg",
  "/avatar.webp",
  "/avatar.avif",
];

export type PortraitState = "loading" | "ready" | "missing";

/** Tries each candidate path in order; resolves with the first that decodes. */
export function usePortraitTexture(urls: string[] = PORTRAIT_CANDIDATES) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [state, setState] = useState<PortraitState>("loading");

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    const attempt = (i: number) => {
      if (cancelled) return;
      if (i >= urls.length) {
        setState("missing");
        return;
      }
      loader.load(
        urls[i],
        (tex) => {
          if (cancelled) {
            tex.dispose();
            return;
          }
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          tex.needsUpdate = true;
          setTexture(tex);
          setState("ready");
        },
        undefined,
        () => attempt(i + 1)
      );
    };

    attempt(0);
    return () => {
      cancelled = true;
    };
  }, [urls]);

  return { texture, state };
}

const VERT = /* glsl */ `
  uniform float uBow;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // A gentle cylindrical bow: the edges fall away so the slab catches the
    // rim lights instead of reading as a pasted-on rectangle.
    float k = abs(uv.x - 0.5) * 2.0;
    p.z -= k * k * uBow;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uRadius;
  uniform float uAspect;
  uniform vec2 uMouse;
  uniform vec2 uFocus;
  uniform vec3 uCyber;
  uniform vec3 uViolet;

  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + r;
    return length(max(d, 0.0)) - r + min(max(d.x, d.y), 0.0);
  }

  void main() {
    // Card space: y spans [-1, 1], x spans [-aspect, aspect].
    vec2 p = (vUv - 0.5) * vec2(uAspect * 2.0, 2.0);
    float sdf = roundedBox(p, vec2(uAspect, 1.0) - 0.006, uRadius);
    float alpha = 1.0 - smoothstep(-0.008, 0.008, sdf);
    if (alpha < 0.002) discard;

    // 2.5D parallax — the subject slides against the room behind it.
    float depth = 1.0 - smoothstep(0.12, 0.8, distance(vUv, uFocus));
    vec2 uv = vUv + uMouse * vec2(0.016, 0.012) * (0.22 + depth);
    vec3 col = texture2D(uTex, uv).rgb;

    // Grade: cool the background down into the palette, keep the subject warm.
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 recede = mix(vec3(lum), uViolet * (0.35 + lum), 0.4) * 0.34;
    float subjectDist = length((vUv - uFocus) * vec2(1.1, 0.82));
    float subject = 1.0 - smoothstep(0.22, 0.76, subjectDist);
    col = mix(recede, col, clamp(subject + 0.18, 0.0, 1.0));

    // Vignette — soft enough that the shoulders don't crush to black.
    float v = length((vUv - 0.5) * vec2(1.1, 1.0)) * 1.55;
    col *= mix(1.0, 0.44, smoothstep(0.5, 1.12, v));

    // Luminous edge, cyan at the top fading to violet at the base.
    float edge = 1.0 - smoothstep(0.0, 0.022, abs(sdf));
    col += mix(uViolet, uCyber, vUv.y) * edge * 0.85;

    // Slow specular sweep across the glass.
    float sweep = 0.5 + 0.5 * sin((vUv.x * 1.4 + vUv.y) * 2.1 - uTime * 0.32);
    col += vec3(0.05, 0.07, 0.09) * pow(sweep, 7.0);

    gl_FragColor = vec4(col, alpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

const GLOW_FRAG = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uCyber;
  uniform vec3 uViolet;
  varying vec2 vUv;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float a = 1.0 - smoothstep(0.15, 1.0, d);
    vec3 col = mix(uViolet, uCyber, vUv.y);
    gl_FragColor = vec4(col, a * a * 0.4 * uOpacity);
    #include <colorspace_fragment>
  }
`;

const GLOW_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HEIGHT = 3.8;

export function Portrait({ texture }: { texture: THREE.Texture }) {
  const group = useRef<THREE.Group>(null);
  const card = useRef<THREE.Mesh>(null);
  const cardMat = useRef<THREE.ShaderMaterial>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);
  const fade = useRef(0);

  const image = texture.image as { width?: number; height?: number } | undefined;
  const aspect = image?.width && image?.height ? image.width / image.height : 0.8;

  // R3F clones the `uniforms` prop onto the material, so per-frame writes go
  // through the material ref — these are initial values only.
  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uRadius: { value: 0.13 },
      uAspect: { value: aspect },
      uMouse: { value: new THREE.Vector2() },
      // The face sits high in a portrait crop; parallax and grading key off it.
      uFocus: { value: new THREE.Vector2(0.5, 0.66) },
      uCyber: { value: new THREE.Color("#4cc9ff") },
      uViolet: { value: new THREE.Color("#a06bff") },
      uBow: { value: 0.34 },
    }),
    [texture, aspect]
  );

  const glowUniforms = useMemo(
    () => ({
      uOpacity: { value: 0 },
      uCyber: { value: new THREE.Color("#4cc9ff") },
      uViolet: { value: new THREE.Color("#a06bff") },
    }),
    []
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    const p = scroll.progress;

    const target = envelope(
      p,
      TIMELINE.hero.in,
      TIMELINE.hero.hold,
      TIMELINE.hero.out,
      TIMELINE.hero.end
    );
    fade.current = damp(fade.current, target, 9, d);
    const o = fade.current;

    g.visible = o > 0.004;
    if (!g.visible) return;

    const cu = cardMat.current?.uniforms;
    if (cu) {
      cu.uTime.value = t;
      cu.uOpacity.value = o;
      (cu.uMouse.value as THREE.Vector2).set(scroll.smoothX, scroll.smoothY);
    }
    if (glowMat.current) glowMat.current.uniforms.uOpacity.value = o;

    // Offset right of centre on desktop so the masthead has room.
    const offset = state.size.width >= 1100 ? 1.95 : state.size.width >= 760 ? 1.1 : 0;
    g.position.x = damp(g.position.x, offset, 4, d);
    g.position.y = damp(
      g.position.y,
      (state.size.width >= 760 ? 0.18 : 0.95) + Math.sin(t * 0.55) * 0.07,
      4,
      d
    );
    g.position.z = SCENE_Z.avatar + Math.sin(t * 0.34) * 0.06;

    // Subtle mouse-tracked tilt — the slab turns toward the pointer.
    g.rotation.y = damp(g.rotation.y, scroll.smoothX * 0.19 + Math.sin(t * 0.24) * 0.015, 4, d);
    g.rotation.x = damp(g.rotation.x, -scroll.smoothY * 0.12, 4, d);
    g.rotation.z = damp(g.rotation.z, scroll.smoothX * -0.02, 3, d);
  });

  return (
    <group ref={group} position={[0, 0.18, SCENE_Z.avatar]}>
      {/* Bloom bed behind the slab so it reads as lit, not pasted on. */}
      <mesh position={[0, 0, -0.5]} scale={[HEIGHT * aspect * 2.1, HEIGHT * 1.9, 1]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          ref={glowMat}
          vertexShader={GLOW_VERT}
          fragmentShader={GLOW_FRAG}
          uniforms={glowUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={card} scale={[HEIGHT * aspect, HEIGHT, 1]} renderOrder={-1}>
        <planeGeometry args={[1, 1, 48, 48]} />
        <shaderMaterial
          ref={cardMat}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </group>
  );
}

export default Portrait;
