/*
  Scope — a disposable container for everything an imperative behaviour
  creates: DOM/window listeners, timers, animation frames, observers, Lenis
  subscriptions and GSAP tweens/ScrollTriggers/SplitTexts.

  The original site ran each script once per full page load. With client-side
  navigation a page can mount and unmount many times, so every behaviour is
  written against a Scope and `dispose()` reliably tears it all down.
*/
/* eslint-disable @typescript-eslint/no-explicit-any */

type Disposer = () => void;
type AnyFn = (...args: any[]) => any;

export interface Scope {
  /** False once disposed — async callbacks must bail out when it flips. */
  readonly alive: boolean;
  on<K extends keyof WindowEventMap>(target: Window, type: K, handler: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  on<K extends keyof DocumentEventMap>(target: Document, type: K, handler: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  on<K extends keyof HTMLElementEventMap>(target: HTMLElement, type: K, handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  on(target: EventTarget, type: string, handler: (this: any, ev: any) => any, options?: boolean | AddEventListenerOptions): void;
  timeout(fn: AnyFn, ms?: number): number;
  interval(fn: AnyFn, ms?: number): number;
  clearTimeout(id: number | undefined | null): void;
  clearInterval(id: number | undefined | null): void;
  raf(fn: FrameRequestCallback): number;
  cancelRaf(id: number | undefined | null): void;
  observe<T extends { disconnect(): void }>(observer: T): T;
  /** Subscribe to the global Lenis instance (unsubscribed on dispose). */
  lenisOn(event: string, fn: AnyFn): void;
  /** Run `fn` only while the scope is alive when the promise settles. */
  then<T>(promise: Promise<T>, fn: (value: T) => void): void;
  /** Register an arbitrary teardown function. */
  add(fn: Disposer): void;
  /** Execute `fn` inside this scope's GSAP context (so tweens are reverted). */
  run<T>(fn: () => T): T;
  /** Wrap a callback so it executes inside the GSAP context and only while alive. */
  wrap<F extends AnyFn>(fn: F): F;
  /** Attach a GSAP context once GSAP has loaded. */
  bindGsap(): void;
  dispose(): void;
}

export function createScope(label = "scope"): Scope {
  let alive = true;
  let ctx: any = null;
  const disposers: Disposer[] = [];
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const frames = new Set<number>();

  const run = <T,>(fn: () => T): T => {
    if (ctx && typeof ctx.add === "function") {
      let result: T;
      ctx.add(() => { result = fn(); });
      return result!;
    }
    return fn();
  };

  const wrap = <F extends AnyFn>(fn: F): F =>
    function (this: unknown, ...args: any[]) {
      if (!alive) return undefined;
      return run(() => fn.apply(this, args));
    } as F;

  const scope: Scope = {
    get alive() { return alive; },
    on(target: EventTarget, type: string, handler: AnyFn, options?: boolean | AddEventListenerOptions) {
      if (!target) return;
      // Event handlers are only guarded, not run inside the GSAP context:
      // pointer-driven effects create a tween per event and the context would
      // otherwise retain every one of them for the lifetime of the page.
      const listener = function (this: unknown, ev: Event) { if (alive) return handler.call(this, ev); };
      target.addEventListener(type, listener as EventListener, options);
      disposers.push(() => target.removeEventListener(type, listener as EventListener, options));
    },
    timeout(fn, ms) {
      const id = window.setTimeout(() => { timeouts.delete(id); if (alive) run(fn); }, ms);
      timeouts.add(id);
      return id;
    },
    interval(fn, ms) {
      const id = window.setInterval(() => { if (alive) run(fn); }, ms);
      intervals.add(id);
      return id;
    },
    clearTimeout(id) { if (id != null) { window.clearTimeout(id); timeouts.delete(id); } },
    clearInterval(id) { if (id != null) { window.clearInterval(id); intervals.delete(id); } },
    raf(fn) {
      const id = window.requestAnimationFrame((t) => { frames.delete(id); if (alive) run(() => fn(t)); });
      frames.add(id);
      return id;
    },
    cancelRaf(id) { if (id != null) { window.cancelAnimationFrame(id); frames.delete(id); } },
    observe(observer) { disposers.push(() => observer.disconnect()); return observer; },
    lenisOn(event, fn) {
      const lenis = window.lenis;
      if (!lenis || typeof lenis.on !== "function") return;
      const cb = function (this: unknown, ...args: any[]) { if (alive) return fn.apply(this, args); };
      const off = lenis.on(event, cb);
      disposers.push(() => {
        if (typeof off === "function") off();
        else if (typeof lenis.off === "function") lenis.off(event, cb);
      });
    },
    then(promise, fn) {
      promise.then((v) => { if (alive) run(() => fn(v)); }, () => undefined);
    },
    add(fn) { disposers.push(fn); },
    run,
    wrap,
    bindGsap() {
      if (!ctx && typeof window !== "undefined" && window.gsap && typeof window.gsap.context === "function") {
        ctx = window.gsap.context(() => undefined);
      }
    },
    dispose() {
      if (!alive) return;
      alive = false;
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
      frames.forEach((id) => window.cancelAnimationFrame(id));
      timeouts.clear(); intervals.clear(); frames.clear();
      for (let i = disposers.length - 1; i >= 0; i--) {
        try { disposers[i](); } catch (err) { if (process.env.NODE_ENV !== "production") console.warn(`[${label}] teardown`, err); }
      }
      disposers.length = 0;
      if (ctx) {
        try { ctx.revert(); } catch (err) { if (process.env.NODE_ENV !== "production") console.warn(`[${label}] gsap revert`, err); }
        ctx = null;
      }
    },
  };
  return scope;
}
