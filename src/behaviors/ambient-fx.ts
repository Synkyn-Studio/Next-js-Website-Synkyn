/*
  Synkyn FX Engine v3 — ambient yellow triangle crystals on a fixed canvas,
  plus the right-click / drag protection. Ported from assets/fx.js.
*/

import type { Scope } from "@/lib/runtime/scope";

export function ambientCrystals(scope: Scope) {
  if (window.__synkynFX) return;
  window.__synkynFX = true;
  scope.add(() => { window.__synkynFX = false; });

  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let IS_MOBILE = window.innerWidth < 768;

  const canvas = document.createElement("canvas");
  canvas.id = "synkyn-fx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed", inset: "0", width: "100%", height: "100%", zIndex: "-1",
    pointerEvents: "none", mixBlendMode: "screen", opacity: "0", transition: "opacity 1.2s ease",
  });
  document.body.style.isolation = "isolate";
  document.body.appendChild(canvas);
  scope.add(() => canvas.remove());
  const ctx = canvas.getContext("2d")!;

  /*
    The crystals are small, soft and translucent, so rendering the full-screen
    canvas at 2x device pixels costs roughly twice the fill rate for no visible
    gain. 1.5x keeps the edges crisp on retina screens.
  */
  const MAX_DPR = 1.5;
  let DPR = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  let W = 0, H = 0;
  const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false };

  scope.on(window, "mousemove", (e: MouseEvent) => {
    pointer.x = e.clientX; pointer.y = e.clientY;
    if (!pointer.active) { pointer.sx = pointer.x; pointer.sy = pointer.y; }
    pointer.active = true;
  }, { passive: true });
  scope.on(window, "mousedown", (e: MouseEvent) => { pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true; }, { passive: true });
  scope.on(document, "mouseleave", () => { pointer.active = false; });
  scope.on(window, "blur", () => { pointer.active = false; });
  scope.on(window, "touchmove", (e: TouchEvent) => {
    if (!e.touches || !e.touches.length) return;
    pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY;
    if (!pointer.active) { pointer.sx = pointer.x; pointer.sy = pointer.y; }
    pointer.active = true;
  }, { passive: true });
  scope.on(window, "touchend", () => { pointer.active = false; });

  const PALETTE = ["#f2c200", "#ffd84d", "#ffe375", "#e8b800", "#fff4a3"];
  const REPEL_R = 250;
  const GLOW_R = 250;

  class Crystal {
    depth = 0; size = 0; x = 0; y = 0; vx = 0; vy = 0; rot = 0; rotV = 0;
    baseA = 0; a = 0; color = ""; glow = false; phase = 0; phV = 0; boost = 0;
    constructor(scatter: boolean) { this.reset(scatter); }
    reset(scatter: boolean) {
      this.depth = 0.35 + Math.random() * 0.65;
      const d = this.depth;
      this.size = IS_MOBILE ? 1.5 + d * 2.5 : 1.2 + d * 4.8;
      this.x = Math.random() * W;
      this.y = scatter ? Math.random() * H : H + this.size + 6;
      this.vx = (1.5 + Math.random() * 1.0) * (0.8 + d);
      this.vy = -(1.5 + Math.random() * 1.0) * (0.8 + d);
      this.rot = Math.random() * Math.PI * 2;
      this.rotV = (Math.random() - 0.5) * 0.009;
      this.baseA = IS_MOBILE ? (0.15 + Math.random() * 0.15) * (0.45 + d * 0.55) : (0.04 + Math.random() * 0.16) * (0.4 + d * 0.5);
      this.a = this.baseA;
      this.color = PALETTE[(Math.random() * PALETTE.length) | 0];
      this.glow = Math.random() < 0.14;
      this.phase = Math.random() * Math.PI * 2;
      this.phV = 0.012 + Math.random() * 0.018;
      this.boost = 0;
    }
    update(parX: number, parY: number) {
      const d = this.depth;
      this.x += this.vx; this.y += this.vy; this.rot += this.rotV; this.phase += this.phV;
      if (pointer.active) {
        const dx = this.x - pointer.sx, dy = this.y - pointer.sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < GLOW_R && dist > 0.001) {
          const g = (GLOW_R - dist) / GLOW_R;
          this.boost = Math.max(this.boost, g * (0.6 + d * 0.6));
        }
        if (dist < REPEL_R && dist > 0.001) {
          let f = (REPEL_R - dist) / REPEL_R;
          f = f * f;
          this.vx += (dx / dist) * f * 2.5 * d;
          this.vy += (dy / dist) * f * 2.5 * d;
        }
      }
      this.boost *= 0.92;
      this.vx *= 0.92; this.vy *= 0.92;
      this.vx += 0.12 * (0.8 + d); this.vy -= 0.12 * (0.8 + d);
      const m = this.size + 16;
      const px = this.x + parX * d, py = this.y + parY * d;
      if (py < -m || px < -m || px > W + m || py > H + m) this.reset(false);
    }
    draw(parX: number, parY: number) {
      const pulse = 0.5 + 0.5 * Math.sin(this.phase);
      const glowPulse = this.glow ? 0.7 + 0.3 * pulse : 1;
      let alpha = this.a * glowPulse + this.boost * 0.5;
      if (alpha <= 0.004) return;
      if (alpha > (IS_MOBILE ? 0.6 : 0.55)) alpha = IS_MOBILE ? 0.6 : 0.55;
      const s = this.size * (1 + this.boost * 0.35);
      const x = this.x + parX * this.depth, y = this.y + parY * this.depth;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = alpha;
      if (this.glow || this.boost > 0.15) {
        ctx.shadowColor = "#ffcf2e";
        ctx.shadowBlur = (this.glow ? 6 : 0) + this.boost * 14 + 4 * pulse;
      }
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = alpha * 0.45;
      ctx.strokeStyle = "#fffbe6";
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
    }
  }

  let crystals: Crystal[] = [];
  const sizeCanvas = () => {
    W = window.innerWidth; H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.floor(W * DPR); canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };
  const targetCount = () => Math.max(68, Math.min(180, Math.floor((W * H) / 8500)));
  const build = () => {
    IS_MOBILE = window.innerWidth < 768;
    sizeCanvas();
    const n = targetCount();
    crystals = [];
    for (let i = 0; i < n; i++) crystals.push(new Crystal(true));
  };

  let resizeTimer: number | null = null;
  scope.on(window, "resize", () => { scope.clearTimeout(resizeTimer); resizeTimer = scope.timeout(build, 180); }, { passive: true });

  let running = true;
  const loop = () => {
    if (!running) return;
    if (pointer.active) {
      pointer.sx += (pointer.x - pointer.sx) * 0.12;
      pointer.sy += (pointer.y - pointer.sy) * 0.12;
    }
    let parX = 0, parY = 0;
    if (pointer.active) {
      parX = ((W * 0.5 - pointer.sx) / (W * 0.5)) * 14;
      parY = ((H * 0.5 - pointer.sy) / (H * 0.5)) * 14;
    }
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < crystals.length; i++) { crystals[i].update(parX, parY); crystals[i].draw(parX, parY); }
    scope.raf(loop);
  };
  scope.on(document, "visibilitychange", () => {
    if (document.hidden) running = false;
    else if (!running) { running = true; scope.raf(loop); }
  });

  if (REDUCED) canvas.style.display = "none";
  else {
    build();
    scope.raf(() => { canvas.style.opacity = "1"; loop(); });
  }

  const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  if (mq) {
    scope.on(mq, "change", (e: MediaQueryListEvent) => {
      if (e.matches) { running = false; canvas.style.display = "none"; }
      else { canvas.style.display = ""; if (!running) { running = true; build(); canvas.style.opacity = "1"; scope.raf(loop); } }
    });
  }
}

/** fx.js §7 — block the context menu and image/video dragging site-wide. */
export function contentProtection(scope: Scope) {
  scope.on(document, "contextmenu", (e: MouseEvent) => e.preventDefault(), { passive: false });
  scope.on(document, "dragstart", (e: DragEvent) => {
    const tag = (e.target as Element)?.tagName ? (e.target as Element).tagName.toLowerCase() : "";
    if (tag === "img" || tag === "video") e.preventDefault();
  }, { passive: false });
}
