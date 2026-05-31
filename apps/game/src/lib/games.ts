/**
 * Game type definitions and shared constants.
 *
 * The actual game catalog lives in Astro Content Collections at
 * `src/content/games/*.json`. See `src/content/config.ts` for the schema.
 *
 * To add a new game, register it via the content collection — do NOT add
 * entries here. See `docs/playbook/add-new-spoke.md`.
 */

export type GameIconKind = 'kanji' | 'clock' | 'map' | 'rhythm' | 'palette';
export type GameFlag = 'new' | 'wip' | null;

export interface Game {
  readonly id: string;
  readonly jp: string;
  readonly en: string;
  readonly genre: string;
  readonly genreEn: string;
  readonly time: string;
  readonly tag: GameFlag;
  readonly icon: GameIconKind;
  readonly hue: string;
  readonly url: string | null;
  readonly status: 'published' | 'draft' | 'archived';
  readonly featured: boolean;
  readonly publishedAt?: string;
}

export const GENRES: readonly string[] = [
  'すべて / All',
  'パズル / Puzzle',
  'クイズ / Quiz',
  '一分 / Idle',
  '音ゲー / Rhythm',
];
