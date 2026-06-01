export type RecentKind = 'post' | 'release';

export interface RecentItem {
  readonly date: string;
  readonly src: string;
  readonly srcJp: string;
  readonly jp: string;
  readonly en: string;
  readonly kind: RecentKind;
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
  },
  {
    date: 'new',
    src: 'hokkaido',
    srcJp: '北海道の歩き方',
    jp: '姉妹サイト · 千歳〜札幌ガイドを公開',
    en: 'Companion site · Chitose–Sapporo guide is live',
    kind: 'release',
  },
];
