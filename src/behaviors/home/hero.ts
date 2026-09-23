/*
  Home hero: background Vimeo loop (assets/hero-video.js), the hero "in-view"
  class (main.js) and the SHOWREEL modal with custom controls (index.html).
*/

import type { Scope } from "@/lib/runtime/scope";
import { loadVimeoApi } from "@/lib/runtime/vendors";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** assets/hero-video.js — poster-first reveal, pause off-screen / hidden tab. */
export function heroBackgroundVideo(scope: Scope) {
  const wrap = document.querySelector<HTMLElement>(".hero-video-bg");
  if (!wrap) return;
  const frame = wrap.querySelector<HTMLIFrameElement>(".hero-bg-iframe");
  if (!frame) return;

  const WARM_KEY = "synkyn_vimeo_warm";
  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    wrap.classList.add("is-playing");
    try { sessionStorage.setItem(WARM_KEY, "true"); } catch { /* noop */ }
    try { document.dispatchEvent(new CustomEvent("synkyn:vimeoready")); } catch { /* noop */ }
  };

  const boot = () => {
    scope.on(frame, "load", reveal, { once: true });
    const onMessage = (e: MessageEvent) => {
      if (!e || !e.data || revealed) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data && (data.event === "play" || data.event === "ready" || data.event === "playing")) reveal();
      } catch { /* not JSON */ }
    };
    scope.on(window, "message", onMessage);
    const src = frame.getAttribute("src") || frame.getAttribute("data-src");
    if (!frame.src && src) frame.src = src;
    scope.timeout(reveal, 1200);
  };
  const doc = document as Document & { prerendering?: boolean };
  if (doc.prerendering) scope.on(document, "prerenderingchange", boot, { once: true });
  else boot();

  scope.on(window, "pageshow", (e: PageTransitionEvent) => { if (e.persisted) { revealed = false; reveal(); } });

  let player: any = null;
  const getPlayer = () => {
    if (player) return player;
    if (!(window.Vimeo && window.Vimeo.Player) || !frame.src) return null;
    try { player = new window.Vimeo.Player(frame); } catch { return null; }
    return player;
  };
  // Each Vimeo player keeps global `message`/`fullscreenchange` listeners, so
  // it must be destroyed when leaving the page. `destroy()` also removes the
  // iframe, so it only runs once the iframe is really gone from the document
  // (React's StrictMode remount in development keeps it connected).
  scope.add(() => {
    if (!player) return;
    if (frame.isConnected) player.pause?.().catch(() => undefined);
    else player.destroy?.().catch(() => undefined);
  });
  scope.on(document, "visibilitychange", () => {
    const p = getPlayer();
    if (!p) return;
    if (document.hidden) p.pause().catch(() => undefined);
    else p.play().catch(() => undefined);
  });
  if ("IntersectionObserver" in window) {
    const io = scope.observe(new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const p = getPlayer();
        if (!entry.isIntersecting) { if (p) p.pause().catch(() => undefined); }
        else if (!document.hidden) { if (p) p.play().catch(() => undefined); }
      });
    }, { threshold: 0.05 }));
    io.observe(wrap);
  }
  const poster = wrap.querySelector<HTMLImageElement>(".hero-video-poster");
  if (poster && poster.tagName === "IMG") {
    scope.on(poster, "error", () => { poster.style.display = "none"; }, { once: true });
    if (poster.complete && poster.naturalWidth === 0) poster.style.display = "none";
  }

  // The static page loaded the Vimeo Player API with `defer` for this page.
  loadVimeoApi().catch(() => undefined);
}

/** main.js — toggles `in-view` on #hero. */
export function heroInView(scope: Scope) {
  const hero = document.getElementById("hero");
  if (!hero) return;
  scope.observe(new IntersectionObserver((entries) => {
    entries.forEach((entry) => hero.classList.toggle("in-view", entry.isIntersecting));
  }, { threshold: 0.1 })).observe(hero);
}

/** index.html — SHOWREEL modal: FLIP open/close, custom Vimeo controls. */
export function showreelModal(scope: Scope) {
  const videoModal = document.getElementById("video-modal");
  const modalContent = document.getElementById("modal-content");
  const backdrop = document.getElementById("modal-backdrop");
  const iframe = document.getElementById("modal-video") as HTMLIFrameElement | null;
  const closeBtn = document.getElementById("modal-close-btn");
  const opener = document.getElementById("hero-how-it-works-btn");
  const navbar = document.querySelector<HTMLElement>(".header-two");
  const thumbIframe = document.getElementById("hero-thumbnail-video") as HTMLIFrameElement | null;
  const vTitle = document.getElementById("v-title");

  if (thumbIframe && !thumbIframe.src && thumbIframe.getAttribute("data-src")) thumbIframe.src = thumbIframe.getAttribute("data-src")!;
  if (!videoModal || !modalContent || !iframe || !backdrop) return;

  // The modal is moved under <body> when opened; put it back before React
  // unmounts the page so the tree it owns is intact.
  const homeParent = videoModal.parentNode;
  const homeNext = videoModal.nextSibling;
  scope.add(() => {
    if (homeParent && videoModal.parentNode !== homeParent) homeParent.insertBefore(videoModal, homeNext && homeNext.parentNode === homeParent ? homeNext : null);
  });

  let thumbPlayer: any = null;
  const getThumbPlayer = () => {
    if (thumbPlayer) return thumbPlayer;
    if (!thumbIframe) return null;
    if (!thumbIframe.src && thumbIframe.getAttribute("data-src")) thumbIframe.src = thumbIframe.getAttribute("data-src")!;
    if (!(window.Vimeo && window.Vimeo.Player)) return null;
    thumbPlayer = new window.Vimeo.Player(thumbIframe);
    thumbPlayer.setLoop(true).catch(() => undefined);
    thumbPlayer.setMuted(true).catch(() => undefined);
    return thumbPlayer;
  };

  const playBtn = document.getElementById("v-play");
  const muteBtn = document.getElementById("v-mute");
  const fsBtn = document.getElementById("v-fs");
  const progress = document.getElementById("v-progress");
  const playedEl = document.getElementById("v-played");
  const bufferEl = document.getElementById("v-buffered");
  const thumbEl = document.getElementById("v-thumb");
  const timeEl = document.getElementById("v-time");
  const clickLayer = document.getElementById("v-click");
  const controls = document.getElementById("v-controls");

  const IC = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4.5" width="4.2" height="15" rx="1"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>',
    fs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>',
    fsExit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3a1 1 0 0 0 1-1V4M20 8h-3a1 1 0 0 1-1-1V4M4 16h3a1 1 0 0 1 1 1v3M20 16h-3a1 1 0 0 0-1 1v3"/></svg>',
  };

  let player: any = null, duration = 0, isPlaying = false, isMuted = false, scrubbing = false;
  const fmt = (t: number) => { if (!isFinite(t) || t < 0) t = 0; const m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ":" + (s < 10 ? "0" + s : s); };
  const renderTime = (cur: number) => { if (timeEl) timeEl.innerHTML = fmt(cur) + "&nbsp;/&nbsp;" + fmt(duration); };
  const setPlayed = (frac: number) => {
    frac = Math.max(0, Math.min(1, frac || 0));
    if (playedEl) playedEl.style.width = frac * 100 + "%";
    if (thumbEl) thumbEl.style.left = frac * 100 + "%";
    if (progress) progress.setAttribute("aria-valuenow", String(Math.round(frac * 100)));
  };
  const setPlayIcon = () => { if (playBtn) { playBtn.innerHTML = isPlaying ? IC.pause : IC.play; playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play"); } };
  const setMuteIcon = () => { if (muteBtn) { muteBtn.innerHTML = isMuted ? IC.mute : IC.vol; muteBtn.setAttribute("aria-label", isMuted ? "Unmute" : "Mute"); } };
  const fsElement = () => document.fullscreenElement || (document as any).webkitFullscreenElement;
  const setFsIcon = () => { if (fsBtn) fsBtn.innerHTML = fsElement() ? IC.fsExit : IC.fs; };
  setPlayIcon(); setMuteIcon(); setFsIcon(); renderTime(0);

  const ensurePlayer = () => {
    if (player) return player;
    if (!iframe.src && iframe.getAttribute("data-src")) iframe.src = iframe.getAttribute("data-src")!;
    if (!(window.Vimeo && window.Vimeo.Player)) return null;
    player = new window.Vimeo.Player(iframe);
    player.setLoop(true).catch(() => undefined);
    player.getDuration().then((d: number) => { duration = d || 0; renderTime(0); }).catch(() => undefined);
    player.on("loaded", () => { player.getDuration().then((d: number) => { duration = d || 0; renderTime(0); }).catch(() => undefined); });
    player.on("timeupdate", (data: any) => { if (scrubbing) return; duration = data.duration || duration; setPlayed(data.percent); renderTime(data.seconds); });
    player.on("progress", (data: any) => { if (bufferEl) bufferEl.style.width = (data.percent || 0) * 100 + "%"; });
    player.on("play", () => { isPlaying = true; setPlayIcon(); });
    player.on("pause", () => { isPlaying = false; setPlayIcon(); });
    player.on("ended", () => { isPlaying = false; setPlayIcon(); });
    return player;
  };
  scope.add(() => {
    // See heroBackgroundVideo: destroy() removes the iframe, so only do it
    // once React has already detached the page.
    for (const [p, el] of [[player, iframe], [thumbPlayer, thumbIframe]] as const) {
      if (!p) continue;
      try {
        if (el && el.isConnected) p.pause?.().catch(() => undefined);
        else p.destroy?.().catch(() => undefined);
      } catch { /* player already gone */ }
    }
  });

  const togglePlay = () => { const p = ensurePlayer(); if (!p) return; if (isPlaying) p.pause().catch(() => undefined); else p.play().catch(() => undefined); };
  if (playBtn) scope.on(playBtn, "click", (e: MouseEvent) => { e.stopPropagation(); togglePlay(); });
  if (clickLayer) scope.on(clickLayer, "click", (e: MouseEvent) => { e.stopPropagation(); togglePlay(); });
  if (muteBtn) scope.on(muteBtn, "click", (e: MouseEvent) => {
    e.stopPropagation();
    const p = ensurePlayer(); if (!p) return;
    isMuted = !isMuted;
    p.setMuted(isMuted).catch(() => undefined);
    if (!isMuted) p.setVolume(1).catch(() => undefined);
    setMuteIcon();
  });

  const seekFromEvent = (e: PointerEvent | TouchEvent) => {
    if (!progress) return;
    const p = ensurePlayer();
    const rect = progress.getBoundingClientRect();
    const cx = "touches" in e && e.touches && e.touches[0] ? e.touches[0].clientX : (e as PointerEvent).clientX;
    const frac = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
    setPlayed(frac); renderTime(frac * duration);
    if (p && duration) p.setCurrentTime(frac * duration).catch(() => undefined);
  };
  if (progress) {
    scope.on(progress, "pointerdown", (e: PointerEvent) => { scrubbing = true; progress.classList.add("scrubbing"); try { progress.setPointerCapture(e.pointerId); } catch { /* noop */ } seekFromEvent(e); });
    scope.on(progress, "pointermove", (e: PointerEvent) => { if (scrubbing) seekFromEvent(e); });
    scope.on(progress, "pointerup", (e: PointerEvent) => { if (scrubbing) seekFromEvent(e); scrubbing = false; progress.classList.remove("scrubbing"); });
    scope.on(progress, "pointercancel", () => { scrubbing = false; progress.classList.remove("scrubbing"); });
    scope.on(progress, "keydown", (e: KeyboardEvent) => {
      const p = ensurePlayer(); if (!p || !duration) return;
      p.getCurrentTime().then((cur: number) => {
        if (e.key === "ArrowRight") { p.setCurrentTime(Math.min(duration, cur + 5)); e.preventDefault(); }
        else if (e.key === "ArrowLeft") { p.setCurrentTime(Math.max(0, cur - 5)); e.preventDefault(); }
      }).catch(() => undefined);
    });
  }

  const toggleFS = () => {
    const d = document as any;
    const fs = document.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement || d.msFullscreenElement;
    if (fs) {
      const exitFS = document.exitFullscreen || d.webkitExitFullscreen || d.mozCancelFullScreen || d.msExitFullscreen;
      if (exitFS) exitFS.call(document);
    } else {
      const el = modalContent as any;
      const reqFS = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (reqFS) reqFS.call(el);
      else { const p = ensurePlayer(); if (p && p.requestFullscreen) p.requestFullscreen().catch(() => undefined); }
    }
  };
  if (fsBtn) scope.on(fsBtn, "click", (e: MouseEvent) => { e.stopPropagation(); toggleFS(); });
  scope.on(document, "fullscreenchange", setFsIcon);
  scope.on(document, "webkitfullscreenchange", setFsIcon);

  let hideT: number | null = null;
  const showControls = () => {
    if (controls) controls.classList.remove("hidden-ui");
    if (vTitle) vTitle.classList.remove("hidden-ui");
    scope.clearTimeout(hideT);
    hideT = scope.timeout(() => {
      if (isPlaying && !scrubbing) {
        if (controls) controls.classList.add("hidden-ui");
        if (vTitle) vTitle.classList.add("hidden-ui");
      }
    }, 2800);
  };
  ["mousemove", "pointerdown", "touchstart"].forEach((ev) => scope.on(modalContent, ev, showControls, { passive: true }));

  let isAnimating = false, scrollY = 0;
  const DUR = 450, CLOSE_DUR = 780, SETTLE = 230;
  const FILM = "cubic-bezier(.76,0,.24,1)";
  const bodyStyle = document.body.style, htmlStyle = document.documentElement.style;
  const lockScroll = () => {
    if (window.lenis) window.lenis.stop();
    scrollY = window.scrollY || document.documentElement.scrollTop;
    bodyStyle.position = "fixed"; bodyStyle.top = "-" + scrollY + "px"; bodyStyle.left = "0"; bodyStyle.right = "0"; bodyStyle.width = "100%"; bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";
  };
  const unlockScroll = () => {
    bodyStyle.position = ""; bodyStyle.top = ""; bodyStyle.left = ""; bodyStyle.right = ""; bodyStyle.width = ""; bodyStyle.overflow = "";
    htmlStyle.overflow = "";
    window.scrollTo(0, scrollY);
    if (window.lenis) { window.lenis.scrollTo(scrollY, { immediate: true }); window.lenis.start(); }
  };

  const openVideoModal = () => {
    if (isAnimating) return; isAnimating = true;
    if (videoModal.parentNode !== document.body) document.body.appendChild(videoModal);
    lockScroll();
    videoModal.classList.remove("hidden");
    videoModal.classList.add("is-open");
    const p = ensurePlayer();
    if (p) {
      p.setMuted(false).catch(() => undefined);
      p.setVolume(1).catch(() => undefined);
      isMuted = false; setMuteIcon();
      p.play().catch(() => undefined);
      const tpOpen = getThumbPlayer();
      if (tpOpen) {
        tpOpen.getCurrentTime().then((t: number) => { p.setCurrentTime(t || 0).catch(() => undefined); tpOpen.pause().catch(() => undefined); })
          .catch(() => { p.setCurrentTime(0).catch(() => undefined); tpOpen.pause().catch(() => undefined); });
      } else p.setCurrentTime(0).catch(() => undefined);
    }
    if (navbar) {
      navbar.style.transition = "opacity .4s ease, filter .4s ease";
      navbar.style.filter = "blur(10px)";
      navbar.style.opacity = "0";
      navbar.style.pointerEvents = "none";
    }
    const visibleOpener = opener && opener.offsetParent !== null ? opener : null;
    const startRect = visibleOpener ? visibleOpener.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const finalRect = modalContent.getBoundingClientRect();
    const tx = startRect.left + startRect.width / 2 - (finalRect.left + finalRect.width / 2);
    const ty = startRect.top + startRect.height / 2 - (finalRect.top + finalRect.height / 2);
    const sx = visibleOpener && finalRect.width > 0 ? startRect.width / finalRect.width : 0.28;
    const sy = visibleOpener && finalRect.height > 0 ? startRect.height / finalRect.height : 0.28;
    modalContent.style.transition = "none";
    modalContent.style.transform = "translate(" + tx + "px, " + ty + "px) scale(" + sx + ", " + sy + ")";
    modalContent.style.opacity = "0";
    if (window.innerWidth >= 640) modalContent.style.borderRadius = "16px";
    void videoModal.offsetHeight;
    scope.raf(() => {
      backdrop.style.opacity = "1";
      if (closeBtn) { closeBtn.style.transition = "opacity 0.3s ease " + DUR / 2 + "ms"; closeBtn.style.opacity = "1"; }
      modalContent.style.transition = "transform " + DUR + "ms cubic-bezier(0.22, 1, 0.36, 1), opacity " + DUR + "ms ease, border-radius " + DUR + "ms ease";
      modalContent.style.transform = "translate(0, 0) scale(1, 1)";
      modalContent.style.opacity = "1";
      if (window.innerWidth < 640) modalContent.style.borderRadius = "0px";
    });
    scope.timeout(() => {
      isAnimating = false;
      showControls();
      const pp = ensurePlayer();
      if (pp) pp.play().catch(() => undefined);
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }, DUR + 50);
  };

  const closeVideoModal = () => {
    if (isAnimating) return; isAnimating = true;
    if (fsElement()) (document.exitFullscreen || (document as any).webkitExitFullscreen || (() => undefined)).call(document);
    if (closeBtn) { closeBtn.style.transition = "opacity 0.2s ease"; closeBtn.style.opacity = "0"; }
    if (controls) controls.classList.add("hidden-ui");
    if (vTitle) vTitle.classList.add("hidden-ui");
    if (navbar) { navbar.style.filter = ""; navbar.style.opacity = "1"; navbar.style.pointerEvents = ""; }
    backdrop.style.transition = "opacity " + CLOSE_DUR + "ms ease";
    backdrop.style.opacity = "0";
    const p = ensurePlayer();
    const tpClose = getThumbPlayer();
    if (p) {
      if (tpClose) {
        p.getCurrentTime().then((t: number) => {
          tpClose.setCurrentTime(t || 0).catch(() => undefined);
          tpClose.setMuted(true).catch(() => undefined);
          tpClose.play().catch(() => undefined);
        }).catch(() => { tpClose.play().catch(() => undefined); });
      }
      p.setMuted(true).catch(() => undefined);
    } else if (tpClose) tpClose.play().catch(() => undefined);
    unlockScroll();
    const visibleOpener = opener && opener.offsetParent !== null ? opener : null;
    const startRect = visibleOpener ? visibleOpener.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight * 0.62, width: 0, height: 0 };
    const finalRect = modalContent.getBoundingClientRect();
    const tx = startRect.left + startRect.width / 2 - (finalRect.left + finalRect.width / 2);
    const ty = startRect.top + startRect.height / 2 - (finalRect.top + finalRect.height / 2);
    const sx = finalRect.width > 0 ? startRect.width / finalRect.width : 0.28;
    const sy = finalRect.height > 0 ? startRect.height / finalRect.height : 0.28;
    const landRadius = visibleOpener ? "16px" : "24px";
    scope.raf(() => {
      modalContent.style.transition = "transform " + CLOSE_DUR + "ms " + FILM + ", border-radius " + CLOSE_DUR + "ms " + FILM;
      modalContent.style.transform = "translate(" + tx + "px, " + ty + "px) scale(" + sx + ", " + sy + ")";
      modalContent.style.borderRadius = landRadius;
    });
    scope.timeout(() => {
      modalContent.style.transition = "opacity " + SETTLE + "ms ease";
      modalContent.style.opacity = "0";
    }, CLOSE_DUR);
    scope.timeout(() => {
      videoModal.classList.add("hidden");
      videoModal.classList.remove("is-open");
      modalContent.style.transition = "none";
      modalContent.style.transform = "none";
      modalContent.style.opacity = "1";
      modalContent.style.borderRadius = "";
      backdrop.style.transition = "";
      if (controls) controls.classList.remove("hidden-ui");
      if (vTitle) vTitle.classList.add("hidden-ui");
      const pp = ensurePlayer();
      if (pp) pp.pause().catch(() => undefined);
      isAnimating = false;
      if (visibleOpener) visibleOpener.focus({ preventScroll: true });
    }, CLOSE_DUR + SETTLE + 40);
  };

  window.openVideoModal = openVideoModal;
  window.closeVideoModal = closeVideoModal;
  scope.add(() => {
    if (window.openVideoModal === openVideoModal) delete window.openVideoModal;
    if (window.closeVideoModal === closeVideoModal) delete window.closeVideoModal;
    // Leaving Home with the modal open must not leave the page locked.
    if (videoModal.classList.contains("is-open")) {
      unlockScroll();
      if (navbar) { navbar.style.filter = ""; navbar.style.opacity = "1"; navbar.style.pointerEvents = ""; }
    }
  });

  // Inline onclick handlers of the static markup.
  if (opener) scope.on(opener, "click", () => openVideoModal());
  scope.on(videoModal, "click", (e: MouseEvent) => { if (e.target === videoModal) closeVideoModal(); });
  scope.on(backdrop, "click", () => closeVideoModal());
  if (closeBtn) scope.on(closeBtn, "click", () => closeVideoModal());

  scope.on(document, "keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && !videoModal.classList.contains("hidden")) closeVideoModal();
  });
}
