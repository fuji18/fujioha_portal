import { describe, expect, it } from 'vitest';
import { OHAKO_PICKS, pickOhako } from '../ohako';

const LEN = OHAKO_PICKS.length;

describe('pickOhako', () => {
  it('is deterministic for a given timestamp', () => {
    expect(pickOhako(0)).toBe(OHAKO_PICKS[0]);
    expect(pickOhako(1000)).toBe(OHAKO_PICKS[1 % LEN]);
    expect(pickOhako(2000)).toBe(OHAKO_PICKS[2 % LEN]);
  });

  it('wraps around with modulo', () => {
    expect(pickOhako(5000)).toBe(OHAKO_PICKS[5 % LEN]);
    expect(pickOhako(6000)).toBe(OHAKO_PICKS[6 % LEN]);
  });

  it('treats sub-second jitter as the same pick', () => {
    expect(pickOhako(1000)).toBe(pickOhako(1500));
    expect(pickOhako(1000)).toBe(pickOhako(1999));
  });
});

describe('OHAKO_PICKS', () => {
  it('contains only published content with all required fields', () => {
    expect(OHAKO_PICKS.length).toBeGreaterThan(0);
    for (const p of OHAKO_PICKS) {
      expect(p.jp.length).toBeGreaterThan(0);
      expect(p.en.length).toBeGreaterThan(0);
      expect(p.img).toMatch(/^gradient[1-5]$/);
    }
  });
});
