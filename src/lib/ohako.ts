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

export const OHAKO_PICKS: readonly OhakoPick[] = [
  {
    src: 'hokkaido.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '函館の朝市、地元の人の歩き方',
    en: "How a local actually does Hakodate's morning market",
    blurb: '観光客の動線とはまったく違う、地元の朝の三軒。',
    blurbEn: 'Three stalls that show up on no map but mine.',
    meta: '6 min read · 旅・北海道',
    cta: '記事を読む',
    ctaEn: 'Read',
    img: 'gradient1',
  },
  {
    src: 'hokkaido.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '雨の札幌で行きたいラーメン10軒',
    en: "10 ramen shops for Sapporo's rainy days",
    blurb: '雨の日にこそ価値が出る、湯気と窓の風景。',
    blurbEn: 'The kind of bowls that earn their keep on grey afternoons.',
    meta: '4 min read · 旅・北海道',
    cta: '記事を読む',
    ctaEn: 'Read',
    img: 'gradient2',
  },
  {
    src: 'game.fujioha.com',
    srcLabel: 'Web ゲーム',
    jp: 'Kanji Drop — 落ちてくる漢字を組む',
    en: 'Kanji Drop — falling kanji puzzle',
    blurb: 'Tetris と漢字の偏旁を組み合わせた小品。1分で遊べます。',
    blurbEn: 'Half tetromino, half kanji radical. Plays in about a minute.',
    meta: 'Browser game · ~1 min',
    cta: '今すぐ遊ぶ',
    ctaEn: 'Play now',
    img: 'gradient3',
  },
  {
    src: 'hokkaido.fujioha.com',
    srcLabel: '北海道の歩き方',
    jp: '知床の朝、ヒグマに会わない歩き方',
    en: 'Shiretoko mornings without bumping into a bear',
    blurb: '出会わないための時間帯と、道の選び方。',
    blurbEn: 'Which hours, which trails, and what to carry.',
    meta: '5 min read · 旅・北海道',
    cta: '記事を読む',
    ctaEn: 'Read',
    img: 'gradient4',
  },
  {
    src: 'game.fujioha.com',
    srcLabel: 'Web ゲーム',
    jp: '札幌時計台 1分タイマー',
    en: '60-second clock-tower mini',
    blurb: '一分だけ、画面の前で深呼吸するためのゲーム。',
    blurbEn: 'A one-minute thing for catching your breath.',
    meta: 'Browser game · 1 min',
    cta: '今すぐ遊ぶ',
    ctaEn: 'Play now',
    img: 'gradient5',
  },
];

export function pickOhako(now: number = Date.now()): OhakoPick {
  const seed = Math.floor(now / 1000);
  return OHAKO_PICKS[seed % OHAKO_PICKS.length];
}
