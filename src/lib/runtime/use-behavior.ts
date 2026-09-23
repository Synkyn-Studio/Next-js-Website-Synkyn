"use client";

/*
  React bindings for imperative behaviours.

  - useBehavior(fn)          runs once GSAP, its plugins and Lenis are ready
                             (the static site's deferred scripts / DOMContentLoaded).
  - useImmediateBehavior(fn) runs on mount (the static site's inline scripts that
                             executed while the document was still parsing).

  Each call gets its own Scope, disposed on unmount, so client-side navigation
  never leaks listeners, timers, observers, ScrollTriggers or animation loops.
  An exception in one behaviour is logged and isolated, like a failing <script>.
*/

import { type DependencyList, useEffect } from "react";
import { whenRuntimeReady } from "./runtime";
import { createScope, type Scope } from "./scope";

export type Behavior = (scope: Scope) => void;

function execute(name: string, scope: Scope, fn: Behavior) {
  try {
    scope.run(() => fn(scope));
  } catch (err) {
    console.error(`[synkyn] behaviour "${name}" failed`, err);
  }
}

export function useBehavior(name: string, fn: Behavior, deps: DependencyList = []) {
  useEffect(() => {
    const scope = createScope(name);
    whenRuntimeReady().then(() => {
      if (!scope.alive) return;
      scope.bindGsap();
      execute(name, scope, fn);
    }, () => undefined);
    return () => scope.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useImmediateBehavior(name: string, fn: Behavior, deps: DependencyList = []) {
  useEffect(() => {
    const scope = createScope(name);
    scope.bindGsap();
    execute(name, scope, fn);
    return () => scope.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
