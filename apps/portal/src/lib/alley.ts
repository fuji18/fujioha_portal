export interface Shop {
  readonly jp: string;
  readonly en: string;
  readonly sub: string;
  readonly tag: string;
  readonly color: string;
  readonly dashed?: boolean;
  /** 遷移先を明示したい場合に指定。未指定なら sub からサブドメインURLを導出する。 */
  readonly href?: string;
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
    href: '/about',
  },
  {
    jp: '日誌',
    en: 'Journal',
    sub: 'journal',
    tag: 'notes',
    color: '#5a6b4a',
    href: '/journal',
  },
];

/**
 * 営業中(=遷移可能)の店かどうか。準備中(dashed)の暖簾は遷移先を持たない。
 */
export function isOpen(shop: Shop): boolean {
  return !shop.dashed;
}

/**
 * 暖簾の遷移先URL。準備中の店は undefined を返す。
 * 明示的な href があればそれを優先し、なければ sub からサブドメインを導出する。
 */
export function shopHref(shop: Shop): string | undefined {
  if (!isOpen(shop)) return undefined;
  return shop.href ?? `https://${shop.sub}.fujioha.com`;
}
