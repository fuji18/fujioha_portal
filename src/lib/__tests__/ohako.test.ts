import { describe, expect, it } from 'vitest';
import { OHAKO_PICKS, pickOhako } from '../ohako';

describe('pickOhako', () => {
  it('is deterministic for a given timestamp', () => {
    expect(pickOhako(0)).toBe(OHAKO_PICKS[0]);
    expect(pickOhako(1000)).toBe(OHAKO_PICKS[1]);
    expect(pickOhako(2000)).toBe(OHAKO_PICKS[2]);
  });

  it('wraps around with modulo', () => {
    expect(pickOhako(5000)).toBe(OHAKO_PICKS[0]);
    expect(pickOhako(6000)).toBe(OHAKO_PICKS[1]);
  });

  it('treats sub-second jitter as the same pick', () => {
    expect(pickOhako(1000)).toBe(pickOhako(1500));
    expect(pickOhako(1000)).toBe(pickOhako(1999));
  });
});

describe('OHAKO_PICKS', () => {
  it('contains 5 entries with all required fields', () => {
    expect(OHAKO_PICKS).toHaveLength(5);
    for (const p of OHAKO_PICKS) {
      expect(p.jp.length).toBeGreaterThan(0);
      expect(p.en.length).toBeGreaterThan(0);
      expect(p.img).toMatch(/^gradient[1-5]$/);
    }
  });
});
