/*
  Library page behaviours (library.html inline scripts): bento card
  interactions + hover previews, the media modal (Vimeo with custom controls,
  YouTube, Instagram, images), hash deep-links, hero particles and reveals.
  The cards themselves are rendered by components/library/WorkCard.tsx.
*/

import type { Scope } from "@/lib/runtime/scope";
import { smoothScrollTo } from "@/lib/runtime/smooth-scroll";
import { loadVimeoApi } from "@/lib/runtime/vendors";
import { getInstagramShortcode, getVimeoId, getYouTubeId, WORKS, type Work } from "@/data/works";

/* eslint-disable @typescript-eslint/no-explicit-any */

const VIC = {
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4.5" width="4.2" height="15" rx="1"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1"/></svg>',
  vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>',
  fs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
  fsExit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3a1 1 0 0 0 1-1V4M20 8h-3a1 1 0 0 1-1-1V4M4 16h3a1 1 0 0 1 1 1v3M20 16h-3a1 1 0 0 0-1 1v3"/></svg>',
};
const fmtTime = (t: number) => { if (!isFinite(t) || t < 0) t = 0; const m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ":" + (s < 10 ? "0" + s : s); };
const fsElement = () => document.fullscreenElement || (document as any).webkitFullscreenElement;
const ytOrigin = () => (window.location.origin && window.location.origin.startsWith("http") ? window.location.origin : "https://www.synkynstudios.com");

export function libraryWorks(scope: Scope) {
  const modal = document.getElementById("media-modal");
  const btnClose = document.getElementById("close-modal");
  const mediaContainer = document.getElementById("modal-media-container");
  const dotsContainer = document.getElementById("modal-dots-container");
  const titleEl = document.getElementById("modal-title");
  const subtitleEl = document.getElementById("modal-subtitle");
  const descEl = document.getElementById("modal-description");
  const btnPrev = document.getElementById("modal-prev-btn");
  const btnNext = document.getElementById("modal-next-btn");
  if (!modal || !btnClose || !mediaContainer || !dotsContainer || !titleEl || !subtitleEl || !descEl || !btnPrev || !btnNext) return;

  let lastFocused: Element | null = null;
  let activeVimeoPlayers: any[] = [];

  /* ---------- Cards: open + hover preview ---------- */
  document.querySelectorAll<HTMLElement>("#bento-grid-container .bento-item").forEach((el) => {
    const work = WORKS.find((w) => w.id === el.dataset.id);
    if (!work) return;
    scope.on(el, "click", () => openModal(work));
    scope.on(el, "keydown", (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(work); } });

    const firstVideoSrc = work.sources.find((s) => s.type === "vimeo" || s.type === "youtube" || s.type === "video");
    if (!firstVideoSrc) return;
    let hoverTimeout: number | null = null;
    let preview: HTMLElement | null = null;
    scope.add(() => { if (preview) preview.remove(); });
    let hovered = false;
    // Cards slide under a still cursor while the page scrolls; spinning up a
    // video iframe for each of those is what made scrolling stutter. Wait
    // until scrolling settles and only start if the cursor is still here.
    const isScrolling = () => document.documentElement.classList.contains("lenis-scrolling");
    const startPreview = () => {
      if (!hovered) return;
      if (isScrolling()) { hoverTimeout = scope.timeout(startPreview, 120); return; }
      showPreview();
    };
    scope.on(el, "mouseenter", () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      hovered = true;
      scope.clearTimeout(hoverTimeout);
      hoverTimeout = scope.timeout(startPreview, isScrolling() ? 160 : 60);
    });
    const showPreview = () => {
      if (!preview) {
        preview = document.createElement("div");
        preview.className = "absolute inset-0 z-[5] bg-black opacity-0 transition-opacity duration-200 pointer-events-none flex items-center justify-center overflow-hidden";
        const iframeStyle = "position:absolute; inset:0; width:100%; height:100%; border:0; pointer-events:none;";
        let inner = "";
        if (firstVideoSrc.type === "vimeo") {
          inner = `<iframe src="https://player.vimeo.com/video/${getVimeoId(firstVideoSrc.src)}?background=1&autoplay=1&loop=1&muted=1&autopause=0" frameborder="0" allow="autoplay; fullscreen" style="${iframeStyle}"></iframe>`;
        } else if (firstVideoSrc.type === "youtube") {
          const y = getYouTubeId(firstVideoSrc.src);
          inner = `<iframe src="https://www.youtube-nocookie.com/embed/${y}?autoplay=1&mute=1&controls=0&loop=1&playlist=${y}&playsinline=1&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(ytOrigin())}" title="Preview" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; picture-in-picture" style="${iframeStyle}"></iframe>`;
        } else {
          inner = `<video src="${firstVideoSrc.src}" autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover pointer-events-none"></video>`;
        }
        preview.innerHTML = inner;
        el.insertBefore(preview, el.querySelector(".bento-item__overlay"));
        let loaded = false;
        const p = preview;
        const show = () => { if (loaded) return; loaded = true; p.style.opacity = "1"; };
        const iframe = p.querySelector("iframe");
        const video = p.querySelector("video");
        if (iframe) iframe.onload = show;
        if (video) video.onloadeddata = show;
        scope.timeout(show, 250);
      } else {
        preview.style.opacity = "1";
        const v = preview.querySelector("video");
        if (v) v.play().catch(() => undefined);
      }
    };
    scope.on(el, "mouseleave", () => {
      hovered = false;
      scope.clearTimeout(hoverTimeout);
      if (preview) {
        preview.style.opacity = "0";
        const v = preview.querySelector("video");
        if (v) v.pause();
      }
    });
  });

  /* ---------- Modal ---------- */
  const mediaObserver = scope.observe(new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const slide = entry.target as HTMLElement & { _vimeo?: any };
      const iframe = slide.querySelector("iframe");
      const video = slide.querySelector("video");
      if (entry.isIntersecting) {
        if (video) video.play().catch(() => undefined);
        if (iframe && slide.dataset.type === "youtube") { try { iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo" }), "*"); } catch { /* noop */ } }
        if (slide.dataset.type === "vimeo" && slide._vimeo) slide._vimeo.play().catch(() => undefined);
        const slides = Array.from(mediaContainer.querySelectorAll(".media-modal__slide"));
        const idx = slides.indexOf(slide);
        const dots = dotsContainer.querySelectorAll(".media-modal__dot");
        if (dots.length > 0) { dots.forEach((d) => d.classList.remove("active")); if (dots[idx]) dots[idx].classList.add("active"); }
      } else {
        if (video) video.pause();
        if (iframe && slide.dataset.type === "youtube") { try { iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo" }), "*"); } catch { /* noop */ } }
        if (slide.dataset.type === "vimeo" && slide._vimeo) slide._vimeo.pause().catch(() => undefined);
      }
    });
  }, { threshold: 0.6, root: mediaContainer }));

  // Per-slide listeners live in their own scope, reset whenever the modal content changes.
  let slideScopeListeners: (() => void)[] = [];
  const onSlide = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
    target.addEventListener(type, fn, opts);
    slideScopeListeners.push(() => target.removeEventListener(type, fn, opts));
  };
  const resetSlideListeners = () => { slideScopeListeners.forEach((off) => off()); slideScopeListeners = []; };
  scope.add(resetSlideListeners);

  const wireVimeoControls = (slide: HTMLElement, player: any) => {
    const q = <T extends Element = HTMLElement>(s: string) => slide.querySelector<T>(s) as T | null;
    const stage = q(".vmo-stage"), playBtn = q(".vmo-play"), muteBtn = q(".vmo-mute"), fsBtn = q(".vmo-fs");
    const progress = q(".vmo-progress"), playedEl = q(".vmo-played"), bufferEl = q(".vmo-buffered"), thumbEl = q(".vmo-thumb");
    const timeEl = q(".vmo-time"), clickL = q(".vmo-click"), controls = q(".vmo-controls");
    let duration = 0, isPlaying = false, isMuted = false, scrubbing = false, hideT: number | null = null;
    const renderTime = (cur: number) => { if (timeEl) timeEl.innerHTML = fmtTime(cur) + "&nbsp;/&nbsp;" + fmtTime(duration); };
    const setPlayed = (f: number) => {
      f = Math.max(0, Math.min(1, f || 0));
      if (playedEl) playedEl.style.width = f * 100 + "%";
      if (thumbEl) thumbEl.style.left = f * 100 + "%";
      if (progress) progress.setAttribute("aria-valuenow", String(Math.round(f * 100)));
    };
    const setPlayIcon = () => { if (playBtn) { playBtn.innerHTML = isPlaying ? VIC.pause : VIC.play; playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play"); } };
    const setMuteIcon = () => { if (muteBtn) { muteBtn.innerHTML = isMuted ? VIC.mute : VIC.vol; muteBtn.setAttribute("aria-label", isMuted ? "Unmute" : "Mute"); } };
    const setFsIcon = () => { if (fsBtn) fsBtn.innerHTML = fsElement() ? VIC.fsExit : VIC.fs; };
    const showControls = () => {
      if (controls) controls.classList.remove("vmo-hidden");
      scope.clearTimeout(hideT);
      hideT = scope.timeout(() => { if (isPlaying && !scrubbing && controls) controls.classList.add("vmo-hidden"); }, 2800);
    };
    setPlayIcon(); setMuteIcon(); setFsIcon(); renderTime(0);
    player.setLoop(true).catch(() => undefined);
    player.setMuted(false).catch(() => undefined);
    player.getDuration().then((d: number) => { duration = d || 0; renderTime(0); }).catch(() => undefined);
    player.on("loaded", () => { player.getDuration().then((d: number) => { duration = d || 0; renderTime(0); }).catch(() => undefined); });
    player.on("timeupdate", (data: any) => { if (scrubbing) return; duration = data.duration || duration; setPlayed(data.percent); renderTime(data.seconds); });
    player.on("progress", (data: any) => { if (bufferEl) bufferEl.style.width = (data.percent || 0) * 100 + "%"; });
    player.on("play", () => { isPlaying = true; setPlayIcon(); showControls(); });
    player.on("pause", () => { isPlaying = false; setPlayIcon(); });
    player.on("ended", () => { isPlaying = false; setPlayIcon(); });
    const togglePlay = () => { if (isPlaying) player.pause().catch(() => undefined); else player.play().catch(() => undefined); };
    if (playBtn) onSlide(playBtn, "click", (e) => { e.stopPropagation(); togglePlay(); });
    if (clickL) onSlide(clickL, "click", (e) => { e.stopPropagation(); togglePlay(); });
    if (muteBtn) onSlide(muteBtn, "click", (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      player.setMuted(isMuted).catch(() => undefined);
      if (!isMuted) player.setVolume(1).catch(() => undefined);
      setMuteIcon();
    });
    const seekFromEvent = (e: any) => {
      if (!progress) return;
      const rect = progress.getBoundingClientRect();
      const cx = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const f = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
      setPlayed(f); renderTime(f * duration);
      if (duration) player.setCurrentTime(f * duration).catch(() => undefined);
    };
    if (progress) {
      onSlide(progress, "pointerdown", (e) => { scrubbing = true; progress.classList.add("vmo-scrubbing"); try { progress.setPointerCapture((e as PointerEvent).pointerId); } catch { /* noop */ } seekFromEvent(e); });
      onSlide(progress, "pointermove", (e) => { if (scrubbing) seekFromEvent(e); });
      onSlide(progress, "pointerup", (e) => { if (scrubbing) seekFromEvent(e); scrubbing = false; progress.classList.remove("vmo-scrubbing"); });
      onSlide(progress, "pointercancel", () => { scrubbing = false; progress.classList.remove("vmo-scrubbing"); });
      onSlide(progress, "keydown", (e) => {
        if (!duration) return;
        const key = (e as KeyboardEvent).key;
        player.getCurrentTime().then((cur: number) => {
          if (key === "ArrowRight") { player.setCurrentTime(Math.min(duration, cur + 5)); e.preventDefault(); }
          else if (key === "ArrowLeft") { player.setCurrentTime(Math.max(0, cur - 5)); e.preventDefault(); }
        }).catch(() => undefined);
      });
    }
    const toggleFS = () => {
      if (fsElement()) { (document.exitFullscreen || (document as any).webkitExitFullscreen || (() => undefined)).call(document); return; }
      const wrapper: any = slide.closest(".media-modal__media-wrapper") || stage;
      if (wrapper && wrapper.requestFullscreen) wrapper.requestFullscreen().catch(() => undefined);
      else if (wrapper && wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
    };
    if (fsBtn) onSlide(fsBtn, "click", (e) => { e.stopPropagation(); toggleFS(); });
    onSlide(document, "fullscreenchange", setFsIcon);
    onSlide(document, "webkitfullscreenchange", setFsIcon);
    if (stage) ["mousemove", "pointerdown", "touchstart"].forEach((ev) => onSlide(stage, ev, showControls, { passive: true }));
  };

  const initVimeoSlide = (slide: HTMLElement & { _vimeo?: any }) => {
    const iframe = slide.querySelector(".vmo-frame");
    if (!iframe) return;
    scope.then(loadVimeoApi(), () => {
      if (!(window.Vimeo && window.Vimeo.Player) || !slide.isConnected) return;
      const player = new window.Vimeo.Player(iframe);
      slide._vimeo = player;
      activeVimeoPlayers.push(player);
      wireVimeoControls(slide, player);
    });
  };
  const destroyVimeoPlayers = () => {
    activeVimeoPlayers.forEach((p) => {
      try { p.pause().catch(() => undefined); } catch { /* noop */ }
      try { p.destroy().catch(() => undefined); } catch { /* noop */ }
    });
    activeVimeoPlayers = [];
  };
  scope.add(destroyVimeoPlayers);

  const slideMarkup = (work: Work, src: Work["sources"][number], idx: number) => {
    if (src.type === "video") return `<video src="${src.src}" loop playsinline controls controlslist="nodownload" ${idx === 0 ? "autoplay" : ""} preload="auto"></video>`;
    if (src.type === "youtube") {
      const id = getYouTubeId(src.src);
      return `<iframe src="https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1&autoplay=1&mute=0&playsinline=1&origin=${encodeURIComponent(ytOrigin())}" title="${work.title}" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="iframe-swipe-overlay"></div>`;
    }
    if (src.type === "vimeo") {
      const vid = getVimeoId(src.src);
      return `
                <div class="vmo-stage">
                  <iframe class="vmo-frame" src="https://player.vimeo.com/video/${vid}?controls=0&loop=1&autoplay=1&muted=0&dnt=1&title=0&byline=0&portrait=0&badge=0&playsinline=1&autopause=0" title="${work.title}" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen></iframe>
                  <button class="vmo-click" type="button" aria-label="Play or pause"></button>
                  <div class="vmo-controls" role="group" aria-label="Video controls">
                    <button class="vmo-btn vmo-play" type="button" aria-label="Play"></button>
                    <div class="vmo-progress" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
                      <div class="vmo-track"><div class="vmo-buffered"></div><div class="vmo-played"></div></div>
                      <div class="vmo-thumb"></div>
                    </div>
                    <span class="vmo-time">0:00&nbsp;/&nbsp;0:00</span>
                    <button class="vmo-btn vmo-mute" type="button" aria-label="Unmute"></button>
                    <button class="vmo-btn vmo-fs" type="button" aria-label="Fullscreen"></button>
                  </div>
                </div>`;
    }
    if (src.type === "instagram") {
      const code = getInstagramShortcode(src.src);
      const permalink = `https://www.instagram.com/reel/${code}/?utm_source=ig_embed&amp;utm_campaign=loading`;
      return `<div style="width:100%;height:100%;overflow-y:auto;display:flex;align-items:center;justify-content:center;padding:20px;">
                <blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14" style="background:#0d0d0d; border:1px solid rgba(242,212,0,0.15); border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.5); margin: 1px; max-width:480px; min-width:280px; padding:0; width:100%;">
                  <div style="padding:16px;">
                    <a href="${permalink}" style="background:#0d0d0d; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; display:block;" target="_blank">
                      <div style="padding-top: 8px;">
                        <div style="color: #ffd84d; font-family: Arial,sans-serif; font-size: 14px; font-weight: 550; line-height: 18px;">View this post on Instagram</div>
                      </div>
                    </a>
                    <p style="color: rgba(255,255,255,0.4); font-family: Arial,sans-serif; font-size: 14px; line-height: 17px; margin: 8px 0 0; text-align: center;">
                      <a href="${permalink}" style="color: rgba(255,255,255,0.6); text-decoration: none;" target="_blank">A post shared by Synkyn Studios (@synkyn_studios)</a>
                    </p>
                  </div>
                </blockquote>
              </div>`;
    }
    return `<img src="${src.src}" alt="${work.title}" loading="lazy" />`;
  };

  function openModal(work: Work) {
    lastFocused = document.activeElement;
    titleEl!.textContent = work.title;
    subtitleEl!.textContent = work.category;
    descEl!.innerHTML = `<p>${work.description}</p>`;
    destroyVimeoPlayers();
    resetSlideListeners();
    mediaContainer!.innerHTML = "";
    dotsContainer!.innerHTML = "";
    if (work.sources.length > 1) {
      btnPrev!.classList.add("show");
      btnNext!.classList.add("show");
      dotsContainer!.innerHTML = work.sources.map((_, idx) => `<div class="media-modal__dot ${idx === 0 ? "active" : ""}"></div>`).join("");
    } else {
      btnPrev!.classList.remove("show");
      btnNext!.classList.remove("show");
    }
    let hasInstagram = false;
    work.sources.forEach((src, idx) => {
      const slide = document.createElement("div");
      slide.className = "media-modal__slide";
      slide.dataset.type = src.type;
      if (src.type === "instagram") hasInstagram = true;
      slide.innerHTML = slideMarkup(work, src, idx);
      // was onclick="this.style.pointerEvents='none'" on the YouTube swipe overlay
      const overlay = slide.querySelector<HTMLElement>(".iframe-swipe-overlay");
      if (overlay) onSlide(overlay, "click", () => { overlay.style.pointerEvents = "none"; });
      mediaContainer!.appendChild(slide);
      mediaObserver.observe(slide);
      if (src.type === "vimeo") initVimeoSlide(slide);
    });
    modal!.classList.toggle("media-modal--instagram", hasInstagram);
    modal!.classList.add("show");
    modal!.setAttribute("aria-hidden", "false");
    scope.raf(() => { modal!.classList.add("fade-in"); mediaContainer!.scrollLeft = 0; });
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    // Lenis drives the page from wheel/keys and ignores body overflow.
    window.lenis?.stop();
    btnClose!.focus();
    if (hasInstagram) {
      if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
      else {
        const s = document.createElement("script");
        s.async = true;
        s.src = "//www.instagram.com/embed.js";
        document.head.appendChild(s);
      }
    }
  }

  const closeModal = () => {
    modal.classList.remove("fade-in");
    modal.setAttribute("aria-hidden", "true");
    if (fsElement()) (document.exitFullscreen || (document as any).webkitExitFullscreen || (() => undefined)).call(document);
    scope.timeout(() => {
      modal.classList.remove("show");
      modal.classList.remove("media-modal--instagram");
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.lenis?.start();
      destroyVimeoPlayers();
      resetSlideListeners();
      mediaContainer.querySelectorAll(".media-modal__slide").forEach((slide) => mediaObserver.unobserve(slide));
      mediaContainer.innerHTML = "";
      dotsContainer.innerHTML = "";
      if (lastFocused && typeof (lastFocused as HTMLElement).focus === "function") (lastFocused as HTMLElement).focus();
    }, 380);
  };
  // Leaving the page with the modal open must not keep the body locked.
  scope.add(() => {
    if (modal.classList.contains("show")) { document.body.style.overflow = ""; document.body.classList.remove("modal-open"); window.lenis?.start(); }
  });

  scope.on(btnClose, "click", closeModal);
  scope.on(modal, "click", (e: MouseEvent) => {
    const t = e.target as Element;
    if (t === modal || t.classList.contains("media-modal")) closeModal();
  });
  scope.on(document, "keydown", (e: KeyboardEvent) => { if (e.key === "Escape" && modal.classList.contains("show")) closeModal(); });
  scope.on(btnPrev, "click", () => mediaContainer.scrollBy({ left: -mediaContainer.clientWidth, behavior: "smooth" }));
  scope.on(btnNext, "click", () => mediaContainer.scrollBy({ left: mediaContainer.clientWidth, behavior: "smooth" }));

  /* ---------- Hash deep links (#work-nbk111, #nbk111, #recent-post, …) ---------- */
  const handleHash = () => {
    if (!window.location.hash) return;
    const raw = window.location.hash.replace(/^#/, "").trim();
    if (!raw) return;
    let target = WORKS.find((w) => w.id === raw);
    if (!target) {
      if (raw === "work-yt-1" || raw === "nbk111" || raw === "work-nbk111") target = WORKS.find((w) => w.id === "work-nbk111");
      else if (raw === "recent-post" && WORKS.length > 0) target = WORKS[0];
      else target = WORKS.find((w) => w.id.toLowerCase().includes(raw.toLowerCase()) || (w.title && w.title.toLowerCase().includes(raw.toLowerCase())));
    }
    if (target) {
      const t = target;
      scope.timeout(() => {
        // Position the page behind the modal first; native smooth scrolling
        // would fight Lenis, and Lenis is stopped once the modal opens.
        const card = document.querySelector<HTMLElement>(`[data-id="${t.id}"]`);
        if (card) smoothScrollTo(card, { immediate: true, offset: -(window.innerHeight - card.offsetHeight) / 2 });
        openModal(t);
      }, 250);
    }
  };
  handleHash();
  scope.on(window, "hashchange", handleHash);
  if (document.readyState !== "complete") scope.on(window, "load", handleHash);
}

/** Library + Print Album hero — drifting gold particle constellation. */
export function heroParticles(scope: Scope) {
  const canvas = document.getElementById("pf-particles") as HTMLCanvasElement | null;
  const hero = document.getElementById("pf-top");
  if (!canvas || !hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { canvas.style.display = "none"; return; }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let w = 0, h = 0, running = true;
  let parts: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = [];
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    const r = hero.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.round(Math.min(90, (w * h) / 16000));
    parts = [];
    for (let i = 0; i < target; i++) {
      parts.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.4, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, a: Math.random() * 0.5 + 0.15 });
    }
  };
  /*
    Links fade from 0.06 alpha to 0 with distance. Rather than a separate
    path + stroke (and a new colour string) per pair — hundreds of draw calls a
    frame — each link joins one of LINK_BUCKETS paths by its alpha, and each
    bucket is stroked once. Steps of 0.01 alpha are invisible at this opacity.
  */
  const LINK_BUCKETS = 6;
  const LINK_D2 = 12000;
  const buckets: Path2D[] = [];
  const frame = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f2d400";
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
      ctx.globalAlpha = p.a;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let k = 0; k < LINK_BUCKETS; k++) buckets[k] = new Path2D();
    for (let i = 0; i < parts.length; i++) {
      const a = parts[i];
      for (let j = i + 1; j < parts.length; j++) {
        const b = parts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_D2) {
          const k = Math.min(LINK_BUCKETS - 1, ((1 - d2 / LINK_D2) * LINK_BUCKETS) | 0);
          buckets[k].moveTo(a.x, a.y); buckets[k].lineTo(b.x, b.y);
        }
      }
    }
    ctx.strokeStyle = "#f2d400";
    ctx.lineWidth = 1;
    for (let k = 0; k < LINK_BUCKETS; k++) {
      ctx.globalAlpha = 0.06 * (k + 0.5) / LINK_BUCKETS;
      ctx.stroke(buckets[k]);
    }
    ctx.globalAlpha = 1;
    scope.raf(frame);
  };
  resize();
  /*
    Only rebuild when the hero really changes size. On phones the URL bar
    showing/hiding fires `resize` while scrolling, and regenerating every
    particle each time made the whole field jump.
  */
  let lastW = w, lastH = h, resizeTimer: number | null = null;
  scope.on(window, "resize", () => {
    scope.clearTimeout(resizeTimer);
    resizeTimer = scope.timeout(() => {
      const r = hero.getBoundingClientRect();
      if (Math.abs(r.width - lastW) < 1 && Math.abs(r.height - lastH) < 120) return;
      resize(); lastW = w; lastH = h;
    }, 150);
  }, { passive: true });
  scope.raf(frame);
  if ("IntersectionObserver" in window) {
    scope.observe(new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !running) { running = true; scope.raf(frame); }
        else if (!e.isIntersecting) running = false;
      });
    }, { threshold: 0 })).observe(hero);
  }
}

/** `.pf-reveal` fade-ups with a capped stagger (Library + Print Album). */
export function pfReveals(scope: Scope, root: ParentNode = document) {
  const els = Array.from(root.querySelectorAll<HTMLElement>(".pf-reveal"));
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = scope.observe(new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }));
  els.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 45, 320) + "ms";
    io.observe(el);
  });
}
