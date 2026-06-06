import { describe, expect, it } from 'vitest';
import {
  buildRssXml,
  buildAtomXml,
  escapeXml,
  toRfc822,
  toRfc3339,
  type FeedItem,
  type FeedMeta,
} from '../feed';

const META: FeedMeta = {
  title: 'fujioha — テスト',
  description: 'テスト用フィード',
  site: 'https://example.fujioha.com',
};

const ITEMS: FeedItem[] = [
  {
    title: '古い記事 & 続き',
    link: 'https://example.fujioha.com/old',
    summary: 'older',
    pubDate: '2026-05-01',
  },
  {
    title: '新しい記事',
    link: 'https://example.fujioha.com/new',
    summary: 'newer',
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
  const xml = buildRssXml(ITEMS, META);

  it('is a well-formed RSS 2.0 document with channel metadata', () => {
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`<title>${escapeXml(META.title)}</title>`);
    expect(xml).toContain('href="https://example.fujioha.com/rss.xml"');
  });

  it('includes an item per FeedItem and escapes titles', () => {
    expect((xml.match(/<item>/g) ?? []).length).toBe(ITEMS.length);
    expect(xml).toContain('<title>古い記事 &amp; 続き</title>');
  });

  it('orders items by pubDate descending', () => {
    expect(xml.indexOf('/new')).toBeLessThan(xml.indexOf('/old'));
  });
});

describe('buildAtomXml', () => {
  const xml = buildAtomXml(ITEMS, META);

  it('is a well-formed Atom document', () => {
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
    expect(xml).toContain('<updated>2026-05-31T00:00:00.000Z</updated>');
  });

  it('includes an entry per FeedItem', () => {
    expect((xml.match(/<entry>/g) ?? []).length).toBe(ITEMS.length);
  });
});
