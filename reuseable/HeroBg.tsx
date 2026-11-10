import { useEffect, useRef } from "react"

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
    className?: string
    style?: React.CSSProperties
}

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
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

vec3 field(vec2 p, float aspect){
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
    className,
    style,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    // Keep latest props readable inside the animation loop without restarting it
    const propsRef = useRef({
        colorA, colorB, background, desktopSlits, mobileSlitWidth,
        desktopBreakpoint, squeeze, lip, speed, mouseStrength, textureSrc,
    })
    useEffect(() => {
        propsRef.current = {
            colorA, colorB, background, desktopSlits, mobileSlitWidth,
            desktopBreakpoint, squeeze, lip, speed, mouseStrength, textureSrc,
        }
    }, [
        colorA, colorB, background, desktopSlits, mobileSlitWidth,
        desktopBreakpoint, squeeze, lip, speed, mouseStrength, textureSrc,
    ])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const gl = canvas.getContext("webgl", { antialias: false, alpha: true })
        if (!gl) {
            canvas.style.background = textureSrc
                ? "transparent"
                : `linear-gradient(135deg, ${background} 30%, ${colorA} 55%, ${colorB} 75%, ${background})`
            return
        }

        const compile = (type: number, src: string) => {
            const sh = gl.createShader(type)!
            gl.shaderSource(sh, src)
            gl.compileShader(sh)
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
                console.error(gl.getShaderInfoLog(sh))
            return sh
        }
        const prog = gl.createProgram()!
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
        gl.linkProgram(prog)
        gl.useProgram(prog)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, "a_pos")
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

        const U = (n: string) => gl.getUniformLocation(prog, n)
        const u = {
            res: U("u_res"), time: U("u_time"), mouse: U("u_mouse"),
            strips: U("u_strips"), inf: U("u_influence"), squeeze: U("u_squeeze"),
            lip: U("u_lip"), colA: U("u_colA"), colB: U("u_colB"), bg: U("u_bg"),
            tex: U("u_tex"), hasTex: U("u_hasTex"), texAspect: U("u_texAspect"),
        }

        let tex: WebGLTexture | null = null
        let hasTex = 0
        let texAspect = 1
        let disposed = false

        if (textureSrc) {
            tex = gl.createTexture()
            const img = new window.Image()
            img.crossOrigin = "anonymous"
            img.src = textureSrc
            img.onload = () => {
                if (disposed || !tex) return
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

        // Size the canvas to its parent
        let W = 0, H = 0, cssW = 1
        const resize = () => {
            const r = canvas.getBoundingClientRect()
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            cssW = Math.max(1, r.width)
            const cssH = Math.max(1, r.height)
            W = Math.floor(cssW * dpr); H = Math.floor(cssH * dpr)
            canvas.width = W; canvas.height = H
            gl.viewport(0, 0, W, H)
        }
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)
        resize()

        // Pointer tracking (works even with content layered on top)
        const target = { x: 0.55, y: 0.55 }, cur = { x: 0.55, y: 0.55 }
        let inf = 0, infTarget = 0, lastMove = -1e9
        const onMove = (cx: number, cy: number) => {
            const r = canvas.getBoundingClientRect()
            if (r.width <= 0 || r.height <= 0) return
            const nx = (cx - r.left) / r.width
            const ny = 1 - (cy - r.top) / r.height
            if (textureSrc) {
                const nearCard = nx >= -0.08 && nx <= 1.08 && ny >= -0.08 && ny <= 1.08
                target.x = nx
                target.y = ny
                infTarget = nearCard ? 1 : 0
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
        window.addEventListener("pointermove", pm)
        window.addEventListener("pointerdown", pm)
        window.addEventListener("touchmove", tm, { passive: true })
        document.addEventListener("pointerleave", leave)

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        let raf = 0, time = 0, prev = performance.now()

        const frame = (now: number) => {
            const p = propsRef.current
            const dt = Math.min((now - prev) / 1000, 0.05); prev = now
            if (!reduce) time += dt * p.speed
            if (now - lastMove > 3500) infTarget = 0
            const ease = 1 - Math.exp(-dt * 3.2)
            cur.x += (target.x - cur.x) * ease
            cur.y += (target.y - cur.y) * ease
            inf += (infTarget - inf) * (1 - Math.exp(-dt * 2.4))

            if (p.textureSrc && hasTex < 0.5) {
                gl.clearColor(0, 0, 0, 0)
                gl.clear(gl.COLOR_BUFFER_BIT)
                raf = requestAnimationFrame(frame)
                return
            }

            const strips = cssW >= p.desktopBreakpoint
                ? p.desktopSlits
                : Math.max(4, cssW / p.mobileSlitWidth)

            if (hasTex > 0.5 && tex) {
                gl.activeTexture(gl.TEXTURE0)
                gl.bindTexture(gl.TEXTURE_2D, tex)
                gl.uniform1i(u.tex, 0)
            }
            gl.uniform1f(u.hasTex, hasTex)
            gl.uniform1f(u.texAspect, texAspect)
            gl.uniform2f(u.res, W, H)
            gl.uniform1f(u.time, time)
            gl.uniform2f(u.mouse, cur.x, cur.y)
            gl.uniform1f(u.strips, strips)
            gl.uniform1f(u.inf, inf * p.mouseStrength)
            gl.uniform1f(u.squeeze, p.squeeze)
            gl.uniform1f(u.lip, p.lip)
            gl.uniform3fv(u.colA, hexToRgb(p.colorA))
            gl.uniform3fv(u.colB, hexToRgb(p.colorB))
            gl.uniform3fv(u.bg, hexToRgb(p.background))
            gl.drawArrays(gl.TRIANGLES, 0, 3)
            raf = requestAnimationFrame(frame)
        }
        raf = requestAnimationFrame(frame)

        return () => {
            disposed = true
            cancelAnimationFrame(raf)
            ro.disconnect()
            window.removeEventListener("pointermove", pm)
            window.removeEventListener("pointerdown", pm)
            window.removeEventListener("touchmove", tm)
            document.removeEventListener("pointerleave", leave)
            if (tex) gl.deleteTexture(tex)
            gl.deleteProgram(prog)
            gl.deleteBuffer(buf)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textureSrc])

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