import { escapeXml } from './feed';

/**
 * sitemap.xml を生成する。
 * @param paths サイト相対パス（例: ['/', '/about']）
 * @param site  サイトの絶対 URL（例: 'https://fujioha.com'）
 */
export function buildSitemapXml(paths: readonly string[], site: string): string {
  const urls = paths
    .map((p) => {
      const loc = escapeXml(new URL(p, site).href);
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}
