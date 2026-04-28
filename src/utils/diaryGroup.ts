/**
 * Group diary entries into month buckets for timeline rendering. Returns
 * groups in newest-first order (each group's entries are also newest-first).
 */

import type { CollectionEntry } from 'astro:content';

type DiaryEntry = CollectionEntry<'diary'>;

export type MonthGroup = {
  /** "YYYY-MM" key */
  key: string;
  /** "April 2026" label */
  label: string;
  entries: DiaryEntry[];
};

export function groupByMonth(entries: DiaryEntry[]): MonthGroup[] {
  const sorted = entries
    .slice()
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
  const map = new Map<string, MonthGroup>();
  for (const e of sorted) {
    const d = e.data.publishDate;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!map.has(key)) {
      const label = new Intl.DateTimeFormat('en-GB', {
        month: 'long',
        year: 'numeric',
      }).format(d);
      map.set(key, { key, label, entries: [] });
    }
    map.get(key)!.entries.push(e);
  }
  return Array.from(map.values());
}

/**
 * Year breakdown for the year-pill rail. Sorted newest-first; includes total.
 */
export function countByYear(entries: DiaryEntry[]): Array<{ year: number; count: number }> {
  const counts = new Map<number, number>();
  for (const e of entries) {
    const y = e.data.publishDate.getFullYear();
    counts.set(y, (counts.get(y) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year - a.year);
}

/**
 * Derive a peek thumbnail object for index rows. The spec says "square crop
 * of hero, ~336×336" which we'd ideally generate via Sharp at build time. For
 * now we point at the same heroImage URL — Sharp resizing is a separate
 * follow-up. The CSS already handles aspect ratio + cropping via
 * `background-position: center; object-fit: cover`.
 */
export function peekFromEntry(
  e: DiaryEntry,
): { src: string; alt: string; caption: string } | undefined {
  if (!e.data.heroImage) return undefined;
  return {
    src: e.data.heroImage,
    alt: e.data.heroAlt ?? e.data.title,
    caption: e.data.heroCaption ?? '',
  };
}
