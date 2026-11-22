# Modern Door Solutions — Homepage Redesign

A premium, custom-designed single-page homepage for **Modern Door Solutions LLC** (Weare, NH) — built as a design concept based on the content of [moderndoorsolutions.com](https://moderndoorsolutions.com/).

Static HTML5 / CSS3 / vanilla JavaScript. No build step, no frameworks, no backend — ready to serve directly from GitHub Pages.

---

## Business snapshot

| | |
|---|---|
| **Business** | Modern Door Solutions LLC (registered NH LLC #978630, est. 2024) |
| **Industry** | Commercial & residential door installation, repair, maintenance and life-safety inspection |
| **Location** | P.O. Box 27, Weare, NH 03281 |
| **Phone** | (603) 921-4793 |
| **Email** | Zach@moderndoorsolutions.com |
| **Facebook** | https://www.facebook.com/901962086341015 |

**Core services:** commercial overhead doors · high-speed doors · fire door testing & inspections · repair and maintenance plans. Also: residential overhead/entry doors, wire partitions, safety & sensing products, dock equipment, openers, seasonal snow plowing.

**Suppliers referenced on the original site:** Hörmann · Dynaco · General Doors · WireCrafters · Handle-It · TY Safety · BEA Sensors · Vestil · LiftMaster · ASSA ABLOY.

## Design direction

**"Industrial editorial."** Charcoal ink and warm bone paper with a brass-gold accent lifted from the original gold logo. Strong display typography (Bricolage Grotesque) contrasted with an italic editorial serif (Instrument Serif), plus Manrope for body copy. Layout uses asymmetric photographic compositions, thin rules, and generous negative space instead of gradient-heavy card stacks.

Homepage sections:

1. Utility bar + sticky navigation (with gold logo lockup)
2. Signature hero — headline, dual CTA, operating stats, layered photo composition
3. Supplier marquee
4. Business introduction with founder credit
5. Core services (four-panel dark grid)
6. Fire door testing & inspections (scope A–D)
7. Why Modern Door (promises + dock-safety strip)
8. Featured work gallery (asymmetric grid)
9. Four-step process
10. Service area (towns, address, availability)
11. FAQ accordion
12. Contact + service request composer
13. Footer, sticky mobile call bar, desktop floating call button

## Structure

```
.
├── index.html
├── .nojekyll
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/   (WebP + JPEG sources, optimised)
    └── logo/     (logo-mark.svg, logo-mark-bone.svg, favicon.svg)
```

## Technical notes

- **Mobile-first.** Base styles target 360px; breakpoints at 560 / 720 / 900 / 1000 / 1120 / 1200 / 1440px.
- **No horizontal overflow** at 360, 390, 430, 768, 1024, 1100, 1280, 1440px (verified in headless Chromium).
- **Navigation:** full desktop menu ≥1120px; accessible off-canvas drawer below that (focus trap, `Esc` to close, scroll lock, overlay, `aria-expanded`).
- **Sticky action bar** on mobile (call / request service) appears after the hero and hides in the contact section; a floating call button replaces it on desktop.
- **No fake form submission.** The request form validates locally and composes a `mailto:` with all fields pre-filled — it never claims a message was sent.
- **Accessibility:** semantic landmarks, single `h1`, ordered heading hierarchy, skip link, visible focus states, alt text on every image, `prefers-reduced-motion` support.
- **SEO:** descriptive title/description, Open Graph tags, JSON-LD LocalBusiness schema, and `noindex, nofollow` so this concept does not compete with the live site.

## GitHub Pages

The site is a plain static root (`index.html` at repository root) and includes a `.nojekyll` file, so it can be served from either:

- **Settings → Pages → Source: Deploy from a branch → `main` / root**, or
- any other branch’s `/ (root)` folder while the design is under review.

All asset paths are relative, so it also works from a project subdirectory such as
`https://<user>.github.io/moderndoorsolutions.com/`.

## Image credits

Photography is AI-generated placeholder imagery created for this concept (a technician shirt carries a small stylised brand emblem). It is **not** presented as real project photography — swap in the client's own job photos before launch. Original logo artwork could not be downloaded from the existing site's CDN at build time, so the logo lockup is a faithful vector recreation of the gold door mark and should be replaced with the supplied master file.

---

*Design concept prepared for review. Business details sourced from moderndoorsolutions.com and public registries.*
