# Diary — Implementation Notes for Claude Code

A new section: `/diary`. Personal, dated, narrative pieces. Visually distinct from Posts — narrower column, date-stamp signature, reduced chrome.

## Why this exists
Strengthens **Experience** signal in E-E-A-T (first-hand, regularly published narrative). Diary entries link out to Posts/Reviews — they're hub-spokes that push internal authority to commercial pages, not competitors to them.

---

## Anti-thin-content gates

Build these gates before launching `/diary`. They prevent low-value entries from being indexed and from harming overall site quality signal.

### 1. Word-count floor (CMS-side)
- **Soft warning**: < 400 words → CMS shows yellow banner: "This is shorter than most diary entries. Consider expanding or marking as a vignette."
- **Hard block**: < 250 words → cannot publish. Save-as-draft only.
- **Vignette format**: explicit checkbox "This is a vignette (200–400 words, intentionally short)". Vignettes are allowed but get `<meta name="robots" content="noindex">` automatically.

### 2. Required fields before publish
A diary entry cannot be published without all of:
- Date (auto-filled, locked once published)
- Title (min 6 words, max 14 — enforce in CMS)
- Lede / first paragraph (min 30 words — used as `og:description`)
- At least 1 internal link to a Post, Review, or other Diary entry
- Author selected

### 3. Index-noindex thresholds
- **Auto-noindex**: vignettes (< 400 w), entries with no outbound internal links, entries with > 60% boilerplate (compare against last 5 entries — flag near-duplicates).
- **Auto-index**: ≥ 600 words, ≥ 1 internal link, unique title (no other entry with > 80% title similarity in last 90 days).
- Show the calculated index/noindex state in the CMS preview before publish. Editor can override either way.

### 4. Cadence guard
- Soft cap: max 3 published-and-indexed diary entries per week. Beyond that, new entries publish as `noindex` until the rolling 7-day count drops. Prevents accidental spam from a writing burst.

### 5. Quality preview
Before "Publish", CMS shows a checklist:
- [ ] Word count: NNN ✅ / ⚠️
- [ ] Internal links: N ✅ / ❌
- [ ] Title length: 9 words ✅
- [ ] Reading time: ~6 min ✅
- [ ] Similar to recent entry? No ✅ / ⚠️ "Looks similar to '<title>' (78%)"
- [ ] Index status: **Will be indexed** / **Will be noindex (vignette)**

### 6. Periodic audit
Monthly cron: re-scan diary entries published > 30 days ago. If any have:
- Zero organic impressions in Search Console
- Bounce rate > 90%
- Time-on-page < 30s

…flag for editorial review. Either rewrite, merge into a related post, or `noindex`.

---

## Routes
- `/diary` — index (timeline, reverse-chronological, grouped by month)
- `/diary/:slug` — single entry
- `/diary?year=YYYY` — filtered timeline
- `/diary/archive` — full flat archive (paginated)

## Components

### `<DateStamp>` — the diary signature
Replaces `<FieldNoteTag>` on diary entries. Three sizes: `lg` (entry header, 56px numeral), `md` (mobile entry, 36px), `sm` (related rows, 22px). Vertical-rule borders left+right, accent-rose day-of-week eyebrow, large display numeral, small uppercase month/year.

### `<DiaryMasthead>` (index)
Centered, 760px column. Eyebrow ("The Diary"), 72px headline ("**Field notes,** dated." — italic Newsreader on first two words, sans on the rest), lede, meta line.

### `<DiaryTimeline>`
Year filter pills → month label (24px, with entry count) → `.diary-row` rows (60–90px date column / divider / title + dek + read-time). Hover: row inset 12px, title to accent.

### `<DiaryEntry>` (template)
- 680px max-width, much narrower than Post template (was 760px).
- DateStamp centred at top, headline centred, single byline + read-time + No.
- Body: opening italic-Newsreader paragraph (sets the diary voice), then standard prose at 18px / 1.75 line-height.
- Inline "Related, properly" card → forces an internal link to the relevant Post/Review.
- Sign-off: "— Daniel" in italic accent, location/time tag, **Reply by email** mailto button.
- Prev / next entry cards (date + title).

### `<DiaryNewsletterBand>`
Variant of the homepage band, framed around getting diary entries by email.

## Imagery

Diary entries get a **hero image** at the top and an optional **end-frame** (a postcard-style closing image, slightly rotated) at the bottom. Both are real photos — grainy, desaturated, snapshot-feel — not stock.

The **index timeline stays text-only by default**. On row hover, a small polaroid (`.diary-peek`) fades in to the right of the row, lightly rotated, with an italic caption underneath. This rewards exploration without breaking the editorial rhythm of the spine layout. On mobile, the peek is hidden — image weight comes from the entry hero only.

### Image rules
- Hero: 16:9, ~1600×900, JPEG, `loading="eager"`, ~120kb after compression
- End-frame: 1:1, ~800×800, optional — only when there's a genuinely meaningful closing image
- Peek thumbnails: square crop of hero, ~336×336, lazy-loaded
- All images: subtle desaturation filter (`saturate(0.82) contrast(1.04)`) baked in via CSS, not the asset itself — keeps source untouched
- Caption mandatory on every image, italic Newsreader, 13px desktop / 11px mobile

### Data shape
```ts
type DiaryEntry = {
  slug: string;
  publishedAt: ISODate;       // locked once published
  title: string;
  lede: string;               // ≥30 words, used as og:description
  body: MDX;
  authorId: string;
  wordCount: number;          // computed, used by gates
  readMinutes: number;
  isVignette: boolean;        // forces noindex
  internalLinks: string[];    // slugs of linked posts/entries
  location?: string;          // 'Leeds'
  signOffTime?: string;       // 'Tuesday evening'
  prevSlug?: string;
  nextSlug?: string;
  relatedPostSlug?: string;   // the 'Related, properly' card
  heroImage: { src: string; alt: string; caption: string };       // required
  endFrame?: { src: string; alt: string; caption: string };       // optional
  // peek thumbnail is auto-derived from heroImage server-side
};
```

## SEO
- `og:type=article`, `article:published_time`, `article:author`
- Schema.org: `BlogPosting` with `wordCount`, `datePublished`, `author`
- Canonical = `/diary/:slug`
- `noindex` set by gates (vignette / no-links / cadence-cap / audit-flagged)

## Reference files
- `tbd-diary.jsx` — DiaryIndexDesktop, DiaryEntryDesktop, mobile variants
- `tbd-styles.css` — `.diary-row`, `.diary-prose` blocks
- `The Breaking Dad - Direction A.html` — Diary section in canvas
