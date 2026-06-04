import { describe, expect, it } from 'vitest';
import {
  buildRssXml,
  buildAtomXml,
  escapeXml,
  toRfc822,
  toRfc3339,
  FEED_META,
} from '../feed';
import { RECENT_ITEMS, type RecentItem } from '../recent';

const SAMPLE: RecentItem[] = [
  {
    date: 'new',
    src: 'game',
    srcJp: 'Web ゲーム',
    jp: 'A & B を公開',
    en: 'A & B is live',
    kind: 'release',
    url: 'https://example.fujioha.com',
    pubDate: '2026-05-31',
  },
];

describe('escapeXml', () => {
  it('escapes XML metacharacters', () => {
    expect(escapeXml('a & b < c > d " e \' f')).toBe(
      'a &amp; b &lt; c &gt; d &quot; e &apos; f',
    );
  });
});

describe('date helpers', () => {
  it('converts YYYY-MM-DD to RFC 822 / RFC 3339', () => {
    expect(toRfc822('2026-05-31')).toBe('Sun, 31 May 2026 00:00:00 GMT');
    expect(toRfc3339('2026-05-31')).toBe('2026-05-31T00:00:00.000Z');
  });
});

describe('buildRssXml', () => {
  const xml = buildRssXml(RECENT_ITEMS);

  it('is a well-formed RSS 2.0 document', () => {
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`<title>${escapeXml(FEED_META.title)}</title>`);
  });

  it('includes an item for each recent entry', () => {
    const itemCount = (xml.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(RECENT_ITEMS.length);
    for (const it of RECENT_ITEMS) {
      expect(xml).toContain(`<link>${it.url}</link>`);
      expect(xml).toContain(toRfc822(it.pubDate));
    }
  });

  it('escapes special characters in titles', () => {
    const xml2 = buildRssXml(SAMPLE);
    expect(xml2).toContain('<title>A &amp; B を公開</title>');
    expect(xml2).not.toContain('A & B を公開');
  });
});

describe('buildAtomXml', () => {
  const xml = buildAtomXml(RECENT_ITEMS);

  it('is a well-formed Atom document', () => {
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
    expect(xml).toContain('<updated>');
  });

  it('includes an entry for each recent entry', () => {
    const entryCount = (xml.match(/<entry>/g) ?? []).length;
    expect(entryCount).toBe(RECENT_ITEMS.length);
    for (const it of RECENT_ITEMS) {
      expect(xml).toContain(`<id>${it.url}</id>`);
    }
  });
});
