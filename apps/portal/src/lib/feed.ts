import { RECENT_ITEMS, type RecentItem } from './recent';

export interface FeedMeta {
  readonly title: string;
  readonly description: string;
  /** サイトの絶対 URL（末尾スラッシュなし）。 */
  readonly site: string;
  readonly rssPath: string;
  readonly atomPath: string;
}

export const FEED_META: FeedMeta = {
  title: 'fujioha.com — 最近の更新 / Recent',
  description: 'ふじおはの各サイトの更新情報 / Updates across the fujioha network.',
  site: 'https://fujioha.com',
  rssPath: '/rss.xml',
  atomPath: '/atom.xml',
};

const XML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

/** XML のメタ文字をエスケープする。 */
export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => XML_ESCAPES[c]);
}

/** YYYY-MM-DD を RFC 822（RSS 用）に変換する。 */
export function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

/** YYYY-MM-DD を RFC 3339（Atom 用）に変換する。 */
export function toRfc3339(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toISOString();
}

/** 最も新しい pubDate を返す（フィード全体の更新日時）。空なら epoch。 */
function latestPubDate(items: readonly RecentItem[]): string {
  if (items.length === 0) return '1970-01-01';
  return items.reduce((max, it) => (it.pubDate > max ? it.pubDate : max), items[0].pubDate);
}

/** RSS 2.0 フィードを生成する。 */
export function buildRssXml(
  items: readonly RecentItem[] = RECENT_ITEMS,
  meta: FeedMeta = FEED_META,
): string {
  const entries = items
    .map((it) => {
      const title = escapeXml(it.jp);
      const link = escapeXml(it.url);
      const description = escapeXml(it.en);
      return [
        '    <item>',
        `      <title>${title}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${toRfc822(it.pubDate)}</pubDate>`,
        `      <description>${description}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(meta.title)}</title>`,
    `    <link>${escapeXml(meta.site)}/</link>`,
    `    <description>${escapeXml(meta.description)}</description>`,
    '    <language>ja</language>',
    `    <lastBuildDate>${toRfc822(latestPubDate(items))}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(meta.site + meta.rssPath)}" rel="self" type="application/rss+xml" />`,
    entries,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

/** Atom 1.0 フィードを生成する。 */
export function buildAtomXml(
  items: readonly RecentItem[] = RECENT_ITEMS,
  meta: FeedMeta = FEED_META,
): string {
  const updated = toRfc3339(latestPubDate(items));
  const entries = items
    .map((it) => {
      const title = escapeXml(it.jp);
      const link = escapeXml(it.url);
      const summary = escapeXml(it.en);
      return [
        '  <entry>',
        `    <title>${title}</title>`,
        `    <link href="${link}" />`,
        `    <id>${link}</id>`,
        `    <updated>${toRfc3339(it.pubDate)}</updated>`,
        `    <summary>${summary}</summary>`,
        '  </entry>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">',
    `  <title>${escapeXml(meta.title)}</title>`,
    `  <subtitle>${escapeXml(meta.description)}</subtitle>`,
    `  <link href="${escapeXml(meta.site + meta.atomPath)}" rel="self" />`,
    `  <link href="${escapeXml(meta.site)}/" />`,
    `  <id>${escapeXml(meta.site)}/</id>`,
    `  <updated>${updated}</updated>`,
    entries,
    '</feed>',
    '',
  ].join('\n');
}
