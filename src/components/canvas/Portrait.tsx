"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope } from "@/lib/math";

/**
 * The hero subject: the avatar rendered as actual 3D geometry, not a picture
 * on a card.
 *
 * A dense plane is displaced along Z in the vertex shader by a baked depth map
 * (`scripts/build-portrait-depth.py`), so the face physically stands out from
 * the chest and the room behind is cut away entirely — there is no rectangle.
 * Surface normals are derived from the same map by finite differences, which
 * gives it real diffuse shading and a rim light that travels across the form
 * as the bust turns with the pointer. Turning it is what proves it is a solid:
 * the silhouette changes.
 *
 * As the hero scrolls away the vertices scatter along their own normals into
 * the neural field rather than cross-fading out.
 *
 * Artwork lives at `public/avatar.*`; the depth/mask companion is
 * `public/avatar-depth.png` (R = depth, G = subject mask).
 */

export const PORTRAIT_CANDIDATES = [
  "/avatar.jpg",
  "/avatar.png",
  "/avatar.jpeg",
  "/avatar.webp",
  "/avatar.avif",
];

const DEPTH_MAP = "/avatar-depth.png";

export type PortraitState = "loading" | "ready" | "missing";

function loadTexture(url: string): Promise<THREE.Texture | null> {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(
      url,
      (tex) => resolve(tex),
      undefined,
      () => resolve(null)
    );
  });
}

/** Loads the artwork (first candidate that decodes) plus its depth companion. */
export function usePortraitTexture(urls: string[] = PORTRAIT_CANDIDATES) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [depth, setDepth] = useState<THREE.Texture | null>(null);
  const [state, setState] = useState<PortraitState>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let colour: THREE.Texture | null = null;
      for (const url of urls) {
        colour = await loadTexture(url);
        if (colour) break;
      }
      if (cancelled) {
        colour?.dispose();
        return;
      }
      if (!colour) {
        setState("missing");
        return;
      }

      colour.colorSpace = THREE.SRGBColorSpace;
      colour.anisotropy = 8;
      colour.minFilter = THREE.LinearMipmapLinearFilter;
      colour.magFilter = THREE.LinearFilter;
      colour.needsUpdate = true;

      const relief = await loadTexture(DEPTH_MAP);
      if (cancelled) {
        colour.dispose();
        relief?.dispose();
        return;
      }
      if (relief) {
        // Depth and mask are data, not colour — no sRGB decode, and no
        // mipmaps, which would bleed the background into the silhouette.
        relief.colorSpace = THREE.NoColorSpace;
        relief.minFilter = THREE.LinearFilter;
        relief.magFilter = THREE.LinearFilter;
        relief.generateMipmaps = false;
        relief.wrapS = relief.wrapT = THREE.ClampToEdgeWrapping;
        relief.needsUpdate = true;
      }

      setTexture(colour);
      setDepth(relief);
      setState("ready");
    })();

    return () => {
      cancelled = true;
    };
  }, [urls]);

  return { texture, depth, state };
}

const VERT = /* glsl */ `
  uniform sampler2D uDepth;
  uniform vec2 uTexel;
  uniform float uRelief;
  uniform float uDissolve;
  uniform float uTime;
  uniform float uHasDepth;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vMask;
  varying float vDepth;

  // Cheap deterministic hash, used to scatter vertices on the way out.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vUv = uv;

    vec4 d = texture2D(uDepth, uv);
    // Without the companion map the plane stays flat and fully opaque, so a
    // missing file degrades to the old billboard instead of vanishing.
    float depth = mix(0.5, d.r, uHasDepth);
    float mask = mix(1.0, d.g, uHasDepth);

    vDepth = depth;
    vMask = mask;

    vec3 p = position;
    p.z += (depth - 0.5) * uRelief;

    // Normals by finite difference on the depth map: this is what gives the
    // form diffuse shading and a rim that moves when the bust turns.
    float dx = texture2D(uDepth, uv + vec2(uTexel.x, 0.0)).r
             - texture2D(uDepth, uv - vec2(uTexel.x, 0.0)).r;
    float dy = texture2D(uDepth, uv + vec2(0.0, uTexel.y)).r
             - texture2D(uDepth, uv - vec2(0.0, uTexel.y)).r;
    vec3 n = normalize(vec3(-dx * uRelief * 3.2, -dy * uRelief * 3.2, 1.0));
    n = mix(vec3(0.0, 0.0, 1.0), n, uHasDepth);
    vNormal = normalize(normalMatrix * n);

    // Scatter along the normal as the hero hands over to the particle field.
    if (uDissolve > 0.001) {
      float r = hash(uv * 91.7);
      vec3 dir = normalize(n + vec3(r - 0.5, hash(uv * 41.3) - 0.5, 0.25));
      p += dir * uDissolve * (0.4 + r * 2.6);
      p.y += uDissolve * uDissolve * 0.6;
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uOpacity;
  uniform float uDissolve;
  uniform float uTime;
  uniform vec3 uCyber;
  uniform vec3 uViolet;
  uniform vec3 uKey;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vMask;
  varying float vDepth;

  void main() {
    // Feather the silhouette: a hard cut reads as a bad cut-out, a soft one
    // reads as depth of field.
    float alpha = smoothstep(0.16, 0.62, vMask) * uOpacity;
    alpha *= 1.0 - smoothstep(0.35, 1.0, uDissolve);
    if (alpha < 0.008) discard;

    vec3 col = texture2D(uTex, vUv).rgb;
    float albedo = dot(col, vec3(0.299, 0.587, 0.114));
    // Every additive term below is scaled by how bright the surface already
    // is. Without this the coloured kickers overwhelm dark hair and knitwear,
    // which turns them blue.
    float lit = 0.18 + 0.82 * albedo;

    vec3 n = normalize(vNormal);
    vec3 viewDir = normalize(-vViewPos);

    // Key light, plus two coloured kickers from the scene palette.
    float key = clamp(dot(n, normalize(uKey)), 0.0, 1.0);
    float fillL = clamp(dot(n, normalize(vec3(-1.0, 0.1, 0.5))), 0.0, 1.0);
    float fillR = clamp(dot(n, normalize(vec3(1.0, -0.2, 0.5))), 0.0, 1.0);

    col *= 0.74 + 0.5 * key;
    col += uCyber * fillL * 0.16 * lit;
    col += uViolet * fillR * 0.13 * lit;

    // Fresnel rim — the tell that this is a solid and not a print.
    float fres = pow(1.0 - clamp(dot(n, viewDir), 0.0, 1.0), 3.2);
    col += mix(uViolet, uCyber, vUv.y) * fres * (0.3 + 0.7 * lit) * 0.7;

    // Push the recessed parts of the form toward the palette so the bust sits
    // in the scene rather than on top of it.
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 recede = mix(vec3(lum), uViolet * (0.4 + lum), 0.4) * 0.66;
    col = mix(recede, col, clamp(vDepth * 1.9, 0.0, 1.0));

    // Vertices in flight glow as they join the particle field.
    col += mix(uCyber, uViolet, vUv.x) * uDissolve * 1.1;

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

const HEIGHT = 3.8;

export function Portrait({
  texture,
  depth,
}: {
  texture: THREE.Texture;
  depth: THREE.Texture | null;
}) {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const fade = useRef(0);

  const image = texture.image as { width?: number; height?: number } | undefined;
  const aspect = image?.width && image?.height ? image.width / image.height : 0.8;

  const segments = scroll.tier === "low" ? 112 : scroll.tier === "mid" ? 176 : 256;

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(1, 1, segments, Math.round(segments * 1.25)),
    [segments]
  );
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Initial values only — R3F clones this onto the material, so per-frame
  // writes go through the material ref.
  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uDepth: { value: depth ?? texture },
      uHasDepth: { value: depth ? 1 : 0 },
      uTexel: {
        value: new THREE.Vector2(
          1 / ((depth?.image as { width?: number })?.width ?? 512),
          1 / ((depth?.image as { height?: number })?.height ?? 640)
        ),
      },
      uRelief: { value: 1.15 },
      uOpacity: { value: 0 },
      uDissolve: { value: 0 },
      uTime: { value: 0 },
      uCyber: { value: new THREE.Color("#4cc9ff") },
      uViolet: { value: new THREE.Color("#a06bff") },
      uKey: { value: new THREE.Vector3(0.45, 0.6, 0.9) },
    }),
    [texture, depth]
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

    const u = matRef.current?.uniforms;
    if (u) {
      u.uTime.value = t;
      u.uOpacity.value = Math.min(1, o * 1.15);
      // Scatter once the hero starts handing over, not while it is on screen.
      u.uDissolve.value = scroll.reducedMotion ? 0 : Math.pow(1 - o, 1.6) * 1.2;
    }

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

    // Turning the bust is what reads as solid — the silhouette changes.
    g.rotation.y = damp(g.rotation.y, scroll.smoothX * 0.26 + Math.sin(t * 0.22) * 0.03, 4, d);
    g.rotation.x = damp(g.rotation.x, -scroll.smoothY * 0.16, 4, d);
    g.rotation.z = damp(g.rotation.z, scroll.smoothX * -0.03, 3, d);
  });

  return (
    <group ref={group} position={[0, 0.18, SCENE_Z.avatar]}>
      <mesh geometry={geometry} scale={[HEIGHT * aspect, HEIGHT, 1]} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={uniforms}
          transparent
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

export default Portrait;
