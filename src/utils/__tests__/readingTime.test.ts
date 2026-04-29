import { describe, it, expect } from 'vitest';
import { readingTimeFromBody } from '../readingTime';

describe('readingTimeFromBody', () => {
  it('returns 1 minute for empty/undefined input', () => {
    expect(readingTimeFromBody(undefined)).toBe(1);
    expect(readingTimeFromBody('')).toBe(1);
  });

  it('returns at least 1 minute even for very short text', () => {
    expect(readingTimeFromBody('hello world')).toBe(1);
  });

  it('rounds 230 words to 1 minute', () => {
    const body = 'word '.repeat(230);
    expect(readingTimeFromBody(body)).toBe(1);
  });

  it('rounds 460 words to 2 minutes', () => {
    const body = 'word '.repeat(460);
    expect(readingTimeFromBody(body)).toBe(2);
  });

  it('strips fenced code blocks', () => {
    const body = '```\n' + 'code '.repeat(500) + '\n```\nactual prose word';
    expect(readingTimeFromBody(body)).toBe(1);
  });

  it('strips inline code', () => {
    const body = `text ${'`code` '.repeat(500)} more`;
    // inline code stripped, only "text" + "more" + delimiter spaces count
    expect(readingTimeFromBody(body)).toBe(1);
  });

  it('strips markdown image markup but keeps surrounding prose', () => {
    const body = `![alt text](image.jpg) ${'word '.repeat(230)}`;
    expect(readingTimeFromBody(body)).toBe(1);
  });

  it('preserves link text but drops the URL', () => {
    const body = `[link text](https://example.com) ${'word '.repeat(228)}`;
    expect(readingTimeFromBody(body)).toBe(1);
  });

  it('strips HTML tags', () => {
    const body = `<div class="x">${'word '.repeat(230)}</div>`;
    expect(readingTimeFromBody(body)).toBe(1);
  });
});
