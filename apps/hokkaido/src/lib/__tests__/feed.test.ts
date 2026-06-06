import { describe, expect, it } from 'vitest';
import { companionToFeedItem, HOK_FEED_META, type CompanionFields } from '../feed';

const PUBLISHED: CompanionFields = {
  jp: '千歳〜札幌 グルメ・観光ガイド',
  en: 'Chitose to Sapporo: food & travel guide',
  url: 'https://chitose-sapporo.fujioha.com',
  publishedAt: '2026-05-31',
};

describe('companionToFeedItem', () => {
  it('maps a companion to a generic FeedItem', () => {
    expect(companionToFeedItem(PUBLISHED)).toEqual({
      title: '千歳〜札幌 グルメ・観光ガイド',
      link: 'https://chitose-sapporo.fujioha.com',
      summary: 'Chitose to Sapporo: food & travel guide',
      pubDate: '2026-05-31',
    });
  });
});

describe('HOK_FEED_META', () => {
  it('points at the hokkaido origin', () => {
    expect(HOK_FEED_META.site).toBe('https://hokkaido.fujioha.com');
  });
});
