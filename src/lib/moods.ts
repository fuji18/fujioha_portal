export type Mood = 'morning' | 'afternoon' | 'evening' | 'night';

export interface MoodInfo {
  readonly jp: string;
  readonly en: string;
}

export const MOODS: Readonly<Record<Mood, MoodInfo>> = {
  morning: { jp: 'おはよう', en: 'Good morning' },
  afternoon: { jp: 'こんにちは', en: 'Good afternoon' },
  evening: { jp: 'こんばんは', en: 'Good evening' },
  night: { jp: 'おそくまで、おつかれさま', en: 'Late, but welcome' },
};

export type SunPalette = readonly [string, string, string];

export const SUN_PALETTES: Readonly<Record<Mood, SunPalette>> = {
  morning: ['#fde6c8', '#f0b27a', '#c96442'],
  afternoon: ['#fff6e1', '#f6d472', '#c98b42'],
  evening: ['#f7c98a', '#d97757', '#6b3a2e'],
  night: ['#2a3340', '#3d4a5e', '#8a9bbf'],
};

export function resolveMood(date: Date = new Date()): Mood {
  const h = date.getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}
