import type { GameIconKind } from './games';

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
  /** 棚カードと同じアイコン種別。画像未指定時のフォールバック表示に使う。 */
  readonly icon: GameIconKind;
  /** 公開状態。published のときのみ「今日の一本」に表示する。 */
  readonly status: 'published' | 'draft';
  /** プレイ先 URL（公開済みゲーム）。 */
  readonly url: string;
  /** サムネ画像（サイト相対）。未指定なら棚カードと同じアイコン表示にフォールバック。 */
  readonly image?: string;
}

// 「今日の一本」は遊べる（公開済み）ゲームのみを出す。
export const GAME_FEATURED: FeaturedGame = {
  jp: '絶対色感',
  sub: 'わずかな色のちがいを見抜く',
  en: 'Odd Hue Out',
  desc: '少しだけ色のちがう1枚を、並んだタイルの中から見つけ出す。レベルが上がるほど差は小さくシビアに。1分で集中できる色覚ミニゲーム。',
  descEn:
    'Find the one tile whose colour is slightly off. The higher you climb, the smaller the difference. A one-minute test of your eye for colour.',
  genre: 'Puzzle · パズル',
  time: '~1 min',
  controls: 'クリックのみ / click only',
  hue: '#c79ad6',
  icon: 'palette',
  status: 'published',
  url: 'https://color-sense.fujioha.com',
};
