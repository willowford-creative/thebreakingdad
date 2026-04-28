# The Breaking Dad -- CLAUDE.md

Persistent context for Claude Code. Read this first every session.

---

## What this project is

Personal blog for Dan Betts at thebreakingdad.co.uk.
Migrated from WordPress to Astro 6 (static) + Cloudflare Workers.

---

## Locked technical decisions -- do not revisit

- **Astro 6** with `output: 'static'`
- **Cloudflare Workers** (not Pages) -- static assets via `wrangler.jsonc`
- `trailingSlash: 'always'` -- matches WordPress URL parity
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin -- NO PostCSS
- **MDX** via `@astrojs/mdx`
- **Sharp** for image optimisation
- **TypeScript strict mode** with `~/` import alias
- **Node 22+**
- **Minimal client-side JS** — only used for the reading-progress bar (article templates) and the mobile menu (CSS-only via `<details>`). Everything else stays static.
- **Google Fonts**: Newsreader (serif) + Geist (sans), loaded via `<link>` in BaseLayout (switched from self-hosted during design polish)
- `import { z } from 'astro/zod'` -- NOT `astro:content` (deprecated in Astro 6)

---

## URL structure (locked)

```
/                              Home
/about/                        E-E-A-T anchor
/work-with-us/
/contact/
/privacy/
/affiliate-disclosure/

/separated-parents/            Pillar 1 hub
/separated-parents/co-parenting/           Subhub
/separated-parents/blended-family/         Subhub
/separated-parents/money-and-benefits/     Subhub
/separated-parents/rights-and-law/         Subhub
/separated-parents/starting-over/          Subhub
/separated-parents/{slug}/     Posts -- FLAT under pillar (not nested in subhubs)

/reviews/                      Pillar 2 hub
/reviews/{slug}/               Reviews -- flat

/diary/
/diary/{slug}/
```

Subhub slugs (exact): `co-parenting` | `blended-family` | `money-and-benefits` | `rights-and-law` | `starting-over`

WARNING: Never create a post whose slug matches a subhub name -- it will clash with the subhub route.

---

## Navigation

Primary nav:
```
Home | Parenting | Separated parents | Reviews | Diary | Work with us
```

Footer nav: About | Work with us | Contact | Privacy | Affiliate disclosure | RSS + Instagram icon

About moved to the footer so the primary nav is reserved for content pillars + business-facing Work with us.

---

## Content collections

Four collections in `src/content.config.ts`:

| Collection | Directory | URL pattern |
|---|---|---|
| `posts` | src/content/posts/ | /separated-parents/{slug}/ |
| `reviews` | src/content/reviews/ | /reviews/{slug}/ |
| `parenting` | src/content/parenting/ | /parenting/{slug}/ |
| `diary` | src/content/diary/ | /diary/{slug}/ |

---

## Required frontmatter

### Posts (`src/content/posts/`)

```yaml
---
title: "Title here"
description: "60-200 chars. SEO-focused."
publishDate: 2024-03-15
updatedDate: 2025-01-10       # optional
subhub: blended-family        # co-parenting | blended-family | money-and-benefits | rights-and-law | starting-over
experienceNote: |             # MANDATORY -- 40-400 chars -- first-person lived-experience hook
  Write personal first-person context here.
ymylDisclaimer: false         # true for benefits/law/money posts
---
```

### Reviews (`src/content/reviews/`)

```yaml
---
title: "Title here"
description: "60-200 chars"
publishDate: 2024-06-01
productName: Product name
rating: 4                     # 1-5 in 0.5 steps; OMIT for roundups
usageDuration: "Used for 2 years"
productCategory: shoes-and-fitness  # family-tech | parenting-kit | shoes-and-fitness | home-and-lifestyle | days-out
pros:
  - Pro 1
cons:
  - Con 1
hasAffiliateLinks: true
---
```

### Diary (`src/content/diary/`)

```yaml
---
title: "Title here"           # 6-14 words (gate-enforced for non-drafts)
description: "40-220 chars"
publishDate: 2022-09-01
heroImage: "/images/..."      # required for non-drafts
heroAlt: "..."                # required for non-drafts
heroCaption: "..."            # required for non-drafts (italic caption under hero)
lede: |                       # required for non-drafts; 30+ words
  First-paragraph hook for the entry hero and og:description.
---
```

Diary entries are gated at build time by `src/utils/diaryGates.ts` — hard floors on word count (250) + lede + internal links + cadence. Drafts with `draft: true` skip the gates so legacy entries don't break the build.

---

## Design tokens

| Token | Value |
|---|---|
| Background | `#fbf8f3` (warm off-white) |
| Text | `#1a1f2e` (deep warm navy) |
| Accent | `#b44141` (muted deep-red) |
| Highlight | `#f4c97c` (amber) |
| Body font | Newsreader (serif, Google Fonts) |
| UI font | Geist (sans-serif, Google Fonts) |
| Prose width | 680px max |
| Line height | 1.65 body, 1.75 prose |

---

## Schema.org

- Every page: Organization + Person JSON-LD (in BaseLayout)
- Posts: Article + BreadcrumbList (in PostLayout, injected via `head` slot)
- Reviews: Review + BreadcrumbList (in ReviewLayout, injected via `head` slot)

---

## Fonts

Loaded from Google Fonts via `<link>` in `src/layouts/BaseLayout.astro`:

- Geist: 400, 500, 600, 700, 800
- Newsreader: 400, 400i, 500, 600, 700 (with optical sizing)

No WOFF2 files or `public/fonts/` directory needed.

---

## Images

In place at `public/images/`:

- `dan-betts.jpg` -- author photo (used in AuthorBio + About page)
- `dan-betts-avatar.jpg` -- recentered crop for small circular avatars
- `og-default.jpg` -- fallback OG image (1200x630)

---

## What's NOT in v1

- Newsletter form (Brevo -- phase 2)
- Search bar (Pagefind -- phase 2)
- Instagram feed
- Comments
- Author pages
- Tag archive pages
- Pagination (add when volume demands)

---

## Content migration status

WordPress export: `thebreakingdad.WordPress.2026-04-23.xml` (in Drive folder 14OTzscrVqGWxIvK7JgzmZkwZwx95YTEi)

WordPress posts have been migrated into MDX files across `posts/`, `reviews/`, `parenting/`, and `diary/`. Most legacy diary entries remain `draft: true` until brought up to the gate standard (lede, heroCaption, internal link).

---

## Deploy

```bash
npm run build    # output to ./dist/
wrangler deploy  # or: npm run deploy
```

Cloudflare Workers reads `public/_redirects` natively.

---

## Voice & style

- Avoid em dashes. Use commas, full stops, parentheses, or a new sentence instead.
- Use contractions (don't, I've, won't, it's). Reads more naturally.
- Conversational tone. If a sentence wouldn't come out of someone's mouth, rewrite it.
- First-person where appropriate. Specific beats generic every time.
- SEO is critical. Concrete details, real lived experience, and original insight win.
