import { getCollection } from 'astro:content';
import type { FeedItem } from '@fujioha/ui/feed';
import { gameToFeedItem } from './feed';

/** フィードに載せるゲーム（公開済み・URL と公開日あり）を読み込む。 */
export async function loadGameFeedItems(): Promise<FeedItem[]> {
  const entries = await getCollection('games');
  return entries
    .map((e) => e.data)
    .filter((g) => g.status === 'published' && !!g.url && !!g.publishedAt)
    .map(gameToFeedItem);
}
