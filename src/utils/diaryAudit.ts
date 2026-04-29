/**
 * Diary audit log writer.
 *
 * Runs at build time via `getDiaryAuditResults()` (memoised — first page that
 * imports it triggers the audit, subsequent calls reuse the promise). Writes:
 * - docs/diary-audit-log.md — human-readable report, committed to repo so the
 *   editor can see at a glance which entries are noindexed and why.
 * - Loud console output during the build so warnings can't be missed in CI.
 *
 * Hard errors throw — the build fails with a clear, per-entry message.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { GateResult } from './diaryGates';

const ANSI = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

/**
 * Print a build-log summary. Returns true if any entry has hard errors —
 * caller throws to fail the build.
 */
export function logToConsole(results: GateResult[]): boolean {
  const errored = results.filter((r) => r.errors.length > 0);
  const warned = results.filter((r) => r.warnings.length > 0);
  const noindexed = results.filter((r) => r.shouldNoindex);

  console.log('');
  console.log(`${ANSI.bold}Diary gates — ${results.length} published entries${ANSI.reset}`);

  if (results.length === 0) {
    console.log(`${ANSI.dim}  (no non-draft diary entries to audit)${ANSI.reset}`);
    return false;
  }

  if (errored.length > 0) {
    console.log(`${ANSI.red}${ANSI.bold}  ✗ ${errored.length} entries have hard errors${ANSI.reset}`);
    for (const r of errored) {
      console.log(`${ANSI.red}    /${r.slug} — ${r.title}${ANSI.reset}`);
      for (const e of r.errors) console.log(`${ANSI.red}      • ${e}${ANSI.reset}`);
    }
  }

  if (warned.length > 0) {
    console.log(`${ANSI.yellow}  ⚠ ${warned.length} entries with warnings${ANSI.reset}`);
    for (const r of warned) {
      console.log(`${ANSI.yellow}    /${r.slug} — ${r.title}${ANSI.reset}`);
      for (const w of r.warnings) console.log(`${ANSI.yellow}      • ${w}${ANSI.reset}`);
    }
  }

  if (noindexed.length > 0) {
    console.log(
      `${ANSI.dim}  ${noindexed.length} entries auto-noindexed: ` +
        `${noindexed.map((r) => r.slug).join(', ')}${ANSI.reset}`,
    );
  }

  if (errored.length === 0 && warned.length === 0) {
    console.log(`${ANSI.green}  ✓ all entries pass${ANSI.reset}`);
  }
  console.log('');

  return errored.length > 0;
}

/**
 * Write the persistent audit log. Path is repo-root-relative so the file is
 * easy to find. Uses Astro config root as the base.
 */
export async function writeAuditLog(
  results: GateResult[],
  rootDir: string,
): Promise<void> {
  const path = resolve(rootDir, 'docs/diary-audit-log.md');
  await mkdir(dirname(path), { recursive: true });

  const errored = results.filter((r) => r.errors.length > 0);
  const noindexed = results.filter((r) => r.shouldNoindex);
  const indexed = results.filter((r) => !r.shouldNoindex && r.errors.length === 0);

  const lines: string[] = [];
  lines.push('# Diary audit log');
  lines.push('');
  lines.push(
    `Generated automatically by the Astro build. Last updated: ${formatDate(new Date())}.`,
  );
  lines.push('');
  lines.push(
    'This file lists the index/noindex state of every published diary entry, plus any ' +
      'gate warnings or errors. See `src/utils/diaryGates.ts` for the rules.',
  );
  lines.push('');

  // Summary
  lines.push(`- **Total published**: ${results.length}`);
  lines.push(`- **Indexable**: ${indexed.length}`);
  lines.push(`- **Auto-noindexed**: ${noindexed.length}`);
  lines.push(`- **Hard errors (blocking build)**: ${errored.length}`);
  lines.push('');

  // Auto-noindexed section — most important
  if (noindexed.length > 0) {
    lines.push('## Auto-noindexed entries');
    lines.push('');
    lines.push(
      'These entries are live but carry `<meta name="robots" content="noindex">`. ' +
        'Edit the entry (expand, add internal links, drop the vignette flag, retitle) ' +
        'to make them indexable.',
    );
    lines.push('');
    lines.push('| Slug | Title | Date | Reason(s) |');
    lines.push('|------|-------|------|-----------|');
    for (const r of noindexed) {
      lines.push(
        `| \`${r.slug}\` | ${r.title} | ${formatDate(r.publishDate)} | ${r.noindexReasons.join(', ')} |`,
      );
    }
    lines.push('');
  }

  // Errored
  if (errored.length > 0) {
    lines.push('## Hard errors');
    lines.push('');
    lines.push('These block the build until fixed.');
    lines.push('');
    for (const r of errored) {
      lines.push(`### \`${r.slug}\` — ${r.title}`);
      for (const e of r.errors) lines.push(`- ${e}`);
      lines.push('');
    }
  }

  // Full table
  lines.push('## All entries');
  lines.push('');
  lines.push(
    '| Slug | Date | Words | Links | Index? | Notes |',
  );
  lines.push('|------|------|-------|-------|--------|-------|');
  for (const r of results) {
    const idx = r.errors.length > 0 ? 'error' : r.shouldNoindex ? 'noindex' : 'index';
    const notes = [
      ...r.errors.map((e) => `❌ ${e}`),
      ...r.warnings.map((w) => `⚠️ ${w}`),
    ].join('<br>') || '—';
    lines.push(
      `| \`${r.slug}\` | ${formatDate(r.publishDate)} | ${r.wordCount} | ${r.internalLinkCount} | ${idx} | ${notes} |`,
    );
  }
  lines.push('');

  await writeFile(path, lines.join('\n'), 'utf8');
}

/**
 * Memoised audit runner. Pages call this — first call evaluates, writes the
 * log, and prints the console summary; subsequent calls reuse the same
 * promise. Throws if any entry has hard errors (build fails).
 *
 * In a static Astro build this runs exactly once per build because every
 * diary page hits it but Node module-caches the promise.
 */
let auditPromise: Promise<GateResult[]> | null = null;

export function getDiaryAuditResults(): Promise<GateResult[]> {
  if (auditPromise) return auditPromise;
  auditPromise = (async () => {
    const { getCollection } = await import('astro:content');
    const { evaluateAll } = await import('./diaryGates');
    const all = await getCollection('diary');
    const results = evaluateAll(all);
    const rootDir = process.cwd();
    await writeAuditLog(results, rootDir);
    const failed = logToConsole(results);
    if (failed) {
      const errored = results.filter((r) => r.errors.length > 0);
      throw new Error(
        `Diary gates failed for ${errored.length} ${errored.length === 1 ? 'entry' : 'entries'}: ` +
          `${errored.map((r) => r.slug).join(', ')}. ` +
          `See docs/diary-audit-log.md for details.`,
      );
    }
    return results;
  })();
  return auditPromise;
}
