/**
 * Shared RSS 2.0 / Atom 1.0 feed builders for the fujioha.com network.
 *
 * App-agnostic: each site maps its Content Collection entries to `FeedItem`
 * and calls these builders. No dependency on any app's data shape.
 */

export interface FeedItem {
  readonly title: string;
  readonly link: string;
  readonly summary: string;
  /** 公開日（YYYY-MM-DD）。 */
  readonly pubDate: string;
}

export interface FeedMeta {
  readonly title: string;
  readonly description: string;
  /** サイトの絶対 URL（末尾スラッシュなし）。 */
  readonly site: string;
  readonly rssPath?: string;
  readonly atomPath?: string;
}

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

function sortedByPubDateDesc(items: readonly FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) => b.pubDate.localeCompare(a.pubDate));
}

function latestPubDate(items: readonly FeedItem[]): string {
  if (items.length === 0) return '1970-01-01';
  return items.reduce((max, it) => (it.pubDate > max ? it.pubDate : max), items[0].pubDate);
}

/** RSS 2.0 フィードを生成する（pubDate 降順）。 */
export function buildRssXml(items: readonly FeedItem[], meta: FeedMeta): string {
  const rssPath = meta.rssPath ?? '/rss.xml';
  const entries = sortedByPubDateDesc(items)
    .map((it) => {
      const title = escapeXml(it.title);
      const link = escapeXml(it.link);
      const description = escapeXml(it.summary);
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
    `    <atom:link href="${escapeXml(meta.site + rssPath)}" rel="self" type="application/rss+xml" />`,
    entries,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n');
}

/** Atom 1.0 フィードを生成する（pubDate 降順）。 */
export function buildAtomXml(items: readonly FeedItem[], meta: FeedMeta): string {
  const atomPath = meta.atomPath ?? '/atom.xml';
  const updated = toRfc3339(latestPubDate(items));
  const entries = sortedByPubDateDesc(items)
    .map((it) => {
      const title = escapeXml(it.title);
      const link = escapeXml(it.link);
      const summary = escapeXml(it.summary);
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
    `  <link href="${escapeXml(meta.site + atomPath)}" rel="self" />`,
    `  <link href="${escapeXml(meta.site)}/" />`,
    `  <id>${escapeXml(meta.site)}/</id>`,
    `  <updated>${updated}</updated>`,
    entries,
    '</feed>',
    '',
  ].join('\n');
}
