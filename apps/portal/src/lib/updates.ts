import type { FeedItem, FeedMeta } from '@fujioha/ui/feed';

/** フィード変換に必要な更新項目の最小フィールド。 */
export interface UpdateFields {
  readonly jp: string;
  readonly en: string;
  readonly url: string;
  readonly publishedAt: string;
}

export const PORTAL_FEED_META: FeedMeta = {
  title: 'fujioha.com — 最近の更新 / Recent',
  description: 'ふじおはの各サイトの更新情報 / Updates across the fujioha network.',
  site: 'https://fujioha.com',
};

/** Update を汎用 FeedItem に変換する（純関数）。 */
export function updateToFeedItem(u: UpdateFields): FeedItem {
  return { title: u.jp, link: u.url, summary: u.en, pubDate: u.publishedAt };
}
