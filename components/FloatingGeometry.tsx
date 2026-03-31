"use client";

import { useEffect, useRef, useState } from "react";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type FloatingGeometryShape = "icosahedron" | "torus" | "octahedron";
export type FloatingGeometryMaterial = "distort" | "wobble";

/**
 * Reusable decorative 3D accent for ambient section depth.
 *
 * Example:
 * <FloatingGeometry
 *   shape="octahedron"
 *   position={[2.5, -1.25, -5]}
 *   color="#7ba7ad"
 *   size={0.9}
 *   speed={0.75}
 *   materialType="wobble"
 *   factor={0.12}
 * />
 */
export type FloatingGeometryProps = {
  shape: FloatingGeometryShape;
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
  materialType?: FloatingGeometryMaterial;
  distortion?: number;
  factor?: number;
  rotation?: [number, number, number];
  visible?: boolean;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

export default function FloatingGeometry({
  shape,
  position,
  color,
  size = 0.9,
  speed = 1,
  materialType = "distort",
  distortion = 0.16,
  factor = 0.14,
  rotation = [0, 0, 0],
  visible = true,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!meshRef.current || prefersReducedMotion || !visible) {
      return;
    }

    meshRef.current.rotation.x += delta * 0.09 * speed;
    meshRef.current.rotation.y += delta * 0.12 * speed;
    meshRef.current.rotation.z += delta * 0.04 * speed;
  });

  if (!visible) {
    return null;
  }

  const motionScale = prefersReducedMotion ? 0.2 : 1;
  const floatSpeed = Math.max(speed * 0.75 * motionScale, 0.02);
  const floatIntensity = prefersReducedMotion ? 0.04 : 0.28;
  const rotationIntensity = prefersReducedMotion ? 0.04 : 0.18;

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      floatingRange={prefersReducedMotion ? [0, 0.06] : [-0.18, 0.18]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={size}
        castShadow={false}
        receiveShadow={false}
      >
        {shape === "icosahedron" ? (
          <icosahedronGeometry args={[1, 1]} />
        ) : null}
        {shape === "torus" ? <torusGeometry args={[0.92, 0.28, 24, 72]} /> : null}
        {shape === "octahedron" ? <octahedronGeometry args={[1, 0]} /> : null}

        {materialType === "distort" ? (
          <MeshDistortMaterial
            color={color}
            speed={Math.max(speed * 0.8 * motionScale, 0.02)}
            distort={prefersReducedMotion ? Math.min(distortion * 0.2, 0.04) : distortion}
            roughness={0.42}
            metalness={0.16}
            transparent
            opacity={0.42}
          />
        ) : (
          <MeshWobbleMaterial
            color={color}
            speed={Math.max(speed * 0.7 * motionScale, 0.02)}
            factor={prefersReducedMotion ? Math.min(factor * 0.2, 0.04) : factor}
            roughness={0.38}
            metalness={0.14}
            transparent
            opacity={0.46}
          />
        )}
      </mesh>
    </Float>
  );
}

export { usePrefersReducedMotion };
