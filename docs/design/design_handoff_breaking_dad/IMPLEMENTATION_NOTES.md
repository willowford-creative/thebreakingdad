# Implementation Punch-List — Round 1 Review

Notes from reviewing the first implementation pass against the design spec. Ordered roughly by visual impact.

---

## 1. Pink "Popular content" band is too heavy

**Problem:** The soft-pink section block is pulling too much weight on the page. Saturation is higher than intended and the cards bump the edges with not enough breathing room.

**Fix:**
- Lighten `--paper-tinted` from `#F2D9D2` → `#F8E5E0` (about 20% lighter).
- Increase vertical padding inside `.section-pink` to `72px 40px` (was `56px 40px`).
- Confirm the inner content has `max-width: 1180px; margin: 0 auto;`.

---

## 2. Card images are cropping square — should be 16:10

**Problem:** The 3-up category cards in the implementation are showing near-square images. The design spec uses `aspect-ratio: 16/10` for wide card images, which gives a more editorial proportion and lets titles breathe below.

**Fix:**
- `.card .img.wide { aspect-ratio: 16/10; }` — confirm this class is being applied to the image div in the category cards.
- Default `.card .img` (without `.wide`) is `4/3` — used for smaller related-content cards in the post sidebar.

---

## 3. "About The Breaking Dad" section has a peach placeholder

**Problem:** The right side of the About section is rendering as a solid peach gradient rectangle — that's the design's image placeholder, not intended for production.

**Fix:**
- Replace with a real photograph of Daniel (the author). Even a temporary B&W photo dramatically lifts the whole section.
- Image should be `aspect-ratio: 5/4`, `border-radius: 12px`, `object-fit: cover`.
- Until a real photo is sourced, the section should be hidden or use a much more neutral muted-tone placeholder rather than the peach gradient.

---

## 4. Headline weights look light — Geist may not be loading

**Problem:** Card titles in the implementation read as ~500-weight; the spec is 700. Strongly suggests Geist isn't loading and the page is falling back to system sans (which is lighter at the same weight value).

**Fix:**
- Check the Google Fonts `@import` is present and not blocked by CSP:
  ```
  @import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap");
  ```
- Open DevTools → Network → filter "font" — confirm `Geist-*.woff2` requests succeed (200).
- If self-hosting fonts, ensure all weights 400/500/600/700/800 are included.
- Verify `font-family: "Geist", -apple-system, ...` is actually applying (Computed tab in DevTools).

---

## 5. Hero card overlay is too weak — text hard to read

**Problem:** "CMS Changes 2026..." headline is sitting on imagery without enough contrast at the bottom.

**Fix:**
```css
.hero-card .overlay {
  background: linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.7) 100%);
}
```
(Was: `35%` start, `0.55` end. New: `25%` start, `0.7` end.)

---

## 6. Footer wordmark — confirm it's white

**Problem:** In the dark footer, "Breaking Dad" wordmark is hard to read — looks like it's still rendering in the dusky-rose accent colour.

**Fix:**
- The CSS rule `.site-footer .wordmark { color: #fff; }` exists — confirm specificity isn't being lost.
- If `.wordmark` is set on an inner span and another rule overrides it, add `!important` or increase specificity:
  ```css
  footer.site-footer .wordmark { color: #fff !important; }
  ```

---

## 7. Section spacing rhythm needs more contrast

**Problem:** Sections in the implementation are roughly evenly spaced — the page reads as one continuous scroll. The design intends more rhythm: tight inside sections, generous between them.

**Fix:**
- Padding **between** major sections (homepage hero → article rows → pink band → category sections → about): `80-96px` vertical.
- Padding **inside** sections (between section heading and first item): `24-32px`.
- Specifically: increase top/bottom padding on `.section-pink` and the category sections to ~`80px`.

---

## 8. Missing: reading-progress bar + Field Note signature

**Problem:** These two elements were added in the most recent design pass; if the dev was working from an earlier export they won't be there.

**Fix:**

### Reading-progress bar
2px dusky-rose bar fixed to top of the viewport, tracks scroll position **through the article element only** (not the whole page). Appears on `PostDesktop` and `PostMobile`.

```css
.read-progress {
  position: fixed; top: 0; left: 0;
  height: 2px; width: 0%;
  background: var(--accent);
  z-index: 1000;
  transition: width .08s linear;
  pointer-events: none;
}
```

JS: on scroll, calculate `% = -rect.top / (rect.height - viewport.height)` for the article container, clamp 0–1, set `width`.

### Field Note signature
Small leaf-icon stamp that sits above the headline on long-reads, in the homepage strap line, and in the corner of the experienceNote block. It's the brand "thing" — used sparingly.

```jsx
<div className="field-note-tag">
  <Leaf size={14} /> Field Note
  <span className="num">№ 47</span>
</div>
```

CSS spec is in `tbd-styles.css` under `.field-note-tag`, `.leaf`, `.field-stamp`, `.field-mark`.

Homepage strap line (under masthead):
> "Honest field notes from a UK dad — co-parenting, blended family, starting again. · Issue 47 · April 2026"

---

## 9. Micro-interactions — confirm hovers feel right

The design includes:
- Cards lift `translateY(-2px)` + soft shadow on hover
- Card images zoom subtly (`transform: scale(1.04)`)
- Wordmark gets an animated underline grow
- Nav links underline-grow from left
- "More →" arrow nudges right (gap grows from 4px → 8px)
- Side-list items swipe left with a small accent bar

If hover states are missing or feel flat, refer to the "Micro-interactions" section in `tbd-styles.css` (line ~470 onward).

---

## Reference files

- `tbd-styles.css` — full token + component spec
- `The Breaking Dad - Direction A.html` — interactive design canvas
- `tbd-homepage.jsx` — homepage components
- `tbd-post.jsx` — post template + ReadingProgress + FieldNoteTag
- `tbd-nav.jsx` — mobile menu

Once these are addressed, ping for a second review pass.
