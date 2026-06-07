export type GradientKey =
  | 'gradient1'
  | 'gradient2'
  | 'gradient3'
  | 'gradient4'
  | 'gradient5';

export interface OhakoPick {
  readonly src: string;
  readonly srcLabel: string;
  readonly jp: string;
  readonly en: string;
  readonly blurb: string;
  readonly blurbEn: string;
  readonly meta: string;
  readonly cta: string;
  readonly ctaEn: string;
  readonly img: GradientKey;
  /** サムネ画像（サイト相対 例: /updates/color-sense.svg）。未指定なら img のグラデーション表示にフォールバック。 */
  readonly image?: string;
  readonly href: string;
}

// 仮コンテンツの十八番は削除。実際に公開済みのコンテンツのみを掲載する。
export const OHAKO_PICKS: readonly OhakoPick[] = [
  {
    src: 'color-sense.fujioha.com',
    srcLabel: 'Web ゲーム',
    jp: '絶対色感',
    en: 'Odd Hue Out',
    blurb: '少しだけ色のちがうタイルを探す、1分のミニゲーム。',
    blurbEn: 'Spot the tile that is just slightly off. About a minute a round.',
    meta: 'Browser game · ~1 min',
    cta: '今すぐ遊ぶ',
    ctaEn: 'Play now',
    img: 'gradient2',
    // フィードと共通の「答え隠しお題グリッド」ティザーを再利用（単一ソース）。
    image: '/updates/color-sense.svg',
    href: 'https://color-sense.fujioha.com',
  },
];

export function pickOhako(now: number = Date.now()): OhakoPick {
  const seed = Math.floor(now / 1000);
  return OHAKO_PICKS[seed % OHAKO_PICKS.length];
}
