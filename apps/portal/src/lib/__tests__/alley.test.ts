import { describe, expect, it } from 'vitest';
import { SHOPS, isOpen, shopHref, type Shop } from '../alley';

describe('SHOPS', () => {
  it('contains entries with all required fields', () => {
    expect(SHOPS.length).toBeGreaterThan(0);
    for (const s of SHOPS) {
      expect(s.jp.length).toBeGreaterThan(0);
      expect(s.en.length).toBeGreaterThan(0);
      expect(s.sub.length).toBeGreaterThan(0);
      expect(s.tag.length).toBeGreaterThan(0);
      expect(s.color.length).toBeGreaterThan(0);
    }
  });

  it('includes the two live sites and the coming-soon shops', () => {
    const subs = SHOPS.map((s) => s.sub);
    expect(subs).toContain('hokkaido');
    expect(subs).toContain('game');
    expect(SHOPS.some((s) => s.dashed)).toBe(true);
  });
});

describe('isOpen', () => {
  it('is true for shops that are not dashed', () => {
    const open: Shop = { jp: '北海道', en: 'H', sub: 'hokkaido', tag: 't', color: '#000' };
    expect(isOpen(open)).toBe(true);
  });

  it('is true when dashed is explicitly false', () => {
    const open: Shop = { jp: '店主', en: 'S', sub: 'about', tag: 't', color: '#000', dashed: false };
    expect(isOpen(open)).toBe(true);
  });

  it('is false for coming-soon (dashed) shops', () => {
    const coming: Shop = { jp: '準備中', en: 'C', sub: '?', tag: 't', color: '#000', dashed: true };
    expect(isOpen(coming)).toBe(false);
  });
});

describe('shopHref', () => {
  it('derives the subdomain URL for open shops', () => {
    const open: Shop = { jp: '北海道', en: 'H', sub: 'hokkaido', tag: 't', color: '#000' };
    expect(shopHref(open)).toBe('https://hokkaido.fujioha.com');
  });

  it('returns undefined for coming-soon shops', () => {
    const coming: Shop = { jp: '準備中', en: 'C', sub: '?', tag: 't', color: '#000', dashed: true };
    expect(shopHref(coming)).toBeUndefined();
  });

  it('prefers an explicit href when provided', () => {
    const custom: Shop = {
      jp: '店主',
      en: 'S',
      sub: 'about',
      tag: 't',
      color: '#000',
      href: 'https://fujioha.com/about',
    };
    expect(shopHref(custom)).toBe('https://fujioha.com/about');
  });

  it('produces a usable URL for every live shop in SHOPS', () => {
    for (const s of SHOPS.filter(isOpen)) {
      expect(shopHref(s)).toMatch(/^https?:\/\//);
    }
  });
});
