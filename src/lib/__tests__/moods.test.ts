import { describe, expect, it } from 'vitest';
import { MOODS, SUN_PALETTES, resolveMood } from '../moods';

describe('resolveMood', () => {
  it.each([
    [0, 'night'],
    [4, 'night'],
    [5, 'morning'],
    [10, 'morning'],
    [11, 'afternoon'],
    [16, 'afternoon'],
    [17, 'evening'],
    [20, 'evening'],
    [21, 'night'],
    [23, 'night'],
  ])('%d:00 → %s', (hour, expected) => {
    const d = new Date(2025, 5, 15, hour, 0, 0);
    expect(resolveMood(d)).toBe(expected);
  });
});

describe('MOODS and SUN_PALETTES', () => {
  it('covers all four moods', () => {
    const moods = ['morning', 'afternoon', 'evening', 'night'] as const;
    for (const m of moods) {
      expect(MOODS[m]).toBeDefined();
      expect(MOODS[m].jp.length).toBeGreaterThan(0);
      expect(MOODS[m].en.length).toBeGreaterThan(0);
      expect(SUN_PALETTES[m]).toHaveLength(3);
    }
  });
});
