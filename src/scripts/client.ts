import { resolveMood, MOODS, SUN_PALETTES, type Mood } from '../lib/moods';
import { todayKou } from '../lib/kou72';
import { OHAKO_PICKS, pickOhako, type OhakoPick } from '../lib/ohako';
import { recordVisit, visitPhrase } from '../lib/visits';

const GRADIENT_CLASS_PREFIX = 'fp-grad-';

function applyMood(root: HTMLElement, mood: Mood): void {
  root.dataset.mood = mood;
  // Snapshot classList before mutating — DOMTokenList is live and would skip entries.
  for (const cls of Array.from(root.classList)) {
    if (cls.startsWith('fp-') && cls !== 'fp') root.classList.remove(cls);
  }
  root.classList.add(`fp-${mood}`);

  const stops = root.querySelectorAll<SVGStopElement>('[data-sun-stop]');
  const [a, b, c] = SUN_PALETTES[mood];
  const colors = [a, b, c];
  stops.forEach((stop) => {
    const idx = Number(stop.dataset.sunStop);
    if (!Number.isNaN(idx) && colors[idx]) {
      stop.setAttribute('stop-color', colors[idx]);
    }
  });
  root.querySelectorAll<SVGCircleElement>('[data-sun-ring]').forEach((el) => {
    el.setAttribute('stroke', c);
  });
}

function renderClock(root: HTMLElement, now: Date): void {
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const clock = root.querySelector<HTMLElement>('[data-clock]');
  if (clock) clock.textContent = `${hh}:${mm} JST`;
}

function renderMoodLabel(root: HTMLElement, mood: Mood): void {
  const label = root.querySelector<HTMLElement>('[data-mood-label]');
  if (label) label.textContent = mood;
}

function renderGreeting(root: HTMLElement, mood: Mood): void {
  const greeting = MOODS[mood];
  const jp = root.querySelector<HTMLElement>('[data-greeting-jp]');
  const en = root.querySelector<HTMLElement>('[data-greeting-en]');
  if (jp) jp.textContent = greeting.jp;
  if (en) en.textContent = greeting.en;
}

function renderDate(root: HTMLElement, now: Date): void {
  const jp = root.querySelector<HTMLElement>('[data-date-jp]');
  const en = root.querySelector<HTMLElement>('[data-date-en]');
  if (jp) {
    jp.textContent = now.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  }
  if (en) {
    en.textContent = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

function renderKou(root: HTMLElement, now: Date): void {
  const kou = todayKou(now);
  const sekki = root.querySelector<HTMLElement>('[data-kou-sekki]');
  const reading = root.querySelector<HTMLElement>('[data-kou-reading]');
  const en = root.querySelector<HTMLElement>('[data-kou-en]');
  if (sekki) sekki.textContent = `七十二候 / ${kou[2]}・${kou[3]}`;
  if (reading) reading.textContent = kou[4];
  if (en) en.textContent = kou[5];
}

function renderVisit(root: HTMLElement, n: number): void {
  const phrase = visitPhrase(n);
  const jp = root.querySelector<HTMLElement>('[data-visit-jp]');
  const en = root.querySelector<HTMLElement>('[data-visit-en]');
  if (jp) jp.textContent = phrase.jp;
  if (en) en.textContent = phrase.en;
}

function renderPick(root: HTMLElement, pick: OhakoPick): void {
  const art = root.querySelector<HTMLElement>('[data-pick-art]');
  if (art) {
    art.className = art.className
      .split(' ')
      .filter((c) => !c.startsWith(GRADIENT_CLASS_PREFIX))
      .join(' ');
    art.classList.add(`${GRADIENT_CLASS_PREFIX}${pick.img}`);
  }
  const setText = (selector: string, value: string): void => {
    const el = root.querySelector<HTMLElement>(selector);
    if (el) el.textContent = value;
  };
  setText('[data-pick-src]', pick.src);
  setText('[data-pick-src-label]', pick.srcLabel);
  setText('[data-pick-jp]', pick.jp);
  setText('[data-pick-en]', pick.en);
  setText('[data-pick-blurb]', pick.blurb);
  setText('[data-pick-blurb-en]', pick.blurbEn);
  setText('[data-pick-meta]', pick.meta);
  setText('[data-pick-cta-jp]', pick.cta);
  setText('[data-pick-cta-en]', pick.ctaEn);
}

function nextPick(current: OhakoPick): OhakoPick {
  const idx = OHAKO_PICKS.indexOf(current);
  const next = (idx + 1) % OHAKO_PICKS.length;
  return OHAKO_PICKS[next];
}

export function hydratePortal(): void {
  const root = document.querySelector<HTMLElement>('[data-fp]');
  if (!root) return;

  const now = new Date();
  const mood = resolveMood(now);
  applyMood(root, mood);
  renderMoodLabel(root, mood);
  renderGreeting(root, mood);
  renderClock(root, now);
  renderDate(root, now);
  renderKou(root, now);

  const visits = recordVisit(now);
  renderVisit(root, visits);

  let currentPick = pickOhako(now.getTime());
  renderPick(root, currentPick);

  const shuffleBtn = root.querySelector<HTMLButtonElement>('[data-shuffle]');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      currentPick = nextPick(currentPick);
      renderPick(root, currentPick);
    });
  }

  setInterval(() => {
    const t = new Date();
    const m = resolveMood(t);
    renderClock(root, t);
    if (m !== root.dataset.mood) {
      applyMood(root, m);
      renderMoodLabel(root, m);
      renderGreeting(root, m);
    }
  }, 30_000);
}
