"use client";

import { useEffect, useRef, useState } from "react";

export interface HeroGradientBlindsProps {
  className?: string;
  textureSrc?: string;
  blindCount?: number;
  mouseDampening?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  hoverTilt?: number;
  sway?: number;
  speed?: number;
  shine?: number;
  relief?: number;
  noise?: number;
  lightColor?: string;
}

type ProgramInfo = {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
};

const MAX_WAVES = 4;
const RIPPLE_SECONDS = 1.6;
const TEXTURE_ASPECT = 2220 / 1569; // Native aspect ratio of /hero-gradient-blinds.png

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSwayTime;
uniform float uGrainTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uShine;
uniform float uRelief;
uniform float uSway;
uniform float uNoise;
uniform vec3 uLightColor;
uniform vec4 uWaves[4];
uniform sampler2D uTexture;
uniform float uTexAspect;

out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

// Map screen UV (0..1, y-up) to CSS object-contain object-top texture UV (0..1, y-down)
vec2 toObjectContainTopUV(vec2 uv0, float boxAspect, float texAspect) {
  float fromTop = 1.0 - uv0.y;
  if (boxAspect > texAspect) {
    float drawW = texAspect / boxAspect;
    return vec2((uv0.x - 0.5) / drawW + 0.5, fromTop);
  } else {
    float drawH = boxAspect / texAspect;
    return vec2(uv0.x, fromTop / drawH);
  }
}

// Sample texture smoothed horizontally over ~1 baked slat period so we extract
// the exact organic shape & amber-to-orange color field cleanly without moire,
// then re-apply live interactive WebGL fluted glass slats on top.
vec3 sampleSmoothedShape(vec2 texUV, float dispX, float dispY) {
  float slatPeriod = 1.0 / 22.0;
  vec3 sum = vec3(0.0);
  float totalW = 0.0;
  for (int i = -3; i <= 3; i++) {
    float fi = float(i);
    float w = exp(-0.18 * fi * fi);
    vec2 suv = vec2(
      texUV.x + dispX + fi * (slatPeriod * 0.24),
      texUV.y + dispY
    );
    vec3 c = (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0)
      ? vec3(1.0)
      : texture(uTexture, suv).rgb;
    sum += c * w;
    totalW += w;
  }
  return sum / totalW;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv0 = frag / uResolution;
  float boxAspect = uResolution.x / max(uResolution.y, 1.0);

  vec2 texUV = toObjectContainTopUV(uv0, boxAspect, uTexAspect);
  vec2 mouseUV0 = uMouse / uResolution;
  vec2 mouseTex = toObjectContainTopUV(mouseUV0, boxAspect, uTexAspect);

  // Fluted vertical glass slats locked cleanly to the shape's coordinate space
  float count = max(uBlindCount, 1.0);
  float stripePhase = texUV.x * count;
  float slat = floor(stripePhase);
  float s = stripePhase - slat;
  float pixel = max(fwidth(stripePhase), 1e-4);
  float stripeAA = clamp(count * 1.25 / min(uResolution.x, uResolution.y), 0.002, 0.08);
  float edgeBlend = 1.0 - smoothstep(0.0, stripeAA, min(s, 1.0 - s));
  float across = mix(s, 0.5, edgeBlend);

  // Mouse spotlight proximity
  float unit = min(uResolution.x, uResolution.y);
  float reach = max(uSpotlightRadius, 0.08) * unit;
  vec2 toLight = uMouse - frag;
  float nearLight = exp(-dot(toLight, toLight) / (reach * reach));

  float d = length((uv0 - mouseUV0) * vec2(boxAspect, 1.0));
  float r = max(uSpotlightRadius, 1e-4);
  float spot = max(0.0, (1.0 - 2.0 * pow(d / r, uSpotlightSoftness)) * uSpotlightOpacity);

  // Interactive slat tilt: subtle organic idle breathing + strong magnetic cursor tilt
  float tilt = 0.0;
  float pulse = 0.0;
  if (uSway > 0.0) {
    tilt += uSway * 0.45 * sin(uSwayTime * 0.85 + slat * 0.52) * (0.65 + 0.35 * sin(uSwayTime * 0.37 + slat * 0.21));
  }

  // Directional cursor offset tilts glass slats left/right as pointer glides across
  float dxSign = clamp((uv0.x - mouseUV0.x) * 4.0, -1.0, 1.0);
  tilt += uHover * nearLight * (0.85 + 0.45 * dxSign);

  // Click ripples across slats
  for (int i = 0; i < 4; i++) {
    vec4 wave = uWaves[i];
    if (wave.w <= 0.0) continue;
    float age = uTime - wave.z;
    if (age < 0.0 || age > ${RIPPLE_SECONDS.toFixed(2)}) continue;
    float life = age / ${RIPPLE_SECONDS.toFixed(2)};
    vec2 originUV0 = wave.xy / uResolution;
    vec2 originTex = toObjectContainTopUV(originUV0, boxAspect, uTexAspect);
    float slats = abs(slat + 0.5 - originTex.x * count);
    float front = age * max(count, 4.0) * 0.95;
    float k = (slats - front) / (0.85 + life * 1.25);
    float along = (texUV.y - originTex.y) / max(0.42 + life * 0.5, 0.01);
    float fade = (1.0 - life) * (1.0 - life);
    float ring = exp(-k * k) * exp(-along * along) * fade * smoothstep(0.0, 0.18, age);
    tilt += ring * 1.05;
    pulse += ring;
  }

  float edge = across;
  float ramp = pow(clamp(across, 0.0, 1.0), exp(tilt * 0.95));
  ramp *= 1.0 - 0.25 * min(pulse, 1.0);

  // Optical glass refraction inside each slat (responds cleanly to mouse + ripple)
  float refractX = (ramp - 0.5) * (0.012 + 0.024 * nearLight * uHover)
                 + tilt * 0.008
                 + (texUV.x - mouseTex.x) * nearLight * uHover * -0.028;
  float refractY = (texUV.y - mouseTex.y) * nearLight * uHover * -0.018
                 + pulse * 0.014 * sin(slat * 0.7);

  vec3 baseTint = sampleSmoothedShape(texUV, refractX, refractY);

  // Derive exact silhouette mask where shape has color vs pure white surrounding canvas
  float minC = min(baseTint.r, min(baseTint.g, baseTint.b));
  float maxC = max(baseTint.r, max(baseTint.g, baseTint.b));
  float chroma = maxC - minC;
  float shapeMask = clamp((1.0 - minC) * 1.35 + chroma * 0.5, 0.0, 1.0);

  // Warm 3D Light-Mode Fluted Glass Shading (pure color purity, zero muddy gray)
  float slatLit = pow(1.0 - ramp, 1.75) * (0.18 + 0.24 * nearLight * uHover) * shapeMask;
  vec3 slatCol = mix(baseTint, vec3(1.0), slatLit);

  // Deepen shadow side strictly along warm amber/terracotta hue
  vec3 warmShadow = baseTint * vec3(0.95, 0.85, 0.74);
  warmShadow = mix(warmShadow, vec3(1.0), smoothstep(0.08, 0.01, chroma));
  float slatCrease = uRelief * 0.24 * pow(ramp, 2.1) * shapeMask;
  slatCol = mix(slatCol, warmShadow, slatCrease);

  // Delicate fluted glass slat seam only inside the colored region
  float stroke = 1.0 - smoothstep(pixel * 0.5, pixel * 2.0, min(edge, 1.0 - edge));
  vec3 seamCol = mix(warmShadow, vec3(1.0), 0.42);
  slatCol = mix(slatCol, seamCol, stroke * 0.28 * smoothstep(0.04, 0.35, shapeMask));

  // Crisp specular edge sheen catching the cursor spotlight
  float sheen = uShine * exp(-pow((edge - 0.038) / 0.072, 2.0)) * (0.22 + 0.78 * nearLight * uHover) * (1.0 - edgeBlend);
  slatCol = mix(slatCol, vec3(1.0), clamp(sheen, 0.0, 1.0) * 0.58 * smoothstep(0.03, 0.3, shapeMask));

  // Mouse spotlight glow + click ripple illumination inside the colored glass shape
  float illumAmount = (spot * 0.28 + min(pulse, 1.0) * 0.24) * smoothstep(0.02, 0.32, shapeMask);
  slatCol = mix(slatCol, uLightColor, clamp(illumAmount, 0.0, 0.5));

  // Warm organic micro-grain strictly inside colored shape (pure #FFFFFF outside)
  if (uNoise > 0.001 && shapeMask > 0.01) {
    float grain = 0.5 * (hash(frag + uGrainTime) + hash(frag.yx + uGrainTime * 1.7)) - 0.5;
    vec3 warmGrain = grain * uNoise * 0.025 * mix(vec3(1.0, 0.96, 0.92), baseTint, 0.55) * shapeMask;
    slatCol = clamp(slatCol + warmGrain, 0.0, 1.0);
  }

  // Strictly lock pure white margin outside the organic silhouette
  vec3 finalCol = mix(vec3(1.0), clamp(slatCol, 0.0, 1.0), smoothstep(0.005, 0.04, shapeMask));
  outColor = vec4(finalCol, 1.0);
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const hexToRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "f");
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return [1, 1, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const compileShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const createProgram = (gl: WebGL2RenderingContext): ProgramInfo | null => {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    return null;
  }

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  const uniformNames = [
    "uResolution",
    "uTime",
    "uSwayTime",
    "uGrainTime",
    "uMouse",
    "uHover",
    "uBlindCount",
    "uSpotlightRadius",
    "uSpotlightSoftness",
    "uSpotlightOpacity",
    "uShine",
    "uRelief",
    "uSway",
    "uNoise",
    "uLightColor",
    "uWaves",
    "uTexture",
    "uTexAspect",
  ];

  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  for (const name of uniformNames) {
    uniforms[name] = gl.getUniformLocation(program, name);
  }

  return { program, uniforms };
};

export default function HeroGradientBlinds({
  className = "",
  textureSrc = "/hero-gradient-blinds.png",
  blindCount = 24,
  mouseDampening = 0.14,
  spotlightRadius = 0.55,
  spotlightSoftness = 1.4,
  spotlightOpacity = 0.75,
  sway = 0.25,
  speed = 0.55,
  shine = 0.35,
  relief = 0.4,
  noise = 0.2,
  lightColor = "#FFF6EC",
}: HeroGradientBlindsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shaderReady, setShaderReady] = useState(false);

  const settingsRef = useRef({
    blindCount,
    mouseDampening,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    sway,
    speed,
    shine,
    relief,
    noise,
    lightColor,
  });

  useEffect(() => {
    settingsRef.current = {
      blindCount,
      mouseDampening,
      spotlightRadius,
      spotlightSoftness,
      spotlightOpacity,
      sway,
      speed,
      shine,
      relief,
      noise,
      lightColor,
    };
  }, [
    blindCount,
    mouseDampening,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    sway,
    speed,
    shine,
    relief,
    noise,
    lightColor,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block;pointer-events:none;";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });

    if (!gl) {
      canvas.remove();
      return;
    }

    const prog = createProgram(gl);
    const vao = gl.createVertexArray();
    const texture = gl.createTexture();

    if (!prog || !vao || !texture) {
      if (prog) gl.deleteProgram(prog.program);
      if (vao) gl.deleteVertexArray(vao);
      if (texture) gl.deleteTexture(texture);
      canvas.remove();
      return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let textureLoaded = false;
    let texAspect = TEXTURE_ASPECT;
    let disposed = false;
    let visible = true;
    let raf = 0;
    let lastTime = 0;
    let elapsed = 0;
    let swayTime = 0;
    let grainTime = 0;
    let hover = 0;
    let waveIndex = 0;
    const waves = new Float32Array(MAX_WAVES * 4);

    const view = { width: 1, height: 1, ratio: 1 };
    const pointer = { x: 0, y: 0, inside: false };
    const light = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0 };

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = textureSrc;
    img.onload = () => {
      if (disposed) return;
      texAspect = img.naturalWidth / Math.max(img.naturalHeight, 1);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      textureLoaded = true;
      setShaderReady(true);
      wake();
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * ratio));
      const h = Math.max(1, Math.floor(rect.height * ratio));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const prevW = view.width;
      const prevH = view.height;
      view.width = w;
      view.height = h;
      view.ratio = ratio;

      if (prevW <= 1 && prevH <= 1) {
        light.x = w * 0.55;
        light.y = h * 0.6;
        light.tx = light.x;
        light.ty = light.y;
      } else {
        light.x *= w / prevW;
        light.y *= h / prevH;
        light.tx *= w / prevW;
        light.ty *= h / prevH;
      }
      wake();
    };

    const draw = () => {
      if (!textureLoaded) return;
      const s = settingsRef.current;
      gl.viewport(0, 0, view.width, view.height);
      gl.useProgram(prog.program);
      gl.bindVertexArray(vao);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      const u = prog.uniforms;
      gl.uniform1i(u.uTexture, 0);
      gl.uniform1f(u.uTexAspect, texAspect);
      gl.uniform2f(u.uResolution, view.width, view.height);
      gl.uniform1f(u.uTime, elapsed);
      gl.uniform1f(u.uSwayTime, swayTime);
      gl.uniform1f(u.uGrainTime, grainTime);
      gl.uniform2f(u.uMouse, light.x, light.y);
      gl.uniform1f(u.uHover, hover);
      gl.uniform1f(u.uBlindCount, clamp(s.blindCount, 4, 64));
      gl.uniform1f(u.uSpotlightRadius, clamp(s.spotlightRadius, 0.1, 2));
      gl.uniform1f(u.uSpotlightSoftness, clamp(s.spotlightSoftness, 0.2, 4));
      gl.uniform1f(u.uSpotlightOpacity, clamp(s.spotlightOpacity, 0, 2));
      gl.uniform1f(u.uShine, clamp(s.shine, 0, 2));
      gl.uniform1f(u.uRelief, clamp(s.relief, 0, 2));
      gl.uniform1f(u.uSway, reduceMotion ? 0 : clamp(s.sway, 0, 2));
      gl.uniform1f(u.uNoise, clamp(s.noise, 0, 1));
      gl.uniform3fv(u.uLightColor, hexToRGB(s.lightColor));
      gl.uniform4fv(u.uWaves, waves);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);
    };

    const follow = (tau: number, dt: number) => {
      if (tau <= 0) {
        light.x = light.tx;
        light.y = light.ty;
        light.vx = 0;
        light.vy = 0;
        return;
      }
      const omega = 2.4 / tau;
      const k = omega * omega;
      const c = 2 * omega;
      const steps = Math.max(1, Math.ceil(dt / 0.008));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        light.vx += (k * (light.tx - light.x) - c * light.vx) * h;
        light.vy += (k * (light.ty - light.y) - c * light.vy) * h;
        light.x += light.vx * h;
        light.y += light.vy * h;
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      const s = settingsRef.current;
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0.016;
      lastTime = now;

      elapsed += dt;
      if (!reduceMotion) {
        swayTime += dt * s.speed;
      }
      grainTime = Math.floor(elapsed * 24) * 17.13;
      hover += ((pointer.inside ? 1 : 0) - hover) * (1 - Math.exp(-dt / 0.3));

      if (pointer.inside) {
        light.tx = pointer.x * view.ratio;
        light.ty = (view.height / view.ratio - pointer.y) * view.ratio;
      } else if (!reduceMotion) {
        // Gentle idle spotlight drift over the blinds when pointer leaves hero
        light.tx = view.width * (0.58 + 0.14 * Math.sin(swayTime * 0.25));
        light.ty = view.height * (0.58 + 0.1 * Math.cos(swayTime * 0.31));
      }

      follow(s.mouseDampening, dt);

      for (let i = 0; i < MAX_WAVES; i++) {
        if (waves[i * 4 + 3] > 0 && elapsed - waves[i * 4 + 2] > RIPPLE_SECONDS) {
          waves[i * 4 + 3] = 0;
        }
      }

      draw();
      raf = requestAnimationFrame(frame);
    };

    function wake() {
      if (!raf && !disposed && visible && !document.hidden) {
        lastTime = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    const locatePointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      return { x, y, inside };
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y, inside } = locatePointer(e);
      pointer.x = x;
      pointer.y = y;
      pointer.inside = inside;
      if (inside) wake();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reduceMotion) return;
      const { x, y, inside } = locatePointer(e);
      if (!inside) return;
      const o = waveIndex * 4;
      waves[o] = x * view.ratio;
      waves[o + 1] = view.height - y * view.ratio;
      waves[o + 2] = elapsed;
      waves[o + 3] = 1;
      waveIndex = (waveIndex + 1) % MAX_WAVES;
      wake();
    };

    const onVisibilityChange = () => {
      if (!document.hidden) wake();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) wake();
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteTexture(texture);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog.program);
      canvas.remove();
    };
  }, [textureSrc]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`w-full h-full transition-opacity duration-300 ${
        shaderReady ? "opacity-100" : "opacity-0"
      } ${className}`.trim()}
    />
  );
}

