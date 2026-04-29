import { describe, it, expect } from 'vitest';
import { evaluateAll, DIARY_THRESHOLDS } from '../diaryGates';

type DiaryEntry = Parameters<typeof evaluateAll>[0][number];

const baseDate = new Date('2025-06-01');

type EntryOverrides = {
  slug: string;
  body?: string;
  title?: string;
  lede?: string;
  publishDate?: Date;
  heroImage?: string | undefined;
  heroAlt?: string | undefined;
  heroCaption?: string | undefined;
  isVignette?: boolean;
  draft?: boolean;
  relatedPostSlug?: string;
};

const DEFAULT_LEDE =
  'A perfectly long lede that has well over thirty words in it so the gate is satisfied without any complaint at all from the validator under any reading whatsoever, comfortably above the floor.';

function makeEntry(overrides: EntryOverrides): DiaryEntry {
  return {
    id: `${overrides.slug}.mdx`,
    body: overrides.body ?? 'word '.repeat(500),
    data: {
      title: overrides.title ?? 'Six word title for the entry',
      // `'key' in obj` distinguishes "not passed" from "passed as undefined" so
      // tests can explicitly null out a field to assert error behaviour.
      lede: 'lede' in overrides ? overrides.lede : DEFAULT_LEDE,
      publishDate: overrides.publishDate ?? baseDate,
      heroImage: 'heroImage' in overrides ? overrides.heroImage : '/images/hero.jpg',
      heroAlt: 'heroAlt' in overrides ? overrides.heroAlt : 'hero alt',
      heroCaption: 'heroCaption' in overrides ? overrides.heroCaption : 'hero caption',
      isVignette: overrides.isVignette ?? false,
      draft: overrides.draft ?? false,
      relatedPostSlug: overrides.relatedPostSlug,
    },
  } as unknown as DiaryEntry;
}

describe('evaluateAll', () => {
  it('skips entries marked draft: true', () => {
    const results = evaluateAll([
      makeEntry({ slug: 'draft-one', draft: true, lede: undefined }),
    ]);
    expect(results).toHaveLength(0);
  });

  it('passes a fully-formed entry with no errors or warnings', () => {
    const results = evaluateAll([
      makeEntry({ slug: 'good', body: 'word '.repeat(700) + ' [link](/about/)' }),
    ]);
    expect(results).toHaveLength(1);
    expect(results[0].errors).toEqual([]);
    expect(results[0].warnings).toEqual([]);
    expect(results[0].shouldNoindex).toBe(false);
  });

  describe('required fields', () => {
    it('errors when lede is missing', () => {
      const results = evaluateAll([makeEntry({ slug: 'no-lede', lede: undefined })]);
      expect(results[0].errors.some((e) => e.includes('lede'))).toBe(true);
    });

    it('errors when heroCaption is missing', () => {
      const results = evaluateAll([makeEntry({ slug: 'no-cap', heroCaption: undefined })]);
      expect(results[0].errors.some((e) => e.includes('heroCaption'))).toBe(true);
    });

    it('errors when heroImage is missing', () => {
      const results = evaluateAll([makeEntry({ slug: 'no-hero', heroImage: undefined })]);
      expect(results[0].errors.some((e) => e.includes('heroImage'))).toBe(true);
    });

    it('errors when heroAlt is missing', () => {
      const results = evaluateAll([makeEntry({ slug: 'no-alt', heroAlt: undefined })]);
      expect(results[0].errors.some((e) => e.includes('heroAlt'))).toBe(true);
    });
  });

  describe('title length', () => {
    it('errors when title is fewer than 6 words', () => {
      const results = evaluateAll([makeEntry({ slug: 'short-title', title: 'Three word title' })]);
      expect(results[0].errors.some((e) => e.includes('Title'))).toBe(true);
    });

    it('errors when title is more than 14 words', () => {
      const long = 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen';
      const results = evaluateAll([makeEntry({ slug: 'long-title', title: long })]);
      expect(results[0].errors.some((e) => e.includes('14 or fewer'))).toBe(true);
    });
  });

  describe('lede length', () => {
    it('errors when lede has fewer than 30 words', () => {
      const results = evaluateAll([
        makeEntry({ slug: 'short-lede', lede: 'Only ten words here for the lede length test thank you.' }),
      ]);
      expect(results[0].errors.some((e) => e.includes('Lede'))).toBe(true);
    });
  });

  describe('word count', () => {
    it('errors when body word count is below the hard floor', () => {
      const results = evaluateAll([makeEntry({ slug: 'thin', body: 'word '.repeat(50) + ' [a](/about/)' })]);
      expect(results[0].errors.some((e) => e.includes(`hard floor of ${DIARY_THRESHOLDS.hardWordFloor}`))).toBe(true);
    });

    it('warns + noindexes when body is below the soft floor but above the hard floor', () => {
      const results = evaluateAll([
        makeEntry({ slug: 'midthin', body: 'word '.repeat(300) + ' [a](/about/)' }),
      ]);
      expect(results[0].errors).toEqual([]);
      expect(results[0].warnings.some((w) => w.includes('soft floor'))).toBe(true);
      expect(results[0].shouldNoindex).toBe(true);
      expect(results[0].noindexReasons).toContain('below-soft-floor');
    });
  });

  describe('vignettes', () => {
    it('skips the hard word floor when isVignette is true', () => {
      const results = evaluateAll([
        makeEntry({
          slug: 'vignette',
          body: 'word '.repeat(100) + ' [a](/about/)',
          isVignette: true,
        }),
      ]);
      expect(results[0].errors).toEqual([]);
    });

    it('forces noindex on vignettes', () => {
      const results = evaluateAll([
        makeEntry({
          slug: 'vignette',
          body: 'word '.repeat(100) + ' [a](/about/)',
          isVignette: true,
        }),
      ]);
      expect(results[0].shouldNoindex).toBe(true);
      expect(results[0].noindexReasons).toContain('vignette');
    });

    it('warns when a vignette is suspiciously long', () => {
      const results = evaluateAll([
        makeEntry({
          slug: 'long-vignette',
          body: 'word '.repeat(500) + ' [a](/about/)',
          isVignette: true,
        }),
      ]);
      expect(results[0].warnings.some((w) => w.includes('vignette'))).toBe(true);
    });
  });

  describe('internal links', () => {
    it('errors when there are no internal links and no relatedPostSlug', () => {
      const results = evaluateAll([
        makeEntry({ slug: 'no-links', body: 'word '.repeat(700) }),
      ]);
      expect(results[0].errors.some((e) => e.includes('internal links'))).toBe(true);
    });

    it('counts a relatedPostSlug as an internal link', () => {
      const results = evaluateAll([
        makeEntry({
          slug: 'related-only',
          body: 'word '.repeat(700),
          relatedPostSlug: 'some-other-post',
        }),
      ]);
      expect(results[0].errors).toEqual([]);
      expect(results[0].internalLinkCount).toBeGreaterThan(0);
    });
  });

  describe('cadence', () => {
    it('noindexes the 4th entry within a 7-day window', () => {
      // Distinct titles so the duplicate-title gate doesn't preempt the
      // cadence gate (titleSimilarity >= 0.8 triggers near-duplicate).
      const entries = [
        makeEntry({ slug: 'a', title: 'Alpha entry about morning routines daily', body: 'word '.repeat(700) + ' [x](/about/)', publishDate: new Date('2025-06-01') }),
        makeEntry({ slug: 'b', title: 'Bravo evening winding down quietly tonight', body: 'word '.repeat(700) + ' [x](/about/)', publishDate: new Date('2025-06-02') }),
        makeEntry({ slug: 'c', title: 'Charlie weekend gardening adventures with kids', body: 'word '.repeat(700) + ' [x](/about/)', publishDate: new Date('2025-06-03') }),
        makeEntry({ slug: 'd', title: 'Delta swimming lessons started this term', body: 'word '.repeat(700) + ' [x](/about/)', publishDate: new Date('2025-06-04') }),
      ];
      const results = evaluateAll(entries);
      const dResult = results.find((r) => r.slug === 'd')!;
      expect(dResult.noindexReasons).toContain('cadence-cap');
    });
  });

  describe('duplicate titles', () => {
    it('noindexes near-duplicate titles within the lookback window', () => {
      const results = evaluateAll([
        makeEntry({
          slug: 'a',
          title: 'Six word title that repeats nearly identical here',
          publishDate: new Date('2025-06-01'),
          body: 'word '.repeat(700) + ' [x](/about/)',
        }),
        makeEntry({
          slug: 'b',
          title: 'Six word title that repeats nearly identical here',
          publishDate: new Date('2025-06-15'),
          body: 'word '.repeat(700) + ' [x](/about/)',
        }),
      ]);
      const bResult = results.find((r) => r.slug === 'b')!;
      expect(bResult.noindexReasons.some((r) => r.startsWith('near-duplicate:'))).toBe(true);
    });
  });
});
