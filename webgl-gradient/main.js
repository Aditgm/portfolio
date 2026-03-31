const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const palettes = [
  { id: 0, name: "Aurora" },
  { id: 1, name: "Ocean Glass" },
  { id: 2, name: "Sunset Mist" },
];

const root = document.getElementById("gradient-root");
const canvas = document.getElementById("gradient-canvas");
const fallback = document.getElementById("gradient-fallback");
const switcher = document.getElementById("palette-switcher");

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let prefersReducedMotion = reducedMotionQuery.matches;

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader) || "Shader compile failed.");
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
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
    console.error(gl.getProgramInfoLog(program) || "Shader link failed.");
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function setFallbackMode(enableStatic = false) {
  root.classList.add("is-fallback");
  if (enableStatic) {
    fallback.classList.add("is-static");
  } else {
    fallback.classList.remove("is-static");
  }
}

async function boot() {
  if (prefersReducedMotion) {
    setFallbackMode(true);
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
    setFallbackMode(false);
    return;
  }

  let fragSource = "";
  try {
    const response = await fetch("./shader.frag", { cache: "no-cache" });
    fragSource = await response.text();
  } catch {
    setFallbackMode(false);
    return;
  }

  const program = createProgram(gl, VERTEX_SHADER, fragSource);
  if (!program) {
    setFallbackMode(false);
    return;
  }

  root.classList.add("is-webgl");

  const posLocation = gl.getAttribLocation(program, "a_position");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const mouseLocation = gl.getUniformLocation(program, "u_mouse");
  const paletteLocation = gl.getUniformLocation(program, "u_palette");

  if (
    posLocation < 0 ||
    !timeLocation ||
    !resolutionLocation ||
    !mouseLocation ||
    !paletteLocation
  ) {
    setFallbackMode(false);
    return;
  }

  const buffer = gl.createBuffer();
  if (!buffer) {
    setFallbackMode(false);
    return;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  gl.useProgram(program);
  gl.enableVertexAttribArray(posLocation);
  gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

  let palette = 0;
  const targetMouse = { x: 0.5, y: 0.5 };
  const smoothMouse = { x: 0.5, y: 0.5 };

  const setPointer = (x, y) => {
    targetMouse.x = clamp01(x / window.innerWidth);
    targetMouse.y = clamp01(y / window.innerHeight);
  };

  const onPointerMove = (event) => {
    setPointer(event.clientX, event.clientY);
  };

  const onTouchMove = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    setPointer(touch.clientX, touch.clientY);
  };

  const onResize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(window.innerWidth * dpr));
    const height = Math.max(1, Math.floor(window.innerHeight * dpr));

    canvas.width = width;
    canvas.height = height;

    gl.viewport(0, 0, width, height);
    gl.uniform2f(resolutionLocation, width, height);
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });

  onResize();

  const onPaletteClick = (event) => {
    const button = event.target.closest("button[data-palette]");
    if (!button) return;

    palette = Number(button.dataset.palette || 0);
    for (const child of switcher.querySelectorAll("button")) {
      child.classList.toggle("is-active", child === button);
      child.setAttribute("aria-pressed", String(child === button));
    }
  };

  switcher.addEventListener("click", onPaletteClick);

  const start = performance.now();
  let frame = 0;

  const render = (now) => {
    const elapsed = (now - start) / 1000;

    smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.13;
    smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.13;

    gl.uniform1f(timeLocation, elapsed);
    gl.uniform2f(mouseLocation, smoothMouse.x, 1.0 - smoothMouse.y);
    gl.uniform1f(paletteLocation, palette);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    frame = requestAnimationFrame(render);
  };

  frame = requestAnimationFrame(render);

  const onMotionPreference = (event) => {
    if (!event.matches) return;
    cancelAnimationFrame(frame);
    setFallbackMode(true);
  };

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", onMotionPreference);
  } else {
    reducedMotionQuery.addListener(onMotionPreference);
  }

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("touchmove", onTouchMove);
    switcher.removeEventListener("click", onPaletteClick);

    if (typeof reducedMotionQuery.removeEventListener === "function") {
      reducedMotionQuery.removeEventListener("change", onMotionPreference);
    } else {
      reducedMotionQuery.removeListener(onMotionPreference);
    }

    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  });
}

for (const palette of palettes) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.palette = String(palette.id);
  button.textContent = palette.name;
  button.setAttribute("aria-label", `Switch to ${palette.name}`);
  button.setAttribute("aria-pressed", palette.id === 0 ? "true" : "false");
  button.className = `switcher-btn ${palette.id === 0 ? "is-active" : ""}`;
  switcher.appendChild(button);
}

boot();
