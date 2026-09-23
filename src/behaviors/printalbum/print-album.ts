/*
  Print Album gallery controller (printalbum.html inline script): featured
  mosaic, category chips + search, justified-row grid, and the lightbox with
  thumbnails, zoom/pan, pinch, swipe, keyboard and share.
*/

import { whenRuntimeReady } from "@/lib/runtime/runtime";
import type { Scope } from "@/lib/runtime/scope";
import { PRINT_PROJECTS as projects, type PrintProject } from "@/data/prints";

const esc = (str: unknown) => String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const FEAT_SIZES = ["s-row1-land", "s-row1-port", "s-row1-port", "s-row2-land", "s-row2-land"];
const ICON_COUNT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/></svg>';
const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';

export function printAlbum(scope: Scope) {
  const $ = <T extends Element = HTMLElement>(s: string, r?: ParentNode) => (r || document).querySelector<T>(s);
  const $$ = <T extends Element = HTMLElement>(s: string, r?: ParentNode) => Array.from((r || document).querySelectorAll<T>(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const grid = $("#pf-grid"), featuredGrid = $("#pf-featured-grid"), featuredSection = $("#pf-featured");
  const filtersWrap = $("#pf-filters"), emptyEl = $("#pf-empty"), resultLine = $("#pf-result-line");
  const searchInput = $<HTMLInputElement>("#pf-search-input"), searchClear = $("#pf-search-clear");
  const lb = $("#pf-lb"), lbImg = $<HTMLImageElement>("#pf-lb-img"), lbWrap = $("#pf-lb-imgwrap"), lbStage = $("#pf-lb-stage");
  const lbCounter = $("#pf-lb-counter"), lbCat = $("#pf-lb-cat"), lbTitle = $("#pf-lb-title"), lbDesc = $("#pf-lb-desc");
  const lbCurrent = $("#pf-lb-current"), lbTotal = $("#pf-lb-total"), lbThumbs = $("#pf-lb-thumbs"), lbZoomHint = $("#pf-lb-zoomhint");
  const prevProjBtn = $<HTMLButtonElement>("#pf-lb-prevproj"), nextProjBtn = $<HTMLButtonElement>("#pf-lb-nextproj");
  const prevProjName = $("#pf-lb-prevproj-name"), nextProjName = $("#pf-lb-nextproj-name"), toast = $("#pf-toast");
  if (!grid || !featuredGrid || !featuredSection || !filtersWrap || !emptyEl || !resultLine || !searchInput || !searchClear ||
    !lb || !lbImg || !lbWrap || !lbStage || !lbCounter || !lbCat || !lbTitle || !lbDesc || !lbCurrent || !lbTotal || !lbThumbs ||
    !lbZoomHint || !prevProjBtn || !nextProjBtn || !prevProjName || !nextProjName || !toast) return;

  // The containers below are filled imperatively; empty them on teardown so a
  // remount starts from the server-rendered markup.
  scope.add(() => { featuredGrid.innerHTML = ""; filtersWrap.innerHTML = ""; grid.innerHTML = ""; lbThumbs.innerHTML = ""; });

  const imgIO = "IntersectionObserver" in window ? scope.observe(new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const img = e.target as HTMLImageElement;
      if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute("data-src"); }
      obs.unobserve(img);
    });
  }, { rootMargin: "900px 0px" })) : null;
  const hydrateImg = (img: HTMLImageElement) => {
    img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    if (imgIO) imgIO.observe(img); else { img.src = img.dataset.src || ""; img.removeAttribute("data-src"); }
  };

  const revealIO = "IntersectionObserver" in window && !reduceMotion ? scope.observe(new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" })) : null;
  const observeReveals = (root: ParentNode) => {
    const els = $$(".pf-reveal", root);
    if (!revealIO) { els.forEach((el) => el.classList.add("is-in")); return; }
    els.forEach((el, i) => {
      if (el.dataset.stagger == null) el.style.transitionDelay = Math.min(i * 45, 320) + "ms";
      revealIO.observe(el);
    });
  };

  const byId: Record<string, PrintProject> = {};
  projects.forEach((p) => { byId[p.id] = p; });
  let activeCat = "All";
  let query = "";
  let filtered = projects.slice();

  const mediaMarkup = (p: PrintProject) => {
    const first = p.images && p.images[0] ? p.images[0] : "";
    const count = (p.images || []).length;
    return (
      '<div class="pf-media" data-label="' + esc(p.title) + '">' +
      (first ? '<img alt="' + esc(p.title) + '" data-src="' + esc(first) + '" loading="lazy" decoding="async" />' : "") +
      '<div class="pf-media__shade"></div>' +
      '<span class="pf-badge">' + esc(p.category) + "</span>" +
      (count > 1 ? '<span class="pf-count">' + ICON_COUNT + count + "</span>" : "") +
      '<div class="pf-cap"><div class="pf-cap__text">' +
      '<h3 class="pf-cap__title">' + esc(p.title) + "</h3>" +
      '<p class="pf-cap__desc">' + esc(p.description) + "</p>" +
      '</div><span class="pf-arrow">' + ICON_ARROW + "</span></div></div>"
    );
  };
  const makeCard = (p: PrintProject, className: string) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = className;
    el.dataset.id = p.id;
    el.setAttribute("aria-label", p.title + " — " + p.category + ", " + (p.images || []).length + " images. Open gallery.");
    el.innerHTML = mediaMarkup(p);
    el.addEventListener("click", () => openLightbox(p.id, 0));
    const img = el.querySelector("img");
    if (img) hydrateImg(img);
    return el;
  };

  const renderFeatured = () => {
    let feats = projects.filter((p) => p.featured);
    if (!feats.length) feats = projects.slice(0, 5);
    feats = feats.slice(0, 5);
    featuredGrid.innerHTML = "";
    feats.forEach((p, i) => featuredGrid.appendChild(makeCard(p, "pf-feat-card " + FEAT_SIZES[i % FEAT_SIZES.length])));
  };

  const renderFilters = () => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    const cats = ["All"].concat(Object.keys(counts).filter((c) => c !== "All").sort((a, b) => (counts[b] - counts[a]) || a.localeCompare(b)));
    filtersWrap.innerHTML = "";
    cats.forEach((cat) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pf-chip" + (cat === activeCat ? " is-active" : "");
      b.dataset.cat = cat;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", cat === activeCat ? "true" : "false");
      b.innerHTML = esc(cat) + '<span class="pf-chip__count">' + counts[cat] + "</span>";
      b.addEventListener("click", () => {
        if (activeCat === cat) return;
        activeCat = cat;
        $$(".pf-chip", filtersWrap).forEach((c) => {
          const on = c.dataset.cat === cat;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-selected", on ? "true" : "false");
        });
        b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        applyFilter();
      });
      filtersWrap.appendChild(b);
    });
  };

  const computeFiltered = () => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (!(activeCat === "All" || p.category === activeCat)) return false;
      if (!q) return true;
      return (p.title + " " + p.category + " " + p.description).toLowerCase().indexOf(q) !== -1;
    });
  };

  let gridCards: { p: PrintProject; el: HTMLButtonElement; ar: number }[] = [];
  const currentGap = () => {
    const cs = getComputedStyle(grid);
    const g = parseFloat(cs.rowGap || cs.gap || "12");
    return isNaN(g) ? 12 : g;
  };
  const targetRowHeight = () => {
    const w = window.innerWidth;
    if (w < 380) return 180;
    if (w < 480) return 200;
    if (w < 768) return 220;
    if (w < 1200) return 245;
    if (w < 1700) return 270;
    return 300;
  };
  const layoutGrid = () => {
    if (!gridCards.length) { grid.innerHTML = ""; return; }
    const containerWidth = grid.clientWidth;
    if (containerWidth <= 0) return;
    const gap = currentGap();
    if (window.innerWidth <= 600) {
      grid.innerHTML = "";
      const frag = document.createDocumentFragment();
      let portraitQueue: typeof gridCards = [];
      const flushPortraits = () => {
        if (!portraitQueue.length) return;
        const rowEl = document.createElement("div");
        rowEl.className = "pf-row pf-row--mobile-pair";
        portraitQueue.forEach((c) => { c.el.style.flex = ""; c.el.style.width = ""; c.el.style.height = ""; rowEl.appendChild(c.el); });
        frag.appendChild(rowEl);
        portraitQueue = [];
      };
      gridCards.forEach((c) => {
        if (c.ar > 1) {
          flushPortraits();
          const rowEl = document.createElement("div");
          rowEl.className = "pf-row pf-row--mobile-full";
          c.el.style.flex = ""; c.el.style.width = ""; c.el.style.height = "";
          rowEl.appendChild(c.el);
          frag.appendChild(rowEl);
        } else {
          portraitQueue.push(c);
          if (portraitQueue.length === 2) flushPortraits();
        }
      });
      flushPortraits();
      grid.appendChild(frag);
      return;
    }
    const target = targetRowHeight();
    const rows: { items: typeof gridCards; arSum: number; last: boolean }[] = [];
    let row: typeof gridCards = [];
    let arSum = 0;
    gridCards.forEach((c) => {
      row.push(c);
      arSum += c.ar;
      if (arSum * target + gap * (row.length - 1) >= containerWidth) { rows.push({ items: row, arSum, last: false }); row = []; arSum = 0; }
    });
    if (row.length) rows.push({ items: row, arSum, last: true });
    grid.innerHTML = "";
    const frag = document.createDocumentFragment();
    rows.forEach((r) => {
      let h = (containerWidth - gap * (r.items.length - 1)) / r.arSum;
      if (r.last && h > target * 1.3) h = target;
      const rowEl = document.createElement("div");
      rowEl.className = "pf-row";
      r.items.forEach((c) => {
        const w = Math.max(60, c.ar * h);
        c.el.style.flex = "0 0 " + w + "px";
        c.el.style.width = w + "px";
        c.el.style.height = h + "px";
        rowEl.appendChild(c.el);
      });
      frag.appendChild(rowEl);
    });
    grid.appendChild(frag);
  };
  const renderGrid = (list: PrintProject[]) => {
    gridCards = list.map((p) => ({ p, el: makeCard(p, "pf-card pf-reveal"), ar: p.aspectRatio || 2.33 }));
    layoutGrid();
    observeReveals(grid);
  };
  function applyFilter() {
    filtered = computeFiltered();
    renderGrid(filtered);
    const searching = query.trim().length > 0 || activeCat !== "All";
    featuredSection!.style.display = searching ? "none" : "";
    emptyEl!.classList.toggle("show", filtered.length === 0);
    const total = projects.length;
    if (filtered.length === total) resultLine!.innerHTML = "Showing all <b>" + total + "</b> projects";
    else {
      let txt = "Showing <b>" + filtered.length + "</b> of " + total + " projects";
      if (activeCat !== "All") txt += " in <b>" + esc(activeCat) + "</b>";
      if (query.trim()) txt += " for “<b>" + esc(query.trim()) + "</b>”";
      resultLine!.innerHTML = txt;
    }
  }

  let resizeTimer: number | null = null;
  scope.on(window, "resize", () => { scope.clearTimeout(resizeTimer); resizeTimer = scope.timeout(layoutGrid, 140); }, { passive: true });
  let searchTimer: number | null = null;
  scope.on(searchInput, "input", () => {
    query = searchInput.value;
    searchClear.classList.toggle("show", query.length > 0);
    scope.clearTimeout(searchTimer);
    searchTimer = scope.timeout(applyFilter, 120);
  });
  scope.on(searchClear, "click", () => {
    query = "";
    searchInput.value = "";
    searchClear.classList.remove("show");
    searchInput.focus();
    applyFilter();
  });

  /* ---------- Lightbox ---------- */
  let curProject: PrintProject | null = null;
  let curIndex = 0;
  let scale = 1, panX = 0, panY = 0;
  let lastFocus: Element | null = null;
  let zoomHintTimer: number | null = null;
  const projectListForNav = () => (filtered.length ? filtered : projects);
  const applyTransform = () => { lbWrap.style.transform = "translate(" + panX + "px," + panY + "px) scale(" + scale + ")"; };
  const resetZoom = () => { scale = 1; panX = 0; panY = 0; applyTransform(); };
  const preload = (src?: string) => { if (src) { const im = new Image(); im.src = src; } };

  const setImage = () => {
    if (!curProject) return;
    const imgs = curProject.images || [];
    const src = imgs[curIndex] || "";
    const title = curProject.title;
    const index = curIndex;
    resetZoom();
    lbImg.classList.add("swap");
    scope.raf(() => {
      scope.timeout(() => {
        lbImg.src = src;
        lbImg.alt = title + " — image " + (index + 1);
        lbImg.onload = () => lbImg.classList.remove("swap");
        lbImg.onerror = () => lbImg.classList.remove("swap");
        scope.timeout(() => lbImg.classList.remove("swap"), 260);
      }, 90);
    });
    lbCounter.textContent = curIndex + 1 + " / " + imgs.length;
    lbCurrent.innerHTML = "<b>" + (curIndex + 1) + "</b> / " + imgs.length;
    $$(".pf-lb__thumb", lbThumbs).forEach((t, i) => t.classList.toggle("is-active", i === curIndex));
    const active = lbThumbs.children[curIndex];
    if (active) active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    preload(imgs[curIndex + 1]);
    preload(imgs[curIndex - 1]);
  };
  const buildThumbs = () => {
    if (!curProject) return;
    const imgs = curProject.images || [];
    lbThumbs.innerHTML = "";
    lbThumbs.classList.toggle("show", imgs.length > 1);
    imgs.forEach((src, i) => {
      const t = document.createElement("button");
      t.type = "button";
      t.className = "pf-lb__thumb" + (i === curIndex ? " is-active" : "");
      t.setAttribute("aria-label", "Go to image " + (i + 1));
      t.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(curProject!.title || "Print image") + " thumbnail " + (i + 1) + '" loading="lazy" />';
      t.addEventListener("click", () => { curIndex = i; setImage(); });
      lbThumbs.appendChild(t);
    });
  };
  const syncProjectNav = () => {
    if (!curProject) return;
    const list = projectListForNav();
    const idx = list.findIndex((p) => p.id === curProject!.id);
    const prev = idx > 0 ? list[idx - 1] : null;
    const next = idx > -1 && idx < list.length - 1 ? list[idx + 1] : null;
    prevProjBtn.disabled = !prev;
    nextProjBtn.disabled = !next;
    prevProjName.textContent = prev ? prev.title : "—";
    nextProjName.textContent = next ? next.title : "—";
  };
  const loadProject = (p: PrintProject, index: number) => {
    curProject = p;
    curIndex = index || 0;
    lbCat.textContent = p.category;
    lbTitle.textContent = p.title;
    lbDesc.textContent = p.description;
    const count = (p.images || []).length;
    lbTotal.textContent = String(count);
    const showNav = count > 1;
    const prevBtn = $("#pf-lb-prev"), nextBtn = $("#pf-lb-next");
    if (prevBtn) prevBtn.style.display = showNav ? "" : "none";
    if (nextBtn) nextBtn.style.display = showNav ? "" : "none";
    lbCounter.style.display = showNav ? "" : "none";
    buildThumbs();
    setImage();
    syncProjectNav();
  };
  function openLightbox(id: string, index: number) {
    const p = byId[id];
    if (!p) return;
    lastFocus = document.activeElement;
    loadProject(p, index);
    const panel = $(".pf-lb__panel");
    if (panel) panel.scrollTop = 0;
    lb!.classList.add("show");
    lb!.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Lenis drives the page from wheel/keys and ignores body overflow.
    window.lenis?.stop();
    scope.raf(() => lb!.classList.add("fade"));
    $("#pf-lb-close")?.focus();
    scope.clearTimeout(zoomHintTimer);
    lbZoomHint!.style.opacity = "";
    zoomHintTimer = scope.timeout(() => { lbZoomHint!.style.opacity = "0"; }, 2600);
  }
  const closeLightbox = () => {
    lb.classList.remove("fade");
    lb.setAttribute("aria-hidden", "true");
    scope.timeout(() => {
      lb.classList.remove("show");
      document.body.style.overflow = "";
      window.lenis?.start();
      lbImg.removeAttribute("src");
      if (lastFocus && (lastFocus as HTMLElement).focus) (lastFocus as HTMLElement).focus();
    }, 360);
  };
  scope.add(() => { if (lb.classList.contains("show")) { document.body.style.overflow = ""; window.lenis?.start(); } });

  const nextImage = () => { const n = (curProject?.images || []).length; if (n < 2) return; curIndex = (curIndex + 1) % n; setImage(); };
  const prevImage = () => { const n = (curProject?.images || []).length; if (n < 2) return; curIndex = (curIndex - 1 + n) % n; setImage(); };
  const gotoProject = (dir: number) => {
    if (!curProject) return;
    const list = projectListForNav();
    const idx = list.findIndex((p) => p.id === curProject!.id);
    const target = list[idx + dir];
    if (target) loadProject(target, 0);
  };
  const toggleZoom = (clientX?: number, clientY?: number) => {
    if (scale > 1) { resetZoom(); return; }
    scale = 2.4;
    const r = lbStage.getBoundingClientRect();
    const cx = clientX != null ? clientX : r.left + r.width / 2;
    const cy = clientY != null ? clientY : r.top + r.height / 2;
    panX = (r.left + r.width / 2 - cx) * (scale - 1);
    panY = (r.top + r.height / 2 - cy) * (scale - 1);
    applyTransform();
  };

  const closeBtn = $("#pf-lb-close"), nextBtn = $("#pf-lb-next"), prevBtn = $("#pf-lb-prev"), shareBtn = $("#pf-lb-share");
  if (closeBtn) scope.on(closeBtn, "click", closeLightbox);
  if (nextBtn) scope.on(nextBtn, "click", nextImage);
  if (prevBtn) scope.on(prevBtn, "click", prevImage);
  scope.on(prevProjBtn, "click", () => gotoProject(-1));
  scope.on(nextProjBtn, "click", () => gotoProject(1));
  scope.on(lb, "click", (e: MouseEvent) => { if (e.target === lb) closeLightbox(); });

  let toastTimer: number | null = null;
  const showToast = (msg: string) => {
    toast.textContent = msg;
    toast.classList.add("show");
    scope.clearTimeout(toastTimer);
    toastTimer = scope.timeout(() => toast.classList.remove("show"), 2200);
  };
  if (shareBtn) scope.on(shareBtn, "click", async () => {
    if (!curProject) return;
    const url = location.origin + location.pathname + "#" + curProject.id;
    const data = { title: curProject.title + " — Synkyn Studios", text: curProject.description, url };
    try {
      if (navigator.share) await navigator.share(data);
      else if (navigator.clipboard) { await navigator.clipboard.writeText(url); showToast("Link copied to clipboard"); }
      else showToast(url);
    } catch { /* dismissed */ }
  });

  const trapFocus = (e: KeyboardEvent) => {
    const f = $$<HTMLElement>("button, a[href], input", lb).filter((el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  scope.on(document, "keydown", (e: KeyboardEvent) => {
    if (!lb.classList.contains("show")) return;
    switch (e.key) {
      case "Escape": closeLightbox(); break;
      case "ArrowRight": nextImage(); break;
      case "ArrowLeft": prevImage(); break;
      case "ArrowDown": case "PageDown": e.preventDefault(); gotoProject(1); break;
      case "ArrowUp": case "PageUp": e.preventDefault(); gotoProject(-1); break;
      case "Tab": trapFocus(e); break;
      default: break;
    }
  });

  scope.on(lbStage, "dblclick", (e: MouseEvent) => toggleZoom(e.clientX, e.clientY));
  let wheelLock = false;
  scope.on(lbStage, "wheel", (e: WheelEvent) => {
    e.preventDefault();
    if (scale > 1) {
      scale = Math.min(4, Math.max(1, scale - e.deltaY * 0.0016));
      if (scale === 1) resetZoom(); else applyTransform();
      return;
    }
    if (wheelLock) return;
    wheelLock = true;
    scope.timeout(() => { wheelLock = false; }, 220);
    if (e.deltaY > 0 || e.deltaX > 0) nextImage(); else prevImage();
  }, { passive: false });

  let pStartX = 0, pStartY = 0, pPanX = 0, pPanY = 0, dragging = false, moved = false;
  const pointers = new Map<number, { x: number; y: number }>();
  let pinchStartDist = 0, pinchStartScale = 1, lastTap = 0;
  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  scope.on(lbStage, "pointerdown", (e: PointerEvent) => {
    if ((e.target as Element).closest(".pf-lb__nav, .pf-lb__thumbs, .pf-lb__close")) return;
    lbStage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      pinchStartDist = dist(pts[0], pts[1]);
      pinchStartScale = scale;
      return;
    }
    dragging = true; moved = false;
    pStartX = e.clientX; pStartY = e.clientY;
    pPanX = panX; pPanY = panY;
    lbWrap.classList.add("dragging");
    const now = Date.now();
    if (e.pointerType === "touch") {
      if (now - lastTap < 300) toggleZoom(e.clientX, e.clientY);
      lastTap = now;
    }
  });
  scope.on(lbStage, "pointermove", (e: PointerEvent) => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinchStartDist > 0) {
      const pts = Array.from(pointers.values());
      scale = Math.min(4, Math.max(1, pinchStartScale * (dist(pts[0], pts[1]) / pinchStartDist)));
      if (scale === 1) { panX = 0; panY = 0; }
      applyTransform();
      moved = true;
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - pStartX, dy = e.clientY - pStartY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
    if (scale > 1) { panX = pPanX + dx; panY = pPanY + dy; applyTransform(); }
    else lbWrap.style.transform = "translate(" + dx * 0.4 + "px,0) scale(1)";
  });
  const endPointer = (e: PointerEvent) => {
    if (pointers.has(e.pointerId)) pointers.delete(e.pointerId);
    if (pointers.size === 1) {
      const remaining = Array.from(pointers.entries())[0];
      pStartX = remaining[1].x; pStartY = remaining[1].y; pPanX = panX; pPanY = panY;
      pinchStartDist = 0;
      return;
    }
    if (!dragging) { lbWrap.classList.remove("dragging"); return; }
    dragging = false;
    lbWrap.classList.remove("dragging");
    const dx = e.clientX - pStartX;
    if (scale <= 1) {
      lbWrap.style.transform = "";
      applyTransform();
      const threshold = Math.min(120, lbStage.clientWidth * 0.18);
      if (moved && Math.abs(dx) > threshold) { if (dx < 0) nextImage(); else prevImage(); }
    }
  };
  scope.on(lbStage, "pointerup", endPointer);
  scope.on(lbStage, "pointercancel", endPointer);

  /* ---------- Hero recede on scroll ----------
     With scroll-driven animations the CSS in prints.css runs this on the
     compositor, locked to the scroll position. Otherwise follow Lenis's own
     scroll event, which fires inside its frame before paint; the native
     `scroll` event + rAF trails Lenis by a frame and made the hero jitter.
     Transform/opacity only — animating blur() repainted the hero every frame. */
  const inner = $(".pf-hero__inner");
  if (!reduceMotion && inner && !(window.CSS && CSS.supports("animation-timeline: scroll()"))) {
    const update = () => {
      const vh = window.innerHeight || 1;
      const y = window.lenis ? window.lenis.scroll : window.scrollY;
      const t = Math.min(1, Math.max(0, (y - vh * 0.1) / (vh * 0.75)));
      inner.style.transform = "translate3d(0," + -48 * t + "px,0) scale(" + (1 - 0.07 * t) + ")";
      inner.style.opacity = String(1 - t);
    };
    scope.on(window, "scroll", update, { passive: true });
    scope.then(whenRuntimeReady(), () => scope.lenisOn("scroll", update));
    scope.add(() => { inner.style.transform = ""; inner.style.opacity = ""; });
    update();
  }

  renderFeatured();
  renderFilters();
  applyFilter();
  observeReveals(document);
  if (document.readyState !== "complete") scope.on(window, "load", () => layoutGrid());

  if (location.hash) {
    const id = location.hash.slice(1);
    if (byId[id]) scope.timeout(() => openLightbox(id, 0), 350);
  }
}
