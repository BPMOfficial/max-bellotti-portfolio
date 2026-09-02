"use client";

import { useEffect, useRef } from "react";
import { dpr, useReducedMotion } from "@/hooks/useReducedMotion";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv - vec2(0.10, 0.5);
  p.x *= (u_res.x / u_res.y) * 0.62;
  float t = u_time;

  float x = max(p.x, 0.0);
  float w = 0.030 + x * 0.30;
  float n = fbm(vec2(x * 6.5 - t * 1.7, p.y * 9.5 + t * 0.28));
  float yoff = (n - 0.5) * x * 0.36;
  float d = abs(p.y - yoff) / w;

  float core = exp(-d * d * 2.3);
  float decay = exp(-x * 1.30);
  float dens = core * decay * (0.55 + 0.95 * n);

  // shock diamonds, faintly
  float mach = 0.16 * exp(-x * 3.2) * pow(max(0.0, sin(x * 46.0)), 6.0) * core;

  float flash = exp(-dot(p, p) * 300.0) * 1.5;

  vec3 cCore = vec3(0.80, 0.99, 1.00);
  vec3 cMid  = vec3(0.25, 0.85, 0.88);
  vec3 cEdge = vec3(0.95, 0.66, 0.23);

  float e = dens + mach;
  vec3 col = mix(cEdge, cMid, smoothstep(0.0, 0.55, e));
  col = mix(col, cCore, smoothstep(0.48, 1.10, e));

  float a = clamp(e * 1.55 + flash, 0.0, 1.0);
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

/**
 * The plume runs as a single fullscreen-quad fragment shader — no 3D library.
 * It composites over the real plasma photograph in screen blend mode, and
 * falls back to a static frame (or nothing at all, if WebGL is unavailable)
 * without breaking the section around it.
 */
export function IonPlume({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    const gl =
      (cv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false }) as
        | WebGLRenderingContext
        | null) ?? null;
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const ratio = dpr();
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * ratio));
      const h = Math.max(1, Math.round(r.height * ratio));
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, cv.width, cv.height);
    };

    const render = (t: number) => {
      resize();
      gl.uniform1f(uTime, t);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduced) {
      render(2.4);
      const ro = new ResizeObserver(() => render(2.4));
      ro.observe(cv);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = false;
    const start = performance.now();

    const loop = (now: number) => {
      render((now - start) / 1000);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "80px 0px" },
    );
    io.observe(cv);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
