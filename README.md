# The Breaking Dad

Personal site for Dan at [thebreakingdad.co.uk](https://thebreakingdad.co.uk) — a UK dad covering co-parenting, blended family life, and honest product reviews.

Built with Astro 6, Tailwind CSS v4, and deployed to Cloudflare Workers.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Astro 6 (`output: 'static'`) |
| Styles | Tailwind CSS v4 via `@tailwindcss/vite` (no PostCSS) |
| Content | MDX via `@astrojs/mdx` |
| Images | Sharp |
| Hosting | Cloudflare Workers (static assets) |
| Redirects | `public/_redirects` (Cloudflare-native format) |

---

## Setup

```bash
# Requires Node 22+
nvm use   # uses .nvmrc
npm install
```

---

## Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

---

## Build

```bash
npm run build
```

Output goes to `./dist/`. Cloudflare Workers will serve it directly.

---

## Deploy

```bash
npm run deploy
```

This runs `wrangler deploy`, which reads `wrangler.jsonc` and deploys the `./dist/` folder as static assets on Cloudflare Workers.

**First-time setup:** You'll need to be logged in via `wrangler login` and have a Cloudflare account with Workers enabled.

---

## Content authoring

### Collections

All content lives in `src/content/`. Four collections:

| Collection | Location | URL pattern |
|---|---|---|
| `posts` | `src/content/posts/` | `/separated-parents/{slug}/` |
| `reviews` | `src/content/reviews/` | `/reviews/{slug}/` |
| `diary` | `src/content/diary/` | `/diary/{slug}/` |
| `pages` | `src/content/pages/` | Static pages (not routed dynamically) |

### File naming

Name files using the exact URL slug: `introducing-a-new-partner-to-your-child.mdx`

All slugs must be lowercase kebab-case: `/^[a-z0-9-]+$/`

### Post frontmatter (required fields)

```yaml
---
title: "How to introduce a new partner to your child — a separated parent's guide"
description: "Sixty to two hundred characters. Written for Google. Not a clickbait tease."
publishDate: 2024-03-15
updatedDate: 2025-01-10     # optional but good for freshness signal
heroImage: /images/posts/introducing-new-partner.jpg   # optional
subhub: blended-family       # one of: co-parenting | blended-family | money-and-benefits | rights-and-law | starting-over
experienceNote: |
  I waited nearly two years before introducing Rosie to Evie. That wait was
  deliberate, sometimes agonising, and absolutely right for our situation.
  Here's what I learned — and what I wish someone had told me earlier.
ymylDisclaimer: false        # set true for benefits/law/money posts
tags: [blended-family, new-partner, co-parenting]   # optional, metadata only
---
```

The `experienceNote` field is mandatory and is the E-E-A-T anchor of the post. It must be a first-person lived-experience hook of between 40 and 400 characters. It appears in a styled box at the top of the post, before the main content.

Set `ymylDisclaimer: true` for any post covering benefits, legal rights, child maintenance, or financial advice. This renders a disclaimer block reminding readers to verify with official sources.

### Review frontmatter (required fields)

```yaml
---
title: "Vivobarefoot review — two years of wearing them as a dad on the move"
description: "An honest review after two years of daily wear..."
publishDate: 2024-06-01
productName: Vivobarefoot (brand range)
rating: 4                    # integer 1–5
usageDuration: "Used for 2 years"
productCategory: shoes-and-fitness  # family-tech | parenting-kit | shoes-and-fitness | home-and-lifestyle | days-out
pros:
  - Genuinely improves foot strength over time
  - Built to last — my first pair lasted 3 years
cons:
  - Expensive upfront
  - Takes 2–3 weeks to adjust to the minimal sole
hasAffiliateLinks: true      # default true; set false if no affiliate links
tags: [shoes, barefoot-running, fitness]
---
```

### Diary frontmatter

```yaml
---
title: "Two years of co-parenting — what I've learnt"
description: "A personal reflection, not a how-to guide..."
publishDate: 2022-09-01
tags: [co-parenting, reflection]
---
```

---

## Design tokens

Defined in `src/styles/global.css` using Tailwind v4's `@theme` directive:

| Token | Value |
|---|---|
| Background | `#fbf8f3` (warm off-white) |
| Text | `#1a1f2e` (deep warm navy) |
| Accent | `#b44141` (muted deep-red) |
| Highlight | `#f4c97c` (amber) |
| Body font | Literata (serif, self-hosted) |
| UI font | Inter (sans-serif, self-hosted) |

---

## Fonts

Fonts are self-hosted — no Google Fonts calls. Add font files to `public/fonts/` and they're referenced in `global.css`. The CSS already has `@font-face` declarations ready; just drop the font files in.

Recommended format: WOFF2, subset to Latin.

---

## Redirects

`public/_redirects` contains 231 explicit 301 redirects from the WordPress era, covering canonical URL changes, old category URLs, tag pages, and WordPress artifacts. This file is read natively by Cloudflare Workers.

Do not manually edit it unless you know what you're doing — it was generated from GSC data and covers ~19,600 clicks of traffic.

---

## Schema.org

Every page emits `Organization` and `Person` JSON-LD. Posts additionally emit `Article` + `BreadcrumbList`. Reviews emit `Review` + `BreadcrumbList`. All schema is rendered server-side in the layout components — no client-side JS.

---

## What's deliberately NOT in v1

- Newsletter form (Brevo — phase 2)
- Search bar (Pagefind — phase 2)
- Instagram feed
- Comments
- Author pages
- Tag archive pages
- Pagination (add when post count demands it)
