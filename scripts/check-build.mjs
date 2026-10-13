/*
  Post-build SEO/HTML regression check (no network). Run after `npm run build`:
    node scripts/check-build.mjs
  Fails (exit 1) if any prerendered page loses its title, description,
  canonical, single H1, valid JSON-LD or signature, or if the sitemap drifts
  from the prerendered routes.
*/

import fs from "node:fs";
import path from "node:path";

const APP = ".next/server/app";
const SITE = "https://www.synkynstudios.com";
const problems = [];

const pages = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html") && !/_global-error|_not-found/.test(p)) pages.push(p);
  }
};
walk(APP);

const routeOf = (file) => {
  const rel = path.relative(APP, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel}`;
};

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeOf(file);
  const fail = (msg) => problems.push(`${route}: ${msg}`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`expected 1 <h1>, found ${h1}`);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail("missing or short <title>");
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail("missing or short meta description");
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  // "https://host" and "https://host/" are the same URL; Next writes the root without the slash.
  const expected = route === "/" ? [SITE, `${SITE}/`] : [`${SITE}${route}`];
  if (!noindex && !expected.includes(canonical)) fail(`canonical is ${canonical || "missing"}`);
  if (!/<html lang="en"/.test(html)) fail("missing <html lang>");
  if (!html.startsWith("<!--\n  Made by: Prajwal A B")) fail("signature missing at top");
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail("invalid JSON-LD block"); }
  }
}

// Sitemap must list exactly the indexable prerendered routes.
const sitemapFile = path.join(APP, "sitemap.xml.body");
if (fs.existsSync(sitemapFile)) {
  const locs = [...fs.readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
  const indexable = pages.map(routeOf).filter((r) => !/<meta name="robots" content="[^"]*noindex/.test(fs.readFileSync(path.join(APP, (r === "/" ? "index" : r.slice(1)) + ".html"), "utf8")));
  for (const r of indexable) if (!locs.includes(r)) problems.push(`sitemap: missing ${r}`);
  for (const l of locs) if (!indexable.includes(l)) problems.push(`sitemap: lists ${l}, which is not a prerendered indexable page`);
} else problems.push("sitemap.xml.body not found in build output");

if (problems.length) {
  console.error(`check-build: ${problems.length} problem(s)\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-build: ${pages.length} pages OK`);
