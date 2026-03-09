"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;
varying float vEdgeFade;

// Standard simplex noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i); 
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUv = uv;
  vec3 pos = position;

  // Animate the plane surface moving towards camera
  float noiseFreq = 2.0;
  float noiseAmp = 0.6;
  vec2 noisePos = vec2(pos.x * noiseFreq, pos.y * noiseFreq + uTime * 0.8);
  float elevation = snoise(noisePos) * noiseAmp;

  // Mouse interaction: push terrain up sharply where mouse is
  float d = distance(vUv, uMouse);
  float mouseEffect = smoothstep(0.3, 0.0, d) * 1.5;
  
  // Precalculate edge fade in vertex shader to save fragment shader compute
  float edgeX = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
  float edgeY = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
  vEdgeFade = edgeX * edgeY;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;
varying float vEdgeFade;

void main() {
  // Base grid color - much darker so it doesn't compete with text
  vec3 colorBase = vec3(0.02, 0.05, 0.15); 
  
  // Neon highlight color - bright cyan/blue
  vec3 colorHigh = vec3(0.0, 0.7, 1.0); 
  
  // Mix color based heavily on how high the terrain is (elevation)
  float mixStrength = clamp(vElevation * 0.8, 0.0, 1.0);
  vec3 finalColor = mix(colorBase, colorHigh, mixStrength);
  
  // Lower baseline opacity significantly, boost when glowing (hovered)
  float alpha = clamp(vEdgeFade * (0.15 + mixStrength * 0.85), 0.0, 1.0);

  gl_FragColor = vec4(finalColor, alpha);
}
`;

function TerrainGrid() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    useFrame((state, delta) => {
        if (!materialRef.current || !meshRef.current) return;

        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

        // Smoothly lerp the mouse position into the uniform so it trails beautifully
        // In ThreeJS, mouse is -1 to 1. In standard UV, it's 0 to 1.
        const targetX = mouse.x * 0.5 + 0.5;
        const targetY = mouse.y * 0.5 + 0.5;

        materialRef.current.uniforms.uMouse.value.x += (targetX - materialRef.current.uniforms.uMouse.value.x) * delta * 5.0;
        materialRef.current.uniforms.uMouse.value.y += (targetY - materialRef.current.uniforms.uMouse.value.y) * delta * 5.0;

        // Add a gentle floating rotation
        meshRef.current.rotation.x = -Math.PI * 0.25 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }),
        []
    );

    // Plane geometry with dynamic segments based on device performance
    const geometry = useMemo(() => {
        // Extreme optimization for mobile: drop to bare minimum wireframe density
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const segments = isMobile ? 25 : 60; // Drastically reduced for guaranteed 60FPS

        return new THREE.PlaneGeometry(
            viewport.width * 1.5,
            viewport.height * 1.5,
            segments,
            segments
        );
    }, [viewport.width, viewport.height]);

    return (
        <mesh ref={meshRef} position={[0, -1, -2]}>
            <primitive object={geometry} attach="geometry" />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                wireframe={true} // THE KEY: this makes it a glowing Tron-like grid!
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

export default function Hero3DBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-auto" style={{ width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                    logarithmicDepthBuffer: false
                }}
                dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.5]} // Strict 1x DPR on mobile
                performance={{ min: 0.1 }} // Let R3F aggressively downscale if needed
                frameloop="always"
            >
                <TerrainGrid />
            </Canvas>
        </div>
    );
}
