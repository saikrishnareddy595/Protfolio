"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import { scroll, CAMERA_Z, type PerfTier } from "@/lib/scroll";
import { damp, keyframes } from "@/lib/math";
import Avatar from "./Avatar";
import NeuralField from "./NeuralField";
import AgentGraph from "./AgentGraph";
import DataTunnel from "./DataTunnel";
import ServerRack from "./ServerRack";
import Effects from "./Effects";

/**
 * One camera dollies down a single -Z corridor for the whole page. Each scene
 * owns a slab of that corridor, so "zooming past the avatar into the network"
 * is literally what happens in world space — no cuts, no scene swaps.
 */
function CameraRig() {
  const { camera, size } = useThree();
  const look = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    const p = scroll.progress;

    // Damp the pointer once, here, and let every scene read the smoothed value.
    scroll.smoothX = damp(scroll.smoothX, scroll.pointerX, 3.2, d);
    scroll.smoothY = damp(scroll.smoothY, scroll.pointerY, 3.2, d);

    const targetZ = keyframes(p, CAMERA_Z);
    camera.position.z = damp(camera.position.z, targetZ, 12, d);

    // Parallax is strongest in the hero and tapers off once we are in flight.
    const parallax = Math.max(0, 1 - p * 3.4);
    camera.position.x = damp(camera.position.x, scroll.smoothX * 0.85 * parallax, 3, d);
    camera.position.y = damp(camera.position.y, scroll.smoothY * 0.45 * parallax + p * 0.4, 3, d);

    look.current.set(
      scroll.smoothX * 0.5 * parallax,
      scroll.smoothY * 0.25 * parallax,
      camera.position.z - 12
    );
    camera.lookAt(look.current);

    // Narrow the field of view slightly on phones so subjects stay readable.
    const cam = camera as THREE.PerspectiveCamera;
    const targetFov = size.width < 720 ? 52 : 42;
    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = damp(cam.fov, targetFov, 6, d);
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/**
 * Studio lighting built from lightformers rendered into a local cube map — no
 * HDR download, but real reflections on the rack's anodised metal.
 */
function Studio() {
  return (
    <>
      <ambientLight intensity={0.32} color="#8fa6c4" />
      <directionalLight position={[4, 6, 8]} intensity={1.8} color="#fff4ea" />
      <directionalLight position={[-6, 2, 4]} intensity={1.1} color="#4cc9ff" />
      <directionalLight position={[3, -2, -6]} intensity={0.9} color="#a06bff" />
      <pointLight position={[1.2, 1.6, 3.6]} intensity={6} distance={13} color="#ffd2b4" />

      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3.4} position={[0, 5, -6]} scale={[12, 6, 1]} color="#ffffff" />
        <Lightformer intensity={2.2} position={[-7, 1, 2]} scale={[3, 10, 1]} color="#4cc9ff" />
        <Lightformer intensity={2.0} position={[7, -1, 2]} scale={[3, 10, 1]} color="#a06bff" />
        <Lightformer intensity={1.2} position={[0, -6, 0]} scale={[12, 4, 1]} color="#20242c" />
      </Environment>
    </>
  );
}

export default function Scene({ tier, reduced }: { tier: PerfTier; reduced: boolean }) {
  scroll.tier = tier;
  scroll.reducedMotion = reduced;

  return (
    <Canvas
      className="!fixed inset-0 !h-[100svh] !w-screen"
      style={{ pointerEvents: "none" }}
      dpr={tier === "low" ? [1, 1.25] : tier === "mid" ? [1, 1.65] : [1, 2]}
      gl={{
        antialias: tier !== "low",
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ fov: 42, near: 0.1, far: 500, position: [0, 0, 9] }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#050505"), 1);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.04;
      }}
      frameloop="always"
    >
      <Suspense fallback={null}>
        <CameraRig />
        <Studio />
        <Avatar />
        <NeuralField />
        <AgentGraph />
        <DataTunnel />
        <ServerRack />
        {!reduced && <Effects tier={tier} reducedMotion={reduced} />}
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
