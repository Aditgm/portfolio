"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTransition } from "./TransitionContext";

// Simple noise-based liquid shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uProgress;
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

// Generate 2D noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

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
  vec2 uv = vUv;
  
  // Distortion amount based on progress (peaks at 0.5)
  float distortionStrength = sin(uProgress * 3.14159) * 0.15;
  
  // Create liquid waver based on time and noise
  float noise = snoise(uv * 3.0 + uTime * 0.5);
  
  // Distort UVs
  vec2 distortedUv = uv + vec2(noise * distortionStrength, snoise(uv * 4.0 - uTime * 0.4) * distortionStrength);
  
  // Primary wave that sweeps across
  // If uProgress is 0, wave is at bottom (-0.5). If 1, wave is at top (1.5).
  float wavePos = uProgress * 2.0 - 0.5;
  float distToWave = length(distortedUv.y - wavePos);
  
  // Alpha threshold: pixels below the wave are visible
  float alpha = smoothstep(wavePos + 0.1 + noise * 0.2, wavePos - 0.1 + noise * 0.2, distortedUv.y);
  
  // Liquid color: mix between deep blue and bright cyan edge
  vec3 colorDeep = vec3(0.02, 0.03, 0.08); // matching bg-[#050510]
  vec3 colorEdge = vec3(0.1, 0.4, 1.0); // Bright blue liquid edge
  
  // Edge highlight intensity
  float edgeLine = smoothstep(0.05, 0.0, abs(distortedUv.y - wavePos + noise * 0.1));
  vec3 finalColor = mix(colorDeep, colorEdge, edgeLine * distortionStrength * 5.0);

  // If we are halfway through transition, fill screen entirely black instead of alpha
  if (uProgress > 0.4 && uProgress < 0.6) {
      alpha = 1.0;
  }
  
  // Fast fade out alpha if progress is strictly 0
  if (uProgress < 0.01) alpha = 0.0;
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

function ShaderPlane() {
    const { isTransitioning } = useTransition();
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const progressRef = useRef(0);
    const { viewport } = useThree();

    // The animation logic
    useFrame((state, delta) => {
        if (!materialRef.current) return;

        // Target progress: 1 if transitioning out, 0 if transitioning in
        const target = isTransitioning ? 1 : 0;

        // Fast, snappy lerp
        // Needs to complete mostly within 400ms. 
        // 400ms = 0.4s. 
        progressRef.current = THREE.MathUtils.lerp(progressRef.current, target, delta * 15);

        // Snap to exactly 0 or 1 if very close
        if (Math.abs(progressRef.current - target) < 0.001) {
            progressRef.current = target;
        }

        materialRef.current.uniforms.uProgress.value = progressRef.current;
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    });

    const uniforms = useMemo(
        () => ({
            uProgress: { value: 0 },
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2() },
        }),
        []
    );

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
}

export function LiquidOverlay() {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            <Canvas
                orthographic
                camera={{ zoom: 1, position: [0, 0, 1] }}
                gl={{ alpha: true, antialias: false }}
            >
                <ShaderPlane />
            </Canvas>
        </div>
    );
}
