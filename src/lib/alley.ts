export interface Shop {
  readonly jp: string;
  readonly en: string;
  readonly sub: string;
  readonly tag: string;
  readonly color: string;
  readonly dashed?: boolean;
}

export const SHOPS: readonly Shop[] = [
  {
    jp: '北海道',
    en: 'Hokkaido',
    sub: 'hokkaido',
    tag: 'travel · guide',
    color: 'var(--accent)',
  },
  {
    jp: 'ゲーム',
    en: 'Games',
    sub: 'game',
    tag: 'play · web',
    color: '#2a4a6b',
  },
  {
    jp: '準備中',
    en: 'Coming',
    sub: '?',
    tag: 'coming soon',
    color: '#8a8377',
    dashed: true,
  },
  {
    jp: '店主',
    en: 'Shopkeeper',
    sub: 'about',
    tag: '@fuji',
    color: '#3e3a32',
  },
  {
    jp: '日誌',
    en: 'Journal',
    sub: 'journal',
    tag: 'notes',
    color: '#5a6b4a',
    dashed: true,
  },
];
