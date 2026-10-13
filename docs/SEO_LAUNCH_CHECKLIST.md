# SEO launch checklist

## Before merging `seo-performance-pass`

- [ ] Review `/privacy` (see `CONTENT_REQUIRED.md` §5) — it goes live with the merge.
- [ ] Review the four new project pages: `/work/skroman-smart-switches`, `/work/camel-crayons`, `/work/tata-sampann`, `/work/redbus`.
- [ ] Open the Vercel **Preview** deployment for the branch and click through: Library card → modal (plain click), Ctrl/⌘-click → project page in new tab, browser Back.
- [ ] Confirm the Vercel build command is `npm run build` (it also signs the HTML; if overridden to `next build`, the signature step is skipped).

## Deployment configuration (Vercel)

- [ ] **Domains**: make `www.synkynstudios.com` primary and set the apex `synkynstudios.com` to redirect straight to `https://www.synkynstudios.com` (today `http://synkynstudios.com` takes two hops: → https apex → www).
- [ ] **Preview protection**: keep Vercel *Deployment Protection* (Vercel Authentication) on Preview deployments so previews are never indexed. Production must stay public.
- [ ] Production must not inherit `noindex`: after deploy, `curl -sI https://www.synkynstudios.com/ | grep -i x-robots` should print nothing, and the page `<meta name="robots">` must read `index, follow…`.

## Post-deploy checks (production)

```bash
# status codes and redirects
for u in / /library /work/tata-sampann /privacy /work/nope /work; do
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}  $u\n" https://www.synkynstudios.com$u; done
# expect 200 ×4, 404 for /work/nope, 308 → /library for /work

curl -s https://www.synkynstudios.com/sitemap.xml | grep -c "<loc>"   # expect 11
curl -s https://www.synkynstudios.com/robots.txt                      # allows /, lists sitemap
```

- [ ] Validate structured data on `/`, `/library`, `/contact`, `/work/tata-sampann` with Google's **Rich Results Test** and validator.schema.org. Syntax-valid ≠ rich-result eligible; VideoObject eligibility depends on Google.
- [ ] Check share previews (LinkedIn Post Inspector, WhatsApp) for `/` and one `/work/...` page.

## Search Console / Bing Webmaster (owner)

- [ ] Property: `https://www.synkynstudios.com/` (domain property preferred).
- [ ] Submit `https://www.synkynstudios.com/sitemap.xml` in both.
- [ ] URL Inspection → *Request indexing* for the four `/work/...` pages and `/privacy`.
- [ ] After 2–4 weeks: Indexing → **Videos** report (are project pages recognised as video watch pages?), Pages report for errors.
- [ ] Google Business Profile for "Synkyn Studios, Bengaluru" once the address is confirmed.

## Field monitoring (ongoing)

- [ ] PageSpeed Insights / CrUX for `/`, `/library`, `/contact` once there is enough traffic (field data needs real visits; Lighthouse lab scores are not field results).
- [ ] Targets at the 75th percentile, mobile and desktop separately: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- [ ] Vercel Speed Insights (optional) for real-user Web Vitals per route.
- [ ] Re-run the Lighthouse comparison (`AUDIT_RESULTS.md`, "How to re-measure") after major changes.
