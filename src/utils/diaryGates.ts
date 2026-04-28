/**
 * Diary anti-thin-content gates.
 *
 * Evaluated at build time. Hard failures (errors[]) fail the build via the
 * astro:build:start integration hook in astro.config.mjs. Soft failures
 * (warnings[]) print a yellow banner in the build log and may set
 * shouldNoindex.
 *
 * Spec: docs/design/design_handoff_breaking_dad/diary/DIARY_NOTES.md §"Anti-
 * thin-content gates" (gates 1–6).
 *
 * TODO (later phase): Gate 6 — monthly cron audit that re-scans entries >30
 * days old, pulls Search Console + GA4 stats, and flags zero-impression /
 * high-bounce entries for editorial review. Will be a /schedule agent that
 * uses the Search Console + GA MCPs and posts results, not part of the build.
 */

import type { CollectionEntry } from 'astro:content';

type DiaryEntry = CollectionEntry<'diary'>;

// ───────────────────────────── thresholds ──────────────────────────────

export const DIARY_THRESHOLDS = {
  hardWordFloor: 250,
  softWordFloor: 400,
  autoIndexFloor: 600,
  cadenceWindowDays: 7,
  cadenceCap: 3,
  duplicateLookbackDays: 90,
  duplicateSimilarity: 0.8,
} as const;

// ───────────────────────────── types ───────────────────────────────────

export type GateResult = {
  slug: string;
  title: string;
  publishDate: Date;
  wordCount: number;
  ledeWordCount: number;
  titleWordCount: number;
  readMinutes: number;
  internalLinkCount: number;
  isVignette: boolean;
  shouldNoindex: boolean;
  noindexReasons: string[];
  errors: string[];
  warnings: string[];
};

// ───────────────────────────── helpers ─────────────────────────────────

const WORDS_PER_MINUTE = 230;

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Strip MDX/markdown noise so word-count is honest. Mirrors readingTime.ts
 * intentionally — both should agree on how prose is measured.
 */
function bodyWordCount(body: string): number {
  const stripped = body
    .replace(/^---[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|]/g, ' ');
  return countWords(stripped);
}

/**
 * Count internal links to other content sections. Used by the "≥1 internal
 * link" gate. Matches both markdown links and bare relative paths inside MDX
 * components.
 */
function countInternalLinks(body: string): number {
  const re = /(?:\]\(|href=["'])\/(?:diary|separated-parents|reviews|parenting|about)\//g;
  return (body.match(re) ?? []).length;
}

/**
 * Jaccard similarity over normalised title tokens — close enough to catch
 * near-duplicate headlines without depending on a Levenshtein lib.
 */
function titleSimilarity(a: string, b: string): number {
  const norm = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2),
    );
  const ta = norm(a);
  const tb = norm(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  ta.forEach((w) => {
    if (tb.has(w)) inter++;
  });
  return inter / (ta.size + tb.size - inter);
}

function daysBetween(a: Date, b: Date): number {
  return Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
}

// ───────────────────────────── core evaluator ──────────────────────────

/**
 * Evaluate one entry given the full set of published (non-draft) entries.
 * Mutates nothing; returns a GateResult. Cadence + duplicate gates need the
 * full set, so call this from evaluateAll() rather than per-entry.
 */
function evaluateOne(
  entry: DiaryEntry,
  allPublished: DiaryEntry[],
  alreadyIndexed: Set<string>,
): GateResult {
  const slug = entry.id.replace(/\.(md|mdx)$/, '');
  const body = entry.body ?? '';
  const wc = bodyWordCount(body);
  const ledeWc = countWords(entry.data.lede ?? '');
  const titleWc = countWords(entry.data.title);
  const internalLinkCount =
    countInternalLinks(body) + (entry.data.relatedPostSlug ? 1 : 0);
  const readMinutes = Math.max(1, Math.round(wc / WORDS_PER_MINUTE));
  const isVignette = entry.data.isVignette ?? false;

  const errors: string[] = [];
  const warnings: string[] = [];
  const noindexReasons: string[] = [];

  // Required-fields gates — schema marks these optional so legacy/draft
  // entries don't break content sync. We re-enforce here for non-drafts.
  if (!entry.data.lede) {
    errors.push('Frontmatter missing `lede` — required for the entry hero and og:description.');
  } else if (ledeWc < 30) {
    errors.push(`Lede is ${ledeWc} words; needs at least 30. Expand the opening paragraph.`);
  }
  if (titleWc < 6) {
    errors.push(`Title is ${titleWc} words; needs at least 6.`);
  }
  if (titleWc > 14) {
    errors.push(`Title is ${titleWc} words; needs to be 14 or fewer.`);
  }
  if (!entry.data.heroImage) {
    errors.push('Frontmatter missing `heroImage` — every diary entry needs a real hero photo.');
  }
  if (!entry.data.heroAlt) {
    errors.push('Frontmatter missing `heroAlt` — accessibility text for the hero.');
  }
  if (!entry.data.heroCaption) {
    errors.push('Frontmatter missing `heroCaption` — italic caption shown under the hero.');
  }

  // Gate 1 — word-count hard floor (errors block build)
  if (!isVignette && wc < DIARY_THRESHOLDS.hardWordFloor) {
    errors.push(
      `Word count ${wc} is below the hard floor of ${DIARY_THRESHOLDS.hardWordFloor}. ` +
        `Mark as a vignette (isVignette: true) or expand before publishing.`,
    );
  }

  // Gate 1b — vignette upper bound: a "vignette" claim with 800 words is
  // probably not a vignette. Surface it but don't block.
  if (isVignette && wc > DIARY_THRESHOLDS.softWordFloor) {
    warnings.push(
      `Marked as vignette but is ${wc} words (>${DIARY_THRESHOLDS.softWordFloor}). ` +
        `Vignettes are intentionally short — drop the flag if this is a full entry.`,
    );
  }

  // Gate 2 — required internal link
  if (!isVignette && internalLinkCount === 0) {
    errors.push(
      'No internal links found. Add at least one link to another diary entry, ' +
        'a post, or a review — or set relatedPostSlug in the frontmatter.',
    );
  }

  // Gate 3 — soft floor → auto-noindex (warning, not error)
  if (!isVignette && wc < DIARY_THRESHOLDS.softWordFloor) {
    warnings.push(
      `Word count ${wc} is below the soft floor of ${DIARY_THRESHOLDS.softWordFloor}. ` +
        `Auto-noindex applied — consider expanding to ≥${DIARY_THRESHOLDS.softWordFloor} words.`,
    );
    noindexReasons.push('below-soft-floor');
  }

  // Gate 4 — vignette → forced noindex
  if (isVignette) {
    noindexReasons.push('vignette');
  }

  // Gate 5 — near-duplicate title (within last 90 days)
  for (const other of allPublished) {
    if (other.id === entry.id) continue;
    const otherDays = daysBetween(entry.data.publishDate, other.data.publishDate);
    if (otherDays > DIARY_THRESHOLDS.duplicateLookbackDays) continue;
    const sim = titleSimilarity(entry.data.title, other.data.title);
    if (sim >= DIARY_THRESHOLDS.duplicateSimilarity) {
      const otherSlug = other.id.replace(/\.(md|mdx)$/, '');
      warnings.push(
        `Title is ${(sim * 100).toFixed(0)}% similar to "${other.data.title}" (${otherSlug}) ` +
          `published ${otherDays.toFixed(0)} days apart. Auto-noindex applied.`,
      );
      noindexReasons.push(`near-duplicate:${otherSlug}`);
      break;
    }
  }

  // Gate 6 — cadence cap (rolling 7-day window).
  // Cap counts only entries already marked indexed — older wins, fourth+
  // gets pushed to noindex.
  if (!isVignette) {
    const windowStart = new Date(entry.data.publishDate);
    windowStart.setDate(windowStart.getDate() - DIARY_THRESHOLDS.cadenceWindowDays);
    const indexedInWindow = allPublished.filter((other) => {
      if (other.id === entry.id) return false;
      const otherSlug = other.id.replace(/\.(md|mdx)$/, '');
      if (!alreadyIndexed.has(otherSlug)) return false;
      return (
        other.data.publishDate >= windowStart &&
        other.data.publishDate <= entry.data.publishDate
      );
    }).length;
    if (indexedInWindow >= DIARY_THRESHOLDS.cadenceCap) {
      warnings.push(
        `Cadence cap hit: ${indexedInWindow} other indexed diary entries within ` +
          `${DIARY_THRESHOLDS.cadenceWindowDays} days. Auto-noindex applied — ` +
          `older entries in the window keep their index status.`,
      );
      noindexReasons.push('cadence-cap');
    }
  }

  return {
    slug,
    title: entry.data.title,
    publishDate: entry.data.publishDate,
    wordCount: wc,
    ledeWordCount: ledeWc,
    titleWordCount: titleWc,
    readMinutes,
    internalLinkCount,
    isVignette,
    shouldNoindex: noindexReasons.length > 0,
    noindexReasons,
    errors,
    warnings,
  };
}

/**
 * Evaluate all non-draft diary entries. Iterates oldest-first so the cadence
 * gate's "older wins" rule works correctly.
 */
export function evaluateAll(entries: DiaryEntry[]): GateResult[] {
  const published = entries
    .filter((e) => !e.data.draft)
    .sort((a, b) => a.data.publishDate.getTime() - b.data.publishDate.getTime());

  const alreadyIndexed = new Set<string>();
  const results: GateResult[] = [];

  for (const entry of published) {
    const result = evaluateOne(entry, published, alreadyIndexed);
    if (!result.shouldNoindex && result.errors.length === 0) {
      alreadyIndexed.add(result.slug);
    }
    results.push(result);
  }

  // Sort newest-first for the report.
  return results.sort(
    (a, b) => b.publishDate.getTime() - a.publishDate.getTime(),
  );
}

/**
 * Lookup helper for templates: did this slug get auto-noindexed by the gates?
 * Templates use this to emit <meta name="robots" content="noindex">.
 */
export function shouldNoindexFor(
  results: GateResult[],
  slug: string,
): boolean {
  return results.find((r) => r.slug === slug)?.shouldNoindex ?? false;
}
