"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

type Hero3DBackgroundProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

type QualityTier = "low" | "medium" | "high";

type SceneQuality = {
  tier: QualityTier;
  particleCount: number;
  starCount: number;
  dpr: [number, number];
  antialias: boolean;
  enableBloom: boolean;
  enableEnvironment: boolean;
  enableMouseTracking: boolean;
  ringSegments: number;
  torusSegments: [number, number];
  bloom: {
    strength: number;
    radius: number;
    threshold: number;
  };
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

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
};

const PALETTE = [
  { color: "#8ea8c4", emissive: "#4a6179" },
  { color: "#7ba7ad", emissive: "#41656c" },
  { color: "#9b9ec4", emissive: "#555a80" },
  { color: "#90b8c9", emissive: "#4f6f7d" },
];

const QUALITY_PRESETS: Record<QualityTier, SceneQuality> = {
  low: {
    tier: "low",
    particleCount: 8,
    starCount: 700,
    dpr: [0.75, 1],
    antialias: false,
    enableBloom: false,
    enableEnvironment: false,
    enableMouseTracking: false,
    ringSegments: 48,
    torusSegments: [42, 8],
    bloom: {
      strength: 0,
      radius: 0,
      threshold: 1,
    },
  },
  medium: {
    tier: "medium",
    particleCount: 12,
    starCount: 1100,
    dpr: [1, 1.15],
    antialias: false,
    enableBloom: true,
    enableEnvironment: false,
    enableMouseTracking: true,
    ringSegments: 64,
    torusSegments: [56, 10],
    bloom: {
      strength: 0.42,
      radius: 0.5,
      threshold: 0.28,
    },
  },
  high: {
    tier: "high",
    particleCount: 18,
    starCount: 1600,
    dpr: [1, 1.35],
    antialias: true,
    enableBloom: true,
    enableEnvironment: true,
    enableMouseTracking: true,
    ringSegments: 80,
    torusSegments: [72, 12],
    bloom: {
      strength: 0.58,
      radius: 0.58,
      threshold: 0.24,
    },
  },
};

function seededValue(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

function resolveSceneQuality(): SceneQuality {
  if (typeof window === "undefined") {
    return QUALITY_PRESETS.medium;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const navigatorWithMemory = navigator as NavigatorWithDeviceMemory;
  const deviceMemory = navigatorWithMemory.deviceMemory ?? 4;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;

  if (prefersReducedMotion || isMobile || deviceMemory <= 4 || hardwareConcurrency <= 4) {
    return QUALITY_PRESETS.low;
  }

  if (window.innerWidth < 1280 || deviceMemory <= 8 || hardwareConcurrency <= 8) {
    return QUALITY_PRESETS.medium;
  }

  return QUALITY_PRESETS.high;
}

function useSceneQuality() {
  const [quality, setQuality] = useState<SceneQuality>(() => resolveSceneQuality());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateQuality = () => setQuality(resolveSceneQuality());

    updateQuality();
    window.addEventListener("resize", updateQuality, { passive: true });
    mediaQuery.addEventListener("change", updateQuality);

    return () => {
      window.removeEventListener("resize", updateQuality);
      mediaQuery.removeEventListener("change", updateQuality);
    };
  }, []);

  return quality;
}

function GlowComposer({ quality }: { quality: SceneQuality }) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    if (!quality.enableBloom) {
      composerRef.current?.dispose();
      composerRef.current = null;
      return;
    }

    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      quality.bloom.strength,
      quality.bloom.radius,
      quality.bloom.threshold
    );

    bloomPass.threshold = quality.bloom.threshold;
    bloomPass.strength = quality.bloom.strength;
    bloomPass.radius = quality.bloom.radius;

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    return () => {
      composer.dispose();
      composerRef.current = null;
    };
  }, [camera, gl, quality, scene, size.height, size.width]);

  useEffect(() => {
    if (!quality.enableBloom) {
      return;
    }

    composerRef.current?.setSize(size.width, size.height);
  }, [quality.enableBloom, size.height, size.width]);

  useFrame(() => {
    if (!quality.enableBloom) {
      return;
    }

    composerRef.current?.render();
  }, 1);

  return null;
}

function FloatingParticles({
  quality,
  sceneRef,
}: {
  quality: SceneQuality;
  sceneRef: RefObject<THREE.Group | null>;
}) {
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: quality.particleCount }, (_, index) => {
      const palette = PALETTE[index % PALETTE.length];
      const radius = 2.2 + seededValue(index + 1) * 4.6;
      const angle = (index / quality.particleCount) * Math.PI * 2;
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
        scale:
          0.18 +
          seededValue(index + 61) * (quality.tier === "low" ? 0.22 : quality.tier === "medium" ? 0.32 : 0.42),
        color: palette.color,
        emissive: palette.emissive,
        shape: seededValue(index + 71) > 0.45 ? "icosahedron" : "torus",
        speed: 0.32 + seededValue(index + 81) * 0.82,
        floatIntensity: 0.22 + seededValue(index + 91) * 0.55,
      };
    });
  }, [quality]);

  return (
    <group ref={sceneRef}>
      <Stars
        radius={90}
        depth={40}
        count={quality.starCount}
        factor={3}
        saturation={0}
        fade
        speed={quality.tier === "low" ? 0.18 : 0.28}
      />

      <mesh position={[0, -1.6, -6.5]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.8, 6.8, quality.ringSegments]} />
        <meshBasicMaterial
          color="#7c97b6"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {particles.map((particle, index) => (
        <Float
          key={`${particle.shape}-${index}`}
          speed={particle.speed}
          rotationIntensity={quality.tier === "high" ? 0.85 : 0.55}
          floatIntensity={particle.floatIntensity}
          floatingRange={quality.tier === "low" ? [-0.22, 0.22] : [-0.32, 0.32]}
        >
          <mesh
            position={particle.position}
            rotation={particle.rotation}
            scale={particle.scale}
          >
            {particle.shape === "icosahedron" ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <torusKnotGeometry
                args={[0.55, 0.18, quality.torusSegments[0], quality.torusSegments[1]]}
              />
            )}
            <meshStandardMaterial
              color={particle.color}
              emissive={particle.emissive}
              emissiveIntensity={0.62}
              metalness={0.5}
              roughness={0.42}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function CameraRig({
  containerRef,
  quality,
  sceneRef,
}: {
  containerRef?: RefObject<HTMLElement | null>;
  quality: SceneQuality;
  sceneRef: RefObject<THREE.Group | null>;
}) {
  const { camera, clock } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const cameraTargetRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!quality.enableMouseTracking) {
      mouseRef.current = { x: 0, y: 0 };
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [quality.enableMouseTracking]);

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

    cameraTargetRef.current.set(
      mouseX * (quality.tier === "high" ? 0.7 : 0.48),
      mouseY * (quality.tier === "high" ? 0.34 : 0.22) + scrollRef.current * 0.45,
      7 + scrollRef.current * 3
    );
    camera.position.lerp(cameraTargetRef.current, quality.tier === "high" ? 0.045 : 0.035);
    camera.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      THREE.MathUtils.lerp(
        camera.rotation.z,
        -mouseX * 0.03 - scrollRef.current * 0.04,
        quality.tier === "high" ? 0.035 : 0.028
      )
    );
    camera.lookAt(0, 0, 0);

    if (!sceneRef.current) {
      return;
    }

    sceneRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneRef.current.rotation.x,
      -0.16 + mouseY * 0.08 + scrollRef.current * 0.14,
      quality.tier === "high" ? 0.04 : 0.03
    );
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneRef.current.rotation.y,
      t * 0.026 + mouseX * 0.14 + scrollRef.current * 0.24,
      quality.tier === "high" ? 0.035 : 0.028
    );
    sceneRef.current.position.y = THREE.MathUtils.lerp(
      sceneRef.current.position.y,
      -scrollRef.current * 0.72,
      quality.tier === "high" ? 0.04 : 0.03
    );
  });

  return null;
}

function Scene({
  containerRef,
  quality,
}: Hero3DBackgroundProps & {
  quality: SceneQuality;
}) {
  const sceneRef = useRef<THREE.Group>(null);

  return (
    <>
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 18]} />
      <ambientLight intensity={0.48} color="#d9e5ef" />
      <pointLight position={[4, 2, 4]} intensity={quality.tier === "high" ? 14 : 10} color="#8ea8c4" distance={16} />
      <pointLight position={[-5, -2, 2]} intensity={quality.tier === "high" ? 8 : 6} color="#91a8ba" distance={14} />
      <spotLight
        position={[0, 6, 8]}
        intensity={quality.tier === "high" ? 10 : 7}
        angle={0.4}
        penumbra={0.7}
        color="#87aeb7"
      />
      {quality.enableEnvironment ? <Environment preset="night" /> : null}
      <FloatingParticles quality={quality} sceneRef={sceneRef} />
      <CameraRig containerRef={containerRef} quality={quality} sceneRef={sceneRef} />
      <GlowComposer quality={quality} />
    </>
  );
}

export default function Hero3DBackground({ containerRef }: Hero3DBackgroundProps) {
  const quality = useSceneQuality();

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.15, 7], fov: 48 }}
        dpr={quality.dpr}
        performance={{ min: 0.65 }}
        gl={{
          alpha: true,
          antialias: quality.antialias,
          depth: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene containerRef={containerRef} quality={quality} />
      </Canvas>
    </div>
  );
}
