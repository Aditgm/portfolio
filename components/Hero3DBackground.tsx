"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vElevation;

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

  // Animate the plane surface
  float noiseFreq = 1.5;
  float noiseAmp = 0.4;
  vec2 noisePos = vec2(pos.x * noiseFreq + uTime * 0.2, pos.y * noiseFreq + uTime * 0.2);
  float elevation = snoise(noisePos) * noiseAmp;

  // Mouse interaction: push points up slightly where mouse is
  float d = distance(vUv, uMouse);
  float mouseEffect = smoothstep(0.4, 0.0, d) * 0.8;
  
  pos.z += elevation + mouseEffect;
  vElevation = elevation + mouseEffect;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (10.0 + mouseEffect * 15.0) * (1.0 / -gl_Position.z); // Scale size by distance
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying float vElevation;

void main() {
  // Circular particle shape
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = 1.0 - step(0.5, strength);
  
  if (strength == 0.0) discard;

  // Base grid color
  vec3 colorBase = vec3(0.05, 0.1, 0.3); // Deep blue
  vec3 colorHigh = vec3(0.1, 0.4, 1.0); // Bright neon blue
  
  // Mix color based on elevation
  vec3 finalColor = mix(colorBase, colorHigh, vElevation * 1.5);
  
  // Fade out towards edges
  float edgeFade = smoothstep(0.0, 0.4, vUv.x) * smoothstep(1.0, 0.6, vUv.x) * 
                   smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);

  gl_FragColor = vec4(finalColor, strength * edgeFade * 0.8);
}
`;

function ParticleGrid() {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, mouse } = useThree();

    useFrame((state) => {
        if (!materialRef.current || !pointsRef.current) return;

        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

        // Map mouse coordinates (-1 to 1) to UV coordinates (0 to 1)
        materialRef.current.uniforms.uMouse.value.set(
            mouse.x * 0.5 + 0.5,
            mouse.y * 0.5 + 0.5
        );

        // Add a gentle floating rotation
        pointsRef.current.rotation.x = -Math.PI * 0.15 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        }),
        []
    );

    // Grid geometry - using large plane with wide grid
    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(
            viewport.width * 2,
            viewport.height * 2,
            Math.floor(viewport.width * 5),
            Math.floor(viewport.height * 5)
        );
    }, [viewport.width, viewport.height]);

    return (
        <points ref={pointsRef} position={[0, -0.5, 0]}>
            <primitive object={geometry} attach="geometry" />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function Hero3DBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-auto" style={{ width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <ParticleGrid />
            </Canvas>
        </div>
    );
}
