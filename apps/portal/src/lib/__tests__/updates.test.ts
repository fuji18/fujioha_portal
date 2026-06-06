import { describe, expect, it } from 'vitest';
import { updateToFeedItem, PORTAL_FEED_META, type UpdateFields } from '../updates';

const SAMPLE: UpdateFields = {
  jp: '新作 · サンプルを公開',
  en: 'New release · Sample is live',
  url: 'https://sample.fujioha.com',
  publishedAt: '2026-05-31',
};

describe('updateToFeedItem', () => {
  it('maps an update to a generic FeedItem', () => {
    expect(updateToFeedItem(SAMPLE)).toEqual({
      title: '新作 · サンプルを公開',
      link: 'https://sample.fujioha.com',
      summary: 'New release · Sample is live',
      pubDate: '2026-05-31',
    });
  });
});

describe('PORTAL_FEED_META', () => {
  it('points at the portal origin', () => {
    expect(PORTAL_FEED_META.site).toBe('https://fujioha.com');
    expect(PORTAL_FEED_META.title.length).toBeGreaterThan(0);
  });
});
