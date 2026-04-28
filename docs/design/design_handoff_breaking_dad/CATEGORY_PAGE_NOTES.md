# Category Page — Implementation Notes for Claude Code

Recommendations for building the new Category / Hub page (e.g. `/parenthood`). Read alongside `README.md` (Section 3 + 4) and `tbd-styles.css`.

The design replaces the live category page (`thebreakingdad.co.uk/parenthood`), which currently runs a flat 4-column grid with no framing. The new page is a *section masthead* with structured navigation through the topic.

---

## Build Order

1. **Reusable `<CategoryMasthead>` component** — used by every section (`/parenthood`, `/separated-parents`, `/reviews`, `/things-to-do`, `/work-with-me`).
2. **`<EditorNoteCard>` component** — sits beside the masthead. Pulls a per-category quote + author from CMS.
3. **`<LeadPack>` component** — 1 hero + 2 supporting. Editor-curated, not auto-sorted by date.
4. **`<PillarTOC>` component** — numbered table of contents.
5. **`<PillarGroup>` component** — section head + 3-up card grid. Reused N times per category.
6. **`<CategoryNewsletterBand>`** — full-bleed pink, mid-page. (Variant of homepage newsletter, do not duplicate.)
7. **`<ArchiveFooter>` component** — "Looking for something specific?" + year pill chips.
8. **Mobile chip strip** — horizontal-scroll sub-topic filter.

---

## Data Shape

Each Category route needs:

```ts
type Category = {
  slug: string;              // 'parenthood'
  number: string;            // '01'  (for the Field Note tag — section number)
  title: string;             // 'Parenthood'
  lede: string;              // The skills, the philosophy...
  pieceCount: number;        // 84
  cadence: string;           // 'Updated weekly'
  pillars: Pillar[];         // 5 pillars
  editorNote: {
    quote: string;
    authorId: string;        // resolves to avatar + name + role
  };
  startHere: { hero: PostRef; supporting: PostRef[]; };  // editor-curated
};

type Pillar = {
  slug: string;              // 'raising-kids'  (anchor + filter param)
  title: string;             // 'Raising kids'
  dek: string;               // 'The skills, the philosophy...'
  count: number;             // 28
  featuredPieces: PostRef[]; // 3-4 pieces shown in the pillar group
};
```

Pillars and the 3 "start here" pieces are **editor-curated** — exposed as CMS fields rather than computed by date. The implementation should support a fallback (most-recent within pillar) so a fresh category isn't empty.

---

## Component Specs

### `<CategoryMasthead>`

```jsx
<section className="cat-masthead">
  <FieldNoteTag label="Section" number={category.number} />
  <h1 className="display-1" style={{ fontSize: 76 }}>{category.title}</h1>
  <p className="lede" style={{ fontSize: 21 }}>{category.lede}</p>
  <div className="meta-row">
    <strong>{category.pieceCount}</strong> pieces · {category.cadence} · {category.pillars.length} sub-topics
  </div>
</section>
```

- `<FieldNoteTag label="Section" number="01">` is a generalisation of the existing post-only `<FieldNoteTag>` — pass a `label` prop so it can read "Field Note", "Section", etc.
- Headline drops to 44px on mobile (`< 768px`).

### `<EditorNoteCard>`

- Background `var(--paper-tinted-2)`, 1px `var(--accent-soft)` border, 12px radius.
- Eyebrow (rose) + Newsreader-italic quote + 1px-soft top-border + author row (32px gradient avatar + name + role).
- Per-category quote stored in CMS. The author is usually Daniel but the prop should accept any author so a guest editor can intro a category.

### `<LeadPack>`

- 1.55fr / 1fr grid, 28px gap.
- Hero: 5:4 aspect, `.hero-card` styles, 32px title.
- Supporting cards stack vertically with 20px gap. Each: 5:3 image / eyebrow / 19px title / meta.

### `<PillarTOC>`

- Use the new `.pillar-row` styles in `tbd-styles.css` (see "Pillar TOC rows" block).
- Numbered with `String(i + 1).padStart(2, "0")`.
- Anchor links to `#${pillar.slug}` — pillar groups must have matching `id` attributes so in-page navigation works.
- On mobile: `.pillar-row` collapses to a 32px / 1fr / auto grid with the count on the right.

### `<PillarGroup>`

```jsx
<section id={pillar.slug}>
  <header className="pillar-head">  {/* 1px bottom rule */}
    <div>
      <div className="eyebrow eyebrow-accent">{pillar.title}</div>
      <h2>{pillar.title}</h2>             {/* 30px */}
      <p>{pillar.dek}</p>                 {/* 15px, ink-2 */}
    </div>
    <a className="more">More in {pillar.title} →</a>
  </header>
  <div className="grid-3">
    {pillar.featuredPieces.map(p => <PostCard variant="wide" {...p} />)}
  </div>
</section>
```

- Use the existing `.card` styles. Image is `.img.wide` (16:10) per the design spec.
- The 4-card variant in the design (Kit & gear) is just `.featuredPieces` having 4 items — the grid should reflow. Decide CMS-side: standard count is 3, allow 4 for "denser" pillars.

### `<CategoryNewsletterBand>`

- Full-bleed `section-pink`. Constrain inner content to `max-width: 760px`, centred.
- Copy is editable per-category in CMS, but defaults to the global "Field Notes letter" copy.
- Email input + button on a 460px row, social-proof line below in `meta` style.
- This is a **variant** of the homepage newsletter — share the underlying form/ESP wiring, vary the framing copy.

### `<ArchiveFooter>`

- 2-col grid (1fr / 1fr), 1px top rule, 32px top padding.
- Left: eyebrow + 24px h3 + meta + 2 ghost CTAs.
- Right: eyebrow + year pill chips. Active year: `var(--accent)` border + `var(--accent-soft)` fill + `var(--accent-deep)` text.
- Year list comes from a "years with posts in this category" aggregation. Active year = current category-filter year (URL param `?year=2026`).

### Mobile chip strip

- Horizontal scrolling `display: flex; overflow-x: auto; scrollbar-width: none;` with the chips inline.
- "All" chip is active on the bare category URL. Subsequent chips link to `/parenthood?pillar=raising-kids` (or scroll to the pillar group if you'd prefer not to filter).
- Active state matches the year-pill active state (rose border + soft-rose fill).

---

## CSS — What's New

The category page introduces a new `.pillar-row` style block. It's already in `tbd-styles.css`:

```css
.pillar-row {
  display: grid;
  grid-template-columns: 56px 1fr 110px 28px;
  gap: 24px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid var(--rule);
  /* ... see source */
}
```

Everything else (cards, hero, eyebrows, meta, section heads, newsletter, ghost buttons, pill chips composed inline) reuses existing tokens — **no new colors or font sizes were added**.

---

## Routing & SEO

- URL pattern: `/{category-slug}` — root level, no `/category/` prefix. Matches the live site.
- `<title>`: `{Category title} — The Breaking Dad`
- `<meta name="description">`: use the `lede`.
- Open Graph image: the hero of the "start here" pack.
- Pillar groups should each have `id="${pillar.slug}"` so deep-links from the TOC and from external sources work.
- Year filter as `?year=YYYY` query, falls back to the full archive when omitted.
- Pagination is **not** on this page — the page is a curated landing. The `Browse the full archive →` CTA goes to a flat archive view (`/{category-slug}/archive`) where pagination lives.

---

## Behaviour

- TOC anchor click → smooth scroll to the pillar group. **Do not** use `scrollIntoView` (it can break framing); compute the offset and call `window.scrollTo({ top, behavior: 'smooth' })`.
- Pillar `id` should account for sticky header offset (CSS: `scroll-margin-top: 80px;` on each pillar section).
- Hover states on the pillar TOC rows: 12px left padding shift + accent color on title + 6px right shift on the arrow. Use the existing `cubic-bezier(.2,.7,.3,1)` easing.
- Year pills: clicking a year navigates to the archive with that year filter pre-applied.

---

## Recommendations Beyond This Page

A few things worth raising while we're here:

1. **Make `<FieldNoteTag>` polymorphic** — currently post-only. Generalise so it can read "Field Note", "Section", "Issue" etc. with a `label` prop. Used now on posts (Field Note № 47), category pages (Section № 01), and likely the homepage strap (Issue № 47).
2. **Pillar metadata should live with the category, not be hard-coded** in templates. Five pillars is right for Parenthood; Reviews probably has 3 (Family, Tech, Lifestyle); Things To Do may not have pillars at all and should fall back to a flat list. Make pillars optional.
3. **Editor's note card is per-category content** — add a CMS field for it. Even a single sentence lifts the page.
4. **The "Start here" pack supersedes the live "ones to read first" section.** Don't ship both — the new component is the canonical home for editor-picked entries.
5. **Add `og:type=website` for category pages**, `og:type=article` for posts. The live site uses `article` everywhere.
6. **Date semantics**: the year-pill archive assumes posts have an authoritative published date. If post dates have drifted (republished/updated dates being treated as published), audit and fix before shipping the year filter.

---

## QA Checklist

- [ ] Geist loads before first paint (preload the woff2)
- [ ] Pillar IDs match TOC anchor hrefs (no broken jump links)
- [ ] `scroll-margin-top` set on pillar sections (so anchored content isn't hidden under any sticky header)
- [ ] Hover state on `.pillar-row` works (padding-left shift + arrow nudge)
- [ ] Year pills have correct active state on `?year=YYYY`
- [ ] Mobile chip strip scrolls horizontally with no visible scrollbar
- [ ] Newsletter band's email input is wired to the same ESP as the homepage form (don't fork the wiring)
- [ ] Editor's note card hides cleanly if `editorNote.quote` is empty (some categories may not have one yet)
- [ ] `<FieldNoteTag>` accepts the new `label` prop without breaking the post template
- [ ] Empty-pillar fallback works (most-recent posts in pillar surface if no `featuredPieces` curated)

---

## Reference Files

- `The Breaking Dad - Direction A.html` — interactive design canvas, "Category / Hub page — Parenthood" section
- `tbd-category.jsx` — reference component code (do not port directly; recreate in target stack)
- `tbd-styles.css` — `.pillar-row` block + all reused tokens
