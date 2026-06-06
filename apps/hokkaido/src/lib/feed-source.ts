import { getCollection } from 'astro:content';
import type { FeedItem } from '@fujioha/ui/feed';
import { companionToFeedItem } from './feed';

/** フィードに載せる姉妹サイト（公開済み・公開日あり）を読み込む。 */
export async function loadHokkaidoFeedItems(): Promise<FeedItem[]> {
  const entries = await getCollection('companions');
  return entries
    .map((e) => e.data)
    .filter((c) => c.status === 'published' && !!c.publishedAt)
    .map(companionToFeedItem);
}
