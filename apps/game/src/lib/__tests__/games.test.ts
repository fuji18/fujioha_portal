import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { GENRES, type Game } from '../games';
import { GAME_FEATURED } from '../featured';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GAMES_DIR = resolve(__dirname, '../../content/games');

function loadGames(): Game[] {
  return readdirSync(GAMES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(resolve(GAMES_DIR, f), 'utf-8')) as Game);
}

describe('game catalog (content collection)', () => {
  const games = loadGames();

  it('exposes at least one game with consistent fields', () => {
    expect(games.length).toBeGreaterThan(0);
    const validIcons = new Set(['kanji', 'clock', 'map', 'rhythm', 'palette']);
    for (const g of games) {
      expect(g.id).toMatch(/^[a-z0-9-]+$/);
      expect(g.jp.length).toBeGreaterThan(0);
      expect(g.en.length).toBeGreaterThan(0);
      expect(validIcons.has(g.icon)).toBe(true);
      expect(g.hue).toMatch(/^#[0-9a-fA-F]{6}$/);
      if (g.url) {
        expect(g.url).toMatch(/^https?:\/\//);
      }
    }
  });

  it('has at least one published game', () => {
    const published = games.filter((g) => g.status === 'published');
    expect(published.length).toBeGreaterThan(0);
  });

  it('lists "すべて" as the first genre filter', () => {
    expect(GENRES[0]).toBe('すべて / All');
  });

  it('exposes a featured game with hue color', () => {
    expect(GAME_FEATURED.jp).toBe('絶対色感');
    expect(GAME_FEATURED.hue).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});
