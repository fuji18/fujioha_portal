export type RecentKind = 'post' | 'release';

export interface RecentItem {
  readonly date: string;
  readonly src: string;
  readonly srcJp: string;
  readonly jp: string;
  readonly en: string;
  readonly kind: RecentKind;
}

export const RECENT_ITEMS: readonly RecentItem[] = [
  {
    date: '2d',
    src: 'hokkaido',
    srcJp: '北海道の歩き方',
    jp: '函館朝市、地元民の歩き方',
    en: 'Hakodate morning market, the local way',
    kind: 'post',
  },
  {
    date: '3d',
    src: 'game',
    srcJp: 'Web ゲーム',
    jp: '新作 · Kanji Drop を公開しました',
    en: 'New release · Kanji Drop is live',
    kind: 'release',
  },
  {
    date: '1w',
    src: 'hokkaido',
    srcJp: '北海道の歩き方',
    jp: '雨の札幌で行きたいラーメン10軒',
    en: 'Sapporo ramen for rainy days',
    kind: 'post',
  },
  {
    date: '2w',
    src: 'hokkaido',
    srcJp: '北海道の歩き方',
    jp: '知床の朝、ヒグマに会わない歩き方',
    en: 'Shiretoko mornings, bear-free',
    kind: 'post',
  },
  {
    date: '3w',
    src: 'game',
    srcJp: 'Web ゲーム',
    jp: 'ミニ · 札幌時計台 1分タイマー',
    en: '60-second clock-tower mini',
    kind: 'release',
  },
];
