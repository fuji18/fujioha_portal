import { describe, expect, it } from 'vitest';
import { buildSitemapXml } from '../sitemap';

describe('buildSitemapXml', () => {
  const xml = buildSitemapXml(['/', '/about', '/journal'], 'https://fujioha.com');

  it('is a well-formed urlset', () => {
    expect(xml.startsWith('<?xml')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  });

  it('emits an absolute loc per path', () => {
    expect((xml.match(/<url>/g) ?? []).length).toBe(3);
    expect(xml).toContain('<loc>https://fujioha.com/</loc>');
    expect(xml).toContain('<loc>https://fujioha.com/about</loc>');
    expect(xml).toContain('<loc>https://fujioha.com/journal</loc>');
  });
});
