# Audit baseline — synkynstudios.com

Measured **13 October 2026**, before any change on branch `seo-performance-pass` (starting point: `main` @ `9c746ea`).

## Environment

| | |
|---|---|
| Framework | Next.js 16.3.5 (App Router, all routes statically prerendered), React 19.3, TypeScript |
| Hosting | Vercel (production); measurements below use a local production build (`next build` + `next start`) |
| Lighthouse | 12.8.2, Chrome stable, headless |
| Mobile profile | Lighthouse default: simulated slow 4G, 4× CPU slowdown, 412×823 @ DPR 1.75 |
| Desktop profile | Lighthouse desktop preset |
| Runs | 3 runs (median, range in brackets) for `/`, `/library`, `/contact`; 1 run for other routes |
| Third parties | Real (Vimeo, Google Analytics, Google Tag Manager, ImageKit were reachable) |
| Field data | **Not measured** — no CrUX / Search Console access in this environment |

Raw Lighthouse JSON + HTML reports: `audit-reports/lighthouse/baseline/` (git-ignored; regenerate with the steps in `AUDIT_RESULTS.md`).

## Baseline scores

| Route | Device | Runs | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI | Transfer | Requests |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 3 | 37 (35–44) | 100 | 79 | 100 | 4.6s (2.0–4.9) | 10.9s (4.6–11.0) | 1059ms (959–3267) | 0.000 (0–0.010) | 8.7s (8.0–9.2) | 6049 KB | 72 |
| /library | mobile | 3 | 51 (50–51) | 100 | 79 | 92 | 1.4s (1.4–2.4) | 9.6s (9.2–9.7) | 867ms (643–1003) | 0 | 5.0s (3.9–6.6) | 1599 KB | 52 |
| /printalbum | mobile | 1 | 50 | 96 | 100 | 92 | 1.4s | 9.4s | 934ms | 0 | 4.9s | 1491 KB | 46 |
| /about-us | mobile | 1 | 53 | 100 | 100 | 92 | 2.0s | 8.3s | 752ms | 0 | 4.6s | 1286 KB | 52 |
| /contact | mobile | 3 | 49 (48–52) | 100 | 100 | 92 | 1.2s (1.2–2.2) | 7.4s (6.9–8.3) | 930ms (924–1278) | 0 | 4.5s (4.4–6.1) | 1092 KB | 44 |
| /terms | mobile | 1 | 43 | 100 | 100 | 92 | 2.4s | 8.3s | 1073ms | 0 | 6.8s | 1100 KB | 44 |
| / | desktop | 3 | 89 (86–89) | 100 | 78 | 100 | 0.5s | 1.0s (1.0–1.2) | 127ms (124–188) | 0 | 3.0s | 5764 KB | 88 |
| /library | desktop | 3 | 99 (91–99) | 100 | 78 | 92 | 0.4s | 0.9s (0.8–1.9) | 27ms | 0 | 1.0s | 1697 KB | 71 |
| /printalbum | desktop | 1 | 92 | 96 | 100 | 92 | 0.4s | 1.8s | 0ms | 0 | 0.9s | 1862 KB | 68 |
| /about-us | desktop | 1 | 98 | 100 | 100 | 92 | 0.5s | 1.1s | 16ms | 0 | 1.0s | 1370 KB | 73 |
| /contact | desktop | 3 | 99 | 100 | 100 | 92 | 0.3s | 1.0s | 3ms (0–14) | 0 | 0.7s | 1197 KB | 62 |
| /terms | desktop | 1 | 96 | 100 | 100 | 92 | 0.4s | 1.2s | 84ms | 0 | 1.2s | 1204 KB | 62 |

TTFB (local server, from the LCP breakdown): ~0.45 s. Production TTFB **not measured** (Vercel edge; HTML is served `x-vercel-cache: HIT`).

## What the measurements showed

### Observed defects (reproduced)

| # | Finding | Evidence |
|---|---|---|
| 1 | **Inner-page LCP 7–10 s on mobile is almost entirely render delay.** The LCP element is the hero heading/intro text (download time 0). It sat at `opacity: 0` until GSAP had downloaded and executed and the reveal tween ran. | LCP breakdown on `/contact`: TTFB 459 ms, load delay 0, load time 0, **render delay 6 962 ms**; `/library` render delay 9 206 ms. |
| 2 | **Two empty "—" Library cards** — placeholder data (`WORKS_ROW` entries `work-row-2`, `work-row-3` with empty title and video), not a loading state. | `src/data/works.ts` |
| 3 | **"Links are not crawlable" (SEO 92 on every inner page)** — the footer link to the current page was an `<a>` without `href`. | Lighthouse `crawlable-anchors` |
| 4 | **Library card accessible names did not match visible text** (`aria-label` "Title — Category" vs visible badge + category + title). | Lighthouse `label-content-name-mismatch` |
| 5 | **Print Album result line contrast 4.04:1** (#707070 on #080808 at 13 px; AA needs 4.5:1). | Lighthouse `color-contrast` |
| 6 | **Partner carousel exposed each logo 3–4 times to assistive tech, each focusable** (`tabIndex=0` on every repeated logo, only the looping copy was hidden). | `ResearchSponsorsSection.tsx` |
| 7 | **No skip link.** | — |
| 8 | **No privacy notice**, although the site runs Google Analytics 4 and Google Tag Manager and embeds Vimeo, YouTube and Instagram. | Footer had Terms only. |
| 9 | **Videos only discoverable through a modal / URL fragment.** No indexable page per film. | Library modal only. |
| 10 | **Google Tag Manager container contains no tags** (only built-in URL variables), yet loads on every page (~116 KB, parse/compile on the main thread). | Fetched `gtm.js?id=GTM-KLBKS7TM`. |
| 11 | **Structured data stated precise coordinates (12.9716, 77.5946)** — the centre of Bengaluru, not a verified studio location. | `structured-data.ts` (home + contact) |
| 12 | **Library hover-preview Vimeo player lacked `dnt=1`.** | `library.ts` |

### Checked and found healthy

- HTTPS, preferred host `www`, permanent 308 redirects (`http`→`https`, apex→`www`, trailing slash and legacy `.html` → clean URL); real **404** for unknown URLs; `robots.txt` allows all public pages and references the sitemap; sitemap returns 200.
- Unique title, description, canonical, Open Graph/Twitter per page; `index, follow`; one H1 per page; logical heading order (fixed in an earlier pass); all images have `alt`.
- Brotli compression; `/_next/static` fingerprinted and immutable; `/assets` + `/vendor` cached 1 day with revalidation.
- Library and Print Album modals are `role="dialog"`, `aria-modal`, labelled, close on Escape; mobile menu keeps `aria-expanded` / `inert` in sync.
- CLS ≈ 0 everywhere.

### Suspected / not fixable in code

- **Home**: LCP element is the loader logo; the 3.8 s branded loader and the Vimeo background stream (~3.5 MB on mobile) dominate. Treated as a deliberate design choice (owner decision, see results).
- **Best Practices 78–79 on Home/Library**: third-party cookies set by the Vimeo player script and the YouTube/Instagram embeds — not controllable from this codebase.
- **`http://synkynstudios.com` takes two redirect hops** (→ https apex → https www). Vercel domain setting, not code.
- Mobile TBT ~0.9–1 s is spread across the app bundle, GSAP + ScrollTrigger, GA4 (gtag.js) and the canvas effects.
