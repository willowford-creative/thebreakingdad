# Handoff: The Breaking Dad — Direction A (v2)

## Overview

A modern refresh of **thebreakingdad.co.uk** — a UK parenting blog covering parenthood, separated parents, reviews and things-to-do. The redesign keeps the live site's brand DNA (dusky-rose wordmark, soft-pink section blocks, photo-led cards) but tightens the typography, hierarchy and interactions to feel contemporary, editorial and warm.

The package covers:
- **Homepage** (desktop + mobile)
- **Category / Hub page** — Parenthood (desktop + mobile)
- **Post template** with reading-progress bar, inline newsletter hook, and signed "Field Note" experienceNote footer (desktop + mobile)
- **Mobile navigation** — hamburger to full-screen menu (closed + open states)

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behaviour, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (likely a WordPress theme, Astro/Next.js site, or similar) using its established patterns and libraries.

If no environment exists yet, the most appropriate stack for a content-led editorial site like this is **Astro or Next.js** with MDX/markdown for posts, or a **headless WordPress + Next.js** setup if the existing CMS-backed editorial workflow is to be preserved.

The HTML prototypes use React + Babel inline so the design renders directly in the browser — that infrastructure (the `design-canvas.jsx`, `tweaks-panel.jsx`, fragment-style component files) is **prototype scaffolding only** and should not be ported.

## Fidelity

**High-fidelity (hifi).** Final typography, exact colors, spacing, and micro-interactions are specified. The developer should recreate the UI pixel-perfectly. Photographic content is currently represented by gradient placeholders (`.illus.kids`, `.illus.review`, etc.) — the production site should swap these for real, warm-toned photography.

---

## Screens

### 1. Homepage (desktop)

**Purpose:** Discovery and entry point. Surface the latest hero feature, categorised "what's hot" links, recent articles, popular content (pink band), category-specific shelves (Separated Parents, Reviews), and an About panel.

**Layout (max-width 1180px, centered):**

1. **Site header** — wordmark left, horizontal nav center, search circle right. 22px vertical padding, 1px bottom border.
2. **Strap line** — single centered line under the header: "Honest field notes from a UK dad — co-parenting, blended family, starting again. · Issue 47 · April 2026". 10px padding, soft border.
3. **Lead row** — 2-column grid (1.55fr / 1fr, 36px gap):
   - Left: hero card, 4:3 aspect, 12px radius, photo with bottom gradient and overlaid eyebrow + 30px headline + meta.
   - Right: `side-list` of 5 categorised items, each with rose eyebrow + 16px title, separated by 1px rules. Hover: title shifts left 14px and gains a 10px accent dash.
4. **Article rows + sidebar** — 2-column grid (same ratio):
   - Left: 4 horizontal `article-row`s (220px image / text). 22px headline, 14.5px dek, meta line.
   - Right (sticky): newsletter card (pink, with envelope icon, email input, button), social links list, square promo image.
5. **Pink band** — full-bleed `section-pink`, centered "Popular content right now…" h2, 3-column grid of 6 photo `tile`s (1:1 aspect, gradient overlay, white headline at bottom).
6. **Separated Parents shelf** — 28px h2, "More →" link, 3-column grid of vertical `card`s (image / eyebrow / title / byline / dek). 11-dot pagination underneath.
7. **Reviews shelf** — same shape as above, no pagination.
8. **About panel** — `paper-2` background, 2-column grid (1fr / 1.2fr): headline + body copy + ghost CTA on the left, portrait illustration (5:4) on the right.
9. **Footer** — dark `--ink` (#15110F) background, 4-column grid (wordmark + bio + socials / Sections / Site / Legal), copyright row at bottom.

### 2. Homepage (mobile)

Single column, 18px horizontal padding. Hero card switches to 4:5 aspect with 22px headline. Side-list above the article list. Article rows compress to 120px image + text. Newsletter card sits between recent articles and the pink popular band. Pink band becomes 2-column. Footer reduces to 2 column links + dark band.

### 3. Category / Hub page (desktop) — e.g. `/parenthood`

**Purpose:** Section landing page. Frame the topic, surface the canonical "start here" pieces, lay out sub-topic pillars, then list each pillar's most relevant pieces. Replaces the live category page (which jumps straight into a flat grid with no framing).

**Layout (max-width 1180px, centered):**

1. **Site header + breadcrumb / sort row** — Home · Parenthood; right side is sort options (Newest / Most read / Editor's picks).
2. **Category masthead** — 2-col (1.4fr / 1fr):
   - Left: `<FieldNoteTag>` reading "Section · № 01", 76px display headline ("Parenthood"), 21px lede, meta row ("84 pieces · Updated weekly · 5 sub-topics").
   - Right: pink-tinted **editor's note card** — eyebrow + Newsreader-italic pull-quote from Daniel + small author chip (avatar + name + role). Adds personality to every section.
3. **"Start here" lead pack** — section head ("Start here / The ones to read first") then a 1.55fr / 1fr grid: 5:4 hero card on the left, two stacked supporting cards on the right (image + eyebrow + 19px title + meta).
4. **"Browse by topic" pillar TOC** — section head, then a numbered table of contents. Each row: zero-padded number in dusky rose / title + dek / piece count / arrow. Hover: row inset 12px from left, title shifts to accent, arrow nudges right 6px.
5. **Five pillar groups**, each:
   - Section head: eyebrow + 30px h2 + dek + "More in {pillar} →" link, 1px rule underneath.
   - 3-up `card` grid (image 16:10, eyebrow, 18px title, byline, dek). Pillar 2 (Kit & gear) shows 4 cards as an example of denser pillars.
6. **Mid-page newsletter band** — full-bleed `section-pink`, centered: eyebrow + 32px headline ("One honest dispatch a fortnight. No filler.") + body + email input + Subscribe button + social-proof line.
7. **Archive footer** — 2-col: left "Looking for something specific?" + ghost CTAs (Browse archive / Search). Right "By year" pill chips with active-state for current year (rose border + soft-rose fill).
8. **Site footer**.

### 4. Category / Hub page (mobile)

Single column, 18px padding. Masthead drops to 44px headline, meta line below. Below the breadcrumb is a horizontally-scrolling **topic chip strip** (All / Raising kids / Kit & gear / Family life / Days out / Digital parenting) — gives a quick filter affordance the live site lacks. "Start here" becomes hero-on-top + 2 horizontal cards. Pillar TOC compresses to a numbered list on `--paper-2` with rule separators. Pillar groups become 3 stacked horizontal cards. Newsletter card and archive pills as on the homepage. Footer reduces to mobile.

### 5. Post template (desktop)

**Purpose:** Long-read editorial article with strong personal voice and helpful sidebars.

**Layout:**

1. **Reading-progress bar** — 2px dusky-rose bar pinned to top of viewport, fills as user scrolls through the article element.
2. **Site header + breadcrumb row** (Home · Separated Parents · current page; Save / Share / Print right-aligned).
3. **Article masthead** (760px column, centered):
   - **Field Note tag** — small leaf SVG + "Field Note" + "№ 47" pill. Sets the brand signature.
   - Rose eyebrow ("Separated Parents · Long Read")
   - 56px display headline (Geist 700, -0.022em tracking, balanced)
   - 21px lede
   - Author chip (40px gradient avatar with initial + "By Daniel Betts · 8 min read · 23 April 2026")
4. **Hero illustration** — 16:7 aspect, 12px radius, with a small caption underneath.
5. **Body grid** — 200px TOC rail / 680px prose / 260px related rail.
   - **TOC**: sticky, eyebrow + numbered ordered list with active state in accent rose, "Reading: 2 of 8 min" footer.
   - **Prose**: 18px Geist, 1.7 line-height. Includes a `.ymyl` advice banner at top, then standard prose with `<h2>`/`<h3>`/`<ul>`/`<em>` (Newsreader italic) and a `.pullquote` (26px Geist 500, 3px accent left border).
   - **Inline newsletter hook** — appears mid-article: pink card, 2-column (copy left, button right). Copy: "If this is helping, the newsletter goes out monthly." → "Subscribe →".
   - **experienceNote** — pink-tinted card at end of body, with leaf icon top-right, "Why I wrote this" label, 24px headline, 2 paragraphs of personal voice, signoff in accent rose ("— Daniel"), and an author row (gradient avatar + name + bio + ghost "More about Daniel" button).
   - Filed-under footer with Save / Share buttons.
   - **Related rail (right)**: "More on this" eyebrow + 3 small `card`s + condensed Subscribe newsletter.
6. **Pink "Keep reading" band** — 3 photo tiles.
7. **Footer**.

### 6. Post template (mobile)

Single column, 22px padding. Field Note tag remains. Headline drops to 32px. TOC removed. Pull-quote drops to 22px. experienceNote keeps full structure with avatar. Pink "Keep reading" band becomes 2-column.

### 7. Mobile navigation

- **Closed**: same as homepage masthead (wordmark + search + hamburger).
- **Open**: full-screen overlay slides down with cubic-bezier(.6,.05,.2,1) over .35s. Top: wordmark + ✕. Body: "Sections" eyebrow + 6-row menu (each row has 22px display name + 12px sub-description + accent → arrow), then a pink newsletter card, then a "The Site" link list. Bottom band: copyright + social links.

---

## Interactions & Behavior

### Hover micro-interactions
| Element | Effect | Timing |
|---|---|---|
| `.card`, `.article-row` | translateY(-2px) + image shadow + image scale(1.04) | .25s + .5s for image |
| `.tile` | translateY(-3px) + larger drop shadow + scale(1.04) | .25s + .5s |
| `.hero-card` | shadow lift only | .3s ease |
| `.wordmark` | underline grows from left to right | .35s cubic-bezier(.2,.7,.3,1) |
| `.nav a` | accent underline grows from left | .25s |
| `.section-head .more` | gap between text and "→" widens 4px → 8px | .2s |
| `.btn` | translateY(-1px) | .15s |
| `.side-list .item` | padding-left 0 → 14px, plus a 10px accent dash slides in from -14px | .25s |

### Reading progress
A 2px fixed bar at the top of the viewport, color `--accent`, width set as a percentage of the article element's scroll progress through the nearest scrolling ancestor. Listens to scroll on the scroll container, not window — important when the article is rendered inside a frame (as in the prototype) or a modal in production.

### Mobile menu
Slides down with `transform: translateY(-100%)` → `0`, .35s cubic-bezier(.6,.05,.2,1). Background page dims to 30% opacity.

---

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Page background |
| `--paper-2` | `#FAF8F6` | Faint warm grey (cards, asides) |
| `--paper-tinted` | `#F2D9D2` | Soft-pink section block |
| `--paper-tinted-2` | `#FBEFEB` | Lighter pink (newsletter, experienceNote) |
| `--ink` | `#15110F` | Headlines, footer bg |
| `--ink-2` | `#4A4541` | Body copy |
| `--ink-3` | `#8A8480` | Meta |
| `--ink-4` | `#BAB4AE` | Faint |
| `--rule` | `#ECE6E1` | Standard divider |
| `--rule-soft` | `#F4EFEB` | Subtle divider |
| `--accent` | `#A66B6B` | **Brand dusky rose** — wordmark, links, accents |
| `--accent-deep` | `#8E5757` | Hover/pressed |
| `--accent-soft` | `#F4E0DD` | Backgrounds, link underlines |

### Typography
- **Display + sans**: Geist (Google Fonts). Weights 400 / 500 / 600 / 700 / 800. Used everywhere except italic emphasis.
- **Serif**: Newsreader (Google Fonts). Used **only** for `<em>` inside `.prose` to add a subtle warm note.
- **Mono**: System mono stack (not currently used).

| Class | Size | Weight | Line | Tracking |
|---|---|---|---|---|
| `.display-1` | 64px | 700 | 1.02 | -0.028em |
| `.display-2` | 44px | 700 | 1.05 | -0.022em |
| `.h1` | 32px | 700 | 1.15 | -0.018em |
| `.h2` | 24px | 700 | 1.2 | -0.014em |
| `.h3` | 19px | 600 | 1.25 | -0.01em |
| `.lede` | 19px | 400 | 1.5 | 0 |
| `.eyebrow` | 11px | 600 | — | 0.14em uppercase |
| `.meta` | 12.5px | 400 | — | 0 |
| `.prose` body | 18px | 400 | 1.7 | 0 |
| `.prose h2` | 28px | 700 | 1.2 | -0.018em |
| `.pullquote` | 26px | 500 | 1.3 | -0.014em |

### Spacing
8px base unit. Common: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 64.

### Radii
- 6px (small buttons, pills)
- 8px (inputs, tags, ymyl)
- 10–12px (cards, hero, tiles)
- 14px (newsletter, experienceNote)
- 50% (avatars, search circle)
- 999px (field-stamp, disclosure-pill)

### Shadows
- Resting (frame-desktop): `0 1px 2px rgba(0,0,0,0.04), 0 18px 60px -10px rgba(0,0,0,0.18)`
- Card hover: `0 12px 24px -10px rgba(0,0,0,0.18)` on the inner image only
- Tile hover: `0 18px 30px -14px rgba(0,0,0,0.28)`
- Hero hover: `0 24px 50px -18px rgba(0,0,0,0.30)`

---

## Signature Element: "Field Note"

The brand signature. Three forms:

1. **Field Note tag** (`<FieldNoteTag number={47} />`) — small leaf SVG + "Field Note" lockup + "№ 47" in display weight, separated by a 1px rule. Sits above the headline on long-reads.
2. **Strap line** under the homepage masthead echoes the issue number: "Issue 47 · April 2026".
3. **Leaf icon** in the top-right corner of the experienceNote.

The leaf SVG itself is an organic single-stroke leaf with one mid-vein. See `Leaf` component in `tbd-post.jsx`.

The issue number should auto-increment with each new long-read or be tied to a publication month — implementation is up to the dev team (a CMS field, a computed counter, or just baked into the post frontmatter).

---

## State Management

Minimal. Only the post template has stateful behaviour:
- Reading-progress percentage (calculated from scroll, no persistence needed)
- Mobile menu open/closed (boolean)

The newsletter forms in the prototype are non-functional — wire them to whatever ESP the site uses (Mailchimp, Beehiiv, ConvertKit, etc).

---

## Assets

All imagery in the prototype is gradient placeholders (`.illus.review`, `.illus.kids`, `.illus.frame`, etc.). Production must replace these with real photography. Recommended:
- 1 hero image per category section
- 1 cover image per article
- 1 portrait of Daniel for the experienceNote / About panel
- All images warm-toned, soft daylight where possible — to sit comfortably on white paper next to the dusky-rose accent

Icons in the prototype are inline SVG (search, instagram, facebook, email envelope, leaf, burger). Keep as inline SVG in production rather than an icon font.

---

## Files in This Bundle

| File | What it is |
|---|---|
| `The Breaking Dad - Direction A.html` | Top-level entry. Mounts the design-canvas with all artboards. |
| `tbd-styles.css` | **The full design system.** All tokens, components, micro-interactions. This is the source of truth for visuals — port these styles. |
| `tbd-homepage.jsx` | Homepage (desktop + mobile) component code. |
| `tbd-category.jsx` | Category / Hub page (desktop + mobile) — masthead, editor's note, lead pack, pillar TOC, pillar groups, archive. |
| `tbd-post.jsx` | Post template (desktop + mobile) including ReadingProgress, FieldNoteTag, Leaf. |
| `tbd-nav.jsx` | Mobile nav closed/open states + MenuOverlay component. |
| `design-canvas.jsx` | **Prototype scaffolding only** — the pan/zoom canvas wrapper. Do not port. |
| `tweaks-panel.jsx` | **Prototype scaffolding only** — live theme controls. Do not port. |

---

## Notes for Implementation

- The current font on the live site reads as dated. Geist is the single biggest aesthetic upgrade — make sure it loads before first paint (use `<link rel="preload">` for the woff2, or self-host).
- The pink `--paper-tinted` block (#F2D9D2) is lifted directly from the live site — keep this exact value to maintain brand continuity.
- The dusky-rose accent (#A66B6B) is also lifted from the live wordmark. Don't shift it.
- All hover transitions use `cubic-bezier(.2,.7,.3,1)` or `cubic-bezier(.6,.05,.2,1)` — use these consistently for any new interactions you add.
- Reading-progress logic walks up the DOM to find the nearest scroll container. In production this is usually `window`, simpler — but the prototype renders inside a scrolling frame so the walk is necessary. Both implementations are in `tbd-post.jsx#ReadingProgress`.
- Affiliate disclosure pill (`.disclosure-pill`) is styled but not currently placed; add it at the top of any review post per FTC/UK ASA guidance.
