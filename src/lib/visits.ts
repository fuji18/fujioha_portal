const STORAGE_KEY = 'fujioha_visits';

export interface VisitState {
  count: number;
  last: string | null;
}

export interface VisitPhrase {
  jp: string;
  en: string;
}

export function visitPhrase(n: number): VisitPhrase {
  if (n <= 1) return { jp: 'はじめまして。', en: 'First time here — welcome.' };
  if (n === 2)
    return { jp: '二度目のおはよう、ありがとう。', en: 'A second visit — thank you.' };
  if (n <= 9) return { jp: `今日が ${n} 度目のおはよう。`, en: `${n} mornings now.` };
  if (n <= 30) return { jp: `${n} 度目。常連です。`, en: `${n} visits. A regular.` };
  return { jp: `${n} 度目。ほんとうにありがとう。`, en: `${n} visits. Truly, thank you.` };
}

function todayIso(now: Date): string {
  return now.toISOString().slice(0, 10);
}

// Reads current visit count from localStorage, increments at most once per UTC day,
// and writes back. Falls back to 1 if storage is unavailable.
export function recordVisit(now: Date = new Date()): number {
  if (typeof localStorage === 'undefined') return 1;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data: VisitState = raw ? JSON.parse(raw) : { count: 0, last: null };
    const today = todayIso(now);
    const next: VisitState =
      data.last === today ? data : { count: data.count + 1, last: today };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next.count;
  } catch {
    return 1;
  }
}
