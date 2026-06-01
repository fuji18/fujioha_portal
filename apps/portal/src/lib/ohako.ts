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
}

// 仮コンテンツの十八番は削除。実際に公開済みのコンテンツのみを掲載する。
export const OHAKO_PICKS: readonly OhakoPick[] = [
  {
    src: 'color-sense.fujioha.com',
    srcLabel: 'Web ゲーム',
    jp: 'カラーセンステスト',
    en: 'Find the odd-colored tile',
    blurb: '少しだけ色のちがうタイルを探す、1分のミニゲーム。',
    blurbEn: 'Spot the tile that is just slightly off. About a minute a round.',
    meta: 'Browser game · ~1 min',
    cta: '今すぐ遊ぶ',
    ctaEn: 'Play now',
    img: 'gradient2',
  },
  {
    src: 'chitose-sapporo.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '千歳〜札幌 グルメ・観光ガイド',
    en: 'Chitose to Sapporo: food & travel guide',
    blurb: '新千歳空港から札幌までの間に立ち寄りたい食と観光を、地元の歩き方で。',
    blurbEn: 'Food and travel between New Chitose Airport and Sapporo, the local way.',
    meta: '姉妹サイト · Companion site',
    cta: 'サイトへ',
    ctaEn: 'Visit',
    img: 'gradient1',
  },
];

export function pickOhako(now: number = Date.now()): OhakoPick {
  const seed = Math.floor(now / 1000);
  return OHAKO_PICKS[seed % OHAKO_PICKS.length];
}
