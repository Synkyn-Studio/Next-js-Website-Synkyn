/*
  404 — zero-gravity physics for the "404" digits, magnetic home button and
  the live oscilloscope (404.html inline script).
*/

import type { Scope } from "@/lib/runtime/scope";

export function zeroGravity404(scope: Scope) {
  const stage = document.getElementById("s404Stage");
  const numerals = document.getElementById("s404Numerals");
  const charEls = [document.getElementById("s404Char1"), document.getElementById("s404Char2"), document.getElementById("s404Char3")];
  const aura = document.getElementById("s404Aura");
  const homeBtn = document.getElementById("s404HomeBtn");
  const freqCapsule = document.getElementById("s404FreqCapsule");
  const freqCanvas = document.getElementById("s404FreqCanvas") as HTMLCanvasElement | null;
  if (!stage || !numerals || !charEls[0] || !freqCanvas) return;
  const chars = charEls.filter(Boolean) as HTMLElement[];

  const fCtx = freqCanvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let canvasW = 320, canvasH = 40;
  const resizeFreqCanvas = () => {
    const rect = freqCanvas.getBoundingClientRect();
    canvasW = Math.max(200, Math.floor(rect.width || 320));
    canvasH = Math.max(30, Math.floor(rect.height || 40));
    freqCanvas.width = canvasW * dpr;
    freqCanvas.height = canvasH * dpr;
    fCtx.scale(dpr, dpr);
  };
  resizeFreqCanvas();

  let winW = window.innerWidth, winH = window.innerHeight;
  scope.on(window, "resize", () => { winW = window.innerWidth; winH = window.innerHeight; resizeFreqCanvas(); }, { passive: true });

  const bodies = chars.map((el, index) => ({
    el, index, x: 0, y: 0, vx: 0, vy: 0, rotZ: 0, rotVx: 0, scale: 1, isDragging: false,
    pointerId: null as number | null, startX: 0, startY: 0, lastPointerX: 0, lastPointerY: 0,
    depth: parseFloat(el.dataset.depth || "") || 0.3,
  }));

  let targetGlobalX = 0, targetGlobalY = 0, currentGlobalX = 0, currentGlobalY = 0;
  let mouseSpeed = 0, lastPointerX = winW / 2, lastPointerY = winH / 2;
  let isStageHovered = false, isCenterHovered = false, burstEnergy = 0;

  const createShockwave = (x: number, y: number) => {
    const ring = document.createElement("div");
    ring.className = "s404-pulse-ring";
    ring.style.left = x + "px";
    ring.style.top = y + "px";
    ring.style.width = "130px";
    ring.style.height = "130px";
    document.body.appendChild(ring);
    scope.timeout(() => ring.remove(), 900);
    scope.add(() => ring.remove());
  };
  const triggerKineticShatter = (originX?: number, originY?: number) => {
    createShockwave(originX || winW / 2, originY || winH / 2);
    burstEnergy = 1.0;
    bodies.forEach((b, idx) => {
      const angle = idx === 0 ? -2.4 : idx === 1 ? -1.57 : -0.7;
      const force = 190 + Math.random() * 90;
      b.vx = Math.cos(angle) * force;
      b.vy = Math.sin(angle) * force - 60;
      b.rotVx = (Math.random() - 0.5) * 45;
      b.scale = 1.15;
    });
  };
  if (freqCapsule) scope.on(freqCapsule, "click", (e: MouseEvent) => triggerKineticShatter(e.clientX, e.clientY));
  scope.on(numerals, "dblclick", (e: MouseEvent) => triggerKineticShatter(e.clientX, e.clientY));

  bodies.forEach((b) => {
    scope.on(b.el, "pointerdown", (e: PointerEvent) => {
      e.preventDefault();
      b.isDragging = true;
      b.pointerId = e.pointerId;
      b.el.classList.add("is-dragging");
      b.startX = e.clientX - b.x; b.startY = e.clientY - b.y;
      b.lastPointerX = e.clientX; b.lastPointerY = e.clientY;
      b.vx = 0; b.vy = 0; b.scale = 1.18;
      burstEnergy = 0.65;
      createShockwave(e.clientX, e.clientY);
      if (b.el.setPointerCapture) b.el.setPointerCapture(e.pointerId);
    });
    scope.on(window, "pointermove", (e: PointerEvent) => {
      if (!b.isDragging) return;
      b.x = e.clientX - b.startX; b.y = e.clientY - b.startY;
      b.vx = (e.clientX - b.lastPointerX) * 0.85;
      b.vy = (e.clientY - b.lastPointerY) * 0.85;
      b.rotZ = b.x * 0.08;
      b.lastPointerX = e.clientX; b.lastPointerY = e.clientY;
    });
    const onPointerUp = (e: PointerEvent) => {
      if (!b.isDragging) return;
      b.isDragging = false;
      b.el.classList.remove("is-dragging");
      b.scale = 1.0;
      if (b.el.releasePointerCapture && b.pointerId !== null) { try { b.el.releasePointerCapture(b.pointerId); } catch { /* noop */ } }
      b.pointerId = null;
      if (Math.hypot(b.vx, b.vy) > 8) { createShockwave(e.clientX, e.clientY); burstEnergy = 0.8; }
    };
    scope.on(window, "pointerup", onPointerUp);
    scope.on(window, "pointercancel", onPointerUp);
  });

  if (chars[1]) {
    scope.on(chars[1], "mouseenter", () => { isCenterHovered = true; });
    scope.on(chars[1], "mouseleave", () => { isCenterHovered = false; });
  }

  scope.on(window, "mousemove", (e: MouseEvent) => {
    const cx = e.clientX, cy = e.clientY;
    targetGlobalX = (cx / winW) * 2 - 1;
    targetGlobalY = (cy / winH) * 2 - 1;
    mouseSpeed = Math.min(18, Math.hypot(cx - lastPointerX, cy - lastPointerY));
    lastPointerX = cx; lastPointerY = cy;
    const rect = numerals.getBoundingClientRect();
    const numX = ((cx - rect.left) / rect.width) * 100;
    const numY = ((cy - rect.top) / rect.height) * 100;
    numerals.style.setProperty("--s404-char-x", Math.max(0, Math.min(100, numX)).toFixed(1) + "%");
    numerals.style.setProperty("--s404-char-y", Math.max(0, Math.min(100, numY)).toFixed(1) + "%");
    if (homeBtn) {
      const br = homeBtn.getBoundingClientRect();
      const bx = br.left + br.width / 2, by = br.top + br.height / 2;
      if (Math.hypot(cx - bx, cy - by) < 100) homeBtn.style.transform = "translate(" + ((cx - bx) * 0.25).toFixed(1) + "px, " + ((cy - by) * 0.25).toFixed(1) + "px) scale(1.04)";
      else homeBtn.style.transform = "";
    }
  }, { passive: true });

  scope.on(stage, "mouseenter", () => {
    isStageHovered = true;
    numerals.style.setProperty("--s404-light-opacity", "0.95");
    numerals.style.setProperty("--s404-rgb-opacity", "0.75");
  });
  scope.on(stage, "mouseleave", () => {
    isStageHovered = false;
    numerals.style.setProperty("--s404-light-opacity", "0.7");
    numerals.style.setProperty("--s404-rgb-opacity", "0.45");
    targetGlobalX = 0; targetGlobalY = 0;
    if (homeBtn) homeBtn.style.transform = "";
  });

  const DOE = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: unknown } }).DeviceOrientationEvent;
  if (DOE && typeof DOE.requestPermission !== "function") {
    scope.on(window, "deviceorientation", (ev: DeviceOrientationEvent) => {
      if (ev.gamma !== null && ev.beta !== null) {
        targetGlobalX = Math.max(-1, Math.min(1, ev.gamma / 28));
        targetGlobalY = Math.max(-1, Math.min(1, (ev.beta - 45) / 28));
      }
    }, { passive: true });
  }

  let wavePhase = 0;
  const drawOscilloscope = () => {
    fCtx.clearRect(0, 0, canvasW, canvasH);
    const midY = canvasH / 2;
    const activity = (isStageHovered ? 1.6 : 1.0) + mouseSpeed * 0.08 + burstEnergy * 2.5;
    const ampBase = 8 * activity;
    const barCount = 24;
    const barSpacing = canvasW / barCount;
    for (let i = 0; i < barCount; i++) {
      const bx = i * barSpacing + barSpacing * 0.5;
      const distToCenter = Math.abs(i - barCount / 2) / (barCount / 2);
      const barHeight = Math.max(3, Math.sin(i * 0.5 + wavePhase * 1.5) * ampBase * (1 - distToCenter * 0.5) * 0.7);
      fCtx.fillStyle = i % 2 === 0 ? "rgba(242, 212, 0, 0.18)" : "rgba(6, 182, 212, 0.14)";
      fCtx.fillRect(bx - 1.5, midY - barHeight, 3, barHeight * 2);
    }
    fCtx.beginPath();
    fCtx.strokeStyle = "rgba(6, 182, 212, 0.65)";
    fCtx.lineWidth = 1.2;
    for (let x = 0; x <= canvasW; x += 3) {
      const nx = x / canvasW;
      const y = midY + Math.sin(nx * Math.PI * 4 + wavePhase * 1.2) * (ampBase * 0.65) * Math.sin(nx * Math.PI);
      if (x === 0) fCtx.moveTo(x, y); else fCtx.lineTo(x, y);
    }
    fCtx.stroke();
    fCtx.beginPath();
    fCtx.strokeStyle = "#ffd84d";
    fCtx.lineWidth = 1.8;
    fCtx.shadowColor = "#f2d400";
    fCtx.shadowBlur = 8;
    for (let x = 0; x <= canvasW; x += 2) {
      const nx = x / canvasW;
      const y = midY + (Math.sin(nx * Math.PI * 6 + wavePhase * 2.0) * ampBase * 0.7 + Math.sin(nx * Math.PI * 12 + wavePhase * 3.5) * (ampBase * 0.35)) * Math.sin(nx * Math.PI);
      if (x === 0) fCtx.moveTo(x, y); else fCtx.lineTo(x, y);
    }
    fCtx.stroke();
    fCtx.shadowBlur = 0;
    wavePhase += (isStageHovered ? 0.12 : 0.05) + mouseSpeed * 0.01;
    burstEnergy *= 0.94;
  };

  let idleAngle = 0;
  const SPRING = 0.075, DAMPING = 0.82;
  const render = () => {
    if (!isStageHovered && Math.abs(targetGlobalX) < 0.04 && Math.abs(targetGlobalY) < 0.04) {
      idleAngle += 0.018;
      targetGlobalX = Math.sin(idleAngle) * 0.14;
      targetGlobalY = Math.cos(idleAngle * 0.7) * 0.09;
    }
    currentGlobalX += (targetGlobalX - currentGlobalX) * 0.08;
    currentGlobalY += (targetGlobalY - currentGlobalY) * 0.08;
    mouseSpeed *= 0.92;
    numerals.style.setProperty("--s404-shift-x", (currentGlobalX * 6 + mouseSpeed * 0.45).toFixed(1) + "px");
    const stageScale = isStageHovered ? 1.05 : 1.0;
    numerals.style.transform =
      "translate3d(" + (currentGlobalX * 20).toFixed(2) + "px, " + (currentGlobalY * 14).toFixed(2) + "px, 0) " +
      "rotateX(" + (currentGlobalY * -16).toFixed(2) + "deg) rotateY(" + (currentGlobalX * 22).toFixed(2) + "deg) scale(" + stageScale + ")";
    if (aura) aura.style.transform = "translate3d(" + (currentGlobalX * 55).toFixed(2) + "px, " + (currentGlobalY * 42).toFixed(2) + "px, -100px)";
    bodies.forEach((b) => {
      if (!b.isDragging) {
        let slotTargetX = 0;
        const slotTargetY = 0;
        if (isCenterHovered) { if (b.index === 0) slotTargetX = 32; if (b.index === 2) slotTargetX = -32; }
        const forceX = (slotTargetX + currentGlobalX * 25 * b.depth - b.x) * SPRING;
        const forceY = (slotTargetY + currentGlobalY * 18 * b.depth - b.y) * SPRING;
        const forceRot = (0 - b.rotZ) * SPRING;
        b.vx = (b.vx + forceX) * DAMPING;
        b.vy = (b.vy + forceY) * DAMPING;
        b.rotVx = (b.rotVx + forceRot) * DAMPING;
        b.x += b.vx; b.y += b.vy; b.rotZ += b.rotVx;
        b.scale += (1 - b.scale) * 0.1;
      }
      const zDepth = b.depth * 65 + (b.isDragging ? 60 : 0);
      b.el.style.transform = "translate3d(" + b.x.toFixed(2) + "px, " + b.y.toFixed(2) + "px, " + zDepth.toFixed(1) + "px) rotateZ(" + b.rotZ.toFixed(2) + "deg) scale(" + b.scale.toFixed(3) + ")";
    });
    drawOscilloscope();
    scope.raf(render);
  };
  render();
}
