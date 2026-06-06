import type { FeedItem, FeedMeta } from '@fujioha/ui/feed';
import type { Game } from './games';

export const GAME_FEED_META: FeedMeta = {
  title: 'game.fujioha.com — 新着ゲーム / New games',
  description: '思いつきの Web ゲームの公開情報 / New small web games as they ship.',
  site: 'https://game.fujioha.com',
};

/** 公開済みゲームを汎用 FeedItem に変換する（純関数）。 */
export function gameToFeedItem(game: Game): FeedItem {
  return {
    title: game.jp,
    link: game.url ?? GAME_FEED_META.site,
    summary: game.en,
    pubDate: game.publishedAt ?? '1970-01-01',
  };
}
