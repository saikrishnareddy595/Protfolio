"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scroll, SCENE_Z, TIMELINE } from "@/lib/scroll";
import { damp, envelope, inverseLerp, seeded, smoothstep } from "@/lib/math";

/**
 * Scene 02 — the particle field resolves into a supervisor → worker → endpoint
 * topology. Nodes interpolate from scattered "dust" positions into structure as
 * the section scrolls in, then packets start moving along the edges.
 */

type Node = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  size: number;
  tier: 0 | 1 | 2;
  phase: number;
};

type Edge = { a: number; b: number; speed: number; offset: number };

const CYBER = new THREE.Color("#4cc9ff");
const VIOLET = new THREE.Color("#a06bff");
const WHITE = new THREE.Color("#dff2ff");

function buildTopology(workers: number, leaves: number) {
  const rand = seeded(9182736);
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const scatter = () =>
    new THREE.Vector3(
      (rand() - 0.5) * 46,
      (rand() - 0.5) * 32,
      (rand() - 0.5) * 34
    );

  // Tier 0 — the supervisor.
  nodes.push({ from: scatter(), to: new THREE.Vector3(0, 0, 0), size: 1.5, tier: 0, phase: rand() });

  // Tier 1 — worker agents on an inclined ring.
  const workerIdx: number[] = [];
  for (let i = 0; i < workers; i++) {
    const a = (i / workers) * Math.PI * 2;
    const r = 5.6 + rand() * 0.9;
    const to = new THREE.Vector3(
      Math.cos(a) * r,
      Math.sin(a) * r * 0.52 + (rand() - 0.5) * 1.2,
      Math.sin(a * 1.7) * 2.4
    );
    workerIdx.push(nodes.length);
    nodes.push({ from: scatter(), to, size: 0.85, tier: 1, phase: rand() });
    edges.push({ a: 0, b: nodes.length - 1, speed: 0.5 + rand() * 0.5, offset: rand() });
  }

  // Tier 2 — telemetry endpoints clustered around each worker.
  for (let i = 0; i < leaves; i++) {
    const parent = workerIdx[i % workerIdx.length];
    const base = nodes[parent].to;
    const a = rand() * Math.PI * 2;
    const r = 2.0 + rand() * 3.4;
    const to = new THREE.Vector3(
      base.x + Math.cos(a) * r,
      base.y + Math.sin(a) * r * 0.8,
      base.z + (rand() - 0.5) * 5.2
    );
    to.multiplyScalar(1.06);
    nodes.push({ from: scatter(), to, size: 0.34 + rand() * 0.2, tier: 2, phase: rand() });
    edges.push({ a: parent, b: nodes.length - 1, speed: 0.7 + rand() * 0.9, offset: rand() });
  }

  // A few lateral worker ↔ worker links: agents that hand off to each other.
  for (let i = 0; i < workers; i++) {
    if (rand() > 0.55) {
      const a = workerIdx[i];
      const b = workerIdx[(i + 1 + Math.floor(rand() * 2)) % workerIdx.length];
      if (a !== b) edges.push({ a, b, speed: 0.35 + rand() * 0.4, offset: rand() });
    }
  }

  return { nodes, edges };
}

export function AgentGraph() {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const fade = useRef(0);

  const tier = scroll.tier;
  const { nodes, edges } = useMemo(
    () =>
      buildTopology(
        tier === "low" ? 8 : tier === "mid" ? 10 : 12,
        tier === "low" ? 34 : tier === "mid" ? 64 : 96
      ),
    [tier]
  );

  const packetCount = Math.min(edges.length, tier === "low" ? 28 : 64);

  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);
    return geo;
  }, [edges.length]);

  // Static per-instance colours: supervisor white-hot, workers cyan, leaves violet.
  useLayoutEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    const c = new THREE.Color();
    nodes.forEach((n, i) => {
      c.copy(n.tier === 0 ? WHITE : n.tier === 1 ? CYBER : VIOLET);
      mesh.setColorAt(i, c);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes]);

  useLayoutEffect(() => {
    const mesh = packetsRef.current;
    if (!mesh) return;
    const c = new THREE.Color();
    for (let i = 0; i < packetCount; i++) {
      c.copy(i % 3 === 0 ? VIOLET : CYBER).multiplyScalar(1.6);
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [packetCount]);

  const scratch = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      q: new THREE.Quaternion(),
      v: new THREE.Vector3(),
      a: new THREE.Vector3(),
      b: new THREE.Vector3(),
      s: new THREE.Vector3(),
      live: nodes.map((n) => n.from.clone()),
    }),
    [nodes]
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;
    const p = scroll.progress;

    const target = envelope(p, TIMELINE.graph.in, TIMELINE.graph.hold, TIMELINE.graph.out, TIMELINE.graph.end);
    fade.current = damp(fade.current, target, 7, d);
    const o = fade.current;

    g.visible = o > 0.004;
    if (!g.visible) return;

    // Formation: 0 = dust, 1 = fully structured.
    const form = smoothstep(inverseLerp(TIMELINE.graph.in, 0.27, p));

    const { m, q, v, a, b, s, live } = scratch;
    q.identity();

    const nodeMesh = nodesRef.current;
    if (nodeMesh) {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        v.lerpVectors(n.from, n.to, form);
        // Breathing once formed, so the graph never feels frozen.
        const breathe = scroll.reducedMotion ? 0 : Math.sin(t * 0.9 + n.phase * 6.283) * 0.09 * form;
        v.y += breathe;
        v.x += Math.cos(t * 0.7 + n.phase * 6.283) * 0.06 * form;
        live[i].copy(v);

        const pulse = 1 + (scroll.reducedMotion ? 0 : Math.sin(t * 2.2 + n.phase * 12.5) * 0.12);
        const sc = n.size * (0.25 + 0.75 * form) * pulse * 0.34;
        s.setScalar(sc);
        m.compose(v, q, s);
        nodeMesh.setMatrixAt(i, m);
      }
      nodeMesh.instanceMatrix.needsUpdate = true;
    }

    // Edges follow the live node positions.
    const pos = lineGeometry.attributes.position as THREE.BufferAttribute;
    const col = lineGeometry.attributes.color as THREE.BufferAttribute;
    for (let i = 0; i < edges.length; i++) {
      const e = edges[i];
      a.copy(live[e.a]);
      b.copy(live[e.b]);
      pos.setXYZ(i * 2, a.x, a.y, a.z);
      pos.setXYZ(i * 2 + 1, b.x, b.y, b.z);
      const flow = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.4 + e.offset * 6.283));
      const c = e.b === 0 || nodes[e.b].tier === 1 ? CYBER : VIOLET;
      col.setXYZ(i * 2, c.r * 0.25, c.g * 0.25, c.b * 0.25);
      col.setXYZ(i * 2 + 1, c.r * flow, c.g * flow, c.b * flow);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
    if (lineMat.current) lineMat.current.opacity = o * form * 0.75;

    // Packets: data moving between supervisor and workers.
    const pk = packetsRef.current;
    if (pk) {
      for (let i = 0; i < packetCount; i++) {
        const e = edges[i % edges.length];
        const travel = (t * e.speed * 0.42 + e.offset) % 1;
        v.lerpVectors(live[e.a], live[e.b], travel);
        const size = 0.09 * form * (0.6 + 0.4 * Math.sin(travel * Math.PI));
        s.setScalar(size);
        m.compose(v, q, s);
        pk.setMatrixAt(i, m);
      }
      pk.instanceMatrix.needsUpdate = true;
    }

    // The whole lattice turns slowly, and drifts with the pointer.
    g.rotation.y = damp(g.rotation.y, -0.5 + p * 2.4 + scroll.smoothX * 0.14, 4, d);
    g.rotation.x = damp(g.rotation.x, -0.12 + scroll.smoothY * 0.1, 4, d);

    // Slide clear of the copy column on wide screens; stay centred on phones.
    const offset = state.size.width >= 1100 ? 6.2 : state.size.width >= 760 ? 3.2 : 0;
    g.position.x = damp(g.position.x, offset + scroll.smoothX * 0.5, 3, d);
    g.position.y = damp(g.position.y, 1.2 + scroll.smoothY * 0.3, 3, d);

    g.traverse((child) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.Material | undefined;
      if (mat && mat !== lineMat.current && "opacity" in mat) (mat as THREE.Material).opacity = o;
    });
  });

  return (
    <group ref={group} position={[0, 0, SCENE_Z.graph]}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial
          ref={lineMat}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>

      <instancedMesh ref={packetsRef} args={[undefined, undefined, packetCount]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default AgentGraph;
