import { describe, expect, it } from 'vitest';
import { gameToFeedItem, GAME_FEED_META } from '../feed';
import type { Game } from '../games';

const PUBLISHED: Game = {
  id: 'color-sense',
  jp: 'カラーセンステスト',
  en: 'Find the odd-colored tile',
  genre: 'パズル',
  genreEn: 'Puzzle',
  time: '~1 min',
  tag: 'new',
  icon: 'palette',
  hue: '#c79ad6',
  url: 'https://color-sense.fujioha.com',
  status: 'published',
  featured: false,
  publishedAt: '2026-05-31',
};

describe('gameToFeedItem', () => {
  it('maps a game to a generic FeedItem', () => {
    expect(gameToFeedItem(PUBLISHED)).toEqual({
      title: 'カラーセンステスト',
      link: 'https://color-sense.fujioha.com',
      summary: 'Find the odd-colored tile',
      pubDate: '2026-05-31',
    });
  });
});

describe('GAME_FEED_META', () => {
  it('points at the game origin', () => {
    expect(GAME_FEED_META.site).toBe('https://game.fujioha.com');
  });
});
