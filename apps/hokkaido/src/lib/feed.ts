import type { FeedItem, FeedMeta } from '@fujioha/ui/feed';

/** フィード変換に必要な姉妹サイトの最小フィールド。 */
export interface CompanionFields {
  readonly jp: string;
  readonly en: string;
  readonly url: string;
  readonly publishedAt?: string;
}

export const HOK_FEED_META: FeedMeta = {
  title: 'hokkaido.fujioha.com — 更新 / Updates',
  description: '北海道の歩き方の更新情報 / Updates from the Hokkaido guide.',
  site: 'https://hokkaido.fujioha.com',
};

/** 公開済み姉妹サイトを汎用 FeedItem に変換する（純関数）。 */
export function companionToFeedItem(c: CompanionFields): FeedItem {
  return {
    title: c.jp,
    link: c.url,
    summary: c.en,
    pubDate: c.publishedAt ?? '1970-01-01',
  };
}
