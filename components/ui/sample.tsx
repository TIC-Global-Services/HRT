/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";

/**
 * SignalCards — four animated infographic cards for the Claripa home page.
 *
 *   <SignalCards />                       // default size (307 × 480 per card)
 *   <SignalCards scale={0.9} />           // scale the cards
 *   <SignalCards onCardClick={(id) => …} /> // id: "review" | "goals" | "potential" | "late"
 *
 * Dependency-free (React only). Animations are CSS keyframes started when a card
 * scrolls into view; counters use requestAnimationFrame. Hovering a finished card
 * replays it (the "goals" card instead shows the fixed state). Respects
 * prefers-reduced-motion. Fonts expected on the page: Sora + Geist Mono.
 */

const reduced = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useInView(ref, threshold = 0.35) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
}

/** Eases a number toward `target` (re-runs whenever target changes). */
function useTween(target, { active = true, duration = 900, delay = 0, from } = {}) {
  const [v, setV] = useState(from ?? target);
  const cur = useRef(v);
  useEffect(() => {
    if (!active) return;
    if (reduced()) {
      cur.current = target;
      setV(target);
      return;
    }
    let raf, t0, timer;
    const start = cur.current;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const x = start + (target - start) * (1 - Math.pow(1 - p, 3));
      cur.current = x;
      setV(x);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    timer = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, active, duration, delay]);
  return v;
}

/* ─────────────────────────── 1 · Performance surprises ─────────────────────────── */
function ReviewVisual({ go }) {
  const actual = useTween(go ? 2.8 : 0, { active: go, duration: 800, delay: 2900 });
  return (
    <>
      <div className="w" style={{ left: 22, top: 30, width: 262, height: 176, padding: 14 }}>
        <div className="row-b">
          <span className="mono">Review year · 12 months</span>
          <span className="chip o">Dec</span>
        </div>
        <div className="abs tl">
          <div className="abs dashed a-reveal" style={{ "--d": "0.9s", "--t": "1.2s" }} />
          <div className="abs solid a-scalex" style={{ "--d": "0.3s" }} />
          <i className="abs dot a-pop" style={{ left: 0, "--d": "0.2s" }} />
          <i className="abs dot a-pop" style={{ left: 46, "--d": "0.7s" }} />
          <span className="abs mono" style={{ left: 0, top: 40 }}>Jan</span>
          <span className="abs mono" style={{ left: 44, top: 40 }}>Mar</span>
          <span className="abs m silence a-fade" style={{ "--d": "1.5s" }}>8 months of silence</span>
          <i className="abs review a-pop" style={{ "--d": "2s" }}>
            <b className="ripple" style={{ "--d": "2.05s" }} />
            <b className="ripple" style={{ "--d": "2.45s" }} />
          </i>
          <span className="abs mono o a-fade" style={{ right: -6, top: 42, "--d": "2.2s" }}>Review</span>
        </div>
        <span className="abs chip s a-up" style={{ left: 14, top: 130, "--d": "1.7s" }}>No feedback since Mar</span>
      </div>

      <div className="w a-up" style={{ left: 22, top: 218, width: 262, height: 92, padding: 14, "--d": "2.3s" }}>
        <div className="row-b">
          <span className="mono">Rating</span>
          <span className="chip r a-shake" style={{ "--d": "3.9s" }}>Surprise</span>
        </div>
        <div className="bar-row" style={{ marginTop: 10 }}>
          <span className="m" style={{ width: 50 }}>Expected</span>
          <div className="track"><div className="fill a-fill" style={{ "--w": "84%", "--d": "2.6s", background: "#9DB8C0" }} /></div>
          <b className="t" style={{ width: 22 }}>4.2</b>
        </div>
        <div className="bar-row" style={{ marginTop: 8 }}>
          <span className="m" style={{ width: 50 }}>Actual</span>
          <div className="track"><div className="fill a-fill" style={{ "--w": "56%", "--d": "2.9s", background: "var(--o)", "--t": "0.8s" }} /></div>
          <b className="t" style={{ width: 22, color: "var(--o)" }}>{actual.toFixed(1)}</b>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── 2 · Goals that lose direction ─────────────────────────── */
function GoalsVisual({ go, fixed, touched }) {
  const pct = useTween(go ? (fixed ? 82 : 54) : 82, {
    active: go,
    duration: 1000,
    delay: touched ? 0 : 2800,
    from: 82,
  });
  const tDelay = touched ? "0s" : "2.3s";
  const broken = go && !fixed;
  return (
    <>
      <div className="w" style={{ left: 22, top: 26, width: 262, height: 196 }}>
        <svg className="abs" style={{ left: 0, top: 0 }} width="262" height="196" viewBox="0 0 262 196" fill="none">
          {[
            ["M131 46V62", "0.3s", 16],
            ["M131 62H66V84", "0.6s", 87],
            ["M131 62H196V84", "0.6s", 87],
            ["M66 112V130", "1.3s", 18],
          ].map(([d, delay, len]) => (
            <path key={d} d={d} className="a-draw" style={{ "--d": delay, "--t": "0.5s", "--len": len }}
              stroke="#254F5F" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {/* last link: dashed orange when broken, solid slate when fixed */}
          <path d="M196 112V130" stroke="#F8780C" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round"
            className={broken ? "a-flicker" : ""} style={{ opacity: broken ? 1 : 0, transition: "opacity .4s", "--d": "1.9s" }} />
          <path d="M196 112V130" stroke="#254F5F" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round"
            style={{ opacity: fixed ? 1 : 0, transition: "opacity .4s" }} />
        </svg>
        <div className="node company a-pop" style={{ "--d": "0s" }}>Company OKR</div>
        <div className="node team a-pop" style={{ left: 18, "--d": "0.9s" }}>Team OKR A</div>
        <div className="node team a-pop" style={{ left: 148, "--d": "1s" }}>Team OKR B</div>
        <div className="node indiv a-pop" style={{ left: 18, "--d": "1.5s" }}>Individual<br />goal</div>
        <div className="a-pop" style={{ "--d": "1.6s", position: "absolute", left: 148, top: 130 }}>
          <div className={"node indiv " + (broken ? "bad" : "ok")}
            style={{ position: "relative", left: 0, top: 0, transform: broken ? "translateX(6px) rotate(1deg)" : "none",
              transition: `transform .6s cubic-bezier(.22,1,.36,1) ${tDelay}, background .4s, border-color .4s, color .4s` }}>
            Individual<br />goal
          </div>
        </div>
        <span className="abs chip r" style={{ left: 190, top: 114, opacity: broken ? 1 : 0,
          transform: `translateX(-50%) scale(${broken ? 1 : 0.6})`, boxShadow: "0 0 0 3px #fff",
          transition: `opacity .3s ${tDelay}, transform .4s cubic-bezier(.34,1.56,.64,1) ${tDelay}` }}>No link</span>
        <span className="abs m a-fade" style={{ left: 18, top: 172, "--d": "1.7s" }}>Aligned</span>
        <span className="abs m a-fade" style={{ left: 148, top: 172, "--d": "1.8s", color: fixed ? "var(--s)" : "#C2410C", transition: "color .4s" }}>
          {fixed ? "Aligned" : "Drifting"}
        </span>
      </div>

      <div className="w a-up" style={{ left: 22, top: 234, width: 262, height: 78, padding: 14, "--d": "2.4s" }}>
        <div className="row-b" style={{ alignItems: "baseline" }}>
          <span className="mono">Goal alignment</span>
          <span className="t" style={{ fontSize: 12 }}>
            <s style={{ color: "#9AA9AD", fontWeight: 400, opacity: fixed ? 0 : 1, transition: "opacity .3s" }}>82% → </s>
            <span style={{ color: fixed ? "var(--s)" : "var(--o)" }}>{Math.round(pct)}%</span>
          </span>
        </div>
        <div className="track" style={{ marginTop: 12, height: 8, position: "relative" }}>
          <div className="fill" style={{ width: `${pct}%`, background: fixed ? "var(--s)" : "var(--o)", transition: "background .4s" }} />
          <i className="abs" style={{ left: "82%", top: -4, width: 2, height: 16, background: "var(--s)" }} />
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── 3 · Potential that goes unnoticed ─────────────────────────── */
const CELLS = ["#EEF3F4", "#E4ECEE", "#FDEDE0", "#F3F6F6", "#EEF3F4", "#E4ECEE", "#F7F8F8", "#F3F6F6", "#EEF3F4"];
const DOTS = [[50, 132], [92, 86], [124, 120], [102, 150], [170, 94], [62, 96]];
function PotentialVisual({ go }) {
  const months = Math.round(useTween(go ? 14 : 1, { active: go, duration: 1200, delay: 2000, from: 1 }));
  return (
    <>
      <div className="w" style={{ left: 22, top: 26, width: 262, height: 216, padding: 14 }}>
        <div className="row-b"><span className="mono">Talent grid</span><span className="mono">Potential ↑</span></div>
        <div className="grid">
          {CELLS.map((bg, i) => (
            <div key={i} className={"cell a-wave " + (i === 2 ? "hl" : "dim")}
              style={{ background: bg, "--i": (Math.floor(i / 3) + (i % 3)) * 0.09 + "s" }} />
          ))}
        </div>
        {DOTS.map(([x, y], i) => (
          <i key={i} className="abs gdot a-fade dim-late" style={{ left: x, top: y, "--d": `${0.5 + i * 0.08}s`, "--f": `${i * 0.35}s` }} />
        ))}
        <div className="abs ak a-pop" style={{ left: 176, top: 50, "--d": "1.6s" }}>
          AK
          <b className="beacon" />
        </div>
        <span className="abs mono" style={{ left: 14, bottom: 8 }}>Performance →</span>
      </div>
      <div className="w a-up" style={{ left: 22, top: 250, width: 262, height: 62, padding: "12px 14px", borderColor: "#F6D9C2", background: "#FFF9F4", "--d": "1.9s" }}>
        <div className="row-b"><span className="t">High potential · AK</span><span className="chip o">{months} mo unseen</span></div>
        <div className="m" style={{ marginTop: 5 }}>Skills up 3 · no stretch role assigned</div>
      </div>
    </>
  );
}

/* ─────────────────────────── 4 · Problems spotted too late ─────────────────────────── */
function LateVisual({ go }) {
  const [target, setTarget] = useState(1);
  useEffect(() => {
    if (!go) return;
    if (reduced()) return setTarget(12);
    setTarget(6);
    const t = setTimeout(() => setTarget(12), 1700);
    return () => clearTimeout(t);
  }, [go]);
  const wk = Math.round(useTween(target, { active: go, duration: target === 6 ? 1100 : 1000, from: 1 }));
  return (
    <>
      <div className="w" style={{ left: 22, top: 26, width: 262, height: 226, padding: 14 }}>
        <div className="row-b"><span className="mono o">Engagement signal</span><span className="mono">12 weeks</span></div>
        <svg className="abs" style={{ left: 0, top: 34 }} width="262" height="150" viewBox="0 0 262 150" fill="none">
          <defs>
            <linearGradient id="sigAg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F8780C" stopOpacity=".28" />
              <stop offset="1" stopColor="#F8780C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M18 30 C50 28 70 34 92 40 C114 46 126 60 150 78 C174 96 196 110 238 128 V140 H18Z" fill="url(#sigAg)" className="a-fade" style={{ "--d": "0.6s", "--t": "2.4s" }} />
          <path d="M18 140H244" stroke="#CBD5D7" />
          <path d="M18 30 C50 28 70 34 92 40" className="a-draw" style={{ "--d": "0.2s", "--t": "1.1s", "--ease": "linear", "--len": 76 }} stroke="#F8780C" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M92 40 C114 46 126 60 150 78 C174 96 196 110 238 128" className="a-draw" style={{ "--d": "1.8s", "--t": "1s", "--ease": "linear", "--len": 172 }} stroke="#F8780C" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M92 40V140" stroke="#254F5F" strokeOpacity=".4" strokeDasharray="3 4" className="a-fade" style={{ "--d": "1.3s" }} />
          <path d="M238 128V140" stroke="#254F5F" strokeOpacity=".4" strokeDasharray="3 4" className="a-fade" style={{ "--d": "2.8s" }} />
          <g className="a-drop" style={{ "--d": "1.3s", transformOrigin: "92px 40px" }}>
            <circle cx="92" cy="40" r="6" fill="#F8780C" stroke="#fff" strokeWidth="3" />
            <circle cx="92" cy="40" r="6" fill="none" stroke="#F8780C" strokeWidth="2" className="ping" style={{ "--d": "1.45s" }} />
          </g>
          <circle cx="238" cy="128" r="6" fill="#254F5F" stroke="#fff" strokeWidth="3" className="a-pop" style={{ "--d": "2.8s", transformOrigin: "238px 128px" }} />
          <g className="a-fade" style={{ "--d": "3s" }}>
            <path d="M96 118H234" className="a-draw" style={{ "--d": "3s", "--t": ".6s", "--len": 138 }} stroke="#254F5F" strokeWidth="1.4" />
            <path d="M96 114v8M234 114v8" stroke="#254F5F" strokeWidth="1.4" />
          </g>
        </svg>
        <span className="abs chip o a-pop" style={{ left: 58, top: 36, boxShadow: "0 0 0 3px #fff", "--d": "1.45s" }}>Claripa flags · wk 6</span>
        <span className="abs chip s a-pop" style={{ right: 10, top: 98, boxShadow: "0 0 0 3px #fff", "--d": "3.1s" }}>Exit · wk 12</span>
        <span className="abs t a-fade" style={{ left: 112, top: 132, background: "#fff", padding: "0 6px", fontSize: 10.5, "--d": "3.3s" }}>6 weeks earlier</span>
        <span className="abs mono" style={{ left: 14, bottom: 10 }}>Wk 1</span>
        <span className="abs mono o" style={{ left: "50%", bottom: 10, transform: "translateX(-50%)" }}>Week {wk}</span>
        <span className="abs mono" style={{ right: 14, bottom: 10 }}>Wk 12</span>
      </div>
      <div className="w a-up" style={{ left: 22, top: 262, width: 262, height: 50, background: "var(--ot)", borderColor: "#F6D9C2", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", "--d": "3.4s" }}>
        <span className="t" style={{ color: "#B4560A" }}>Nudge: Schedule 1-on-1</span>
        <i className="tick a-pop" style={{ "--d": "3.8s" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
            <path d="m5 12 5 5 9-10" className="a-draw" style={{ "--d": "3.95s", "--t": ".35s", "--len": 21 }} />
          </svg>
        </i>
      </div>
    </>
  );
}

/* ─────────────────────────── shell ─────────────────────────── */
const CARDS = [
  { id: "review", title: "Performance surprises at review time", Visual: ReviewVisual, replay: true },
  { id: "goals", title: "Goals that lose direction", Visual: GoalsVisual, replay: false },
  { id: "potential", title: "Potential that goes unnoticed", Visual: PotentialVisual, replay: true },
  { id: "late", title: "Problems spotted too late", Visual: LateVisual, replay: true },
];

function Card({ card, index, scale, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [go, setGo] = useState(false);
  const [run, setRun] = useState(0);
  const [hover, setHover] = useState(false);
  const [touched, setTouched] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setGo(true), index * 150);
    const f = setTimeout(() => (finished.current = true), index * 150 + 4800);
    return () => {
      clearTimeout(t);
      clearTimeout(f);
    };
  }, [inView, index]);

  const enter = () => {
    setHover(true);
    if (!finished.current) return;
    if (card.replay) {
      finished.current = false;
      setGo(false);
      setRun((r) => r + 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setGo(true)));
      setTimeout(() => (finished.current = true), 4800);
    } else {
      setTouched(true);
    }
  };
  const V = card.Visual;
  return (
    <div style={{ width: 307 * scale, height: 480 * scale }}>
      <article
        ref={ref}
        className={"sig-card" + (go ? " go" : "") + (hover ? " hover" : "")}
        style={{ transform: `scale(${scale})` }}
        onMouseEnter={enter}
        onMouseLeave={() => setHover(false)}
        onClick={() => onClick && onClick(card.id)}
        role="link"
        tabIndex={0}
        aria-label={card.title}
      >
        <div className="vis" key={run}>
          <V go={go} fixed={card.id === "goals" && hover && touched} touched={touched} />
        </div>
        <h3 className="ttl">{card.title}</h3>
        <svg className="arr" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6F8791" strokeWidth="1.4" strokeLinecap="round">
          <path d="M5 19 19 5M8 5h11v11" />
        </svg>
      </article>
    </div>
  );
}

export default function SignalCards({ scale = 1, onCardClick, className = "" }) {
  return (
    <div className={"sig " + className}>
      <style>{CSS}</style>
      <div className="sig-grid" style={{ gap: 20 * scale }}>
        {CARDS.map((c, i) => (
          <Card key={c.id} card={c} index={i} scale={scale} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}

const CSS = `
.sig{--s:#254F5F;--o:#F8780C;--g:#62737A;--c:#F7F6F3;--b:#ECE9E3;--ot:#FDEDE0;--st:#E4ECEE;--ease:cubic-bezier(.22,1,.36,1);font-family:Sora,system-ui,sans-serif;color:var(--s)}
.sig *{box-sizing:border-box;margin:0;padding:0}
.sig-grid{display:flex;flex-wrap:wrap;justify-content:center}
.sig-card{position:relative;width:307px;height:480px;border-radius:30px;background:var(--c);border:1px solid var(--b);overflow:hidden;transform-origin:top left;cursor:pointer;transition:box-shadow .4s var(--ease),translate .4s var(--ease);outline:none}
.sig-card.hover{translate:0 -4px;box-shadow:0 18px 40px rgba(37,79,95,.12)}
.sig-card .vis{position:absolute;inset:0 0 auto 0;height:330px}
.sig-card .ttl{position:absolute;left:16px;right:52px;bottom:18px;font-size:24px;line-height:27px;font-weight:400;letter-spacing:-.03em;color:#17404E}
.sig-card .arr{position:absolute;right:20px;bottom:24px;transition:translate .35s var(--ease)}
.sig-card.hover .arr{translate:4px -4px}
.sig .w{position:absolute;background:#fff;border:1px solid var(--b);border-radius:16px;box-shadow:0 10px 26px rgba(37,79,95,.08)}
.sig .abs{position:absolute}
.sig .row-b{display:flex;justify-content:space-between;align-items:center}
.sig .mono{font:500 9.5px/12px "Geist Mono",ui-monospace,monospace;letter-spacing:.07em;text-transform:uppercase;color:#7B8E94}
.sig .mono.o{color:var(--o)}
.sig .t{font-size:11.5px;line-height:15px;font-weight:600}
.sig .m{font-size:10px;line-height:13px;color:var(--g)}
.sig .chip{display:inline-block;font-size:10px;line-height:12px;padding:4px 8px;border-radius:6px;font-weight:600}
.sig .chip.o{background:var(--ot);color:#D2660A}.sig .chip.s{background:var(--st);color:var(--s)}.sig .chip.r{background:#FDE3DC;color:#C2410C}
.sig .track{flex:1;height:7px;border-radius:4px;background:#E9EEEE}
.sig .fill{height:100%;border-radius:4px}
.sig .bar-row{display:flex;align-items:center;gap:8px}

/* generic animation primitives — paused until the card gets .go */
.sig-card .vis *{animation-play-state:paused}
.sig-card.go .vis *{animation-play-state:running}
.sig .a-pop{animation:sigPop .55s cubic-bezier(.34,1.56,.64,1) var(--d,0s) both}
.sig .a-fade{animation:sigFade var(--t,.5s) ease var(--d,0s) both}
.sig .a-up{animation:sigUp .6s var(--ease) var(--d,0s) both}
.sig .a-fill{width:var(--w);animation:sigFill var(--t,.7s) var(--ease) var(--d,0s) both}
.sig .a-scalex{animation:sigScaleX .6s var(--ease) var(--d,0s) both;transform-origin:left}
.sig .a-reveal{animation:sigReveal var(--t,1.2s) cubic-bezier(.4,0,.2,1) var(--d,0s) both}
.sig .a-draw{stroke-dasharray:var(--len);animation:sigDraw var(--t,.5s) var(--ease,ease) var(--d,0s) both}
.sig .a-flicker{animation:sigFlicker .9s steps(1,end) var(--d,0s) both}
.sig .a-shake{animation:sigShake .5s ease var(--d,0s) both}
.sig .a-drop{animation:sigDrop .5s cubic-bezier(.34,1.56,.64,1) var(--d,0s) both}
.sig .a-wave{animation:sigFade .5s ease var(--i,0s) both}
@keyframes sigPop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
@keyframes sigFade{from{opacity:0}to{opacity:1}}
@keyframes sigUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes sigFill{from{width:0}to{width:var(--w)}}
@keyframes sigScaleX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes sigReveal{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes sigDraw{from{stroke-dashoffset:var(--len)}to{stroke-dashoffset:0}}
@keyframes sigFlicker{0%{opacity:0}15%{opacity:1}30%{opacity:.2}45%{opacity:1}60%{opacity:.35}80%{opacity:.8}100%{opacity:1}}
@keyframes sigShake{0%,100%{transform:none}20%{transform:translateX(-3px)}40%{transform:translateX(3px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}
@keyframes sigDrop{from{opacity:0;transform:translateY(-14px) scale(.6)}to{opacity:1;transform:none}}
@keyframes sigPing{from{opacity:.7;transform:scale(1)}to{opacity:0;transform:scale(3.2)}}
@keyframes sigRipple{from{opacity:.55;transform:scale(1)}to{opacity:0;transform:scale(2.4)}}
@keyframes sigBeacon{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(2.2)}}
@keyframes sigFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(2px,-3px)}}
@keyframes sigHl{from{background-color:#E4ECEE;border-color:transparent}to{background-color:#FDEDE0;border-color:#F8780C}}
@keyframes sigDim{from{opacity:1}to{opacity:.55}}

/* card 1 */
.sig .tl{left:14px;right:14px;top:56px;height:60px}
.sig .tl .dashed{left:0;right:0;top:20px;height:0;border-top:2px dashed #CBD5D7}
.sig .tl .solid{left:0;width:56px;top:19px;height:3px;background:var(--s);border-radius:2px}
.sig .dot{top:14px;width:13px;height:13px;border-radius:50%;background:var(--s);border:3px solid #fff;box-shadow:0 0 0 1px var(--s)}
.sig .silence{left:76px;top:2px;width:110px;text-align:center;background:#fff;color:#8A9A9F}
.sig .review{right:-4px;top:5px;width:30px;height:30px;border-radius:50%;background:var(--o);border:4px solid #fff;box-shadow:0 0 0 2px rgba(248,120,12,.35),0 0 18px rgba(248,120,12,.5);position:absolute}
.sig .ripple{position:absolute;inset:-4px;border-radius:50%;border:2px solid var(--o);animation:sigRipple 1.1s ease-out var(--d) both}

/* card 2 */
.sig .node{position:absolute;display:grid;place-items:center;text-align:center;font-weight:600}
.sig .node.company{left:76px;top:14px;width:110px;height:32px;border-radius:16px;background:var(--s);color:#fff;font-size:11px}
.sig .node.team{top:84px;width:96px;height:28px;border-radius:14px;background:var(--st);font-size:10.5px}
.sig .node.indiv{top:130px;width:96px;height:34px;border-radius:12px;font-size:10px;line-height:12px;font-weight:400}
.sig .node.indiv.ok{background:var(--c);border:1px solid var(--b)}
.sig .node.indiv.bad{background:var(--ot);border:1.5px dashed var(--o);color:#B4560A}
.sig .node.indiv:not(.ok):not(.bad){left:18px;background:var(--c);border:1px solid var(--b)}

/* card 3 */
.sig .grid{position:absolute;left:14px;top:40px;width:210px;height:150px;display:grid;grid-template-columns:repeat(3,1fr);gap:4px}
.sig .cell{border-radius:7px;border:1.5px solid transparent}
.sig-card.go .cell.hl{animation:sigFade .5s ease var(--i,0s) both,sigHl .6s ease 1.4s both}
.sig-card.go .cell.dim{animation:sigFade .5s ease var(--i,0s) both,sigDim .6s ease 1.4s both}
.sig .gdot{width:9px;height:9px;border-radius:50%;background:#9DB8C0}
.sig-card.go .gdot{animation:sigFade .4s ease var(--d) both,sigFloat 3.4s ease-in-out var(--f) infinite}
.sig .ak{width:30px;height:30px;border-radius:50%;background:var(--o);color:#fff;display:grid;place-items:center;font-size:10.5px;font-weight:600;border:3px solid #fff;box-shadow:0 0 0 2px rgba(248,120,12,.4),0 0 16px rgba(248,120,12,.5)}
.sig .beacon{position:absolute;inset:-3px;border-radius:50%;border:2px solid var(--o);opacity:0;animation:sigBeacon 2.4s ease-out 2.6s infinite}

/* card 4 */
.sig .ping{transform-origin:92px 40px;animation:sigPing 1.2s ease-out var(--d) 2 both}
.sig .tick{width:24px;height:24px;border-radius:50%;background:var(--o);display:grid;place-items:center}

@media (prefers-reduced-motion:reduce){
  .sig-card *{animation:none!important;transition:none!important}
  .sig .a-draw{stroke-dasharray:none}
  .sig .beacon,.sig .ripple,.sig .ping{display:none}
}
`;