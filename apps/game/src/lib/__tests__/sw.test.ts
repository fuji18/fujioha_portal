import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// apps/game/src/lib/__tests__ -> apps/game/public
const publicDir = join(dirname(fileURLToPath(import.meta.url)), '../../../public');
const read = (name: string): string =>
  readFileSync(join(publicDir, name), 'utf8');
// apps/game/src/lib/__tests__ -> apps/game/src/layouts
const layoutsDir = join(dirname(fileURLToPath(import.meta.url)), '../../layouts');

describe('self-destroying service worker', () => {
  it('sw.js performs skipWaiting, unregister and cache cleanup', () => {
    const sw = read('sw.js');
    expect(sw).toContain('skipWaiting');
    expect(sw).toContain('self.registration.unregister');
    expect(sw).toContain('caches.keys');
    expect(sw).toContain('caches.delete');
    // 制御下の窓を再読込させる
    expect(sw).toContain('client.navigate');
  });

  it('service-worker.js is byte-identical to sw.js (covers alternate registration path)', () => {
    expect(read('service-worker.js')).toBe(read('sw.js'));
  });
});

describe('cache headers', () => {
  it('_headers pairs each service worker path with no-cache', () => {
    const headers = read('_headers');
    for (const path of ['/sw.js', '/service-worker.js']) {
      // パス行の直後に Cache-Control: no-cache が続くこと
      expect(headers).toMatch(
        new RegExp(`${path}\\s*\\n\\s*Cache-Control:\\s*no-cache`)
      );
    }
  });
});

describe('in-page cleanup script', () => {
  it('BaseLayout unregisters service workers on every page load', () => {
    const layout = readFileSync(join(layoutsDir, 'BaseLayout.astro'), 'utf8');
    expect(layout).toContain('is:inline');
    expect(layout).toContain('serviceWorker');
    expect(layout).toContain('getRegistrations');
    expect(layout).toContain('unregister');
  });
});
