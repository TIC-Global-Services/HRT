"use client";

import { useEffect, useRef, useState } from "react"

/**
 * FlutedGlassBackground
 * A soft amber→red gradient that drifts on its own and follows the pointer,
 * seen through vertical fluted glass. Fills its parent; put content on top.
 *
 * Usage:
 *   <div style={{ position: "relative", height: "100vh" }}>
 *     <FlutedGlassBackground />
 *     <h1 style={{ position: "relative" }}>Hello</h1>
 *   </div>
 */

type Props = {
    /** Lower-left lobe colour */
    colorA?: string
    /** Upper-right lobe colour */
    colorB?: string
    /** Page colour behind the gradient */
    background?: string
    /** Slits across the screen on desktop (reference: 18.81) */
    desktopSlits?: number
    /** Slit width in px below the desktop breakpoint (reference: 76.5) */
    mobileSlitWidth?: number
    /** Width (px) at which desktop slit count kicks in */
    desktopBreakpoint?: number
    /** Background widths squeezed into each slit (reference: 1.9) */
    squeeze?: number
    /** Flat rounded edge on each side of a slit, 0–0.2 (reference: 0.045) */
    lip?: number
    /** Idle drift speed multiplier */
    speed?: number
    /** How strongly the gradient leans toward the pointer, 0–1 */
    mouseStrength?: number
    /** Optional background image texture driven through the fluted glass shader */
    textureSrc?: string
    /** Optional fallback image source if WebGL is unavailable or fails */
    fallbackSrc?: string
    /** Optional stitched multi-card texture sources composited into one continuous WebGL canvas */
    compositeSources?: { src: string; x: number; y: number; w: number; h: number }[]
    /** Coordinate space dimensions when using compositeSources */
    compositeSize?: { w: number; h: number }
    /** Visual composition preset ("hero" default or "timeline" 4-card continuous sweep) */
    preset?: "hero" | "timeline"
    className?: string
    style?: React.CSSProperties
}

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_strips;
uniform float u_influence;
uniform float u_squeeze;
uniform float u_lip;
uniform vec3  u_colA;
uniform vec3  u_colB;
uniform vec3  u_bg;
uniform sampler2D u_tex;
uniform float u_hasTex;
uniform float u_texAspect;
uniform float u_preset;

vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec2 mod289(vec2 x){ return x - floor(x*(1./289.))*289.; }
vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.,0.) : vec2(0.,1.);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.);
  m = m*m; m = m*m;
  vec3 x = 2.*fract(p*C.www) - 1.;
  vec3 h = abs(x) - .5;
  vec3 ox = floor(x + .5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - .85373472095314*(a0*a0 + h*h);
  vec3 g; g.x = a0.x*x0.x + h.x*x0.y; g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.*dot(m, g);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453); }
float blob(vec2 p, vec2 c, vec2 r){ vec2 d = (p - c)/r; return exp(-dot(d,d)); }

vec2 coverTopUV(vec2 uv, float boxAspect, float texAspect) {
  float fromTop = 1.0 - uv.y;
  if (boxAspect > texAspect) {
    return vec2(uv.x, fromTop * (texAspect / boxAspect));
  } else {
    float visW = boxAspect / texAspect;
    return vec2((uv.x - 0.5) * visW + 0.5, fromTop);
  }
}

vec3 sampleTexField(float sx, float uvY, float aspect) {
  float t = u_time * 0.16;
  vec2 baseUV = vec2(sx, uvY);
  vec2 tuv = coverTopUV(baseUV, aspect, u_texAspect);

  // Sample exact pixel first to gauge local color saturation (keeps white areas pure white)
  vec3 exactCol = texture2D(u_tex, clamp(tuv, 0.0, 1.0)).rgb;
  float minC = min(exactCol.r, min(exactCol.g, exactCol.b));
  float satMask = smoothstep(0.02, 0.28, 1.0 - minC);

  // Mouse interaction & subtle ambient noise drift weighted cleanly by u_influence
  vec2 m = clamp(u_mouse, -0.2, 1.2);
  vec2 diff = baseUV - m;
  float distSq = dot(diff * vec2(aspect, 1.0), diff * vec2(aspect, 1.0));
  float nearMouse = exp(-distSq * 3.8);

  vec2 noiseVec = vec2(
    snoise(vec2(sx * aspect * 1.5, uvY * 1.5) + vec2(t, -t * 0.7)),
    snoise(vec2(sx * aspect * 1.5, uvY * 1.5) + vec2(-t * 0.8, t) + 7.3)
  );

  // Pull orange light toward pointer horizontally & gently vertically without bleeding into white text bottom
  vec2 pull = vec2(
    (m.x - sx) * nearMouse * 0.18 * u_influence,
    (m.y - uvY) * nearMouse * 0.055 * u_influence * satMask
  );
  vec2 disp = vec2(
    noiseVec.x * (0.014 + 0.024 * u_influence) * satMask + pull.x,
    noiseVec.y * 0.012 * satMask - pull.y
  );

  // Smooth over baked seam hairlines as interactive fluted glass engages
  float blurSpread = 0.018 * (0.35 + 0.65 * u_influence) * satMask;
  vec3 sum = vec3(0.0);
  float totalW = 0.0;
  for (int i = -2; i <= 2; i++) {
    float fi = float(i);
    float w = exp(-0.35 * fi * fi);
    vec2 sUV = clamp(coverTopUV(baseUV + disp + vec2(fi * blurSpread, 0.0), aspect, u_texAspect), 0.0, 1.0);
    sum += texture2D(u_tex, sUV).rgb * w;
    totalW += w;
  }
  vec3 col = sum / totalW;

  // Warm luminous sheen under hovered fluted bar
  float spotGlow = nearMouse * u_influence * 0.14 * satMask;
  col = mix(col, mix(col, vec3(1.0, 0.62, 0.25), 0.35), spotGlow);

  return mix(exactCol, col, clamp(u_influence * 0.92 + 0.08 * satMask, 0.0, 1.0));
}

vec3 fieldTimeline(vec2 p, float aspect){
  float t = u_time * .12;
  vec2 m = vec2(u_mouse.x*aspect, u_mouse.y);
  vec2 w = vec2(snoise(p*1.15 + vec2(t, -t*.7)), snoise(p*1.15 + vec2(-t*.8, t) + 7.3));
  p += w * .055;

  vec2 d1 = vec2(snoise(vec2(t*.8, 1.)),  snoise(vec2(t*.8, 4.)))  * .06;
  vec2 d2 = vec2(snoise(vec2(t*.65, 9.)), snoise(vec2(t*.65, 13.))) * .07;
  vec2 d3 = vec2(snoise(vec2(t*.75, 21.)), snoise(vec2(t*.75, 27.))) * .06;
  vec2 d4 = vec2(snoise(vec2(t*.55, 33.)), snoise(vec2(t*.55, 39.))) * .06;

  // 4-Card continuous diagonal wave matching image 100%:
  // Card 1 (0..0.24): faint top-right peach tail
  // Card 2 (0.25..0.49): warm orange-coral top half, clean white bottom
  // Card 3 (0.51..0.75): intense fiery red-orange upper 65%, white bottom
  // Card 4 (0.76..1.00): rich red-orange top-left filling seamlessly into full golden amber bottom
  vec2 cR1 = vec2(.24*aspect, .87) + d1 * .6;
  vec2 cR2 = vec2(.42*aspect, .81) + d2 * .7;
  vec2 cR3 = vec2(.62*aspect, .80) + d3 * .6;
  vec2 cR3b = vec2(.68*aspect, .56) + d4 * .5;
  vec2 cR4 = vec2(.81*aspect, .81) + d4 * .5;
  vec2 cR5 = vec2(.98*aspect, .80) + d1 * .4;

  vec2 cA1 = vec2(.82*aspect, .42) + d1 * .4;
  vec2 cA2 = vec2(.90*aspect, .28) + d2 * .4;
  vec2 cA3 = vec2(1.01*aspect, .45) + d3 * .4;

  float k = u_influence;
  vec2 safeM = vec2(m.x, mix(m.y, max(m.y, 0.46), smoothstep(0.75*aspect, 0.25*aspect, m.x)));
  cR1 = mix(cR1, safeM, .18*k);
  cR2 = mix(cR2, safeM, .22*k);
  cR3 = mix(cR3, safeM, .20*k);
  cR3b = mix(cR3b, safeM, .20*k);
  cR4 = mix(cR4, safeM, .18*k);
  cR5 = mix(cR5, safeM, .12*k);
  cA1 = mix(cA1, m, .16*k);
  cA2 = mix(cA2, m, .16*k);
  cA3 = mix(cA3, m, .12*k);

  float b = .26*blob(p, cR1, vec2(.11*aspect, .19))
          + .95*blob(p, cR2, vec2(.16*aspect, .21))
          + 1.35*blob(p, cR3, vec2(.18*aspect, .25))
          + 1.05*blob(p, cR3b, vec2(.15*aspect, .22))
          + 1.25*blob(p, cR4, vec2(.16*aspect, .28))
          + 1.05*blob(p, cR5, vec2(.16*aspect, .28));

  float a = 1.05*blob(p, cA1, vec2(.11*aspect, .28))
          + 1.60*blob(p, cA2, vec2(.20*aspect, .32))
          + 1.30*blob(p, cA3, vec2(.18*aspect, .34));

  // Mouse highlight glow (subtle so Card 1-3 bottom copy stays clean)
  float hot = .30*k*blob(p, m, vec2(.12*aspect, .14));
  b += hot*.55; a += hot*.45;

  vec3 col = (a*u_colA + b*u_colB) / max(a + b, 1e-4);
  float alpha = pow(smoothstep(0., 1., a + b), 1.05);
  return mix(u_bg, col, alpha);
}

vec3 field(vec2 p, float aspect){
  if (u_preset > 0.5) return fieldTimeline(p, aspect);
  float t = u_time * .12;
  vec2 m = vec2(u_mouse.x*aspect, u_mouse.y);
  vec2 w = vec2(snoise(p*1.3 + vec2(t, -t*.7)), snoise(p*1.3 + vec2(-t*.8, t) + 7.3));
  p += w * .07;

  vec2 d1 = vec2(snoise(vec2(t*.9, 1.)),  snoise(vec2(t*.9, 4.)))  * .12;
  vec2 d2 = vec2(snoise(vec2(t*.7, 9.)),  snoise(vec2(t*.7, 13.))) * .14;
  vec2 d3 = vec2(snoise(vec2(t*.8, 21.)), snoise(vec2(t*.8, 27.))) * .10;
  vec2 d4 = vec2(snoise(vec2(t*.6, 33.)), snoise(vec2(t*.6, 39.))) * .12;

  vec2 cA = vec2(.47*aspect, .40) + d1;
  vec2 cB = vec2(.40*aspect, .27) + d2;
  vec2 cC = vec2(.62*aspect, .78) + d3;
  vec2 cD = vec2(.84*aspect, .86) + d4;

  float k = u_influence;
  cA = mix(cA, m, .38*k);
  cB = mix(cB, m, .18*k);
  cC = mix(cC, m, .30*k);
  cD = mix(cD, m, .14*k);

  float a = blob(p, cA, vec2(.13,.20)) + .8*blob(p, cB, vec2(.10,.15))
          + .5*blob(p, mix(cA, cC, .45), vec2(.07,.14));
  float b = blob(p, cC, vec2(.17,.10)) + .9*blob(p, cD, vec2(.17,.08))
          + .45*blob(p, mix(cC, cA, .35), vec2(.065,.13));
  float hot = .35*k*blob(p, m, vec2(.12,.12));
  b += hot*.6; a += hot*.4;

  vec3 col = (a*u_colA + b*u_colB) / max(a + b, 1e-4);
  float alpha = pow(smoothstep(0., 1., a + b), 1.15);
  return mix(u_bg, col, alpha);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  // Fluted glass: each slit is a linear minifying lens, centred grid,
  // flat lip at each edge, no tint / shading / highlights.
  float s = (uv.x - .5) * u_strips + 100.5;
  float id = floor(s);
  float f = fract(s);

  vec3 col;
  if (u_hasTex > 0.5) {
    // Blend seamlessly from 100% exact artwork (1.0) at rest to fluted lens refraction (u_squeeze) on hover
    float infLens = clamp(u_influence, 0.0, 1.0);
    float fl = mix(f, clamp((f - u_lip) / (1. - 2.*u_lip), 0., 1.), infLens);
    float sq = mix(1.0, u_squeeze, infLens);
    float sx = (id + .5 + sq * (fl - .5) - 100.5) / u_strips + .5;
    col = sampleTexField(sx, uv.y, aspect);

    float px = u_strips / u_res.x;
    if (f < px * 1.5 && infLens > 0.01) {
      float sxPrev = (id - .5 + sq * .5 - 100.5) / u_strips + .5;
      vec3 prev = sampleTexField(sxPrev, uv.y, aspect);
      col = mix(prev, col, smoothstep(0., px * 1.5, f));
    }
  } else {
    float fl = clamp((f - u_lip) / (1. - 2.*u_lip), 0., 1.);
    float sx = (id + .5 + u_squeeze * (fl - .5) - 100.5) / u_strips + .5;
    col = field(vec2(sx*aspect, uv.y), aspect);

    float px = u_strips / u_res.x;
    if (f < px * 1.5) {
      float sxPrev = (id - .5 + u_squeeze * .5 - 100.5) / u_strips + .5;
      vec3 prev = field(vec2(sxPrev*aspect, uv.y), aspect);
      col = mix(prev, col, smoothstep(0., px * 1.5, f));
    }
  }

  col += (hash(gl_FragCoord.xy + fract(u_time)*100.) - .5) * .006;
  gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
}
`

function hexToRgb(hex: string): [number, number, number] {
    let h = hex.replace("#", "")
    if (h.length === 3) h = h.split("").map((c) => c + c).join("")
    const n = parseInt(h.slice(0, 6), 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function FlutedGlassBackground({
    colorA = "#FFA812",
    colorB = "#FF4D0A",
    background = "#FFFFFF",
    desktopSlits = 1440 / 76.55,
    mobileSlitWidth = 76.5,
    desktopBreakpoint = 1024,
    squeeze = 1.9,
    lip = 0.045,
    speed = 1,
    mouseStrength = 1,
    textureSrc,
    fallbackSrc,
    compositeSources,
    compositeSize,
    preset = "hero",
    className,
    style,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [failed, setFailed] = useState(false)

    // Keep latest props readable inside the animation loop without restarting it
    const propsRef = useRef({
        colorA, colorB, background, desktopSlits, mobileSlitWidth,
        desktopBreakpoint, squeeze, lip, speed, mouseStrength, textureSrc,
        fallbackSrc, compositeSources, compositeSize, preset,
    })
    useEffect(() => {
        propsRef.current = {
            colorA, colorB, background, desktopSlits, mobileSlitWidth,
            desktopBreakpoint, squeeze, lip, speed, mouseStrength, textureSrc,
            fallbackSrc, compositeSources, compositeSize, preset,
        }
    }, [
        colorA, colorB, background, desktopSlits, mobileSlitWidth,
        desktopBreakpoint, squeeze, lip, speed, mouseStrength, textureSrc,
        fallbackSrc, compositeSources, compositeSize, preset,
    ])

    const compositeKey = compositeSources ? compositeSources.map((s) => `${s.src}:${s.x}:${s.y}:${s.w}:${s.h}`).join("|") : ""

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        let gl: WebGLRenderingContext | null = null
        try {
            gl = canvas.getContext("webgl", {
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
            })
        } catch {
            gl = null
        }

        if (!gl || gl.isContextLost()) {
            setFailed(true)
            return
        }

        const compile = (type: number, src: string) => {
            if (!gl) return null
            const sh = gl.createShader(type)
            if (!sh) return null
            gl.shaderSource(sh, src)
            gl.compileShader(sh)
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
                const info = gl.getShaderInfoLog(sh)
                if (info) console.warn("WebGL shader compile info:", info)
                gl.deleteShader(sh)
                return null
            }
            return sh
        }

        const vertSh = compile(gl.VERTEX_SHADER, VERT)
        const fragSh = compile(gl.FRAGMENT_SHADER, FRAG)
        if (!vertSh || !fragSh) {
            if (vertSh) gl.deleteShader(vertSh)
            if (fragSh) gl.deleteShader(fragSh)
            setFailed(true)
            return
        }

        const prog = gl.createProgram()
        if (!prog) {
            gl.deleteShader(vertSh)
            gl.deleteShader(fragSh)
            setFailed(true)
            return
        }

        gl.attachShader(prog, vertSh)
        gl.attachShader(prog, fragSh)
        gl.linkProgram(prog)

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(prog)
            if (info) console.warn("WebGL program link info:", info)
            gl.deleteProgram(prog)
            gl.deleteShader(vertSh)
            gl.deleteShader(fragSh)
            setFailed(true)
            return
        }

        gl.useProgram(prog)

        const buf = gl.createBuffer()
        if (!buf) {
            gl.deleteProgram(prog)
            gl.deleteShader(vertSh)
            gl.deleteShader(fragSh)
            setFailed(true)
            return
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, "a_pos")
        if (loc === -1) {
            gl.deleteBuffer(buf)
            gl.deleteProgram(prog)
            gl.deleteShader(vertSh)
            gl.deleteShader(fragSh)
            setFailed(true)
            return
        }
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

        const U = (n: string) => gl?.getUniformLocation(prog, n)
        const u = {
            res: U("u_res"), time: U("u_time"), mouse: U("u_mouse"),
            strips: U("u_strips"), inf: U("u_influence"), squeeze: U("u_squeeze"),
            lip: U("u_lip"), colA: U("u_colA"), colB: U("u_colB"), bg: U("u_bg"),
            tex: U("u_tex"), hasTex: U("u_hasTex"), texAspect: U("u_texAspect"), preset: U("u_preset"),
        }

        let tex: WebGLTexture | null = null
        let hasTex = 0
        let texAspect = 1
        let disposed = false

        if (compositeSources && compositeSources.length > 0 && compositeSize) {
            tex = gl.createTexture()
            Promise.all(
                compositeSources.map(
                    (item) =>
                        new Promise<{ item: typeof item; img: HTMLImageElement }>((resolve, reject) => {
                            const img = new window.Image()
                            img.crossOrigin = "anonymous"
                            img.onload = () => resolve({ item, img })
                            img.onerror = reject
                            img.src = item.src
                        })
                )
            )
                .then((loaded) => {
                    if (disposed || !tex || !gl) return
                    const off = document.createElement("canvas")
                    off.width = compositeSize.w
                    off.height = compositeSize.h
                    const ctx = off.getContext("2d")
                    if (!ctx) return

                    ctx.fillStyle = background || "#FFFFFF"
                    ctx.fillRect(0, 0, off.width, off.height)

                    // First pass: inpaint rounded corners and bridge gaps softly between cards
                    const offsets = [
                        [-24, 0], [24, 0], [0, -24], [0, 24],
                        [-18, -18], [18, -18], [-18, 18], [18, 18],
                    ]
                    for (const { item, img } of loaded) {
                        for (const [ox, oy] of offsets) {
                            ctx.drawImage(img, item.x + ox, item.y + oy, item.w, item.h)
                        }
                    }

                    // Smoothly bridge the horizontal gap between consecutive cards
                    for (let i = 0; i < loaded.length - 1; i++) {
                        const left = loaded[i]
                        const right = loaded[i + 1]
                        const gapX = left.item.x + left.item.w
                        const gapW = Math.max(0, right.item.x - gapX)
                        const bridgeH = Math.max(left.item.h, right.item.h)
                        if (gapW > 0) {
                            ctx.save()
                            ctx.drawImage(
                                left.img,
                                Math.max(0, left.img.naturalWidth - 4),
                                0,
                                4,
                                left.img.naturalHeight,
                                gapX,
                                left.item.y,
                                gapW,
                                left.item.h
                            )
                            ctx.globalAlpha = 0.5
                            ctx.drawImage(
                                right.img,
                                0,
                                0,
                                4,
                                right.img.naturalHeight,
                                gapX,
                                right.item.y,
                                gapW,
                                Math.min(bridgeH, right.item.h)
                            )
                            ctx.restore()
                        }
                    }

                    // Final pass: draw each card artwork crisply 1:1 in its exact position
                    for (const { item, img } of loaded) {
                        ctx.drawImage(img, item.x, item.y, item.w, item.h)
                    }

                    texAspect = compositeSize.w / Math.max(compositeSize.h, 1)
                    gl.bindTexture(gl.TEXTURE_2D, tex)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off)
                    hasTex = 1
                })
                .catch(() => {
                    // Fallback handled gracefully
                })
        } else if (textureSrc) {
            tex = gl.createTexture()
            const img = new window.Image()
            img.crossOrigin = "anonymous"
            img.src = textureSrc
            img.onload = () => {
                if (disposed || !tex || !gl) return
                texAspect = img.naturalWidth / Math.max(img.naturalHeight, 1)
                gl.bindTexture(gl.TEXTURE_2D, tex)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
                hasTex = 1
            }
        }

        // Size the canvas to its parent with clamped DPR for high performance
        let W = 0, H = 0, cssW = 1
        const resize = () => {
            if (disposed || !gl) return
            const r = canvas.getBoundingClientRect()
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
            cssW = Math.max(1, r.width)
            const cssH = Math.max(1, r.height)
            W = Math.floor(cssW * dpr)
            H = Math.floor(cssH * dpr)
            if (canvas.width !== W || canvas.height !== H) {
                canvas.width = W
                canvas.height = H
            }
            gl.viewport(0, 0, W, H)
        }
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)
        resize()

        // IntersectionObserver pauses rendering when element is off-screen to save GPU
        let isVisible = true
        const io = new IntersectionObserver((entries) => {
            const entry = entries[0]
            if (entry) isVisible = entry.isIntersecting
        }, { threshold: 0 })
        io.observe(canvas)

        const handleContextLost = (e: Event) => {
            e.preventDefault()
            disposed = true
            cancelAnimationFrame(raf)
            setFailed(true)
        }
        canvas.addEventListener("webglcontextlost", handleContextLost, false)

        // Pointer tracking (works even with content layered on top)
        const target = { x: 0.55, y: 0.55 }, cur = { x: 0.55, y: 0.55 }
        let inf = 0, infTarget = 0, lastMove = -1e9
        const onMove = (cx: number, cy: number) => {
            const r = canvas.getBoundingClientRect()
            if (r.width <= 0 || r.height <= 0) return
            const nx = (cx - r.left) / r.width
            const ny = 1 - (cy - r.top) / r.height
            const pr = propsRef.current
            if (pr.textureSrc || (pr.compositeSources && pr.compositeSources.length > 0) || pr.preset === "timeline") {
                const nearEl = nx >= -0.08 && nx <= 1.08 && ny >= -0.08 && ny <= 1.08
                target.x = nx
                target.y = ny
                infTarget = nearEl ? 1 : 0
            } else {
                target.x = nx
                target.y = ny
                infTarget = 1
            }
            lastMove = performance.now()
        }
        const pm = (e: PointerEvent) => onMove(e.clientX, e.clientY)
        const tm = (e: TouchEvent) => { const t = e.touches[0]; if (t) onMove(t.clientX, t.clientY) }
        const leave = () => { infTarget = 0 }
        window.addEventListener("pointermove", pm, { passive: true })
        window.addEventListener("pointerdown", pm, { passive: true })
        window.addEventListener("touchmove", tm, { passive: true })
        document.addEventListener("pointerleave", leave)

        const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let raf = 0, time = 0, prev = performance.now()

        // Cache parsed RGB values so hexToRgb isn't parsed 60 times a second
        let lastColA = "", lastColB = "", lastBg = ""
        let rgbA = hexToRgb(colorA), rgbB = hexToRgb(colorB), rgbBg = hexToRgb(background)

        const frame = (now: number) => {
            if (disposed || !gl) return
            raf = requestAnimationFrame(frame)

            // Pause GPU render loop when element is completely off-screen
            if (!isVisible) {
                prev = now
                return
            }

            const p = propsRef.current
            const dt = Math.min((now - prev) / 1000, 0.05)
            prev = now
            if (!reduce) time += dt * p.speed
            if (now - lastMove > 3500) infTarget = 0
            const ease = 1 - Math.exp(-dt * 3.2)
            cur.x += (target.x - cur.x) * ease
            cur.y += (target.y - cur.y) * ease
            inf += (infTarget - inf) * (1 - Math.exp(-dt * 2.4))

            const awaitingTex = Boolean(p.textureSrc || (p.compositeSources && p.compositeSources.length > 0))
            if (awaitingTex && hasTex < 0.5) {
                gl.clearColor(0, 0, 0, 0)
                gl.clear(gl.COLOR_BUFFER_BIT)
                return
            }

            const strips = cssW >= p.desktopBreakpoint
                ? p.desktopSlits
                : Math.max(4, cssW / p.mobileSlitWidth)

            if (hasTex > 0.5 && tex) {
                gl.activeTexture(gl.TEXTURE0)
                gl.bindTexture(gl.TEXTURE_2D, tex)
                if (u.tex) gl.uniform1i(u.tex, 0)
            }
            if (u.hasTex) gl.uniform1f(u.hasTex, hasTex)
            if (u.texAspect) gl.uniform1f(u.texAspect, texAspect)
            if (u.preset) gl.uniform1f(u.preset, p.preset === "timeline" ? 1 : 0)
            if (u.res) gl.uniform2f(u.res, W, H)
            if (u.time) gl.uniform1f(u.time, time)
            if (u.mouse) gl.uniform2f(u.mouse, cur.x, cur.y)
            if (u.strips) gl.uniform1f(u.strips, strips)
            if (u.inf) gl.uniform1f(u.inf, inf * p.mouseStrength)
            if (u.squeeze) gl.uniform1f(u.squeeze, p.squeeze)
            if (u.lip) gl.uniform1f(u.lip, p.lip)

            if (p.colorA !== lastColA) { lastColA = p.colorA; rgbA = hexToRgb(p.colorA); }
            if (p.colorB !== lastColB) { lastColB = p.colorB; rgbB = hexToRgb(p.colorB); }
            if (p.background !== lastBg) { lastBg = p.background; rgbBg = hexToRgb(p.background); }
            if (u.colA) gl.uniform3fv(u.colA, rgbA)
            if (u.colB) gl.uniform3fv(u.colB, rgbB)
            if (u.bg) gl.uniform3fv(u.bg, rgbBg)

            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }
        raf = requestAnimationFrame(frame)

        return () => {
            disposed = true
            cancelAnimationFrame(raf)
            ro.disconnect()
            io.disconnect()
            canvas.removeEventListener("webglcontextlost", handleContextLost)
            window.removeEventListener("pointermove", pm)
            window.removeEventListener("pointerdown", pm)
            window.removeEventListener("touchmove", tm)
            document.removeEventListener("pointerleave", leave)
            if (tex) gl.deleteTexture(tex)
            if (buf) gl.deleteBuffer(buf)
            if (prog) {
                if (vertSh) { gl.detachShader(prog, vertSh); gl.deleteShader(vertSh); }
                if (fragSh) { gl.detachShader(prog, fragSh); gl.deleteShader(fragSh); }
                gl.deleteProgram(prog)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textureSrc, compositeKey])

    if (failed) {
        const effectiveFallback = fallbackSrc || (preset === "hero" ? "/hero-gradient-blinds.png" : textureSrc)
        return (
            <div
                className={className}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    background: effectiveFallback
                        ? "transparent"
                        : `linear-gradient(135deg, ${background} 30%, ${colorA} 55%, ${colorB} 75%, ${background})`,
                    ...style,
                }}
            >
                {effectiveFallback && (
                    <img
                        src={effectiveFallback}
                        alt=""
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: preset === "hero" ? "contain" : "cover",
                            objectPosition: "top",
                            display: "block",
                        }}
                    />
                )}
            </div>
        )
    }

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "none",
                ...style,
            }}
        />
    )
}   