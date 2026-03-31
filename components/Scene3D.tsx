"use client";

import { CSSProperties, RefObject, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, View } from "@react-three/drei";
import * as THREE from "three";
import FloatingGeometry, {
  FloatingGeometryProps,
  usePrefersReducedMotion,
} from "./FloatingGeometry";

export type Scene3DAccent = FloatingGeometryProps & {
  id: string;
};

export type Scene3DAnchoredView = {
  id: string;
  track: RefObject<HTMLElement | null>;
  accents: Scene3DAccent[];
  className?: string;
  style?: CSSProperties;
  frames?: number;
};

export type Scene3DProps = {
  accents?: Scene3DAccent[];
  anchoredViews?: Scene3DAnchoredView[];
  className?: string;
};

function AmbientLights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#d6e2ef" />
      <directionalLight position={[3.5, 4, 6]} intensity={0.45} color="#95b5cf" />
      <pointLight position={[-5, -2, 5]} intensity={0.32} color="#7ba7ad" />
    </>
  );
}

function LogoMesh({ color, reducedMotion }: { color: string; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) {
      return;
    }

    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.7;
  });

  return (
    <mesh ref={meshRef} scale={0.9}>
      <octahedronGeometry args={[0.92, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.16}
        roughness={0.32}
        metalness={0.25}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

/**
 * Shared fixed 3D overlay for subtle ambient accents.
 *
 * Example:
 * <Scene3D
 *   accents={[
 *     { id: "left-orb", shape: "icosahedron", position: [-5.2, 2.8, -8], color: "#7ba7ad" },
 *     { id: "right-ring", shape: "torus", position: [5.4, -1.4, -10], color: "#8ea8c4", materialType: "wobble" },
 *   ]}
 * />
 *
 * Anchored view example:
 * <Scene3D
 *   anchoredViews={[
 *     { id: "hero-anchor", track: heroRef, accents: [{ id: "hero-shape", shape: "octahedron", position: [0, 0, -3], color: "#9b9ec4" }] }
 *   ]}
 * />
 */
export default function Scene3D({
  accents = [],
  anchoredViews = [],
  className = "",
}: Scene3DProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const dpr = useMemo<[number, number]>(
    () => (prefersReducedMotion ? [1, 1] : [1, 1.2]),
    [prefersReducedMotion]
  );

  return (
    <div
      ref={canvasWrapperRef}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {anchoredViews.map((view, index) => (
        <View
          key={view.id}
          visible
          index={index + 1}
          frames={view.frames ?? 1}
          track={view.track as RefObject<HTMLElement>}
          className={view.className}
          style={{ pointerEvents: "none", ...view.style }}
        >
          <AmbientLights />
          {view.accents.map((accent) => (
            <FloatingGeometry
              key={accent.id}
              {...accent}
              visible={accent.visible ?? true}
            />
          ))}
        </View>
      ))}

      <Canvas
        camera={{ position: [0, 0, 12], fov: 38 }}
        dpr={dpr}
        performance={{ min: 0.65 }}
        gl={{
          alpha: true,
          antialias: !prefersReducedMotion,
          powerPreference: "low-power",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <AmbientLights />
        {accents.map((accent) => (
          <FloatingGeometry
            key={accent.id}
            {...accent}
            visible={accent.visible ?? true}
          />
        ))}
        {anchoredViews.length > 0 ? <View.Port /> : null}
      </Canvas>
    </div>
  );
}

export function NavbarLogo3D({
  color = "#8ea8c4",
  label = "AR",
}: {
  color?: string;
  label?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none relative h-10 w-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 34 }}
        dpr={prefersReducedMotion ? [1, 1] : [1, 1.4]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.75} color="#dce8f4" />
        <pointLight position={[1.6, 2.4, 3]} intensity={3.5} color={color} />
        <LogoMesh color={color} reducedMotion={prefersReducedMotion} />
        <Html center transform sprite style={{ pointerEvents: "none" }}>
          <span
            aria-hidden="true"
            className="rounded-full border border-white/10 bg-[#020617]/45 px-1.5 py-[1px] text-[8px] font-bold tracking-[0.22em] text-slate-100 backdrop-blur-sm"
          >
            {label}
          </span>
        </Html>
      </Canvas>
    </div>
  );
}
