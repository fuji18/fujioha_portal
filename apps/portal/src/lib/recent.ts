export type RecentKind = 'post' | 'release';

export interface RecentItem {
  readonly date: string;
  readonly src: string;
  readonly srcJp: string;
  readonly jp: string;
  readonly en: string;
  readonly kind: RecentKind;
  /** 更新内容の遷移先（公開済みコンテンツの URL）。 */
  readonly url: string;
  /** 公開日（YYYY-MM-DD）。RSS/Atom フィードの日時に使用。 */
  readonly pubDate: string;
}

// 仮の更新項目は削除。実際に公開済みのコンテンツのみを掲載する。
export const RECENT_ITEMS: readonly RecentItem[] = [
  {
    date: 'new',
    src: 'game',
    srcJp: 'Web ゲーム',
    jp: '新作 · カラーセンステストを公開しました',
    en: 'New release · Color Sense is live',
    kind: 'release',
    url: 'https://color-sense.fujioha.com',
    pubDate: '2026-05-31',
  },
  {
    date: 'new',
    src: 'hokkaido',
    srcJp: '北海道の歩き方',
    jp: '姉妹サイト · 千歳〜札幌ガイドを公開',
    en: 'Companion site · Chitose–Sapporo guide is live',
    kind: 'release',
    url: 'https://chitose-sapporo.fujioha.com',
    pubDate: '2026-05-31',
  },
];
