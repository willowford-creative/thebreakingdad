# Diary — Iteration Brief

You're iterating on **The Breaking Dad**. The homepage, post template, category/hub pages, and core design system are already built and live in the repo. **Do not rebuild any of that.**

This bundle adds **one new section: `/diary`**.

## Read in order

1. **`DIARY_NOTES.md`** — full spec for the Diary section, including:
   - Why it exists (E-E-A-T, internal-link spokes to commercial pages)
   - Routes, components, data shape, SEO
   - Imagery rules (hero + end-frame on entry, hover-peek on index)
   - **Anti-thin-content gates** (word-count floor, required fields, auto-noindex, cadence guard, monthly audit) — these MUST be implemented before launch
2. **`tbd-diary.jsx`** — design reference for the four artboards: Index Desktop/Mobile, Entry Desktop/Mobile. Read it for layout, spacing, typography, and the hover-peek interaction. Do **not** port this file directly — it's prototype code.
3. **`tbd-styles.css`** — diff against your live stylesheet. The new blocks are:
   - `.diary-row` (timeline row + hover state)
   - `.diary-peek`, `.diary-peek-frame`, `.diary-peek-img`, `.diary-peek-cap` (hover image preview)
   - `.diary-hero`, `.diary-hero-cap` (entry hero)
   - `.diary-endframe`, `.diary-endframe-img`, `.diary-endframe-cap` (entry postcard)
   - `.diary-prose` (narrower journal prose styles)

## Workflow

1. **Audit first.** Confirm none of these patterns exist already. Surface anything that overlaps with existing components (e.g. breadcrumb, newsletter band, prev/next cards — reuse, don't rebuild).
2. **Surface the diff before writing code.** List: new components needed, existing components reused, new CSS lifted from `tbd-styles.css`, new CMS fields, new routes. Wait for confirmation.
3. **Build the gates first, then the templates.** The CMS-side anti-thin-content rules (`DIARY_NOTES.md` §"Anti-thin-content gates") are the most important part of this pass — without them the section will damage site quality. Wire those before the public templates.
4. **Then build:**
   - `/diary` index (timeline, year filter, month grouping)
   - `/diary/:slug` entry (hero, narrow prose, related-post card, end-frame, signoff, prev/next)
   - Mobile variants
5. **Imagery is real photos.** The CSS gradients in the reference are placeholders. Wire the `heroImage` / `endFrame` fields and ask the editor for real assets before launch.

## Constraints

- Match existing components, file structure, and naming conventions in the live repo.
- Do not scaffold new infrastructure (auth, CMS, build pipeline) — extend what's there.
- Do not touch the homepage, post, category, or nav components unless you're adding a single Diary link to the nav.
- Reference files (`.html`, `.jsx`) are design references — read them, don't port them.
- Ask before adding pages, copy, or content not in the spec.
