import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { recordVisit, visitPhrase } from '../visits';

describe('visitPhrase', () => {
  it('greets first-time visitors', () => {
    expect(visitPhrase(1)).toEqual({
      jp: 'はじめまして。',
      en: 'First time here — welcome.',
    });
  });

  it('thanks second visit specially', () => {
    expect(visitPhrase(2).jp).toBe('二度目のおはよう、ありがとう。');
  });

  it('counts visits 3-9 with morning phrasing', () => {
    expect(visitPhrase(5).jp).toBe('今日が 5 度目のおはよう。');
    expect(visitPhrase(5).en).toBe('5 mornings now.');
  });

  it('promotes 10-30 visits to regular', () => {
    expect(visitPhrase(10).jp).toBe('10 度目。常連です。');
    expect(visitPhrase(30).en).toBe('30 visits. A regular.');
  });

  it('thanks visitors above 30', () => {
    expect(visitPhrase(31).jp).toBe('31 度目。ほんとうにありがとう。');
  });
});

describe('recordVisit', () => {
  const store: Record<string, string> = {};

  beforeEach(() => {
    for (const k of Object.keys(store)) delete store[k];
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
      key: () => null,
      length: 0,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts at 1 on first call', () => {
    const n = recordVisit(new Date('2025-05-28T10:00:00Z'));
    expect(n).toBe(1);
  });

  it('does not double-count on the same UTC day', () => {
    const day = new Date('2025-05-28T10:00:00Z');
    expect(recordVisit(day)).toBe(1);
    expect(recordVisit(day)).toBe(1);
  });

  it('increments across UTC days', () => {
    expect(recordVisit(new Date('2025-05-28T23:00:00Z'))).toBe(1);
    expect(recordVisit(new Date('2025-05-29T01:00:00Z'))).toBe(2);
  });
});
