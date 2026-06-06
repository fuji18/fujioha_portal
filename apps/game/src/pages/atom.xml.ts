import type { APIRoute } from 'astro';
import { buildAtomXml } from '@fujioha/ui/feed';
import { loadGameFeedItems } from '../lib/feed-source';
import { GAME_FEED_META } from '../lib/feed';

export const prerender = true;

export const GET: APIRoute = async () => {
  const items = await loadGameFeedItems();
  return new Response(buildAtomXml(items, GAME_FEED_META), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
};
