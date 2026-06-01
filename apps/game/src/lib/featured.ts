export interface FeaturedGame {
  readonly jp: string;
  readonly sub: string;
  readonly en: string;
  readonly desc: string;
  readonly descEn: string;
  readonly genre: string;
  readonly time: string;
  readonly controls: string;
  readonly hue: string;
  /** 公開状態。draft の間は「準備中 / Coming soon」として表示し、プレイ不可。 */
  readonly status: 'published' | 'draft';
}

export const GAME_FEATURED: FeaturedGame = {
  jp: 'Kanji Drop',
  sub: '落ちてくる漢字を組む',
  en: 'Stack falling radicals into real kanji',
  desc: 'テトリスと漢字の偏旁を掛け合わせたパズル。落ちてくる部首を組み合わせて文字を完成させる。1プレイおよそ1分、語彙が増えるほど強くなる。',
  descEn:
    'Half tetromino, half kanji radical. Slot the falling parts together to complete characters. About a minute a round — and the more kanji you know, the better you do.',
  genre: 'Puzzle · パズル',
  time: '~1 min',
  controls: '← → ↓ / tap',
  hue: '#f6d472',
  status: 'draft',
};
