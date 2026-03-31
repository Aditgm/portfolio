"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Palette = {
  id: number;
  name: string;
  swatch: string;
};

const palettes: Palette[] = [
  { id: 0, name: "Aurora", swatch: "linear-gradient(135deg,#6d7cff,#62d7d2,#b88cff)" },
  { id: 1, name: "Ocean Glass", swatch: "linear-gradient(135deg,#4c7eff,#53b7ff,#4ff2d2)" },
  { id: 2, name: "Sunset Mist", swatch: "linear-gradient(135deg,#ff7e8f,#ffb778,#7e86ff)" },
];

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_palette;

varying vec2 v_uv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    total += snoise(p * frequency) * amplitude;
    frequency *= 2.0;
    amplitude *= 0.5;
  }

  return total;
}

vec3 paletteA(float t) {
  vec3 c1 = vec3(0.12, 0.16, 0.34);
  vec3 c2 = vec3(0.28, 0.44, 0.98);
  vec3 c3 = vec3(0.24, 0.86, 0.82);
  vec3 c4 = vec3(0.73, 0.52, 1.00);

  vec3 base = mix(c1, c2, smoothstep(0.0, 0.36, t));
  base = mix(base, c3, smoothstep(0.28, 0.7, t));
  return mix(base, c4, smoothstep(0.64, 1.0, t));
}

vec3 paletteB(float t) {
  vec3 c1 = vec3(0.06, 0.12, 0.26);
  vec3 c2 = vec3(0.16, 0.42, 0.95);
  vec3 c3 = vec3(0.24, 0.70, 1.00);
  vec3 c4 = vec3(0.30, 0.95, 0.84);

  vec3 base = mix(c1, c2, smoothstep(0.0, 0.34, t));
  base = mix(base, c3, smoothstep(0.22, 0.66, t));
  return mix(base, c4, smoothstep(0.58, 1.0, t));
}

vec3 paletteC(float t) {
  vec3 c1 = vec3(0.16, 0.10, 0.24);
  vec3 c2 = vec3(0.44, 0.30, 0.98);
  vec3 c3 = vec3(0.98, 0.50, 0.62);
  vec3 c4 = vec3(1.00, 0.73, 0.42);

  vec3 base = mix(c1, c2, smoothstep(0.0, 0.36, t));
  base = mix(base, c3, smoothstep(0.3, 0.7, t));
  return mix(base, c4, smoothstep(0.62, 1.0, t));
}

vec3 samplePalette(float idx, float t) {
  if (idx < 0.5) {
    return paletteA(t);
  }

  if (idx < 1.5) {
    return paletteB(t);
  }

  return paletteC(t);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centered = uv * 2.0 - 1.0;
  centered.x *= u_resolution.x / u_resolution.y;

  vec2 mouse = u_mouse * 2.0 - 1.0;
  mouse.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.12;

  float n1 = snoise(centered * 1.4 + vec2(t, -t * 0.8));
  float n2 = snoise(centered * 2.6 - vec2(t * 0.5, t * 0.95));
  float n3 = fbm(centered * 1.9 + vec2(n1 * 0.7, n2 * 0.5) + mouse * 0.35);

  float ripple = sin((centered.x + centered.y) * 2.9 + n2 * 1.6 + t * 4.0);
  float cursorField = exp(-2.5 * distance(centered, mouse));

  float blend = 0.52 + 0.32 * n3 + 0.15 * ripple + 0.22 * cursorField;
  blend = clamp(blend, 0.0, 1.0);

  float blend2 = clamp(blend + n1 * 0.18 - n2 * 0.1, 0.0, 1.0);

  vec3 c1 = samplePalette(u_palette, blend);
  vec3 c2 = samplePalette(u_palette, blend2);
  vec3 color = mix(c1, c2, 0.45 + 0.25 * n1);

  float heroGlow = smoothstep(0.9, 0.1, distance(uv, vec2(0.5, 0.2)));
  color += samplePalette(u_palette, 0.72) * heroGlow * 0.12;

  float vignette = smoothstep(1.32, 0.18, length(centered));
  color *= 0.72 + 0.28 * vignette;

  // Slightly deepens the base so content remains readable.
  color = mix(color, vec3(0.03, 0.05, 0.1), 0.22);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertex || !fragment) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export default function FluidGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteRef = useRef(0);
  const [palette, setPalette] = useState<number>(0);
  const [webglReady, setWebglReady] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const paletteInfo = useMemo(
    () => palettes.find((entry) => entry.id === palette) ?? palettes[0],
    [palette]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    paletteRef.current = palette;
  }, [palette]);

  useEffect(() => {
    if (reducedMotion) {
      setWebglReady(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      setWebglReady(false);
      return;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      setWebglReady(false);
      return;
    }

    setWebglReady(true);

    const posLocation = gl.getAttribLocation(program, "a_position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const paletteLocation = gl.getUniformLocation(program, "u_palette");

    const vertexBuffer = gl.createBuffer();

    if (!vertexBuffer || posLocation < 0 || !timeLocation || !resolutionLocation || !mouseLocation || !paletteLocation) {
      setWebglReady(false);
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const setMouse = (clientX: number, clientY: number) => {
      const x = clamp01(clientX / window.innerWidth);
      const y = clamp01(clientY / window.innerHeight);
      targetMouse.x = x;
      targetMouse.y = y;
    };

    const onPointerMove = (event: PointerEvent) => {
      setMouse(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      setMouse(touch.clientX, touch.clientY);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const startTime = performance.now();
    let rafId = 0;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.13;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.13;

      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(mouseLocation, smoothMouse.x, 1.0 - smoothMouse.y);
      gl.uniform1f(paletteLocation, paletteRef.current);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);

      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
    };
  }, [reducedMotion]);

  return (
    <div className="fluid-gradient-root" aria-hidden="true">
      {webglReady && !reducedMotion ? <canvas ref={canvasRef} className="fluid-gradient-canvas" /> : null}

      <div
        className={`fluid-gradient-fallback ${webglReady && !reducedMotion ? "fluid-gradient-fallback-hidden" : ""} ${reducedMotion ? "fluid-gradient-fallback-static" : ""}`}
      />
      <div className="fluid-gradient-hero-emphasis" />
      <div className="fluid-gradient-legibility" />

      <div className="fluid-gradient-switcher" role="group" aria-label="Gradient palette switcher">
        {palettes.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-label={`Use ${entry.name} gradient palette`}
            aria-pressed={palette === entry.id}
            onClick={() => setPalette(entry.id)}
            className={`fluid-gradient-swatch ${palette === entry.id ? "is-active" : ""}`}
            title={entry.name}
            style={{ background: entry.swatch }}
          />
        ))}
      </div>

      <span className="sr-only">Current gradient palette: {paletteInfo.name}</span>
    </div>
  );
}
