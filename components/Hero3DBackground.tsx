"use client";

import { RefObject, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

type Hero3DBackgroundProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

type ParticleConfig = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  shape: "icosahedron" | "torus";
  speed: number;
  floatIntensity: number;
};

const PALETTE = [
  { color: "#60a5fa", emissive: "#1d4ed8" },
  { color: "#22d3ee", emissive: "#0891b2" },
  { color: "#c084fc", emissive: "#7c3aed" },
  { color: "#f472b6", emissive: "#db2777" },
];

function seededValue(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

function GlowComposer() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.15,
      0.8,
      0.18
    );

    bloomPass.threshold = 0.08;
    bloomPass.strength = 1.1;
    bloomPass.radius = 0.75;

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    return () => {
      composer.dispose();
      composerRef.current = null;
    };
  }, [camera, gl, scene, size.height, size.width]);

  useEffect(() => {
    composerRef.current?.setSize(size.width, size.height);
  }, [size.height, size.width]);

  useFrame(() => {
    composerRef.current?.render();
  }, 1);

  return null;
}

function FloatingParticles({ sceneRef }: { sceneRef: RefObject<THREE.Group | null> }) {
  const particles = useMemo<ParticleConfig[]>(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 14 : 24;

    return Array.from({ length: count }, (_, index) => {
      const palette = PALETTE[index % PALETTE.length];
      const radius = 2.2 + seededValue(index + 1) * 4.6;
      const angle = (index / count) * Math.PI * 2;
      const vertical = (seededValue(index + 11) - 0.5) * 4.6;
      const offset = (seededValue(index + 21) - 0.5) * 1.5;

      return {
        position: [
          Math.cos(angle) * radius + offset,
          vertical,
          -3.5 + Math.sin(angle * 1.3) * 3.2,
        ],
        rotation: [
          seededValue(index + 31) * Math.PI,
          seededValue(index + 41) * Math.PI,
          seededValue(index + 51) * Math.PI,
        ],
        scale: 0.18 + seededValue(index + 61) * (isMobile ? 0.32 : 0.48),
        color: palette.color,
        emissive: palette.emissive,
        shape: seededValue(index + 71) > 0.45 ? "icosahedron" : "torus",
        speed: 0.45 + seededValue(index + 81) * 1.15,
        floatIntensity: 0.35 + seededValue(index + 91) * 1.1,
      };
    });
  }, []);

  return (
    <group ref={sceneRef}>
      <Stars
        radius={90}
        depth={40}
        count={2600}
        factor={3.5}
        saturation={0}
        fade
        speed={0.45}
      />

      <mesh position={[0, -1.6, -6.5]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 6.8, 96]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {particles.map((particle, index) => (
        <Float
          key={`${particle.shape}-${index}`}
          speed={particle.speed}
          rotationIntensity={1.2}
          floatIntensity={particle.floatIntensity}
          floatingRange={[-0.45, 0.45]}
        >
          <mesh
            position={particle.position}
            rotation={particle.rotation}
            scale={particle.scale}
          >
            {particle.shape === "icosahedron" ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <torusKnotGeometry args={[0.55, 0.18, 96, 14]} />
            )}
            <meshStandardMaterial
              color={particle.color}
              emissive={particle.emissive}
              emissiveIntensity={1.4}
              metalness={0.7}
              roughness={0.18}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CameraRig({
  containerRef,
  sceneRef,
}: {
  containerRef?: RefObject<HTMLElement | null>;
  sceneRef: RefObject<THREE.Group | null>;
}) {
  const { camera, clock } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const targetScroll = (() => {
      if (!containerRef?.current || typeof window === "undefined") {
        return 0;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const distance = Math.max(rect.height, window.innerHeight);
      return THREE.MathUtils.clamp(-rect.top / distance, 0, 1.15);
    })();

    scrollRef.current = THREE.MathUtils.lerp(scrollRef.current, targetScroll, 0.06);

    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const t = clock.elapsedTime;

    camera.position.lerp(
      new THREE.Vector3(
        mouseX * 0.85,
        mouseY * 0.4 + scrollRef.current * 0.55,
        7 + scrollRef.current * 3.4
      ),
      0.045
    );
    camera.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      THREE.MathUtils.lerp(
        camera.rotation.z,
        -mouseX * 0.045 - scrollRef.current * 0.055,
        0.035
      )
    );
    camera.lookAt(0, 0, 0);

    if (!sceneRef.current) {
      return;
    }

    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneRef.current.rotation.x,
      -0.2 + mouseY * 0.14 + scrollRef.current * 0.18,
      0.04
    );
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      t * 0.04 + mouseX * 0.22 + scrollRef.current * 0.36,
      0.035
    );
    sceneRef.current.position.y = THREE.MathUtils.lerp(
      sceneRef.current.position.y,
      -scrollRef.current * 0.85,
      0.04
    );
  });

  return null;
}

function Scene({ containerRef }: Hero3DBackgroundProps) {
  const sceneRef = useRef<THREE.Group>(null);

  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 18]} />
      <ambientLight intensity={0.6} color="#dbeafe" />
      <pointLight position={[4, 2, 4]} intensity={22} color="#60a5fa" distance={18} />
      <pointLight position={[-5, -2, 2]} intensity={14} color="#c084fc" distance={16} />
      <spotLight
        position={[0, 6, 8]}
        intensity={18}
        angle={0.4}
        penumbra={0.7}
        color="#67e8f9"
      />
      <Environment preset="night" />
      <FloatingParticles sceneRef={sceneRef} />
      <CameraRig containerRef={containerRef} sceneRef={sceneRef} />
      <GlowComposer />
    </>
  );
}

export default function Hero3DBackground({ containerRef }: Hero3DBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.15, 7], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene containerRef={containerRef} />
      </Canvas>
    </div>
  );
}
