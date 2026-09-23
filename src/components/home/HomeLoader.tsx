"use client";

/*
  Split-panel loading screen shown on every visit to Home.

  On the first document load the controller runs from the inline script below,
  so the counter starts while the page is still parsing. On a client-side
  navigation back to Home that script is inert (React-inserted scripts do not
  execute), so the effect starts the same controller instead.
*/

import { useLayoutEffect } from "react";
import { loaderBootstrap, LOADER_INLINE_SCRIPT, type LoaderHandle } from "@/behaviors/home/loader";
import { revealFailsafe } from "@/behaviors/reveal";
import { useImmediateBehavior } from "@/lib/runtime/use-behavior";

declare global {
  interface Window { __synkynLoader?: LoaderHandle }
}

/*
  There are two ways this component mounts against a loader that is already
  running, and both used to restart the counter — the progress bar filled once
  from the inline script and then a second time from React:

  - Hydration takes over the run the inline script started.
  - React re-runs the effect on the same DOM (Strict Mode in development).

  Both keep the same #synkynLoader element, which a genuine client-side
  navigation back to Home does not, so the element identifies the run. The
  teardown is deferred by a tick as well, because Strict Mode disposes and
  re-creates the scope synchronously and the second mount has to find the run
  still alive to adopt it.
*/
let pendingTeardown: number | null = null;

const liveRunFor = (el: HTMLElement | null) => {
  const live = window.__synkynLoader;
  return live && el && live.el === el ? live : null;
};

export default function HomeLoader() {
  // Client-side navigation to Home: raise the loader before first paint.
  useLayoutEffect(() => {
    // A run that has already opened the page must stay down — re-raising it
    // here is what left a finished loader back on screen after hydration.
    const live = liveRunFor(document.getElementById("synkynLoader"));
    if (live && live.finished()) return;
    document.documentElement.classList.add("show-loader");
    document.documentElement.classList.remove("hide-loader");
  }, []);

  useImmediateBehavior("home-loader", (scope) => {
    if (pendingTeardown !== null) { window.clearTimeout(pendingTeardown); pendingTeardown = null; }

    const live = liveRunFor(document.getElementById("synkynLoader"));
    let handle: LoaderHandle;
    if (live) {
      handle = live; // same element: same run, so let its counter carry on
    } else {
      window.__synkynLoader?.stop(); // a run left behind by an earlier visit
      handle = loaderBootstrap();
    }
    window.__synkynLoader = handle;

    scope.add(() => {
      pendingTeardown = window.setTimeout(() => {
        pendingTeardown = null;
        handle.stop();
        if (window.__synkynLoader === handle) delete window.__synkynLoader;
        // Leaving Home mid-load must never leave the page scroll-locked.
        document.documentElement.classList.remove("show-loader", "hide-loader", "loader-open");
      }, 0);
    });
  });
  useImmediateBehavior("reveal-failsafe", revealFailsafe);

  return (
    <>
      {/*
        The inline script is already running this markup by the time React
        hydrates, so the DOM it hands over has moved on from what the server
        rendered. `suppressHydrationWarning` applies to one element only, not to
        its subtree, so every node the controller writes to needs its own:
        `--loader-progress` and `hidden` here, the backing-store size on the
        canvas, `aria-valuenow` on the bar and the text of the percentage.
      */}
      <div className="loader" id="synkynLoader" suppressHydrationWarning>
        <canvas className="loader-canvas" aria-hidden="true" suppressHydrationWarning />
        <div className="loader-panel loader-top" />
        <div className="loader-panel loader-bottom" />
        <div className="loader-stack">
          <div className="loader-tag">AI-NATIVE PRODUCTION</div>
          <div className="loader-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.webp" width={680} height={222} alt="Synkyn Studios" fetchPriority="high" />
          </div>
          <div className="loader-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={1} suppressHydrationWarning>
            <i />
          </div>
          <div className="loader-pct" suppressHydrationWarning>01%</div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: LOADER_INLINE_SCRIPT }} />
    </>
  );
}
