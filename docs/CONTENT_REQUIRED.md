# Content required from the owner

Nothing below has been published as a placeholder. Each item unblocks a specific improvement.

## 1. Projects

| Project | What is needed | Unblocks |
|---|---|---|
| **Dragon** (YouTube glimpse) | Synkyn's exact contribution (e.g. VFX shots, title design, full trailer?) and permission to show it | A `/work/dragon` page. Today it stays in the Library only, because the credits listed (NTR, Prashanth Neel, Ravi Basrur) describe the film, not Synkyn's part. |
| **NBK111** (YouTube glimpse) | Same as Dragon | `/work/nbk111` page |
| **Skroman Automation** (Instagram reel) | Synkyn's contribution; a Vimeo or direct video file if possible (Instagram embeds can't carry VideoObject data) | A project page with video structured data |
| **Skroman Smart Switches, Tata Sampann, RedBus** | Client approval to name them, approved credits, deliverables list, timeline, any results (views, turnaround) and a testimonial if one exists | Richer project pages (only facts already in `src/data/works.ts` are shown today) |
| **Camel** | Confirm it is an independent spec concept (its own description says "Spec AI Film"). It is now labelled "Spec Ad Film · Independent concept". | — |
| **Library row (two empty slots)** | Title, category, thumbnail and video URL for the two `WORKS_ROW` entries in `src/data/works.ts` | They reappear automatically once filled; they are hidden while empty. |

## 2. Print Album — spec vs commissioned

The featured section is headed "Spec projects", but individual descriptions read like commissioned, physically produced work. For **each** print project (Zlade, Dot & Key, Porter, Visa, Comet, Volkswagen Taigun, Yonex, Skroman), confirm:

- Commissioned by the brand, or an independent concept?
- Was anything physically manufactured? Specifically **Visa** ("die-cut, foil stamping, lenticular printing"): keep only if those finishes were actually produced; otherwise describe it as a concept visual.

Spec items will then be labelled "Independent concept" on the cards and in the lightbox (the data field `spec: true` already exists for Library works).

## 3. Services

Dedicated service pages (AI commercials, product films/CGI, storyboards & previs, AI VFX/set extension) were **not** created: a useful page needs facts that aren't on the site. For each service:

- Who it is for and when it fits
- Typical deliverables and formats
- Process steps and realistic timelines
- 2–3 relevant projects
- Real buyer questions you get asked

## 4. Business details

- **Studio address**: the site shows "Bengaluru, Karnataka 560001". Confirm a real address (for the Contact page and LocalBusiness data), or the PIN code should be removed. The unverified map coordinates have already been removed from the structured data.
- **Response time**: Contact says "within one business day". Keep only if that's consistently true.
- **Team**: confirm titles (Dhiraj Kishore and Deepen Ingale are shown as Co-founder; Pruthvij Prabhu as Gen AI artist).
- **Contact form**: needs a delivery provider you approve (e.g. Resend or Formspree), the destination inbox, and whether to add spam protection (Cloudflare Turnstile). The form was not built without it (a form that pretends to send would lose enquiries).

## 5. Privacy notice (`/privacy`) — review before launch

The page describes only what the code demonstrably does (GA4 with cookies, Google Tag Manager, Vercel hosting, ImageKit images, Vimeo/YouTube/Instagram embeds, email enquiries). Please review it, ideally with legal advice, and add:

- Retention period for enquiry emails and analytics (GA4 data retention setting in your GA account)
- Whether you need a consent banner for EU/UK visitors (you list the UK in `areaServed`)
- Any processing not visible in the code (CRM, newsletter, invoicing tools)
- The person or role to contact for privacy requests, if not the general inbox

## 6. Analytics

- Google Tag Manager `GTM-KLBKS7TM` currently contains **no tags**. Either add tags there or remove it entirely (saves ~116 KB per page). It now loads after the page instead of during it.
- In GA4, mark `contact_click` as a key event if email/Instagram/LinkedIn clicks should count as leads. Note: an email click is not a confirmed enquiry.
