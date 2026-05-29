import { describe, expect, it } from 'vitest';
import { KOU72, todayKou } from '../kou72';

describe('todayKou', () => {
  it('returns the first entry on Jan 1', () => {
    const k = todayKou(new Date(2025, 0, 1));
    expect(k[2]).toBe('冬至');
    expect(k[3]).toBe('雪下出麦');
  });

  it('rolls forward to the next kou exactly on its start day', () => {
    const k = todayKou(new Date(2025, 0, 6));
    expect(k[2]).toBe('小寒');
    expect(k[3]).toBe('芹乃栄');
  });

  it('keeps the previous kou up until the next boundary', () => {
    const k = todayKou(new Date(2025, 0, 10));
    expect(k[3]).toBe('芹乃栄');
  });

  it('returns the last entry for the year-end', () => {
    const k = todayKou(new Date(2025, 11, 28));
    expect(k[3]).toBe('麋角解');
  });

  it('every entry has six fields', () => {
    for (const k of KOU72) {
      expect(k.length).toBe(6);
      expect(typeof k[0]).toBe('number');
      expect(typeof k[1]).toBe('number');
    }
  });
});
