# Launch punch list

State of what's left before / after launch. Update as items land.

Last reviewed: 2026-04-30.

## Open — pre-launch

### 1. Diary drafts to lift (11 entries)

Each needs `lede` + `heroCaption` + at least one internal link + 250+ word body to clear the build gates in `src/utils/diaryGates.ts`. Remove `draft: true` once polished.

- [ ] `10-things-you-should-start-doing-for-a-happier-life`
- [ ] `a-letter-to-my-daughter-on-international-womens-day`
- [ ] `best-uk-coffee-subscriptions`
- [ ] `diary-doting-daddy`
- [ ] `follower-focus-the-windsors`
- [ ] `grow-your-parenting-instagram`
- [ ] `our-favourite-parent-bloggers`
- [ ] `our-first-vlog-on-youtube`
- [ ] `this-is-fatherhood`
- [ ] `uk-paternity-leave-not-enough`
- [ ] `you-cant-pour-from-an-empty-cup`

Already shipped (live): `10k-instagram-followers`, `day-in-the-life`, `newbie-windsor-store-launch`, `west-green-house-gardens-hampshire` (now in `/reviews/`).

### 2. ~~Year-archive pages don't exist~~ ✅ Done 2026-05-06

Built `/separated-parents/archive/`, `/reviews/archive/`, `/parenting/archive/` as year-grouped flat lists with CollectionPage + ItemList JSON-LD. Year chips on category pages now link to `${archiveHref}#${year}` instead of no-op `?year=` filter URLs (was creating duplicate-content URLs — bad for SEO). Diary archive untouched (has its own year-routes pattern at `/diary/years/{year}/`).

### 3. ~~Parenting drafts (2)~~ ✅ Done 2026-05-06

Both lifted: `home-activities-for-kids` (2240w) and `raising-strong-daughters` (1329w post-trim). Discovery: 4 live articles linked to these — would have been broken inbound links at launch. Editorial fixes during lift: factual error (separation date 2019 → 2016), British spelling consistency, removed AI-padded "Fostering Independence" rewrite in voice, dropped unsupported "study" citation, stripped broken "10 Compliments" reference.

## Open — optional / non-blocking

### Cloudflare adapter v12 → v13

Current `@astrojs/cloudflare` 12.x emits `entrypointResolution: "explicit"` deprecation at build. Fixed in v13 but it's a major bump — may require small migration. Doesn't block deploy.

## Deferred — post-launch

- Newsletter wiring (Brevo, phase 2 per CLAUDE.md). Form is currently a stub with "Sign-up wired in phase 2" note.
- Search bar (Pagefind, phase 2).
- Tag archive pages (not in v1).
- Pagination (when content volume demands it).

## Reference — recently cleared (Apr 2026)

- All 12 reviews filled in (rating, usageDuration, pros, cons).
- Schema upgrade: optional ratings + half-stars for roundups.
- Internal link audit: ~75 internal links wired, 35 broken legacy URLs cleaned up across 4 phases.
- Reviews page polish: hero stretch, zoom hover, "Most read" rebrand, honest "How we review" copy (bought + gifted, not "I buy everything").
- Site polish: wax-seal favicon, apple-touch-icon, `heroFocus` schema field.
- Scheduled audit agent: a one-time CCR runs 2026-06-10 to re-audit internal links and open a PR. Manage at https://claude.ai/code/routines/trig_01BCZKhsrmgr7M3pb3b2oHXM
