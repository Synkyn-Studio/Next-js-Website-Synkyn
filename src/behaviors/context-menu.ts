import type { Scope } from "@/lib/runtime/scope";
import { smoothScrollTo } from "@/lib/runtime/smooth-scroll";
import { copyText, toast } from "@/lib/toast";

type Action = { label: string; icon: string; hint?: string; disabled?: boolean; run: () => void };
type Entry = Action | "sep";

const ICONS = {
  back: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  forward: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  reload: '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  link: '<path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1 1"/><path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1-1"/>',
  open: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  newTab: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  top: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  play: '<path d="M7 4v16l13-8z"/>',
};

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const MOD = isMac ? "⌘" : "Ctrl+";
const ALT = isMac ? "⌥" : "Alt+";

const EDITABLE = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';
const CLICKABLE_MEDIA = ".bento-item[data-id], .pf-feat-card, .pf-card, [data-project], [role='button']";

function mediaAt(x: number, y: number, target: Element | null): HTMLElement | null {
  const direct = target?.closest?.<HTMLElement>("img, video, picture");
  if (direct) return direct;
  for (const el of document.elementsFromPoint(x, y)) {
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return el;
  }
  return null;
}

export function contextMenu(scope: Scope) {
  let lastPointer = "mouse";
  scope.on(document, "pointerdown", (e: PointerEvent) => { lastPointer = e.pointerType || "mouse"; }, { capture: true, passive: true });
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const menu = document.createElement("div");
  menu.className = "sk-ctx";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Page actions");
  menu.tabIndex = -1;
  menu.hidden = true;
  document.body.appendChild(menu);
  scope.add(() => menu.remove());

  let open = false;
  let returnFocus: HTMLElement | null = null;

  const items = () => Array.from(menu.querySelectorAll<HTMLButtonElement>(".sk-ctx__item:not([disabled])"));

  const close = (restoreFocus = false) => {
    if (!open) return;
    open = false;
    menu.classList.remove("is-open");
    menu.hidden = true;
    menu.replaceChildren();
    if (restoreFocus && returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  };

  const render = (entries: Entry[], caption?: string) => {
    menu.replaceChildren();
    if (caption) {
      const c = document.createElement("div");
      c.className = "sk-ctx__caption";
      c.textContent = caption;
      menu.appendChild(c);
    }
    entries.forEach((entry, i) => {
      if (entry === "sep") {
        if (i === 0 || i === entries.length - 1 || entries[i - 1] === "sep") return;
        const s = document.createElement("div");
        s.className = "sk-ctx__sep";
        s.setAttribute("role", "separator");
        menu.appendChild(s);
        return;
      }
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sk-ctx__item";
      b.setAttribute("role", "menuitem");
      b.tabIndex = -1;
      if (entry.disabled) { b.disabled = true; b.setAttribute("aria-disabled", "true"); }
      b.innerHTML =
        `<svg class="sk-ctx__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${entry.icon}</svg>` +
        `<span class="sk-ctx__label"></span>` +
        (entry.hint ? `<span class="sk-ctx__hint" aria-hidden="true">${entry.hint}</span>` : "");
      b.querySelector(".sk-ctx__label")!.textContent = entry.label;
      b.addEventListener("click", () => { close(); entry.run(); });
      menu.appendChild(b);
    });
  };

  const place = (x: number, y: number) => {
    menu.hidden = false;
    const { width, height } = menu.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight, m = 8;
    const flipX = x + width + m > vw, flipY = y + height + m > vh;
    const left = Math.max(m, flipX ? x - width : x);
    const top = Math.max(m, flipY ? Math.min(y - height, vh - height - m) : y);
    menu.style.left = `${Math.round(left)}px`;
    menu.style.top = `${Math.round(top)}px`;
    menu.style.transformOrigin = `${flipX ? "right" : "left"} ${flipY ? "bottom" : "top"}`;
    requestAnimationFrame(() => menu.classList.add("is-open"));
  };

  const build = (target: Element | null, x: number, y: number, media: HTMLElement | null) => {
    const entries: Entry[] = [];
    const selection = (window.getSelection()?.toString() || "").trim();
    const link = target?.closest?.<HTMLAnchorElement>("a[href]");
    const href = link && !link.hasAttribute("data-noop-link") ? link.getAttribute("href") || "" : "";

    if (selection) {
      entries.push({ label: "Copy", icon: ICONS.copy, hint: `${MOD}C`, run: async () => { if (await copyText(selection)) toast("Copied to clipboard"); } });
      const short = selection.length > 24 ? `${selection.slice(0, 24)}…` : selection;
      entries.push({ label: `Search Google for “${short}”`, icon: ICONS.search, run: () => window.open(`https://www.google.com/search?q=${encodeURIComponent(selection)}`, "_blank", "noopener") });
      entries.push("sep");
    }

    if (link && href.startsWith("mailto:")) {
      const address = decodeURIComponent(href.slice(7).split("?")[0]);
      entries.push({ label: "Send email", icon: ICONS.mail, run: () => link.click() });
      entries.push({ label: "Copy email address", icon: ICONS.copy, run: async () => { if (await copyText(address)) toast(`Email copied: ${address}`); } });
      entries.push("sep");
    } else if (link && href && !/^(javascript:|tel:)/i.test(href)) {
      const abs = link.href;
      const external = link.target === "_blank";
      entries.push({ label: external ? "Open link" : "Open", icon: ICONS.open, run: () => link.click() });
      if (!external) entries.push({ label: "Open in new tab", icon: ICONS.newTab, run: () => window.open(abs, "_blank", "noopener") });
      entries.push({ label: "Copy link address", icon: ICONS.link, run: async () => { if (await copyText(abs)) toast("Link copied"); } });
      entries.push("sep");
    } else if (media) {
      const card = media.closest<HTMLElement>(CLICKABLE_MEDIA) || target?.closest?.<HTMLElement>(CLICKABLE_MEDIA);
      if (card) {
        const isVideo = media.tagName === "VIDEO" || card.classList.contains("bento-item");
        entries.push({ label: isVideo ? "Play" : "View", icon: isVideo ? ICONS.play : ICONS.open, run: () => card.click() });
        entries.push("sep");
      }
    }

    const nav = (window as unknown as { navigation?: { canGoBack?: boolean; canGoForward?: boolean } }).navigation;
    entries.push({ label: "Back", icon: ICONS.back, hint: `${ALT}←`, disabled: nav ? nav.canGoBack === false : history.length <= 1, run: () => history.back() });
    entries.push({ label: "Forward", icon: ICONS.forward, hint: `${ALT}→`, disabled: nav ? nav.canGoForward === false : false, run: () => history.forward() });
    entries.push({ label: "Reload", icon: ICONS.reload, hint: `${MOD}R`, run: () => location.reload() });
    entries.push("sep");
    entries.push({ label: "Copy page link", icon: ICONS.link, run: async () => { if (await copyText(location.href)) toast("Page link copied"); } });
    if (window.scrollY > 300) entries.push({ label: "Back to top", icon: ICONS.top, run: () => smoothScrollTo(0, { duration: 1.1 }) });

    render(entries, media ? "© Synkyn Studios · All rights reserved" : undefined);
    place(x, y);
  };

  scope.on(document, "contextmenu", (e: MouseEvent) => {
    const target = e.target as Element | null;
    const media = mediaAt(e.clientX, e.clientY, target);

    if (!media && target?.closest?.(EDITABLE)) { close(); return; }

    const pointer = (e as PointerEvent).pointerType || lastPointer;
    const touchLike = pointer === "touch" || pointer === "pen" || !finePointer.matches;
    if (touchLike) {
      // Long-press: only media is protected; everything else is the platform's.
      if (media) e.preventDefault();
      return;
    }
    if (e.shiftKey && !media) { close(); return; }

    e.preventDefault();
    const keyboard = (e.button !== 2 && !e.ctrlKey) || (e.clientX === 0 && e.clientY === 0);
    let x = e.clientX, y = e.clientY;
    const focused = document.activeElement as HTMLElement | null;
    if (keyboard && focused && focused !== document.body) {
      const r = focused.getBoundingClientRect();
      x = r.left + Math.min(24, r.width / 2);
      y = r.bottom + 4;
    }
    returnFocus = focused && focused !== document.body ? focused : null;
    open = true;
    build(keyboard ? focused : target, x, y, keyboard ? null : media);
    if (keyboard) items()[0]?.focus();
    else menu.focus({ preventScroll: true });
  }, { capture: true });

  scope.on(menu, "keydown", (e: KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    const go = (n: number) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
    switch (e.key) {
      case "ArrowDown": go(i + 1); break;
      case "ArrowUp": go(i < 0 ? list.length - 1 : i - 1); break;
      case "Home": go(0); break;
      case "End": go(list.length - 1); break;
      case "Escape": e.preventDefault(); close(true); break;
      case "Tab": e.preventDefault(); close(true); break;
      case "Enter":
      case " ":
        if (i < 0) { e.preventDefault(); list[0]?.focus(); }
        break;
    }
  });

  scope.on(document, "pointerdown", (e: PointerEvent) => { if (open && !menu.contains(e.target as Node)) close(); }, { capture: true });
  scope.on(document, "keydown", (e: KeyboardEvent) => { if (open && e.key === "Escape") close(true); });
  scope.on(window, "wheel", () => close(), { passive: true });
  scope.on(window, "resize", () => close(), { passive: true });
  scope.on(window, "blur", () => close());
  scope.on(window, "popstate", () => close());

  scope.on(document, "dragstart", (e: DragEvent) => {
    const t = e.target as Element | null;
    if (t && (t.tagName === "IMG" || t.tagName === "VIDEO")) e.preventDefault();
  });

  const lockVideo = (v: HTMLVideoElement) => {
    v.setAttribute("controlslist", "nodownload noremoteplayback noplaybackrate");
    v.disablePictureInPicture = true;
    v.disableRemotePlayback = true;
  };
  document.querySelectorAll("video").forEach(lockVideo);
  const mo = new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => {
      if (n instanceof HTMLVideoElement) lockVideo(n);
      else if (n instanceof Element) n.querySelectorAll("video").forEach(lockVideo);
    });
  });
  mo.observe(document.body, { childList: true, subtree: true });
  scope.observe(mo);
}
